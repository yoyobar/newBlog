import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface OptionForm {
    animation: boolean;
    theme: boolean;
}
interface OptionStore {
    data: OptionForm;
    setData: (form: OptionForm) => void;
}

interface MaximizeStore {
    maximize: boolean;
    setMaximize: () => void;
}

interface CollapseStore {
    collapse: boolean;
    setCollapse: () => void;
}

type OptionPersist = (config: StateCreator<OptionStore>, options: PersistOptions<OptionStore>) => StateCreator<OptionStore>;
type MaxiMizePersist = (config: StateCreator<MaximizeStore>, options: PersistOptions<MaximizeStore>) => StateCreator<MaximizeStore>;

const useOptions = create<OptionStore>(
    (persist as OptionPersist)(
        (set) => ({
            data: {
                animation: true,
                theme: true,
            },
            setData: (form: OptionForm) => set({ data: form }),
        }),
        {
            name: 'option',
        }
    )
);
export default useOptions;

export const useMaximize = create<MaximizeStore>(
    (persist as MaxiMizePersist)(
        (set) => ({
            maximize: true,
            setMaximize: () => set((state) => ({ maximize: !state.maximize })),
        }),
        {
            name: 'maximize',
        }
    )
);

export const useCollapse = create<CollapseStore>((set) => ({
    collapse: false,
    setCollapse: () => set((state) => ({ collapse: !state.collapse })),
}));

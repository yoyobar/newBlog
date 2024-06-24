import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export interface OptionForm {
    animation: boolean;
    theme: boolean;
}
interface OptionStore {
    theme: boolean;
    setTheme: (theme: boolean) => void;
}

interface MaximizeStore {
    maximize: boolean;
    setMaximize: () => void;
}

interface CollapseStore {
    collapse: boolean;
    setCollapse: () => void;
}

type OptionPersist = (
    config: StateCreator<OptionStore>,
    options: PersistOptions<OptionStore>
) => StateCreator<OptionStore>;
type MaxiMizePersist = (
    config: StateCreator<MaximizeStore>,
    options: PersistOptions<MaximizeStore>
) => StateCreator<MaximizeStore>;

const useOptions = create<OptionStore>(
    (persist as OptionPersist)(
        (set) => ({
            theme: false,
            setTheme: (theme: boolean) => set({ theme: theme }),
        }),
        {
            name: 'theme',
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

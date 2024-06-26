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
type OptionPersist = (
    config: StateCreator<OptionStore>,
    options: PersistOptions<OptionStore>
) => StateCreator<OptionStore>;

interface MaximizeStore {
    maximize: boolean;
    setMaximize: () => void;
}
type MaxiMizePersist = (
    config: StateCreator<MaximizeStore>,
    options: PersistOptions<MaximizeStore>
) => StateCreator<MaximizeStore>;

interface CollapseStore {
    collapse: boolean;
    setCollapse: () => void;
}

interface ModalStore {
    modal: boolean;
    setModal: (bool: boolean) => void;
}

const useOptions = create<OptionStore>(
    (persist as OptionPersist)(
        (set) => ({
            theme: false,
            setTheme: (theme: boolean) => set({ theme: theme }),
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

export const useModal = create<ModalStore>((set) => ({
    modal: true,
    setModal: (bool: boolean) => set(() => ({ modal: bool })),
}));

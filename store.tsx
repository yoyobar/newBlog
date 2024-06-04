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

type Persist = (config: StateCreator<OptionStore>, options: PersistOptions<OptionStore>) => StateCreator<OptionStore>;

const useOptions = create<OptionStore>(
    (persist as Persist)(
        (set, get) => ({
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

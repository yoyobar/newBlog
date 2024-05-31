import { create } from 'zustand';

interface AnimationStore {
    running: boolean;
    onToggle: () => void;
}

const useAnimation = create<AnimationStore>((set) => ({
    running: true,

    onToggle: () => set((state) => ({ running: !state.running })),
}));

export default useAnimation;

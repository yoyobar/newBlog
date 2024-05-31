'use client';

import { create } from 'zustand';

interface AnimationStore {
    running: boolean;
    onToggle: () => void;
}
const loadSetting = JSON.parse(localStorage.getItem('animation') as string);

const useAnimation = create<AnimationStore>((set) => {
    const running = loadSetting ? loadSetting.snow : true;

    set({ running: running });

    return {
        running: running,

        onToggle: () =>
            set((state) => {
                const newState = !state.running;
                localStorage.setItem('animation', JSON.stringify({ snow: newState }));
                return { running: newState };
            }),
    };
});

export default useAnimation;

import { Dispatch, SetStateAction } from 'react';

const observerOption = (root: Element) => ({
    threshold: 0.4,
    root,
    rootMargin: '-80px 0px 0px 0px',
});

export const getIntersectionObserver = (root: Element, setState: Dispatch<SetStateAction<string>>) => {
    let direction = '';
    let prevYposition = root.scrollTop;

    const checkScrollDirection = (prevY: number) => {
        if (root.scrollTop === 0 && prevY === 0) return;
        else if (root.scrollTop > prevY) direction = 'down';
        else direction = 'up';

        prevYposition = root.scrollTop;
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            checkScrollDirection(prevYposition);

            if ((direction === 'down' && !entry.isIntersecting) || (direction === 'up' && entry.isIntersecting)) {
                setState(entry.target.id);
            }
        });
    }, observerOption(root));

    return observer;
};

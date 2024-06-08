'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Snowfall.module.css';
import useOptions from '@/config/store';

const Snowfall = () => {
    const { data } = useOptions();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        for (let i = 0; i < 200; i++) {
            const snow = document.createElement('div');
            snow.className = styles.snow;
            snow.style.opacity = String(Math.random());

            const startX = Math.random() * 90;
            const endX = startX + (Math.random() * 20 - 10);
            const scale = Math.max(Math.random(), 0.1);

            const keyframe = [
                { transform: `translate(${startX}vw, 0vh) scale(${scale})` },
                { transform: `translate(${endX}vw, 100vh) scale(${scale})` },
            ];
            const option = {
                duration: 20000,
                easing: 'linear',
                iterations: Infinity,
                delay: -Math.random() * 20 * 1000,
            };
            snow.animate(keyframe, option);

            container.appendChild(snow);
        }
    }, [data.animation]);

    return data.animation && <div ref={containerRef} className={`snow-container ${styles.snowContainer}`}></div>;
};

export default Snowfall;

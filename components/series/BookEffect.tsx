'use client';

import { useMaximize } from '@/config/store';
import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
}

const InteractiveBackground: React.FC = () => {
    const { maximize } = useMaximize();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: 0, y: 0 };
        const speedFactor = 0.5; // 속도 조절 팩터 (0.5는 현재 속도의 절반)

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() * 2 - 1) * speedFactor,
                    speedY: (Math.random() * 2 - 1) * speedFactor,
                });
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(89, 89, 89, 0.8)';
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';

            particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x > canvas.width) particle.x = 0;
                else if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                else if (particle.y < 0) particle.y = canvas.height;

                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 1 - distance / 120; // 거리에 따라 투명도 조절
                    ctx.strokeStyle = `rgba(204, 204, 204, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                particles.forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = 1 - distance / 100; // 거리에 따라 투명도 조절
                        ctx.strokeStyle = `rgba(204, 204, 204, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
        };

        const animate = () => {
            drawParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        if (maximize) {
            canvas.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [maximize]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default InteractiveBackground;

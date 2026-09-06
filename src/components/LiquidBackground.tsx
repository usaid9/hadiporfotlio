

import { useEffect, useRef } from 'react';

type Blob = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
};

const LiquidBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const pointer = { x: 0.5, y: 0.35, targetX: 0.5, targetY: 0.35 };
        let animationFrame = 0;
        const blobs: Blob[] = [
            { x: 0.18, y: 0.2, vx: 0.00016, vy: 0.0001, size: 0.34, color: '124, 247, 212' },
            { x: 0.82, y: 0.28, vx: -0.00012, vy: 0.00014, size: 0.3, color: '134, 168, 255' },
            { x: 0.55, y: 0.82, vx: 0.0001, vy: -0.00012, size: 0.38, color: '94, 90, 220' },
        ];

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const onPointerMove = (event: PointerEvent) => {
            pointer.targetX = event.clientX / window.innerWidth;
            pointer.targetY = event.clientY / window.innerHeight;
        };

        const onScroll = () => {
            pointer.targetY = 0.35 + Math.min(window.scrollY / window.innerHeight, 3) * 0.06;
        };

        const render = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            pointer.x += (pointer.targetX - pointer.x) * 0.045;
            pointer.y += (pointer.targetY - pointer.y) * 0.045;
            context.clearRect(0, 0, width, height);

            blobs.forEach((blob, index) => {
                blob.x += blob.vx;
                blob.y += blob.vy;
                if (blob.x < -0.15 || blob.x > 1.15) blob.vx *= -1;
                if (blob.y < -0.15 || blob.y > 1.15) blob.vy *= -1;

                const x = (blob.x + (pointer.x - 0.5) * (index + 1) * 0.025) * width;
                const y = (blob.y + (pointer.y - 0.5) * (index + 1) * 0.025) * height;
                const radius = blob.size * Math.min(width, height);
                const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `rgba(${blob.color}, 0.18)`);
                gradient.addColorStop(0.5, `rgba(${blob.color}, 0.07)`);
                gradient.addColorStop(1, `rgba(${blob.color}, 0)`);
                context.fillStyle = gradient;
                context.beginPath();
                context.arc(x, y, radius, 0, Math.PI * 2);
                context.fill();
            });

            animationFrame = requestAnimationFrame(render);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('scroll', onScroll, { passive: true });
        animationFrame = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className="liquid-background" />;
};

export default LiquidBackground;

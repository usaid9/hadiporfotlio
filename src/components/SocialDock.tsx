

import React, { useEffect, useRef } from 'react';
import GlassSurface from './GlassSurface';

const SocialIcon = ({ name }: { name: 'github' | 'linkedin' | 'instagram' | 'email' }) => {
    if (name === 'github') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.66-.21.66-.46v-1.68c-2.68.58-3.25-1.14-3.25-1.14-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .86 1.47 2.26 1.05 2.81.8.09-.62.34-1.05.61-1.3-2.14-.24-4.39-1.07-4.39-4.76 0-1.05.38-1.91 1-2.58-.1-.24-.43-1.22.1-2.54 0 0 .82-.26 2.67.99a9.24 9.24 0 0 1 4.86 0c1.85-1.25 2.67-.99 2.67-.99.53 1.32.2 2.3.1 2.54.62.67 1 1.53 1 2.58 0 3.7-2.26 4.52-4.41 4.76.35.3.66.88.66 1.78v2.64c0 .25.18.55.67.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>;
    if (name === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.4H2.7V21h2.5V8.4ZM3.95 3A1.55 1.55 0 1 0 4 6.1 1.55 1.55 0 0 0 3.95 3ZM21.3 13.78c0-3.8-2.03-5.57-4.74-5.57-2.18 0-3.15 1.2-3.69 2.04V8.4h-2.5V21h2.5v-6.25c0-1.65.31-3.25 2.36-3.25 2.03 0 2.05 1.9 2.05 3.36V21h2.5l.02-7.22Z" /></svg>;
    if (name === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.5" cy="6.7" r="1" className="social-icon-fill" /></svg>;
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2" /><path d="m4.2 7 7.8 6 7.8-6" /></svg>;
};

const SocialDock = () => {
    const dockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dock = dockRef.current;
        if (!dock) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let frame = 0;

        const animate = () => {
            currentX += (targetX - currentX) * 0.14;
            currentY += (targetY - currentY) * 0.14;
            dock.style.setProperty('--dock-x', `${currentX}px`);
            dock.style.setProperty('--dock-y', `${currentY}px`);
            frame = requestAnimationFrame(animate);
        };

        const onPointerMove = (event: PointerEvent) => {
            const bounds = dock.getBoundingClientRect();
            targetX = (event.clientX - (bounds.left + bounds.width / 2)) * 0.035;
            targetY = (event.clientY - (bounds.top + bounds.height / 2)) * 0.035;
        };
        const reset = () => {
            targetX = 0;
            targetY = 0;
        };

        dock.addEventListener('pointermove', onPointerMove);
        dock.addEventListener('pointerleave', reset);
        frame = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(frame);
            dock.removeEventListener('pointermove', onPointerMove);
            dock.removeEventListener('pointerleave', reset);
        };
    }, []);

    return (
        <div ref={dockRef} className="social-dock fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full p-2 sm:bottom-7">
            <GlassSurface
                width="100%"
                height="100%"
                borderRadius={999}
                backgroundOpacity={0.15}
                saturation={1.6}
                distortionScale={-80}
                style={{ position: 'absolute', inset: 0 }}
            />

            <a aria-label="GitHub" href="https://github.com/Abdulhadi405" target="_blank" rel="noopener noreferrer" className="social-link relative z-10">
                <SocialIcon name="github" />
            </a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/abdulhadi-tahir-856500375/" target="_blank" rel="noopener noreferrer" className="social-link relative z-10">
                <SocialIcon name="linkedin" />
            </a>
            <a aria-label="Instagram" href="https://www.instagram.com/abdulhadi_405/" target="_blank" rel="noopener noreferrer" className="social-link relative z-10">
                <SocialIcon name="instagram" />
            </a>
            <a aria-label="Email" href="mailto:abdulhaditahir405@gmail.com" className="social-link relative z-10">
                <SocialIcon name="email" />
            </a>
        </div>
    );
};

export default SocialDock;
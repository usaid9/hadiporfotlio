

import { useEffect, useState } from 'react';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const update = () => setVisible(window.scrollY > window.innerHeight * 0.65);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    const handleScrollToTop = () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            type="button"
            onClick={handleScrollToTop}
            className={`back-to-top ${visible ? 'is-visible' : ''}`}
            aria-label="Scroll back to top"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(.85)'
            }}
        >
            <span>↑</span><small>TOP</small>
        </button>
    );
};

export default BackToTop;
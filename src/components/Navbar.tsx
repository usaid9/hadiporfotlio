

import React, {
    useEffect,
    useRef,
    useState,
    type MouseEvent,
} from 'react';
import GlassSurface from './GlassSurface';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const navRef = useRef<HTMLElement>(null);
    const scrollAnimationRef = useRef<number | null>(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 32);
        };

        onScroll();

        window.addEventListener('scroll', onScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        const closeOnOutsideClick = (
            event: globalThis.MouseEvent
        ) => {
            if (
                navRef.current &&
                !navRef.current.contains(
                    event.target as Node
                )
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener(
            'keydown',
            closeOnEscape
        );

        document.addEventListener(
            'pointerdown',
            closeOnOutsideClick
        );

        return () => {
            document.removeEventListener(
                'keydown',
                closeOnEscape
            );

            document.removeEventListener(
                'pointerdown',
                closeOnOutsideClick
            );
        };
    }, [menuOpen]);

    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>(
                '#about, #skills, #projects, #experiments, #contact'
            )
        );

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(
                        (entry) => entry.isIntersecting
                    )
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    )[0];

                if (visible) {
                    setActiveSection(
                        visible.target.id
                    );
                }
            },
            {
                rootMargin: '-30% 0px -55% 0px',
                threshold: [0.1, 0.35, 0.7],
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleNavClick = (
        event: MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        event.preventDefault();

        const target = document.getElementById(id);

        if (!target) return;

        if (scrollAnimationRef.current !== null) {
            cancelAnimationFrame(
                scrollAnimationRef.current
            );

            scrollAnimationRef.current = null;
        }

        const startY = window.scrollY;

        const navOffset = 105;

        const targetY =
            target.getBoundingClientRect().top +
            window.scrollY -
            navOffset;

        const distance = targetY - startY;

        /*
         * Respect reduced motion.
         */
        if (
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
        ) {
            window.scrollTo({
                top: targetY,
                behavior: 'auto',
            });

            window.history.replaceState(
                null,
                '',
                `#${id}`
            );

            setMenuOpen(false);

            return;
        }

        /*
         * IMPORTANT:
         *
         * globals.css has:
         *
         * html {
         *     scroll-behavior: smooth;
         * }
         *
         * That conflicts with our custom animation.
         *
         * Temporarily disable CSS smooth scrolling
         * so every window.scrollTo() happens immediately.
         */
        const html = document.documentElement;
        const previousScrollBehavior =
            html.style.scrollBehavior;

        html.style.scrollBehavior = 'auto';

        const duration = 900;
        const startTime = performance.now();

        const easeInOutCubic = (t: number) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 -
                      Math.pow(
                          -2 * t + 2,
                          3
                      ) /
                          2;
        };

        const finishScroll = () => {
            html.style.scrollBehavior =
                previousScrollBehavior;

            scrollAnimationRef.current = null;
        };

        const animateScroll = (
            currentTime: number
        ) => {
            const elapsed =
                currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const easedProgress =
                easeInOutCubic(progress);

            window.scrollTo(
                0,
                startY +
                    distance *
                        easedProgress
            );

            if (progress < 1) {
                scrollAnimationRef.current =
                    requestAnimationFrame(
                        animateScroll
                    );
            } else {
                finishScroll();
            }
        };

        /*
         * Start immediately.
         */
        animateScroll(performance.now());

        /*
         * Change the URL without triggering
         * the browser's default anchor jump.
         */
        window.history.replaceState(
            null,
            '',
            `#${id}`
        );

        setMenuOpen(false);
    };

    const links = [
        ['about', 'About'],
        ['skills', 'Skills'],
        ['projects', 'Projects'],
        ['experiments', 'Experiments'],
        ['contact', 'Contact'],
    ];

    return (
        <nav
            ref={navRef}
            className={`site-nav fixed left-1/2 top-4 -translate-x-1/2 px-4 py-3 sm:top-5 sm:px-6 ${
                scrolled
                    ? 'is-scrolled'
                    : ''
            } ${
                menuOpen
                    ? 'menu-open'
                    : ''
            }`}
        >
            <GlassSurface
                width="100%"
                height="100%"
                borderRadius={999}
                backgroundOpacity={0.15}
                saturation={1.6}
                distortionScale={-80}
                style={{ position: 'absolute', inset: 0 }}
            />

            <div className="flex items-center justify-between gap-5">

                {/* Logo */}
                <a
                    href="#top"
                    className="text-sm font-black tracking-[0.2em] text-white sm:text-base "
                    onClick={(event) => {
                        event.preventDefault();

                        if (
                            scrollAnimationRef.current !==
                            null
                        ) {
                            cancelAnimationFrame(
                                scrollAnimationRef.current
                            );

                            scrollAnimationRef.current =
                                null;
                        }

                        const html =
                            document.documentElement;

                        const previousScrollBehavior =
                            html.style
                                .scrollBehavior;

                        html.style.scrollBehavior =
                            'auto';

                        window.scrollTo(
                            0,
                            0
                        );

                        html.style.scrollBehavior =
                            previousScrollBehavior;

                        window.history.replaceState(
                            null,
                            '',
                            '#top'
                        );

                        setMenuOpen(false);
                    }}
                >
                    ABDUL
                    <span className="text-[#7cf7d4] m-2">
                        HADI
                    </span>
                </a>

                {/* Mobile menu */}
                <button
                    className="menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                    onClick={() =>
                        setMenuOpen(
                            !menuOpen
                        )
                    }
                >
                    <span>
                        {menuOpen
                            ? 'CLOSE'
                            : 'MENU'}
                    </span>

                    <i />
                </button>

                {/* Navigation */}
                <ul
                    id="primary-navigation"
                    className="site-links"
                >
                    {links.map(
                        ([id, label]) => (
                            <li key={id}>
                                <a
                                    className={
                                        activeSection ===
                                        id
                                            ? 'active'
                                            : ''
                                    }
                                    href={`#${id}`}
                                    onClick={(
                                        event
                                    ) =>
                                        handleNavClick(
                                            event,
                                            id
                                        )
                                    }
                                >
                                    {label}
                                </a>
                            </li>
                        )
                    )}
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 text-center">
            <div className="hero-grid absolute inset-0" />
            <div className="relative z-10 mx-auto w-full max-w-5xl">
                <p className="eyebrow mb-7">Computer science · technology · code</p>
                <h1 className="hero-title mx-auto max-w-5xl text-7xl font-black leading-[0.82] tracking-[-0.06em] text-white sm:text-9xl md:text-[10rem]">
                    HI, I&apos;M <span className="text-[#dce8df]">ABDUL</span><span className="text-[#7cf7d4]">HADI</span>
                </h1>
                <p className="muted mx-auto mt-8 max-w-xl text-base sm:text-lg">
                    A student exploring how digital systems work — and building things to find out.
                </p>
                <div className="mt-9 flex justify-center gap-3">
                    <a href="#projects" className="button-primary rounded-full px-6 py-3">
                        Explore work <span aria-hidden="true">↗</span>
                    </a>
                    <a href="https://github.com/Abdulhadi405" target="_blank" rel="noopener noreferrer" className="button-secondary rounded-full px-6 py-3">
                        GitHub <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <p className="mt-24 text-xs uppercase tracking-[0.3em] text-slate-500">Scroll to explore <span className="text-[#7cf7d4]">↓</span></p>
            </div>
        </section>
    );
};

export default Hero;
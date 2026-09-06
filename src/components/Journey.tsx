import React from 'react';

const Journey: React.FC = () => {
    return (
        <section id="journey" className="relative">
            <p className="eyebrow mb-4">03 / The path so far</p>
            <h2 className="section-heading mb-10">Learning in public.</h2>
            <div className="grid gap-4 md:grid-cols-4">
                    <div className="journey-card p-5">
                        <span className="muted text-xs">01</span><h3 className="mt-8 text-xl font-semibold">O Levels</h3>
                        <p className="muted mt-2 text-sm">The foundation.</p>
                    </div>
                    <div className="journey-card p-5">
                        <span className="muted text-xs">02</span><h3 className="mt-8 text-xl font-semibold">A Levels</h3>
                        <p className="muted mt-2 text-sm">Questions getting bigger.</p>
                    </div>
                    <div className="journey-card p-5">
                        <span className="muted text-xs">03</span><h3 className="mt-8 text-xl font-semibold">Computer science</h3>
                        <p className="muted mt-2 text-sm">Learning how systems work.</p>
                    </div>
                    <div className="journey-card border-[#7cf7d4]/30 p-5">
                        <span className="text-xs text-[#7cf7d4]">04</span><h3 className="mt-8 text-xl font-semibold">What's next?</h3>
                        <p className="muted mt-2 text-sm">Build, share, repeat.</p>
                    </div>
            </div>
        </section>
    );
};

export default Journey;
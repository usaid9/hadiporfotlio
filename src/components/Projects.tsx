import React from 'react';

const Projects: React.FC = () => {
    return (
        <section id="projects">
            <p className="eyebrow mb-4">04 / Selected work</p>
            <h2 className="section-heading mb-10">Projects are loading.</h2>
            <div className="project-card flex min-h-64 flex-col justify-between p-7 sm:p-10">
                <div>
                    <span className="text-4xl text-[#7cf7d4]">✳</span>
                    <p className="mt-8 max-w-md text-xl text-slate-200">Nothing published yet — but the best ideas are usually built before they are announced.</p>
                </div>
                <p className="muted mt-8 text-sm uppercase tracking-widest">Still building · check back soon</p>
            </div>
        </section>
    );
};

export default Projects;
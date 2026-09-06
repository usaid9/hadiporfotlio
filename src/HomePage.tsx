import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Contact from './components/Contact';
import SplitText from './components/reactbits/SplitText';
import AnimatedContent from './components/reactbits/AnimatedContent';
import ShinyText from './components/reactbits/ShinyText';

const skills = [
  ['HTML', 'Semantic structure and accessible markup.', '<section>'],
  ['CSS', 'Layouts, motion, responsive systems.', 'display: grid'],
  ['JavaScript', 'Interactions, logic, browser APIs.', 'const build = () => {}'],
  ['Python', 'Automation, scripting, experiments.', 'print("hello")'],
  ['React', 'Component-based interfaces.', 'function App() {}'],
  ['Next.js', 'Full-stack React applications.', 'app/page.tsx'],
];

const projects = [
  {
    title: 'MediaSnap',
    type: 'Tool',
    description: 'A web-based media utility for converting online video into MP3 or MP4.',
  },
  {
    title: 'Portfolio',
    type: 'Website',
    description: 'A cinematic personal portfolio focused on motion, interaction, and experimentation.',
  },
  {
    title: 'Coming Soon',
    type: 'Experiment',
    description: 'Something new is currently being built.',
  },
];

function ProjectCard({
  title,
  type,
  description,
  index,
  onOpen,
}: {
  title: string;
  type: string;
  description: string;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="project-card"
      style={{
        '--project-index': index,
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="project-card__top">
        <span className="project-card__type">{type}</span>
        <span className="project-card__arrow">↗</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="project-card__footer">
        <span>open case</span>
        <span>{`0${index + 1}`}</span>
      </div>
    </article>
  );
}

function SkillCard({
  name,
  description,
  snippet,
  index,
}: {
  name: string;
  description: string;
  snippet: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className="skill-card"
      style={{
        '--skill-index': index,
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="skill-card__top">
        <span className="skill-number">0{index + 1}</span>
        <span className="skill-card__chip">active</span>
      </div>

      <h3>{name}</h3>

      <p>{description}</p>

      <div className="skill-card__footer">
        <span>focus</span>
        <code>{snippet}</code>
      </div>
    </div>
  );
}

function HomePage() {
  const heroVisualRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState('All');
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [projectView, setProjectView] = useState<
    'code' | 'note' | 'recording'
  >('code');
  const [recordingPlaying, setRecordingPlaying] = useState(false);

  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  const visibleProjects = projects.filter(
    (project) => filter === 'All' || project.type === filter
  );

  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>('.reveal-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;

            setVisibleSections((previous) => ({
              ...previous,
              [id]: true,
            }));

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleHeroMove = (event: MouseEvent<HTMLDivElement>) => {
    const visual = heroVisualRef.current;
    if (!visual) return;

    const rect = visual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    visual.style.transform = `
      perspective(900px)
      rotateX(${y * -5}deg)
      rotateY(${x * 5}deg)
    `;
  };

  const handleHeroLeave = () => {
    const visual = heroVisualRef.current;
    if (!visual) return;

    visual.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
    `;
  };

  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-copy" style={{ marginBottom: '0.25em' }}>
          <p className="eyebrow"><ShinyText text="STUDENT · BUILDER · EXPLORER" speed={3} /></p>

          <h1>
            <SplitText as="span" text="Abdulhadi" splitType="chars" delay={0.03} />
            <br />
            <em><SplitText as="span" text="builds things." delay={0.03} /></em>
          </h1>

          <p className="hero-description">
            Exploring computer science, web technology, interfaces, and
            everything that makes digital experiences feel alive.
          </p>
        </div>

        <div
          ref={heroVisualRef}
          className="hero-visual"
          onMouseMove={handleHeroMove}
          onMouseLeave={handleHeroLeave}
        >
          <div className="glass-orb orb-one" />
          <div className="glass-orb orb-two" />
          <div className="glass-orb orb-three" />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          <span>CURIOUS BY DEFAULT</span>
          <span>BUILDING BY CHOICE</span>
          <span>LEARNING EVERY DAY</span>
          <span>CURIOUS BY DEFAULT</span>
          <span>BUILDING BY CHOICE</span>
          <span>LEARNING EVERY DAY</span>
        </div>
      </div>

      {/* ABOUT */}
      <section
        id="about"
        className={`editorial-section about-section reveal-section ${
          visibleSections.about ? 'is-visible' : ''
        }`}
      >
        <p className="section-label">01 — ABOUT</p>

        <div className="about-grid">
          <h2>
            Still learning.
            <br />
            <em>Already building.</em>
          </h2>

          <div>
            <p className="lead-copy">
              I like understanding how things work — then turning that
              understanding into something people can actually use.
            </p>

            <p className="muted-copy">
              My interests sit around computer science, web technology,
              interfaces, and the tiny details that make a digital experience
              feel alive.
            </p>

            <div className="mini-stats">
              <span>
                <b>01</b>
                Student
              </span>

              <span>
                <b>∞</b>
                Ideas to build
              </span>

              <span>
                <b>24/7</b>
                Curiosity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="editorial-section">
        <p className="section-label"><ShinyText text="02 — TOOLKIT" speed={3} /></p>

        <AnimatedContent className="section-head-row">
          <h2>
            Things I&apos;m
            <br />
            <em>learning with.</em>
          </h2>

          <p className="muted-copy">
            Hover the cards. They have a little weight, spring, and personality.
          </p>
        </AnimatedContent>

        <div className="skill-field">
          {skills.map(([name, description, snippet], index) => (
            <AnimatedContent key={name} delay={index * 0.06} distance={24}>
              <SkillCard
                name={name}
                description={description}
                snippet={snippet}
                index={index}
              />
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="editorial-section journey-section">
        <p className="section-label"><ShinyText text="02.5 — EDUCATION / CURRENTLY" speed={3} /></p>

        <AnimatedContent className="section-head-row">
          <h2>
            Still on the
            <br />
            <em>way.</em>
          </h2>

          <p className="muted-copy">
            Learning by building, experimenting, breaking things, and figuring
            out why they broke.
          </p>
        </AnimatedContent>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="editorial-section">
        <p className="section-label"><ShinyText text="03 — PROJECTS" speed={3} /></p>

        <div className="section-head-row">
          <h2>
            Things I&apos;ve
            <br />
            <em>been building.</em>
          </h2>

          <div className="project-filters">
            {['All', 'Tool', 'Website', 'Experiment'].map((item) => (
              <button
                key={item}
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <AnimatedContent key={project.title} delay={index * 0.07} distance={24}>
              <ProjectCard
                title={project.title}
                type={project.type}
                description={project.description}
                index={index}
                onOpen={() => {
                  setOpenProject(project.title);
                  setProjectView('code');
                }}
              />
            </AnimatedContent>
          ))}
        </div>

        {openProject && (
          <div className="lab-panel">
            <div className="lab-header">
              <strong>{openProject}</strong>

              <button onClick={() => setOpenProject(null)}>Close</button>
            </div>

            <div className="lab-tabs">
              <button
                className={projectView === 'code' ? 'active' : ''}
                onClick={() => setProjectView('code')}
              >
                Code
              </button>

              <button
                className={projectView === 'note' ? 'active' : ''}
                onClick={() => setProjectView('note')}
              >
                Note
              </button>

              <button
                className={projectView === 'recording' ? 'active' : ''}
                onClick={() => setProjectView('recording')}
              >
                Recording
              </button>
            </div>

            <div className="lab-content">
              {projectView === 'code' && (
                <pre>
                  <code>{`// ${openProject}

const project = {
  status: "building",
  curiosity: true,
  ideas: Infinity
};`}</code>
                </pre>
              )}

              {projectView === 'note' && (
                <p className="lead-copy">
                  This is where experiments, notes, and ideas live while they
                  are being developed.
                </p>
              )}

              {projectView === 'recording' && (
                <div className="recording-preview">
                  <button
                    onClick={() => setRecordingPlaying(!recordingPlaying)}
                  >
                    {recordingPlaying ? 'Pause' : 'Play'}
                  </button>

                  <div className="recording-wave">
                    {Array.from({ length: 24 }).map((_, index) => (
                      <span
                        key={index}
                        className={recordingPlaying ? 'playing' : ''}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* EXPERIMENTS */}
      <section id="experiments" className="editorial-section">
        <p className="section-label"><ShinyText text="04 — EXPERIMENTS" speed={3} /></p>

        <div className="section-head-row">
          <h2>
            Curiosity
            <br />
            <em>in motion.</em>
          </h2>

          <p className="muted-copy">
            Small ideas, visual experiments, interactions, and things that
            don&apos;t necessarily need a reason to exist.
          </p>
        </div>

        <div className="experiment-grid">
          {[
            ['01', 'Motion studies', 'Playing with movement, timing, and visual rhythm.'],
            ['02', 'Interface experiments', 'Exploring how small interactions change how interfaces feel.'],
            ['03', 'Random ideas', 'Because sometimes the best projects start with a weird idea.'],
          ].map(([num, title, desc], index) => (
            <AnimatedContent key={num} delay={index * 0.08} distance={24}>
              <article>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}

export default HomePage;

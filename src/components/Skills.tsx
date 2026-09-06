import React from 'react';

const skills = [
  { name: 'HTML', description: 'Structure' },
  { name: 'CSS', description: 'Styling' },
  { name: 'JavaScript', description: 'Interaction' },
  { name: 'Python', description: 'Programming' },
  { name: 'React', description: 'UI' },
  { name: 'Next.js', description: 'Web' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills">
      <p className="eyebrow mb-4">02 / Toolkit</p>
      <h2 className="section-heading mb-10">What I'm exploring</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="skill-card p-6"
          >
            <span className="text-sm text-[#7cf7d4]">0{skills.indexOf(skill) + 1}</span>
            <h3 className="mt-8 text-2xl font-semibold">{skill.name}</h3>
            <p className="muted mt-1">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
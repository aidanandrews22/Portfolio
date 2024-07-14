import React from 'react';

const ProjectCard = ({ title, description, demoLink, githubLink, tags }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-6">
    <h3 className="text-xl font-semibold mb-2">
      <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{title}</a>
    </h3>
    <p className="text-text-secondary mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
      ))}
    </div>
    <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on GitHub</a>
  </div>
);

const Projects = () => {
  const projects = [
    {
      title: "VoxAI",
      description: "An autonomous learning assistant designed to streamline and enhance the educational experience through AI-driven interactions and adaptive learning technologies.",
      demoLink: "https://www.youtube.com/watch?v=L_BydgDq2Mw&feature=youtu.be",
      githubLink: "https://github.com/aidanandrews22/VoxAI",
      tags: ["AI & Machine Learning", "Completed"]
    },
    // ... add more projects
  ];

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;
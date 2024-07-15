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
    {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on GitHub</a>}
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
    {
      title: "Devanagari Web App",
      description: "A web-based application focused on teaching the Devanagari script through interactive lessons and quizzes, leveraging cutting-edge web technologies for an immersive learning experience.",
      demoLink: "https://www.youtube.com/watch?v=IahiTsLGGUA",
      githubLink: "https://github.com/aidanandrews22/Devanagari-Recognition",
      tags: ["Python", "Deep Learning", "Completed"]
    },
    {
      title: "ClimatePredict",
      description: "Completed a multi regression model in Rust. The project comprises 3 regression models: linear regression, polynomial regression, and random forest regression (incomplete). I was solely responsible for all machine learning implemented in this project.",
      demoLink: "https://youtu.be/JlD5GDwLOfI?si=NAy5T-9PecZMSqm-",
      githubLink: "https://github.com/aidanandrews22/CS182H-Project",
      tags: ["Rust", "Machine Learning", "Completed"]
    },
    {
      title: "Old Website",
      description: "I like the simplicity of my current website opposed to this 'modern' look.",
      demoLink: "https://dev3489.d2nkyw5uoshkyz.amplifyapp.com",
      githubLink: "https://github.com/aidanandrews22/Portfolio-Website-1",
      tags: ["Web Dev"]
    },
    {
      title: "NVRALONE",
      description: "I made this entire website, with the help of Shopify templates. The bulk of my work was spent on customer acquisition algorithms, marketing, managing, and designing.",
      demoLink: "https://urnvralone.com/",
      githubLink: null,
      tags: ["Web Dev"]
    },
    {
      title: "This Website",
      description: "I wrote this entire website from scratch. Getting some inspiration from other portfolio websites. Notably, I wrote the algorithm for state change without reload and the sorting algorithm for the blog posts.",
      demoLink: "https://aidanandrews.info/",
      githubLink: "https://github.com/aidanandrews22/Simple-Website",
      tags: ["Web Dev"]
    }
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
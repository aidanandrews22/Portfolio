import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ProjectView from '../components/project/ProjectView';

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/aidanandrews22/website-data/main';

const ProjectCard = ({ title, description, demoLink, githubLink, tags }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-6">
    <h3 className="text-xl font-semibold mb-2">
      <Link to={`/projects/${title}`} className="text-primary">{title}</Link>
    </h3>
    <p className="text-text-secondary mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag, index) => (
        <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
      ))}
    </div>
    {demoLink && <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-primary mr-4">View Demo</a>}
    {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-primary">View on GitHub</a>}
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching fresh project data');
        const response = await fetch(`${CONTENT_BASE_URL}/content/projects.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <>
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </>
        } />
        <Route path=":projectId" element={<ProjectView projects={projects} />} />
      </Routes>
    </div>
  );
};

export default Projects;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/aidanandrews22/website-data/main';

const ProjectView = ({ projects }) => {
  const [projectContent, setProjectContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectContent = async () => {
      try {
        const response = await fetch(`${CONTENT_BASE_URL}/content/projects/${projectId}.md`);
        if (!response.ok) {
          throw new Error('Failed to fetch project content');
        }
        const content = await response.text();
        setProjectContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectContent();
  }, [projectId]);

  if (loading) return <div>Loading project content...</div>;
  if (error) return <div>Error: {error}</div>;

  const project = projects.find(p => p.id === projectId);

  return (
    <div>
      <Link to="/projects" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all projects</Link>
      {project && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p className="text-text-secondary">{project.description}</p>
          <div className="flex flex-wrap gap-2 my-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
            ))}
          </div>
          {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-primary mr-4">View Demo</a>}
          {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary">View on GitHub</a>}
        </div>
      )}
      <ReactMarkdown 
        className="prose max-w-none" 
        remarkPlugins={[remarkGfm]}
      >
        {projectContent}
      </ReactMarkdown>
    </div>
  );
};

export default ProjectView;
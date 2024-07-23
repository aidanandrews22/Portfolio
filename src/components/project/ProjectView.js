import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/aidanandrews22/website-data/main';

const HeaderRenderer = ({ level, children }) => {
  const Tag = `h${level}`;
  const className = level <= 2 ? 'border-b pb-2 mb-4' : '';
  return <Tag className={className}>{children}</Tag>;
};

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1 rounded-md bg-gray-300 text-text-secondary opacity-50 hover:opacity-100 transition-opacity"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  );
};

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
      <div className="prose max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <HeaderRenderer level={1} {...props} />,
            h2: ({ node, ...props }) => <HeaderRenderer level={2} {...props} />,
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="not-prose relative">
                  <CopyButton content={String(children)} />
                  <SyntaxHighlighter
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.375rem',
                      background: '#f6f8fa',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {projectContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ProjectView;
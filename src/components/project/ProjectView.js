import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { fetchContent } from '../../services/DataService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import all available styles
import * as styles from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import common languages
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';

// Register the languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('cpp', cpp);

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
      className="absolute top-2 right-2 p-1 rounded-md bg-gray-300 text-white opacity-50 hover:opacity-100 transition-opacity"
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
  const [selectedStyle, setSelectedStyle] = useState(() => {
    return localStorage.getItem('selectedCodeStyle') || 'oneLight';
  });
  const { projectId } = useParams();

  useEffect(() => {
    const loadProjectContent = async () => {
      try {
        const content = await fetchContent('project', projectId);
        setProjectContent(content);
      } catch (err) {
        console.error('Error fetching project content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjectContent();
  }, [projectId]);

  useEffect(() => {
    localStorage.setItem('selectedCodeStyle', selectedStyle);
  }, [selectedStyle]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const project = projects.find(p => p.id === projectId);

  return (
    <div>
      <Link to="/projects" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all projects</Link>
      {project && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p className="text-text-secondary">{project.description}</p>
          <div className="flex flex-wrap gap-2 my-2">
            {project.tags && project.tags.map((tag, index) => (
              <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
            ))}
          </div>
          {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-primary mr-4">View Demo</a>}
          {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary">View on GitHub</a>}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="styleSelect" className="mr-2">Select Code Block Style:</label>
        <select
          id="styleSelect"
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="border rounded p-1"
        >
          {Object.keys(styles).map((styleName) => (
            <option key={styleName} value={styleName}>
              {styleName}
            </option>
          ))}
        </select>
      </div>
      <hr className="my-8 border-t border-gray-300" />
      {projectContent ? (
        <ReactMarkdown
          className="prose max-w-none"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : ''
              return !inline ? (
                <div className="relative">
                  <CopyButton content={String(children)} />
                  <SyntaxHighlighter
                    style={styles[selectedStyle]}
                    language={language}
                    PreTag="div"
                    className="rounded-lg"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {projectContent}
        </ReactMarkdown>
      ) : (
        <p>No content available for this project.</p>
      )}
    </div>
  );
};

export default ProjectView;

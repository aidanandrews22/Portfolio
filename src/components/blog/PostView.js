import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { fetchContent } from '../../services/DataService';
import { useAuth } from '../../context/AuthContext';
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

const PostView = () => {
  const { user, isAdmin } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(() => {
    return localStorage.getItem('selectedCodeStyle') || 'oneLight';
  });
  const { postId } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const content = await fetchContent('post', postId);
        setPost({ id: postId, content });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  useEffect(() => {
    localStorage.setItem('selectedCodeStyle', selectedStyle);
  }, [selectedStyle]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div>
      <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
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
      <div className="mt-10 prose max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h1: ({node, ...props}) => (
              <div>
                <h1 {...props} />
                <hr className="mt-4 mb-4" />
              </div>
            ),
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
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      {user && isAdmin && (
        <Link to={`/blog/${postId}/edit`} className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Edit Post
        </Link>
      )}
    </div>
  );
};

export default PostView;

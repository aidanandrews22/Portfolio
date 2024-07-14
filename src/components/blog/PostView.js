import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../../context/AppContext';

const PostView = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const { showLoading, hideLoading, showError, clearError } = useAppContext();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    clearError();
    showLoading();
    try {
      const response = await fetch(`/content/blog/${postId}.md`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const content = await response.text();
      setPost({ id: postId, content });
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  };

  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
      <ReactMarkdown 
        className="prose max-w-none"
        components={{
          h1: ({node, ...props}) => props.children ? <h1 className="text-3xl font-bold mb-4" {...props} /> : null,
          h2: ({node, ...props}) => props.children ? <h2 className="text-2xl font-semibold mb-3 mt-6" {...props} /> : null,
          a: ({node, ...props}) => props.children ? <a className="text-primary hover:underline" {...props} /> : null,
          p: ({node, ...props}) => <p className="mb-4" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default PostView;
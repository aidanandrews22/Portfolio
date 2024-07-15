import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PostView = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/content/posts/${postId}.md`);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const content = await response.text();
      console.log('Fetched content:', content);
      setPost({ id: postId, content });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
      <ReactMarkdown 
        className="prose max-w-none" 
        remarkPlugins={[remarkGfm]}
      >
        {post.content}
      </ReactMarkdown>
      <Link to={`/blog/${postId}/edit`} className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
        Edit Post
      </Link>
    </div>
  );
};

export default PostView;
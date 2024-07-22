import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import ReactMarkdown from 'react-markdown';
import fetchPosts from '../../pages/Blog';

// Configure AWS
AWS.config.update({
  region: 'us-east-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:c920fd61-bcd8-43c9-b214-f713ed6539ca'
  })
});

const lambda = new AWS.Lambda();

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/aidanandrews22/website-data/main';

const PostEdit = () => {
  const [post, setPost] = useState({ title: '', content: '', category: 'Misc' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    if (postId && postId !== 'new') {
      try {
        const response = await fetch(`${CONTENT_BASE_URL}/content/posts/${postId}.md`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const content = await response.text();
        const title = content.split('\n')[0].replace('#', '').trim();
        const bodyContent = content.split('\n').slice(1).join('\n').trim();
        setPost({ id: postId, title, content: bodyContent, category: 'Misc' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newContent = 
        post.content.substring(0, selectionStart) + 
        '\t' + 
        post.content.substring(selectionEnd);
      
      setPost(prevPost => ({ ...prevPost, content: newContent }));
      
      // Set cursor position after inserted tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullContent = `# ${post.title}\n\n${post.content}`;

    const params = {
      FunctionName: 'saveContentFunction',
      Payload: JSON.stringify({
        content: fullContent,
        title: post.title,
        category: post.category,
        password: password,
        contentId: postId === 'new' ? null : postId,
        contentType: 'post'
      })
    };

    try {
      const response = await lambda.invoke(params).promise();
      const result = JSON.parse(response.Payload);

      if (result.statusCode === 200) {
        await fetchPosts();
        navigate('/blog');
      } else if (result.statusCode === 401) {
        setError('Incorrect password. Please try again.');
      } else {
        throw new Error(result.body ? JSON.parse(result.body).error : 'An unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          name="category"
          value={post.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Misc">Misc</option>
          <option value="CS">CS</option>
          <option value="ML">ML</option>
          <option value="Physics">Physics</option>
        </select>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {isPreview ? (
          <div className="prose mt-4 p-4 border rounded-md">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            onKeyDown={handleTabKey}
            rows="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  );
};

export default PostEdit;
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchContent, saveContent } from '../../services/DataService';
import { useDataReload } from '../../hooks/useDataReload';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const PostEdit = () => {
  const [post, setPost] = useState({ title: '', content: '', category: 'Misc' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const reloadData = useDataReload();
  const { user, isAdmin, loading: authLoading } = useAuth();

  const fetchPost = useCallback(async () => {
    if (postId && postId !== 'new') {
      try {
        const content = await fetchContent('post', postId);
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
    if (!authLoading) {
      if (!user || !isAdmin) {
        navigate('/blog');
      } else {
        fetchPost();
      }
    }
  }, [fetchPost, user, isAdmin, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
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
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const fullContent = `# ${post.title}\n\n${post.content}`;

    try {
      await saveContent('post', postId === 'new' ? `post${Date.now()}` : postId, fullContent, post.title, post.category);
      await reloadData();
      navigate('/blog');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

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
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/blog')}
          className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
};

export default PostEdit;
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from '../components/blog/PostList';
import PostView from '../components/blog/PostView';
import GraphView from '../components/common/GraphView';
import { useAppContext } from '../context/AppContext';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const { loading, error, showLoading, hideLoading, showError, clearError } = useAppContext();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    clearError();
    showLoading();
    try {
      const response = await fetch('/blog-posts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  }, [clearError, showLoading, showError, hideLoading]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const categories = ['Misc', 'CS', 'ML', 'Physics'];

    categories.forEach(category => {
      nodes.push({ id: category, name: category, isCategory: true });
    });

    posts.forEach(post => {
      nodes.push({ id: post.id, name: post.title, isCategory: false });
      links.push({ source: post.category, target: post.id, distance: 50 });
    });

    // Add links between categories
    for (let i = 0; i < categories.length; i++) {
      for (let j = i + 1; j < categories.length; j++) {
        links.push({ source: categories[i], target: categories[j], distance: 100 });
      }
    }

    return { nodes, links };
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {showGraph ? 'Show List' : 'Show Graph'}
        </button>
      </div>
      {showGraph ? (
        <GraphView data={graphData} type="blog" />
      ) : (
        <Routes>
          <Route index element={<PostList posts={posts} />} />
          <Route path=":postId" element={<PostView />} />
        </Routes>
      )}
    </div>
  );
};

export default Blog;
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import PostList from '../components/blog/PostList';
import PostView from '../components/blog/PostView';
import PostEdit from '../components/blog/PostEdit';
import GraphView from '../components/common/GraphView';
import { useAppContext } from '../context/AppContext';

const CACHE_KEY = 'blogPosts';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lastViewedPost, setLastViewedPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { showLoading, hideLoading, showError, clearError } = useAppContext();
  const [isFetching, setIsFetching] = useState(false);

  const isEditMode = location.pathname.includes('/edit') || location.pathname.includes('/new');
  const isViewingPost = location.pathname.split('/').length > 2 && !isEditMode;

  const fetchPosts = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    clearError();
    showLoading();

    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          console.log('Using cached blog posts data');
          setPosts(data);
          hideLoading();
          setIsFetching(false);
          return;
        }
      }

      console.log('Fetching fresh blog posts data');
      const response = await fetch('/blog-posts.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      console.error('Fetch failed:', err);
      showError("Failed to load blog posts. Please try again later.");
    } finally {
      hideLoading();
      setIsFetching(false);
    }
  }, [clearError, showLoading, hideLoading, showError]);

  useEffect(() => {
    fetchPosts();
    const storedLastViewedPost = localStorage.getItem('lastViewedPost');
    if (storedLastViewedPost) {
      setLastViewedPost(JSON.parse(storedLastViewedPost));
    }
  }, [fetchPosts]);

  useEffect(() => {
    const postId = location.pathname.split('/').pop();
    if (postId && postId !== 'new' && postId !== 'edit') {
      const currentPost = posts.find(post => post.id === postId);
      if (currentPost) {
        setLastViewedPost(currentPost);
        localStorage.setItem('lastViewedPost', JSON.stringify(currentPost));
      }
    }
  }, [location, posts]);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const categories = ['Misc', 'CS', 'ML', 'Physics'];

    categories.forEach(category => {
        if (selectedCategory === 'All' || category === selectedCategory) {
          nodes.push({ id: category, name: category, isCategory: true });
        }
    });

    posts.forEach(post => {
        if (selectedCategory === 'All' || post.category === selectedCategory) {
          nodes.push({ id: post.id, name: post.title, isCategory: false });
          links.push({ source: post.category, target: post.id, distance: 50 });
        }
    });

    return { nodes, links };
  }, [posts, selectedCategory]);

  const filteredPosts = useMemo(() => {
    return selectedCategory === 'All'
      ? posts
      : posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchPosts();
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <div className="space-x-2">
          {!isEditMode && !isViewingPost && (
            <>
              <button
                onClick={() => setShowGraph(!showGraph)}
                className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
              >
                {showGraph ? 'Show List' : 'Show Graph'}
              </button>
              <Link 
                to="/blog/new" 
                className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
              >
                New Post
              </Link>
              <button
                onClick={clearCache}
                className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
              >
                Clear Cache and Reload
              </button>
            </>
          )}
          {isEditMode && (
            <button
              onClick={() => navigate('/blog')}
              className="bg-secondary text-text-secondary px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
            >
              Back to All Posts
            </button>
          )}
        </div>
      </div>
      {!isEditMode && !isViewingPost && lastViewedPost && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Last Viewed Post:</h3>
          <Link to={`/blog/${lastViewedPost.id}`} className="text-primary hover:underline">
            {lastViewedPost.title}
          </Link>
        </div>
      )}
      {!isEditMode && (
        <div className="mb-4 flex space-x-2">
          {['All', 'Misc', 'CS', 'ML', 'Physics'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-text-secondary hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {showGraph && !isEditMode ? (
        <GraphView data={graphData} type="blog" />
      ) : (
        <Routes>
          <Route index element={<PostList posts={filteredPosts} />} />
          <Route path=":postId" element={<PostView />} />
          <Route path=":postId/edit" element={<PostEdit onUpdate={fetchPosts} />} />
          <Route path="new" element={<PostEdit onUpdate={fetchPosts} />} />
        </Routes>
      )}
    </div>
  );
};

export default Blog;
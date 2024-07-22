import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import PostList from '../components/blog/PostList';
import PostView from '../components/blog/PostView';
import PostEdit from '../components/blog/PostEdit';
import GraphView from '../components/common/GraphView';

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/aidanandrews22/website-data/main';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${CONTENT_BASE_URL}/content/posts.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading blog posts...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const graphData = {
    nodes: [
      ...['Misc', 'CS', 'ML', 'Physics'].map(category => ({ id: category, name: category, isCategory: true })),
      ...filteredPosts.map(post => ({ id: post.id, name: post.title, isCategory: false }))
    ],
    links: filteredPosts.map(post => ({ source: post.category, target: post.id, distance: 50 }))
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <div className="space-x-2">
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
        </div>
      </div>
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
      {showGraph ? (
        <GraphView data={graphData} type="blog" />
      ) : (
        <Routes>
          <Route index element={<PostList posts={filteredPosts} />} />
          <Route path=":postId" element={<PostView posts={posts} />} />
          <Route path=":postId/edit" element={<PostEdit />} />
          <Route path="new" element={<PostEdit />} />
        </Routes>
      )}
    </div>
  );
};

export default Blog;
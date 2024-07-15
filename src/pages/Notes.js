import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import NoteList from '../components/notes/NoteList';
import NoteView from '../components/notes/NoteView';
import NoteEdit from '../components/notes/NoteEdit';
import GraphView from '../components/common/GraphView';
import { useAppContext } from '../context/AppContext';

const CACHE_KEY = 'notesList';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const navigate = useNavigate();
  const { showLoading, hideLoading, showError, clearError } = useAppContext();
  const [isFetching, setIsFetching] = useState(false);

  const isEditMode = location.pathname.includes('/edit') || location.pathname.includes('/new');

  const fetchNotes = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    clearError();
    showLoading();

    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          console.log('Using cached notes data');
          setNotes(data);
          hideLoading();
          setIsFetching(false);
          return;
        }
      }

      console.log('Fetching fresh notes data');
      const response = await fetch('/notes.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      console.error('Fetch failed:', err);
      showError("Failed to load notes. Please try again later.");
    } finally {
      hideLoading();
      setIsFetching(false);
    }
  }, [clearError, showLoading, hideLoading, showError]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const categories = ['School', 'Work', 'Personal', 'Misc'];

    categories.forEach(category => {
        if (selectedCategory === 'All' || category === selectedCategory) {
          nodes.push({ id: category, name: category, isCategory: true });
        }
    });
  
    notes.forEach(note => {
        if (selectedCategory === 'All' || note.category === selectedCategory) {
          nodes.push({ id: note.id, name: note.title, isCategory: false });
          links.push({ source: note.category, target: note.id, distance: 50 });
        }
    });

    return { nodes, links };
  }, [notes, selectedCategory]);

  const filteredNotes = useMemo(() => {
    return selectedCategory === 'All'
      ? notes
      : notes.filter(note => note.category === selectedCategory);
  }, [notes, selectedCategory]);

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchNotes();
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <div className="space-x-2">
          {!isEditMode && (
            <>
              <button
                onClick={() => setShowGraph(!showGraph)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {showGraph ? 'Show List' : 'Show Graph'}
              </button>
              <Link 
                to="/notes/new" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                New Note
              </Link>
              <button
                onClick={clearCache}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Clear Cache and Reload
              </button>
            </>
          )}
          {isEditMode && (
            <button
              onClick={() => navigate('/notes')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Back to All Notes
            </button>
          )}
        </div>
      </div>
      {!isEditMode && (
        <div className="mb-4 flex space-x-2">
          {['All', 'School', 'Work', 'Personal', 'Misc'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {showGraph && !isEditMode ? (
        <GraphView data={graphData} type="notes" />
      ) : (
        <Routes>
          <Route index element={<NoteList notes={filteredNotes} />} />
          <Route path=":noteId" element={<NoteView />} />
          <Route path=":noteId/edit" element={<NoteEdit onUpdate={fetchNotes} />} />
          <Route path="new" element={<NoteEdit onUpdate={fetchNotes} />} />
        </Routes>
      )}
    </div>
  );
};

export default Notes;
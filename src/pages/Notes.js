import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import NoteList from '../components/notes/NoteList';
import NoteView from '../components/notes/NoteView';
import NoteEdit from '../components/notes/NoteEdit';
import GraphView from '../components/common/GraphView';

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/aidanandrews22/website-data/main';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${CONTENT_BASE_URL}/content/notes.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredNotes = selectedCategory === 'All'
    ? notes
    : notes.filter(note => note.category === selectedCategory);

  const graphData = {
    nodes: [
      ...['School', 'Work', 'Personal', 'Misc'].map(category => ({ id: category, name: category, isCategory: true })),
      ...filteredNotes.map(note => ({ id: note.id, name: note.title, isCategory: false }))
    ],
    links: filteredNotes.map(note => ({ source: note.category, target: note.id, distance: 50 }))
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
          >
            {showGraph ? 'Show List' : 'Show Graph'}
          </button>
          <Link 
            to="/notes/new" 
            className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
          >
            New Note
          </Link>
        </div>
      </div>
      <div className="mb-4 flex space-x-2">
        {['All', 'School', 'Work', 'Personal', 'Misc'].map(category => (
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
        <GraphView data={graphData} type="notes" />
      ) : (
        <Routes>
          <Route index element={<NoteList notes={filteredNotes} />} />
          <Route path=":noteId" element={<NoteView notes={notes} />} />
          <Route path=":noteId/edit" element={<NoteEdit />} />
          <Route path="new" element={<NoteEdit />} />
        </Routes>
      )}
    </div>
  );
};

export default Notes;
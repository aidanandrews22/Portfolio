import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NoteList from '../components/notes/NoteList';
import NoteView from '../components/notes/NoteView';
import NoteEdit from '../components/notes/NoteEdit';
import GraphView from '../components/common/GraphView';
import { useAppContext } from '../context/AppContext';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const { loading, error, showLoading, hideLoading, showError, clearError } = useAppContext();

  const fetchNotes = useCallback(async () => {
    clearError();
    showLoading();
    try {
      const response = await fetch('/notes.json');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  }, [clearError, showLoading, showError, hideLoading]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const categories = ['School', 'Work', 'Misc', 'Personal'];

    categories.forEach(category => {
      nodes.push({ id: category, name: category, isCategory: true });
    });

    notes.forEach(note => {
      nodes.push({ id: note.id, name: note.title, isCategory: false });
      links.push({ source: note.category, target: note.id, distance: 50 });
    });

    // Add links between categories
    for (let i = 0; i < categories.length; i++) {
      for (let j = i + 1; j < categories.length; j++) {
        links.push({ source: categories[i], target: categories[j], distance: 100 });
      }
    }

    return { nodes, links };
  }, [notes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <div className="space-x-2">
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
        </div>
      </div>
      {showGraph ? (
        <GraphView data={graphData} type="notes" />
      ) : (
        <Routes>
          <Route index element={<NoteList notes={notes} />} />
          <Route path=":noteId" element={<NoteView />} />
          <Route path=":noteId/edit" element={<NoteEdit />} />
          <Route path="new" element={<NoteEdit />} />
        </Routes>
      )}
    </div>
  );
};

export default Notes;
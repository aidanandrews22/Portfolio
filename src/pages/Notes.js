import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import { useDataReload } from '../hooks/useDataReload';
import NoteList from '../components/notes/NoteList';
import NoteView from '../components/notes/NoteView';
import NoteEdit from '../components/notes/NoteEdit';
import GraphView from '../components/common/GraphView';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Notes = () => {
  const { notes, loading, error } = useDataContext();
  const reloadData = useDataReload();
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lastViewedNote, setLastViewedNote] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedLastViewedNote = localStorage.getItem('lastViewedNote');
    if (storedLastViewedNote) {
      setLastViewedNote(JSON.parse(storedLastViewedNote));
    }
  }, []);

  const updateLastViewedNote = useCallback((noteId) => {
    if (noteId && noteId !== 'new' && noteId !== 'edit') {
      const currentNote = notes.find(note => note.id === noteId);
      if (currentNote) {
        setLastViewedNote(currentNote);
        localStorage.setItem('lastViewedNote', JSON.stringify(currentNote));
      }
    }
  }, [notes]);

  useEffect(() => {
    const noteId = location.pathname.split('/').pop();
    updateLastViewedNote(noteId);
  }, [location, updateLastViewedNote]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

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

  const isEditMode = location.pathname.includes('/edit') || location.pathname.includes('/new');
  const isViewingNote = location.pathname.split('/').length > 2 && !isEditMode;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <div className="space-x-2">
          <button
            onClick={reloadData}
            className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
          >
            Reload Data
          </button>
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
      {!isEditMode && !isViewingNote && lastViewedNote && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Last Viewed Note:</h3>
          <Link to={`/notes/${lastViewedNote.id}`} className="text-primary hover:underline">
            {lastViewedNote.title}
          </Link>
        </div>
      )}
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
          <Route path=":noteId" element={<NoteView />} />
          <Route path=":noteId/edit" element={<NoteEdit />} />
          <Route path="new" element={<NoteEdit />} />
        </Routes>
      )}
    </div>
  );
};

export default Notes;
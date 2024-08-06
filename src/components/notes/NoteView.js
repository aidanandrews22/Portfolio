import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchContent } from '../../services/DataService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Preview from '../markdown/Preview';

const NoteView = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noteId } = useParams();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const noteData = await fetchContent('note', noteId);
        setNote(noteData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching note:', err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };

    loadNote();
  }, [noteId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!note) return <ErrorMessage message="Note not found" />;

  return (
    <div>
      <Link to="/notes" className="text-primary hover:underline mb-10 inline-block">&larr; Back to all notes</Link>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{note.title}</h1>
        <div className="text-sm text-gray-600">
          <span>Created on: {new Date(note.date).toLocaleDateString()}</span>
          <span className="mx-2">|</span>
          <span>Category: {note.category}</span>
        </div>
      </div>
      <hr />
      <div className="mt-10 prose max-w-none">
        <Preview doc={note.content} />
      </div>
    </div>
  );
};

export default NoteView;
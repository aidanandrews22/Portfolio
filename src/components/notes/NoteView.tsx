import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchContent, isUserAdmin } from '../../services/DataService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useAuth } from '../../context/AuthContext';
import Preview from '../markdown/Preview';

interface Note {
  title: string;
  content: string;
  category: string;
  date: string;
  lastEdited?: string;
  userId: string;
}

const NoteView: React.FC = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { noteId } = useParams<{ noteId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const noteData = await fetchContent('note', noteId as string);
        setNote(noteData as Note);
        const adminStatus = await isUserAdmin();
        setIsAdmin(adminStatus);
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

  const canEdit = isAdmin || (user && user.uid === note.userId);

  return (
    <div>
      <Link to="/notes" className="text-primary hover:underline mb-10 inline-block">&larr; Back to all notes</Link>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{note.title}</h1>
        <div className="text-sm text-gray-600">
          <span>Created on: {new Date(note.date).toLocaleDateString()}</span>
          <span className="mx-2">|</span>
          <span>Category: {note.category}</span>
          {note.lastEdited && (
            <>
              <span className="mx-2">|</span>
              <span>Last edited: {new Date(note.lastEdited).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="mt-10 prose max-w-none">
        <Preview doc={note.content} />
      </div>
      {canEdit && (
        <Link to={`/notes/${noteId}/edit`} className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Edit Note
        </Link>
      )}
    </div>
  );
};

export default NoteView;
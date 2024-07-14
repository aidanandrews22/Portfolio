import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const NoteView = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noteId } = useParams();

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  const fetchNote = async () => {
    try {
      const response = await fetch(`/content/notes/${noteId}.md`);
      if (!response.ok) {
        throw new Error('Failed to fetch note');
      }
      const content = await response.text();
      setNote({ id: noteId, content });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading note...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div>
      <Link to="/notes" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all notes</Link>
      <ReactMarkdown 
        className="prose max-w-none" 
        remarkPlugins={[remarkGfm]}
      >
        {note.content}
      </ReactMarkdown>
      <Link to={`/notes/${noteId}/edit`} className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
        Edit Note
      </Link>
    </div>
  );
};

export default NoteView;
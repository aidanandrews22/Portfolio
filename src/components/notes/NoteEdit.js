import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchContent, saveContent } from '../../services/DataService';
import { useDataReload } from '../../hooks/useDataReload';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const NoteEdit = () => {
  const [note, setNote] = useState({ title: '', content: '', category: 'Misc' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const reloadData = useDataReload();

  const fetchNote = useCallback(async () => {
    if (noteId && noteId !== 'new') {
      try {
        const content = await fetchContent('note', noteId);
        const title = content.split('\n')[0].replace('#', '').trim();
        const bodyContent = content.split('\n').slice(1).join('\n').trim();
        setNote({ id: noteId, title, content: bodyContent, category: 'Misc' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newContent = 
        note.content.substring(0, selectionStart) + 
        '\t' + 
        note.content.substring(selectionEnd);
      
      setNote(prevNote => ({ ...prevNote, content: newContent }));
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const fullContent = `# ${note.title}\n\n${note.content}`;

    try {
      await saveContent('note', noteId === 'new' ? null : noteId, fullContent, note.title, note.category, password);
      await reloadData();
      navigate('/notes');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={note.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          name="category"
          value={note.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Misc">Misc</option>
          <option value="School">School</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {isPreview ? (
          <div className="prose mt-4 p-4 border rounded-md">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            onKeyDown={handleTabKey}
            rows="10"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/notes')}
          className="bg-secondary text-text-secondary px-4 py-2 rounded transition hover:bg-gray-300 duration-300"
        >
          Cancel
        </button>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteEdit;

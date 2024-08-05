import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchContent, saveContent, isUserAdmin } from '../../services/DataService';
import { useDataReload } from '../../hooks/useDataReload';
import { useAuth } from '../../context/AuthContext';
import CodeMirrorEditor from '../markdown/CodeMirrorEditor';
import Preview from '../markdown/Preview';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface Note {
  title: string;
  content: string;
  category: string;
  isPublic: boolean;
}

interface SaveContentResult {
  success: boolean;
  id?: string;
}


const NoteEdit: React.FC = () => {
  const [note, setNote] = useState<Note>({ title: '', content: '', category: 'Misc', isPublic: false });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const reloadData = useDataReload();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isUserAdmin();
      setIsAdmin(adminStatus);
    };
    checkAdminStatus();
  }, []);

  const fetchNote = useCallback(async () => {
    if (noteId && noteId !== 'new') {
      try {
        const fetchedNote = await fetchContent('note', noteId);
        setNote({
          title: fetchedNote.title,
          content: fetchedNote.content,
          category: fetchedNote.category || 'Misc',
          isPublic: fetchedNote.isPublic || false
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
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

  const handleChange = useCallback((newContent: string) => {
    setNote(prevNote => ({ ...prevNote, content: newContent }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
  
    try {
      const result: SaveContentResult = await saveContent(
        'note', 
        noteId === 'new' ? null : noteId, 
        note.content, 
        note.title, 
        note.category, 
        note.isPublic
      );
      if (result.id) {
        navigate(`/notes/${result.id}`);
      }
      await reloadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
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
          onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
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
          onChange={(e) => setNote(prev => ({ ...prev, category: e.target.value }))}
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
          <Preview doc={note.content} />
        ) : (
          <CodeMirrorEditor
            initialDoc={note.content}
            onChange={handleChange}
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
        {isAdmin && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={note.isPublic}
            onChange={(e) => setNote(prev => ({ ...prev, isPublic: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">Make this note public</label>
        </div>
      )}
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
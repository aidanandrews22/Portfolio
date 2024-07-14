import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  region: 'us-east-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:c920fd61-bcd8-43c9-b214-f713ed6539ca'
  })
});

const lambda = new AWS.Lambda();

const NoteEdit = () => {
  const [note, setNote] = useState({ title: '', content: '', category: 'Misc' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId && noteId !== 'new') {
      fetchNote();
    } else {
      setLoading(false);
    }
  }, [noteId]);

  const fetchNote = async () => {
    try {
      const response = await fetch(`/content/notes/${noteId}.md`);
      if (!response.ok) {
        throw new Error('Failed to fetch note');
      }
      const content = await response.text();
      const title = content.split('\n')[0].replace('#', '').trim();
      setNote({ id: noteId, title, content, category: 'Misc' }); // You might want to fetch category from somewhere
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const params = {
      FunctionName: 'saveNoteFunction',
      Payload: JSON.stringify({
        content: note.content,
        title: note.title,
        category: note.category,
        password: password,
        noteId: noteId === 'new' ? null : noteId
      })
    };

    try {
      const response = await lambda.invoke(params).promise();
      const result = JSON.parse(response.Payload);

      if (result.statusCode === 200) {
        navigate('/notes');
      } else if (result.statusCode === 401) {
        setError('Incorrect password. Please try again.');
      } else {
        throw new Error(result.body ? JSON.parse(result.body).error : 'An unknown error occurred');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="Misc">Misc</option>
          <option value="School">School</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          name="content"
          value={note.content}
          onChange={handleChange}
          rows="10"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark" disabled={loading}>
        {loading ? 'Saving...' : 'Save Note'}
      </button>
    </form>
  );
};

export default NoteEdit;
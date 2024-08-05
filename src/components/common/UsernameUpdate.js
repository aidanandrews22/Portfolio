import React, { useState } from 'react';
import { updateUsername } from '../auth';
import { useAuth } from '../context/AuthContext';

const UsernameUpdate = () => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await updateUsername(user.uid, newUsername);
      setSuccess(true);
      setNewUsername('');
    } catch (err) {
      setError('Failed to update username. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Username</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Username updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="New username"
          required
        />
        <button type="submit">Update Username</button>
      </form>
    </div>
  );
};

export default UsernameUpdate;
import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes }) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white shadow rounded-lg p-4">
          <Link to={`/notes/${note.id}`} className="text-lg font-semibold text-primary">
            {note.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(note.date).toLocaleDateString()} - {note.category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
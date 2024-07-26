import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = (newPosts, newNotes) => {
    setPosts(newPosts);
    setNotes(newNotes);
  };

  return (
    <DataContext.Provider value={{ 
      posts, 
      notes, 
      loading, 
      error, 
      setLoading, 
      setError,
      updateData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
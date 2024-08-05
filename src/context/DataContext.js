import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllData } from '../services/DataService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ posts: [], projects: [], notes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchAllData();
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateData = (newData) => {
    setData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <DataContext.Provider value={{ ...data, loading, error, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
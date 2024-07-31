import { useCallback } from 'react';
import { useDataContext } from '../context/DataContext';
import { fetchAllData } from '../services/DataService';

export const useDataReload = () => {
  const { updateData, setLoading, setError } = useDataContext();

  const reloadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { posts, notes } = await fetchAllData();
      updateData(posts, notes);
    } catch (err) {
      setError(err.message);
    } finally { 
      setLoading(false);
    }
  }, [updateData, setLoading, setError]);

  return reloadData;
};

import React, { useState } from 'react';
import { useCallback } from 'react';

export const useDataReload = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadData = useCallback(async () => {
    window.location.reload();
    setLoading(true);
    setError(null);
  }, [setLoading, setError]);

  return reloadData;
};

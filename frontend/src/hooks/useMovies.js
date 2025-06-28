import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_ENDPOINTS } from '../config/api.config';

export const useMovies = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint, {
          params: {
            api_key: API_KEY,
            language: 'fr-FR',
            ...params
          }
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}; 
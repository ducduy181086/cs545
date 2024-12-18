import { useState, useEffect } from 'react';
import api from '../services/api'; 

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api(url, options);
        if (isMounted) {
          setData(response.data); 
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message); 
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]); 

  return { data, loading, error };
};

export default useFetch;

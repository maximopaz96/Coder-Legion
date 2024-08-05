import { useState, useEffect } from 'react';

const ConGener = (queryParams = {}) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await fetch(`/api/genres?${queryString}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGenres(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [queryParams]);

  return { genres, loading, error };
};

export default ConGener;
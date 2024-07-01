import { useState, useEffect } from 'react';

const useDailyFetch = (url, fetchId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let fetchKey = fetchId || 'dailyData';
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const localData = JSON.parse(localStorage.getItem(fetchKey));
        const lastFetch = localStorage.getItem(fetchKey + '-lastFetch');

        if (localData && lastFetch && new Date().getTime() - new Date(lastFetch).getTime() < 24 * 60 * 60 * 1000) {
          setData(localData);
        } else {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const newData = await response.json();
          setData(newData);
          localStorage.setItem('dailyData', JSON.stringify(newData));
          localStorage.setItem('lastFetch', new Date().toISOString());
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDailyFetch;
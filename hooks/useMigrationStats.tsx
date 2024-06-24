import { useState, useEffect } from 'react';

const useMigrationStats = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/crescendo');
        const result = await response.json();

        if (result.error) {
          setError(result.error);
        } else {
          const parsedData = result.rows.map(row => row[0]);
          setData(parsedData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useMigrationStats;

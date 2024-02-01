import { useEffect, useState } from 'react';

const useFetchCategories = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) {
          throw new Error(`Something went wrong! Status: ${res.status}`);
        }
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message);
        } else {
          console.error('An unexpected error occurred');
          setError('An unexpected error occurred');
        }
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { countries, loading, error, setLoading };
};

export default useFetchCategories;

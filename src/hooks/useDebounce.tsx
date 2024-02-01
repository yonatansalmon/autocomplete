import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const executeCB = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      //Restart timeout on typing
      clearTimeout(executeCB);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

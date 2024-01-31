import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import LoadingAndError from './LoadingAndError';
import useDebounce from '../hooks/useDebounce';
import useFetchCategories from '../hooks/useFetchCategories';
import { Country } from '../types/interfaces';

const AutoComplete = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const debouncedQuery = useDebounce(query, 800);
  const { countries, loading, error, setLoading } = useFetchCategories();

  const displayCountries = (newQuery: string) => {
    setLoading(true);
    const filteredData = countries.filter((country: Country) => country.name.common.toLowerCase().includes(newQuery.toLowerCase()));
    setFilteredData(filteredData);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (imageUrl: string, categoryName: string) => {
    setSelectedImage(imageUrl);
    setQuery(categoryName);
    setSelectedCategory(categoryName);
    setFilteredData([]);
  };

  useEffect(() => {
    if (debouncedQuery.length > 0 && debouncedQuery !== selectedCategory) {
      setSelectedImage('');
      displayCountries(debouncedQuery);
    } else if (debouncedQuery.length === 0) {
      setSelectedImage('');
      setFilteredData([]);
    }
  }, [debouncedQuery, countries]);

  if (loading || error) {
    return <LoadingAndError isLoading={loading} error={error} />;
  }

  return (
    <div className='autocomplete'>
      <h1 className='title'>Auto Complete</h1>
      <input type='text' value={query} onChange={handleInputChange} placeholder='Search...' />
      <ul data-testid="country-list"  style={{ display: filteredData.length > 0 ? 'block' : 'none' }}>
        {filteredData.map((country: Country, index) => (
          <li key={index} onClick={() => handleItemClick(country.flags.png, country.name.common)}>
            <ListItem item={country.name.common} query={query} />
          </li>
        ))}
      </ul>
      {selectedImage && <img className='selected-image' src={selectedImage} alt='Selected Food' />}
    </div>
  );
};

export default AutoComplete;

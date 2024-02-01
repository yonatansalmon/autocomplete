import React, { useState, useEffect } from 'react';
import { Country } from '../types/interfaces';
import ListItem from './ListItem';
import LoadingAndError from './LoadingAndError';
import useDebounce from '../hooks/useDebounce';
import useFetchCategories from '../hooks/useFetchCategories';

const AutoComplete = () => {
  const [query, setQuery] = useState('');
  const [autoCompleteCountries, setAutoCompleteCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ name: '', flag: '' });

  const { countries, loading, error, setLoading } = useFetchCategories();
  const inputValue = useDebounce(query, 800);

  const displayAutoComplete = (newQuery: string) => {
    setLoading(true);
    ///Matching all countries in countries state with input to display in autocomplete
    const autoCompleteCountries = countries.filter((country: Country) => country.name.common.toLowerCase().includes(newQuery.toLowerCase()));
    setAutoCompleteCountries(autoCompleteCountries);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (imageUrl: string, countryName: string) => {
    setSelectedCountry({ name: countryName, flag: imageUrl });
    setQuery(countryName);
    setAutoCompleteCountries([]);
  };

  useEffect(() => {
    if (inputValue.length > 0 && inputValue !== selectedCountry.name) {
      setSelectedCountry({ name: '', flag: '' });
      displayAutoComplete(inputValue);
    } else if (inputValue.length === 0) {
      setSelectedCountry({ name: '', flag: '' });
      setAutoCompleteCountries([]);
    }
  }, [inputValue, countries]);

  if (loading || error) {
    return <LoadingAndError isLoading={loading} error={error} />;
  }

  return (
    <div className='autocomplete'>
      <h1 className='title'>Auto Complete</h1>
      <input type='text' value={query} onChange={handleInputChange} placeholder='Search...' />
      <ul data-testid='country-list' style={{ display: autoCompleteCountries.length > 0 ? 'block' : 'none' }}>
        {autoCompleteCountries.map((country: Country, index) => (
          <li key={index} onClick={() => handleItemClick(country.flags.png, country.name.common)}>
            <ListItem item={country.name.common} query={query} />
          </li>
        ))}
      </ul>
      {selectedCountry.flag && <img className='selected-image' src={selectedCountry.flag} alt={selectedCountry.name} />}
    </div>
  );
};

export default AutoComplete;

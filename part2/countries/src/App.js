import React, { useEffect, useState } from 'react';

import Countries from './components/Countries';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleCountryBtn = (countryName) => {
    setNewFilter(countryName);
  };

  return (
    <div>
      <Filter filter={newFilter} filterOnChange={handleFilterChange} />
      <Countries
        countries={countriesToShow}
        handleCountryClick={handleCountryBtn}
      />
    </div>
  );
};

export default App;

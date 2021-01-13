import Country from './Country';
import CountryOnClick from './CountryOnClick';
import React from 'react';

const Countries = ({ countries, handleCountryClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  /*
  CountryOnClick btn => setNewFilter(countryName) 
  => value={countryName} = (countries.length === 1) => Country
   */
  return (
    <div>
      {countries.map((country) => (
        <CountryOnClick
          key={country.name}
          country={country}
          handleCountryClick={handleCountryClick}
        />
      ))}
    </div>
  );
};

export default Countries;

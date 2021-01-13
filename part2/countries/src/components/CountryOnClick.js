import React from 'react';

const CountryOnClick = ({ country, handleCountryClick }) => {
  return (
    <p>
      {country.name}{' '}
      <button onClick={() => handleCountryClick(country.name)}>show</button>
    </p>
  );
};

export default CountryOnClick;

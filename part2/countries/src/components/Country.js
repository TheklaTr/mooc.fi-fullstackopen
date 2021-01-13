import React, { useEffect, useState } from 'react';

import Weather from './Weather';
import axios from 'axios';

const Country = ({ country }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        // `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`
        'http://api.weatherstack.com/current',
        {
          params: {
            access_key: process.env.REACT_APP_WEATHER_API_KEY,
            query: country.capital,
          },
        }
      )
      .then((res) => setCurrentWeather(res.data.current));
  }, [country]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="20%" alt={country.name} />
      <h3>Weather in {country.capital}</h3>
      <Weather weather={currentWeather} />
    </div>
  );
};

export default Country;

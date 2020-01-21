import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = event => {
    setSearchCountry(event.target.value);
  };

  return (
    <div>
      <h2>Country Data</h2>
      <form>
        <input
          value={searchCountry}
          onChange={handleSearch}
          placeholder={`Search here...`}
        />
      </form>
      <Countries
        searchCountry={searchCountry}
        countries={countries}
        setSearchCountry={setSearchCountry}
      />
    </div>
  );
};

export default App;

const Countries = ({ searchCountry, countries, setSearchCountry }) => {
  const result = countries
    .filter(country =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase())
    )
    .map(country => <Country country={country} key={country.name} />);

  return result.length > 100 ? (
    result
  ) : searchCountry.length > 0 && result.length > 10 ? (
    `Too many matches, specify another filter!`
  ) : searchCountry.length > 0 && result.length === 1 ? (
    <>
      {" "}
      <Details result={result} />
    </>
  ) : searchCountry.length > 0 && result.length < 10 ? (
    <>
      <ResultsWithButtons
        result={result}
        setSearchCountry={setSearchCountry}
        key={uuid()}
      />
    </>
  ) : (
    result
  );
};

const Details = ({ result }) => {
  const name = result[0].props.country.name;
  const capital = result[0].props.country.capital;
  const population = result[0].props.country.population;
  const country = result[0].props.country;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${capital}`
      )
      .then(response => {
        setWeather(response.data.current);
      })
      .catch(err => {
        console.log(err);
      });
  }, [capital]);
  console.log(weather);
  return (
    <>
      <h1>{name}</h1>
      <h3>Capital: </h3>
      {capital}
      <h3>Population:</h3>
      {population}
      <h3>Languages:</h3>
      {country.languages.map(lan => (
        <li key={lan.iso639_1}>{lan.name}</li>
      ))}
      <h3>Flag</h3>
      <img src={country.flag} alt="country-flag" height="100" />
      <Weather country={capital} weather={weather} />
    </>
  );
};
const Country = ({ country }) => {
  return (
    <div>
      <p>{country.name}</p>
    </div>
  );
};

const ResultsWithButtons = ({ result, setSearchCountry }) => {
  return result.map(item => (
    <>
      <li style={{ listStyleType: `none` }}>{item.props.country.name}</li>
      <button onClick={() => setSearchCountry(item.props.country.name)}>
        Show
      </button>
    </>
  ));
};

const Weather = ({ country, weather }) => {
  if (weather === null) {
    return null;
  }
  return (
    <div>
      <h2>Weather in {country}</h2>
      <h5>
        Temperature: {weather.temperature}
        <sup>o</sup>Celsius
      </h5>

      <img src={weather.weather_icons[0]} alt="weather-icon" height="100" />
      <h5>Description: {weather.weather_descriptions[0]}</h5>
      <h5>
        Wind: {weather.wind_speed}Km/hr {weather.wind_dir}
      </h5>
    </div>
  );
};

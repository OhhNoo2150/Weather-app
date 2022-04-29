import React, { useState } from 'react';
import './App.css';



const api = {
  key: `${process.env.REACT_APP_API_KEY}`,
  base: 'https://api.openweathermap.org/data/2.5/',
  
};
console.log(process.env.REACT_APP_API_KEY);

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=Imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        });
      }
    }
    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`
    }
    return (
      <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input
              type="text"
              className='search-bar'
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != 'undefined') ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  <h6>Current Temp</h6>
                  {Math.round(weather.main.temp)}°f
                  <div className='feels-like'>
                    <h6>Feels Like</h6>
                    {Math.round(weather.main.feels_like)}°f
                  </div>
                </div>
                <div className="weather"> {weather.weather[0].main} </div>
              </div>
            </div>
          ) : ('')}
        </main>
      </div>
    );
  }

  export default App;
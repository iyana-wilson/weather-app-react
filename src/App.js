import logo from './logo.svg';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

import './App.css';


   function App() {
    const [city, setCity] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [forecast, setForecast] = useState({});
  
    function showWeather(response) {
      setLoaded(true);
      setForecast({
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        icon: `http://api.openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        description: response.data.weather[0].description
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      let apiKey = "361e0aa61c613a70c483b8ca214c4ec2";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metirc`;
      axios.get(apiUrl).then(showWeather);
    }
  
    function updateCity(event) {
      setCity(event.target.value);
    }
  
    let display = (
      <div className="App">
        <h1>Weather Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city...."
            onChange={updateCity}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  
    if (loaded) {
      return (
        <div>
          {display}
          <ul>
            <li>Temperature: {Math.round(forecast.temperature)}°C</li>
            <li>Description: {forecast.description}</li>
            <li>humidity: {forecast.humidity}%</li>
            <li>Wind: {forecast.wind}mph</li>
            <li>
              <img src={forecast.icon} alt={forecast.description} />
            </li>
          </ul>
        </div>
      );
    } else {
      return display;
    }
  }
  


export default App;

import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setQuery("");
        });
    }
  };

  let date = new Date().toDateString();

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 22
            ? "app-warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="info">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{date}</div>
            </div>
            <div className="response">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

// Backrounds source: https://github.com/TylerPottsDev/weather-react

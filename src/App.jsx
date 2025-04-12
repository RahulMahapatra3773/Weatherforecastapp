import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "f430a735c3118c20f44a37c705af11a2";

  const getWeather = async () => {
    if (!city) return;
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-[#2b2d42] mb-6">
          Weather Snapshot 🌍
        </h1>

        <div className="flex items-center gap-3 mb-5">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={getWeather}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium mb-4">{error}</p>
        )}

        {weather && (
          <div className="bg-gradient-to-tr from-blue-50 to-white rounded-2xl p-6 shadow-inner">
            <h2 className="text-center text-2xl font-semibold text-[#2b2d42] mb-1">
              {weather.name}
            </h2>
            <p className="text-center text-5xl font-bold text-[#1a1a2e] mb-3">
              {weather.main.temp}°C
            </p>
            <p className="text-center text-[#4e4e50] capitalize mb-4">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-center text-[#2b2d42]">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="font-semibold">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

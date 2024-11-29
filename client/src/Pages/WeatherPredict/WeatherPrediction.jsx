import React, { useState } from 'react';
import { SearchBar } from '../../components/SearchBar';
import { WeatherInfo } from '../../components/WeatherInfo';
import { WeatherChart } from '../../components/WeatherChart';
import { fetchWeatherData } from '../../components/utils/api';
import { createTempData } from '../../components/utils/weatherUtils';

const WeatherPrediction = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError('Unable to fetch weather data. Please check the city name.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather Dashboard</h1>
          <div className="flex justify-center items-center ">
  <SearchBar city={city} setCity={setCity} onSearch={handleSearch} className="justify-center" />
</div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {weather && (
          <>
            <WeatherInfo weather={weather} />
            <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
              <h3 className="text-xl font-semibold mb-4">Temperature Overview</h3>
              <WeatherChart data={createTempData(weather)} color="#f97316" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherPrediction;
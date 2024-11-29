import React from 'react';
import { Thermometer, Wind, Droplets, Cloud } from 'lucide-react';
import { WeatherCard } from './WeatherCard';
import { formatWeatherDescription } from '../components/utils/weatherUtils';

export const WeatherInfo = ({ weather }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          {formatWeatherDescription(weather.weather[0].description)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WeatherCard
          title="Temperature"
          value={`${weather.main.temp}°C`}
          icon={<Thermometer size={24} />}
          color="bg-gradient-to-br from-orange-400 to-red-500"
        />
        <WeatherCard
          title="Wind Speed"
          value={`${weather.wind.speed} m/s`}
          icon={<Wind size={24} />}
          color="bg-gradient-to-br from-blue-400 to-blue-500"
        />
        <WeatherCard
          title="Humidity"
          value={`${weather.main.humidity}%`}
          icon={<Droplets size={24} />}
          color="bg-gradient-to-br from-green-400 to-green-500"
        />
        <WeatherCard
          title="Cloudiness"
          value={`${weather.clouds.all}%`}
          icon={<Cloud size={24} />}
          color="bg-gradient-to-br from-purple-400 to-purple-500"
        />
      </div>
    </div>
  );
};
import axios from 'axios';

const API_KEY = '40a508d5e860039676f99879e5a874de';
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city) => {
  const response = await axios.get(API_BASE, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};
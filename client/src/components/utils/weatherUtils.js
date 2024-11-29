export const formatWeatherDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };
  
  export const createTempData = (weather) => {
    if (!weather) return [];
    
    return [
      { name: 'Current', value: weather.main.temp },
      { name: 'Feels Like', value: weather.main.feels_like },
      { name: 'Min', value: weather.main.temp_min },
      { name: 'Max', value: weather.main.temp_max },
    ];
  };
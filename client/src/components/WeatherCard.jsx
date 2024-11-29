import React from 'react';
import Card from '../components/Card'

export const WeatherCard = ({ title, value, icon, color }) => {
  return (
    <Card className={`${color} p-6 rounded-xl shadow-lg transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <h3 className="text-white text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-white/90">
          {icon}
        </div>
      </div>
    </Card>
  );
};
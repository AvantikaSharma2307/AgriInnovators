import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ city, setCity, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <button
          type="submit"
          className="absolute right-2 top-2 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};
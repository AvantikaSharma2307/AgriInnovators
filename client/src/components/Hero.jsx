import React from 'react';
import {Brain, Microscope,Sprout} from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-green-50">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            Smart Farming Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Revolutionize your farming with AI-powered recommendations, crop health monitoring,
            and precision agriculture techniques.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
            Get Started
          </button>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Crop Recommendation</h3>
            <p className="text-gray-600">Get AI-powered suggestions for optimal crop selection based on soil conditions and climate data.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Microscope className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Disease Detection</h3>
            <p className="text-gray-600">Early detection of crop diseases using advanced image recognition technology.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
            <p className="text-gray-600">Data-driven insights to optimize your farming practices and increase yield.</p>
          </div>
         
        </div>
      </div>
    </div>
  );
}
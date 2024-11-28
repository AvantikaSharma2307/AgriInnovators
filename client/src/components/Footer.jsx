import React from 'react';
import Image from '../assets/a9fe655d796d4e04a201cfdcbe523855-free.png';

export default function Footer() {
  return (
    <div className="bg-[#4DA131] text-white py-16">
      {/* Logo Image */}
      <div className="flex justify-start px-8">
        <img src={Image} className="h-24 object-contain" alt="Logo" />
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-10 px-8">
        <div className="text-center hover:scale-105 transform transition duration-300 ease-in-out">
          <h3 className="text-xl font-semibold mb-4">Crop Recommendation</h3>
          <p className="text-sm opacity-80">Get personalized crop recommendations based on climate and soil data.</p>
        </div>
        <div className="text-center hover:scale-105 transform transition duration-300 ease-in-out">
          <h3 className="text-xl font-semibold mb-4">Disease Prediction</h3>
          <p className="text-sm opacity-80">Identify and predict crop diseases using advanced AI models.</p>
        </div>
        <div className="text-center hover:scale-105 transform transition duration-300 ease-in-out">
          <h3 className="text-xl font-semibold mb-4">Fertilizer Prediction</h3>
          <p className="text-sm opacity-80">Receive recommendations on the right fertilizers for your crops.</p>
        </div>
        <div className="text-center hover:scale-105 transform transition duration-300 ease-in-out">
          <h3 className="text-xl font-semibold mb-4">Weather Prediction</h3>
          <p className="text-sm opacity-80">Stay informed with accurate weather predictions for your region.</p>
        </div>
      </div>

      {/* Footer Bottom */}
     
      <div className="mt-16 text-center opacity-70">
      <hr/>
        <p className='mt-8'>&copy; 2024 AgriInnovators. All Rights Reserved.</p>
      </div>
    </div>
  );
}

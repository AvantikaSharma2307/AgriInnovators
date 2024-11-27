import React from 'react'
import { Features } from '../components/Features'
import { CallToAction } from '../components/CallToAction'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { FAQ } from '../components/FAQ'

export default function Home() {
  return (
   <>
   <div className="h-screen grid grid-cols-1 md:grid-cols-2 pt-16" style={{ backgroundColor: "#55a630" }}>
  <div className="ml-12 md:ml-56 mt-24 px-4 text-center md:text-left">
    <h1 className="font-bold text-6xl md:text-8xl text-white leading-tight tracking-wide font-extrabold text-shadow-md">
      Smart Farm
    </h1>
    <h3 className="text-yellow-500 text-4xl mt-4 mb-8 animate__animated animate__fadeIn animate__delay-1s">
      Empowering Farmers
    </h3>
    <p className="text-white text-2xl md:text-3xl mt-16 font-serif leading-relaxed">
      Bringing Trust to Every Seed, Empowering Farmers for a Sustainable Future.
    </p>
    <div className="mt-12">
      <button className="px-8 py-4 bg-yellow-500 text-white text-2xl font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-yellow-600 hover:scale-105">
        Learn More
      </button>
    </div>
  </div>
  
  <div className="flex justify-center items-center mt-8 md:mt-0">
    <img 
      src="https://cdn.pixabay.com/photo/2013/07/12/14/30/farmer-148325_1280.png" 
      className="h-[70vh] md:h-[80vh] transform transition duration-500 hover:scale-105 rounded-lg " 
      alt="Smart Farm"
    />
  </div>
</div>

   <Hero/>
   <Features/>
   <HowItWorks/>
   <CallToAction/>
   <FAQ/>
  
   </>
  )
}

import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <div className="bg-green-900 py-16" id="contact" >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Ready to Transform Your Farming?
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of farmers who are already using our smart farming solutions
          to increase yields and optimize their agricultural practices.
        </p>
        <button className="bg-white text-green-800 px-8 py-3 rounded-lg text-lg font-semibold 
                         hover:bg-green-100 transition-colors inline-flex items-center gap-2">
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
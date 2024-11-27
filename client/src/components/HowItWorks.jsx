import React from 'react';
import { Scan, Upload, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Data",
      description: "Submit your farm data or crop images through our easy-to-use interface"
    },
    {
      icon: <Scan className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Our advanced AI algorithms analyze your data for insights and recommendations"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get Results",
      description: "Receive detailed reports and actionable recommendations for your farm"
    }
  ];

  return (
    <div className="bg-green-50 py-24" id="how-it-works">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { LeafyGreen, CloudRain, LineChart, Sprout ,Bean,MapPinPlusIcon} from 'lucide-react';

export function Features() {
  const features = [
    {
        icon: <MapPinPlusIcon className="w-6 h-6" />,
        title:"IOT Real Time Monitoring",
        description: "Get detailed insights about your soil and crop through iot real time monitoring."
      },
    {
      icon: <LeafyGreen className="w-6 h-6" />,
      title: "Soil Analysis",
      description: "Get detailed insights about your soil composition and nutrients."
    },
    {
      icon: <CloudRain className="w-6 h-6" />,
      title: "Weather Integration",
      description: "Real-time weather updates and forecasts for better planning."
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Yield Prediction",
      description: "AI-based crop yield predictions for better resource management."
    },
    {
      icon: <Sprout className="w-6 h-6" />,
      title: "Growth Tracking",
      description: "Monitor crop growth stages and get timely recommendations."
    },
    {
        icon: <Bean className="w-6 h-6" />,
        title: "Grading of Seeds",
        description: "Analysis the quality of seeds and prevent farmers from fraud sellers."
    }
  ];

  return (
    <div className="bg-white py-24" id="features">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Advanced Farming Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border border-green-100 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
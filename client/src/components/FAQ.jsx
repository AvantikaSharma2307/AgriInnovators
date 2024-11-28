import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How accurate is the crop disease detection?",
      answer: "Our AI-powered disease detection system has a 96% accuracy rate, trained on millions of plant images and continuously updated with new data."
    },
    {
      question: "What type of soil analysis do you provide?",
      answer: "We provide comprehensive soil analysis including pH levels, nutrient content, organic matter, and moisture levels. Our recommendations are based on these parameters."
    },
    {
      question: "How often should I scan my crops?",
      answer: "We recommend weekly scans during critical growth stages and bi-weekly during regular periods. The app will send you reminders based on your crop type."
    },
    {
      question: "Can I use the system for multiple farms?",
      answer: "Yes! Our platform supports multiple farm management with separate tracking and analysis for each location."
    }
  ];

  return (
    <div className="bg-white py-24" id="faq">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-semibold text-left">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white border border-gray-100 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
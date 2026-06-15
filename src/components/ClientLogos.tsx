'use client';

import { useState } from 'react';

// Client logos data - replace with real client logos
const clientLogos = [
  { name: 'Client A', country: 'Australia', industry: 'Warehouse' },
  { name: 'Client B', country: 'Nigeria', industry: 'Factory' },
  { name: 'Client C', country: 'Philippines', industry: 'Mall' },
  { name: 'Client D', country: 'UAE', industry: 'Logistics' },
  { name: 'Client E', country: 'Saudi Arabia', industry: 'Steel Plant' },
  { name: 'Client F', country: 'South Africa', industry: 'Mining' },
];

export default function ClientLogos() {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    // Simple trigger - in production, use Intersection Observer
    setTimeout(() => setIsVisible(true), 100);
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Clients Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We have successfully delivered steel structure projects to clients in 30+ countries
          </p>
        </div>

        {/* Client logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Placeholder for client logo image */}
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {client.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700 text-center">
                {client.name}
              </p>
              <p className="text-xs text-gray-500 text-center">
                {client.country}
              </p>
            </div>
          ))}
        </div>

        {/* Note for real implementation */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            💡 Replace logo placeholders with real client company logos for maximum trust impact
          </p>
        </div>
      </div>
    </section>
  );
}

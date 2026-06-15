'use client';

import { useState } from 'react';
import Image from 'next/image';

// Client data with real avatars
const clientLogos = [
  {
    name: '客户 A',
    nameEn: 'Client A',
    country: '澳大利亚',
    countryEn: 'Australia',
    industry: 'Warehouse',
    avatar: '/images/avatars/client-australia.webp',
  },
  {
    name: '客户 B',
    nameEn: 'Client B',
    country: '尼日利亚',
    countryEn: 'Nigeria',
    industry: 'Factory',
    avatar: '/images/avatars/client-nigeria.webp',
  },
  {
    name: '客户 C',
    nameEn: 'Client C',
    country: '菲律宾',
    countryEn: 'Philippines',
    industry: 'Mall',
    avatar: '/images/avatars/client-philippines.webp',
  },
  {
    name: '客户 D',
    nameEn: 'Client D',
    country: '阿曼',
    countryEn: 'Oman',
    industry: 'Logistics',
    avatar: '/images/avatars/client-oman.webp',
  },
  {
    name: '客户 E',
    nameEn: 'Client E',
    country: '沙特阿拉伯',
    countryEn: 'Saudi Arabia',
    industry: 'Steel Plant',
    avatar: '/images/avatars/client-saudi.webp',
  },
  {
    name: '客户 F',
    nameEn: 'Client F',
    country: '南非',
    countryEn: 'South Africa',
    industry: 'Mining',
    avatar: '/images/avatars/client-south-africa.webp',
  },
];

export default function ClientLogos() {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    setTimeout(() => setIsVisible(true), 100);
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 mb-4">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            深受全球客户信赖
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我们已成功为30多个国家的客户交付了钢结构项目。
          </p>
        </div>

        {/* Client cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Avatar image */}
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-steel-accent/30 transition-all duration-300">
                <Image
                  src={client.avatar}
                  alt={`${client.name} - ${client.country} client`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <p className="text-sm font-semibold text-gray-800 text-center">
                {client.name}
              </p>

              {/* Country */}
              <p className="text-xs text-gray-400 text-center mt-0.5">
                {client.country}
              </p>
            </div>
          ))}
        </div>

        {/* Note for real implementation */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            💡 将占位符徽标替换为客户公司的真实徽标，以最大程度地提升信任度
          </p>
        </div>
      </div>
    </section>
  );
}

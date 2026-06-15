'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = '8616650735555';
  const message = 'Hi Laotie! I\'m interested in your steel structure solutions. Can you send me a quote?';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat box popup */}
      {isOpen && (
        <div className="mb-4 mr-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-base">Laotie Steel</h3>
              <p className="text-sm text-green-100">Typically replies within 1 hour</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm">
              <p className="text-sm text-gray-700 leading-relaxed">
                👋 Hi there! Need a quote for your steel structure project?
              </p>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                I'm here to help with <strong>factory-direct pricing</strong>, technical drawings, and shipping quotes.
              </p>
              <span className="text-xs text-gray-400 mt-2 block">Just now</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="p-4 bg-white border-t border-gray-100">
            <button
              onClick={handleClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => isOpen ? handleClick() : setIsOpen(true)}
        className="group w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 group-hover:animate-pulse" />
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          💬 Get Free Quote
        </div>
      )}
    </div>
  );
}

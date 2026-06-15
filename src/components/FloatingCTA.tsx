'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show button after scrolling down 300px
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop: Floating button on the right side */}
      {!isMobile && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/contact"
              className="group bg-[#FF6B00] text-white px-4 py-3 rounded-l-xl shadow-2xl hover:bg-[#e55a00] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,107,0,0.5)] hover:-translate-x-1"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              <span className="text-sm font-bold tracking-wider uppercase">Get a Free Quote</span>
            </Link>
            <Link
              href="/products"
              className="group bg-steel text-white px-4 py-3 rounded-l-xl shadow-xl hover:bg-steel-light transition-all duration-300 hover:shadow-[0_8px_32px_rgba(27,58,107,0.3)] hover:-translate-x-1"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              <span className="text-sm font-bold tracking-wider uppercase">View Products</span>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile: Bottom fixed bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl md:hidden">
          <div className="flex items-center gap-3 p-3">
            <Link
              href="/contact"
              className="flex-1 bg-[#FF6B00] text-white text-center py-4 px-4 rounded-xl font-bold text-base hover:bg-[#e55a00] transition-colors"
              style={{ minHeight: '48px' }} /* Mobile touch target >= 48px */
            >
              Get a Free Quote
            </Link>
            <Link
              href="/products"
              className="flex-1 bg-steel text-white text-center py-4 px-4 rounded-xl font-semibold text-base hover:bg-steel-light transition-colors"
              style={{ minHeight: '48px' }}
            >
              View Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  scope: string;
  validUntil: string;
  image: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
}

interface CertificateLightboxProps {
  certificates: Certificate[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CertificateLightbox({ 
  certificates, 
  selectedIndex, 
  onClose, 
  onNext, 
  onPrev 
}: CertificateLightboxProps) {
  if (certificates.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate image"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50"
        aria-label="Previous certificate"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50"
        aria-label="Next certificate"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Certificate image */}
      <div className="relative w-full max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
        <Image
          src={certificates[selectedIndex].image}
          alt={certificates[selectedIndex].title}
          width={1200}
          height={800}
          className="w-full h-full object-contain"
        />
        {/* Certificate title */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
          <p className="font-semibold">{certificates[selectedIndex].title}</p>
          <p className="text-sm text-gray-300">{certificates[selectedIndex].issuer}</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, FileCheck, Globe, Shield } from "lucide-react";
import CertificateLightbox from './CertificateLightbox';

const certificates = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015 Quality Management",
    issuer: "International Organization for Standardization",
    description:
      "Our factory has passed ISO 9001:2015 certification, ensuring consistent quality management systems across all production processes — from raw material inspection to final product delivery.",
    scope: "Design, manufacturing, and export of steel structure components",
    validUntil: "2026-12",
    image: "/images/certificates/iso-9001.webp",
    bgColor: "from-blue-50 to-white",
    borderColor: "border-blue-200",
    iconBg: "from-blue-500 to-blue-600",
  },
  {
    id: "ce",
    title: "CE Certification (EN 1090-1)",
    issuer: "European Union Conformity",
    description:
      "Our steel structure products comply with EU standards (EN 1090-1) and carry the CE mark, allowing free circulation within the European Economic Area. Essential for clients in Europe.",
    scope: "Structural steel components for building construction",
    validUntil: "2026-08",
    image: "/images/certificates/ce-cert.png",
    bgColor: "from-yellow-50 to-white",
    borderColor: "border-yellow-200",
    iconBg: "from-yellow-500 to-amber-500",
  },
  {
    id: "iaf",
    title: "IAF (International Accreditation Forum)",
    issuer: "IAF Multilateral Recognition Arrangement",
    description:
      "Our certification body is accredited under the IAF MLA, meaning our ISO and CE certificates are recognized internationally across 149 economies.",
    scope: "International recognition of quality & conformity assessment",
    validUntil: "2026-12",
    image: "/images/certificates/iaf-cert.webp",
    bgColor: "from-green-50 to-white",
    borderColor: "border-green-200",
    iconBg: "from-green-500 to-green-600",
  },
  {
    id: "supplier-assessed",
    title: "Supplier Assessment Certificate",
    issuer: "Third-Party Verification Agency",
    description:
      "Our factory has passed on-site assessment by an independent third-party agency, verifying our production capacity, quality control systems, and business legitimacy. This assessment is updated annually.",
    scope: "Production capacity: 5,000T/month, 5 production lines",
    validUntil: "2025-12",
    image: "/images/certificates/supplier-assessed.webp",
    bgColor: "from-purple-50 to-white",
    borderColor: "border-purple-200",
    iconBg: "from-purple-500 to-purple-600",
  },
  {
    id: "material-test",
    title: "Mill Test Certificate (MTC) — EN 10204 3.1",
    issuer: "Steel Mill Quality Department",
    description:
      "Every batch of raw steel (H-beam, angle steel, steel plate) is accompanied by a Mill Test Certificate compliant with EN 10204 3.1, certifying chemical composition and mechanical properties.",
    scope: "Raw material traceability for every order",
    validUntil: "Per batch (provided with each shipment)",
    image: "/images/certificates/mtc-sample.webp",
    bgColor: "from-gray-50 to-white",
    borderColor: "border-gray-200",
    iconBg: "from-gray-600 to-gray-700",
  },
  {
    id: "aws-welding",
    title: "AWS Certified Welders (D1.1 / ISO 3834)",
    issuer: "American Welding Society / ISO",
    description:
      "Our welding team includes AWS D1.1 and ISO 3834 certified welders. All welding procedures are qualified (WPS/PQR) and documented. UT and RT non-destructive testing are available upon request.",
    scope: "Submerged arc welding (SAW), GMAW, FCAW",
    validUntil: "Ongoing (individual certifications current)",
    image: "/images/certificates/aws-welding.webp",
    bgColor: "from-orange-50 to-white",
    borderColor: "border-orange-200",
    iconBg: "from-orange-500 to-orange-600",
  },
];

const testingStandards = [
  { standard: "ASTM A992 / A572", description: "H-beam steel grade for structural applications" },
  { standard: "EN 10025 (S235/S355)", description: "European structural steel grades" },
  { standard: "AWS D1.1", description: "American welding code for structural steel" },
  { standard: "EN 1090-1/2", description: "EU execution class for steel structures" },
  { standard: "ISO 1461", description: "Hot-dip galvanizing standards" },
  { standard: "GB/T 11263", description: "Chinese standard for H-beam dimensions" },
];

export interface Certificate {
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

export default function CertificatesClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedCertIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextCert = () => {
    setSelectedCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setSelectedCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-steel to-steel-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline mb-4">
            <span>←</span> Back to Home
          </a>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Certificates & Certifications</h1>
          <p className="text-gray-300 max-w-2xl">
            Quality assurance is at the core of everything we do. All our products are manufactured under certified quality
            management systems and comply with international standards.
          </p>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-steel-muted border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-steel-accent mb-1">6+</div>
              <div className="text-sm text-gray-600">International Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-steel-accent mb-1">30+</div>
              <div className="text-sm text-gray-600">Countries Accepted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-steel-accent mb-1">100%</div>
              <div className="text-sm text-gray-600">MTC Provided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-steel-accent mb-1">3rd Party</div>
              <div className="text-sm text-gray-600">Inspection Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className={`group bg-white rounded-2xl border-2 ${cert.borderColor} p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative`}
            >
              {/* Certification Badge */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="w-full h-full text-steel" />
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.iconBg} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">{cert.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">Issued by: <span className="font-semibold">{cert.issuer}</span></p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-steel-accent/10 text-steel px-2 py-1 rounded-md font-semibold">✓ {cert.scope}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">Valid until: {cert.validUntil}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{cert.description}</p>
              
              {/* Certificate image - clickable to open lightbox */}
              <div 
                className="mt-4 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 relative min-h-[200px] cursor-pointer hover:shadow-md transition-all group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                  <span className="text-white text-sm font-semibold bg-black/70 px-4 py-2 rounded-lg">
                    🔍 Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Certifications Matter */}
      <section className="bg-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-steel mb-4">Why Our Certifications Matter for Your Project</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              International certifications aren't just paperwork — they're your guarantee of quality, compliance, and peace of mind.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">
                ISO 9001 and CE certifications mean our products meet strict international quality standards — verified by independent auditors.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Customs Clearance</h3>
              <p className="text-sm text-gray-600">
                CE marked products sail through European customs. Our certifications are recognized in 149+ countries through IAF.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Building Permits</h3>
              <p className="text-sm text-gray-600">
                Structural calculations and material traceability (MTC) help you get building permits faster in your local jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Standards */}
      <section className="bg-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-steel text-center mb-4">Testing & Material Standards</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            We adhere to international material and testing standards. Mill Test Certificates (MTC) are provided with every
            shipment.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {testingStandards.map((s) => (
              <div key={s.standard} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-steel-accent/50 transition-colors">
                <div className="font-semibold text-gray-900 text-sm mb-1">{s.standard}</div>
                <div className="text-xs text-gray-500">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Inspection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-steel to-steel-light rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border-4 border-white"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Third-Party Inspection Supported</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              We support third-party inspection by <strong>SGS, BV, TUV</strong>, or your designated inspection agency. 
              Ensure your order meets your exact specifications before shipment.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="font-semibold mb-1">📋 Raw Material</div>
                <div className="text-sm text-gray-300">Incoming inspection</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="font-semibold mb-1">🔧 During Production</div>
                <div className="text-sm text-gray-300">In-process quality checks</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="font-semibold mb-1">✅ Pre-Shipment</div>
                <div className="text-sm text-gray-300">Final inspection & loading</div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FileCheck className="w-5 h-5 text-steel-accent" />
                <span className="font-semibold">SGS Inspected</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FileCheck className="w-5 h-5 text-steel-accent" />
                <span className="font-semibold">BV Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <FileCheck className="w-5 h-5 text-steel-accent" />
                <span className="font-semibold">TUV Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-10 shadow-2xl border border-gray-100">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-steel-accent to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-steel mb-4">Need Specific Certification for Your Project?</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
              Different countries and projects require specific certifications. Our engineering team can work with 
              <strong> local labs and inspection agencies</strong> to meet your exact requirements.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span>Custom certification support</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span>Local lab coordination</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span>Documentation in English</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span>
                <span>Fast response (2h)</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#FF6B00] hover:bg-[#e55a00] rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>📋 Discuss Certification Requirements</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://wa.me/8616650735555"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                <span>💬 WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <CertificateLightbox
          certificates={certificates}
          selectedIndex={selectedCertIndex}
          onClose={closeLightbox}
          onNext={nextCert}
          onPrev={prevCert}
        />
      )}
    </main>
  );
}

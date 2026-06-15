import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
import { Award, FileCheck, Globe, Shield } from "lucide-react";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Certificates & Certifications | Laotie Steel Structure",
  description:
    "View Laotie Steel Structure's certifications: ISO 9001, CE (EN 1090), IAF, Supplier Assessment, and AWS welding certifications. Quality assured for global projects.",
  openGraph: {
    title: "Certificates & Certifications | Laotie",
    description:
      "ISO 9001, CE, IAF, Supplier Assessment, AWS Certified Welders. Quality assured for your steel structure project.",
    url: "https://www.laotie-steel.com/certificates",
    type: "website",
  },
};

export default function CertificatesPage() {
  return (
    <>
      <Header />
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

        {/* Certificates Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className={`bg-gradient-to-br ${cert.bgColor} rounded-2xl border ${cert.borderColor} p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.iconBg} flex items-center justify-center shrink-0`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{cert.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">Issued by: {cert.issuer}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{cert.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-white/80 text-gray-600 px-2 py-1 rounded-md">Scope: {cert.scope}</span>
                      <span className="bg-white/80 text-gray-600 px-2 py-1 rounded-md">Valid until: {cert.validUntil}</span>
                    </div>
                  </div>
                </div>
                {/* Certificate image */}
                <div className="mt-4 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 relative min-h-[200px]">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    className="object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
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
          <div className="bg-gradient-to-br from-steel to-steel-light rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Third-Party Inspection Available</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              We support third-party inspection by SGS, BV (Bureau Veritas), TUV, or your designated inspection agency.
              Inspection can be arranged at: (1) Raw material incoming, (2) During production, (3) Pre-shipment.
              Inspection cost is borne by the buyer.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-steel-accent" />
                <span>SGS Inspected</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-steel-accent" />
                <span>BV (Bureau Veritas)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-steel-accent" />
                <span>TUV Certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-section py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-steel-accent to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-steel mb-4">Need Specific Certification for Your Project?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Different countries and projects may require specific certifications. Contact us to discuss your certification
              requirements — we can work with local labs and inspection agencies to meet your needs.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-cta hover:bg-cta-hover rounded-lg transition-colors"
            >
              <span>Discuss Certification Requirements</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

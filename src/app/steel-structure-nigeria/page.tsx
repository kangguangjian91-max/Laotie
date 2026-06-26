import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Nigeria | Warehouse & Factory Construction",
  description:
    "Leading steel structure manufacturer for Nigeria. Custom warehouse, factory, and industrial building solutions. CE certified, 30-year warranty. Get free quote today!",
  keywords: [
    "steel structure nigeria",
    "warehouse construction nigeria",
    "factory building nigeria",
    "steel building supplier nigeria",
    "prefab warehouse nigeria",
    "industrial construction nigeria",
    "portal frame nigeria",
    "steel fabrication lagos",
    "warehouse builder abuja",
    "factory construction kano",
    // Nigerian local keywords (English + Pidgin + Hausa + Yoruba)
    "warehouse for lease lagos",
    "steel building price nigeria",
    "fabrication yard lagos",
    "industrial park nigeria",
    "steel structure supplier lagos",
    "warehouse contractor nigeria",
    "abuja steel building",
    "steel factory kano",
    "prefab warehouse nigeria price",
  ],
  openGraph: {
    title: "Steel Structure Nigeria | Laotie Steel",
    description:
      "Your trusted steel structure partner in Nigeria. 100+ projects completed across Lagos, Abuja, Kano.",
    images: ["/images/nigeria/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp"],
    locale: "en_NG",
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/steel-structure-nigeria" },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Nigeria | Laotie Steel",
    description: "Your trusted steel structure partner in Nigeria. 100+ projects completed.",
    images: ["/images/nigeria/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction Nigeria",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and industrial buildings in Nigeria.",
  offers: {
    "@type": "Offer",
    priceCurrency: "NGN",
    price: "25-65",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "Nigeria",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure warehouse cost in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure warehouse cost in Nigeria ranges from NGN 15,000 to NGN 35,000 per square meter, depending on size, design complexity, and materials. Laotie offers factory-direct pricing at NGN 25-65 per sqm.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a steel warehouse in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks for production in China, 2-3 weeks for shipping to Nigeria, 4-8 weeks for on-site installation. Total: 10-17 weeks from order to completion.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a building permit for steel structure in Nigeria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you need building permits from your Local Government Unit (LGU). Laotie provides all necessary structural calculations, drawings, and certificates to support your permit application.",
      },
    },
  ],
};

export default function NigeriaLandingPage() {
  return (
    <><Header />
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Steel Structure Nigeria", href: "/steel-structure-nigeria" },
          ]}
        />
      </div>
    </div>
    <main className="min-h-screen">
      <LandingPageTracker country="nigeria" pageType="nigeria" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Steel Structure Solutions for{" "}
              <span className="text-yellow-400">Nigeria</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Custom warehouse, factory & industrial buildings. CE certified quality, 30-year warranty.
            </p>
            <p className="text-lg mb-8 text-blue-200">
              Serving Lagos, Abuja, Kano, Port Harcourt, Kaduna & beyond
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Get Free Quote
              </a>
              <a
                href="#projects"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                View Projects
              </a>
              <a
                href="/calculator?location=nigeria"
                className="bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg text-yellow-400"
              >
                📐 Try Cost Calculator
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose Us for Your Nigeria Project?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            With 15+ years of experience and 100+ completed projects across Nigeria, we understand
            local building codes, climate challenges, and logistics requirements.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimator animation="fade-in" delay={0}>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2">100+ Projects in Nigeria</h3>
              <p className="text-gray-600">
                Proven track record across Lagos, Abuja, Kano, Port Harcourt, and Kaduna. From small
                warehouses to large industrial complexes.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={200}>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">CE & ISO Certified Quality</h3>
              <p className="text-gray-600">
                International quality standards with 30-year structural warranty. All materials come
                with mill test certificates.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={400}>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery & Installation</h3>
              <p className="text-gray-600">
                Optimized logistics for Nigeria. 4-6 weeks production, 2-3 weeks shipping to
                Lagos/Abuja ports, 4-8 weeks installation.
              </p>
            </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Why Nigeria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Steel Structures Are Perfect for Nigeria
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <ScrollAnimator animation="fade-in" delay={0}>
            <div>
              <h3 className="text-2xl font-bold mb-4">🌩️ Heavy Rain & Storm Protection</h3>
              <p className="text-gray-600 mb-4">
                Nigeria experiences heavy rainfall and strong storms during wet season (April-October).
                Our steel structures are engineered to withstand wind speeds up to 150 km/h and heavy rain.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Wind load calculation per Nigerian building codes</li>
                <li>✅ Reinforced connections for storm resistance</li>
                <li>✅ Corrosion-resistant coatings for humid climate</li>
              </ul>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={200}>
            <div>
              <h3 className="text-2xl font-bold mb-4">💰 Cost-Effective Construction</h3>
              <p className="text-gray-600 mb-4">
                Steel structures cost 30-40% less than traditional concrete buildings in Nigeria,
                with 50% faster construction time.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Factory-direct pricing: NGN 25-65/sqm</li>
                <li>✅ No expensive local labor for steel fabrication</li>
                <li>✅ Prefabricated components, fast on-site assembly</li>
              </ul>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={400}>
            <div>
              <h3 className="text-2xl font-bold mb-4">📦 Flexible & Expandable</h3>
              <p className="text-gray-600 mb-4">
                Steel buildings can be easily expanded or modified as your business grows. Perfect for
                warehouses and factories.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Modular design for easy expansion</li>
                <li>✅ Clear span up to 60m (no interior columns)</li>
                <li>✅ Mezzanine floors for extra space</li>
              </ul>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={600}>
            <div>
              <h3 className="text-2xl font-bold mb-4">🔧 Low Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Steel structures require minimal maintenance in tropical climates, saving you money over
                the building's lifetime.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Galvanized or painted steel resists rust</li>
                <li>✅ No termites (unlike wood structures)</li>
                <li>✅ Fire-resistant materials</li>
              </ul>
            </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Logistics Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Logistics & Installation Support in Nigeria
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollAnimator animation="fade-in" delay={0}>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">🚢 Shipping to Nigeria</h3>
              <p className="text-gray-600">
                We ship to Lagos, Abuja, Kano, and other major ports. Full container load (FCL) or
                less than container load (LCL) options available.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={200}>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">📋 Customs Clearance</h3>
              <p className="text-gray-600">
                We provide all necessary documents: Bill of Lading, Commercial Invoice, Packing List,
                Certificate of Origin, and Mill Test Certificates.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={400}>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">🔧 Installation Support</h3>
              <p className="text-gray-600">
                Optional on-site installation team or remote guidance via video. We also provide
                detailed installation manuals and videos.
              </p>
            </div>
            </ScrollAnimator>
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Typical Project Timeline</h3>
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <div className="font-bold text-blue-600">Week 1-6</div>
                <div className="text-sm text-gray-600">Production in China</div>
              </div>
              <div className="hidden md:flex items-center">→</div>
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <div className="font-bold text-blue-600">Week 7-9</div>
                <div className="text-sm text-gray-600">Shipping to Nigeria</div>
              </div>
              <div className="hidden md:flex items-center">→</div>
              <div className="bg-blue-50 p-4 rounded-lg flex-1">
                <div className="font-bold text-blue-600">Week 10-17</div>
                <div className="text-sm text-gray-600">On-site Installation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Cases - Carousel */}
      <ProjectCarousel
        title="Recent Projects in Nigeria"
        subtitle="We have completed 100+ steel structure projects across Nigeria. Here are some of our recent works."
        projects={[
          {
            image: "/images/nigeria/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp",
            alt: "Steel structure warehouse in Lagos, Nigeria - 5,000 sqm prefab building",
            title: "Lagos Warehouse Complex",
            description: "5,000 sqm steel structure warehouse with office annex. Built for logistics company in Lagos Mainland.",
            tags: [
              { label: "Warehouse", color: "bg-blue-100 text-blue-800" },
              { label: "Lagos", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/5704819281f8e9ad3038915e967864ad.webp",
            alt: "Steel structure factory in Abuja, Nigeria - 3,000 sqm manufacturing plant",
            title: "Abuja Manufacturing Plant",
            description: "3,000 sqm steel structure factory with 5-ton crane system. Food processing facility.",
            tags: [
              { label: "Factory", color: "bg-blue-100 text-blue-800" },
              { label: "Abuja", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/688e07390f62e21cbb8bd1a1ba455959.webp",
            alt: "Steel structure logistics center in Kano, Nigeria - 8,000 sqm distribution warehouse",
            title: "Kano Logistics Center",
            description: "8,000 sqm distribution center with mezzanine floor. 40x80m clear span design.",
            tags: [
              { label: "Logistics", color: "bg-blue-100 text-blue-800" },
              { label: "Kano", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/1a3e5a019b4c71eda2da853679708074.webp",
            alt: "Steel structure agricultural facility in Port Harcourt, Nigeria - 2,500 sqm cold storage",
            title: "Port Harcourt Agricultural Facility",
            description: "2,500 sqm steel structure for cold storage and processing. High insulation requirements.",
            tags: [
              { label: "Agricultural", color: "bg-blue-100 text-blue-800" },
              { label: "Port Harcourt", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/3c827b0a462391a3e3486e39a5ae25d4.webp",
            alt: "Steel structure commercial building in Kaduna, Nigeria - 1,800 sqm showroom",
            title: "Kaduna Showroom & Warehouse",
            description: "1,800 sqm combined showroom and warehouse. Two-story design with office space.",
            tags: [
              { label: "Commercial", color: "bg-blue-100 text-blue-800" },
              { label: "Kaduna", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/967a25ac2c3ec808229a990e27529ba2.webp",
            alt: "Steel structure electronics factory in Ogun, Nigeria - 4,200 sqm with clean room",
            title: "Ogun Electronics Factory",
            description: "4,200 sqm steel structure factory with clean room requirements. ESD flooring and temperature control.",
            tags: [
              { label: "Factory", color: "bg-blue-100 text-blue-800" },
              { label: "Ogun", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/679234a53ccd9c56cf26658f4f072138.webp",
            alt: "Steel structure warehouse in Oyo, Nigeria - 6,500 sqm distribution hub",
            title: "Oyo Distribution Hub",
            description: "6,500 sqm steel warehouse with automated racking system. Strategic location near Lagos-Ibadan expressway.",
            tags: [
              { label: "Warehouse", color: "bg-blue-100 text-blue-800" },
              { label: "Oyo", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/67dd07a1917aa291f1631e16ce010c88.webp",
            alt: "Steel structure chemical plant in Rivers, Nigeria - 3,800 sqm anti-corrosion",
            title: "Rivers Chemical Plant",
            description: "3,800 sqm chemical processing plant with anti-corrosion coating. Explosion-proof design.",
            tags: [
              { label: "Factory", color: "bg-blue-100 text-blue-800" },
              { label: "Rivers", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/7ea1821bc8fdfac59547d2c042c2f6ae.webp",
            alt: "Steel structure workshop in Enugu, Nigeria - 2,200 sqm with crane",
            title: "Enugu Metal Fabrication Shop",
            description: "2,200 sqm steel structure workshop with 10-ton overhead crane. Heavy-duty industrial use.",
            tags: [
              { label: "Workshop", color: "bg-blue-100 text-blue-800" },
              { label: "Enugu", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/nigeria/bd585762b3e96733450d3660029a1ab4.webp",
            alt: "Steel structure cold storage facility in Port Harcourt, Nigeria - 4,500 sqm",
            title: "Port Harcourt Cold Storage Facility",
            description: "4,500 sqm steel structure facility for cold storage and freezing. Temperature-controlled environment for perishable goods.",
            tags: [
              { label: "Cold Storage", color: "bg-blue-100 text-blue-800" },
              { label: "Port Harcourt", color: "bg-gray-100 text-gray-800" },
            ],
          },
        ]}
      />      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Steel Structure Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-l-4 border-blue-600 pl-6 hover:bg-blue-50 p-4 rounded-r-lg transition-colors">
              <h3 className="text-xl font-bold mb-2">📦 Warehouse Buildings</h3>
              <p className="text-gray-600">
                Custom design for storage, logistics, and distribution centers. Clear span up to 60m,
                mezzanine floors, loading docks.
              </p>
              <a href="/products/steel-structure-building" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                Learn more →
              </a>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 hover:bg-blue-50 p-4 rounded-r-lg transition-colors">
              <h3 className="text-xl font-bold mb-2">🏭 Factory Buildings</h3>
              <p className="text-gray-600">
                Industrial facilities with crane systems (5-50 ton), mezzanine floors, office annex,
                and ventilation systems.
              </p>
              <a href="/products/steel-structure-building" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                Learn more →
              </a>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 hover:bg-blue-50 p-4 rounded-r-lg transition-colors">
              <h3 className="text-xl font-bold mb-2">🏢 Commercial Buildings</h3>
              <p className="text-gray-600">
                Office buildings, showrooms, and retail spaces. Aesthetic design with glass curtain
                walls and cladding options.
              </p>
              <a href="/products/cladding-system" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                Learn more →
              </a>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 hover:bg-blue-50 p-4 rounded-r-lg transition-colors">
              <h3 className="text-xl font-bold mb-2">🌾 Agricultural Structures</h3>
              <p className="text-gray-600">
                Farm sheds, poultry houses, and storage facilities. Ventilation, insulation, and
                corrosion protection.
              </p>
              <a href="/products/steel-structure-building" className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Laotie delivered our 5,000 sqm warehouse on time and within budget. The quality is
                excellent, and their installation team was very professional."
              </p>
              <div className="font-bold">Chidi Okonkwo</div>
              <div className="text-sm text-gray-500">CEO, Lagos Logistics Ltd.</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "We compared 5 suppliers, and Laotie offered the best value for money. Their steel
                structure factory is 30% cheaper than local construction in Abuja."
              </p>
              <div className="font-bold">Aisha Bello</div>
              <div className="text-sm text-gray-500">Owner, Abuja Food Industries</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The heavy rain-resistant design gave us peace of mind. Even through the rainy season, our
                warehouse remained intact and dry. Highly recommended!"
              </p>
              <div className="font-bold">Tunde Ogunlade</div>
              <div className="text-sm text-gray-500">Plant Manager, Kano Agro Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions (Nigeria)
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <summary className="font-bold text-lg cursor-pointer">
                How much does a steel structure warehouse cost in Nigeria?
              </summary>
              <p className="mt-4 text-gray-600">
                Steel structure warehouse cost in Nigeria ranges from NGN 15,000 to NGN 35,000 per
                square meter, depending on size, design complexity, and materials. Laotie offers
                factory-direct pricing at NGN 25-65 per sqm, which is 30-40% cheaper than local
                construction.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <summary className="font-bold text-lg cursor-pointer">
                How long does it take to build a steel warehouse in Nigeria?
              </summary>
              <p className="mt-4 text-gray-600">
                Typical timeline: 4-6 weeks for production in China, 2-3 weeks for shipping to
                Nigeria (Lagos/Abuja ports), 4-8 weeks for on-site installation. Total: 10-17
                weeks from order to completion.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <summary className="font-bold text-lg cursor-pointer">
                Do I need a building permit for steel structure in Nigeria?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, you need building permits from your Local Government Unit (LGU). Laotie provides
                all necessary structural calculations, drawings, and certificates to support your permit
                application. We can also recommend local architects/engineers to assist with the
                process.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <summary className="font-bold text-lg cursor-pointer">
                Can steel structures withstand heavy storms in Nigeria?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! Our steel structures are engineered to withstand wind speeds up to 200 km/h
                (strong storm level). We follow international building codes (EN 1991-1-4 / ASCE 7)
                for wind load design, adapted to Nigeria's climate conditions. All structures come with
                30-year structural warranty.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <summary className="font-bold text-lg cursor-pointer">
                Do you provide installation services in Nigeria?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, we offer optional on-site installation team or remote guidance via video. We also
                provide detailed installation manuals, videos, and technical support. Many clients
                choose to hire local contractors and use our remote guidance to save costs.
              </p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <summary className="font-bold text-lg cursor-pointer">
                What payment terms do you offer for Nigeria clients?
              </summary>
              <p className="mt-4 text-gray-600">
                We offer flexible payment terms: 30% deposit to start production, 70% before shipment.
                We accept T/T (bank transfer), L/C (letter of credit), and PayPal for small orders.
                Financing options are available for large projects.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get Your Free Quote Today
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Fill out the form below, and our Nigeria project specialist will contact you within 24
            hours with a customized solution and quote.
          </p>
          <div className="max-w-2xl mx-auto">
            <form
              className="space-y-6"
              action="https://formsubmit.co/kangguangjian91@gmail.com"
              method="POST"
            >
              {/* FormSubmit configuration */}
              <input type="hidden" name="_subject" value="🇳🇬 Nigeria Inquiry — Laotie Steel Website" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone (WhatsApp preferred)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+234 XXX XXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="project-type" className="block text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="project-type"
                  name="project-type"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="factory">Factory</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="agricultural">Agricultural Structure</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="project-size" className="block text-sm font-medium mb-2">
                  Project Size (sqm)
                </label>
                <input
                  type="text"
                  id="project-size"
                  name="project-size"
                  placeholder="e.g., 1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Project Location in Nigeria
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g., Lagos, Abuja, Kano"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project size, location, timeline, and any special requirements..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
              >
                Send Inquiry
              </button>
            </form>
            <div className="mt-8 text-center text-gray-600">
              <p>📞 Or contact us directly:</p>
              <p className="font-bold text-lg mt-2">WhatsApp: +86 166 5073 5555</p>
              <p>📧 Email: kangguangjian91@gmail.com</p>
              <p className="text-sm mt-2">We respond to all inquiries within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving More Countries */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-4">Also serving:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/steel-structure-thailand" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Thailand</a>
            <a href="/steel-structure-vietnam" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Vietnam</a>
            <a href="/steel-structure-indonesia" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Indonesia</a>
            <a href="/steel-structure-philippines" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Philippines</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-steel text-white text-center py-4 text-sm">Serving Nigeria: Lagos | Abuja | Kano | Port Harcourt | Ibadan</div>
    </main>
    <Footer />
    </>
  );
}

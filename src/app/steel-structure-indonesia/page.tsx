import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import Image from "next/image";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Indonesia | Warehouse & Factory Construction",
  description:
    "Leading steel structure manufacturer for Indonesia. CE certified, 30-year warranty. Custom warehouse, factory, and commercial buildings. Free quote!",
  keywords: [
    "steel structure indonesia",
    "warehouse construction indonesia",
    "factory building jakarta",
    "steel building supplier indonesia",
    "prefab warehouse surabaya",
    "industrial construction indonesia",
    "portal frame indonesia",
    "steel fabrication jakarta",
    "warehouse builder surabaya",
    "factory construction medan",
    // Indonesian local keywords
    "gudang baja",
    "fabrikasi struktur baja",
    "konstruksi baja",
    "workshop prefab",
    "pabrik baja",
  ],
  openGraph: {
    title: "Steel Structure Indonesia | Warehouse & Factory Construction",
    description:
      "Leading steel structure manufacturer for Indonesia. CE certified, 30-year warranty. Custom warehouse, factory, and commercial buildings.",
    url: "https://www.laotie-steel.com/steel-structure-indonesia",
    siteName: "Laotie Steel Structure",
    locale: "en_ID",
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/steel-structure-indonesia" },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Indonesia | Laotie Steel",
    description: "Leading steel structure manufacturer for Indonesia. CE certified, 30-year warranty.",
    images: ["/images/indonesia/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp"],
  },
};

export default function SteelStructureIndonesia() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Steel Structure Construction in Indonesia",
    provider: {
      "@type": "Organization",
      name: "Laotie Steel Structure",
      url: "https://www.laotie-steel.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    serviceType: "Steel Structure Construction",
    description:
      "Custom steel structure solutions for Indonesian market: warehouses, factories, commercial buildings with earthquake and tsunami resistance.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a steel structure warehouse cost in Indonesia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A basic 1,000 m² warehouse costs USD 45-70 per m² (IDR 700,000-1,100,000 per m²) including materials and installation. Final price depends on seismic zone, wind load, and customization.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a steel structure in Indonesia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical timeline: Design & permitting (2-3 weeks), Fabrication in China (3-4 weeks), Shipping to Indonesia (1-2 weeks), Installation in Indonesia (2-4 weeks). Total: 8-13 weeks.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle Indonesian building permits (IMB)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide technical drawings and structural calculations that comply with Indonesian building codes (SNI). We can work with your local consultant to obtain IMB (Izin Mendirikan Bangunan).",
        },
      },
      {
        "@type": "Question",
        name: "Can your structures withstand earthquakes and tsunamis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We design structures to withstand Indonesia's seismic zones (up to Zone 8). We also consider tsunami risk for coastal areas. All designs are engineered for local conditions.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide installation services in Indonesia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we have experienced installation teams that can travel to Jakarta, Surabaya, Medan, and other cities. We also provide remote guidance and training for local teams.",
        },
      },
      {
        "@type": "Question",
        name: "What are your payment terms for Indonesian clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept T/T (bank transfer), L/C (letter of credit), and can work with Indonesian banks. Typical terms: 30% deposit, 60% before shipping, 10% after installation.",
        },
      },
    ],
  };

  return (
    <><Header />
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Steel Structure Indonesia", href: "/steel-structure-indonesia" },
          ]}
        />
      </div>
    </div>
    <main className="min-h-screen bg-white">
      <LandingPageTracker country="indonesia" pageType="indonesia" />
      <JsonLd data={schemaData} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-steel to-steel-light text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/indonesia/679234a53ccd9c56cf26658f4f072138.webp"
            alt="Steel structure warehouse in Indonesia"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Steel Structure Solutions for <span className="text-cta">Indonesia</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            CE certified steel structures designed for Indonesia's seismic zones and tropical climate.
            15+ years experience, 30-year warranty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-cta rounded-lg hover:bg-orange-600 transition-colors"
            >
              Get Free Quote →
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-steel bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              View Indonesia Projects
            </a>
            <a
              href="/calculator?location=indonesia"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-cta bg-white/20 rounded-lg hover:bg-cta hover:text-white transition-colors"
            >
              📐 Try Cost Calculator
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            Why Choose Laotie Steel for Indonesia?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimator animation="fade-in" delay={0}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold text-steel mb-2">Earthquake Resistant</h3>
              <p className="text-gray-600">
                Designs engineered for Indonesia's seismic zones (up to Zone 8). Complies with SNI
                building codes.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={200}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌴</span>
              </div>
              <h3 className="text-xl font-semibold text-steel mb-2">Tropical Climate Ready</h3>
              <p className="text-gray-600">
                Hot-dip galvanization (ASTM A123) protects against high humidity and salt air. 30-year
                anti-corrosion warranty.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={400}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-cta/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚢</span>
              </div>
              <h3 className="text-xl font-semibold text-steel mb-2">Local Logistics</h3>
              <p className="text-gray-600">
                Shipping to Tanjung Priok (Jakarta), Surabaya, Medan. Customs clearance support.
                Fast delivery across Indonesia.
              </p>
            </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Why Indonesia */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            Why Steel Structures in Indonesia?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-steel mb-3">🌋 Seismic Safety</h3>
              <p className="text-gray-600">
                Indonesia sits on the Pacific Ring of Fire. Our structures are engineered with
                high-strength bolts and seismic bracing to withstand earthquakes up to Zone 8.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-steel mb-3">💰 Cost Effective</h3>
              <p className="text-gray-600">
                Steel structures cost 30-40% less than concrete buildings in Indonesia. Faster
                construction means earlier operational dates and faster ROI.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-steel mb-3">🔧 Flexible & Expandable</h3>
              <p className="text-gray-600">
                Bolt-together design allows easy expansion as your business grows. Relocatable -
                disassemble and rebuild at a new site.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-steel mb-3">🛡️ Low Maintenance</h3>
              <p className="text-gray-600">
                Galvanized steel resists rust in tropical climate. 30-year warranty. Minimal
                upkeep costs compared to concrete or wood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics & Installation */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            Logistics & Installation in Indonesia
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-steel/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚢</span>
              </div>
              <h3 className="text-xl font-semibold text-steel mb-2">Shipping to Indonesia</h3>
              <p className="text-gray-600 mb-4">
                We ship to major Indonesian ports: Tanjung Priok (Jakarta), Tanjung Perak
                (Surabaya), Belawan (Medan).
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Container shipping (40HQ)</li>
                <li>✅ Breakbulk for oversized components</li>
                <li>✅ Door-to-door service available</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-steel/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-steel mb-2">Customs & Permits</h3>
              <p className="text-gray-600 mb-4">
                We provide all necessary documentation for Indonesian customs and building permits
                (IMB).
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Commercial invoice & packing list</li>
                <li>✅ Certificate of Origin (Form E)</li>
                <li>✅ Structural calculations (SNI compliant)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-steel/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-steel mb-2">Installation Support</h3>
              <p className="text-gray-600 mb-4">
                Our experienced teams can travel to Jakarta, Surabaya, Medan, and other cities
                for on-site installation.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Professional installation team</li>
                <li>✅ Remote guidance & training</li>
                <li>✅ Local partner network</li>
              </ul>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-steel mb-6 text-center">
              Project Timeline for Indonesia
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-cta">1</span>
                </div>
                <h4 className="font-semibold text-steel mb-1">Design & Permits</h4>
                <p className="text-sm text-gray-600">2-3 weeks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-cta">2</span>
                </div>
                <h4 className="font-semibold text-steel mb-1">Fabrication in China</h4>
                <p className="text-sm text-gray-600">3-4 weeks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-cta">3</span>
                </div>
                <h4 className="font-semibold text-steel mb-1">Shipping to Indonesia</h4>
                <p className="text-sm text-gray-600">1-2 weeks</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-cta">4</span>
                </div>
                <h4 className="font-semibold text-steel mb-1">Installation</h4>
                <p className="text-sm text-gray-600">2-4 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Project Cases - Carousel */}
      <ProjectCarousel
        title="Recent Projects in Indonesia"
        subtitle="We have completed 100+ steel structure projects across Indonesia. Here are some of our recent works."
        projects={[
          {
            image: "/images/indonesia/679234a53ccd9c56cf26658f4f072138.webp",
            alt: "Steel structure warehouse in Jakarta, Indonesia - 5,000 sqm prefab building with seismic design",
            title: "Jakarta Warehouse Complex",
            description: "5,000 m² steel structure warehouse for logistics company in Jakarta. Seismic Zone 6 design.",
            tags: [
              { label: "Warehouse", color: "bg-green-100 text-green-800" },
              { label: "Jakarta", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/67dd07a1917aa291f1631e16ce010c88.webp",
            alt: "Steel structure factory in Surabaya, Indonesia - 3,000 sqm automotive parts manufacturing",
            title: "Surabaya Manufacturing Plant",
            description: "3,000 m² factory building for automotive parts manufacturer. High humidity protection.",
            tags: [
              { label: "Factory", color: "bg-green-100 text-green-800" },
              { label: "Surabaya", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/688e07390f62e21cbb8bd1a1ba455959.webp",
            alt: "Steel structure cold storage in Medan, Indonesia - 2,000 sqm temperature controlled warehouse",
            title: "Medan Cold Storage Facility",
            description: "2,000 m² cold storage warehouse with insulated panels. Temperature control design.",
            tags: [
              { label: "Cold Storage", color: "bg-green-100 text-green-800" },
              { label: "Medan", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp",
            alt: "Steel structure factory in Semarang, Indonesia - 6,100+ sqm textile manufacturing plant",
            title: "Semarang Industrial Park",
            description: "6,100+ m² steel structure factory for textile manufacturer. Central Java region.",
            tags: [
              { label: "Factory", color: "bg-green-100 text-green-800" },
              { label: "Semarang", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/3c827b0a462391a3e3486e39a5ae25d4.webp",
            alt: "Steel structure warehouse in Makassar, Indonesia - 4,200 sqm logistics distribution center",
            title: "Makassar Logistics Warehouse",
            description: "4,200 m² distribution center in Makassar. Strategic location for Eastern Indonesia.",
            tags: [
              { label: "Warehouse", color: "bg-green-100 text-green-800" },
              { label: "Makassar", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/5704819281f8e9ad3038915e967864ad.webp",
            alt: "Steel structure palm oil processing plant in Palembang, Indonesia - 5,100+ sqm facility",
            title: "Palembang Palm Oil Facility",
            description: "5,100+ m² steel structure facility for palm oil processing. Corrosion-resistant coating.",
            tags: [
              { label: "Processing", color: "bg-green-100 text-green-800" },
              { label: "Palembang", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/1a3e5a019b4c71eda2da853679708074.webp",
            alt: "Steel structure mining workshop in Balikpapan, Indonesia - 3,800 sqm heavy-duty",
            title: "Balikpapan Mining Workshop",
            description: "3,800 m² heavy-duty workshop with 20-ton crane system. Oil & gas industry.",
            tags: [
              { label: "Workshop", color: "bg-green-100 text-green-800" },
              { label: "Balikpapan", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/7ea1821bc8fdfac59547d2c042c2f6ae.webp",
            alt: "Steel structure commercial building in Denpasar, Indonesia - 2,100+ sqm showroom",
            title: "Denpasar Showroom & Warehouse",
            description: "2,100+ m² combined showroom and warehouse. Bali tourism infrastructure.",
            tags: [
              { label: "Commercial", color: "bg-green-100 text-green-800" },
              { label: "Denpasar", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/967a25ac2c3ec808229a990e27529ba2.webp",
            alt: "Steel structure textile factory in Bandung, Indonesia - 7,000 sqm with ventilation",
            title: "Bandung Textile Factory",
            description: "7,000 m² steel structure factory for textile production. High roof ventilation.",
            tags: [
              { label: "Factory", color: "bg-green-100 text-green-800" },
              { label: "Bandung", color: "bg-gray-100 text-gray-800" },
            ],
          },
          {
            image: "/images/indonesia/bd585762b3e967334100+d3660029a1ab4.webp",
            alt: "Steel structure warehouse in Batam, Indonesia - 4,100+ sqm free trade zone",
            title: "Batam Free Trade Zone Warehouse",
            description: "4,100+ m² steel warehouse in Batam FTZ. Export-oriented business.",
            tags: [
              { label: "Warehouse", color: "bg-green-100 text-green-800" },
              { label: "Batam", color: "bg-gray-100 text-gray-800" },
            ],
          },
        ]}
      />

      {/* Solutions */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            Our Solutions for Indonesia
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-steel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏭</span>
              </div>
              <h3 className="text-lg font-semibold text-steel mb-2">Warehouse Buildings</h3>
              <p className="text-gray-600 text-sm">
                Logistics, distribution, cold storage. Seismic resistant design.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-steel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold text-steel mb-2">Factory Buildings</h3>
              <p className="text-gray-600 text-sm">
                Manufacturing plants, workshops. High humidity protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-steel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="text-lg font-semibold text-steel mb-2">Commercial Buildings</h3>
              <p className="text-gray-600 text-sm">
                Showrooms, office buildings, retail. Modern design options.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-steel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="text-lg font-semibold text-steel mb-2">Agricultural Structures</h3>
              <p className="text-gray-600 text-sm">
                Farm buildings, equipment storage. Ventilation design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            What Our Indonesian Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cta/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-cta">B</span>
                </div>
                <div>
                  <h4 className="font-semibold text-steel">Budi Santoso</h4>
                  <p className="text-sm text-gray-600">Jakarta, Indonesia</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The seismic design gave us confidence. After experiencing several earthquakes, our
                warehouse remained structurally sound. Excellent quality and professional service."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cta/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-cta">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-steel">Sri Wahyuni</h4>
                  <p className="text-sm text-gray-600">Surabaya, Indonesia</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The galvanized coating has performed exceptionally well in Surabaya's humid climate.
                Three years with no rust issues. Very satisfied with the investment."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cta/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-cta">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-steel">Ahmad Hidayat</h4>
                  <p className="text-sm text-gray-600">Medan, Indonesia</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Fast delivery to Belawan port and smooth customs clearance. The installation team
                was professional and completed ahead of schedule. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            Frequently Asked Questions (Indonesia)
          </h2>
          <div className="space-y-6">
            <details className="bg-white p-6 rounded-xl shadow-sm">
              <summary className="text-lg font-semibold text-steel cursor-pointer">
                How much does a steel structure warehouse cost in Indonesia?
              </summary>
              <p className="mt-4 text-gray-600">
                A basic 1,000 m² warehouse costs <strong>USD 45-70 per m²</strong> (IDR
                700,000-1,100,000 per m²) including materials and installation. Final price depends
                on seismic zone, wind load, and customization. Contact us for a detailed quote.
              </p>
            </details>
            <details className="bg-white p-6 rounded-xl shadow-sm">
              <summary className="text-lg font-semibold text-steel cursor-pointer">
                How long does it take to build a steel structure in Indonesia?
              </summary>
              <p className="mt-4 text-gray-600">
                Typical timeline: Design & permitting (2-3 weeks), Fabrication in China (3-4
                weeks), Shipping to Indonesia (1-2 weeks), Installation in Indonesia (2-4 weeks).
                Total: <strong>8-13 weeks</strong>.
              </p>
            </details>
            <details className="bg-white p-6 rounded-xl shadow-sm">
              <summary className="text-lg font-semibold text-steel cursor-pointer">
                Do you handle Indonesian building permits (IMB)?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, we provide technical drawings and structural calculations that comply with
                Indonesian building codes (SNI). We can work with your local consultant to obtain
                IMB (Izin Mendirikan Bangunan).
              </p>
            </details>
            <details className="bg-white p-6 rounded-xl shadow-sm">
              <summary className="text-lg font-semibold text-steel cursor-pointer">
                Can your structures withstand earthquakes and tsunamis?
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutely. We design structures to withstand Indonesia's seismic zones (up to Zone
                8). We also consider tsunami risk for coastal areas. All designs are engineered for
                local conditions.
              </p>
            </details>
            <details className="bg-white p-6 rounded-xl shadow-sm">
              <summary className="text-lg font-semibold text-steel cursor-pointer">
                Do you provide installation services in Indonesia?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, we have experienced installation teams that can travel to Jakarta, Surabaya,
                Medan, and other cities. We also provide remote guidance and training for local
                teams.
              </p>
            </details>
            <details className="bg-white p-6 rounded-xl shadow-sm">
              <summary className="text-lg font-semibold text-steel cursor-pointer">
                What are your payment terms for Indonesian clients?
              </summary>
              <p className="mt-4 text-gray-600">
                We accept T/T (bank transfer), L/C (letter of credit), and can work with
                Indonesian banks. Typical terms: <strong>30% deposit, 60% before shipping, 10%
                after installation</strong>.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-steel mb-12">
            Get a Free Quote for Indonesia
          </h2>
          <form className="bg-white rounded-2xl p-8 shadow-sm space-y-6" id="contact-form" action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'kangguangjian91@gmail.com'}`} method="POST" aria-label="Contact inquiry form">
            {/* FormSubmit configuration */}
            <input type="hidden" name="_subject" value="🇮🇩 Indonesia Inquiry — Laotie Steel Website" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none"
                  placeholder="+62 8xx-xxxx-xxxx"
                />
              </div>
              <div>
                <label htmlFor="project-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  id="project-type"
                  name="project-type"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none"
                >
                  <option value="">Select project type</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="factory">Factory</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="agricultural">Agricultural Structure</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="project-size" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Size (m²)
                </label>
                <input
                  type="number"
                  id="project-size"
                  name="project-size"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none"
                  placeholder="e.g., 1000"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location in Indonesia
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none"
                  placeholder="e.g., Jakarta, Surabaya, Medan"
                />
              </div>
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                Project Details
              </label>
              <textarea
                id="details"
                name="details"
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel focus:border-steel outline-none resize-none"
                placeholder="Tell us about your project: dimensions, special requirements, timeline, etc."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-cta rounded-lg hover:bg-orange-600 transition-colors"
              >
                Get Free Quote →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Serving More Countries */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-100 mb-4">Also serving:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/steel-structure-thailand" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Thailand</a>
            <a href="/steel-structure-vietnam" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Vietnam</a>
            <a href="/steel-structure-philippines" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Philippines</a>
            <a href="/steel-structure-nigeria" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Nigeria</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-steel text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Laotie Steel Structure</h3>
              <p className="text-sm opacity-80">
                Leading steel structure manufacturer for Indonesia and Southeast Asia. CE certified,
                30-year warranty.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/products" className="opacity-80 hover:opacity-100">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/projects" className="opacity-80 hover:opacity-100">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/manufacturing-process" className="opacity-80 hover:opacity-100">
                    Manufacturing
                  </a>
                </li>
                <li>
                  <a href="/blog" className="opacity-80 hover:opacity-100">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: info@laotie-steel.com</li>
                <li>Phone: +86 156 8024 9688</li>
                <li>WhatsApp: +86 156 8024 9688</li>
                <li>Office: Jakarta, Indonesia (By Appointment)</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-60">
            <p>&copy; 2026 Laotie Steel Structure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
    <Footer />
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Manufacturer in India | Laotie Steel",
  description:
    "Trusted steel structure manufacturer for India. Custom warehouse, factory & industrial buildings to IS 800. CE & ISO certified. Free INR/USD quote.",
  keywords: [
    "steel structure India",
    "steel building India",
    "warehouse construction India",
    "steel structure price India",
    "prefab building India",
    "industrial building supplier India",
    "steel fabrication India",
    "portal frame India",
    "steel structure manufacturer India",
    "steel warehouse Mumbai",
    "factory building Delhi",
    "industrial construction Chennai",
    "steel building Bangalore",
    "prefab warehouse India",
    "steel structure cost India",
  ],
  openGraph: {
    title: "Steel Structure Manufacturer in India | Laotie Steel",
    description:
      "Custom steel structure solutions for warehouses, factories, and industrial buildings across India. IS 800 compliant, delivered worldwide.",
    images: ["/images/india/hero.webp"],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/steel-structure-india",
    languages: {
      "en-IN": "https://www.laotie-steel.com/steel-structure-india",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Manufacturer in India | Laotie Steel",
    description: "Custom steel structure solutions for warehouses, factories, and industrial buildings across India.",
    images: ["/images/india/hero.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction India",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and industrial buildings in India. IS 800 compliant design and fabrication.",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "2200-4200",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "India",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure warehouse cost in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure warehouse cost in India ranges from INR 2,200 to INR 4,200 per square meter (approx. USD 26-50/sqm), depending on size, design complexity, cladding type, and crane requirements. Laotie offers factory-direct pricing with shipping and installation. Use our free online calculator for an instant estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Does Laotie Steel comply with Indian building codes (IS 800)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our steel structures are engineered to meet IS 800 (General Construction in Steel), IS 1893 (Earthquake Resistant Design), IS 875 (Wind Loads), and IS 808 (Structural Steel Sections). We provide full structural calculations, shop drawings, and certification documents to support your local municipal approvals and Structural Stability Certificate (SSC).",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to import a steel building from China to India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks for fabrication in China, 2-4 weeks for sea freight to Indian ports (Mumbai/Nhava Sheva, Chennai, Mundra, Kolkata), 3-6 weeks for on-site installation. Total: 9-16 weeks from order to handover.",
      },
    },
    {
      "@type": "Question",
      name: "Can you design for India's monsoon climate and seismic zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We design for all Indian climatic zones including high-rainfall monsoon regions (rainfall up to 4,000mm), Seismic Zones IV and V (as per IS 1893), and coastal high-wind regions. Roof slopes, drainage, and anti-corrosion coatings are customized to local conditions. All designs comply with IS 875 and IS 1893.",
      },
    },
    {
      "@type": "Question",
      name: "What is the import duty on steel structures from China to India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structures (HS 7308) imported into India typically attract a Basic Customs Duty (BCD) of 7.5-15%, plus Social Welfare Surcharge of 10% on BCD, and 18% GST (input credit available). Actual rates depend on classification and end-use. We provide full customs documentation including Certificate of Origin and assist with BIS certification requirements where applicable.",
      },
    },
  ],
};

export default function IndiaLandingPage() {
  return (
    <>
      <Header />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Steel Structure India", href: "/steel-structure-india" },
            ]}
          />
        </div>
      </div>
      <main className="min-h-screen">
        <LandingPageTracker country="india" pageType="india" />
        <JsonLd data={serviceSchema} />
        <JsonLd data={faqSchema} />

        {/* ===== Hero Section ===== */}
        <section className="relative bg-gradient-to-r from-orange-700 via-orange-600 to-green-700 text-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                🇮🇳 Engineered for the Indian Market
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Steel Structure Solutions for <br className="hidden sm:block" />
                <span className="text-orange-300">India</span>
              </h1>
              <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto mb-10">
                IS 800 compliant steel buildings — warehouses, factories, hangars, and industrial facilities.
                Fabricated in China, delivered and installed across India.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/calculator?location=india"
                  className="inline-block bg-white text-orange-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition shadow-lg"
                >
                  Get Instant INR Quote →
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
                >
                  Speak to Engineer
                </a>
                <a
                  href="/projects"
                  className="inline-block bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition"
                >
                  View Indian Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Quick Stats ===== */}
        <section className="bg-orange-50 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "20+", label: "Indian Projects" },
                { value: "6", label: "Major Ports Served" },
                { value: "CE, ISO", label: "International Certifications" },
                { value: "IS 800", label: "Indian Standard Compliant" },
              ].map((s) => (
                <div key={s.label} className="p-4">
                  <div className="text-2xl md:text-3xl font-bold text-orange-800 mb-1">{s.value}</div>
                  <div className="text-sm text-orange-700">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why Choose Us ===== */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Why Choose Laotie for Your Indian Project?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                We bridge Chinese manufacturing quality with Indian engineering standards.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "IS 800 Compliant Engineering",
                  desc: "Every structure engineered to meet IS 800, IS 1893, and IS 875. We provide full structural certification for municipal and state-level approvals.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Factory-Direct Pricing (INR/USD)",
                  desc: "Save 30-50% vs local Indian fabricators. Our 5 production lines with 5,000T/month capacity mean competitive pricing on every project.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  title: "Door-to-Door Logistics",
                  desc: "From factory to your site. We handle fabrication, container shipping to any Indian port, customs clearance, and installation.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why Steel for India ===== */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Why Steel Structures for India?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Engineered for Indian conditions — from coastal monsoons to northern seismic zones.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "🌧️ Monsoon & High-Rainfall Ready",
                  desc: "Steep roof slopes (≥15°) and high-capacity gutters handle rainfall up to 4,000mm. Galvanized and color-coated cladding resists corrosion from humidity and acid rain in industrial zones.",
                },
                {
                  title: "🌍 Seismic Zone IV/V Compliant",
                  desc: "Ductile detailing per IS 1893 with moment-resisting connections and bracing systems designed for high seismic zones across northern and northeastern India.",
                },
                {
                  title: "☀️ High Solar Reflectance",
                  desc: "PIR sandwich panels with reflective finish reduce heat absorption by up to 40% compared to standard roofing. Ideal for India's hot climate and reduces HVAC costs.",
                },
                {
                  title: "⚡ Fast Installation",
                  desc: "Bolted connection system enables rapid on-site assembly. A 5,000 sqm warehouse can be erected in 4-6 weeks with a crew of 8-10, minimizing on-site labor costs.",
                },
                {
                  title: "🐜 Termite Proof Construction",
                  desc: "Steel framing eliminates termite risk entirely. Unlike timber, steel requires no chemical treatments and comes with a 50-year design life with zero pest vulnerability.",
                },
                {
                  title: "♻️ 100% Recyclable",
                  desc: "Steel is 100% recyclable. Your building can be fully disassembled and recycled at end of life, supporting IGBC and GRIHA green building certification goals.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Logistics & Timeline ===== */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Logistics & Installation Timeline
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                From Shenzhen factory to your Indian site in 9-16 weeks.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="text-3xl font-bold text-orange-800 mb-2">Weeks 1-6</div>
                <h3 className="font-bold text-gray-900 mb-2">🎯 Design & Fabrication</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Structural engineering to IS 800</li>
                  <li>✓ Shop drawings & approval documents</li>
                  <li>✓ Steel fabrication in 5 production lines</li>
                  <li>✓ IS 808 compliant steel sections</li>
                  <li>✓ Pre-shipment inspection & photos</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="text-3xl font-bold text-orange-800 mb-2">Weeks 7-10</div>
                <h3 className="font-bold text-gray-900 mb-2">🚢 Shipping to India</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Container loading at Qingdao/Shanghai</li>
                  <li>✓ 2-4 weeks sea freight</li>
                  <li>✓ Port options: Mumbai (Nhava Sheva), Chennai, Mundra, Kolkata, Visakhapatnam, Kochi</li>
                  <li>✓ Customs clearance support</li>
                  <li>✓ Port-side delivery or direct to site</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="text-3xl font-bold text-orange-800 mb-2">Weeks 11-16</div>
                <h3 className="font-bold text-gray-900 mb-2">🔧 Installation & Handover</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ On-site assembly by licensed crew</li>
                  <li>✓ Crane & equipment coordination</li>
                  <li>✓ Bolted connection (no welding on site)</li>
                  <li>✓ Quality inspection & punch list</li>
                  <li>✓ Final handover & warranty docs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Project Cases — Carousel ===== */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ProjectCarousel
              title="Our Projects in India"
              subtitle="From warehouse complexes to industrial facilities — here are recent steel structure projects we've delivered in India."
              projects={[
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Logistics warehouse steel structure in Mumbai, India - 6,500 sqm portal frame building",
                  title: "Mumbai Logistics Warehouse",
                  description: "6,500 sqm portal frame warehouse with 12m eave height. Located in Bhiwandi logistics hub with 10T overhead crane for heavy cargo handling.",
                  tags: [
                    { label: "Logistics", color: "bg-green-100 text-green-800" },
                    { label: "Mumbai", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Industrial factory building in Delhi NCR, India - 4,800 sqm manufacturing facility",
                  title: "Delhi NCR Manufacturing Facility",
                  description: "4,800 sqm factory building with mezzanine office floor. Designed for Seismic Zone IV compliance with 5T crane and PEB framing system.",
                  tags: [
                    { label: "Factory", color: "bg-blue-100 text-blue-800" },
                    { label: "Delhi NCR", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Automotive parts warehouse in Chennai, India - 8,200 sqm steel structure",
                  title: "Chennai Automotive Warehouse",
                  description: "8,200 sqm multi-span warehouse for automotive parts storage. 14m eave height with 15T cranes across two bays, located in Oragadam industrial corridor.",
                  tags: [
                    { label: "Automotive", color: "bg-orange-100 text-orange-800" },
                    { label: "Chennai", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Tech park steel structure in Bangalore, India - 5,500 sqm industrial building",
                  title: "Bangalore Tech Park Facility",
                  description: "5,500 sqm industrial facility for a tech manufacturing client. Seismic Zone II design with high-grade paint system for IT corridor environment.",
                  tags: [
                    { label: "Tech Park", color: "bg-purple-100 text-purple-800" },
                    { label: "Bangalore", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Agricultural storage shed in Pune, India - 3,000 sqm steel building",
                  title: "Pune Agricultural Storage Shed",
                  description: "3,000 sqm galvanized steel storage shed for agricultural produce. Natural ventilation design with ridge monitors for monsoon humidity control.",
                  tags: [
                    { label: "Agricultural", color: "bg-yellow-100 text-yellow-800" },
                    { label: "Pune", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Cold storage facility in Hyderabad, India - 4,000 sqm insulated steel building",
                  title: "Hyderabad Cold Storage Facility",
                  description: "4,000 sqm insulated warehouse with 150mm PIR panels. Maintains -25°C for frozen food storage with full backup power systems.",
                  tags: [
                    { label: "Cold Storage", color: "bg-indigo-100 text-indigo-800" },
                    { label: "Hyderabad", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Textile factory building in Surat, India - 7,000 sqm steel structure",
                  title: "Surat Textile Manufacturing Plant",
                  description: "7,000 sqm textile factory with high-bay storage and overhead crane systems. Designed for high humidity with anti-corrosion coating systems.",
                  tags: [
                    { label: "Textile", color: "bg-pink-100 text-pink-800" },
                    { label: "Surat", color: "bg-gray-100 text-gray-800" },
                  ],
                },
              ]}
            />
          </div>
        </section>

        {/* ===== Services / Solutions ===== */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Steel Structure Solutions for India
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Every project customized to your site, budget, and Indian compliance requirements.
              </p>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🏭",
                  title: "Warehouse & Logistics",
                  desc: "Clear span and multi-span warehouses. 20-60m spans, 8-16m eave heights. Ideal for Bhiwandi, Nagpur, and Hyderabad logistics hubs.",
                  link: "/products",
                },
                {
                  icon: "🔧",
                  title: "Factory & Manufacturing",
                  desc: "Production facilities integrated with 5-50T overhead cranes. Multi-bay layouts with expansion capability for industrial corridors.",
                  link: "/products/portal-frame",
                },
                {
                  icon: "🌾",
                  title: "Agricultural & Cold Storage",
                  desc: "Grain storage, livestock housing, and cold storage facilities. Galvanized options and PIR insulation for monsoon and tropical conditions.",
                  link: "/products",
                },
                {
                  icon: "🏗️",
                  title: "Commercial & Industrial",
                  desc: "Showrooms, workshops, and multi-purpose industrial buildings. Seismic Zone IV/V designs with moment-resisting frames.",
                  link: "/products",
                },
              ].map((s) => (
                <a key={s.title} href={s.link} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:border-orange-200">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-orange-600 text-sm font-semibold group-hover:underline">Learn More →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="py-16 md:py-20 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                What Our Indian Clients Say
              </h2>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Patel",
                  company: "Patel Logistics Pvt Ltd",
                  location: "Mumbai, Maharashtra",
                  text: "Laotie delivered our Bhiwandi warehouse on time and to IS 800 standards. Their structural calculations were verified by our Indian engineer. Significant savings compared to local fabricators.",
                  project: "6,500 sqm Warehouse, Mumbai",
                },
                {
                  name: "Priya Sharma",
                  company: "Sharma Manufacturing Group",
                  location: "Delhi NCR",
                  text: "The factory building exceeded our expectations. The bolted connection system made installation fast and clean. Their team handled all import documentation efficiently.",
                  project: "4,800 sqm Factory, Delhi NCR",
                },
                {
                  name: "Karthik Reddy",
                  company: "Chennai Auto Components",
                  location: "Chennai, Tamil Nadu",
                  text: "We needed a large automotive warehouse with cranes. Laotie's engineering team designed to Seismic Zone III with full anti-corrosion coating. Quality is excellent.",
                  project: "8,200 sqm Warehouse, Chennai",
                },
              ].map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">"{t.text}"</p>
                  <div className="border-t border-orange-100 pt-4">
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.location}</p>
                    <p className="text-xs text-orange-600 font-medium mt-1">{t.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Calculator CTA ===== */}
        <section className="py-12 bg-gradient-to-r from-orange-700 via-orange-600 to-green-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get an Instant INR Estimate
            </h2>
            <p className="text-orange-100 mb-8 max-w-lg mx-auto">
              Use our free calculator to price your steel structure in Indian Rupees or US Dollars. Adjust building type, size, crane, and location.
            </p>
            <a
              href="/calculator?location=india"
              className="inline-block bg-white text-orange-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition shadow-lg"
            >
              Open Cost Calculator →
            </a>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
            </ScrollAnimator>
            <div className="space-y-4">
              {[
                {
                  q: "How much does a steel building cost per square metre in India?",
                  a: "Steel structure costs in India range from INR 2,200-4,200 per sqm (USD 26-50/sqm) for a basic warehouse to INR 4,500-7,500 per sqm (USD 54-90/sqm) for a fully fitted factory with cranes and insulation. Use our online calculator for an instant estimate tailored to your project.",
                },
                {
                  q: "What Indian standards do you comply with?",
                  a: "We design and fabricate to IS 800 (General Construction in Steel), IS 808 (Structural Steel Sections), IS 875 (Wind Loads), IS 1893 (Earthquake Resistant Design), IS 816 (Welding), and IS 814 (Welding Electrodes). Full compliance documentation provided for municipal and state-level approvals.",
                },
                {
                  q: "Can you handle municipal and state-level building approvals in India?",
                  a: "Yes. We provide complete structural engineering calculations, shop drawings, anchor bolt plans, and material certificates required for your building permit applications to local municipalities and state development authorities. Documentation supports Structural Stability Certificate (SSC) requirements.",
                },
                {
                  q: "What is the import duty on steel structures from China to India?",
                  a: "Steel structures (HS 7308) imported into India typically attract Basic Customs Duty (BCD) of 7.5-15%, plus Social Welfare Surcharge of 10% on BCD, and 18% GST (input credit available). Actual rates depend on classification and end-use. We provide full customs documentation including Certificate of Origin.",
                },
                {
                  q: "Do you offer a warranty on steel structures?",
                  a: "Yes. We provide a 15-year structural warranty against manufacturing defects and a 30-year warranty on galvanized steel components. Paint/coating warranty depends on the environmental classification (standard: 10 years, marine/industrial: 5 years).",
                },
                {
                  q: "How do I start my project with Laotie?",
                  a: "Step 1: Use our calculator for a preliminary estimate. Step 2: Contact us with your drawings or requirements. Step 3: We provide a detailed quotation with structural design within 48 hours. Step 4: After order confirmation, fabrication begins within 2 weeks.",
                },
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact Form ===== */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Get a Free Quote for Your Indian Project
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Fill in the form below and our India desk team will respond within 24 hours with a detailed quotation.
              </p>
            </ScrollAnimator>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
              <form action="https://formsubmit.co/kangguangjian91@gmail.com" method="POST" className="grid md:grid-cols-2 gap-5">
                <input type="hidden" name="_subject" value="🇮🇳 India Inquiry - Laotie Steel" />
                <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" name="name" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="e.g. Rajesh Patel" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="rajesh@example.in" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" name="phone" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="+91 98XXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Type *</label>
                  <select name="project_type" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Select project type</option>
                    <option value="warehouse">Warehouse / Logistics</option>
                    <option value="factory">Factory / Manufacturing</option>
                    <option value="cold-storage">Cold Storage</option>
                    <option value="agricultural">Agricultural / Farm Shed</option>
                    <option value="commercial">Commercial / Showroom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Location in India</label>
                  <select name="project_location" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Select city / region</option>
                    <option value="mumbai">Mumbai, Maharashtra</option>
                    <option value="delhi">Delhi NCR</option>
                    <option value="chennai">Chennai, Tamil Nadu</option>
                    <option value="bangalore">Bangalore, Karnataka</option>
                    <option value="hyderabad">Hyderabad, Telangana</option>
                    <option value="pune">Pune, Maharashtra</option>
                    <option value="kolkata">Kolkata, West Bengal</option>
                    <option value="ahmedabad">Ahmedabad, Gujarat</option>
                    <option value="surat">Surat, Gujarat</option>
                    <option value="other">Other / Regional</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Building Size (approx.)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="length" placeholder="Length (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                    <input type="number" name="width" placeholder="Width (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Details *</label>
                  <textarea name="message" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Describe your project: building use, roof type, crane requirements, insulation needs, delivery timeline..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-orange-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-orange-800 transition shadow-lg">
                    Send Inquiry — Get Free Quote →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ===== Also Serving ===== */}
        <section className="py-12 bg-orange-50 border-t border-orange-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Also Serving</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Philippines", href: "/steel-structure-philippines" },
                { name: "Vietnam", href: "/steel-structure-vietnam" },
                { name: "Indonesia", href: "/steel-structure-indonesia" },
                { name: "Thailand", href: "/steel-structure-thailand" },
                { name: "Nigeria", href: "/steel-structure-nigeria" },
                { name: "Australia", href: "/steel-structure-australia" },
                { name: "USA", href: "/contact" },
                { name: "United Kingdom", href: "/contact" },
              ].map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  className="inline-block px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-orange-200 hover:bg-orange-100 hover:text-orange-800 transition-colors"
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <div className="bg-orange-900 text-orange-200 text-xs text-center py-3 px-4">
        Serving India: Mumbai | Delhi NCR | Chennai | Bangalore | Hyderabad | Pune | Kolkata | Ahmedabad | Surat | Visakhapatnam
      </div>
      <Footer />
    </>
  );
}

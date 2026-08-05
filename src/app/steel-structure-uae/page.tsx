import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Supplier in UAE & Dubai | Laotie Steel",
  description:
    "Leading steel structure supplier for UAE & Dubai. Custom warehouse, factory & industrial buildings for C4 corrosion environments. Free AED/USD quote.",
  keywords: [
    "steel structure UAE",
    "steel building Dubai",
    "warehouse construction UAE",
    "steel structure price Dubai",
    "steel fabrication UAE",
    "industrial building supplier UAE",
    "steel structure Abu Dhabi",
    "portal frame UAE",
    "steel structure manufacturer UAE",
    "steel warehouse Sharjah",
    "prefab building Dubai",
    "steel structure cost UAE",
    "warehouse construction Dubai",
    "industrial construction UAE",
    "steel building contractors Dubai",
  ],
  openGraph: {
    title: "Steel Structure Supplier in UAE & Dubai | Laotie Steel",
    description:
      "Custom steel structure solutions for warehouses, factories, and industrial buildings across UAE & Dubai. C4 corrosion compliant, delivered worldwide.",
    images: ["/images/uae/hero.webp"],
    locale: "en_AE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/steel-structure-uae",
    languages: {
      "en-AE": "https://www.laotie-steel.com/steel-structure-uae",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Supplier in UAE & Dubai | Laotie Steel",
    description: "Custom steel structure solutions for warehouses, factories, and industrial buildings across UAE & Dubai.",
    images: ["/images/uae/hero.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction UAE",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and industrial buildings in UAE. Dubai Municipality compliant design for C4 corrosion environments.",
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "1200-2400",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "United Arab Emirates",
    },
  },
};


export default function UAELandingPage() {
  return (
    <>
      <Header />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Steel Structure UAE & Dubai", href: "/steel-structure-uae" },
            ]}
          />
        </div>
      </div>
      <main className="min-h-screen">
        <LandingPageTracker country="uae" pageType="uae" />
        <JsonLd data={serviceSchema} />

        {/* ===== Hero Section ===== */}
        <section className="relative bg-gradient-to-r from-emerald-800 via-emerald-700 to-red-800 text-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                🇦🇪 Engineered for the UAE & Dubai Market
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Steel Structure Solutions for <br className="hidden sm:block" />
                <span className="text-emerald-300">UAE & Dubai</span>
              </h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-10">
                Dubai Municipality compliant steel buildings — warehouses, factories, logistics hubs, and industrial facilities.
                Fabricated in China, delivered and installed across the Emirates.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/calculator?location=uae"
                  className="inline-block bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition shadow-lg"
                >
                  Get Instant AED Quote →
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
                >
                  Speak to Engineer
                </a>
                <a
                  href="/projects"
                  className="inline-block bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition"
                >
                  View UAE Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Quick Stats ===== */}
        <section className="bg-emerald-50 border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "12+", label: "UAE Projects" },
                { value: "3", label: "Major Ports Served" },
                { value: "CE, ISO", label: "International Certifications" },
                { value: "C4 (ISO 12944)", label: "Corrosion Rating Compliant" },
              ].map((s) => (
                <div key={s.label} className="p-4">
                  <div className="text-2xl md:text-3xl font-bold text-emerald-800 mb-1">{s.value}</div>
                  <div className="text-sm text-emerald-700">{s.label}</div>
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
                Why Choose Laotie for Your UAE Project?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                We bridge Chinese manufacturing quality with UAE engineering standards.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "Dubai Municipality Compliant Engineering",
                  desc: "Every structure engineered to meet Dubai Municipality Code, ADIBC, and UAE Fire & Life Safety Code. We provide full structural certification for municipality and Civil Defense approvals.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Factory-Direct Pricing (AED/USD)",
                  desc: "Save 30-50% vs local UAE fabricators. Our 5 production lines with 5,000T/month capacity mean competitive pricing on every project.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  title: "Door-to-Door Logistics",
                  desc: "From factory to your site. We handle fabrication, container shipping to Jebel Ali/Khalifa/Sharjah ports, customs clearance, and installation.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why Steel for UAE ===== */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Why Steel Structures for UAE?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Engineered for UAE conditions — extreme heat, high humidity, and C4 corrosive coastal environments.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "🌡️ High-Temperature Resistant (up to 50°C)",
                  desc: "Steel framing and PIR insulated panels designed for ambient temperatures up to 50°C. Thermal break systems prevent heat transfer, keeping interiors 15-20°C cooler than outside.",
                },
                {
                  title: "🛡️ C4 Corrosion Protection (ISO 12944)",
                  desc: "Marine-grade 3-layer coating system (350+ microns DFT), hot-dip galvanizing, and stainless steel fasteners for high-corrosivity coastal environments in Dubai, Abu Dhabi, and Sharjah.",
                },
                {
                  title: "💨 High Wind Load Design",
                  desc: "Engineered for UAE wind loads per Dubai Municipality and ASCE 7 standards. Portal frames with moment connections handle desert windstorms and Shamal winds.",
                },
                {
                  title: "🔥 Civil Defense Fire Rated",
                  desc: "Fire-rated cladding and coatings compliant with UAE Fire & Life Safety Code of Practice. Panels available with 60-120 minute fire resistance ratings for Civil Defense approval.",
                },
                {
                  title: "⚡ Fast Installation",
                  desc: "Bolted connection system enables rapid on-site assembly. A 5,000 sqm warehouse can be erected in 4-6 weeks with a crew of 8-10, ideal for fast-track UAE projects.",
                },
                {
                  title: "♻️ 100% Recyclable",
                  desc: "Steel is 100% recyclable. Your building can be fully disassembled and recycled at end of life, supporting Estidama Pearl Rating and LEED green building certification goals.",
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
                From Shenzhen factory to your UAE site in 9-15 weeks.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <div className="text-3xl font-bold text-emerald-800 mb-2">Weeks 1-6</div>
                <h3 className="font-bold text-gray-900 mb-2">🎯 Design & Fabrication</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Structural engineering to Dubai Municipality Code</li>
                  <li>✓ Shop drawings & municipality submission docs</li>
                  <li>✓ Steel fabrication in 5 production lines</li>
                  <li>✓ C4 corrosion protection coating (ISO 12944)</li>
                  <li>✓ Pre-shipment inspection & photos</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <div className="text-3xl font-bold text-emerald-800 mb-2">Weeks 7-9</div>
                <h3 className="font-bold text-gray-900 mb-2">🚢 Shipping to UAE</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Container loading at Qingdao/Shanghai</li>
                  <li>✓ 2-3 weeks sea freight</li>
                  <li>✓ Port options: Jebel Ali (Dubai), Khalifa (Abu Dhabi), Sharjah Port, Khorfakkan</li>
                  <li>✓ Customs clearance support (5% duty + 5% VAT)</li>
                  <li>✓ Port-side delivery or direct to site</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                <div className="text-3xl font-bold text-emerald-800 mb-2">Weeks 10-15</div>
                <h3 className="font-bold text-gray-900 mb-2">🔧 Installation & Handover</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ On-site assembly by licensed crew</li>
                  <li>✓ Crane & equipment coordination</li>
                  <li>✓ Bolted connection (no welding on site)</li>
                  <li>✓ Civil Defense inspection coordination</li>
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
              title="Our Projects in UAE"
              subtitle="From warehouse complexes to logistics hubs — here are recent steel structure projects we've delivered in UAE."
              projects={[
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Logistics warehouse steel structure in Jebel Ali Free Zone, Dubai - 8,000 sqm portal frame building",
                  title: "Jebel Ali Free Zone Logistics Hub",
                  description: "8,000 sqm portal frame warehouse with 14m eave height. Located in JAFZA with 15T overhead crane and full C4 corrosion protection coating.",
                  tags: [
                    { label: "Logistics", color: "bg-green-100 text-green-800" },
                    { label: "Dubai", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Industrial warehouse in Abu Dhabi, UAE - 6,200 sqm steel structure building",
                  title: "Abu Dhabi Industrial Warehouse",
                  description: "6,200 sqm multi-span warehouse in ICAD (Industrial City of Abu Dhabi). 12m eave height with mezzanine office floor and 10T cranes.",
                  tags: [
                    { label: "Warehouse", color: "bg-blue-100 text-blue-800" },
                    { label: "Abu Dhabi", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Steel structure distribution center in Sharjah, UAE - 10,500 sqm",
                  title: "Sharjah Distribution Center",
                  description: "10,500 sqm logistics distribution center with 16m eave height. Three-bay design with 20T cranes, located in Hamriyah Free Zone.",
                  tags: [
                    { label: "Distribution", color: "bg-emerald-100 text-emerald-800" },
                    { label: "Sharjah", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Manufacturing facility in Dubai Investment Park, UAE - 5,800 sqm",
                  title: "Dubai Investment Park Factory",
                  description: "5,800 sqm manufacturing facility with clean room annex. Designed for 50°C ambient temperature with PIR insulation and UV-resistant cladding.",
                  tags: [
                    { label: "Factory", color: "bg-orange-100 text-orange-800" },
                    { label: "Dubai", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Cold storage facility in Dubai, UAE - 4,500 sqm insulated steel building",
                  title: "Dubai Cold Storage Facility",
                  description: "4,500 sqm insulated warehouse with 200mm PIR panels. Maintains -30°C for frozen food storage, located in Dubai Industrial Park.",
                  tags: [
                    { label: "Cold Storage", color: "bg-indigo-100 text-indigo-800" },
                    { label: "Dubai", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Steel structure warehouse in Ras Al Khaimah, UAE - 3,800 sqm",
                  title: "Ras Al Khaimah Storage Building",
                  description: "3,800 sqm industrial storage building with 10m eave height. Galvanized steel frame for long-term corrosion resistance in coastal environment.",
                  tags: [
                    { label: "Storage", color: "bg-purple-100 text-purple-800" },
                    { label: "RAK", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Multi-purpose industrial building in Fujairah, UAE - 5,200 sqm",
                  title: "Fujairah Multi-Purpose Facility",
                  description: "5,200 sqm multi-purpose industrial building with office annex. Located in Fujairah Free Zone with C4 marine-grade coating system.",
                  tags: [
                    { label: "Multi-Purpose", color: "bg-pink-100 text-pink-800" },
                    { label: "Fujairah", color: "bg-gray-100 text-gray-800" },
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
                Steel Structure Solutions for UAE
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Every project customized to your site, budget, and UAE compliance requirements.
              </p>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🏭",
                  title: "Warehouse & Logistics",
                  desc: "Clear span and multi-span warehouses. 20-60m spans, 8-16m eave heights. Ideal for JAFZA, DAFZA, Hamriyah, and ICAD industrial zones.",
                  link: "/products",
                },
                {
                  icon: "🔧",
                  title: "Factory & Manufacturing",
                  desc: "Production facilities integrated with 5-50T overhead cranes. Multi-bay layouts with expansion capability for free zone operations.",
                  link: "/products/portal-frame",
                },
                {
                  icon: "❄️",
                  title: "Cold Storage & Food Grade",
                  desc: "Insulated warehouses with 150-200mm PIR panels. Maintains -30°C for frozen food storage. Civil Defense fire-rated options.",
                  link: "/products",
                },
                {
                  icon: "🏗️",
                  title: "Commercial & Industrial",
                  desc: "Showrooms, workshops, and multi-purpose industrial buildings. C4 corrosion protection for coastal locations.",
                  link: "/products",
                },
              ].map((s) => (
                <a key={s.title} href={s.link} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:border-emerald-200">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-emerald-600 text-sm font-semibold group-hover:underline">Learn More →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="py-16 md:py-20 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                What Our UAE Clients Say
              </h2>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ahmed Al Rashid",
                  company: "Rashid Logistics LLC",
                  location: "Dubai, UAE",
                  text: "Laotie delivered our JAFZA warehouse ahead of schedule. Their C4 corrosion protection system is exactly what we needed for the coastal environment. Civil Defense approval was smooth.",
                  project: "8,000 sqm Logistics Hub, Dubai",
                },
                {
                  name: "Khalifa Al Mansouri",
                  company: "Mansouri Industrial Group",
                  location: "Abu Dhabi, UAE",
                  text: "The ICAD warehouse quality exceeded our expectations. Their team handled all documentation for Abu Dhabi Municipality. Highly recommended for industrial projects in UAE.",
                  project: "6,200 sqm Warehouse, Abu Dhabi",
                },
                {
                  name: "Saeed Al Sharqi",
                  company: "Sharjah Distribution Co",
                  location: "Sharjah, UAE",
                  text: "We needed a large distribution center in Hamriyah Free Zone. Laotie's engineering team designed to UAE standards with full thermal insulation. Excellent workmanship.",
                  project: "10,500 sqm Distribution Center, Sharjah",
                },
              ].map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">"{t.text}"</p>
                  <div className="border-t border-emerald-100 pt-4">
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.location}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">{t.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Calculator CTA ===== */}
        <section className="py-12 bg-gradient-to-r from-emerald-800 via-emerald-700 to-red-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get an Instant AED Estimate
            </h2>
            <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
              Use our free calculator to price your steel structure in AED or USD. Adjust building type, size, crane, and location.
            </p>
            <a
              href="/calculator?location=uae"
              className="inline-block bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition shadow-lg"
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
                  q: "How much does a steel building cost per square metre in UAE?",
                  a: "Steel structure costs in UAE range from AED 1,200-2,400 per sqm (USD 325-650/sqm) for a basic warehouse to AED 2,500-4,500 per sqm (USD 680-1,225/sqm) for a fully fitted factory with cranes, insulation, and C4 corrosion protection. Use our online calculator for an instant estimate tailored to your project.",
                },
                {
                  q: "What UAE standards do you comply with?",
                  a: "We design and fabricate to Dubai Municipality Code, Abu Dhabi International Building Code (ADIBC), UAE Fire & Life Safety Code of Practice, and local Trakhees/DAFZA requirements. Coating systems comply with ISO 12944 (C4/C5 marine environment). Full compliance documentation provided for municipality and Civil Defense submissions.",
                },
                {
                  q: "Can you handle Dubai Municipality and Civil Defense approvals?",
                  a: "Yes. We provide complete structural engineering calculations, shop drawings, anchor bolt plans, fire rating certificates, and material certificates required for your Dubai Municipality, Trakhees, and Civil Defense submissions. Documentation is accepted across all Emirates.",
                },
                {
                  q: "What is the import duty on steel structures from China to UAE?",
                  a: "Steel structures (HS 7308) imported into UAE attract 5% Customs Duty on CIF value plus 5% VAT (standard GCC rate). Free Zone jurisdictions (JAFZA, DAFZA, Hamriyah, etc.) offer duty-free import for re-export or in-zone use. We provide full customs documentation including Certificate of Origin and assist with Jebel Ali Port clearance.",
                },
                {
                  q: "Do you offer a warranty on steel structures?",
                  a: "Yes. We provide a 15-year structural warranty against manufacturing defects and a 30-year warranty on galvanized steel components. Paint/coating warranty for C4 environment: 15 years (marine-grade system). Fire-rated panel warranty: 10 years.",
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
                Get a Free Quote for Your UAE Project
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Fill in the form below and our UAE desk team will respond within 24 hours with a detailed quotation.
              </p>
            </ScrollAnimator>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
              <form action="https://formsubmit.co/kangguangjian91@gmail.com" method="POST" className="grid md:grid-cols-2 gap-5">
                <input type="hidden" name="_subject" value="🇦🇪 UAE Inquiry - Laotie Steel" />
                <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" name="name" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. Ahmed Al Rashid" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="ahmed@example.ae" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" name="phone" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="+971 5X XXX XXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Type *</label>
                  <select name="project_type" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select project type</option>
                    <option value="warehouse">Warehouse / Logistics</option>
                    <option value="factory">Factory / Manufacturing</option>
                    <option value="cold-storage">Cold Storage</option>
                    <option value="distribution">Distribution Center</option>
                    <option value="commercial">Commercial / Showroom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Location in UAE</label>
                  <select name="project_location" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select Emirate / Zone</option>
                    <option value="dubai">Dubai (incl. JAFZA, DAFZA, DIP)</option>
                    <option value="abu-dhabi">Abu Dhabi (incl. ICAD, KIZAD)</option>
                    <option value="sharjah">Sharjah (incl. Hamriyah, SAIF Zone)</option>
                    <option value="ajman">Ajman</option>
                    <option value="ras-al-khaimah">Ras Al Khaimah (RAK FTZ)</option>
                    <option value="fujairah">Fujairah (incl. Fujairah Free Zone)</option>
                    <option value="umm-al-quwain">Umm Al Quwain</option>
                    <option value="other">Other / Multiple Emirates</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Building Size (approx.)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="length" placeholder="Length (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                    <input type="number" name="width" placeholder="Width (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Details *</label>
                  <textarea name="message" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Describe your project: building use, roof type, crane requirements, insulation needs, delivery timeline..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-emerald-800 transition shadow-lg">
                    Send Inquiry — Get Free Quote →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ===== Also Serving ===== */}
        <section className="py-12 bg-emerald-50 border-t border-emerald-100">
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
                  className="inline-block px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <div className="bg-emerald-900 text-emerald-200 text-xs text-center py-3 px-4">
        Serving UAE: Dubai | Abu Dhabi | Sharjah | Ajman | Ras Al Khaimah | Fujairah | Umm Al Quwain
      </div>
      <Footer />
    </>
  );
}

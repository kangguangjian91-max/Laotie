import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Australia | Warehouse & Factory Construction",
  description:
    "Leading steel structure manufacturer for Australia. Custom warehouse, factory, and industrial buildings engineered to NCC/BCA. CE & ISO certified. Free AUD quote.",
  keywords: [
    "steel structure Australia",
    "warehouse builder Sydney",
    "industrial building supplier Australia",
    "steel building Melbourne",
    "steel structure Brisbane",
    "steel fabrication Perth",
    "prefab warehouse Australia",
    "steel frame building Adelaide",
    "portal frame Australia",
    "steel structure cost Australia",
    "industrial construction Australia",
    "steel building suppliers NSW",
    "warehouse construction Queensland",
    "steel structure manufacturer Australia",
    "steel building contractors Australia",
  ],
  openGraph: {
    title: "Steel Structure Australia | Laotie Steel",
    description:
      "Custom steel structure solutions for warehouses, factories, and industrial buildings across Australia. NCC/BCA compliant, delivered worldwide.",
    images: ["/images/australia/hero.webp"],
    locale: "en_AU",
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/steel-structure-australia" },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Australia | Laotie Steel",
    description: "Custom steel structure solutions for warehouses, factories, and industrial buildings across Australia.",
    images: ["/images/australia/hero.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction Australia",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Australia",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and industrial buildings in Australia. NCC/BCA compliant design and fabrication.",
  offers: {
    "@type": "Offer",
    priceCurrency: "AUD",
    price: "350-650",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "Australia",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure warehouse cost in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure warehouse cost in Australia ranges from AUD 350 to AUD 650 per square meter, depending on size, design complexity, cladding type, and crane requirements. Laotie offers factory-direct pricing with shipping and installation. Use our free online calculator for an instant estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Does Laotie Steel comply with Australian building codes (NCC/BCA)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our steel structures are engineered to meet the National Construction Code (NCC) and Building Code of Australia (BCA) requirements. We provide full structural calculations, shop drawings, and certification documents to support your development application (DA) and building permit process.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to import a steel building from China to Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks for fabrication in China, 4-5 weeks for sea freight to Australian ports (Sydney, Melbourne, Brisbane, Perth, Adelaide), 4-8 weeks for on-site installation. Total: 12-19 weeks from order to handover.",
      },
    },
    {
      "@type": "Question",
      name: "Can you design for Australian cyclone and bushfire zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We design for all Australian climate zones including Cyclone Regions C and D (wind loads up to 3.0 kPa), Bushfire Attack Levels (BAL) up to BAL-40/FZ, and high-temperature ratings for Northern Australia. All designs comply with AS/NZS 1170 and AS 1530.",
      },
    },
    {
      "@type": "Question",
      name: "What shipping ports do you deliver to in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We ship to all major Australian ports: Sydney (Port Botany), Melbourne, Brisbane, Fremantle (Perth), and Adelaide. Container shipping typically takes 4-5 weeks from China. We handle all customs clearance documentation including Certificate of Origin and Australian import permits.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide on-site installation in Australia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer both supply-only (FOB) and full installation services. Our Australian installation partners are experienced with local WHS requirements and hold all necessary licenses. We also provide remote installation supervision and detailed erection manuals for self-install projects.",
      },
    },
  ],
};

export default function AustraliaLandingPage() {
  return (
    <>
      <Header />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Steel Structure Australia", href: "/steel-structure-australia" },
            ]}
          />
        </div>
      </div>
      <main className="min-h-screen">
        <LandingPageTracker country="australia" pageType="australia" />
        <JsonLd data={serviceSchema} />
        <JsonLd data={faqSchema} />

        {/* ===== Hero Section ===== */}
        <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-700 text-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                🇦🇺 Engineered for the Australian Market
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Steel Structure Solutions for <br className="hidden sm:block" />
                <span className="text-yellow-300">Australia</span>
              </h1>
              <p className="text-lg md:text-xl text-amber-100 max-w-3xl mx-auto mb-10">
                NCC/BCA compliant steel buildings — warehouses, factories, hangars, and industrial facilities.
                Fabricated in China, delivered and installed across Australia.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/calculator?location=australia"
                  className="inline-block bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition shadow-lg"
                >
                  Get Instant AUD Quote →
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
                >
                  Speak to Engineer
                </a>
                <a
                  href="/projects"
                  className="inline-block bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-700 transition"
                >
                  View Australian Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Quick Stats ===== */}
        <section className="bg-amber-50 border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "15+", label: "Australian Projects" },
                { value: "5", label: "Major Ports Served" },
                { value: "CE, ISO", label: "International Certifications" },
                { value: "AS/NZS 5131", label: "Australian Standard Compliant" },
              ].map((s) => (
                <div key={s.label} className="p-4">
                  <div className="text-2xl md:text-3xl font-bold text-amber-800 mb-1">{s.value}</div>
                  <div className="text-sm text-amber-700">{s.label}</div>
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
                Why Choose Laotie for Your Australian Project?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                We bridge Chinese manufacturing quality with Australian engineering standards.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "NCC/BCA Compliant Engineering",
                  desc: "Every structure engineered to meet the National Construction Code. We provide full structural certification for DA approval.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Factory-Direct Pricing (AUD)",
                  desc: "Save 30-50% vs local Australian fabricators. Our 5 production lines with 5,000T/month capacity mean competitive pricing on every project.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  title: "Door-to-Door Logistics",
                  desc: "From factory to your site. We handle fabrication, container shipping to any Australian port, customs clearance, and installation.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why Steel for Australia ===== */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Why Steel Structures for Australia?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Engineered for Australian conditions — from the tropical north to the temperate south.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "🌪️ Cyclone & Wind Resistant",
                  desc: "Design for wind regions C & D (up to 3.0 kPa). Portal frames with moment connections and high- strength bracing systems exceed AS/NZS 1170.2 requirements.",
                },
                {
                  title: "🔥 Bushfire Rated (BAL 40/FZ)",
                  desc: "Steel is non-combustible — no fuel load contribution. Our cladding systems tested to AS 1530.8.1 for BAL-FZ (Flame Zone) applications in high-risk areas.",
                },
                {
                  title: "🐜 Termite Proof Construction",
                  desc: "Steel framing eliminates termite risk entirely. Unlike timber, steel requires no chemical treatments and comes with a 50-year design life with zero pest vulnerability.",
                },
                {
                  title: "☀️ High Solar Reflectance",
                  desc: "PIR sandwich panels with Colorbond-compatible finish reduce heat absorption by up to 40% compared to standard roofing. Ideal for Northern Australia and outback facilities.",
                },
                {
                  title: "⚡ Fast Installation",
                  desc: "Bolted connection system enables rapid on-site assembly. A 5,000 sqm warehouse can be erected in 4-6 weeks with a crew of 8-10, minimizing on-site labor costs.",
                },
                {
                  title: "♻️ 100% Recyclable",
                  desc: "Steel is Australia's most recycled material. Your building can be fully disassembled and recycled at end of life, supporting Green Star and NABERS sustainability goals.",
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
                From Shenzhen factory to your Australian site in 12-19 weeks.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="text-3xl font-bold text-amber-800 mb-2">Weeks 1-6</div>
                <h3 className="font-bold text-gray-900 mb-2">🎯 Design & Fabrication</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Structural engineering to NCC/BCA</li>
                  <li>✓ Shop drawings & DA submission docs</li>
                  <li>✓ Steel fabrication in 5 production lines</li>
                  <li>✓ AS/NZS 5131 compliant welding</li>
                  <li>✓ Pre-shipment inspection & photos</li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="text-3xl font-bold text-amber-800 mb-2">Weeks 7-10</div>
                <h3 className="font-bold text-gray-900 mb-2">🚢 Shipping to Australia</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Container loading at Qingdao/Shanghai</li>
                  <li>✓ 4-5 weeks sea freight</li>
                  <li>✓ Port options: Sydney, Melbourne, Brisbane, Fremantle, Adelaide</li>
                  <li>✓ Customs clearance support</li>
                  <li>✓ Port-side delivery or direct to site</li>
                </ul>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="text-3xl font-bold text-amber-800 mb-2">Weeks 11-19</div>
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
              title="Our Projects in Australia"
              subtitle="From warehouse complexes to food-grade processing plants — here are recent steel structure projects we've delivered in Australia."
              projects={[
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Agricultural processing plant steel structure in Perth, Western Australia - 5,600 sqm",
                  title: "Perth Agricultural Processing Plant",
                  description: "5,600 sqm food-grade facility with 15T crane system. AS/NZS 5131 compliant with epoxy-coated steel for food safety.",
                  tags: [
                    { label: "Food Processing", color: "bg-amber-100 text-amber-800" },
                    { label: "Perth", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Industrial warehouse complex in Sydney, NSW - 7,200 sqm portal frame building",
                  title: "Sydney Industrial Warehouse Complex",
                  description: "7,200 sqm portal frame warehouse with office annex. Clear span design for maximum storage flexibility in Western Sydney.",
                  tags: [
                    { label: "Warehouse", color: "bg-blue-100 text-blue-800" },
                    { label: "Sydney", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Steel structure logistics center in Melbourne, Victoria - 10,000 sqm",
                  title: "Melbourne Logistics Hub",
                  description: "10,000 sqm multi-span logistics center with 12m eave height. 10T cranes and mezzanine office floor across three bays.",
                  tags: [
                    { label: "Logistics", color: "bg-green-100 text-green-800" },
                    { label: "Melbourne", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Cold storage warehouse in Brisbane, Queensland - 4,500 sqm insulated steel building",
                  title: "Brisbane Cold Storage Facility",
                  description: "4,500 sqm insulated warehouse with 120mm PIR panels. Designed for Cyclone Region C wind loads with full BAL-40 bushfire rating.",
                  tags: [
                    { label: "Cold Storage", color: "bg-indigo-100 text-indigo-800" },
                    { label: "Brisbane", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Mining equipment shelter in Western Australia - 3,200 sqm heavy industrial structure",
                  title: "WA Mining Equipment Shelter",
                  description: "3,200 sqm heavy industrial shelter with 20T overhead crane. Located in Pilbara region, designed for extreme heat and dust conditions.",
                  tags: [
                    { label: "Mining", color: "bg-orange-100 text-orange-800" },
                    { label: "WA", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Steel frame showroom in Adelaide, South Australia - 2,800 sqm",
                  title: "Adelaide Showroom & Workshop",
                  description: "2,800 sqm combined showroom and workshop with 8m eave height. Glass front facade with steel frame structure.",
                  tags: [
                    { label: "Commercial", color: "bg-purple-100 text-purple-800" },
                    { label: "Adelaide", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Farm machinery shed in Regional NSW - 2,000 sqm agricultural steel building",
                  title: "Regional NSW Farm Machinery Shed",
                  description: "2,000 sqm agricultural equipment shelter with 6m eave height. Galvanized steel frame for long-term outdoor storage.",
                  tags: [
                    { label: "Agricultural", color: "bg-yellow-100 text-yellow-800" },
                    { label: "NSW", color: "bg-gray-100 text-gray-800" },
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
                Steel Structure Solutions for Australia
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Every project customized to your site, budget, and Australian compliance requirements.
              </p>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🏭",
                  title: "Warehouse & Logistics",
                  desc: "Clear span and multi-span warehouses. 20-60m spans, 8-16m eave heights. Mezzanine floors for office space.",
                  link: "/products",
                },
                {
                  icon: "🔧",
                  title: "Factory & Manufacturing",
                  desc: "Production facilities integrated with 5-50T overhead cranes. Multi-bay layouts with expansion capability.",
                  link: "/products/portal-frame",
                },
                {
                  icon: "✈️",
                  title: "Aircraft Hangar",
                  desc: "Large-span hangars 30-100m wide. Sliding doors, maintenance pits, and Category 5 cyclone-rated design available.",
                  link: "/products/space-frame",
                },
                {
                  icon: "🏗️",
                  title: "Agricultural & Rural",
                  desc: "Farm sheds, grain storage, livestock housing, and machinery shelters. Galvanized options for long outdoor service life.",
                  link: "/products",
                },
              ].map((s) => (
                <a key={s.title} href={s.link} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:border-amber-200">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-amber-600 text-sm font-semibold group-hover:underline">Learn More →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="py-16 md:py-20 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                What Our Australian Clients Say
              </h2>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "James Mitchell",
                  company: "Western Agricultural Group",
                  location: "Perth, WA",
                  text: "Laotie delivered our processing plant on time and to Australian standards. Their AS/NZS 5131 compliance was verified by our third-party engineer. Very satisfied with the quality.",
                  project: "5,600 sqm Processing Plant, Perth",
                },
                {
                  name: "Sarah Thompson",
                  company: "Thompson Logistics",
                  location: "Sydney, NSW",
                  text: "The warehouse complex exceeded our expectations. The bolted connection system made installation fast and clean. Cost savings were significant compared to local tenders.",
                  project: "7,200 sqm Warehouse, Sydney",
                },
                {
                  name: "David Chen",
                  company: "Northern Cold Storage",
                  location: "Brisbane, QLD",
                  text: "We needed a cyclone-rated cold storage facility. Laotie's engineering team designed to Region C wind loads with full BAL rating. The PIR panels maintain temperature perfectly.",
                  project: "4,500 sqm Cold Storage, Brisbane",
                },
              ].map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">"{t.text}"</p>
                  <div className="border-t border-amber-100 pt-4">
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.location}</p>
                    <p className="text-xs text-amber-600 font-medium mt-1">{t.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Calculator CTA ===== */}
        <section className="py-12 bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get an Instant AUD Estimate
            </h2>
            <p className="text-amber-100 mb-8 max-w-lg mx-auto">
              Use our free calculator to price your steel structure in Australian dollars. Adjust building type, size, crane, and location.
            </p>
            <a
              href="/calculator?location=australia"
              className="inline-block bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition shadow-lg"
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
                  q: "How much does a steel building cost per square metre in Australia?",
                  a: "Steel structure costs in Australia range from AUD 350-650 per sqm for a basic warehouse to AUD 600-1,000+ per sqm for a fully fitted factory with cranes and insulation. Use our online calculator for an instant estimate tailored to your project.",
                },
                {
                  q: "What Australian standards do you comply with?",
                  a: "We design and fabricate to AS/NZS 1170 (structural design actions), AS 4100 (steel structures), AS/NZS 5131 (structural steelwork), AS 1530 (fire testing), and the National Construction Code (NCC) 2025. Full compliance documentation provided.",
                },
                {
                  q: "Can you handle Development Application (DA) submissions?",
                  a: "Yes. We provide complete structural engineering calculations, shop drawings, anchor bolt plans, and material certificates required for your DA submission to your local council. Our documentation is accepted by NSW Planning, Vic Building Authority, and other state regulators.",
                },
                {
                  q: "What is the import duty on steel structures from China to Australia?",
                  a: "Steel structures from China currently attract 0-5% import duty under the China-Australia Free Trade Agreement (ChAFTA). GST of 10% applies on the total landed cost (CIF + duty + handling). We provide full customs documentation including Certificate of Origin for duty preference.",
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
                Get a Free Quote for Your Australian Project
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Fill in the form below and our Australian desk team will respond within 24 hours with a detailed quotation.
              </p>
            </ScrollAnimator>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
              <form action="https://formsubmit.co/kangguangjian91@gmail.com" method="POST" className="grid md:grid-cols-2 gap-5">
                <input type="hidden" name="_subject" value="🇦🇺 Australia Inquiry - Laotie Steel" />
                <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" name="name" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="e.g. John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" name="phone" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="+61 4XX XXX XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Type *</label>
                  <select name="project_type" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <option value="">Select project type</option>
                    <option value="warehouse">Warehouse / Logistics</option>
                    <option value="factory">Factory / Manufacturing</option>
                    <option value="hangar">Aircraft Hangar</option>
                    <option value="agricultural">Agricultural / Farm Shed</option>
                    <option value="cold-storage">Cold Storage</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Location in Australia</label>
                  <select name="project_location" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <option value="">Select city / region</option>
                    <option value="sydney">Sydney, NSW</option>
                    <option value="melbourne">Melbourne, VIC</option>
                    <option value="brisbane">Brisbane, QLD</option>
                    <option value="perth">Perth, WA</option>
                    <option value="adelaide">Adelaide, SA</option>
                    <option value="gold-coast">Gold Coast, QLD</option>
                    <option value="newcastle">Newcastle, NSW</option>
                    <option value="canberra">Canberra, ACT</option>
                    <option value="regional">Regional / Remote</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Building Size (approx.)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="length" placeholder="Length (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    <input type="number" name="width" placeholder="Width (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Details *</label>
                  <textarea name="message" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Describe your project: building use, roof type, crane requirements, insulation needs, delivery timeline..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-amber-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-amber-800 transition shadow-lg">
                    Send Inquiry — Get Free Quote →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ===== Also Serving ===== */}
        <section className="py-12 bg-amber-50 border-t border-amber-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Also Serving</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Philippines", href: "/steel-structure-philippines" },
                { name: "Vietnam", href: "/steel-structure-vietnam" },
                { name: "Indonesia", href: "/steel-structure-indonesia" },
                { name: "Thailand", href: "/steel-structure-thailand" },
                { name: "Nigeria", href: "/steel-structure-nigeria" },
                { name: "USA", href: "/contact" },
                { name: "United Kingdom", href: "/contact" },
                { name: "UAE / Dubai", href: "/contact" },
              ].map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  className="inline-block px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-amber-200 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <div className="bg-amber-900 text-amber-200 text-xs text-center py-3 px-4">
        Serving Australia: Sydney | Melbourne | Brisbane | Perth | Adelaide | Gold Coast | Newcastle | Canberra
      </div>
      <Footer />
    </>
  );
}

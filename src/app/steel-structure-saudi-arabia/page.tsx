import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";
import CountUp from "@/components/CountUp";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Saudi Arabia | Factory & Warehouse Manufacturer",
  description:
    "Leading steel structure manufacturer serving Saudi Arabia. Custom warehouses, factories, and industrial buildings. CE & ISO certified. Free quote within 24 hours.",
  keywords: [
    "steel structure saudi arabia",
    "warehouse construction saudi arabia",
    "factory building saudi arabia",
    "steel building supplier saudi arabia",
    "prefab warehouse saudi arabia",
    "industrial building saudi arabia",
    "portal frame saudi arabia",
    "steel fabrication riyadh",
    "warehouse builder jeddah",
    "factory construction dammam",
    "steel building saudi arabia price",
    "steel structure dammam",
  ],
  openGraph: {
    title: "Steel Structure Saudi Arabia | Laotie Steel",
    description:
      "Your trusted steel structure partner in Saudi Arabia. 100+ projects completed. CE & ISO certified. Free quote.",
    images: ["/images/projects/project-dubai-01.webp"],
    locale: "en_SA",
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/steel-structure-saudi-arabia" },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Saudi Arabia | Laotie Steel",
    description: "Your trusted steel structure partner in Saudi Arabia. 100+ projects completed.",
    images: ["/images/projects/project-dubai-01.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction Saudi Arabia",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and industrial buildings in Saudi Arabia. CE & ISO certified manufacturing.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "25-65",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "Saudi Arabia",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure cost in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure costs in Saudi Arabia range from SAR 90-240 per m² ($25-65/m²) FOB from China. With shipping to Dammam or Jeddah ports, expect SAR 130-300 per m² ($35-80/m²). Complete turnkey pricing (including installation) typically ranges from SAR 650-2,000 per m² depending on building complexity.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a steel warehouse in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks for production in China, 3-4 weeks for shipping to Saudi ports (Dammam or Jeddah), 4-8 weeks for on-site installation. Total: 11-18 weeks from order to completion.",
      },
    },
    {
      "@type": "Question",
      name: "Do Chinese steel structures meet Saudi Building Code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Laotie Steel designs structures to SBC 301 (Saudi Building Code) and international standards including Eurocode 3, BS 5950, and AISC. We adapt designs to local wind, sand, and temperature conditions per Saudi code requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What steel grade is best for Saudi Arabia's climate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Saudi Arabia's hot, arid, and coastal environment, we recommend Q355B steel with an enhanced anti-corrosion coating system (epoxy zinc-rich primer + micaceous iron oxide intermediate + polyurethane topcoat, minimum 280μm DFT). For coastal areas like Jeddah and Dammam, hot-dip galvanizing is recommended.",
      },
    },
  ],
};

export default function SteelStructureSaudiArabia() {
  const heroImage = "/images/projects/project-dubai-01.webp";

  return (
    <>
      <LandingPageTracker country="Saudi Arabia" pageType="saudi-arabia" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Steel Structure Saudi Arabia", href: "/steel-structure-saudi-arabia" },
            ]}
          />
        </div>
      </div>

      <main className="bg-white">
        {/* ========== HERO ========== */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src={heroImage} alt="Steel structure for Saudi Arabia" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Steel Structure Saudi Arabia
            </h1>
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Custom steel buildings for Saudi Arabia&apos;s Vision 2030 projects. Warehouses, factories, logistics centers.
            </p>
          </div>
        </section>

        {/* ========== STATS BAR ========== */}
        <ScrollAnimator>
          <section className="bg-steel-muted border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-steel"><CountUp end={15} suffix="+" /></div>
                  <div className="text-xs text-gray-500 mt-0.5">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-steel"><CountUp end={200} suffix="+" /></div>
                  <div className="text-xs text-gray-500 mt-0.5">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-steel"><CountUp end={5000} suffix="T/Month" /></div>
                  <div className="text-xs text-gray-500 mt-0.5">Production Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-steel"><CountUp end={30} suffix="+" /></div>
                  <div className="text-xs text-gray-500 mt-0.5">Countries Served</div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimator>

        {/* ========== WHY SAUDI ARABIA ========== */}
        <ScrollAnimator>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Steel Structures for Saudi Arabia&apos;s Vision 2030
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Saudi Arabia is experiencing unprecedented construction growth under Vision 2030. From mega-projects like NEOM and Red Sea Project to industrial cities in Riyadh, Jeddah, and Dammam — the demand for high-quality steel structures has never been higher. Laotie Steel Structure provides factory-direct steel buildings to Saudi Arabia, saving 30-50% compared to local fabrication.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {[
                { num: "SAR 900B+", label: "Vision 2030 investment in construction", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                { num: "50°C+", label: "Designed for extreme heat conditions", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" },
                { num: "SBC 301", label: "Saudi Building Code compliant", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { num: "30-50%", label: "Cost savings vs local fabrication", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
                  <svg className="w-8 h-8 mx-auto mb-2 text-steel-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <div className="text-xl font-bold text-steel mb-1">{item.num}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </section>
        </ScrollAnimator>

        {/* ========== STEEL STRUCTURE TYPES ========== */}
        <ScrollAnimator>
          <section className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Steel Structures for Saudi Arabia
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl">
                We design and fabricate steel buildings compliant with Saudi Building Code (SBC 301) and engineered for the Kingdom&apos;s extreme climate conditions.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Industrial Warehouses",
                    desc: "Large-span portal frame warehouses for logistics, storage, and distribution. Clear spans up to 60m, eave heights up to 15m. Designed for 50°C ambient temperature.",
                    features: ["60m clear span", "15m eave height", "45°C design temp", "Natural ventilation"],
                  },
                  {
                    title: "Factory Buildings",
                    desc: "Multi-span factory complexes with overhead crane systems. Column-free production floors up to 30m spans. Fire-rated construction as per SBC 301.",
                    features: ["30m+ spans", "Crane up to 50T", "SBC 301 compliant", "Fire protection"],
                  },
                  {
                    title: "Logistics Centers",
                    desc: "Distribution hubs for e-commerce and logistics companies. Multi-bay designs with dock levelers, mezzanine offices, and high-bay racking integration.",
                    features: ["Multi-bay design", "Mezzanine offices", "Dock leveler ready", "High-bay racking"],
                  },
                  {
                    title: "Aircraft Hangars",
                    desc: "Large-span hangars for private and commercial aircraft. Bolt-ball space frame systems for column-free maintenance bays. Designed for sand and heat conditions.",
                    features: ["80m+ clear span", "Space frame roof", "Sand-resistant seals", "HVAC ready"],
                  },
                  {
                    title: "Agricultural Buildings",
                    desc: "Steel structures for agricultural processing, cold storage, and livestock facilities. Corrosion-resistant coatings for humid coastal environments.",
                    features: ["Corrosion resistant", "Insulated panels", "Cold storage ready", "Ventilation systems"],
                  },
                  {
                    title: "Commercial Buildings",
                    desc: "Showrooms, shopping centers, and mixed-use commercial buildings. Architectural steel with custom cladding and glazing integration.",
                    features: ["Architectural finish", "Custom cladding", "Glazing integration", "Mezzanine floors"],
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {item.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimator>

        {/* ========== LOCAL COMPLIANCE ========== */}
        <ScrollAnimator>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Saudi Building Code Compliance
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-steel-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  SBC 301 — Structural Design
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">• Wind load design per SBC 301 for all Saudi regions (Riyadh, Jeddah, Dammam)</li>
                  <li className="flex gap-2">• Seismic design for zones per SBC 301 seismic maps</li>
                  <li className="flex gap-2">• Temperature loading for extreme heat (50°C design ambient)</li>
                  <li className="flex gap-2">• Sand and dust loading considerations for desert environments</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-steel-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  International Standards
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">• CE certification (EN 1090) — European quality standard</li>
                  <li className="flex gap-2">• ISO 9001:2015 certified quality management system</li>
                  <li className="flex gap-2">• AWS D1.1 certified welding procedures</li>
                  <li className="flex gap-2">• Full material traceability with mill certificates (EN 10204 3.1)</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollAnimator>

        {/* ========== PROJECT CASES ========== */}
        <ScrollAnimator>
          <section className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Proven Track Record
              </h2>
              <p className="text-gray-500 mb-6 max-w-xl mx-auto">
                We have delivered 200+ steel structure projects across 30+ countries including UAE, Qatar, and the Middle East.
              </p>
              <a
                href="/projects"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-steel hover:bg-steel-light rounded-lg transition-colors"
              >
                View All Projects
                <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>
        </ScrollAnimator>

        {/* ========== FAQ ========== */}
        <ScrollAnimator>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              FAQ — Steel Structures in Saudi Arabia
            </h2>
            <div className="space-y-4 max-w-3xl">
              {[
                {
                  q: "How much does a steel structure cost in Saudi Arabia?",
                  a: "Steel structure costs in Saudi Arabia range from SAR 90-240 per m² ($25-65/m²) FOB from China. With shipping to Dammam or Jeddah ports, expect SAR 130-300 per m² ($35-80/m²). Complete turnkey pricing (including installation) typically ranges from SAR 650-2,000 per m² depending on building complexity.",
                },
                {
                  q: "How long does it take to build a steel warehouse in Saudi Arabia?",
                  a: "Typical timeline: 4-6 weeks for production in China, 3-4 weeks for shipping to Saudi ports (Dammam or Jeddah), 4-8 weeks for on-site installation. Total: 11-18 weeks from order to completion.",
                },
                {
                  q: "Do Chinese steel structures meet Saudi Building Code?",
                  a: "Yes. Laotie Steel designs structures to SBC 301 (Saudi Building Code) and international standards including Eurocode 3, BS 5950, and AISC. We adapt designs to local wind, sand, and temperature conditions per Saudi code requirements.",
                },
                {
                  q: "What steel grade is best for Saudi Arabia's climate?",
                  a: "For Saudi Arabia's hot, arid, and coastal environment, we recommend Q355B steel with an enhanced anti-corrosion coating system (epoxy zinc-rich primer + micaceous iron oxide intermediate + polyurethane topcoat, minimum 280μm DFT). For coastal areas like Jeddah and Dammam, hot-dip galvanizing is recommended.",
                },
                {
                  q: "How is shipping arranged to Saudi Arabia?",
                  a: "Steel structures are shipped in 40HQ containers from Chinese ports (Shanghai, Ningbo, or Shenzhen) to Dammam or Jeddah. Transit time is 20-28 days. Full container load (FCL) recommended. We handle all export documentation including bill of lading, commercial invoice, packing list, and certificate of origin.",
                },
                {
                  q: "Can I visit your factory before ordering?",
                  a: "Absolutely. Our factory is in Shangqiu, Henan, China. You can fly to Shanghai Pudong or Zhengzhou airport, and we will arrange pickup. We also offer live video factory tours via WhatsApp for clients who cannot travel.",
                },
              ].map((faq, i) => (
                <details key={i} className="bg-gray-50 rounded-xl border border-gray-100 group open:shadow-sm transition-shadow">
                  <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 list-none flex items-center justify-between gap-2">
                    {faq.q}
                    <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </ScrollAnimator>

        {/* ========== CTA ========== */}
        <ScrollAnimator>
          <section className="bg-gradient-to-r from-steel to-steel-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Start Your Saudi Arabia Project?
              </h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                Send us your building dimensions and requirements. Our engineering team will provide a detailed quotation within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg"
                >
                  Get a Free Quote
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/calculator"
                  className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white border border-white/30 hover:bg-white/10 rounded-lg transition-all"
                >
                  Use Cost Calculator
                </a>
              </div>
            </div>
          </section>
        </ScrollAnimator>

        {/* Serving More Countries */}
        <section className="bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-sm text-gray-500 mb-4">Also serving:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/steel-structure-thailand" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Thailand</a>
              <a href="/steel-structure-vietnam" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Vietnam</a>
              <a href="/steel-structure-indonesia" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Indonesia</a>
              <a href="/steel-structure-philippines" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Philippines</a>
              <a href="/steel-structure-nigeria" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Nigeria</a>
              <a href="/steel-structure-logistics-center" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Logistics Center</a>
              <a href="/steel-structure-price-guide" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Price Guide</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

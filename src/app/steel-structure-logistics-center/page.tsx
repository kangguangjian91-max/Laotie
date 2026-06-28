import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";
import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure for Logistics Centers | Warehouse & Distribution Hub",
  description:
    "Custom steel structures for logistics centers, distribution hubs, and warehouses. Clear spans up to 60m, 15m eave height, crane-ready, fire-rated. CE & ISO certified. Free quote within 24 hours.",
  keywords: [
    "steel structure for logistics center",
    "warehouse distribution center steel building",
    "logistics hub steel construction",
    "steel building for logistics warehouse",
    "prefab logistics center",
    "steel structure warehouse distribution",
    "portal frame logistics building",
    "steel logistics hub design",
    "warehouse steel frame construction",
    "logistics center building cost",
    "large span steel logistics",
    "steel structure cold storage",
    "distribution center steel building",
    "logistics park steel structure",
    "steel warehouse with mezzanine",
  ],
  openGraph: {
    title: "Steel Structure for Logistics Centers | Laotie Steel",
    description:
      "Custom steel logistics centers, distribution hubs, and warehouses. 60m clear span, crane-ready, fire-rated. CE & ISO certified.",
    images: ["/images/projects/project-dubai-01.webp"],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/steel-structure-logistics-center" },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure for Logistics Centers | Laotie Steel",
    description: "Custom steel logistics centers and distribution hubs. 60m clear span, crane-ready.",
    images: ["/images/projects/project-dubai-01.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Logistics Center Construction",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  description:
    "Custom steel structure solutions for logistics centers, distribution hubs, and warehouses. Design, fabrication, and installation support.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "25-65",
    priceValidUntil: "2026-12-31",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel logistics center cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure costs for logistics centers range from $25-65/m² FOB China depending on span, height, crane requirements, and cladding specification. A typical 10,000m² distribution hub costs $300,000-650,000 for the steel structure. Complete turnkey (including foundation, installation, cladding) ranges from $180-350/m².",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a steel logistics center?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks design and engineering, 4-6 weeks fabrication in China, 3-5 weeks shipping, 4-8 weeks on-site installation. Total: 15-25 weeks from order to completion.",
      },
    },
    {
      "@type": "Question",
      name: "What span can a steel logistics center achieve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Portal frame steel structures for logistics centers can achieve clear spans of 15-60m. For wider spans (60m+), space frame systems are recommended. Multi-span designs with intermediate columns are the most cost-effective for large logistics parks.",
      },
    },
    {
      "@type": "Question",
      name: "What floor load capacity can you design for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We design logistics center floor slabs for live loads from 5 kN/m² (standard warehouse) to 25 kN/m² (heavy industrial storage). High-bay racking systems with point loads up to 50 tons can be accommodated with proper foundation design.",
      },
    },
  ],
};

export default function SteelStructureLogisticsCenter() {
  return (
    <>
      <LandingPageTracker country="Global" pageType="main" />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Logistics Center", href: "/steel-structure-logistics-center" },
            ]}
          />
        </div>
      </div>
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <Image src="/images/projects/project-dubai-01.webp" alt="Logistics center steel structure" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Steel Structure for Logistics Centers
            </h1>
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Custom-designed steel buildings for logistics hubs, distribution centers, warehouses, and cold storage facilities. Factory-direct pricing, global delivery.
            </p>
          </div>
        </section>

        {/* Stats */}
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
                  <div className="text-2xl font-bold text-steel"><CountUp end={5000} suffix="T/M" /></div>
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

        {/* Steel vs Concrete */}
        <ScrollAnimator>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Why Steel for Logistics Centers?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-steel text-white">
                    <th className="text-left px-4 py-3 font-medium">Factor</th>
                    <th className="text-left px-4 py-3 font-medium">Steel Structure</th>
                    <th className="text-left px-4 py-3 font-medium">Concrete Structure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {([
                    ["Construction time", "8-16 weeks", "20-40 weeks"],
                    ["Clear span", "Up to 60m", "Typically 8-12m"],
                    ["Foundation cost", "Lighter → 30-40% less", "Heavier → more expensive"],
                    ["Modification flexibility", "Easy to extend/relocate", "Difficult to modify"],
                    ["Seismic performance", "Excellent (ductile)", "Moderate (brittle)"],
                    ["Fire rating", "Up to 2 hours (protected)", "Up to 4 hours (inherent)"],
                    ["Cost per m² (turnkey)", "$180-350/m²", "$250-500/m²"],
                    ["Design life", "50+ years with maintenance", "50-100 years"],
                  ] as const).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-3 ${j === 0 ? "font-semibold text-gray-900" : j === 1 ? "text-green-700" : "text-gray-500"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollAnimator>

        {/* Types */}
        <ScrollAnimator>
          <section className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Logistics Center Types We Build
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    title: "Distribution Centers",
                    desc: "Multi-bay portal frame buildings with dock levelers, mezzanine offices, and high-bay racking systems.",
                    specs: ["Span: 30-60m", "Eave: 10-15m", "Floor load: 10-25 kN/m²", "Dock doors: 10-50+"],
                    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z",
                  },
                  {
                    title: "Warehouse Logistics",
                    desc: "Large-span warehouses for storage, order fulfillment, and cross-docking operations.",
                    specs: ["Span: 20-50m", "Eave: 8-12m", "Floor load: 5-15 kN/m²", "Fire rating: 1-2 hrs"],
                    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  },
                  {
                    title: "Cold Storage / Refrigerated",
                    desc: "Insulated steel buildings for temperature-controlled logistics, food storage, and pharmaceutical warehousing.",
                    specs: ["Insulation: PIR 100-150mm", "Temp: -25°C to +5°C", "Span: 20-40m", "Vapor barrier included"],
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <svg className="w-10 h-10 text-steel-accent mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                    <ul className="space-y-1">
                      {item.specs.map((s) => (
                        <li key={s} className="text-xs text-gray-500 flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimator>

        {/* Projects */}
        <ScrollAnimator>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Related Projects</h2>
            <p className="text-gray-500 mb-8">We have delivered logistics center projects across the globe.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  name: "Logistics Distribution Center, Dubai",
                  size: "22,000 sqm",
                  year: "2023",
                  desc: "Logistics hub in Dubai South (DWC) Free Zone. 50m clear-span bays, 18m eave height, 50T overhead crane, 2-hour fire-rated mezzanine.",
                },
                {
                  name: "Yunda Express Industrial Park, China",
                  size: "50,000 sqm",
                  year: "2025",
                  desc: "5 interconnected logistics buildings with 80m clear-span portal frames, 14m eave height, high-bay racking for automated parcel handling.",
                },
              ].map((p) => (
                <div key={p.name} className="bg-gray-50 rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{p.size}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                  </div>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="/projects" className="text-sm font-semibold text-steel hover:text-steel-accent transition-colors">
                View All Projects →
              </a>
            </div>
          </section>
        </ScrollAnimator>

        {/* FAQ */}
        <ScrollAnimator>
          <section className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
              <div className="space-y-4 max-w-3xl">
                {[
                  { q: "How much does a steel logistics center cost?", a: "Steel structure costs for logistics centers range from $25-65/m² FOB China depending on span, height, crane requirements, and cladding specification. A typical 10,000m² distribution hub costs $300,000-650,000 for the steel structure. Complete turnkey (including foundation, installation, cladding) ranges from $180-350/m²." },
                  { q: "How long does it take to build a steel logistics center?", a: "Typical timeline: 4-6 weeks design, 4-6 weeks fabrication, 3-5 weeks shipping, 4-8 weeks installation. Total: 15-25 weeks." },
                  { q: "What span can a steel logistics center achieve?", a: "Portal frame steel structures can achieve clear spans of 15-60m. For wider spans (60m+), space frame systems are recommended. Multi-span designs are most cost-effective for large logistics parks." },
                  { q: "What floor load capacity can you design for?", a: "We design for live loads from 5 kN/m² (standard warehouse) to 25 kN/m² (heavy industrial storage). High-bay racking with point loads up to 50 tons can be accommodated." },
                  { q: "Do you provide installation services?", a: "Yes. We can provide installation drawings, video guidance, or send our experienced installation team to your site. We also offer erection contractor recommendations in your region." },
                ].map((faq, i) => (
                  <details key={i} className="bg-white rounded-xl border border-gray-100 group open:shadow-sm transition-shadow">
                    <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 list-none flex items-center justify-between gap-2">
                      {faq.q}
                      <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimator>

        {/* CTA */}
        <ScrollAnimator>
          <section className="bg-gradient-to-r from-steel to-steel-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Build Your Logistics Center?</h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">Send us your building dimensions and requirements. We will provide a detailed quotation within 24 hours.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/contact" className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg">
                  Get a Free Quote
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="/calculator" className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white border border-white/30 hover:bg-white/10 rounded-lg transition-all">
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
              <a href="/steel-structure-saudi-arabia" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Saudi Arabia</a>
              <a href="/steel-structure-price-guide" className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm border border-gray-200 transition-all">Price Guide</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

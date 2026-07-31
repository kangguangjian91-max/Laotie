import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Steel Structure Manufacturer for Brazil | Laotie Steel",
  description:
    "Trusted steel structure manufacturer for Brazil. Custom warehouse, factory & agricultural buildings to NBR 8800. CE & ISO certified. Free BRL/USD quote.",
  keywords: [
    "steel structure Brazil",
    "steel building Brazil",
    "warehouse construction Brazil",
    "steel structure price Brazil",
    "estrutura de aço",
    "industrial building supplier Brazil",
    "steel fabrication Brazil",
    "portal frame Brazil",
    "steel structure manufacturer Brazil",
    "steel warehouse São Paulo",
    "factory building Rio de Janeiro",
    "industrial construction Belo Horizonte",
    "prefab building Brazil",
    "steel structure cost Brazil",
    "galpão de aço Brasil",
  ],
  openGraph: {
    title: "Steel Structure Manufacturer for Brazil | Laotie Steel",
    description:
      "Custom steel structure solutions for warehouses, factories, and agricultural buildings across Brazil. NBR 8800 compliant, delivered worldwide.",
    images: ["/images/brazil/hero.webp"],
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/steel-structure-brazil",
    languages: {
      "pt-BR": "https://www.laotie-steel.com/steel-structure-brazil",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Manufacturer for Brazil | Laotie Steel",
    description: "Custom steel structure solutions for warehouses, factories, and agricultural buildings across Brazil.",
    images: ["/images/brazil/hero.webp"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction Brazil",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Brazil",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and agricultural buildings in Brazil. NBR 8800 compliant design and fabrication for tropical climate and industrial applications.",
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    price: "180-380",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "Brazil",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure warehouse cost in Brazil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure warehouse cost in Brazil ranges from BRL 180 to BRL 380 per square meter (approx. USD 36-76/sqm), depending on size, design complexity, cladding type, and crane requirements. Laotie offers factory-direct pricing with shipping and installation. Use our free online calculator for an instant estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Does Laotie Steel comply with Brazilian building codes (NBR 8800)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our steel structures are engineered to meet NBR 8800 (Steel Buildings Design), NBR 6123 (Wind Loads), NBR 15421 (Seismic Design), and NBR 14762 (Cold-Formed Steel). We provide full structural calculations, shop drawings, and certification documents to support your local Prefeitura (city hall) approvals and ART (Anotação de Responsabilidade Técnica) requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to import a steel building from China to Brazil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks for fabrication in China, 4-6 weeks for sea freight to Brazilian ports (Santos, Itaguaí, Itajaí, Paranaguá, Suape), 4-8 weeks for on-site installation. Total: 12-20 weeks from order to handover.",
      },
    },
    {
      "@type": "Question",
      name: "Can you design for Brazil's tropical climate and agricultural applications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We design for all Brazilian climatic zones including tropical high-rainfall regions (Amazon, Northeast), high-humidity coastal environments, and high-altitude temperate zones in the South. Galvanized and pre-painted coatings resist corrosion. Common applications include agricultural storage, grain silos, livestock housing, and agro-industrial facilities. All designs comply with NBR 6123 wind load requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What is the import duty on steel structures from China to Brazil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structures (NCM 7308) imported into Brazil typically attract 14-18% Import Duty (II), plus IPI (Industrialized Products Tax) of 5-15%, PIS/COFINS (federal contributions) of 11.75-16.16%, and 18% ICMS (state VAT). Licença de Importação (LI) may be required for certain products. Actual rates depend on classification and end-use. We provide full customs documentation including Certificate of Origin and assist with Santos Port clearance via our logistics partners.",
      },
    },
  ],
};

export default function BrazilLandingPage() {
  return (
    <>
      <Header />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Steel Structure Brazil", href: "/steel-structure-brazil" },
            ]}
          />
        </div>
      </div>
      <main className="min-h-screen">
        <LandingPageTracker country="brazil" pageType="brazil" />
        <JsonLd data={serviceSchema} />
        <JsonLd data={faqSchema} />

        {/* ===== Hero Section ===== */}
        <section className="relative bg-gradient-to-r from-green-700 via-green-600 to-yellow-500 text-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                🇧🇷 Engineered for the Brazilian Market
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Steel Structure Solutions for <br className="hidden sm:block" />
                <span className="text-green-300">Brazil</span>
              </h1>
              <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-10">
                NBR 8800 compliant steel buildings — warehouses, factories, agricultural storage, and industrial facilities.
                Fabricated in China, delivered and installed across Brazil.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/calculator?location=brazil"
                  className="inline-block bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg"
                >
                  Get Instant BRL Quote →
                </a>
                <a
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
                >
                  Speak to Engineer
                </a>
                <a
                  href="/projects"
                  className="inline-block bg-yellow-500 text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
                >
                  View Brazilian Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Quick Stats ===== */}
        <section className="bg-green-50 border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "10+", label: "Brazilian Projects" },
                { value: "5", label: "Major Ports Served" },
                { value: "CE, ISO", label: "International Certifications" },
                { value: "NBR 8800", label: "Brazilian Standard Compliant" },
              ].map((s) => (
                <div key={s.label} className="p-4">
                  <div className="text-2xl md:text-3xl font-bold text-green-800 mb-1">{s.value}</div>
                  <div className="text-sm text-green-700">{s.label}</div>
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
                Why Choose Laotie for Your Brazilian Project?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                We bridge Chinese manufacturing quality with Brazilian engineering standards.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "NBR 8800 Compliant Engineering",
                  desc: "Every structure engineered to meet NBR 8800, NBR 6123, and NBR 15421. We provide full structural certification and ART documentation for Prefeitura approvals.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Factory-Direct Pricing (BRL/USD)",
                  desc: "Save 30-50% vs local Brazilian fabricators. Our 5 production lines with 5,000T/month capacity mean competitive pricing on every project.",
                },
                {
                  icon: (
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  title: "Door-to-Door Logistics",
                  desc: "From factory to your site. We handle fabrication, container shipping to Santos/Itajaí/Paranaguá/Suape ports, customs clearance, and installation.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-5">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why Steel for Brazil ===== */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Why Steel Structures for Brazil?
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Engineered for Brazilian conditions — tropical climate, agricultural applications, and industrial expansion.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "🌧️ Tropical Climate Resistant",
                  desc: "Designed for high-rainfall tropical regions (up to 3,000mm annual rainfall). Steep roof slopes and high-capacity gutters handle heavy downpours. Galvanized and pre-painted coatings resist humidity-driven corrosion.",
                },
                {
                  title: "🌍 Seismic & Wind Compliant (NBR 15421/6123)",
                  desc: "Ductile detailing per NBR 15421 for seismic regions and wind load design per NBR 6123 for tropical storms. Suitable for all Brazilian geographic zones.",
                },
                {
                  title: "🌾 Agricultural & Agro-Industrial Ready",
                  desc: "Ideal for grain storage, livestock housing, fertilizer warehouses, and agro-industrial processing plants. Wide clear spans accommodate machinery and bulk storage.",
                },
                {
                  title: "⚡ Fast Installation",
                  desc: "Bolted connection system enables rapid on-site assembly. A 5,000 sqm warehouse can be erected in 4-6 weeks with a crew of 8-10, ideal for fast-track Brazilian projects.",
                },
                {
                  title: "🐜 Termite Proof Construction",
                  desc: "Steel framing eliminates termite risk entirely — critical for tropical and agricultural regions. Unlike timber, steel requires no chemical treatments and comes with a 50-year design life.",
                },
                {
                  title: "♻️ 100% Recyclable",
                  desc: "Steel is 100% recyclable. Your building can be fully disassembled and recycled at end of life, supporting AQUA-HQE and LEED green building certification goals in Brazil.",
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
                From Shenzhen factory to your Brazilian site in 12-20 weeks.
              </p>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="text-3xl font-bold text-green-800 mb-2">Weeks 1-6</div>
                <h3 className="font-bold text-gray-900 mb-2">🎯 Design & Fabrication</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Structural engineering to NBR 8800</li>
                  <li>✓ Shop drawings & ART documentation</li>
                  <li>✓ Steel fabrication in 5 production lines</li>
                  <li>✓ Galvanized/pre-painted coating per NBR 7008</li>
                  <li>✓ Pre-shipment inspection & photos</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="text-3xl font-bold text-green-800 mb-2">Weeks 7-12</div>
                <h3 className="font-bold text-gray-900 mb-2">🚢 Shipping to Brazil</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ Container loading at Qingdao/Shanghai</li>
                  <li>✓ 4-6 weeks sea freight</li>
                  <li>✓ Port options: Santos, Itaguaí, Itajaí, Paranaguá, Suape, Manaus</li>
                  <li>✓ Customs clearance support (II + IPI + PIS/COFINS + ICMS)</li>
                  <li>✓ Port-side delivery or direct to site</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="text-3xl font-bold text-green-800 mb-2">Weeks 13-20</div>
                <h3 className="font-bold text-gray-900 mb-2">🔧 Installation & Handover</h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  <li>✓ On-site assembly by licensed crew</li>
                  <li>✓ Crane & equipment coordination</li>
                  <li>✓ Bolted connection (no welding on site)</li>
                  <li>✓ Prefeitura inspection coordination</li>
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
              title="Our Projects in Brazil"
              subtitle="From warehouse complexes to agricultural facilities — here are recent steel structure projects we've delivered in Brazil."
              projects={[
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Logistics warehouse steel structure in São Paulo, Brazil - 7,500 sqm portal frame building",
                  title: "São Paulo Logistics Warehouse",
                  description: "7,500 sqm portal frame warehouse with 12m eave height. Located in Guarulhos industrial zone with 10T overhead crane for cargo handling.",
                  tags: [
                    { label: "Logistics", color: "bg-green-100 text-green-800" },
                    { label: "São Paulo", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Industrial factory building in Rio de Janeiro, Brazil - 5,200 sqm manufacturing facility",
                  title: "Rio de Janeiro Manufacturing Facility",
                  description: "5,200 sqm factory building with mezzanine office floor. Designed for tropical climate with high-humidity coatings and 5T crane system.",
                  tags: [
                    { label: "Factory", color: "bg-blue-100 text-blue-800" },
                    { label: "Rio de Janeiro", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Steel structure mining facility in Belo Horizonte, Brazil - 6,800 sqm",
                  title: "Belo Horizonte Mining Facility",
                  description: "6,800 sqm multi-span industrial facility for mining equipment storage and maintenance. 14m eave height with 20T cranes across two bays.",
                  tags: [
                    { label: "Mining", color: "bg-orange-100 text-orange-800" },
                    { label: "Belo Horizonte", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Agricultural storage shed in Paraná, Brazil - 4,000 sqm steel building",
                  title: "Paraná Agricultural Storage Shed",
                  description: "4,000 sqm galvanized steel storage shed for grain and agricultural produce. Natural ventilation design with ridge monitors for tropical humidity control.",
                  tags: [
                    { label: "Agricultural", color: "bg-yellow-100 text-yellow-800" },
                    { label: "Paraná", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Cold storage facility in Itajaí, Brazil - 3,500 sqm insulated steel building",
                  title: "Itajaí Cold Storage Facility",
                  description: "3,500 sqm insulated warehouse with 150mm PIR panels. Maintains -25°C for frozen food storage, located near Itajaí port for export logistics.",
                  tags: [
                    { label: "Cold Storage", color: "bg-indigo-100 text-indigo-800" },
                    { label: "Itajaí", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Distribution center in Suape, Brazil - 9,200 sqm steel structure",
                  title: "Suape Distribution Center",
                  description: "9,200 sqm multi-bay distribution center with 16m eave height. Located in Suape Industrial Complex with 15T cranes and mezzanine office floor.",
                  tags: [
                    { label: "Distribution", color: "bg-emerald-100 text-emerald-800" },
                    { label: "Suape", color: "bg-gray-100 text-gray-800" },
                  ],
                },
                {
                  image: "/images/projects/project-perth-01.webp",
                  alt: "Sugar cane processing facility in Mato Grosso, Brazil - 5,800 sqm steel building",
                  title: "Mato Grosso Sugar Cane Facility",
                  description: "5,800 sqm agro-industrial facility for sugar cane processing. Galvanized steel frame with anti-corrosion coating for high-humidity processing environment.",
                  tags: [
                    { label: "Agro-Industrial", color: "bg-pink-100 text-pink-800" },
                    { label: "Mato Grosso", color: "bg-gray-100 text-gray-800" },
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
                Steel Structure Solutions for Brazil
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Every project customized to your site, budget, and Brazilian compliance requirements.
              </p>
            </ScrollAnimator>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🏭",
                  title: "Warehouse & Logistics",
                  desc: "Clear span and multi-span warehouses. 20-60m spans, 8-16m eave heights. Ideal for São Paulo, Rio, and Suape industrial zones.",
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
                  title: "Agricultural & Agro-Industrial",
                  desc: "Grain storage, livestock housing, sugar cane processing, and fertilizer warehouses. Galvanized options for tropical climates.",
                  link: "/products",
                },
                {
                  icon: "⛏️",
                  title: "Mining & Heavy Industrial",
                  desc: "Heavy industrial facilities for Brazil's mining sector. Large cranes, high eave heights, and robust design for heavy-duty operations.",
                  link: "/products",
                },
              ].map((s) => (
                <a key={s.title} href={s.link} className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:border-green-200">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-green-600 text-sm font-semibold group-hover:underline">Learn More →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="py-16 md:py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollAnimator>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                What Our Brazilian Clients Say
              </h2>
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Carlos Silva",
                  company: "Silva Logística Ltda",
                  location: "São Paulo, SP",
                  text: "Laotie delivered our Guarulhos warehouse on time and to NBR 8800 standards. Their structural calculations were verified by our Brazilian engineer. Cost savings were significant compared to local fabricators.",
                  project: "7,500 sqm Warehouse, São Paulo",
                },
                {
                  name: "Mariana Santos",
                  company: "Santos Industrial Group",
                  location: "Rio de Janeiro, RJ",
                  text: "The factory building exceeded our expectations. The bolted connection system made installation fast and clean. Their team handled all import documentation efficiently through Santos port.",
                  project: "5,200 sqm Factory, Rio de Janeiro",
                },
                {
                  name: "João Oliveira",
                  company: "Oliveira Agroindustrial",
                  location: "Belo Horizonte, MG",
                  text: "We needed a large mining facility with cranes. Laotie's engineering team designed to NBR standards with full anti-corrosion coating. Quality is excellent for our heavy industrial application.",
                  project: "6,800 sqm Mining Facility, Belo Horizonte",
                },
              ].map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">"{t.text}"</p>
                  <div className="border-t border-green-100 pt-4">
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.company}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.location}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">{t.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Calculator CTA ===== */}
        <section className="py-12 bg-gradient-to-r from-green-700 via-green-600 to-yellow-500">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get an Instant BRL Estimate
            </h2>
            <p className="text-green-100 mb-8 max-w-lg mx-auto">
              Use our free calculator to price your steel structure in Brazilian Reais or US Dollars. Adjust building type, size, crane, and location.
            </p>
            <a
              href="/calculator?location=brazil"
              className="inline-block bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg"
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
                  q: "How much does a steel building cost per square metre in Brazil?",
                  a: "Steel structure costs in Brazil range from BRL 180-380 per sqm (USD 36-76/sqm) for a basic warehouse to BRL 400-700 per sqm (USD 80-140/sqm) for a fully fitted factory with cranes and insulation. Use our online calculator for an instant estimate tailored to your project.",
                },
                {
                  q: "What Brazilian standards do you comply with?",
                  a: "We design and fabricate to NBR 8800 (Steel Buildings Design), NBR 14762 (Cold-Formed Steel), NBR 6123 (Wind Loads), NBR 15421 (Seismic Design), NBR 7008 (Coated/Galvanized Steel), and NBR 8800 welding requirements. Full compliance documentation provided for Prefeitura approvals and ART (Anotação de Responsabilidade Técnica) requirements.",
                },
                {
                  q: "Can you handle Prefeitura (city hall) approvals and ART documentation in Brazil?",
                  a: "Yes. We provide complete structural engineering calculations, shop drawings, anchor bolt plans, and material certificates required for your Prefeitura building permit applications. Documentation supports ART (Anotação de Responsabilidade Técnica) registration with CREA (Regional Engineering Council).",
                },
                {
                  q: "What is the import duty on steel structures from China to Brazil?",
                  a: "Steel structures (NCM 7308) imported into Brazil typically attract 14-18% Import Duty (II), plus IPI (Industrialized Products Tax) of 5-15%, PIS/COFINS (federal contributions) of 11.75-16.16%, and 18% ICMS (state VAT). Licença de Importação (LI) may be required for certain products. We provide full customs documentation including Certificate of Origin.",
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
                Get a Free Quote for Your Brazilian Project
              </h2>
              <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                Fill in the form below and our Brazil desk team will respond within 24 hours with a detailed quotation.
              </p>
            </ScrollAnimator>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
              <form action="https://formsubmit.co/kangguangjian91@gmail.com" method="POST" className="grid md:grid-cols-2 gap-5">
                <input type="hidden" name="_subject" value="🇧🇷 Brazil Inquiry - Laotie Steel" />
                <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" name="name" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. Carlos Silva" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" name="email" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="carlos@example.com.br" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" name="phone" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="+55 11 9XXXX-XXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Type *</label>
                  <select name="project_type" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select project type</option>
                    <option value="warehouse">Warehouse / Logistics</option>
                    <option value="factory">Factory / Manufacturing</option>
                    <option value="agricultural">Agricultural / Agro-Industrial</option>
                    <option value="cold-storage">Cold Storage</option>
                    <option value="mining">Mining / Heavy Industrial</option>
                    <option value="commercial">Commercial / Showroom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Location in Brazil</label>
                  <select name="project_location" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select state / region</option>
                    <option value="sao-paulo">São Paulo (SP)</option>
                    <option value="rio-de-janeiro">Rio de Janeiro (RJ)</option>
                    <option value="minas-gerais">Minas Gerais (MG) - Belo Horizonte</option>
                    <option value="parana">Paraná (PR) - Curitiba</option>
                    <option value="santa-catarina">Santa Catarina (SC) - Itajaí</option>
                    <option value="rio-grande-do-sul">Rio Grande do Sul (RS)</option>
                    <option value="bahia">Bahia (BA) - Suape</option>
                    <option value="mato-grosso">Mato Grosso (MT) / Mato Grosso do Sul (MS)</option>
                    <option value="pernambuco">Pernambuco (PE) - Suape</option>
                    <option value="amazonas">Amazonas (AM) - Manaus</option>
                    <option value="other">Other / Regional</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Building Size (approx.)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="length" placeholder="Length (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    <input type="number" name="width" placeholder="Width (m)" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Details *</label>
                  <textarea name="message" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Describe your project: building use, roof type, crane requirements, insulation needs, delivery timeline..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-800 transition shadow-lg">
                    Send Inquiry — Get Free Quote →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ===== Also Serving ===== */}
        <section className="py-12 bg-green-50 border-t border-green-100">
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
                  className="inline-block px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-green-200 hover:bg-green-100 hover:text-green-800 transition-colors"
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <div className="bg-green-900 text-green-200 text-xs text-center py-3 px-4">
        Serving Brazil: São Paulo | Rio de Janeiro | Belo Horizonte | Curitiba | Itajaí | Porto Alegre | Suape | Manaus
      </div>
      <Footer />
    </>
  );
}

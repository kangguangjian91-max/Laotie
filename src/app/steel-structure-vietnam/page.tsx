import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProjectCarousel from "@/components/ProjectCarousel";
import LandingPageTracker from "@/components/LandingPageTracker";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: "Steel Structure Vietnam | Warehouse & Factory Construction",
  description:
    "Leading steel structure manufacturer for Vietnam. Custom warehouse, factory, and industrial building solutions. CE certified, 30-year warranty. Get free quote today!",
  keywords: [
    "steel structure vietnam",
    "warehouse construction vietnam",
    "factory building vietnam",
    "steel building supplier vietnam",
    "prefab warehouse vietnam",
    "industrial construction vietnam",
    "portal frame vietnam",
    "steel fabrication hanoi",
    "warehouse builder ho chi minh city",
    "factory construction da nang",
    // Vietnamese local keywords
    "nhà xưởng tiền chế",
    "kết cấu thép",
    "xưởng sản xuất thép",
    "nhà kho thép tiền chế",
    "công ty kết cấu thép",
  ],
  openGraph: {
    title: "Steel Structure Vietnam | Laotie Steel",
    description:
      "Your trusted steel structure partner in Vietnam. 100+ projects completed across Hanoi, Ho Chi Minh City, Da Nang.",
    images: ["/images/vietnam/hero.webp"],
    locale: "en_VN",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Construction Vietnam",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Vietnam",
  },
  description:
    "Custom steel structure solutions for warehouse, factory, and industrial buildings in Vietnam.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "25-65",
    priceValidUntil: "2026-12-31",
    availableAtOrFrom: {
      "@type": "Place",
      name: "Vietnam",
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure warehouse cost in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure warehouse cost in Vietnam ranges from VND 3,500,000 to VND 8,000,000 per square meter, depending on size, design complexity, and materials. Laotie offers factory-direct pricing at USD 25-65 per sqm.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a steel warehouse in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline: 4-6 weeks for production in China, 1-2 weeks for shipping to Vietnam (Hai Phong or Ho Chi Minh ports), 4-8 weeks for on-site installation. Total: 9-16 weeks from order to completion.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a building permit for steel structure in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you need building permits from your local People's Committee. Laotie provides all necessary structural calculations, drawings, and certificates to support your permit application.",
      },
    },
    {
      "@type": "Question",
      name: "Can steel structures withstand typhoons in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our steel structures are designed to withstand typhoons up to 200 km/h (typical in Vietnam). We use high-strength steel (Q345B) and certified welding processes to ensure durability.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide installation services in Vietnam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide complete installation services. Our team will guide installation via video call, provide detailed manuals, and can dispatch engineers to Vietnam if needed (additional cost).",
      },
    },
    {
      "@type": "Question",
      name: "What payment terms do you offer for Vietnam clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer flexible payment terms: 30% deposit, 60% before shipment, 10% after installation. We accept T/T, L/C, and can work with Vietnamese banks.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.laotie-steel.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Steel Structure Vietnam",
      item: "https://www.laotie-steel.com/steel-structure-vietnam",
    },
  ],
};

export default function VietnamLandingPage() {
  return (
    <main className="min-h-screen">
      <LandingPageTracker country="vietnam" pageType="vietnam" />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-900 via-red-800 to-yellow-700 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Steel Structure Solutions for{" "}
              <span className="text-yellow-400">Vietnam</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-red-100">
              Your Trusted Partner for Warehouse & Factory Construction
            </p>
            <p className="text-lg mb-8 text-red-200 max-w-2xl mx-auto">
              100+ projects completed across Hanoi, Ho Chi Minh City, Da Nang & more.
              CE certified, 30-year warranty, factory-direct pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-block bg-yellow-400 text-red-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                Get Free Quote →
              </a>
              <a
                href="#projects"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-900 transition-colors"
              >
                View Projects
              </a>
              <a
                href="/calculator?location=vietnam"
                className="inline-block border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-red-900 transition-colors"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Laotie Steel?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ScrollAnimator animation="fade-in" delay={0}>
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-xl font-bold mb-2">15+ Years Experience</h3>
              <p className="text-gray-600">
                Since 2009, we've manufactured steel structures for 100+ projects worldwide.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={200}>
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">CE & ISO Certified</h3>
              <p className="text-gray-600">
                All products meet international standards. CE, ISO 9001, IAF certified.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="fade-in" delay={400}>
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Factory-Direct Price</h3>
              <p className="text-gray-600">
                Save 30-50% compared to local suppliers. No middleman, best value.
              </p>
            </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Why Vietnam */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Steel Structures in Vietnam?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <ScrollAnimator animation="slide-in-left" delay={0}>
            <div>
              <h3 className="text-2xl font-bold mb-4">🌪️ Typhoon-Resistant Design</h3>
              <p className="text-gray-600 mb-4">
                Vietnam is prone to typhoons, especially in central regions. Our steel structures are engineered to withstand wind speeds up to 200 km/h, exceeding Vietnam's building codes.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>High-strength steel (Q345B) for superior durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Reinforced connections to resist typhoon winds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Corrosion-resistant coatings for humid climate</span>
                </li>
              </ul>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="slide-in-right" delay={100}>
            <div>
              <h3 className="text-2xl font-bold mb-4">💵 Cost-Effective Solution</h3>
              <p className="text-gray-600 mb-4">
                Steel structures offer the best value for Vietnamese businesses. Compared to concrete buildings, you save 30-50% on construction costs and 20-30% on timeline.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Lower material costs (factory-direct from China)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Faster construction (4-8 weeks vs 6-12 months for concrete)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✓</span>
                  <span>Reduced labor costs (prefabricated components)</span>
                </li>
              </ul>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="slide-in-left" delay={200}>
            <div>
              <h3 className="text-2xl font-bold mb-4">🔧 Flexible & Expandable</h3>
              <p className="text-gray-600 mb-4">
                As your business grows, your steel building can easily expand. Add more bays, extend the length, or relocate the entire structure if needed.
              </p>
            </div>
            </ScrollAnimator>
            <ScrollAnimator animation="slide-in-right" delay={300}>
            <div>
              <h3 className="text-2xl font-bold mb-4">🛡️ Low Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Our hot-dip galvanized steel requires minimal maintenance even in Vietnam's humid climate. 30-year warranty gives you peace of mind.
              </p>
            </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Logistics & Installation */}
      <ScrollAnimator animation="fade-in">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Logistics & Installation Support
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="p-6 rounded-xl bg-red-50">
              <h3 className="text-xl font-bold mb-3">🚢 Shipping to Vietnam</h3>
              <p className="text-gray-600 mb-4">
                We ship to major Vietnamese ports:
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Hai Phong Port (North Vietnam)</li>
                <li>• Ho Chi Minh Port (South Vietnam)</li>
                <li>• Da Nang Port (Central Vietnam)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                Typical transit time: 7-14 days from China factories.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-red-50">
              <h3 className="text-xl font-bold mb-3">📦 Customs Clearance</h3>
              <p className="text-gray-600 mb-4">
                We provide all necessary documents for smooth customs clearance in Vietnam:
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Commercial Invoice</li>
                <li>• Packing List</li>
                <li>• Bill of Lading</li>
                <li>• Certificate of Origin (Form E)</li>
                <li>• Quality Certificates</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-red-50">
              <h3 className="text-xl font-bold mb-3">🔧 Installation Support</h3>
              <p className="text-gray-600 mb-4">
                We provide comprehensive installation support:
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Detailed installation manuals (English/Vietnamese)</li>
                <li>• Video call guidance (WhatsApp/Zoom)</li>
                <li>• On-site engineer dispatch (optional)</li>
                <li>• 24/7 technical support</li>
              </ul>
            </div>
          </div>
          <div className="max-w-3xl mx-auto bg-red-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Project Timeline for Vietnam</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold">Order & Design (1-2 weeks)</h4>
                  <p className="text-gray-600 text-sm">
                    Confirm design, sign contract, pay deposit.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold">Production in China (4-6 weeks)</h4>
                  <p className="text-gray-600 text-sm">
                    Steel cutting, welding, surface treatment, packaging.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold">Shipping to Vietnam (1-2 weeks)</h4>
                  <p className="text-gray-600 text-sm">
                    Sea freight to Hai Phong or Ho Chi Minh port.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold">On-Site Installation (4-8 weeks)</h4>
                  <p className="text-gray-600 text-sm">
                    Foundation preparation, steel erection, roofing & wall cladding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollAnimator>

      {/* Project Cases - Carousel */}
      <ProjectCarousel
        title="Project Cases in Vietnam"
        subtitle="We have completed 100+ steel structure projects across Vietnam. Here are some of our recent works."
        projects={[
          {
            image: "/images/vietnam/3c827b0a462391a3e3486e39a5ae25d4.webp",
            alt: "Steel structure warehouse in Hanoi, Vietnam - 5,000 sqm prefab logistics building",
            title: "Hanoi Warehouse Complex",
            description: "5,000 sqm steel structure warehouse for logistics company in Hanoi. 2025 completion.",
            tags: [
              { label: "Warehouse", color: "bg-red-100 text-red-700" },
              { label: "Hanoi", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp",
            alt: "Steel structure factory in Ho Chi Minh City, Vietnam - 8,000 sqm electronics plant",
            title: "Ho Chi Minh Manufacturing Plant",
            description: "8,000 sqm factory building for electronics manufacturer in Thu Duc. 2024 completion.",
            tags: [
              { label: "Factory", color: "bg-red-100 text-red-700" },
              { label: "Ho Chi Minh", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/5704819281f8e9ad3038915e967864ad.webp",
            alt: "Steel structure logistics center in Da Nang, Vietnam - 3,500 sqm warehouse",
            title: "Da Nang Logistics Center",
            description: "3,500 sqm warehouse with office space in Da Nang. 2024 completion.",
            tags: [
              { label: "Warehouse", color: "bg-red-100 text-red-700" },
              { label: "Da Nang", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/688e07390f62e21cbb8bd1a1ba455959.webp",
            alt: "Steel structure industrial building in Hai Phong, Vietnam - 6,500 sqm factory",
            title: "Hai Phong Industrial Park",
            description: "6,500 sqm steel structure factory for automotive parts supplier. 2025 completion.",
            tags: [
              { label: "Factory", color: "bg-red-100 text-red-700" },
              { label: "Hai Phong", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/1a3e5a019b4c71eda2da853679708074.webp",
            alt: "Steel structure agricultural facility in Can Tho, Vietnam - 4,200 sqm processing plant",
            title: "Can Tho Agricultural Facility",
            description: "4,200 sqm steel structure for rice processing and storage. Mekong Delta region.",
            tags: [
              { label: "Agricultural", color: "bg-red-100 text-red-700" },
              { label: "Can Tho", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/679234a53ccd9c56cf26658f4f072138.webp",
            alt: "Steel structure electronics factory in Binh Duong, Vietnam - 7,000 sqm with ESD flooring",
            title: "Binh Duong Electronics Factory",
            description: "7,000 sqm steel structure factory with ESD flooring. High-tech manufacturing.",
            tags: [
              { label: "Factory", color: "bg-red-100 text-red-700" },
              { label: "Binh Duong", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/67dd07a1917aa291f1631e16ce010c88.webp",
            alt: "Steel structure warehouse in Dong Nai, Vietnam - 5,500 sqm logistics center",
            title: "Dong Nai Logistics Warehouse",
            description: "5,500 sqm distribution center near Ho Chi Minh City. Strategic location.",
            tags: [
              { label: "Warehouse", color: "bg-red-100 text-red-700" },
              { label: "Dong Nai", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/7ea1821bc8fdfac59547d2c042c2f6ae.webp",
            alt: "Steel structure workshop in Quang Ninh, Vietnam - 3,800 sqm mining equipment",
            title: "Quang Ninh Mining Equipment Workshop",
            description: "3,800 sqm heavy-duty workshop with 15-ton crane system. Coal mining region.",
            tags: [
              { label: "Workshop", color: "bg-red-100 text-red-700" },
              { label: "Quang Ninh", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/967a25ac2c3ec808229a990e27529ba2.webp",
            alt: "Steel structure food processing plant in Long An, Vietnam - 4,500 sqm with cold storage",
            title: "Long An Food Processing Plant",
            description: "4,500 sqm steel structure facility for seafood processing. Cold storage included.",
            tags: [
              { label: "Processing", color: "bg-red-100 text-red-700" },
              { label: "Long An", color: "bg-gray-100 text-gray-700" },
            ],
          },
          {
            image: "/images/vietnam/bd585762b3e96733450d3660029a1ab4.webp",
            alt: "Steel structure warehouse in Ba Ria-Vung Tau, Vietnam - 6,000 sqm near Cai Mep port",
            title: "Vung Tau Port Warehouse",
            description: "6,000 sqm steel warehouse near Cai Mep port. Export-oriented business.",
            tags: [
              { label: "Warehouse", color: "bg-red-100 text-red-700" },
              { label: "Vung Tau", color: "bg-gray-100 text-gray-700" },
            ],
          },
        ]}
      />

      {/* Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Solutions for Vietnam
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-xl border-2 border-red-100 hover:border-red-500 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Warehouse Buildings</h3>
              <p className="text-gray-600 text-sm">
                Steel structure warehouses for logistics, storage, distribution in Vietnam.
              </p>
            </div>
            <div className="p-6 rounded-xl border-2 border-red-100 hover:border-red-500 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Factory Buildings</h3>
              <p className="text-gray-600 text-sm">
                Custom factory buildings for manufacturing, processing, assembly in Vietnam.
              </p>
            </div>
            <div className="p-6 rounded-xl border-2 border-red-100 hover:border-red-500 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Commercial Buildings</h3>
              <p className="text-gray-600 text-sm">
                Steel structure for showrooms, office buildings, shopping malls in Vietnam.
              </p>
            </div>
            <div className="p-6 rounded-xl border-2 border-red-100 hover:border-red-500 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Agricultural Structures</h3>
              <p className="text-gray-600 text-sm">
                Poultry houses, greenhouses, storage sheds for Vietnam's agricultural sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <ScrollAnimator animation="fade-in">
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Vietnam Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Laotie delivered our Hanoi warehouse on time and on budget. The quality is excellent, and their installation guidance was very helpful."
              </p>
              <div className="font-bold">Nguyen Van A</div>
              <div className="text-sm text-gray-500">Hanoi, Vietnam</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "We saved 40% compared to local suppliers. The steel structure is durable and withstands typhoons well."
              </p>
              <div className="font-bold">Tran Thi B</div>
              <div className="text-sm text-gray-500">Ho Chi Minh City, Vietnam</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professional service from design to installation. Highly recommend Laotie for steel structure projects in Vietnam."
              </p>
              <div className="font-bold">Le Van C</div>
              <div className="text-sm text-gray-500">Da Nang, Vietnam</div>
            </div>
          </div>
        </div>
      </section>
      </ScrollAnimator>

      {/* FAQ */}
      <ScrollAnimator animation="fade-in">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions (Vietnam)
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="p-6 rounded-xl bg-gray-50 cursor-pointer">
              <summary className="font-bold text-lg">How much does a steel structure warehouse cost in Vietnam?</summary>
              <p className="mt-4 text-gray-600">
                Steel structure warehouse cost in Vietnam ranges from VND 3,500,000 to VND 8,000,000 per square meter, depending on size, design complexity, and materials. Laotie offers factory-direct pricing at USD 25-65 per sqm.
              </p>
            </details>
            <details className="p-6 rounded-xl bg-gray-50 cursor-pointer">
              <summary className="font-bold text-lg">How long does it take to build a steel warehouse in Vietnam?</summary>
              <p className="mt-4 text-gray-600">
                Typical timeline: 4-6 weeks for production in China, 1-2 weeks for shipping to Vietnam (Hai Phong or Ho Chi Minh ports), 4-8 weeks for on-site installation. Total: 9-16 weeks from order to completion.
              </p>
            </details>
            <details className="p-6 rounded-xl bg-gray-50 cursor-pointer">
              <summary className="font-bold text-lg">Do I need a building permit for steel structure in Vietnam?</summary>
              <p className="mt-4 text-gray-600">
                Yes, you need building permits from your local People's Committee. Laotie provides all necessary structural calculations, drawings, and certificates to support your permit application.
              </p>
            </details>
            <details className="p-6 rounded-xl bg-gray-50 cursor-pointer">
              <summary className="font-bold text-lg">Can steel structures withstand typhoons in Vietnam?</summary>
              <p className="mt-4 text-gray-600">
                Yes, our steel structures are designed to withstand typhoons up to 200 km/h (typical in Vietnam). We use high-strength steel (Q345B) and certified welding processes to ensure durability.
              </p>
            </details>
            <details className="p-6 rounded-xl bg-gray-50 cursor-pointer">
              <summary className="font-bold text-lg">Do you provide installation services in Vietnam?</summary>
              <p className="mt-4 text-gray-600">
                Yes, we provide complete installation services. Our team will guide installation via video call, provide detailed manuals, and can dispatch engineers to Vietnam if needed (additional cost).
              </p>
            </details>
            <details className="p-6 rounded-xl bg-gray-50 cursor-pointer">
              <summary className="font-bold text-lg">What payment terms do you offer for Vietnam clients?</summary>
              <p className="mt-4 text-gray-600">
                We offer flexible payment terms: 30% deposit, 60% before shipment, 10% after installation. We accept T/T, L/C, and can work with Vietnamese banks.
              </p>
            </details>
          </div>
        </div>
      </section>
      </ScrollAnimator>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get Free Quote for Vietnam Project
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg" action="https://formsubmit.co/kangguangjian91@gmail.com" method="POST">
              {/* FormSubmit configuration */}
              <input type="hidden" name="_subject" value="🇻🇳 Vietnam Inquiry — Laotie Steel Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Your name"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="+84 xxx xxx xxx"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                <label htmlFor="project-size" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Size (sqm)
                </label>
                <input
                  type="number"
                  id="project-size"
                  name="project-size"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. 1000"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Location in Vietnam
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g. Hanoi, Ho Chi Minh City, Da Nang"
                />
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Tell us about your project requirements..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
              >
                Get Free Quote
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">Or contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/8616650735555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  📱 WhatsApp: +86 166-5073-5555
                </a>
                <a
                  href="mailto:kangguangjian91@gmail.com"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  ✉️ Email: kangguangjian91@gmail.com
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                🕐 Response time: Within 2 hours (Mon-Sat, 8:00-18:00 CST/ICT)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">LT</span>
              </div>
              <h3 className="text-white font-bold text-lg">LAOTIE VIETNAM</h3>
            </div>
            <p className="text-sm mb-6">
              Professional steel structure manufacturer for Vietnam market.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="/products" className="hover:text-white transition-colors">
                Products
              </a>
              <a href="/projects" className="hover:text-white transition-colors">
                Projects
              </a>
              <a href="/manufacturing-process" className="hover:text-white transition-colors">
                Manufacturing
              </a>
              <a href="/blog" className="hover:text-white transition-colors">
                Blog
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="border-t border-gray-800 pt-8 text-sm">
              <p>© {new Date().getFullYear()} Laotie Steel Structure Co., Ltd. All rights reserved.</p>
              <p className="mt-2 text-gray-500">
                Factory: Shangqiu, Henan, China | Serving clients across Vietnam
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

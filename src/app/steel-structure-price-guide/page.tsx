import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Steel Structure Price Guide 2026 | Cost Calculator",
  description:
    "Get the latest steel structure price guide for 2026. Cost calculator for warehouse, factory, and industrial buildings. Free quotation within 24 hours. CE certified, 30-year warranty.",
  keywords: [
    "steel structure price",
    "steel building cost",
    "warehouse construction cost",
    "factory building price",
    "prefab building price calculator",
    "steel structure price per square meter",
    "steel warehouse cost 2026",
    "pre-engineered building price",
    "steel fabrication cost",
    "steel structure quotation",
    // Local keywords
    "steel price vietnam",
    "steel building cost indonesia",
    "warehouse construction price nigeria",
    "steel structure price philippines",
    "steel building bangkok price",
  ],
  openGraph: {
    title: "Steel Structure Price Guide 2026 | Laotie Steel",
    description:
      "Get the latest steel structure price guide. Cost calculator and free quotation within 24 hours.",
    url: "https://www.laotie-steel.com/steel-structure-price-guide",
    siteName: "Laotie Steel Structure",
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/steel-structure-price-guide" },
};

const priceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Steel Structure Price Guide",
  provider: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "25",
    highPrice: "120",
    offerCount: "5",
    description: "Steel structure price per square meter, varies by specification and region",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a steel structure warehouse cost per square meter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Steel structure warehouse typically costs $25-$80 per square meter for the steel framework only. Complete building with cladding, insulation, and accessories ranges from $60-$150 per square meter.",
      },
    },
    {
      "@type": "Question",
      name: "What factors affect steel structure pricing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Main factors: 1) Building size (economies of scale), 2) Steel grade and thickness, 3) Design complexity, 4) Location (shipping cost), 5) Accessories (crane, insulation, etc.)",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to get a quotation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide preliminary quotations within 24 hours. Detailed engineering quotations with shop drawings take 3-5 working days.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer installation services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer installation services in Vietnam, Indonesia, Nigeria, Philippines, and Thailand. We also provide installation manuals and remote video guidance for DIY projects.",
      },
    },
  ],
};

export default function SteelStructurePriceGuide() {
  return (
    <>
      <JsonLd data={priceSchema} />
      <JsonLd data={faqSchema} />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Steel Structure Price Guide 2026
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get accurate pricing for your steel warehouse, factory, or industrial building.
              Free quotation within 24 hours.
            </p>
            <a
              href="#quotation-form"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
            >
              Get Free Quotation →
            </a>
          </div>
        </section>

        {/* Price Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Steel Structure Price Overview (2026)
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Package */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Basic Package</h3>
                <div className="text-4xl font-bold text-orange-500 mb-6">
                  $25-$45<span className="text-lg text-gray-600">/m²</span>
                </div>
                <p className="text-gray-600 mb-6">Steel framework only</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Primary & secondary steel structure
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Bolts and connections
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Shop drawings
                  </li>
                  <li className="flex items-start text-gray-400">
                    <span className="mr-2">✗</span>
                    Cladding system
                  </li>
                  <li className="flex items-start text-gray-400">
                    <span className="mr-2">✗</span>
                    Insulation
                  </li>
                </ul>
                <a
                  href="#quotation-form"
                  className="block text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Get Quote
                </a>
              </div>

              {/* Standard Package */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-500 relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Standard Package</h3>
                <div className="text-4xl font-bold text-orange-500 mb-6">
                  $60-$90<span className="text-lg text-gray-600">/m²</span>
                </div>
                <p className="text-gray-600 mb-6">Complete building envelope</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Everything in Basic Package
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Roof & wall cladding
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Doors & windows
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Gutters & downspouts
                  </li>
                  <li className="flex items-start text-gray-400">
                    <span className="mr-2">✗</span>
                    Insulation & crane
                  </li>
                </ul>
                <a
                  href="#quotation-form"
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Get Quote
                </a>
              </div>

              {/* Premium Package */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Premium Package</h3>
                <div className="text-4xl font-bold text-orange-500 mb-6">
                  $90-$150<span className="text-lg text-gray-600">/m²</span>
                </div>
                <p className="text-gray-600 mb-6">Turnkey solution</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Everything in Standard Package
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Insulation system
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Crane beam (if needed)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Mezzanine floor (optional)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Installation support
                  </li>
                </ul>
                <a
                  href="#quotation-form"
                  className="block text-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Price Calculator */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Steel Structure Price Calculator
            </h2>

            <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-lg">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building Type *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select building type</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="factory">Factory</option>
                      <option value="workshop">Workshop</option>
                      <option value="commercial">Commercial Building</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building Size (m²) *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select location</option>
                      <option value="vietnam">Vietnam</option>
                      <option value="indonesia">Indonesia</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="philippines">Philippines</option>
                      <option value="thailand">Thailand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Crane Needed?
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="no">No</option>
                      <option value="yes">Yes (5-ton)</option>
                      <option value="yes-10t">Yes (10-ton)</option>
                      <option value="yes-20t">Yes (20-ton+)</option>
                    </select>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <button
                    type="button"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                  >
                    Calculate Estimated Price
                  </button>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center hidden" id="price-result">
                  <p className="text-gray-600 mb-2">Estimated Price Range:</p>
                  <p className="text-3xl font-bold text-blue-900">
                    $<span id="price-low">0</span> - $<span id="price-high">0</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    * Preliminary estimate, final price depends on detailed design
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Regional Price Comparison */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Regional Price Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Region</th>
                    <th className="px-6 py-4 text-left">Basic Package ($/m²)</th>
                    <th className="px-6 py-4 text-left">Standard Package ($/m²)</th>
                    <th className="px-6 py-4 text-left">Shipping Time</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">🇻🇳 Vietnam</td>
                    <td className="px-6 py-4">$25 - $40</td>
                    <td className="px-6 py-4">$60 - $80</td>
                    <td className="px-6 py-4">7-14 days</td>
                    <td className="px-6 py-4">
                      <a href="/steel-structure-vietnam" className="text-blue-600 hover:text-blue-800">
                        View Details →
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">🇮🇩 Indonesia</td>
                    <td className="px-6 py-4">$28 - $45</td>
                    <td className="px-6 py-4">$65 - $85</td>
                    <td className="px-6 py-4">10-18 days</td>
                    <td className="px-6 py-4">
                      <a href="/steel-structure-indonesia" className="text-blue-600 hover:text-blue-800">
                        View Details →
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">🇳🇬 Nigeria</td>
                    <td className="px-6 py-4">$35 - $55</td>
                    <td className="px-6 py-4">$75 - $100</td>
                    <td className="px-6 py-4">25-40 days</td>
                    <td className="px-6 py-4">
                      <a href="/steel-structure-nigeria" className="text-blue-600 hover:text-blue-800">
                        View Details →
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">🇵🇭 Philippines</td>
                    <td className="px-6 py-4">$30 - $48</td>
                    <td className="px-6 py-4">$68 - $90</td>
                    <td className="px-6 py-4">12-20 days</td>
                    <td className="px-6 py-4">
                      <a href="/steel-structure-philippines" className="text-blue-600 hover:text-blue-800">
                        View Details →
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">🇹🇭 Thailand</td>
                    <td className="px-6 py-4">$27 - $42</td>
                    <td className="px-6 py-4">$62 - $82</td>
                    <td className="px-6 py-4">8-15 days</td>
                    <td className="px-6 py-4">
                      <a href="/steel-structure-thailand" className="text-blue-600 hover:text-blue-800">
                        View Details →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Factors Affecting Price */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Factors Affecting Steel Structure Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">1. Building Size</h3>
                <p className="text-gray-700">
                  Larger buildings have lower cost per square meter due to economies of scale.
                  A 5,000 m² warehouse may cost 20-30% less per m² than a 500 m² building.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">2. Steel Grade & Thickness</h3>
                <p className="text-gray-700">
                  Higher grade steel (Q355 vs Q235) and thicker plates increase cost but improve
                  durability. Typical steel usage: 25-40 kg/m² for warehouse.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">3. Design Complexity</h3>
                <p className="text-gray-700">
                  Simple rectangular buildings are cheapest. Cranes, mezzanines, complex roof
                  designs increase cost by 15-40%.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">4. Location & Shipping</h3>
                <p className="text-gray-700">
                  Shipping cost varies by region. Vietnam & Thailand are cheapest (7-15 days).
                  Nigeria & remote areas have higher shipping cost (25-40 days).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">5. Accessories</h3>
                <p className="text-gray-700">
                  Cranes ($10-30/m²), insulation ($5-15/m²), mezzanine ($40-80/m²) add to total cost.
                  Choose based on your actual needs.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">6. Foundation & Installation</h3>
                <p className="text-gray-700">
                  Not included in our price. Local contractor needed. Typical cost: $15-40/m²
                  for simple foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quotation Form */}
        <section id="quotation-form" className="py-16 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Get Your Free Quotation Within 24 Hours
            </h2>
            <p className="text-center text-lg mb-12">
              Provide your project details, and our engineering team will prepare a detailed quotation.
            </p>

            <form
              className="space-y-6 bg-white text-gray-900 p-8 rounded-2xl shadow-lg"
              action="https://formsubmit.co/kangguangjian91@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="💰 Price Guide Quotation Request — Laotie Steel Website" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country / Region *
                  </label>
                  <select
                    name="country"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select country</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Type *
                  </label>
                  <select
                    name="building_type"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Factory">Factory</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Commercial">Commercial Building</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Size (m²) *
                  </label>
                  <input
                    type="number"
                    name="size"
                    required
                    placeholder="e.g. 1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="requirements"
                  rows={4}
                  placeholder="Crane needed? Insulation? Special design requirements?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors"
                >
                  Get Free Quotation →
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">
                  How much does a steel structure warehouse cost per square meter?
                </h3>
                <p className="text-gray-700">
                  Steel structure warehouse typically costs <strong>$25-$80 per square meter</strong> for
                  the steel framework only. Complete building with cladding, insulation, and accessories
                  ranges from <strong>$60-$150 per square meter</strong>.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">
                  What factors affect steel structure pricing?
                </h3>
                <p className="text-gray-700">
                  Main factors: 1) Building size (economies of scale), 2) Steel grade and thickness,
                  3) Design complexity, 4) Location (shipping cost), 5) Accessories (crane, insulation, etc.)
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">
                  How long does it take to get a quotation?
                </h3>
                <p className="text-gray-700">
                  We provide <strong>preliminary quotations within 24 hours</strong>. Detailed engineering
                  quotations with shop drawings take <strong>3-5 working days</strong>.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">
                  Do you offer installation services?
                </h3>
                <p className="text-gray-700">
                  Yes, we offer installation services in Vietnam, Indonesia, Nigeria, Philippines, and
                  Thailand. We also provide installation manuals and remote video guidance for DIY projects.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">
                  What is the minimum order quantity?
                </h3>
                <p className="text-gray-700">
                  We accept orders from <strong>200 m²</strong>. For smaller projects, we recommend
                  checking with local suppliers for better shipping economy.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">
                  Do you provide warranty?
                </h3>
                <p className="text-gray-700">
                  Yes, we provide <strong>30-year warranty</strong> on structural steel and <strong>10-year warranty</strong>{" "}
                  on cladding system. All products are <strong>CE certified</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us today for a free consultation and quotation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#quotation-form"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
              >
                Get Free Quotation
              </a>
              <a
                href="https://wa.me/861234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

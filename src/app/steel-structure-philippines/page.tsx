import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Structure Philippines | Warehouse & Factory Construction",
  description:
    "Leading steel structure manufacturer for Philippines. Custom warehouse, factory, and industrial building solutions. CE certified, 30-year warranty. Get free quote today!",
  keywords: [
    "steel structure philippines",
    "warehouse construction philippines",
    "factory building philippines",
    "steel building supplier philippines",
    "prefab warehouse philippines",
    "industrial construction philippines",
  ],
  openGraph: {
    title: "Steel Structure Philippines | Laotie Steel",
    description:
      "Your trusted steel structure partner in Philippines. 500+ projects completed across Manila, Cebu, Davao.",
    images: ["/images/philippines/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp"],
    locale: "en_PH",
    type: "website",
  },
};

export default function PhilippinesLandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Steel Structure Solutions for{" "}
              <span className="text-yellow-400">Philippines</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Custom warehouse, factory & industrial buildings. CE certified quality, 30-year warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg transition-colors"
              >
                Get Free Quote
              </a>
              <a
                href="#projects"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-lg transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us for Your Philippines Project?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2">500+ Projects in Philippines</h3>
              <p className="text-gray-600">
                Proven track record across Manila, Cebu, Davao, and beyond.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">CE Certified Quality</h3>
              <p className="text-gray-600">
                International quality standards with 30-year structural warranty.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery & Installation</h3>
              <p className="text-gray-600">
                Optimized logistics for Philippines. 4-6 weeks production lead time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Cases */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Recent Projects in Philippines
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/philippines/0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp"
                alt="Warehouse project in Manila, Philippines"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Manila Warehouse Complex</h3>
                <p className="text-gray-600 text-sm">
                  5,000 sqm steel structure warehouse with office annex
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/philippines/5704819281f8e9ad3038915e967864ad.webp"
                alt="Factory building in Cebu, Philippines"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Cebu Manufacturing Plant</h3>
                <p className="text-gray-600 text-sm">
                  3,000 sqm steel structure factory with crane system
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/images/philippines/688e07390f62e21cbb8bd1a1ba455959.webp"
                alt="Industrial building in Davao, Philippines"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Davao Logistics Center</h3>
                <p className="text-gray-600 text-sm">
                  8,000 sqm distribution center with mezzanine floor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Steel Structure Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">📦 Warehouse Buildings</h3>
              <p className="text-gray-600">
                Custom design for storage, logistics, and distribution centers.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">🏭 Factory Buildings</h3>
              <p className="text-gray-600">
                Industrial facilities with crane systems and mezzanine floors.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">🏢 Commercial Buildings</h3>
              <p className="text-gray-600">
                Office buildings, showrooms, and retail spaces.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">🌐 Agricultural Structures</h3>
              <p className="text-gray-600">
                Farm sheds, poultry houses, and storage facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get Your Free Quote Today
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
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
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project size, location, and requirements..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Send Inquiry
              </button>
            </form>
            <div className="mt-8 text-center text-gray-600">
              <p>📞 Or contact us directly:</p>
              <p className="font-bold text-lg mt-2">+63 XXX XXX XXXX (Philippines)</p>
              <p>📧 info@laotie-steel.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Laotie Steel Structure. All rights reserved.</p>
          <p className="mt-2 text-gray-400">
            Serving Philippines: Manila | Cebu | Davao | Baguio | Iloilo
          </p>
        </div>
      </footer>
    </main>
  );
}

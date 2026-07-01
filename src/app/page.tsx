import Header from "@/components/Header";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

// Dynamic imports for non-critical components (code splitting)
const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => (
    <section className="bg-[#1B3A6B] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-12 px-4 text-center animate-pulse">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl" />
              <div className="h-10 w-24 mx-auto mb-2 bg-white/10 rounded" />
              <div className="h-4 w-28 mx-auto bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});

const Products = dynamic(() => import("@/components/Products"), {
  loading: () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="h-8 w-64 mx-auto mb-12 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4" />
              <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});

const Factory = dynamic(() => import("@/components/Factory"));
const ProductionProcess = dynamic(() => import("@/components/ProductionProcess"));
const Projects = dynamic(() => import("@/components/Projects"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));

export const metadata: Metadata = {
  title: "Steel Structure Manufacturer in China | Laotie Steel",
  keywords: [
    "steel structure manufacturer China",
    "steel building manufacturer",
    "prefabricated steel structures",
    "steel structure factory",
    "portal frame manufacturer",
    "steel warehouse manufacturer",
    "pre engineered steel buildings",
    "steel construction company China",
    "steel frame building supplier",
    "industrial steel buildings",
  ],
  description:
    "Leading steel structure manufacturer in China. 5 production lines, 5,000T/month capacity. Portal frames, floor decks, space frames. Get a free quote today.",
  openGraph: {
    title: "Laotie Steel — Steel Structure Manufacturer in China",
    description:
      "Factory-direct steel buildings, space frames, floor decks, cladding systems. 5 lines, 5,000T/month capacity. CE & ISO certified.",
    images: [{ 
      url: "/images/og-image.webp", 
      width: 1200, 
      height: 630,
      alt: "Laotie Steel Structure factory and steel building projects"
    }],
    url: "https://www.laotie-steel.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laotie Steel — Steel Structure Manufacturer",
    description: "CE & ISO certified. 15+ years, 30+ countries. Get a quote in 24h.",
    images: ["/images/og-image.webp"],
  },
  alternates: { canonical: "https://www.laotie-steel.com" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Henan Laotie Steel Structure Engineering Co., Ltd.",
  description: "CE & ISO certified steel structure manufacturer in China. 5 production lines, 5,000T/month capacity. Serving 30+ countries with factory-direct pricing.",
  url: "https://www.laotie-steel.com",
  telephone: "+86-166-5073-5555",
  priceRange: "$$",
  image: "https://www.laotie-steel.com/images/factory-workshop.webp",
  address: {
    "@type": "PostalAddress",
    addressCountry: "China",
    addressRegion: "Henan",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "34.7466",
    longitude: "113.6253",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/laotie-steel",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Header />
      <main>
        <Hero />
        {/* ===== Urgency Bar ===== */}
        <section className="bg-amber-50 border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="text-center text-sm text-amber-800">
              Current production lead time: <strong>4-6 weeks</strong> from order confirmation. 
              Book your production slot now to avoid delays.
            </p>
          </div>
        </section>
        {/* ===== Certification Badges ===== */}
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-center text-sm text-gray-500 mb-6 font-medium tracking-wide uppercase">
              Trusted Worldwide — Certified Quality
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* ISO 9001 */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.518a1.5 1.5 0 00-2.196-2.196L5.196 17.804a1.5 1.5 0 002.196 2.196L19.804 6.196a1.5 1.5 0 00-2.196-2.196z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">ISO 9001</span>
                <span className="text-[10px] text-gray-400">Quality Management</span>
              </div>

              {/* CE */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.518a1.5 1.5 0 00-2.196-2.196L5.196 17.804a1.5 1.5 0 002.196 2.196L19.804 6.196a1.5 1.5 0 00-2.196-2.196z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">CE</span>
                <span className="text-[10px] text-gray-400">EN 1090 Certified</span>
              </div>

              {/* IAF */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">IAF</span>
                <span className="text-[10px] text-gray-400">International Accreditation</span>
              </div>

              {/* AWS Welding */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.18l-6.39 6.39a1.5 1.5 0 01-2.12-2.12l6.39-6.39m4.86-3.78l-3.78 3.78m3.78-3.78L18.36 4.64a1.5 1.5 0 012.12 0l.89.89a1.5 1.5 0 010 2.12l-5.57 5.57m-4.86-3.78l3.78-3.78" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">AWS D1.1</span>
                <span className="text-[10px] text-gray-400">Certified Welders</span>
              </div>

              {/* MTC */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">MTC</span>
                <span className="text-[10px] text-gray-400">EN 10204 3.1</span>
              </div>

              {/* Supplier Assessed */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3.75 6.075c-.618 1.115-.247 2.556.825 3.13.507.317.956.793 1.282 1.434M9 12.75c0-1.125.506-2.138 1.307-2.822M9 12.75c0 1.125.506 2.138 1.307 2.822m0 0a5.25 5.25 0 0110.143 0M9 12.75a5.25 5.25 0 0110.143 0" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">Supplier Assessed</span>
                <span className="text-[10px] text-gray-400">3rd Party Verified</span>
              </div>
            </div>

            {/* View All Certificates Link */}
            <div className="text-center mt-6">
              <a href="/certificates" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline font-medium">
                View All Certificates & Documentation →
              </a>
            </div>
          </div>
        </section>

        {/* ===== Calculator CTA ===== */}
        <section className="bg-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-steel mb-4">
              Get a Preliminary Quote in 1 Minute
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Use our free online calculator to estimate your steel building cost.
              No registration required.
            </p>
            <a
              href="/calculator"
              className="inline-block bg-steel text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-900 transition"
            >
              Try Cost Calculator →
            </a>
          </div>
        </section>
        <Stats />
        <Products />
        <Factory />
        <ProductionProcess />
        <Projects />
        {/* ===== Why Choose Laotie — Summary ===== */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-steel mb-4">Why Laotie Steel?</h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Three reasons global buyers choose us over local suppliers
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Save 30-50%</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Factory-direct pricing with no middleman markup. Same quality as local suppliers at half the cost.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delivered in 30 Days</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  5 production lines running 24/7. Typical factory-to-site delivery in 30 working days.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">CE & ISO Certified</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Full engineering package included. Compliant with AS/NZS, BS, EN, and GB standards.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

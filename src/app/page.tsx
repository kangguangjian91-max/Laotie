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
const ClientLogos = dynamic(() => import("@/components/ClientLogos"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));

export const metadata: Metadata = {
  title: "Steel Structure Manufacturer in China | Laotie Steel",
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
        <ClientLogos />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

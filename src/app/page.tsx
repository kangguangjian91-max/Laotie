import Header from "@/components/Header";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
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
  title: "Steel Structure Manufacturer in China — Factory Direct Pricing | Laotie Steel Structure",
  description:
    "Laotie Steel Structure: 15+ years factory direct steel buildings. 5 production lines, 5,000T/month. Portal frames, space frames, floor decks, cladding. CE & ISO certified. Serving 30+ countries. Get quotation within 24 hours.",
  openGraph: {
    title: "Laotie Steel Structure — Trusted Steel Manufacturer in China",
    description:
      "Factory-direct steel buildings, space frames, floor decks, cladding systems. 5 lines, 5,000T/month capacity. CE & ISO certified.",
    images: [{ url: "/images/product-steel-building.webp", width: 800, height: 800 }],
    url: "https://www.laotie-steel.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laotie Steel — Factory Direct Steel Building Manufacturer",
    description: "CE & ISO certified. 15+ years, 30+ countries. Get a quote in 24h.",
    images: ["/images/product-steel-building.webp"],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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

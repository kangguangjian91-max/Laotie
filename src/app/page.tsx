import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Factory from "@/components/Factory";
import ProductionProcess from "@/components/ProductionProcess";
import Projects from "@/components/Projects";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Structure Manufacturer in China — Factory Direct Pricing | Laotie Steel Structure",
  description:
    "Laotie Steel Structure: 15+ years factory direct steel buildings. 5 production lines, 5,000T/month. Portal frames, space frames, floor decks, cladding. CE & ISO certified. Serving 30+ countries. Get quotation within 24 hours.",
  openGraph: {
    title: "Laotie Steel Structure — Trusted Steel Manufacturer in China",
    description:
      "Factory-direct steel buildings, space frames, floor decks, cladding systems. 5 lines, 5,000T/month capacity. CE & ISO certified.",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    url: "https://www.laotie-steel.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laotie Steel Structure — Factory Direct Steel Building Manufacturer",
    description: "CE & ISO certified. 15+ years, 30+ countries. Get a quote in 24h.",
    images: ["/images/og-image.webp"],
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

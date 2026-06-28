import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Image from 'next/image';
import { products } from "@/data/products";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Steel Structure Products | Laotie Steel",
  description: "CE & ISO certified steel structure products: warehouse buildings, factory buildings, workshops, C&Z purlins, sandwich panels, PPGI, floor deck, space frame, cladding system. 50-year design life.",
  openGraph: {
    title: "Steel Structure Products | Laotie Steel",
    description: "Portal frame buildings, floor deck systems, space frames, and enclosure cladding. CE & ISO certified, factory direct pricing.",
    images: [{ url: "https://www.laotie-steel.com/images/product-steel-building.webp", width: 800, height: 800 }],
    url: "https://www.laotie-steel.com/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Products | Laotie Steel",
    description: "Portal frame buildings, floor deck systems, space frames, and enclosure cladding.",
    images: ["https://www.laotie-steel.com/images/product-steel-building.webp"],
  },


    alternates: {

      canonical: "https://www.laotie-steel.com/products",

    },

  };

const productSchemas = products.map((p, i) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.title,
  description: p.description,
  image: `https://www.laotie-steel.com${p.image}`,
  category: "Steel Structure",
  manufacturer: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: p.schemaPriceLow,
    highPrice: p.schemaPriceHigh,
    offerCount: "1",
    availability: "https://schema.org/InStock",
  },
}));

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.laotie-steel.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.laotie-steel.com/products" },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {productSchemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <Header />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl font-bold text-steel mb-4">Our Products</h1>
          <p className="text-gray-500 mb-8 max-w-2xl">CE & ISO certified steel structure products, 5 production lines, 5,000T/month capacity. Factory direct export to 30+ countries.</p>

          {/* Calculator CTA */}
          <div className="mb-12 p-6 bg-blue-50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-steel mb-1">Estimate Your Project Cost</h3>
              <p className="text-sm text-gray-600">Free online calculator — get a preliminary quote in 1 minute.</p>
            </div>
            <a
              href="/calculator"
              className="whitespace-nowrap bg-steel text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
            >
              Try Cost Calculator →
            </a>
          </div>

          <div className="space-y-16">
            {products.map((product, i) => (
              <div key={product.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">{product.subtitle}</p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-600">✓</span> {f.split("—")[0].trim()}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-steel-accent hover:bg-steel rounded-lg transition-colors"
                    >
                      View Details
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-steel border-2 border-steel/20 hover:border-steel-accent rounded-lg transition-all"
                    >
                      Get Quotation
                    </a>
                  </div>
                </div>
                <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 lg:h-80 overflow-hidden relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

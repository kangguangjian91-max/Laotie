import { products as productData } from "@/data/products";
import Image from 'next/image';
import Link from "next/link";

/* Map slugs to the homepage display format */
const products = [
  {
    ...productData[0],
    href: `/products/${productData[0].slug}`,
    desc: "Custom-designed steel factory buildings, warehouses, and workshops.",
  },
  {
    ...productData[1],
    href: `/products/${productData[1].slug}`,
    desc: "High-strength profiled steel deck for concrete composite floors.",
  },
  {
    ...productData[2],
    href: `/products/${productData[2].slug}`,
    desc: "Lightweight space frame systems for stadiums, airports, and halls.",
  },
  {
    ...productData[3],
    href: `/products/${productData[3].slug}`,
    desc: "Insulated sandwich panels and single-skin metal cladding systems.",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
            What We Make
          </p>
          <h2 className="text-3xl font-bold text-steel">Our Products</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Premium steel structures engineered for durability and delivered worldwide
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.title}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-steel-accent/5 transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              {/* Image Container - Fixed 4:3 aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Get Quote button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#FF6B00] text-white text-sm font-bold rounded-xl shadow-lg hover:bg-[#e55a00] transition-colors inline-block"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-steel-accent transition-colors">
                  {product.title}
                </h3>
                <p className="text-steel-accent text-xs font-semibold mb-2">{product.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>
                
                {/* CTA link */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={product.href}
                    aria-label={`Learn more about ${product.title}`}
                    className="text-steel-accent hover:text-[#FF6B00] text-sm font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    Learn more about {product.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at the end of Products module */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-steel text-white text-base font-bold rounded-xl hover:bg-steel-light transition-colors shadow-lg hover:shadow-xl"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

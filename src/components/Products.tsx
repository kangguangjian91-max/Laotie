import { products as productData } from "@/data/products";
import Image from 'next/image';

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
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-steel-accent to-blue-500 shadow-lg">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={product.href}
                    className="px-4 py-2 bg-white/90 backdrop-blur text-steel text-sm font-semibold rounded-lg shadow-lg hover:bg-white transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-steel-accent transition-colors">
                  {product.title}
                </h3>
                <p className="text-steel-accent text-xs font-semibold mb-2">{product.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

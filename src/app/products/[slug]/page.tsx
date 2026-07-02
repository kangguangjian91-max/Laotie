import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { products, getAllProductSlugs, getProductBySlug } from "@/data/products";
import { getAllPosts } from "@/data/blog";
import { ArrowLeft, CheckCircle, Ruler, Shield, Zap, Globe } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description,
    keywords: [
      product.title.toLowerCase(),
      "steel structure",
      "laotie steel",
      "prefab steel building",
      "steel structure manufacturer China",
      "CE certified steel",
    ],
      openGraph: {
      title: `${product.title} — Laotie Steel Structure`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 800 }],
      url: `https://www.laotie-steel.com/products/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — Laotie Steel Structure`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://www.laotie-steel.com/products/${slug}`,
    },
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Portal: <Ruler className="w-5 h-5 text-steel-accent" />,
  Crane: <Ruler className="w-5 h-5 text-steel-accent" />,
  Design: <Globe className="w-5 h-5 text-steel-accent" />,
  Corrosion: <Shield className="w-5 h-5 text-steel-accent" />,
  Fire: <Shield className="w-5 h-5 text-steel-accent" />,
  Bolt: <Zap className="w-5 h-5 text-steel-accent" />,
  Hot: <Shield className="w-5 h-5 text-steel-accent" />,
  default: <CheckCircle className="w-5 h-5 text-green-badge" />,
};

function getFeatureIcon(feature: string): React.ReactNode {
  for (const key of Object.keys(iconMap)) {
    if (feature.includes(key)) return iconMap[key];
  }
  return iconMap.default;
}

const productRelatedBlogs: Record<string, string[]> = {
  "steel-structure-building": [
    "steel-structure-production-china-manufacturing-guide",
    "steel-structure-installation-guide-erection-process",
    "factory-tour-5000-tons-monthly-production",
  ],
  "floor-deck": [
    "steel-structure-cost-guide-2025",
    "how-to-import-steel-structures-from-china",
    "steel-structure-production-china-manufacturing-guide",
  ],
  "space-frame-truss": [
    "portal-frame-vs-space-frame",
    "how-to-import-steel-structures-from-china",
    "factory-tour-5000-tons-monthly-production",
  ],
  "cladding-system": [
    "steel-structure-installation-guide-erection-process",
    "ce-iso-certified-steel-structures",
    "factory-tour-5000-tons-monthly-production",
  ],
  "steel-warehouse": [
    "how-to-build-steel-warehouse-step-by-step",
    "steel-structure-warehouse-design-guide",
    "steel-structure-cost-per-square-meter-2026",
  ],
  "steel-factory-building": [
    "steel-structure-vs-concrete-building-comparison",
    "steel-structure-production-china-manufacturing-guide",
    "steel-structure-installation-guide-erection-process",
  ],
  "steel-workshop": [
    "prefabricated-steel-building-complete-guide",
    "steel-structure-design-guide-beginners",
    "steel-structure-cost-guide-2025",
  ],
  "hot-rolled-steel-coil": [
    "steel-structure-production-china-manufacturing-guide",
    "steel-structure-processing-techniques-cnc-welding-guide",
    "factory-tour-5000-tons-monthly-production",
  ],
  "galvanized-cz-purlin": [
    "steel-structure-warehouse-design-guide",
    "steel-structure-installation-guide-erection-process",
    "prefabricated-steel-building-complete-guide",
  ],
  "prefab-container-house": [
    "steel-structure-vs-concrete-building-comparison",
    "how-to-import-steel-structures-from-china-complete-guide",
    "steel-structure-maintenance-guide-lifespan-corrosion",
  ],
  "ppgi-color-coated-steel": [
    "ce-iso-certified-steel-structures",
    "steel-structure-cost-per-square-meter-2026",
    "steel-structure-installation-guide-erection-process",
  ],
  "frp-skylight-sheet": [
    "steel-structure-warehouse-design-guide",
    "steel-structure-cost-saudi-arabia-2026",
    "steel-structure-installation-process-timeline",
  ],
  "insulated-sandwich-panel": [
    "steel-structure-cold-storage-warehouse-guide",
    "ce-iso-certified-steel-structures",
    "steel-structure-vs-concrete-building-comparison",
  ],
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: `https://www.laotie-steel.com${product.image}`,
    category: "Steel Structure",
    manufacturer: {
      "@type": "Organization",
      name: "Laotie Steel Structure Co., Ltd.",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: product.schemaPriceLow,
      highPrice: product.schemaPriceHigh,
      offerCount: "1",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "1",
      bestRating: "5",
    },
    review: {
      "@type": "Review",
      author: { "@type": "Person", name: "Hongxin Sports Equipment" },
      reviewBody: "Fast delivery, excellent quality, customized solutions delivered on time.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      datePublished: "2026-06-01",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.laotie-steel.com/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.laotie-steel.com/products" },
      { "@type": "ListItem", position: 3, name: product.title, item: `https://www.laotie-steel.com/products/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <Header />
      <main className="bg-white">
        {/* Hero Banner */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/90 to-steel/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <a
              href="/products"
              className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All Products
            </a>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: product.title, href: `/products/${slug}` },
              ]}
            />
            {product.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-steel-accent mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-steel-accent font-semibold mb-4">{product.subtitle}</p>
            <p className="text-gray-300 max-w-2xl text-lg">{product.description}</p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-steel mb-6">Product Overview</h2>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                  {product.overview.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Specifications Table */}
                <h2 id="specifications" className="text-2xl font-bold text-steel mt-12 mb-6">Technical Specifications</h2>
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={spec.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-6 py-3.5 text-sm font-semibold text-steel w-1/3 border-r border-gray-100">
                            {spec.label}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-600">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Features */}
                <h2 className="text-2xl font-bold text-steel mt-12 mb-6">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <span className="mt-0.5 shrink-0">{getFeatureIcon(feature)}</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Applications */}
                <h2 className="text-2xl font-bold text-steel mt-12 mb-6">Applications</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.applications.map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-2 px-4 py-3 bg-steel-muted rounded-lg text-sm text-steel font-medium"
                    >
                      <CheckCircle className="w-4 h-4 text-green-badge shrink-0" />
                      {app}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Product Image Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-steel to-steel-light rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">Interested in this product?</h3>
                    <p className="text-gray-300 text-sm mb-5">
                      Get a free quotation within 24 hours. We ship to 30+ countries worldwide.
                    </p>
                    <a
                      href="/contact"
                      className="block text-center w-full px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg"
                    >
                      Request a Quote
                    </a>
                  </div>

                  {/* Quick Specs */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-sm font-bold text-steel uppercase tracking-wider mb-4">
                      Quick Specs
                    </h3>
                    <ul className="space-y-3">
                      {product.specifications.slice(0, 5).map((spec) => (
                        <li key={spec.label} className="flex justify-between text-sm">
                          <span className="text-gray-500">{spec.label}</span>
                          <span className="text-steel font-medium text-right ml-4 max-w-[180px] truncate">
                            {spec.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#specifications"
                      className="inline-block mt-4 text-xs text-steel-accent hover:text-steel font-semibold"
                    >
                      View full specs ↓
                    </a>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <Shield className="w-4 h-4" />, label: "CE & ISO Certified" },
                      { icon: <Globe className="w-4 h-4" />, label: "30+ Countries" },
                      { icon: <Zap className="w-4 h-4" />, label: "5,000T/Month" },
                      { icon: <Ruler className="w-4 h-4" />, label: "Custom Design" },
                    ].map((badge) => (
                      <div
                        key={badge.label}
                        className="flex flex-col items-center gap-1 p-3 bg-steel-muted rounded-xl text-center"
                      >
                        <span className="text-steel-accent">{badge.icon}</span>
                        <span className="text-xs text-steel font-medium">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-steel mb-8 text-center">Related Products</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {products
                .filter((p) => p.slug !== slug)
                .map((relatedProduct) => (
                  <a
                    key={relatedProduct.slug}
                    href={`/products/${relatedProduct.slug}`}
                    className="group bg-gray-50 rounded-xl border border-gray-100 hover:border-steel-accent hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-steel group-hover:text-steel-accent transition-colors text-sm">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{relatedProduct.subtitle}</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {product.faq && product.faq.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-steel mb-2 text-center">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-sm text-center mb-8">Common questions about {product.title.toLowerCase()}</p>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: product.faq.map((f) => ({
                      "@type": "Question",
                      name: f.question,
                      acceptedAnswer: { "@type": "Answer", text: f.answer },
                    })),
                  }),
                }}
              />
              <div className="space-y-4">
                {product.faq.map((f, i) => (
                  <details key={i} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Blog Posts */}
        {(() => {
          const relatedSlugs = productRelatedBlogs[slug] || [];
          const allBlogPosts = getAllPosts();
          const relatedPosts = relatedSlugs
            .map((s) => (allBlogPosts as Array<{ slug: string; title: string; description: string; image: string; readTime: string; date: string; category: string }>).find((bp) => bp.slug === s))
            .filter((p): p is NonNullable<typeof p> => p != null);
          if (relatedPosts.length === 0) return null;
          return (
            <section className="py-16 bg-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-steel mb-2 text-center">Related Articles</h2>
                <p className="text-gray-500 text-sm text-center mb-8">
                  Learn more about {product.title.toLowerCase()} applications
                </p>
                <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {relatedPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl border border-gray-100 hover:border-steel-accent hover:shadow-md transition-all p-5"
                    >
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-steel-muted text-steel mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-semibold text-steel group-hover:text-steel-accent transition-colors text-sm leading-snug mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{post.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="/blog" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline">
                    View all articles →
                  </a>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Bottom CTA */}
        <section className="py-16 bg-section">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-steel mb-3">Ready to Start Your Project?</h2>
            <p className="text-gray-500 mb-8">
              Send us your project requirements and drawings. Our engineering team will provide a
              detailed quotation with structural calculations within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Quotation
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-steel border-2 border-steel/20 hover:border-steel-accent rounded-lg transition-all"
              >
                View All Products
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

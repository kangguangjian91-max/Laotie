import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/data/blog";
import { ArrowLeft, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Blog | Steel Structure Insights & Guides",
  description: "Expert articles on steel structure design, cost, importing from China, certifications, and factory production. Stay informed with OldTie Steel Structure.",
  openGraph: {
    title: "Steel Structure Blog | Expert Guides & Industry Insights",
    description: "Expert articles on steel structure design, cost, importing from China, certifications, and factory production.",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    url: "https://www.oldtie-steel.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Blog | Expert Guides & Industry Insights",
    description: "Expert articles on steel structure design, cost, importing from China, certifications, and factory production.",
    images: ["/images/og-image.webp"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl font-bold text-steel mb-2">Steel Structure Insights</h1>
          <p className="text-gray-500 mb-12">
            Expert guides, technical comparisons, and industry insights for steel structure buyers and builders.
          </p>

          <div className="space-y-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group p-6 rounded-xl border border-gray-100 hover:border-steel-accent/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-steel-accent/10 text-steel text-xs font-medium">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-steel mb-2 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.description}</p>
                <div className="mt-4">
                  <span className="text-steel-accent text-sm font-medium group-hover:underline">
                    Read Article →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

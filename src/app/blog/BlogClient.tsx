"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/data/blog";
import { ArrowLeft, Clock, Tag, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const posts = useMemo(() => getAllPosts(), []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count }));
  }, [posts]);

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    router.replace(`/blog${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
    setIsMobileOpen(false);
  };

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-steel mb-2">
              Steel Structure Insights
            </h1>
            <p className="text-gray-500">
              {activeCategory
                ? `Browsing: ${activeCategory} (${filteredPosts.length} articles)`
                : `${posts.length} expert guides, comparisons, and insights for steel structure buyers.`}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar — Desktop */}
            <aside className="hidden lg:block w-56 shrink-0">
              <nav className="sticky top-24 space-y-1">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!activeCategory
                      ? "bg-steel text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  All Posts
                  <span className="ml-2 text-xs opacity-60">
                    {posts.length}
                  </span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat.name
                        ? "bg-steel text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {cat.name}
                    <span className="ml-2 text-xs opacity-60">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Mobile category selector */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700"
              >
                <span>{activeCategory || "All Categories"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMobileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {isMobileOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg p-2 space-y-1 shadow-lg">
                  <button
                    onClick={() => setCategory("")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${!activeCategory
                        ? "bg-steel text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    All Categories ({posts.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${activeCategory === cat.name
                          ? "bg-steel text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Post list */}
            <div className="flex-1 space-y-6">
              {filteredPosts.length === 0 ? (
                <p className="text-gray-400 text-center py-12">
                  No articles in this category yet.
                </p>
              ) : (
                filteredPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group rounded-xl border border-gray-100 hover:border-steel-accent/30 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            setCategory(post.category);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-steel-accent/10 text-steel text-xs font-medium hover:bg-steel-accent/20 cursor-pointer transition-colors"
                        >
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
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {post.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-steel-accent text-sm font-medium group-hover:underline">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BlogClient() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  );
}

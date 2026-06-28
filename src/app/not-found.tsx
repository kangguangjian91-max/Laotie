import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Laotie Steel Structure",
  description: "The page you are looking for could not be found. Browse our steel structure products or contact our team for assistance.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-[8rem] sm:text-[10rem] font-extrabold leading-none tracking-tight text-steel/5 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl">
                <span className="text-5xl">🏗️</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-steel mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            The link may be broken, or the page may have been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white bg-steel hover:bg-steel/90 rounded-lg transition-all shadow-sm"
            >
              ← Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-steel border border-steel/20 hover:bg-steel/5 rounded-lg transition-all"
            >
              View Products
            </Link>
          </div>

          {/* Help */}
          <p className="mt-10 text-sm text-gray-400">
            Need help?{' '}
            <Link href="/contact" className="text-steel-accent underline hover:text-steel-accent/80">
              Contact our team
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

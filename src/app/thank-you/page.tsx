import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Thank You | Laotie Steel Structure",
  description:
    "Thank you for contacting Laotie Steel Structure. We have received your inquiry and will respond within 2 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-steel mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Your inquiry has been received.
          </p>
          <p className="text-gray-500 mb-8">
            Our team typically responds within <strong className="text-steel">2 hours</strong> during business days.
            If you need urgent assistance, feel free to contact us via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/8616650735555?text=Hi%20Laotie%2C%20I%20just%20submitted%20an%20inquiry%20via%20the%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-steel border-2 border-steel/20 hover:border-steel-accent rounded-lg transition-colors"
            >
              Back to Home
            </a>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
            <a href="/products" className="p-4 rounded-xl border border-gray-200 hover:border-steel-accent hover:bg-steel-muted/30 transition-all text-left">
              <div className="font-semibold text-steel mb-1">Browse Products</div>
              <div className="text-gray-500 text-xs">See our full range of steel structures</div>
            </a>
            <a href="/projects" className="p-4 rounded-xl border border-gray-200 hover:border-steel-accent hover:bg-steel-muted/30 transition-all text-left">
              <div className="font-semibold text-steel mb-1">View Projects</div>
              <div className="text-gray-500 text-xs">See completed projects worldwide</div>
            </a>
            <a href="/blog" className="p-4 rounded-xl border border-gray-200 hover:border-steel-accent hover:bg-steel-muted/30 transition-all text-left">
              <div className="font-semibold text-steel mb-1">Read Our Blog</div>
              <div className="text-gray-500 text-xs">Steel structure guides & insights</div>
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 text-sm text-gray-400">
            <p>Reference: Inquiry #{new Date().getFullYear()}{String(Date.now()).slice(-6)}</p>
            <p className="mt-1">Laotie Steel Structure Co., Ltd.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

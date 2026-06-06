import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | OldTie Steel Structure",
  description:
    "Contact OldTie Steel Structure for steel building quotations, technical support, and factory visits. WhatsApp: +86 166-5073-5555. Email: kangguangjian91@gmail.com. Respond within 2 hours.",
  openGraph: {
    title: "Contact OldTie Steel Structure | Get a Free Quote",
    description:
      "Reach out for steel structure quotations, technical support, or factory visits. We respond within 2 hours.",
    url: "https://www.oldtie-steel.com/contact",
    siteName: "OldTie Steel Structure",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact OldTie Steel Structure | Get a Free Quote",
    description: "Steel structure quotations, technical support, factory visits. Respond within 2 hours.",
    images: ["/images/og-image.webp"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl font-bold text-steel mb-4">Contact Us</h1>
          <p className="text-gray-500 mb-12 max-w-2xl">Reach out to us for quotations, technical support, or factory visits. We respond within 2 hours.</p>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <form
                action="https://formsubmit.co/kangguangjian91@gmail.com"
                method="POST"
                className="space-y-4"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Inquiry — OldTie Steel Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://www.oldtie-steel.com/thank-you" />
                <input type="hidden" name="_template" value="table" />
                {/* Honeypot spam protection */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-steel-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email / WhatsApp *</label>
                    <input
                      type="text"
                      name="contact"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-steel-accent text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                  <select
                    name="project_type"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-steel-accent text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="portal-frame">Portal Frame Building</option>
                    <option value="floor-deck">Floor Deck / Composite</option>
                    <option value="space-frame">Space Frame / Truss</option>
                    <option value="cladding">Enclosure / Cladding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Building type, dimensions (L×W×H), location, quantity, load requirements..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-steel-accent text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 text-base font-semibold text-white bg-cta hover:bg-cta-hover rounded-lg transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <a
                  href="https://wa.me/8616650735555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-accent hover:underline"
                >
                  +86 166-5073-5555
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <a href="mailto:kangguangjian91@gmail.com" className="text-steel-accent hover:underline">
                  kangguangjian91@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">🛒 Alibaba Store</h3>
                <a href="https://hnltgjg.en.alibaba.com/" target="_blank" rel="noopener noreferrer" className="text-steel-accent hover:underline">
                  View Products & Order Online
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Factory Address</h3>
                <p className="text-sm text-gray-600">Shangqiu City, Henan Province, China</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office (Shenzhen)</h3>
                <p className="text-sm text-gray-600">Shenzhen, Guangdong, China</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                <p className="text-sm text-gray-900">Mon – Sat: 8:00 – 18:00 CST</p>
                <p className="text-xs text-gray-400">UTC+8 Beijing Time</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

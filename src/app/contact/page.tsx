import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Steel Structure Manufacturer | Laotie Steel",
  description:
    "Contact Laotie Steel for steel structure design, fabrication, and installation. WhatsApp: +86 166 5073 5555. Get a free quote within 24 hours.",
  openGraph: {
    title: "Contact Laotie Steel | Get a Free Quote",
    description:
      "Reach out for steel structure quotations, technical support, or factory visits. We respond within 2 hours.",
    url: "https://www.laotie-steel.com/contact",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Laotie Steel | Get a Free Quote",
    description: "Steel structure quotations, technical support, factory visits. Respond within 2 hours.",
    images: ["/images/og-image.webp"],
  },


    alternates: {

      canonical: "https://www.laotie-steel.com/contact",

    },

  };

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    name: "Laotie Steel Structure Co., Ltd.",
    description:
      "CE & ISO certified steel structure manufacturer in China. 5 production lines, 5,000T/month capacity. Portal frames, floor deck, space frames, cladding.",
    url: "https://www.laotie-steel.com",
    telephone: "+86-166-5073-5555",
    email: "mailto:kangguangjian91@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shangqiu City, Henan Province",
      addressLocality: "Shangqiu",
      addressRegion: "Henan",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.44",
      longitude: "115.63",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    areaServed: "Worldwide",
    knowsAbout: ["Steel Structure", "Portal Frame", "Floor Deck", "Space Frame", "Industrial Building"],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Header />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl font-bold text-steel mb-4">Contact Us</h1>
          <p className="text-gray-500 mb-6 max-w-2xl">Reach out to us for quotations, technical support, or factory visits. We respond within 2 hours.</p>

          <div className="flex flex-wrap gap-2 mb-12">
            <a href="/products" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline">← Browse Products</a>
            <span className="text-gray-300">|</span>
            <a href="/faq" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline">Check FAQ</a>
            <span className="text-gray-300">|</span>
            <a href="/projects" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline">View Projects</a>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <form
                action="https://formsubmit.co/kangguangjian91@gmail.com"
                method="POST"
                className="space-y-4"
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Inquiry — Laotie Steel Website" />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
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

              {/* Google Maps Embed - Factory Location */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Factory Location</h3>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src="https://maps.google.com/maps?q=河南省商丘市睢阳区兴业大道&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="劳铁钢结构工厂位置 - 河南省商丘市睢阳区兴业大道"
                    className="w-full"
                  ></iframe>
                </div>
                
                {/* Baidu Maps Link for Chinese users */}
                <div className="mt-3 text-center">
                  <a
                    href="https://map.baidu.com/search/河南省商丘市睢阳区兴业大道"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-steel-accent hover:text-steel transition-colors"
                  >
                    📍 在百度地图中查看工厂位置 →
                  </a>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">📍 河南省商丘市睢阳区兴业大道</p>
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

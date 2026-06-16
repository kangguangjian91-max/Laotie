import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Laotie Steel Structure website and products. Covers website use, product information, quotations, intellectual property, and governing law in China.",
  openGraph: {
    title: "Terms of Service | Laotie Steel Structure",
    description:
      "Terms of Service covering website use, product info, quotations, and intellectual property. Governed by laws of China.",
    url: "https://www.laotie-steel.com/terms",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Laotie Steel Structure",
    description: "Terms covering website use, product info, quotations, and intellectual property.",
    images: ["/images/og-image.webp"],
  },


    alternates: {

      canonical: "https://www.laotie-steel.com/terms",

    },

  };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl font-bold text-steel mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: June 1, 2026</p>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-steel">1. Website Use</h2>
              <p>By accessing this website, you agree to these Terms of Service. All content on this site — including text, images, and product specifications — is the property of Laotie Steel Structure Co., Ltd. and may not be reproduced without written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">2. Product Information</h2>
              <p>All product specifications, dimensions, and load data are for reference only. Final specifications are subject to confirmation via signed contract and engineering drawings. We reserve the right to modify product specifications without prior notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">3. Quotations & Pricing</h2>
              <p>All quotations are valid for 30 days from the date of issue. Prices are EXW / FOB / CIF as agreed per order. Steel prices fluctuate; final pricing is confirmed at time of order.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">4. Intellectual Property</h2>
              <p>All engineering drawings, calculations, and custom designs prepared by Laotie Steel Structure are our intellectual property. Unauthorized use, reproduction, or transfer to third parties is prohibited.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">5. Limitation of Liability</h2>
              <p>Laotie Steel Structure shall not be liable for indirect, incidental, or consequential damages arising from the use of our products. Our total liability for any claim shall not exceed the amount paid for the specific order.</p>
              <p className="mt-2">Our products are designed and manufactured in accordance with Chinese Steel Structure Design Code (GB 50017) and applicable international standards as agreed. We are not responsible for installation errors made by third-party contractors.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">6. Governing Law & Dispute Resolution</h2>
              <p>These terms are governed by the laws of the People's Republic of China. Any dispute arising from these terms or related transactions shall be submitted to the competent court in Shangqiu City, Henan Province, China.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">7. Contact</h2>
              <p>For questions about these Terms, contact us at:</p>
              <p>
                Laotie Steel Structure Co., Ltd.<br/>
                Shangqiu, Henan, China<br/>
                WhatsApp: <a href="https://wa.me/8616650735555" className="text-steel-accent">+86 166-5073-5555</a><br/>
                Email: <a href="mailto:kangguangjian91@gmail.com" className="text-steel-accent">kangguangjian91@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

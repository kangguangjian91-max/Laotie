import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OldTie Steel Structure",
  description:
    "Privacy Policy for OldTie Steel Structure website. Learn how we collect, use, and protect your personal data (GDPR & CCPA compliant). Contact: kangguangjian91@gmail.com.",
  openGraph: {
    title: "Privacy Policy | OldTie Steel Structure",
    description:
      "How OldTie Steel Structure collects, uses, and protects your personal data. GDPR & CCPA compliant.",
    url: "https://www.oldtie-steel.com/privacy",
    siteName: "OldTie Steel Structure",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | OldTie Steel Structure",
    description: "How we collect, use, and protect your personal data. GDPR & CCPA compliant.",
    images: ["/images/og-image.webp"],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-steel mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: June 1, 2026</p>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-steel">1. Information We Collect</h2>
              <p>When you use our contact form, we collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name (required)</li>
                <li>Email address or WhatsApp number (required)</li>
                <li>Project description (optional)</li>
              </ul>
              <p className="mt-2">We also collect anonymized usage data via Google Analytics to improve our website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To respond to your inquiry within 2 business hours</li>
                <li>To prepare project quotations and technical proposals</li>
                <li>To improve our website and product offerings</li>
              </ul>
              <p className="mt-2">We never sell or share your personal data with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">3. Data Storage & Security</h2>
              <p>Your data is stored securely on our business servers. Inquiry form submissions are transmitted via encrypted HTTPS connection. Email communications are stored in our business email system with access restricted to authorized staff only.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">4. Cookies & Tracking</h2>
              <p>We use:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Google Analytics:</strong> anonymized traffic analysis, 14-month retention</li>
              </ul>
              <p className="mt-2">You can disable cookies via your browser settings. This may affect website functionality.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">5. Your Rights (GDPR / CCPA)</h2>
              <p>Under GDPR (EU) and CCPA (California), you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-2">To exercise these rights, contact us at: <a href="mailto:kangguangjian91@gmail.com" className="text-steel-accent">kangguangjian91@gmail.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-steel">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact:</p>
              <p>
                OldTie Steel Structure Co., Ltd.<br/>
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

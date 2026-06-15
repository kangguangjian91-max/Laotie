import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Globe, Cookie, Mail, MessageCircle, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Laotie Steel Structure",
  description:
    "Privacy Policy for Laotie Steel Structure website. Learn how we collect, use, and protect your personal data (GDPR & CCPA compliant). Contact: kangguangjian91@gmail.com.",
  openGraph: {
    title: "Privacy Policy | Laotie Steel Structure",
    description:
      "How Laotie Steel Structure collects, uses, and protects your personal data. GDPR & CCPA compliant.",
    url: "https://https://laotie-steel.com/privacy",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Laotie Steel Structure",
    description: "How we collect, use, and protect your personal data. GDPR & CCPA compliant.",
    images: ["/images/og-image.webp"],
  },
};

const sections = [
  { id: "collect", icon: Eye, title: "Information We Collect" },
  { id: "use", icon: FileText, title: "How We Use Your Information" },
  { id: "cookies", icon: Cookie, title: "Cookies & Tracking" },
  { id: "storage", icon: Lock, title: "Data Storage & Security" },
  { id: "third-party", icon: Globe, title: "Third-Party Services" },
  { id: "transfer", icon: Globe, title: "International Data Transfer" },
  { id: "rights", icon: Shield, title: "Your Rights (GDPR / CCPA)" },
  { id: "retention", icon: Clock, title: "Data Retention" },
  { id: "changes", icon: FileText, title: "Policy Changes" },
];

import { Clock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-steel to-steel-light text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline mb-4">
              <span>←</span> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-300 max-w-2xl">
              We are committed to protecting your personal data. This policy explains how we collect, use, store, and
              safeguard your information. Last updated: June 6, 2026.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-steel-accent" />
                  <h3 className="font-semibold text-gray-900">Contents</h3>
                </div>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-steel rounded-lg transition-colors"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-gray-600 space-y-12">
              {/* 1. Collect */}
              <section id="collect">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Eye className="w-5 h-5 text-steel-accent" />
                  1. Information We Collect
                </h2>
                <p>We collect information that you voluntarily provide when using our website, primarily through our contact form and WhatsApp integration.</p>

                <h3 className="text-base font-semibold text-gray-800 mt-4">1.1 Contact Form Data</h3>
                <p>When you submit a quote request or inquiry via our contact form, we collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Full Name</strong> — required for personalized communication</li>
                  <li><strong>Email Address</strong> — for sending quotations and project updates</li>
                  <li><strong>Phone / WhatsApp Number</strong> — for direct communication</li>
                  <li><strong>Company Name</strong> — for B2B client identification</li>
                  <li><strong>Project Description</strong> — technical requirements, dimensions, quantity</li>
                  <li><strong>Delivery Country</strong> — for shipping and compliance purposes</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mt-4">1.2 WhatsApp Data</h3>
                <p>When you contact us via WhatsApp (through the floating chat button), we may receive:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your WhatsApp phone number</li>
                  <li>Message content and timestamps</li>
                  <li>Media files (images, drawings, documents) you share</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mt-4">1.3 Automatically Collected Data</h3>
                <p>We collect anonymized technical data through cookies and analytics tools:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address (anonymized)</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referrer URL (how you found our website)</li>
                  <li>Device type (desktop/mobile/tablet)</li>
                </ul>
              </section>

              {/* 2. Use */}
              <section id="use">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <FileText className="w-5 h-5 text-steel-accent" />
                  2. How We Use Your Information
                </h2>
                <p>We use your data strictly for legitimate business purposes:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Business Communication</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                      <li>Respond to inquiries within 2 business hours</li>
                      <li>Prepare and send project quotations</li>
                      <li>Provide technical consultation and drawings</li>
                      <li>Coordinate production and shipping updates</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Service Improvement</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                      <li>Analyze website traffic patterns</li>
                      <li>Improve product information and UX</li>
                      <li>Detect and fix technical issues</li>
                      <li>Optimize marketing effectiveness</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 bg-blue-50 border-l-4 border-steel-accent pl-4 py-2 text-sm text-blue-800 rounded-r-lg">
                  <strong>We never sell, rent, or share your personal data with third parties for marketing purposes.</strong>
                </p>
              </section>

              {/* 3. Cookies */}
              <section id="cookies">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-steel-accent" />
                  3. Cookies & Tracking Technologies
                </h2>
                <p>Our website uses the following types of cookies:</p>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Category</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Purpose</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-800">Essential</td>
                        <td className="px-4 py-3 text-gray-600">Website functionality (cookie consent)</td>
                        <td className="px-4 py-3 text-gray-600">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-800">Analytics</td>
                        <td className="px-4 py-3 text-gray-600">Google Analytics (anonymized traffic data)</td>
                        <td className="px-4 py-3 text-gray-600">14 months</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-800">Performance</td>
                        <td className="px-4 py-3 text-gray-600">Page load optimization</td>
                        <td className="px-4 py-3 text-gray-600">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect website functionality.</p>
              </section>

              {/* 4. Storage */}
              <section id="storage">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Lock className="w-5 h-5 text-steel-accent" />
                  4. Data Storage & Security
                </h2>
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers is protected using TLS 1.3 (HTTPS) encryption.</li>
                  <li><strong>Secure Storage:</strong> Contact form data is processed through FormSubmit.co and stored in our encrypted business email system (Google Workspace Enterprise).</li>
                  <li><strong>Access Control:</strong> Personal data is accessible only to authorized staff members (General Manager, Sales Director, and Project Engineers) who are bound by confidentiality agreements.</li>
                  <li><strong>Physical Security:</strong> Our offices have controlled access and surveillance systems.</li>
                </ul>
              </section>

              {/* 5. Third-Party */}
              <section id="third-party">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Globe className="w-5 h-5 text-steel-accent" />
                  5. Third-Party Services
                </h2>
                <p>We use the following third-party services to operate our website and process inquiries:</p>
                <div className="space-y-3 mt-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 text-sm">FormSubmit.co</h4>
                    <p className="text-sm text-gray-600 mt-1">Processes contact form submissions and forwards them to our email. Data is not stored permanently by FormSubmit.co.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 text-sm">Google Workspace (Email)</h4>
                    <p className="text-sm text-gray-600 mt-1">Hosts our business email (@laotiesteel.com). Subject to Google’s privacy policy and data processing terms.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 text-sm">WhatsApp Business API</h4>
                    <p className="text-sm text-gray-600 mt-1">Used for instant messaging. WhatsApp processes messages per Meta’s Privacy Policy.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 text-sm">Google Analytics 4</h4>
                    <p className="text-sm text-gray-600 mt-1">Collects anonymized website usage statistics. No personal identifiers are passed to Google Analytics.</p>
                  </div>
                </div>
              </section>

              {/* 6. Transfer */}
              <section id="transfer">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Globe className="w-5 h-5 text-steel-accent" />
                  6. International Data Transfer
                </h2>
                <p>Laotie Steel Structure is headquartered in China. Our data processing infrastructure spans multiple countries:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Contact form data is processed by FormSubmit.co (US-based) and forwarded to our Google Workspace account.</li>
                  <li>WhatsApp messages are processed by Meta Platforms, Inc. (US-based).</li>
                  <li>Website analytics data is processed by Google LLC (US-based).</li>
                </ul>
                <p className="mt-2">These transfers are safeguarded by the EU Standard Contractual Clauses (SCCs) and equivalent legal mechanisms to ensure adequate data protection.</p>
              </section>

              {/* 7. Rights */}
              <section id="rights">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Shield className="w-5 h-5 text-steel-accent" />
                  7. Your Rights (GDPR / CCPA / PIPL)
                </h2>
                <p>Depending on your location, you have the following rights regarding your personal data:</p>

                <h3 className="text-base font-semibold text-gray-800 mt-4">7.1 GDPR Rights (EU/EEA)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Right to Access:</strong> Request a copy of all personal data we hold about you.</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data.</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
                  <li><strong>Right to Restrict Processing:</strong> Limit how we use your data in certain circumstances.</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                  <li><strong>Right to Object:</strong> Object to data processing based on legitimate interests or direct marketing.</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw cookie consent at any time via the cookie banner.</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mt-4">7.2 CCPA Rights (California)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Right to Know:</strong> Request disclosure of categories and specific pieces of personal information collected.</li>
                  <li><strong>Right to Delete:</strong> Request deletion of personal information.</li>
                  <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell data).</li>
                  <li><strong>Right to Non-Discrimination:</strong> You will not receive different pricing or service for exercising your rights.</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mt-4">7.3 PIPL Rights (China)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Right to Access and Copy:</strong> Request access to your personal information.</li>
                  <li><strong>Right to Correction:</strong> Request correction of inaccurate personal information.</li>
                  <li><strong>Right to Deletion:</strong> Request deletion when processing violates law or agreement.</li>
                </ul>
              </section>

              {/* 8. Retention */}
              <section id="retention">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <Clock className="w-5 h-5 text-steel-accent" />
                  8. Data Retention
                </h2>
                <p>We retain your personal data only for as long as necessary:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Active Clients:</strong> During the project lifecycle and for 5 years after project completion (for warranty and after-sales support).</li>
                  <li><strong>Prospective Clients:</strong> For 2 years after last contact, unless you request deletion earlier.</li>
                  <li><strong>Analytics Data:</strong> Anonymized Google Analytics data is retained for 14 months.</li>
                  <li><strong>Legal Requirements:</strong> We may retain data longer if required by tax, accounting, or export control laws.</li>
                </ul>
              </section>

              {/* 9. Changes */}
              <section id="changes">
                <h2 className="text-xl font-bold text-steel flex items-center gap-2">
                  <FileText className="w-5 h-5 text-steel-accent" />
                  9. Changes to This Policy
                </h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations. We will notify you of material changes by:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Posting a notice on our website homepage</li>
                  <li>Sending an email to active clients (if we have your email)</li>
                  <li>Updating the "Last Updated" date at the top of this page</li>
                </ul>
                <p className="mt-2">We encourage you to review this policy periodically.</p>
              </section>

              {/* Contact */}
              <section id="contact" className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-steel mb-4">Contact Our Data Protection Officer</h2>
                <p className="mb-4">If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="mailto:kangguangjian91@gmail.com"
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-steel-accent transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-steel-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Email</div>
                      <div className="text-sm text-gray-500">kangguangjian91@gmail.com</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/8616650735555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-500 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">WhatsApp</div>
                      <div className="text-sm text-gray-500">+86 166-5073-5555</div>
                    </div>
                  </a>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <strong>Laotie Steel Structure Co., Ltd.</strong><br />
                  No. 37, Shed 5, Zijin Logistics Park Yanji Industrial Zone,<br />
                  Suiyang District, Shangqiu City, Henan Province, China
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

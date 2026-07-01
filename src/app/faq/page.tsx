import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { HelpCircle, Truck, Shield, DollarSign, Package, Wrench, FileText, Clock } from "lucide-react";
import type { Metadata } from "next";

const faqs = [
  {
    category: "Ordering & Quotation",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    questions: [
      {
        q: "How do I request a quotation?",
        a: "You can request a quotation by filling out the contact form on our website, emailing us at kangguangjian91@gmail.com, or clicking the WhatsApp button to chat with our sales team directly. Please provide your building dimensions, intended use, and any specific requirements. We typically respond within 2 hours during business days.",
      },
      {
        q: "What information do you need for an accurate quote?",
        a: "For the most accurate quotation, please provide: (1) Building dimensions (length × width × height), (2) Local wind/snow load requirements, (3) Intended use (warehouse, workshop, poultry house, etc.), (4) Crane requirements (if any), (5) Any specific material preferences. If you have drawings, you can attach them directly in the contact form or send via WhatsApp.",
      },
      {
        q: "Is there a minimum order quantity?",
        a: "We have no strict minimum order quantity. However, for small orders (under 20 tons), sea freight consolidation may be required, which can affect delivery time. Our sales team will advise the most cost-effective solution for your project size.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    icon: DollarSign,
    color: "from-green-500 to-green-600",
    questions: [
      {
        q: "What are your payment terms?",
        a: "Our standard payment terms are: 30% down payment after contract signing, 70% balance before shipment. We accept T/T (bank transfer), L/C at sight, and Western Union for smaller amounts. For long-term partners, we can discuss flexible payment arrangements.",
      },
      {
        q: "Do prices include installation?",
        a: "Our quoted prices typically cover EXW (ex-works factory price) or FOB (free on board). Installation is not included in the base price, but we provide: (1) Detailed installation drawings, (2) Remote video guidance, (3) On-site engineer dispatch (at additional cost). Most of our clients successfully install the structures themselves with our remote support.",
      },
      {
        q: "Are there any hidden costs?",
        a: "No. Our quotations are transparent and itemized. The only additional costs you may incur are: (1) Local taxes and customs duties (varies by country), (2) Local transportation from port to site, (3) Installation labor (if you hire locally). We provide a comprehensive cost breakdown so you can budget accurately.",
      },
    ],
  },
  {
    category: "Production & Delivery",
    icon: Truck,
    color: "from-orange-500 to-orange-600",
    questions: [
      {
        q: "How long does production take?",
        a: "Standard production time is 20-30 days after receipt of down payment and final drawing confirmation. Large or complex projects may take 30-45 days. We will provide a detailed production schedule upon order confirmation. Expedited production is available for urgent projects — please consult our sales team.",
      },
      {
        q: "What are the shipping options and timelines?",
        a: "We ship worldwide via 20ft and 40ft containers. Typical shipping times: Southeast Asia (7-15 days), Africa (20-35 days), Middle East (15-25 days), Australia/New Zealand (18-30 days), Europe (25-40 days). We handle all export documentation (Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin).",
      },
      {
        q: "How is the steel packaged for shipping?",
        a: "All steel components are: (1) Properly labeled with installation marks, (2) Bundled and secured on steel pallets, (3) Protected with waterproof wrapping and desiccant to prevent rust during transit. Glass wool and sandwich panels are packed in separate protected bundles.",
      },
    ],
  },
  {
    category: "Quality & Certification",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        q: "What certifications do your products have?",
        a: "Our factory is ISO 9001 certified, and our products are CE certified for European markets. We also hold IAF certification and have passed Supplier Assessment. Mill test certificates (MTC) are provided for all raw steel materials. Third-party inspection (SGS, BV, TUV) is available upon request at buyer's cost.",
      },
      {
        q: "What is your warranty policy?",
        a: "We provide a 10-year limited warranty on the main steel structure against manufacturing defects and abnormal rusting under normal conditions. The cladding system (color steel sheet) carries a 5-year warranty against significant fading and corrosion. Detailed warranty terms are provided in our contract.",
      },
      {
        q: "Can I request a factory visit or video call?",
        a: "Absolutely! We welcome client visits to our Shangqiu factory. If you cannot travel to China, we can arrange a live video call to show you the production line, quality control processes, and completed projects in our warehouse. Many of our long-term clients have visited us in person.",
      },
    ],
  },
  {
    category: "Installation & Support",
    icon: Wrench,
    color: "from-cyan-500 to-cyan-600",
    questions: [
      {
        q: "Do you provide installation guidance?",
        a: "Yes! We provide comprehensive installation support: (1) Detailed step-by-step installation drawings in English, (2) Structural calculations and foundation drawings, (3) Remote video guidance via WhatsApp/WeChat/Skype, (4) 24/7 technical support during installation. For large projects, we can dispatch an engineer to site (travel and accommodation at buyer's cost).",
      },
      {
        q: "What foundation is required?",
        a: "Foundation requirements depend on building size and local soil conditions. We provide foundation design drawings based on your local building codes and soil bearing capacity. Typically, reinforced concrete strip foundations or independent foundations are used. We recommend consulting a local structural engineer to review our foundation design.",
      },
      {
        q: "How many people are needed for installation?",
        a: "For a typical warehouse (1,000-2,000 m²), a team of 4-6 skilled workers can complete the installation in 10-20 days, depending on experience and weather conditions. We provide a detailed installation manual and can review your installation plan beforehand.",
      },
    ],
  },
  {
    category: "Customization & Design",
    icon: Package,
    color: "from-red-500 to-red-600",
    questions: [
      {
        q: "Can you customize the design for my local weather conditions?",
        a: "Yes, we design every project according to your local wind load, snow load, and seismic requirements. Please provide your local building code requirements or the design parameters, and our engineering team will ensure the structure meets all safety standards. We use Tekla, SkyCiv, and PKPM software for accurate structural calculations.",
      },
      {
        q: "Do you provide drawings for local building permits?",
        a: "We provide general arrangement drawings, foundation drawings, and structural calculations that can be submitted for building permits. However, you may need a local engineer to stamp the drawings according to your country's regulations. We can provide all necessary technical documents in editable formats (DWG, PDF).",
      },
      {
        q: "Can you match specific steel grades or coating requirements?",
        a: "Yes, we can use specific steel grades (Q235B, Q355B, ASTM A36, A572, etc.) and coating systems (epoxy zinc-rich primer, polyurethane topcoat, hot-dip galvanizing) upon request. Please specify your requirements in the inquiry, and we will provide a tailored solution.",
      },
      {
        q: "What is the typical lifespan of your steel buildings?",
        a: "With proper maintenance, our steel structures have a design life of 50 years. The anti-corrosion coating system (epoxy zinc-rich primer + polyurethane topcoat, 240μm total) provides 15+ years of protection in normal industrial environments. For coastal or high-humidity areas, we recommend hot-dip galvanizing for 25+ years of protection.",
      },
    ],
  },
  {
    category: "Maintenance & After-Sales",
    icon: Clock,
    color: "from-yellow-500 to-yellow-600",
    questions: [
      {
        q: "What maintenance is required for steel buildings?",
        a: "Steel buildings require minimal maintenance: (1) Inspect coating every 3-5 years and touch up any scratches, (2) Clean gutters and drainage systems regularly, (3) Check bolt tightness after first year and after severe storms, (4) Inspect roof panels for loose fasteners. We provide a detailed maintenance guide with every project.",
      },
      {
        q: "Do you provide after-sales support?",
        a: "Yes, we provide comprehensive after-sales support: (1) 2-year free technical support for installation and maintenance questions, (2) 10-year structural warranty, (3) Spare parts supply (we keep records of all your project's components for easy replacement), (4) Regular follow-up calls to ensure your satisfaction.",
      },
      {
        q: "Can you supply additional parts if needed later?",
        a: "Absolutely. We keep all project drawings and records for 10+ years. If you need additional parts, replacement panels, or expansion of your building, we can reproduce components with exact matching specifications. Many clients come back to us for factory expansions after 3-5 years.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Steel Structure FAQ | Pricing, Production & Shipping",
  keywords: [
    "steel structure FAQ",
    "steel building cost questions",
    "steel structure pricing FAQ",
    "steel warehouse price FAQ",
    "import steel structure from China",
    "steel building shipping cost",
    "prefab building FAQ",
    "steel structure lead time",
    "steel building payment terms",
    "steel structure warranty",
  ],
  description:
    "FAQs on steel structure pricing, payment, production time, shipping, installation, and warranty. Get answers before you order.",
  openGraph: {
    title: "FAQ | Laotie Steel Structure",
    description:
      "Everything you need to know before ordering your steel structure project. Payment terms, production time, shipping, installation support.",
    url: "https://www.laotie-steel.com/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Laotie Steel Structure",
    description:
      "Everything you need to know before ordering your steel structure project. Payment terms, production time, shipping, installation support.",
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/faq",
  },
};

export default function FAQPage() {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((cat) =>
      cat.questions.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <JsonLd data={faqPageSchema} />
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-steel to-steel-light text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline mb-4">
              <span>←</span> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-300 max-w-2xl">
              Everything you need to know before starting your steel structure project. Can&apos;t find your question?{" "}
              <a href="/contact" className="text-steel-accent hover:underline">
                Contact our team
              </a>.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Sections */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {faqs.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-steel">{category.category}</h2>
                </div>

                <div className="space-y-3">
                  {category.questions.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                        <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                        <span className="text-steel-accent group-open:rotate-180 transition-transform text-xl shrink-0">
                          ▾
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Quick Contact CTA */}
        <section className="bg-section py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-steel mb-4">Still Have Questions?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Our team typically replies within 2 hours during business days. Reach out via your preferred channel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-cta hover:bg-cta-hover rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                Send Us a Message
              </a>
              <a
                href="https://wa.me/8616650735555?text=Hi%20Laotie%2C%20I%20have%20a%20question%20about%20my%20steel%20structure%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 21.472c-1.595 0-3.169-.413-4.548-1.193L3.47 21.88l1.643-3.968C3.779 16.04 2.928 14.182 2.928 12.004c0-4.98 4.055-9.034 9.046-9.034 2.415 0 4.684.94 6.395 2.652 1.71 1.71 2.652 3.979 2.652 6.395 0 4.99-4.054 9.045-9.045 9.045v-.57zm8.22-6.586c0-2.546-1.592-4.972-3.7-6.055-2.108-1.083-4.67-1.083-6.778 0-2.108 1.083-3.92 3.51-3.92 6.055 0 2.546 1.095 4.29 2.942 5.483l-.943 2.255 2.477-1.028c.7.18 1.43.262 2.165.262 3.676 0 7.756-2.953 7.756-6.972h-.999z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

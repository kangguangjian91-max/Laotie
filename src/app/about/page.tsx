import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const milestones = [
  { year: "2009", text: "Company founded in Shangqiu, Henan" },
  { year: "2012", text: "First export order — Nigeria, 800T warehouse" },
  { year: "2015", text: "Passed ISO 9001 & CE certification" },
  { year: "2018", text: "Expanded to 5 production lines, 5,000T/month" },
  { year: "2021", text: "Entered Australia & New Zealand market" },
  { year: "2024", text: "30+ countries served, established Shenzhen office" },
];

const team = [
  { name: "Kang Guangjian", role: "General Manager" },
  { name: "Engineering Team", role: "12 Senior Engineers" },
  { name: "Production Team", role: "200+ Skilled Workers" },
  { name: "International Sales", role: "8 B2B Export Specialists" },
];

export const metadata = {
  title: "About Us | OldTie Steel Structure",
  description: "Learn about OldTie Steel Structure — trusted steel manufacturer in Shangqiu, China since 2009. 5 production lines, 5,000T/month capacity, 200+ skilled workers, 30+ countries served.",
  openGraph: {
    title: "About OldTie Steel Structure | CE & ISO Certified Factory",
    description: "Founded 2009, 5 production lines, 5,000T/month capacity. 200+ skilled workers, 30+ countries served. Shenzhen HQ + Shangqiu factory.",
    url: "https://www.oldtie-steel.com/about",
    siteName: "OldTie Steel Structure",
    images: [{ url: "/images/factory-workshop.webp", width: 800, height: 533 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OldTie Steel Structure | CE & ISO Certified",
    description: "Trusted steel manufacturer since 2009. 5 production lines, 5,000T/month. Serving 30+ countries.",
    images: ["/images/factory-workshop.webp"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero banner */}
        <section className="bg-steel text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl font-bold">About OldTie Steel</h1>
            <p className="mt-2 text-gray-300 max-w-2xl">
              Since 2009 — trusted steel structure manufacturer, 5 production lines, exporting to 30+ countries.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-steel mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2009 in Shangqiu, Henan Province, OldTie Steel Structure Co., Ltd. has grown from a local workshop to a modern steel structure manufacturer with 5 production lines and 5,000T/month capacity.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                With our Shenzhen office handling international business, we serve clients across Australia, Southeast Asia, Africa, the Middle East, and Europe. All products are CE, ISO 9001, IAF, and Supplier-Assessed certified.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our engineering team uses advanced software (Tekla, SkyCiv, PKPM) to deliver accurate calculations and detailed drawings for every project.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 overflow-hidden">
              <img
                src="/images/factory-workshop.webp"
                alt="OldTie Steel Factory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-steel text-center mb-2">Production Process</h2>
            <p className="text-gray-500 text-center mb-12">5-step quality control, from raw steel to finished structure</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { step: "01", title: "Material Cutting", desc: "CNC plasma/flame cutting to precision dimensions" },
                { step: "02", title: "Assembly", desc: "Automatic assembly of web, flange & stiffeners" },
                { step: "03", title: "Welding", desc: "Submerged arc welding (SAW) by certified welders" },
                { step: "04", title: "Straightening", desc: "H-beam straightening to ≤ 1/1000 tolerances" },
                { step: "05", title: "Shot Blasting & Painting", desc: "SA 2.5 surface, epoxy/zinc-rich primer, finish coat" },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-steel-accent/30 mb-2">{item.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-steel text-center mb-12">Company Milestones</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-4 items-start">
                <div className="text-steel-accent font-bold text-lg min-w-[60px]">{m.year}</div>
                <div className="text-gray-700 border-l-2 border-steel-accent pl-4">{m.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-steel text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {team.map((t) => (
                <div key={t.name} className="bg-white rounded-xl p-5 text-center">
                  <div className="text-steel-accent text-lg mb-1">👤</div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-steel mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-500 mb-6">Get a free quotation within 2 hours.</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-cta hover:bg-cta-hover rounded-lg transition-colors"
          >
            Get a Free Quote
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

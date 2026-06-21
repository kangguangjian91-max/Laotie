import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
import ImageCarousel from "@/components/ImageCarousel";
import { ArrowLeft, Wrench, Factory, Shield, Globe, Users, Award } from "lucide-react";

const milestones = [
  { year: "2009", text: "Company founded in Shangqiu, Henan Province" },
  { year: "2012", text: "First export order — 800T portal frame warehouse shipped to Lagos, Nigeria" },
  { year: "2015", text: "Achieved ISO 9001:2015 quality management & CE EN 1090-1 certification" },
  { year: "2018", text: "Factory expansion to 5 production lines, capacity reached 5,000T/month" },
  { year: "2021", text: "Entered Australia & New Zealand market — AS/NZS 5131 compliant fabrication" },
  { year: "2024", text: "Serving 30+ countries, established Shenzhen international business office" },
  { year: "2025", text: "New CNC plasma cutting line & robotic welding station installed" },
];

const equipment = [
  { name: "CNC Plasma/Flame Cutting Machines", qty: "4 units", desc: "Max plate thickness 100mm, accuracy ±0.5mm" },
  { name: "H-Beam Assembly Machines", qty: "6 units", desc: "Automatic web-flange alignment, max flange width 800mm" },
  { name: "Submerged Arc Welding (SAW) Lines", qty: "8 lines", desc: "Twin-wire SAW, certified welders per AWS D1.1" },
  { name: "H-Beam Straightening Presses", qty: "4 units", desc: "Correction to within 1/1000 of member length" },
  { name: "Shot Blasting Chambers", qty: "3 chambers", desc: "Through-type, SA 2.5 surface preparation" },
  { name: "Automatic Spray Painting Lines", qty: "2 lines", desc: "Epoxy zinc-rich primer + PU top coat, DFT 240μm" },
  { name: "CNC Drilling & Milling Centers", qty: "3 units", desc: "Multi-axis, hole position tolerance ±0.2mm" },
  { name: "Overhead Cranes", qty: "10 cranes", desc: "5T–32T capacity, covering all production bays" },
];

const stats = [
  { icon: <Factory className="w-6 h-6" />, value: "20,000+", label: "Factory Area (sqm)" },
  { icon: <Wrench className="w-6 h-6" />, value: "5", label: "Production Lines" },
  { icon: <Shield className="w-6 h-6" />, value: "5,000T", label: "Monthly Capacity" },
  { icon: <Users className="w-6 h-6" />, value: "200+", label: "Skilled Workers" },
  { icon: <Globe className="w-6 h-6" />, value: "30+", label: "Countries Served" },
  { icon: <Award className="w-6 h-6" />, value: "15+", label: "Years Experience" },
];

const team = [
  { name: "Kang Guangjian", role: "General Manager", desc: "15+ years steel industry experience, oversees all international operations" },
  { name: "Engineering Department", role: "12 Senior Engineers", desc: "Tekla Structures, SkyCiv, PKPM — code-compliant designs for any region" },
  { name: "Production Department", role: "200+ Skilled Workers", desc: "AWS/ISO-certified welders, CNC operators, QC inspectors on every shift" },
  { name: "International Sales", role: "8 B2B Export Specialists", desc: "Fluent in English, French, Arabic, and Spanish — covering 5 continents" },
];

const qualityChecks = [
  { stage: "Incoming Material", detail: "Mill certificates verified for every steel coil & plate. Spectrometer chemical analysis on random samples." },
  { stage: "Cutting & Drilling", detail: "Dimensional inspection — length ±1mm, hole position ±0.2mm. 100% first-piece check per batch." },
  { stage: "Assembly & Welding", detail: "Weld procedure qualification (WPQ) per AWS D1.1. Ultrasonic testing (UT) on all full-penetration welds." },
  { stage: "Straightening & Correction", detail: "Straightness tolerance ≤ 1/1000. Visual + dial gauge inspection on every member." },
  { stage: "Surface Treatment", detail: "Surface cleanliness SA 2.5 per ISO 8501-1. Dry film thickness (DFT) measured to specification." },
  { stage: "Pre-Shipment", detail: "Trial assembly of main frame components. Packing list verification. Container loading supervision." },
];

const factoryImages = [
  { src: "/images/factory/01-h-beam-warehouse.webp", alt: "H-Beam storage warehouse at Laotie Steel factory", caption: "H-Beam Warehouse" },
  { src: "/images/factory/02-tekla-modeling.webp", alt: "Tekla Structures 3D BIM modeling for steel structure design", caption: "3D BIM Design" },
  { src: "/images/factory/03-steel-fabrication.webp", alt: "Steel structure fabrication workshop with H-beam assembly", caption: "Steel Fabrication" },
    { src: "/images/factory/04-welding-work.webp", alt: "Certified welder performing submerged arc welding on steel beam", caption: "SAW Welding" },
    { src: "/images/factory/05-shot-blasting.webp", alt: "Shot blasting machine for surface treatment of steel members", caption: "Shot Blasting" },
  { src: "/images/factory/06-steel-storage.webp", alt: "Steel plate and raw material storage area in factory", caption: "Raw Materials" },
  { src: "/images/factory/07-fabricated-parts.webp", alt: "Fabricated steel components ready for shipment", caption: "Finished Parts" },
  { src: "/images/factory/08-factory-wide.webp", alt: "Wide angle view of Laotie Steel manufacturing plant interior", caption: "Factory Overview" },
  { src: "/images/factory/09-roller-conveyor.webp", alt: "Roller conveyor system for automated steel processing line", caption: "Conveyor System" },
  { src: "/images/factory/10-quality-inspection.webp", alt: "Quality control inspector measuring steel beam dimensions", caption: "Quality Inspection" },
];

export const metadata = {
  title: "About Laotie Steel Structure | CE & ISO Certified Factory",
  description: "Trusted steel manufacturer in Shangqiu, China since 2009. 5 production lines, 5,000T/month capacity, 200+ skilled workers, 30+ countries served.",
  openGraph: {
    title: "About Laotie Steel Structure | CE & ISO Certified Factory",
    description: "Founded 2009, 5 production lines, 5,000T/month capacity. 200+ skilled workers, 30+ countries served. Shenzhen HQ + Shangqiu factory.",
    url: "https://www.laotie-steel.com/about",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/factory-workshop.webp", width: 800, height: 533 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Laotie Steel Structure | CE & ISO Certified",
    description: "Trusted steel manufacturer since 2009. 5 production lines, 5,000T/month. Serving 30+ countries.",
    images: ["/images/factory-workshop.webp"],
  },


    alternates: {

      canonical: "https://www.laotie-steel.com/about",

    },

  };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero banner */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <Image src="/images/factory-workshop.webp" alt="Laotie Steel factory workshop interior - steel structure manufacturing facility" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">About Laotie Steel</h1>
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Since 2009 — CE & ISO certified steel structure manufacturer. 5 production lines, 5,000 tons/month, exporting to 30+ countries worldwide.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-steel-muted border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center p-3">
                  <div className="text-steel mb-1.5">{s.icon}</div>
                  <div className="text-xl font-bold text-steel">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">Who We Are</p>
              <h2 className="text-3xl font-bold text-steel mb-6">From Local Workshop to Global Supplier</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2009 in Shangqiu, Henan Province — in the heart of China&apos;s steel manufacturing hub — Laotie Steel Structure Co., Ltd. has grown from a local fabrication shop into a modern, fully-equipped steel structure manufacturer serving clients across 5 continents.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our 20,000 square-meter factory houses 5 dedicated production lines with a combined monthly output of 5,000 metric tons. From raw steel plate to fully fabricated, surface-treated, and trial-assembled steel structures — every step happens under one roof, ensuring complete quality traceability.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                With our Shenzhen office managing international client relationships, we combine the manufacturing expertise of central China with the logistics and communication advantages of a tier-1 global port city. All products are CE (EN 1090-1), ISO 9001:2015, IAF, and Made-in-China Supplier Assessed certified.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our in-house engineering team uses Tekla Structures, SkyCiv, and PKPM to deliver code-compliant structural calculations and detailed fabrication drawings for every project — whether it&apos;s a 500 sqm workshop or a 30,000 sqm logistics center.
              </p>
            </div>
            <div className="relative">
              <ImageCarousel images={factoryImages} interval={4000} />
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg p-4 border border-gray-100 z-30">
                <div className="text-xs text-gray-400 mb-0.5">Certified Since</div>
                <div className="text-lg font-bold text-steel-accent">2015</div>
                <div className="text-xs text-gray-500">ISO 9001 + CE EN 1090-1</div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment & Technology */}
        <section className="bg-section py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase text-center mb-2">Our Factory</p>
            <h2 className="text-3xl font-bold text-steel text-center mb-3">Production Equipment &amp; Technology</h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Advanced machinery and certified processes ensure every steel member meets international quality standards.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {equipment.map((eq) => (
                <div key={eq.name} className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow border border-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <Wrench className="w-5 h-5 text-steel-accent" />
                    <span className="text-xs font-semibold text-steel-accent bg-steel-muted px-2 py-0.5 rounded-full">{eq.qty}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1.5 leading-tight">{eq.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{eq.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Control */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase text-center mb-2">Quality Assurance</p>
          <h2 className="text-3xl font-bold text-steel text-center mb-3">6-Stage Quality Control</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Every steel member passes through 6 inspection gates before shipment. Third-party inspection by SGS, BV, or TÜV available on request.
          </p>
          <div className="space-y-3 max-w-3xl mx-auto">
            {qualityChecks.map((qc, i) => (
              <div key={qc.stage} className="flex gap-4 items-start p-4 rounded-xl bg-gray-50 hover:bg-steel-muted transition-colors">
                <div className="w-10 h-10 rounded-full bg-steel text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{qc.stage}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{qc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Production Process */}
        <section className="bg-section py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase text-center mb-2">How We Build</p>
            <h2 className="text-3xl font-bold text-steel text-center mb-3">Production Workflow</h2>
            <p className="text-gray-500 text-center mb-12">5-step manufacturing process, from raw steel to finished structure</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { step: "01", title: "Material Cutting", desc: "CNC plasma/flame cutting with ±0.5mm precision" },
                { step: "02", title: "H-Beam Assembly", desc: "Automatic alignment of web, flange & stiffeners" },
                { step: "03", title: "Welding", desc: "SAW by AWS D1.1 certified welders, UT tested" },
                { step: "04", title: "Straightening", desc: "H-beam correction to ≤ 1/1000 of member length" },
                { step: "05", title: "Blasting & Coating", desc: "SA 2.5 surface, epoxy primer + PU top coat" },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-xl p-5 text-center hover:shadow-md transition-shadow border border-gray-50">
                  <div className="text-3xl font-bold text-steel-accent/25 mb-2">{item.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase text-center mb-2">Our Journey</p>
          <h2 className="text-3xl font-bold text-steel text-center mb-12">Company Milestones</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex gap-6 items-start ${i === milestones.length - 1 ? "opacity-100" : ""}`}>
                <div className="text-steel-accent font-bold text-lg min-w-[64px] text-right">{m.year}</div>
                <div className="relative">
                  <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-steel-accent -translate-x-[1.125rem] ring-4 ring-steel-muted" />
                  <div className="text-gray-700 border-l-2 border-steel-accent/30 pl-5 pb-6 leading-relaxed text-sm">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="bg-section py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase text-center mb-2">The People</p>
            <h2 className="text-3xl font-bold text-steel text-center mb-12">Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((t) => (
                <div key={t.name} className="bg-white rounded-xl p-6 text-center border border-gray-50 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-steel-muted flex items-center justify-center">
                    <Users className="w-6 h-6 text-steel" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-0.5">{t.name}</h3>
                  <p className="text-xs text-steel-accent font-semibold mb-2">{t.role}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-steel to-steel-light py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Start Your Project?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Send us your requirements — we&apos;ll provide a detailed quotation with structural calculations within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Quotation →
              </a>
              <a
                href="/certificates"
                className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white border-2 border-white/20 hover:border-white/50 rounded-lg transition-all"
              >
                View Certifications
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

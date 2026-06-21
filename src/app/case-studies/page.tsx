import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, MapPin, Ruler, Building, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Steel Structure Case Studies | Real Projects by Laotie Steel",
  description:
    "Browse our steel structure case studies: industrial warehouses, factory buildings, aircraft hangars, and logistics centers delivered to 30+ countries. CE & ISO certified.",
  keywords: [
    "steel structure case studies",
    "warehouse construction case study",
    "factory building project example",
    "steel building before after",
    "Q355B steel structure project",
    "portal frame warehouse case study",
    "space frame hangar project",
    "steel structure manufacturing project",
  ],
  openGraph: {
    title: "Steel Structure Case Studies | Laotie Steel",
    description: "Real steel structure projects delivered to 30+ countries. See how we solved complex engineering challenges.",
    url: "https://www.laotie-steel.com/case-studies",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/projects/hongxin-sports/hongxin-5.webp", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Case Studies | Laotie Steel",
    description: "Real steel structure projects delivered to 30+ countries.",
    images: ["/images/projects/hongxin-sports/hongxin-5.webp"],
  },
  alternates: { canonical: "https://www.laotie-steel.com/case-studies" },
};

// Case study data - problem/solution/results format
const caseStudies = [
  {
    client: "Sydney Logistics Co.",
    location: "Sydney, Australia",
    type: "Industrial Warehouse",
    size: "7,200 sqm",
    year: "2025",
    challenge: "Need for a 60m clear-span warehouse in Sydney's Wind Region B (cyclonic zone). Required 20T overhead crane and high-bay racking system.",
    solution: "Designed portal frame using AS 4100 with tapered H-sections. 385 tons Q355B steel. Colorbond® cladding with anticon blanket.",
    result: "Completed in 25 working days. 55m/s wind rating. 600 sqm mezzanine office included.",
    slug: "industrial-warehouse-sydney",
    image: "/images/projects/project-sydney-01.webp",
  },
  {
    client: "Lagos Manufacturing Ltd.",
    location: "Lagos, Nigeria",
    type: "Factory Complex",
    size: "15,000 sqm",
    year: "2024",
    challenge: "Phase II expansion of a manufacturing plant requiring three 30m continuous spans with enhanced corrosion protection for tropical climate.",
    solution: "Multi-span portal frame with SA 2.5 + 320μm DFT epoxy coating system. Natural ventilation ridge vents.",
    result: "Completed 6 weeks ahead of schedule. Column-free production floor of 15,000 sqm.",
    slug: "factory-complex-lagos",
    image: "/images/projects/project-lagos-01.webp",
  },
  {
    client: "Metro Manila Mall Developer",
    location: "Manila, Philippines",
    type: "Space Frame Dome Roof",
    size: "3,200 sqm",
    year: "2024",
    challenge: "80m oval dome roof for a 4-story shopping mall atrium. Zero site welding allowed. Seismic zone design.",
    solution: "Bolt-ball space frame system with PVDF coated members. Central skylight with integrated drainage.",
    result: "All bolted connections — rapid dry-season assembly. 15-year coating warranty.",
    slug: "shopping-mall-dome-roof-manila",
    image: "/images/projects/project-manila-01.webp",
  },
  {
    client: "Dubai South Logistics",
    location: "Dubai, UAE",
    type: "Logistics Distribution Center",
    size: "22,000 sqm",
    year: "2023",
    challenge: "Massive logistics hub requiring 50m clear-span bays, 18m eave height, 50T crane, and fire-rated construction.",
    solution: "Steel building with 2-hour fire-rated mezzanine. 50T overhead crane runway beams in 4 bays.",
    result: "Designed for 50°C ambient temperature per UAE code. 3,000 sqm integrated office.",
    slug: "logistics-center-dubai",
    image: "/images/projects/project-dubai-01.webp",
  },
  {
    client: "Perth Grain Processors",
    location: "Perth, Australia",
    type: "Agricultural Processing Plant",
    size: "5,600 sqm",
    year: "2025",
    challenge: "Food-grade facility requiring epoxy-coated steel, 15T cranes, dust extraction, and AS/NZS 5131 compliance.",
    solution: "Portal frame with food-safe epoxy internal coating. Integrated 15T crane system. Positive-pressure ventilation.",
    result: "AS/NZS 5131 compliant fabrication. Dust extraction ready. Food-safe environment.",
    slug: "perth-agricultural-processing-plant",
    image: "/images/projects/project-perth-01.webp",
  },
  {
    client: "Jakarta Regional Airport",
    location: "Jakarta, Indonesia",
    type: "Aircraft Maintenance Hangar",
    size: "4,800 sqm",
    year: "2023",
    challenge: "80m clear-span hangar for Boeing 737/A320 aircraft. Required 4 × 25T cranes and fire suppression.",
    solution: "Large-span space frame roof. SNI 1727:2020 compliant design. Integrated fire suppression supports.",
    result: "Column-free interior for full aircraft access. 4 × 25T crane runways for engine maintenance.",
    slug: "aircraft-hangar-jakarta",
    image: "/images/projects/project-jakarta-01.webp",
  },
  {
    client: "Hongxin Sports Co.",
    location: "Shangqiu, China",
    type: "Sports Equipment Factory",
    size: "12,800 sqm",
    year: "2025",
    challenge: "160m × 80m column-free production area for annual output of 8 million trampolines.",
    solution: "Portal frame with 10T overhead crane running full 160m length. PIR sandwich panels.",
    result: "Completed in 45 days from contract signing. 100mm PIR walls, 75mm rock wool roof.",
    slug: "hongxin-sports-trampoline-factory-shangqiu",
    image: "/images/projects/hongxin-sports/hongxin-1.webp",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src="/images/projects/project-04.webp" alt="Steel structure case study projects" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Steel Structure Case Studies
            </h1>
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Real projects, real results. See how Laotie Steel solved complex engineering challenges for clients across 30+ countries.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-steel-muted border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "30+", label: "Countries Served" },
                { value: "200+", label: "Projects Completed" },
                { value: "100,000+", label: "Tons Fabricated" },
                { value: "45 Days", label: "Fastest Delivery" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-steel">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="space-y-16">
            {caseStudies.map((cs, i) => (
              <div key={cs.slug} className="grid lg:grid-cols-5 gap-8 items-start pb-16 border-b border-gray-100 last:border-0 last:pb-0">
                {/* Image */}
                <div className="lg:col-span-2 overflow-hidden rounded-2xl">
                  <img
                    src={cs.image}
                    alt={`${cs.type} case study - ${cs.location}`}
                    className="w-full aspect-[4/3] object-cover"
                    loading={i > 1 ? "lazy" : "eager"}
                  />
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-steel-accent bg-steel-muted px-2.5 py-1 rounded-full">
                      {cs.year}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {cs.type}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{cs.client}</h2>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-steel-accent shrink-0" />
                      {cs.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Ruler className="w-4 h-4 text-steel-accent shrink-0" />
                      {cs.size}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Building className="w-4 h-4 text-steel-accent shrink-0" />
                      {cs.type}
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">{cs.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Solution</h3>
                    <p className="text-gray-700 leading-relaxed">{cs.solution}</p>
                  </div>

                  {/* Result */}
                  <div className="mb-5">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Result</h3>
                    <p className="text-gray-700 leading-relaxed">{cs.result}</p>
                  </div>

                  <Link
                    href={`/projects/${cs.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-steel hover:text-steel-light transition-colors"
                  >
                    View Full Case Study →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-br from-steel to-steel-light rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-white mb-3">Start Your Project</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Share your requirements — our engineering team will provide a detailed quotation with structural calculations within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get a Free Quote →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, MapPin, Building, Ruler, Calendar } from "lucide-react";

interface Project {
  name: string;
  slug?: string;
  location: string;
  type: string;
  size: string;
  year: string;
  description: string;
  highlights: string[];
  image: string;
}

const projects: Project[] = [
  {
    name: "Industrial Warehouse Complex (120×60m)",
    slug: "industrial-warehouse-sydney",
    location: "Sydney, Australia",
    type: "Portal Frame Steel Building",
    size: "7,200 sqm",
    year: "2025",
    description:
      "A large-span portal frame warehouse for an Australian logistics company, designed to AS/NZS 1170 wind load requirements. Single-span 60m clear interior with 12m eave height, accommodating high-bay racking systems and 20T overhead crane operations.",
    highlights: [
      "Cyclonic wind region design (Region C)",
      "Full hot-dip galvanized structure for coastal environment",
      "120 km/h wind rating with full engineering certification",
      "Integrated mezzanine office space — 600 sqm",
    ],
    image: "/images/projects/project-sydney-01.webp",
  },
  {
    name: "Factory Complex — Phase II Expansion",
    slug: "factory-complex-lagos",
    location: "Lagos, Nigeria",
    type: "Multi-Span Steel Structure",
    size: "15,000 sqm",
    year: "2024",
    description:
      "Phase II expansion of a manufacturing plant in Lagos Free Trade Zone. Three continuous spans of 30m each, creating a column-free production floor totaling 15,000 sqm. Designed for high humidity tropical environment with enhanced corrosion protection.",
    highlights: [
      "Tropical climate corrosion package — SA 2.5 + 320μm DFT epoxy system",
      "30m × 3 continuous spans, column-free interior",
      "Integrated natural ventilation ridge vents — 120 units",
      "Completed 6 weeks ahead of schedule",
    ],
    image: "/images/projects/project-lagos-01.webp",
  },
  {
    name: "Shopping Mall Dome Roof",
    slug: "shopping-mall-dome-roof-manila",
    location: "Manila, Philippines",
    type: "Space Frame Structure",
    size: "3,200 sqm",
    year: "2024",
    description:
      "A curved bolt-ball space frame roof for a 4-story shopping mall atrium in Metro Manila. The 80m × 40m oval dome features a central skylight and integrated MEP service walkways. All bolted connections — zero site welding required, enabling rapid assembly during the Philippine dry season.",
    highlights: [
      "80m oval span, bolt-ball system — no site welding",
      "Central skylight with integrated drainage channels",
      "Seismic design per NSCP 2015 (Philippine Building Code)",
      "PVDF coated for tropical UV resistance — 15-year warranty",
    ],
    image: "/images/projects/project-manila-01.webp",
  },
  {
    name: "Logistics Distribution Center",
    slug: "logistics-center-dubai",
    location: "Dubai, UAE",
    type: "Steel Building + Mezzanine",
    size: "22,000 sqm",
    year: "2023",
    description:
      "A massive logistics hub in Dubai South (DWC) Free Zone, combining warehouse and office functions under one roof. The structure features 50m clear-span bays, 18m eave height, loading docks on both longitudinal sides, and a 3,000 sqm integrated office mezzanine with fire-rated construction.",
    highlights: [
      "Fire-rated 2-hour protection on mezzanine structural members",
      "50T overhead crane runway beams — 4 bays",
      "Designed for 50°C ambient temperature per UAE Building Code",
      "HVAC-ready roof structure with equipment support platforms",
    ],
    image: "/images/projects/project-dubai-01.webp",
  },
  {
    name: "Agricultural Processing Plant",
    slug: "perth-agricultural-processing-plant",
    location: "Perth, Australia",
    type: "Portal Frame + Crane System",
    size: "5,600 sqm",
    year: "2025",
    description:
      "A food-grade processing facility for grain handling and packaging in Western Australia. The structure integrates 15T overhead cranes with food-safe epoxy-coated steel members, positive-pressure ventilation, and dust extraction systems. All steelwork designed to AS/NZS 5131 for fabrication and erection.",
    highlights: [
      "Food-grade epoxy internal coating on all structural steel",
      "AS/NZS 5131 compliant fabrication and erection",
      "Integrated 15T crane system with full engineering certification",
      "Dust extraction and positive-pressure ventilation ready",
    ],
    image: "/images/projects/project-perth-01.webp",
  },
  {
    name: "Aircraft Maintenance Hangar",
    slug: "aircraft-hangar-jakarta",
    location: "Jakarta, Indonesia",
    type: "Large-Span Space Frame",
    size: "4,800 sqm",
    year: "2023",
    description:
      "A maintenance hangar for narrow-body aircraft (Boeing 737 / Airbus A320 class) at an Indonesian regional airport. The 80m × 60m clear-span space frame roof provides unobstructed interior space for aircraft tail clearance. Designed to Indonesian SNI 1727 loading standards with tropical cyclone considerations.",
    highlights: [
      "80m clear span — no interior columns for full aircraft access",
      "Designed to SNI 1727:2020 (Indonesian Building Code)",
      "Integrated fire suppression system supports in roof structure",
      "4 × 25T overhead crane runways for engine maintenance",
    ],
    image: "/images/projects/project-jakarta-01.webp",
  },
  {
    name: "Hongxin Sports Trampoline Factory",
    slug: "hongxin-sports-trampoline-factory-shangqiu",
    location: "Shangqiu, China",
    type: "Portal Frame Steel Building",
    size: "12,800 sqm",
    year: "2025",
    description:
      "A 12,800 m² industrial factory designed and fabricated for Hongxin Sports, a leading trampoline manufacturer in China. The facility serves as the company's primary production base for 8 million trampolines per year.",
    highlights: [
      "160m × 80m column-free production area",
      "10T overhead crane system — full 160m length",
      "100mm PIR sandwich panels for walls, 75mm rock wool roof",
      "Completed in 45 days from contract signing",
    ],
    image: "/images/projects/hongxin-sports/hongxin-1.webp",
  },
];

export const metadata = {
  title: "Projects",
  description: "Featured steel structure projects delivered to 30+ countries worldwide. Portal frame buildings, space frames, floor decks, and cladding systems — Australia, Nigeria, Philippines, UAE, Indonesia.",
  openGraph: {
    title: "Steel Structure Projects | Laotie Steel Structure",
    description: "Industrial warehouses, factory complexes, shopping malls, logistics centers — delivered to 30+ countries worldwide.",
    url: "https://www.laotie-steel.com/projects",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/projects/project-01.webp", width: 800, height: 600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Projects | Laotie Steel Structure",
    description: "Industrial warehouses, factory complexes, shopping malls — delivered to 30+ countries worldwide.",
    images: ["/images/projects/project-01.webp"],
  },


    alternates: {

      canonical: "https://www.laotie-steel.com/projects",

    },

  };

const projectProductLinks: Record<string, string> = {
  "Industrial Warehouse Complex (120×60m)": "/products/steel-structure-building",
  "Factory Complex — Phase II Expansion": "/products/steel-structure-building",
  "Shopping Mall Dome Roof": "/products/space-frame-truss",
  "Logistics Distribution Center": "/products/steel-structure-building",
  "Agricultural Processing Plant": "/products/steel-structure-building",
  "Aircraft Maintenance Hangar": "/products/space-frame-truss",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src="/images/projects/project-04.webp" alt="Completed steel structure project by Laotie Steel - industrial building construction" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-white transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Featured Projects</h1>
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Delivered steel structures to 30+ countries across 5 continents. Each project — engineered to local codes, fabricated to international standards.
            </p>
          </div>
        </section>

        {/* Stats overview */}
        <section className="bg-steel-muted border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "30+", label: "Countries" },
                { value: "200+", label: "Projects Completed" },
                { value: "100,000+", label: "Tons Fabricated" },
                { value: "15+", label: "Years Experience" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-steel">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator CTA */}
        <section className="bg-blue-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-steel mb-2">
              Want to Estimate Your Project Cost?
            </h2>
            <p className="text-gray-600 mb-4">
              Use our free online calculator to get a preliminary quote in 1 minute.
            </p>
            <a
              href="/calculator"
              className="inline-block bg-steel text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Try Cost Calculator →
            </a>
          </div>
        </section>

        {/* Project Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="space-y-12">
            {projects.map((project, i) => (
              <div
                key={project.name}
                id={`project-${i + 1}`}
                className="group grid lg:grid-cols-5 gap-8 items-start pb-12 border-b border-gray-100 last:border-0 last:pb-0"
              >
                {/* Image */}
                <div className="lg:col-span-2 overflow-hidden rounded-2xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    loading={i > 1 ? "lazy" : "eager"}
                  />
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-steel-accent bg-steel-muted px-2.5 py-1 rounded-full">
                      {project.year}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-steel transition-colors">
                    {project.name}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 mb-5">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-steel-accent shrink-0" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Ruler className="w-4 h-4 text-steel-accent shrink-0" />
                      {project.size}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Building className="w-4 h-4 text-steel-accent shrink-0" />
                      {project.type}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Project Highlights</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {project.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-steel-accent shrink-0" />
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap items-center gap-4 mt-5">
                    <a
                      href="/contact"
                      className="inline-flex items-center text-sm font-semibold text-steel-accent hover:text-steel transition-colors"
                    >
                      Request a similar project quote →
                    </a>
                    {projectProductLinks[project.name] && (
                      <a
                        href={projectProductLinks[project.name]}
                        className="inline-flex items-center text-sm text-gray-400 hover:text-steel-accent transition-colors"
                      >
                        View Related Product →
                      </a>
                    )}
                    {project.slug && (
                      <a
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-steel hover:text-steel-light transition-colors ml-auto"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-br from-steel to-steel-light rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-white mb-3">Have a Similar Project?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Share your requirements and drawings — our engineering team will provide a detailed quotation with structural calculations within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Start Your Project →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

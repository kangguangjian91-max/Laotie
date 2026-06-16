import type { Metadata } from "next";
import Link from "next/link";
import { projectDetails } from "@/data/projects-detail";

export const metadata: Metadata = {
  title: "Global Projects Portfolio | Laotie Steel Structure",
  description:
    "Explore 35+ steel structure projects delivered by Laotie Steel across 15+ countries. Warehouses, factories, aircraft hangars, and logistics centers — see our global delivery capability.",
  keywords: [
    "steel structure projects",
    "global steel building portfolio",
    "steel warehouse project cases",
    "China steel structure export projects",
    "Australia steel warehouse",
    "Nigeria steel factory",
    "Philippines steel building",
  ],
  alternates: {
    canonical: "https://www.laotie-steel.com/portfolio",
  },
};

const regionMap: Record<string, { label: string; emoji: string }> = {
  all: { label: "All Projects", emoji: "🌍" },
  oceania: { label: "Oceania", emoji: "🇦🇺" },
  africa: { label: "Africa", emoji: "🇳🇬" },
  asia: { label: "Asia", emoji: "🇵🇭" },
  "middle-east": { label: "Middle East", emoji: "🇦🇪" },
};

// Derive region from slug (simplified mapping)
function getRegion(slug: string): string {
  if (slug.includes("sydney") || slug.includes("australia") || slug.includes("auckland") || slug.includes("brisbane")) return "oceania";
  if (slug.includes("lagos") || slug.includes("nigeria") || slug.includes("johannesburg") || slug.includes("kenya")) return "africa";
  if (slug.includes("manila") || slug.includes("philippines") || slug.includes("jakarta") || slug.includes("indonesia") || slug.includes("bangkok")) return "asia";
  if (slug.includes("dubai") || slug.includes("uae") || slug.includes("riyadh") || slug.includes("saudi")) return "middle-east";
  return "all";
}

// Extract spec values from the specs array
function getSpecValue(specs: { label: string; value: string }[], keywords: string[]): string {
  for (const s of specs) {
    for (const kw of keywords) {
      if (s.label.toLowerCase().includes(kw.toLowerCase())) return s.value;
    }
  }
  return "—";
}

export default function PortfolioPage() {
  const projects = Object.values(projectDetails);

  // Get unique regions present in data
  const regionSet = new Set<string>();
  projects.forEach((p) => regionSet.add(getRegion(p.slug)));
  const regions = ["all", ...Array.from(regionSet)];

  return (
    <main className="bg-white text-gray-900">
      {/* ===== Hero ===== */}
      <section className="relative bg-steel text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-sky blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Global Projects <span className="text-sky">Portfolio</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Delivered 35+ steel structure projects across 15+ countries.
            From logistics warehouses in Australia to industrial factories in Nigeria —
            see our global delivery capability.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-2xl">🌍</span>
              <span><strong>15+</strong> Countries</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-2xl">🏭</span>
              <span><strong>35+</strong> Projects</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-2xl">⚓️</span>
              <span><strong>5,000+</strong> Tons/Month</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Region Filter ===== */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((r) => (
              <a
                key={r}
                href={`#${r}`}
                className="px-4 py-2 rounded-full text-sm font-medium border-2 border-steel/20 hover:border-steel hover:bg-steel hover:text-white transition"
              >
                {regionMap[r]?.emoji} {regionMap[r]?.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Project Grid ===== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const region = getRegion(project.slug);
              const regionLabel = regionMap[region]?.label || region;
              const regionEmoji = regionMap[region]?.emoji || "🌍";
              const size = getSpecValue(project.specs, ["span", "size", "dimension"]);
              const tons = getSpecValue(project.specs, ["ton", "steel", "weight"]);
              const area = getSpecValue(project.specs, ["area", "floor", "total"]);

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-steel/30 transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.h1}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Region Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {regionEmoji} {regionLabel}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-steel transition-colors">
                      {project.h1}
                    </h2>

                    {/* Key Specs */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {size !== "—" && (
                        <div className="flex items-center gap-2">
                          <span>📐</span>
                          <span>{size}</span>
                        </div>
                      )}
                      {area !== "—" && (
                        <div className="flex items-center gap-2">
                          <span>📏</span>
                          <span>{area}</span>
                        </div>
                      )}
                      {tons !== "—" && (
                        <div className="flex items-center gap-2">
                          <span>⚓️</span>
                          <span>{tons}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="text-steel font-semibold text-sm group-hover:underline">
                      View Project Details →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Can't Find Your Project Type?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We have delivered 35+ projects across 15+ countries. If you don't see
            your specific building type or region, contact our engineering team —
            we likely have a similar reference we can share privately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="bg-steel text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Get Cost Estimate →
            </Link>
            <Link
              href="/contact"
              className="border-2 border-steel text-steel py-3 px-8 rounded-lg font-semibold hover:bg-steel hover:text-white transition"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

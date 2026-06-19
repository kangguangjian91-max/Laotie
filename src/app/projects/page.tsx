import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, MapPin, Building, Ruler, Calendar } from "lucide-react";
import { projects, projectProductLinks } from "@/lib/projectsData";
import type { Project } from "@/lib/projectsData";
import ProjectImage from "@/components/ProjectImage";

export const metadata = {
  title: "Steel Structure Project Cases | Warehouse, Factory, Sports Hall",
  description: "View our steel structure project cases: industrial warehouse, factory building, sports hall, dome roof. 18,304㎡ factory complex. Get a customized design.",
  openGraph: {
    title: "Steel Structure Projects | Laotie Steel",
    description: "Steel warehouse, factory, and sports hall projects. CE & ISO certified quality.",
    url: "https://www.laotie-steel.com/projects",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/projects/hongxin-sports/hongxin-5.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Projects | Laotie Steel",
    description: "Steel warehouse, factory, and sports hall projects. CE & ISO certified quality.",
    images: ["/images/projects/hongxin-sports/hongxin-5.webp"],
  },


    alternates: {

      canonical: "https://www.laotie-steel.com/projects",

    },

  };


export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <ProjectImage src="/images/projects/project-04.webp" alt="Completed steel structure project by Laotie Steel - industrial building construction" className="w-full h-full object-cover" containerClassName="w-full h-full" />
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
                  <ProjectImage
                    src={project.image}
                    alt={project.name}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    containerClassName="w-full aspect-[4/3]"
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

          {/* Client Reviews */}
          <section className="mt-16 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { client: "Nguyen Van A", company: "Logistics Company", location: "Hanoi, Vietnam", review: "Laotie Steel provided excellent service. Their warehouse quality is outstanding. Highly recommended!", project: "5,000 sqm Warehouse in Hanoi", date: "March 2025" },
                { client: "Budi Santoso", company: "Electronics Manufacturer", location: "Jakarta, Indonesia", review: "We are very satisfied with Laotie's factory building. The quality is excellent and installation guidance was very helpful.", project: "8,000 sqm Factory in Jakarta", date: "December 2024" },
                { client: "Mohammed Bello", company: "Logistics Company", location: "Lagos, Nigeria", review: "Laotie Steel understands Nigerian climate. Their warehouse design is perfect for heavy rain protection.", project: "3,500 sqm Warehouse in Lagos", date: "January 2025" },
                { client: "Maria Santos", company: "Manufacturing Company", location: "Manila, Philippines", review: "Excellent communication and fast response. Laotie delivered quality steel structure for our factory.", project: "6,000 sqm Factory in Manila", date: "February 2025" },
                { client: "Somchai Tanaka", company: "Agricultural Company", location: "Bangkok, Thailand", review: "Laotie Steel provided complete solution for our processing plant. Very professional team.", project: "4,200 sqm Processing Plant in Bangkok", date: "April 2025" },
              ].map((r) => (
                <div key={r.client} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm">"{r.review}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-sm">{r.client}</p>
                    <p className="text-xs text-gray-600">{r.company}</p>
                    <p className="text-xs text-gray-500">{r.location} &bull; {r.date}</p>
                    <p className="text-xs text-steel-accent mt-1">{r.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

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

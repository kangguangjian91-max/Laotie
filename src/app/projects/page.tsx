"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MapPin, Ruler, Building } from "lucide-react";
import { projects, projectProductLinks } from "@/lib/projectsData";
import ProjectImage from "@/components/ProjectImage";

// Extract unique countries and structure types from project data
const allCountries = [...new Set(projects.map(p => p.location.split(",").pop()?.trim() || p.location))];
const allTypes = [...new Set(projects.map(p => p.type))];

export default function ProjectsPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const countryMatch = selectedCountry === "All" || p.location.includes(selectedCountry);
      const typeMatch = selectedType === "All" || p.type === selectedType;
      return countryMatch && typeMatch;
    });
  }, [selectedCountry, selectedType]);

  const resultCount = filtered.length;

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-steel overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <ProjectImage src="/images/projects/project-04.webp" alt="Steel structure projects" className="w-full h-full object-cover" containerClassName="w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/80" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Steel Structure Project Cases
            </h1>
            <p className="mt-3 text-lg text-gray-300 max-w-2xl">
              Delivered to 30+ countries across 5 continents. Each project engineered to local codes, fabricated to international standards.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "30+", label: "Countries" },
                { value: "50+", label: "Projects Completed" },
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

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Country Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Country:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCountry("All")}
                  className={`px-3 py-1.5 text-xs rounded-full border transition ${
                    selectedCountry === "All"
                      ? "bg-steel text-white border-steel"
                      : "bg-white text-gray-600 border-gray-200 hover:border-steel-accent"
                  }`}
                >
                  All
                </button>
                {allCountries.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCountry(c)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition ${
                      selectedCountry === c
                        ? "bg-steel text-white border-steel"
                        : "bg-white text-gray-600 border-gray-200 hover:border-steel-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Type:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedType("All")}
                  className={`px-3 py-1.5 text-xs rounded-full border transition ${
                    selectedType === "All"
                      ? "bg-steel text-white border-steel"
                      : "bg-white text-gray-600 border-gray-200 hover:border-steel-accent"
                  }`}
                >
                  All
                </button>
                {allTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition ${
                      selectedType === t
                        ? "bg-steel text-white border-steel"
                        : "bg-white text-gray-600 border-gray-200 hover:border-steel-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-gray-400 ml-auto">{resultCount} project{resultCount !== 1 ? "s" : ""} found</span>
          </div>
        </section>

        {/* Project Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <div
                  key={project.name}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <ProjectImage
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      containerClassName="w-full h-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold text-steel-accent bg-blue-50 px-2 py-0.5 rounded-full">
                        {project.year}
                      </span>
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {project.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-steel transition-colors line-clamp-2">
                      {project.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-steel-accent shrink-0" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Ruler className="w-3.5 h-3.5 text-steel-accent shrink-0" />
                        {project.size}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      {project.slug && (
                        <a
                          href={`/projects/${project.slug}`}
                          className="text-xs font-semibold text-steel hover:text-steel-accent transition-colors"
                        >
                          View Details →
                        </a>
                      )}
                      <a
                        href="/contact"
                        className="text-xs font-semibold text-steel-accent hover:text-steel transition-colors ml-auto"
                      >
                        Get Quote →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No projects match your filter criteria.</p>
              <button
                onClick={() => { setSelectedCountry("All"); setSelectedType("All"); }}
                className="text-sm text-steel-accent hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Client Reviews */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { client: "Nguyen Van A", company: "Logistics Company", location: "Hanoi, Vietnam", review: "Laotie Steel provided excellent service. Their warehouse quality is outstanding. Highly recommended!", project: "5,000 sqm Warehouse in Hanoi", date: "March 2025" },
                { client: "Budi Santoso", company: "Electronics Manufacturer", location: "Jakarta, Indonesia", review: "We are very satisfied with Laotie's factory building. The quality is excellent and installation guidance was very helpful.", project: "8,000 sqm Factory in Jakarta", date: "December 2024" },
                { client: "Mohammed Bello", company: "Logistics Company", location: "Lagos, Nigeria", review: "Laotie Steel understands Nigerian climate. Their warehouse design is perfect for heavy rain protection.", project: "3,500 sqm Warehouse in Lagos", date: "January 2025" },
                { client: "Maria Santos", company: "Manufacturing Company", location: "Manila, Philippines", review: "Excellent communication and fast response. Laotie delivered quality steel structure for our factory.", project: "6,000 sqm Factory in Manila", date: "February 2025" },
                { client: "Somchai Tanaka", company: "Agricultural Company", location: "Bangkok, Thailand", review: "Laotie Steel provided complete solution for our processing plant. Very professional team.", project: "4,200 sqm Processing Plant in Bangkok", date: "April 2025" },
              ].map((r) => (
                <div key={r.client} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-gradient-to-br from-steel to-blue-800 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-white mb-3">Have a Similar Project?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Share your requirements and drawings — our engineering team will provide a detailed quotation with structural calculations within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-lg transition-all shadow-lg hover:shadow-xl"
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

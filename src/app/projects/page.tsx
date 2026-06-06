import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const projects = [
  { name: "Industrial Warehouse (120×60m)", location: "Sydney, Australia", type: "Portal Frame", size: "7,200 sqm", year: "2025" },
  { name: "Factory Complex (Phase II)", location: "Lagos, Nigeria", type: "Steel Structure", size: "15,000 sqm", year: "2024" },
  { name: "Shopping Mall Roof", location: "Manila, Philippines", type: "Space Frame", size: "3,200 sqm", year: "2024" },
  { name: "Logistics Center", location: "Dubai, UAE", type: "Steel Building", size: "22,000 sqm", year: "2023" },
  { name: "Agricultural Processing Plant", location: "Perth, Australia", type: "Portal Frame + Crane", size: "5,600 sqm", year: "2025" },
  { name: "Airport Maintenance Hangar", location: "Jakarta, Indonesia", type: "Space Frame", size: "4,800 sqm", year: "2023" },
];

export const metadata = {
  title: "Projects | OldTie Steel Structure",
  description: "Featured steel structure projects delivered to 30+ countries worldwide. Portal frame buildings, space frames, floor decks, and cladding systems — Australia, Nigeria, Philippines, UAE, Indonesia.",
  openGraph: {
    title: "Steel Structure Projects | OldTie Steel Structure",
    description: "Industrial warehouses, factory complexes, shopping malls, logistics centers — delivered to 30+ countries worldwide.",
    url: "https://www.oldtie-steel.com/projects",
    siteName: "OldTie Steel Structure",
    images: [{ url: "/images/projects/project-01.jpg", width: 800, height: 600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Projects | OldTie Steel Structure",
    description: "Industrial warehouses, factory complexes, shopping malls — delivered to 30+ countries worldwide.",
    images: ["/images/projects/project-01.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl font-bold text-steel mb-2">Featured Projects</h1>
          <p className="text-gray-500 mb-12 max-w-2xl">Delivered steel structures to 30+ countries across 5 continents. Here are some of our recent projects.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={project.name} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={`/images/projects/project-${String(i + 1).padStart(2, '0')}.jpg`}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>📍 {project.location}</p>
                    <p>🏗️ {project.type}</p>
                    <p>📐 {project.size}</p>
                    <p>📅 {project.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Looking for a similar project? Get a free quote today.</p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-cta hover:bg-cta-hover rounded-lg transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

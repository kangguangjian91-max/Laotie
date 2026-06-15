import Image from 'next/image';

const projects = [
  { name: "Industrial Warehouse", location: "Australia", type: "Portal Frame" },
  { name: "Factory Complex", location: "Nigeria", type: "Steel Structure" },
  { name: "Shopping Mall Roof", location: "Philippines", type: "Space Frame" },
  { name: "Logistics Center", location: "UAE", type: "Steel Building" },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Global Footprint
          </p>
          <h2 className="text-3xl font-bold text-steel">Featured Projects</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Delivered steel structures to over 30 countries across 5 continents
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href="/projects"
              className="group block"
            >
              <div
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                {/* Project photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`/images/projects/project-${String(i + 1).padStart(2, '0')}.webp`}
                    alt={project.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Location badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-black/30 backdrop-blur">
                      {project.location}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-steel-accent transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-steel-accent" />
                    <span className="text-sm text-gray-500">{project.type}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-steel-accent border border-steel-accent/20 rounded-lg hover:bg-steel-accent hover:text-white transition-all"
          >
            View all projects
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

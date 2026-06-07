import { CheckCircle, ArrowRight } from "lucide-react";

const certificates = [
  "CE Certified",
  "ISO 9001",
  "IAF Verified",
  "Made-in-China",
  "Supplier Assessed",
];

const factoryStats = [
  { label: "Location", value: "Shangqiu, Henan, China" },
  { label: "Area", value: "20,000+ sqm" },
  { label: "Lines", value: "5 Production Lines" },
  { label: "Workers", value: "200+ Skilled Staff" },
];

export default function Factory() {
  return (
    <section id="certificates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Factory image + stats */}
          <div>
            <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
              Our Facility
            </p>
            <h2 className="text-3xl font-bold text-steel mb-6">
              State-of-the-Art Manufacturing Plant
            </h2>

            <div className="relative rounded-2xl overflow-hidden group mb-6">
              <img
                src="/images/factory-workshop.webp"
                alt="Steel structure factory workshop"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-black/40 backdrop-blur">
                  Shangqiu Factory
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {factoryStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-section rounded-xl p-3.5 hover:bg-steel-muted transition-colors"
                >
                  <div className="text-xs text-gray-400 font-medium mb-0.5">{stat.label}</div>
                  <div className="text-sm font-semibold text-steel">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications */}
          <div>
            <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
              Quality Assurance
            </p>
            <h2 className="text-3xl font-bold text-steel mb-6">
              International Certifications
            </h2>

            <div className="space-y-3 mb-8">
              {certificates.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-green-badge-bg/50 border border-green-100 hover:border-green-200 hover:shadow-sm transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-green-badge shrink-0" />
                  <span className="text-sm font-semibold text-gray-800">{cert}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">
              Every product undergoes rigorous quality inspection throughout production — from
              raw material sourcing to final surface treatment. Our certifications ensure your
              project meets the strictest international standards.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="/certificates"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-steel to-steel-light rounded-lg hover:shadow-md transition-all"
              >
                View All Certificates
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-steel bg-steel-muted rounded-lg hover:bg-gray-200 transition-all"
              >
                About Our Factory
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

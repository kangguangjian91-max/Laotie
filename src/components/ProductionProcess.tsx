import { Scissors, Wrench, Flame, Ruler, SprayCan, ChevronRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Material Cutting",
    desc: "CNC plasma & flame cutting to precision dimensions (±1mm tolerance).",
    icon: Scissors,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    step: "02",
    title: "Assembly",
    desc: "Automatic H-beam assembly — web, flange & stiffeners positioned by CNC.",
    icon: Wrench,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    step: "03",
    title: "Welding",
    desc: "Submerged arc welding (SAW) by certified welders, 100% UT tested.",
    icon: Flame,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    step: "04",
    title: "Straightening",
    desc: "H-beam straightening to ≤1/1000 tolerances via hydraulic correction.",
    icon: Ruler,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    step: "05",
    title: "Shot Blasting & Painting",
    desc: "SA 2.5 surface treatment, epoxy/zinc-rich primer, finish coat applied.",
    icon: SprayCan,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function ProductionProcess() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,#1a365d_1px,transparent_0)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
            5-Step Quality Control
          </p>
          <h2 className="text-3xl font-bold text-steel">Production Process</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            From raw steel to finished structure — every step traced by tonnage, every batch inspected.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative group"
              style={{
                animationDelay: `${i * 0.12}s`,
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <div className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:border-steel-accent/20 hover:shadow-lg hover:shadow-steel-accent/5 transition-all duration-300 h-full">
                {/* Step number badge */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-steel text-white text-sm font-bold mb-4">
                  {s.step}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.bg} mb-3 group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>

                <h3 className="font-semibold text-gray-900 text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>

                {/* Arrow connector for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 items-center process-connector">
                    <ChevronRight className="w-4 h-4 text-steel-accent/50" style={{ animationDelay: `${i * 0.3}s` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

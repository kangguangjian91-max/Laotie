import { Factory, Globe, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    value: "5,000T/mo",
    label: "Production Capacity",
    icon: TrendingUp,
    color: "text-steel-accent",
    bg: "bg-steel-muted",
  },
  {
    value: "15+ Years",
    label: "Industry Experience",
    icon: Award,
    color: "text-green-badge",
    bg: "bg-green-badge-bg",
  },
  {
    value: "30+",
    label: "Countries Exported",
    icon: Globe,
    color: "text-cta",
    bg: "bg-orange-50",
  },
  {
    value: "CE / ISO / IAF",
    label: "Certified",
    icon: Factory,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function Stats() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group py-8 px-4 text-center relative hover:bg-gray-50 transition-colors"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Divider between columns */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gray-100" />
              )}

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-3 group-hover:scale-110 transition-transform animate-count-up`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>

              {/* Value */}
              <div
                className="text-2xl sm:text-3xl font-bold text-steel mb-1 bg-gradient-to-r from-steel to-steel-light bg-clip-text text-transparent animate-count-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

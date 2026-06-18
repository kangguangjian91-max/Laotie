// Server Component - no 'use client' to ensure static HTML renders correct values
import { Factory, Globe, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    value: "5,000+",
    label: "Tons/Month Capacity",
    icon: TrendingUp,
    color: "text-white",
    bg: "bg-white/10",
    href: "/about",
  },
  {
    value: "15+",
    label: "Years Experience",
    icon: Award,
    color: "text-white",
    bg: "bg-white/10",
    href: "/about",
  },
  {
    value: "30+",
    label: "Countries Exported",
    icon: Globe,
    color: "text-white",
    bg: "bg-white/10",
    href: "/projects",
  },
  {
    value: "200+",
    label: "Projects Completed",
    icon: Factory,
    color: "text-white",
    bg: "bg-white/10",
    href: "/projects",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#1B3A6B] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group py-12 px-4 text-center relative hover:bg-white/5 transition-colors cursor-pointer block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Divider between columns */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/20" />
              )}

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bg} mb-4 group-hover:scale-110 transition-transform`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>

              {/* Value - static render for SEO, no flash of "0" */}
              <div
                className="text-4xl sm:text-5xl font-bold text-white mb-2"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm text-white/70 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

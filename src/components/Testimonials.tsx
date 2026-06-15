import { Star, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "John Mwangi",
    company: "Premier Logistics Ltd.",
    country: "Kenya",
    flag: "🇰🇪",
    content:
      "Laotie Steel delivered our 2,000㎡ warehouse structure on time and on budget. The CNC cutting precision was impressive — every connection fit perfectly on-site. We've already placed our second order.",
    rating: 5,
    project: "Logistics Warehouse — 2,000㎡",
  },
  {
    name: "Carlos Gutierrez",
    company: "AgroIndustrial S.A.",
    country: "Peru",
    flag: "🇵🇪",
    content:
      "We compared 6 suppliers from China and Turkey. Laotie gave us the best balance of price and quality. Their engineering team provided full structural calculations compliant with Peruvian seismic codes.",
    rating: 5,
    project: "Processing Plant — Space Frame Roof",
  },
  {
    name: "Sarah Chen",
    company: "Pacific Trade Co.",
    country: "Australia",
    flag: "🇦🇺",
    content:
      "The AS/NZS compliance documentation was thorough. Our local engineer approved everything without revisions. Laotie's Shenzhen office made communication seamless despite the time difference.",
    rating: 5,
    project: "Industrial Shed — 1,500㎡",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Client Feedback
          </p>
          <h2 className="text-3xl font-bold text-steel mb-3">
            Trusted by Buyers Worldwide
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real feedback from real clients — 30+ countries and counting
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-section rounded-2xl p-6 border border-gray-100 hover:border-steel-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed text-sm flex-1 mb-5">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100">
                <div className="font-semibold text-steel text-sm">{t.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t.company}</div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                  <span>{t.flag}</span>
                  <MapPin className="w-3 h-3" />
                  <span>{t.country}</span>
                </div>
                <div className="mt-2 text-xs text-steel-accent font-medium">
                  {t.project}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note to user: replace with real testimonials */}
        <p className="text-center text-xs text-gray-400 mt-8">
          📝 Have a client review? Send it to us and we'll add it here!
        </p>
      </div>
    </section>
  );
}

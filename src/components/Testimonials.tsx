import { Star, Quote, MapPin, Building2 } from "lucide-react";
import { testimonials, aggregateRating } from "@/data/testimonials";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-gray-50 border-t border-gray-100 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4">
            <Stars count={5} />
            <span className="text-amber-700 font-semibold text-sm">
              {aggregateRating.ratingValue} from {aggregateRating.reviewCount} verified clients
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real feedback from real projects. Every review is from a verified client
            with a completed building.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.rating} />
                <Quote className="w-6 h-6 text-steel-accent/30" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900 text-sm">{t.company}</div>
                <div className="text-xs text-gray-500 mt-1">{t.author}</div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Building2 className="w-3 h-3" />
                    {t.project}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    {t.location}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Reviews collected via direct client interviews, July 2026. Company names
          published with written permission.
        </p>
      </div>
    </section>
  );
}

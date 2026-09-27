"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

type Props = {
  videoId: string;
  title: string;
  poster: string;
};

/**
 * Click-to-load YouTube embed (youtube-nocookie).
 * The iframe is only created after the user clicks, so it does not
 * affect page weight or Core Web Vitals on load.
 */
export default function OwnerVideoEmbed({ videoId, title, poster }: Props) {
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <div className="aspect-video relative">
        {!loaded ? (
          <>
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <button
              onClick={load}
              aria-label={`Play video: ${title}`}
              className="absolute inset-0 flex items-center justify-center group focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/50"
            >
              <span className="w-20 h-20 bg-[#FF6B00]/90 group-hover:bg-[#FF6B00] group-hover:scale-110 transition-all duration-300 rounded-full flex items-center justify-center shadow-[0_10px_36px_rgba(255,107,0,0.5)]">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
            <p className="absolute bottom-4 left-4 right-4 text-white text-sm sm:text-base font-semibold drop-shadow">
              {title}
            </p>
          </>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </div>
  );
}

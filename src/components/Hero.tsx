"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const videoId = "XQZuDgAT8JA";
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load video on click — converts thumbnail to YouTube iframe
  const loadVideo = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden min-h-[680px] sm:min-h-[720px] lg:min-h-[780px] flex items-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #0d2137 100%)' }}>
      {/* Animated Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(55,138,221,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255,107,0,0.1) 0%, transparent 50%)',
      }} />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* ===== Left: Text (5 cols) ===== */}
          <div className="lg:col-span-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-badge opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-badge shadow-[0_0_6px_rgba(29,158,117,0.5)]"></span>
              </span>
              <p className="text-[#7dd3fc] font-semibold text-xs tracking-[0.15em] uppercase">
                CE & ISO Certified Manufacturer
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] font-bold leading-[1.12] mb-5 text-white">
              <span className="block">Custom Steel Structures</span>
              <span className="block mt-1 bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#FF6B00] bg-clip-text text-transparent">
                Delivered Globally in 30 Days
              </span>
              <span className="block mt-1 text-gray-300 text-[0.65em] font-semibold">Factory Direct — Free Quote in 24h</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300/90 mb-7 leading-relaxed font-light">
              5,000T/Month Capacity · CE & ISO Certified · 30+ Countries Served
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://wa.me/8616650735555?text=Hi,%20I'm%20interested%20in%20steel%20structures.%20Please%20send%20me%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-9 py-4 text-base lg:text-lg font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl transition-all duration-300 shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_48px_rgba(37,211,102,0.6)] hover:-translate-y-1"
              >
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us Now
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 text-sm lg:text-base font-semibold text-white/90 border-2 border-white/30 hover:border-white/50 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Get Quote by Email
                <svg className="ml-1.5 w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Trust Indicators - Compact */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                <span className="text-white font-bold text-xs">CE</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                <span className="text-white font-bold text-xs">ISO 9001</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                <span className="text-white font-bold text-xs">SGS</span>
              </div>
            </div>

            {/* Social Proof - Compact */}
            <p className="mt-4 text-xs text-gray-400">
              <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse align-middle"></span>
              <span className="text-green-400 font-semibold text-xs">12+</span> quotes requested this month
            </p>
          </div>

          {/* ===== Right: Video / Thumbnail (7 cols) ===== */}
          <div className="lg:col-span-7 mt-8 lg:mt-0 relative">
            <div className="relative">
              {/* Glow effect behind video */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-3xl blur-xl" />

              {/* Video Container */}
              <div ref={containerRef} className="relative rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.45)] border-2 border-white/15 bg-black/60">
                <div className="aspect-video relative">

                  {!isVideoLoaded ? (
                    /* Thumbnail with Play Button - LCP optimized */
                    <>
                      {/* Local poster image as LCP - priority preloaded (was YouTube CDN, now local for stability) */}
                      <Image
                        src="/images/hero-poster.jpg"
                        alt="Laotie Steel Structure Factory Tour Video"
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority
                        className="object-cover"
                      />
                      {/* Play button overlay */}
                      <button
                        onClick={loadVideo}
                        className="absolute inset-0 flex items-center justify-center group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/50 rounded-sm"
                        aria-label="Play factory tour video"
                      >
                        <div className="w-20 h-20 bg-[#FF6B00]/90 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,107,0,0.5)] group-hover:bg-[#FF6B00] group-hover:scale-110 transition-all duration-300 group-active:scale-95">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        {/* Hover hint */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          Watch Factory Tour
                        </div>
                      </button>
                    </>
                  ) : (
                    /* Actual YouTube iframe - loads only after user clicks */
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&showinfo=0&controls=1&modestbranding=1`}
                      title="Laotie Steel Structure Factory Tour"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
              </div>

              {/* Video Caption */}
              <div className="mt-3 flex items-center justify-center gap-2 text-white/50 px-4">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                <span className="text-xs">Factory Tour — 5 Production Lines in Action</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#378ADD]/40 to-transparent" />
    </section>
  );
}

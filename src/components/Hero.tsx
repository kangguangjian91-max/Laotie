'use client'

import { useState } from 'react'

export default function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false)

  return (
    <section id="home" className="relative bg-steel overflow-hidden min-h-[680px] sm:min-h-[720px] lg:min-h-[780px] flex items-center">
      {/* ===== Background Image Layer ===== */}
      <div className="absolute inset-0">
        {/* Skeleton shimmer placeholder */}
        {!bgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1929] via-[#1a365d] to-[#0f2744]" />
        )}
        <img
          src="/images/hero-bg.webp"
          alt="Steel structure factory"
          fetchPriority="high"
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-out ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setBgLoaded(true)}
        />

        {/* ===== Multi-layer Gradient Overlay — cinematic depth ===== */}
        {/* Left dark gradient: gives text area breathing room */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/98 via-[#0d2137]/85 to-[#0d2137]/30" />
        {/* Bottom gradient: seamless transition to white content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/[.15] to-transparent" />
        {/* Top vignette: subtle darkening at edges for focus */}
        <div className="absolute inset-0 shadow-[inset_0_-80px_60px_rgba(255,255,255,.08),inset_0_40px_40px_rgba(0,0,0,.2)]" />
      </div>

      {/* ===== Atmospheric Light Effects ===== */}
      {/* Large soft glow behind the text area */}
      <div
        className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #378ADD 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Secondary warm accent glow (bottom right) */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, #e67e22 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* ===== Geometric Grid Pattern (subtle tech feel) ===== */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ===== Diagonal accent lines (architectural blueprint feel) ===== */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diagonal-lines" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="120" stroke="white" strokeWidth="0.8" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="white" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
      </svg>

      {/* ===== Floating Particles / Accent Dots ===== */}
      <div className="absolute top-[18%] right-[22%] w-2 h-2 rounded-full bg-[#378ADD]/50 animate-pulse-dot shadow-[0_0_10px_rgba(55,138,221,0.4)]" />
      <div className="absolute top-[35%] right-[35%] w-1.5 h-1.5 rounded-full bg-[#e67e22]/40 animate-pulse-dot shadow-[0_0_8px_rgba(230,126,34,0.3)]" style={{ animationDelay: '0.7s' }} />
      <div className="absolute bottom-[28%] right-[25%] w-1 h-1 rounded-full bg-white/30 animate-pulse-dot" style={{ animationDelay: '1.4s' }} />
      <div className="absolute top-[55%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#378ADD]/30 animate-pulse-dot" style={{ animationDelay: '2s' }} />

      {/* ===== Main Content ===== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-36 w-full">
        <div className="max-w-2xl lg:max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] mb-8 animate-fade-in-up hover:border-white/25 transition-colors group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-badge opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-badge shadow-[0_0_6px_rgba(29,158,117,0.5)]"></span>
            </span>
            <p className="text-[#7dd3fc] font-semibold text-xs tracking-[0.15em] uppercase">
              CE & ISO Certified Manufacturer
            </p>
          </div>

          {/* Headline */}
          <h1
            className="text-[2.5rem] sm:text-4xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold leading-[1.08] mb-6 animate-fade-in-up animation-delay-100 tracking-tight"
          >
            <span className="block text-white">Your Trusted</span>
            <span className="block mt-1 bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#e67e22] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(55,138,221,0.25)]">
              Steel Structure Partner
            </span>
            <span className="block mt-1 text-gray-300 text-[0.65em] font-semibold">in China</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300/90 mb-10 leading-relaxed animate-fade-in-up animation-delay-200 font-light max-w-lg">
            5 Production Lines &middot; 5,000T/Month Capacity &middot; Factory Direct Pricing
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-14 animate-fade-in-up animation-delay-300">
            <a
              href="/contact"
              className="group inline-flex items-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#e67e22] to-orange-600 hover:from-[#d35400] hover:to-orange-700 rounded-lg transition-all duration-300 shadow-[0_4px_24px_rgba(230,126,34,0.35)] hover:shadow-[0_8px_36px_rgba(230,126,34,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Request a Free Quote
              <svg className="ml-2.5 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-6H6" />
              </svg>
            </a>
            <a
              href="/products"
              className="inline-flex items-center px-7 py-4 text-base font-semibold text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-lg transition-all duration-300 backdrop-blur-sm group"
            >
              Explore Products
              <svg className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trust Indicators — elevated card style */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 animate-fade-in-up animation-delay-400 max-w-md">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '30+', label: 'Countries Served' },
              { value: '5K', label: 'Tons/Month Capacity' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center sm:items-start p-3 sm:p-4 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.07] hover:bg-white/[0.09] hover:border-white/12 transition-all group"
              >
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent group-hover:from-[#7dd3fc] group-hover:to-[#38bdf8] transition-all">
                  {item.value}
                </span>
                <span className="text-[11px] sm:text-xs text-gray-400 mt-0.5 tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Bottom fade gradient ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />

      {/* ===== Decorative bottom line ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#378ADD]/40 to-transparent" />
    </section>
  )
}

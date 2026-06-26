export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-[680px] sm:min-h-[720px] lg:min-h-[780px] flex items-center" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #0d2137 100%)' }}>
      {/* ===== Animated Gradient Background ===== */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(55,138,221,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255,107,0,0.1) 0%, transparent 50%)',
      }} />

      {/* ===== Grid Pattern Overlay ===== */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ===== Bottom Gradient (transition to white) ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />

      {/* ===== Main Content ===== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-36 w-full">
        <div className="max-w-2xl lg:max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] mb-8">
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
            className="text-[2.5rem] sm:text-4xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold leading-[1.08] mb-6 text-white"
          >
            <span className="block">Custom Steel Structures</span>
            <span className="block mt-1 bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#FF6B00] bg-clip-text text-transparent">
              Delivered Globally in 30 Days
            </span>
            <span className="block mt-1 text-gray-300 text-[0.65em] font-semibold">Factory Direct Pricing — Get a Free Quote in 24h</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300/90 mb-10 leading-relaxed font-light max-w-lg">
            5,000T/Month Production Capacity &middot; 15+ Years Experience &middot; CE & ISO Certified
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="/contact"
              className="group inline-flex items-center px-10 py-5 text-lg font-bold text-white bg-[#FF6B00] hover:bg-[#e55a00] rounded-xl transition-all duration-300 shadow-[0_8px_32px_rgba(255,107,0,0.4)] hover:shadow-[0_12px_48px_rgba(255,107,0,0.6)] hover:-translate-y-1"
            >
              Request a Free Quote
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white/90 border-2 border-white/30 hover:border-white/50 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Explore Products
              <svg className="ml-2 w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Trusted & Certified By</p>
            <div className="flex items-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <span className="text-white font-bold text-sm">CE</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <span className="text-white font-bold text-sm">ISO 9001</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <span className="text-white font-bold text-sm">SGS</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-6">
            <p className="text-sm text-gray-400">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-green-400 font-semibold">12+</span> companies requested quotes this month
            </p>
            <p className="text-xs text-gray-500 mt-1">Usually reply within 24 hours</p>
          </div>
        </div>
      </div>

      {/* ===== Decorative bottom line ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#378ADD]/40 to-transparent" />
    </section>
  )
}

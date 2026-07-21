"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackOutboundLink, trackLandingPageView } from "@/lib/gtag";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Manufacturing", href: "/manufacturing-process" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Certificates", href: "/certificates" },
  { label: "FAQ", href: "/faq" },
];

const globalLinks = [
  { label: "Philippines", href: "/steel-structure-philippines", flag: "🇵🇭", disabled: false },
  { label: "Vietnam", href: "/steel-structure-vietnam", flag: "🇻🇳", disabled: false },
  { label: "Indonesia", href: "/steel-structure-indonesia", flag: "🇮🇩", disabled: false },
  { label: "Thailand", href: "/steel-structure-thailand", flag: "🇹🇭", disabled: false },
  { label: "India", href: "/steel-structure-india", flag: "🇮🇳", disabled: false },
  { label: "Saudi Arabia", href: "/steel-structure-saudi-arabia", flag: "🇸🇦", disabled: false },
  { label: "UAE", href: "/steel-structure-uae", flag: "🇦🇪", disabled: false },
  { label: "Nigeria", href: "/steel-structure-nigeria", flag: "🇳🇬", disabled: false },
  { label: "Australia", href: "/steel-structure-australia", flag: "🇦🇺", disabled: false },
  { label: "Brazil", href: "/steel-structure-brazil", flag: "🇧🇷", disabled: false },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);
  const pathname = usePathname();
  const globalRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (globalRef.current && !globalRef.current.contains(event.target as Node)) {
        setGlobalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setGlobalOpen(false);
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-steel to-steel-light flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <span className="text-steel font-bold text-xl tracking-tight">
              LAOTIE
            </span>
            <span className="hidden sm:inline text-gray-500 text-sm font-medium">
              Steel Structure
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  isActive(item.href)
                    ? "text-steel bg-steel/5"
                    : "text-gray-600 hover:text-steel"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-steel-accent rounded-full group-hover:w-4 transition-all duration-300" />
              </a>
            ))}
            
            {/* Global Dropdown */}
            <div className="relative" ref={globalRef} onMouseLeave={() => setGlobalOpen(false)}>
              <button
                onMouseEnter={() => setGlobalOpen(true)}
                onClick={() => setGlobalOpen(!globalOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-steel rounded-lg transition-colors group"
                aria-expanded={globalOpen}
                aria-haspopup="true"
              >
                <span>🌍</span> Global
                <svg className={`w-3.5 h-3.5 transition-transform ${globalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {globalOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in"
                  onMouseEnter={() => setGlobalOpen(true)}
                >
                  {globalLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-gray-700 hover:bg-gray-50 hover:text-steel"
                      onClick={(e) => {
                        // Track landing page view
                      const countryMap: Record<string, string> = {
                        '/steel-structure-philippines': 'philippines',
                        '/steel-structure-vietnam': 'vietnam',
                        '/steel-structure-indonesia': 'indonesia',
                        '/steel-structure-nigeria': 'nigeria',
                        '/steel-structure-thailand': 'thailand',
                        '/steel-structure-australia': 'australia',
                        '/steel-structure-india': 'india',
                        '/steel-structure-uae': 'uae',
                        '/steel-structure-brazil': 'brazil',
                      };
                      const country = countryMap[link.href];
                      if (country) {
                        trackLandingPageView(country, country as any);
                      }
                      setGlobalOpen(false);
                      }}
                    >
                      <span className="text-base">{link.flag}</span>
                      <span className="flex-1">{link.label}</span>
                      {link.disabled && (
                        <span className="text-xs text-gray-400">Soon</span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://hnltgjg.en.alibaba.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundLink("https://hnltgjg.en.alibaba.com/", "alibaba")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-steel hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.2 5.2c-1.6.8-2.9 2-3.7 3.5-.8-1.5-2.1-2.7-3.7-3.5C4.9 6.5 3 9.1 3 12c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.9-1.9-5.5-4.8-6.8z"/>
              </svg>
              Alibaba Store
            </a>
            <a
              href="https://wa.me/8616650735555?text=Hi,%20I'm%20interested%20in%20steel%20structures.%20Please%20send%20me%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutboundLink("https://wa.me/8616650735555", "whatsapp_header");
              }}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-steel rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-3 animate-fade-in" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "text-steel bg-gray-100"
                    : "text-gray-600 hover:text-steel hover:bg-gray-50"
                }`}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Global Links */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                🌍 Regional Pages
              </p>
              {globalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.disabled ? '#' : link.href}
                  onClick={(e) => {
                    if (link.disabled) {
                      e.preventDefault();
                    } else {
                      // Track landing page view
                      const countryMap: Record<string, string> = {
                        '/steel-structure-philippines': 'philippines',
                        '/steel-structure-vietnam': 'vietnam',
                        '/steel-structure-indonesia': 'indonesia',
                        '/steel-structure-nigeria': 'nigeria',
                        '/steel-structure-thailand': 'thailand',
                        '/steel-structure-australia': 'australia',
                        '/steel-structure-india': 'india',
                        '/steel-structure-uae': 'uae',
                        '/steel-structure-brazil': 'brazil',
                      };
                      const country = countryMap[link.href];
                      if (country) {
                        trackLandingPageView(country, country as any);
                      }
                    }
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                    link.disabled 
                      ? 'text-gray-400' 
                      : 'text-gray-600 hover:text-steel hover:bg-gray-50'
                  }`}
                >
                  <span>{link.flag}</span>
                  <span className="flex-1">{link.label}</span>
                  {link.disabled && (
                    <span className="text-xs text-gray-400">Soon</span>
                  )}
                </a>
              ))}
            </div>
            
            <a
              href="https://hnltgjg.en.alibaba.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutboundLink("https://hnltgjg.en.alibaba.com/", "alibaba");
                setOpen(false);
              }}
              className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-steel hover:bg-gray-50 rounded-lg transition-colors"
            >
              🛒 Alibaba Store
            </a>
            <a
              href="https://wa.me/8616650735555?text=Hi,%20I'm%20interested%20in%20steel%20structures.%20Please%20send%20me%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackOutboundLink("https://wa.me/8616650735555", "whatsapp_mobile");
                setOpen(false);
              }}
              className="block mt-2 mx-2 text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg"
            >
              WhatsApp Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

"use client";

import { trackWhatsAppClick, trackEmailClick, trackOutboundLink, trackLandingPageView } from "@/lib/gtag";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-steel-accent via-cta to-steel-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-steel-accent to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">LT</span>
              </div>
              <h3 className="text-white font-bold text-lg">LAOTIE</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Professional steel structure manufacturer based in Shangqiu, Henan, China.
              CE, ISO 9001, IAF, and Supplier-Assessed certified.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/products/steel-structure-building" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-1 h-0.5 bg-steel-accent rounded-full transition-all" />
                  Steel Structure Building
                </a>
              </li>
              <li>
                <a href="/products/floor-deck" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-1 h-0.5 bg-steel-accent rounded-full transition-all" />
                  Floor Deck / Steel Decking
                </a>
              </li>
              <li>
                <a href="/products/space-frame-truss" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-1 h-0.5 bg-steel-accent rounded-full transition-all" />
                  Space Frame / Roof Truss
                </a>
              </li>
              <li>
                <a href="/products/cladding-system" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span className="w-0 group-hover:w-1 h-0.5 bg-steel-accent rounded-full transition-all" />
                  Enclosure &amp; Cladding
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/certificates" className="hover:text-white transition-colors">Certificates</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://hnltgjg.en.alibaba.com/" target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundLink("https://hnltgjg.en.alibaba.com/", "alibaba")} className="hover:text-steel-accent transition-colors">Alibaba Store ↗</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Regional Offices */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              🌍 Regional Offices
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="/steel-structure-philippines" 
                  onClick={() => trackLandingPageView("philippines", "philippines")}
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-0 group-hover:w-1 h-0.5 bg-steel-accent rounded-full transition-all" />
                  🇵🇭 Philippines
                </a>
              </li>
              <li>
                <span className="text-gray-500 inline-flex items-center gap-1">
                  🇻🇳 Vietnam
                  <span className="text-xs">(Soon)</span>
                </span>
              </li>
              <li>
                <a 
                  href="/steel-structure-indonesia" 
                  onClick={() => trackLandingPageView("indonesia", "indonesia")}
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span className="w-0 group-hover:w-1 h-0.5 bg-steel-accent rounded-full transition-all" />
                  🇮🇩 Indonesia
                </a>
              </li>
              <li>
                <span className="text-gray-500 inline-flex items-center gap-1">
                  🇳🇬 Nigeria
                  <span className="text-xs">(Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-steel-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shangqiu, Henan, China
              </li>
              <li>
                <a
                  href="https://wa.me/8616650735555"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("footer")}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-steel-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp: +86 166-5073-5555
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-steel-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:kangguangjian91@gmail.com" 
                  onClick={() => trackEmailClick("footer")}
                  className="hover:text-white transition-colors"
                >
                  kangguangjian91@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-steel-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon - Sat, 8:00 - 18:00 CST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Laotie Steel Structure Co., Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="/certificates" className="hover:text-white transition-colors">Certificates</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
            {/* Social — LinkedIn: create company page at linkedin.com/company/laotie-steel-structure, then uncomment below */}
            {/* <a
              href="https://www.linkedin.com/company/laotie-steel-structure"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="Follow us on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.769v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.369 4.267 5.455v6.286zM5.337 7.433a2.18 2.18 0 01-2.182-2.18c0-1.205.977-2.182 2.182-2.182 1.205 0 2.182.977 2.182 2.182a2.18 2.18 0 01-2.182 2.18zM6.758 20.452H3.918V9h2.84v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

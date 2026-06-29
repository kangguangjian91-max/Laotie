import type { Metadata, Viewport } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

// Lazy load non-critical client components (reduces initial JS bundle)
const CookieConsent = dynamic(() => import("@/components/CookieConsent"));
const WhatsAppFloatingButton = dynamic(() => import("@/components/WhatsAppFloatingButton"));
const FloatingCTA = dynamic(() => import("@/components/FloatingCTA"));
const ServiceWorkerRegistration = dynamic(() => import("@/components/ServiceWorkerRegistration"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Laotie Steel Structure Co., Ltd.",
  url: "https://www.laotie-steel.com",
  logo: "https://www.laotie-steel.com/favicon.png",
  description:
    "CE & ISO certified steel structure manufacturer in China. 5 production lines, 5,000T/month capacity. Portal frames, floor deck, space frames, cladding.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shangqiu",
    addressRegion: "Henan",
    addressCountry: "CN",
  },
  department: [
    {
      "@type": "Organization",
      name: "Head Office",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shenzhen",
        addressRegion: "Guangdong",
        addressCountry: "CN",
      },
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+86-166-5073-5555",
      availableLanguage: ["English", "Chinese"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "kangguangjian91@gmail.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
  sameAs: ["https://hnltgjg.en.alibaba.com/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Laotie Steel Structure",
  url: "https://www.laotie-steel.com",
  description:
    "CE & ISO certified steel structure manufacturer. Factory direct pricing, 5,000T/month capacity. Export to 30+ countries.",
};

const siteUrl = "https://www.laotie-steel.com";
const siteName = "Laotie Steel Structure";
const defaultTitle = "Trusted Steel Structure Manufacturer in China — Factory Direct";
const defaultDescription =
  "CE & ISO certified steel manufacturer in China. 5 production lines, 5,000T/month. Portal frames, floor deck, space frames & cladding. Factory direct pricing.";
const ogImage = `${siteUrl}/images/og-image.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "steel structure manufacturer China",
    "steel building factory",
    "floor deck manufacturer",
    "portal frame supplier",
    "space frame structure",
    "steel cladding",
    "CE certified steel structure",
    "ISO steel factory",
  ],
  authors: [{ name: "Laotie Steel Structure Co., Ltd." }],
  creator: "Laotie Steel Structure",
  publisher: "Laotie Steel Structure",
  robots: { index: true, follow: true },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    other: [
      { rel: "icon", url: "/favicon.ico", sizes: "any" },
    ],
  },
  // Open Graph
  openGraph: {
    type: "website",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Laotie Steel Structure — CE & ISO Certified Steel Manufacturer",
      },
    ],
    locale: "en_US",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
    site: "@laotie_steel",
    creator: "@laotie_steel",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e3a5f" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a5f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Hreflang tags for international SEO */}
        <link rel="alternate" hrefLang="en" href="https://www.laotie-steel.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.laotie-steel.com" />
        <link rel="alternate" hrefLang="en-TH" href="https://www.laotie-steel.com/steel-structure-thailand" />
        <link rel="alternate" hrefLang="en-VN" href="https://www.laotie-steel.com/steel-structure-vietnam" />
        <link rel="alternate" hrefLang="en-ID" href="https://www.laotie-steel.com/steel-structure-indonesia" />
        <link rel="alternate" hrefLang="en-PH" href="https://www.laotie-steel.com/steel-structure-philippines" />
        <link rel="alternate" hrefLang="en-NG" href="https://www.laotie-steel.com/steel-structure-nigeria" />
        <link rel="alternate" hrefLang="en-SA" href="https://www.laotie-steel.com/steel-structure-saudi-arabia" />
        {/* Microsoft Clarity — free user behavior analytics (Hotjar alternative) */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag.js";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x7yig39zln");
            `,
          }}
        />
        {/* Google Consent Mode v2 — GA4 lazy loads to reduce render blocking */}
        <Script
          id="ga4-consent-mode"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              gtag('js', new Date());
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-74QWNLKHEH';
              s.onload = function() {
                gtag('config', 'G-74QWNLKHEH', {
                  transport_type: 'beacon',
                  anonymize_ip: true
                });
              };
              document.head.appendChild(s);
            `,
          }}
        />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <meta
          name="google-site-verification"
          content="5KqpO4dMQBfGbZFqadCEqcbNzXNCCaVc9WMje2NcEuE"
        />
        {/* Performance: preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Critical CSS for instant FCP - minimal above-the-fold styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *,*::before,*::after{box-sizing:border-box}
            body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1a202c;-webkit-text-size-adjust:100%}
            .bg-steel{background-color:#1a365d}.text-white{color:#fff}
            img{max-width:100%;height:auto}
          `
        }} />
      </head>
      <body className="antialiased">
        {/* Skip to main content - accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ServiceWorkerRegistration />
        <main id="main-content">
        {children}
        </main>
        <CookieConsent />
        <WhatsAppFloatingButton />
        <FloatingCTA />
      </body>
    </html>
  );
}

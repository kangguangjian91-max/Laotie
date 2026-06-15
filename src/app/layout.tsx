import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import FloatingCTA from "@/components/FloatingCTA";

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
      email: "kangguangjian91@gmail.com",
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
const defaultTitle = "Trusted Steel Structure Manufacturer in China — Factory Direct Pricing";
const defaultDescription =
  "Laotie Steel Structure — CE & ISO certified steel structure manufacturer in China. 5 production lines, 5,000T/month capacity. Portal frames, floor deck, space frames, cladding. Factory direct pricing. Get a quote today.";
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
        {/* Google Consent Mode v2 — GA4 loads after interactive to reduce TBT */}
        <Script
          id="ga4-consent-mode"
          strategy="afterInteractive"
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
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload critical images with highest priority */}
        <link rel="preload" as="image" href="/images/hero-bg-mobile.webp" fetchPriority="high" crossOrigin="anonymous" />
        {/* Font optimization - system fonts with fallback */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Font loading optimization */
            @font-face {
              font-family: 'System';
              src: local('Segoe UI'), local('Roboto'), local('Helvetica Neue'), local('Arial');
              font-display: swap;
            }
          `
        }} />
        {/* Apple mobile web app optimization */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Critical CSS for faster FCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *, *::before, *::after { box-sizing: border-box; }
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; color: #1a202c; -webkit-text-size-adjust: 100%; }
            .bg-steel { background-color: #1a365d; }
            .text-white { color: #fff; }
            img { max-width: 100%; height: auto; }
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

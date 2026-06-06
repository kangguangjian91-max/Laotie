import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OldTie Steel Structure Co., Ltd.",
  url: "https://www.oldtie-steel.com",
  logo: "https://www.oldtie-steel.com/favicon.png",
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
  name: "OldTie Steel Structure",
  url: "https://www.oldtie-steel.com",
  description:
    "CE & ISO certified steel structure manufacturer. Factory direct pricing, 5,000T/month capacity. Export to 30+ countries.",
};

const siteUrl = "https://www.oldtie-steel.com";
const siteName = "OldTie Steel Structure";
const defaultTitle = "OldTie Steel Structure | Trusted Steel Manufacturer in China";
const defaultDescription =
  "OldTie Steel Structure — CE & ISO certified steel structure manufacturer in China. 5 production lines, 5,000T/month capacity. Portal frames, floor deck, space frames, cladding. Factory direct pricing. Get a quote today.";
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
  authors: [{ name: "OldTie Steel Structure Co., Ltd." }],
  creator: "OldTie Steel Structure",
  publisher: "OldTie Steel Structure",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
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
        alt: "OldTie Steel Structure — CE & ISO Certified Steel Manufacturer",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {/*
          GA4 and Clarity scripts are loaded dynamically
          by CookieConsent after user grants analytics consent.
          This ensures GDPR compliance.
        */}
      </head>
      <body className="antialiased">
        {children}
        <CookieConsent />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificatesClient from "./CertificatesClient";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

const certificatesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Steel Structure Certifications",
  description: "Laotie Steel certifications: ISO 9001, CE (EN 1090), IAF, Supplier Assessment, and AWS welding.",
  url: "https://www.laotie-steel.com/certificates",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ISO 9001:2015 Quality Management" },
    { "@type": "ListItem", position: 2, name: "CE EN 1090-1 Structural Steel Certification" },
    { "@type": "ListItem", position: 3, name: "IAF International Accreditation Forum" },
    { "@type": "ListItem", position: 4, name: "AWS D1.1 Certified Welders" },
    { "@type": "ListItem", position: 5, name: "Supplier Assessment (3rd Party Verified)" },
  ],
};

export const metadata: Metadata = {
  title: "Steel Structure Certifications | CE, ISO 9001, IAF Certified",
  keywords: [
    "steel structure certification",
    "CE EN 1090 certificate",
    "ISO 9001 steel manufacturer",
    "steel structure quality certification",
    "AWS welding certification steel",
    "IAF certified steel fabricator",
    "EN 1090-1 steel structure",
    "steel building quality assurance",
  ],
  description:
    "Laotie Steel certifications: ISO 9001, CE (EN 1090), IAF, Supplier Assessment, and AWS welding. Quality assured for global projects.",
  openGraph: {
    title: "Certificates & Certifications | Laotie",
    description:
      "ISO 9001, CE, IAF, Supplier Assessment, AWS Certified Welders. Quality assured for your steel structure project.",
    images: [
      {
        url: "https://www.laotie-steel.com/images/og-image.webp",
        width: 1200,
        height: 630,
      },
    ],
    url: "https://www.laotie-steel.com/certificates",
    siteName: "Laotie Steel Structure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificates & Certifications | Laotie",
    description:
      "ISO 9001, CE, IAF, Supplier Assessment, AWS Certified Welders. Quality assured for your steel structure project.",
    images: ["https://www.laotie-steel.com/images/og-image.webp"],
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <>
      <JsonLd data={certificatesSchema} />
      <Header />
      <CertificatesClient />
      <Footer />
    </>
  );
}

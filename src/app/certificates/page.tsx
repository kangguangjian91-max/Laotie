import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificatesClient from "./CertificatesClient";
import type { Metadata } from "next";

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
    url: "https://www.laotie-steel.com/certificates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificates & Certifications | Laotie",
    description:
      "ISO 9001, CE, IAF, Supplier Assessment, AWS Certified Welders. Quality assured for your steel structure project.",
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <>
      <Header />
      <CertificatesClient />
      <Footer />
    </>
  );
}

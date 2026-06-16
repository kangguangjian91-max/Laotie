import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificatesClient from "./CertificatesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates & Certifications",
  description:
    "View Laotie Steel Structure's certifications: ISO 9001, CE (EN 1090), IAF, Supplier Assessment, and AWS welding certifications. Quality assured for global projects.",
  openGraph: {
    title: "Certificates & Certifications | Laotie",
    description:
      "ISO 9001, CE, IAF, Supplier Assessment, AWS Certified Welders. Quality assured for your steel structure project.",
    url: "https://www.laotie-steel.com/certificates",
    type: "website",
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

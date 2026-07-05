import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import JsonLd from "@/components/JsonLd";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Steel Structure Insights & Guides",
  description: "Expert articles on steel structure design, cost, importing from China, certifications, and factory production.",
  url: "https://www.laotie-steel.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
};

export const metadata: Metadata = {
  title: "Blog | Steel Structure Insights & Guides",
  description:
    "Expert articles on steel structure design, cost, importing from China, certifications, and factory production. Stay informed with Laotie Steel Structure.",
  keywords: [
    "steel structure blog",
    "steel structure cost guide",
    "warehouse construction guide",
    "steel building design",
    "import steel from China",
    "steel structure installation",
    "portal frame design",
    "steel structure maintenance",
    "steel structure vs concrete",
    "factory building guide",
  ],
  openGraph: {
    title: "Steel Structure Blog | Expert Guides & Industry Insights",
    description:
      "Expert articles on steel structure design, cost, importing from China, certifications, and factory production.",
    images: [
      {
        url: "https://www.laotie-steel.com/images/og-image.webp",
        width: 1200,
        height: 630,
      },
    ],
    url: "https://www.laotie-steel.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Blog | Expert Guides & Industry Insights",
    description:
      "Expert articles on steel structure design, cost, importing from China, certifications, and factory production.",
    images: ["https://www.laotie-steel.com/images/og-image.webp"],
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <BlogClient />
    </>
  );
}

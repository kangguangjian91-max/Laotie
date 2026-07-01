import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Steel Structure Insights & Guides",
  description:
    "Expert articles on steel structure design, cost, importing from China, certifications, and factory production. Stay informed with Laotie Steel Structure.",
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
  return <BlogClient />;
}

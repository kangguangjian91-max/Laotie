import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Structure Projects | Warehouse, Factory & Sports Hall Cases",
  description:
    "Browse our steel structure project portfolio: industrial warehouses, factory buildings, aircraft hangars, and logistics centers delivered to 30+ countries. Get inspired for your next project.",
  keywords: [
    "steel structure projects",
    "warehouse construction examples",
    "factory building portfolio",
    "steel structure case studies",
    "prefab building projects",
    "portal frame warehouse",
    "space frame projects",
    "steel building gallery",
  ],
  openGraph: {
    title: "Steel Structure Projects | Laotie Steel",
    description:
      "Real steel structure projects delivered to 30+ countries. See our portfolio of warehouses, factories, hangars, and more.",
    url: "https://www.laotie-steel.com/projects",
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/projects/hongxin-sports/hongxin-5.webp", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Projects | Laotie Steel",
    description: "Real steel structure projects delivered to 30+ countries.",
    images: ["/images/projects/hongxin-sports/hongxin-5.webp"],
  },
  alternates: { canonical: "https://www.laotie-steel.com/projects" },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

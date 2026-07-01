import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Steel Structure Project Cases | Warehouse, Factory, Sports Hall",
  description:
    "View our global steel structure project cases: industrial warehouses, factory buildings, aircraft hangars, dome roofs, and logistics centers. 50+ projects delivered across 30+ countries.",
  keywords: [
    "steel structure projects",
    "steel building case studies",
    "warehouse construction projects",
    "factory building projects",
    "steel structure portfolio",
    "industrial building projects",
    "steel structure Australia project",
    "steel structure Nigeria project",
    "steel structure Philippines project",
  ],
  openGraph: {
    title: "Steel Structure Project Cases | Laotie Steel",
    description:
      "50+ steel structure projects delivered to 30+ countries. See our warehouse, factory, hangar, and logistics center case studies.",
    images: ["/images/projects/project-04.webp"],
    type: "website",
  },
  alternates: { canonical: "https://www.laotie-steel.com/projects" },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Project Cases | Laotie Steel",
    description:
      "50+ steel structure projects delivered to 30+ countries. See our warehouse, factory, hangar, and logistics center case studies.",
    images: ["/images/projects/project-04.webp"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}

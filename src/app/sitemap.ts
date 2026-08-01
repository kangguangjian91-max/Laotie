import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/blog";
import { getAllProductSlugs } from "@/data/products";
import { projectDetails } from "@/data/projects-detail";

// Force static generation for static export
export const dynamic = "force-static";

const siteUrl = "https://www.laotie-steel.com";

// Fixed lastModified date — avoids every build showing "just modified"
// which causes Google to potentially ignore lastModified signals
const lastModified = new Date("2026-07-31");

// Country-specific landing pages
const countryRoutes = [
  "/steel-structure-thailand",
  "/steel-structure-vietnam",
  "/steel-structure-indonesia",
  "/steel-structure-philippines",
  "/steel-structure-nigeria",
  "/steel-structure-saudi-arabia",
  "/steel-structure-australia",
  "/steel-structure-india",
  "/steel-structure-uae",
  "/steel-structure-brazil",
  "/steel-structure-price-guide",
];

const staticRoutes = [
  "",
  "/calculator",
  "/manufacturing-process",
  "/products",
  "/projects",
  "/blog",
  "/about",
  "/contact",
  "/certificates",
  "/privacy",
  "/terms",
  "/faq",
  "/steel-structure-logistics-center",
  ...countryRoutes,
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/products" || route === "/contact" ? 0.9 : 0.8,
  }));

  // Product detail pages (dynamic from data source)
  const productSlugs = getAllProductSlugs();
  const productEntries = productSlugs.map((slug) => ({
    url: `${siteUrl}/products/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog detail pages (dynamic from data source)
  const blogSlugs = getAllSlugs();
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Project detail pages (dynamic from projectDetails)
  const projectSlugs = Object.keys(projectDetails);
  const projectEntries = projectSlugs.map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries, ...projectEntries];
}

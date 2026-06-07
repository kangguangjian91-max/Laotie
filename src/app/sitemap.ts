import type { MetadataRoute } from "next";

// Force static generation for static export
export const dynamic = "force-static";

const siteUrl = "https://oldtie-steel.netlify.app";

const staticRoutes = [
  "",
  "/products",
  "/projects",
  "/blog",
  "/about",
  "/contact",
  "/certificates",
  "/privacy",
  "/terms",
  "/faq",
];

const productSlugs = [
  "steel-structure-building",
  "floor-deck",
  "space-frame-truss",
  "cladding-system",
];

const blogSlugs = [
  "why-choose-chinese-steel-structure-manufacturer",
  "portal-frame-vs-space-frame",
  "steel-structure-cost-guide-2025",
  "ce-iso-certified-steel-structures",
  "import-steel-structures-from-china-guide",
  "factory-tour-5000-tons-monthly-production",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/products" || route === "/contact" ? 0.9 : 0.8,
  }));

  // Product detail pages
  const productEntries = productSlugs.map((slug) => ({
    url: `${siteUrl}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog detail pages
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}

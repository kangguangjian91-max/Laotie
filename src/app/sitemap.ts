import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/blog";
import { getAllProductSlugs } from "@/data/products";

// Force static generation for static export
export const dynamic = "force-static";

const siteUrl = "https://www.laotie-steel.com";

const staticRoutes = [
  "",
  "/calculator",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/products" || route === "/contact" ? 0.9 : 0.8,
  }));

  // Product detail pages (dynamic from data source)
  const productSlugs = getAllProductSlugs();
  const productEntries = productSlugs.map((slug) => ({
    url: `${siteUrl}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog detail pages (dynamic from data source)
  const blogSlugs = getAllSlugs();
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}

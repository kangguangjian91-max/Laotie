import type { MetadataRoute } from "next";

// Force static generation for static export
export const dynamic = "force-static";

const siteUrl = "https://www.laotie-steel.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/private/",
          "/thank-you/",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/private/", "/thank-you/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/private/", "/thank-you/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/private/", "/thank-you/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/private/", "/thank-you/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/private/", "/thank-you/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/private/", "/thank-you/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

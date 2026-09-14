import type { MetadataRoute } from "next";

// Force static generation for static export
export const dynamic = "force-static";

const siteUrl = "https://www.laotie-steel.com";

// Paths that must never be crawled by anyone.
const protectedPaths = ["/api/", "/private/", "/thank-you/"];

// AI search & assistant crawlers — explicitly allowed (updated 2026-09-14).
// Rationale: B2B buyers increasingly research and vet suppliers through AI
// assistants (ChatGPT, Claude, Perplexity, Google AI Overviews). Blocking any
// of these crawlers removes the site from that decision path entirely.
const aiCrawlers = [
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  // Google AI (Gemini / AI Overviews / Vertex)
  "Google-Extended",
  "Google-CloudVertexBot",
  // Apple Intelligence / Siri
  "Applebot",
  "Applebot-Extended",
  // Amazon
  "Amazonbot",
  // DuckDuckGo AI
  "DuckAssistBot",
  // ByteDance / Doubao
  "Bytespider",
  // Common Crawl & other model providers
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedPaths,
      },
      // NOTE: a user-agent group overrides the "*" group entirely, so every
      // AI crawler needs its own copy of the sensitive-path rules.
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: protectedPaths,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

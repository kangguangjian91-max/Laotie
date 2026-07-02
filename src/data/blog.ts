/**
 * Blog data — optimized version
 * 
 * Build time (SSG): reads JSON files from public/data/blog/
 * Runtime (client): fetches from /data/blog/ URLs
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  image: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const DATA_DIR = join(process.cwd(), 'public/data/blog');

// Build-time helpers for SSG (generateStaticParams, generateMetadata)
function getBlogList(): BlogPostMeta[] {
  const listPath = join(DATA_DIR, 'blog-list.json');
  if (!existsSync(listPath)) return [];
  const raw = readFileSync(listPath, 'utf-8');
  return JSON.parse(raw);
}

function getBlogPost(slug: string): BlogPost | undefined {
  const postPath = join(DATA_DIR, `${slug}.json`);
  if (!existsSync(postPath)) return undefined;
  const raw = readFileSync(postPath, 'utf-8');
  return JSON.parse(raw);
}

/** Get all post metadata sorted by date desc (for listing pages) */
export function getAllPosts(): BlogPostMeta[] {
  return getBlogList().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get a single full post by slug (for [slug] pages) */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPost(slug);
}

/** Get all slugs (for generateStaticParams + sitemap) */
export function getAllSlugs(): string[] {
  return getBlogList().map(p => p.slug);
}

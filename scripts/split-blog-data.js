/**
 * Split blog.ts data into JSON files
 * Handles template literals and nested objects
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BLOG_TS_PATH = join(process.cwd(), 'src/data/blog.ts');
const OUTPUT_DIR = join(process.cwd(), 'public/data/blog');

const content = readFileSync(BLOG_TS_PATH, 'utf-8');
const startMarker = 'export const blogPosts: BlogPost[] = ';
const idx = content.indexOf(startMarker);
if (idx === -1) {
  console.error('Could not find blogPosts export');
  process.exit(1);
}

// Parse the array manually handling template literals
let pos = idx + startMarker.length;
let depth = 0;
let inTemplate = false;
let result = '';

while (pos < content.length) {
  const ch = content[pos];
  
  if (ch === '`' && !inTemplate) {
    inTemplate = true;
    result += ch;
    pos++;
    continue;
  }
  
  if (inTemplate) {
    if (ch === '\\' && pos + 1 < content.length && content[pos + 1] === '`') {
      result += ch + content[pos + 1];
      pos += 2;
      continue;
    }
    if (ch === '`') {
      inTemplate = false;
      result += ch;
      pos++;
      continue;
    }
    result += ch;
    pos++;
    continue;
  }

  if (ch === '[' || ch === '{') depth++;
  if (ch === ']' || ch === '}') depth--;
  result += ch;
  pos++;

  if (depth === 0) break;
}

// Evaluate the parsed string safely
const posts = new Function('return ' + result)();
console.log(`Found ${posts.length} blog posts`);

mkdirSync(OUTPUT_DIR, { recursive: true });

// Create lightweight list (no content)
const blogList = posts.map(({ content: _c, ...meta }) => meta);
writeFileSync(join(OUTPUT_DIR, 'blog-list.json'), JSON.stringify(blogList, null, 2));
console.log(`blog-list.json: ${(Buffer.byteLength(JSON.stringify(blogList)) / 1024).toFixed(0)}KB`);

// Create individual post files
for (const post of posts) {
  writeFileSync(join(OUTPUT_DIR, `${post.slug}.json`), JSON.stringify(post, null, 2));
}
console.log(`Created ${posts.length} post JSON files`);

// Types file
writeFileSync(
  join(process.cwd(), 'src/data/blog-types.ts'),
`export interface BlogPost {
  slug: string; title: string; description: string; date: string;
  category: string; readTime: string; content: string; image: string;
}
export interface BlogPostMeta {
  slug: string; title: string; description: string; date: string;
  category: string; readTime: string; image: string;
}
`
);
console.log('Created src/data/blog-types.ts');

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { getPostBySlug, getAllPosts, getAllSlugs, type BlogPost, type BlogPostMeta } from "@/data/blog";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

const siteUrl = "https://www.laotie-steel.com";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-steel mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-steel mt-10 mb-4">$1</h1>')
    // Images (must be before links to avoid conflict)
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<figure class="my-8 -mx-4 sm:mx-0"><img src="$2" alt="$1" class="w-full rounded-xl shadow-sm" loading="lazy" /><figcaption class="text-center text-xs text-gray-400 mt-2">$1</figcaption></figure>'
    )
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-steel-accent hover:underline">$1</a>')
    // Code inline
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-steel-accent rounded text-sm">$1</code>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    // Unordered lists - group consecutive items
    .replace(/((?:^- .+\n?)+)/gm, (match) => {
      const items = match.trim().split('\n')
        .filter(line => line.startsWith('- '))
        .map(line => `<li>${line.slice(2)}</li>`)
        .join('');
      return `<ul class="list-disc pl-6 my-4 space-y-1 text-gray-600">${items}</ul>`;
    })
    // Ordered lists
    .replace(/((?:^\d+\. .+\n?)+)/gm, (match) => {
      const items = match.trim().split('\n')
        .filter(line => /^\d+\./.test(line))
        .map(line => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`)
        .join('');
      return `<ol class="list-decimal pl-6 my-4 space-y-1 text-gray-600">${items}</ol>`;
    })
    // Tables
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/gm, (_, header, rows) => {
      const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean);
      const headerHtml = headers.map((h: string) => `<th class="border border-gray-200 px-4 py-2 text-left text-sm font-semibold bg-gray-50">${h}</th>`).join('');
      const bodyHtml = rows.trim().split('\n').map((row: string) => {
        const cells = row.split('|').map((c: string) => c.trim()).filter(Boolean);
        return `<tr>${cells.map((c: string) => `<td class="border border-gray-200 px-4 py-2 text-sm">${c}</td>`).join('')}</tr>`;
      }).join('');
      return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-gray-200 rounded-lg"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
    })
    // Checkboxes
    .replace(/- \[ \] (.+)/g, '<label class="flex items-center gap-2 my-1 text-gray-600"><input type="checkbox" class="rounded border-gray-300" disabled /> $1</label>')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">')
    // Wrap in initial paragraph
    .replace(/^/, '<p class="text-gray-600 leading-relaxed mb-4">')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p class="text-gray-600 leading-relaxed mb-4"><\/p>/g, '')
    // Remove trailing empty paragraph
    .replace(/<p class="text-gray-600 leading-relaxed mb-4">\s*$/, '');
}

function addInternalLinks(html: string): string {
  // Add links to internal pages for key phrases
  return html
    .replace(
      /(certified|CE certified|ISO 9001|quality management system)/gi,
      '<a href="/certificates" class="text-steel-accent hover:underline">$1</a>'
    )
    .replace(
      /(our factory|manufacturing plant|production facility|factory in Shangqiu)/gi,
      '<a href="/about" class="text-steel-accent hover:underline">$1</a>'
    )
    .replace(
      /(contact us|get a quote|free quote|get in touch)/gi,
      '<a href="/contact" class="text-steel-accent hover:underline">$1</a>'
    );
}

function getRelatedPosts(currentSlug: string, currentCategory: string): BlogPostMeta[] {
  const all = getAllPosts();
  // First: same category (excluding current post)
  const sameCategory = all.filter((p) => p.slug !== currentSlug && p.category === currentCategory);
  // Second: other categories
  const other = all.filter((p) => p.slug !== currentSlug && p.category !== currentCategory);
  // Sort both by date
  const sortByDate = (arr: BlogPostMeta[]) => arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // Take up to 2 from same category, fill with other categories if needed
  return [...sortByDate(sameCategory).slice(0, 2), ...sortByDate(other)].slice(0, 2);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.laotie-steel.com/blog/${post.slug}`,
      siteName: "Laotie Steel Structure",
      images: [{ url: `${siteUrl}${post.image}`, width: 1024, height: 576, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      authors: ["Laotie Steel Structure Co., Ltd."],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${siteUrl}${post.image}`],
    },
    alternates: {
      canonical: `https://www.laotie-steel.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Laotie Steel Structure Co., Ltd.",
      url: "https://www.laotie-steel.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Laotie Steel Structure Co., Ltd.",
      url: "https://www.laotie-steel.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.laotie-steel.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.laotie-steel.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.laotie-steel.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const html = addInternalLinks(renderMarkdown(post.content));
  const relatedPosts = getRelatedPosts(slug, post.category);

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <a href="/blog" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-steel mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </a>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${slug}` },
            ]}
          />
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-steel-accent/10 text-steel text-xs font-medium">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-steel mb-2">{post.title}</h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">{post.description}</p>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10 -mx-4 sm:mx-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>

          <div className="border-t border-gray-100 pt-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
            />
          </div>

          <div className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-steel mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((rp) => (
                <a
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-gray-50 rounded-xl border border-gray-100 hover:border-steel-accent hover:shadow-md transition-all p-5"
                >
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-steel-muted text-steel mb-2">
                    {rp.category}
                  </span>
                  <h3 className="font-semibold text-steel group-hover:text-steel-accent transition-colors text-sm leading-snug mb-1.5 line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{rp.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{rp.date}</span>
                    <span>·</span>
                    <span>{rp.readTime}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Category browse link */}
          {relatedPosts.filter(rp => rp.category === post.category).length > 0 && (
            <div className="mt-6 text-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-1 text-sm text-steel hover:text-steel-accent transition-colors"
              >
                Browse more {post.category} articles →
              </a>
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-r from-steel to-steel-light rounded-xl text-white text-center">
            <h3 className="text-lg font-semibold mb-2">Need a Steel Structure?</h3>
            <p className="text-white/80 text-sm mb-4">
              Get a free quote from our engineering team. We respond within 2 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold bg-white text-steel rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request a Quote
            </a>
          </div>

          {/* Email Subscription */}
          <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Stay Updated</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get steel structure tips, cost guides, and industry insights delivered to your inbox.
            </p>
            <form
              action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'kangguangjian91@gmail.com'}`}
              method="POST"
              className="max-w-md mx-auto flex gap-2"
              aria-label="Contact inquiry form"
            >
              <input type="hidden" name="_subject" value="Blog Newsletter Subscription" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" className="hidden" />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cta focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

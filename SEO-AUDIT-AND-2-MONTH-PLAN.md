# laotie-steel.com SEO Audit & 2-Month Action Plan

**Audit Date:** 2026-07-05  
**Site:** https://www.laotie-steel.com  
**Current Stats:** PageSpeed 96 (mobile) | DA 1 | 37 blogs | 13 products | 79 sitemap URLs

---

## Part 1: Current Site Inventory

### Page Inventory (25 routes)

| Type | Count | Routes |
|------|:-----:|--------|
| Core pages | 7 | `/`, `/about`, `/contact`, `/products`, `/projects`, `/blog`, `/faq` |
| Product detail pages | 13 | `/products/[slug]` — steel-structure-building, floor-deck, space-frame-truss, etc. |
| Project case pages | 9 | `/projects/[slug]` — industrial-warehouse-sydney, factory-complex-lagos, etc. |
| Geo landing pages | 7 | Thailand, Vietnam, Indonesia, Philippines, Nigeria, Saudi Arabia, Australia |
| Topic landing pages | 2 | `/steel-structure-price-guide`, `/steel-structure-logistics-center` |
| Utility pages | 6 | `/calculator`, `/manufacturing-process`, `/certificates`, `/privacy`, `/terms`, `/thank-you` |

### Blog Stats
- **Total posts:** 37
- **Categories:** 18 (too fragmented — needs consolidation)
- **Date range:** 2025-09-20 to 2026-07-04
- **Average word count:** ~800-1,100 words
- **All posts have:** cover images, FAQ sections (most), internal links, JSON-LD BlogPosting schema

### Sitemap Coverage
- **Total URLs in sitemap:** 79
- **Missing:** `/steel-structure-australia` (page exists but NOT in sitemap)
- **Image sitemap:** Code exists but not used in output

---

## Part 2: Issues Found (Priority Ranked)

### P0 — Fix Immediately (Blocking SEO)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 1 | `/steel-structure-australia` missing from `sitemap.ts` | Google can't discover the page via sitemap | Add to `countryRoutes` array |
| 2 | `/steel-structure-australia` missing from `layout.tsx` hreflang tags | Other 6 geo pages have hreflang, Australia doesn't | Add `hreflang="en-AU"` link tag |
| 3 | 3 broken product-blog slug links in `products/[slug]/page.tsx` | Related articles silently fail to display | Fix slugs: `how-to-import-steel-structures-from-china` → add `-complete-guide`; `portal-frame-vs-space-frame` → add `-comparison` |

### P1 — Fix This Week

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 4 | Blog has 18 categories for 37 posts | Category pages too thin, confusing UX | Consolidate to 8: Buyer Guide, Cost Guide, Design Guide, Technical Guide, Construction Guide, Manufacturing, Logistics, Case Study |
| 5 | `/about`, `/projects`, `/blog`, `/certificates` missing JSON-LD | Missed structured data opportunities | Add appropriate schema (AboutPage, CollectionPage, Blog, etc.) |
| 6 | `projects/layout.tsx` and `projects/page.tsx` both define metadata | Conflicting title/description in HTML | Remove metadata from layout.tsx, keep in page.tsx |
| 7 | Blog `[slug]` generateMetadata missing keywords | No keyword targeting signal | Add keywords to generateMetadata function |

### P2 — Fix This Month

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 8 | `nigeria/page.tsx.backup` in git repo | Dead code, confuses search | Delete file |
| 9 | `sitemap.ts` exports `imageSitemap` but never uses it | Wasted code | Either implement image sitemap or remove |
| 10 | `/privacy`, `/terms` missing keywords | Minor — these are noindex-adjacent pages | Add keywords for completeness |
| 11 | 6 blog posts have readTime < 3 min | Thin content signal | Expand to 800+ words each |

### Blog Category Consolidation Plan

**Current (18 categories) → Target (8 categories):**

| New Category | Absorbs Old Categories | Post Count |
|-------------|----------------------|:----------:|
| Buyer Guide | Buying Guide, Buyer Guide, Import Guide | 10 |
| Cost Guide | Cost & Pricing, Cost Guide | 5 |
| Design Guide | Design Guide, Design & Engineering, Structural Systems | 5 |
| Technical Guide | Technical Guide | 4 |
| Construction Guide | Construction Guide, Installation | 4 |
| Manufacturing | Manufacturing, Chinese Fabrication, Quality & Certification | 5 |
| Logistics | Logistics | 1 |
| Case Study | Case Study, Company News | 2 |

---

## Part 3: 8-Week Action Plan (Jul 5 — Aug 30)

### Phase 1: Technical Fixes (Week 1-2)

#### Week 1 (Jul 5-11) — Immediate Fixes
| Day | Task | Deliverable |
|-----|------|-------------|
| Mon | Add Australia to sitemap.ts + hreflang in layout.tsx | Deploy same day |
| Mon | Fix 3 broken product-blog slug references | Deploy same day |
| Mon | Delete .backup file | Deploy same day |
| Tue | Fix projects layout/page metadata conflict | Deploy |
| Wed | Add keywords to blog/[slug] and projects/[slug] generateMetadata | Deploy |
| Thu | Run build + push + auto-index | All pages indexed |
| Fri | GSC: submit updated sitemap | Sitemap submitted |

#### Week 2 (Jul 12-18) — Content Structure Cleanup
| Day | Task | Deliverable |
|-----|------|-------------|
| Mon | Consolidate blog categories: update all 37 JSON files | 18→8 categories |
| Tue | Update blog-list.json with new categories | Deploy |
| Wed | Add JSON-LD to /about (AboutPage), /projects (CollectionPage), /blog (Blog), /certificates (ItemList) | Deploy |
| Thu | Expand 6 thin blog posts (<3 min read) to 800+ words | Deploy |
| Fri | Build + push + auto-index all changed URLs | Deploy |

### Phase 2: Content Production (Week 3-4)

#### Week 3 (Jul 19-25) — Blog Batch 1
**Target keywords (MOFU/BOFU):**
1. "steel structure crane load design" — Crane Beam Design Guide
2. "pre-engineered building specifications" — PEB Specs & Standards
3. "steel mezzanine floor design" — Mezzanine Floor Guide
4. "steel structure wind load calculation" — Wind Load Design Guide

Each post: 1,000+ words, FLUX.2 cover, 2 inline images, FAQ, internal links, full SOP.

#### Week 4 (Jul 26-Aug 1) — Blog Batch 2 + Geo Pages
**Blog target keywords:**
5. "steel staircase design" — Steel Staircase Guide
6. "steel roof pitch design" — Roof Pitch Guide
7. "steel structure corrosion protection C5" — Corrosion Protection Guide
8. "steel structure connection design" — Bolted vs Welded Connections

**New geo landing pages:**
- `/steel-structure-india` — Target: India market (Hindi keywords)
- `/steel-structure-uae` — Target: UAE/Dubai market (Arabic keywords)
- `/steel-structure-brazil` — Target: Brazil market (Portuguese keywords)

Each geo page: Service schema, FAQ schema, local pricing, hreflang, sitemap entry.

### Phase 3: Backlink Building (Week 5-6)

#### Week 5 (Aug 2-8) — Paid Backlinks ($500 budget)
| Activity | Budget | Expected DA |
|----------|--------|:-----------:|
| Guest post on 2-3 DA20+ construction/engineering blogs | $200-300 | 20-30 |
| Niche edit (link insertion) on existing articles | $100-150 | 15-25 |
| Industry directory submissions (paid tier) | $50-100 | 10-20 |
| Total | $350-550 | — |

**Target sites:** Construction blog networks, engineering forums, B2B portal featured listings.

#### Week 6 (Aug 9-15) — Free Backlinks + Social
| Activity | Expected Links |
|----------|:--------------:|
| HARO — answer 10+ queries as steel structure expert | 1-3 DA30+ links |
| WordPress PBN — publish 4 new articles with backlinks | 4 links |
| LinkedIn — 1 long-form article linking to site | 1 link |
| Alibaba/Gold Supplier — update product listings with site URL | 1 link |
| GitHub — create company profile, link to site | 1 link |
| Medium — republish 2 blog posts with canonical | 2 links |

### Phase 4: Monitor & Optimize (Week 7-8)

#### Week 7 (Aug 16-22) — GSC + Internal Links
| Task | Action |
|------|--------|
| GSC index coverage check | Identify unindexed pages, re-submit via Indexing API |
| Internal link audit | Add cross-links between related blogs (topic clusters) |
| Broken link check | Crawl site for 404s, fix any found |
| Core Web Vitals check | Verify LCP < 2.5s, CLS = 0, TBT < 200ms on all pages |
| Sitemap re-submission | Submit updated sitemap with new geo pages + blog posts |

#### Week 8 (Aug 23-30) — Measure & Plan
| Metric | Current | Target |
|--------|---------|--------|
| DA (MozBar) | 1 | 5-10 |
| Indexed pages (GSC) | 32 | 80+ |
| Blog posts | 37 | 45+ |
| Geo landing pages | 7 | 10 |
| Keywords in top 20 | Unknown | 3-5 |
| Keywords in top 100 | Unknown | 15-20 |

**Planning for Sep-Oct:**
- Analyze which blog posts got the most organic traffic
- Identify keyword gaps from GSC Search Analytics
- Plan next 8 blog topics based on data
- Evaluate backlink quality — disavow toxic links if any
- Consider expanding to new geo markets based on Clarity traffic data

---

## Part 4: Blog Topic Pipeline (Next 8 Posts)

Selected based on keyword research gaps and competitor analysis:

| # | Title | Target Keyword | Category | Funnel Stage |
|---|-------|----------------|----------|:------------:|
| 1 | Crane Beam Design Guide for Steel Structures | steel structure crane load design | Technical Guide | MOFU |
| 2 | Pre-Engineered Building: Complete Specs & Standards | pre-engineered building specifications | Buyer Guide | BOFU |
| 3 | Steel Mezzanine Floor Design: Load, Span & Cost | steel mezzanine floor design | Design Guide | MOFU |
| 4 | Wind Load Calculation for Steel Buildings | steel structure wind load | Technical Guide | MOFU |
| 5 | Steel Staircase Design Guide: Types, Codes & Cost | steel staircase design | Design Guide | MOFU |
| 6 | Steel Roof Pitch Guide: Minimum, Optimal & Design Rules | steel roof pitch design | Design Guide | MOFU |
| 7 | Steel Structure Corrosion Protection: C1 to C5 Guide | corrosion protection C5 steel | Technical Guide | MOFU |
| 8 | Bolted vs Welded Connections in Steel Structures | steel structure connection design | Technical Guide | MOFU |

---

## Part 5: Summary

**What's working well:**
- PageSpeed 96 (mobile A-grade)
- 37 blog posts with consistent quality
- 13 products with Product + FAQ schema
- 7 geo landing pages with Service schema
- Full JSON-LD on most pages
- Sitemap + robots.txt properly configured
- Google Indexing API integrated

**What needs immediate attention:**
- Australia page missing from sitemap (P0)
- 3 broken product-blog slug links (P0)
- Blog categories need consolidation (P1)
- 4 pages missing JSON-LD (P1)

**2-month priorities:**
1. Fix all P0/P1 issues in Week 1-2
2. Publish 8 new blog posts in Week 3-4
3. Build 10+ backlinks with $500 budget in Week 5-6
4. Monitor GSC + measure DA in Week 7-8
5. Target: DA 5-10, 80+ indexed pages, 45+ blog posts

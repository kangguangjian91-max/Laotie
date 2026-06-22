#!/usr/bin/env python3
"""Weekly SEO health check for laotie-steel.com"""
import urllib.request
import urllib.error
import json
import time
import re
import sys
from datetime import datetime

SITE = "https://www.laotie-steel.com"
PAGES = [
  "", "/calculator", "/manufacturing-process", "/products",
  "/projects", "/blog", "/about", "/contact", "/certificates",
  "/privacy", "/terms", "/faq",
  "/steel-structure-thailand", "/steel-structure-vietnam",
  "/steel-structure-indonesia", "/steel-structure-philippines",
  "/steel-structure-nigeria", "/steel-structure-price-guide",
  "/zh",
]

# Add blog slugs
BLOG_SLUGS = [
  "steel-structure-maintenance-guide-lifespan-corrosion",
  "steel-structure-processing-techniques-cnc-welding-guide",
  "steel-structure-production-china-manufacturing-guide",
  "steel-structure-installation-guide-erection-process",
  "why-choose-chinese-steel-structure-manufacturer",
  "steel-structure-cost-guide-2025",
  "ce-iso-certified-steel-structures",
  "factory-tour-5000-tons-monthly-production",
  "steel-structure-cost-per-square-meter-2026",
  "how-to-build-steel-warehouse-step-by-step",
  "steel-structure-design-guide-beginners",
  "portal-frame-vs-space-frame-comparison",
  "steel-structure-installation-process-timeline",
  "how-to-import-steel-structures-from-china-complete-guide",
]

for s in BLOG_SLUGS:
    PAGES.append(f"/blog/{s}")

PRODUCT_SLUGS = [
    "steel-structure-building", "floor-deck",
    "space-frame-truss", "cladding-system"
]
for s in PRODUCT_SLUGS:
    PAGES.append(f"/products/{s}")

PROJECT_SLUGS = [
    "industrial-warehouse-sydney", "factory-complex-lagos",
    "shopping-mall-dome-roof-manila", "logistics-center-dubai",
    "perth-agricultural-processing-plant", "aircraft-hangar-jakarta",
    "hongxin-sports-trampoline-factory-shangqiu",
    "rattan-weaving-industrial-park-guo-village-shangqiu",
    "yunda-bozhou-modern-industrial-park"
]
for s in PROJECT_SLUGS:
    PAGES.append(f"/projects/{s}")

ISSUES = []

def check_url(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=15)
        html = resp.read().decode("utf-8", errors="ignore")
        return resp.status, html
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)

def check_metadata(html, url):
    title = ""
    desc = ""
    m = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
    if m: title = m.group(1).strip()
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
    if not m:
        m = re.search(r'<meta\s+content="([^"]*)"\s+name="description"', html)
    if m: desc = m.group(1).strip()

    issues = []
    if not title:
        issues.append(f"  ❌ NO TITLE TAG")
    elif len(title) < 10:
        issues.append(f"  ⚠️ Title too short ({len(title)} chars): {title}")
    elif len(title) > 70:
        issues.append(f"  ⚠️ Title too long ({len(title)} chars)")
    if not desc:
        issues.append(f"  ⚠️ No meta description")
    elif len(desc) > 175:
        issues.append(f"  ⚠️ Description too long ({len(desc)} chars)")
    return issues

def check_pagespeed():
    api = ("https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
           "?url=https://www.laotie-steel.com&strategy=mobile")
    try:
        req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=30)
        data = json.loads(resp.read())
        score = data["lighthouseResult"]["categories"]["performance"]["score"] * 100
        lcp = data["lighthouseResult"]["audits"]["largest-contentful-paint"]["numericValue"]
        cls = data["lighthouseResult"]["audits"]["cumulative-layout-shift"]["numericValue"]
        tbt = data["lighthouseResult"]["audits"]["total-blocking-time"]["numericValue"]
        return score, lcp, cls, tbt
    except Exception as e:
        return None, None, None, str(e)

print(f"=== SEO Health Check Report ===")
print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
print(f"Total pages: {len(PAGES)}")
print()

# 1. Check all pages for HTTP status + metadata
print("--- Page Status & Metadata ---")
ok = 0
fail = 0
for page in PAGES:
    url = f"{SITE}{page}"
    status, html = check_url(url)
    if status == 200:
        ok += 1
        meta_issues = check_metadata(html, url)
        status_str = "✅"
    elif status == 0:
        fail += 1
        status_str = f"❌ ({html})"
        meta_issues = []
    else:
        fail += 1
        status_str = f"❌ HTTP {status}"
        meta_issues = []

    if status != 200 or meta_issues:
        print(f"  {status_str} {page}")
        for mi in meta_issues:
            print(f"     {mi}")

print(f"\n  {ok}/{len(PAGES)} pages OK, {fail} failed")

# 2. PageSpeed
print("\n--- PageSpeed (Mobile) ---")
score, lcp, cls, tbt = check_pagespeed()
if score is not None:
    print(f"  Performance: {score:.0f}/100")
    print(f"  LCP: {lcp/1000:.1f}s  CLS: {cls:.3f}  TBT: {tbt:.0f}ms")
    if score < 80:
        ISSUES.append(f"PageSpeed score {score:.0f}/100 — needs optimization")
    if lcp > 2500:
        ISSUES.append(f"LCP {lcp/1000:.1f}s — target <2.5s")
    if cls > 0.1:
        ISSUES.append(f"CLS {cls:.3f} — target <0.1")
    if tbt > 200:
        ISSUES.append(f"TBT {tbt:.0f}ms — target <200ms")
else:
    print(f"  ❌ PageSpeed check failed: {lcp}")

# 3. Check for broken internal links on homepage
print("\n--- Homepage Internal Links ---")
_, html = check_url(SITE)
links = re.findall(r'href="(https?://www\.laotie-steel\.com[^"]*|/[^"]*)"', html)
internal_links = set()
for link in links:
    if link.startswith("/"):
        internal_links.add(link)
    elif "laotie-steel.com" in link:
        path = link.split("laotie-steel.com")[1]
        internal_links.add(path)

broken = 0
checked = 0
for link in sorted(internal_links):
    if link.startswith("#") or link.startswith("tel:") or link.startswith("mailto:"):
        continue
    checked += 1
    status, _ = check_url(f"{SITE}{link}")
    if status != 200:
        broken += 1
        print(f"  ❌ {link} -> HTTP {status}")

if broken == 0:
    print(f"  ✅ All {checked} internal links OK")
else:
    ISSUES.append(f"{broken}/{checked} internal links broken on homepage")

# Summary
print(f"\n=== Summary ===")
if ISSUES:
    print(f"  {len(ISSUES)} issue(s) found:")
    for i, issue in enumerate(ISSUES, 1):
        print(f"  {i}. {issue}")
    sys.exit(1)
else:
    print(f"  ✅ All checks passed")
    sys.exit(0)

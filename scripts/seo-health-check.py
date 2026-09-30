#!/usr/bin/env python3
"""Weekly SEO health check for laotie-steel.com"""
import urllib.request
import urllib.error
import json
import time
import re
import sys
import os
import subprocess
import tempfile
import statistics
from datetime import datetime

SITE = "https://www.laotie-steel.com"

# --- Local Lighthouse fallback (used when no PageSpeed API key is configured) ---
# Why: the anonymous PageSpeed Insights API quota is 0 requests/day, so it always
# returns HTTP 429 regardless of retries. Running Lighthouse locally through the
# already-installed Chrome avoids the Google API entirely.
NODE_BIN = r"C:/Users/kang/.workbuddy/binaries/node/versions/22.22.2-3/node.exe"
LH_CLI = r"C:/Users/kang/.workbuddy/binaries/node/workspace/node_modules/lighthouse/cli/index.js"
CHROME_PATH = r"C:/Program Files/Google/Chrome/Application/chrome.exe"
# Keep this EMPTY by default. Measured 2026-09-28: routing Chrome through the
# local proxy dragged FCP between 1.30s and 4.46s across runs (score 65-98),
# while direct connections stayed within FCP 2.97-2.99s (score 81-85). The proxy
# node itself is the dominant noise source, so direct wins for trend tracking.
# Set LH_PROXY=http://127.0.0.1:7897 only if direct access breaks.
LH_PROXY = os.environ.get("LH_PROXY", "")
# Lighthouse is a single-sample lab measurement with high run-to-run variance.
# Median of N runs is far more stable than one shot.
LH_RUNS = int(os.environ.get("LH_RUNS", "3"))
PAGES = [
  "", "/calculator", "/manufacturing-process", "/products",
  "/projects", "/blog", "/about", "/contact", "/certificates",
  "/privacy", "/terms", "/faq",
  "/steel-structure-thailand", "/steel-structure-vietnam",
  "/steel-structure-indonesia", "/steel-structure-philippines",
  "/steel-structure-nigeria", "/steel-structure-price-guide",
  "/steel-structure-saudi-arabia", "/steel-structure-logistics-center",
]

# Add blog slugs (read from blog-list.json when available, fallback to hardcoded list)
BLOG_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                             "public", "data", "blog")
BLOG_SLUGS = []
try:
    with open(os.path.join(BLOG_DATA_DIR, "blog-list.json"), "r", encoding="utf-8") as f:
        for post in json.load(f):
            BLOG_SLUGS.append(post["slug"])
except Exception:
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
      "steel-structure-cost-saudi-arabia-2026",
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

def check_url(url, retries=2):
    """Fetch a URL.

    Network-level failures (SSL UNEXPECTED_EOF, resets, timeouts) are transient
    and were producing false failures, so retry those. A real HTTP status code
    is a genuine response and is returned immediately without retrying.
    """
    last_err = ""
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            resp = urllib.request.urlopen(req, timeout=20)
            html = resp.read().decode("utf-8", errors="ignore")
            return resp.status, html
        except urllib.error.HTTPError as e:
            return e.code, ""
        except Exception as e:  # noqa: BLE001
            last_err = str(e)
            if attempt < retries:
                time.sleep(1.5)
    return 0, last_err

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

def _lh_single(run_idx):
    """One Lighthouse pass. Returns a metric dict, or None on failure."""
    out = os.path.join(tempfile.gettempdir(), f"lh-seo-health-{run_idx}.json")
    if os.path.exists(out):
        try:
            os.remove(out)
        except OSError:
            pass

    env = dict(os.environ)
    env["CHROME_PATH"] = CHROME_PATH
    env["NODE_OPTIONS"] = "--use-system-ca"
    chrome_flags = "--headless=new --no-sandbox --disable-gpu"
    if LH_PROXY:
        chrome_flags += f" --proxy-server={LH_PROXY}"
    cmd = [
        NODE_BIN, LH_CLI, SITE,
        "--output=json", f"--output-path={out}", "--quiet",
        "--only-categories=performance",
        f"--chrome-flags={chrome_flags}",
    ]

    try:
        subprocess.run(cmd, env=env, timeout=240,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except subprocess.TimeoutExpired:
        return None
    except Exception:  # noqa: BLE001
        return None

    # Lighthouse can exit non-zero while tearing down its temp Chrome profile
    # (Windows EBUSY on 'Account Web Data'). The report is still written, so
    # trust the file rather than the exit code.
    if not os.path.isfile(out):
        return None
    try:
        with open(out, "r", encoding="utf-8", errors="ignore") as fh:
            data = json.load(fh)
        audits = data["audits"]
        return {
            "score": data["categories"]["performance"]["score"] * 100,
            "lcp": audits["largest-contentful-paint"]["numericValue"],
            "cls": audits["cumulative-layout-shift"]["numericValue"],
            "tbt": audits["total-blocking-time"]["numericValue"],
            "fcp": audits["first-contentful-paint"]["numericValue"],
        }
    except Exception:  # noqa: BLE001
        return None


def check_pagespeed_local():
    """Run Lighthouse locally N times and report the median. Returns 5-tuple."""
    if not os.path.isfile(NODE_BIN):
        return None, None, None, None, f"node not found at {NODE_BIN}"
    if not os.path.isfile(LH_CLI):
        return None, None, None, None, "lighthouse not installed in node workspace"
    if not os.path.isfile(CHROME_PATH):
        return None, None, None, None, f"chrome not found at {CHROME_PATH}"

    results = []
    runs = max(1, LH_RUNS)
    for i in range(runs):
        r = _lh_single(i)
        if r:
            results.append(r)
        if i < runs - 1:
            time.sleep(3)  # let the previous headless Chrome fully release

    if not results:
        return None, None, None, None, f"lighthouse failed on all {runs} run(s)"

    def med(key):
        return statistics.median([r[key] for r in results])

    return (med("score"), med("lcp"), med("cls"), med("tbt"),
            f"OK ({len(results)}/{runs} runs, median)")


def check_pagespeed():
    """Prefer the official API when a key exists; otherwise run Lighthouse locally."""
    key = os.environ.get("GOOGLE_PAGESPEED_API_KEY", "")
    if not key:
        # Documented quota for anonymous calls is 0/day -> guaranteed HTTP 429.
        # Skip the wasted retries and go straight to the local Lighthouse run.
        return check_pagespeed_local()
    return check_pagespeed_psi(key)


def check_pagespeed_psi(key):
    """Official PageSpeed Insights API (requires GOOGLE_PAGESPEED_API_KEY)."""
    api = ("https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
           f"?url={SITE}&strategy=mobile&key={key}")
    for attempt in range(3):
        try:
            req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
            resp = urllib.request.urlopen(req, timeout=90)
            data = json.loads(resp.read())
            lh = data["lighthouseResult"]
            score = lh["categories"]["performance"]["score"] * 100
            lcp = lh["audits"]["largest-contentful-paint"]["numericValue"]
            cls = lh["audits"]["cumulative-layout-shift"]["numericValue"]
            tbt = lh["audits"]["total-blocking-time"]["numericValue"]
            return score, lcp, cls, tbt, None
        except urllib.error.HTTPError as e:
            err = f"HTTP {e.code}: {e.reason}"
            if e.code == 429 and attempt < 2:
                wait = 30 * (attempt + 1)
                print(f"  (PageSpeed rate limited, retrying in {wait}s...)")
                time.sleep(wait)
                continue
            return None, None, None, None, err
        except Exception as e:  # noqa: BLE001
            return None, None, None, None, str(e)[:200]
    return None, None, None, None, "max retries exceeded"

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
        # Collect metadata issues into ISSUES so the summary reports them
        # (and exits non-zero) instead of silently printing "All checks passed".
        for mi in meta_issues:
            ISSUES.append(f"{page or '/'} {mi.strip()}")
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
# Unreachable pages must surface as issues too — otherwise the run reports
# "All checks passed" and exits 0 while pages are actually failing.
if fail:
    ISSUES.append(f"{fail}/{len(PAGES)} page(s) unreachable")

# 2. PageSpeed
_psi_key = os.environ.get("GOOGLE_PAGESPEED_API_KEY")
_psi_source = ("PageSpeed Insights API" if _psi_key
               else "local Lighthouse (Chrome headless, median of runs)")
print(f"\n--- PageSpeed (Mobile) ---")
print(f"  source: {_psi_source}")
score, lcp, cls, tbt, ps_note = check_pagespeed()
if score is not None:
    print(f"  Performance: {score:.0f}/100")
    print(f"  LCP: {lcp/1000:.1f}s  CLS: {cls:.3f}  TBT: {tbt:.0f}ms")
    if ps_note:
        print(f"  note: {ps_note}")
    # Local runs originate in mainland China against an overseas edge, so the
    # absolute numbers are a domestic-vantage baseline, not the visitor's real
    # experience. Use looser thresholds there and treat the series as a trend.
    if _psi_key:
        lcp_limit, tbt_limit, score_limit = 2500, 200, 80
        cls_limit = 0.1
    else:
        lcp_limit, tbt_limit, score_limit = 4500, 300, 70
        cls_limit = 0.1
        print(f"  (domestic-vantage baseline; thresholds relaxed -> LCP<{lcp_limit/1000:.1f}s, "
              f"TBT<{tbt_limit}ms, score>={score_limit})")
    if score < score_limit:
        ISSUES.append(f"PageSpeed score {score:.0f}/100 — below {score_limit}")
    if lcp > lcp_limit:
        ISSUES.append(f"LCP {lcp/1000:.1f}s — target <{lcp_limit/1000:.1f}s")
    if cls > cls_limit:
        ISSUES.append(f"CLS {cls:.3f} — target <{cls_limit}")
    if tbt > tbt_limit:
        ISSUES.append(f"TBT {tbt:.0f}ms — target <{tbt_limit}ms")
else:
    print(f"  ❌ PageSpeed check failed: {ps_note}")
    ISSUES.append(f"PageSpeed check failed: {ps_note}")

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

"""Query Google Search Console data for laotie-steel.com - using requests with proxy"""
import json
import sys
import os
import time
from datetime import datetime
from google.oauth2 import service_account
from google.auth.transport.requests import Request

os.environ["HTTPS_PROXY"] = "http://127.0.0.1:7897"
os.environ["HTTP_PROXY"] = "http://127.0.0.1:7897"

SERVICE_ACCOUNT_PATH = r"C:\Users\kang\.workbuddy\skills\auto-index\secrets\laotie-index-key.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
GSC_API_BASE = "https://www.googleapis.com/webmasters/v3/sites"

# Try both domain and URL-prefix properties
PROPERTIES_TO_TRY = [
    "sc-domain:www.laotie-steel.com",
    "sc-domain:laotie-steel.com",
    "https://www.laotie-steel.com",
]


def get_credentials():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_PATH, scopes=SCOPES
    )
    request = Request()
    credentials.refresh(request)
    return credentials


def req(creds, method, path, params=None, body=None):
    import urllib.request
    import ssl
    import urllib.parse

    url = f"{GSC_API_BASE}/{path.lstrip('/')}"
    if params:
        encoded = []
        for k, v in params.items():
            if isinstance(v, list):
                for item in v:
                    encoded.append((k, str(item)))
            else:
                encoded.append((k, str(v)))
        url += "?" + urllib.parse.urlencode(encoded)

    data = json.dumps(body).encode("utf-8") if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {creds.token}")
    req.add_header("Content-Type", "application/json")

    # Set proxy
    proxy_url = "http://127.0.0.1:7897"
    proxy_support = urllib.request.ProxyHandler({"https": proxy_url})
    opener = urllib.request.build_opener(proxy_support)
    urllib.request.install_opener(opener)

    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"  API Error ({e.code}): {error_body[:300]}", file=sys.stderr)
        print(f"  URL was: {url}", file=sys.stderr)
        return None
    except Exception as e:
        import traceback
        traceback.print_exc()
        return None


def query_gsc(creds, site_url, start_date, end_date, dimensions=None, row_limit=1000):
    import urllib.parse
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions or [],
        "rowLimit": row_limit,
        "aggregationType": "auto",
    }
    path = f"{urllib.parse.quote(site_url, safe='')}/searchAnalytics/query"
    return req(creds, "POST", path, body=body)


def main():
    import urllib.parse

    creds = get_credentials()
    print(f"Token obtained (expires in ~55 min)")

    # Find site
    site_list = req(creds, "GET", "")
    available = [s.get("siteUrl", "") for s in site_list.get("siteEntry", [])]
    print(f"Available GSC properties: {available}")

    site_url = None
    for p in PROPERTIES_TO_TRY:
        if p in available:
            site_url = p
            break
    if not site_url and available:
        site_url = available[0]
    if not site_url:
        print("ERROR: No GSC property found!")
        print(f"Service account: laotie-indexer@ferrous-tine-499801-q8.iam.gserviceaccount.com")
        print("Add this email to GSC > Settings > Users and permissions (Full permission)")
        return

    print(f"Using property: {site_url}")
    print()

    end_date = "2026-08-08"
    start_date = "2026-06-01"

    # 1. Site totals
    print("=== 1. Site Totals (6/1 - 8/8) ===")
    totals = query_gsc(creds, site_url, start_date, end_date)
    if totals and totals.get("rows"):
        row = totals["rows"][0]
        clicks = row.get("clicks", 0)
        impressions = row.get("impressions", 0)
        ctr_val = row.get("ctr", 0) * 100
        position = row.get("position", 0)
        print(f"Clicks: {clicks:.0f} | Impressions: {impressions:.0f} | CTR: {ctr_val:.1f}% | Avg Position: {position:.1f}")
    print()

    # 2. By query
    print("=== 2. Top Queries by Impressions ===")
    queries = query_gsc(creds, site_url, start_date, end_date, dimensions=["query"])
    if queries:
        rows = sorted(queries.get("rows", []), key=lambda r: r.get("impressions", 0), reverse=True)
        for i, row in enumerate(rows[:35]):
            q = row["keys"][0]
            clicks = row.get("clicks", 0)
            impressions = row.get("impressions", 0)
            ctr_val = row.get("ctr", 0) * 100
            pos = row.get("position", 0)
            flag = " 🎯 PV 4-15" if 4 <= pos <= 15 else ""
            print(f"  {i+1:2d}. [{pos:5.1f}] {impressions:5.0f}imp  {clicks:3.0f}clk ({ctr_val:4.1f}%) {q[:65]}{flag}")
    print()

    # 3. By page
    print("=== 3. Top Pages by Impressions ===")
    pages = query_gsc(creds, site_url, start_date, end_date, dimensions=["page"])
    if pages:
        rows = sorted(pages.get("rows", []), key=lambda r: r.get("impressions", 0), reverse=True)
        for i, row in enumerate(rows[:25]):
            page = row["keys"][0]
            clicks = row.get("clicks", 0)
            impressions = row.get("impressions", 0)
            ctr_val = row.get("ctr", 0) * 100
            pos = row.get("position", 0)
            print(f"  {i+1:2d}. [{pos:5.1f}] {impressions:5.0f}imp  {clicks:3.0f}clk ({ctr_val:4.1f}%) {page}")
    print()

    # 4. Quick-win keywords (position 4-15)
    print("=== 4. Quick-Win Keywords (Pos 4-15) ===")
    if queries:
        qw = [r for r in queries.get("rows", []) if 4 <= r.get("position", 99) <= 15]
        qw = sorted(qw, key=lambda r: r.get("impressions", 0), reverse=True)
        if qw:
            for r in qw[:30]:
                q = r["keys"][0]
                pos = r.get("position", 0)
                imp = r.get("impressions", 0)
                clk = r.get("clicks", 0)
                ctr_val = r.get("ctr", 0) * 100
                print(f"  {q[:60]:<60} | pos={pos:5.1f} | {imp:5.0f}imp | {clk:3.0f}clk | {ctr_val:4.1f}%")
        else:
            print("  None found in position 4-15")
    print()

    # 5. Recent trend
    print("=== 5. Recent Trend (8/1-8/8 vs 7/24-7/31) ===")
    recent_totals = query_gsc(creds, site_url, "2026-08-01", "2026-08-08")
    prior_totals = query_gsc(creds, site_url, "2026-07-24", "2026-07-31")
    if recent_totals and prior_totals and recent_totals.get("rows") and prior_totals.get("rows"):
        r = recent_totals["rows"][0]
        p = prior_totals["rows"][0]
        print(f"  Prior week (7/24-7/31): {p.get('impressions',0):.0f} imp, {p.get('clicks',0):.0f} clk, "
              f"CTR {p.get('ctr',0)*100:.1f}%, Pos {p.get('position',0):.1f}")
        print(f"  Recent week (8/1-8/8): {r.get('impressions',0):.0f} imp, {r.get('clicks',0):.0f} clk, "
              f"CTR {r.get('ctr',0)*100:.1f}%, Pos {r.get('position',0):.1f}")
        imp_change = r.get("impressions", 0) - p.get("impressions", 0)
        clk_change = r.get("clicks", 0) - p.get("clicks", 0)
        print(f"  Change: {imp_change:+.0f} imp, {clk_change:+.0f} clk")

        # Pages with declining impressions
        recent_pg = query_gsc(creds, site_url, "2026-08-01", "2026-08-08", dimensions=["page"])
        prior_pg = query_gsc(creds, site_url, "2026-07-24", "2026-07-31", dimensions=["page"])
        if recent_pg and prior_pg:
            recent_dict = {r["keys"][0]: r.get("impressions", 0) for r in recent_pg.get("rows", [])}
            prior_dict = {r["keys"][0]: r.get("impressions", 0) for r in prior_pg.get("rows", [])}
            declines = []
            for page_url, pri_imp in prior_dict.items():
                if pri_imp > 10:
                    rec_imp = recent_dict.get(page_url, 0)
                    if pri_imp > 0:
                        pct = (rec_imp - pri_imp) / pri_imp * 100
                        if pct < -20:
                            declines.append((page_url, pri_imp, rec_imp, pct))
            if declines:
                print("\n  Pages with >20% impression decline:")
                for page_url, pri_imp, rec_imp, pct in sorted(declines, key=lambda x: -x[1])[:10]:
                    print(f"    {pct:+.0f}%: {page_url} ({pri_imp:.0f}→{rec_imp:.0f})")
            else:
                print("  No significant declines detected")
    print()

    # 6. Monthly trend
    print("=== 6. Monthly Trend ===")
    months = [
        ("June", "2026-06-01", "2026-06-30"),
        ("July", "2026-07-01", "2026-07-31"),
        ("Aug (partial)", "2026-08-01", "2026-08-08"),
    ]
    for label, sd, ed in months:
        m = query_gsc(creds, site_url, sd, ed)
        if m and m.get("rows"):
            r = m["rows"][0]
            print(f"  {label:<15}: {r.get('impressions',0):6.0f} imp, {r.get('clicks',0):4.0f} clk, "
                  f"CTR {r.get('ctr',0)*100:.1f}%, Pos {r.get('position',0):.1f}")

    # 7. Save raw data
    output_path = r"C:\Users\kang\WorkBuddy\2026-06-04-15-29-02\laotie-steel\_scripts\gsc_data.json"
    full_data = {
        "property": site_url,
        "totals": totals,
        "queries": queries,
        "pages": pages,
    }
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(full_data, f, ensure_ascii=False, indent=2)
    print(f"\nRaw data saved: {output_path}")


if __name__ == "__main__":
    main()

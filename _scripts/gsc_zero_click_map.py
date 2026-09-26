"""Map zero-click queries to their ranking pages via GSC query+page dimensions."""
import json
import sys
import os
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
os.environ["HTTPS_PROXY"] = "http://127.0.0.1:7897"
os.environ["HTTP_PROXY"] = "http://127.0.0.1:7897"

from gsc_query import get_credentials, query_gsc

creds = get_credentials()
site_url = "https://www.laotie-steel.com"

end_dt = datetime.now() - timedelta(days=3)
end_date = end_dt.strftime("%Y-%m-%d")
start_date = (end_dt - timedelta(days=90)).strftime("%Y-%m-%d")

TARGETS = [
    "steel structures", "steel structure kl", "steel structure engineering",
    "steel structure manufacturer", "steel structure manufacturing",
    "steel structure", "steel structure fabricator", "steel structure supplier",
    "steel structure company",
]

qp = query_gsc(creds, site_url, start_date, end_date, dimensions=["query", "page"], row_limit=25000)
rows = qp.get("rows", []) if qp else []
print(f"Query+Page rows: {len(rows)}")
print()

hits = []
for r in rows:
    q = r["keys"][0]
    p = r["keys"][1]
    for t in TARGETS:
        if q.strip().lower() == t:
            hits.append((t, q, p, r.get("impressions", 0), r.get("clicks", 0), r.get("position", 0)))
            break

if not hits:
    print("No exact matches found. Showing top queries with page mapping:")
    top = sorted(rows, key=lambda r: r.get("impressions", 0), reverse=True)[:20]
    for r in top:
        print(f"  [{r.get('position',0):5.1f}] {r.get('impressions',0):4.0f}imp {r.get('clicks',0):2.0f}clk  {r['keys'][0][:40]:<40} -> {r['keys'][1]}")
else:
    print("=== Zero-click keywords -> ranking page ===")
    for t, q, p, imp, clk, pos in sorted(hits, key=lambda x: -x[3]):
        print(f"  [{pos:5.1f}] {imp:4.0f}imp {clk:2.0f}clk  {q}")
        print(f"         -> {p}")

# Also save top 30 query+page pairs for reference
out = sorted(rows, key=lambda r: r.get("impressions", 0), reverse=True)[:30]
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "gsc_query_page_top30.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print(f"\nSaved top 30 query+page pairs to _scripts/gsc_query_page_top30.json")

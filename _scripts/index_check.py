"""Google URL Inspection API 批量查询工具（laotie-steel）

用法:
  python _scripts/index_check.py <url1> [url2] ...
  python _scripts/index_check.py --file urls.txt

要点:
  - 必须用 AuthorizedSession + 显式 s.proxies，不能用 HTTP_PROXY/HTTPS_PROXY 环境变量
    （环境变量方式在本机会被代理拒绝，抛 502 Tunnel connection failed）
  - 需要代理 127.0.0.1:7897（本机唯一可用代理端口）
  - 服务账号 key: ~/.workbuddy/skills/auto-index/secrets/laotie-index-key.json
  - 运行解释器: C:/Users/kang/.workbuddy/binaries/python/envs/auto-index/Scripts/python.exe
  - coverageState 判定用小写 'indexed'（实际值是 "Submitted and indexed" 等）
"""
import sys
import time

from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account

KEY = r"C:/Users/kang/.workbuddy/skills/auto-index/secrets/laotie-index-key.json"
PROXY = "http://127.0.0.1:7897"
ENDPOINT = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
SITE = "https://www.laotie-steel.com"
# 该服务账号只对此 URL-prefix 属性有 siteOwner 权限（sc-domain:* 会 403）
SITE_CANDIDATES = [
    "https://www.laotie-steel.com/",
]


def build_session():
    creds = service_account.Credentials.from_service_account_file(
        KEY, scopes=["https://www.googleapis.com/auth/webmasters.readonly"]
    )
    session = AuthorizedSession(creds)
    session.proxies = {"https": PROXY, "http": PROXY}
    return session


def inspect(session, url):
    # inspectionUrl 必须是完整 URL，传裸 slug 会 403 "not part of this property"
    full = url if url.startswith("http") else f"{SITE}/{url.lstrip('/')}"
    last_err = ""
    for site in SITE_CANDIDATES:
        try:
            resp = session.post(
                ENDPOINT,
                json={"inspectionUrl": full, "siteUrl": site, "languageCode": "en-US"},
                timeout=60,
            )
            if resp.status_code == 200:
                r = resp.json().get("inspectionResult", {})
                idx = r.get("indexStatusResult", {})
                return {
                    "coverage": idx.get("coverageState", "N/A"),
                    "verdict": idx.get("verdict", "N/A"),
                    "crawl": (idx.get("lastCrawlTime") or "never")[:10],
                    "robots": idx.get("robotsTxtState", "N/A"),
                    "fetch": idx.get("pageFetchState", "N/A"),
                    "canonical": idx.get("googleCanonical", "N/A"),
                    "google_state": r.get("verdict", "N/A"),
                }
            last_err = f"{resp.status_code} {resp.text[:120]}"
        except Exception as exc:  # noqa: BLE001
            last_err = str(exc)[:120]
    return {"error": last_err}


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)

    if args[0] == "--file":
        with open(args[1], encoding="utf-8") as fh:
            urls = [ln.strip() for ln in fh if ln.strip() and not ln.startswith("#")]
    else:
        urls = args

    session = build_session()
    indexed = 0
    for url in urls:
        res = inspect(session, url)
        short = url.replace("https://www.laotie-steel.com", "")
        if "error" in res:
            print(f"  ERR  {short}  {res['error']}")
        else:
            cov = res["coverage"].lower()
            # "Submitted and indexed" = 真收录；
            # "Discovered - currently not indexed" / "URL is unknown to Google" 都算未收录
            ok = "indexed" in cov and "not indexed" not in cov and "unknown" not in cov
            indexed += 1 if ok else 0
            flag = "OK " if ok else "!! "
            print(
                f"  {flag} {short}\n"
                f"       coverage : {res['coverage']}\n"
                f"       verdict  : {res['verdict']}  |  last crawl: {res['crawl']}\n"
                f"       robots   : {res['robots']}  |  fetch: {res['fetch']}\n"
                f"       canonical: {res['canonical']}"
            )
        time.sleep(0.6)

    print(f"\n收录 {indexed}/{len(urls)}")


if __name__ == "__main__":
    main()

"""Google Indexing API 批量提交工具（laotie-steel）

用法:
  python _scripts/index_submit.py <url1> [url2] ...

要点:
  - 必须用 AuthorizedSession + 显式 s.proxies，不能用 HTTP_PROXY/HTTPS_PROXY 环境变量
    （环境变量方式在本机会被代理拒绝，抛 502 Tunnel connection failed）
  - 需要代理 127.0.0.1:7897（本机唯一可用代理端口，7890/10809/1080 均不通）
  - 服务账号 key: ~/.workbuddy/skills/auto-index/secrets/laotie-index-key.json
  - 运行解释器: C:/Users/kang/.workbuddy/binaries/python/envs/auto-index/Scripts/python.exe
"""
import json
import sys
import time

from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account

KEY = r"C:/Users/kang/.workbuddy/skills/auto-index/secrets/laotie-index-key.json"
PROXY = "http://127.0.0.1:7897"
SITE = "https://www.laotie-steel.com"


def build_session():
    creds = service_account.Credentials.from_service_account_file(
        KEY, scopes=["https://www.googleapis.com/auth/indexing"]
    )
    session = AuthorizedSession(creds)
    session.proxies = {"https": PROXY, "http": PROXY}
    return session


def submit(urls):
    session = build_session()
    ok = 0
    for url in urls:
        full = url if url.startswith("http") else f"{SITE}/{url.lstrip('/')}"
        try:
            resp = session.post(
                "https://indexing.googleapis.com/v3/urlNotifications:publish",
                json={"url": full, "type": "URL_UPDATED"},
                timeout=60,
            )
            if resp.status_code == 200:
                ok += 1
                print(f"  OK   {resp.status_code}  {full}")
            else:
                print(f"  FAIL {resp.status_code}  {full}  {resp.text[:150]}")
        except Exception as exc:  # noqa: BLE001
            print(f"  ERR            {full}  {str(exc)[:150]}")
        time.sleep(1)
    print(f"\n提交完成: {ok}/{len(urls)} 成功")
    return ok


if __name__ == "__main__":
    targets = sys.argv[1:]
    if not targets:
        print(__doc__)
        sys.exit(1)
    submit(targets)

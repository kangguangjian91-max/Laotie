"""GitHub device-flow push helper (fallback when GCM auth is blocked).

Usage:
  1. Get a device code:
     python gh_device_push.py code
     -> prints user_code; open https://github.com/login/device within 15 min
  2. Wait for authorization, then push main:
     python gh_device_push.py wait <device_code>

Stores the token in GCM so subsequent plain `git push` works again.
Uses proxy http://127.0.0.1:7897 for github.com access.
"""
import json, subprocess, sys, time, urllib.request

PROXY = "http://127.0.0.1:7897"
CLIENT_ID = "178c6fc778ccc68e1d6a"  # Git Credential Manager's public OAuth client
TOKEN_FILE = r"C:\Users\kang\.workbuddy\tmp-gh-token"

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"https": PROXY, "http": PROXY})
)


def get_code():
    body = "client_id=" + CLIENT_ID + "&scope=repo workflow"
    req = urllib.request.Request(
        "https://github.com/login/device/code",
        data=body.encode(), method="POST",
        headers={"Accept": "application/json"},
    )
    with opener.open(req, timeout=30) as r:
        d = json.loads(r.read().decode())
    print("user_code :", d["user_code"])
    print("open      : https://github.com/login/device")
    print("device    :", d["device_code"])
    print("expires_in:", d["expires_in"], "sec")


def wait_and_push(device_code):
    deadline = time.time() + 880
    token = None
    while time.time() < deadline:
        body = json.dumps({
            "client_id": CLIENT_ID,
            "device_code": device_code,
            "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
        }).encode()
        req = urllib.request.Request(
            "https://github.com/login/oauth/access_token",  # NOTE: /login/oauth/, not /oauth/
            data=body, method="POST",
            headers={"Content-Type": "application/json", "Accept": "application/json"},
        )
        try:
            with opener.open(req, timeout=30) as r:
                d = json.loads(r.read().decode())
        except Exception as e:
            print("net err:", e, flush=True)
            time.sleep(10)
            continue
        if "access_token" in d:
            token = d["access_token"]
            print("AUTHORIZED scope:", d.get("scope"), flush=True)
            break
        err = d.get("error", "?")
        if err == "authorization_pending":
            print("waiting...", flush=True)
        elif err == "slow_down":
            time.sleep(15)
            continue
        else:
            print("FAILED:", err)
            sys.exit(1)
        time.sleep(5)
    if not token:
        print("TIMEOUT")
        sys.exit(1)

    with open(TOKEN_FILE, "w") as f:
        f.write(token)

    cred = "protocol=https\nhost=github.com\nusername=kangguangjian91-max\npassword=" + token + "\n"
    subprocess.run(["git", "credential", "approve"], input=cred.encode(), check=True)
    print("token stored in GCM (future plain git push will work)")

    push_cmd = (
        "git -c http.proxy=" + PROXY + " push "
        "https://x-access-token:" + token + "@github.com/kangguangjian91-max/Laotie.git main "
        "2>&1 | sed -E 's/x-access-token:[A-Za-z0-9_]+/x-access-token:REDACTED/g'"
    )
    r = subprocess.run(["bash", "-c", push_cmd], capture_output=True, text=True)
    print(r.stdout)


if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "code":
        get_code()
    elif len(sys.argv) >= 4 and sys.argv[1] == "wait":
        wait_and_push(sys.argv[3])
    else:
        print(__doc__)

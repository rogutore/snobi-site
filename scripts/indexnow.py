#!/usr/bin/env python3
"""IndexNow ping (T4): tell Bing / Yandex / Seznam etc. which snobi.jp URLs changed. Run after each production deploy:
  python3 scripts/indexnow.py            # every URL in https://snobi.jp/sitemap.xml
  python3 scripts/indexnow.py /journal/x # only these paths
The key is public by design (public/<key>.txt); it only proves we own the host."""
import json, re, sys, urllib.request

KEY = "4e46070eb7f782e017dfdb667f5239fc"
HOST = "snobi.jp"
if len(sys.argv) > 1:
    urls = [f"https://{HOST}{p}" for p in sys.argv[1:]]
else:
    xml = urllib.request.urlopen(urllib.request.Request(f"https://{HOST}/sitemap.xml", headers={"User-Agent": "snobi-indexnow/1.0 (+https://snobi.jp)"}), timeout=20).read().decode()
    urls = sorted(set(re.findall(r"<loc>([^<]+)</loc>", xml)))
body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, method="POST",
                             headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "snobi-indexnow/1.0 (+https://snobi.jp)"})
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print(r.status, f"{len(urls)} URLs submitted")
except urllib.error.HTTPError as e:
    print(e.code, e.read()[:300])

#!/usr/bin/env python3
"""Prove a change is (in)visible: save every sitemap page from one host, then compare another host against it.

    python3 scripts/gates/html-compare.py save <dir> [base=https://snobi.jp]
    python3 scripts/gates/html-compare.py compare <dir> <other-base>

Compares, per page: visible text lines, JSON-LD (host-normalised) and <button> markup (class/id/style stripped).
Prints `same` / `DIFF` per path and the number of pages that differ. Self-test it once per session: edit a saved page
(e.g. a price, with sed …/g — pages are one long line) and check that `compare` reports it."""
import html, json, re, sys, urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 snobi-verify"}


def get(url: str) -> str:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read().decode()


def norm(doc: str, host: str) -> dict:
    ld = [json.loads(m) for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>', doc, re.S)]
    body = re.sub(r"<script.*?</script>|<style.*?</style>", " ", doc, flags=re.S)
    lines = [l.strip() for l in html.unescape(re.sub(r"<[^>]+>", "\n", body)).splitlines() if l.strip()]
    buttons = [re.sub(r'\s(class|id|style)="[^"]*"', "", b) for b in re.findall(r"<button[^>]*>.*?</button>", body, re.S)]
    return {"text": lines, "ld": json.dumps(ld, ensure_ascii=False).replace(host, "https://snobi.jp"), "buttons": buttons}


def name(path: str) -> str:
    return "page" + (path.replace("/", "__") or "__") + ".html"


def save(d: Path, base: str) -> None:
    d.mkdir(parents=True, exist_ok=True)
    paths = [u.replace("https://snobi.jp", "") or "/" for u in re.findall(r"<loc>([^<]+)</loc>", get(base + "/sitemap.xml"))]
    for p in ["/"] + [p for p in paths if p != "/"]:
        (d / name(p)).write_text(get(base + p))
    (d / "paths.json").write_text(json.dumps(["/"] + [p for p in paths if p != "/"], ensure_ascii=False))
    print(f"saved {len(paths)} pages from {base} to {d}")


def compare(d: Path, other: str) -> int:
    bad = 0
    for p in json.loads((d / "paths.json").read_text()):
        a, b = norm((d / name(p)).read_text(), "https://snobi.jp"), norm(get(other + p), other)
        diffs = []
        if a["text"] != b["text"]:
            sa, sb = set(a["text"]), set(b["text"])
            diffs.append(f"text -{sorted(sa - sb)[:3]} +{sorted(sb - sa)[:3]}")
        if a["ld"] != b["ld"]:
            diffs.append("json-ld")
        if a["buttons"] != b["buttons"]:
            diffs.append("buttons")
        bad += bool(diffs)
        print(f"{'DIFF' if diffs else 'same'}  {p:44s} {'; '.join(diffs)[:240]}")
    print(f"\n{bad} page(s) differ")
    return bad


if __name__ == "__main__":
    cmd, d = sys.argv[1], Path(sys.argv[2])
    if cmd == "save":
        save(d, (sys.argv[3] if len(sys.argv) > 3 else "https://snobi.jp").rstrip("/"))
    else:
        sys.exit(1 if compare(d, sys.argv[3].rstrip("/")) else 0)

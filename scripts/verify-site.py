#!/usr/bin/env python3
"""Post-deploy check for snobi.jp (plan T20, made permanent 2026-10-11). Run it after every deploy, or against a version
preview before promoting it:

    python3 scripts/verify-site.py                       # https://snobi.jp
    python3 scripts/verify-site.py https://<id>-snobi-site.rogutore.workers.dev

Every URL in the sitemap must: answer 200 · carry html[lang] · have exactly one <h1> and one <main> · have a canonical
pointing at itself (path compared on a preview host) · not be noindex · have a title, a description and an og:image that
loads · carry JSON-LD that parses (ProductGroup variants need image, price and shipping). Every internal link and image
found on those pages must load. Site-wide: robots.txt names the sitemap, an unknown path is a real 404, and
http://www.snobi.jp reaches https://snobi.jp in one hop. Exit code 1 when anything fails.
"""
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser

CANON = "https://snobi.jp"
BASE = (sys.argv[1] if len(sys.argv) > 1 else CANON).rstrip("/")
UA = "Mozilla/5.0 (snobi-verify)"
failures: list[str] = []


def fetch(url: str, method: str = "GET", follow: bool = True) -> tuple[int, str, str]:
    """(status, final url, body) — body only for GET html."""
    req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect())
    try:
        with opener.open(req, timeout=30) as r:
            body = r.read().decode("utf-8", "replace") if method == "GET" and "html" in r.headers.get("content-type", "") else ""
            return r.status, r.geturl(), body
    except urllib.error.HTTPError as e:
        return e.code, url, ""
    except Exception as e:  # network error
        return 0, url, str(e)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.lang = None; self.h1 = 0; self.main = 0; self.canonical = None; self.robots = ""
        self.title = ""; self._in_title = False; self.desc = None; self.og_image = None
        self.links: set[str] = set(); self.images: set[str] = set(); self.jsonld: list[str] = []; self._in_ld = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        elif tag == "h1": self.h1 += 1
        elif tag == "main": self.main += 1
        elif tag == "title": self._in_title = True
        elif tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href")
        elif tag == "meta" and a.get("name") == "robots": self.robots = a.get("content", "")
        elif tag == "meta" and a.get("name") == "description": self.desc = a.get("content")
        elif tag == "meta" and a.get("property") == "og:image": self.og_image = a.get("content")
        elif tag == "a" and a.get("href"): self.links.add(a["href"])
        elif tag == "img" and a.get("src"): self.images.add(a["src"])
        elif tag == "script" and a.get("type") == "application/ld+json": self._in_ld = True; self.jsonld.append("")

    def handle_endtag(self, tag):
        if tag == "title": self._in_title = False
        if tag == "script": self._in_ld = False

    def handle_data(self, data):
        if self._in_title: self.title += data
        if self._in_ld: self.jsonld[-1] += data


def local(u: str) -> str | None:
    """Turn an internal link into an absolute URL on BASE; None for external/anchors/mail."""
    if u.startswith(("mailto:", "tel:", "#", "javascript:")): return None
    p = urllib.parse.urlparse(u)
    if p.netloc and p.netloc not in ("snobi.jp", urllib.parse.urlparse(BASE).netloc): return None
    path = p.path or "/"
    return BASE + path + (("?" + p.query) if p.query else "")


def fail(msg: str) -> None:
    failures.append(msg)


def check_jsonld(url: str, blocks: list[str]) -> list[str]:
    types: list[str] = []
    for raw in blocks:
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            fail(f"{url}: JSON-LD does not parse ({e})"); continue
        for node in data if isinstance(data, list) else [data]:
            t = node.get("@type", "?"); types.append(t)
            if t == "ProductGroup":
                for v in node.get("hasVariant", []):
                    name = v.get("name", "?")
                    if not v.get("image"): fail(f"{url}: variant {name} has no image")
                    o = v.get("offers")
                    if o is None: continue  # no live stock read → no offer, by design
                    if not o.get("price"): fail(f"{url}: variant {name} offer has no price")
                    if not o.get("shippingDetails"): fail(f"{url}: variant {name} offer has no shippingDetails")
    return types


def main() -> int:
    status, _, xml = fetch(BASE + "/sitemap.xml")
    req = urllib.request.Request(BASE + "/sitemap.xml", headers={"User-Agent": UA})
    xml = urllib.request.urlopen(req, timeout=30).read().decode()
    urls = [u.replace(CANON, BASE) for u in re.findall(r"<loc>([^<]+)</loc>", xml)]
    print(f"{BASE}: {len(urls)} URLs in the sitemap")

    pages: dict[str, Page] = {}
    def visit(u: str):
        s, final, body = fetch(u)
        return u, s, final, body
    with ThreadPoolExecutor(8) as ex:
        for u, s, final, body in ex.map(visit, urls):
            if s != 200: fail(f"{u}: status {s}"); continue
            p = Page(); p.feed(body); pages[u] = p
            path = urllib.parse.urlparse(u).path or "/"
            if not p.lang: fail(f"{u}: no html[lang]")
            if p.h1 != 1: fail(f"{u}: {p.h1} <h1> (want 1)")
            if p.main != 1: fail(f"{u}: {p.main} <main> (want 1)")
            canon_path = urllib.parse.urlparse(p.canonical or "").path or "/"
            if not p.canonical: fail(f"{u}: no canonical")
            elif canon_path.rstrip("/") != path.rstrip("/"): fail(f"{u}: canonical points to {p.canonical}")
            if "noindex" in p.robots and BASE == CANON: fail(f"{u}: noindex on the live host")
            if not p.title.strip(): fail(f"{u}: empty <title>")
            if not p.desc: fail(f"{u}: no meta description")
            if not p.og_image: fail(f"{u}: no og:image")
            types = check_jsonld(u, p.jsonld)
            print(f"  ok-ish {path:44s} h1={p.h1} ld={','.join(sorted(set(types))) or '-'}")

    # every internal link and image on those pages
    targets: set[str] = set()
    for p in pages.values():
        for h in p.links | p.images | ({p.og_image} if p.og_image else set()):
            t = local(h)
            if t: targets.add(t.split("#")[0])
    def head(t: str):
        s, final, _ = fetch(t, "GET")
        return t, s
    with ThreadPoolExecutor(12) as ex:
        bad = [(t, s) for t, s in ex.map(head, sorted(targets)) if s != 200]
    for t, s in bad: fail(f"link/image {t}: status {s}")
    print(f"{len(targets)} internal links and images checked, {len(bad)} failed")

    # site-wide
    s, _, _ = fetch(BASE + "/this-page-does-not-exist-verify")
    if s != 404: fail(f"unknown path answered {s}, want 404")
    robots = urllib.request.urlopen(urllib.request.Request(BASE + "/robots.txt", headers={"User-Agent": UA}), timeout=30).read().decode()
    if BASE == CANON and "Sitemap:" not in robots: fail("robots.txt has no Sitemap line")  # preview hosts serve a no-index robots.txt
    if BASE == CANON:
        s, _, _ = fetch("http://www.snobi.jp/coffee", follow=False)
        req = urllib.request.Request("http://www.snobi.jp/coffee", headers={"User-Agent": UA})
        try:
            urllib.request.build_opener(NoRedirect()).open(req, timeout=30)
            fail("http://www.snobi.jp did not redirect")
        except urllib.error.HTTPError as e:
            loc = e.headers.get("Location", "")
            if not loc.startswith("https://snobi.jp/"): fail(f"http://www.snobi.jp first hop goes to {loc}, want https://snobi.jp in one hop")

    if failures:
        print(f"\nFAIL — {len(failures)} problem(s):")
        for f in failures: print("  -", f)
        return 1
    print("\nPASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())

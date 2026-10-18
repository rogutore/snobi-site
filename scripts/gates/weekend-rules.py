#!/usr/bin/env python3
"""Read-only stock-boundary and rendered supplier-credit gate. Optional URL is GET-only."""
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
MEDIA = json.loads((ROOT / "content/origin-media.json").read_text())
PHOTOS = {p["id"]: p for p in MEDIA["photos"]}


def stock_copies(files):
    return [name for name, text in files if "availableForSale" in text and not name.startswith("lib/shopify/")]


class Credits(HTMLParser):
    def __init__(self, lang):
        super().__init__(convert_charrefs=True)
        self.lang, self.figure, self.caption = lang, None, False
        self.count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "figure":
            assert self.figure is None, "nested supplier figure"
            self.figure = {"ids": [], "caption": ""}
        elif tag == "figcaption":
            self.caption = True
        elif tag == "img":
            src = urllib.parse.unquote(urllib.parse.urlsplit(attrs.get("src", "")).path)
            if not src.startswith("/origin-media/"):
                return
            match = re.fullmatch(r"/origin-media/(.+)-(?:s|l)\.webp", src)
            assert match and match[1] in PHOTOS, f"unregistered supplier image: {src}"
            assert self.figure is not None, f"supplier photo outside figure: {src}"
            self.figure["ids"].append(match[1])
            self.count += 1

    def handle_data(self, text):
        if self.caption and self.figure is not None:
            self.figure["caption"] += text

    def handle_endtag(self, tag):
        if tag == "figcaption":
            self.caption = False
        elif tag == "figure" and self.figure is not None:
            for photo_id in self.figure["ids"]:
                expected = MEDIA["suppliers"][PHOTOS[photo_id]["supplier"]]["credit"][self.lang]
                assert expected and expected in self.figure["caption"], f"missing {self.lang} credit: {photo_id}"
            self.figure = None


def main():
    assert len(PHOTOS) == len(MEDIA["photos"]), "duplicate supplier photo id"
    for photo in PHOTOS.values():
        for lang in ("ja", "en"):
            assert MEDIA["suppliers"][photo["supplier"]]["credit"][lang].strip()
    files = [(str(p.relative_to(ROOT)), p.read_text()) for directory in ("app", "components", "lib")
             for p in (ROOT / directory).rglob("*") if p.suffix in (".ts", ".tsx")]
    assert not stock_copies(files), stock_copies(files)
    assert stock_copies([("components/regression.ts", "s.availableForSale")]), "copy-detector self-test"
    photo_id = next(iter(PHOTOS))
    try:
        Credits("ja").feed(f'<figure><img src="/origin-media/{photo_id}-l.webp"><figcaption>missing</figcaption></figure>')
    except AssertionError:
        pass
    else:
        raise AssertionError("missing-credit self-test did not fail")
    pages = photos = 0
    if len(sys.argv) == 2:
        base = sys.argv[1].rstrip("/")
        def get(route):
            with urllib.request.urlopen(base + route, timeout=30) as response:
                return response.read().decode()
        sitemap = ET.fromstring(get("/sitemap.xml"))
        for loc in sitemap.findall(".//{*}loc"):
            route = urllib.parse.urlsplit(loc.text).path
            parser = Credits("en" if route == "/en" or route.startswith("/en/") else "ja")
            parser.feed(get(route))
            assert parser.figure is None, f"unclosed figure at {route}"
            pages += 1
            photos += parser.count
        assert photos > 0, "no supplier photos checked"
    print(f"PASS stock boundary, unique photo ids/credits, negative self-tests; {pages} pages, {photos} rendered supplier photos")


if __name__ == "__main__":
    main()

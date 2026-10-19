#!/usr/bin/env python3
"""Export the v2 preview photos from the 2026-10-01 Leica originals into public/v2/photos/.
Each frame gets four WebP sizes: -s and -l (landscape 1000/2000, portrait 700/1400), -m (1100 wide, for 3x phones that
would otherwise take -l; 2026-10-19) and -t (short edge 240, for the 77-80px thumbnails), plus a JSON manifest
(public/v2/photos/manifest.json: frame → [w, h, m_w, t_w, t_h], w/h at the large size) that the pages read.
usage: python3 scripts/export-v2-photos.py   (originals: ~/Downloads/Yuto-20261001_TC/TC_261001_NNN.jpg)"""
import json, os, sys
from PIL import Image, ImageOps

SRC = os.path.expanduser("~/Downloads/Yuto-20261001_TC/TC_261001_{}.jpg")
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "v2", "photos")
FRAMES = sorted(set("""
130 161 160 162 144 143 146 145 047 049 046 048 131 187 114 037 253 248 254 250 025 022 024 023
152 151 158 157 133 132 136 135 128 129 127 126 053 050 052 051 054 021 019 039 041 032 215 211
203 205 200 124 006 189 121 149
026 027 028 029 030 044 056 122 123 125 134 137 138 139 140 141 142 147 153 154 155 156 163 166 178 180 182 184 186 188 190 201 204 207 212 213 214 216
""".split()))
MEDIUM, THUMB = 1100, 240
os.makedirs(OUT, exist_ok=True)
manifest = {}
for f in FRAMES:
    path = SRC.format(f)
    if not os.path.exists(path):
        sys.exit(f"missing original {path}")
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    sizes = {}
    small, large = (1000, 2000) if im.width >= im.height else (700, 1400)
    thumb = round(THUMB * im.width / im.height) if im.width >= im.height else THUMB
    for w, tag in ((small, "s"), (MEDIUM, "m"), (large, "l"), (thumb, "t")):
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(os.path.join(OUT, f"{f}-{tag}.webp"), "WEBP", quality=74, method=6)
        sizes[tag] = r.size
    manifest[f] = [*sizes["l"], sizes["m"][0], *sizes["t"]]
json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w"), indent=0)
total = sum(os.path.getsize(os.path.join(OUT, x)) for x in os.listdir(OUT))
print(f"{len(FRAMES)} frames, {total // 1024 // 1024} MB")

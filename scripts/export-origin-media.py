#!/usr/bin/env python3
"""Export the approved supply-chain photos (content/origin-media.json) to public/origin-media/.

    python3 scripts/export-origin-media.py

Each photo becomes <id>-s.webp (800 px wide) and <id>-l.webp (1600 px wide, never upscaled), plus
public/origin-media/sizes.json ({id: [width, height]} of the -l file) that content/origin-media.ts reads.
Sources are relative to the Drive folder My Drive/SNOBI/. Resize only: no crop, no colour change (the pages crop
for display with CSS; suppliers allow display crops but not edits — owner 2026-10-15)."""
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
DRIVE = Path.home() / "Library/CloudStorage/GoogleDrive-rogutore@gmail.com/My Drive/SNOBI"
OUT = ROOT / "public/origin-media"
SMALL, LARGE = 800, 1600

data = json.loads((ROOT / "content/origin-media.json").read_text())
OUT.mkdir(exist_ok=True)
sizes = {}
for p in data["photos"]:
    src = DRIVE / p["src"]
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    for tag, width in (("s", SMALL), ("l", LARGE)):
        w = min(width, im.width)
        r = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(OUT / f"{p['id']}-{tag}.webp", "WEBP", quality=78, method=6)
        if tag == "l":
            sizes[p["id"]] = [r.width, r.height]
    print(f"{p['id']:14s} {im.width}x{im.height} -> {sizes[p['id']]}")
(OUT / "sizes.json").write_text(json.dumps(sizes, indent=1, ensure_ascii=False) + "\n")
print(f"{len(sizes)} photos -> {OUT.relative_to(ROOT)}")

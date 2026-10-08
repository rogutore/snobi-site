#!/usr/bin/env python3
"""WCAG 2.x contrast for the non-text pairs that design.md lint cannot judge (it applies 4.5:1 to everything).
usage: python3 scripts/contrast.py   → prints each pair; exit 1 if any is below its threshold. Colours are read from app/globals.css."""
import re, sys, pathlib
css = (pathlib.Path(__file__).resolve().parent.parent / "app/globals.css").read_text()
def hexof(name):
    m = re.search(r"--color-" + name + r":\s*(#[0-9a-fA-F]{6})", css)
    if not m: sys.exit(f"--color-{name} missing")
    return m.group(1)
def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
def ratio(a, b):
    la, lb = sorted((lum(hexof(a)), lum(hexof(b))), reverse=True)
    return (la + 0.05) / (lb + 0.05)
PAIRS = [("sage", "paper", 3.0, "focus ring (non-text, WCAG 1.4.11)"), ("sage", "paper-2", 3.0, "focus ring on alt sections")]
bad = 0
for fg, bg, need, use in PAIRS:
    r = ratio(fg, bg); ok = r >= need; bad += not ok
    print(f"{fg} on {bg}: {r:.2f}:1 (needs {need}:1) {'ok' if ok else 'FAIL'} — {use}")
sys.exit(1 if bad else 0)

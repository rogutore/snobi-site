#!/usr/bin/env python3
"""Utopia fluid type scale for snobi.jp (design-arsenal doctrine/typography.md §1).

Prints CSS custom properties for app/globals.css @theme. The numbers are computed here, never typed by hand:
  size(step, vw) = base(vw) * ratio(vw) ** step, linear in viewport width between MIN_VW and MAX_VW.
Floor: no step below FLOOR_PX (the 12px eyebrow/legal floor, design-arsenal 2026-10-06).
usage: python3 scripts/type-scale.py            # CSS lines
       python3 scripts/type-scale.py --table    # px table for DESIGN.md prose
       python3 scripts/type-scale.py --fluid 44 80   # one clamp (display 44→80, gutter 16→40, section 64→96)
"""
import sys

MIN_VW, MAX_VW = 320, 1440          # px; 1440 = largest QA breakpoint (process/visual-qa.md)
BASE_MIN, BASE_MAX = 16, 18         # px; body. JP body stays >= 16px (typography.md §6)
RATIO_MIN, RATIO_MAX = 1.2, 1.25    # minor third -> major third (Utopia default band)
STEPS = range(-2, 6)
FLOOR_PX = 12


def clamp_for(min_px, max_px):
    """CSS clamp() whose preferred value is linear in vw between MIN_VW and MAX_VW."""
    slope = (max_px - min_px) / (MAX_VW - MIN_VW)
    intercept = min_px - slope * MIN_VW
    lo, hi = sorted((min_px, max_px))
    return (f"clamp({lo / 16:.4f}rem, {intercept / 16:.4f}rem + {slope * 100:.4f}vw, {hi / 16:.4f}rem)", min_px, max_px)


def scale():
    out = []
    for s in STEPS:
        mn = max(FLOOR_PX, BASE_MIN * RATIO_MIN ** s)
        mx = max(FLOOR_PX, BASE_MAX * RATIO_MAX ** s)
        out.append((s, *clamp_for(mn, mx)))
    return out


if __name__ == "__main__":
    if "--fluid" in sys.argv:
        i = sys.argv.index("--fluid"); print(clamp_for(float(sys.argv[i + 1]), float(sys.argv[i + 2]))[0]); sys.exit()
    rows = scale()
    if "--table" in sys.argv:
        print("| Step | 320px | 1440px |\n|---|---|---|")
        for s, _, mn, mx in rows:
            print(f"| step-{s} | {mn:.1f}px | {mx:.1f}px |")
    else:
        for s, css, mn, mx in rows:
            print(f"  --text-step-{s}: {css}; /* {mn:.1f}→{mx:.1f}px */")

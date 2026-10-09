#!/usr/bin/env python3
"""Build the site icons from the real boar mark (public/brand/snobi.svg) and the colour tokens in app/globals.css.

Outputs (Next.js metadata file conventions, app/ root so every route gets them):
  app/icon.svg        the plum boar as the logo is printed, transparent ground; in a dark browser theme the boar turns
                      paper so it stays visible on a dark tab bar (owner 2026-10-09: "not inverted")
  app/favicon.ico     16 / 32 / 48 px, plum boar on transparent (fallback for browsers without SVG icons)
  app/apple-icon.png  180 px, plum boar on paper (iOS needs an opaque ground and rounds the corners)

Run after the logo or the plum/paper tokens change:  python3 scripts/make-favicon.py
"""
import io
import re
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "public/brand/snobi.svg"
CSS = ROOT / "app/globals.css"
SIZE = 512  # icon.svg canvas


def token(name: str) -> str:
    m = re.search(rf"--color-{name}:\s*(#[0-9a-fA-F]{{6}})", CSS.read_text())
    if not m:
        raise SystemExit(f"token --color-{name} not found in {CSS}")
    return m.group(1)


def boar() -> tuple[list[str], tuple[float, float, float, float]]:
    """The filled logo paths and their bounding box in logo units (measured from a render, not guessed)."""
    svg = LOGO.read_text()
    vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', svg).group(1).split()]
    paths = re.findall(r'<path class="cls-2" d="([^"]+)"', svg)
    if not paths:
        raise SystemExit("no filled paths (cls-2) in the logo")
    w = 2000
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=w)
    x0, y0, x1, y1 = Image.open(io.BytesIO(png)).getchannel("A").getbbox()
    k = vb[2] / w
    return paths, (vb[0] + x0 * k, vb[1] + y0 * k, vb[0] + x1 * k, vb[1] + y1 * k)


def icon_svg(width_frac: float, ground: str | None = None, dark_swap: bool = False) -> str:
    plum, paper = token("plum"), token("paper")
    paths, (bx0, by0, bx1, by1) = boar()
    s = SIZE * width_frac / (bx1 - bx0)
    tx = SIZE / 2 - s * (bx0 + bx1) / 2
    ty = SIZE / 2 - s * (by0 + by1) / 2
    body = "".join(f'<path d="{d}"/>' for d in paths)
    style = f"<style>@media (prefers-color-scheme: dark){{.b{{fill:{paper}}}}}</style>" if dark_swap else ""
    rect = f'<rect width="{SIZE}" height="{SIZE}" fill="{ground}"/>' if ground else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}">{style}{rect}'
        f'<g class="b" fill="{plum}" transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f})">{body}</g></svg>\n'
    )


def png(svg: str, px: int) -> Image.Image:
    return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode(), output_width=px))).convert("RGBA")


def main() -> None:
    (ROOT / "app/icon.svg").write_text(icon_svg(0.88, dark_swap=True))  # legs stay inside Google's round crop
    png(icon_svg(0.94), 256).save(ROOT / "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    png(icon_svg(0.66, ground=token("paper")), 180).convert("RGB").save(ROOT / "app/apple-icon.png", optimize=True)
    print("wrote app/icon.svg, app/favicon.ico (16/32/48), app/apple-icon.png (180)")


if __name__ == "__main__":
    main()

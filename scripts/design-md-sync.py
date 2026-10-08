#!/usr/bin/env python3
"""Generate DESIGN.md front matter from app/globals.css (design-arsenal process/design-md.md §3, mode A code-first).

Source of truth: the @theme block (colours, type steps, spacing, radius) and the `.t-<role>` type-role rules.
Only the YAML between the first two `---` lines of DESIGN.md is rewritten; the prose below is hand-written.
usage: python3 scripts/design-md-sync.py          # rewrite DESIGN.md front matter
       python3 scripts/design-md-sync.py --check  # exit 1 if DESIGN.md is stale (for pre-commit / CI)
A missing token is a refusal (exit 2), never a silent default.
"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = (ROOT / "app/globals.css").read_text()
DESIGN = ROOT / "DESIGN.md"


def die(msg):
    print(f"design-md-sync: {msg}", file=sys.stderr); sys.exit(2)


theme = re.search(r"@theme\s*\{(.*?)\n\}", CSS, re.S) or die("no @theme block in app/globals.css")
VARS = {k: v.strip() for k, v in re.findall(r"--([a-z0-9-]+)\s*:\s*([^;]+);", re.sub(r"/\*.*?\*/", "", theme.group(1), flags=re.S))}


def var(name):
    return VARS[name] if name in VARS else die(f"--{name} missing from @theme")


def max_px(value):
    """The max of a clamp() (or a plain rem/px) in px — DESIGN.md dimensions cannot hold clamp()."""
    m = re.fullmatch(r"clamp\(([^,]+),[^,]+,([^)]+)\)", value)
    last = (m.group(2) if m else value).strip()
    n = re.fullmatch(r"([\d.]+)(rem|px)", last) or die(f"cannot read a size from {value!r}")
    px = float(n.group(1)) * (16 if n.group(2) == "rem" else 1)
    return f"{round(px, 1):g}px"


FAMILY = {"--font-display": "moret", "--font-sans": "maiola", "--font-mono": "Geist Mono"}
JA_FAMILY = "dnp-shuei-gothic-gin-std"


def role(name):
    m = re.search(r"\.t-" + re.escape(name) + r"\s*\{([^}]*)\}", CSS) or die(f".t-{name} missing")
    decl = dict(re.findall(r"([a-z-]+)\s*:\s*([^;]+);", m.group(1)))
    fam = re.fullmatch(r"var\((--font-[a-z]+)\)", decl["font-family"]).group(1)
    size = re.fullmatch(r"var\(--([a-z0-9-]+)\)", decl["font-size"]).group(1)
    out = {"fontFamily": JA_FAMILY if name.startswith("ja-") else FAMILY[fam],
           "fontSize": max_px(var(size)), "fontWeight": int(decl["font-weight"]),
           "lineHeight": float(decl["line-height"])}
    if decl.get("letter-spacing", "0").strip() not in ("0", "normal"):
        out["letterSpacing"] = decl["letter-spacing"].strip()
    if "font-feature-settings" in decl:
        out["fontFeature"] = decl["font-feature-settings"].strip()
    if decl.get("font-variant-numeric", "").strip() == "tabular-nums":
        out["fontFeature"] = '"tnum" 1'
    return out


def flow(d):
    parts = []
    for k, v in d.items():
        if isinstance(v, str) and not re.fullmatch(r"[\w.\-]+", v):
            v = '"' + v.replace('"', '\\"') + '"'
        parts.append(f"{k}: {v}")
    return "{ " + ", ".join(parts) + " }"


COLORS = ["plum", "plum-700", "sage", "lilac", "green", "paper", "paper-2", "ink", "ink-soft", "line"]
ROLES = ["display", "h1", "h2", "h3", "lead", "body", "label", "eyebrow", "price",
         "ja-hero", "ja-display", "ja-heading", "ja-body", "ja-note"]
# Every text/surface pair the site ships, so `lint` checks its contrast (process/design-md.md §1).
COMPONENTS = {
    "text-body": ("paper", "ink", "body"), "text-soft": ("paper", "ink-soft", "body"),
    "text-body-alt": ("paper-2", "ink", "body"), "text-soft-alt": ("paper-2", "ink-soft", "label"),
    "text-ja-body": ("paper", "ink", "ja-body"), "text-ja-hero": ("paper", "ink", "ja-hero"), "text-eyebrow": ("paper", "ink-soft", "eyebrow"),
    "text-on-dark": ("plum", "paper", "body"), "text-celery-on-dark": ("plum", "green", "h2"),
    "price": ("paper", "ink", "price"),
}

lines = ["# GENERATED from app/globals.css by scripts/design-md-sync.py — do not edit; change the CSS and re-run.",
         "version: alpha", "name: SNöBI",
         "description: Organic specialty coffee from Tokyo Coffee — the Japanese-first store at snobi.jp. Paper and plum; one real bag in daylight.",
         "colors:"]
lines += [f'  {c}: "{var("color-" + c)}"' for c in COLORS]
lines += ['  primary: "{colors.plum}"   # the buy fill (RULES D3)', '  accent: "{colors.sage}"    # focus ring; text only >= 24px',
          "typography:"]
lines += [f"  {r}: {flow(role(r))}" for r in ROLES]
lines += ["rounded:", "  none: 0px   # commerce buttons and inputs", f"  media: {var('radius-media')}", "  full: 9999px",
          "spacing:", f"  gutter: {max_px(var('spacing-gutter'))}   # max of the fluid gutter (16px at 320)",
          f"  section: {max_px(var('spacing-section'))}   # max of the fluid section pad (64px at 320)",
          f"  nav: {max_px(var('spacing-nav'))}", f"  content: {max_px(var('container-content'))}",
          f"  measure: {var('container-measure')}   # JP body measure (~36 kana)",
          "components:"]
for name, (bg, fg, typ) in COMPONENTS.items():
    lines.append(f"  {name}: {flow({'backgroundColor': '{colors.' + bg + '}', 'textColor': '{colors.' + fg + '}', 'typography': '{typography.' + typ + '}'})}")
lines += ["  button-buy: { backgroundColor: \"{colors.plum}\", textColor: \"{colors.paper}\", typography: \"{typography.label}\", rounded: \"{rounded.none}\", padding: 14px 24px, height: 52px }",
          "  button-buy-hover: { backgroundColor: \"{colors.plum-700}\", textColor: \"{colors.paper}\" }",
          "  button-buy-on-dark: { backgroundColor: \"{colors.paper}\", textColor: \"{colors.plum}\", typography: \"{typography.label}\", rounded: \"{rounded.none}\", height: 52px }   # the one exception: on the plum Story band",
          "  button-trade: { backgroundColor: \"{colors.paper}\", textColor: \"{colors.plum}\", typography: \"{typography.label}\", rounded: \"{rounded.none}\", height: 44px }",
          "  selection: { backgroundColor: \"{colors.lilac}\", textColor: \"{colors.plum}\" }"]
# The sage focus ring is non-text (WCAG 1.4.11, 3:1). It is not a component entry because lint applies the 4.5:1
# text rule to every pair; its 4.20:1 on paper is computed in scripts/contrast.py and stated in DESIGN.md Accessibility.
front = "---\n" + "\n".join(lines) + "\n---\n"

old = DESIGN.read_text() if DESIGN.exists() else ""
m = re.match(r"---\n.*?\n---\n", old, re.S)
body = old[m.end():] if m else old
new = front + body
if "--check" in sys.argv:
    sys.exit(0 if new == old else 1)
DESIGN.write_text(new)
print(f"wrote {DESIGN} front matter ({len(lines)} lines)")

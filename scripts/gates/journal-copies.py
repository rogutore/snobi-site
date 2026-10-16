#!/usr/bin/env python3
"""List literal copies of products.ts / ordering.ts / brew.ts facts inside journal post source (outside ${...}).

    python3 -I scripts/gates/journal-copies.py .

Every hit is a value typed by hand that should be read from its source module (SINGLE_SOURCE rule 2), unless it is a
third-party citation or a comment. 2026-10-11: 86 hits → 5 justified (Swiss Water's own 99.9% ×2, the gift article's
order-time → ship-day table)."""
import re, sys
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
prod = (ROOT / "content/products.ts").read_text()
prices = sorted({int(p) for p in re.findall(r"price:\s*(\d+)", prod)})
elev = set(re.findall(r'elevation:\s*"([^"]+)"', prod))
needles = {f"¥{p:,}": "price" for p in prices}
needles.update({f"{p:,}円": "price" for p in prices})
needles.update({e: "elevation" for e in elev})
needles.update({"3,000": "free-shipping threshold", "¥500": "shipping", "¥700": "shipping", "¥800": "shipping",
                "火曜日と金曜日": "schedule", "火・金": "schedule", "正午": "schedule (retired)", "14時": "cutoff",
                "翌日配達": "schedule", "12g": "AJCA dose", "約8杯": "derived cups", "約16杯": "derived cups",
                "99.9%": "decaf claim", "ネコポス": "ship method"})

hits = 0
for f in sorted((ROOT / "content/journal/posts").glob("*.ts")):
    for i, line in enumerate(f.read_text().splitlines(), 1):
        if line.strip().startswith(("//", "/*", "*")):
            continue
        bare = re.sub(r"\$\{[^}]*\}", "", line)
        found = [f"{n} ({k})" for n, k in needles.items() if n in bare]
        if found:
            hits += 1
            print(f"{f.name}:{i}: {', '.join(found)}  | {line.strip()[:110]}")
print(f"\n{hits} line(s) with literal copies")

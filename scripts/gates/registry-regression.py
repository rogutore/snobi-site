#!/usr/bin/env python3
"""Reject malformed registry input; perturb all touched values in a disposable content copy."""
from copy import deepcopy
import hashlib
import json
from pathlib import Path
import runpy
import shutil
import subprocess
import tempfile
import tomllib

ROOT = Path(__file__).resolve().parents[2]
API = runpy.run_path(str(ROOT / "scripts/system-registry.py"))
RAW = tomllib.loads((ROOT / "system.toml").read_text())


def main():
    API["validate"](RAW)
    invalid = []
    for key, value in [("mexico_caffeine_cut", True), ("mexico_caffeine_cut", 101),
                       ("mexico_members", 1.5), ("orizaba_elevation_m", -1),
                       ("roast_days", [0]), ("roast_days", [2, 2]), ("roast_days", [True]),
                       ("enjoy_short", ["one"]), ("enjoy_long", ["", "two"]),
                       ("free_shipping_yen", True), ("free_shipping_yen", 0), ("free_shipping_yen", -1), ("free_shipping_yen", 1.5)]:
        raw = deepcopy(RAW)
        raw["value"][key]["value"] = value
        invalid.append((key + " invalid value", raw))
    for label in ("unknown key", "unknown unit", "missing output", "unknown output"):
        raw = deepcopy(RAW)
        if label == "unknown key":
            raw["value"]["unknown"] = deepcopy(raw["value"]["mexico_members"])
        elif label == "unknown unit":
            raw["value"]["mexico_members"]["unit"] = "unrecognized"
        elif label == "missing output":
            raw["output"].pop("schedule")
        else:
            raw["output"]["unknown"] = deepcopy(raw["output"]["schedule"])
        invalid.append((label, raw))
    for label, raw in invalid:
        try:
            API["validate"](raw)
        except ValueError:
            continue
        raise AssertionError(f"validator accepted {label}")

    with tempfile.TemporaryDirectory(prefix="snobi-registry-") as tmp:
        root = Path(tmp)
        shutil.copytree(ROOT / "content", root / "content")
        # Export content modules, not rendered pages: the UI gates cover current values separately.
        (root / "probe.ts").write_text('import { products } from "./content/products";\n'
            'import * as ordering from "./content/ordering";\n'
            'import { producerNumbers } from "./content/v2";\n'
            'import { posts } from "./content/journal";\n'
            'console.log(JSON.stringify({products, ordering, producerNumbers, posts}));\n')

        def snapshot(raw):
            API["validate"](raw)
            digest = hashlib.sha256(json.dumps(raw, sort_keys=True).encode()).hexdigest()
            (root / "content/system.generated.ts").write_text(API["render"](raw, digest))
            return json.loads(subprocess.check_output(["node", str(ROOT / "node_modules/tsx/dist/cli.mjs"), str(root / "probe.ts")], cwd=ROOT, text=True))

        before = snapshot(RAW)
        cases = {
            "mexico_caffeine_cut": (98.7, ["products", "producerNumbers", "posts"]),
            "mexico_members": (3201, ["products", "producerNumbers", "posts"]),
            "orizaba_elevation_m": (5601, ["products", "producerNumbers", "posts"]),
            "roast_days": ([1, 4], ["ordering", "posts"]),
            "enjoy_short": (["３ヶ月まで、味をお楽しみいただけます！", "Synthetic short-window test."], ["products", "posts"]),
            "enjoy_long": (["４ヶ月まで、味をお楽しみいただけます！", "Synthetic long-window test."], ["products", "posts"]),
            "free_shipping_yen": (2800, ["ordering", "posts"]),
        }
        assert set(cases) == set(RAW["value"])
        for key, (value, consumers) in cases.items():
            raw = deepcopy(RAW)
            raw["value"][key]["value"] = value
            after = snapshot(raw)
            for consumer in consumers:
                assert before[consumer] != after[consumer], f"{key} disconnected from {consumer}"
    print(f"PASS {len(invalid)} malformed-input refusals; {len(cases)} temporary value perturbations reach core content outputs")


if __name__ == "__main__":
    main()

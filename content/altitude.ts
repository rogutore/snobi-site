/* Reference heights for the Fuji altitude section (home section 4, owner pick 2026-10-08).
   Sources (checked 2026-10-08):
   - 富士山 3,776m — 国土地理院 (via fuji-net.co.jp report citing GSI)
   - 富士スバルライン五合目 2,305m — 富士吉田観光ガイド fujiyoshida.net / 河口湖観光情報館
   - 東京スカイツリー 634m — tokyo-skytree.jp (official)
   - 東京タワー 333m — tokyo-skytree.jp comparison / widely published
   Coffee altitudes are NOT here: they are parsed from content/products.ts `elevation` (single source). */
import { products } from "./products";

export const FUJI = 3776;
export const references = [
  { id: "fuji", label: "富士山", m: 3776 },
  { id: "go", label: "富士スバルライン五合目", m: 2305 },
  { id: "skytree", label: "東京スカイツリー", m: 634 },
  { id: "tower", label: "東京タワー", m: 333 },
] as const;

/** "1,731m" → [1731, 1731]; "1,800–2,200m" → [1800, 2200]. Throws on anything else (no silent default). */
export function parseElevation(s: string): [number, number] {
  const n = s.replace(/[m,\s]/g, "").split(/[–-]/).map(Number);
  if (!n.length || n.some((x) => !Number.isFinite(x) || x <= 0)) throw new Error(`cannot read elevation "${s}"`);
  return [n[0], n[n.length - 1]];
}

export const coffeeAltitudes = products.map((p) => {
  const [lo, hi] = parseElevation(p.elevation);
  return { slug: p.slug, lo, hi, mid: (lo + hi) / 2 };
});

/** Computed comparisons shown on the card (never typed by hand). */
export function compare(lo: number, hi: number) {
  const pct = (m: number) => Math.round((m / FUJI) * 100);
  const sky = (m: number) => (m / 634).toFixed(1);
  const range = lo !== hi;
  const goLeft = Math.max(0, 2305 - hi); // m from the top of the farm to the 五合目 (0 = reaches it)
  return {
    fujiPct: range ? `${pct(lo)}–${pct(hi)}%` : `${pct(lo)}%`,
    skytrees: range ? `${sky(lo)}–${sky(hi)}` : sky(lo),
    goLeft,
    vsGo: goLeft === 0 ? "五合目に届く高さ" : `五合目まで、あと${goLeft.toLocaleString("ja-JP")}m`,
  };
}

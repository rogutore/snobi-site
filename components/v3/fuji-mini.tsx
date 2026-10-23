/* 「富士山で測る」 for one origin page: the home section's hand-drawn painting (public/v3/fuji/plate-s.webp, without its
   staff) with this farm's altitude marked against Fuji and the painted Tokyo towers. Static, no motion.
   Geometry: content/fuji-art.json (scripts/export-fuji-art.py). Heights: products.ts via content/altitude.ts;
   comparisons computed by compare(). */
import { FUJI, coffeeAltitudes, compare } from "@/content/altitude";
import type { Coffee } from "@/content/products";
import art from "@/content/fuji-art.json";

const W = art.staff[0] - 20, H = art.height; // the painting up to just before the staff
const y = (m: number) => art.ground - (m * (art.ground - art.summit)) / FUJI;
function ridgeX(yy: number, side: -1 | 1) {
  const pts = side < 0 ? art.ridge.L : art.ridge.R;
  if (yy <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (yy <= pts[i][0]) { const [y0, x0] = pts[i - 1], [y1, x1] = pts[i]; return x0 + ((x1 - x0) * (yy - y0)) / (y1 - y0); }
  }
  return pts[pts.length - 1][1];
}

export function FujiMini({ p }: { p: Coffee }) {
  const a = coffeeAltitudes.find((x) => x.slug === p.slug)!;
  const c = compare(a.lo, a.hi);
  const mid = (a.lo + a.hi) / 2, ym = y(mid), xl = ridgeX(ym, -1), xr = ridgeX(ym, 1);
  const top = (ridgeX(art.summit, -1) + ridgeX(art.summit, 1)) / 2;
  return (
    <figure className="v3-fujimini">
      <div className="plate" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair; the painting is wider than the frame (the staff is cropped off) */}
        <img src="/v3/fuji/plate-s.webp" srcSet={`/v3/fuji/plate-s.webp 800w, /v3/fuji/plate-l.webp ${art.width}w`} sizes={`(min-width: 900px) ${Math.round((660 * art.width) / W)}px, ${Math.round((100 * art.width) / W)}vw`}
          alt="" loading="lazy" decoding="async" style={{ width: `${(100 * art.width) / W}%` }} />
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${p.title.ja}の畑の標高 ${p.elevation}。富士山（3,776m）の${c.fujiPct}、東京スカイツリー${c.skytrees}本分。`}>
        <text x={top} y={y(FUJI) - 22} textAnchor="middle" className="lbl">富士山 3,776m</text>
        <text x={art.towers.skytree + 22} y={y(634) + 10} className="scale"><tspan className="nm">スカイツリー </tspan>634m</text>
        {a.hi !== a.lo ? <rect x={ridgeX(y(a.hi), -1)} width={ridgeX(y(a.hi), 1) - ridgeX(y(a.hi), -1)} y={y(a.hi)} height={y(a.lo) - y(a.hi)} className="band" /> : null}
        <line x1={xl} x2={xr} y1={ym} y2={ym} className="farm" />
        <line x1={60} x2={xl} y1={ym} y2={ym} className="lead" />
        <circle cx={xl} cy={ym} r={11} className="dot" />
        <text x={60} y={ym - 18} className="this">{p.title.ja.split(" ")[0]}の畑 {p.elevation}</text>
      </svg>
      </div>
      <figcaption>
        <dl>
          <div><dt>富士山の高さの</dt><dd>{c.fujiPct}</dd></div>
          <div><dt>スカイツリーを重ねて</dt><dd>{c.skytrees}<small>本分</small></dd></div>
          <div><dt>富士スバルライン五合目まで</dt><dd>{c.goLeft === 0 ? "届く" : <><small className="pre">あと</small>{c.goLeft.toLocaleString("ja-JP")}<small>m</small></>}</dd></div>
        </dl>
      </figcaption>
    </figure>
  );
}

/* 「富士山で測る」 for one origin page: a small plate in the home section's style (framed, hand-tinted, engraved) with
   this farm's altitude marked against Fuji and Tokyo Skytree, true vertical scale. Static, no motion.
   Heights: products.ts via content/altitude.ts; comparisons computed by compare(). */
import { FUJI, coffeeAltitudes, compare } from "@/content/altitude";
import type { Coffee } from "@/content/products";

const W = 520, H = 340, GROUND = 300, TOP = 50, CX = 336, CW = 12, XL = 164, XR = 508, P = 1.9, AX = 58;
const S = (GROUND - TOP) / 4000;
const y = (m: number) => GROUND - m * S;
const eL = CX - CW, eR = CX + CW;
const xAt = (m: number, side: -1 | 1) => { const t = 1 - Math.pow(Math.min(m, FUJI) / FUJI, 1 / P); return side < 0 ? eL - t * (eL - XL) : eR + t * (XR - eR); };

function geometry() {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) { const t = i / 40; pts.push([XL + (eL - XL) * t, y(FUJI * Math.pow(t, P))]); }
  pts.push([CX - CW * 0.45, y(FUJI - 70)], [CX + CW * 0.45, y(FUJI - 70)]);
  for (let i = 0; i <= 40; i++) { const t = i / 40; pts.push([eR + (XR - eR) * t, y(FUJI * Math.pow(1 - t, P))]); }
  const outline = "M" + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" L");
  const fill = `${outline} L${XR},${GROUND} L${XL},${GROUND} Z`;
  const hach = Array.from({ length: 44 }, (_, j) => {
    const u = j / 43, xb = XL + (XR - XL) * u, xt = CX + (xb - CX) * 0.035, cx = xt + (xb - xt) * 0.18;
    return { d: `M${xt.toFixed(1)},${y(FUJI - 40).toFixed(1)} Q${cx.toFixed(1)},${y(FUJI * 0.42).toFixed(1)} ${xb.toFixed(1)},${y(120 + 300 * (0.5 + 0.5 * Math.sin(j * 2.3))).toFixed(1)}`, o: xb < CX ? 0.1 : 0.24 };
  });
  const cap: string[] = [];
  for (let x = XL; x <= XR; x += 3) cap.push(`${x},${y(3250 + 50 * Math.sin(x * 0.07)).toFixed(1)}`);
  return { outline, fill, hach, snow: `M${cap.join(" L")} L${XR},0 L${XL},0 Z` };
}
const G = geometry();

export function FujiMini({ p }: { p: Coffee }) {
  const a = coffeeAltitudes.find((x) => x.slug === p.slug)!;
  const c = compare(a.lo, a.hi);
  const id = `fm-${p.slug}`;
  const mid = (a.lo + a.hi) / 2;
  return (
    <figure className="v3-fujimini">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${p.title.ja}の畑の標高 ${p.elevation}。富士山（3,776m）の${c.fujiPct}、東京スカイツリー${c.skytrees}本分。`}>
        <defs>
          <radialGradient id={`${id}-p`} cx="50%" cy="40%" r="75%"><stop offset="0.55" stopColor="#f6efe0" /><stop offset="1" stopColor="#e7d9bd" /></radialGradient>
          <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a9b6c0" /><stop offset="0.62" stopColor="#9ea791" /><stop offset="1" stopColor="#a5a07a" /></linearGradient>
          <clipPath id={`${id}-c`}><path d={G.fill} /></clipPath>
        </defs>
        <rect width={W} height={H} fill={`url(#${id}-p)`} />
        <rect x={7} y={7} width={W - 14} height={H - 14} className="rule" />
        <line x1={AX} x2={AX} y1={y(0)} y2={y(4000)} className="ink" />
        {[0, 1000, 2000, 3000, 4000].map((m) => (
          <g key={m}><line x1={AX - 5} x2={AX} y1={y(m)} y2={y(m)} className="ink" /><text x={AX - 8} y={y(m) + 3.5} textAnchor="end" className="scale">{m === 0 ? "0" : `${m / 1000},000`}</text></g>
        ))}
        <path d={G.fill} fill={`url(#${id}-b)`} />
        <g clipPath={`url(#${id}-c)`}>
          {G.hach.map((h, i) => <path key={i} d={h.d} className="hach" style={{ strokeOpacity: h.o }} />)}
          <path d={G.snow} className="snow" />
          {a.hi !== a.lo ? <rect x={0} width={W} y={y(a.hi)} height={y(a.lo) - y(a.hi)} className="band" /> : null}
          <line x1={0} x2={W} y1={y(mid)} y2={y(mid)} className="farm" />
        </g>
        <path d={G.outline} className="ink edge" />
        <text x={CX} y={y(FUJI) - 8} textAnchor="middle" className="lbl">富士山 3,776m</text>
        {/* Skytree to the same scale */}
        <path d={`M103,${GROUND} L105.5,${y(634)} L106.5,${y(634)} L109,${GROUND} Z`} className="tower" />
        <text x={100} y={y(634) - 8} className="scale">スカイツリー 634m</text>
        <line x1={AX} x2={xAt(mid, -1)} y1={y(mid)} y2={y(mid)} className="lead" />
        <circle cx={xAt(mid, -1)} cy={y(mid)} r={5} className="dot" />
        <text x={AX + 8} y={y(mid) - 8} className="this">{p.title.ja.split(" ")[0]}の畑 {p.elevation}</text>
        <line x1={AX} x2={W - 18} y1={GROUND} y2={GROUND} className="ink" />
      </svg>
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

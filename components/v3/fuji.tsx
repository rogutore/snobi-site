"use client";
/* 「富士山で測る、4つの畑の高さ。」 — home section 4 (owner pick 2026-10-08), replacing the origins list.
   Vertical scale is true (metres → px, one factor); horizontal is compressed (said in the footnote).
   Coffee heights come from products.ts via content/altitude.ts; comparisons are computed, never typed.
   One orchestrated moment: when the section enters view, the outline draws and the four markers rise from the ground. */
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen } from "@/content/products";
import { FUJI, coffeeAltitudes, compare } from "@/content/altitude";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { useCart } from "@/components/commerce/cart";

type Cfg = {
  W: number; H: number; ground: number; top: number; ruler: number;
  cx: number; cw: number; xL: number; xR: number; p: number;
  f: { badge: number; label: number; sub: number; ruler: number; ref: number; big: number };
  labels: boolean; towers: boolean; sky: number; tower: number;
};
const DESKTOP: Cfg = { W: 1600, H: 840, ground: 770, top: 80, ruler: 96, cx: 1080, cw: 46, xL: 380, xR: 1800, p: 1.9,
  f: { badge: 14, label: 30, sub: 17, ruler: 15, ref: 15, big: 54 }, labels: true, towers: true, sky: 200, tower: 262 };
const MOBILE: Cfg = { W: 800, H: 900, ground: 830, top: 70, ruler: 70, cx: 480, cw: 24, xL: 150, xR: 810, p: 1.9,
  f: { badge: 30, label: 0, sub: 0, ruler: 26, ref: 24, big: 64 }, labels: false, towers: true, sky: 112, tower: 0 };
// which slope each coffee sits on, and whether its label goes above or below (kept apart: Peru/Ethiopia left, Colombia/Mexico right)
const SIDE: Record<string, { side: -1 | 1; up: boolean; at: number }> = {
  peru: { side: -1, up: false, at: 0.5 }, "ethiopia-guji": { side: -1, up: true, at: 0.5 },
  "colombia-huila": { side: 1, up: true, at: 0.5 }, "mexico-chiapas-decaf": { side: 1, up: false, at: 0.2 }, // at = where the dot sits within a range
};
const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

function geo(c: Cfg) {
  const s = (c.ground - c.top) / 4000; // px per metre, the one vertical scale
  const y = (m: number) => c.ground - m * s;
  const eL = c.cx - c.cw, eR = c.cx + c.cw;
  const xAt = (m: number, side: -1 | 1) => { const t = 1 - Math.pow(m / FUJI, 1 / c.p); return side < 0 ? eL - t * (eL - c.xL) : eR + t * (c.xR - eR); };
  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) { const t = i / 60; pts.push([c.xL + (eL - c.xL) * t, y(FUJI * Math.pow(t, c.p))]); }
  // crater: a shallow dip of ~70 m between the rims
  pts.push([c.cx - c.cw * 0.45, y(FUJI - 70)], [c.cx + c.cw * 0.45, y(FUJI - 70)]);
  for (let i = 0; i <= 60; i++) { const t = i / 60; pts.push([eR + (c.xR - eR) * t, y(FUJI * Math.pow(1 - t, c.p))]); }
  const outline = "M" + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" L");
  const fill = `${outline} L${c.xR},${c.ground} L${c.xL},${c.ground} Z`;
  // snow: above a soft, irregular line near 3,000 m; gullies carry it down the slopes (deterministic, no randomness)
  const cap: string[] = [];
  for (let x = c.xL; x <= c.xR; x += 3) cap.push(`${x},${y(3280 + 40 * Math.sin(x * 0.05) + 22 * Math.sin(x * 0.13 + 0.7)).toFixed(1)}`);
  const snowPath = `M${cap.join(" L")} L${c.xR},${c.top - 40} L${c.xL},${c.top - 40} Z`;
  // engraving: hachure lines running down the slopes from near the crater, denser and darker on the shaded (right) side;
  // every few lines also carries a tapered snow streak down its gully (snow follows the slope, as on the real mountain)
  const hach: { d: string; o: number }[] = [];
  const streaks: string[] = [];
  const N = 84;
  for (let j = 0; j <= N; j++) {
    const u = j / N; const xb = c.xL + (c.xR - c.xL) * u; const side = xb < c.cx ? -1 : 1;
    const xt = c.cx + (xb - c.cx) * 0.035; const yt = y(FUJI - 40);
    const endM = 120 + 380 * (0.5 + 0.5 * Math.sin(j * 2.3));
    const yb = y(endM); const xe = xb;
    const cxp = xt + (xe - xt) * 0.18, cyp = y(FUJI * 0.42);
    hach.push({ d: `M${xt.toFixed(1)},${yt.toFixed(1)} Q${cxp.toFixed(1)},${cyp.toFixed(1)} ${xe.toFixed(1)},${yb.toFixed(1)}`, o: side < 0 ? 0.07 + 0.05 * Math.abs(Math.sin(j)) : 0.16 + 0.08 * Math.abs(Math.sin(j * 1.7)) });
    if (j % 3 === 1 && Math.abs(u - 0.5) < 0.42) {
      const q = (t: number): [number, number] => [(1 - t) * (1 - t) * xt + 2 * (1 - t) * t * cxp + t * t * xe, (1 - t) * (1 - t) * yt + 2 * (1 - t) * t * cyp + t * t * yb];
      const stopM = 2450 + 420 * (0.5 + 0.5 * Math.sin(j * 1.9)); // streak ends between ~2,450 and ~2,870 m
      let tEnd = 0; while (tEnd < 1 && q(tEnd)[1] < y(stopM)) tEnd += 0.005;
      const L: string[] = [], R: string[] = [];
      for (let k = 0; k <= 24; k++) {
        const t = (tEnd * k) / 24; const [px, py] = q(t); const [nx, ny] = q(Math.min(1, t + 0.004));
        const dx = nx - px, dy = ny - py, len = Math.hypot(dx, dy) || 1; const w = (c.W / 1600) * 5.5 * (1 - k / 24) ** 0.8;
        L.push(`${(px - (dy / len) * w).toFixed(1)},${(py + (dx / len) * w).toFixed(1)}`);
        R.unshift(`${(px + (dy / len) * w).toFixed(1)},${(py - (dx / len) * w).toFixed(1)}`);
      }
      streaks.push(`M${L.join(" L")} L${R.join(" L")} Z`);
    }
  }
  return { s, y, xAt, outline, fill, snowPath, hach, streaks };
}

function Chart({ c, sel, setSel, prog, id }: { c: Cfg; sel: number; setSel: (i: number) => void; prog: number; id: string }) {
  const g = useMemo(() => geo(c), [c]);
  const shown = coffeeAltitudes.map((a, i) => ({ ...a, dotM: a.lo + (a.hi - a.lo) * SIDE[a.slug].at, k: ease((prog - i * 0.12) / 0.6) }));
  const cur = shown[sel];
  const curY = g.y(cur.dotM * cur.k);
  return (
    <svg viewBox={`0 0 ${c.W} ${c.H}`} className={`v3-fuji-svg ${c.labels ? "is-desktop" : "is-mobile"}`} role="img"
      aria-label={`富士山（${FUJI.toLocaleString()}m）と4つの畑の標高。${products.map((p) => `${p.title.ja} ${p.elevation}`).join("、")}`}>
      <defs>
        <clipPath id={`${id}-m`}><path d={g.fill} /></clipPath>
        <linearGradient id={`${id}-shade`} x1="0" x2="1"><stop offset="0.48" stopColor="var(--color-ink)" stopOpacity="0" /><stop offset="0.52" stopColor="var(--color-ink)" stopOpacity="0.06" /><stop offset="1" stopColor="var(--color-ink)" stopOpacity="0.1" /></linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--color-paper-2)" /><stop offset="1" stopColor="#e4ddd0" /></linearGradient>
      </defs>
      {/* ruler, true scale */}
      <line x1={c.ruler} x2={c.ruler} y1={g.y(0)} y2={g.y(4000)} className="ax" />
      {[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000].map((m) => (
        <g key={m}>
          <line x1={c.ruler - 8} x2={c.ruler} y1={g.y(m)} y2={g.y(m)} className="ax" />
          <text x={c.ruler - 14} y={g.y(m) + c.f.ruler * 0.35} textAnchor="end" className="rl" style={{ fontSize: c.f.ruler }}>{m === 4000 ? "4,000m" : m.toLocaleString()}</text>
        </g>
      ))}
      {[500, 1000, 1500, 2000, 2500, 3000, 3500].map((m) => <line key={m} x1={c.ruler} x2={c.W} y1={g.y(m)} y2={g.y(m)} className="gl" />)}
      {/* the mountain */}
      <path d={g.fill} fill={`url(#${id}-body)`} style={{ opacity: 0.25 + 0.75 * ease(prog * 1.4) }} />
      <g clipPath={`url(#${id}-m)`}>
        <rect x={0} y={0} width={c.W} height={c.H} fill={`url(#${id}-shade)`} />
        {g.hach.map((h, i) => <path key={i} d={h.d} className="hc" style={{ strokeOpacity: h.o * ease(prog * 1.3 - 0.15) }} />)}
        <g style={{ opacity: ease(prog * 1.2 - 0.3) }}>
          <path d={g.snowPath} className="snow" />
          {g.streaks.map((d, i) => <path key={i} d={d} className="snow" />)}
        </g>
      </g>
      <path d={g.outline} pathLength={1} className="ol" style={{ strokeDasharray: 1, strokeDashoffset: 1 - ease(prog * 1.1) }} />
      <line x1={0} x2={c.W} y1={g.y(0)} y2={g.y(0)} className="gr" />
      {/* references */}
      <text x={c.cx} y={g.y(FUJI) - 18} textAnchor="middle" className="ref strong" style={{ fontSize: c.f.ref * 1.25 }}>富士山 3,776m</text>
      <g>
        <line x1={g.xAt(2305, 1) - 2} x2={g.xAt(2305, 1) + 22} y1={g.y(2305)} y2={g.y(2305)} className="ref-tick" />
        <text x={g.xAt(2305, 1) + 28} y={g.y(2305) + c.f.ref * 0.35} className="ref" style={{ fontSize: c.f.ref }}>{c.labels ? "富士スバルライン五合目 2,305m" : "五合目 2,305m"}</text>
      </g>
      {c.towers && c.sky ? (
        <g className="tw">
          {/* Tokyo Skytree, 634 m, to the same vertical scale */}
          <path d={`M${c.sky - 7},${g.y(0)} L${c.sky - 2},${g.y(560)} L${c.sky - 1},${g.y(634)} L${c.sky + 1},${g.y(634)} L${c.sky + 2},${g.y(560)} L${c.sky + 7},${g.y(0)} Z`} />
          <rect x={c.sky - 5} y={g.y(355)} width={10} height={4} /><rect x={c.sky - 4} y={g.y(452)} width={8} height={3} />
          <text x={c.sky} y={g.y(634) - 10} textAnchor="middle" className="ref" style={{ fontSize: c.f.ref }}>スカイツリー 634m</text>
        </g>
      ) : null}
      {c.towers && c.tower ? (
        <g className="tw">
          {/* Tokyo Tower, 333 m */}
          <path d={`M${c.tower - 13},${g.y(0)} L${c.tower - 1},${g.y(333)} L${c.tower + 1},${g.y(333)} L${c.tower + 13},${g.y(0)} L${c.tower + 8},${g.y(0)} L${c.tower},${g.y(150)} L${c.tower - 8},${g.y(0)} Z`} />
          <text x={c.tower + 4} y={g.y(333) - 10} textAnchor="start" className="ref" style={{ fontSize: c.f.ref }}>東京タワー 333m</text>
        </g>
      ) : null}
      {/* selected height: a line to the ruler and the number set large */}
      <line x1={c.ruler} x2={g.xAt(Math.max(1, cur.dotM * cur.k), SIDE[cur.slug].side)} y1={curY} y2={curY} className="sel-line" />
      <text x={c.ruler + 16} y={curY - 14} className="big" style={{ fontSize: c.f.big }}>{Math.round(cur.lo * cur.k).toLocaleString()}{cur.hi !== cur.lo ? `–${Math.round(cur.hi * cur.k).toLocaleString()}` : ""}m</text>
      {/* the four farms */}
      {shown.map((a, i) => {
        const sd = SIDE[a.slug]; const p = products.find((x) => x.slug === a.slug)!;
        const lo = a.lo * a.k, hi = a.hi * a.k, mid = a.dotM * a.k;
        const x = g.xAt(Math.max(1, mid), sd.side), yy = g.y(mid);
        const lx = x + sd.side * (c.labels ? 70 : 0), ly = yy + (sd.up ? -34 : 52);
        return (
          <g key={a.slug} className={`pin ${sel === i ? "on" : ""}`} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} style={{ cursor: "pointer" }}>
            {a.hi !== a.lo ? <line x1={g.xAt(Math.max(1, lo), sd.side)} y1={g.y(lo)} x2={g.xAt(Math.max(1, hi), sd.side)} y2={g.y(hi)} className="band" /> : null}
            {c.labels ? (
              <>
                <line x1={x} y1={yy} x2={lx - sd.side * 6} y2={ly - 10} className="leader" />
                <text x={lx} y={ly - 8} textAnchor={sd.side < 0 ? "end" : "start"} className="lbl" style={{ fontSize: c.f.label }} lang="en">{p.country}</text>
                <text x={lx} y={ly + c.f.sub + 4} textAnchor={sd.side < 0 ? "end" : "start"} className="sub" style={{ fontSize: c.f.sub }}>{String(i + 1).padStart(2, "0")} · {p.elevation}</text>
              </>
            ) : null}
            <circle cx={x} cy={yy} r={c.f.badge * 0.86} className="dot" />
            <text x={x} y={yy + c.f.badge * 0.36} textAnchor="middle" className="num" style={{ fontSize: c.f.badge }}>{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function FujiAltitude({ stock }: { stock: StockMap }) {
  const [sel, setSel] = useState(0);
  const [prog, setProg] = useState(0);
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const ref = useRef<HTMLElement>(null);
  const cart = useCart();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { const r = requestAnimationFrame(() => setProg(1.8)); return () => cancelAnimationFrame(r); }
    let raf = 0, t0 = 0, fallback = 0;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting || t0) return;
      t0 = performance.now();
      const tick = (now: number) => { const p = Math.min(1.8, (now - t0) / 1400); setProg(p); if (p < 1.8) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
      fallback = window.setTimeout(() => { cancelAnimationFrame(raf); setProg(1.8); }, 3200); // background tabs throttle rAF: always finish
    }, { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(fallback); };
  }, []);
  const a = coffeeAltitudes[sel];
  const p = products.find((x) => x.slug === a.slug)!;
  const cmp = compare(a.lo, a.hi);
  const v = p.variants.find((x) => x.size === size)!;
  const s = stock[v.id];
  const ok = !!s?.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0);
  const price = s?.price.currencyCode === "JPY" ? Number(s.price.amount) : v.price;
  return (
    <section ref={ref} className="v3-sec v3-fuji" aria-labelledby="fuji-h">
      <div className="v3-sec-head">
        <div>
          <p className="eyebrow">Altitude — 4 origins</p>
          <h2 id="fuji-h" className="display">富士山で測る、<br />4つの畑の高さ。</h2>
        </div>
        <Link className="v3-btn ghost" href="/origins">産地のページへ →</Link>
      </div>
      <div className="v3-fuji-stage">
        <Chart c={DESKTOP} sel={sel} setSel={setSel} prog={prog} id="fd" />
        <Chart c={MOBILE} sel={sel} setSel={setSel} prog={prog} id="fm" />
      </div>
      <div className="v3-fuji-pick" role="tablist" aria-label="産地を選ぶ">
        {products.map((x, i) => (
          <button key={x.slug} type="button" role="tab" aria-selected={sel === i} onClick={() => setSel(i)}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="c" lang="en">{x.country}</span>
            <span className="m">{x.elevation}</span>
          </button>
        ))}
      </div>
      <div className="v3-fuji-card" role="tabpanel" aria-live="polite">
        <Link href={`/origins/${p.slug}`} className="ph" aria-label={`${p.title.ja}の産地ページへ`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
          <img src={`/v2/photos/${originFrames[p.slug].hero}-s.webp`} alt={`SNöBI ${p.title.ja}`} />
        </Link>
        <div className="facts">
          <p className="eyebrow">{String(sel + 1).padStart(2, "0")} — {p.country.toUpperCase()}</p>
          <h3>{p.title.ja}</h3>
          <p className="where">{p.region.ja} · {p.producer.ja}</p>
          <dl className="cmp">
            <div><dt>標高</dt><dd>{p.elevation}</dd></div>
            <div><dt>富士山の</dt><dd>{cmp.fujiPct}</dd></div>
            <div><dt>スカイツリー</dt><dd>{cmp.skytrees}本分</dd></div>
          </dl>
          <p className="go">{cmp.vsGo}</p>
        </div>
        <div className="buy">
          <p className="notes">{p.notes.ja.join(" · ")}</p>
          <p className="enjoy">{p.enjoyWithin.ja}</p>
          <div className="row">
            <div className="sizes" role="radiogroup" aria-label="サイズ">
              {p.variants.map((x) => <button key={x.id} type="button" role="radio" aria-checked={size === x.size} onClick={() => setSize(x.size)}>{x.size}</button>)}
            </div>
            <b className="price">{yen(price)}</b>
          </div>
          <button type="button" className="v3-btn add" disabled={!ok || cart.pending} onClick={() => cart.add(v.id)}>
            {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}{ok ? "カートに入れる" : s ? "完売" : "在庫確認中"}
          </button>
          <Link href={`/origins/${p.slug}`} className="more">産地について詳しく読みたい方 →</Link>
        </div>
      </div>
      <p className="v3-fuji-note">高さは実寸、横幅は縮めています。標高：富士山 3,776m（国土地理院）、富士スバルライン五合目 2,305m、東京スカイツリー 634m、東京タワー 333m。</p>
    </section>
  );
}

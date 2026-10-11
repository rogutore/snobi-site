"use client";
/* 「富士山」(was 富士登山; owner 2026-10-09) — home section 4, the owner's "Combine. Surprise me." (2026-10-08). Three proven references in one:
   - the look: an antique comparative-heights plate (Darton & Gardner, 1823): framed, hand-tinted, engraved, numbered;
   - the mechanic: neal.fun "The Deep Sea", upside down: native scroll climbs, a big live altimeter counts;
   - the reward: Fuji's 金剛杖 焼印: as the boar passes each farm's true height, that coffee is branded onto the staff.
   One vertical scale (metres → px) is shared by the mountain, the trail and the staff. Heights come from products.ts
   (via content/altitude.ts); comparisons are computed. Native scroll only (sticky stage, no wheel hijack). */
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen } from "@/content/products";
import { FUJI, coffeeAltitudes, compare } from "@/content/altitude";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { buyLabel, canBuy, livePrice } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";

const W = 1000, H = 760, GROUND = 690, TOP = 96, CX = 560, CW = 22, XL = 196, XR = 924, P = 1.9;
const S = (GROUND - TOP) / 4000;
const y = (m: number) => GROUND - m * S;
const eL = CX - CW, eR = CX + CW;
const xAt = (m: number, side: -1 | 1) => { const t = 1 - Math.pow(Math.min(m, FUJI) / FUJI, 1 / P); return side < 0 ? eL - t * (eL - XL) : eR + t * (XR - eR); };
const STAFF = 966; // staff centre x, outside the mountain's right foot

/* Each coffee: which face of the (square) staff its stamp goes on, its stamp shape, and the katakana it carries.
   Colombia (1,700 m) and Peru (1,731 m) are 31 m apart, so they sit on opposite faces, as on a real 金剛杖. */
const STAMP: Record<string, { face: -1 | 1; shape: "gourd" | "circle" | "square" | "hex"; kana: string; at: number; label: -1 | 1 }> = {
  "mexico-chiapas-decaf": { face: -1, shape: "gourd", kana: "メ", at: 0, label: -1 }, // branded on entering its range (1,400 m) so it clears Peru on the same face
  "colombia-huila": { face: 1, shape: "circle", kana: "コ", at: 0.5, label: 1 },
  peru: { face: -1, shape: "square", kana: "ペ", at: 0.5, label: -1 },
  "ethiopia-guji": { face: 1, shape: "hex", kana: "エ", at: 0.5, label: 1 },
};
const order = [...coffeeAltitudes].sort((a, b) => a.lo - b.lo); // the order you climb past them
const MARKS = [
  { m: 333, text: "東京タワーを越えた" }, { m: 634, text: "スカイツリーを越えた" }, { m: 1000, text: "雲の上へ" },
  { m: 1400, text: "メキシコ・チアパスの畑の高さ" }, { m: 1700, text: "コロンビアとペルーの畑の高さ" }, { m: 2000, text: "エチオピア・グジの畑の高さ" },
  { m: 2305, text: "富士スバルライン五合目" }, { m: 3700, text: "まもなく頂上" }, { m: 3776, text: "頂上。御来光。" },
];

function useGeometry() {
  return useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 60; i++) { const t = i / 60; pts.push([XL + (eL - XL) * t, y(FUJI * Math.pow(t, P))]); }
    pts.push([CX - CW * 0.45, y(FUJI - 70)], [CX + CW * 0.45, y(FUJI - 70)]);
    for (let i = 0; i <= 60; i++) { const t = i / 60; pts.push([eR + (XR - eR) * t, y(FUJI * Math.pow(1 - t, P))]); }
    const outline = "M" + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" L");
    const fill = `${outline} L${XR},${GROUND} L${XL},${GROUND} Z`;
    const cap: string[] = [];
    for (let x = XL; x <= XR; x += 3) cap.push(`${x},${y(3280 + 40 * Math.sin(x * 0.05) + 22 * Math.sin(x * 0.13 + 0.7)).toFixed(1)}`);
    const snow = `M${cap.join(" L")} L${XR},0 L${XL},0 Z`;
    const hach: { d: string; o: number }[] = []; const streaks: string[] = [];
    for (let j = 0; j <= 76; j++) {
      const u = j / 76, xb = XL + (XR - XL) * u, xt = CX + (xb - CX) * 0.035, yt = y(FUJI - 40);
      const endM = 100 + 360 * (0.5 + 0.5 * Math.sin(j * 2.3)), yb = y(endM), cxp = xt + (xb - xt) * 0.18, cyp = y(FUJI * 0.42);
      hach.push({ d: `M${xt.toFixed(1)},${yt.toFixed(1)} Q${cxp.toFixed(1)},${cyp.toFixed(1)} ${xb.toFixed(1)},${yb.toFixed(1)}`, o: xb < CX ? 0.1 : 0.24 });
      if (j % 3 === 1 && Math.abs(u - 0.5) < 0.42) {
        const q = (t: number): [number, number] => [(1 - t) ** 2 * xt + 2 * (1 - t) * t * cxp + t * t * xb, (1 - t) ** 2 * yt + 2 * (1 - t) * t * cyp + t * t * yb];
        const stopM = 2450 + 420 * (0.5 + 0.5 * Math.sin(j * 1.9)); let tEnd = 0; while (tEnd < 1 && q(tEnd)[1] < y(stopM)) tEnd += 0.005;
        const Lp: string[] = [], Rp: string[] = [];
        for (let k = 0; k <= 20; k++) { const t = (tEnd * k) / 20, [px, py] = q(t), [nx, ny] = q(Math.min(1, t + 0.004)); const dx = nx - px, dy = ny - py, len = Math.hypot(dx, dy) || 1, w = 3.6 * (1 - k / 20) ** 0.8; Lp.push(`${(px - (dy / len) * w).toFixed(1)},${(py + (dx / len) * w).toFixed(1)}`); Rp.unshift(`${(px + (dy / len) * w).toFixed(1)},${(py - (dx / len) * w).toFixed(1)}`); }
        streaks.push(`M${Lp.join(" L")} L${Rp.join(" L")} Z`);
      }
    }
    // the trail: switchbacks up the left face, inside the mountain at every height
    const trail: [number, number][] = [];
    for (let m = 0; m <= FUJI; m += 18) { const left = xAt(m, -1), half = CX - left; trail.push([left + half * (0.42 + 0.22 * Math.sin(m / 150)), y(m)]); }
    // foreground band with little trees (the 1823 plate's lower edge)
    const trees: [number, number][] = Array.from({ length: 46 }, (_, i) => [30 + i * 21 + 6 * Math.sin(i * 1.7), GROUND - 6 - 5 * Math.abs(Math.sin(i * 2.1))]);
    return { outline, fill, snow, hach, streaks, trail, trees };
  }, []);
}

function StampShape({ shape, x, yy, kana }: { shape: string; x: number; yy: number; kana: string }) {
  return (
    <g className="brand" filter="url(#fc-burn)" style={{ transformOrigin: `${x}px ${yy}px` }}>
      {shape === "circle" && <circle cx={x} cy={yy} r={10} />}
      {shape === "square" && <rect x={x - 9} y={yy - 11} width={18} height={22} />}
      {shape === "gourd" && <path d={`M${x},${yy - 13} c5,0 6,6 2,8 c8,3 8,16 -2,17 c-10,-1 -10,-14 -2,-17 c-4,-2 -3,-8 2,-8 Z`} />}
      {shape === "hex" && <path d={`M${x},${yy - 12} l10,6 v12 l-10,6 l-10,-6 v-12 Z`} />}
      <text x={x} y={yy + 4} textAnchor="middle">{kana}</text>
    </g>
  );
}

export function FujiClimb({ stock }: { stock: StockMap }) {
  const g = useGeometry();
  const sec = useRef<HTMLElement>(null);
  const [alt, setAlt] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();

  useEffect(() => {
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0, cur = 0, raf = 0;
    const read = () => {
      const el = sec.current; if (!el) return;
      const r = el.getBoundingClientRect(), total = el.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      target = FUJI * Math.min(1, p / 0.92); // the last 8% of the scroll holds the summit
    };
    const tick = () => { cur += (target - cur) * 0.14; setAlt((a) => (Math.abs(a - cur) > 0.5 ? cur : a)); raf = requestAnimationFrame(tick); };
    if (rm) { raf = requestAnimationFrame(() => { setReduced(true); setAlt(FUJI); }); return () => cancelAnimationFrame(raf); }
    read(); addEventListener("scroll", read, { passive: true }); addEventListener("resize", read);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", read); removeEventListener("resize", read); };
  }, []);

  const got = order.filter((a) => alt >= a.lo + (a.hi - a.lo) * STAMP[a.slug].at);
  const latest = got[got.length - 1];
  const summit = alt >= FUJI - 1;
  const mark = summit ? MARKS[MARKS.length - 1] : [...MARKS].reverse().find((k) => alt >= k.m);
  // climber position on the trail
  const idx = Math.min(g.trail.length - 1, Math.max(0, Math.round((alt / FUJI) * (g.trail.length - 1))));
  const [bx, by] = g.trail[idx];
  const dir = g.trail[Math.min(g.trail.length - 1, idx + 1)][0] >= bx ? 1 : -1;
  const done = g.trail.slice(0, idx + 1).map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");
  const all = g.trail.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

  const p = latest ? products.find((x) => x.slug === latest.slug)! : null;
  const v = p?.variants.find((x) => x.size === size);
  const ok = v ? canBuy(stock, v.id) : false;
  const price = v ? livePrice(stock, v) : 0;
  const allIds = products.map((x) => x.variants.find((vv) => vv.size === "100g")!.id);
  const allOk = allIds.every((id) => canBuy(stock, id));
  const allPrice = products.reduce((sum, x) => sum + livePrice(stock, x.variants.find((z) => z.size === "100g")!), 0);

  return (
    <section ref={sec} id="fuji" className={`v3-climb ${reduced ? "is-static" : ""}`} aria-labelledby="climb-h">
      <div className="v3-climb-stage">
        <div className="v3-climb-head">
          <p className="eyebrow">Altitude — 4 origins</p>
          <h2 id="climb-h" className="display">富士山で測る、4つの畑の高さ。</h2>
        </div>
        <div className="v3-climb-body">
          <div className="v3-climb-plate">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`富士山（3,776m）を登りながら、4つの畑の標高で杖に焼印。${products.map((x) => `${x.title.ja} ${x.elevation}`).join("、")}`}>
              <defs>
                <radialGradient id="fc-paper" cx="50%" cy="42%" r="75%"><stop offset="0.55" stopColor="#f6efe0" /><stop offset="1" stopColor="#e7d9bd" /></radialGradient>
                <linearGradient id="fc-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a9b6c0" /><stop offset="0.62" stopColor="#9ea791" /><stop offset="1" stopColor="#a5a07a" /></linearGradient>
                <linearGradient id="fc-wood" x1="0" x2="1"><stop offset="0" stopColor="#ecd1a4" /><stop offset="0.5" stopColor="#ecd1a4" /><stop offset="0.5" stopColor="#d4ac77" /><stop offset="1" stopColor="#c99f69" /></linearGradient>
                <radialGradient id="fc-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#f7c97c" stopOpacity="0.9" /><stop offset="1" stopColor="#f7c97c" stopOpacity="0" /></radialGradient>
                <clipPath id="fc-m"><path d={g.fill} /></clipPath>
                <filter id="fc-burn" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" /><feDisplacementMap in="SourceGraphic" scale="1.8" /></filter>
              </defs>
              {/* the plate */}
              <rect width={W} height={H} fill="url(#fc-paper)" />
              <circle cx={CX} cy={y(FUJI) + 10} r={190} fill="url(#fc-sun)" className="sun" style={{ opacity: summit ? 1 : 0 }} />
              <rect x={10} y={10} width={W - 20} height={H - 20} className="rule" />
              <rect x={17} y={17} width={W - 34} height={H - 34} className="rule thin" />
              {/* title, set vertically in the open sky like a print's title (owner 2026-10-09: no frame, 「富士山」) */}
              <g className="ttl" aria-hidden>
                <text x={128} y={112} className="ttl-main" style={{ writingMode: "vertical-rl" }}>富士山</text>
                <text x={90} y={116} className="ttl-sub" style={{ writingMode: "vertical-rl" }}>第一章　四つの畑の高さ</text>
              </g>
              {/* scale in the margin */}
              <line x1={58} x2={58} y1={y(0)} y2={y(4000)} className="ink" />
              {[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000].map((m) => (
                <g key={m}><line x1={52} x2={58} y1={y(m)} y2={y(m)} className="ink" /><text x={48} y={y(m) + 4} textAnchor="end" className="scale">{m.toLocaleString()}</text></g>
              ))}
              {/* Fuji, hand-tinted and engraved */}
              <path d={g.fill} fill="url(#fc-body)" />
              <g clipPath="url(#fc-m)">
                {g.hach.map((h, i) => <path key={i} d={h.d} className="hach" style={{ strokeOpacity: h.o }} />)}
                <path d={g.snow} className="snow" />
                {g.streaks.map((d, i) => <path key={i} d={d} className="snow" />)}
                {order.map((a) => (
                  <g key={a.slug} className={`farm-line ${got.includes(a) ? "on" : ""}`}>
                    {a.hi !== a.lo ? <rect x={0} width={W} y={y(a.hi)} height={y(a.lo) - y(a.hi)} className="band" /> : null}
                    <line x1={0} x2={W} y1={y(a.lo + (a.hi - a.lo) * STAMP[a.slug].at)} y2={y(a.lo + (a.hi - a.lo) * STAMP[a.slug].at)} />
                  </g>
                ))}
              </g>
              <path d={g.outline} className="ink fuji-edge" />
              {/* farm labels, numbered like the 1823 key, outside the slopes */}
              {order.map((a) => {
                const pr = products.find((x) => x.slug === a.slug)!, i = products.indexOf(pr) + 1, sd = STAMP[a.slug].label;
                const m = a.lo + (a.hi - a.lo) * STAMP[a.slug].at, lx = xAt(m, sd) + sd * 14;
                return (
                  <g key={a.slug} className={`farm-label ${got.includes(a) ? "on" : ""}`}>
                    <circle cx={lx + sd * 9} cy={y(m) - 4} r={8.5} />
                    <text x={lx + sd * 9} y={y(m) - 0.5} textAnchor="middle" className="num">{i}</text>
                    <text x={lx + sd * 22} y={y(m)} textAnchor={sd < 0 ? "end" : "start"} className="lbl">{pr.title.ja.split(" ")[0]} {pr.elevation}</text>
                  </g>
                );
              })}
              <g className="go">
                <line x1={xAt(2305, 1) + 4} x2={xAt(2305, 1) + 18} y1={y(2305)} y2={y(2305)} className="ink" />
                <text x={xAt(2305, 1) + 22} y={y(2305) + 4} className="lbl">五合目 2,305m</text>
              </g>
              <text x={CX} y={y(FUJI) - 34} textAnchor="middle" className="lbl strong">山頂 3,776m</text>
              {/* foreground hills, trees and the two Tokyo towers (to scale) */}
              <path d={`M20,${GROUND} C160,${GROUND - 20} 300,${GROUND - 6} 420,${GROUND - 16} S700,${GROUND - 4} 820,${GROUND - 14} S960,${GROUND - 6} 980,${GROUND - 10} L980,${GROUND} Z`} className="hills" />
              {g.trees.map(([tx, ty], i) => <path key={i} d={`M${tx},${ty - 10} l4.5,10 h-9 Z`} className="tree" />)}
              <path d={`M104,${GROUND} L109,${y(333)} L111,${y(333)} L116,${GROUND} Z`} className="tower" />
              <path d={`M140,${GROUND} L143,${y(634)} L145,${y(634)} L148,${GROUND} Z`} className="sky" />
              <text x={110} y={GROUND + 18} textAnchor="middle" className="scale">東京タワー</text>
              <text x={144} y={y(634) - 6} textAnchor="middle" className="scale">スカイツリー</text>
              <line x1={20} x2={W - 20} y1={GROUND} y2={GROUND} className="ink" />
              {/* the trail and the climber */}
              <polyline points={all} className="trail" />
              <polyline points={done} className="trail done" />
              <g transform={`translate(${bx},${by - 12}) scale(${dir},1)`} className="boar">
                <image href="/brand/snobi.svg" x={-15} y={-13} width={30} height={26} />
              </g>
              {/* the 金剛杖: same vertical scale as the mountain; stamps burn in as the boar passes their height */}
              <g className="staff">
                <path d={`M${STAFF - 22},${y(FUJI) - 26} L${STAFF},${y(FUJI) - 38} L${STAFF + 22},${y(FUJI) - 26} L${STAFF + 22},${GROUND + 4} L${STAFF - 22},${GROUND + 4} Z`} fill="url(#fc-wood)" className="staff-body" />
                <path d={`M${STAFF - 22},${y(FUJI) - 20} l-10,56 l15,-9 l11,17 l2,-64 Z`} className="cloth" />
                <circle cx={STAFF + 26} cy={y(FUJI) - 6} r={6.5} className="bell" />
                {order.map((a) => {
                  const sp = STAMP[a.slug], m = a.lo + (a.hi - a.lo) * sp.at, on = got.includes(a);
                  return (
                    <g key={a.slug} className={`stamp ${on ? "on" : ""}`}>
                      <StampShape shape={sp.shape} x={STAFF + sp.face * 11} yy={y(m)} kana={sp.kana} />
                      <g className="puff"><circle cx={STAFF + sp.face * 11 - 14} cy={y(m) - 18} r={7} /><circle cx={STAFF + sp.face * 11 - 4} cy={y(m) - 30} r={9} /><circle cx={STAFF + sp.face * 11 + 8} cy={y(m) - 20} r={6} /></g>
                      <text x={STAFF - 24} y={y(m) - 14} textAnchor="end" className="jyu">ジュッ</text>
                    </g>
                  );
                })}
                <g className={`stamp ${alt >= 2305 ? "on" : ""}`}><StampShape shape="square" x={STAFF - 11} yy={y(2305)} kana="五" /></g>
                <g className={`stamp ${summit ? "on" : ""}`}><StampShape shape="circle" x={STAFF} yy={y(FUJI) + 2} kana="頂" /></g>
              </g>
            </svg>
          </div>

          <aside className="v3-climb-side" aria-live="polite">
            <div className="alt">
              <p className="eyebrow">Altitude</p>
              <p className="val"><b>{Math.round(alt).toLocaleString()}</b> m</p>
              <p className="mark">{mark ? mark.text : "スクロールで、登る。"}</p>
            </div>
            <div className="count" aria-label={`焼印 ${got.length} / 4`}>
              <span>焼印</span>
              {order.map((a) => <i key={a.slug} className={got.includes(a) ? "on" : ""}>{STAMP[a.slug].kana}</i>)}
              <b>{got.length} / 4</b>
            </div>
            {summit ? (
              <div className="card all">
                <p className="eyebrow">4 / 4 — 頂上</p>
                <h3>4つ全部、集めました。</h3>
                <div className="minis">{products.map((x) => (
                  // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP
                  <img key={x.slug} src={`/v2/photos/${originFrames[x.slug].hero}-s.webp`} alt={x.title.ja} />
                ))}</div>
                <p className="small">100g × 4（{products.map((x) => x.title.ja.split(" ")[0]).join("・")}）· {yen(allPrice)}（税込）</p>
                <button type="button" className="v3-btn add" disabled={!allOk || cart.pending} onClick={() => cart.add(allIds)}>
                  {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}{allOk ? "4つ全部カートに入れる" : "在庫確認中"}
                </button>
              </div>
            ) : p && latest ? (
              <div className="card">
                <Link href={`/origins/${p.slug}`} className="ph" aria-label={`${p.title.ja}の産地ページへ`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP */}
                  <img src={`/v2/photos/${originFrames[p.slug].hero}-s.webp`} alt={`SNöBI ${p.title.ja}`} />
                </Link>
                <div className="info">
                  <p className="eyebrow">{String(products.indexOf(p) + 1).padStart(2, "0")} — {p.country.toUpperCase()}</p>
                  <h3>{p.title.ja}</h3>
                  <p className="nums"><b>{p.elevation}</b> · 富士山の{compare(latest.lo, latest.hi).fujiPct} · スカイツリー{compare(latest.lo, latest.hi).skytrees}本分</p>
                  <p className="notes">{p.notes.ja.join(" · ")}</p>
                  <p className="enjoy">{p.enjoyWithin.ja}</p>
                  <div className="row">
                    <div className="sizes" role="radiogroup" aria-label="サイズ">{p.variants.map((x) => <button key={x.id} type="button" role="radio" aria-checked={size === x.size} onClick={() => setSize(x.size)}>{x.size}</button>)}</div>
                    <b className="price">{yen(price)}</b>
                  </div>
                  <button type="button" className="v3-btn add" disabled={!ok || cart.pending} onClick={() => v && cart.add(v.id)}>
                    {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}{v ? buyLabel(stock, v.id) : "在庫確認中"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="card intro"><p>スクロールで富士山を登ります。4つの畑の高さを通るたびに、杖に焼印。頂上まで行くと、4つ全部をまとめて選べます。</p></div>
            )}
          </aside>
        </div>
        <p className="v3-climb-note">高さは実寸、横幅は縮めています。富士山 3,776m（国土地理院）· 富士スバルライン五合目 2,305m · 東京スカイツリー 634m · 東京タワー 333m。図の様式は1823年の「山の高さくらべ」図にならいました。</p>
      </div>
    </section>
  );
}

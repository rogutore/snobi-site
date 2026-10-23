"use client";
/* 「富士山」 — home section 4. The plate is the owner's hand-drawn painting (2026-10-23: "a more handdrawn natural
   feel"), cut out of its paper by scripts/export-fuji-art.py, which also writes its geometry (content/fuji-art.json:
   ground and summit rows, both ridge lines, the staff). Over it, code draws only what moves or must be exact:
   - the mechanic: neal.fun "The Deep Sea", upside down: native scroll climbs, a big live altimeter counts;
   - the reward: Fuji's 金剛杖 焼印: as the boar walks the left ridge past each farm's true height, that coffee is
     branded onto the painted staff (the painting's own stamps were removed: rough heights, and エ drawn as 土).
   One vertical scale (metres → px, ground to crater rim) is shared by the boar, the labels and the staff. Heights come
   from products.ts via content/altitude.ts; comparisons are computed. Native scroll only (sticky stage, no wheel hijack). */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen } from "@/content/products";
import { FUJI, coffeeAltitudes, compare } from "@/content/altitude";
import { originFrames } from "@/content/v2";
import art from "@/content/fuji-art.json";
import type { StockMap } from "@/lib/shopify/client";
import { buyLabel, canBuy, livePrice } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";
import { shotThumb } from "@/components/v2/photo";

const { width: W, height: H, ground: GROUND, summit: SUMMIT } = art;
const S = (GROUND - SUMMIT) / FUJI;
const y = (m: number) => GROUND - m * S;
const STAFF = (art.staff[0] + art.staff[1]) / 2;
/** x of the painted ridge line at row yy (-1 left slope, 1 right slope), interpolated from the traced points. */
function ridgeX(yy: number, side: -1 | 1) {
  const pts = side < 0 ? art.ridge.L : art.ridge.R;
  if (yy <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (yy <= pts[i][0]) { const [y0, x0] = pts[i - 1], [y1, x1] = pts[i]; return x0 + ((x1 - x0) * (yy - y0)) / (y1 - y0); }
  }
  return pts[pts.length - 1][1];
}

/* Each coffee: which face of the staff its stamp goes on, its stamp shape, and the katakana it carries.
   Colombia (1,700 m) and Peru (1,731 m) are 31 m apart, so they sit on opposite faces, as on a real 金剛杖. */
const STAMP: Record<string, { face: -1 | 1; shape: "gourd" | "circle" | "square" | "hex"; kana: string; at: number; label: -1 | 1 }> = {
  "mexico-chiapas-decaf": { face: -1, shape: "gourd", kana: "メ", at: 0, label: -1 }, // branded on entering its range (1,400 m) so it clears Peru on the same face
  "colombia-huila": { face: 1, shape: "circle", kana: "コ", at: 0.5, label: 1 },
  peru: { face: -1, shape: "square", kana: "ペ", at: 0.5, label: -1 },
  "ethiopia-guji": { face: 1, shape: "hex", kana: "エ", at: 0.5, label: 1 },
};
const FACE = 17; // stamp offset from the staff's centre line: two stamps (~34 px each, scaled in v3.css) side by side fill the ~66 px staff
const order = [...coffeeAltitudes].sort((a, b) => a.lo - b.lo); // the order you climb past them
const MARKS = [
  { m: 333, text: "東京タワーを越えた" }, { m: 634, text: "スカイツリーを越えた" }, { m: 1000, text: "雲の上へ" },
  { m: 1400, text: "メキシコ・チアパスの畑の高さ" }, { m: 1700, text: "コロンビアとペルーの畑の高さ" }, { m: 2000, text: "エチオピア・グジの畑の高さ" },
  { m: 2305, text: "富士スバルライン五合目" }, { m: 3700, text: "まもなく頂上" }, { m: 3776, text: "頂上。御来光。" },
];

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
  const sec = useRef<HTMLElement>(null);
  const [alt, setAlt] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const [near, setNear] = useState(false); // the painting (111 KB) loads once the section is within a screen or so
  const cart = useCart();

  useEffect(() => {
    const el = sec.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "900px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
  // the boar stands on the painted left ridge at the current height
  const by = y(alt), bx = ridgeX(by, -1);
  const top = (ridgeX(SUMMIT, -1) + ridgeX(SUMMIT, 1)) / 2;

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
            <svg viewBox={`0 0 ${W} ${H}`} style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label={`富士山（3,776m）を登りながら、4つの畑の標高で杖に焼印。${products.map((x) => `${x.title.ja} ${x.elevation}`).join("、")}`}>
              <defs>
                <radialGradient id="fc-sun" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#f7c97c" stopOpacity="0.9" /><stop offset="1" stopColor="#f7c97c" stopOpacity="0" /></radialGradient>
                <filter id="fc-burn" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" /><feDisplacementMap in="SourceGraphic" scale="2.2" /></filter>
              </defs>
              <circle cx={top} cy={y(FUJI) + 60} r={170} fill="url(#fc-sun)" className="sun" style={{ opacity: summit ? 1 : 0 }} />
              {near ? <image href="/v3/fuji/plate-l.webp" width={W} height={H} /> : null}
              {/* title, set vertically in the open sky like a print's title (owner 2026-10-09: 「富士山」) */}
              <g className="ttl" aria-hidden>
                <text x={150} y={70} className="ttl-main" style={{ writingMode: "vertical-rl" }}>富士山</text>
                <text x={98} y={76} className="ttl-sub" style={{ writingMode: "vertical-rl" }}>第一章　四つの畑の高さ</text>
              </g>
              <text x={top} y={y(FUJI) - 50} textAnchor="middle" className="lbl strong">山頂 3,776m</text>
              <g className="go">
                <text x={ridgeX(y(2305), 1) + 18} y={y(2305) + 5} className="lbl">五合目 2,305m</text>
              </g>
              {/* each farm's height: a dotted line from the right slope to the staff, and a numbered label outside its slope */}
              {order.map((a) => {
                const pr = products.find((x) => x.slug === a.slug)!, i = products.indexOf(pr) + 1, sd = STAMP[a.slug].label;
                const m = a.lo + (a.hi - a.lo) * STAMP[a.slug].at, yy = y(m), lx = ridgeX(yy, sd) + sd * 16;
                return (
                  <g key={a.slug} className={`farm ${got.includes(a) ? "on" : ""}`}>
                    <line x1={ridgeX(yy, 1) + 8} x2={art.staff[0] - 4} y1={yy} y2={yy} className="farm-line" />
                    <g className="farm-label">
                      <circle cx={lx + sd * 12} cy={yy - 5} r={11} />
                      <text x={lx + sd * 12} y={yy - 0.5} textAnchor="middle" className="num">{i}</text>
                      <text x={lx + sd * 30} y={yy} textAnchor={sd < 0 ? "end" : "start"} className="lbl">{pr.title.ja.split(" ")[0]} {pr.elevation}</text>
                    </g>
                  </g>
                );
              })}
              <text x={art.towers.tokyo} y={H - 8} textAnchor="middle" className="scale">東京タワー</text>
              <text x={art.towers.skytree + 18} y={H - 8} textAnchor="start" className="scale">スカイツリー</text>
              {/* the climber, on the painted left ridge */}
              <g transform={`translate(${bx + 4},${by - 18})`} className="boar">
                <image href="/brand/snobi.svg" x={-22} y={-19} width={44} height={38} />
              </g>
              {/* the 金剛杖 is painted; the stamps burn in as the boar passes their height */}
              <g className="staff">
                {order.map((a) => {
                  const sp = STAMP[a.slug], m = a.lo + (a.hi - a.lo) * sp.at, on = got.includes(a), sx = STAFF + sp.face * FACE;
                  return (
                    <g key={a.slug} className={`stamp ${on ? "on" : ""}`}>
                      <StampShape shape={sp.shape} x={sx} yy={y(m)} kana={sp.kana} />
                      <g className="puff"><circle cx={sx - 16} cy={y(m) - 22} r={9} /><circle cx={sx - 4} cy={y(m) - 38} r={11} /><circle cx={sx + 10} cy={y(m) - 25} r={8} /></g>
                      <text x={art.staff[0] - 10} y={y(m) - 18} textAnchor="end" className="jyu">ジュッ</text>
                    </g>
                  );
                })}
                <g className={`stamp ${alt >= 2305 ? "on" : ""}`}><StampShape shape="square" x={STAFF - FACE} yy={y(2305)} kana="五" /></g>
                <g className={`stamp ${summit ? "on" : ""}`}><StampShape shape="circle" x={STAFF} yy={y(FUJI) + 6} kana="頂" /></g>
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
                  <img key={x.slug} src={shotThumb(originFrames[x.slug].hero)} alt={x.title.ja} />
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
        <p className="v3-climb-note">富士山・五合目・4つの畑の高さは同じ縮尺です（横幅は縮めています。塔の絵は目安）。富士山 3,776m（国土地理院）· 富士スバルライン五合目 2,305m · 東京スカイツリー 634m · 東京タワー 333m。</p>
      </div>
    </section>
  );
}

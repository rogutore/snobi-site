"use client";
/* Replaces Mockup D's 3D bag. Same stations, same pinned stage, real photographs only:
   frames 025/022/024/023 are one bag each on the same old table in the same shaft of sun, so the bag changes in
   place as you scroll; the last station is the four together (037) with their labels and add-to-cart.
   Weight comes from a slow push-in and a lerped follow of native scroll (no wheel hijack). */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products, yen } from "@/content/products";
import type { StockMap } from "@/lib/shopify/client";
import { useCart } from "@/components/commerce/cart";

const FRAMES = ["025", "022", "024", "023"]; // Peru, Ethiopia, Colombia, Mexico (PHOTO-INVENTORY §3.3)
const LINEUP_X: Record<string, number> = { peru: 25, "colombia-huila": 41, "ethiopia-guji": 58, "mexico-chiapas-decaf": 74 }; // bag centres in 037, % of width (measured on the frame)
// station windows over progress 0..1 (fade in at a, out at b)
const WIN: [number, number][] = [[-1, 0.2], [0.22, 0.4], [0.42, 0.6], [0.62, 0.76], [0.8, 2]];

export function TableChapter({ stock }: { stock: StockMap }) {
  const sec = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const cart = useCart();
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0, cur = 0, raf = 0;
    const read = () => {
      const el = sec.current; if (!el) return;
      const r = el.getBoundingClientRect(); const total = el.offsetHeight - innerHeight;
      target = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    };
    const tick = () => {
      cur += (target - cur) * (reduce ? 1 : 0.12);
      setP((prev) => (Math.abs(prev - cur) > 0.0005 ? cur : prev));
      raf = requestAnimationFrame(tick);
    };
    read(); addEventListener("scroll", read, { passive: true }); addEventListener("resize", read);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", read); removeEventListener("resize", read); };
  }, []);
  const op = (i: number) => { const [a, b] = WIN[i]; return Math.min(1, Math.max(0, (p - a) / 0.04)) * Math.min(1, Math.max(0, (b - p) / 0.04)); };
  // photo crossfade: each later frame fades in over the one below (stacked), so the stage never dips to blank
  const BOUNDS = [0.21, 0.41, 0.61, 0.78];
  const photoOp = (i: number) => (i === 0 ? 1 : Math.min(1, Math.max(0, (p - (BOUNDS[i - 1] - 0.03)) / 0.06)));
  const push = 1 + 0.06 * p;
  return (
    <section ref={sec} className="v3-table" aria-label="4つの袋、東京の光の中で">
      <div className="v3-stage">
        <div className="v3-frames" style={{ transform: `scale(${push})` }}>
          {FRAMES.map((f, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
            <img key={f} className="v3-bag" src={`/v2/photos/${f}-l.webp`} alt={i === 0 ? "古い机の上、差し込む光の中の袋" : ""} style={{ opacity: photoOp(i) }} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
          <img className="v3-lineup" src="/v2/photos/037-l.webp" alt="第一章の4つの袋が机に並ぶ" style={{ opacity: photoOp(4) }} />
        </div>

        <div className="v3-st st-a" style={{ opacity: op(0) }}><p className="eyebrow">Organic × Specialty × Japan — Est. 2026</p><p className="v3-big" lang="en">Organic.</p><p className="v3-ja">オーガニックのまま、スペシャルティ。</p></div>
        <div className="v3-st st-b" style={{ opacity: op(1) }}><p className="v3-big" lang="en"><em>And actually<br />specialty.</em></p><p className="v3-ja">JAS有機認証の豆だけを、東京で焙煎。</p></div>
        <div className="v3-st st-c" style={{ opacity: op(2) }}><p className="v3-big">豆のまま。</p><p className="v3-ja">100g / 200g · 価格はすべて税込 · <b>¥3,000以上で送料無料</b></p></div>
        <div className="v3-st st-d" style={{ opacity: op(3) }}><p className="eyebrow">Chapter One — 4 origins</p><p className="v3-mid">第一章、4つの産地。</p><p className="v3-ja">袋を押すと、その産地へ。</p></div>

        {products.map((pr, i) => {
          const v = pr.variants[0]; const s = stock[v.id];
          const ok = !!s?.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0);
          return (
            <div key={pr.slug} className="v3-label" data-i={i} style={{ left: `${LINEUP_X[pr.slug]}%`, opacity: op(4), visibility: op(4) < 0.01 ? "hidden" : "visible" }}>
              <Link href={`/origins/${pr.slug}`} className="v3-label-name">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className="v3-lc" lang="en">{pr.country}</span>
                <span className="v3-lj">{pr.title.ja}</span>
                <span className="v3-ls">{pr.notes.ja.join(" · ")}</span>
              </Link>
              <div className="v3-lb">
                <span className="v3-lp">{yen(pr.variants[0].price)}〜</span>
                <button type="button" className="v3-add" disabled={!ok || cart.pending} onClick={() => cart.add(v.id)}>{ok ? "カートに入れる" : s ? "完売" : "在庫確認中"}</button>
              </div>
            </div>
          );
        })}
        <p className="v3-note">撮影：2026年10月1日、東京</p>
      </div>
    </section>
  );
}

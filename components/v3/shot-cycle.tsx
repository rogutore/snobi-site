"use client";
/* Coffee photos that change on their own — the replacement for the 「写真」 switch (光の中・白背景・机の上…) on Home and
   /coffee (owner 2026-10-09/10, after Masaki).
   How it moves (owner: "smoother, staggering randomly, not left to right, not the same photos in order"), after the
   "living grid" pattern (one tile at a time, random order) and long Ken Burns dissolves:
   - Every card opens on the same shot, the bag in the light. A conductor then changes ONE card at a time, at a random
     interval, picking a card that did not just change (nor its neighbour), so a row never sweeps left to right.
   - Each change picks a shot that no other visible card is showing and the card has not shown lately, so the row is
     always mixed (no "all beans" moment) and no card runs a fixed order.
   - The new photo dissolves in over the old one (no dip to the background) and keeps drifting out of a slight zoom.
   - Only cards on screen change; a hovered card waits; nothing changes while the tab is hidden; a photo is decoded
     before it is shown; reduced motion keeps the first shot.
   Frames: content/v2.ts originFrames. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { originFrames } from "@/content/v2";
import { shotSrcSet } from "@/components/v2/photo";

type Key = keyof (typeof originFrames)["peru"];
const SHOTS: Key[] = ["hero", "beans", "cup", "brew", "hand"];
/* Crop per shot type; per-frame overrides where the composition differs (2026-10-10: the brew shots must show both the
   dripper and the bag — Mexico's 126 is wider-set). */
const POS: Record<Key, string> = { hero: "50% 62%", beans: "50% 50%", cup: "50% 60%", brew: "50% 60%", hand: "60% 45%", table: "50% 62%", waist: "50% 58%", studio: "50% 55%" };
const FRAME_POS: Record<string, string> = { "126": "62% 60%" };

type CardApi = { visible: () => boolean; hovered: () => boolean; image: (n: number) => HTMLImageElement | null };
type Rotation = { shot: number[]; prev: number[]; register: (i: number, api: CardApi | null) => void };
const Ctx = createContext<Rotation | null>(null);

/* Nothing rotates, and the other shots do not load, until the reader's first scroll, tap or key. Chrome stops counting the
   largest paint at the first input, so a later shot can never become the page's LCP (2026-10-19: /coffee measured
   15.6 s, the cup shot painted ~14 s in; reduced motion, which never rotates, measured 1.7 s). */
const FIRST_INPUT = ["scroll", "wheel", "pointerdown", "keydown", "touchstart"] as const;
function onFirstInput(cb: () => void) {
  let done = false;
  const go = () => { if (done) return; done = true; off(); cb(); };
  const off = () => FIRST_INPUT.forEach((t) => window.removeEventListener(t, go));
  FIRST_INPUT.forEach((t) => window.addEventListener(t, go, { passive: true }));
  return () => { done = true; off(); };
}

const pickOne = <T,>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)];
const pickWeighted = (xs: number[], w: (x: number) => number): number => {
  const total = xs.reduce((a, x) => a + w(x), 0);
  if (total <= 0) return pickOne(xs);
  let roll = Math.random() * total;
  for (const x of xs) { roll -= w(x); if (roll < 0) return x; }
  return xs[xs.length - 1];
};

/** Wrap a row (or list) of ShotCycle cards. `pace` = the random gap between two changes anywhere in the group. */
export function ShotRotation({ count, pace = [2200, 3800], children }: { count: number; pace?: [number, number]; children: React.ReactNode }) {
  const [lo, hi] = pace;
  const [state, setState] = useState(() => ({ shot: Array<number>(count).fill(0), prev: Array<number>(count).fill(-1) }));
  const live = useRef(state);
  const cards = useRef<(CardApi | null)[]>([]);
  const recent = useRef<number[]>([]); // cards changed most recently, newest last
  const history = useRef<number[][]>(Array.from({ length: count }, () => [0])); // shots each card has shown, newest last
  const register = useCallback((i: number, api: CardApi | null) => { cards.current[i] = api; }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let stopped = false;
    const gap = () => lo + Math.random() * (hi - lo);
    const tick = async () => {
      const { shot } = live.current;
      const vis = shot.map((_, i) => i).filter((i) => cards.current[i]?.visible() && !cards.current[i]?.hovered());
      if (!document.hidden && vis.length > 0) {
        // Weighted chance, not rules, so no repeating pattern: the card that just changed sits out, the one before it
        // and the last card's neighbours are less likely, everyone else is equally likely.
        const r = recent.current;
        const last = r[r.length - 1];
        const weight = (i: number) =>
          vis.length > 1 && i === last ? 0 : (i === r[r.length - 2] ? 0.35 : 1) * (last !== undefined && Math.abs(i - last) === 1 ? 0.5 : 1);
        const card = pickWeighted(vis, weight);
        const others = new Set(vis.filter((j) => j !== card).map((j) => shot[j]));
        const seen = history.current[card].slice(-2);
        const ready = SHOTS.map((_, n) => n).filter((n) => {
          const img = cards.current[card]?.image(n);
          return n !== shot[card] && !!img && img.complete && img.naturalWidth > 0;
        });
        const ranked = [
          ready.filter((n) => !others.has(n) && !seen.includes(n)),
          ready.filter((n) => !others.has(n)),
          ready,
        ].find((xs) => xs.length > 0);
        if (ranked) {
          const n = pickOne(ranked);
          await cards.current[card]?.image(n)?.decode().catch(() => undefined);
          if (stopped) return;
          const next = { shot: live.current.shot.slice(), prev: live.current.prev.slice() };
          next.prev[card] = next.shot[card];
          next.shot[card] = n;
          live.current = next;
          setState(next);
          recent.current = [...recent.current.slice(-3), card];
          history.current[card] = [...history.current[card].slice(-3), n];
        }
      }
      if (!stopped) timer = window.setTimeout(tick, gap());
    };
    const cancelStart = onFirstInput(() => { if (!stopped) timer = window.setTimeout(tick, 1400 + Math.random() * 1000); });
    return () => { stopped = true; cancelStart(); window.clearTimeout(timer); };
  }, [lo, hi]);
  const value = useMemo(() => ({ ...state, register }), [state, register]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function ShotCycle({ slug, alt, index, sizes, eager = false }: {
  slug: string;
  alt: string;
  index: number;
  sizes: string;
  eager?: boolean;
}) {
  const rot = useContext(Ctx);
  if (!rot) throw new Error("ShotCycle must sit inside <ShotRotation>");
  const frames = originFrames[slug];
  if (!frames) throw new Error(`ShotCycle: no frames for ${slug} (content/v2.ts originFrames)`);
  const box = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const seen = useRef(false);
  const over = useRef(false);
  const [armed, setArmed] = useState(false); // the other shots load once the card has been on screen after the first input
  const { register } = rot;
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let input = false;
    // the other shots wait for the page to finish loading and for the first input, so they never compete with the first paint
    const arm = () => {
      if (!input || !seen.current) return;
      if (document.readyState === "complete") setArmed(true);
      else window.addEventListener("load", () => setArmed(true), { once: true });
    };
    const cancelInput = onFirstInput(() => { input = true; arm(); });
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting; arm(); }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    register(index, { visible: () => seen.current, hovered: () => over.current, image: (n) => imgs.current[n] ?? null });
    return () => { cancelInput(); io.disconnect(); register(index, null); };
  }, [index, register]);
  const k = rot.shot[index] ?? 0;
  const prev = rot.prev[index] ?? -1;
  return (
    <div ref={box} className="v3-cycle" onPointerEnter={() => { over.current = true; }} onPointerLeave={() => { over.current = false; }}>
      {SHOTS.map((key, n) => {
        if (n > 0 && !armed) return null;
        const id = frames[key];
        return (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
          <img key={key} ref={(el) => { imgs.current[n] = el; }} className={n === k ? "in" : n === prev ? "out" : ""}
            src={`/v2/photos/${id}-s.webp`} srcSet={shotSrcSet(id)} sizes={sizes}
            alt={n === 0 ? alt : ""} aria-hidden={n === 0 ? undefined : true} style={{ objectPosition: FRAME_POS[id] ?? POS[key] }}
            loading={n === 0 && eager ? "eager" : n === 0 ? "lazy" : "eager"} fetchPriority={n === 0 && eager ? "high" : undefined} decoding="async" />
        );
      })}
    </div>
  );
}

"use client";
/* 木漏れ日 — improvement 1 (owner: "show me", 2026-10-08). Daylight's signature, made from our own shoot:
   one fixed, full-screen layer of the real leaf shadow on the wall behind the bags (frame 146,
   scripts/make-komorebi.py), multiplied over the page. It sways slowly like leaves in a breeze and shifts a little with
   scroll, like walking past a window. pointer-events: none; reduced motion = still. */
import { useEffect, useRef } from "react";

export function Komorebi() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The loop runs only while the layer is catching up with the scroll, then stops (2026-11-02: it redrew a full-screen
    // blended layer every frame on every page, ~3 s of main-thread work on Home in Lighthouse).
    let raf = 0, target = 0, cur = 0;
    const read = () => { target = scrollY; if (!raf) raf = requestAnimationFrame(tick); };
    const tick = () => {
      cur += (target - cur) * 0.06;
      if (Math.abs(target - cur) < 0.5) cur = target;
      // a slow sway with scroll (±4vh), never a one-way slide — the layer is inset −6vh, so the page stays covered top to
      // bottom at any depth (owner 2026-10-09: "the daylight covers top 80% of page not the bottom")
      ref.current?.style.setProperty("--sy", (Math.sin(cur / 900) * 0.04 * innerHeight).toFixed(1) + "px");
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    };
    addEventListener("scroll", read, { passive: true }); read();
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", read); };
  }, []);
  return <div ref={ref} className="v3-komorebi" aria-hidden><div className="leaves" /></div>;
}

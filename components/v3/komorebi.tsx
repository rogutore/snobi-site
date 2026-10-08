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
    let raf = 0, target = 0, cur = 0;
    const read = () => { target = scrollY; };
    const tick = () => {
      cur += (target - cur) * 0.06;
      ref.current?.style.setProperty("--sy", (cur * -0.035).toFixed(1) + "px");
      raf = requestAnimationFrame(tick);
    };
    addEventListener("scroll", read, { passive: true }); read();
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", read); };
  }, []);
  return <div ref={ref} className="v3-komorebi" aria-hidden><div className="leaves" /></div>;
}

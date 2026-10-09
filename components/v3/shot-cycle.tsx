"use client";
/* One coffee's photos playing on their own like a short GIF. Replaces the 「写真」 switch (光の中・白背景・机の上…) on Home
   and /coffee (owner 2026-10-09, after Masaki: the switch gave visitors little reason to use it). Every card opens on the
   same shot — the bag in the light — then dissolves through the beans, the cup, the dripper and the bag in hand, each
   easing out of a slight zoom. Cards are staggered so a row never changes at once. Plays only while on screen; the
   later shots load only once it starts; reduced motion shows the first shot only. Frames: content/v2.ts originFrames. */
import { useEffect, useRef, useState } from "react";
import { originFrames } from "@/content/v2";

type Key = keyof (typeof originFrames)["peru"];
const SEQUENCE: [Key, string][] = [
  ["hero", "50% 62%"], ["beans", "50% 50%"], ["cup", "62% 60%"], ["brew", "74% 55%"], ["hand", "60% 45%"],
];
const HOLD_MS = 2600; // each shot
const STAGGER_MS = 450; // between neighbouring cards

export function ShotCycle({ slug, alt, index = 0, sizes, eager = false }: {
  slug: string;
  alt: string;
  index?: number;
  sizes: string;
  eager?: boolean;
}) {
  const frames = originFrames[slug];
  if (!frames) throw new Error(`ShotCycle: no frames for ${slug} (content/v2.ts originFrames)`);
  const [k, setK] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false); // later shots load once the card has been on screen
  const ref = useRef<HTMLDivElement>(null);
  const at = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setArmed(true);
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const step = () => {
      const from = at.current;
      at.current = (from + 1) % SEQUENCE.length;
      setPrev(from);
      setK(at.current);
      t = window.setTimeout(step, HOLD_MS);
    };
    t = window.setTimeout(step, HOLD_MS + index * STAGGER_MS);
    return () => window.clearTimeout(t);
  }, [visible, index]);
  return (
    <div ref={ref} className="v3-cycle">
      {SEQUENCE.map(([key, pos], n) => {
        if (n > 0 && !armed) return null;
        const id = frames[key];
        return (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
          <img key={key} className={n === k ? "in" : n === prev ? "out" : ""}
            src={`/v2/photos/${id}-s.webp`} srcSet={`/v2/photos/${id}-s.webp 700w, /v2/photos/${id}-l.webp 1400w`} sizes={sizes}
            alt={n === 0 ? alt : ""} aria-hidden={n === 0 ? undefined : true} style={{ objectPosition: pos }}
            loading={n === 0 && eager ? "eager" : "lazy"} />
        );
      })}
    </div>
  );
}

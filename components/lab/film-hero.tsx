"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./film.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAMES = 60;
const src = (i: number) =>
  `/lab/film/frames/f${String(i).padStart(3, "0")}.webp`;

/* Beat 1: a drone pass over organic coffee hills, scrubbed by scroll on a
   pinned canvas. Frames load key-frames first (every 6th), then fill in, so
   scrubbing works early and sharpens as the rest arrive. Reduced motion: the
   poster only, copy still shown. */
export function FilmHero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const c = canvas.current;
      if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      const ctx = c.getContext("2d")!;
      const images: (HTMLImageElement | undefined)[] = new Array(FRAMES);
      const state = { frame: 0 };

      const nearestLoaded = (i: number) => {
        for (let d = 0; d < FRAMES; d++) {
          if (images[i - d]?.complete) return images[i - d];
          if (images[i + d]?.complete) return images[i + d];
        }
      };
      const draw = () => {
        const img = nearestLoaded(Math.round(state.frame));
        if (!img) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = c.clientWidth * dpr;
        const h = c.clientHeight * dpr;
        if (c.width !== w || c.height !== h) {
          c.width = w;
          c.height = h;
        }
        // object-fit: cover
        const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * s;
        const dh = img.naturalHeight * s;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      };

      const order = [
        ...Array.from({ length: FRAMES }, (_, i) => i).filter((i) => i % 6 === 0),
        ...Array.from({ length: FRAMES }, (_, i) => i).filter((i) => i % 6 !== 0),
      ];
      order.forEach((i) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src(i);
        img.onload = () => {
          images[i] = img;
          if (Math.abs(i - state.frame) < 6) draw();
        };
      });

      gsap.to(state, {
        frame: FRAMES - 1,
        ease: "none",
        onUpdate: draw,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });

      // Copy: first card in from the start, second card takes over late.
      gsap.fromTo(
        `.${styles.heroCardFirst}`,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: -40,
          ease: "power1.in",
          scrollTrigger: {
            trigger: root.current,
            start: "45% bottom",
            end: "60% bottom",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        `.${styles.heroCardLate}`,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: root.current,
            start: "62% bottom",
            end: "78% bottom",
            scrub: true,
          },
        },
      );

      const onResize = () => draw();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} aria-label="SNöBI">
      <div className={styles.heroStage}>
        {/* eslint-disable-next-line @next/next/no-img-element -- poster is the canvas's first paint and the reduced-motion fallback */}
        <img
          src="/lab/film/poster.jpg"
          alt=""
          className={styles.heroPoster}
          fetchPriority="high"
        />
        <canvas ref={canvas} className={styles.heroCanvas} aria-hidden="true" />
        <p className={styles.footageNote}>
          空撮はイメージです / Aerial footage is illustrative
        </p>
        <div className={`${styles.heroCard} ${styles.heroCardFirst}`}>
          <p className={styles.eyebrow}>ORGANIC × SPECIALTY × JAPAN — EST. 2026</p>
          <h1 className={styles.heroTitle}>
            Organic.
            <br />
            <em>And actually specialty.</em>
          </h1>
          <p className={styles.heroJa}>オーガニックのまま、スペシャルティ。</p>
        </div>
        <div className={`${styles.heroCard} ${styles.heroCardLate}`}>
          <p className={styles.heroJa}>JAS有機認証の豆だけを、東京で焙煎。</p>
          <a href="#releases" className={styles.heroLink}>
            第一章の4つのコーヒー ↓
          </a>
        </div>
      </div>
    </section>
  );
}

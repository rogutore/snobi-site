"use client";
/* Home hero (owner 2026-10-11, speed audit fix 4 — "okay but test it extensively").
   - A still is in the HTML first and is the page's largest element: the four bags on the table (desktop; DESIGN.md: the
     poster is the film's final frame of the four) or the pour into the dripper (phones). On a phone the headline covers
     the lower half of the frame, where every bag frame has its label; DESIGN.md never puts copy over a label, so the
     phone still is the pour and the bags arrive after it in motion.
   - The film is attached only after the page has loaded, starts at the same moment as the still (so the dissolve from
     still to motion is invisible) and fades in once it is actually playing.
   - The opening shot (sacks of chaff, 0–3.2 s; owner: "the first shot is a bunch of ゴミ") is never shown: the film
     starts from the still and loops back to 3.2 s, not to 0.
   - Served with byte ranges from /api/media (iPhone Safari needs them).
   - Reduced motion: the still only. */
import { useEffect, useState } from "react";

const PHONE = "(max-width: 760px)";
const STILLS = {
  phone: { src: "/v3/hero-pour-m.webp", at: 14.2, film: "/api/media/hero-960.mp4" },
  wide: { src: "/v3/hero-still-1600.webp", at: 21.8, film: "/api/media/hero-1600.mp4" },
};
const LOOP_FROM = 3.2; // seconds — after the chaff shot

export function HeroFilm() {
  const [film, setFilm] = useState<{ src: string; at: number } | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      const s = window.matchMedia(PHONE).matches ? STILLS.phone : STILLS.wide;
      setFilm({ src: s.film, at: s.at });
    };
    if (document.readyState === "complete") {
      const t = window.setTimeout(start, 0);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);
  return (
    <>
      <picture>
        <source media={PHONE} srcSet={STILLS.phone.src} />
        {/* a plain <img> inside <picture>: early, high priority, art-directed per screen */}
        <img className="v3-filmv" src={STILLS.wide.src} alt="" fetchPriority="high" decoding="async" />
      </picture>
      {film ? (
        <video
          ref={(v) => {
            // React sets only the muted property; iPhone Safari's autoplay rule also looks for the attribute.
            if (v && !v.hasAttribute("muted")) { v.defaultMuted = true; v.muted = true; v.setAttribute("muted", ""); }
          }}
          className={`v3-filmv v3-filmplay${playing ? " on" : ""}`}
          src={film.src}
          muted
          playsInline
          preload="auto"
          aria-hidden
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.currentTime = Math.min(film.at, Math.max(0, v.duration - 0.1));
            void v.play().catch(() => undefined);
          }}
          onPlaying={() => setPlaying(true)}
          onEnded={(e) => {
            const v = e.currentTarget;
            v.currentTime = LOOP_FROM;
            void v.play().catch(() => undefined);
          }}
        />
      ) : null}
    </>
  );
}

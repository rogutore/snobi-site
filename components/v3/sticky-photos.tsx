"use client";
/* The pinned-photo chapter (Daylight-style split), shared by Home section 2 (HandChapter) and the Story walk.
   Left: one photo held in place, changing per step. Right: steps that scroll normally. Native scroll; the active step
   is read with IntersectionObserver (no scroll hijack). Phones: each step carries its own photo inline. */
import { useEffect, useRef, useState } from "react";

/* A frame is one of our 2026-10-01 shoot photos (`frame`, /v2/photos/<frame>-s|l.webp), or a supply-chain photo from
   content/origin-media.ts (`src`/`srcSmall` + its own `note`): that one is a <figure> whose caption sits under the photo, never
   on it, and the shoot caption is hidden while it shows (DESIGN.md › Imagery; scripts/gates/weekend-rules.py checks it). */
export type Frame = { frame: string; alt: string; src?: string; srcSmall?: string; note?: string };
const large = (f: Frame) => f.src ?? `/v2/photos/${f.frame}-l.webp`;
const small = (f: Frame) => f.srcSmall ?? `/v2/photos/${f.frame}-s.webp`;

export function StickyPhotos({ frames, label, caption, className = "", steps, priority = false }: {
  frames: Frame[];
  priority?: boolean; // phones: load the first inline photo first (it is the page's largest element on /about)
  label: string;
  caption?: string;
  className?: string;
  steps: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section className={`v3-hand ${className}`} aria-label={label}>
      <div className="v3-hand-media" aria-hidden>
        {frames.map((s, i) => s.src ? (
          <figure key={s.frame} className="v3-hand-fig" style={{ opacity: active === i ? 1 : 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
            <img src={large(s)} alt="" loading="lazy" />
            <figcaption className="t-ja-note">{s.note}</figcaption>
          </figure>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
          <img key={s.frame} src={large(s)} alt="" style={{ opacity: active === i ? 1 : 0 }} loading="lazy" />
        ))}
        {caption && !frames[active]?.src ? <p className="v3-hand-cap">{caption}</p> : null}
      </div>
      <div className="v3-hand-steps">
        {steps.map((body, i) => (
          <article key={frames[i].frame} ref={(el) => { refs.current[i] = el; }} data-i={i} className={`v3-hand-step ${active === i ? "on" : ""}`}>
            {frames[i].src ? (
              <figure className="v3-hand-inline-fig">
                {/* eslint-disable-next-line @next/next/no-img-element -- phones: the step's own photo */}
                <img className="v3-hand-inline" src={small(frames[i])} alt={frames[i].alt} loading="lazy" />
                <figcaption className="t-ja-note">{frames[i].note}</figcaption>
              </figure>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- phones: the step's own photo
              <img className="v3-hand-inline" src={small(frames[i])} alt={frames[i].alt} loading={priority && i === 0 ? "eager" : "lazy"} fetchPriority={priority && i === 0 ? "high" : undefined} />
            )}
            {body}
          </article>
        ))}
      </div>
    </section>
  );
}

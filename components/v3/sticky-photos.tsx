"use client";
/* The pinned-photo chapter (Daylight-style split), shared by Home section 2 (HandChapter) and the Story walk.
   Left: one photo held in place, changing per step. Right: steps that scroll normally. Native scroll; the active step
   is read with IntersectionObserver (no scroll hijack). Phones: each step carries its own photo inline. */
import { useEffect, useRef, useState } from "react";

export type Frame = { frame: string; alt: string };

export function StickyPhotos({ frames, label, caption, className = "", steps }: {
  frames: Frame[];
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
        {frames.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
          <img key={s.frame} src={`/v2/photos/${s.frame}-l.webp`} alt="" style={{ opacity: active === i ? 1 : 0 }} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        {caption ? <p className="v3-hand-cap">{caption}</p> : null}
      </div>
      <div className="v3-hand-steps">
        {steps.map((body, i) => (
          <article key={frames[i].frame} ref={(el) => { refs.current[i] = el; }} data-i={i} className={`v3-hand-step ${active === i ? "on" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- phones: the step's own photo */}
            <img className="v3-hand-inline" src={`/v2/photos/${frames[i].frame}-s.webp`} alt={frames[i].alt} loading="lazy" />
            {body}
          </article>
        ))}
      </div>
    </section>
  );
}

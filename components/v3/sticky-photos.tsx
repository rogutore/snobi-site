"use client";
/* The pinned-photo chapter (Daylight-style split), shared by Home section 2 (HandChapter) and the Story walk.
   Left: one photo held in place, changing per step. Right: steps that scroll normally. Native scroll; the active step
   is read with IntersectionObserver (no scroll hijack). Phones: each step carries its own photo inline.
   A frame may name a second shot (`then`): the step opens on its frame, holds, then dissolves into the second shot while
   it eases out from a slight zoom (owner 2026-10-09: "each they start the same but switch out to beans, cup zooming
   out"). Reduced motion: the second shot shows at once, no zoom. */
import { Fragment, useEffect, useRef, useState } from "react";

export type Frame = { frame: string; alt: string; then?: string; thenAlt?: string };

const HOLD_MS = 900; // how long a step shows its opening frame before the second shot

export function StickyPhotos({ frames, label, caption, className = "", steps }: {
  frames: Frame[];
  label: string;
  caption?: string;
  className?: string;
  steps: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(-1); // the step whose second shot is showing
  const [entered, setEntered] = useState(0); // counts step entries, so a sequence starts only once its step is in view
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        setActive(Number((e.target as HTMLElement).dataset.i));
        setShown(-1); // every entry replays: opening frame first, then the second shot
        setEntered((n) => n + 1);
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (entered === 0 || !frames[active]?.then) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setShown(active), reduce ? 0 : HOLD_MS);
    return () => window.clearTimeout(t);
  }, [active, entered, frames]);
  const second = (i: number) => Boolean(frames[i].then) && shown === i && active === i;
  return (
    <section className={`v3-hand ${className}`} aria-label={label}>
      <div className="v3-hand-media" aria-hidden>
        {frames.map((s, i) => (
          <Fragment key={s.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
            <img src={`/v2/photos/${s.frame}-l.webp`} alt="" style={{ opacity: active === i && !second(i) ? 1 : 0 }} loading={i === 0 ? "eager" : "lazy"} />
            {s.then ? (
              // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
              <img className={`then ${second(i) ? "in" : ""}`} src={`/v2/photos/${s.then}-l.webp`} alt="" loading="lazy" />
            ) : null}
          </Fragment>
        ))}
        {caption ? <p className="v3-hand-cap">{caption}</p> : null}
      </div>
      <div className="v3-hand-steps">
        {steps.map((body, i) => (
          <article key={frames[i].frame} ref={(el) => { refs.current[i] = el; }} data-i={i} className={`v3-hand-step ${active === i ? "on" : ""}`}>
            {/* phones: the step's own photo (and its second shot) inline */}
            <span className="v3-hand-inline">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
              <img src={`/v2/photos/${frames[i].frame}-s.webp`} alt={frames[i].alt} loading="lazy" />
              {frames[i].then ? (
                // eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair
                <img className={`then ${second(i) ? "in" : ""}`} src={`/v2/photos/${frames[i].then}-s.webp`} alt={frames[i].thenAlt ?? ""} loading="lazy" />
              ) : null}
            </span>
            {body}
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Chisel's "flipbook": the section pins to the viewport for ~300vh of scroll,
   and the active frame is chosen by scroll progress. Each frame is a stacked
   full-bleed image; only the active one is opaque, with a short CSS transition
   for a quick clean crossfade (exactly Chisel's approach — discrete opacity
   toggles + transition, not a long tween). Degrades to the first frame under
   prefers-reduced-motion. Uses the six real Snobi photos. */
const FRAMES = [
  "/photos/Z91_9931a.jpg",
  "/photos/snobi-brewing-1.jpg",
  "/photos/051.jpg",
  "/photos/032.jpg",
  "/photos/snobi-roastery-2.jpg",
  "/photos/snobi-brewing-2.jpg",
];

export function Flipbook() {
  const outer = React.useRef<HTMLDivElement>(null);
  const inner = React.useRef<HTMLDivElement>(null);
  const [frame, setFrame] = React.useState(0);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || !outer.current || !inner.current) return;

      const st = ScrollTrigger.create({
        trigger: outer.current,
        start: "top top",
        end: "+=300%",
        pin: inner.current,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            FRAMES.length - 1,
            Math.floor(self.progress * FRAMES.length),
          );
          setFrame(idx);
        },
      });
      return () => st.kill();
    },
    { scope: outer },
  );

  return (
    <section ref={outer} className="relative bg-plum">
      <div ref={inner} className="relative h-[100svh] w-full overflow-hidden">
        {FRAMES.map((src, i) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-out",
              i === frame ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/40 to-transparent" />
        <div className="pointer-events-none absolute bottom-8 left-6 z-10 lg:bottom-10 lg:left-10">
          <span className="spec text-sm uppercase tracking-[0.18em] text-paper/90">
            {String(frame + 1).padStart(2, "0")} /{" "}
            {String(FRAMES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

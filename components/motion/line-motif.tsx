"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Motif = "circle-slash" | "corner-frame" | "long-rule" | "diamond-plus";

/* Thin SVG line drawings that draw on (stroke-dashoffset) and drift with
   scroll, layered over photography — the core Chisel motion motif (brief §1/§4).
   Disabled under prefers-reduced-motion: strokes simply render fully drawn. */
export function LineMotif({
  motif = "circle-slash",
  className,
  stroke = "currentColor",
  drift = 60,
  duration = 1.6,
}: {
  motif?: Motif;
  className?: string;
  stroke?: string;
  drift?: number; // px of scroll-linked parallax travel
  duration?: number;
}) {
  const ref = React.useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const el = ref.current;
      if (!el) return;

      const paths = el.querySelectorAll<SVGGeometryElement>("[data-draw]");

      if (reduce) {
        paths.forEach((p) => {
          p.style.strokeDasharray = "none";
          p.style.strokeDashoffset = "0";
        });
        return;
      }

      // Draw-on: each path traces itself as it enters the viewport.
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Parallax drift — the motif shifts as you scroll past it.
      gsap.fromTo(
        el,
        { y: -drift },
        {
          y: drift,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  const common = {
    ref,
    className: cn("pointer-events-none select-none", className),
    fill: "none",
    stroke,
    strokeWidth: 1.25,
    "aria-hidden": true,
  } as const;

  switch (motif) {
    case "corner-frame":
      return (
        <svg viewBox="0 0 160 160" {...common}>
          <path data-draw d="M2 50 V2 H50" strokeLinecap="round" />
          <path data-draw d="M110 158 H158 V110" strokeLinecap="round" />
        </svg>
      );
    case "long-rule":
      return (
        <svg viewBox="0 0 400 8" {...common}>
          <path data-draw d="M0 4 H400" strokeLinecap="round" />
        </svg>
      );
    case "diamond-plus":
      return (
        <svg viewBox="0 0 40 40" {...common}>
          <path data-draw d="M20 4 L36 20 L20 36 L4 20 Z" />
          <path data-draw d="M20 12 V28 M12 20 H28" strokeLinecap="round" />
        </svg>
      );
    case "circle-slash":
    default:
      return (
        <svg viewBox="0 0 200 200" {...common}>
          <circle data-draw cx="100" cy="100" r="92" />
          <path data-draw d="M36 164 L164 36" strokeLinecap="round" />
        </svg>
      );
  }
}

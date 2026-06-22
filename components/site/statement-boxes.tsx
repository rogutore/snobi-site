"use client";

import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Second section: a full-bleed photo held in place (sticky) while two clean
   glass statement cards slide in on scroll. The photo drifts/zooms subtly as
   you pass. Green accent index numbers tie it to the palette. Cards are visible
   by default and GSAP only adds the entrance motion — robust without JS. */
const CARDS = [
  {
    n: "01",
    text: `TOKYO COFFEE のプレミアムライン
オーガニックなのに笑っちゃう
笑顔になるスペシャルティ`,
    pos: "left-0 top-[52vh] justify-start",
  },
  {
    n: "02",
    text: `妥協しない、クオリティ
世界一を目指してみます
まだまだ、グループステージ
応援よろしくお願いします`,
    pos: "right-0 top-[132vh] justify-end",
  },
];

export function StatementBoxes() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || !root.current) return;

      // Subtle scroll-linked zoom on the photo.
      const photo = root.current.querySelector("[data-photo]");
      if (photo) {
        gsap.fromTo(
          photo,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      // Smooth slide-in for each card as it enters.
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-plum">
      <div className="relative h-[200vh]">
        {/* sticky photo stage */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <div data-photo className="absolute inset-0 will-change-transform">
            <Image
              src="/photos/094.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-plum/40" />
        </div>

        {/* statement cards */}
        {CARDS.map((c) => (
          <div
            key={c.n}
            className={`pointer-events-none absolute flex w-full px-6 lg:px-14 ${c.pos}`}
          >
            <div
              data-card
              className="max-w-md rounded-3xl border border-green/40 bg-plum/30 p-8 backdrop-blur-md lg:max-w-lg"
            >
              <span className="spec mb-4 block text-xs uppercase tracking-[0.24em] text-green">
                {c.n}
              </span>
              <p className="whitespace-pre-line text-lg leading-loose text-paper lg:text-xl">
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

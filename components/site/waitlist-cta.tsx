"use client";

import { Reveal } from "@/components/motion/reveal";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc83irDFIv4XziLrsmpVrpq2wmypaNxnE58YKOg_aMH6fs-AA/viewform";

/* CAFERES 2026 trade capture — links to the Google Form (single source of leads). */
export function WaitlistCTA({ en = false }: { en?: boolean }) {
  return (
    <section
      id="join"
      className="bg-paper px-6 py-28 text-center lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="spec text-[0.7rem] uppercase tracking-widest text-plum/50">
            For caf&eacute;s, retailers &amp; the curious
          </p>
          <h2 className="display mt-4 text-[clamp(2.5rem,7vw,6rem)] leading-[1.04] text-plum">
            Try it first.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-plum lg:text-xl">
            {en
              ? "For caf\u00e9s, retailers and wholesalers \u2014 pre-launch samples and early wholesale pricing."
              : "\u30ab\u30d5\u30a7\u30fb\u5c0f\u58f2\u30fb\u5378\u58f2\u4e8b\u696d\u8005\u69d8\u3078 \u2015 \u767a\u58f2\u524d\u30b5\u30f3\u30d7\u30eb\u3068\u5148\u884c\u5378\u4fa1\u683c\u306e\u3054\u6848\u5185"}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            {en
              ? "Sample roasting and cupping are underway; registrants hear first. Individual customers: same form for pre-launch reservations."
              : "\u73fe\u5728\u30b5\u30f3\u30d7\u30eb\u30ed\u30fc\u30b9\u30c6\u30a3\u30f3\u30b0\u3068\u30ab\u30c3\u30d4\u30f3\u30b0\u3092\u9032\u884c\u4e2d\u3002\u3054\u767b\u9332\u3044\u305f\u3060\u3044\u305f\u65b9\u304b\u3089\u9806\u306b\u3001\u30b5\u30f3\u30d7\u30eb\u3068\u767a\u58f2\u6642\u671f\u3092\u3054\u6848\u5185\u3057\u307e\u3059\u3002\u4e00\u822c\u306e\u304a\u5ba2\u69d8\u306e\u5148\u884c\u4e88\u7d04\u767b\u9332\u3082\u3053\u3061\u3089\u304b\u3089\u3002"}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-4">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-plum px-10 py-4 text-base font-medium tracking-tight text-paper shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {en ? "Register \u2192" : "\u767b\u9332\u30d5\u30a9\u30fc\u30e0\u3078 \u2192"}
            </a>
            <p className="spec text-[0.7rem] text-plum/45">
              {en
                ? "Takes about a minute / No spam. Just the launch."
                : "\u7d041\u5206\u3067\u5b8c\u4e86 / No spam. Just the launch."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

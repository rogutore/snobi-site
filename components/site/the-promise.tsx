"use client";

import { Reveal } from "@/components/motion/reveal";

/* The promise — anti-snob + radical transparency, on a plum inverse block.
   Pre-launch: we show the CATEGORIES a bag will carry, not invented numbers. */
const RECEIPTS = ["R&D Lab", "Training", "Importing", "Snobing"];

export function ThePromise() {
  return (
    <section className="bg-paper px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#587d71] px-8 py-20 text-paper lg:px-20 lg:py-28">
        <Reveal>
          <h2 className="display text-[clamp(2.25rem,6vw,5rem)] leading-[1.04]">
            What&apos;s cookin.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-loose text-paper/85 lg:text-xl">
            笑顔になるような豆。感動の焙煎。ラボ。世界一のオーガニックコーヒー目指して。まあ、見てなって。
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-paper/15 pt-8">
            {RECEIPTS.map((r) => (
              <li
                key={r}
                className="spec text-sm uppercase tracking-[0.16em] text-green"
              >
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

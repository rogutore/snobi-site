"use client";

import { Reveal } from "@/components/motion/reveal";

/* The idea (organic × specialty) + excellence — two centered big-type beats,
   generous whitespace (ma). Fisterra display, Maiola support. */
export function TheIdea() {
  return (
    <section className="bg-paper px-6 py-28 lg:py-44">
      <div className="mx-auto max-w-4xl space-y-24 text-center lg:space-y-36">
        <Reveal>
          <p className="display text-[clamp(2rem,5vw,4rem)] leading-[1.08] text-plum">
            Most organic coffee never makes the cupping table. Most specialty
            coffee was never grown clean.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl">
            We&apos;re building the rare thing that&apos;s both.
          </p>
        </Reveal>

        <Reveal>
          <p className="display text-[clamp(2rem,5vw,4rem)] leading-[1.08] text-plum">
            We won&apos;t release a coffee we wouldn&apos;t score.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl">
            Every lot has to earn its place — grown organic, roasted in Tokyo,
            good enough to prove it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

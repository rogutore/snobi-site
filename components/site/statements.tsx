"use client";

import { Reveal } from "@/components/motion/reveal";

/* The thesis — a single centered big-type beat on the lavender block, with the
   Japanese support line. Generous whitespace (ma). */
export function TheIdea() {
  return (
    <section className="bg-paper px-6 py-28 lg:py-44">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="display text-[clamp(2rem,5vw,4rem)] leading-[1.08] text-plum">
            Changing the way Organic Coffee is done.
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-loose text-plum/80 lg:text-xl">
            オーガニックコーヒーの革命が起きようとしている。品質もサステナビリティも健康もワールドクラスのこだわりをSNOBIがお届けします。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

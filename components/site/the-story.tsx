"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

/* The story — text beside a photo that drifts on parallax as it passes. */
export function TheStory() {
  return (
    <section
      id="story"
      className="overflow-hidden bg-paper px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="spec mb-6 text-xs uppercase tracking-[0.24em] text-ink-soft">
            The story
          </p>
          <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-plum">
            We don&apos;t translate Japanese coffee. We are the translation.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            Half-Japanese, half-American. Snobi comes out of Tokyo Coffee&apos;s
            roastery in an old housing complex — precision, restraint, and the
            seasons (旬), without the gatekeeping.
          </p>
        </Reveal>

        {/* Photo with parallax drift */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-plum/5">
          <Parallax amount={60} className="absolute inset-[-12%]">
            <div className="relative h-full w-full">
              <Image
                src="/photos/snobi-people-1.jpg"
                alt="Inside the Tokyo Coffee roastery"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

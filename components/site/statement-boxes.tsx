"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { LineMotif } from "@/components/motion/line-motif";

/* Chisel's second section: a full-bleed photo held in place while bordered,
   rounded statement boxes animate in at opposite corners as you scroll, wired
   together with thin line-motifs that draw on. Comes BEFORE the flipbook.
   The photo is sticky; the boxes sit at different scroll depths so they reveal
   in sequence. Boxes are visible by default (CSS reveal) — robust without JS. */
export function StatementBoxes() {
  return (
    <section className="relative bg-plum">
      {/* tall scroll track */}
      <div className="relative h-[200vh]">
        {/* sticky photo stage */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <Image
            src="/photos/094.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-plum/45" />

          {/* drawn line-motifs, Chisel-style */}
          <LineMotif
            motif="circle-slash"
            className="absolute left-[8%] top-[14%] h-16 w-16 text-paper/55 lg:h-20 lg:w-20"
            drift={24}
          />
          <LineMotif
            motif="corner-frame"
            className="absolute right-[10%] top-[42%] h-24 w-24 text-paper/45"
            drift={30}
          />
          <LineMotif
            motif="long-rule"
            className="absolute bottom-[26%] left-[6%] h-2 w-40 text-paper/40"
            drift={0}
          />
        </div>

        {/* Box 1 — appears first, lower-left */}
        <div className="pointer-events-none absolute left-0 top-[55vh] w-full px-6 lg:px-12">
          <Reveal>
            <div className="max-w-sm rounded-3xl border border-paper/30 bg-plum/40 p-7 backdrop-blur-sm lg:p-8">
              <p className="text-lg leading-relaxed text-paper lg:text-xl">
                Snobi is an organic specialty roaster from the Tokyo Coffee
                family.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Box 2 — appears later, upper-right */}
        <div className="pointer-events-none absolute right-0 top-[135vh] flex w-full justify-end px-6 lg:px-12">
          <Reveal>
            <div className="max-w-sm rounded-3xl border border-paper/30 bg-plum/40 p-7 backdrop-blur-sm lg:p-8">
              <p className="text-lg leading-relaxed text-paper lg:text-xl">
                We chase the rare beans that are both certified organic and
                genuinely specialty — then we show the proof.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

/* The organic-origin image. It's AI-generated, and — true to a "we show our
   work" brand — we say so plainly, right on the image. */
export function OriginImage() {
  return (
    <section className="relative h-[82vh] min-h-[460px] w-full overflow-hidden">
      <Image
        src="/photos/origin-cherries-ai.png"
        alt="A farmer holding freshly picked coffee cherries at sunrise"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-plum/30" />

      <div className="absolute bottom-0 left-0 w-full px-6 pb-14 lg:px-10 lg:pb-20">
        <Reveal>
          <p className="spec mb-3 text-xs uppercase tracking-[0.24em] text-paper/70">
            This image is AI-generated
          </p>
          <p className="display max-w-3xl text-[clamp(1.9rem,4.5vw,3.5rem)] leading-[1.05] text-paper">
            But our coffee is as real and organic as can be.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/* The product. The only photo with the bag, so it gets its own section and the
   FULL image is shown (object-contain — never cropped). */
export function TheBag() {
  return (
    <section id="bag" className="bg-plum px-6 py-24 text-paper lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Full bag photo — object-contain so nothing is cut off */}
        <Reveal>
          <div className="relative mx-auto aspect-[1848/2304] w-full max-w-sm">
            <Image
              src="/photos/snobi-bag-hero.jpg"
              alt="The Snobi coffee bag"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-contain"
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="spec mb-5 text-xs uppercase tracking-[0.24em] text-green">
            The first bag
          </p>
          <h2 className="display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05]">
            Coming Soon.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-loose text-paper/80">
            東京発のスペシャリティ X オーガニックコーヒー。東京から世界へ。
          </p>
          <div className="mt-8">
            <Link href="#join">
              <Button variant="light">Be first in line</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

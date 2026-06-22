import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/* Chisel-style hero: full-bleed photo, the brand wordmark set large in Fisterra
   (the real logo face), tagline + CTA lower-left. Entrance is pure CSS (`.rise`)
   so the text is visible even if JS never loads. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-plum"
    >
      <Image
        src="/photos/237.jpg"
        alt="The Snobi counter in Tokyo"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum/60 via-plum/25 to-plum/85" />

      {/* Wordmark lockup — real vector boar + Snobi wordmark + tracked COFFEE */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
        <Image
          src="/brand/snobi.svg"
          alt=""
          width={160}
          height={140}
          unoptimized
          priority
          className="rise mb-3 h-16 w-auto brightness-0 invert lg:h-24"
        />
        <h1 className="rise" style={{ animationDelay: "0.08s" }}>
          <Image
            src="/brand/snobi-logo.svg"
            alt="Snobi"
            width={621}
            height={147}
            unoptimized
            priority
            className="h-auto w-[min(80vw,760px)] brightness-0 invert"
          />
        </h1>
        <span
          className="rise spec mt-5 text-xs uppercase tracking-[0.62em] text-paper/70 lg:text-sm"
          style={{ animationDelay: "0.15s" }}
        >
          Coffee
        </span>
      </div>

      {/* Tagline + CTA, lower-left */}
      <div className="relative z-10 px-6 pb-14 lg:px-10 lg:pb-20">
        <p
          className="rise display max-w-2xl text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.05] text-paper"
          style={{ animationDelay: "0.28s" }}
        >
          Organic. And actually specialty.
        </p>
        <p
          className="rise mt-4 max-w-md text-lg leading-relaxed text-paper/80"
          style={{ animationDelay: "0.38s" }}
        >
          An organic specialty roaster from the Tokyo Coffee family. Launching
          soon.
        </p>
        <div className="rise mt-7" style={{ animationDelay: "0.48s" }}>
          <Link href="#join">
            <Button variant="light">Be first in line</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

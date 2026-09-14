import Image from "next/image";
import Link from "next/link";
import { minimumPrice, yen } from "@/content/products";
import { Button } from "@/components/ui/button";

/* Chisel-style hero: full-bleed photo, the custom SNOBI wordmark (SVG) set
   large, tagline + CTA lower-left. Entrance is pure CSS (`.rise`) so the text
   is visible even if JS never loads. */
export function Hero({ en = false }: { en?: boolean }) {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-plum"
    >
      <Image
        src="/photos/237.jpg"
        alt="The Snobi counter in Tokyo"
        fill
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum/60 via-plum/25 to-plum/85" />

      {/* Wordmark lockup — Snobi / COFFEE */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
        <h1>
          <Image
            src="/brand/snobi_font1.svg"
            alt="Snobi"
            width={1280}
            height={360}
            unoptimized
            fetchPriority="high"
            loading="eager"
            className="h-auto w-[min(68vw,560px)] brightness-0 invert"
          />
        </h1>
      </div>

      {/* Tagline + CTA, lower-left */}
      <div className="relative z-10 px-6 pb-14 lg:px-10 lg:pb-20">
        <p
          className="rise display max-w-2xl text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.05] text-paper"
          style={{ animationDelay: "0.28s" }}
        >
          Organic x Specialty.
        </p>
        <p
          className="rise mt-4 max-w-md text-lg leading-relaxed text-paper/80"
          style={{ animationDelay: "0.38s" }}
        >
          Organic × Specialty × Japan — from the Tokyo Coffee family. Est. 2026.
        </p>
        <div className="rise mt-7" style={{ animationDelay: "0.48s" }}>
          <p className="mb-4 text-paper">
            {yen(minimumPrice)}〜{" "}
            {en ? "tax included · whole bean" : "（税込）・豆のまま"}
          </p>
          <Link href="#shop">
            <Button variant="light">
              {en ? "Shop Chapter One ↓" : "第一章のコーヒーを見る ↓"}
            </Button>
          </Link>
          <p className="mt-3 text-sm text-paper">
            {en
              ? "Free shipping on orders of ¥3,000 or more"
              : "¥3,000以上で送料無料"}
          </p>
        </div>
      </div>
    </section>
  );
}

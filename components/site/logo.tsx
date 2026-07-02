import Image from "next/image";
import { cn } from "@/lib/utils";

/* Real vector brand assets (outlined, plum #443850):
   boar  = /brand/snobi.svg,  wordmark = /brand/snobi-logo.svg.
   `invert` recolors them to cream for dark backgrounds. */
export function Logo({
  className,
  invert = false,
  withBoar = true,
}: {
  className?: string;
  invert?: boolean;
  withBoar?: boolean;
}) {
  const tint = invert ? "brightness-0 invert" : "";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {withBoar && (
        <Image
          src="/brand/snobi.svg"
          alt=""
          width={80}
          height={70}
          unoptimized
          priority
          className={cn("h-7 w-auto", tint)}
        />
      )}
      <Image
        src="/brand/snobi_font1.svg"
        alt="Snobi"
        width={1280}
        height={360}
        unoptimized
        priority
        className={cn("h-5 w-auto", tint)}
      />
    </span>
  );
}

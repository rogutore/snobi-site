import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";

/* Quiet endorsed-brand footer — room for JAS + USDA Organic marks, socials,
   EN/JP, boar mark (brief §3). */
export function Footer() {
  return (
    <footer className="bg-plum px-6 py-16 text-paper lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-b border-paper/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo invert className="mb-6" />
            <p className="max-w-sm text-lg leading-relaxed text-paper/70">
              An organic specialty line from Tokyo Coffee.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <nav className="flex flex-col gap-3">
              <span className="spec text-[0.7rem] uppercase tracking-[0.18em] text-paper/40">
                Explore
              </span>
              {[
                ["The story", "#story"],
                ["Join the list", "#join"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-3">
              <span className="spec text-[0.7rem] uppercase tracking-[0.18em] text-paper/40">
                Follow
              </span>
              {["Instagram", "Newsletter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {s}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Snobi</span>
            {/* placeholders for certification marks */}
            <span className="spec text-[0.7rem] uppercase tracking-[0.14em]">
              JAS Organic
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-paper/70">EN</span>
            <span className="opacity-50">JP — soon</span>
          </div>
        </div>

        {/* Giant wordmark, à la Chisel's oversized footer logo */}
        <div className="select-none pt-10">
          <Image
            src="/brand/snobi-logo.svg"
            alt=""
            width={621}
            height={147}
            unoptimized
            className="h-auto w-full opacity-[0.08] brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
}

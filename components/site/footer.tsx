import Image from "next/image";
import Link from "next/link";
import { FORM_URL } from "@/content/products";
import { Logo } from "./logo";

/* Quiet endorsed-brand footer — room for JAS + USDA Organic marks, socials,
   EN/JP, boar mark (brief §3). */
export function Footer({ en = false }: { en?: boolean }) {
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
              <span className="spec text-[0.7rem] uppercase tracking-[0.18em] text-paper/65">
                Explore
              </span>
              {[
                ["Shop Chapter One", `${en ? "/en" : "/"}#shop`],
                ["The story", `${en ? "/en" : "/"}#story`],
                ["Trade", en ? "/en/trade" : "/trade"],
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
              <span className="spec text-[0.7rem] uppercase tracking-[0.18em] text-paper/65">
                Follow
              </span>
              <a href={FORM_URL} className="text-sm text-paper/75">
                {en
                  ? "Launch information & enquiries ↗"
                  : "発売案内・お問い合わせ ↗"}
              </a>
              <a
                href="https://tokyocoffee.jp/pages/policy"
                className="text-sm text-paper/75"
              >
                {en ? "Legal & sales terms" : "特定商取引法に基づく表記"}
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Snobi</span>
            {/* placeholders for certification marks */}
            <span className="spec text-[0.7rem] uppercase tracking-[0.14em]">
              JAS Organic
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={en ? "text-paper/70 hover:text-paper" : "text-paper"}
            >
              日本語
            </Link>
            <Link
              href="/en"
              className={en ? "text-paper" : "text-paper/70 hover:text-paper"}
            >
              English
            </Link>
          </div>
        </div>

        <address className="not-italic text-sm leading-loose text-paper/75">
          株式会社ローグトレード
          <br />
          <a href="mailto:info@tokyocoffee.jp">info@tokyocoffee.jp</a>
          <br />
          <a href="tel:0424201882">042-420-1882</a>
        </address>
        {/* Giant wordmark, à la Chisel's oversized footer logo */}
        <div className="select-none pt-10">
          <Image
            src="/brand/snobi_font1.svg"
            alt=""
            width={1280}
            height={360}
            unoptimized
            className="h-auto w-full opacity-[0.08] brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
}

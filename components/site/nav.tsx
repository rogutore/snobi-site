"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Minimal teaser nav: wordmark + join. Light over the hero, darkens on scroll. */
export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-plum/10 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[110rem] items-center justify-between px-6 lg:px-10">
        <Link href="#top" aria-label="Snobi — home">
          <Logo className="shrink-0" invert={!scrolled} />
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={cn(
              "hidden text-xs font-medium tracking-tight transition-colors sm:block",
              scrolled
                ? "text-ink-soft hover:text-plum"
                : "text-paper/80 hover:text-paper",
            )}
            aria-label="Switch language (coming soon)"
            title="日本語 — coming soon"
          >
            EN / <span className="opacity-50">JP</span>
          </button>
          <Link href="#join">
            <Button variant={scrolled ? "ghost" : "light"} className="text-xs">
              Be first in line
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

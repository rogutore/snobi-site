"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { CartButton } from "@/components/commerce/cart";
export function Nav({
  en = false,
  paper = false,
  home = true,
}: {
  en?: boolean;
  paper?: boolean;
  home?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const dark = paper || scrolled;
  const root = en ? "/en" : "/";
  return (
    <header className={`commerce-nav ${dark ? "paper-nav" : "photo-nav"}`}>
      <nav>
        <Link href={home ? "#top" : root} aria-label="Snobi — home">
          <Logo invert={!dark} />
        </Link>
        <div className="nav-links">
          <a href={home ? "#shop" : `${root}#shop`}>
            {en ? "Shop" : "コーヒー"}
          </a>
          <CartButton light={!dark} />
        </div>
      </nav>
    </header>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/* Pure-CSS reveal-on-scroll (see globals.css `.reveal`). Content is VISIBLE by
   default and only animates where the browser supports scroll-driven CSS
   animations — so it can never blank the page if JS fails to load. No client
   JS, no framer-motion. `delay` is accepted for API compatibility (applied as a
   small animation-range nudge via inline style). */
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}

/* Group/Item kept as simple visible wrappers for API compatibility. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}

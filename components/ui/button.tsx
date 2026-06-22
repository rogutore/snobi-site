"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "solid" | "light";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Chisel-style ghost rectangle — thin border, fills on hover
  ghost:
    "border border-plum/40 text-plum hover:border-plum hover:bg-plum hover:text-paper hover:-translate-y-0.5",
  solid:
    "bg-plum text-paper hover:bg-plum-700 hover:-translate-y-0.5 shadow-sm",
  light:
    "border border-paper/40 text-paper hover:bg-paper hover:text-plum hover:-translate-y-0.5",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

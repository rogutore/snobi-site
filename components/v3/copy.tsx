"use client";
/* Copy-to-clipboard for an address or number (mailto/tel may do nothing on some devices, so the text stays selectable). */
import { useState } from "react";

export function Copy({ text, label = "コピー" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="v3-copy"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }).catch(() => {});
      }}
    >
      {done ? "コピーしました" : label}
    </button>
  );
}

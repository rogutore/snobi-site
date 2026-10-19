"use client";
/* Product photos for an origin page (owner 2026-10-09: "we usually do 5-7 photos … at least the beans").
   Six frames from the 2026-10-01 shoot (content/v2.ts originFrames; design/plan/PHOTO-INVENTORY.md §3.3): the bag in the
   light, the roasted beans, the cup, brewing, the dark table, held at the waist. The white-background studio frame is
   left out (small, off-centre bag). One large photo + a thumbnail row; the large one keeps a fixed 3:4 frame. */
import { useState } from "react";
import { shotSrcSet, shotThumb } from "@/components/v2/photo";

export type Shot = { id: string; alt: string; position?: string };

export function OriginGallery({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState(0);
  const s = shots[i];
  return (
    <div className="v3p-gallery">
      <div className="ph">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
        <img
          key={s.id}
          src={`/v2/photos/${s.id}-s.webp`}
          srcSet={shotSrcSet(s.id)}
          sizes="(min-width:860px) 52vw, 100vw"
          alt={s.alt}
          style={s.position ? { objectPosition: s.position } : undefined}
          fetchPriority={i === 0 ? "high" : "auto"}
        />
      </div>
      <div className="thumbs" role="group" aria-label="商品写真">
        {shots.map((x, n) => (
          <button key={x.id} type="button" aria-label={`写真${n + 1}：${x.alt}`} aria-current={n === i} onClick={() => setI(n)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP thumb */}
            <img src={shotThumb(x.id)} alt="" loading="lazy" style={x.position ? { objectPosition: x.position } : undefined} />
          </button>
        ))}
      </div>
    </div>
  );
}

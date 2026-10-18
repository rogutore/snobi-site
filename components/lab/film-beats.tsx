"use client";
import { roastDays } from "@/content/schedule";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./film.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Beats 3–7: arrive → roast → ship → bag → pour. Copy is live-site lines
   only. Photos are from the 2026-10-01 Snobi shoot (exports in
   public/photos/snobi, 1800×1198). */
const BEATS = [
  {
    no: "01",
    en: "Arrive",
    ja: "JAS有機認証の豆だけを。",
    img: "/photos/snobi/green-shelves-2.webp",
    w: 1800,
    h: 1198,
    alt: "焙煎所の生豆の棚",
    caption: "東京の焙煎所 — 生豆の棚",
  },
  {
    no: "02",
    en: "Roast",
    ja: `東京で焙煎。${roastDays.map((d) => `${d.ja}曜`).join("・")}に焼いて、`,
    img: "/photos/snobi/roast-trier.webp",
    w: 1800,
    h: 1198,
    alt: "冷却トレーで撹拌される焙煎豆",
    caption: "冷却トレー",
  },
  {
    no: "03",
    en: "Ship",
    ja: "翌営業日に発送。",
    img: "/photos/snobi/roast-drop-1.webp",
    w: 1800,
    h: 1198,
    alt: "焙煎機から落ちる焼き上がりの豆",
    caption: "焼き上がり",
  },
  {
    no: "04",
    en: "The bag",
    ja: "焙煎日は袋に。",
    img: "/photos/snobi/bag-open-2.webp",
    w: 1800,
    h: 1198,
    alt: "袋の裏面を手に",
    caption: "袋の裏面",
  },
  {
    no: "05",
    en: "Pour",
    ja: "まずは、一杯から。",
    img: "/photos/snobi/pour-bloom.webp",
    w: 1800,
    h: 1198,
    alt: "ハンドドリップで蒸らす様子",
    caption: "ハンドドリップ",
  },
];

export function FilmBeats() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>(`.${styles.beatStep}`)
        .forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => self.isActive && setActive(i),
          }),
        );
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.beats} aria-label="焙煎まで">
      <div className={styles.beatMedia} aria-hidden="true">
        {BEATS.map((b, i) => (
          <figure
            key={b.no}
            className={styles.beatFigure}
            data-active={i === active}
          >
            <Image
              src={b.img}
              alt=""
              width={b.w}
              height={b.h}
              sizes="(min-width: 900px) 50vw, 100vw"
              className={styles.beatImg}
            />
            <figcaption className={styles.slot}>{b.caption}</figcaption>
          </figure>
        ))}
      </div>
      <ol className={styles.beatList}>
        {BEATS.map((b, i) => (
          <li
            key={b.no}
            className={styles.beatStep}
            data-active={i === active}
          >
            <figure className={styles.beatInline}>
              <Image
                src={b.img}
                alt={b.alt}
                width={b.w}
                height={b.h}
                sizes="100vw"
                className={styles.beatImg}
              />
              <figcaption className={styles.slot}>{b.caption}</figcaption>
            </figure>
            <p className={styles.eyebrow}>
              {b.no} — {b.en}
            </p>
            <p className={styles.beatLine}>{b.ja}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

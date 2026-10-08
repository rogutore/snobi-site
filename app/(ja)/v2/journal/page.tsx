import Link from "next/link";
import { Photo } from "@/components/v2/photo";

/* Planned first posts (plan: Journal). Only the Roastery photo essay has a preview page. */
const POSTS = [
  { href: "/v2/journal/roastery", cat: "焙煎所", title: "生豆から、一杯まで。（写真）", status: "試作あり", cover: "200", alt: "冷却槽をかき混ぜる腕" },
  { href: null, cat: "抽出", title: "一杯を、順番に。", status: "準備中", cover: "124", alt: "ドリッパーに湯を注ぐ" },
  { href: null, cat: "産地", title: "チリノスのミゲルさん", status: "準備中", cover: "152", alt: "ペルーの焙煎豆" },
];

export default function Journal() {
  return (
    <section className="v2-sec" aria-labelledby="j-h1">
      <div className="v2-wrap v2-stack" style={{ gap: "2.5rem" }}>
        <div className="v2-stack" style={{ gap: ".6rem" }}>
          <h1 id="j-h1" className="t-ja-display">ジャーナル</h1>
          <p className="t-label v2-soft">産地 · 抽出 · 焙煎所 · お知らせ</p>
        </div>
        <div className="v2-posts">
          {POSTS.map((p) => {
            const inner = (
              <>
                <Photo id={p.cover} alt={p.alt} sizes="(min-width:760px) 32vw, 100vw" />
                <div className="v2-stack" style={{ gap: ".5rem" }}>
                  <span className="t-label v2-soft">{p.cat} · <span className="v2-todo">{p.status}</span></span>
                  <h2 className="t-ja-heading">{p.title}</h2>
                </div>
              </>
            );
            return p.href ? <Link key={p.title} href={p.href} className="v2-post">{inner}</Link> : <div key={p.title} className="v2-post">{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

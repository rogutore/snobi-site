import Link from "next/link";
import { SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";

/* Article template, shown as the Roastery photo essay (plan sequence 1). Captions are drafts for the owner. */
const STEPS: [string, string, string][] = [
  ["160", "生豆庫。有機JASのロットが棚に並ぶ", "生豆の棚"],
  ["161", "麻袋の有機JAS表示", "有機JASの表示がある麻袋"],
  ["162", "焙煎の前に、生豆をすくう", "生豆をすくう"],
  ["211", "焙煎機の前", "焙煎中"],
  ["205", "焙煎機の扉から、豆が流れ出る", "焙煎豆が流れ出る"],
  ["200", "冷却槽で、豆を冷ます", "冷却槽"],
  ["152", "焙煎を終えた豆", "焙煎豆"],
  ["131", "一杯目", "グラスに注ぐ一杯"],
];

export default function RoasteryPost() {
  return (
    <article className="v2-sec" aria-labelledby="p-h1">
      <div className="v2-wrap v2-stack" style={{ gap: "2.5rem" }}>
        <div className="v2-stack" style={{ gap: ".8rem" }}>
          <p className="t-label v2-soft"><Link href="/v2/journal">ジャーナル</Link> · 焙煎所 · {SHOOT}</p>
          <h1 id="p-h1" className="t-ja-display">生豆から、一杯まで。</h1>
          <p className="v2-slot" style={{ maxWidth: "40em" }}>写真の記事の試作です。本文と見出しは下書きで、ご確認後に書き直します。</p>
        </div>
        <ol className="v2-toc">{STEPS.map(([id, c], i) => <li key={id}><a href={`#s${i + 1}`}>{String(i + 1).padStart(2, "0")} {c}</a></li>)}</ol>
        {STEPS.map(([id, c, alt], i) => (
          <section key={id} id={`s${i + 1}`} className="v2-stack" style={{ maxWidth: "62rem", gap: ".8rem" }}>
            <Photo id={id} alt={alt} caption={`${String(i + 1).padStart(2, "0")} — ${c}`} sizes="(min-width:1000px) 62rem, 100vw" />
          </section>
        ))}
        <Link href="/v2/coffee" className="v2-btn" style={{ justifySelf: "start" }}>4つの産地から選ぶ</Link>
      </div>
    </article>
  );
}

import { FORM_URL } from "@/content/products";
import { tradeBenefits, SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";

export default function Trade() {
  return (
    <>
      <section className="v2-sec" aria-labelledby="t-h1">
        <div className="v2-wrap v2-split">
          <div className="v2-stack">
            <p className="t-eyebrow v2-soft">Chapter One / The founding 25</p>
            <h1 id="t-h1" className="t-display" lang="en">Good company. <em>Better coffee.</em></h1>
            <p className="t-ja-body v2-measure">取扱店 第一章。Tokyo Coffeeがつくる4つのオーガニック・スペシャルティコーヒーを、あなたのお店へ。</p>
            <a href={FORM_URL} className="v2-btn" style={{ justifySelf: "start" }}>取扱店について相談する</a>
          </div>
          <Photo id="189" alt="焙煎機の前の三人" caption={`焙煎所で — ${SHOOT}`} priority sizes="(min-width:860px) 56vw, 100vw" />
        </div>
      </section>

      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-stack" style={{ gap: "2.5rem" }}>
          <div className="v2-terms">
            {[["サイズ", "確認中"], ["最小ロット", "確認中"], ["納期", "確認中"], ["残りの枠", "確認中"]].map(([k, v]) => (
              <div key={k}><span className="t-label v2-soft">{k}</span><span className="v2-todo" style={{ justifySelf: "start" }}>{v}</span></div>
            ))}
          </div>
          <div className="v2-terms">
            {tradeBenefits.map(([h, t]) => (
              <div key={h}><h2 className="t-ja-heading" style={{ fontSize: "var(--text-step-1)" }}>{h}</h2><p className="t-ja-body">{t}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-sec">
        <div className="v2-wrap v2-split flip">
          <div className="v2-stack">
            <h2 className="t-ja-display">ロースタリーで、一緒に飲む</h2>
            <p className="t-ja-body">豆を知っていただくための、ロースタリーでのカッピングへご招待。</p>
            <h2 className="t-ja-heading" style={{ marginTop: "1.5rem" }}>あなたのお店のことを、教えてください。</h2>
            <p className="t-ja-note v2-soft">お問い合わせ → 担当者からご案内 → お取引口座の承認 → Tokyo Coffeeの業務用注文へ。</p>
            <a href={FORM_URL} className="v2-btn" style={{ justifySelf: "start" }}>取扱店について相談する</a>
          </div>
          <Photo id="211" alt="焙煎中" caption="焙煎中" sizes="(min-width:860px) 56vw, 100vw" />
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { statementJa, storyJa, signOff, roadAhead, jas, SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";

const CHAPTERS: [string, string][] = [
  ["statement", "01 Statement"],
  ["story", "02 Story"],
  ["road", "03 Road Ahead"],
  ["lineage", "04 Tokyo Coffee"],
  ["jas", "05 JAS organic"],
];

export default function About() {
  return (
    <>
      <section className="v2-sec" aria-labelledby="a-h1">
        <div className="v2-wrap v2-stack" style={{ gap: "2rem" }}>
          <h1 id="a-h1" className="t-eyebrow v2-soft">ストーリー</h1>
          <ul className="v2-toc">{CHAPTERS.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul>
        </div>
      </section>

      {/* 01 Statement — alone, no photo */}
      <section id="statement" className="v2-sec v2-line">
        <div className="v2-wrap v2-ch v2-statement">
          <p className="v2-ch-no">01 · Statement</p>
          <div className="v2-stack" style={{ maxWidth: "min(100%, 60rem)" }}>{statementJa.map((t) => <p key={t}>{t}</p>)}</div>
        </div>
      </section>

      {/* 02 Story — the place, as a photo essay with captions */}
      <section id="story" className="v2-sec v2-alt">
        <div className="v2-wrap v2-ch">
          <p className="v2-ch-no">02 · Story</p>
          <h2 className="t-display" lang="en">We’re writing it.</h2>
          <div className="v2-stack v2-measure">{storyJa.map((t) => <p key={t} className="t-ja-body">{t}</p>)}</div>
          <div className="v2-essay">
            <Photo id="054" alt="東京の屋根と電線" caption="屋根の上から" sizes="(min-width:760px) 56vw, 100vw" />
            <Photo id="021" alt="上から見た白い波板の建物と自転車" caption={`焙煎所の前 — ${SHOOT}`} sizes="(min-width:760px) 40vw, 50vw" />
            <Photo id="019" alt="階段の壁のYOU ARE LOVEDの壁画" caption="階段の壁画" sizes="(min-width:760px) 32vw, 50vw" />
            <Photo id="039" alt="テープを貼った窓ガラス" caption="二階の窓" sizes="(min-width:760px) 24vw, 50vw" />
            <Photo id="041" alt="戸口に立つ人のシルエット" caption="戸口" sizes="(min-width:760px) 32vw, 50vw" />
          </div>
        </div>
      </section>

      {/* 03 Road Ahead */}
      <section id="road" className="v2-sec">
        <div className="v2-wrap v2-ch">
          <p className="v2-ch-no">03 · Road Ahead</p>
          <h2 className="t-display" lang="en">A first chapter. <em>Not a finish line.</em></h2>
          <div className="v2-road">
            {roadAhead.map(([n, h, t]) => (
              <div key={n}><span className="v2-ch-no">{n}</span><h3 className="t-ja-heading" style={{ fontSize: "var(--text-step-2)" }}>{h}</h3><p className="t-ja-body">{t}</p></div>
            ))}
          </div>
          <Photo id="032" alt="工事中の部屋。材木とソファ" caption="つくっている途中の部屋" sizes="100vw" />
        </div>
      </section>

      {/* 04 Tokyo Coffee lineage */}
      <section id="lineage" className="v2-sec v2-alt">
        <div className="v2-wrap v2-ch">
          <p className="v2-ch-no">04 · Tokyo Coffee</p>
          <div className="v2-split">
            <div className="v2-stack v2-measure">
              <h2 className="t-ja-heading">SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。</h2>
              <p className="t-ja-body">2020年9月、東久留米・滝山に、東京コーヒーの最初の焙煎所カフェ。</p>
              <p className="v2-slot">創業の物語（兄弟とTED「コーヒーは生鮮食品」）と創業年：ご確認後にここへ。</p>
            </div>
            <Photo id="187" alt="二台の焙煎機にもたれる二人" caption="焙煎機の前で（お名前：ご確認後）" sizes="(min-width:860px) 56vw, 100vw" />
          </div>
          <div className="v2-quad">
            <Photo id="215" alt="建物の前のチーム" caption="焙煎所の前で" sizes="(min-width:760px) 24vw, 50vw" />
            <Photo id="211" alt="焙煎中" caption="焙煎中" sizes="(min-width:760px) 24vw, 50vw" />
            <Photo id="203" alt="腕を組む焙煎士" caption="焙煎士" sizes="(min-width:760px) 24vw, 50vw" />
            <Photo id="114" alt="昼の焙煎所" caption="昼の焙煎所" sizes="(min-width:760px) 24vw, 50vw" />
          </div>
        </div>
      </section>

      {/* the one dark moment */}
      <section className="v2-band dark" aria-label="東京で焙煎">
        <Photo id="205" alt="焙煎機の扉から流れ出る焙煎豆" sizes="100vw" />
        <div className="v2-band-copy left"><p className="t-ja-display">東京で焙煎。</p></div>
      </section>

      {/* 05 JAS */}
      <section id="jas" className="v2-sec">
        <div className="v2-wrap v2-ch">
          <p className="v2-ch-no">05 · JAS organic</p>
          <h2 className="t-ja-display">JAS有機認証の豆だけを、東京で焙煎。</h2>
          <div className="v2-nums">{jas.map(([n, l]) => <div className="v2-num" key={n}><b>{n}</b><span>{l}</span></div>)}</div>
          <p className="v2-slot">有機JASの基準（3〜4項目）：JASの資料から引用してここへ。番号の掲載はご確認後。焙煎所は有機・非有機を併用する認定のため「有機専門の焙煎所」とは書きません。</p>
          <div className="v2-quad" style={{ gridTemplateColumns: "2fr 1.4fr 1fr" }}>
            <Photo id="161" alt="有機JASとMayacertの表示がある麻袋" caption="麻袋の有機JAS表示" sizes="(min-width:760px) 44vw, 100vw" />
            <Photo id="160" alt="生豆の棚" caption="生豆庫" sizes="(min-width:760px) 30vw, 50vw" />
            <Photo id="162" alt="生豆をすくう" caption="生豆" sizes="(min-width:760px) 22vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-split">
          <p className="t-ja-display">{signOff}</p>
          <div><Link href="/v2/coffee" className="v2-btn">4つの産地から選ぶ</Link></div>
        </div>
      </section>
    </>
  );
}

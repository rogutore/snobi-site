import { Reveal } from "@/components/motion/reveal";

/* The Road Ahead — six-stop roadmap lifted from the CAFERES pamphlet.
   Pre-launch honesty as momentum: the plan IS the product for now. */
const STOPS_JA = [
  { t: "Caferes", d: "カフェレスで限定公開。業務用・小売用、予約販売開始。" },
  { t: "Official Launch", d: "ウェブサイト公開、一般注文受付開始。" },
  { t: "Product Development", d: "商品開発 Round 2。世界のベスト ORGANIC × SPECIALTY の追求。" },
  { t: "Coffee Lab", d: "コーヒーラボ（研究所）工事開始。" },
  { t: "Training & Research", d: "リサーチ・トレーニング・セミナーを社内・社外向けに実施。" },
  { t: "Community", d: "常にチャレンジし続ける。ゴールはない。ただコミュニティを築くこと。" },
];

const STOPS_EN = [
  { t: "Caferes", d: "Limited debut: trade & retail pre-orders open." },
  { t: "Official Launch", d: "Site live, orders open to everyone." },
  { t: "Product Development", d: "Round 2: chasing the world's best organic × specialty." },
  { t: "Coffee Lab", d: "Construction begins on our own lab." },
  { t: "Training & Research", d: "In-house and public seminars." },
  { t: "Community", d: "No finish line. Keep challenging. Build the community." },
];

export function RoadAhead({ en = false }: { en?: boolean }) {
  const STOPS = en ? STOPS_EN : STOPS_JA;
  return (
    <section id="road" className="bg-paper px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="spec mb-6 text-xs uppercase tracking-[0.24em] text-ink-soft">
            {en ? "The road ahead" : "そのさきへ"}
          </p>
          <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-plum">
            The Road Ahead.
          </h2>
        </Reveal>
        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STOPS.map((s, i) => (
            <Reveal key={s.t} delay={0.06 * i}>
              <li className="border-t border-plum/15 pt-5">
                <span className="spec block text-xs uppercase tracking-[0.24em] text-sage">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-3 text-2xl leading-tight text-plum">
                  {s.t}
                </h3>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-ink-soft">
                  {s.d}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { roastDays } from "../../schedule";
import { enjoyPeriod } from "../facts";
import { SYSTEM } from "../../system.generated";
import type { Post } from "../types";
import { yen } from "../../products";
import { shippingRates, freeShippingLine, nextDayLine, FREE_SHIPPING_YEN, ORDER_CUTOFF, shipMethodLine } from "../../ordering";
import { coffee, price, roastOf, caffeineCut, bestForShort, countryJa, roastDaysLine, cutoffLine, agingLine, restate } from "../facts";
import { AJCA_DRIP, cupsIn } from "../brew";

/* Keyword: オーガニック コーヒー 豆 ギフト. No gift wrapping or のし exists yet — never promise one.
   Facts: content/products.ts, content/ordering.ts, content/v2.ts (ネコポス); dose and storage from 全日本コーヒー協会;
   cup counts are cupsIn() of the AJCA dose in ../brew (rounded down). External facts opened 2026-10-09.
   Titles, "こんな人に", prices, the decaf's facts and the delivery lines are read from content/products.ts and
   content/ordering.ts (SINGLE_SOURCE rule 2); a missing product or field stops the build (../facts). */
const slugs = ["peru", "ethiopia-guji", "colombia-huila", "mexico-chiapas-decaf"];
const beans = slugs.map((s) => coffee(s));
const mex = coffee("mexico-chiapas-decaf");
const g = AJCA_DRIP.grams;
const twoADay = 2; // the example drinker's cups per day; days of a 200g bag = cupsIn(200) / twoADay, rounded down

/* 「産地の違う100gを2袋…どの組み合わせでも送料無料」 is computed, not asserted: the cheapest pair of two different 100g
   bags must reach FREE_SHIPPING_YEN, or the build stops (the claim would be false). That pair is the printed example. */
const pairs = beans.flatMap((a, i) => beans.slice(i + 1).map((b) => ({ a, b, sum: price(a, "100g") + price(b, "100g") })));
const cheapest = pairs.reduce((min, p) => (p.sum < min.sum ? p : min));
if (cheapest.sum < FREE_SHIPPING_YEN)
  throw new Error(`journal/organic-coffee-gift: ${cheapest.a.slug} + ${cheapest.b.slug} 100g = ${yen(cheapest.sum)}, below ${yen(FREE_SHIPPING_YEN)}; the "どの組み合わせでも送料無料" line is false`);

const post: Post = {
  slug: "organic-coffee-gift",
  category: "ギフト",
  title: "オーガニックのコーヒー豆をギフトに。量と選び方",
  metaTitle: "オーガニック コーヒー豆のギフト｜何グラム・何杯・届く日",
  description:
    `オーガニック（有機JAS）のコーヒー豆をギフトにするときの選び方。何グラム贈るか、豆のままか粉か、デカフェ、届く日まで。100gは1杯${g}gの目安で約${cupsIn(100)}杯分。SNöBIは${freeShippingLine.ja}。`,
  keyword: "オーガニック コーヒー 豆 ギフト",
  related: ["有機 コーヒー ギフト", "コーヒー豆 プレゼント 何グラム", "コーヒー豆 100g 何杯"],
  published: "2026-10-09",
  updated: "2026-10-09",
  lead:
    `オーガニックのコーヒー豆をギフトにするなら、有機JASマークのある豆を、1杯${g}gの目安で約${cupsIn(100)}杯分の100gか約${cupsIn(200)}杯分の200gから選び、相手がミルを持っているかで豆のままか粉かを決めます。`,
  sections: [
    {
      h2: "オーガニックのコーヒー豆をギフトにするとき、見るところ",
      blocks: [
        { p: "「有機」「オーガニック」と表示できるのは、有機JASマークのある食品だけです。マークがない農産物や加工食品にこう書くことは、法律で禁止されています（農林水産省）。ギフトでも、まずマークを見ます。" },
        {
          list: [
            "有機JASマークがあるか。",
            "量：何杯分か。100gか、200gか。",
            "挽き方：豆のままか、粉か。",
            "カフェイン：デカフェがいいか。",
            "届く日：いつ焙煎し、いつ発送するか。",
          ],
        },
        { p: "有機JASの基本は、化学合成肥料と農薬を原則使わないこと。遺伝子組換えの種苗も使いません。コーヒーのような多年生の作物は、最初の収穫の前に3年以上、この管理を続けます。" },
      ],
    },
    {
      h2: `何グラム贈るか。100gで約${cupsIn(100)}杯`,
      blocks: [
        { p: `全日本コーヒー協会のペーパードリップの淹れ方では、1杯${AJCA_DRIP.yieldMl}mLに、中細挽きのコーヒー粉${g}gを使います。この目安で数えると、次のとおりです。` },
        {
          table: {
            head: ["量", `杯数（1杯${g}gの目安）`, "1日1杯なら"],
            rows: [
              ["100g", `約${cupsIn(100)}杯`, "約1週間"],
              ["200g", `約${cupsIn(200)}杯`, "約2週間"],
            ],
          },
        },
        { p: `いくつかの産地を試してほしいなら、100gを2袋から。毎日飲む人には、200gを1袋。1日${twoADay}杯飲む人なら、200gで約${Math.floor(cupsIn(200) / twoADay)}日分です。` },
        { p: `SNöBIの豆は、焙煎から、ペルーとエチオピアが${enjoyPeriod(beans[0])}まで、コロンビアとメキシコが${enjoyPeriod(beans[2])}まで、味をお楽しみいただけます。飲み切れる量を選ぶと、その間に味わえます。` },
        { note: "杯数は目安です。淹れ方や好みの濃さで変わります。" },
      ],
    },
    {
      h2: "豆のままか、粉か",
      blocks: [
        { p: "全日本コーヒー協会は、淹れる直前に、必要な分だけ挽くことを勧めています。豆は粉になると表面積が増え、湿気を吸いやすく、酸化が進むためです。" },
        { p: "SNöBIは、豆のままでのお届けです。挽くにはミルが要ります。贈る相手がミルを持っているか、先に確かめておくと迷いません。" },
        { p: "届いたあとは、袋をきっちり閉めて、直射日光を避けた冷暗所へ。全日本コーヒー協会は、これを保存の基本としています。" },
      ],
    },
    {
      h2: "カフェインをとらない人には、デカフェ",
      blocks: [
        { p: "カフェインをとらない人、夜にもコーヒーを飲みたい人には、デカフェ（カフェインレス）という選び方があります。" },
        { p: "コーヒーの表示ルール（公正競争規約の施行規則）では、カフェインを90%以上除去したコーヒーを、「カフェインレスコーヒー」「デカフェネィテッドコーヒー」などと表示します。" },
        { p: `SNöBIの${mex.title.ja}は、薬品を使わないマウンテンウォーター製法で、カフェインを${caffeineCut(mex)}カットしています。有機JASで、${roastOf(mex)}。${mex.notes.ja.join("、")}。` },
        { note: "デカフェは、カフェインがゼロになるわけではありません。" },
      ],
    },
    {
      h2: "4つの豆から選ぶ",
      blocks: [
        { p: "SNöBI（スノビ）の第一章は4つの豆。すべて有機JASで、カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。全種類、浅煎りです。" },
        {
          table: {
            head: ["豆", "こんな人に", "100g", "200g"],
            rows: beans.map((c) => [c.title.ja, bestForShort(c), yen(price(c, "100g")), yen(price(c, "200g"))]),
          },
        },
        { p: `価格はすべて税込です。産地の違う100gを2袋選ぶと、どの組み合わせでも${yen(FREE_SHIPPING_YEN)}以上になり、送料無料。たとえば${countryJa(cheapest.a)}と${countryJa(cheapest.b)}で${yen(cheapest.sum)}です。` },
        { p: "4つとも、産地と生産者がわかります。カードに一言添えるなら、こんな事実があります。" },
        {
          list: [
            "ペルー：814軒の農家が集う生産者組合で、1995年からコーヒーをつくるミゲル・ラミレスさんが育てた有機のゲイシャ。",
            "エチオピア：かつて山火事で森を失ったシャキッソ村。タスファイ・ベケレさんは、コーヒーで森と雇用を取り戻してきました。",
            "コロンビア：ウィラ県南部、ピタリート。ASOBOMBO生産者協会に集う小さな農園の豆を、ひとつのロットに。",
            `メキシコ：チアパス州、エル・トリウンフォ生物圏保護区のすぐそば。${SYSTEM.mexico_members.toLocaleString("en-US")}軒の小さな農園が持ち寄るグラポス農協の豆。`,
          ],
        },
      ],
    },
    {
      h2: "届く日と送料",
      blocks: [
        {
          list: [roastDaysLine, cutoffLine, `${nextDayLine.ja}。`, `${freeShippingLine.ja}。`],
        },
        {
          table: {
            head: ["ご注文", "発送"],
            rows: [
              [`${roastDays[0].ja}曜日の${ORDER_CUTOFF.ja}まで`, `${roastDays[0].ja}曜日`],
              [`${roastDays[0].ja}曜日の${ORDER_CUTOFF.ja}すぎ〜${roastDays[1].ja}曜日の${ORDER_CUTOFF.ja}まで`, `${roastDays[1].ja}曜日`],
              [`${roastDays[1].ja}曜日の${ORDER_CUTOFF.ja}すぎ〜${roastDays[0].ja}曜日の${ORDER_CUTOFF.ja}まで`, `次の${roastDays[0].ja}曜日`],
            ],
          },
        },
        { p: `${agingLine}100g・200gとも、${shipMethodLine.ja}。` },
        { p: `${shippingRates.ja}最終的な送料はレジでご確認いただけます。` },
        { note: "いまのところ、ギフト包装とのしは承っていません。" },
      ],
    },
  ],
  faq: [
    {
      q: "コーヒー豆のプレゼントは、何グラムがいいですか？",
      a: `1杯${g}gの目安で、100gは約${cupsIn(100)}杯、200gは約${cupsIn(200)}杯です。いくつか試してほしいなら100gを2袋、毎日飲む人には200gを。`,
    },
    {
      q: "コーヒー豆100gで、何杯淹れられますか？",
      a: `全日本コーヒー協会のペーパードリップの目安（1杯${AJCA_DRIP.yieldMl}mLに粉${g}g）で、約${cupsIn(100)}杯です。`,
    },
    {
      q: "ギフト包装やのしはありますか？",
      a: "いまのところ、ありません。",
    },
    {
      q: "粉で贈れますか？",
      a: "SNöBIは豆のままでのお届けです。贈る相手がミルを持っているか、先に確かめてください。",
    },
    {
      q: "注文から、いつ届きますか？",
      a: `${roastDaysLine}${restate(cutoffLine, "です")}${nextDayLine.ja}です。`,
    },
  ],
  products: slugs,
  cover: "048",
  coverAlt: "オーガニックのコーヒー豆のギフト。SNöBIのメキシコ チアパス デカフェの袋を、両手で差し出す",
  sources: [
    { label: "農林水産省「転換期間中有機農産物とは」（多年生作物は最初の収穫前3年以上の有機的管理）", url: "https://www.maff.go.jp/j/jas/jas_kikaku/attach/pdf/yuuki-265.pdf" },
    { label: `全日本コーヒー協会「ペーパードリップ式」（1杯${AJCA_DRIP.yieldMl}mLに中細挽き${g}g、湯${AJCA_DRIP.waterMl}mL）`, url: AJCA_DRIP.url },
    { label: "全日本コーヒー協会「焙煎・配合・粉砕」（淹れる直前に必要な分量だけを挽く）", url: "https://coffee.ajca.or.jp/column/4472/" },
    { label: "全日本コーヒー協会「情報ラベル（一括表示）の見方」（保存）", url: "https://coffee.ajca.or.jp/column/4448/" },
    { label: "レギュラーコーヒー及びインスタントコーヒーの表示に関する公正競争規約・同施行規則（カフェインを90%以上除去したコーヒーの表示）", url: "https://www.jfftc.org/DATA/Kiyaku_pdf/b05_H_coffee.pdf" },
    { label: "農林水産省「有機食品の検査認証制度」（有機JASマークと「有機」「オーガニック」表示の規制）", url: "https://www.maff.go.jp/j/jas/jas_kikaku/yuuki.html" },
    { label: "SNöBI 商品情報（産地・生産者・味・こんな人に・味わえる期間・デカフェの製法・価格）：content/products.ts" },
    { label: "SNöBI 発送と送料：content/ordering.ts" },
    { label: `SNöBI 発送方法（ネコポス）と${yen(FREE_SHIPPING_YEN)}未満の送料：content/v2.ts` },
  ],
};

export default post;

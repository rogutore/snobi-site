import type { Post } from "../types";
import { products, yen } from "../../products";
import { orderingSchedule, freeShippingLine, nextDayLine } from "../../ordering";
import { price } from "../facts";
import { AJCA_DRIP, gramsPerLitre } from "../brew";

/* Every SNöBI fact here (roast, process, notes, "こんな人に", prices) is read from content/products.ts and the shipping
   lines from content/ordering.ts, never retyped (SINGLE_SOURCE rule 2). Brewing numbers are general guidance from the
   cited sources, labelled 目安 — not a lab-tested SNöBI recipe, and there is no per-bean recipe. The 全日本コーヒー協会
   dose (粉・湯・できあがり, per litre) is read from ../brew; SCA's 55 g and the pour steps stay as their sources state. */
/* "4種すべて浅煎り" is only printed while every product in products.ts carries the same roast. */
const roasts = new Set(products.map((p) => p.roast?.ja));
const roast = products[0]?.roast?.ja;
if (!roast || roasts.size !== 1) throw new Error("journal/light-roast-hand-drip: products.ts roasts differ or are missing; rewrite the roast lines");
const decaf = products.find((p) => p.decaf);
if (!decaf) throw new Error("journal/light-roast-hand-drip: no decaf in content/products.ts; rewrite the decaf FAQ");

const post: Post = {
  slug: "light-roast-hand-drip",
  category: "抽出",
  title: "浅煎りのハンドドリップ｜比率・挽き目・湯温・時間の目安",
  metaTitle: "浅煎りのハンドドリップの淹れ方｜比率・挽き目・湯温・時間",
  description: `浅煎りのハンドドリップは、中細挽き、湯温90〜96℃、お湯が落ちきるまで3分以内が目安。SCAの標準比率は水1,000gに粉55g。SNöBIの${products.length}種はすべてオーガニックの${roast}です。`,
  keyword: "浅煎り ハンドドリップ",
  related: ["オーガニック 浅煎り", "浅煎り コーヒー豆 淹れ方", "ハンドドリップ 浅煎り 豆"],
  published: "2026-10-11",
  updated: "2026-10-11",
  lead: "浅煎りのハンドドリップは、中細挽きの粉に90〜96℃のお湯を使い、粉と湯の比率は水1,000gに対して粉55g前後（約1:18）、お湯が落ちきるまで3分以内を目安に淹れます。",
  sections: [
    {
      h2: "浅煎りのハンドドリップの目安：比率、挽き目、湯温、時間",
      blocks: [
        { p: "浅煎りは、焙煎の浅い豆です。全日本コーヒー協会は、一般に浅煎りほど酸味が強く、深煎りになるほど苦味を感じるようになると説明しています。" },
        { p: "下の数字は、SCA（スペシャルティコーヒー協会）や全日本コーヒー協会などが公開している一般的な目安です。SNöBIが豆ごとに検証したレシピではありません。" },
        {
          table: {
            head: ["項目", "目安", "出典"],
            rows: [
              ["粉と湯の比率", "水1,000gに粉55g前後（約1:18）", "SCA"],
              ["1杯分の例", `粉${AJCA_DRIP.grams}g、湯${AJCA_DRIP.waterMl}mL（できあがり約${AJCA_DRIP.yieldMl}mL）`, "全日本コーヒー協会"],
              ["挽き目", "中細挽き（グラニュー糖くらいの粒）", "全日本コーヒー協会"],
              ["湯温", "90〜96℃（全日本コーヒー協会は95℃前後）", "SCA、全日本コーヒー協会"],
              ["時間", "お湯が落ちきるまで3分以内", "HARIO"],
            ],
          },
        },
        { note: `比率は出典によって幅があります。SCAの55gは、家庭用コーヒーメーカーの規格で使う標準の比率です。全日本コーヒー協会の1杯分（粉${AJCA_DRIP.grams}g、湯${AJCA_DRIP.waterMl}mL）は、1Lあたりに直すと粉${gramsPerLitre}gで、それより濃いめです。どちらかに決めて淹れ、味を見て動かしてください。` },
      ],
    },
    {
      h2: "浅煎りのハンドドリップの手順",
      blocks: [
        { p: `全日本コーヒー協会のペーパードリップの手順を、1杯分（約${AJCA_DRIP.yieldMl}mL）で示します。水は、浄水器を通した軟水が向いているとされています（全日本コーヒー協会）。` },
        {
          steps: [
            "豆を中細挽きにする。挽くのは淹れる直前に、必要な分だけ。",
            "湯を沸かし、95℃前後になるまで少し置く。",
            "ペーパーフィルターの継ぎ目を折り、ドリッパーにセットする。",
            `粉${AJCA_DRIP.grams}gを入れて平らにならし、中心に20mLのお湯を静かにのせ、20秒ほど蒸らす。`,
            "80mLを、小さな円を描くようにやさしく注ぐ。",
            "ドリッパーの湯が1/3ほど減ったら、40mLを同じように注ぐ。",
            "最後に20mLを、同じように注ぐ。",
          ],
        },
        { p: "時間の目安は、ドリッパーメーカーのHARIOが基本レシピで示す「お湯が落ちきるまで3分以内」です。同じレシピでは、蒸らしを粉の2倍量のお湯で30秒としています。蒸らしの量と時間も、出典によって少し違います。" },
      ],
    },
    {
      h2: "薄い、酸っぱい、苦いと感じたら",
      blocks: [
        { p: "全日本コーヒー協会は、抽出時間が短いと酸っぱく薄く、長いと苦くえぐくなると説明しています。浅煎りの味を整えるときは、この原則から動かします。" },
        {
          list: [
            "酸っぱくて薄い：挽き目を少し細かくする。または、注ぐ速さを落として時間をのばす。",
            "苦くてえぐい：挽き目を少し粗くする。または、時間を短くする。",
            "微粉が多いと、過剰抽出の原因になる（全日本コーヒー協会）。挽きムラを減らす。",
          ],
        },
        { p: "湯温は、抽出の進み方を変える手段のひとつです。SCAの機関誌『25』で紹介された研究では、中煎りの豆を87〜93℃で淹れ、濃さと抽出率をそろえると、湯温だけの違いによる味の差はほとんど見られませんでした。変えるのは一度にひとつ。挽き目か時間から動かすと、違いを追いやすくなります。" },
      ],
    },
    {
      h2: `SNöBIのオーガニック${roast}${products.length}種`,
      blocks: [
        { p: `SNöBI（スノビ）の${products.length}種は、すべて有機JASの${roast}です。豆ごとの専用レシピはありません。上の目安で淹れ、それぞれのノートを手がかりに味を見てください。` },
        { list: products.map((c) => `${c.title.ja}：${c.notes.ja.join("、")}。${c.bestFor.ja}`) },
        {
          table: {
            head: ["コーヒー", "100g（税込）", "200g（税込）"],
            rows: products.map((c) => [c.title.ja, yen(price(c, "100g")), yen(price(c, "200g"))]),
          },
        },
        { p: "豆のままでお届けします。" },
        { list: [...orderingSchedule.ja, `${freeShippingLine.ja}。`, `${nextDayLine.ja}。`] },
      ],
    },
  ],
  faq: [
    {
      q: "浅煎りは何度のお湯で淹れますか？",
      a: "目安は90〜96℃です（SCA）。全日本コーヒー協会は、95℃前後を適温としています。",
    },
    {
      q: "1杯に何gの豆を使いますか？",
      a: `全日本コーヒー協会のペーパードリップでは、約${AJCA_DRIP.yieldMl}mLに対して粉${AJCA_DRIP.grams}g、湯${AJCA_DRIP.waterMl}mLです。SCAの標準比率は、水1,000gに粉55gです。`,
    },
    {
      q: "浅煎りが酸っぱすぎるときは？",
      a: "挽き目を少し細かくするか、時間をのばします。抽出時間が短いと酸っぱく薄くなると、全日本コーヒー協会は説明しています。",
    },
    {
      q: "SNöBIの豆は粉で買えますか？",
      a: "豆のままでのお届けです。挽くのは淹れる直前に、必要な分だけがよいとされています（全日本コーヒー協会）。",
    },
    {
      q: "デカフェも同じ目安で淹れられますか？",
      a: `${decaf.title.ja}も${roast}です。この記事の目安から始めて、味を見て調整してください。`,
    },
  ],
  products: products.map((c) => c.slug),
  cover: "123",
  coverAlt: "日の当たる木のテーブルで、ケトルからドリッパーにお湯を注ぐ。東京で撮影。",
  sources: [
    { label: "SCA Standard 310-2021 Home Coffee Brewers（標準の比率 水1.000kgに粉55g、抽出中の温度90〜96℃。sca.coffee の原本は現在リンク切れのため Web Archive）", url: "https://web.archive.org/web/20250108161720/https://static1.squarespace.com/static/584f6bbef5e23149e5522201/t/62fbd2d2aed180702280c014/1660670674796/SCA_Standard_310-2021.pdf" },
    { label: "SCA『25』Issue 15「How Hot is Hot Enough?」（87〜93℃で濃さと抽出率をそろえると、湯温だけの味の差はほとんどない）", url: "https://sca.coffee/sca-news/25/issue-15/how-hot-is-hot-enough-brew-temperature-sensory-profile-and-consumer-acceptance-of-brewed-coffee-5dj5b" },
    { label: "全日本コーヒー協会「おいしいコーヒーを淹れるための基本原則」（95℃前後、軟水、抽出時間と味）", url: "https://coffee.ajca.or.jp/column/4452/" },
    { label: `全日本コーヒー協会「ペーパードリップ式」（粉${AJCA_DRIP.grams}g・湯${AJCA_DRIP.waterMl}mL、蒸らし20mL・20秒、注湯80/40/20mL）`, url: AJCA_DRIP.url },
    { label: "全日本コーヒー協会「焙煎・配合・粉砕」（浅煎りと酸味、中細挽きの粒の大きさ、挽くのは淹れる直前、微粉と過剰抽出）", url: "https://coffee.ajca.or.jp/column/4472/" },
    { label: "HARIO「V60の世界」基本レシピ（蒸らしは粉の2倍量で30秒、お湯が落ちきるまで3分以内）", url: "https://www.hario.com/v60/v60series.html" },
    { label: "content/products.ts（4種の焙煎度、精製、ノート、こんな人に、価格）" },
    { label: "content/v2.ts（FAQ：豆のままでのお届け）" },
    { label: "content/ordering.ts（焙煎・発送、送料）" },
  ],
};

export default post;

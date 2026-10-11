import type { Post } from "../types";
import { yen } from "../../products";
import { coffee, priceSpan, processShort } from "../facts";

/* Keyword: スペシャルティコーヒー 80点とは. Scores are not published (owner decision 2026-09-11, vault
   product-facts-chapter-one.md); the only score line is the approved home copy in components/v3/hand-chapter.tsx.
   External facts opened 2026-10-09 (see `sources`).
   The four rows and the price spans are read from content/products.ts (SINGLE_SOURCE rule 2); a missing product or
   field stops the build (../facts). */
const slugs = ["peru", "ethiopia-guji", "colombia-huila", "mexico-chiapas-decaf"];
const beans = slugs.map((s) => coffee(s));
const p100 = priceSpan("100g");
const p200 = priceSpan("200g");

const post: Post = {
  slug: "specialty-80-points",
  category: "オーガニック",
  title: "スペシャルティコーヒーの80点とは。点数が測るもの",
  metaTitle: "スペシャルティコーヒー 80点とは｜SCAの基準と点数の中身",
  description:
    "スペシャルティコーヒーの80点とは、SCAのカッピングで、10項目の合計から欠点を引いた最終スコアが80点以上という線。採点の中身とSCAJの定義を一次資料から。2024年、SCAは新しい評価法CVAを採用。",
  keyword: "スペシャルティコーヒー 80点とは",
  related: ["スペシャルティコーヒー とは", "SCA 基準"],
  published: "2026-10-09",
  updated: "2026-10-09",
  lead:
    "スペシャルティコーヒーの80点とは、SCA（スペシャルティコーヒー協会）のカッピング手順で、10項目の合計から欠点を引いた100点満点の最終スコアが80点以上なら「スペシャルティ」とする線のことです。",
  sections: [
    {
      h2: "スペシャルティコーヒーの80点とは",
      blocks: [
        { p: "80点の線は、SCAの2004年のカッピング手順（プロトコル）と評価用紙から来ています。評価者は10の項目を採点し、その合計から欠点を引いて、最終スコアを出します。" },
        { p: "SCAは、最終スコアを次のように区分しています。" },
        {
          table: {
            head: ["最終スコア", "SCAの区分"],
            rows: [
              ["90〜100点", "Outstanding（スペシャルティ）"],
              ["85〜89.99点", "Excellent（スペシャルティ）"],
              ["80〜84.99点", "Very Good（スペシャルティ）"],
              ["80点未満", "Below Specialty Quality（スペシャルティではない）"],
            ],
          },
        },
        { p: "80点は、スペシャルティかどうかの境目です。90点以上だけをスペシャルティと呼ぶのではありません。" },
      ],
    },
    {
      h2: "10の項目で、何を測っているか",
      blocks: [
        { p: "SCAの評価用紙で採点する項目は、次の10です。" },
        {
          list: [
            "フレグランス／アロマ（乾いた粉の香りと、湯を注いだあとの香り）",
            "フレーバー（風味）",
            "アフターテイスト（後味）",
            "アシディティ（酸味）",
            "ボディ（口当たり）",
            "バランス",
            "ユニフォーミティ（カップごとの均一さ）",
            "クリーンカップ（きれいさ）",
            "スウィートネス（甘さ）",
            "オーバーオール（総合）",
          ],
        },
        { p: "各項目は、6点（Good）から9.75点（Outstanding）まで、0.25点刻みで採点します。尺度は理論上0〜10点で、下のほうはスペシャルティに届かない範囲です。" },
        { p: "欠点は別に数えます。はっきりわかるが強すぎない欠点（テイント）は強さ2、強すぎる、または飲めなくなるほどの欠点（フォールト）は強さ4。見つかったカップの数をかけて、合計から引きます。" },
        { p: "SCAは、この手順の目的を「評価者が感じた品質を判定すること」としています。評価者は、それまでの経験にもとづいて数値をつけます。オーバーオールは、評価者個人の評価です。" },
      ],
    },
    {
      h2: "点数は、決まった条件で測る",
      blocks: [
        { p: "スコアは、どこでも同じ条件で比べられるように、淹れ方まで決められています。" },
        {
          list: [
            "焙煎：カッピングの24時間以内に焙煎し、8時間以上休ませる。焙煎は8〜12分。焙煎度は測色計で決まった値に合わせる。",
            "量：水150mlに対して、コーヒー8.25g。",
            "挽く：湯を注ぐ15分前以内に挽く。",
            "湯：約93℃。注いだら3〜5分、そのまま置く。",
            "カップ：ひとつのサンプルにつき5カップ以上。均一さを見るため。",
          ],
        },
        { p: "生豆にも基準があります。SCAの生豆の格付けでは、350gのサンプルに一次欠点（カテゴリー1）がゼロ、二次欠点（カテゴリー2）が5つ以下であることが、スペシャルティグレードの条件です。" },
        { p: "つまりスコアは、決まった条件で淹れたサンプルの評価です。家で淹れる一杯の点数ではありません。" },
      ],
    },
    {
      h2: "日本の定義と、新しい評価法",
      blocks: [
        { p: "日本スペシャルティコーヒー協会（SCAJ）は、点数ではなく言葉で定義しています。飲む人の手にあるカップの中の風味がすばらしく、飲む人が満足するコーヒー。そして、種からカップまでのすべての段階で、品質管理が徹底していること（From seed to cup）。" },
        { p: "SCAJは、スペシャルティと一般のコーヒーを、カップの中の風味（カップ・クオリティ）で区分するとし、7つの評価基準を挙げています。" },
        { list: ["カップのきれいさ", "甘さ", "酸味の特徴", "口に含んだ質感", "風味特性・風味のプロフィール", "後味の印象度", "バランス"] },
        { p: "2024年11月、SCAは新しい評価法「コーヒー・バリュー・アセスメント（CVA）」の3つの規格を正式な基準にしました。2004年のカッピング手順と評価用紙は、これに置き換えられています。" },
        { p: "CVAは、ひとつのスコアに頼らず、4つの評価を組み合わせます。生豆の状態を見る評価、味の特徴を記録する評価、評価者や市場の好みを見る評価、そしてカップの外の情報を見る評価。最後のものには、認証、産地のトレーサビリティ、精製の情報が含まれます。" },
      ],
    },
    {
      h2: "SNöBIは、点数を載せていません",
      blocks: [
        { p: "SNöBI（スノビ）は、カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。点数は、生豆を扱う仕入れ側による評価です。SNöBIでは、その数字を載せていません。" },
        { p: "代わりに載せているのは、たどれる事実です。産地、生産者、標高、品種、精製、そして味の印象。4つの豆は、すべて有機JASです。" },
        {
          table: {
            head: ["豆", "生産者", "標高", "品種", "精製"],
            rows: beans.map((c) => [c.title.ja, c.producer.ja, c.elevation, c.variety.ja, processShort(c)]),
          },
        },
        { p: `全種類、浅煎りで焙煎しています。100gは${yen(p100.min)}〜${yen(p100.max)}、200gは${yen(p200.min)}〜${yen(p200.max)}（税込）。` },
      ],
    },
  ],
  faq: [
    {
      q: "80点と90点では、何が違いますか？",
      a: "SCAの区分では、80〜84.99点がVery Good、85〜89.99点がExcellent、90〜100点がOutstandingです。いずれもスペシャルティです。",
    },
    {
      q: "80点未満のコーヒーは、何と呼ばれますか？",
      a: "SCAの区分では「Below Specialty Quality」。スペシャルティではない品質、という意味です。",
    },
    {
      q: "スコアは、だれがつけますか？",
      a: "カッピングをする評価者（カッパー）が、決まった手順で採点します。SCAは、評価者がそれまでの経験にもとづいて数値をつけるとしています。",
    },
    {
      q: "SNöBIの豆は何点ですか？",
      a: "数字は載せていません。カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。",
    },
    {
      q: "有機JASとスペシャルティは、関係がありますか？",
      a: "別々の基準です。有機JASは育て方とつくり方、スペシャルティは生豆とカップの品質を見ます。SCAの新しい評価法CVAでは、認証はカップの外の情報として扱われます。",
    },
  ],
  products: slugs,
  cover: "163",
  coverAlt: "白いケースに落ちていく焙煎前の生豆",
  sources: [
    { label: "Specialty Coffee Association「Protocols & Best Practices」Revised 2018（カッピング手順、10項目、欠点、最終スコアの区分、生豆の格付け）", url: "https://static1.squarespace.com/static/587af1d4db29d69a1a226b95/t/60748749cf593c00972df582/1618249556105/SCA+Protocols+&+Best+Practices.pdf" },
    { label: "Specialty Coffee Association「The SCA Officially Adopts CVA Descriptive and Affective Assessments as New Cupping Standards」2024年11月4日", url: "https://sca.coffee/sca-news/sca-new-cva-cupping-standards-7ga28" },
    { label: "Specialty Coffee Association「Coffee Value Assessment」", url: "https://sca.coffee/value-assessment" },
    { label: "日本スペシャルティコーヒー協会（SCAJ）「スペシャルティコーヒーの定義」", url: "https://scaj.org/about/specialty-coffee" },
    { label: "SNöBI スペシャルティの表記：components/v3/hand-chapter.tsx" },
    { label: "SNöBI 商品情報（生産者・標高・品種・精製・価格）：content/products.ts" },
  ],
};

export default post;

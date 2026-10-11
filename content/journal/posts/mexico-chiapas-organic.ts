import type { Post } from "../types";
import { yen } from "../../products";
import { freeShippingLine, nextDayLine } from "../../ordering";
import { coffee, price, roastOf, caffeineCut, roastDaysLine, cutoffLine } from "../facts";

/* Keyword: メキシコ オーガニック コーヒー. Producer facts only from products.ts and the ✅ items in
   product-facts-chapter-one.md / docs/origins-research.md; members = 3,253 (products.ts).
   Elevation, producer, variety, process, roast, notes, caffeine cut and prices are read from content/products.ts and
   the delivery lines from content/ordering.ts (SINGLE_SOURCE rule 2); a missing field stops the build (../facts). */
const mex = coffee("mexico-chiapas-decaf");
const notes = mex.notes.ja.join("、");

const post: Post = {
  slug: "mexico-chiapas-organic",
  category: "産地",
  title: "メキシコのオーガニックコーヒー。チアパスとグラポス農協",
  metaTitle: "メキシコ オーガニック コーヒー｜チアパス、グラポス農協のデカフェ",
  description:
    `メキシコは有機コーヒーの主な生産国のひとつで、最大の産地はチアパス州です。SNöBIのメキシコは、チアパス州のグラポス農協に集う3,253軒の小規模生産者の豆。有機JASのデカフェで、標高${mex.elevation}。`,
  keyword: "メキシコ オーガニック コーヒー",
  related: ["メキシコ チアパス デカフェ", "メキシコ オーガニック デカフェ"],
  published: "2026-10-10",
  updated: "2026-10-10",
  lead: `メキシコは有機コーヒーの主な生産国のひとつで、SNöBI（スノビ）が扱うメキシコの有機コーヒーは、最大の産地チアパス州の${mex.producer.ja}が育てた豆です。`,
  sections: [
    {
      h2: "メキシコ オーガニック コーヒーの産地、チアパス州",
      blocks: [
        {
          p: "メキシコ農業農村開発省（SADER）の2018年の記事によると、メキシコは世界で11番目のコーヒー生産国で、有機コーヒーの主な生産国のひとつです。",
        },
        {
          p: "同じ記事によると、メキシコのコーヒーは15の州、480の市町村で、50万人を超える生産者がつくっています。有機のコーヒーには栽培面積の3.24%があてられ、2万8,000トンが、主にEUへ輸出されています。",
        },
        {
          p: "州別では、チアパス州が最も多く、国内の生産量の41.0%を占めています。SNöBIのメキシコは、このチアパス州の豆です。",
        },
      ],
    },
    {
      h2: "エル・トリウンフォ生物圏保護区のそば",
      blocks: [
        {
          p: "エル・トリウンフォは、チアパス州南部、シエラ・マドレ・デ・チアパスの険しい山地にある生物圏保護区です。ユネスコの生物圏保護区のひとつで、ユネスコのページには1993年、面積282,507haと記されています。",
        },
        {
          p: "保護区は、チアパス州で報告されている19の植生のうち10を守っています。その中には、メキシコで最も危機にある生態系のふたつ、雲霧林と熱帯雨林が含まれます。",
        },
        {
          p: "ユネスコは、保護区の緩衝地帯のコーヒーがこの地域の経済の基盤だと紹介しています。同じページによると、1990年から、コーヒーの生産に環境に配慮した方法を取り入れる取り組みが続き、保護区は、土壌を守る方法での有機コーヒーの生産を進めてきました。バードウォッチングや、コーヒーにまつわるツアーも行われています。",
        },
        { p: "グラポス農協の生産者は、この保護区のすぐそばでコーヒーを育てています。" },
      ],
    },
    {
      h2: "グラポス農協（GRAPOS）",
      blocks: [
        {
          p: "正式名は、Grupo de Agricultores Positivos S.P.R. de R.L.。2007年に、90軒の生産者で始まった農協です。",
        },
        {
          p: "いまは、平均約3haの小さな農園を3,253軒が持ち寄っています。生産者の4人に1人が女性です。",
        },
        {
          list: [
            "10人の農学技術者が、農協のスタッフとして働いている。",
            "畑は約9,835ha。そのうち約72%が有機認証を受けている。",
            "傷んだ木を植え替えるための苗を、生産者に無償で配っている。",
            "地域ごとに、集荷の拠点を置いている。",
          ],
        },
      ],
    },
    {
      h2: "畑と、収穫のあいだの暮らし",
      blocks: [
        {
          p: `畑は標高${mex.elevation}。品種は、ブルボン、ムンドノーボ、カトゥーラです。`,
        },
        {
          p: "収穫は11月から3月。それ以外の季節は、同じ家族がバナナやカカオ、ランブータンを育てています。カボチャや豆、トウモロコシをつくる家族もいます。手仕事で布製品をつくる家族もいます。",
        },
      ],
    },
    {
      h2: "メキシコ チアパス デカフェとして",
      blocks: [
        {
          p: "SNöBIは、Tokyo Coffeeがつくるオーガニック・スペシャルティのコーヒーです。第一章のメキシコは、デカフェです。",
        },
        {
          p: `グラポス農協の豆をウォッシュドで精製し、マウンテンウォーター製法でカフェインを抜いています。商品資料では、カフェインを抜く水はメキシコ最高峰オリサバ山（5,636m）の氷河の水で、薬品は使いません。カフェインは${caffeineCut(mex)}カットです。`,
        },
        {
          p: "マウンテンウォーター製法は、メキシコで行われている水を使う製法です。この製法を行う加工会社は、生豆に蒸気をあて、コーヒー豆から得た成分を飽和させた水溶液でカフェインを抽出し、3段階で乾燥させる、と説明しています。",
        },
        {
          p: "有機JASの豆で、2024/25年のクロップです。有機JASマークは、登録認証機関の検査を受けて認証された事業者だけが貼れるマークです（農林水産省）。",
        },
        {
          p: `SNöBIは、豆の味を楽しんでいただけるように、全種類を浅煎りで焙煎しています。${mex.title.ja}の味は、${notes}です。`,
        },
        {
          note: "袋のラベルにある「Honey Chiapas」は、ロットの名前です。精製方法のハニープロセスではありません。精製はウォッシュドです。",
        },
        {
          table: {
            head: ["項目", mex.title.ja],
            rows: [
              ["産地", `メキシコ、${mex.region.ja}`],
              ["生産者", mex.producer.ja],
              ["標高", mex.elevation],
              ["品種", mex.variety.ja],
              ["精製", mex.process.ja],
              ["焙煎", roastOf(mex)],
              ["価格", `100g ${yen(price(mex, "100g"))}、200g ${yen(price(mex, "200g"))}（税込）`],
            ],
          },
        },
        {
          p: `豆のままお届けします。${roastDaysLine}${cutoffLine}${nextDayLine.ja}。${freeShippingLine.ja}。`,
        },
      ],
    },
  ],
  faq: [
    {
      q: "メキシコのオーガニックコーヒーは、どこでつくられていますか？",
      a: "メキシコ農業農村開発省（SADER）の2018年の記事では、メキシコのコーヒー生産量の41.0%がチアパス州です。SNöBIのメキシコも、チアパス州のグラポス農協の豆です。",
    },
    {
      q: "グラポス農協とは？",
      a: "チアパス州の小規模生産者の農協です。2007年に90軒で始まり、いまは平均約3haの農園を3,253軒が持ち寄っています。エル・トリウンフォ生物圏保護区のすぐそばにあります。",
    },
    {
      q: "メキシコ チアパス デカフェのカフェインは？",
      a: `薬品を使わないマウンテンウォーター製法で、カフェインを${caffeineCut(mex)}カットしています。`,
    },
    {
      q: "ラベルの「Honey」は、ハニープロセスのことですか？",
      a: "いいえ。「Honey Chiapas」はロットの名前です。精製はウォッシュドで、そのあとマウンテンウォーター製法でカフェインを抜いています。",
    },
  ],
  products: ["mexico-chiapas-decaf"],
  cover: "145",
  coverAlt: "葉の影が映る壁の前、木のテーブルに置いたSNöBI メキシコ チアパス デカフェの袋",
  sources: [
    {
      label: "メキシコ農業農村開発省（SADER）「México, onceavo productor mundial de café」（2018年3月2日）",
      url: "https://www.gob.mx/agricultura/articulos/mexico-onceavo-productor-mundial-de-cafe",
    },
    { label: "UNESCO Man and the Biosphere Programme「El Triunfo」", url: "https://www.unesco.org/en/mab/el-triunfo" },
    {
      label: "マウンテンウォーター製法を行う加工会社の工程説明「Procesos」（スペイン語）",
      url: "https://www.descamex.com.mx/procesos",
    },
    { label: "農林水産省「有機食品の検査認証制度」", url: "https://www.maff.go.jp/j/jas/jas_kikaku/yuuki.html" },
    {
      label: "Mercanta「GRAPOS Organic」（設立年、設立時の生産者数、苗の無償配布、集荷拠点）",
      url: "https://coffeehunter.com/coffee/grapos-organic/",
    },
    { label: "SNöBI 商品仕様（content/products.ts：メキシコ チアパス デカフェ）" },
    { label: "SNöBI 商品事実メモ（product-facts-chapter-one.md：正式名、技術者、有機認証面積、クロップ、ロット名）" },
    { label: "SNöBI 産地調査（docs/origins-research.md：Mexico — GRAPOS）" },
    { label: "SNöBI よくある質問（content/v2.ts）" },
    { label: "SNöBI 注文と発送（content/ordering.ts）" },
  ],
};

export default post;

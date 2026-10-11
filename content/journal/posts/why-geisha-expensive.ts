import type { Post } from "../types";
import { products, yen } from "../../products";
import { orderingSchedule, freeShippingLine, nextDayLine } from "../../ordering";
import { coffee, price } from "../facts";
import { AJCA_DRIP, ajcaDripNote, cupsIn, cupYen } from "../brew";

/* Product facts and prices are read from content/products.ts, never retyped (SINGLE_SOURCE rule 2).
   A missing product or size is a visible build error, not a silent fallback (../facts). The paper-drip dose, cup
   count and per-cup yen come from ../brew (general guidance, not a tested SNöBI recipe). */
const peru = coffee("peru");
const p100 = price(peru, "100g");
const p200 = price(peru, "200g");

/* "The most expensive of the range" is computed, not asserted: true only while Peru's 100g is the top 100g price. */
const peruIsTop = products.every((c) => c.slug === peru.slug || price(c, "100g") < p100);
const priceRows = [...products]
  .sort((a, b) => price(b, "100g") - price(a, "100g"))
  .map((c) => [c.title.ja, yen(price(c, "100g")), yen(price(c, "200g"))]);

const post: Post = {
  slug: "why-geisha-expensive",
  category: "産地",
  title: "ゲイシャのコーヒーは、なぜ高いのか",
  metaTitle: "ゲイシャ コーヒーはなぜ高い？ 品種の歴史と収量から",
  description: `ゲイシャは1930年代にエチオピアで採取された品種。収量が少なく、2004年のベスト・オブ・パナマで注目された。SNöBIのペルー チリノス ゲイシャは100g ${yen(p100)}（税込）。`,
  keyword: "ゲイシャ コーヒー なぜ高い",
  related: ["ゲイシャ コーヒー豆", "ゲイシャ とは"],
  published: "2026-10-10",
  updated: "2026-10-10",
  lead: "ゲイシャのコーヒーが高いのは、収量が少なく育てにくい品種であるうえに、2004年のベスト・オブ・パナマで注目されてから、求める人が多いからです。",
  sections: [
    {
      h2: "ゲイシャとは。エチオピアの森から",
      blocks: [
        { p: "ゲイシャは、アラビカ種のコーヒーの品種です。World Coffee Research（WCR）の品種カタログによると、1930年代にエチオピアのコーヒーの森で採取されました。" },
        { p: "その後、タンザニアのリャムング研究所を経て、1953年に中米のCATIE（熱帯農業研究高等教育センター）に入り、T2722という番号で記録されます。1960年代には、さび病に耐える性質が認められ、CATIEを通じてパナマ各地に配られました。" },
        { p: "ただ、枝が折れやすく、農家には好まれませんでした。広く植えられることはなかった、とWCRは書いています。" },
        { p: "採取された場所は、英語でGeshaと書かれることが多い山の近くでした。エチオピアの言葉から英語への決まった表記がないため、GeishaとGeshaの両方が使われています。" },
        { note: "「ゲイシャ」と呼ばれる木には、遺伝的に異なる系統が複数あるとWCRは指摘しています。同じ名前でも、すべてが同じ木ではありません。" },
      ],
    },
    {
      h2: "2004年、パナマの品評会で",
      blocks: [
        { p: "ゲイシャの名前を広めたのは、パナマのエスメラルダ農園（Hacienda La Esmeralda）です。農園の公式サイトによると、ピーターソン家がこの農園を買ったのは1967年。種は、コスタリカのCATIEから手に入れました。" },
        { p: "農園がさび病で大きな被害を受けたとき、ダニエル・ピーターソンさんは、ゲイシャの木の被害が軽いことに気づきます。そこで、ゲイシャを農園のほかの区画にも植えました。標高1,650mを超える、それまでゲイシャが植えられたことのない高さの区画にもです。" },
        { p: "そして2004年、そのゲイシャでベスト・オブ・パナマに優勝。同じ年、コーヒーのオークション価格の記録を塗り替えました。" },
        { note: "年について：WCRの品種カタログは、この品評会を2005年としています。ここでは農園自身の記述（2004年）に従いました。" },
      ],
    },
    {
      h2: "ゲイシャ コーヒーが高い理由",
      blocks: [
        { p: "値段は、取れる量と、求める人の数で決まります。ゲイシャは、その両方が値段を押し上げる品種です。WCRの品種カタログは、収量の比較の基準にカトゥーラを挙げています。並べると、違いがよく見えます。" },
        {
          table: {
            head: ["WCRの品種カタログ", "ゲイシャ（パナマ）", "カトゥーラ"],
            rows: [
              ["樹高", "高い", "低い（コンパクト）"],
              ["収量ポテンシャル", "低", "中"],
              ["高地での品質ポテンシャル", "傑出（Exceptional）", "良い（Good）"],
              ["最初の収穫", "4年目", "3年目"],
            ],
          },
        },
        {
          list: [
            "取れる量が少ない。WCRは、ゲイシャの収量ポテンシャルを「低」、基準のカトゥーラを「中」としています。",
            "育てにくい。木が高く、枝が折れやすい。コーヒーベリー病やネマトーダ（線虫）にも弱いとされています。",
            "収穫まで待つ。最初の収穫は4年目。カトゥーラより1年長くかかります。",
            "高地を選ぶ。高地でよく管理したときに、高い品質と結びつく品種です。",
            "求める人が多い。2004年の品評会とオークションで、ゲイシャの名前は広く知られるようになりました。",
          ],
        },
        { p: "取れる量が少なく、育てる手間とリスクが大きい豆を、多くの人が欲しがる。ゲイシャが高いのは、そのためです。" },
      ],
    },
    {
      h2: `SNöBIのゲイシャは、100g ${yen(p100)}`,
      blocks: [
        { p: `SNöBI（スノビ）は、Tokyo Coffeeがつくるオーガニック・スペシャルティのラインです。ゲイシャは、${peru.title.ja}の1種類。価格は100g ${yen(p100)}、200g ${yen(p200)}（どちらも税込）。${peruIsTop ? "SNöBIの4種の中で、いちばん高い豆です。" : ""}` },
        { table: { head: ["SNöBIの豆（税込）", "100g", "200g"], rows: priceRows } },
        { p: `${peru.region.ja}で、ミゲル・エステバン・ラミレス・アグルトさんが育てました。標高${peru.elevation}、${peru.process.ja}。有機JASの豆です。` },
        { p: "ゲイシャは、ミゲルさんにとって新しく植えた挑戦の品種です。このロットは2025年11月に日本に入港しました。" },
      ],
    },
    {
      h2: "1杯あたりで考える",
      blocks: [
        { note: ajcaDripNote },
        { p: `この目安で数えると、100gは約${cupsIn(100)}杯分。100gなら1杯あたり約${cupYen(p100, 100)}円、200gなら約${cupYen(p200, 200)}円です。` },
        { p: `味は、${peru.notes.ja.join("、")}。${peru.bestFor.ja}` },
        { list: [...orderingSchedule.ja, `${nextDayLine.ja}。`, `${freeShippingLine.ja}。`] },
      ],
    },
  ],
  faq: [
    { q: "ゲイシャとゲシャは違う品種？", a: "同じ品種を指す呼び方です。エチオピアの言葉から英語への決まった表記がないため、GeishaとGeshaの両方が使われています。" },
    { q: "ゲイシャという名前の由来は？", a: "エチオピアで採取された場所が、ゲシャ（Gesha）と呼ばれる山の近くだったことから来ています。英語の表記は定まっておらず、Geishaとも書かれます。" },
    { q: "ゲイシャなら、どれも同じ味？", a: "「ゲイシャ」と呼ばれる木には、遺伝的に異なる系統が複数あるとされています。WCRは、高地でよく管理されたときに高い品質と結びつく品種としています。" },
    { q: "SNöBIのゲイシャは有機？", a: "有機JASです。生豆が有機JASの認証を受けたもので、焙煎するTokyo Coffeeも有機加工食品の生産行程管理者として認定を受けています。" },
  ],
  products: ["peru"],
  cover: "152",
  coverAlt: "明るい台の上に散らばった、SNöBI ペルー チリノス ゲイシャの焙煎豆",
  sources: [
    { label: "World Coffee Research, Arabica Coffee Varieties「Geisha (Panama)」（1930年代エチオピアで採取、リャムング、CATIE 1953年 T2722、1960年代パナマへ、枝が折れやすい、2005年の記述、系統の混在、表記、樹高・収量・品質・病害・初収穫）", url: "https://varieties.worldcoffeeresearch.org/varieties/geisha-panama" },
    { label: "World Coffee Research, Arabica Coffee Varieties「Caturra」（樹高・収量・品質・初収穫）", url: "https://varieties.worldcoffeeresearch.org/varieties/caturra" },
    { label: "Hacienda La Esmeralda「Our Story」（1967年取得、CATIEから入手、さび病、標高1,650m超、2004年ベスト・オブ・パナマ優勝とオークション記録）", url: "https://haciendaesmeralda.com/our-story/" },
    { label: `全日本コーヒー協会「ペーパードリップ式」（1杯${AJCA_DRIP.yieldMl}mL分＝粉${AJCA_DRIP.grams}g・湯${AJCA_DRIP.waterMl}mL）`, url: AJCA_DRIP.url },
    { label: "商品の事実と価格：content/products.ts（4種）" },
    { label: "有機JAS：brain/Handoffs/premium-line/product-facts-chapter-one.md" },
    { label: "焙煎所の有機加工食品 生産行程管理者の認定：content/v2.ts（jas）" },
    { label: "発送と送料：content/ordering.ts" },
  ],
};

export default post;

import type { Post } from "../types";
import { yen } from "../../products";
import { orderingSchedule, freeShippingLine, nextDayLine } from "../../ordering";
import { coffee, price, roastOf } from "../facts";
import { AJCA_DRIP, ajcaDripNote, cupsIn, cupYen } from "../brew";

/* Product facts and prices are read from content/products.ts, never retyped (SINGLE_SOURCE rule 2).
   A missing product or size is a visible build error, not a silent fallback (../facts). The paper-drip dose, cup
   count and per-cup yen come from ../brew (general guidance, not a tested SNöBI recipe). */
const col = coffee("colombia-huila");
const c100 = price(col, "100g");
const c200 = price(col, "200g");

const post: Post = {
  slug: "colombia-huila-organic",
  category: "産地",
  title: "コロンビアの有機栽培コーヒー。ウィラ県ピタリートから",
  metaTitle: "コロンビア 有機栽培コーヒー｜ウィラの有機JASコーヒー豆",
  description: `コロンビア・ウィラ県ピタリート、エル・ボンボの小さな農園が育てた有機JASの豆。カトゥーラとコロンビア種、標高${col.elevation}、ウォッシュド。100g ${yen(c100)}（税込）。`,
  keyword: "コロンビア 有機栽培 コーヒー",
  related: ["コロンビア ウィラ", "コロンビア ウイラ", "オーガニック コロンビア コーヒー"],
  published: "2026-10-10",
  updated: "2026-10-10",
  lead: "SNöBIのコロンビア ウィラは、ウィラ県ピタリートのエル・ボンボに集う小さな農園が有機栽培で育てたカトゥーラ種とコロンビア種を、ひとつのロットにまとめた有機JASのコーヒー豆です。",
  sections: [
    {
      h2: "コロンビアの有機栽培コーヒーとは",
      blocks: [
        { p: "日本で「有機栽培」と言えるかどうかは、有機JASの規格で決まります。有機農産物のJAS規格は、化学的に合成された肥料と農薬の使用を避けることを基本にした栽培を求めています。コーヒーの木のような多年生の植物では、最初の収穫の3年以上前から、規格に沿って育てていることが条件です。" },
        { p: "有機JASマークのない農産物や加工食品に「有機」「オーガニック」と表示することは、法律で禁止されています。マークを付けられるのは、登録認証機関の検査を受けて認証された事業者だけです。" },
        { p: "コロンビアの豆も、この仕組みの中にあります。SNöBIのコロンビア ウィラは、生産者の組合が有機JASの認証を受けた豆です。認証機関はMayacert。焙煎するTokyo Coffeeも、有機加工食品の生産行程管理者として認定を受けています。" },
        { p: "SNöBI（スノビ）は、Tokyo Coffeeがつくる有機JASのスペシャルティコーヒーです。コロンビアは、その4種のひとつです。" },
      ],
    },
    {
      h2: "ウィラ県ピタリート、エル・ボンボ",
      blocks: [
        { p: "ウィラ県は、コロンビアのコーヒー生産量で15年続けて1位の県です。2025年11月のウィラ県の発表では、全国の収穫の19.65%を占めました。数字は、コロンビアコーヒー生産者連合会（FNC）によるものです。" },
        { p: "ウィラは昼夜の寒暖差が大きく、実が大きく熟しやすい土地です。収穫は10月から12月。" },
        { p: "豆の産地は、ウィラ県南部のピタリート。有機JASの証明書に記された生産者は、Cooperativa de Caficultores El Bombo – Núcleo 2（エル・ボンボ・コーヒー生産者協同組合）です。ピタリートのエル・ボンボ地区にあり、証明書の上では82人の生産者、303.2haの畑です。SNöBIの商品ページで「ASOBOMBO生産者協会」と書いているのも、このエル・ボンボの生産者たちです。" },
        { p: "ひとつの農園の豆ではありません。小さな農園たちの収穫を協会がまとめることで、有機のまま、安定した品質を保っています。" },
        { p: "組合を立ち上げたのは、3代目の生産者ジョン・エディソン・ディアスさん。加わる生産者のおよそ95%が、5ha未満の小さな農園です。カウカ県では、畑の日陰とその土地の生きものの多様さを強めるために、約10万本の木を配りました。サトウキビからパネラ（砂糖）をつくる製糖所づくりも手伝い、若い指導員のチームが農園をまわって植林や節水を支えています。" },
      ],
    },
    {
      h2: "カトゥーラとコロンビア種",
      blocks: [
        { p: `品種は、${col.variety.ja}。ふたつの品種の豆です。` },
        { p: "カトゥーラは、ブルボン種の自然な突然変異です。1915年から1918年のあいだに、ブラジル・ミナスジェライス州の農園で見つかりました。木は低く、コンパクトに育ちます。" },
        { p: "コロンビア種は、コロンビアのコーヒー研究所Cenicafé（セニカフェ）が1982年に生み出した品種です。カトゥーラとティモール・ハイブリッドを掛け合わせ、カトゥーラの収量の多さと、ティモール・ハイブリッドのさび病への強さをあわせ持たせました。" },
      ],
    },
    {
      h2: `標高${col.elevation}、ウォッシュド、天日乾燥`,
      blocks: [
        {
          table: {
            head: ["項目", col.title.ja],
            rows: [
              ["地域", col.region.ja],
              ["生産者", "エル・ボンボの小さな農園（ASOBOMBO生産者協会）"],
              ["標高", col.elevation],
              ["品種", col.variety.ja],
              ["精製", col.process.ja],
              ["焙煎度", roastOf(col)],
              ["収穫", "10月〜12月"],
              ["認証", "有機JAS"],
            ],
          },
        },
        { p: "ウォッシュドは、コーヒーの実から果肉を取り除き、豆についた粘液質（ミューシレージ）を発酵させてから、きれいな水で洗って乾燥させる方法です。このロットは、そのあと天日で乾かしています。" },
        { p: `味は、${col.notes.ja.join("、")}。シトラスの酸とキャラメルの甘さ。${col.bestFor.ja}` },
        { p: "豆のままでお届けします。焙煎後2ヶ月まで、味を楽しめます。" },
      ],
    },
    {
      h2: "価格と届け方",
      blocks: [
        { p: `${col.title.ja}は、100g ${yen(c100)}、200g ${yen(c200)}（どちらも税込）。` },
        { note: ajcaDripNote },
        { p: `この目安で数えると、100gは約${cupsIn(100)}杯分。1杯あたり約${cupYen(c100, 100)}円です。200gなら、1杯あたり約${cupYen(c200, 200)}円になります。` },
        { list: [...orderingSchedule.ja, `${nextDayLine.ja}。`, `${freeShippingLine.ja}。`] },
      ],
    },
  ],
  faq: [
    { q: "「ウィラ」と「ウイラ」は別の産地？", a: "同じ産地です。スペイン語のHuilaを、カタカナでどう書くかの違いです。" },
    { q: "ひとつの農園の豆？", a: "いいえ。エル・ボンボに集う小さな農園の豆を、ひとつのロットにまとめています。" },
    { q: "有機栽培のコーヒーかどうか、どこで分かる？", a: "有機JASマークで分かります。マークのない農産物や加工食品に「有機」と表示することは、法律で禁止されています。" },
    { q: "粉でも買える？", a: "豆のままでのお届けです。100gと200gから選べます。" },
  ],
  products: ["colombia-huila"],
  cover: "146",
  coverAlt: "朝の光と葉の影のなか、木のテーブルに置かれたSNöBI コロンビア ウィラ（有機JAS）の袋",
  sources: [
    { label: "商品の事実と価格：content/products.ts（コロンビア ウィラ）" },
    { label: "ロットの事実（複数農園のロット、有機JAS）：brain/Handoffs/premium-line/product-facts-chapter-one.md" },
    { label: "有機JAS証明書（Cooperativa de Caficultores El Bombo – Núcleo 2、ピタリート、82名・303.2ha、認証機関Mayacert）：docs/origins-research.md（✅項目、Drive SNOBI/Colombia/20250827コロンビアウィラ(有機証明書.pdf）" },
    { label: "Sucafina「El Bombo Organic FW」（創設者ジョン・エディソン・ディアス、約95%が5ha未満、カウカ県で約10万本の木、パネラの製糖所、若手の指導チーム）", url: "https://sucafina.com/na/offerings/el-bombo-organic-fw" },
    { label: "Gobernación del Huila「Celebramos el posicionamiento del Huila como primer productor de café del país」（2025年11月14日、15年連続1位、全国の19.65%、FNCの数字）", url: "https://www.huila.gov.co/publicaciones/16455/celebramos-el-posicionamiento-del-huila-como-primer-productor-de-cafe-del-pais/" },
    { label: "World Coffee Research, Arabica Coffee Varieties「Caturra」（ブルボンの突然変異、ミナスジェライス州 1915〜1918年、樹高）", url: "https://varieties.worldcoffeeresearch.org/varieties/caturra" },
    { label: "Federación Nacional de Cafeteros「Variedad Colombia」用語集（Cenicafé 1982年、カトゥーラ×ティモール・ハイブリッド、さび病抵抗性）", url: "https://cauca.federaciondecafeteros.org/glosario/variedad-colombia/" },
    { label: "農林水産省「有機食品の検査認証制度」（有機・オーガニック表示の禁止、登録認証機関）", url: "https://www.maff.go.jp/j/jas/jas_kikaku/yuuki.html" },
    { label: "農林水産省 日本農林規格「有機農産物」JAS 1605:2024（4 生産の原則、5.1.2 多年生の植物は最初の収穫前3年以上）", url: "https://www.maff.go.jp/j/jas/jas_kikaku/attach/pdf/yuuki-437.pdf" },
    { label: "全日本コーヒー協会「加工処理・選別」（水洗式＝ウォッシュドの定義）", url: "https://coffee.ajca.or.jp/column/4476/" },
    { label: `全日本コーヒー協会「ペーパードリップ式」（1杯${AJCA_DRIP.yieldMl}mL分＝粉${AJCA_DRIP.grams}g・湯${AJCA_DRIP.waterMl}mL）`, url: AJCA_DRIP.url },
    { label: "焙煎所の有機加工食品 生産行程管理者の認定：content/v2.ts（jas）" },
    { label: "発送と送料：content/ordering.ts" },
  ],
};

export default post;

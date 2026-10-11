import type { Post } from "../types";
import { yen } from "../../products";
import { orderingSchedule, freeShippingLine, nextDayLine, FREE_SHIPPING_YEN } from "../../ordering";
import { coffee, price, roastOf } from "../facts";
import { AJCA_DRIP, ajcaDripNote, cupsIn, cupYen } from "../brew";

/* Product facts and prices are read from content/products.ts, never retyped (SINGLE_SOURCE rule 2).
   A missing product or size is a visible build error, not a silent fallback (../facts). The paper-drip dose, cup
   count and per-cup yen come from ../brew (general guidance, not a tested SNöBI recipe). */
const peru = coffee("peru");
const p100 = price(peru, "100g");
const p200 = price(peru, "200g");
const freeAt200 = p200 >= FREE_SHIPPING_YEN;

const post: Post = {
  slug: "organic-geisha-peru",
  category: "産地",
  title: "オーガニックのゲイシャ。ペルー チリノスの一杯",
  metaTitle: "オーガニック ゲイシャ｜ペルー チリノスの有機JASコーヒー豆",
  description: `ペルー・カハマルカ県チリノスで、ミゲル・ラミレスさんが標高${peru.elevation}で育てた有機JASのゲイシャ。${peru.process.ja}、${roastOf(peru)}。100g ${yen(p100)}（税込）。`,
  keyword: "オーガニック ゲイシャ",
  related: ["有機 ゲイシャ", "ペルー 有機 コーヒー", "ペルー オーガニック コーヒー 豆", "ペルー チリノス ゲイシャ"],
  published: "2026-10-10",
  updated: "2026-10-10",
  lead: `SNöBIのオーガニック ゲイシャは、ペルー・カハマルカ県チリノスでミゲル・エステバン・ラミレス・アグルトさんが標高${peru.elevation}で育てた有機JASのゲイシャ種を、ウォッシュドと天日乾燥で仕上げ、${roastOf(peru)}にした豆です。`,
  sections: [
    {
      h2: "オーガニック ゲイシャとは",
      blocks: [
        { p: "ゲイシャは、コーヒーの品種の名前です。World Coffee Research（WCR）の品種カタログによると、もとは1930年代にエチオピアのコーヒーの森で採取された品種で、ジャスミンや桃のような繊細な香りで知られています。" },
        { p: "その名前が広く知られるようになったのは、2004年。パナマのエスメラルダ農園が、ゲイシャでベスト・オブ・パナマに優勝してからです。" },
        { p: "オーガニックは、育て方と認証の話です。日本では、有機JASマークのない農産物や加工食品に「有機」「オーガニック」と表示することが、法律で禁止されています。マークを付けられるのは、登録認証機関の検査を受けて認証された事業者だけです。" },
        { p: "有機農産物のJAS規格は、化学的に合成された肥料と農薬の使用を避けることを基本にしています。コーヒーの木のような多年生の植物では、最初の収穫の3年以上前から、規格に沿って育てていることが求められます。" },
        { p: "オーガニック ゲイシャとは、ゲイシャ種をこの基準で育て、認証を受けたコーヒーのこと。SNöBI（スノビ）は、Tokyo Coffeeがつくるオーガニック・スペシャルティのラインです。ペルーの生豆は有機JAS。焙煎するTokyo Coffeeも、有機加工食品の生産行程管理者として認定を受けています。" },
      ],
    },
    {
      h2: "チリノス生産者組合と、ミゲルさん",
      blocks: [
        { p: "豆が育つのは、カハマルカ県サン・イグナシオのチリノス。チリノス生産者組合（CAC La Prosperidad de Chirinos）は1968年に設立されました。このロットの資料によると、加盟する農家は814軒。組合員の25%は女性です。" },
        { p: "組合は、羊や牛の堆肥とコーヒーの果肉で有機肥料をつくり、加盟農家に無償で配っています。2025年11月10日には、チャチャポヤスで開かれた第9回FICAFÉで、森林破壊のない土地で育ったコーヒーを認定し、その流れをたどれるようにする仕組みを発表しました。" },
        { p: "生産者は、ミゲル・エステバン・ラミレス・アグルトさん。1976年にチリノスで生まれ、1995年からコーヒーをつくり、2004年から組合員です。これまでカトゥーラ、パチェ、カティモールを育ててきました。" },
        { p: "ゲイシャは、ミゲルさんにとって新しく植えた挑戦の品種です。SNöBIのペルーは、ミゲルさんが育てた有機のゲイシャ。2019年には、ボストンのSCAに組合の代表として参加しました。自分の農園では、若い生産者の研修も受け入れています。" },
      ],
    },
    {
      h2: `標高${peru.elevation}、ウォッシュド、天日乾燥`,
      blocks: [
        {
          table: {
            head: ["項目", "ペルー チリノス ゲイシャ"],
            rows: [
              ["地域", peru.region.ja],
              ["生産者", peru.producer.ja],
              ["標高", peru.elevation],
              ["品種", peru.variety.ja],
              ["精製", peru.process.ja],
              ["焙煎度", roastOf(peru)],
              ["認証", "有機JAS"],
              ["日本への入港", "2025年11月"],
            ],
          },
        },
        { p: "ウォッシュドは、コーヒーの実から果肉を取り除き、豆についた粘液質（ミューシレージ）を発酵させてから、きれいな水で洗って乾燥させる方法です。このロットは、そのあと天日で乾かしています。" },
      ],
    },
    {
      h2: `味は、${peru.notes.ja.join("、")}`,
      blocks: [
        { p: `カップの印象は、${peru.notes.ja.join("、")}。花の香りがあり、みかんのようにやさしく、紅茶のように軽い一杯です。` },
        { p: peru.bestFor.ja },
        { p: "SNöBIの豆は4種とも浅煎りです。豆のままでお届けします。焙煎後1ヶ月半まで、味を楽しめます。" },
        { note: ajcaDripNote },
      ],
    },
    {
      h2: "価格と届け方",
      blocks: [
        { p: `ペルー チリノス ゲイシャは、100g ${yen(p100)}、200g ${yen(p200)}（どちらも税込）。` },
        { p: `上の目安（1杯${AJCA_DRIP.grams}g）で数えると、100gは約${cupsIn(100)}杯分。1杯あたり約${cupYen(p100, 100)}円です。200gなら、1杯あたり約${cupYen(p200, 200)}円になります。` },
        { list: [...orderingSchedule.ja, `${nextDayLine.ja}。`, `${freeShippingLine.ja}。${freeAt200 ? "200gなら、それだけで送料無料になります。" : ""}`] },
      ],
    },
  ],
  faq: [
    { q: "オーガニックのゲイシャは、普通のゲイシャと何が違う？", a: "品種は同じゲイシャです。違うのは育て方と認証。有機JASの基準で育てられ、認証を受けたものだけが「有機」と表示できます。" },
    { q: "粉でも買える？", a: "豆のままでのお届けです。100gと200gから選べます。" },
    { q: "どれくらいで飲みきればいい？", a: "焙煎後1ヶ月半まで、味を楽しめます。" },
    { q: "いつ届く？", a: `${orderingSchedule.ja.join("")}${nextDayLine.ja}。` },
  ],
  products: ["peru"],
  cover: "144",
  coverAlt: "朝の光と葉の影のなか、木のテーブルに置かれたSNöBI ペルー チリノス ゲイシャ（有機JAS）の袋",
  sources: [
    { label: "商品の事実と価格：content/products.ts（ペルー チリノス ゲイシャ）" },
    { label: "ロットの事実（2004年から組合員、有機JAS）：brain/Handoffs/premium-line/product-facts-chapter-one.md" },
    { label: "組合とミゲルさんの事実（1968年設立、組合員の25%が女性、1976年生まれ、以前の品種、FICAFÉ 2025）：docs/origins-research.md（✅項目）" },
    { label: "CAC La Prosperidad de Chirinos 公式サイト（1968年設立）", url: "https://cafelaprosperidaddechirinos.com/" },
    { label: "Practical Action「La Prosperidad de Chirinos presentó en la FICAFÉ 2025…」（2025年11月10日、チャチャポヤス、組合員の25%が女性）", url: "https://latam.practicalaction.org/la-cooperativa-cafetalera-prosperidad-chirinos-presento-en-la-ficafe-2025-innovador-sistema-peruano-de-acreditacion-de-cafe-libre-de-deforestacion/" },
    { label: "World Coffee Research, Arabica Coffee Varieties「Geisha (Panama)」（1930年代にエチオピアで採取、香り）", url: "https://varieties.worldcoffeeresearch.org/varieties/geisha-panama" },
    { label: "Hacienda La Esmeralda「Our Story」（2004年ベスト・オブ・パナマ優勝）", url: "https://haciendaesmeralda.com/our-story/" },
    { label: "農林水産省「有機食品の検査認証制度」（有機・オーガニック表示の禁止、登録認証機関）", url: "https://www.maff.go.jp/j/jas/jas_kikaku/yuuki.html" },
    { label: "農林水産省 日本農林規格「有機農産物」JAS 1605:2024（4 生産の原則、5.1.2 多年生の植物は最初の収穫前3年以上）", url: "https://www.maff.go.jp/j/jas/jas_kikaku/attach/pdf/yuuki-437.pdf" },
    { label: "全日本コーヒー協会「加工処理・選別」（水洗式＝ウォッシュドの定義）", url: "https://coffee.ajca.or.jp/column/4476/" },
    { label: `全日本コーヒー協会「ペーパードリップ式」（1杯${AJCA_DRIP.yieldMl}mL分＝粉${AJCA_DRIP.grams}g・湯${AJCA_DRIP.waterMl}mL）`, url: AJCA_DRIP.url },
    { label: "焙煎所の有機加工食品 生産行程管理者の認定：content/v2.ts（jas）" },
    { label: "発送と送料：content/ordering.ts" },
  ],
};

export default post;

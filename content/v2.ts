/* v2 preview content that is not in content/products.ts: which shoot frame goes where, and its caption.
   Copy rules: product facts come from products.ts; the lines below are LIVE copy (sections.tsx, trade-page.tsx)
   or ✅ facts from design/plan/COPY-INVENTORY.md, cited per line. Captions are DRAFTS for the owner (plan Q4).
   When v2 replaces the live pages, sections.tsx's copies of these lines are deleted, not kept (SINGLE_SOURCE). */

import { orderingSchedule } from "./ordering";

export const SHOOT = "東京, 2026年10月1日";

/* Origin-page frames (design/plan/PHOTO-INVENTORY.md §3.3). */
export const originFrames: Record<string, { hero: string; table: string; hand: string; waist: string; brew: string; cup: string; beans: string; studio: string }> = {
  peru: { hero: "144", table: "025", hand: "047", waist: "053", brew: "128", cup: "133", beans: "152", studio: "253" },
  "ethiopia-guji": { hero: "143", table: "022", hand: "049", waist: "050", brew: "129", cup: "132", beans: "151", studio: "248" },
  "colombia-huila": { hero: "146", table: "024", hand: "046", waist: "052", brew: "127", cup: "136", beans: "158", studio: "254" },
  "mexico-chiapas-decaf": { hero: "145", table: "023", hand: "048", waist: "051", brew: "126", cup: "135", beans: "157", studio: "250" },
};

/* Producer numbers set as type. Each value is a VERIFIED fact (source in the comment). */
export const producerNumbers: Record<string, [string, string][]> = {
  peru: [["814", "組合に集う農家（ロット資料）"], ["1995", "ミゲルさんがコーヒーをつくりはじめた年"], ["1968", "チリノス組合の設立（FS ✅）"]], // P:77-78; FS:105
  "ethiopia-guji": [["221ha", "タデGG農園の広さ（FS ✅）"], ["約20km", "農園から自社精選所まで"], ["2,200m", "畑の最も高いところ"]], // FS:114; P:175; P:138
  "colombia-huila": [["10–12月", "収穫の季節"], ["1,700m", "ピタリートの畑"], ["ひとつ", "小さな農園の豆を、ひとつのロットに"]], // P:261; P:226; P:250
  "mexico-chiapas-decaf": [["5,636m", "オリサバ山。デカフェに使う氷河の水"], ["99.9%", "カフェインカット（薬品不使用）"], ["3,253", "グラポス農協の生産者"]], // P:339; P:330; P:329
};

/* About (ストーリー) — the five agreed chapters, live copy (sections.tsx line refs). */
export const statementJa = ["世界最高峰の品質。オーガニックという信念。地球への責任。", "三つは同時には成り立たない — そう言われてきました。", "SNöBI は、その常識を変えていく。"]; // :133-137
export const storyJa = ["オーガニックスペシャルティコーヒーの未来は、まだ完成していないと私たちは考えています。これは、私たちの第一章。", "もし、この挑戦に共感していただけたなら、次の章を、ぜひご一緒に。"]; // :219, :224
export const signOff = "まあ、見てなって。"; // :227
export const roadAhead: [string, string, string][] = [
  ["01 / NOW", "第一章", "4つの産地。妥協のない、一つの基準。"],
  ["02 / NEXT", "探し続ける", "世界のオーガニックコーヒーを、もっと。"],
  ["03 / AHEAD", "ともにつくる", "研究、トレーニング、そしてコーヒーのコミュニティへ。"],
]; // :263-272

/* JAS facts (COPY-INVENTORY §4.2, from the certificate file). Publishing the number: owner question 3. */
export const jas: [string, string][] = [
  ["13OGP-2001", "有機加工食品 生産行程管理者の認定番号"],
  ["2020.04.30", "認定日"],
  ["JASCERT", "2026年7月からの認証機関"],
];

/* Ordering logistics. TODO(registry): move to system.toml (site-plan §4); kept once here for the preview. */
export const ordering = {
  roast: "火・金焙煎・発送",
  cutoff: "当日正午までのご注文",
  ship: "本州は翌日配達",
  free: "¥3,000以上で送料無料",
}; // Davy 2026-10-08; full lines live in content/ordering.ts

/* FAQ — live Q&A (sections.tsx:324-350), grouped. The price answer is built from products.ts in the page. */
export const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "SNöBIについて",
    items: [
      { q: "SNöBIって、Tokyo Coffeeとどう違う？", a: "SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。第一章はペルー、コロンビア・ウィラ、エチオピア・グジ、メキシコ・チアパスのデカフェ。カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。" },
      { q: "有機？ 焙煎度は？ 粉でも買える？", a: "第一章は四つの産地からの、スペシャルティコーヒー。全種類、豆の味を堪能出来る様に、「浅煎り」で焙煎。JASオーガニック、豆のままでのお届けです。" },
    ],
  },
  {
    title: "注文と発送",
    items: [
      { q: "価格とサイズについて教えて。", a: "__PRICES__" },
      { q: "送料はいくら？", a: "¥3,000以上のご注文で送料無料。未満の場合は通常¥500、九州¥700、北海道・沖縄¥800。離島は別途お見積りとなります。100g・200gともネコポスで発送します。最終的な送料はレジでご確認いただけます。" },
      { q: "いつ焙煎して、いつ届く？", a: `${orderingSchedule.ja.join("")}本州であれば翌日配達。` },
      { q: "どこで決済するの？", a: "決済はTokyo Coffeeが承ります。選んだ豆とサイズを引き継いで、Tokyo Coffeeの決済ページに進みます。ご利用いただける支払方法は決済画面に表示されます。" },
    ],
  },
  {
    title: "お店で扱う",
    items: [{ q: "自分のお店で取り扱いたい。", a: "「取扱店 第一章」プログラムへのご相談を受け付けています。取扱店向けページで詳細と申込フォームをご案内しています。" }],
  },
];

/* Trade — live copy (trade-page.tsx:36-49, 65, 79-80, 100). */
export const tradeBenefits: [string, string][] = [
  ["最初の25店舗", "コーヒーへの好奇心を共有するカフェ・小売店と、小さな第一章を。"],
  ["第二章まで、価格を固定", "合意した卸価格を第二章まで固定します。価格はお問い合わせください。"],
  ["ロースタリーで、一緒に飲む", "豆を知っていただくための、ロースタリーでのカッピングへご招待。"],
  ["お店で伝えるための道具", "店頭POPキットをご用意。snobi.jpに取扱店として掲載します。"],
];

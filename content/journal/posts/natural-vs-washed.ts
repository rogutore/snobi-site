import type { Post } from "../types";
import { products, type Coffee } from "../../products";
import { coffee, caffeineCut } from "../facts";

/* Process, variety, elevation, notes, "こんな人に" lines and the decaf's caffeine cut are read from content/products.ts,
   never retyped here (SINGLE_SOURCE rule 2). A missing product or field stops the build instead of printing a gap. */

const eth = coffee("ethiopia-guji");
const peru = coffee("peru");
const col = coffee("colombia-huila");
const mex = coffee("mexico-chiapas-decaf");
const notes = (c: Coffee) => c.notes.ja.join("、");
/* "すべて浅煎り" is only printed while every product in products.ts carries the same roast. */
const roasts = new Set(products.map((p) => p.roast?.ja));
const roast = eth.roast?.ja;
if (!roast || roasts.size !== 1) throw new Error("journal/natural-vs-washed: products.ts roasts differ or are missing; rewrite the roast line");
const compareRow = (c: Coffee) => [c.title.ja, c.process.ja, c.variety.ja, c.elevation, notes(c)];

const post: Post = {
  slug: "natural-vs-washed",
  category: "産地",
  title: "ナチュラルとウォッシュトの違い｜コーヒーの精製方法",
  metaTitle: "ナチュラルとウォッシュトの違い｜精製方法と味を3種で比較",
  description: "ナチュラルは実を果肉ごと乾かし、ウォッシュトは果肉を除いて発酵・水洗してから乾かす精製方法です。SNöBIではエチオピア グジがナチュラル、ペルーとコロンビア ウィラがウォッシュトです。",
  keyword: "ナチュラル ウォッシュト 違い",
  related: ["コーヒー 精製方法", "ナチュラル製法", "ウォッシュト製法"],
  published: "2026-10-11",
  updated: "2026-10-11",
  lead: "ナチュラルとウォッシュトの違いは、コーヒーの実を果肉ごと乾かすか（ナチュラル）、果肉を取り除き、発酵させて水で洗ってから乾かすか（ウォッシュト）という精製方法の違いです。",
  sections: [
    {
      h2: "精製とは、実から生豆を取り出す工程",
      blocks: [
        { p: "コーヒーの生豆は、コーヒーチェリーと呼ばれる実の中にあります。実から生豆を取り出す工程を、精製と呼びます（全日本コーヒー協会）。" },
        { p: "全日本コーヒー協会は、主な精製方法として、水洗式（ウォッシュト）、非水洗式（ナチュラル）、スマトラ式（セミウォッシュト）の3つを挙げています。中米では、果肉を少し残して乾かすハニープロセスも行われています。" },
        { note: "表記は「ウォッシュト」と「ウォッシュド」の両方が使われ、意味は同じです。SNöBIの商品ページでは「ウォッシュド」と書いています。" },
      ],
    },
    {
      h2: "ナチュラル（非水洗式）の工程",
      blocks: [
        { p: "ナチュラルは、果肉がついたままの実を乾かし、乾いてから脱穀して生豆を取り出します。全日本コーヒー協会が示す工程は次のとおりです。" },
        {
          steps: [
            "収穫した実を、色を見ながら選び、完熟の実を残す。",
            "実を乾燥場に広げ、2週間ほど天日で乾かす。乾き方をそろえるため毎日かき混ぜ、夜は湿気を防ぐためにシートで覆う。",
            "脱穀機で果肉とパーチメント（種を包む硬い殻）を取り除き、生豆を取り出す。",
          ],
        },
        { p: "ナチュラルの生豆は、全体に茶色っぽくなります（全日本コーヒー協会）。" },
        { p: "SNöBIのエチオピア グジ（タデGG農園）はナチュラルです。農園から約20kmの自社精選所で水槽に入れて選別し、完熟の実だけを手で選んでから、アフリカンベッドの上で天日乾燥させます。果肉をつけたまま乾かすので、果実の甘さが豆に移ります。" },
      ],
    },
    {
      h2: "ウォッシュト（水洗式）の工程",
      blocks: [
        { p: "ウォッシュトは、果肉を取り除いてから乾かします。全日本コーヒー協会が示す工程は次のとおりです。" },
        {
          steps: [
            "実を水槽に入れ、沈んだ完熟の実を選ぶ。",
            "果肉除去機で外皮と果肉を取り除く。種は、ミューシレージ（粘液質）のついたパーチメントの状態になる。",
            "1日ほど発酵させてミューシレージを落としやすくし、きれいな水で洗う。",
            "天日または機械で乾燥させる。",
            "脱穀機でパーチメントを取り除き、生豆を取り出す。",
          ],
        },
        { p: "ウォッシュトの生豆は、全体に緑色っぽくなります（全日本コーヒー協会）。" },
        { p: `SNöBIの${peru.title.ja}は${peru.process.ja}、${col.title.ja}も${col.process.ja}です。${mex.title.ja}もウォッシュドで精製したあと、薬品を使わないマウンテンウォーター製法でカフェインを抜いています。` },
      ],
    },
    {
      h2: "ナチュラルとウォッシュトの違いは、カップにどう出るか",
      blocks: [
        { p: "全日本コーヒー協会は、ウォッシュトの味を、透明感のあるフルーティな酸味とすっきりした印象、ナチュラルの味を、濃厚でコクのある風味と説明しています。" },
        {
          table: {
            head: ["", "ナチュラル", "ウォッシュト"],
            rows: [
              ["乾かすもの", "果肉がついたままの実", "果肉を除き、水で洗ったパーチメント"],
              ["主な工程", "選別 → 乾燥 → 脱穀", "選別 → 果肉除去 → 発酵 → 水洗 → 乾燥 → 脱穀"],
              ["生豆の色", "茶色っぽい", "緑色っぽい"],
              ["味の傾向（全日本コーヒー協会）", "濃厚でコクがある", "透明感のある酸味、すっきり"],
              ["SNöBIの豆", eth.title.ja, `${peru.title.ja}、${col.title.ja}、${mex.title.ja}`],
            ],
          },
        },
        { p: "味は精製だけでは決まりません。全日本コーヒー協会は、生産国や銘柄、精製方法によってコーヒーの個性が違い、味には焙煎度も大きくかかわると説明しています。" },
      ],
    },
    {
      h2: "SNöBIの3種で比べる",
      blocks: [
        { p: `SNöBI（スノビ）の${products.length}種は、すべて有機JAS（オーガニック）の${roast}です。同じ${roast}どうしで、精製の違いを比べられます。ナチュラルはエチオピア グジ、ウォッシュトはペルーとコロンビア ウィラ。` },
        {
          table: {
            head: ["コーヒー", "精製", "品種", "標高", "ノート"],
            rows: [compareRow(eth), compareRow(peru), compareRow(col)],
          },
        },
        { p: `ナチュラルのグジは、${notes(eth)}。ウォッシュドのペルーは、${notes(peru)}。コロンビア ウィラは、${notes(col)}。` },
        { p: "3種は、品種も標高も違います。だから、カップの違いのすべてが精製によるものではありません。それでも、3種を並べると、ナチュラルの果実の甘さと、ウォッシュトの酸や軽さを確かめられます。" },
        {
          steps: [
            "3種を、同じ挽き目、同じ粉と湯の量、同じ湯温で淹れる。",
            "少し冷ましてから、香り、酸、甘さ、口当たりの順に比べる。",
            "ノートの言葉と、自分が感じたことを並べて書き留める。",
          ],
        },
        { p: "淹れ方の目安は、浅煎りのハンドドリップの記事にまとめています。" },
        { read: "light-roast-hand-drip" },
      ],
    },
  ],
  faq: [
    {
      q: "ナチュラルとウォッシュト、どちらがおいしい？",
      a: `優劣ではなく、方法の違いです。SNöBIの中では、果実感と甘さをとりたいならナチュラルの${eth.title.ja}、紅茶のように軽やかに飲みたいならウォッシュドの${peru.title.ja}が目安です。`,
    },
    {
      q: "「ウォッシュト」と「ウォッシュド」は違う？",
      a: "同じ精製方法です。水洗式とも呼ばれます。",
    },
    {
      q: "ハニープロセスとは？",
      a: "中米で行われている、セミウォッシュトの改良型です。全日本コーヒー協会によると、コスタリカのハニープロセスは、ウォッシュトより水の使用量を抑え、果肉を少し残して乾かします。",
    },
    {
      q: "SNöBIのデカフェの精製は？",
      a: `${mex.title.ja}の精製と製法は、${mex.process.ja}です。カフェインは${caffeineCut(mex)}カットしています。`,
    },
  ],
  products: ["ethiopia-guji", "peru", "colombia-huila"],
  cover: "151",
  coverAlt: "白い紙の上に広げた、SNöBIのエチオピア グジの焙煎豆。東京で撮影。",
  sources: [
    { label: "content/products.ts（4種の精製、品種、標高、焙煎度、ノート、こんな人に、デカフェの製法とカフェイン）" },
    { label: "brain/Handoffs/premium-line/product-facts-chapter-one.md（タデGG農園の精選所と乾燥）" },
    { label: "全日本コーヒー協会「加工処理・選別」（精製の定義、水洗式・非水洗式・スマトラ式の工程と味の特徴、ハニープロセス）", url: "https://coffee.ajca.or.jp/column/4476/" },
    { label: "全日本コーヒー協会「焙煎・配合・粉砕」（個性は生産国・銘柄・精製方法で違い、味には焙煎度がかかわる）", url: "https://coffee.ajca.or.jp/column/4472/" },
  ],
};

export default post;

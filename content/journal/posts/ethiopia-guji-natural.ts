import type { Post } from "../types";
import { products, yen } from "../../products";
import { orderingSchedule, freeShippingLine, nextDayLine } from "../../ordering";
import { coffee, price, roastOf } from "../facts";

/* Product facts, notes and prices are read from content/products.ts and the shipping lines from content/ordering.ts,
   never retyped here (SINGLE_SOURCE rule 2). A missing product, variant or roast stops the build instead of printing
   a gap (../facts). */
const eth = coffee("ethiopia-guji");
const notes = eth.notes.ja.join("、");
const roast = roastOf(eth);
/* "ナチュラルはグジだけ" and "ベリーとドライフルーツはグジだけ" are only printed while products.ts says so. */
const others = products.filter((p) => p.slug !== eth.slug);
if (!eth.process.ja.includes("ナチュラル") || others.some((p) => p.process.ja.includes("ナチュラル")))
  throw new Error("journal/ethiopia-guji-natural: natural process is no longer Guji-only in content/products.ts");
if (others.some((p) => p.notes.ja.some((n) => n.includes("ベリー") || n.includes("ドライフルーツ"))))
  throw new Error("journal/ethiopia-guji-natural: berry / dried-fruit notes are no longer Guji-only in content/products.ts");

const post: Post = {
  slug: "ethiopia-guji-natural",
  category: "産地",
  title: "エチオピアのオーガニックコーヒー、グジのナチュラル",
  metaTitle: "エチオピア グジ ナチュラル｜オーガニックコーヒー豆（有機JAS）",
  description: `${eth.region.ja}のタデGG農園で育った${eth.variety.ja}を、果肉ごと天日で乾かしたナチュラル。有機JASの${roast}で、ノートは${notes}。100g ${yen(price(eth, "100g"))}（税込）。`,
  keyword: "エチオピア オーガニック コーヒー",
  related: ["エチオピア グジ ナチュラル", "エチオピア グジ", "グジ タデGG"],
  published: "2026-10-11",
  updated: "2026-10-11",
  lead: `SNöBI（スノビ）のエチオピアのオーガニックコーヒーは、${eth.region.ja}のタデGG農園で育った${eth.variety.ja}を、果肉をつけたまま天日で乾かしたナチュラルの有機JASコーヒー豆です。`,
  sections: [
    {
      h2: "グジのナチュラルとは",
      blocks: [
        { p: "グジは、エチオピアのオロミア州にあるコーヒーの産地です。SNöBIのエチオピアは、そのグジのシャキッソ村から来ています。" },
        { p: "ナチュラルとは、果肉をつけたまま実を乾燥させる精製方法です。果実の甘さが豆に移ります。全日本コーヒー協会は、ナチュラル（非水洗式）を、果肉がついたままの実を天日で乾かし、そのあと脱穀して豆を取り出す方法と説明しています。" },
        { p: "一般的なナチュラルでは、実を乾燥場に広げて2週間ほど天日で乾かします。乾き方をそろえるために毎日かき混ぜ、夜は湿気を防ぐためにシートで覆います（全日本コーヒー協会）。" },
        { p: "タデGG農園では、次の順に進めます。" },
        {
          steps: [
            "収穫した実を、農園から約20km離れた自社の精選所へ運ぶ。",
            "水槽に入れて選別する。",
            "完熟の実だけを、手で選ぶ（ハンドソート）。",
            "アフリカンベッドと呼ばれる高床の乾燥棚の上で、果肉ごと天日でゆっくり乾かす。",
          ],
        },
        { p: "水槽での選別と手での選別を重ね、完熟の実だけを果肉ごと乾かす。これがタデGG農園のナチュラルです。ナチュラルとウォッシュトの違いは、別の記事で並べて比べています。" },
        { read: "natural-vs-washed" },
      ],
    },
    {
      h2: "タデGG農園とタスファイ・ベケレさん",
      blocks: [
        { p: "タデGG農園は、シャキッソ村にある221haの農園です。営むのは、農学者でもあるタスファイ・ベケレさん。畑の標高は" + eth.elevation + "です。" },
        { p: "シャキッソは、かつて山火事で森を失った村です。タスファイさんは、コーヒーで森と雇用を取り戻してきました。" },
        { p: "タスファイさんは中米と南米の農園を回り、栽培と精製の方法を学んできました。タデGGの名で豆を輸出し、スケ・クト農園も立ち上げました。村の学校づくりにも関わり、その第1期の学校は2018年に完成しています。" },
      ],
    },
    {
      h2: "エチオピアのオーガニックコーヒーと有機JAS",
      blocks: [
        { p: "日本で「有機」「オーガニック」と表示できるのは、有機JASマークがついた食品だけです。マークのない農産物や加工食品にこうした表示をすることは、法律で禁止されています（農林水産省）。" },
        { p: "有機JASマークは、農薬や化学肥料などの化学物質に頼らないことを基本に生産された食品を表します。登録認証機関の検査を受け、認証された事業者だけが貼ることができます（農林水産省）。" },
        { p: "タデGG農園のこのロットは、有機JASの生豆です。焙煎は、有機加工食品の生産行程管理者として認定を受けた焙煎所で行っています。" },
        { note: `SNöBIの${products.length}種は、すべて有機JASのスペシャルティコーヒーです。` },
      ],
    },
    {
      h2: `味は、${notes}`,
      blocks: [
        { p: `カップのノートは、${notes}。焙煎は${roast}です。` },
        {
          table: {
            head: ["項目", "内容"],
            rows: [
              ["地域", eth.region.ja],
              ["生産者", eth.producer.ja],
              ["標高", eth.elevation],
              ["品種", eth.variety.ja],
              ["精製", eth.process.ja],
              ["焙煎度", roast],
              ["ノート", notes],
              ["認証", "有機JAS"],
              ["ロット名（輸入元の資料）", "エチオピア グジ G1 タデGG農園 ナチュラル"],
            ],
          },
        },
        { p: `${roast}の豆なので、淹れ方は浅煎りのハンドドリップの目安が出発点です。一般的な目安は、中細挽き（全日本コーヒー協会）、湯温90〜96℃（SCA）、お湯が落ちきるまで3分以内（HARIO）。くわしくは、浅煎りのハンドドリップの記事にまとめています。` },
        { read: "light-roast-hand-drip" },
      ],
    },
    {
      h2: "SNöBIの4種の中のグジ",
      blocks: [
        { p: `SNöBIの${products.length}種のうち、ナチュラルで精製しているのはグジだけです。ほかの${others.length}種はウォッシュドです。ノートを並べると、ベリーとドライフルーツを持つのもグジだけです。` },
        {
          table: {
            head: ["コーヒー", "精製", "ノート"],
            rows: products.map((c) => [c.title.ja, c.process.ja, c.notes.ja.join("、")]),
          },
        },
      ],
    },
    {
      h2: "価格と届き方",
      blocks: [
        { p: `100g ${yen(price(eth, "100g"))}、200g ${yen(price(eth, "200g"))}（いずれも税込）。豆のままでお届けします。` },
        { list: [...orderingSchedule.ja, `${freeShippingLine.ja}。`, `${nextDayLine.ja}。`] },
      ],
    },
  ],
  faq: [
    {
      q: "エチオピア グジの精製方法は？",
      a: "ナチュラルです。果肉をつけたまま実を天日で乾かします。タデGG農園では、高床のアフリカンベッドの上で乾燥させています。",
    },
    {
      q: "有機JASのエチオピアコーヒーですか？",
      a: "はい。有機JASの生豆を、有機加工食品の生産行程管理者として認定を受けた焙煎所で焙煎しています。",
    },
    {
      q: "標高と品種は？",
      a: `標高${eth.elevation}、${eth.variety.ja}です。`,
    },
    {
      q: "粉でも買えますか？",
      a: "豆のままでのお届けです。挽くのは淹れる直前に、必要な分だけがよいとされています（全日本コーヒー協会）。",
    },
    {
      q: "どのくらいで飲みきればいい？",
      a: eth.enjoyWithin.ja.replace(/！$/, "。"),
    },
  ],
  products: ["ethiopia-guji"],
  cover: "022",
  coverAlt: "日の当たる木のテーブルに置いた、SNöBIのエチオピア グジの袋。東京で撮影。",
  sources: [
    { label: "content/products.ts（エチオピア グジ タデGG農園：地域、生産者、標高、品種、精製、焙煎度、ノート、価格）" },
    { label: "brain/Handoffs/premium-line/product-facts-chapter-one.md（有機JAS、ロット名、✅ 農園221ha・中南米での研修・スケ・クト農園・学校）" },
    { label: "docs/origins-research.md（Ethiopia の出典一覧）" },
    { label: "content/v2.ts（有機加工食品 生産行程管理者の認定）" },
    { label: "content/v2.ts（FAQ：豆のままでのお届け）" },
    { label: "content/ordering.ts（焙煎・発送、送料）" },
    { label: "Sucafina「Tade GG」（農園221ha、タスファイさんが中南米で栽培と精製を学んだこと）", url: "https://sucafina.com/na/offerings/tade-gg-rfa-organic-fully-washed" },
    { label: "Trabocca「Suke Quto Farm」（タデGGの名での輸出、スケ・クト農園）", url: "https://www.trabocca.com/our-coffees/ethiopia/guji/suke-quto-farm/" },
    { label: "Trabocca「Suke Quto School Project」（第1期の学校が2018年に完成）", url: "https://www.trabocca.com/about-us/projects/suko-quto-school-project/" },
    { label: "農林水産省「有機食品の検査認証制度」", url: "https://www.maff.go.jp/j/jas/jas_kikaku/yuuki.html" },
    { label: "全日本コーヒー協会「加工処理・選別」（非水洗式の工程、2週間ほどの天日乾燥）", url: "https://coffee.ajca.or.jp/column/4476/" },
    { label: "全日本コーヒー協会「焙煎・配合・粉砕」（中細挽き、挽くのは淹れる直前）", url: "https://coffee.ajca.or.jp/column/4472/" },
    { label: "SCA Standard 310-2021 Home Coffee Brewers（抽出中の温度90〜96℃。sca.coffee の原本は現在リンク切れのため Web Archive）", url: "https://web.archive.org/web/20250108161720/https://static1.squarespace.com/static/584f6bbef5e23149e5522201/t/62fbd2d2aed180702280c014/1660670674796/SCA_Standard_310-2021.pdf" },
    { label: "HARIO「V60の世界」基本レシピ（お湯が落ちきるまで3分以内）", url: "https://www.hario.com/v60/v60series.html" },
  ],
};

export default post;

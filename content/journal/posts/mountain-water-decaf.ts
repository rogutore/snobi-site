import { SYSTEM } from "../../system.generated";
import type { Post } from "../types";
import { yen } from "../../products";
import { coffee, price, roastOf, caffeineCut } from "../facts";

/* Keyword: マウンテンウォーター デカフェ. Process facts only; no health or safety claims.
   The decaf plant for our lot is not confirmed (WRITER-BRIEF): the body never names it.
   SNöBI's own decaf facts (title, region, producer, elevation, variety, process, caffeine cut, roast, notes, prices) are
   read from content/products.ts (SINGLE_SOURCE rule 2). Swiss Water's own removal figure below is that company's claim,
   cited as such, and stays as written. */
const mex = coffee("mexico-chiapas-decaf");
const cut = caffeineCut(mex);

const post: Post = {
  slug: "mountain-water-decaf",
  category: "オーガニック",
  title: "マウンテンウォーター製法のデカフェ。水でカフェインを抜く仕組み",
  metaTitle: "マウンテンウォーター デカフェとは｜有機溶媒を使わない製法",
  description:
    `デカフェの製法は、有機溶媒を使う方法と、水や二酸化炭素を使う方法に分かれます。マウンテンウォーター製法は水を使う方法。SNöBIの${mex.title.ja}は、この製法でカフェインを${cut}カットしています。`,
  keyword: "マウンテンウォーター デカフェ",
  related: ["オーガニック マウンテン デカフェ", "デカフェ 有機溶媒", "デカフェ 製法"],
  published: "2026-10-10",
  updated: "2026-10-10",
  lead: "マウンテンウォーター製法は、メキシコで行われている水を使うデカフェの製法で、有機溶媒を使わずに、焙煎前の生豆からカフェインを取り除きます。",
  sections: [
    {
      h2: "デカフェは、生豆のうちにカフェインを抜く",
      blocks: [
        {
          p: "デカフェは、カフェインを取り除いたコーヒーです。カフェインを抜くのは焙煎の前、精製を終えた生豆の段階です。抜いたあとに乾かし、その生豆を焙煎所で焙煎します。",
        },
        {
          p: "日本のコーヒーの表示ルール（全日本コーヒー公正取引協議会の公正競争規約と施行規則）では、カフェインを90%以上除去したコーヒーを「カフェインレスコーヒー」「デカフェネィテッドコーヒー」などと表示します。",
        },
        { p: "カフェインを抜く方法は、使うもので大きく三つに分かれます。" },
        {
          table: {
            head: ["方法", "カフェインを取り出すもの", "例・出典"],
            rows: [
              ["有機溶媒を使う", "塩化メチレン（ジクロロメタン）、酢酸エチル", "米国連邦規則 21 CFR 173"],
              ["二酸化炭素を使う", "超臨界状態の二酸化炭素（生豆は水で湿らせる）", "超臨界技術センター（三重県）"],
              ["水を使う", "コーヒーの成分を溶かした水", "スイスウォーター製法、マウンテンウォーター製法"],
            ],
          },
        },
      ],
    },
    {
      h2: "有機溶媒を使う製法",
      blocks: [
        {
          p: "有機溶媒を使う製法では、塩化メチレン（ジクロロメタン）や酢酸エチルでカフェインを取り出します。米国の連邦規則は、酢酸エチルをコーヒーと茶のカフェイン除去の溶媒として使えると定めています。塩化メチレンについては、生豆からカフェインを抽出する溶媒として使った場合に、焙煎したデカフェに残ってよい量の上限を10ppmと定めています。",
        },
        {
          p: "スイスウォーター社の解説によると、溶媒の使い方には、豆に直接ふれさせる方法と、カフェインを移した水を介して間接的に使う方法があります。",
        },
        { p: "ここで書くのは、何を使ってカフェインを抜くかという、製法の事実だけです。" },
      ],
    },
    {
      h2: "水と二酸化炭素を使う製法",
      blocks: [
        {
          p: "スイスウォーター製法は、カナダの会社が行う、水を使う製法です。同社の説明では、水とコーヒーの成分でつくった「グリーンコーヒーエキス（GCE）」に生豆をひたすと、カフェインが豆の外へ移ります。カフェインを含んだGCEは炭のフィルターに通してカフェインを取り除き、次の豆に使います。工程は約8〜10時間で、カフェインを99.9%取り除くとしています。",
        },
        {
          p: "二酸化炭素を使う製法もあります。三重県の超臨界技術センターは、生豆に水を加えて湿らせ、31℃・7.3MPa以上で超臨界状態にした二酸化炭素を接触させてカフェインを抽出し、そのあと乾燥させると説明しています。使うのは水と二酸化炭素です。",
        },
        { p: "スイスウォーター社は溶媒を使わないと説明し、超臨界技術センターは薬品を使わず、水と二酸化炭素だけでカフェインを除去すると説明しています。" },
      ],
    },
    {
      h2: "マウンテンウォーター デカフェの工程",
      blocks: [
        {
          p: "マウンテンウォーター製法は、メキシコで行われている水を使う製法です。この製法を行うメキシコの加工会社は、工程を次のように説明しています。",
        },
        {
          steps: [
            "豆を分析し、カフェインを抜く条件を決める。",
            "生豆に蒸気をあて、抽出の準備をする。",
            "コーヒー豆から得た成分を飽和させた水溶液で、流量・温度・圧力・真空を管理しながらカフェインを抽出する。",
            "管理された3段階の乾燥にかける。",
            "最後に、豆の表面を磨く。",
          ],
        },
        {
          p: "スイスウォーター製法と同じく、コーヒーの成分を溶かした水でカフェインを抜く、という説明です。",
        },
        {
          p: `SNöBI（スノビ）の商品資料では、カフェインを抜く水は、メキシコ最高峰オリサバ山（${SYSTEM.orizaba_elevation_m.toLocaleString("en-US")}m）の氷河の水とされています。薬品は使いません。`,
        },
      ],
    },
    {
      h2: "マウンテンウォーター製法と有機溶媒",
      blocks: [
        {
          p: "「デカフェ 有機溶媒」という問いには、製法の事実で答えます。マウンテンウォーター製法は、水を使う製法です。塩化メチレンや酢酸エチルといった有機溶媒は使いません。",
        },
        {
          p: `SNöBIの${mex.title.ja}は、ウォッシュドで精製した生豆を、このマウンテンウォーター製法でデカフェにしています。カフェインは${cut}カットです。`,
        },
        { note: "この記事は、製法の違いを説明するものです。健康への影響については扱いません。" },
      ],
    },
    {
      h2: "SNöBIのメキシコ チアパス デカフェ",
      blocks: [
        {
          p: "SNöBIは、Tokyo Coffeeがつくるオーガニック・スペシャルティのコーヒーです。デカフェは、メキシコ チアパス州の一種類です。",
        },
        {
          list: [
            `産地：メキシコ、${mex.region.ja}`,
            `生産者：${mex.producer.ja}`,
            `標高：${mex.elevation}`,
            `品種：${mex.variety.ja}`,
            `精製：${mex.process.ja}`,
            `カフェイン：${cut}カット`,
            `焙煎：${roastOf(mex)}`,
            `味：${mex.notes.ja.join("、")}`,
            `価格：100g ${yen(price(mex, "100g"))}、200g ${yen(price(mex, "200g"))}（税込）`,
          ],
        },
        { p: "有機JASの豆を、豆のままお届けします。" },
      ],
    },
  ],
  faq: [
    {
      q: "マウンテンウォーター製法とスイスウォーター製法の違いは？",
      a: "どちらも水を使い、有機溶媒を使わない製法です。スイスウォーター製法はカナダの会社が行い、カフェインを炭のフィルターで取り除くと説明しています。マウンテンウォーター製法はメキシコで行われ、コーヒー豆の成分を飽和させた水溶液でカフェインを抽出すると説明されています。",
    },
    {
      q: "マウンテンウォーター製法は有機溶媒を使いますか？",
      a: "使いません。水を使う製法です。SNöBIのメキシコ チアパス デカフェも、薬品を使わないこの製法でカフェインを抜いています。",
    },
    {
      q: "デカフェのカフェインはゼロですか？",
      a: `ゼロではありません。日本の表示ルールでは、カフェインを90%以上除去したコーヒーを「カフェインレスコーヒー」などと表示します。SNöBIの${mex.title.ja}は、カフェインを${cut}カットしています。`,
    },
    {
      q: "カフェインは、焙煎の前と後のどちらで抜きますか？",
      a: "焙煎の前です。生豆の段階でカフェインを抜き、乾かしてから焙煎します。",
    },
  ],
  products: ["mexico-chiapas-decaf"],
  cover: "157",
  coverAlt: "白い台に広げた、メキシコ チアパス デカフェの焙煎豆",
  sources: [
    {
      label: "マウンテンウォーター製法を行う加工会社の工程説明「Procesos」（スペイン語）",
      url: "https://www.descamex.com.mx/procesos",
    },
    {
      label: "Swiss Water — Our Coffee Decaffeination Process",
      url: "https://www.swisswater.com/pages/coffee-decaffeination-process",
    },
    {
      label: "Swiss Water — Learn The Science Behind Chemical-Free Decaf Coffee（8〜10時間、99.9%）",
      url: "https://www.swisswater.com/blogs/sw/watch-the-science-behind-chemical-free-decaf-coffee-swiss-water-process",
    },
    {
      label: "Swiss Water — A Closer Look at Water-Process vs Chemical Solvent Method Decaf Coffee",
      url: "https://www.swisswater.com/blogs/sw/a-closer-look-at-water-process-vs-chemical-solvent-method-decaf-coffee",
    },
    { label: "超臨界技術センター「デカフェ技術」", url: "https://www.sctc.co.jp/decaf" },
    {
      label: "米国連邦規則 21 CFR 173.228 Ethyl acetate（2024年4月1日版）",
      url: "https://www.govinfo.gov/content/pkg/CFR-2024-title21-vol3/pdf/CFR-2024-title21-vol3-sec173-228.pdf",
    },
    {
      label: "米国連邦規則 21 CFR 173.255 Methylene chloride（2024年4月1日版）",
      url: "https://www.govinfo.gov/content/pkg/CFR-2024-title21-vol3/pdf/CFR-2024-title21-vol3-sec173-255.pdf",
    },
    {
      label: "全日本コーヒー公正取引協議会「レギュラーコーヒー及びインスタントコーヒーの表示に関する公正競争規約・施行規則」第3条(4)イ",
      url: "https://www.jfftc.org/DATA/Kiyaku_pdf/b05_H_coffee.pdf",
    },
    { label: "SNöBI 商品仕様（content/products.ts：メキシコ チアパス デカフェ）" },
  ],
};

export default post;

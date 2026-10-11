import type { Post } from "../types";
import { yen } from "../../products";
import { orderingSchedule, freeShippingLine, nextDayLine, roastShipShort } from "../../ordering";
import { coffee, price, roastOf, caffeineCut, processShort } from "../facts";

/* SNöBI's decaf facts (title, region, producer, elevation, process, caffeine cut, roast, notes, prices) are read from
   content/products.ts and the delivery lines from content/ordering.ts (SINGLE_SOURCE rule 2); a missing field stops
   the build (../facts). */
const mex = coffee("mexico-chiapas-decaf");
const cut = caffeineCut(mex);
const roast = roastOf(mex);
const notes = mex.notes.ja.join("、");
const prices = `100g ${yen(price(mex, "100g"))}、200g ${yen(price(mex, "200g"))}`;

/* Keyword: オーガニック デカフェ 豆. How to choose: certification, process, roast level, whole bean and delivery.
   No health or pregnancy claims; decaf is described only as chosen by people who want to limit caffeine. */
const post: Post = {
  slug: "organic-decaf-light-roast",
  category: "オーガニック",
  title: "オーガニックのデカフェ豆の選び方。認証、製法、焙煎度",
  metaTitle: "オーガニック デカフェ豆の選び方｜有機JAS・製法・浅煎り",
  description:
    `オーガニックのデカフェ豆は、有機JASマーク、カフェインを抜く製法、焙煎度、豆のままかで選べます。SNöBIの${mex.title.ja}は有機JAS、マウンテンウォーター製法、${roast}で、カフェイン${cut}カット。`,
  keyword: "オーガニック デカフェ 豆",
  related: ["有機 デカフェ 豆", "オーガニック カフェインレスコーヒー 豆", "デカフェ 浅煎り", "オーガニック コーヒー カフェインレス"],
  published: "2026-10-10",
  updated: "2026-10-10",
  lead: "オーガニックのデカフェ豆は、有機JASマーク、カフェインを抜いた製法、焙煎度、豆のままかどうか、の四つを確かめて選びます。",
  sections: [
    {
      h2: "オーガニック デカフェ豆を選ぶ四つの目安",
      blocks: [
        {
          p: "デカフェは、カフェインを控えたい人が選ぶコーヒーです。オーガニックのデカフェ豆を選ぶときは、次の四つを確かめます。",
        },
        {
          steps: [
            "認証：有機JASマークがあるか。",
            "製法：何を使ってカフェインを抜いたか。",
            "焙煎度：浅煎りか、中煎りか、深煎りか。",
            "形と届き方：豆のままか、粉か。いつ焙煎し、いつ届くか。",
          ],
        },
        {
          p: "名前の表示も手がかりになります。日本のコーヒーの表示ルール（全日本コーヒー公正取引協議会の公正競争規約と施行規則）では、カフェインを90%以上除去したコーヒーを「カフェインレスコーヒー」「デカフェネィテッドコーヒー」などと表示します。このルールでは、どちらも同じ条件の表示です。",
        },
      ],
    },
    {
      h2: "認証：有機JASマークを見る",
      blocks: [
        {
          p: "農林水産省によると、有機JASマークは、基準に沿った生産が行われていることを登録認証機関が検査し、認証された事業者だけが貼れるマークです。このマークがない農産物、畜産物、加工食品に「有機」「オーガニック」などと表示することは、法律で禁止されています。",
        },
        {
          p: "コーヒーの表示ルールでは、有機加工食品のコーヒーに「有機レギュラーコーヒー」または「レギュラーコーヒー（有機）」と表示し、原材料には「有機コーヒー豆」などと書きます。袋の表示を見れば確かめられます。",
        },
        {
          p: "有機加工食品のJAS（JAS 1606）は、製造や加工を「物理的又は生物の機能を利用した方法」で行うよう定めています。規格の添加物の表（表A.1）には二酸化炭素や活性炭が載っていて、塩化メチレンや酢酸エチルは載っていません。",
        },
        {
          p: "SNöBI（スノビ）のメキシコ チアパス デカフェは、有機JASの豆です。焙煎するTokyo Coffeeの焙煎所は、有機加工食品の生産行程管理者として認定を受けています。",
        },
      ],
    },
    {
      h2: "製法：カフェインを何で抜いたか",
      blocks: [
        {
          p: "カフェインを抜く方法は、使うもので分かれます。有機溶媒（塩化メチレン、酢酸エチル）を使う方法、超臨界状態の二酸化炭素を使う方法、水を使う方法です。水を使う方法には、スイスウォーター製法やマウンテンウォーター製法があります。",
        },
        {
          p: `SNöBIの${mex.title.ja}は、マウンテンウォーター製法です。商品資料では、メキシコ最高峰オリサバ山（5,636m）の氷河の水でカフェインを抜き、薬品は使わないとしています。カフェインは${cut}カットです。`,
        },
        {
          p: "この製法を行うメキシコの加工会社は、生豆に蒸気をあて、コーヒー豆から得た成分を飽和させた水溶液で、流量・温度・圧力・真空を管理しながらカフェインを抽出し、3段階で乾燥させる、と説明しています。",
        },
        { p: "製法が書かれていない豆は、販売店にたずねると確かめられます。" },
      ],
    },
    {
      h2: "焙煎度：デカフェ 浅煎りという選択",
      blocks: [
        {
          p: "全日本コーヒー協会によると、焙煎度は最も浅いライトローストから、最も深いイタリアンローストまで8段階あります。大まかには浅炒り、中炒り、深炒りの3段階で、浅炒りにはライトローストとシナモンローストが入ります。一般的には、浅炒りほど酸味が強く、深炒りになるほど苦味を感じるようになります。",
        },
        {
          p: "同協会は、生産国や銘柄、精製方法で違うコーヒーの個性を引き出すように焙煎度を決める、とも説明しています。",
        },
        {
          p: `SNöBIは、豆の味を楽しんでいただけるように、全種類を浅煎りで焙煎しています。デカフェも同じです。${mex.title.ja}の味は、${notes}です。`,
        },
      ],
    },
    {
      h2: "形と届き方：豆のままで買い、淹れる直前に挽く",
      blocks: [
        {
          p: "全日本コーヒー協会は、コーヒーを淹れる直前に、必要な分だけ挽くことを勧めています。豆は粉にすると表面積が増え、湿気を吸いやすくなり、酸化が進んで劣化するためです。",
        },
        {
          p: `SNöBIは、すべて豆のままでお届けしています。${mex.title.ja}は、${prices}（税込）です。届き方は次のとおりです。`,
        },
        {
          list: [...orderingSchedule.ja, `${nextDayLine.ja}。`, `${freeShippingLine.ja}。`],
        },
        { p: "メキシコ チアパス デカフェは、焙煎から２ヶ月まで、味をお楽しみいただけます。" },
      ],
    },
    {
      h2: "SNöBIのメキシコ チアパス デカフェの場合",
      blocks: [
        {
          table: {
            head: ["目安", mex.title.ja],
            rows: [
              ["認証", "有機JAS"],
              ["製法", `${processShort(mex)}（薬品不使用）、カフェイン${cut}カット`],
              ["焙煎度", `${roast}（${notes}）`],
              ["形と届き方", `豆のまま。${roastShipShort.ja}、${nextDayLine.ja}`],
              ["産地", `メキシコ、${mex.region.ja}。${mex.producer.ja}、標高${mex.elevation}`],
              ["価格", `${prices}（税込）`],
            ],
          },
        },
      ],
    },
  ],
  faq: [
    {
      q: "デカフェとカフェインレスは違いますか？",
      a: `日本のコーヒーの表示ルールでは、カフェインを90%以上除去したコーヒーを「カフェインレスコーヒー」「デカフェネィテッドコーヒー」などと表示します。どちらも同じ条件の表示です。SNöBIの${mex.title.ja}は、カフェインを${cut}カットしています。`,
    },
    {
      q: "浅煎りのデカフェは、酸っぱいですか？",
      a: `一般的には、浅炒りほど酸味が強くなるとされています（全日本コーヒー協会）。SNöBIの${mex.title.ja}の味は、${notes}です。`,
    },
    {
      q: "粉で買えますか？",
      a: "SNöBIは豆のままでのお届けです。淹れる直前に、必要な分だけ挽いてください。",
    },
    {
      q: "「オーガニック」と表示するには、有機JASマークが必要ですか？",
      a: "農産物、畜産物、加工食品では必要です。農林水産省は、有機JASマークがないものに「有機」「オーガニック」などと表示することは法律で禁止されている、と説明しています。",
    },
  ],
  products: ["mexico-chiapas-decaf"],
  cover: "135",
  coverAlt: "木のテーブルに、コーヒーを注いだガラスのカップとSNöBI メキシコの袋",
  sources: [
    { label: "農林水産省「有機食品の検査認証制度」", url: "https://www.maff.go.jp/j/jas/jas_kikaku/yuuki.html" },
    {
      label: "財務省・農林水産省「有機加工食品の日本農林規格（JAS 1606：2024）」4、5.1、5.3.1、表A.1",
      url: "https://www.maff.go.jp/j/jas/jas_kikaku/attach/pdf/yuuki-438.pdf",
    },
    {
      label: "全日本コーヒー公正取引協議会「レギュラーコーヒー及びインスタントコーヒーの表示に関する公正競争規約・施行規則」第3条(2)(4)",
      url: "https://www.jfftc.org/DATA/Kiyaku_pdf/b05_H_coffee.pdf",
    },
    { label: "全日本コーヒー協会「焙煎・配合・粉砕」", url: "https://coffee.ajca.or.jp/column/4472/" },
    {
      label: "Swiss Water — Our Coffee Decaffeination Process",
      url: "https://www.swisswater.com/pages/coffee-decaffeination-process",
    },
    { label: "超臨界技術センター「デカフェ技術」", url: "https://www.sctc.co.jp/decaf" },
    {
      label: "米国連邦規則 21 CFR 173.228 / 173.255（カフェイン除去の溶媒、2024年4月1日版）",
      url: "https://www.govinfo.gov/content/pkg/CFR-2024-title21-vol3/pdf/CFR-2024-title21-vol3-sec173-255.pdf",
    },
    {
      label: "マウンテンウォーター製法を行う加工会社の工程説明「Procesos」（スペイン語）",
      url: "https://www.descamex.com.mx/procesos",
    },
    { label: "SNöBI 商品仕様（content/products.ts：メキシコ チアパス デカフェ）" },
    { label: "SNöBI 注文と発送（content/ordering.ts）" },
    { label: "SNöBI よくある質問・有機JAS認定（content/v2.ts）" },
    { label: "SNöBI 商品事実メモ（product-facts-chapter-one.md：有機JAS）" },
  ],
};

export default post;

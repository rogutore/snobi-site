// Product facts: vault product-facts-chapter-one.md (2026-09-11).
// Final tax-inclusive prices: pricing-and-costs.md DECIDED block.
export type Locale = "ja" | "en";
export type Localized<T = string> = Record<Locale, T>;
export type CoffeeVariant = {
  id: string;
  sku: string;
  size: "100g" | "200g";
  price: number;
};
export type Coffee = {
  handle: string;
  slug: string;
  country: string;
  title: Localized;
  region: Localized;
  producer: Localized;
  elevation: string;
  variety: Localized;
  process: Localized;
  roast: Localized | null;
  chips: Localized<string[]>;
  notes: Localized<string[]>;
  bestFor: Localized;
  narrative: Localized<string[]>;
  facts: Localized<string[]>;
  decaf: boolean;
  color: string;
  ink: string;
  photo: { src: string; caption: Localized } | null;
  variants: CoffeeVariant[];
};
export const products: Coffee[] = [
  {
    handle: "snobi-peru",
    slug: "peru",
    country: "Peru",
    title: {
      ja: "ペルー チリノス ゲイシャ",
      en: "Peru Chirinos Geisha",
    },
    region: {
      ja: "カハマルカ県サン・イグナシオ、チリノス",
      en: "Chirinos, San Ignacio, Cajamarca",
    },
    producer: {
      ja: "ミゲル・エステバン・ラミレス・アグルト（チリノス生産者組合）",
      en: "Miguel Esteban Ramírez Agurto, Chirinos cooperative",
    },
    elevation: "1,731m",
    variety: {
      ja: "ゲイシャ",
      en: "Geisha",
    },
    process: {
      ja: "ウォッシュド・天日乾燥",
      en: "Washed, sun-dried",
    },
    roast: {
      ja: "浅煎り",
      en: "Light",
    },
    chips: {
      ja: ["浅煎り", "ウォッシュド", "ゲイシャ種", "1,731m"],
      en: ["Light roast", "Washed", "Geisha", "1,731m"],
    },
    notes: {
      ja: ["フローラル", "みかん", "紅茶"],
      en: ["Floral", "Mikan", "Tea"],
    },
    bestFor: {
      ja: "紅茶のように軽やかに飲みたい人へ。ミルクなしで、朝の一杯に。",
      en: "For a light, tea-like cup. A morning coffee without milk.",
    },
    narrative: {
      ja: [
        "カハマルカ県サン・イグナシオ、チリノス、814軒の農家が集う生産者組合で、1995年からコーヒーをつくるミゲル・ラミレスさんが育てた有機のゲイシャ。",
        "標高1,731m、ウォッシュド、天日乾燥、フローラルで、みかんのようにやさしく、紅茶のように軽い。",
      ],
      en: [
        "An organic Geisha grown by Miguel Ramirez, farming since 1995, inside an 814-member cooperative in San Ignacio, Cajamarca.",
        "Grown at 1,731m, washed and sun-dried: floral, mikan-soft, tea-light.",
      ],
    },
    facts: {
      ja: [
        "組合は羊や牛の堆肥とコーヒーの果肉で有機肥料をつくり、加盟農家に無償で配っている。",
        "ミゲルさんは2019年、ボストンのSCAに組合代表として参加。自分の農園で若い生産者の研修も受け入れている。",
        "ゲイシャは、ミゲルさんにとって新しく植えた挑戦の品種。このロットは2025年11月に日本に入港。",
      ],
      en: [
        "The co-op makes compost from sheep and cattle manure and coffee pulp, and gives it to members free.",
        "Miguel represented the co-op at SCA Boston 2019 and trains young farmers on his own land.",
        "Geisha is his newest planting. This lot landed in Japan in November 2025.",
      ],
    },
    decaf: false,
    color: "#dce7d5",
    ink: "#77688f",
    photo: {
      src: "/producers/miguel.jpg",
      caption: {
        ja: "チリノス生産者組合のミゲル・ラミレスさん",
        en: "Miguel Ramirez of the Chirinos cooperative",
      },
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/48418096152765",
        sku: "SNB-PER-100",
        size: "100g",
        price: 2560,
      },
      {
        id: "gid://shopify/ProductVariant/48418096185533",
        sku: "SNB-PER-200",
        size: "200g",
        price: 4720,
      },
    ],
  },
  {
    handle: "snobi-ethiopia-guji",
    slug: "ethiopia-guji",
    country: "Ethiopia",
    title: {
      ja: "エチオピア グジ タデGG農園",
      en: "Ethiopia Guji Tade GG Farm",
    },
    region: {
      ja: "オロミア州グジ、シャキッソ村",
      en: "Shakiso, Guji, Oromia",
    },
    producer: {
      ja: "タデGG農園、タスファイ・ベケレさん",
      en: "Tade GG Farm, Tesfaye Bekele Degaga",
    },
    elevation: "1,800–2,200m",
    variety: {
      ja: "エチオピア在来種",
      en: "Ethiopian heirloom",
    },
    process: {
      ja: "ナチュラル・天日乾燥（アフリカンベッド、ハンドソート）",
      en: "Natural, sun-dried on African beds, hand-sorted",
    },
    roast: {
      ja: "浅煎り",
      en: "Light",
    },
    chips: {
      ja: ["浅煎り", "ナチュラル", "在来種", "1,800–2,200m"],
      en: ["Light roast", "Natural", "Heirloom", "1,800–2,200m"],
    },
    notes: {
      ja: ["ベリー", "ドライフルーツ", "甘さ"],
      en: ["Berries", "Dried fruit", "Sweetness"],
    },
    bestFor: {
      ja: "果実感と甘さをとりたい人へ。ベリーとドライフルーツ。",
      en: "For fruit and sweetness. Berries and dried fruit.",
    },
    narrative: {
      ja: [
        "オロミア州グジ、シャキッソ村、農学者でもあるタスファイ・ベケレさんのタデGG農園。",
        "標高1,800–2,200m、エチオピア在来種をナチュラルで、アフリカンベッドの上でゆっくり乾燥。",
      ],
      en: [
        "Tade GG Farm in Shakiso, Guji, Oromia, is run by agronomist Tesfaye Bekele.",
        "At 1,800–2,200m, Ethiopian heirloom coffee is naturally processed and slow-dried on raised African beds.",
      ],
    },
    facts: {
      ja: [
        "シャキッソはかつて山火事で森を失った村。タスファイさんはコーヒーで森と雇用を取り戻してきた。",
        "収穫した実は農園から約20kmの自社精選所へ。水槽で選別し、完熟の果実だけを手で選んで乾燥させる。",
        "ナチュラルとは、果肉をつけたまま乾燥させる方法。果実の甘さが豆に移る。",
      ],
      en: [
        "Shakiso once lost its forest to wildfire. Tesfaye has been bringing back trees and jobs through coffee.",
        "Cherries travel 20km to the farm’s own mill, are float-sorted, and only fully ripe fruit is hand-picked for drying.",
        "Natural means the fruit dries on the bean, and its sweetness stays.",
      ],
    },
    decaf: false,
    color: "#f8f3e4",
    ink: "#417fa3",
    photo: {
      src: "/producers/tesfaye.jpg",
      caption: {
        ja: "タデGG農園のタスファイ・ベケレさん",
        en: "Tesfaye Bekele of Tade GG Farm",
      },
    },
    variants: [
      {
        id: "gid://shopify/ProductVariant/48418099921085",
        sku: "SNB-ETH-100",
        size: "100g",
        price: 1605,
      },
      {
        id: "gid://shopify/ProductVariant/48418099953853",
        sku: "SNB-ETH-200",
        size: "200g",
        price: 2810,
      },
    ],
  },
  {
    handle: "snobi-colombia-huila",
    slug: "colombia-huila",
    country: "Colombia",
    title: {
      ja: "コロンビア ウィラ",
      en: "Colombia Huila",
    },
    region: {
      ja: "ウィラ県南部、ピタリート",
      en: "Pitalito, southern Huila",
    },
    producer: {
      ja: "ウィラ南部の複数農園（ASOBOMBO生産者協会）",
      en: "Small farms of the ASOBOMBO producer association",
    },
    elevation: "1,700m",
    variety: {
      ja: "カトゥーラ・コロンビア",
      en: "Caturra, Colombia",
    },
    process: {
      ja: "ウォッシュド・天日乾燥",
      en: "Washed, sun-dried",
    },
    roast: null,
    chips: {
      ja: ["ウォッシュド", "カトゥーラ・コロンビア種", "1,700m"],
      en: ["Washed", "Caturra / Colombia", "1,700m"],
    },
    notes: {
      ja: ["シトラス", "キャラメル", "バランス"],
      en: ["Citrus", "Caramel", "Balanced"],
    },
    bestFor: {
      ja: "毎日の一杯に。キャラメルとオレンジ、ちょうどいいバランス。",
      en: "For your everyday cup. Caramel and orange, in balance.",
    },
    narrative: {
      ja: [
        "ウィラ県南部、ピタリート、ASOBOMBO生産者協会に集う小さな農園の豆を、ひとつのロットに。",
        "標高1,700m、カトゥーラとコロンビア種、ウォッシュド、天日乾燥、シトラスの酸とキャラメルの甘さ。",
      ],
      en: [
        "Small farms of the ASOBOMBO association in Pitalito, southern Huila, are brought together in one lot.",
        "Grown at 1,700m, Caturra and Colombia varieties are washed and sun-dried: citrus brightness, caramel sweetness, balanced.",
      ],
    },
    facts: {
      ja: [
        "ウィラは昼夜の寒暖差が大きく、実が大きく熟しやすい。コロンビアでも屈指の産地。",
        "収穫は10月から12月。",
        "小さな農園たちの収穫を協会がまとめることで、有機のまま、安定した品質を保っている。",
      ],
      en: [
        "Huila’s wide day–night temperature swing makes for large, evenly ripening cherries.",
        "Harvest runs October–December.",
        "Pooling small farms through the association is how the lot stays organic and consistent year to year.",
      ],
    },
    decaf: false,
    color: "#f5d8c0",
    ink: "#80532d",
    photo: null,
    variants: [
      {
        id: "gid://shopify/ProductVariant/48418099986621",
        sku: "SNB-COL-100",
        size: "100g",
        price: 1410,
      },
      {
        id: "gid://shopify/ProductVariant/48418100019389",
        sku: "SNB-COL-200",
        size: "200g",
        price: 2420,
      },
    ],
  },
  {
    handle: "snobi-mexico-chiapas-decaf",
    slug: "mexico-chiapas-decaf",
    country: "Mexico",
    title: {
      ja: "メキシコ チアパス デカフェ",
      en: "Mexico Chiapas Decaf",
    },
    region: {
      ja: "チアパス州",
      en: "Chiapas",
    },
    producer: {
      ja: "グラポス農協（GRAPOS）の小規模生産者",
      en: "Smallholders of the GRAPOS cooperative",
    },
    elevation: "1,400–1,700m",
    variety: {
      ja: "ブルボン・ムンドノーボ・カトゥーラ",
      en: "Bourbon, Mundo Novo, Caturra",
    },
    process: {
      ja: "ウォッシュド → マウンテンウォーター製法（薬品不使用のデカフェ）",
      en: "Washed → Mountain Water Process (chemical-free decaf)",
    },
    roast: null,
    chips: {
      ja: ["デカフェ", "ウォッシュド", "マウンテンウォーター", "1,400–1,700m"],
      en: ["Decaf", "Washed", "Mountain Water", "1,400–1,700m"],
    },
    notes: {
      ja: ["スイートポテト", "黒糖", "やさしい酸味"],
      en: ["Sweet potato", "Brown sugar", "Gentle acidity"],
    },
    bestFor: {
      ja: "夜にも、もう一杯。スイートポテトの甘さ、そのまま。",
      en: "Another cup, even at night. The same sweet-potato sweetness.",
    },
    narrative: {
      ja: [
        "チアパス州、エル・トリウンフォ生物圏保護区のすぐそば、平均約3haの小さな農園を3,253軒が持ち寄るグラポス農協の豆。",
        "ブルボン、ムンドノーボ、カトゥーラ、薬品を使わないマウンテンウォーター製法で、カフェインは99.9%カット。",
      ],
      en: [
        "Beside the El Triunfo biosphere reserve in Chiapas, 3,253 smallholders of the GRAPOS co-op grow coffee on farms averaging 3ha.",
        "Bourbon, Mundo Novo and Caturra are decaffeinated by the chemical-free Mountain Water Process — 99.9% caffeine-free.",
      ],
    },
    facts: {
      ja: [
        "カフェインを抜くのは、メキシコ最高峰オリサバ山（5,636m）の氷河の水。薬品は使わない。",
        "農協の生産者の4人に1人が女性。",
        "収穫は11月から3月。それ以外の季節は、バナナやカカオ、ランブータンを育てている。",
      ],
      en: [
        "The caffeine is washed out with glacier water from Pico de Orizaba, Mexico’s highest peak (5,636m). No chemicals are used.",
        "One in four co-op growers is a woman.",
        "Harvest runs November–March. The rest of the year, the same families grow bananas, cacao and rambutan.",
      ],
    },
    decaf: true,
    color: "#f8e29b",
    ink: "#64502a",
    photo: null,
    variants: [
      {
        id: "gid://shopify/ProductVariant/48418100084925",
        sku: "SNB-MEX-100",
        size: "100g",
        price: 1610,
      },
      {
        id: "gid://shopify/ProductVariant/48418100117693",
        sku: "SNB-MEX-200",
        size: "200g",
        price: 2820,
      },
    ],
  },
];
export const minimumPrice = Math.min(
  ...products.flatMap((p) => p.variants.map((v) => v.price)),
);
export const yen = (value: number | string) =>
  `¥${Number(value).toLocaleString("ja-JP")}`;
export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc83irDFIv4XziLrsmpVrpq2wmypaNxnE58YKOg_aMH6fs-AA/viewform";
export const LEGAL_URL = "https://tokyocoffee.jp/pages/policy";

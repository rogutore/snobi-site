/* /v3 journal: the planned posts and the Roastery photo essay, kept once for the index and the post.
   Categories are the site plan's four (docs/site-plan.md §3, D1). Titles and captions are DRAFTS for the owner;
   captions say only what the frame shows (design/plan/PHOTO-INVENTORY.md). No roast date in any title. */
import { products } from "@/content/products";
import { originFrames } from "@/content/v2";

export const JOURNAL_CATEGORIES = ["産地", "抽出", "焙煎所", "お知らせ"] as const;
type Category = (typeof JOURNAL_CATEGORIES)[number];

export type PlannedPost = { href: string | null; status: string; category: Category; title: string; cover: string; alt: string };

export const ROASTERY_POST = { href: "/journal/roastery", category: "焙煎所", title: "生豆から、一杯まで。" } as const;

/* Mockup D's three bracketed rows, replaced: the Roastery essay (drafted) and two planned posts (v2 journal plan). */
export const PLANNED_POSTS: PlannedPost[] = [
  { ...ROASTERY_POST, status: "下書き", cover: "205", alt: "焙煎機から流れ出る焙煎豆" },
  { href: null, status: "準備中", category: "産地", title: "チリノスのミゲルさん", cover: "154", alt: "ペルーの袋を手に持つ" },
  { href: null, status: "準備中", category: "抽出", title: "一杯を、順番に。", cover: "166", alt: "挽いたコーヒー豆" },
];

/* The frame of roasted beans names its origin from originFrames, not a retyped title. */
function beansOf(frame: string): string {
  const p = products.find((x) => originFrames[x.slug]?.beans === frame);
  if (!p) throw new Error(`frame ${frame} is no origin's beans frame (content/v2.ts originFrames)`);
  return p.title.ja;
}

/* [frame, caption, alt] in the order of the work: green coffee → roasting → cooling → beans → cup. */
export const ROASTERY_STEPS: [string, string, string][] = [
  ["160", "生豆の麻袋が並ぶ棚", "生豆の麻袋が並ぶ棚"],
  ["161", "麻袋の有機JASマーク", "有機JASマークとMayacertの表示がある麻袋"],
  ["162", "生豆をすくう", "青いケースから生豆をすくう"],
  ["211", "焙煎中", "焙煎機を操作する人"],
  ["205", "焙煎機の扉から、豆が出てくる", "焙煎機の扉から流れ出る焙煎豆"],
  ["200", "冷却槽で、豆をかき混ぜて冷ます", "冷却槽で回る攪拌アーム"],
  ["152", `焙煎豆（${beansOf("152")}）`, "白い台の上の焙煎豆"],
  ["131", "サーバーから、グラスに注ぐ", "サーバーからグラスのマグに注ぐコーヒー。後ろに4つの袋"],
];

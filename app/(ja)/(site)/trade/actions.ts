"use server";
import { GOOGLE_FORM as G, tradeForm as F } from "@/content/trade";
import { MIN_FILL_MS, many, one, validate, type EnquiryState } from "@/lib/trade-enquiry";
import { PREFECTURES } from "@/content/prefectures";
import { products } from "@/content/products";

/* /trade enquiry → the existing Google Form (content/trade.ts explains why). Validation here is the real one; the client
   repeats it only to show errors without a round trip. Spam: a hidden field people never fill and a minimum fill time.
   A bot gets the same "done" answer as a person, and nothing is posted. */
function message(fd: FormData): string {
  const pref = one(fd, "pref");
  const status = one(fd, "status");
  const opening = one(fd, "opening");
  const coffees = many(fd, "coffee", products.map((p) => p.title.ja));
  const via = [one(fd, "refHost"), one(fd, "refUtm") && `utm_source=${one(fd, "refUtm")}`].filter(Boolean).join(" / ");
  const lines = [
    "SNöBI ホールセールフォーム（snobi.jp/trade）",
    PREFECTURES.includes(pref as (typeof PREFECTURES)[number]) && `都道府県：${pref}`,
    F.status.options.includes(status) && `営業状況：${status}${status === "開業準備中" && opening ? `（開業予定：${opening}）` : ""}`,
    one(fd, "url") && `お店のURL・Instagram：${one(fd, "url")}`,
    coffees.length > 0 && `気になる豆：${coffees.join("、")}`,
    via && `経由：${via}`,
    one(fd, "message") && `――\n${one(fd, "message")}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function sendEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  const email = one(fd, "email");
  const startedAt = Number(one(fd, "t"));
  if (one(fd, "website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) return { status: "done", email };

  const errors = validate(fd);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const body = new URLSearchParams();
  body.append(G.shop, one(fd, "shop"));
  body.append(G.name, one(fd, "name"));
  body.append(G.email, email);
  body.append(G.type, one(fd, "type"));
  for (const v of many(fd, "interest", F.interest.options)) body.append(G.interest, v);
  const usage = one(fd, "usage");
  if (F.usage.options.includes(usage)) body.append(G.usage, usage);
  if (one(fd, "tel")) body.append(G.tel, one(fd, "tel"));
  body.append(G.message, message(fd));

  try {
    const res = await fetch(G.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
      redirect: "manual",
    });
    if (res.status === 200) return { status: "done", email };
    console.error("trade enquiry: Google Form answered", res.status);
  } catch (err) {
    console.error("trade enquiry: Google Form unreachable", err instanceof Error ? err.message : "");
  }
  return { status: "failed", message: F.errors.send };
}

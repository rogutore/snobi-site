/* 特定商取引法に基づく表記 for snobi.jp — the one source for the on-site legal page and the contact page's company block.
   Base text: copied verbatim from https://tokyocoffee.jp/pages/policy (read 2026-10-08) — same seller (株式会社ローグトレード)
   and the same Shopify checkout. Rows marked `adjusted` differ from that page and need the owner's confirmation:
   - 商品の引渡し時期: SNöBI's schedule (content/ordering.ts, Davy 2026-10-08) instead of Tokyo Coffee's daily 14時 rule
   - お支払い方法 / 返品・交換: subscription (定期購入) clauses removed — SNöBI has no subscription
   - サービスの停止: typo 「普及」→「復旧」
   - サイト: names snobi.jp and the tokyocoffee.jp checkout
   - 商品以外の必要金額: 「3,000円以下」→「3,000円未満」 so it matches free shipping from ¥3,000 (owner 2026-10-09)
   - 代引き手数料: 「324円（5,000円以上は無料）」→「無料」 (owner 2026-10-11: "figure it out"). The checkout never charged it: all 8
     cash-on-delivery orders 2026-08-28..10-08 were charged exactly the order total, no fee line (VERIFIED, Shopify Admin read).
     Whether staff added it at Yamato is UNKNOWN → team question; tokyocoffee.jp/pages/policy still says 324円. */
import { orderingSchedule, FREE_SHIPPING_YEN, SHIPPING_YEN } from "./ordering";

export const company = {
  name: "株式会社ローグトレード",
  rep: "岸 誠",
  address: "東京都東久留米市滝山4−1−40",
  tel: "042-420-1882",
  email: "info@tokyocoffee.jp",
};

export type LegalRow = { k: string; v: string[]; adjusted?: boolean };

export const legalRows: LegalRow[] = [
  { k: "販売業者", v: [company.name] },
  { k: "代表者", v: [company.rep] },
  { k: "運営責任者", v: [company.rep] },
  { k: "所在地", v: [company.address] },
  { k: "連絡先", v: [`電話：${company.tel}`, `メール：${company.email}`] },
  { k: "サイト", v: ["SNöBI https://snobi.jp", "ご購入・お支払いは、東京コーヒー（https://tokyocoffee.jp）の決済ページで承ります。"], adjusted: true },
  { k: "販売価格", v: ["商品ページに税込価格で表示"] },
  { k: "販売数量", v: ["商品毎に限りがあります。"] },
  { k: "商品以外の必要金額", adjusted: true, v: [`${FREE_SHIPPING_YEN.toLocaleString("ja-JP")}円未満の場合：九州：${SHIPPING_YEN.kyushu}円、北海道・沖縄：${SHIPPING_YEN.hokkaidoOkinawa}円、その他：${SHIPPING_YEN.standard}円。離島の場合は送料別途お見積もり。`, "代引き手数料は無料です。", "銀行振込の際の手数料は購入者様でご負担ください。"] },
  { k: "お申込みの有効期限", v: ["ご注文後７日間。"] },
  { k: "お支払い方法", v: ["クレジットカード決済、代金引換、銀行振込。", "（ヤマトのカード決済は法人・業務用・卸にはご利用いただけません。）"], adjusted: true },
  { k: "お支払期限", v: ["クレジットカード決済：引き落し日。", "代金引換：商品受け取りの際に、お支払い料金を配達ドライバーに直接お支払い下さい。", "銀行振込：注文承諾メール到着後、7日間以内にお振込み下さい。7日経ってもご入金が確認できない場合は、誠に勝手ながらキャンセルとさせて頂きます。"] },
  { k: "商品の引渡し時期", v: orderingSchedule.ja, adjusted: true },
  { k: "お届け希望日", v: ["【九州・北海道・沖縄・離島】翌々日からのお届けが可能です。", "【北東北・中国・四国】翌日の12:00以降からのお届けが可能です。", "【その他の地域】翌日からのお届けが可能です。"] },
  { k: "返品・交換について", v: ["ご返品可能。万が一不良品や品違いであった場合は商品到着後７日以内にご連絡ください。送料着払いにてご返品後、良品と交換もしくは返金致します。"], adjusted: true },
  { k: "サービスの停止について", v: ["何らかの理由により、システムがダウンしサービスが利用できない場合があります。その際、システムの復旧にお時間をいただくことがございます。"], adjusted: true },
  { k: "その他販売条件について", v: ["特になし。"] },
];

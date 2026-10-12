import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { legalRows } from "@/content/legal";

/* 特定商取引法に基づく表記 — on snobi.jp itself (owner 2026-10-08: "not a link"). Rows come from content/legal.ts, whose
   base text is copied verbatim from tokyocoffee.jp/pages/policy; rows SNöBI had to adjust carry `adjusted` and are
   were listed for the owner (preview note removed at launch 2026-10-09; 代引き手数料 = Tokyo Coffee's text since 2026-10-12, see content/legal.ts). */
export const metadata = pageMeta({ path: "/legal", title: "特定商取引法に基づく表記", description: "SNöBI（株式会社ローグトレード）の特定商取引法に基づく表記。販売価格、送料、支払方法、引渡し時期、返品・交換について。" });

export default function Legal() {
  return (
    <section className="v3-sec v3-legal" aria-labelledby="lg-h1">
      <p className="eyebrow">Legal notice</p>
      <h1 id="lg-h1" className="v3-contact-h1" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>特定商取引法に基づく表記</h1>
      <dl className="v3-legal-table">
        {legalRows.map((r) => (
          <div key={r.k}>
            <dt>{r.k}</dt>
            <dd>{r.v.map((line) => <p key={line}>{line}</p>)}</dd>
          </div>
        ))}
      </dl>
      <p className="v3-legal-back"><Link href="/contact" className="v3-more">お問い合わせ →</Link></p>
    </section>
  );
}

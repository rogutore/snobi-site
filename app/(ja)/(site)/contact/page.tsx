import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { trade } from "@/content/trade";
import { FORM_URL } from "@/content/products";
import { company, legalRows } from "@/content/legal";
import { orderingSchedule, freeShippingLine } from "@/content/ordering";
import { Copy } from "@/components/v3/copy";

/* お問い合わせ — modeled on Daylight's support hub (support.daylightcomputer.com, read 2026-10-08): a warm one-line
   welcome, the direct channels up front, "check these first" answers, returns in their own block, the company and the
   legal notice last. Channels and company details come from content/legal.ts; answers from content/ordering.ts.
   New wording (the welcome line, the per-channel hints) is DRAFT for the owner. */
export const metadata = pageMeta({ path: "/contact", title: "お問い合わせ", description: "SNöBIへのお問い合わせ。メール、電話、フォーム、取扱店のご相談。運営は株式会社ローグトレード（東京コーヒー）。" });

const returns = legalRows.find((r) => r.k === "返品・交換について")!.v;

export default function Contact() {
  return (
    <>
      <section className="v3-sec v3-contact-head" aria-labelledby="ct-h1">
        <p className="eyebrow">Contact</p>
        <h1 id="ct-h1" className="v3-contact-h1">お問い合わせ</h1>
        <p className="v3-contact-lede">コーヒーのこと、ご注文のこと、なんでもどうぞ。</p>
      </section>

      <section className="v3-sec v3-contact-ways" aria-label="連絡方法" style={{ paddingTop: 0 }}>
        <div className="way">
          <p className="eyebrow">Email</p>
          <h2>メール</h2>
          <p className="big"><a href={`mailto:${company.email}`}>{company.email}</a></p>
          <p className="hint">ご注文についてのご連絡は、注文番号を添えてください。</p>
          <Copy text={company.email} label="アドレスをコピー" />
        </div>
        <div className="way">
          <p className="eyebrow">Phone</p>
          <h2>電話</h2>
          <p className="big"><a href={`tel:${company.tel.replace(/-/g, "")}`}>{company.tel}</a></p>
          <p className="hint">東京コーヒー（株式会社ローグトレード）がお受けします。</p>
          <Copy text={company.tel} label="番号をコピー" />
        </div>
        <div className="way">
          <p className="eyebrow">Form</p>
          <h2>フォーム</h2>
          <p className="big"><a href={FORM_URL}>発売案内・お問い合わせ ↗</a></p>
          <p className="hint">新しい産地の発売案内も、こちらから受け取れます。</p>
        </div>
        <div className="way trade">
          <p className="eyebrow">For cafés &amp; retailers</p>
          <h2>お店で扱いたい方</h2>
          <p className="big"><Link href="/trade">取扱店のご相談 →</Link></p>
          <p className="hint">{trade.contactHint}</p>
        </div>
      </section>

      <section className="v3-sec v3-alt" aria-labelledby="ct-first">
        <div className="v3-contact-first">
          <div>
            <p className="eyebrow">Before you write</p>
            <h2 id="ct-first" className="v3-def-h">よくあるご質問</h2>
            <Link href="/faq" className="v3-more">すべての質問を見る →</Link>
          </div>
          <dl>
            <div><dt>いつ届く？</dt><dd>{orderingSchedule.ja.join("")}本州であれば翌日配達。</dd></div>
            <div><dt>送料は？</dt><dd>{freeShippingLine.ja}。未満の場合は通常¥500、九州¥700、北海道・沖縄¥800。離島は別途お見積りとなります。</dd></div>
            <div><dt>どこで決済するの？</dt><dd>決済はTokyo Coffeeが承ります。選んだ豆とサイズを引き継いで、Tokyo Coffeeの決済ページに進みます。</dd></div>
          </dl>
        </div>
      </section>

      <section className="v3-sec v3-contact-first" aria-labelledby="ct-ret">
        <div>
          <p className="eyebrow">Returns</p>
          <h2 id="ct-ret" className="v3-def-h">返品・交換</h2>
        </div>
        <div className="txt">{returns.map((t) => <p key={t}>{t}</p>)}<p><Link href="/legal" className="v3-more">特定商取引法に基づく表記 →</Link></p></div>
      </section>

      <section className="v3-sec v3-alt v3-contact-co" aria-labelledby="ct-co">
        <p className="eyebrow">Company</p>
        <h2 id="ct-co" className="v3-def-h">運営会社</h2>
        <dl>
          <div><dt>会社名</dt><dd>{company.name}</dd></div>
          <div><dt>所在地</dt><dd>{company.address}</dd></div>
          <div><dt>電話</dt><dd>{company.tel}</dd></div>
          <div><dt>メール</dt><dd>{company.email}</dd></div>
        </dl>
        <p><Link href="/legal" className="v3-more">特定商取引法に基づく表記 →</Link></p>
      </section>
    </>
  );
}

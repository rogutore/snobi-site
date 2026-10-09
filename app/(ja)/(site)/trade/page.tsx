import Link from "next/link";
import { products } from "@/content/products";
import { company } from "@/content/legal";
import { trade } from "@/content/trade";
import { TradeForm } from "@/components/v3/pages/trade-form";
import { Photo } from "@/components/v2/photo";
import { pageMeta, JsonLd, faqPage, breadcrumb } from "@/lib/seo";

/* 取扱店 (owner 2026-10-09): the "最初の25店舗" offer is gone; the page asks for enquiries and promises nothing we have not
   decided. Copy: content/trade.ts (synthesis of LIGHT UP, ONIBUS, Kurasu, La Cabra, Onyx + Tokyo Coffee wholesale facts).
   Coffee rows render from products.ts; the phone/mail line from legal.ts. Hand-off frame 049 (PHOTO-INVENTORY §7).
   The enquiry form is on the page (owner 2026-10-09) and posts into the existing Google Form: components/v3/pages/trade-form.tsx. */
export const metadata = pageMeta({ path: "/trade", en: "/en/trade", title: trade.title, description: trade.description, image: "/v2/photos/049-l.webp" });

export default function Trade() {
  return (
    <>
      <JsonLd data={[faqPage(trade.faq), breadcrumb([["ホーム", "/"], ["取扱店", "/trade"]])]} />
      <section className="v3-trade-hero" aria-labelledby="tr-h1">
        <div className="copy">
          <p className="eyebrow" lang="en">{trade.eyebrow}</p>
          <h1 id="tr-h1">{trade.h1}</h1>
          <p className="lead">{trade.lead}</p>
          <p className="sub">{trade.sub}</p>
          <a className="v3-btn" href="#enquiry">{trade.cta}</a>
        </div>
        <Photo className="ph" id="049" alt="SNöBIの袋を手渡す" sizes="(min-width:860px) 44vw, 100vw" priority />
      </section>

      <section className="v3-sec v3-alt v3-trade-coffees" aria-labelledby="tr-coffees">
        <h2 id="tr-coffees" className="v3-def-h">{trade.coffeesH2}</h2>
        <ul>
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/origins/${p.slug}`}>
                <b>{p.title.ja}</b>
                <span>{p.process.ja} · {p.elevation}</span>
                <span className="n">{p.notes.ja.join(" / ")}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="line">{trade.coffeesLine}</p>
      </section>

      <section className="v3-sec v3-trade-facts" aria-labelledby="tr-facts">
        <h2 id="tr-facts" className="v3-def-h">{trade.factsH2}</h2>
        <dl>{trade.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      <section className="v3-sec v3-alt v3-trade-who" aria-labelledby="tr-who">
        <h2 id="tr-who" className="v3-def-h">{trade.whoH2}</h2>
        <p>{trade.who}</p>
      </section>

      <section className="v3-sec v3-trade-steps" aria-labelledby="tr-steps">
        <h2 id="tr-steps" className="v3-def-h">{trade.stepsH2}</h2>
        <ol>{trade.steps.map(([h, t], i) => <li key={h}><span className="no">{String(i + 1).padStart(2, "0")}</span><b>{h}</b><p>{t}</p></li>)}</ol>
      </section>

      <section className="v3-sec v3-alt v3-trade-faq" aria-labelledby="tr-faq">
        <h2 id="tr-faq" className="v3-def-h">{trade.faqH2}</h2>
        <dl>{trade.faq.map((x) => <div key={x.q}><dt>{x.q}</dt><dd>{x.a}</dd></div>)}</dl>
      </section>

      <section id="enquiry" className="v3-sec v3-trade-enquiry" aria-labelledby="tr-enq">
        <div className="aside">
          <p className="eyebrow" lang="en">{trade.enquiryEyebrow}</p>
          <h2 id="tr-enq" className="v3-def-h">{trade.enquiryH2.replace("、", "、\n")}</h2>
          <p>{trade.enquiry}</p>
          <p className="contact">お電話・メールでも承ります。<br />{company.tel} · {company.email}<br />（{company.name}）</p>
          <p className="closing">{trade.closing}</p>
        </div>
        <TradeForm coffees={products.map((p) => ({ name: p.title.ja, detail: `${p.process.ja} · ${p.elevation}` }))} />
      </section>
    </>
  );
}

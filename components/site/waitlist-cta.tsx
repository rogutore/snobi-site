"use client";

import { Reveal } from "@/components/motion/reveal";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc83irDFIv4XziLrsmpVrpq2wmypaNxnE58YKOg_aMH6fs-AA/viewform";

/* CAFERES 2026 trade capture — links to the Google Form (single source of leads). */
export function WaitlistCTA() {
  return (
    <section
      id="join"
      className="bg-paper px-6 py-28 text-center lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="spec text-[0.7rem] uppercase tracking-widest text-plum/50">
            For caf&eacute;s, retailers &amp; the curious
          </p>
          <h2 className="display mt-4 text-[clamp(2.5rem,7vw,6rem)] leading-[1.04] text-plum">
            Try it first.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-plum lg:text-xl">
            カフェ・小売・卸売事業者様へ ―
            発売前サンプルと先行卸価格のご案内
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            現在サンプルロースティングとカッピングを進行中。
            ご登録いただいた方から順に、サンプルと発売時期をご案内します。
            一般のお客様の先行予約登録もこちらから。
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 flex max-w-lg flex-col items-center gap-4">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-plum px-10 py-4 text-base font-medium tracking-tight text-paper shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              登録フォームへ →
            </a>
            <p className="spec text-[0.7rem] text-plum/45">
              約1分で完了 / No spam. Just the launch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

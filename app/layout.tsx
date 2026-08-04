import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

/* Small technical labels / eyebrows = Geist Mono (free). Display + body come
   from the Adobe Fonts kit below. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /* Required for canonical/hreflang to emit absolute URLs — Google ignores
     relative hreflang values, which would silently void the ja/en pairing. */
  metadataBase: new URL("https://snobi.jp"),
  title: "Snobi — Organic. And actually specialty.",
  description:
    "Organic × Specialty × Japan。東京コーヒー発のオーガニック・スペシャルティライン。Est. 2026.",
  alternates: {
    canonical: "/",
    languages: { ja: "/", en: "/en" },
  },
  openGraph: {
    title: "Snobi — Organic. And actually specialty.",
    description:
      "Organic × Specialty × Japan — from the Tokyo Coffee family. Est. 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Adobe Fonts web project "Snobi" (kit xkh1hrz). The project is set to
            Dynamic embed, so the static .css endpoint 412s — load the faces via
            Adobe's async JS loader instead. Text renders in the fallback stack
            immediately and the web faces swap in on load (FOUT, never hidden). */}
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(d){var config={kitId:"xkh1hrz",scriptTimeout:3000,async:true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src="https://use.typekit.net/"+config.kitId+".js";tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);',
          }}
        />
        {/* NO webfont fallback by design. Zen Kaku Gothic Antique used to sit
            here as the JP fallback, but it also carries LATIN glyphs and loaded
            far faster than Adobe's JS-gated faces — so every visitor saw Latin
            body copy in a gothic sans before it snapped to Maiola. The fallback
            is now Georgia for Latin (instant, serif, close to Maiola) and the
            system JP face for Japanese (instant, no download). */}
      </head>
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}

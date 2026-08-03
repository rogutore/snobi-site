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
  title: "Snobi — Organic. And actually specialty.",
  description:
    "An organic specialty roaster from the Tokyo Coffee family. Launching soon.",
  openGraph: {
    title: "Snobi — Organic. And actually specialty.",
    description:
      "An organic specialty roaster from the Tokyo Coffee family. Launching soon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
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
        {/* Japanese fallback face — Zen Kaku Gothic Antique (Google Fonts), used
            if the Adobe JS never loads so JP still renders in a proper gothic. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@400;500;700&display=swap"
        />
      </head>
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}

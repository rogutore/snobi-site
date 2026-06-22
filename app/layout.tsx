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
        {/* Adobe Fonts kit — fisterra-morte (display/wordmark) + maiola (body) */}
        <link rel="stylesheet" href="https://use.typekit.net/xkh1hrz.css" />
        {/* Japanese face — Zen Kaku Gothic Antique (Google Fonts) */}
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

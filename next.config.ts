import type { NextConfig } from "next";
import { SITE_HOST } from "./lib/site-host";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  // Allow loading the dev JS bundles when visiting via these hosts (not just
  // localhost) — otherwise scripts are blocked and the page renders blank.
  allowedDevOrigins: ["127.0.0.1", "10.0.0.70"],
  // www serves a duplicate of the site; send it to the one indexed host. Two
  // rules because OpenNext leaves an empty `:path*` unsubstituted on "/".
  redirects: async () => {
    const www = [{ type: "host" as const, value: `www.${SITE_HOST}` }];
    // The /v3 preview became the site on 2026-10-09: send its page URLs (never its media under /v3/*.mp4|webp|jpg)
    // to the real routes.
    const v3 = [
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v3/:page(coffee|origins|about|faq|journal|specialty|contact|legal)", destination: "/:page", permanent: true },
      { source: "/v3/:page(origins|journal)/:slug", destination: "/:page/:slug", permanent: true },
    ];
    return [
      ...v3,
      {
        source: "/",
        has: www,
        destination: `https://${SITE_HOST}/`,
        permanent: true,
      },
      {
        source: "/:path+",
        has: www,
        destination: `https://${SITE_HOST}/:path+`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

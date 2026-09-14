import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// Admin credentials never enter Next.js imports or environment files.
export async function connectAdmin() {
  const source = readFileSync(
    join(homedir(), "Documents/RTU/_secrets/shopify-snobi.env"),
    "utf8",
  );
  const env = Object.fromEntries(
    source
      .split(/\r?\n/)
      .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=");
        return [
          l.slice(0, i).trim(),
          l
            .slice(i + 1)
            .trim()
            .replace(/^['"]|['"]$/g, ""),
        ];
      }),
  );
  const shop = env.SHOPIFY_SHOP;
  if (shop !== "tokyocoffeejp.myshopify.com")
    throw new Error("Unexpected Shopify shop");
  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: env.SHOPIFY_CLIENT_ID,
      client_secret: env.SHOPIFY_CLIENT_SECRET,
    }),
  });
  if (!response.ok)
    throw new Error(`Admin authentication failed: ${response.status}`);
  const auth = await response.json();
  async function query<T = Record<string, unknown>>(
    query: string,
    variables: Record<string, unknown> = {},
  ): Promise<T> {
    const result = await fetch(
      `https://${shop}/admin/api/2026-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": auth.access_token,
        },
        body: JSON.stringify({ query, variables }),
      },
    );
    const json = await result.json();
    if (!result.ok || json.errors)
      throw new Error(JSON.stringify(json.errors || { status: result.status }));
    for (const [operation, payload] of Object.entries(json.data)) {
      const errors = (payload as { userErrors?: unknown[] })?.userErrors;
      if (errors?.length)
        throw new Error(`${operation}: ${JSON.stringify(errors)}`);
    }
    return json.data as T;
  }
  return { shop, query };
}

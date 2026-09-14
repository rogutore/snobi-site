import { spawnSync } from "node:child_process";
import { connectAdmin } from "./shopify-admin";

async function main() {
  const check = spawnSync("npx", ["--yes", "vercel", "project", "inspect"], {
    encoding: "utf8",
  });
  if (
    check.status !== 0 ||
    !`${check.stdout}${check.stderr}`.includes(
      "prj_RE8NnJt7GjZ5juLnjmxIjw55AZ5j",
    )
  )
    throw new Error("Link the existing snobi-site Vercel project first.");
  const { shop, query } = await connectAdmin();
  type Token = {
    id: string;
    title: string;
    accessToken: string;
    accessScopes: { handle: string }[];
  };
  const existing = await query<{
    shop: { storefrontAccessTokens: { nodes: Token[] } };
  }>(
    "{ shop { storefrontAccessTokens(first:100) { nodes { id title accessToken accessScopes { handle } } } } }",
  );
  let token = existing.shop.storefrontAccessTokens.nodes.find(
    (t) => t.title === "snobi.jp",
  );
  if (!token) {
    const created = await query<{
      storefrontAccessTokenCreate: { storefrontAccessToken: Token };
    }>(
      'mutation { storefrontAccessTokenCreate(input:{title:"snobi.jp"}) { storefrontAccessToken { id title accessToken accessScopes { handle } } userErrors { field message } } }',
    );
    token = created.storefrontAccessTokenCreate.storefrontAccessToken;
    console.log("Created Storefront token snobi.jp (value redacted)");
  }
  const scopes = token.accessScopes.map((s) => s.handle);
  for (const s of [
    "unauthenticated_read_product_listings",
    "unauthenticated_read_product_inventory",
    "unauthenticated_write_checkouts",
  ])
    if (!scopes.includes(s))
      throw new Error(`Missing Storefront token scope: ${s}`);
  console.log("Storefront scopes:", scopes.join(", "));
  for (const [name, value] of Object.entries({
    SHOPIFY_STORE_DOMAIN: shop,
    SHOPIFY_STOREFRONT_TOKEN: token.accessToken,
  })) {
    const child = spawnSync(
      "npx",
      ["--yes", "vercel", "env", "add", name, "preview", "--yes"],
      { input: value, encoding: "utf8" },
    );
    if (child.status !== 0)
      throw new Error(
        `Preview env add failed for ${name}: ${child.stderr.replaceAll(token.accessToken, "[redacted]")}`,
      );
    console.log(`Configured ${name} in Vercel Preview only`);
  }
  console.log(
    JSON.stringify(
      await query(
        "{ publications(first:50) { nodes { id name app { id title } } } }",
      ),
      null,
      2,
    ),
  );
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});

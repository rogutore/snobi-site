import { spawn } from "node:child_process";
import { connectAdmin } from "./shopify-admin";
async function main() {
  const { shop, query } = await connectAdmin();
  const data = await query<{
    shop: {
      storefrontAccessTokens: {
        nodes: { title: string; accessToken: string }[];
      };
    };
  }>("{shop{storefrontAccessTokens(first:100){nodes{title accessToken}}}}");
  const token = data.shop.storefrontAccessTokens.nodes.find(
    (t) => t.title === "snobi.jp",
  )?.accessToken;
  if (!token) throw new Error("snobi.jp Storefront token missing");
  const [command, ...args] = process.argv
    .slice(2)
    .filter((v, i) => !(i === 0 && v === "--"));
  if (!command)
    throw new Error("Pass a command to run with the Storefront environment");
  const child = spawn(command, args, {
    stdio: "inherit",
    env: {
      ...process.env,
      SHOPIFY_STORE_DOMAIN: shop,
      SHOPIFY_STOREFRONT_TOKEN: token,
      SHOPIFY_API_VERSION: "2026-07",
    },
  });
  child.on("exit", (code) => {
    process.exitCode = code ?? 1;
  });
}
main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});

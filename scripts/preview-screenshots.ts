import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { products } from "../content/products";
async function readyImages(page: import("@playwright/test").Page) {
  await page.locator("img").evaluateAll((images) =>
    images.forEach((img) => {
      (img as HTMLImageElement).loading = "eager";
    }),
  );
  await page.waitForFunction(
    () =>
      [...document.images].every((img) => img.complete && img.naturalWidth > 0),
    undefined,
    { timeout: 20000 },
  );
  await page.evaluate(() => document.fonts.ready);
}
async function main() {
  const base = process.env.PREVIEW_URL || "http://localhost:3108";
  const dir = process.env.SCREENSHOT_DIR || "artifacts/hybrid/screenshots";
  mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    if (process.env.PREVIEW_ACCESS_URL)
      await page.goto(process.env.PREVIEW_ACCESS_URL, {
        waitUntil: "domcontentloaded",
      });
    for (const lang of ["ja", "en"])
      for (const width of [390, 1440]) {
        await page.setViewportSize({
          width,
          height: width === 390 ? 844 : 1000,
        });
        await page.goto(base + (lang === "en" ? "/en/" : "/"), {
          waitUntil: "domcontentloaded",
        });
        await readyImages(page);
        await page.screenshot({ path: `${dir}/${lang}-hero-${width}.png` });
        await page.screenshot({
          path: `${dir}/${lang}-full-${width}.png`,
          fullPage: true,
        });
        const sections = page.locator("main > section");
        for (let i = 0; i < (await sections.count()); i++) {
          const s = sections.nth(i);
          await s.scrollIntoViewIfNeeded();
          await s.screenshot({
            style: ".commerce-nav { visibility: hidden !important; }",
            path: `${dir}/${lang}-${(await s.getAttribute("id")) || "trade"}-${width}.png`,
          });
        }
        await page
          .locator("main + footer")
          .screenshot({ path: `${dir}/${lang}-footer-${width}.png` });
        for (const p of products) {
          await page.goto(
            `${base}${lang === "en" ? "/en" : ""}/origins/${p.slug}`,
            { waitUntil: "domcontentloaded" },
          );
          await readyImages(page);
          await page.screenshot({
            path: `${dir}/${lang}-origin-${p.slug}-${width}.png`,
            fullPage: true,
          });
        }
        await page.goto(base + (lang === "en" ? "/en/" : "/"), {
          waitUntil: "domcontentloaded",
        });
        await page
          .locator("#origin-colombia-huila")
          .getByRole("button", {
            name: lang === "en" ? /Add to cart/ : /カートに入れる/,
          })
          .click();
        await page
          .locator(".subtotal strong")
          .filter({ hasText: "¥1,410" })
          .waitFor({ timeout: 20000 });
        await page.locator(".cart-status").waitFor({ state: "detached" });
        await page.locator("a.checkout-button").waitFor({ state: "visible" });
        await readyImages(page);
        await page
          .getByRole("dialog")
          .screenshot({ path: `${dir}/${lang}-cart-${width}.png` });
        await page
          .locator(".cart-line")
          .getByRole("button", {
            name: lang === "en" ? "Remove" : "削除",
            exact: true,
          })
          .click();
        await page
          .locator(".cart-line")
          .waitFor({ state: "detached", timeout: 20000 });
        console.log(lang, width, "screenshots captured");
      }
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

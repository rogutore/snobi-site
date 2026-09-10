import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
async function main() {
  const base = process.env.PREVIEW_URL || "http://localhost:3107";
  const dir = process.env.SCREENSHOT_DIR || "artifacts/preview";
  mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const v of ["a", "b"])
    for (const cards of [1, 2, 3]) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${base}/?v=${v}&cards=${cards}`, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${dir}/${v}${cards}-hero-390.png` });
      await page.locator("#shop").scrollIntoViewIfNeeded();
      await page.locator(".coffee-card").first().scrollIntoViewIfNeeded();
      await page.setViewportSize({ width: 390, height: 1000 });
      await page
        .locator(".coffee-card")
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
      await page.screenshot({ path: `${dir}/${v}${cards}-card-390.png` });
      const width = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
      }));
      console.log(
        v,
        cards,
        "overflow:",
        width.document > width.viewport,
        "cards:",
        await page.locator(".coffee-card").count(),
      );
      if (width.document > width.viewport)
        throw new Error(`Horizontal overflow ${v}${cards}`);
      if (v === "a" && cards === 1) {
        for (const selector of [
          "#bag",
          "#story",
          "#road",
          "#faq",
          ".trade-cta",
          "#join",
          "main + footer",
        ]) {
          await page.locator(selector).scrollIntoViewIfNeeded();
          await page
            .locator(selector)
            .screenshot({
              path: `${dir}/a1-${selector.replace(/[#.]/g, "")}-390.png`,
            });
        }
      }
    }
  await page.goto(`${base}/?v=b&cards=1`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${dir}/b1-full-390.png`, fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const v of ["a", "b"]) {
    await page.goto(`${base}/?v=${v}&cards=1`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${dir}/${v}1-hero-desktop.png` });
    await page
      .locator("#shop")
      .screenshot({ path: `${dir}/${v}1-shop-desktop.png` });
  }
  await browser.close();
  console.log("Page errors:", errors);
  if (errors.length) process.exitCode = 1;
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

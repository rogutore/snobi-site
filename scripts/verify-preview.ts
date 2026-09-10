import { chromium, expect } from "@playwright/test";
async function main() {
  const base = process.env.PREVIEW_URL || "http://localhost:3108";
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const lang of ["ja", "en"]) {
    const root = lang === "ja" ? "" : "/en";
    for (const v of ["a", "b"])
      for (const cards of [1, 2, 3]) {
        const response = await page.goto(
          `${base}${root}/?v=${v}&cards=${cards}`,
          { waitUntil: "networkidle" },
        );
        expect(response?.status()).toBe(200);
        const html = await response!.text();
        expect(html).toMatch(new RegExp(`<html[^>]*lang="${lang}"`));
        expect(html).toContain(`data-variant="${v}"`);
        expect(html).toContain(`data-cards="${cards}"`);
        await expect(page.locator(".coffee-card")).toHaveCount(4);
        await expect(page.locator("#join")).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.getByRole("button", { name: /^Cart \(/ }).click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).not.toBeVisible();
      }
    for (const slug of [
      "peru",
      "colombia-huila",
      "ethiopia-guji",
      "mexico-chiapas-decaf",
    ]) {
      const response = await page.goto(`${base}${root}/origins/${slug}`, {
        waitUntil: "networkidle",
      });
      expect(response?.status()).toBe(200);
      expect(await response!.text()).toMatch(
        new RegExp(`<html[^>]*lang="${lang}"`),
      );
      const schema = JSON.parse(
        (await page
          .locator('script[type="application/ld+json"]')
          .textContent()) || "{}",
      );
      expect(schema["@type"]).toBe("Product");
      expect(schema.aggregateRating).toBeUndefined();
      if (process.env.VERIFY_CART === "true") {
        expect(schema.offers).toHaveLength(2);
        for (const offer of schema.offers)
          expect(offer.priceCurrency).toBe("JPY");
      }
    }
    await page.goto(`${base}${root}/trade`);
    const form = page.locator('a[href*="entry.1093102172"]');
    await expect(form).toHaveCount(1);
    expect(await form.getAttribute("href")).toContain("entry.631131549=");
  }
  const fallback = await page.goto(`${base}/?v=nonsense&cards=0`);
  expect(await fallback!.text()).toContain('data-variant="a"');
  expect(await fallback!.text()).toContain('data-cards="1"');
  expect((await page.goto(`${base}/origins/not-a-coffee`))?.status()).toBe(404);
  if (process.env.VERIFY_CART === "true") {
    await page.goto(`${base}/?v=b&cards=1`, { waitUntil: "networkidle" });
    let subtotal = 0;
    const coffees = [
      ["peru", 1600, 2800],
      ["colombia-huila", 1600, 2800],
      ["ethiopia-guji", 2000, 3600],
      ["mexico-chiapas-decaf", 1700, 3000],
    ] as const;
    for (const [slug, small, large] of coffees) {
      for (const [size, price] of [
        ["100g", small],
        ["200g", large],
      ] as const) {
        const card = page.locator(`#origin-${slug}`);
        await card.getByRole("radio", { name: size, exact: true }).check();
        await expect(card.locator(".coffee-price")).toContainText(
          `¥${price.toLocaleString("ja-JP")}`,
        );
        await card.getByRole("button", { name: /カートに入れる/ }).click();
        subtotal += price;
        await expect(
          page.getByRole("dialog").locator(".subtotal strong"),
        ).toHaveText(`¥${subtotal.toLocaleString("ja-JP")}`, {
          timeout: 20000,
        });
        await page
          .getByRole("button", { name: "カートを閉じる", exact: true })
          .click();
      }
    }
    await page.getByRole("button", { name: "Cart (8)", exact: true }).click();
    await expect(page.locator(".cart-line")).toHaveCount(8);
    const cookie = (await context.cookies()).find(
      (c) => c.name === "snobi_cart",
    );
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe("Lax");
    await page.reload({ waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Cart (8)", exact: true }).click();
    await expect(page.locator(".cart-line")).toHaveCount(8);
    await page
      .locator(".cart-line")
      .first()
      .getByRole("button", { name: /数量を増やす/ })
      .click();
    await expect(page.locator(".subtotal strong")).toHaveText("¥20,700", {
      timeout: 20000,
    });
    await page
      .locator(".cart-line")
      .first()
      .getByRole("button", { name: /数量を減らす/ })
      .click();
    await expect(page.locator(".subtotal strong")).toHaveText("¥19,100", {
      timeout: 20000,
    });
    const checkout = await page
      .locator(".checkout-button")
      .getAttribute("href");
    expect(new URL(checkout!).hostname).toBe("tokyocoffee.jp");
    expect(new URL(checkout!).searchParams.get("locale")).toBe("ja");
    while (await page.locator(".cart-line").count()) {
      const count = await page.locator(".cart-line").count();
      await page
        .locator(".cart-line")
        .first()
        .getByRole("button", { name: "削除", exact: true })
        .click();
      await expect(page.locator(".cart-line")).toHaveCount(count - 1, {
        timeout: 20000,
      });
    }
    console.log(
      "PASS: all 8 variants, prices, persistence, quantities, removal and checkout URL",
    );
  } else
    console.log(
      "NOT RUN: live cart and complete Product offers require the approved Shopify publication",
    );
  expect(errors).toEqual([]);
  await browser.close();
  console.log(
    "PASS: 12 mobile JA/EN combinations, server-rendered locale/selection, 8 origin routes, trade prefill, drawer dismissal, invalid-route fallback",
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

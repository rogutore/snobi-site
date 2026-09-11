import { chromium, expect } from "@playwright/test";
import { products, yen } from "../content/products";
async function main() {
  const base = process.env.PREVIEW_URL || "http://localhost:3108";
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    if (process.env.PREVIEW_ACCESS_URL)
      await page.goto(process.env.PREVIEW_ACCESS_URL, {
        waitUntil: "domcontentloaded",
      });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const lang of ["ja", "en"]) {
      const root = lang === "ja" ? "" : "/en";
      const response = await page.goto(base + root + "/", {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status()).toBe(200);
      expect(await response!.text()).toMatch(
        new RegExp(`<html[^>]*lang="${lang}"`),
      );
      await expect(page.locator('main[data-layout="hybrid"]')).toBeVisible();
      await expect(page.locator(".coffee-grid .coffee-card")).toHaveCount(4);
      await expect(page.locator("#join")).toHaveCount(0);
      expect(
        await page
          .locator("main > section")
          .evaluateAll((nodes) => nodes.map((n) => n.id || n.className)),
      ).toEqual([
        "top",
        "statement",
        "shop",
        "receipts",
        "story",
        "faq",
        "road",
        "trade-cta",
      ]);
      for (let i = 0; i < products.length; i++)
        expect(
          await page
            .locator(".coffee-grid .coffee-card")
            .nth(i)
            .getAttribute("id"),
        ).toBe("origin-" + products[i].slug);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const cta = await page
        .locator(".hero-buy .commerce-button")
        .boundingBox();
      expect(cta!.y + cta!.height).toBeLessThanOrEqual(844);
      expect(
        (await page.locator("#statement").boundingBox())!.height,
      ).toBeLessThanOrEqual(422);
      expect(
        (await page.locator("#story").boundingBox())!.height,
      ).toBeLessThanOrEqual(844);
      await expect(page.locator("#receipts dl > div")).toHaveCount(3);
      await expect(page.locator("#faq details")).toHaveCount(8);
      await expect(page.locator("#faq summary").nth(1)).toContainText(
        lang === "ja" ? "どこで決済するの？" : "Where do I pay?",
      );
      expect(await page.locator("main").innerText()).not.toMatch(
        /カップスコア|生産者への支払額|Cup score|Producer payment|Coming Soon|2袋で送料無料/,
      );
      await page.getByRole("button", { name: /^Cart \(/ }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).not.toBeVisible();
      for (const p of products) {
        const r = await page.goto(
          `${base}${root}/origins/${p.slug}?size=200g`,
          { waitUntil: "domcontentloaded" },
        );
        expect(r?.status()).toBe(200);
        await expect(page.locator(".origin-three li")).toHaveCount(3);
        await expect(page.locator(".origin-narrative p")).toHaveCount(2);
        await expect(
          page.getByRole("radio", { name: "200g", exact: true }),
        ).toBeChecked();
        expect(await page.locator(".origin-spec").innerText()).not.toMatch(
          /スコア|支払|score|payment/i,
        );
        if (p.slug === "colombia-huila")
          expect(await page.locator(".coffee-chips").innerText()).not.toMatch(
            /中煎り|Medium/i,
          );
        const schema = JSON.parse(
          (await page
            .locator('script[type="application/ld+json"]')
            .textContent())!,
        );
        expect(schema["@type"]).toBe("ProductGroup");
        expect(schema.hasVariant).toHaveLength(2);
        for (const [i, v] of p.variants.entries()) {
          expect(schema.hasVariant[i].sku).toBe(v.sku);
          expect(schema.hasVariant[i].offers.priceCurrency).toBe("JPY");
          expect(Number(schema.hasVariant[i].offers.price)).toBe(v.price);
          expect(schema.hasVariant[i].offers.url).toContain("?size=" + v.size);
        }
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      await page.goto(`${base}${root}/trade`);
      await expect(page.locator('a[href*="entry.1093102172"]')).toHaveCount(1);
    }
    await page.goto(base + "/?v=a&cards=3");
    await expect(page.locator('main[data-layout="hybrid"]')).toBeVisible();
    await expect(page.locator(".treatment-2,.treatment-3")).toHaveCount(0);
    expect((await page.goto(base + "/origins/not-a-coffee"))?.status()).toBe(
      404,
    );
    if (process.env.VERIFY_CART === "true") {
      await page.goto(base + "/", { waitUntil: "domcontentloaded" });
      let subtotal = 0;
      for (const p of products) {
        for (const v of p.variants) {
          const card = page.locator("#origin-" + p.slug);
          await card.getByRole("radio", { name: v.size, exact: true }).check();
          await expect(card.locator(".coffee-price")).toContainText(
            yen(v.price),
          );
          await card.getByRole("button", { name: /カートに入れる/ }).click();
          subtotal += v.price;
          await expect(page.locator(".subtotal strong")).toHaveText(
            yen(subtotal),
            { timeout: 20000 },
          );
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
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.getByRole("button", { name: "Cart (8)", exact: true }).click();
      await expect(page.locator(".cart-line")).toHaveCount(8);
      await page
        .locator(".cart-line")
        .filter({ hasText: products[0].title.ja })
        .filter({ hasText: "100g" })
        .getByRole("button", { name: /数量を増やす/ })
        .click();
      await expect(page.locator(".subtotal strong")).toHaveText(
        yen(subtotal + products[0].variants[0].price),
        { timeout: 20000 },
      );
      await page
        .locator(".cart-line")
        .filter({ hasText: products[0].title.ja })
        .filter({ hasText: "100g" })
        .getByRole("button", { name: /数量を減らす/ })
        .click();
      await expect(page.locator(".subtotal strong")).toHaveText(yen(subtotal), {
        timeout: 20000,
      });
      await expect(page.locator(".checkout-button")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
      const checkout = new URL(
        (await page.locator(".checkout-button").getAttribute("href"))!,
      );
      expect(checkout.hostname).toBe("tokyocoffee.jp");
      expect(checkout.searchParams.get("locale")).toBe("ja");
      await expect(page.locator(".checkout-handoff")).toContainText(
        "選んだ豆とサイズ",
      );
      async function empty() {
        while (await page.locator(".cart-line").count()) {
          const n = await page.locator(".cart-line").count();
          await page
            .locator(".cart-line")
            .first()
            .getByRole("button", { name: "削除", exact: true })
            .click();
          await expect(page.locator(".cart-line")).toHaveCount(n - 1, {
            timeout: 20000,
          });
        }
      }
      await empty();
      await page
        .getByRole("button", { name: "カートを閉じる", exact: true })
        .click();
      for (const slug of ["colombia-huila", "ethiopia-guji"]) {
        await page
          .locator("#origin-" + slug)
          .getByRole("radio", { name: "100g", exact: true })
          .check();
        await page
          .locator("#origin-" + slug)
          .getByRole("button", { name: /カートに入れる/ })
          .click();
        await expect(page.locator(".subtotal strong")).toHaveText(
          slug === "colombia-huila" ? "¥1,410" : "¥3,015",
          { timeout: 20000 },
        );
        if (slug === "colombia-huila")
          await expect(page.locator(".shipping-progress")).toHaveText(
            "あと¥1,590で送料無料",
          );
        else await expect(page.locator(".shipping-progress")).toHaveCount(0);
        await page
          .getByRole("button", { name: "カートを閉じる", exact: true })
          .click();
      }
      await page.getByRole("button", { name: "Cart (2)", exact: true }).click();
      await empty();
      await page
        .getByRole("button", { name: "カートを閉じる", exact: true })
        .click();
      await page
        .locator("#origin-peru")
        .getByRole("radio", { name: "200g", exact: true })
        .check();
      await page
        .locator("#origin-peru")
        .getByRole("button", { name: /カートに入れる/ })
        .click();
      await expect(page.locator(".subtotal strong")).toHaveText("¥4,720", {
        timeout: 20000,
      });
      await expect(page.locator(".shipping-progress")).toHaveCount(0);
      await page.goto(base + "/en", { waitUntil: "domcontentloaded" });
      await page.getByRole("button", { name: "Cart (1)", exact: true }).click();
      await expect(page.locator(".cart-line")).toHaveCount(1);
      await expect(page.locator(".checkout-button")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
      expect(
        new URL(
          (await page.locator(".checkout-button").getAttribute("href"))!,
        ).searchParams.get("locale"),
      ).toBe("en");
      await expect(page.locator(".checkout-handoff")).toContainText(
        "selected coffees and sizes",
      );
      await page
        .locator(".cart-line")
        .getByRole("button", { name: "Remove", exact: true })
        .click();
      await expect(page.locator(".cart-line")).toHaveCount(0, {
        timeout: 20000,
      });
      console.log(
        "PASS: all eight live variants and prices; cart totals/quantity/removal/persistence; shipping progress at ¥1,410/¥3,015/¥4,720; JA/EN checkout URLs",
      );
    } else
      console.log("NOT RUN: live cart interactions (set VERIFY_CART=true)");
    expect(errors).toEqual([]);
    console.log(
      "PASS: hybrid order, hero/statement/story mobile budgets, JA/EN origin facts/JSON-LD/size links, FAQ, trade, no overflow or obsolete variant switches",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

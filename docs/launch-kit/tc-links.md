# tokyocoffee.jp → snobi.jp: exact changes (DRAFT; the owner applies them in Shopify)

**Status:** draft, 2026-10-09. Nothing edited on tokyocoffee.jp.
**Plan tasks:** T8 (footer link, brand JSON-LD, Peru Geisha meta), T7 / decision K3 (canonical, **pending**). 05 row E2.
**Caution:** changes to tokyocoffee.jp sit under the 2026-09-17 STOP and the rogutore note "no cross-domain canonicals". Every item here needs the owner's OK. (b-2) is **OPTIONAL** until K3 is decided.

## What I checked on the live site (VERIFIED, 2026-10-09)
- Theme: **Kingdom 5.3.3**, live theme name 「kingdom6　9/11-  卸売ページ修正のコピー　ブログページ修正」 (`Shopify.theme` on the product page). **Duplicate the theme first** and edit the copy.
- The footer has a menu block titled **「MENU」**: 検索, ブログ, オーガニック コーヒー, 定期購入, 卸売り・業務用, マイアカウント, 良くある質問, 特商法, 利用規約, 返金ポリシー.
- `tokyocoffee.jp/products/snobi-peru` has a self-canonical (`<link rel="canonical" href="https://tokyocoffee.jp/products/snobi-peru">`) and no link to snobi.jp.
- Product handles and slugs (`content/products.ts`): `snobi-peru` → `peru`, `snobi-ethiopia-guji` → `ethiopia-guji`, `snobi-colombia-huila` → `colombia-huila`, `snobi-mexico-chiapas-decaf` → `mexico-chiapas-decaf`. **For all four, slug = handle minus the `snobi-` prefix.** The code below derives the URL from that rule instead of keeping a second list (SINGLE_SOURCE rule 3).
- These products have vendor `SNöBI` (05 §1.5, VERIFIED 2026-10-08).
- The blog handle is `tokyo-coffee-blog`.

---

## (a) Footer link: no code
Shopify admin → **Online Store → Navigation** → the menu shown under 「MENU」 in the footer → **Add menu item**:
- **Name:** `SNöBI（有機JAS × スペシャルティ）`
- **Link:** `https://snobi.jp`
- **Position:** directly after 「オーガニック コーヒー」.

Check: on the theme preview, the footer shows the item and it opens https://snobi.jp.

---

## (b) The four SNöBI product pages

### (b-0) One snippet: the single derivation of the snobi.jp URL
Create **`snippets/snobi-origin-url.liquid`**:

```liquid
{%- comment -%}
  Prints https://snobi.jp/origins/<slug> for a SNöBI product, otherwise nothing.
  Contract: tokyocoffee.jp handle = "snobi-" + snobi.jp slug (content/products.ts, all four checked 2026-10-09).
  Before a new SNöBI product goes on sale here, its snobi.jp origin page must exist, or this links to a 404.
{%- endcomment -%}
{%- if product and product.vendor == 'SNöBI' -%}
  {%- assign snobi_prefix = product.handle | slice: 0, 6 -%}
  {%- if snobi_prefix == 'snobi-' -%}https://snobi.jp/origins/{{ product.handle | remove_first: 'snobi-' }}{%- endif -%}
{%- endif -%}
```

### (b-1) Visible line 「SNöBI公式サイトで見る →」 (recommended; independent of K3)
Two ways to add it. Pick one.
1. **Theme editor (no code, if Kingdom offers a "Custom Liquid" block in the product information section; INFERRED, as most Online Store 2.0 themes do):** Customize → Products → Default product → product information → **Add block → Custom Liquid**, placed under the buy buttons. Paste:
2. **Code:** put the same Liquid at the end of the product-info area in `sections/main-product.liquid`. The file name in Kingdom is UNKNOWN; search the theme for `product-form` or `buy_buttons` to find it.

```liquid
{%- capture snobi_url -%}{%- render 'snobi-origin-url', product: product -%}{%- endcapture -%}
{%- assign snobi_url = snobi_url | strip -%}
{%- if snobi_url != blank -%}
  <p class="snobi-official-link" style="margin-top: 1rem;">
    <a href="{{ snobi_url }}">SNöBI公式サイトで見る →</a>
  </p>
{%- endif -%}
```
On any non-SNöBI product the snippet prints nothing, so the line does not appear.

### (b-2) Cross-domain canonical: **OPTIONAL. Owner decision K3 pending.**
In `layout/theme.liquid`, find the existing line (in Shopify themes it is usually `<link rel="canonical" href="{{ canonical_url }}">`) and **replace** it. There must be exactly one canonical per page:

```liquid
{%- capture snobi_canonical -%}{%- if template.name == 'product' -%}{%- render 'snobi-origin-url', product: product -%}{%- endif -%}{%- endcapture -%}
{%- assign snobi_canonical = snobi_canonical | strip -%}
{%- if snobi_canonical != blank -%}
  <link rel="canonical" href="{{ snobi_canonical }}">
{%- else -%}
  <link rel="canonical" href="{{ canonical_url }}">
{%- endif -%}
```
- The pages stay purchasable and stay in the product sitemap and the Google feed. Do **not** use `seo.hidden` / noindex instead: Google says noindex "will completely block the page from Search" (05 §1.2).
- **Afterwards check:** `curl -s https://tokyocoffee.jp/products/snobi-peru | grep -i 'rel="canonical"'` returns exactly one line, pointing to `https://snobi.jp/origins/peru`. Repeat for the other three handles and for one non-SNöBI product, which must keep its own canonical. Then use GSC URL Inspection on snobi.jp/origins/peru once GSC is set up (T2). How Google treats this cross-domain canonical is UNKNOWN until that inspection (05 §8).
- **Merchant Center:** the TC feed keeps the TC product URLs as landing pages (K6). A canonical that points elsewhere *may* affect landing-page checks: UNKNOWN. Watch Merchant Center diagnostics for a week after the change.

---

## (c) TC blog post (JP, 841 characters without line breaks; 「SNöBI（スノビ）」 is in the title only)
**Blog:** `tokyo-coffee-blog`. **Title:** `有機JASのスペシャルティコーヒー豆「SNöBI（スノビ）」の公式サイトができました`
**Cover image:** photo 130 (JPG export; see `pr-times-release.md`).
**Excerpt / meta description:** `東京コーヒーの有機JASスペシャルティライン「SNöBI」の公式サイト snobi.jp を公開。ペルー ゲイシャ、エチオピア、コロンビア、メキシコ デカフェの4種。すべて浅煎り、豆のまま。`

> 東京コーヒーから、有機JASのスペシャルティコーヒー豆のライン「SNöBI」の公式サイト、snobi.jp を公開しました。
>
> オーガニックのまま、スペシャルティ。
> SNöBIは、東京コーヒーがつくるオーガニック・スペシャルティラインです。第一章は、4つの産地の有機JASコーヒー豆。すべて浅煎り、豆のまま、100gと200gでお届けします。
>
> ■ ペルー チリノス ゲイシャ
> カハマルカ県サン・イグナシオ、チリノス。チリノス生産者組合のミゲル・エステバン・ラミレス・アグルトさんが、標高1,731mで育てたゲイシャです。ウォッシュド、天日乾燥。フローラル、みかん、紅茶。100g ¥2,560（税込）。
>
> ■ エチオピア グジ タデGG農園
> オロミア州グジ、シャキッソ村。タスファイ・ベケレさんのタデGG農園の豆です。標高1,800–2,200m、エチオピア在来種をナチュラルで、アフリカンベッドの上で乾燥。ベリー、ドライフルーツ、甘さ。100g ¥1,605（税込）。
>
> ■ コロンビア ウィラ
> ウィラ県南部、ピタリート。ASOBOMBO生産者協会に集う小さな農園の豆を、ひとつのロットに。標高1,700m、カトゥーラとコロンビア種、ウォッシュド、天日乾燥。シトラス、キャラメル、バランス。100g ¥1,410（税込）。
>
> ■ メキシコ チアパス デカフェ
> チアパス州、グラポス農協の小規模生産者の豆です。標高1,400–1,700m、ブルボン、ムンドノーボ、カトゥーラ。薬品を使わないマウンテンウォーター製法で、カフェインは99.9%カット。スイートポテト、黒糖、やさしい酸味。100g ¥1,610（税込）。
>
> 産地と生産者のこと、有機JASのことは、snobi.jp の産地ページと読みものにまとめています。
>
> ご購入は snobi.jp から。お支払いは東京コーヒーの決済ページで承ります。¥3,000以上で送料無料。火曜日と金曜日に焙煎、発送します。
>
> SNöBI公式サイト：https://snobi.jp

Links to set in the editor: each coffee name → `https://snobi.jp/origins/<slug>`. 「産地ページ」 → `https://snobi.jp/coffee`. 「読みもの」 → `https://snobi.jp/journal`.

---

## (d) JSON-LD: SNöBI as `brand` of TC's Organization
**Where:** the theme file that prints TC's WebSite + Organization JSON-LD. Search the theme code for `13OGP-2001` or `"legalName"`; the block is custom, not a Kingdom default (INFERRED).
**Change:** add one property, `brand`, to the Organization object. Leave everything else as it is.

Current (VERIFIED, tokyocoffee.jp home, 2026-10-09; abridged):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "オーガニックコーヒーの通販、サブスク、業務用コーヒー ｜ TOKYO COFFEE Organic Coffee",
  "url": "https://tokyocoffee.jp",
  "legalName": "株式会社ローグトレード",
  "alternateName": ["東京コーヒー", "トーキョーコーヒー", "TOKYO COFFEE"],
  "description": "東京・東久留米の有機JAS認証オーガニックコーヒー専門ロースター（有機JAS認証番号 13OGP-2001）",
  ...
  "sameAs": ["https://instagram.com/tokyocoffeejp", "https://facebook.com/tokyocoffeejp", "https://pinterest.com/tokyocoffeejp"]
}
```
Add after `"sameAs"` (mind the comma):
```json
  ,"brand": {
    "@type": "Organization",
    "@id": "https://snobi.jp/#org",
    "name": "SNöBI",
    "alternateName": ["Snobi", "SNOBI", "スノビ"],
    "url": "https://snobi.jp",
    "logo": "https://snobi.jp/brand/snobi.svg"
  }
```
- `@id` and `alternateName` match the SNöBI entity snobi.jp publishes (`lib/seo.tsx`: `ORG_ID = https://snobi.jp/#org`, `BRAND_ALT`), so engines join the two into one node. That is why the type is `Organization` (schema.org allows Organization or Brand for `brand`) and not a separate `Brand` node. The logo URL returns 200 (checked 2026-10-09).
- Do **not** put snobi.jp in TC's `sameAs`. `sameAs` means "the same entity", and SNöBI is a line, not Tokyo Coffee itself.
- Validate with the Schema.org validator (validator.schema.org) after saving.

**Found while checking, not changed (owner's call):**
1. TC's `description` says 「…オーガニックコーヒー**専門**ロースター」, but the roastery is certified 有機・非有機**併用** (COPY-INVENTORY §4.2; question 5 there).
2. TC's Organization `name` is the home-page title string. `"TOKYO COFFEE"` would be the entity name.
3. On snobi.jp, `lib/seo.tsx` puts `https://tokyocoffee.jp` in SNöBI's own `sameAs`: the same meaning problem in reverse. `parentOrganization` already carries the link. Flag for the site session.

---

## (e) TC organic Peru Geisha: wrong meta description
**Page:** `https://tokyocoffee.jp/products/オーガニック-ゲイシャ-スペシャリティーコーヒー豆-ペルー-ゲイシャ` (product 「オーガニック　ゲイシャ　スペシャリティーコーヒー豆　ペルー　ゲイシャ」).

**Current meta description and og:description (VERIFIED 2026-10-09), 114 characters:**
`東京コーヒーのオーガニックコーヒー豆：季節限定スペシャルコーヒー シングルオリジン - エチオピアイルガチャフェ。 新鮮な自家焙煎コーヒー専門店東京コーヒーのおすすめコーヒーです。安心の有機JAS認証 オーガニック コーヒー豆。`

**Corrected, 107 characters (facts only from that product's own page body: Peru Chirinos Geisha G1, カハマルカ県 サン・イグナシオ州 チリノス地区, the producer, flavour notes floral / citrus / tea-like):**
`東京コーヒーの有機JASオーガニックコーヒー豆：ペルー チリノス ゲイシャ G1。カハマルカ県チリノス地区のミゲル・エステバン・ラミレス・アグルトさんが育てたゲイシャ種。フローラル、シトラス、紅茶のような口当たり。`

**Where:** Shopify admin → Products → that product → **Search engine listing → Edit → Description**. If that field is empty or shows other text, the wrong text comes from an SEO app or a theme template. Search the theme and apps for 「イルガチャフェ」.
**Not changed:** the `<title>` (「季節限定スペシャルコーヒー コーヒー豆 オーガニック by TOKYO COFFEE」) does not say Peru or Geisha either. Fixing it would make this TC page compete harder with SNöBI's Peru page for ゲイシャ queries (plan §8, K1/K3), so it is left for the owner.

**Owner question raised by the same page (VERIFIED prices, 2026-10-09):** TC sells a Peru Chirinos Geisha G1 from the same producer at **100g ¥2,150** (200g ¥4,000), while SNöBI's Peru is **100g ¥2,560**. Whether it is the same lot is INFERRED, not checked. The page also states a cupping score, while the SNöBI site dropped scores. Channel and price parity: decision K1/K3.

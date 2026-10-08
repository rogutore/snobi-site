# Google Business Profile: posts and menu entries for the two café profiles (DRAFTS, not posted)

**Status:** drafts, 2026-10-09. Nothing posted, no profile edited.
**Plan task:** T30 (staff). 05 row E7: **no separate SNöBI profile.**
**Facts:** `content/products.ts` (`b2a3f4eddbed…`), `content/ordering.ts` (`5fb9a6dfd176…`).

## Before anything is posted: three checks (staff / owner)
1. **Which profiles exist and are open.** The brief names two: the **東久留米 roastery café** and **立川 COMMONS**. The vault does not agree with itself:
   - `brain/Handoffs/tokyo-coffee/company.md` (2026-10-02) lists the cafés as COMMONS 立川 and 保谷 / 西東京, and Higashikurume as the roastery facility.
   - `seo-geo/strategy-full.md` says TC's roastery-café page ranks #1 for 東久留米 カフェ.
   - A CafeRes item names 「東久留米カフェ開業準備」 for spring 2027.
   So: UNKNOWN. Post only on profiles that exist; consider 保谷 too.
2. **Is SNöBI on sale or served in that café?** UNKNOWN (COPY-INVENTORY §7 q7). The posts below work either way: they link to the online shop, and the in-store line is in `[ ]`. **Menu entries are only for a café that actually sells the beans.** A menu should list what that location sells (INFERRED from Google's rule that profile content must represent the business at that location).
3. **UTM:** each button URL carries `utm_source=gbp` and the profile in `utm_content`. Orders only show it if the cart attribute capture (T6) is live. Its status is UNKNOWN; the links work either way.

**Format notes (INFERRED from Google Business Profile help, not re-checked today):** an update post holds up to 1,500 characters; phone numbers in post text get posts rejected (so none below); the button type is **「詳細」 (Learn more)** with a URL. Each post below is ≤ 1,500 characters (counted with Python `len`; the counts are given).

**Order:** launch post on launch day. Then one origin a week: Peru → Mexico decaf → Ethiopia → Colombia. Peru Geisha and light-roast organic decaf are the two open search gaps (plan §8).

**Profile codes for the URLs:** `higashikurume`, `commons` (add `hoya` if used).

---

## Post 0: launch (both profiles) (303 characters)
**Photo:** 130 (four bags + carafe). **Button 「詳細」:** `https://snobi.jp/?utm_source=gbp&utm_medium=organic&utm_campaign=snobi-launch&utm_content=<profile>`

```
SNöBI（スノビ）の公式サイト、snobi.jp を公開しました。

東京コーヒーがつくる、有機JASのスペシャルティコーヒー豆。
第一章は4種。すべて浅煎り、豆のまま、100gと200g。

・ペルー チリノス ゲイシャ　100g ¥2,560
・エチオピア グジ タデGG農園　100g ¥1,605
・コロンビア ウィラ　100g ¥1,410
・メキシコ チアパス デカフェ　100g ¥1,610
（税込）

豆ごとに、産地、生産者、標高、品種、精製方法を公開しています。
火曜日と金曜日に焙煎、発送。¥3,000以上で送料無料。
[店頭でもお買い求めいただけます。── 要確認。なければ削除]
```

## Post 1: Peru (252 characters)
**Photo:** 144. **Button 「詳細」:** `https://snobi.jp/origins/peru?utm_source=gbp&utm_medium=organic&utm_campaign=snobi-origin&utm_content=<profile>`

```
ペルー チリノス ゲイシャ ── SNöBI（スノビ）

カハマルカ県サン・イグナシオ、チリノス。
814軒の農家が集う生産者組合で、ミゲル・エステバン・ラミレス・アグルトさんが育てた有機のゲイシャ。
標高1,731m。ウォッシュド、天日乾燥。浅煎り。
フローラル、みかん、紅茶。

組合は、羊や牛の堆肥とコーヒーの果肉で有機肥料をつくり、加盟農家に無償で配っています。
このロットは2025年11月に日本に入港しました。

100g ¥2,560／200g ¥4,720（税込）。豆のまま。有機JAS。
```

## Post 2: Mexico decaf (247 characters)
**Photo:** 145. **Button 「詳細」:** `https://snobi.jp/origins/mexico-chiapas-decaf?utm_source=gbp&utm_medium=organic&utm_campaign=snobi-origin&utm_content=<profile>`

```
メキシコ チアパス デカフェ ── SNöBI（スノビ）

チアパス州、エル・トリウンフォ生物圏保護区のすぐそば。
平均約3haの小さな農園を3,253軒が持ち寄る、グラポス農協の豆。
ブルボン、ムンドノーボ、カトゥーラ。標高1,400–1,700m。

薬品を使わないマウンテンウォーター製法で、カフェインは99.9%カット。
浅煎り。スイートポテト、黒糖、やさしい酸味。
農協の生産者の4人に1人が女性です。

100g ¥1,610／200g ¥2,820（税込）。豆のまま。有機JAS。
```

## Post 3: Ethiopia (238 characters)
**Photo:** 143. **Button 「詳細」:** `https://snobi.jp/origins/ethiopia-guji?utm_source=gbp&utm_medium=organic&utm_campaign=snobi-origin&utm_content=<profile>`

```
エチオピア グジ タデGG農園 ── SNöBI（スノビ）

オロミア州グジ、シャキッソ村。
農学者でもあるタスファイ・ベケレさんのタデGG農園。
標高1,800–2,200m。エチオピア在来種をナチュラルで、アフリカンベッドの上でゆっくり乾燥。浅煎り。
ベリー、ドライフルーツ、甘さ。

収穫した実は、農園から約20kmの自社精選所へ。
水槽で選別し、完熟の果実だけを手で選んで乾燥させます。

100g ¥1,605／200g ¥2,810（税込）。豆のまま。有機JAS。
```

## Post 4: Colombia (227 characters)
**Photo:** 146. **Button 「詳細」:** `https://snobi.jp/origins/colombia-huila?utm_source=gbp&utm_medium=organic&utm_campaign=snobi-origin&utm_content=<profile>`

```
コロンビア ウィラ ── SNöBI（スノビ）

ウィラ県南部、ピタリート。
ASOBOMBO生産者協会に集う小さな農園の豆を、ひとつのロットに。
標高1,700m。カトゥーラとコロンビア種。ウォッシュド、天日乾燥。浅煎り。
シトラス、キャラメル、バランス。

収穫は10月から12月。
小さな農園たちの収穫を協会がまとめることで、有機のまま、安定した品質を保っています。

100g ¥1,410／200g ¥2,420（税込）。豆のまま。有機JAS。
```

---

## Menu entries (only on a profile whose café sells the beans)
**Menu editor → add section:** `コーヒー豆（SNöBI）`
Each item: name · price · description. Photos as in the posts. Menu items carry no link (05 E7, INFERRED).

| Item name | Price | Description |
|---|---|---|
| SNöBI ペルー チリノス ゲイシャ 100g | 2,560 | 有機JAS。浅煎り、豆のまま。カハマルカ県サン・イグナシオ、チリノス／ミゲル・エステバン・ラミレス・アグルト（チリノス生産者組合）／標高1,731m／ゲイシャ／ウォッシュド・天日乾燥。フローラル、みかん、紅茶。200g ¥4,720。 |
| SNöBI エチオピア グジ タデGG農園 100g | 1,605 | 有機JAS。浅煎り、豆のまま。オロミア州グジ、シャキッソ村／タデGG農園、タスファイ・ベケレさん／標高1,800–2,200m／エチオピア在来種／ナチュラル・天日乾燥（アフリカンベッド、ハンドソート）。ベリー、ドライフルーツ、甘さ。200g ¥2,810。 |
| SNöBI コロンビア ウィラ 100g | 1,410 | 有機JAS。浅煎り、豆のまま。ウィラ県南部、ピタリート／ウィラ南部の複数農園（ASOBOMBO生産者協会）／標高1,700m／カトゥーラ・コロンビア／ウォッシュド・天日乾燥。シトラス、キャラメル、バランス。200g ¥2,420。 |
| SNöBI メキシコ チアパス デカフェ 100g | 1,610 | 有機JAS。浅煎り、豆のまま。チアパス州／グラポス農協（GRAPOS）の小規模生産者／標高1,400–1,700m／ブルボン・ムンドノーボ・カトゥーラ／ウォッシュド → マウンテンウォーター製法（薬品不使用のデカフェ）。カフェインは99.9%カット。スイートポテト、黒糖、やさしい酸味。200g ¥2,820。 |

If the café's in-store price differs from the online price, the menu shows the in-store price. **The owner sets it; it is not in any source file.**

## Kept out
The roast date as a hook, health or sleep claims for the decaf, 「無農薬」, cup scores, 「オリサバ山の氷河の水」 (unverified for our lot, plan §8), and any café name not confirmed.

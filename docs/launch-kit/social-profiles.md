# Social and entity profiles: text for every surface (DRAFTS; no account created)

**Status:** drafts, 2026-10-09. No account or page created or edited.
**Plan tasks:** entity (strategy line 3), T32 (YouTube), T33 (note), T34 / K7 (Instagram), T48 (LinkedIn). 05 rows E1, E9–E11, E13.
**Character counts:** Python `len`. The platform limits marked INFERRED were not re-checked today; check them on each form.

## 1. One entity sentence: use it verbatim everywhere
**JP (74 characters):**
`SNöBI（スノビ）は、東京コーヒー（株式会社ローグトレード）が東京で焙煎する、オーガニック（有機JAS）のスペシャルティコーヒー豆のブランドです。`

**EN (117 characters):**
`SNöBI is an organic (JAS-certified) specialty coffee bean brand, roasted in Tokyo by Tokyo Coffee (ROGUE TRADE K.K.).`

- **Name strings:** display `SNöBI`; alternates `Snobi`, `SNOBI`, `スノビ` (K4, decided 2026-10-08; `lib/seo.tsx` `BRAND_ALT`). Write 「SNöBI（スノビ）」 once per profile or page.
- **Source:** this is the snobi.jp Organization `description` in `lib/seo.tsx` (「オーガニック（有機JAS）のスペシャルティコーヒー豆。東京コーヒー（株式会社ローグトレード）が東京で焙煎。」) recast as one sentence. **Single source:** the owner approves this string once. Then the site session sets `lib/seo.tsx` to the same text (or reads it from the registry when one exists), so the site and the profiles say the same thing.
- **EN company name: "ROGUE TRADE K.K."** (owner, 2026-10-11: "sure, or Rogue Trade Inc."; K.K. kept because `company.md` already uses it). COPY-INVENTORY §4.1's "Rogue Trade Co., Ltd." is superseded. If the bank or registry shows a different registered English name, that one wins; change it in every EN line here at once.
- 「東京で焙煎」 is the live site's claim (「JAS有機認証の豆だけを、東京で焙煎。」). The 東久留米 address is not used for SNöBI until COPY-INVENTORY §7 q8 is answered.

**Profile links (sameAs).** Add a profile to snobi.jp's `sameAs` only once it is live and posting (05 D3). A dead profile is a weak entity signal.

---

## 2. Instagram (K7 decided 2026-10-11: claim the handle now, and run SNöBI as a highlight on @tokyocoffeejp)
- **Handle:** `@snobi.jp`, else `@snobi_coffee`. Availability UNKNOWN; staff claim it (team question 18). Add it to `sameAs` only once it posts.
- **Name field (searchable, 20 characters):** `SNöBI（スノビ）有機JASコーヒー豆`
- **Category:** 食品・飲料 / Product/service (owner's pick).
- **Bio (83 characters; limit 150, INFERRED):**
```
有機も、味も。妥協しない。
有機JASのコーヒー豆、4産地。浅煎り、豆のまま、100g / 200g。
東京コーヒー（株式会社ローグトレード）が東京で焙煎。
```
- **Link:** `https://snobi.jp/?utm_source=instagram&utm_medium=social`
- **Pinned posts (3):** photo 130 (the four), Peru (144), Mexico decaf (145).
- **Highlights:** ペルー ／ エチオピア ／ コロンビア ／ デカフェ ／ ご注文
- **If K7 = no own handle:** add a 「SNöBI」 highlight on @tokyocoffeejp with the same bio lines in the first story, and leave Instagram out of SNöBI's `sameAs`.

---

## 3. LinkedIn

### 3a. Company page: 株式会社ローグトレード
| Field | Text |
|---|---|
| Name | 株式会社ローグトレード (EN localisation: `ROGUE TRADE K.K.`) |
| Public URL | `linkedin.com/company/[rogue-trade]` (availability UNKNOWN) |
| Tagline JP (58) | `コーヒーの焙煎と販売。ブランドは東京コーヒーと、有機JASのスペシャルティコーヒー豆 SNöBI。東京都東久留米市。` |
| Tagline EN (113; limit 120, INFERRED) | `Coffee roasters in Higashikurume, Tokyo. Brands: Tokyo Coffee and SNöBI (JAS-certified organic specialty coffee).` |
| Website | https://tokyocoffee.jp |
| Industry | Food and Beverage Manufacturing (owner's pick) |
| Size | `[2–10 / 11–50]`. company.md says about 5–15 people. |
| Type | Privately held |
| Headquarters | 東京都東久留米市滝山4−1−40 (`content/legal.ts`) |
| Founded | `[owner]`. The roastery start year conflicts (2013 vs 2015, COPY-INVENTORY §4.3); use the incorporation year from the registry. |
| Specialties | オーガニックコーヒー, 有機JAS, コーヒー焙煎, スペシャルティコーヒー, 業務用コーヒー, コーヒー卸売 |
| Logo | the TC logo (`tokyocoffee.jp/cdn/shop/files/tokyocoffee_logo900x900.png`) |

**Overview (JP):**
```
株式会社ローグトレードは、東京都東久留米市でコーヒーを焙煎し、販売しています。ブランドは二つです。

東京コーヒー（TOKYO COFFEE）
オーガニックコーヒーを、オンラインストア（https://tokyocoffee.jp）、カフェ、業務用・卸売で届けています。

SNöBI（スノビ）
有機JASのスペシャルティコーヒー豆のライン。第一章は、ペルー、エチオピア、コロンビア、メキシコ（デカフェ）の4種。すべて浅煎り、豆のまま。https://snobi.jp

[任意・要オーナー確認] 当社は、有機加工食品の生産行程管理者として有機JASの認定を受けています（認定番号 13OGP-2001）。
```
**Overview (EN):**
```
ROGUE TRADE K.K. roasts and sells coffee in Higashikurume, Tokyo, under two brands.

Tokyo Coffee: organic coffee, sold through our online store (https://tokyocoffee.jp), our cafés, and to trade and wholesale customers.

SNöBI: a line of JAS-certified organic specialty coffee. Chapter One is four light-roast, whole-bean coffees from Peru, Ethiopia, Colombia and Mexico (decaf). https://snobi.jp

[Optional, owner OK] We are certified under Japan's Organic JAS standard as a producer of organic processed foods (No. 13OGP-2001).
```
Not written: 「オーガニック専門」 or "organic-only". The roastery is certified 有機・非有機併用 (COPY-INVENTORY §4.2).

### 3b. Showcase page: SNöBI (free; needs a **super admin** of the company page, VERIFIED 05 E13)
| Field | Text |
|---|---|
| Name | SNöBI |
| Tagline JP (38) | `有機も、味も。妥協しない。有機JASのスペシャルティコーヒー豆。東京で焙煎。` |
| Tagline EN (90) | `Organic. And actually specialty. JAS-certified organic specialty coffee, roasted in Tokyo.` |
| Website | https://snobi.jp |
| Industry | same as the parent |
| Logo | the boar mark (`public/brand/snobi.svg`, exported as PNG) |

**Description (JP):** the entity sentence, then:
```
第一章は4種。ペルー チリノス ゲイシャ、エチオピア グジ タデGG農園、コロンビア ウィラ、メキシコ チアパス デカフェ。すべて浅煎り、豆のまま、100g / 200g。豆ごとに、産地、生産者、標高、品種、精製方法を公開しています。取扱店（カフェ・小売店）のご相談は https://snobi.jp/contact から。
```
**Description (EN):** the EN entity sentence, then:
```
Chapter One is four coffees: Peru Chirinos Geisha, Ethiopia Guji Tade GG Farm, Colombia Huila and Mexico Chiapas Decaf. All light roast, whole bean, 100g / 200g. Each coffee's origin, producer, altitude, variety and process are published on snobi.jp. Cafés and shops: enquire at https://snobi.jp/contact.
```
The trade enquiry link should be `/contact` (in the brief's launch list). If the launch keeps a `/trade` page, use that instead.

---

## 4. note.com (company account, free; note pro ¥80,000/month is not recommended, 05 E11)
- **表示名:** `SNöBI（スノビ）`
- **noteID:** `[snobi]` (availability UNKNOWN)
- **自己紹介 (115 characters):**
```
有機JASのスペシャルティコーヒー豆、SNöBI（スノビ）のnoteです。東京コーヒー（株式会社ローグトレード）が東京で焙煎しています。産地と生産者、淹れ方、有機JASのことを書きます。公式サイト https://snobi.jp
```
  This text already contains 「SNöBI（スノビ）」, so the 表示名 shows the reading and the bio repeats it. If the owner wants it strictly once, set the 表示名 to `SNöBI`.
- **Header / links:** https://snobi.jp (plus Instagram once K7 is decided).
- **First posts (T33):** short versions of the journal articles, each ending 「全文は SNöBI の公式サイトで → https://snobi.jp/journal/<slug>」. Outbound links on note are nofollow (05 E11): the value is discovery and AI retrieval, not link equity.

---

## 5. YouTube (T32: owner OK still needed; site video was parked 2026-10-06; edits go through the `video-production` skill)
- **Channel name:** `SNöBI（スノビ）` ／ **Handle:** `[@snobi-jp]` (availability UNKNOWN)
- **Links:** https://snobi.jp (公式サイト), https://tokyocoffee.jp (東京コーヒー)
- **Channel description:**
```
SNöBI（スノビ）は、東京コーヒー（株式会社ローグトレード）が東京で焙煎する、オーガニック（有機JAS）のスペシャルティコーヒー豆のブランドです。
第一章は、ペルー、エチオピア、コロンビア、メキシコ（デカフェ）の4種。すべて浅煎り、豆のまま。
このチャンネルには、豆と焙煎の映像を載せています。撮影はすべて東京です。
公式サイト：https://snobi.jp

SNöBI is an organic (JAS-certified) specialty coffee bean brand, roasted in Tokyo by Tokyo Coffee (ROGUE TRADE K.K.).
```

**Chapters, a constraint:** YouTube builds chapters only when the description has at least 3 timestamps, the first is `0:00`, and each chapter is at least 10 seconds long (INFERRED, YouTube Help; not re-checked today). The four-arrive v1 is **14.0 s** (`artifacts/footage/shots.json`) and the roast band is about 11 s of footage (`docs/footage-uses-2026-10-06.md` rank 1). Neither can carry real chapters at that length. The timestamps below still work as clickable markers. If the final conform runs ≥ 60 s (for example 10 s holds per bag), re-time the same list and it becomes chapters. Uploaded as Shorts, the films show no chapters at all.

### Video 1: the four arrive (from clip 6586; final conform from the 4K originals)
**Title (42):** `第一章の4種。窓の光のテーブルに。｜SNöBI 有機JASのスペシャルティコーヒー豆`
**Description:**
```
東京の窓の光のなか、オークのテーブルに4種の袋がそろいます。
ペルー、メキシコ、エチオピア、コロンビアの順です。撮影は東京、2026年10月。

SNöBI（スノビ）は、東京コーヒー（株式会社ローグトレード）が東京で焙煎する、オーガニック（有機JAS）のスペシャルティコーヒー豆のブランドです。すべて浅煎り、豆のまま、100g / 200g。

0:00 窓の光と、空のテーブル
0:01 ペルー チリノス ゲイシャ
0:04 メキシコ チアパス デカフェ
0:06 エチオピア グジ タデGG農園
0:08 コロンビア ウィラ
0:10 4種がそろう

・ペルー チリノス ゲイシャ　https://snobi.jp/origins/peru
・メキシコ チアパス デカフェ　https://snobi.jp/origins/mexico-chiapas-decaf
・エチオピア グジ タデGG農園　https://snobi.jp/origins/ethiopia-guji
・コロンビア ウィラ　https://snobi.jp/origins/colombia-huila

公式サイト：https://snobi.jp
```
The timestamps come from the v1 animatic cut frames (50, 134, 196, 252, 312 at 29.97 fps = 1.7, 4.5, 6.5, 8.4, 10.4 s), rounded down. Re-read them from the final conform.

### Video 2: the roast band (from clip 7703)
**Title (31):** `東京で焙煎。｜SNöBI 有機JASのスペシャルティコーヒー豆`
**Description:**
```
焙煎機のドラムのなかで豆が回り、扉が開き、冷却トレーへ。東京の焙煎所で撮影しました。
SNöBIの豆は、火曜日と金曜日に焙煎、発送しています。

SNöBI（スノビ）は、東京コーヒー（株式会社ローグトレード）が東京で焙煎する、オーガニック（有機JAS）のスペシャルティコーヒー豆のブランドです。

0:00 ドラムのなかの豆
0:01 扉を開ける
0:03 豆を出す
0:05 冷却トレーへ
0:07 冷ます

4種の一覧：https://snobi.jp/coffee
公式サイト：https://snobi.jp
```
The timestamps assume the five rank-1 cuts in order, without dissolves: 7703 at 4.1–5.3, 29.7–31.9, 32.2–34.2, 35.2–37.2 and 53.6–57.3 s. Re-read them from the final edit.
**Copy note:** the footage doc's band copy 「火曜・金曜に焼いて、翌営業日に発送。」 is **out of date**. `content/ordering.ts` (Davy, 2026-10-08) says 「火曜日と金曜日に焙煎、発送。」 and that line is used above. No roast date anywhere in either video.

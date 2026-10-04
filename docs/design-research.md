# Snobi — design rethink: research & direction

Status: RESEARCH, nothing built · 2026-10-05 · branch `claude/full-site`

Claims are marked VERIFIED (source), INFERRED, or UNKNOWN.
Positioning comes from the live site: "Organic. And actually specialty." / オーガニックのまま、スペシャルティ。

## 1. Why the first pass came out "mid"

1. **The model was wrong.** The site was modeled on chiselindustries.com. VERIFIED: `website-build-brief.md` §1. Chisel is a holding company's corporate site: a photo hero with a dark overlay, serif headlines, dark/cream bands, small labels, and no products or motion. VERIFIED: visited 2026-10-05. Good corporate taste, but the wrong template for a store whose product is the hero.
2. **The earlier research optimized conversion, not impact.** `research-lp-patterns.md` and `research-buy-flow.md` (vault, 2026-09-10) studied nine pages at 390px for price placement, CTA count and buy flow. VERIFIED: vault. Useful, and still the rule for the shop block, but nothing in it asks what makes a site feel world-class.
3. **No real imagery yet.** Bag renders, generic café photos and importer-supplied portraits. VERIFIED: `image-and-video-plan.md` grades them C to B−. The new Snobi shoot happened, but files aren't delivered or prepped yet (owner, 2026-10-05).
4. **My mockups made it worse:** they took a one-page layout and spread it over more pages.

## 2. What world-class small-catalog sites do

Observed directly:
- **Onyx Coffee Lab** (onyxcoffeelab.com). VERIFIED: visited 2026-10-05.
  - Opens on a full-bleed, dark, moving hero with almost no copy.
  - Each coffee gets an editorial spread: a lifestyle photo of a hand holding the bag, a huge expressive display name, tasting notes, a short origin paragraph, one CTA.
  - The coffee is presented like a release, not a SKU row.
- **Chisel.** See §1.
- **The 2026-09-10 set** (Graza, Cometeer, Apple AirPods Pro JP, Teenage Engineering, Minimal, PostCoffee, …). VERIFIED: `research-lp-patterns.md`. The rules that carry over:
  - price and a buy route survive the visual drama;
  - motion goes on the art, never on the controls;
  - the label art can be the hero asset.

Reported by secondary sources (not observed this session):
- **Apple's product pages** pin a canvas and play a pre-rendered image sequence tied to scroll position, so the product appears to rotate or unfold as you read. INFERRED: scrollytelling.ai / creativecorner.studio summaries; consistent with the AirPods Pro page listed in the 9/10 research.
- **"Hold the product still and let the scroll reveal it"** (Porsche, Chanel J12, Ray-Ban Meta), plus a sticky sub-nav with price and Buy. INFERRED: same summaries.

Patterns to take:
1. **One continuous film, not sections.** The page is a sequence the scroll plays: farm → cherry → green bean → roast → cup → bag in hand → shop.
2. **Product held still, world moving around it.** The bag stays pinned while origin footage, the roastery and the pour pass behind it.
3. **Each coffee as a release.** One full-screen spread per origin: a real bag photo, a huge name, three notes, producer, one button. No table.
4. **Light and neutral throughout** (owner, 2026-10-05). The site stays on paper (#f7f5f0) with plum ink. Footage sits full-bleed or framed on paper, graded bright and airy (morning light, soft greens). Copy sits on paper panels beside or below the footage, not over it, so text stays legible without dark scrims. Dark is an option for at most one moment (e.g. the roast), not a mode.
5. **Sticky buy rail.** Once the film starts, a slim bar keeps "コーヒーを選ぶ" and Cart reachable.
6. **Quiet type over loud footage.** Copy stays the live lines, set large, with few words per screen.

## 3. The concept

**One scroll from the farm to your cup.**

| Beat | Footage / image | Copy (live lines only) |
|---|---|---|
| 1. Open | Drone push over a farm at first light, held on the land | オーガニックのまま、スペシャルティ。 / Organic. And actually specialty. |
| 2. Hands | Picking ripe cherries, close | (none) |
| 3. Arrive | Green beans in the jute sack at the Tokyo roastery | JAS有機認証の豆だけを、東京で焙煎。 |
| 4. Roast | Drum, beans dropping into the cooling tray | 火曜・金曜に焼いて、翌営業日に発送。 |
| 5. Pour | Bloom, then the pour into the cup | (none) |
| 6. The bag | Snobi bag turning in hand, label read | 焙煎日は袋に。 |
| 7. Choose | The four coffees as four full-screen spreads | Name, notes, こんな人に, price, add |
| 8. After | Story, journal, trade, all as short scrolls | |

- **Origin pages** get the same treatment with their own footage: land → producer portrait → process → that coffee's bag → buy.
- **Mobile:** each beat becomes a short muted autoplay loop with a poster, not a scrubbed sequence (performance + iOS). INFERRED.
- **`prefers-reduced-motion`:** posters only, same copy, same order.

## 4. How it's built (technical)

- **Scrubbing.** CSS scroll-driven animations can't scrub `<video>`, and Safari/Firefox support is incomplete. VERIFIED: MDN, updated Sept 2026.
  - So: **GSAP ScrollTrigger** (already installed, see `package.json`) driving either a **canvas image sequence** (Apple-style; most reliable) or `video.currentTime` on an all-keyframe MP4 (lighter to make, choppier on iOS; INFERRED).
  - Default: image sequences for the 2–3 hero beats, autoplay loops for everything else.
- **Budget per beat:** about 90–150 frames, WebP or AVIF, 1600px wide on desktop, about 2–4 MB, loaded progressively, with the first frame as poster. INFERRED, to tune in the prototype.
- **Hosting the heavy files off Vercel:**
  - Vercel Hobby includes 100 GB/month of transfer. VERIFIED: vercel.com/docs/plans/hobby.
  - Options:
    - **Shopify Files**: video ≤1 GB, ≤10 min, ≤UHD, MP4/MOV/WEBM, meant for public store content. VERIFIED: help.shopify.com file uploads. Free with the store.
    - **Cloudflare R2**: no egress fees. INFERRED, not checked.
- **Hosting itself (decision needed):** Vercel Hobby is "restricted to non-commercial personal use only". Commercial includes "any method of requesting or processing payment" and "advertising the sale of a product". VERIFIED: vercel.com/docs/limits/fair-use-guidelines. snobi.jp sells coffee, so it's out of terms on Hobby today.
  - Options:
    - **Vercel Pro**: $20/user/month, adds custom analytics events. VERIFIED: hobby docs.
    - **Move to a host whose free tier allows commercial use** (e.g. Cloudflare via OpenNext). INFERRED: needs checking against Next 16.

## 5. Footage and photos

**From the Snobi shoot (coming; owner to deliver):**
- What I need from the edit for the scroll beats:
  - **continuous single takes, 3–8 s, no cuts inside a beat**;
  - slow steady moves (gimbal or slider) or locked-off;
  - 4K source, 24 or 30 fps;
  - a high-bitrate master (ProRes or ≥50 Mbps H.264);
  - plus a clean frame at the start and end of each.
- Matching the vault shot list (`image-and-video-plan.md` V1–V5, B15–B22): sack, drum, cooling tray, sorting, stamping the roast date, pour, bag in hand.
- **Stills:** the delivery spec in the vault (1600px WebP ≤250 KB) is too small for full-bleed. Keep the masters; for hero use I'll export 2400–3200px AVIF/WebP myself.

**Farm and drone footage (we don't have it):**
- **Best:** footage from the producers and co-ops through the importers, with written rights: 海ノ向こうコーヒー (Peru/Chirinos), 小川珈琲 / Sucafina (Tade GG), オリジンコーヒートレーダーズ (GRAPOS), the Colombia importer. Phone or drone clips are fine; it's the real place.
- **Fallback:** licensed footage of the *region*, labeled as the region, never as "Miguel's farm".
  - This reverses the vault rule "never AI, never stock" for origin imagery, so it needs an owner decision.

## 6. Analytics on the free plan

- **Vercel Web Analytics (Hobby):** page views, referrers, countries and devices. 50,000 events/month, one month of history, no custom events. VERIFIED: limits-and-pricing.
- **Speed Insights (Hobby):** 10,000 events over 30 days. VERIFIED.
- **Google Search Console:** free.
- **Shopify:** add a `landing` cart attribute next to the existing `source` and `lang`, so orders show the page or post they came from. Free.
- **Update 2026-10-05:** the owner chose to migrate to Cloudflare (`site-plan.md` D9). After cutover, **Cloudflare Web Analytics** (free, all plans) replaces Vercel Web Analytics; Search Console and the Shopify cart attributes are unchanged.

## 7. Next steps

1. **Owner decisions:**
   - (a) hosting: Vercel Pro or move;
   - (b) farm footage: real producer media from the importers/co-ops (see `docs/origins-research.md`), plus drone-style inspirational footage, stock or generated, allowed for the promo section (owner, 2026-10-05);
   - (c) ~~dark film / light shop~~ → light/neutral throughout (owner, 2026-10-05).
2. **Footage requests:** I draft the importer emails (JP) asking for farm/drone/producer clips plus rights.
3. **When shoot files land:**
   - owner shares the raw folder;
   - I pick beats against §3 and send a selects list back before cutting anything.
4. **Motion prototype:** one page, beats 1–7, built on real shoot footage as soon as it exists. Labeled stand-ins only if the owner wants to judge the motion before then.

## 8. Hosting comparison (2026-10-05)

| Option | $/month | Commercial use | Fit for this site (Next 16.3) | Limits that matter | Move effort |
|---|---|---|---|---|---|
| **Vercel Hobby** (today) | 0 | **No.** VERIFIED: fair-use guidelines | Native | 100 GB transfer, 5k image transforms | none |
| **Vercel Pro** | 20 per developer seat. VERIFIED: hobby docs | Yes | Native, zero change | Usage-based beyond included credit; custom analytics events | none |
| **Netlify Free** | 0 | Yes. INFERRED: Netlify support-forum admin answers | Next adapter; Next 16.3 support UNKNOWN | 300 credits/mo: ≈20 per GB, 15 per production deploy (search summary). Tight with video | 1–2 days |
| **Netlify Pro** | ≈20. INFERRED | Yes | As above | More credits | 1–2 days |
| **Cloudflare Workers Free** | 0 | No restriction stated. VERIFIED: pricing page | OpenNext supports Next 16 (no Node middleware). VERIFIED: opennext.js.org | **10 ms CPU per request**: likely too low for server rendering. INFERRED. 100k requests/day | 1–3 days |
| **Cloudflare Workers Paid** | 5 | Yes | As above | 10M requests + 30M CPU-ms included; static assets free and unlimited. VERIFIED | 1–3 days |

**Media / video storage (any host):**
- **Shopify Files:** free; video ≤1 GB, ≤10 min, ≤UHD. VERIFIED.
- **Cloudflare R2:** 10 GB free, free egress. VERIFIED.
- **Bunny Stream:** $1/mo minimum, $0.01/GB stored, $0.005/GB delivered, free encoding. VERIFIED.

**Read:**
- The cheapest compliant setup is Cloudflare Workers Paid ($5) + R2, at the cost of a migration and re-testing checkout.
- The simplest is Vercel Pro ($20): nothing changes, and it also unlocks custom analytics events.
- Either way, heavy video goes to R2 or Bunny, not the app host.

---
type: reference
project: premium-line
created: 2026-06-22
updated: 2026-06-22
status: active
tags: [snobi, website, build-brief, handoff-to-cc]
---

# Snobi — Website Build Brief (v2)
**For:** Claude Code build session
**Source content:** strategy research at `~/Documents/RTU/research-outputs/2026-02-16-premium-brand/` + `Projects/Premium-Line/workstreams.md`
**Model the whole page on:** https://www.chiselindustries.com/
**v2 changes:** Chisel's real fonts locked in; copy upgraded to the strategy's actual voice.

---

## 0. What we're building (and what we're NOT)

**v1 = a single-page, pre-launch BRAND + TRANSPARENCY landing page whose primary job is to capture a founders waitlist.** The quality gate isn't cleared and there are no live SKUs yet, so this is NOT the Shopify store — it's the brand's first impression + email capture, built to grow into the full store + Transparency Hub + bilingual content engine later.

EN-first; structure so a JP toggle can be added later (the bilingual content is a real moat, not an afterthought — don't hardcode English-only layouts).

**Anti-slop mandate:** real components (21st.dev / shadcn), the real fonts below, real photography, and the actual Chisel motion. No hand-rolled approximations.

---

## 1. The reference — chiselindustries.com

Before building, **open the live site with Claude in Chrome / Playwright and study how it actually works.** Replicate:
1. **Line motifs that move** — thin SVG line drawings (circle-with-slash, right-angle frames) that draw on and shift with scroll, over photography.
2. **Photography treatment** — full-bleed, confident, editorial.
3. **Big tight-leading headers** — oversized, ~leading-1.0 display (the "Crafting the Future…" / "We Get It." feel). Chisel sets these as large as ~150px.
4. **Bold rounded color blocks** — large rounded panels with big headline text + a small diamond "+" corner motif.
5. **The auto-crossfading image sequence** — the section that flashes through images. We want this.

Keep Chisel's *structure + motion*; swap in **Snobi's palette, voice, and photography.**

---

## 2. Brand tokens (design system)

**Palette**
- `--plum: #443850` — primary / ink / dark blocks (SNOBI logotype color)
- `--lilac: #B49FCC` — secondary / soft accent / block fills
- `--green: #E5F2C9` — pale celery accent / light block fills / the "pop"
- Neutrals: warm off-white paper (~`#F7F5F0`), near-white, plum-black for text. Derive a small neutral ramp; no off-brand hues.
- Mirror Chisel's rhythm in Snobi colors: paper default → lilac/green light blocks → plum inverse block for drama.

**Type — use Chisel's fonts** (confirmed by inspecting the live site)
- **Headers / display = PP Editorial Sans** (Pangram Pangram), weights 500–700. The big tight-leading headline face. *Commercial — license it, or use a free near-match.*
- **Body = Aeonik** (CoType Foundry), weight 400. *Commercial — best free substitute is **Geist** (Vercel; neo-grotesque, ships with Next.js) or General Sans.*
- **Logo wordmark = Fisterra** — the SNOBI lockup stays Fisterra; deliver it as **SVG** so it's exact and we don't need the webfont just for the logo. The hand-drawn "COFFEE" caps come from the same SVG.
- **Mono (transparency data) = Geist Mono / Space Mono** — cup score, altitude, process, roast date, farmgate price set in a "spec strip." Reinforces radical transparency.
- Decision to confirm: license PP Editorial Sans + Aeonik for an exact Chisel match, vs free substitutes (Geist + a tight editorial grotesque). See §9.

**Marks & voice**
- SNOBI logotype + boar mark (SVG — §6). The boar is a playful device — a candidate for a subtle line draw-on. Charming, not corporate.
- **Voice = anti-snob.** The name winks at "snob"; the tone is the opposite — warm, plain-spoken, proof-led, never hype. (Full voice guide in §10.)

---

## 3. Section map — Chisel element → Snobi section (copy upgraded to strategy voice)

> Copy below is on-strategy and close to final-draft, but **anything quantitative (cup scores, prices, farmgate figures) is a placeholder until the quality gate clears** — pre-launch, frame transparency as the *promise*, not proven numbers (see §10 caveat).

**Nav (sticky, minimal)** — Left: SNOBI logotype + boar. Center: Story · Beans · Transparency. Right: ghost-rectangle button (Chisel "Learn More" style) → **"Join the waitlist."** Placeholder JP toggle.

**Hero** (Chisel: huge tight-leading header + ghost button + photography + entering line motif)
- Headline candidates (pick one in §9):
  - **"We show our work."** ← lead candidate; it's the whole thesis (transparency-as-luxury, anti-greenwashing)
  - "Organic. Specialty. Out in the open."
  - "Great coffee, with the receipts."
- Sub: "An organic specialty roaster from the Tokyo Coffee family — built on proof, not posturing."
- CTA: ghost-rect "Join the founders waitlist."

**Intro statement** (Chisel: the "We Get It." big-type moment on a color block)
- Big line: **"Snob name. Anti-snob coffee."**
- Support: "Specialty can feel like a members' club — scores you can't see, prices nobody explains. We're doing the opposite: organic beans that clear the specialty bar, and every number that backs them up, out where you can read it."

**Value pillars** (Chisel: bold rounded color blocks + diamond-+ corner; 3 blocks, alternating lilac / green / plum-inverse)
1. **The empty quadrant.** "Organic-*led* and specialty-grade is a corner of the map almost no one with a name occupies — organic roasters skip the cupping table, specialty roasters skip organic. We only chase beans that clear both bars."
2. **We show our work.** "Cup score, origin, altitude, process, roast date — and what the farmer was actually paid. Eventually the organic-certification costs and the carbon per bag too. Most brands tell you it's good. We'll show you why, with numbers."
3. **We are the translation.** "Half-Japanese, half-American founders. We don't translate Japanese craft for the West — we *are* the translation. Precision and seasonality (旬), minus the gatekeeping."

**The lineup (3-SKU teaser)** (cards, shared component system)
- **Anchor** — "Your everyday bag. Organic, consistent, always on the shelf."
- **Showcase** — "The current best lot — rotates with the seasons (旬)."
- **Conversation Starter** — "The rare one — an unusual process or origin worth telling people about." 
- State: "The first three land at launch. Limited seasonal drops after that."

**Transparency teaser** (mono "spec strip" device — the differentiator)
- "Here's what a Snobi bag will tell you:" → spec strip: `CUP 87.5 · GUJI, ET · 2,050m · WASHED · ROASTED 2d AGO · FARMGATE ¥xxx/kg` *(placeholder)*. Line: "Every product page becomes a mini case-study. It's the thing no competitor does well — so we'll do it to 11."

**Image crossfade sequence** (Chisel bottom — the "flashing through images")
- Auto-advancing **crossfade** through 4–6 real photos: green beans → roaster → farm/origin → café → packaging. ~4–5s each, smooth fade. Disable autoplay under `prefers-reduced-motion`. Use the best photography here.

**Founders waitlist CTA**
- "Founders get the first bags, launch pricing, and the receipts before anyone else."
- Email capture. Backend = integration TODO (Shopify newsletter / Klaviyo / Formspree) — for static v1 wire a placeholder endpoint and flag it.

**Footer** — quiet endorsed-brand line: "An organic specialty line from Tokyo Coffee." Room for JAS + USDA Organic marks. Socials. EN/JP. Boar mark.

---

## 4. Animation spec
- **Line motifs:** SVG strokes, draw-on via `stroke-dashoffset`; scroll-linked movement à la Chisel. **GSAP + ScrollTrigger** for scroll-pinned choreography; **Framer Motion** for reveals + hover micro-interactions.
- **Image crossfade:** Framer Motion `AnimatePresence` (or Embla fade), autoplay, crossfade not slide.
- **Reveals:** sections fade/slide up on enter; subtle hover lift on cards/buttons.
- **Always** respect `prefers-reduced-motion` (kill autoplay + transforms).

## 5. Tech stack (agreed)
- **Next.js (App Router) + TypeScript + Tailwind** — one page now, room to grow into store + bilingual.
- **shadcn/ui** base + **21st.dev** marketing components via the shadcn registry or the 21st.dev "Magic" MCP. Magic UI / Aceternity for animated-line bits.
- **Framer Motion** + **GSAP/ScrollTrigger** + **Embla**.
- **Fonts:** `next/font/local` for licensed PP Editorial Sans + Aeonik (or Geist via `next/font`), Fisterra logo as SVG.
- **Images:** `next/image`. **Deploy:** Vercel.
- MCP discipline: add the 21st.dev Magic MCP only for this build, or use the shadcn CLI registry to avoid a persistent server.

## 6. Assets Noah must provide (drop into `/public` or hand to CC) — the #1 anti-slop lever
- [ ] **Fonts:** either licensed **PP Editorial Sans + Aeonik** (.woff2) for an exact Chisel match, or confirm free substitutes (Geist + editorial grotesque).
- [ ] **Logo lockup + boar mark as SVG** (Fisterra wordmark) — vector, not the PNGs.
- [ ] **Photography** — beans, roaster, farm/origin, café, packaging. Real. The single biggest lever.
- [ ] Hero headline pick + any final copy / JP later.
- [ ] Real transparency data for the teaser (else placeholders — see §10 caveat).

## 7. Where CC pulls deeper content
- **Strategy research (canonical, on disk):** `~/Documents/RTU/research-outputs/2026-02-16-premium-brand/` — especially `04-synthesis.md` (positioning, the 4 strategic paths, anecdotes), `ra-3-positioning-strategist.md` (voice/positioning), `summary.md`.
- Vault: `Projects/Premium-Line/workstreams.md` (3-SKU system, pricing tiers, transparency mechanism), `README.md`.
- ⚠ The `rogutore.github.io/docs/premium-brand-strategy.html` link in the README is **dead (404)** — use the on-disk research outputs above instead.
- (CC can't read the claude.ai "Tokyo Coffee" Project Knowledge — rely on the on-disk sources.)

## 8. CC kickoff (paste into the Claude Code session)
> "Read `~/Documents/RTU/brain/Projects/Premium-Line/website-build-brief.md` and the sources it lists in §7. Open chiselindustries.com and study its structure + animation. Scaffold a Next.js + Tailwind + shadcn/ui project for the Snobi pre-launch landing page per the brief, pulling marketing components from 21st.dev. Use PP Editorial Sans (headers) + Aeonik (body) — or Geist if unlicensed — the Fisterra logo SVG, and the photography in `/public`. Build section by section against the §3 map; run locally and iterate. Write a handoff back to the Vault when done."

## 9. Open decisions to confirm
- [x] **Header font** → RESOLVED: PP Editorial Sans (Chisel's). Fisterra reserved for the logo wordmark.
- [ ] **Font licensing:** license PP Editorial Sans + Aeonik for exact match, vs free substitutes (Geist).
- [ ] **Hero headline:** "We show our work." (lead candidate) vs alternates.
- [ ] **Waitlist backend:** Shopify newsletter vs Klaviyo vs Formspree.
- [ ] **Boar motif:** how prominent / animated?
- [ ] **Transparency claims pre-launch:** keep all numbers as placeholders until 85+ scores are real (see §10).

## 10. Voice & messaging guide (from the strategy research)

**Positioning in one line:** the organic-specialty *empty quadrant* — organic-led identity + genuine specialty credibility (85+) + radical transparency. No brand with mindshare occupies it.

**The hybrid narrative (use all three layers):**
1. **Journey into Specialty** — the authentic evolution from organic roaster toward specialty credibility. Only powerful *with proof points* (first 85+ lot, first direct farm relationship, first competition entry). Until those are real, frame as "here's where we are," never fake the milestones.
2. **Japanese craftsmanship** — precision, restraint, seasonality (旬). Earned, not cosplay — the founders are bicultural, so it's genuine perspective.
3. **Anti-snob tone** — warm, plain-spoken, no jargon flex. Education and data over hype.

**Transparency-as-luxury ("we show our work"):** the differentiator. Publish cup scores, farmgate/FOB prices, organic-certification costs, soil/yield data, carbon per bag. Be the most transparent organic coffee brand in the world — a position nobody holds.

**Unreplicable asset:** half-Japanese / half-American founders — "we don't translate Japanese craft, we *are* the translation." Central to story + content.

**Tone rules:**
- The marketing must never be louder than the product (Tokyo's specialty scene is small and scrutinizing — first impressions don't undo).
- Price is a feature, not an apology. Don't discount the positioning.
- Lead with the cupping table and the numbers; let the coffee make the argument.
- Bilingual (EN/JP) is a structural moat — write so it translates cleanly.

**Hard caveat for the build:** the brand's credibility rests on real specialty scores. Do **not** publish specific cup scores, prices, or farmgate figures as fact until they're verified. Pre-launch copy sells the *promise* of transparency and the waitlist — not unproven numbers.

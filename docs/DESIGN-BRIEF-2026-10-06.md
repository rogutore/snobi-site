# SNöBI website — design brief from the design arsenal (2026-10-06)

Written by the design-arsenal session for the snobi-site session. Read after `docs/RESUME.md`. Design rules now live in one
place for every agent: `/Users/kishimakoto/Documents/RTU/design-arsenal/` (skill `design-arsenal`). Where this brief and the
arsenal disagree, the arsenal file wins; where the arsenal and this repo's code disagree on a SNöBI value, the repo wins.

## 1. Read, in this order (open the files; don't work from memory)
1. `design-arsenal/README.md` → `doctrine/00-taste.md` (taste, AI-slop tells, **NEVER list**, 12-question pre-flight)
2. `design-arsenal/brands/snobi/DESIGN.md`: the brand mirror with every token cited to this repo, plus **Open decisions** at the end
3. `design-arsenal/process/website-pipeline.md` (gates 0–9) and `process/design-md.md` (this repo should own its DESIGN.md)
4. `design-arsenal/references/sites.md`: ★ = your own v2 picks (The Watch, Primland, Daylight, Apple AirPods JP, /zeroz, Oryzo, Kettl, Polène, Flamingo Estate, Sakazuki), live-checked 2026-10-06, with what to take from each
5. `doctrine/typography.md` (Japanese section), `doctrine/motion.md`, `doctrine/imagery-media.md`, `tools/default-stacks.md` §c (e-commerce/product page)
6. `process/visual-qa.md` (1440 / 768 / 390 / 360, reduced motion, no-JS, console) before showing the owner anything
7. Video/film: `design-arsenal/video/README.md` and `video/snobi-10s-spot.md` (owned by the video session; HyperFrames only, no Remotion)

## 2. Owner decisions already made (do not reopen)
- Direction: **Daylight × Oryzo × Kettl** (2026-10-05). Light/neutral, one real object in daylight, buy route always visible.
- **Multi-page site** (site-plan D3). Never another one-page mockup.
- Positioning = live copy: "Organic. And actually specialty." / オーガニックのまま、スペシャルティ。 Never "we show our work".
- World-class, not "mid"; plan before big builds. HyperFrames for all company video (no Remotion licence).

## 3. What the arsenal flags for SNöBI specifically
- **Stand-in fonts are on the NEVER list.** Mockups A–D used Fraunces/Newsreader/Zen Kaku as stand-ins; production must use
  the real Moret / Maiola / 秀英角ゴシック銀 (Adobe kit `xkh1hrz`). Pin `@font-face` to known sources and verify the served
  face (`document.fonts`). Renderers silently substitute unknown families (found in the SNöBI video bake-off).
- **No type scale** (~120 literal px sizes). Build a fluid scale first (Utopia; `doctrine/typography.md` §1) and tokenise.
- **Contrast** (computed 2026-10-06): sage on paper 4.20:1, lilac on paper 2.20:1, Peru/Ethiopia inks on their tints
  3.95:1 → large text / non-text only. Two focus styles exist (sage outline `globals.css:134-137` vs lilac ring
  `button.tsx:9`): pick one.
- **Asset names must be unambiguous**: `snobi-wordmark.svg`, `snobi-mark-boar.svg` (two of three video agents used the boar
  as the wordmark). The video repo already adopted these names.
- **Faces need consent** before production (`street-above`, `roaster-op-2` in the mockups). No stock farm footage
  (the Pixabay drone clip is illustrative only).
- **Baseline design scan of live snobi.jp** (`npx impeccable detect`, 2026-10-06): **48 findings**: 31 undersized UI text
  (9–10px functional labels below the 11px floor), 5 line-length, 5 kicker-above-heading, 4 wide-tracking,
  1 cream-palette, 1 buried-raster, 1 all-caps-body. Full list:
  `~/Documents/RTU/rogutore-site-impeccable-trial/.impeccable-trial/baseline-snobi.jp-20261006.txt`.
  The 10px Geist Mono eyebrow (`globals.css:148-154`) is the main offender.
- Mockup D's moves that collide with the NEVER list: giant footer wordmark, index-with-image-swap, outlined ghost words,
  pinned horizontal strip (all in Mockup B). Don't carry them into production.

## 4. Tools worth using here (verdicts in `design-arsenal/tools/`)
`gsap-skills` (official GSAP skill) for scroll scenes; `scroll-craft` (nateherkai, MIT) to *test* on one storytelling
page; Emil Kowalski `emil-design-eng` for motion polish; Playwright for the QA loop; `npx impeccable detect` before and
after each pass; Firecrawl Branding is not needed (brand tokens already exist in this repo).

## 5. Suggested first step (propose to the owner; build only after an OK)
Gate 0–3 of the website pipeline, as one short plan:
1. Answer the 12 pre-flight questions for SNöBI (most are already decided above; write them down).
2. Add `DESIGN.md` to this repo, generated from or sourcing `app/globals.css` (single source), with the type scale and the
   focus/contrast decisions. Lint with `npx @google/design.md lint`.
3. Page system for D (nav, header, section rhythm, product/release card, origin page, article template, footer):
   site-plan phase 1b.
4. Quick wins from the Impeccable baseline on the live site (text floors, tracking) as a separate small PR.
Then port Mockup D into the Next.js app page by page with the real fonts, verifying each in the browser.

Questions → the design-arsenal session (SendMessage "Design research and knowledge organization").

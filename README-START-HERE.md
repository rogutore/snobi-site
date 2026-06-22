# START HERE — Snobi site build

## Where to open Claude Code
Open Claude Code **in this folder**:
```
~/Documents/RTU/snobi-site
```
That's the repo. It doesn't have a Next.js app yet — CC scaffolds that as step 1 (kickoff below).

## Paste this into Claude Code to start
> Read `website-build-brief.md` (and the sources it lists in §7) and `PHOTO-PROMPTS.md`. Open chiselindustries.com and study its structure + line/scroll animation + the image crossfade. Then scaffold a Next.js (App Router) + TypeScript + Tailwind + shadcn/ui app **in this folder**, pulling marketing components from 21st.dev. After scaffolding, move `brand/` and `photos/` into `public/`. Build the Snobi pre-launch landing page section-by-section against the §3 map: PP Editorial Sans (headers) + Aeonik (body) — or **Geist** if unlicensed — using the Fisterra logo from `public/brand/`. Use Framer Motion + GSAP/ScrollTrigger for the line motifs and the crossfade. Run locally and iterate. Write a handoff back to the vault (`brain/Projects/Premium-Line/`) when done.
>
> If `create-next-app` refuses because the folder isn't empty, scaffold into a temp subfolder and merge.

## What's already staged for you
```
snobi-site/
├── website-build-brief.md   ← full spec (palette, fonts, section map, voice, animation)
├── PHOTO-PROMPTS.md          ← Nano-Banana prompt pack for custom photos
├── brand/
│   ├── snobi-logotype.png    ← SNOBI wordmark (Fisterra), transparent + trimmed
│   └── snobi-boar.png        ← boar mark, transparent + trimmed
└── photos/
    ├── snobi-bag-hero.jpg     ← REAL Snobi bag shot — use as hero/feature
    ├── snobi-roastery-1.jpg   ← real Tokyo Coffee roastery
    ├── snobi-roastery-2.jpg
    ├── snobi-brewing-1.jpg    ← real pour/brew
    ├── snobi-brewing-2.jpg
    └── snobi-people-1.jpg     ← real atmosphere/people
```

## Notes / open decisions
- **Fonts:** PP Editorial Sans + Aeonik are commercial (exact Chisel match → license). Free path = **Geist** (ships with Next.js). Logo stays Fisterra — currently a transparent PNG; vectorize to SVG later for production.
- **Photos:** the staged shots are real and brand-neutral (no TC signage) — good mockup placeholders. For custom organic-farm / roasting / close-up shots, use `PHOTO-PROMPTS.md` with Nano Banana **inside CC** (no Gemini key on this machine). You can also reference specialty stock by URL if needed.
- **Still to confirm:** hero headline ("We show our work." is the lead), waitlist backend, how prominent the boar is. (See brief §9.)
- This is a **mockup** — placeholders are fine; real cup scores / prices / farmgate numbers stay placeholders until verified (brief §10).

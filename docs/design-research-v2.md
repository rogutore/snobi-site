# Snobi — design research v2: what cutting edge actually looks like (2026-10-05)

Written after the owner rejected the three 2026-10-05 mockups. Part 1 is the honest critique of what was built. Part 2 is the survey: 34 sites visited in a headless browser at 1440×900 (three screens each, contact sheets in `design-research-v2-top10.jpg` and `design-research-v2-runners.jpg`), award data read from awwwards.com. Part 3 ranks the ten that meet the owner's criteria: cutting edge, not necessarily coffee, light/neutral, a few products, real place and people, and a buy route that survives the drama.

Claims are marked VERIFIED (visited or read today), INFERRED, or UNKNOWN.

## 1. Critique of the 2026-10-05 mockups and lab prototype

**All three mockups (A Film, B Release, C Light)**
- Single pages. The approved structure (site-plan D3) is Home, Coffee, Origins, Story, Journal, FAQ, Trade as real pages. All three collapse everything into one scroll with anchors, with the same nine sections in the same order. They are three skins over one architecture, not three sites.
- Motion is scroll-linked transforms only (fade-up, parallax, crossfade, sticky column, pinned horizontal strip). Every Shopify agency ships these; none stops a reader.
- Template section list: three feature boxes, FAQ accordion, journal cards with bracketed titles, trade grid, giant footer wordmark copied from Chisel.
- Stand-in fonts (Fraunces for Moret) read soft and generic; nothing feels like Snobi.
- No product object. The label art, the one asset the earlier research named as the hero, appears nowhere at scale. The bag is never big, sharp, rotating, or full-bleed in hand.
- Published before being opened in a browser. The first look afterwards found nav wrapping, narrow headings and a missing `[hidden]` rule.

**A, Film**
- Opens on three screens of a Pixabay drone clip of someone else's hills, labelled "illustrative". A brand whose claim is "actually specialty" cannot open on a farm that is not ours.
- 60 frames at 1024px: soft on any desktop. Real scroll films run 120–200 frames at 1920px+.
- After the hero the "film" becomes four stills crossfading in a sticky column.
- Four release spreads from one template with a pastel fill behind each; reads as a catalog, and the fills read as a children's brand. The held-bag photos are cropped identically four times.
- The shoot's strongest frames (four bags with the carafe in dappled light; the bag opened over green sacks; the bean drop) are in small slots or missing. Studio shots unused.

**B, Release**
- Index-with-image-swap, outlined ghost words, pinned horizontal strip: three of the most copied Awwwards devices of the last five years. They signal "studio portfolio", not a coffee to buy.
- Each spread reuses the same three photos in the same arrangement, alternating sides.

**C, Light**
- Best photo use of the three, but the quietest template: headline over photo, two-column place section, a product row on a grey sweep that looks like any collection page.
- Street photo shows a staff member's face without consent; rooftop photo captioned with filler. The roast calendar is the one real idea and it is tiny.

**Lab prototype `/lab/film`**
- Built with the old Tokyo Coffee stand-ins although the shoot was on the Mac (swapped later the same night). Same stock drone sequence, same sticky crossfade.

**Process**
- Did not revisit the research before building. Treated "three mockups" as three palettes.

## 2. Method

- Owner's past targets (vault `research-lp-patterns.md`, `research-buy-flow.md`, `aeo-design-review.md`, `website-build-brief.md`): Apple AirPods Pro JP, Teenage Engineering, Graza, Cometeer, Jot, Minimal, PostCoffee, Onyx, Fuglen, Kurasu, Fellow, Verve, Chisel. VERIFIED.
- Sources for candidates: Awwwards E-commerce winners, Innovative Product Pages winners, Food & Drink winners, SOTD/SOTY 2025–2026; scrollytelling.ai and utsubo Three.js lists; S5-Style (Japanese gallery) recent picks; Garden Eight and SHIFTBRAIN case lists. VERIFIED (fetched 2026-10-05).
- 34 sites visited: /zeroz, Aesop, Flamingo Estate, Brightland, Diaspora Co, Scout Motors, Best Bean Best Cup, Explore Primland, Oryzo, Ivress, Inversa, Sakazuki, Apple AirPods Pro JP, Teenage Engineering, Daylight, Nothing, Polène, Kettl, Bucks Sauce, Telepathic Instruments, Capsules, Lightweight, The Watch (60fps), Serotoninn, Aardvark Book Club, Igloo Inc, Minimal, Tanica, 坂田の黄金しょうが, Onyx, Roaster (Garden Eight), Hermès JP, Lusion, By-Kin, Shopify Editions Spring '26, Chanel J12 JP. Cartier Watches & Wonders timed out (UNKNOWN). YAMA MATCHA's domain no longer resolves (UNKNOWN).

## 3. The ten, ranked for Snobi

Ranking weights, in order: wow that comes from one real object or one real place; light/neutral palette; a few products; a buy route that survives the drama; Japan relevance; craft.

| # | Site | What it is | Award | The wow | What Snobi takes from it |
|---|---|---|---|---|---|
| 1 | **The Watch** (60fps) — thewatch.60fps.fr | One watch, real-time WebGL on a light grey ground; the object stays pinned centre, rotating and re-lighting as copy and giant type pass around it | SOTD 2026-08-17, Product Honors Jul 2026. VERIFIED | Product held still, world moves, on a *light* ground. Nothing else visited does this in light | The bag as the hero object: a 3D scan of the real Snobi bag (photogrammetry, doable in Tokyo) or a 180-frame turntable sequence at 2000px, pinned while origin, roast and cup pass by |
| 2 | **Explore Primland** (Outpost) — explore.ownprimland.com | Aerial flythrough of real Blue Ridge terrain with clouds, seasons and a map, scroll-driven | SOTD 2026-02-04. VERIFIED | A real place you fly over; no stock footage | Origin pages as flyovers of the real Chirinos, Guji, Huila and Chiapas terrain built from public 3D terrain data. Ends the fake-farm problem without waiting for drone footage |
| 3 | **Daylight** (basement studio) — daylightcomputer.com | One device photographed and rendered in sunlight on paper and grass; scroll chapters; "Order now" always present | SOTD 2024-06-18, E-commerce Honors. VERIFIED | The closest mood match to Snobi: paper, sun, leaves, calm, one product, and it sells | The light/natural art direction proven on a real store; the single persistent buy control |
| 4 | **Apple AirPods Pro 3 JP** — apple.com/jp/airpods-pro | Light product-first page; pre-rendered scroll sequences; Japanese typography; price and buy row near the fold | The reference standard. VERIFIED | Not novel, but the bar for scroll-film craft and JP type | Image-sequence technique at proper resolution; price + buy that never disappears; JP text set large and quiet |
| 5 | **/zeroz by Otsuka** (SHIFTBRAIN) — otsuka-air.jp | Japanese food product carried through 3DCG chapters; one product, persistent "Online store" button | SOTD 2026-08-24, Developer Award. VERIFIED | A Japanese food brand doing a real chapter film with the product as the constant | The chapter structure for a JP audience; proof that a Tokyo studio can build this. Palette is dark green, so take structure, not colour |
| 6 | **Oryzo** (Lusion) — oryzo.ai | A cork coaster given physics, weight and depth on scroll | Lusion demo. VERIFIED | A humble object made to feel crafted by motion alone | The humble bag treated with the same seriousness: open, pour, seal as scroll moments. Dark; reinterpret in light |
| 7 | **Kettl** — kettl.co | Japanese tea, farm-direct; releases shot as mounds on white; an origin map of prefectures with numbered farms | None. VERIFIED | The content model for an origin-driven small catalog | "New releases" framing; an origins map with numbered producers; wholesale path alongside retail |
| 8 | **Polène** — polene-paris.com | Leather goods shown small inside vast Nordic landscapes, full-bleed | E-commerce Honors Nov 2024. VERIFIED | Product inside place, photographed, not composited | The brief for the next shoot and for licensed origin photography: the bag in a real landscape, small, full-bleed |
| 9 | **Flamingo Estate** — flamingoestate.com | A farm as a brand: light editorial store, produce photography, estate stories | None. VERIFIED | Place-as-brand in a light palette that still sells hard | The light editorial system for Story and Journal; produce-grade photography of beans and cups |
| 10 | **Sakazuki** — sakazuki.io | Japan craft membership; numbered chapters, "( people )", maker portraits, big type | SOTD 2026-06-14. VERIFIED | People and craft as the story, in a Japanese register | The producer pages: one maker per chapter, portrait-led, numbered. Palette is red/cream; take structure |

Runners-up, in order: Scout Motors (E-commerce of the Year 2025, film-first reserve flow, too dark and automotive), Chanel J12 JP (light-to-dark product rotation, luxury pacing), Teenage Engineering (owner's existing reference, paper and play), Hermès JP (editorial play, light), Aesop (restraint), Inversa (documentary aerial, dark), Roaster by Garden Eight (Tokyo studio craft, earthy type on white), Tanica (JP light lifestyle brand, solid not wow), Shopify Editions Spring '26 (scroll choreography, mobile-heavy), Lusion and Active Theory (studios, not stores).

Rejected after visiting: Diaspora Co, Brightland, Best Bean Best Cup, Bucks Sauce, Aardvark (bold colour or popups, not the register); Nothing, Lightweight, Capsules, Telepathic, Igloo (dark); Minimal (now a plain Shopify theme); Onyx (dark hero, grid); Serotoninn, By-Kin (not stores).

## 4. What the top of the list has in common

1. **One real object or one real place, in 3D.** The Watch, Primland, /zeroz, Oryzo. The wow is not a template; it is a scanned product or real terrain with a single continuous camera. INFERRED from the visits.
2. **Light grounds carry it.** The Watch, Daylight, Apple, Hermès and Kettl all keep the product on a bright neutral ground with at most one dark moment. The owner's light/neutral rule is the world-class choice, not a constraint.
3. **The buy route is always on screen** (Apple, Daylight, /zeroz, Kettl), consistent with the 2026-09-10 pattern research.
4. **Specialist studios built the top four** (60fps, Outpost, SHIFTBRAIN, Lusion, basement). Blender assets plus Three.js or WebGL. A Next.js site can host this, but the assets have to exist first.

## 5. The two assets that would unlock this for Snobi

- **A 3D scan of the real bag** (photogrammetry or a 180-frame turntable). Enables #1 and #6 on a light ground. UNKNOWN cost until quoted; a Tokyo photogrammetry service or a turntable shoot with the existing photographer are both plausible.
- **Real terrain for the four origins** from public 3D terrain data (for example Google Photorealistic 3D Tiles or Mapbox terrain). Enables #2 without drone footage and without presenting someone else's farm. INFERRED: licensing terms need checking before use.

The 2026-10-01 shoot stills carry Story, Journal, the roastery and the cup. They are not enough to carry the hero on their own.

## 6. Not built yet

No new mockups until the owner picks a direction from this list. The 2026-10-05 artifacts remain published for reference only.

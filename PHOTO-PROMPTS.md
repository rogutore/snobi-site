# Snobi — Photo Prompt Pack (Nano Banana / Gemini image)

Run these in Claude Code via the claude → Nano-Banana workflow (Gemini image model) — there's **no Gemini key on this machine**, so generation happens in the build session. For the current mockup we're using the real Snobi bag shot + real Tokyo Coffee roastery/brewing photos in `photos/`; use these prompts when you want custom, brand-controlled imagery.

## Shared style suffix (append to every prompt)
> "Shot on a full-frame camera, 50mm/85mm prime, f/1.8–f/2.8, shallow depth of field with creamy bokeh. Soft natural window light, gentle warm key with cool fill. Filmic, editorial specialty-coffee mood — muted, earthy palette with soft plum-grey shadows. Fine film grain, true-to-life skin and material texture, high micro-contrast. No text, no logos, no watermarks, no oversaturation, no plastic AI look, no extra fingers. Photorealistic, magazine quality."

## Palette nudge (optional, to harmonize with brand)
> "Color grade leans warm-neutral with desaturated aubergine/plum and pale sage accents in the shadows."

## Shots
1. **Farm hand with cherries (organic origin)** — "Close-up of a coffee farmer's weathered hands cupping freshly picked ripe red coffee cherries, dappled sunlight through coffee plants behind, soft green bokeh. Documentary, dignified, authentic — not staged stock."
2. **Roasting (action)** — "A roaster in a small craft roastery checking the drum of a shop roaster, beans tumbling, warm amber light, steam and chaff in the air, motion in the hands, machine in sharp focus and background falling into bokeh."
3. **Roastery running shot (atmosphere)** — "Wide-ish interior of a minimal Tokyo craft roastery in motion — bags of green beans, a roaster mid-batch, soft daylight from a window, a figure moving (slight motion blur), clean negative space, calm and precise."
4. **Beans close-up** — "Extreme macro of freshly roasted single-origin beans, visible oils and chaff, one bean in razor focus, the rest melting into bokeh, raking warm light revealing texture."
5. **Pour / brew close-up** — "Top-down-ish close-up of a slow pour-over, gooseneck kettle, bloom rising in the dripper, steam, warm light, shallow focus on the bloom."
6. **Packaging hero (optional, brand)** — "A matte off-white coffee bag held in one hand against a deep aubergine vertical-slat background, soft directional light, premium minimal product photography, lots of negative space." *(mirrors the existing Snobi bag mockup — keep that one as the real hero.)*

## Notes
- Generate 3–4 variations per shot; pick the most real (least AI-tell).
- Keep people candid/documentary — staged "stock smile" shots read fake.
- Export ~2000px long edge; drop into `public/photos/`, optimize via `next/image`.

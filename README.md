# SNöBI storefront

Japanese-first organic specialty coffee storefront for Tokyo Coffee. Next.js App Router; Cloudflare Workers through OpenNext is the production hosting path. Shopify supplies stock, cart and hosted checkout. A local build does not establish what is deployed.

## Project entry points

- [AGENTS.md](AGENTS.md) and [DESIGN.md](DESIGN.md): implementation and design rules. Read relevant installed guides in `node_modules/next/dist/docs/` before changing framework code.
- [RESUME.md](docs/RESUME.md): deployment/history record; older entries may be superseded.
- [Worklog](docs/codex/CODEX_WORKLOG.md): audit, local fixes, proposals and verification limits.
- [Current work](docs/research/2026-10-17-next/README.md) and [remaining-work inventory](docs/research/2026-10-17-next/WEBSITE-REMAINING.md): commerce, SEO, Story and next actions.

During the audit weekend, use the isolated worktree and follow [the brief](docs/codex/CODEX_AUDIT_WEEKEND_2026-10-17.md). No deployment, sends, Shopify/Cloudflare changes or vault writes are authorized by development instructions. Stop deadline: Monday 2026-10-19 09:00 JST.

## Local checks

Use the existing dependency installation. `npm run dev` starts development; `npm run build` builds and `npm run start` serves the local production build. Python 3.11+ is required by the registry validator, which runs as the first step of `npm run build` and `npm run cf:build` (and so of every OpenNext build, which calls `npm run build`); invalid or stale generated registry data refuses the build. `next dev` and `next start` do not run it.

```sh
python3 scripts/system-registry.py --check
python3 scripts/gates/registry-regression.py
node scripts/tests/cart-response.mjs
node scripts/tests/shipping-linkage.mjs
npm run build
node node_modules/typescript/bin/tsc --noEmit -p .
npm run lint
```

Cart unit tests use synthetic services. Browser tests in `scripts/tests/variant-browser.mjs` require a local server started with `scripts/tests/shopify-fixture.mjs` and synthetic environment values; see [test evidence](docs/research/2026-10-17-next/implementation/E04/). Do not substitute a live add/checkout flow. A local build may read stock if real Storefront configuration is present; credentials stay outside the repository and logs.

## Source map

| Concern | Source |
|---|---|
| Japanese / English routes | `app/(ja)/(site)/` / `app/(en)/en/` |
| Current Japanese UI | `components/v3/`; some older components are unmounted |
| Products and wording | `content/products.ts`, `content/ordering.ts`, `content/journal/` |
| Registered policies | `system.toml` → `scripts/system-registry.py` → `content/system.generated.ts`; generate, never hand-edit |
| Shopify and private cart boundary | `lib/shopify/`; `cart-view.ts` projects browser responses |
| SEO | `lib/seo.tsx`, route metadata, sitemap/robots |
| Design tokens | `app/globals.css` and generated `DESIGN.md` |
| Supplier rights | `content/origin-media.json`, `content/origin-media.ts`, `docs/permission-emails.md` |

Registry coverage is incremental; formal linkcheck opt-in remains unfinished. Tests, responsive screenshots, physical-device checks and production verification are separate evidence. Local success is not release approval.

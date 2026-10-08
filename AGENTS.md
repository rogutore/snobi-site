<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design

Before any UI, styling or copy work, read `DESIGN.md` and follow it; do not introduce raw colours, fonts or spacing values. Tokens live in `app/globals.css` (`@theme` + `.t-*` roles); after changing them run `python3 scripts/design-md-sync.py` and `npx @google/design.md lint DESIGN.md`.

#!/bin/zsh
# Snapshot every journal post object plus the ordering exports as JSON, to prove a content refactor changes no rendered
# content: take one before the edit, one after, and cmp (ignore only export names you added on purpose).
# usage: scripts/gates/content-snapshot.sh <repo> <out.json>
# (Never name a zsh variable `path` in scripts like this: it is tied to PATH.)
set -eu
REPO=$1; OUT=$2
TMP=$(mktemp -d)
cd "$REPO"
node node_modules/typescript/bin/tsc content/journal/index.ts content/ordering.ts content/products.ts \
  --outDir "$TMP" --module commonjs --target es2022 --moduleResolution node --esModuleInterop --resolveJsonModule --skipLibCheck --rootDir .
node -e '
const dir = process.argv[1];
const { posts } = require(dir + "/content/journal/index.js");
const ordering = require(dir + "/content/ordering.js");
const byslug = Object.fromEntries([...posts].sort((a, b) => a.slug.localeCompare(b.slug)).map(p => [p.slug, p]));
process.stdout.write(JSON.stringify({ posts: byslug, ordering }, null, 1));
' "$TMP" > "$OUT"
rm -rf "$TMP"
echo "snapshot: $OUT ($(wc -c < "$OUT") bytes, $(node -e 'console.log(Object.keys(require(process.argv[1]).posts).length)' "$OUT") posts)"

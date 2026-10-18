import { getCloudflareContext } from "@opennextjs/cloudflare";

/* The home hero films with HTTP byte ranges (2026-10-11). Static assets on Workers answer a Range request with the whole
   file (200, no Accept-Ranges), and iPhone Safari will not play a video served that way — so iPhones only ever saw the
   poster. This route reads the same file from the assets binding and answers ranges with 206. Only the hero files. */
const FILES: Record<string, string> = {
  "hero-960.mp4": "/v3/hero-960.mp4",
  "hero-1600.mp4": "/v3/hero-1600.mp4",
};

async function load(path: string, base: string): Promise<ArrayBuffer> {
  let res: Response;
  try {
    const { env } = getCloudflareContext();
    res = await (env as { ASSETS: { fetch: (u: string) => Promise<Response> } }).ASSETS.fetch(new URL(path, base).toString());
  } catch {
    res = await fetch(new URL(path, base)); // next dev: the dev server serves public/
  }
  if (!res.ok) throw new Error(`media: ${path} answered ${res.status}`);
  return res.arrayBuffer();
}

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!Object.hasOwn(FILES, name)) return new Response("Not found", { status: 404 });
  const path = FILES[name];
  const body = await load(path, req.url);
  const size = body.byteLength;
  const headers: Record<string, string> = {
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
  };
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get("range") ?? "");
  if (!range) return new Response(body, { status: 200, headers: { ...headers, "Content-Length": String(size) } });
  let start = range[1] === "" ? size - Number(range[2]) : Number(range[1]);
  let end = range[1] === "" || range[2] === "" ? size - 1 : Math.min(Number(range[2]), size - 1);
  if (Number.isNaN(start) || start < 0) start = 0;
  if (start > end || start >= size) {
    return new Response(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${size}` } });
  }
  end = Math.min(end, size - 1);
  return new Response(body.slice(start, end + 1), {
    status: 206,
    headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
  });
}

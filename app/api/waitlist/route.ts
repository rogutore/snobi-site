import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ *
 *  ⚠️ PLACEHOLDER WAITLIST ENDPOINT — integration TODO (brief §3/§9)   *
 *                                                                      *
 *  This currently just validates + logs the email and returns ok.     *
 *  Swap the body for a real backend before launch:                    *
 *    • Shopify newsletter / customer create                           *
 *    • Klaviyo  (POST /client/subscriptions)                          *
 *    • Formspree / Resend audience                                    *
 *  Keep the same {ok} / {error} response shape so the form needs no    *
 *  changes.                                                            *
 * ------------------------------------------------------------------ */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like an email." },
      { status: 422 },
    );
  }

  // TODO: persist to the real waitlist backend.
  console.info("[waitlist:placeholder] would subscribe →", email);

  return NextResponse.json({ ok: true });
}

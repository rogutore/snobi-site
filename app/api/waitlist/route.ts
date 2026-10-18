import { NextResponse } from "next/server";

/* No page calls this retired placeholder. Until an actual subscription backend is
   approved, refuse explicitly and never parse, retain or log submitted personal data. */
export async function POST() {
  return NextResponse.json(
    { error: "Waitlist unavailable." },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

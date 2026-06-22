"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type State = "idle" | "loading" | "done" | "error";

/* Founders-list capture — the teaser's closing beat. */
export function WaitlistCTA() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<State>("idle");
  const [message, setMessage] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("done");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section
      id="join"
      className="bg-paper px-6 py-28 text-center lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="display text-[clamp(2.5rem,7vw,6rem)] leading-[1.04] text-plum">
            We&apos;re almost ready.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl">
            Join the founders list — get the first bags, and the proof, before
            anyone else.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-lg">
            {state === "done" ? (
              <div className="rounded-2xl border border-plum/15 bg-green p-10">
                <p className="display text-3xl text-plum">You&apos;re on.</p>
                <p className="mt-3 text-plum/70">
                  We&apos;ll be in touch before launch.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-sm border border-plum/30 bg-paper px-5 py-3.5 text-base text-plum placeholder:text-plum/40 focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/30"
                  />
                  <Button
                    type="submit"
                    variant="solid"
                    disabled={state === "loading"}
                    className="shrink-0"
                  >
                    {state === "loading" ? "Joining…" : "Be first in line"}
                  </Button>
                </div>
                {state === "error" && (
                  <p className="text-sm text-plum">{message}</p>
                )}
                <p className="spec text-[0.7rem] text-plum/45">
                  No spam. Just the launch.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

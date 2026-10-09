import { tradeForm as F } from "@/content/trade";

/* Shared by the /trade form (instant errors) and its server action (the real check). */
export type Field = "shop" | "type" | "name" | "email" | "interest" | "tooLong";
export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<Field, string>> }
  | { status: "failed"; message: string }
  | { status: "done"; email: string };

export const MIN_FILL_MS = 3000;
const LIMITS = { shop: 100, name: 60, email: 254, tel: 30, url: 200, opening: 40, message: 2000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const one = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
export const many = (fd: FormData, k: string, allowed: readonly string[]) =>
  fd.getAll(k).map(String).filter((v) => allowed.includes(v));

export function validate(fd: FormData): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!one(fd, "shop")) e.shop = F.errors.shop;
  if (!F.type.options.includes(one(fd, "type"))) e.type = F.errors.type;
  if (!one(fd, "name")) e.name = F.errors.name;
  if (!EMAIL.test(one(fd, "email"))) e.email = F.errors.email;
  if (many(fd, "interest", F.interest.options).length === 0) e.interest = F.errors.interest;
  for (const [k, max] of Object.entries(LIMITS)) if (one(fd, k).length > max) e.tooLong = F.errors.tooLong;
  return e;
}

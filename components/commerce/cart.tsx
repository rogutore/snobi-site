"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ShoppingBag, X, Minus, Plus, LoaderCircle } from "lucide-react";
import { products, yen, type Locale } from "@/content/products";
import {
  addLine,
  getCart,
  updateLine,
  removeLine,
} from "@/lib/shopify/actions";
import { ShippingProgress } from "./shipping-progress";
import type { Cart } from "@/lib/shopify/client";
type Context = {
  add: (id: string) => void;
  open: () => void;
  pending: boolean;
  count: number;
};
const CartContext = createContext<Context | null>(null);
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartProvider required");
  return ctx;
}
export function CartButton({ light = false }: { light?: boolean }) {
  const cart = useCart();
  return (
    <button
      type="button"
      onClick={cart.open}
      className={`cart-trigger ${light ? "on-dark" : ""}`}
      aria-label={`Cart (${cart.count})`}
    >
      <ShoppingBag size={17} />
      <span className="spec">{cart.count}</span>
    </button>
  );
}
export function CartProvider({
  children,
  lang = "ja",
}: {
  children: ReactNode;
  lang?: Locale;
}) {
  const en = lang === "en";
  const [cart, setCart] = useState<Cart | null>(null);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const busy = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let active = true;
    getCart(lang).then((r) => {
      if (active) {
        setCart(r.cart);
        if (r.error) setError(r.error);
      }
    });
    return () => {
      active = false;
    };
  }, [lang]);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (opened) {
      const previous = document.activeElement as HTMLElement;
      el.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        el.close();
        document.body.style.overflow = overflow;
        previous?.focus();
      };
    }
  }, [opened]);
  function run(
    action: () => Promise<{ cart: Cart | null; error?: string }>,
    open = true,
  ) {
    if (busy.current) return;
    busy.current = true;
    setError("");
    if (open) setOpened(true);
    startTransition(async () => {
      try {
        const r = await action();
        if (r.cart || !r.error) setCart(r.cart);
        setError(r.error || "");
      } catch {
        setError(en ? "Please try again." : "もう一度お試しください。");
      } finally {
        busy.current = false;
      }
    });
  }
  const subtotal = Number(cart?.cost.subtotalAmount.amount || 0);
  return (
    <CartContext.Provider
      value={{
        add: (id) => run(() => addLine(id, lang)),
        open: () => run(() => getCart(lang)),
        pending,
        count: cart?.totalQuantity || 0,
      }}
    >
      {children}
      <dialog
        ref={dialog}
        className="cart-dialog"
        aria-labelledby="cart-title"
        onCancel={() => setOpened(false)}
        onClick={(e) => {
          if (e.target === dialog.current) {
            const r = dialog.current!.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right) setOpened(false);
          }
        }}
      >
        <div className="cart-head">
          <div>
            <p className="eyebrow">SNöBI COFFEE CO.</p>
            <h2 id="cart-title" className="display">
              {en ? "Your bag." : "あなたのカート。"}
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={() => setOpened(false)}
            aria-label={en ? "Close cart" : "カートを閉じる"}
            autoFocus
          >
            <X />
          </button>
        </div>
        <div className="cart-body" aria-busy={pending}>
          {pending && (
            <p className="cart-status" role="status">
              <LoaderCircle className="spin" size={16} />
              {en ? "Updating your bag…" : "カートを更新中…"}
            </p>
          )}
          {error && (
            <p className="commerce-error" role="alert">
              {error}
            </p>
          )}
          {!cart?.lines.nodes.length && !pending ? (
            <div className="empty-bag">
              <ShoppingBag size={40} />
              <p>{en ? "A good cup starts here." : "次の一杯を、ここから。"}</p>
              <button
                type="button"
                className="commerce-button"
                onClick={() => setOpened(false)}
              >
                {en ? "Choose your coffee" : "コーヒーを選ぶ"}
              </button>
            </div>
          ) : (
            cart?.lines.nodes.map((line) => {
              const product = products.find(
                (p) => p.handle === line.merchandise.product.handle,
              );
              const variant = product?.variants.find(
                (v) => v.id === line.merchandise.id,
              );
              return (
                <article className="cart-line" key={line.id}>
                  <Image
                    src={`/products/${line.merchandise.product.handle}-${variant?.size || "100g"}.jpg`}
                    alt=""
                    width={90}
                    height={110}
                  />
                  <div>
                    <h3>
                      {product?.title[lang] || line.merchandise.product.title}
                    </h3>
                    <p className="small-print">
                      {variant?.size || line.merchandise.title} ·{" "}
                      {en ? "Whole bean" : "豆のまま"}
                    </p>
                    <strong>{yen(line.cost.totalAmount.amount)}</strong>
                    <div className="quantity-controls">
                      <button
                        type="button"
                        aria-label={`${en ? "Decrease" : "数量を減らす"} ${product?.country}`}
                        disabled={pending}
                        onClick={() =>
                          run(
                            () => updateLine(line.id, line.quantity - 1, lang),
                            false,
                          )
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span aria-label={en ? "Quantity" : "数量"}>
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`${en ? "Increase" : "数量を増やす"} ${product?.country}`}
                        disabled={
                          pending ||
                          line.quantity >=
                            Math.min(
                              100,
                              line.merchandise.quantityAvailable ?? 100,
                            )
                        }
                        onClick={() =>
                          run(
                            () => updateLine(line.id, line.quantity + 1, lang),
                            false,
                          )
                        }
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        className="remove-line"
                        disabled={pending}
                        onClick={() =>
                          run(() => removeLine(line.id, lang), false)
                        }
                      >
                        {en ? "Remove" : "削除"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
        {!!cart?.lines.nodes.length && (
          <div className="cart-summary">
            <div className="subtotal">
              <span>{en ? "Subtotal (tax included)" : "小計（税込）"}</span>
              <strong>{yen(subtotal)}</strong>
            </div>
            <ShippingProgress subtotal={subtotal} lang={lang} />
            <p className="small-print">
              {en
                ? "Below ¥3,000: ¥500 standard / ¥700 Kyushu / ¥800 Hokkaido & Okinawa. Remote islands quoted separately. Final shipping shown at checkout."
                : "¥3,000未満：通常¥500・九州¥700・北海道/沖縄¥800。離島は別途。送料はレジで確定します。"}
            </p>
            <p className="checkout-handoff">
              {en
                ? "Payment continues on Tokyo Coffee’s checkout page, our operating company. Your selected coffees and sizes will carry over."
                : "お支払いは、運営会社 Tokyo Coffee の決済ページに進みます。選んだ豆とサイズは、そのまま引き継がれます。"}
            </p>
            <a
              className={`commerce-button checkout-button ${pending ? "disabled" : ""}`}
              aria-disabled={pending}
              href={pending ? undefined : cart.checkoutUrl}
            >
              {en ? "Continue to checkout" : "レジへ進む"} <span>↗</span>
            </a>
            <p className="small-print">
              {en
                ? "Roasted Tue / Fri. Shipped the next business day."
                : "火・金焙煎。焙煎日翌営業日に発送。"}
            </p>
          </div>
        )}
      </dialog>
    </CartContext.Provider>
  );
}

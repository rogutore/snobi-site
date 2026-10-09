"use client";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { tradeForm as F } from "@/content/trade";
import { PREFECTURES } from "@/content/prefectures";
import { validate, type EnquiryState, type Field } from "@/lib/trade-enquiry";
import { sendEnquiry } from "@/app/(ja)/(site)/trade/actions";
import { firstRef } from "@/components/commerce/cart";

/* /trade enquiry form (owner 2026-10-09). Copy + the Google Form contract: content/trade.ts. The server action re-checks
   everything. Submitted by hand (onSubmit → startTransition) so React does not clear the fields when there is an error. */
type Coffee = { name: string; detail: string };
type Errors = Partial<Record<Field, string>>;

export function TradeForm({ coffees }: { coffees: Coffee[] }) {
  const [state, dispatch, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const [local, setLocal] = useState<Errors | null>(null);
  const [status, setStatus] = useState("");
  const alertRef = useRef<HTMLParagraphElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLInputElement>(null);
  const utmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startRef.current) startRef.current.value = String(Date.now());
    const ref = firstRef();
    if (hostRef.current) hostRef.current.value = ref.host ?? "";
    if (utmRef.current) utmRef.current.value = ref.utm ?? "";
  }, []);
  useEffect(() => {
    if (state.status === "done") doneRef.current?.focus();
    else if (state.status !== "idle") alertRef.current?.focus();
  }, [state]);

  if (state.status === "done") {
    return (
      <div className="v3-form-done" role="status">
        <h3 ref={doneRef} tabIndex={-1}>{F.done.h}</h3>
        <p>{F.done.body(state.email)}</p>
        <p>{F.done.thanks}</p>
      </div>
    );
  }

  const err: Errors = local ?? (state.status === "invalid" ? state.errors : {});
  const invalid = Object.keys(err).length > 0;
  const alert = invalid ? [F.errors.summary, err.tooLong].filter(Boolean).join(" ") : state.status === "failed" ? state.message : "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const found = validate(fd);
    if (Object.keys(found).length > 0) {
      setLocal(found);
      requestAnimationFrame(() => alertRef.current?.focus());
      return;
    }
    setLocal(null);
    startTransition(() => dispatch(fd));
  }

  function onChange(e: FormEvent<HTMLFormElement>) {
    const t = e.target as HTMLInputElement;
    if (t.name === "status") setStatus(t.value);
    if (t.name in err) setLocal(Object.fromEntries(Object.entries(err).filter(([k]) => k !== t.name)));
  }

  return (
    <form className="v3-form" noValidate onSubmit={onSubmit} onChange={onChange} aria-busy={pending}>
      {alert && <p ref={alertRef} tabIndex={-1} className="v3-form-alert" role="alert">{alert}</p>}

      <Group no="01" title={F.groups.shop}>
        <Text name="shop" label={F.shop.label} placeholder={F.shop.placeholder} required err={err.shop} autoComplete="organization" />
        <Choice name="type" type="radio" label={F.type.label} options={F.type.options} required err={err.type} />
        <div className="v3-field-pair">
          <div className="v3-field">
            <label htmlFor="tf-pref">{F.pref.label}</label>
            <span className="v3-select">
              <select id="tf-pref" name="pref" defaultValue="" autoComplete="address-level1">
                <option value="" disabled>{F.pref.placeholder}</option>
                {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </span>
          </div>
          <Choice name="status" type="radio" label={F.status.label} options={F.status.options} />
        </div>
        {status === "開業準備中" && (
          <Text name="opening" label={F.status.openingLabel} placeholder={F.status.openingPlaceholder} />
        )}
        <Text name="url" label={F.url.label} placeholder={F.url.placeholder} inputMode="url" autoComplete="url" />
      </Group>

      <Group no="02" title={F.groups.person}>
        <div className="v3-field-pair">
          <Text name="name" label={F.name.label} placeholder={F.name.placeholder} required err={err.name} autoComplete="name" />
          <Text name="tel" type="tel" label={F.tel.label} placeholder={F.tel.placeholder} autoComplete="tel" inputMode="tel" />
        </div>
        <Text name="email" type="email" label={F.email.label} placeholder={F.email.placeholder} required err={err.email} autoComplete="email" inputMode="email" />
      </Group>

      <Group no="03" title={F.groups.ask}>
        <fieldset className="v3-field">
          <legend>{F.coffees.label}<span className="v3-hint">{F.coffees.hint}</span></legend>
          <div className="v3-picks">
            {coffees.map((c) => (
              <label key={c.name} className="v3-pick">
                <input type="checkbox" name="coffee" value={c.name} />
                <span className="box" aria-hidden />
                <b>{c.name}</b>
                <span className="d">{c.detail}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <Choice name="interest" type="checkbox" label={F.interest.label} hint={F.interest.hint} options={F.interest.options}
          defaultChecked={[F.interest.options[0]]} required err={err.interest} />
        <Choice name="usage" type="radio" label={F.usage.label} options={F.usage.options} />
        <Text name="message" label={F.message.label} placeholder={F.message.placeholder} multiline />
      </Group>

      <div className="v3-hp" aria-hidden>
        <label>ウェブサイト<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <input ref={startRef} type="hidden" name="t" />
      <input ref={hostRef} type="hidden" name="refHost" />
      <input ref={utmRef} type="hidden" name="refUtm" />

      <div className="v3-form-send">
        <button className="v3-btn" type="submit" disabled={pending}>
          {pending ? <><span className="spin" aria-hidden />{F.sending}</> : F.submit}
        </button>
        <p className="note">
          {F.privacy}
          <a href={F.privacyUrl} target="_blank" rel="noopener">{F.privacyLink}</a>
        </p>
      </div>
    </form>
  );
}

function Group({ no, title, children }: { no: string; title: string; children: ReactNode }) {
  const id = `tf-g${no}`;
  return (
    <div className="v3-form-group" role="group" aria-labelledby={id}>
      <p className="v3-form-legend" id={id}><span className="no">{no}</span>{title}</p>
      {children}
    </div>
  );
}

function Req() {
  return <span className="v3-req">{F.required}</span>;
}

function Text({ name, label, err, required, multiline, ...rest }: {
  name: string; label: string; err?: string; required?: boolean; multiline?: boolean;
  type?: string; placeholder?: string; autoComplete?: string; inputMode?: "url" | "tel" | "email";
}) {
  const id = `tf-${name}`;
  const a11y = { id, name, "aria-required": required || undefined, "aria-invalid": err ? true : undefined, "aria-describedby": err ? `${id}-err` : undefined };
  return (
    <div className="v3-field">
      <label htmlFor={id}>{label}{required && <Req />}</label>
      {multiline
        ? <textarea {...a11y} rows={5} placeholder={rest.placeholder} />
        : <input {...a11y} type={rest.type ?? "text"} placeholder={rest.placeholder} autoComplete={rest.autoComplete} inputMode={rest.inputMode} />}
      {err && <p className="v3-field-err" id={`${id}-err`}>{err}</p>}
    </div>
  );
}

function Choice({ name, label, hint, options, type, required, err, defaultChecked }: {
  name: string; label: string; hint?: string; options: readonly string[]; type: "radio" | "checkbox";
  required?: boolean; err?: string; defaultChecked?: string[];
}) {
  const errId = `tf-${name}-err`;
  return (
    <fieldset className="v3-field" aria-describedby={err ? errId : undefined}>
      <legend>{label}{required && <Req />}{hint && <span className="v3-hint">{hint}</span>}</legend>
      <div className={`v3-chips ${type}`}>
        {options.map((o) => (
          <label key={o} className="v3-chip">
            <input type={type} name={name} value={o} defaultChecked={defaultChecked?.includes(o)}
              aria-invalid={err ? true : undefined} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {err && <p className="v3-field-err" id={errId}>{err}</p>}
    </fieldset>
  );
}

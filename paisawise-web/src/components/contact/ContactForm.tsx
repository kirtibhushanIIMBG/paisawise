"use client";

import * as Label from "@radix-ui/react-label";
import { CheckCircle2, Send } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * Inert mock. Validation is real so the form behaves like a working one under
 * keyboard and screen reader testing, and nothing leaves the browser: no fetch,
 * no storage, no analytics. Honesty rule from the brief, and the note below the
 * button says so on the page as well.
 */

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length === 0) errors.name = "Please tell us your name.";
  else if (name.length < 2) errors.name = "That looks too short to be a name.";

  if (email.length === 0) errors.email = "We need an email address to reply to.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "Check the email address. It is missing an @ or a domain.";

  if (message.length === 0) errors.message = "Add a line or two about what you need.";
  else if (message.length < 15)
    errors.message = "A little more detail helps us route this to the right person.";

  return errors;
}

const FIELD_BASE =
  "w-full rounded-xl border bg-panel px-4 py-3 text-[0.95rem] text-fg " +
  "placeholder:text-dim transition-colors duration-200 " +
  "[transition-timing-function:var(--ease-out-expo)] " +
  "hover:border-violet/60 focus:border-violet focus:outline-none";

export function ContactForm() {
  const [values, setValues] = React.useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  function update(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }
    setSubmitted(true);
  }

  function reset() {
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-edge bg-panel p-7 md:p-9"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint/12">
          <CheckCircle2 className="h-6 w-6 text-mint" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-fg">
          Thanks, {values.name.trim().split(" ")[0]}. That is logged.
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-copy">
          In the live product an advisor would reply on working days within one
          business day. This is a mock confirmation: the form does not send
          anything and nothing you typed has been stored or transmitted.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" onClick={reset}>
            Send another message
          </Button>
          <Button variant="ghost" size="sm" href="/faq">
            Read the FAQ instead
          </Button>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-edge bg-panel p-6 md:p-8"
    >
      <p aria-live="assertive" className="sr-only">
        {errorCount > 0
          ? `${errorCount} field${errorCount > 1 ? "s need" : " needs"} attention.`
          : ""}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label.Root
            htmlFor="contact-name"
            className="mb-2 block text-sm font-semibold text-fg"
          >
            Your name
          </Label.Root>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(FIELD_BASE, errors.name ? "border-violet" : "border-edge")}
            placeholder="Rohit Menon"
          />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="mt-2 text-sm text-violet">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <Label.Root
            htmlFor="contact-email"
            className="mb-2 block text-sm font-semibold text-fg"
          >
            Email
          </Label.Root>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(FIELD_BASE, errors.email ? "border-violet" : "border-edge")}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="mt-2 text-sm text-violet">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <Label.Root
          htmlFor="contact-message"
          className="mb-2 block text-sm font-semibold text-fg"
        >
          What would you like to know?
        </Label.Root>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error contact-message-hint" : "contact-message-hint"
          }
          className={cn(
            FIELD_BASE,
            "resize-y",
            errors.message ? "border-violet" : "border-edge",
          )}
          placeholder="Tell us which banks and UPI apps you use, and what you are trying to sort out."
        />
        <p id="contact-message-hint" className="mt-2 text-sm text-dim">
          Please leave out account numbers, card details and passwords. We never
          need them.
        </p>
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-2 text-sm text-violet">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit">
          <Send className="h-4 w-4" aria-hidden="true" />
          Send message
        </Button>
        <p className="text-sm text-dim">
          Mock form. Nothing is sent, stored or shared.
        </p>
      </div>
    </form>
  );
}

"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Objection-handling accordion.
 *
 * Radix gives us the keyboard contract for free: arrow keys move between
 * triggers, Home and End jump to the ends, Enter and Space toggle. The height
 * animation rides on --radix-accordion-content-height, so the keyframes have
 * to live in real CSS rather than a Tailwind utility. globals.css belongs to
 * another owner, so they are scoped here.
 */

const KEYFRAMES = `
@keyframes pw-acc-open {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}
@keyframes pw-acc-close {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
.pw-acc-panel { overflow: hidden; }
.pw-acc-panel[data-state="open"] {
  animation: pw-acc-open 240ms cubic-bezier(0.16, 1, 0.3, 1);
}
.pw-acc-panel[data-state="closed"] {
  animation: pw-acc-close 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  .pw-acc-panel[data-state="open"],
  .pw-acc-panel[data-state="closed"] { animation: none; }
}
`;

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  idPrefix,
  className,
}: {
  items: readonly FaqItem[];
  /** Keeps item values unique when several accordions share a page. */
  idPrefix: string;
  className?: string;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <Accordion.Root
        type="single"
        collapsible
        className={cn(
          "divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-panel",
          className,
        )}
      >
        {items.map((item, index) => {
          const value = `${idPrefix}-${index}`;
          return (
            <Accordion.Item key={value} value={value} className="group">
              <Accordion.Header className="m-0">
                <Accordion.Trigger
                  className={cn(
                    "flex w-full items-start justify-between gap-5 px-5 py-5 text-left md:px-7 md:py-6",
                    "text-base font-semibold text-fg transition-colors duration-200",
                    "[transition-timing-function:var(--ease-out-expo)]",
                    "hover:text-violet data-[state=open]:text-violet",
                  )}
                >
                  <span className="pr-2">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      "border border-edge text-violet transition-transform duration-200",
                      "[transition-timing-function:var(--ease-out-expo)]",
                      "group-data-[state=open]:rotate-45 group-data-[state=open]:bg-accent-soft",
                    )}
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pw-acc-panel">
                <p className="px-5 pb-6 pr-12 text-[0.975rem] leading-relaxed text-copy md:px-7 md:pb-7 md:pr-20">
                  {item.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </>
  );
}

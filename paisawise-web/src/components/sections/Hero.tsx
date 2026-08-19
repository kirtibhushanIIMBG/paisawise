"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { MEDIA } from "@/lib/media";
import { PRICE } from "@/lib/site";
import { rupees, rupeesExact } from "@/lib/format";
import { MONTHS, monthTotals, RECENT_TRANSACTIONS } from "@/lib/demo-data";

/*
  PAS:PROBLEM · SB7:hero-is-the-customer · AIDA:attention
  The question is the hero, not the product. No feature is named above the fold.
  CTA is deliberately soft here; the hard ask lives at the pricing and close.

  The whole fold is one rounded plate laid on the field, with a looping video
  under it and the copy sitting on the left where the scrim is heaviest. The
  product panel floats on the right of that plate rather than beside it, so the
  promise above the fold and the product below it still agree — the reference
  puts nothing there, but a finance page that shows no product is a poster.
*/

const AUG = MONTHS[0];
const TOTALS = monthTotals(AUG);
/* Tallest four categories, biggest first: the panel is a teaser for the real
   dashboard, so it inherits that chart's sort and its single-hue rule. */
const TOP = [...AUG.categories].sort((a, b) => b.spent - a.spent).slice(0, 4);
const PEAK = TOP[0].spent;

function ProductPanel() {
  return (
    <div
      aria-hidden
      className="relative rounded-2xl border border-edge bg-panel/85 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl"
    >
      <div className="rounded-xl border border-edge bg-panel p-5">
        {/* Balance header. August runs over budget in the seeded data, and the
            panel says so rather than hiding it: seeing the overspend is the
            product working, and it matches the alert on the /demo route.
            The state is carried by an icon and a written amount, never by
            colour alone. */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-dim">Spent in August</p>
            <p className="num mt-1.5 text-3xl font-medium text-fg">
              {rupees(TOTALS.spent)}
            </p>
            <p className="num mt-1 text-xs text-dim">
              of {rupees(TOTALS.budget)} planned
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/12 px-2.5 py-1 text-xs font-medium text-warning">
              <AlertTriangle size={12} />
              Over by <span className="num">{rupees(TOTALS.spent - TOTALS.budget)}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-positive/10 px-2.5 py-1 text-xs font-medium text-positive">
              <TrendingUp size={12} />
              <span className="num">{rupees(TOTALS.saved)}</span> saved
            </span>
          </div>
        </div>

        {/* single-hue category bars, sorted. Identity comes from the labels. */}
        <div className="mt-6 space-y-3">
          {TOP.map((c) => (
            <div key={c.key} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-xs text-copy">
                {c.label}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-panel-alt">
                <span
                  className="block h-full rounded-full bg-[var(--chart-series)]"
                  style={{ width: `${Math.round((c.spent / PEAK) * 100)}%` }}
                />
              </span>
              <span className="num w-16 shrink-0 text-right text-xs text-copy">
                {rupees(c.spent)}
              </span>
            </div>
          ))}
        </div>

        {/* recent activity */}
        <div className="mt-6 border-t border-edge pt-4">
          <p className="text-xs font-medium text-dim">Recent</p>
          <ul className="mt-3 space-y-2.5">
            {RECENT_TRANSACTIONS.slice(0, 3).map((t) => (
              <li key={t.merchant} className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm text-fg">{t.merchant}</span>
                  <span className="block text-xs text-dim">{t.day}</span>
                </span>
                <span className="num shrink-0 text-sm text-copy">
                  {rupeesExact(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero='line']", {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.09,
          })
          .from("[data-hero='sub']", { y: 18, opacity: 0, duration: 0.7 }, "-=0.5")
          .from("[data-hero='cta']", { y: 14, opacity: 0, duration: 0.6 }, "-=0.45")
          .from(
            "[data-hero='chip']",
            { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 },
            "-=0.4",
          )
          .from("[data-hero='panel']", { y: 30, opacity: 0, duration: 1 }, "-=0.9");
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="px-4 pb-8 pt-2 md:px-6"
      aria-labelledby="hero-heading"
    >
      <MediaPanel
        video={MEDIA.heroLoop}
        gold
        className="min-h-[36rem] rounded-[1.75rem] md:min-h-[44rem]"
      >
        <div className="relative grid h-full items-center gap-12 px-7 py-16 md:px-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <h1
              id="hero-heading"
              className="max-w-2xl text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.03] text-plate-fg"
            >
              <span className="block overflow-hidden">
                <span data-hero="line" className="block">
                  You earn well.
                </span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span data-hero="line" className="block">
                  So where does it
                </span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <span data-hero="line" className="block">
                  all go?
                </span>
              </span>
            </h1>

            <p
              data-hero="sub"
              className="mt-7 max-w-md text-base leading-relaxed text-plate-copy md:text-lg"
            >
              An AI budgeting app with a certified financial advisor attached.
              Built for salaried professionals who earn well and still cannot
              answer that question.
            </p>

            <div data-hero="cta" className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/get-started" size="lg" arrow>
                Get started
              </Button>
              <Button href="/demo" variant="secondary" size="lg">
                See the dashboard
              </Button>
            </div>

            {/* Concrete facts, not adjective triads. */}
            <ul className="mt-10 flex flex-wrap items-center gap-2.5">
              {[
                "Syncs your banks and UPI",
                "Certified advisor every month",
                `${rupees(PRICE.monthly)} a month`,
              ].map((chip) => (
                <li
                  key={chip}
                  data-hero="chip"
                  className="rounded-full border border-edge bg-panel/70 px-4 py-2 text-sm font-medium text-copy backdrop-blur"
                >
                  {chip}
                </li>
              ))}
            </ul>

          </div>

          <div data-hero="panel" data-fx="parallax" className="relative">
            <ProductPanel />
            <p className="mt-3 text-center">
              <span className="inline-block rounded-full bg-bg/90 px-3 py-1 text-xs italic text-dim backdrop-blur-sm">
                Sample data, shown for illustration.
              </span>
            </p>
          </div>
        </div>
      </MediaPanel>
    </section>
  );
}

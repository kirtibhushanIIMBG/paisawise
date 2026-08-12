"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Bell, PieChart, Target, Video } from "lucide-react";
import { rupees } from "@/lib/format";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  PAS:SOLVE · SB7:guide · AIDA:interest
  The product reveal. Pinned phone cycles screens as the copy advances, so the
  visitor sees the product working rather than reading a feature list.
*/

const SCREENS = [
  {
    icon: PieChart,
    title: "Everything in one view",
    body: "Three bank accounts and two UPI apps, added up and categorised without you touching a spreadsheet.",
  },
  {
    icon: Target,
    title: "A budget from your own history",
    body: "PaisaWise reads twelve months of spending and sets a target you can reach, then adjusts it as your cash flow moves.",
  },
  {
    icon: Bell,
    title: "Alerts while it still matters",
    body: "Shopping ran hot on the twelfth. You find out on the twelfth, with eighteen days left to do something about it.",
  },
  {
    icon: Video,
    title: "A certified advisor, every month",
    body: "Thirty minutes with someone who has already read your dashboard, so you skip explaining your own spending.",
  },
];

function PhoneScreen({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="space-y-3">
        <p className="text-[0.62rem] uppercase tracking-widest text-dim">
          August balance
        </p>
        <p className="num text-2xl font-bold text-white">{rupees(66600)}</p>
        <div className="space-y-2 pt-2">
          {[
            ["Rent", 24000, 100],
            ["Food", 14200, 62],
            ["Shopping", 11800, 51],
            ["Bills", 6300, 27],
          ].map(([label, amt, pct]) => (
            <div key={label as string}>
              <div className="flex justify-between text-[0.68rem] text-copy">
                <span>{label as string}</span>
                <span className="num">{rupees(amt as number)}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-panel-alt">
                <div
                  className="h-full rounded-full bg-violet-l"
                  style={{ width: `${pct as number}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="space-y-4">
        <p className="text-[0.62rem] uppercase tracking-widest text-dim">
          Your target
        </p>
        <p className="num text-2xl font-bold text-positive">{rupees(8000)}</p>
        <p className="text-[0.7rem] leading-relaxed text-copy">
          Based on your last twelve months, this is reachable without changing
          how you live.
        </p>
        <div className="rounded-xl bg-panel-alt/50 p-3">
          <div className="flex justify-between text-[0.68rem] text-copy">
            <span>Saved so far</span>
            <span className="num text-white">{rupees(5200)}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-panel-alt">
            <div className="h-full w-[65%] rounded-full bg-positive" />
          </div>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-accent/40 bg-violet/15 p-3">
          <p className="text-[0.68rem] font-semibold text-white">
            Shopping is running hot
          </p>
          <p className="mt-1 text-[0.66rem] leading-relaxed text-copy">
            You are at <span className="num">{rupees(11800)}</span> against{" "}
            <span className="num">{rupees(8000)}</span> with 18 days left.
          </p>
        </div>
        {[
          ["Bazaar Online", 3299],
          ["Kirana store", 860],
          ["Kaapi House", 480],
        ].map(([m, a]) => (
          <div
            key={m as string}
            className="flex justify-between text-[0.68rem] text-copy"
          >
            <span>{m as string}</span>
            <span className="num text-white">{rupees(a as number)}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <p className="text-[0.62rem] uppercase tracking-widest text-dim">
        Next call
      </p>
      <div className="rounded-xl bg-panel-alt/50 p-3">
        <p className="text-[0.72rem] font-semibold text-white">
          Tuesday, 6:30 pm
        </p>
        <p className="mt-1 text-[0.66rem] text-copy">
          With your certified advisor
        </p>
      </div>
      <p className="text-[0.66rem] leading-relaxed text-copy">
        On the agenda: your first SIP, sized against the surplus you have been
        holding since June.
      </p>
      <div className="rounded-xl border border-positive/30 bg-positive/10 p-3">
        <p className="num text-sm font-bold text-positive">{rupees(4000)}/month</p>
        <p className="mt-0.5 text-[0.64rem] text-copy">Suggested SIP</p>
      </div>
    </div>
  );
}

export function PhoneShowcase() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /*
        The phone is held in place by CSS `position: sticky`, not by a GSAP
        pin. Sticky is bounded by its own grid row, which is exactly as tall
        as the copy rail, so the phone releases precisely when the last step
        scrolls past. A pin needs an explicit end plus a spacer element, and
        that spacer is what previously left the left column empty at the
        bottom of the section.

        ScrollTrigger is kept only for the job it is actually needed for:
        reporting which step is currently under the reader.
      */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const steps = gsap.utils.toArray<HTMLElement>("[data-step-index]");
          steps.forEach((el, i) => {
            ScrollTrigger.create({
              trigger: el,
              start: "top center",
              end: "bottom center",
              onToggle: (self) => {
                if (self.isActive) setActive(i);
              },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="border-b border-edge bg-panel-alt py-20 text-white md:py-28"
      aria-labelledby="product-heading"
    >
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">The product</p>
          <h2
            id="product-heading"
            className="mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold"
          >
            You do not need more willpower. You need the month in front of you.
          </h2>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy rail. Each step occupies roughly a screen so the rail height
              drives the pin duration. */}
          <ol className="space-y-6 lg:space-y-0">
            {SCREENS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  data-step-index={i}
                  className={cn(
                    "flex gap-4 transition-opacity duration-500 lg:min-h-[62vh] lg:items-center lg:last:min-h-[26vh]",
                    active === i ? "opacity-100" : "lg:opacity-35",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                      active === i
                        ? "border-accent bg-violet/20 text-accent"
                        : "border-edge text-dim",
                    )}
                  >
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-copy">
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Phone. Sticky, so it is bounded by the grid row the copy rail
              defines and needs no pin duration to be kept in sync. */}
          <div
            data-phone="sticky"
            className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:self-start"
          >
            <div className="mx-auto w-full max-w-[17rem]">
              <div className="relative rounded-[2.2rem] border border-edge bg-panel p-3 shadow-2xl shadow-violet/10">
                <div className="mx-auto mb-2 h-1 w-14 rounded-full bg-panel-alt" />
                <div className="min-h-[21rem] rounded-[1.6rem] bg-panel-alt p-5">
                  <PhoneScreen index={active} />
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
                {SCREENS.map((s, i) => (
                  <span
                    key={s.title}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      active === i ? "w-7 bg-violet-l" : "w-1.5 bg-panel-alt",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

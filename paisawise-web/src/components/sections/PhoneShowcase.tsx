"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Bell, PieChart, Target, Video } from "lucide-react";
import { ProductPlate } from "@/components/sections/ProductPlate";
import { rupees } from "@/lib/format";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  PAS:SOLVE · SB7:guide · AIDA:interest
  The product reveal. Pinned phone cycles screens as the copy advances, so the
  visitor sees the product working rather than reading a feature list.
*/

/*
  One photograph per step, cycled with the phone screen. All four are cropped
  with the subject in the left half: the card sits to the left of the phone on
  a wide screen and above it on a narrow one, and a centred subject would be
  half-hidden in the first case and cropped out in the second.
*/
const PLATES = [
  { src: "/hero/product-01.jpg", position: "50% 38%" },
  { src: "/hero/product-02.jpg", position: "50% 55%" },
  { src: "/hero/product-03.jpg", position: "50% 34%" },
  { src: "/hero/product-04.jpg", position: "50% 44%" },
] as const;

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
        <p className="num text-2xl font-bold text-fg">{rupees(66600)}</p>
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
                  className="h-full rounded-full bg-accent-fill"
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
            <span className="num text-fg">{rupees(5200)}</span>
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
        <div className="rounded-xl border border-accent/40 bg-accent-fill/15 p-3">
          <p className="text-[0.68rem] font-semibold text-fg">
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
            <span className="num text-fg">{rupees(a as number)}</span>
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
        <p className="text-[0.72rem] font-semibold text-fg">
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
      /*
        Not gated on width. The visual column is sticky at every breakpoint,
        so the phone and the plate are on screen while the rail scrolls past
        on a phone exactly as they are on a desktop -- and before this ran
        everywhere, a narrow viewport got screen one, four dead dots and no
        photograph at all.
      */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step-index]");
        if (!steps.length) return;

        /*
          One trigger over the whole rail that names the step nearest the
          middle of the viewport, rather than one per step reporting whether
          it is inside a band.

          Per-step bands were what shipped first, and they only worked on a
          wide screen. There each step is 54vh tall, so the band is ~500px
          and no plausible scroll jumps it. On a phone the steps are ~120px,
          a flick clears the band between two frames, and the screen never
          advanced past the first. Nearest-to-centre cannot be skipped: at
          any scroll position exactly one step is closest.
        */
        const nearest = () => {
          const mid = window.innerHeight / 2;
          let best = 0;
          let bestD = Infinity;
          steps.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const d = Math.abs(r.top + r.height / 2 - mid);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          setActive(best);
        };

        ScrollTrigger.create({
          trigger: steps[0],
          start: "top bottom",
          endTrigger: steps[steps.length - 1],
          end: "bottom top",
          onUpdate: nearest,
          onRefresh: nearest,
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="border-b border-edge bg-panel-alt py-20 text-fg md:py-28"
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

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-20">
          {/* Copy rail. Each step occupies roughly a screen so the rail height
              drives how long the visual column stays put. */}
          <ol className="relative space-y-8 lg:space-y-0">
            {/* The spine. It joins the four markers into one run rather than
                leaving them floating, which is most of what the wide gaps
                between steps needed. Inset so it starts and ends inside the
                first and last marker. */}
            <span
              aria-hidden
              className="absolute left-[1.375rem] top-6 bottom-6 w-px bg-edge-strong"
            >
              {/* Fills to the step under the reader, so the long gaps between
                  steps carry the progress instead of sitting empty. */}
              <span
                className="block h-full w-full origin-top bg-accent-fill transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{ transform: `scaleY(${(active + 1) / SCREENS.length})` }}
              />
            </span>
            {SCREENS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  data-step-index={i}
                  className={cn(
                    "flex gap-4 transition-opacity duration-500 lg:min-h-[54vh] lg:items-center lg:last:min-h-[24vh]",
                    active === i ? "opacity-100" : "lg:opacity-35",
                  )}
                >
                  <span
                    className={cn(
                      // Opaque fill in both states, so the spine passes behind
                      // the marker instead of through it.
                      "relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                      active === i
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-edge bg-panel-alt text-dim",
                    )}
                  >
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-fg sm:text-xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-copy">
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Visual column: the photograph for the current step with the phone
              standing on it. Sticky at every breakpoint and ordered first on a
              narrow screen, so it stays in view while the rail scrolls under
              it -- that is what keeps the screens changing on a phone.

              The top offset clears the sticky header (h-18). */}
          <div
            data-phone="sticky"
            className="order-first self-start sticky top-[5.25rem] lg:order-none lg:top-0 lg:flex lg:h-screen lg:items-center"
          >
            <div className="relative mx-auto w-full max-w-[23rem] lg:max-w-[28rem]">
              {/* The plate bleeds past the phone top and bottom so the phone
                  reads as standing on a scene rather than as a photo with a
                  border. Hidden on the narrowest phones, where the strip left
                  of the device is too thin to be worth the bytes. */}
              <div className="relative">
                {/* The bleed is what turns a bordered photo into a scene the
                    phone stands on. It widens at lg because the plate is
                    wider there, and the crop is 4:5 -- without it the box
                    goes square and the framing is thrown away. */}
                <div className="absolute inset-x-0 -inset-y-5 hidden min-[360px]:block sm:-inset-y-8 lg:-inset-y-[4.5rem]">
                  <ProductPlate
                    plates={PLATES}
                    active={active}
                    className="h-full w-full"
                  />
                </div>

                {/* Right-aligned, because every plate keeps its subject on the
                    left. */}
                <div className="relative z-10 mx-auto w-[13.5rem] min-[360px]:mr-0 sm:w-[15rem] lg:w-[16.5rem]">
                  <div className="relative rounded-[2.2rem] border border-edge bg-panel p-3 shadow-2xl shadow-black/25">
                    <div className="mx-auto mb-2 h-1 w-14 rounded-full bg-panel-alt" />
                    <div className="min-h-[15rem] rounded-[1.6rem] bg-panel-alt p-4 sm:min-h-[21rem] sm:p-5">
                      <PhoneScreen index={active} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Below the plate, not on it: the dots are 1.5px tall and were
                  unreadable against a photograph in either theme. */}
              <div
                className="mt-10 flex justify-center gap-1.5 sm:mt-14 lg:mt-24"
                aria-hidden
              >
                {SCREENS.map((s, i) => (
                  <span
                    key={s.title}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      active === i ? "w-7 bg-accent-fill" : "w-1.5 bg-edge-strong",
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

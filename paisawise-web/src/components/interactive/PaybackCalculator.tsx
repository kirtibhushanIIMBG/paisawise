"use client";

import * as Slider from "@radix-ui/react-slider";
import { useEffect, useRef, useState } from "react";
import { CALC_DEFAULTS, payback } from "@/lib/demo-data";
import { PRICE } from "@/lib/site";
import { rupees, rupeesExact } from "@/lib/format";
import { IllustrationNote } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const COUNT_MS = 420;

/**
 * A number that eases to its target by writing straight to the DOM.
 *
 * This used to be a hook holding the in-flight value in state, which meant
 * three of them each ran their own rAF loop calling setState -- so dragging a
 * slider re-rendered the whole calculator up to three times a frame. A short
 * drag produced 116 text mutations in the result panel.
 *
 * Nothing downstream reads the intermediate value: `worthIt` and the yearly
 * figure are derived from `result`, not from the animation. So the tween has
 * no business being React state at all. This is the same approach `Counter` in
 * motion/Reveal.tsx already takes.
 *
 * The first render prints the formatted target, so the server HTML and the
 * client agree and there is no hydration mismatch.
 */
function Ticker({
  value,
  format,
  className,
  ...rest
}: {
  value: number;
  format: (v: number) => string;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const node = useRef<HTMLSpanElement>(null);
  /** Where the next tween starts: what is on screen right now. */
  const shown = useRef(value);
  const fmt = useRef(format);
  fmt.current = format;

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    const origin = shown.current;
    const delta = value - origin;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || delta === 0) {
      shown.current = value;
      el.textContent = fmt.current(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      shown.current = origin + delta * eased;
      el.textContent = fmt.current(shown.current);
      if (t < 1) raf = requestAnimationFrame(tick);
      else shown.current = value;
    };
    raf = requestAnimationFrame(tick);
    /* Interrupting mid-tween leaves `shown` at whatever is painted, so the
       next one picks up from there rather than snapping back. */
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span ref={node} className={className} {...rest}>
      {format(value)}
    </span>
  );
}

function Track({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  format,
  id,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  id: string;
}) {
  return (
    /*
      Naming and hit area both live on the Thumb, not the Root.

      Radix puts role="slider" on the Thumb, so an aria-label on Slider.Root
      named a plain div and the control itself was announced as an unnamed
      slider. The visible caption is a <span> rather than a <label> for the
      same reason: Slider.Root is not a labelable element, so `for` never
      bound to anything. aria-labelledby carries the caption and
      aria-valuetext replaces the raw number with the formatted one, so a
      screen reader hears "Your monthly take-home, Rs 1,20,000" and not
      "120000".

      The thumb stays 20px because that is the design, but ::before extends
      the hit area to 44px so it can actually be dragged with a thumb.
    */
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span id={`${id}-label`} className="text-sm font-semibold text-copy">
          {label}
        </span>
        <output className="num text-lg font-bold text-fg">{format(value)}</output>
      </div>
      <Slider.Root
        className="relative mt-4 flex h-5 w-full touch-none select-none items-center"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      >
        <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-panel-alt">
          <Slider.Range className="absolute h-full rounded-full bg-accent-fill" />
        </Slider.Track>
        <Slider.Thumb
          id={id}
          aria-labelledby={`${id}-label`}
          aria-valuetext={format(value)}
          aria-describedby={`${id}-hint`}
          className={cn(
            "relative block h-5 w-5 rounded-full border-2 border-accent bg-white shadow-lg",
            "transition-transform hover:scale-110",
            "before:absolute before:-inset-3 before:content-['']",
          )}
        />
      </Slider.Root>
      <p id={`${id}-hint`} className="mt-2 text-xs text-dim">
        {hint}
      </p>
    </div>
  );
}

export function PaybackCalculator({ className }: { className?: string }) {
  const [salary, setSalary] = useState(CALC_DEFAULTS.salary);
  const [rate, setRate] = useState(CALC_DEFAULTS.rate);

  const result = payback(salary, rate, PRICE.monthly);
  const worthIt = result.net > 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-edge bg-panel-alt text-fg",
        className,
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
        {/* controls */}
        <div className="border-b border-edge p-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="eyebrow text-accent">Work it out yourself</p>
          <h3 className="mt-3 text-2xl font-semibold text-fg">
            Does {rupees(PRICE.monthly)} a month pay for itself?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-copy">
            Drag your salary and the share you think PaisaWise could help you keep.
            The arithmetic is the same one your advisor will walk you through.
          </p>

          <div className="mt-9 space-y-8">
            <Track
              id="calc-salary"
              label="Your monthly take-home"
              hint="After tax and deductions."
              value={salary}
              min={CALC_DEFAULTS.minSalary}
              max={CALC_DEFAULTS.maxSalary}
              step={CALC_DEFAULTS.salaryStep}
              onChange={setSalary}
              format={rupees}
            />
            <Track
              id="calc-rate"
              label="Extra you could keep each month"
              hint="Most members find the first few percent in categories they had stopped noticing."
              value={rate}
              min={CALC_DEFAULTS.minRate}
              max={CALC_DEFAULTS.maxRate}
              step={1}
              onChange={setRate}
              format={(v) => `${v}%`}
            />
          </div>
        </div>

        {/* result */}
        <div className="p-8 lg:p-10">
          <dl className="space-y-6">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-copy">You could keep</dt>
              <dd className="num text-[clamp(2rem,5vw,2.75rem)] font-bold leading-none text-positive">
                <Ticker
                  value={result.monthlySaving}
                  format={rupees}
                  data-testid="calc-saving"
                />
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-t border-edge pt-6">
              <dt className="text-sm text-copy">PaisaWise costs</dt>
              <dd className="num text-xl font-semibold text-fg">
                {rupees(PRICE.monthly)}
                <span className="ml-2 text-sm font-normal text-dim">
                  about {rupeesExact(PRICE.perDay)} a day
                </span>
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-t border-edge pt-6">
              <dt className="text-sm text-copy">Net, every month</dt>
              <dd
                className={cn(
                  "num text-2xl font-bold",
                  worthIt ? "text-positive" : "text-copy",
                )}
              >
                <Ticker value={result.net} format={rupees} data-testid="calc-net" />
              </dd>
            </div>
          </dl>

          <div className="mt-8 rounded-2xl bg-panel p-6">
            {worthIt ? (
              <p className="text-lg font-semibold text-fg">
                That is{" "}
                <Ticker
                  value={result.multiple}
                  format={(v) => `${v.toFixed(1)}×`}
                  className="num text-positive"
                  data-testid="calc-multiple"
                />{" "}
                what it costs you.
              </p>
            ) : (
              <p className="text-lg font-semibold text-fg">
                At this level the subscription does not pay for itself yet. Your
                advisor would tell you the same thing on the first call.
              </p>
            )}
            <p className="mt-2 text-sm text-copy">
              Over a year, that is{" "}
              <span className="num font-semibold text-fg">
                {rupees(result.yearlyNet)}
              </span>{" "}
              you would have kept.
            </p>
          </div>

          <IllustrationNote className="mt-5 text-dim" />
        </div>
      </div>
    </div>
  );
}

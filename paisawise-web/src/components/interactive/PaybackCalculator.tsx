"use client";

import * as Slider from "@radix-ui/react-slider";
import { useEffect, useRef, useState } from "react";
import { CALC_DEFAULTS, payback } from "@/lib/demo-data";
import { PRICE } from "@/lib/site";
import { rupees, rupeesExact } from "@/lib/format";
import { IllustrationNote } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/** Counts to a target with an ease-out. Respects reduced motion. */
function useCounter(target: number, duration = 420) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    const delta = target - origin;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = origin + delta * eased;
      setValue(next);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      from.current = value;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
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
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-pale">
          {label}
        </label>
        <output htmlFor={id} className="num text-lg font-bold text-white">
          {format(value)}
        </output>
      </div>
      <Slider.Root
        id={id}
        className="relative mt-4 flex h-5 w-full touch-none select-none items-center"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        aria-label={label}
      >
        <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-ink-3">
          <Slider.Range className="absolute h-full rounded-full bg-violet-l" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-violet-l bg-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
      </Slider.Root>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}

export function PaybackCalculator({ className }: { className?: string }) {
  const [salary, setSalary] = useState(CALC_DEFAULTS.salary);
  const [rate, setRate] = useState(CALC_DEFAULTS.rate);

  const result = payback(salary, rate, PRICE.monthly);
  const saving = useCounter(result.monthlySaving);
  const net = useCounter(result.net);
  const multiple = useCounter(result.multiple);

  const worthIt = result.net > 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-ink-3 bg-ink text-white",
        className,
      )}
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
        {/* controls */}
        <div className="border-b border-ink-3 p-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="eyebrow text-violet-l">Work it out yourself</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Does {rupees(PRICE.monthly)} a month pay for itself?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-pale">
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
              <dt className="text-sm text-pale">You could keep</dt>
              <dd
                className="num text-[clamp(2rem,5vw,2.75rem)] font-bold leading-none text-mint"
                data-testid="calc-saving"
              >
                {rupees(saving)}
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-t border-ink-3 pt-6">
              <dt className="text-sm text-pale">PaisaWise costs</dt>
              <dd className="num text-xl font-semibold text-white">
                {rupees(PRICE.monthly)}
                <span className="ml-2 text-sm font-normal text-muted">
                  about {rupeesExact(PRICE.perDay)} a day
                </span>
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-t border-ink-3 pt-6">
              <dt className="text-sm text-pale">Net, every month</dt>
              <dd
                className={cn(
                  "num text-2xl font-bold",
                  worthIt ? "text-mint" : "text-pale",
                )}
                data-testid="calc-net"
              >
                {rupees(net)}
              </dd>
            </div>
          </dl>

          <div className="mt-8 rounded-2xl bg-ink-2 p-6">
            {worthIt ? (
              <p className="text-lg font-semibold text-white">
                That is{" "}
                <span className="num text-mint" data-testid="calc-multiple">
                  {multiple.toFixed(1)}×
                </span>{" "}
                what it costs you.
              </p>
            ) : (
              <p className="text-lg font-semibold text-white">
                At this level the subscription does not pay for itself yet. Your
                advisor would tell you the same thing on the first call.
              </p>
            )}
            <p className="mt-2 text-sm text-pale">
              Over a year, that is{" "}
              <span className="num font-semibold text-white">
                {rupees(result.yearlyNet)}
              </span>{" "}
              you would have kept.
            </p>
          </div>

          <IllustrationNote className="mt-5 text-muted" />
        </div>
      </div>
    </div>
  );
}

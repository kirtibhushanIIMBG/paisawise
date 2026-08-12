"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Building2, Check, Smartphone, Table2 } from "lucide-react";
import { MONTHS, monthTotals, LINKED_ACCOUNTS, RECENT_TRANSACTIONS } from "@/lib/demo-data";
import type { MonthKey } from "@/lib/demo-data";
import { rupees, indianNumber } from "@/lib/format";
import { Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/*
  Chart decisions, per the dataviz method:
  · Spending categories are NOMINAL, so each takes its own hue from a
    categorical palette. What is banned is a *value ramp*, where colour
    tracks bar length and double-encodes magnitude. This palette does not:
    each hue is bound to a category key below, so a category keeps its
    colour as the sort order changes between months.
  · The palette is validated, not chosen by eye. Worst adjacent CVD
    separation is dE 13.8 against a target of 8, on both the dark cell fill
    and the white light-mode card. Steps live in globals.css.
  · No donut. Six categories with close values compare badly in angle; bars are
    the right form and let the numbers be read directly.
  · Over-budget state is never colour-alone: it ships with an icon and a
    written "over by" amount.
  · A table view is provided, which is also the required relief for the
    contrast WARN the palette validator raised on muted-on-surface.
*/

/* Colour follows the entity, never its rank. */
const CATEGORY_COLOUR: Record<string, string> = {
  food: "var(--color-cat-1)",
  rent: "var(--color-cat-2)",
  transport: "var(--color-cat-3)",
  shopping: "var(--color-cat-4)",
  bills: "var(--color-cat-5)",
  other: "var(--color-cat-6)",
};

const AXIS = { fontSize: 11, fill: "var(--chart-axis)" };

function ChartTooltip({
  active,
  payload,
  label,
  labelPrefix = "",
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; dataKey?: string | number }[];
  label?: string | number;
  labelPrefix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-edge bg-panel px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-fg">
        {labelPrefix}
        {label}
      </p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className="num mt-1 text-xs text-copy">
          {p.name}: <span className="font-semibold text-fg">{rupees(p.value ?? 0)}</span>
        </p>
      ))}
    </div>
  );
}

export function Dashboard() {
  const [monthKey, setMonthKey] = useState<MonthKey>("aug");
  const [showTable, setShowTable] = useState(false);

  const month = useMemo(
    () => MONTHS.find((m) => m.key === monthKey) ?? MONTHS[0],
    [monthKey],
  );
  const totals = useMemo(() => monthTotals(month), [month]);

  const categoryData = useMemo(
    () =>
      [...month.categories]
        .sort((a, b) => b.spent - a.spent)
        .map((c) => ({ ...c, over: c.spent > c.budget, colour: CATEGORY_COLOUR[c.key] })),
    [month],
  );

  return (
    <div className="space-y-6">
      {/* controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex rounded-full border border-edge bg-panel p-1"
          role="tablist"
          aria-label="Choose month"
        >
          {MONTHS.map((m) => (
            <button
              key={m.key}
              role="tab"
              aria-selected={m.key === monthKey}
              onClick={() => setMonthKey(m.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                m.key === monthKey
                  ? "bg-accent-fill text-on-accent"
                  : "text-copy hover:text-accent",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowTable((v) => !v)}
          aria-pressed={showTable}
          className="inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 text-sm font-medium text-copy transition-colors hover:border-accent hover:text-accent"
        >
          <Table2 size={15} />
          {showTable ? "Show charts" : "Show table"}
        </button>
      </div>

      {/* KPI tiles: the number is the chart */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Money in", value: month.income, tone: "" },
          { label: "Spent", value: totals.spent, tone: "" },
          { label: "Left over", value: totals.saved, tone: "text-positive" },
          { label: "Budget set", value: totals.budget, tone: "" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-edge bg-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-dim">
              {k.label}
            </p>
            <p className={cn("num mt-2 text-2xl font-bold text-fg", k.tone)}>
              {rupees(k.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Overspending alert. Icon + written amount, never colour alone. */}
      {totals.over.length > 0 ? (
        <div
          role="status"
          className="flex flex-wrap items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-5"
        >
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-warning" aria-hidden />
          <div className="flex-1">
            <p className="font-semibold text-fg">
              {totals.over.length === 1
                ? `${totals.over[0].label} is running hot`
                : `${totals.over.length} categories are over budget`}
            </p>
            <p className="mt-1 text-sm text-copy">
              {totals.over
                .map(
                  (c) =>
                    `${c.label} is over by ${rupees(c.spent - c.budget)}`,
                )
                .join(". ")}
              . There is still time left in the month to pull it back.
            </p>
          </div>
        </div>
      ) : null}

      {showTable ? (
        <div className="overflow-x-auto rounded-2xl border border-edge bg-panel">
          <table className="w-full min-w-[34rem] text-sm">
            <caption className="sr-only">
              Spending by category for {month.label}
            </caption>
            <thead>
              <tr className="border-b border-edge text-left">
                <th scope="col" className="px-5 py-3 font-semibold text-fg">Category</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold text-fg">Spent</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold text-fg">Budget</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold text-fg">Status</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((c) => (
                <tr key={c.key} className="border-b border-edge last:border-0">
                  <td className="px-5 py-3 text-copy">{c.label}</td>
                  <td className="num px-5 py-3 text-right font-semibold text-fg">
                    {rupees(c.spent)}
                  </td>
                  <td className="num px-5 py-3 text-right text-copy">
                    {rupees(c.budget)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {c.over ? (
                      <span className="num inline-flex items-center gap-1.5 text-accent">
                        <AlertTriangle size={13} aria-hidden />
                        Over by {rupees(c.spent - c.budget)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-positive">
                        <Check size={13} aria-hidden />
                        On track
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Spend over the month: 2 series, so a legend is required. */}
          <div className="rounded-2xl border border-edge bg-panel p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-fg">Spend through {month.label}</h3>
                <p className="mt-1 text-sm text-copy">
                  You front-load the month. The plan accounts for that.
                </p>
              </div>
            </div>
            <ul className="mt-4 flex gap-5 text-xs text-copy">
              <li className="flex items-center gap-2">
                <span
                  className="h-0.5 w-5 rounded-full"
                  style={{ background: "var(--chart-series)" }}
                  aria-hidden
                />
                Actual
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="h-0.5 w-5 rounded-full"
                  style={{ background: "var(--chart-ref)" }}
                  aria-hidden
                />
                Even pace
              </li>
            </ul>
            <div className="mt-4 h-60" data-testid="chart-timeline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={month.timeline} margin={{ top: 6, right: 6, bottom: 0, left: -12 }}>
                  <defs>
                    <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-series)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--chart-series)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    ticks={[1, 10, 20, 30]}
                    tickFormatter={(d) => `Day ${d}`}
                  />
                  <YAxis
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    width={58}
                    tickFormatter={(v) => `₹${indianNumber(v / 1000)}k`}
                  />
                  <Tooltip
                    content={<ChartTooltip labelPrefix="Day " />}
                    cursor={{ stroke: "var(--chart-ref)", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="spend"
                    name="Actual"
                    stroke="var(--chart-series)"
                    strokeWidth={2}
                    fill="url(#spendFill)"
                  />
                  <Line
                    type="monotone"
                    dataKey="budgetPace"
                    name="Even pace"
                    stroke="var(--chart-ref)"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category magnitude: one series, one hue, sorted, directly labelled. */}
          <div className="rounded-2xl border border-edge bg-panel p-6">
            <h3 className="font-semibold text-fg">Where it went</h3>
            <p className="mt-1 text-sm text-copy">
              Sorted by size. Bars over budget are marked.
            </p>
            <div className="mt-4 h-60" data-testid="chart-categories">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 4, right: 56, bottom: 0, left: 8 }}
                  barCategoryGap={8}
                >
                  <CartesianGrid stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    width={104}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "var(--chart-series)", fillOpacity: 0.06 }}
                  />
                  <Bar dataKey="spent" name="Spent" radius={[0, 4, 4, 0]} maxBarSize={18}>
                    {categoryData.map((c) => (
                      <Cell key={c.key} fill={c.colour} fillOpacity={1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1.5">
              {categoryData.map((c) => (
                <li
                  key={c.key}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  {/* Swatch makes this list the chart's legend, so colour is
                      tied to a named category rather than left to be guessed. */}
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: c.colour }}
                    />
                    <span className="truncate text-copy">{c.label}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    {c.over ? (
                      <span className="num inline-flex items-center gap-1 font-semibold text-warning">
                        <AlertTriangle size={11} aria-hidden />
                        over {rupees(c.spent - c.budget)}
                      </span>
                    ) : null}
                    <span className="num font-semibold text-fg">{rupees(c.spent)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* linked accounts + transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-edge bg-panel p-6">
          <h3 className="font-semibold text-fg">Linked accounts</h3>
          <p className="mt-1 text-sm text-copy">
            Read-only. PaisaWise can see these. It can never move money between them.
          </p>
          <ul className="mt-5 space-y-3">
            {LINKED_ACCOUNTS.map((a) => (
              <li key={a.name} className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-accent">
                  {a.kind === "bank" ? <Building2 size={16} /> : <Smartphone size={16} />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-fg">{a.name}</span>
                  <span className="block text-xs text-dim">{a.type}</span>
                </span>
                <span className="num text-xs text-dim">{a.mask}</span>
              </li>
            ))}
          </ul>
          <Badge tone="neutral" className="mt-5">
            Fictional institutions, shown for the demo
          </Badge>
        </div>

        <div className="rounded-2xl border border-edge bg-panel p-6">
          <h3 className="font-semibold text-fg">Recent activity</h3>
          <ul className="mt-5 divide-y divide-edge">
            {RECENT_TRANSACTIONS.map((t) => (
              <li key={t.merchant + t.amount} className="flex items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-sm font-medium text-fg">{t.merchant}</span>
                  <span className="block text-xs text-dim">
                    {t.category} · {t.day}
                  </span>
                </span>
                <span className="num text-sm font-semibold text-fg">
                  {rupees(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import {
  ArrowRight,
  Bell,
  Cpu,
  LayoutGrid,
  PieChart,
  Target,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { FEATURES, PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Features",
  description:
    "One dashboard, AI budgeting from your own spending history, savings goals that fit, same-day overspending alerts, risk-matched SIP nudges, and a certified advisor every month.",
};

const ICONS = {
  grid: LayoutGrid,
  cpu: Cpu,
  target: Target,
  bell: Bell,
  pie: PieChart,
  advisor: UserCheck,
} as const;

export default function FeaturesPage() {
  return (
    <>
      <section className="border-b border-edge bg-panel-alt py-14 md:py-20">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Features</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            Six things, and the sixth is the one that matters
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-copy">
            Five of these you could approximate with a free app and a lot of
            discipline. The advisor call is the part that has no substitute.
          </p>
        </div>
      </section>

      <Section>
        <div className="space-y-6">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon as keyof typeof ICONS];
            return (
              <Reveal key={f.slug}>
                <Card className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:p-10">
                  <div className="flex items-start gap-5 md:flex-col md:items-center">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-violet">
                      <Icon size={24} />
                    </span>
                    <span className="num text-sm font-bold text-dim md:mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-fg">{f.title}</h2>
                    <p className="mt-2 text-lg text-violet">{f.short}</p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-copy">
                      {f.body}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="alt">
        <Reveal>
          <SectionHead
            align="center"
            eyebrow="All included"
            title="Every feature, on every plan"
            lede={`There is no tier where the advisor call is an upsell. ${rupees(PRICE.monthly)} a month covers all six.`}
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/get-started" size="lg">
              Find where to start
              <ArrowRight size={18} />
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              See it working
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

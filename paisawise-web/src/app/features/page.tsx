import type { Metadata } from "next";
import { SectionPhoto } from "@/components/sections/SectionPhoto";
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

/*
  A photograph per capability. Four of them are the product-section plates,
  which were shot for exactly these four steps, so the two pages tell the same
  story with the same faces rather than two unrelated sets of strangers.
*/
const FEATURE_PHOTOS: Record<string, string> = {
  dashboard: "/hero/feature-dashboard.jpg",
  budgeting: "/hero/feature-budgeting.jpg",
  goals: "/hero/feature-goals.jpg",
  alerts: "/hero/feature-alerts.jpg",
  investing: "/hero/feature-investing.jpg",
  advisor: "/hero/feature-advisor.jpg",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-edge bg-panel-alt py-14 md:py-20">
        <SectionPhoto src="/hero/page-features.jpg" position="50% 50%" variant="masthead" />
        <div className="shell relative z-10 max-w-3xl">
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
                <Card className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:p-10 lg:grid-cols-[auto_1fr_15rem]">
                  <div className="flex items-start gap-5 md:flex-col md:items-center">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={24} />
                    </span>
                    <span className="num text-sm font-bold text-dim md:mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-fg">{f.title}</h2>
                    <p className="mt-2 text-lg text-accent">{f.short}</p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-copy">
                      {f.body}
                    </p>
                  </div>
                  {/* Hidden below lg: the third column only exists there, and
                      stacked under the copy it would double the height of a
                      page that is already six cards long.

                      Fixed height, not h-full. A percentage height against an
                      indefinite grid row resolves to auto, so h-full fell back
                      to the plate's 4:5 intrinsic ratio and stretched every
                      card to 400px for three lines of copy.

                      These are their own 560x410 crops rather than the shared
                      plates: the box is 240x176, and reusing the full-size
                      files put 689 KB on the page to paint 197 KB of pixels.
                      The framing is baked into the crop, so no object-position
                      is needed here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FEATURE_PHOTOS[f.slug]}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    width={560}
                    height={410}
                    className="hidden h-44 w-full self-center rounded-xl border border-edge object-cover lg:block"
                  />
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="alt" photo="/hero/section-advisor.jpg" photoPosition="72% 40%">
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

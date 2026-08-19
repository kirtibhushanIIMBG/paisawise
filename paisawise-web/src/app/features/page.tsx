import type { Metadata } from "next";
import {
  Bell,
  Cpu,
  LayoutGrid,
  PieChart,
  Target,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { Marquee, CREDENTIAL_BRANDS } from "@/components/sections/Marquee";
import { Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { FEATURES, PRICE, TRUST_POINTS } from "@/lib/site";
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
  A photograph per capability. These were shot for these six, so the page shows
  the product being used rather than six variations on an abstract plate.

  The drawn animations still carry the masthead and the close, which is the
  division that holds across the site: photography where a person is doing
  something, drawn motion where the subject is the system itself.
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
      <section className="px-4 pb-8 pt-2 md:px-6">
        <AnimatedPlate
          variant="orbit"
          tone="ink"
          rounded="rounded-[1.75rem]"
          className="min-h-[26rem] md:min-h-[32rem]"
        >
          <div className="flex h-full items-center px-7 py-16 md:px-14 md:py-20">
            <div className="max-w-3xl">
              <p className="text-sm text-white/60">Features</p>
              <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-medium text-white">
                Six things, and the sixth is the one that matters
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                Five of these you could approximate with a free app and a lot of
                discipline. The advisor call is the part that has no substitute.
              </p>
            </div>
          </div>
        </AnimatedPlate>
      </section>

      {/* The two-column open, as on the home page: the claim gets display size
          on the right, the heading and its action hold the left. */}
      <Section className="pb-10 md:pb-12">
        <Reveal className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-medium text-fg">
              Everything, on
              <br />
              every plan.
            </h2>
            <div className="mt-8">
              <Button href="/pricing" arrow>
                See pricing
              </Button>
            </div>
          </div>
          <p className="text-2xl leading-relaxed text-copy md:text-3xl">
            There is no tier where the advisor call is an upsell.{" "}
            <span className="num text-fg">{rupees(PRICE.monthly)}</span> a month
            covers all six, and the monthly plan has no lock-in.
          </p>
        </Reveal>
      </Section>

      {/* The plate grid. A wide photographic card, then two ink cards — the
          same three-across rhythm the home page opens with. */}
      <Section className="py-10 md:py-12">
        <Reveal
          selector="[data-plate]"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <MediaPanel
            data-plate
            image="/hero/feature-advisor.jpg"
            imagePosition="60% 40%"
            rounded="rounded-2xl"
            scrim="strong"
            className="flex min-h-80 flex-col justify-between p-7 sm:col-span-2"
          >
            <h3 className="text-2xl font-medium leading-snug text-plate-fg">
              The advisor call
            </h3>
            <p className="max-w-xs text-base text-plate-copy">
              Thirty minutes a month with a certified financial advisor who has
              already read your dashboard.
            </p>
          </MediaPanel>

          <Card
            data-plate
            variant="ink"
            className="flex min-h-80 flex-col justify-between"
          >
            <h3 className="text-2xl font-medium leading-snug text-white">
              Reads the
              <br />
              whole picture.
            </h3>
            <p className="text-base text-white/60">
              Every bank account and UPI app in one view, with twelve months of
              history read on day one.
            </p>
          </Card>

          <Card
            data-plate
            variant="ink"
            className="flex min-h-80 flex-col justify-between"
          >
            <h3 className="text-2xl font-medium leading-snug text-white">
              Tells you
              <br />
              what to do.
            </h3>
            <p className="text-base text-white/60">
              A budget from your own spending, alerts the same day, and nudges
              matched to your risk profile.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* The six, in full. */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="In detail"
            title="What each one actually does"
          />
        </Reveal>
        <div className="mt-12 space-y-4">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon as keyof typeof ICONS];
            return (
              <Reveal key={f.slug}>
                <Card className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:p-10 lg:grid-cols-[auto_1fr_15rem]">
                  <div className="flex items-start gap-5 md:flex-col md:items-center">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={24} />
                    </span>
                    <span className="num text-sm font-medium text-dim md:mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-fg">{f.title}</h3>
                    <p className="mt-2 text-lg text-accent">{f.short}</p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-copy">
                      {f.body}
                    </p>
                  </div>
                  {/* Hidden below lg: the third column only exists there, and
                      stacked under the copy it would double the height of a
                      page that is already six cards long.

                      Its own 560x410 crop rather than the full-size plate: the
                      box is 240x176, and reusing the large files put 689 KB on
                      the page to paint 197 KB of pixels. */}
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

      {/* The credentials row, same mechanism as the home page. */}
      <Section className="py-10 md:py-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4">
          <p className="text-base leading-relaxed text-copy">
            Built on regulated rails
            <br />
            and certified advice.
          </p>
          <div className="md:col-span-3">
            <Marquee
              items={CREDENTIAL_BRANDS}
              duration="30s"
              itemClassName="mx-10 text-copy"
            />
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Security"
            title="We can see your money. We can never move it."
          />
        </Reveal>
        <Reveal selector="[data-trust]" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((t) => (
            <Card key={t.label} data-trust>
              <h3 className="font-medium text-fg">{t.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-copy">{t.note}</p>
            </Card>
          ))}
        </Reveal>
      </Section>

      <Section>
        <AnimatedPlate
          variant="pulse"
          tone="ink"
          className="px-7 py-16 md:px-14 md:py-20"
        >
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm text-white/60">All included</p>
              <h2 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] font-medium text-white">
                Every feature, on every plan
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                There is no tier where the advisor call is an upsell.{" "}
                {rupees(PRICE.monthly)} a month covers all six.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" size="lg" arrow>
                Find where to start
              </Button>
              <Button
                href="/demo"
                variant="ghost"
                size="lg"
                className="border border-white/25 text-white hover:bg-white/10"
              >
                See it working
              </Button>
            </div>
          </Reveal>
        </AnimatedPlate>
      </Section>
    </>
  );
}

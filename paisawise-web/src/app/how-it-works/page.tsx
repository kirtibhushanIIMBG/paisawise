import type { Metadata } from "next";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { Clock, Lock, Video } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { HOW_IT_WORKS, PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Link your accounts, get a plan built from your own spending history, then meet a certified advisor every month. Setup takes about fifteen minutes.",
};

const DETAIL = [
  {
    icon: Lock,
    heading: "What linking gives PaisaWise access to",
    points: [
      "You authorise read-only access through your bank's own login. PaisaWise never sees or stores your banking password.",
      "Twelve months of history is read on the first sync, which is what lets the budget be built from your patterns rather than a template.",
      "Access can be revoked from settings at any time, and doing so removes the tokens immediately.",
    ],
  },
  {
    icon: Clock,
    heading: "What the first fortnight looks like",
    points: [
      "Days one to three: transactions are categorised and you get your first full picture of a month.",
      "Day four: your savings target appears, sized against your real surplus rather than an aspiration.",
      "From day five: alerts start firing the same day a category runs hot.",
    ],
  },
  {
    icon: Video,
    heading: "What happens on the advisor call",
    points: [
      "Your advisor has read the dashboard before you dial in, so you are not narrating your own spending for fifteen minutes.",
      "You agree one or two changes for the month ahead. Small enough that they happen.",
      "If a SIP makes sense, it is sized on the call against the surplus you have been holding.",
    ],
  },
];

/* One photograph per step. These are the plates the product reveal used to
   cycle: they were shot for these three moments, and standing still under a
   step heading is a better job for them than crossfading behind a phone. */
const STEP_PHOTOS = [
  { src: "/hero/product-01.jpg", position: "50% 38%" },
  { src: "/hero/product-02.jpg", position: "50% 55%" },
  { src: "/hero/product-04.jpg", position: "50% 44%" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageMasthead
        motion="flow"
        eyebrow="How it works"
        title="Fifteen minutes to set up. Then it runs."
        lede="A long onboarding is where good intentions go to die, so there are three steps and none of them need a spreadsheet."
      />

      <Section className="pb-10 md:pb-12">
        <Reveal className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-medium text-fg">
              Three steps.
              <br />
              Then it runs.
            </h2>
            <div className="mt-8">
              <Button href="/get-started" arrow>
                Start now
              </Button>
            </div>
          </div>
          <p className="text-2xl leading-relaxed text-copy md:text-3xl">
            Link your accounts, get a plan built from twelve months of your own
            spending, and meet a certified advisor every month after that.
          </p>
        </Reveal>
      </Section>

      {/* SB7:plan — the three steps, each on its own plate */}
      <Section className="py-10 md:py-12">
        <Reveal
          selector="[data-step]"
          className="grid gap-4 md:grid-cols-3"
          stagger={0.1}
        >
          {HOW_IT_WORKS.map((step, i) => (
            <MediaPanel
              key={step.step}
              data-step
              image={STEP_PHOTOS[i].src}
              imagePosition={STEP_PHOTOS[i].position}
              scrim="strong"
              rounded="rounded-2xl"
              className="flex min-h-[26rem] flex-col justify-between p-8"
            >
              <span className="num text-4xl font-medium tracking-[-0.03em] text-accent">
                {step.step}
              </span>
              <div>
                <h2 className="text-2xl font-medium text-plate-fg">
                  {step.title}
                </h2>
                <p className="mt-3 max-w-xs leading-relaxed text-plate-copy">
                  {step.body}
                </p>
              </div>
            </MediaPanel>
          ))}
        </Reveal>
      </Section>

      {/* What the setup actually costs you, in time. */}
      <Section className="py-10 md:py-12">
        <Reveal selector="[data-stat]" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "15 min", l: "To link your accounts, start to finish" },
            { v: "12 months", l: "Of history read on the first sync" },
            { v: "Day 4", l: "Your savings target appears" },
            { v: "Day 5", l: "Alerts start firing the same day" },
          ].map((s) => (
            <div
              key={s.l}
              data-stat
              className="rounded-2xl border border-edge bg-panel px-7 py-8"
            >
              <div className="num text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-[-0.03em] text-fg">
                {s.v}
              </div>
              <p className="mt-2.5 text-sm leading-snug text-copy">{s.l}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="alt">
        <Reveal>
          <SectionHead
            eyebrow="The detail"
            title="The questions people ask before they link anything"
          />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {DETAIL.map((d) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.heading}>
                <Card className="h-full p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-5 text-lg font-medium text-fg">{d.heading}</h3>
                  <ul className="mt-4 space-y-3">
                    {d.points.map((p) => (
                      <li key={p} className="text-sm leading-relaxed text-copy">
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <AnimatedPlate variant="flow" tone="ink" className="px-7 py-16 md:px-14 md:py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-[clamp(1.8rem,3.8vw,2.6rem)] font-medium text-white">
                Start with the fifteen minutes
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/60">
                If your bank relationship manager introduced you, the{" "}
                {rupees(PRICE.onboarding)} onboarding fee is already waived.
              </p>
            </div>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" size="lg" arrow>
                Get started
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                className="border border-white/25 text-white hover:bg-white/10"
              >
                Book a call first
              </Button>
            </div>
          </Reveal>
        </AnimatedPlate>
      </Section>
    </>
  );
}

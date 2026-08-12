import type { Metadata } from "next";
import { ArrowRight, Clock, Lock, Video } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
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

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-edge bg-panel-alt py-14 md:py-20">
        <div className="shell max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            Fifteen minutes to set up. Then it runs.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-copy">
            A long onboarding is where good intentions go to die, so there are
            three steps and none of them need a spreadsheet.
          </p>
        </div>
      </section>

      {/* SB7:plan — the three steps, with a progress rail */}
      <Section>
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[1.65rem] top-4 bottom-4 hidden w-px bg-edge md:block"
          />
          <ol className="space-y-10">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.step}>
                <Reveal>
                  <div className="flex gap-6">
                    <span className="num relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-edge bg-panel text-lg font-bold text-accent">
                      {s.step}
                    </span>
                    <div className="pt-2">
                      <h2 className="text-2xl font-semibold text-fg">{s.title}</h2>
                      <p className="mt-3 max-w-2xl leading-relaxed text-copy">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="alt">
        <Reveal>
          <SectionHead
            eyebrow="The detail"
            title="The questions people ask before they link anything"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {DETAIL.map((d) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.heading}>
                <Card className="h-full p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{d.heading}</h3>
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
        <Reveal>
          <div className="rounded-3xl border border-edge bg-panel p-9 text-center md:p-14">
            <h2 className="mx-auto max-w-2xl text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold text-fg">
              Start with the fifteen minutes
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-copy">
              If your bank relationship manager introduced you, the{" "}
              {rupees(PRICE.onboarding)} onboarding fee is already waived.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" size="lg">
                Get started
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Book a call first
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

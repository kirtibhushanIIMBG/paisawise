import type { Metadata } from "next";
import { CreditCard, MessagesSquare, ShieldCheck } from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { Reveal } from "@/components/motion/Reveal";
import { Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { FAQS, PRICE, TRUST_POINTS } from "@/lib/site";
import { rupees } from "@/lib/format";

/* OBJECTIONS · Cialdini:authority. Every question here is one a bank
   relationship manager hears at the branch. Answering them in public is
   cheaper than answering them on a call. No CTA until the bottom. */

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Ten questions people ask before subscribing to PaisaWise: why it costs money when free apps exist, what happens to your bank data, what the ₹999 onboarding fee covers, and who the advisors are.",
};

type GroupId = "product" | "money" | "security";

/** Keyed on the question text so a reordering of FAQS cannot silently drop one. */
const CATEGORY_OF: Record<string, GroupId> = {
  "Is my bank data safe?": "security",
  "Can I export my data or delete my account?": "security",
  "₹4,999 upfront feels like a lot.": "money",
  "What is the ₹999 onboarding fee?": "money",
  "Do you sell mutual funds or take commission?": "money",
};

const GROUPS: {
  id: GroupId;
  title: string;
  blurb: string;
  icon: typeof MessagesSquare;
}[] = [
  {
    id: "product",
    title: "Product",
    blurb: "What you get, who delivers it, and what happens if it does not suit you.",
    icon: MessagesSquare,
  },
  {
    id: "money",
    title: "Money and pricing",
    blurb: "What it costs, what the fees cover, and how PaisaWise makes its money.",
    icon: CreditCard,
  },
  {
    id: "security",
    title: "Security and data",
    blurb: "What we can see, what we can never do, and how to take your data back.",
    icon: ShieldCheck,
  },
];

function questionsFor(id: GroupId) {
  return FAQS.filter((faq) => (CATEGORY_OF[faq.q] ?? "product") === id);
}

export default function FaqPage() {
  return (
    <>
      <PageMasthead
        photo="/hero/page-faq.jpg"
        photoPosition="50% 45%"
        eyebrow="Questions"
        title="The ten questions people ask before they subscribe"
        lede="Grouped into product, pricing and data. If the one you came with is missing, an advisor will answer it on a call before you pay anything."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-copy">
          <span className="num">
            <span className="font-medium text-fg">{rupees(PRICE.monthly)}</span> a
            month
          </span>
          <span aria-hidden="true" className="text-dim">
            ·
          </span>
          <span>No lock-in on the monthly plan</span>
          <span aria-hidden="true" className="text-dim">
            ·
          </span>
          <span>Read-only access to your accounts</span>
        </div>
      </PageMasthead>

      <Section className="pb-6 md:pb-8">
        <Reveal className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-medium text-fg">
              Asked before
              <br />
              anyone pays.
            </h2>
            <div className="mt-8">
              <Button href="/contact" arrow>
                Ask your own
              </Button>
            </div>
          </div>
          <p className="text-2xl leading-relaxed text-copy md:text-3xl">
            Every question here is one a bank relationship manager hears at the
            branch. Answering them in public is cheaper than answering them on a
            call.
          </p>
        </Reveal>
      </Section>

      {GROUPS.map((group, index) => {
        const items = questionsFor(group.id);
        const Icon = group.icon;
        return (
          <Section
            key={group.id}
            id={group.id}
            tone={index % 2 === 1 ? "alt" : "surface"}
            className="py-14 md:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-medium text-fg md:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-3 leading-relaxed text-copy">{group.blurb}</p>
                <p className="num mt-4 text-sm text-dim">
                  {items.length} question{items.length === 1 ? "" : "s"}
                </p>
              </div>
              <FaqAccordion items={items} idPrefix={group.id} />
            </div>
          </Section>
        );
      })}

      {/* Risk reversal restated in short form, straight from TRUST_POINTS */}
      <Section tone="alt" className="py-14 md:py-20">
        <SectionHead
          eyebrow="The short version"
          title="Four promises the answers above keep coming back to"
        />
        <Reveal selector="[data-trust]" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <Card key={point.label} data-trust>
              <h3 className="text-base font-medium text-fg">{point.label}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-copy">{point.note}</p>
            </Card>
          ))}
        </Reveal>
      </Section>

      {/* The advisor plate: the answer behind most of the answers above. */}
      <Section>
        <Reveal className="grid items-start gap-8 md:grid-cols-2">
          <div className="md:pr-12 md:pt-2">
            <p className="eyebrow mb-2">The one that matters</p>
            <h2 className="text-[clamp(2.4rem,5vw,3.5rem)] font-medium leading-none text-fg">
              Ask a
              <br />
              person
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-copy">
              Most of the answers above end at the same place: a certified
              advisor who has read your dashboard. If your question is not here,
              it is a question for them.
            </p>
          </div>
          <MediaPanel
            image="/hero/section-advisor.jpg"
            imagePosition="72% 40%"
            scrim="strong"
            className="min-h-[28rem] lg:min-h-[34rem]"
          >
            <div className="relative p-10 md:p-12">
              <h3 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-tight text-plate-fg">
                Before you pay
              </h3>
              <p className="mt-5 max-w-md text-base text-plate-copy">
                An advisor will answer it on a call before you subscribe to
                anything. There is no card required to have that conversation.
              </p>
              <div className="mt-8">
                <Button href="/contact" arrow>
                  Book a call
                </Button>
              </div>
            </div>
          </MediaPanel>
        </Reveal>
      </Section>

      {/* AIDA:ACTION · closing CTA points at the human, not the checkout */}
      <Section>
        <AnimatedPlate variant="pulse" tone="ink" className="px-7 py-16 md:px-14 md:py-20">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-medium text-white">
              Still have a question we did not answer?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              Send it across and an advisor replies. If your bank relationship
              manager introduced you to PaisaWise, mention it: the{" "}
              <span className="num font-medium text-white">
                {rupees(PRICE.onboarding)}
              </span>{" "}
              onboarding fee is waived for you.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <Button size="lg" href="/contact" arrow>
              Book a call
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/get-started"
              className="border border-white/25 text-white hover:bg-white/10"
            >
              Get started
            </Button>
          </div>
        </div>
        </AnimatedPlate>
      </Section>
    </>
  );
}

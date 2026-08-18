import type { Metadata } from "next";
import { ArrowRight, CreditCard, MessagesSquare, ShieldCheck } from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Badge, Button, Card, Section, SectionHead } from "@/components/ui/primitives";
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
      <Section tone="ink" className="relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <Badge tone="accent">Questions</Badge>
          <h1 className="mt-6 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            The ten questions people ask before they subscribe
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-copy">
            Grouped into product, pricing and data. If the one you came with is
            missing, an advisor will answer it on a call before you pay
            anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-copy">
            <span className="num">
              <span className="font-semibold text-fg">{rupees(PRICE.monthly)}</span> a
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
        </div>
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
                <h2 className="mt-5 text-2xl font-semibold text-fg md:text-3xl">
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
      <Section className="py-14 md:py-20">
        <SectionHead
          eyebrow="The short version"
          title="Four promises the answers above keep coming back to"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <Card key={point.label} className="bg-panel-alt">
              <h3 className="text-base font-semibold text-fg">{point.label}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-copy">{point.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* AIDA:ACTION · closing CTA points at the human, not the checkout */}
      <Section tone="ink">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-semibold text-fg">
              Still have a question we did not answer?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-copy">
              Send it across and an advisor replies. If your bank relationship
              manager introduced you to PaisaWise, mention it: the{" "}
              <span className="num font-semibold text-fg">
                {rupees(PRICE.onboarding)}
              </span>{" "}
              onboarding fee is waived for you.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <Button variant="onInk" size="lg" href="/contact">
              Book a call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/get-started"
              className="border border-edge text-fg hover:text-accent"
            >
              Get started
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

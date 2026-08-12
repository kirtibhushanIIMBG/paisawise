import type { Metadata } from "next";
import { ArrowRight, Building2, CalendarClock, Check, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Badge, Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

/* AIDA:ACTION · Cialdini:reciprocity. Three doors, weighted. The relationship
   manager route is the primary lead source in the brief, so it gets the
   largest panel and the fee waiver sits inside it. */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Three ways to reach PaisaWise: through your bank relationship manager with the ₹999 onboarding fee waived, a general enquiry, or a call booked with a certified advisor.",
};

const RM_STEPS = [
  "Ask your relationship manager for a PaisaWise referral at your next branch visit or on your next call.",
  "They send you a referral link with your branch code already attached.",
  `Your ${rupees(PRICE.onboarding)} onboarding fee is waived, and account linking is handled on your first call.`,
  "An advisor is assigned before that call, so they arrive having read your dashboard.",
];

const CALL_COVERS = [
  "A read through your last three months of spending, category by category",
  "One savings target you can hit without changing how you live",
  "Whether a SIP makes sense yet, and what has to happen first if it does not",
  "Any question from the FAQ you would rather ask a person",
];

export default function ContactPage() {
  return (
    <>
      <Section tone="ink" className="relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <Badge tone="violet">Contact</Badge>
          <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] font-semibold text-white">
            Three ways to reach us. One of them saves you{" "}
            <span className="num">{rupees(PRICE.onboarding)}</span>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-copy">
            Most people arrive here through a bank relationship manager after a
            branch visit. If that is you, start with the first option. If it is
            not, the other two work just as well.
          </p>
        </div>
      </Section>

      {/* Door 1: the RM channel. Primary lead source, so it gets the weight. */}
      <Section className="py-14 md:py-20">
        <Card className="overflow-hidden border-accent/30 bg-panel p-0">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                  <Building2 className="h-5 w-5 text-accent" aria-hidden="true" />
                </span>
                <Badge tone="mint">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Onboarding fee waived
                </Badge>
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-fg md:text-3xl">
                Came to us through your bank relationship manager?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-copy">
                PaisaWise works with banks, so your relationship manager can
                refer you directly. The referral removes the one-time{" "}
                <span className="num font-semibold text-fg">
                  {rupees(PRICE.onboarding)}
                </span>{" "}
                onboarding fee and puts you in front of an advisor faster than
                signing up cold.
              </p>

              <ol className="mt-8 space-y-4">
                {RM_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="num mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed text-copy">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" href="/get-started">
                  Get started
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="secondary" size="lg" href="/pricing">
                  See what it costs
                </Button>
              </div>
            </div>

            <aside className="border-t border-edge bg-panel-alt p-7 md:p-10 lg:border-l lg:border-t-0">
              <p className="eyebrow">If you do not have one</p>
              <p className="mt-4 leading-relaxed text-copy">
                Plenty of members arrive from LinkedIn or a search instead. You
                get the same product and the same advisor panel. The only
                difference is the{" "}
                <span className="num font-semibold text-fg">
                  {rupees(PRICE.onboarding)}
                </span>{" "}
                onboarding fee, which covers account linking and your first
                review.
              </p>
              <hr className="my-7 border-edge" />
              <p className="eyebrow">Written enquiries</p>
              <p className="mt-4 flex items-center gap-2 text-copy">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                hello@paisawise.example
              </p>
              <p className="mt-3 text-sm text-dim">
                A placeholder address for an academic project. Use the form
                below, which behaves the same way and sends nothing anywhere.
              </p>
            </aside>
          </div>
        </Card>
      </Section>

      {/* Doors 2 and 3: the general enquiry and the advisor call */}
      <Section tone="alt" className="py-14 md:py-20">
        <SectionHead
          eyebrow="The other two doors"
          title="Ask a question, or book time with an advisor"
          lede="The form goes to the support desk. The call goes to a certified financial advisor who will have read your numbers first."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="text-xl font-semibold text-fg">General enquiry</h3>
            <p className="mt-2 max-w-xl leading-relaxed text-copy">
              Pricing, bank coverage, what happens to your data, or anything the
              FAQ left open. Replies land on working days.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-5">
            <Card className="bg-panel">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                <CalendarClock className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-fg">
                Book an advisor call
              </h3>
              <p className="mt-3 leading-relaxed text-copy">
                Thirty minutes on video with a certified financial advisor. Free
                before you subscribe, and monthly once you do.
              </p>
              <ul className="mt-5 space-y-3">
                {CALL_COVERS.map((line) => (
                  <li key={line} className="flex gap-3 text-[0.95rem] leading-relaxed text-copy">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-positive"
                      aria-hidden="true"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="mt-7 w-full" href="/get-started">
                Book a call
              </Button>
              <p className="mt-3 text-center text-sm text-dim">
                Booking runs through the four-question setup, so the advisor
                starts with your numbers.
              </p>
            </Card>

            <Card className="bg-panel">
              <h3 className="text-base font-semibold text-fg">
                Before you write to us
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-copy">
                PaisaWise never asks for a card number, a net banking password,
                an OTP or a UPI PIN. Nobody from PaisaWise will ask for one on a
                call either. If someone does, they are not from PaisaWise.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <Card className="bg-panel-alt text-center">
          <h2 className="text-2xl font-semibold text-fg">
            Would you rather read first?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-copy">
            Ten questions, answered in full, including the two most people ask
            about data and commission.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" href="/faq">
              Read the FAQ
            </Button>
            <Button href="/get-started">
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}

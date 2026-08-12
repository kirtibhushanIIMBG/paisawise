import type { Metadata } from "next";
import { ArrowRight, Eye, HandCoins, Lock, UserRound } from "lucide-react";
import { Badge, Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { Mark } from "@/components/brand/Logo";
import { PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

/* SB7:GUIDE · Cialdini:authority + liking. The visitor is the hero of this
   page. PaisaWise appears only as the guide: empathy first, competence second,
   and no claim of a win that belongs to the customer. */

export const metadata: Metadata = {
  title: "About",
  description:
    "PaisaWise is built for salaried professionals who earn well and still cannot say where the money went. Our mission, how we started, what we believe, and who is behind it.",
};

const BELIEFS = [
  {
    icon: HandCoins,
    title: "You are the customer",
    body: "Subscriptions pay for PaisaWise. There are no ads and no commission from any fund house, so a nudge towards a SIP has nothing riding on it except whether it suits you.",
  },
  {
    icon: Eye,
    title: "Advice has to know your numbers",
    body: "A tip that applies to everybody applies to nobody in particular. Every suggestion here starts from twelve months of your own spending, which is the part generic advice skips.",
  },
  {
    icon: UserRound,
    title: "Software watches, a person decides",
    body: "The AI is good at noticing that your food spending has doubled by the twelfth. A certified advisor is better at asking why, and at telling you which of three reasonable options fits your year.",
  },
  {
    icon: Lock,
    title: "Read-only, always",
    body: "PaisaWise can see the money and can never move it. That constraint is in the product design rather than the terms page, because it is the thing people worry about most on day one.",
  },
];

const TEAM = [
  {
    name: "Meera Nair",
    role: "Co-founder",
    bio: "Ten years in retail banking operations. She has sat on the branch side of the desk and knows how the savings conversation usually goes.",
    initials: "MN",
  },
  {
    name: "Arjun Deshpande",
    role: "Co-founder, engineering",
    bio: "Builds the account sync and the budgeting model. Argues for read-only access in every design review, including the ones where nobody disagrees.",
    initials: "AD",
  },
  {
    name: "Farah Qureshi",
    role: "Head of advisory",
    bio: "Certified financial advisor. Runs the advisor panel, sets the call format, and reads the notes from every first review.",
    initials: "FQ",
  },
  {
    name: "Devansh Rao",
    role: "Bank partnerships",
    bio: "Works with relationship managers so the gap between a branch visit and your first PaisaWise call is measured in days.",
    initials: "DR",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* SB7:GUIDE · mission stated as a sentence about the customer */}
      <Section tone="ink" className="relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <Badge tone="violet">About PaisaWise</Badge>
          <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] font-semibold text-fg">
            Good financial guidance should not depend on how much money you
            already have.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-copy">
            A salaried professional earning a solid income in an Indian city
            gets a product brochure. Someone with a crore gets a person who
            knows their name. PaisaWise exists to close that gap for the first
            group, at{" "}
            <span className="num font-semibold text-fg">
              {rupees(PRICE.monthly)}
            </span>{" "}
            a month.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="onInk" size="lg" href="/get-started">
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/contact"
              className="border border-edge text-fg hover:text-accent"
            >
              Book a call
            </Button>
          </div>
        </div>
      </Section>

      {/* SB7:GUIDE · empathy. Name the problem before naming the product. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="How this started"
              title="The advice was fine. It was written for somebody else."
            />
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-copy">
              <p>
                Meera spent a decade inside bank branches watching the same
                conversation repeat. A twenty-nine year old walks in with a
                decent salary and three accounts, asks what to do with the money
                sitting idle, and leaves twenty minutes later with a fixed
                deposit and a brochure. Nobody had looked at where the salary
                was going. There was no time to, and no tool that would have
                made it quick.
              </p>
              <p>
                Meanwhile the free tracking apps were solving one half of the
                problem. They could show you a pie chart of last month. What
                they could not do was tell you what to change, because a rule
                written for a general audience has to ignore your rent, your
                education loan, and the money you send home every month.
              </p>
              <p>
                Those two gaps are the whole reason PaisaWise exists. Poor
                visibility of spending, and advice that does not know your
                situation. Everything in the product traces back to one of them.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-panel-alt">
              <p className="eyebrow">The gap, stated plainly</p>
              <p className="mt-4 text-lg font-semibold leading-snug text-fg">
                You can see your spending, or you can get personal advice.
                Getting both has usually meant hiring a wealth manager.
              </p>
              <p className="mt-4 leading-relaxed text-copy">
                PaisaWise puts the two together in one subscription: an AI that
                reads every linked account, and a certified advisor who talks to
                you once a month.
              </p>
            </Card>
            <Card>
              <p className="eyebrow">Who we build for</p>
              <p className="mt-4 leading-relaxed text-copy">
                Salaried, twenty-five to thirty-five, money spread across three
                or four accounts and a couple of UPI apps. You know what a SIP
                is. You have been meaning to start one since the last appraisal.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* SB7:GUIDE · authority through principles rather than credentials */}
      <Section tone="alt">
        <SectionHead
          eyebrow="What we believe"
          title="Four things we will not trade away"
          lede="Product decisions get argued out against this list. When a feature and a principle disagree, the feature loses."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {BELIEFS.map((belief) => {
            const Icon = belief.icon;
            return (
              <Card key={belief.title} className="bg-panel">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-fg">{belief.title}</h3>
                <p className="mt-3 leading-relaxed text-copy">{belief.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* SB7:GUIDE · the people behind the guide. Clearly labelled fictional. */}
      <Section>
        <SectionHead
          eyebrow="The team"
          title="Small team, one product"
          lede="Four people, split between the software that reads your accounts and the advisors who sit on the calls."
        />
        <p className="mt-5 max-w-2xl rounded-xl border border-edge bg-panel-alt px-4 py-3 text-sm text-dim">
          PaisaWise is a fictional company built for a college assignment. The
          people below are invented, and so are their backgrounds.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person) => (
            <Card key={person.name} className="flex h-full flex-col">
              <span
                aria-hidden="true"
                className="num inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-accent"
              >
                {person.initials}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-fg">{person.name}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{person.role}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-copy">{person.bio}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* AIDA:ACTION · hard CTA, same primary verb as every other page */}
      <Section tone="ink">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Mark className="h-10 w-10" />
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold text-fg">
              You are the one doing the saving. We just make it obvious what to
              do next.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-copy">
              Answer four questions and see the plan we would build for you. It
              takes about two minutes and costs nothing.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <Button variant="onInk" size="lg" href="/get-started">
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="/contact"
              className="border border-edge text-fg hover:text-accent"
            >
              Book a call
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

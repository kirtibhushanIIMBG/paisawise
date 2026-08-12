/**
 * Single source of truth for product facts, navigation and shared copy.
 *
 * Every rupee figure here traces to the course brief (1.jpeg). Nothing in this
 * file may be invented: if a number is illustrative it lives in demo-data.ts
 * behind an explicit label, not here.
 */

export const PRICE = {
  monthly: 499,
  yearly: 4999,
  onboarding: 999,
  /** ₹499 / 30 days, used for the "cost per day" reframe */
  perDay: 499 / 30,
  /** Saving from paying yearly rather than 12 monthly instalments */
  yearlySaving: 499 * 12 - 4999,
} as const;

export const DISCLAIMER =
  "PaisaWise is a fictional product created for an academic project. It is not a real financial service and does not offer real financial advice.";

export const ILLUSTRATION_NOTE = "Illustration, not a guarantee.";

export const NAV = [
  {
    label: "Product",
    children: [
      { href: "/features", label: "Features", note: "Everything in the app" },
      { href: "/how-it-works", label: "How it works", note: "Three steps to set up" },
      { href: "/demo", label: "Live demo", note: "Try the dashboard" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/demo", label: "Live demo" },
      { href: "/pricing", label: "Pricing" },
      { href: "/get-started", label: "Find your plan" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Talk to an advisor" },
      { href: "/demo", label: "See the dashboard" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

/** The six product capabilities, straight from the brief. */
export const FEATURES = [
  {
    slug: "dashboard",
    icon: "grid",
    title: "One dashboard",
    short: "All your accounts and UPI apps in a single view.",
    body: "PaisaWise reads every linked bank account and UPI app and puts them in one place. No more opening four apps to work out what you spent.",
  },
  {
    slug: "budgeting",
    icon: "cpu",
    title: "AI-driven budgeting",
    short: "A budget built from your own spending history, not a template.",
    body: "The budget is generated from how you spend today. It knows you front-load the month, and it plans around that instead of against it.",
  },
  {
    slug: "goals",
    icon: "target",
    title: "Savings goals that fit",
    short: "Monthly targets set from what you earn and spend.",
    body: "A target you can reach beats an ambitious one you abandon in week two. Goals are recalculated as your cash flow changes.",
  },
  {
    slug: "alerts",
    icon: "bell",
    title: "Overspending alerts",
    short: "You hear about it the same day, not at month end.",
    body: "Real-time alerts the moment a category runs hot, while there is still time in the month to correct.",
  },
  {
    slug: "investing",
    icon: "pie",
    title: "SIP and mutual fund nudges",
    short: "Matched to your risk profile.",
    body: "You already know you should invest. PaisaWise tells you what, how much, and when, based on your risk profile rather than a generic list.",
  },
  {
    slug: "advisor",
    icon: "advisor",
    title: "A certified advisor, monthly",
    short: "One-on-one video call to go through your numbers.",
    body: "The part no free app offers. Every month you sit with a certified financial advisor who has already read your dashboard.",
  },
] as const;

/** Free tracking apps vs PaisaWise. Competitor description comes from the brief. */
export const COMPARISON = [
  { free: "Shows where money went", paisawise: "Tells you what to do next" },
  { free: "Generic insights", paisawise: "Personalized to your spending" },
  { free: "No live coaching", paisawise: "Monthly 1-on-1 advisor call" },
  { free: "No proactive alerts", paisawise: "Real-time overspending alerts" },
  { free: "Limited investment guidance", paisawise: "Risk-matched SIP / MF nudges" },
  { free: "Ad-supported", paisawise: "You are the customer, not the product" },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Link your accounts",
    body: "Connect your bank accounts and UPI apps in a few minutes. Read-only access, so PaisaWise can see the money but never move it.",
  },
  {
    step: "02",
    title: "Get your plan",
    body: "The AI reads twelve months of spending and builds a budget and a savings target around your real cash flow.",
  },
  {
    step: "03",
    title: "Meet your advisor",
    body: "Every month, a certified financial advisor reviews your numbers with you on a call and adjusts the plan.",
  },
] as const;

export const FAQS = [
  {
    q: "Why pay when free apps exist?",
    a: "Free apps are ad-supported, generic, and have no live coaching. PaisaWise is the only option here that puts a certified advisor on a call with you every month. Free apps show you where the money went. We tell you what to do next.",
  },
  {
    q: "Is my bank data safe?",
    a: "PaisaWise uses read-only sync and bank-grade encryption. We can see the data. We can never move your money, and we never sell it. There are no ads on the platform, so your data is not the product.",
  },
  {
    q: "What if I do not end up using it?",
    a: "The monthly plan has no lock-in, so you can stop whenever you like. The advisor call is a scheduled appointment rather than an app you have to remember to open, which is what makes people stick with it.",
  },
  {
    q: "₹4,999 upfront feels like a lot.",
    a: `That is exactly why the ₹${PRICE.monthly} monthly plan exists. The annual plan is for people who want the roughly ₹${PRICE.yearlySaving} saving and know they will stay the year.`,
  },
  {
    q: "I already have a CA. Why would I need this?",
    a: "A CA files and plans once a year. PaisaWise handles the other 364 days: the daily spending, the alerts, and the monthly course correction. Most of our members keep both.",
  },
  {
    q: "What is the ₹999 onboarding fee?",
    a: `A one-time setup fee covering account linking and your first financial review. It is waived if you came to PaisaWise through your bank relationship manager.`,
  },
  {
    q: "Which banks and UPI apps do you support?",
    a: "All major Indian banks and the common UPI apps. If you can see it in your net banking, PaisaWise can read it.",
  },
  {
    q: "Who are the advisors?",
    a: "Certified financial advisors. Each one reviews your dashboard before the call, so you are not spending the first fifteen minutes explaining your own spending to them.",
  },
  {
    q: "Do you sell mutual funds or take commission?",
    a: "No. PaisaWise is funded by subscriptions. Nudges are matched to your risk profile, not to what pays us the most, because nothing pays us except you.",
  },
  {
    q: "Can I export my data or delete my account?",
    a: "Yes to both, at any time, from settings. Deleting the account removes the linked-account tokens immediately.",
  },
] as const;

/** Clearly illustrative. Names are invented; see the label rendered alongside. */
export const TESTIMONIALS = [
  {
    name: "Ananya R.",
    role: "Product manager, Bengaluru",
    quote:
      "I earn well and still had no idea where it went. The first dashboard was uncomfortable to look at. Three months later I am saving ₹8,000 a month without feeling it.",
    rating: 5,
  },
  {
    name: "Rohit M.",
    role: "Software engineer, Pune",
    quote:
      "I had been meaning to start a SIP for two years. My advisor set one up on the first call and told me exactly how much, which is what I could never decide on my own.",
    rating: 5,
  },
  {
    name: "Sneha K.",
    role: "Consultant, Mumbai",
    quote:
      "The overspending alert is the thing. Knowing on the twelfth that I am running hot changes what I do. Knowing on the thirtieth changes nothing.",
    rating: 5,
  },
  {
    name: "Vikram S.",
    role: "Relationship manager referral, Delhi",
    quote:
      "My bank introduced me. I expected another tracking app. The monthly call with an actual advisor is the part I would not give up.",
    rating: 4,
  },
] as const;

export const TRUST_POINTS = [
  { label: "Read-only access", note: "We can see your money. We can never move it." },
  { label: "Bank-grade encryption", note: "Data encrypted in transit and at rest." },
  { label: "No ads, ever", note: "Funded by subscriptions, so you are the customer." },
  { label: "Cancel anytime", note: "No lock-in on the monthly plan." },
] as const;

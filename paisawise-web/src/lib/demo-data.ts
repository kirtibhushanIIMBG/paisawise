/**
 * Deterministic mock data for the product demo.
 *
 * Everything here is invented and must be presented as an illustration. It is
 * seeded rather than random so renders are stable and Playwright can assert on
 * them. Never call Math.random() in this file.
 */

export type Category = {
  key: string;
  label: string;
  spent: number;
  budget: number;
};

export type MonthKey = "aug" | "jul" | "jun";

export type MonthData = {
  key: MonthKey;
  label: string;
  income: number;
  categories: Category[];
  /** 30 daily cumulative spend points */
  timeline: { day: number; spend: number; budgetPace: number }[];
};

/** Small deterministic pseudo-random so daily spend looks organic but is fixed. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function buildTimeline(total: number, seed: number, days = 30) {
  const rand = seeded(seed);
  const weights = Array.from({ length: days }, (_, i) => {
    // Front-loaded month: the persona spends heavily in the first ten days.
    const frontLoad = i < 10 ? 1.7 : i < 20 ? 0.85 : 0.7;
    return frontLoad * (0.55 + rand());
  });
  const sum = weights.reduce((a, b) => a + b, 0);
  let running = 0;
  return weights.map((w, i) => {
    running += (w / sum) * total;
    return {
      day: i + 1,
      spend: Math.round(running),
      budgetPace: Math.round((total / days) * (i + 1)),
    };
  });
}

function month(
  key: MonthKey,
  label: string,
  income: number,
  spends: [string, string, number, number][],
  seed: number,
): MonthData {
  const categories: Category[] = spends.map(([k, l, spent, budget]) => ({
    key: k,
    label: l,
    spent,
    budget,
  }));
  const total = categories.reduce((a, c) => a + c.spent, 0);
  return { key, label, income, categories, timeline: buildTimeline(total, seed) };
}

export const MONTHS: MonthData[] = [
  month(
    "aug",
    "August",
    82000,
    [
      ["food", "Food and dining", 14200, 12000],
      ["rent", "Rent", 24000, 24000],
      ["transport", "Transport", 5400, 6000],
      ["shopping", "Shopping", 11800, 8000],
      ["bills", "Bills and utilities", 6300, 7000],
      ["other", "Everything else", 4900, 6000],
    ],
    7,
  ),
  /*
    Income and budgets move month to month, and they have to.

    Take-home is not flat for a salaried professional: variable pay lands in
    July, and June was short a reimbursement. Budgets move too, because the
    product's own claim is that it reads your history and "adjusts the target
    as your cash flow moves". Holding either constant made two of the four
    KPI tiles read as frozen when the month switched, which looked like a
    broken control rather than a stable salary.

    August is the month the hero panel and the overspend alert both quote, so
    its figures stay put.
  */
  month(
    "jul",
    "July",
    94500,
    [
      ["food", "Food and dining", 11900, 12000],
      ["rent", "Rent", 24000, 24000],
      ["transport", "Transport", 6800, 6500],
      ["shopping", "Shopping", 7100, 9000],
      ["bills", "Bills and utilities", 6600, 7000],
      ["other", "Everything else", 5200, 6500],
    ],
    23,
  ),
  month(
    "jun",
    "June",
    80400,
    [
      ["food", "Food and dining", 12600, 12500],
      ["rent", "Rent", 24000, 24000],
      ["transport", "Transport", 5100, 5500],
      ["shopping", "Shopping", 13400, 8500],
      ["bills", "Bills and utilities", 5900, 6500],
      ["other", "Everything else", 3800, 5500],
    ],
    41,
  ),
];

export function monthTotals(m: MonthData) {
  const spent = m.categories.reduce((a, c) => a + c.spent, 0);
  const budget = m.categories.reduce((a, c) => a + c.budget, 0);
  const over = m.categories.filter((c) => c.spent > c.budget);
  return { spent, budget, saved: m.income - spent, over };
}

/**
 * Fictional Indian institutions. Never use a real bank name here.
 *
 * The names read Indian because the buyer is Indian and "Northgate Bank" did
 * not, but they stay invented on purpose: this list sits under the line
 * "PaisaWise can see these", so a real bank's name would read as a claimed
 * integration and contradict the affiliation disclaimer in the footer.
 */
export const LINKED_ACCOUNTS = [
  { name: "Sampada Bank", type: "Savings", mask: "4417", kind: "bank" as const },
  { name: "Rajpath Bank", type: "Salary", mask: "8802", kind: "bank" as const },
  { name: "Nivesh Bank", type: "Credit card", mask: "2290", kind: "bank" as const },
  { name: "PayKosh", type: "UPI", mask: "@paykosh", kind: "upi" as const },
  { name: "TaraPe", type: "UPI", mask: "@tarape", kind: "upi" as const },
];

/** Merchants are invented too, for the same reason and to stay consistent. */
export const RECENT_TRANSACTIONS = [
  { merchant: "Kaapi House", category: "Food and dining", amount: 480, day: "Today" },
  { merchant: "Metro card top-up", category: "Transport", amount: 1000, day: "Today" },
  { merchant: "Bazaar Online", category: "Shopping", amount: 3299, day: "Yesterday" },
  { merchant: "Electricity board", category: "Bills and utilities", amount: 2140, day: "Yesterday" },
  { merchant: "Kirana store", category: "Food and dining", amount: 860, day: "2 days ago" },
];

/* --------------------------------------------------------- calculator ---- */

export const CALC_DEFAULTS = {
  salary: 60000,
  rate: 5,
  minSalary: 20000,
  maxSalary: 300000,
  salaryStep: 5000,
  minRate: 2,
  maxRate: 15,
};

/**
 * The payback model. Mirrors the pitch deck exactly so the site and the pitch
 * cannot contradict each other: ₹60,000 × 5% = ₹3,000/month against ₹499,
 * which is roughly 6×.
 */
export function payback(salary: number, ratePercent: number, monthlyPrice: number) {
  const monthlySaving = (salary * ratePercent) / 100;
  const net = monthlySaving - monthlyPrice;
  return {
    monthlySaving,
    net,
    yearlyNet: net * 12,
    multiple: monthlySaving / monthlyPrice,
  };
}

/* --------------------------------------------------------------- quiz ---- */

export type QuizOption = { value: string; label: string; note?: string; score: number };
export type QuizQuestion = { id: string; question: string; help?: string; options: QuizOption[] };

export const QUIZ: QuizQuestion[] = [
  {
    id: "income",
    question: "What lands in your account each month?",
    help: "Take-home, after tax and deductions.",
    options: [
      { value: "a", label: "Under ₹40,000", score: 1 },
      { value: "b", label: "₹40,000 to ₹80,000", score: 2 },
      { value: "c", label: "₹80,000 to ₹1,50,000", score: 3 },
      { value: "d", label: "Above ₹1,50,000", score: 4 },
    ],
  },
  {
    id: "savings",
    question: "How much of it is still there at month end?",
    options: [
      { value: "a", label: "Nothing, and I am not sure why", note: "This is the most common answer", score: 1 },
      { value: "b", label: "A little, but it varies wildly", score: 2 },
      { value: "c", label: "Around a tenth, most months", score: 3 },
      { value: "d", label: "A quarter or more, consistently", score: 4 },
    ],
  },
  {
    id: "investing",
    question: "Where are you with investing?",
    options: [
      { value: "a", label: "I have never started", score: 1 },
      { value: "b", label: "I know about SIPs but have not begun", note: "Very common for this stage", score: 2 },
      { value: "c", label: "One or two SIPs running", score: 3 },
      { value: "d", label: "A diversified portfolio I review", score: 4 },
    ],
  },
  {
    id: "goal",
    question: "What would you want fixed first?",
    options: [
      { value: "a", label: "Seeing where my money goes", score: 1 },
      { value: "b", label: "Saving something every month, reliably", score: 2 },
      { value: "c", label: "Starting to invest properly", score: 3 },
      { value: "d", label: "Planning for something big", note: "A house, a wedding, a career break", score: 4 },
    ],
  },
];

export type Persona = {
  key: string;
  name: string;
  summary: string;
  focus: string[];
  sipSuggestion: string;
  risk: "Conservative" | "Balanced" | "Growth";
};

export const PERSONAS: Persona[] = [
  {
    key: "finder",
    name: "The Fog Clearer",
    summary:
      "You earn enough. The problem is visibility, so that is where we start. Once you can see the month, the rest gets much easier.",
    focus: ["Link every account and UPI app", "Two weeks of automatic categorisation", "One realistic savings target"],
    sipSuggestion: "Hold off on investing until there is a stable surplus. Your advisor will tell you when.",
    risk: "Conservative",
  },
  {
    key: "builder",
    name: "The Steady Earner",
    summary:
      "You save when you remember to. The fix is making it automatic rather than a decision you take thirty times a month.",
    focus: ["Automated savings target", "Real-time alerts on your two hottest categories", "First SIP set up on the opening call"],
    sipSuggestion: "A small monthly SIP into a balanced fund, sized so you will not cancel it in month three.",
    risk: "Balanced",
  },
  {
    key: "grower",
    name: "The Ready Investor",
    summary:
      "The budgeting is broadly handled. What you are missing is someone to tell you how much, where, and when.",
    focus: ["Risk profiling on the first call", "SIP sizing against your real surplus", "Quarterly portfolio review"],
    sipSuggestion: "A structured SIP split across equity and debt, matched to your risk profile.",
    risk: "Growth",
  },
];

export function personaFor(score: number): Persona {
  if (score <= 7) return PERSONAS[0];
  if (score <= 12) return PERSONAS[1];
  return PERSONAS[2];
}

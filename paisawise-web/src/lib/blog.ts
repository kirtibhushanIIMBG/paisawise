/**
 * Blog content, written for the persona in the brief: a 25 to 35 year old
 * salaried professional who cannot say where the money went and has been
 * meaning to start investing for two years.
 *
 * Every rupee figure below is a worked example, so any post carrying one sets
 * `illustrative: true` and the detail page renders the illustration label.
 * The only real prices on this site are ₹499, ₹4,999 and ₹999, and they live
 * in lib/site.ts.
 *
 * Authors are the fictional team from /about. They are invented for an
 * academic project.
 */

import { rupees } from "@/lib/format";

export type BlogBlock =
  | { type: "p"; content: string }
  | { type: "h2"; content: string }
  | { type: "ul"; content: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, formatted for display through formatPostDate. */
  date: string;
  readingMinutes: number;
  author: string;
  authorRole: string;
  category: string;
  /** True when the body contains a modelled rupee figure. */
  illustrative: boolean;
  body: BlogBlock[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "where-your-salary-goes",
    title: "Where your salary goes in the first ten days",
    excerpt:
      "Most salaried spending in India clears before the month is a third old. Here is how to see it, and why the tenth is the date worth watching.",
    date: "2026-07-28",
    readingMinutes: 5,
    author: "Meera Nair",
    authorRole: "Co-founder",
    category: "Spending",
    illustrative: true,
    body: [
      {
        type: "p",
        content:
          "Your salary lands on the first. By the tenth the balance has moved a long way and your memory of it has gone soft. Ask most people what they spent in that window and you get rent, and then a pause.",
      },
      { type: "h2", content: "The month is front-loaded" },
      {
        type: "p",
        content: `Rent, EMIs, the SIP debit, an insurance premium, society maintenance and school fees tend to clear in the first week. On a take-home of ${rupees(90000)}, that block can account for sixty per cent of the money before you have made a single decision. What is left feels like the whole month's budget, so you spend it like one.`,
      },
      {
        type: "p",
        content:
          "The shape that follows is familiar to almost every salaried person. Comfortable till the twelfth. Careful by the twentieth. Counting by the twenty-eighth.",
      },
      { type: "h2", content: "Three numbers worth knowing" },
      {
        type: "ul",
        content: [
          "Fixed outflow: everything that leaves on a date you did not choose.",
          "Discretionary pool: take-home minus fixed outflow, before you spend a rupee of it.",
          "Ten-day burn: how much of that pool is gone by the tenth.",
        ],
      },
      {
        type: "p",
        content:
          "The third one is the diagnostic. If more than half the pool has gone by the tenth, the last week of every month will be tight no matter how much you earn. Raising your salary moves the date by a few days and changes nothing else.",
      },
      { type: "h2", content: "Why your memory fails here" },
      {
        type: "p",
        content:
          "This is rarely carelessness. Money now leaves through five doors: a salary account, a second account you opened for a loan, one UPI app for food, another for auto rides, a card for online orders. Each door holds a fragment of the record. Nobody assembles the whole thing, so nobody sees it.",
      },
      {
        type: "p",
        content:
          "Pull three months of statements into one sheet, sort by amount, and read the top twenty rows. It takes twenty minutes and it usually settles an argument you have been having with yourself.",
      },
      { type: "h2", content: "What to change first" },
      {
        type: "p",
        content:
          "Move the SIP debit to the second of the month, right behind the salary credit. Saving whatever is left at month end fails because there is rarely anything left at month end. Saving first works because the rest of the month quietly arranges itself around the smaller number.",
      },
      {
        type: "p",
        content:
          "Then set one alert, on whichever category surprised you most in the sheet. One is enough. Two starts to feel like nagging and you will switch both off by the end of the quarter.",
      },
    ],
  },
  {
    slug: "fifty-thirty-twenty-does-not-fit",
    title: "50-30-20 rarely survives an Indian salary slip",
    excerpt:
      "The most repeated budgeting rule on the internet assumes a cost structure that metro rent, an education loan and money sent home do not share.",
    date: "2026-07-09",
    readingMinutes: 6,
    author: "Farah Qureshi",
    authorRole: "Head of advisory",
    category: "Budgeting",
    illustrative: true,
    body: [
      {
        type: "p",
        content:
          "Fifty per cent needs, thirty per cent wants, twenty per cent savings. It is the first rule anyone learns and the first one to break when you apply it to a salary earned in Bengaluru, Mumbai or Gurugram.",
      },
      { type: "h2", content: "Where it breaks" },
      {
        type: "ul",
        content: [
          "Rent in a metro often runs to thirty-five per cent of take-home on its own, which leaves fifteen for everything else in the needs bucket.",
          "An education loan EMI belongs in needs, and it is rarely small in the years when your salary is smallest.",
          "Money sent home to parents fits none of the three buckets cleanly, and the rule has no opinion on it.",
          "Annual costs like premiums, festival spending and one wedding a year are invisible in a monthly percentage.",
        ],
      },
      {
        type: "p",
        content:
          "So you try it, miss the split in month one, miss it again in month two, and conclude that budgeting does not work for you. The rule failed. You did not.",
      },
      { type: "h2", content: "A version that holds" },
      {
        type: "p",
        content:
          "Work backwards from a savings figure instead of forwards from a percentage. Decide what you will save, automate it on salary day, and let the remainder define what the month looks like.",
      },
      {
        type: "p",
        content: `Pick a number you are confident about even in a bad month. ${rupees(5000)} that survives twelve months beats ${rupees(15000)} that survives two, because the habit is worth more in year three than the amount is in month one.`,
      },
      { type: "h2", content: "Give the annual costs a monthly home" },
      {
        type: "p",
        content:
          "Add up last year's one-off spending: insurance premiums, travel, gifts, the repair nobody plans for. Divide by twelve and treat the result as a fixed monthly line that leaves your account like an EMI. This single change removes most of the surprise from a budget, and surprise is what makes people abandon them.",
      },
      {
        type: "p",
        content:
          "Once savings and the annual line are set, the money that remains needs no categories at all. You can spend it without checking anything, which is the part that makes a budget last past March.",
      },
      { type: "h2", content: "Review it every quarter" },
      {
        type: "p",
        content:
          "Salaries change, rent changes, and a budget written in April is a guess by September. Look at it every three months and move one number. Small corrections are far easier to keep than an annual rewrite you dread.",
      },
    ],
  },
  {
    slug: "sip-without-the-jargon",
    title: "SIP without the jargon",
    excerpt:
      "A plain reading of what a SIP is, what it is not, and the four decisions in front of you before the first one starts.",
    date: "2026-06-17",
    readingMinutes: 6,
    author: "Farah Qureshi",
    authorRole: "Head of advisory",
    category: "Investing",
    illustrative: false,
    body: [
      {
        type: "p",
        content:
          "Most salaried people know they should start a SIP. Far fewer start. The reason is usually the same: the vocabulary makes a simple instruction sound like a qualification you have not earned.",
      },
      { type: "h2", content: "What a SIP is" },
      {
        type: "p",
        content:
          "A Systematic Investment Plan is an instruction to your bank. On this date every month, move this amount into this mutual fund. That is the entire mechanism. The SIP is the schedule. The fund is the investment.",
      },
      {
        type: "p",
        content:
          "The distinction matters more than it sounds. People compare a SIP to a fixed deposit and ask which gives the better return. A SIP has no return of its own. The fund behind it does, and that fund can fall in any given year.",
      },
      { type: "h2", content: "The four decisions" },
      {
        type: "ul",
        content: [
          "Amount: what you can keep paying in a month where something goes wrong.",
          "Date: a day or two after salary credit, so the money leaves before you plan around it.",
          "Fund type: equity for goals more than five years away, debt or hybrid for anything closer.",
          "Duration: the one you will be tempted to change. Stopping in a falling market undoes most of the reason for starting.",
        ],
      },
      { type: "h2", content: "Rupee cost averaging, stated plainly" },
      {
        type: "p",
        content:
          "A fixed monthly amount buys more units when the price is low and fewer when it is high. Over several years that smooths your average purchase price. It is no guarantee of profit. What it removes is the need to guess the right day to buy, and that guess is what keeps people out of the market for years at a stretch.",
      },
      { type: "h2", content: "Two things to sort out first" },
      {
        type: "p",
        content:
          "An emergency fund you can reach within a day, and a credit card balance of zero. A revolving card balance costs more each month than a fund is likely to earn in a year, so clearing it is the higher return and it carries no risk.",
      },
      {
        type: "p",
        content:
          "After that, begin small and raise the amount whenever your salary rises. Starting with a modest sum this month beats a perfect plan you begin next year.",
      },
      {
        type: "p",
        content:
          "Mutual funds carry market risk. Nothing here recommends a specific fund, and a monthly advisor call is where the specifics belong.",
      },
    ],
  },
  {
    slug: "how-much-emergency-fund",
    title: "How much emergency fund is enough",
    excerpt:
      "Three months, six months, a year. The advice varies wildly because the right size depends on facts about you that generic advice does not know.",
    date: "2026-05-30",
    readingMinutes: 5,
    author: "Meera Nair",
    authorRole: "Co-founder",
    category: "Saving",
    illustrative: true,
    body: [
      {
        type: "p",
        content:
          "Ask five people how large an emergency fund should be and you will get five answers. The range is wide because the correct answer depends on how quickly you could replace your income, and nobody handing out the rule of thumb knows that about you.",
      },
      { type: "h2", content: "Size it against your fixed outflow" },
      {
        type: "p",
        content:
          "Measure the fund against what you must pay each month rather than what you earn. Rent, EMIs, utilities, groceries, insurance and anything you send home. Discretionary spending stops in an emergency, so it has no business in the calculation.",
      },
      {
        type: "p",
        content: `If your fixed outflow is ${rupees(45000)}, six months of cover is ${rupees(270000)}. That figure looks alarming the first time you see it, which is exactly why almost nobody builds it in one attempt.`,
      },
      { type: "h2", content: "How many months" },
      {
        type: "ul",
        content: [
          "Three months if you are single, your skills are in demand, and nobody depends on your income.",
          "Six months if you support a family, or your notice period runs to three months.",
          "Nine to twelve months if your income varies, you carry a large EMI, or you are the only earner at home.",
        ],
      },
      { type: "h2", content: "Where to keep it" },
      {
        type: "p",
        content:
          "Availability beats return here. A savings account works. A liquid fund works. A fixed deposit with a penalty on early withdrawal works less well, and equity does not work at all, because emergencies have a habit of arriving in the same month the market falls.",
      },
      {
        type: "p",
        content:
          "Splitting it helps. Keep about a month in the account you use daily and the rest somewhere slightly harder to reach, so it stops quietly becoming a spending buffer.",
      },
      { type: "h2", content: "Building it without pain" },
      {
        type: "p",
        content:
          "Treat it as a standing instruction into a liquid fund and forget it exists. Push any bonus or arrear into it until it is full, then stop contributing. A finished emergency fund frees the whole contribution for investing, and that is the reward for getting it done early.",
      },
    ],
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** 28 July 2026 */
export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

/** Everything except the given slug, newest first. Used for "read next". */
export function otherPosts(slug: string): BlogPost[] {
  return POSTS.filter((post) => post.slug !== slug);
}

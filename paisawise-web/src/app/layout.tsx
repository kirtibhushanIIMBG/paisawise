import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MotionLayer } from "@/components/motion/MotionLayer";

/**
 * Inter Tight carries headings, Inter carries body and every numeral.
 *
 * The reference calls for TT Norms Pro, which is a commercial licence we do
 * not hold. Inter Tight is the closest free equivalent: the same neutral
 * grotesque colour, slightly condensed, and it holds its shape at the
 * -0.03/-0.04em tracking this design depends on. Both are self-hosted through
 * next/font — no third-party runtime request, no layout shift.
 */
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paisawise.example"),
  title: {
    default: "PaisaWise · Your personal finance coach",
    template: "%s · PaisaWise",
  },
  description:
    "An AI budgeting app with a certified financial advisor attached. Built for salaried professionals who earn well and still cannot say where the money went.",
  openGraph: {
    title: "PaisaWise · Your personal finance coach",
    description:
      "AI budgeting, real-time overspending alerts, and a certified financial advisor every month. ₹499 a month.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

/**
 * Light is the default presentation — it is what this design is — so the
 * server-rendered html tag ships bare and this script only ever *adds* `dark`.
 * That way the default survives JavaScript being off, and there is no flash
 * either way.
 *
 * This is a raw <script>, deliberately, and it stays one.
 *
 * React 19 logs a dev-only warning for a script element rendered inside a
 * component ("scripts inside React components are never executed when
 * rendering on the client"). The obvious fix is next/script with
 * strategy="beforeInteractive" — and it is wrong here. That strategy does not
 * execute inline code at parse time; it pushes it onto Next's `__next_s` queue
 * for the client runtime to run after the bundle boots. Measured against the
 * static export, recording `documentElement.className` on the way in:
 *
 *              raw <script>   next/script beforeInteractive
 *   DOMContentLoaded   dark   (none)
 *   first frame        dark   (none)
 *   readyState complete dark  dark
 *
 * So the tidy version costs every dark-mode visitor a flash of the light
 * theme on every page load. The warning is stripped from production React and
 * costs nothing but console noise in dev; the flash is visible to real users.
 * We take the noise.
 */
const THEME_SCRIPT = `
try {
  if (localStorage.getItem('pw-theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body
        className={`${interTight.variable} ${inter.variable} noise antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-action focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-action"
        >
          Skip to content
        </a>
        <MotionLayer />
        <div className="flex min-h-screen flex-col bg-bg">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

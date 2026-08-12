import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { ScrollFx } from "@/components/motion/ScrollFx";
import { AgentationToolbar } from "@/components/dev/AgentationToolbar";

/**
 * Clash Display carries headings. It has the rupee glyph but NO tabular
 * figures, so every numeral on the site uses Inter via the `.num` utility.
 * Both are self-hosted through next/font: no third-party runtime request,
 * no layout shift.
 */
const clash = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  variable: "--font-clash",
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
 * Dark is the default presentation, so `dark` ships on the server-rendered
 * html tag and this script only ever *removes* it. That way the default
 * survives JavaScript being off, and there is no flash either way.
 */
const THEME_SCRIPT = `
try {
  if (localStorage.getItem('pw-theme') === 'light') {
    document.documentElement.classList.remove('dark');
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${clash.variable} ${inter.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-fill focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollFx />
        <CursorGlow />
        {/* The rails. Everything on every route sits inside this frame. */}
        <div className="frame min-h-screen">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <AgentationToolbar />
      </body>
    </html>
  );
}

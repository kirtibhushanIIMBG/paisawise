import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

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

/** Applies the stored theme before paint so there is no flash of the wrong one. */
const THEME_SCRIPT = `
try {
  var t = localStorage.getItem('pw-theme');
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
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
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${clash.variable} ${inter.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-violet focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

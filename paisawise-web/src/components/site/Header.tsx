"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/primitives";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("pw-theme", next ? "dark" : "light");
    } catch {
      /* storage blocked, theme just will not persist */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 place-items-center rounded-full border border-edge text-copy transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-edge bg-bg/85 backdrop-blur-xl"
          : "border-transparent bg-bg",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6 py-3">
        <Link href="/" aria-label="PaisaWise home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <button className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium text-copy transition-colors hover:text-accent">
                  {item.label}
                  <ChevronDown
                    size={15}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>
                <div className="invisible absolute left-0 top-full w-72 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-2xl border border-edge bg-panel p-2 shadow-xl shadow-black/40">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
                      >
                        <div className="text-sm font-semibold text-fg">
                          {child.label}
                        </div>
                        <div className="mt-0.5 text-xs text-dim">{child.note}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-copy",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Button href="/contact" variant="secondary" size="sm" className="hidden md:inline-flex">
            Book a call
          </Button>
          <Button href="/get-started" size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-edge text-fg lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-edge bg-bg lg:hidden">
          <div className="shell flex flex-col gap-1 py-5">
            {NAV.flatMap((item): { href: string; label: string }[] =>
              "children" in item
                ? item.children.map((c) => ({ href: c.href, label: c.label }))
                : [{ href: item.href, label: item.label }],
            ).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-fg transition-colors hover:bg-accent-soft"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <Button href="/get-started" className="flex-1">
                Get started
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/primitives";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Dark ships on the server-rendered html tag, so `true` is the only initial
 * value that matches the first paint. Starting at `false` rendered the wrong
 * icon and the wrong aria-label for a frame on every load. The effect below
 * still corrects it for the minority who stored `light`.
 */
function ThemeToggle() {
  const [dark, setDark] = useState(true);

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
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-11 w-11 place-items-center rounded-full border border-edge text-copy transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

/**
 * The "Product" menu.
 *
 * This used to open on `:hover` and `:focus-within` alone. Hover is not an
 * interaction a touch screen can perform, and the desktop nav is visible from
 * 1024px up -- which includes iPad landscape and every touch laptop -- so on
 * those devices the menu simply could not be opened: the trigger was a button
 * that did nothing. It is now a real disclosure. Pointer-enter still opens it
 * for a mouse, so nothing is lost, but click, Enter, Space and Escape all
 * work, and the state is announced.
 */
function NavMenu({
  label,
  items,
}: {
  label: string;
  items: readonly { href: string; label: string; note: string }[];
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  /* Whether the menu currently on screen was opened by the pointer hovering
     rather than by a real click. See the click handler for why. */
  const openedByHover = useRef(false);
  const panelId = `nav-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const close = useCallback((returnFocus = false) => {
    openedByHover.current = false;
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    /* Pointer-down rather than click: closing on the way down means the menu
       is already gone by the time the click lands on whatever is underneath. */
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        openedByHover.current = false;
        setOpen(false);
      }}
      /* Tabbing past the last item takes focus out of the wrapper, which is
         the keyboard equivalent of the pointer leaving. */
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          openedByHover.current = false;
          setOpen(false);
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        /*
          A plain toggle here was wrong for a mouse. Moving the pointer onto
          the trigger fires pointerenter and opens the menu, so the click that
          follows -- and plenty of people click a menu they are already
          hovering -- toggled it straight back shut. It flashed open and
          closed under the cursor.

          So the first click after a hover-open is absorbed: it confirms the
          menu rather than closing it. A second click, or any click that did
          not follow a hover (touch, or keyboard), toggles normally.
        */
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
        className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium text-copy transition-colors hover:text-accent aria-expanded:text-accent"
      >
        {label}
        <ChevronDown
          size={15}
          aria-hidden
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={panelId}
        className={cn(
          "absolute left-0 top-full w-72 pt-2 transition-all duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-1 opacity-0",
        )}
      >
        <div className="rounded-2xl border border-edge bg-panel p-2 shadow-xl shadow-black/40">
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              /* An invisible panel must not be a tab stop. */
              tabIndex={open ? undefined : -1}
              aria-hidden={open ? undefined : true}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-soft"
            >
              <div className="text-sm font-semibold text-fg">{child.label}</div>
              <div className="mt-0.5 text-xs text-dim">{child.note}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

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

  /* The mobile menu locks the page behind it, so it owes the same escape
     route a dialog does. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
        <Link
          href="/"
          aria-label="PaisaWise home"
          className="flex min-h-11 shrink-0 items-center"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) =>
            "children" in item ? (
              <NavMenu key={item.label} label={item.label} items={item.children} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
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
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-full border border-edge text-fg lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-edge bg-bg lg:hidden"
        >
          <div className="shell flex flex-col gap-1 py-5">
            {NAV.flatMap((item): { href: string; label: string }[] =>
              "children" in item
                ? item.children.map((c) => ({ href: c.href, label: c.label }))
                : [{ href: item.href, label: item.label }],
            ).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-accent-soft",
                  pathname === link.href ? "text-accent" : "text-fg",
                )}
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
        </nav>
      ) : null}
    </header>
  );
}

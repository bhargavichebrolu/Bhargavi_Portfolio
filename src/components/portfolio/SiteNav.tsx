import { Link, useLinkProps, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { navItems, profile } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);

/**
 * Link to a homepage section. <Link> forces aria-current="page" on every link to
 * "/", so this reports the section in view instead.
 */
function SectionLink({
  id,
  current,
  className,
  onClick,
  children,
}: {
  id: string;
  current: boolean;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const linkProps = useLinkProps({ to: "/", hash: id, className, ...(onClick ? { onClick } : {}) });
  return (
    <a {...linkProps} aria-current={current ? "location" : undefined}>
      {children}
    </a>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const onHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const active = useActiveSection(sectionIds, onHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-ink text-ink-foreground transition-[border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-ink-border shadow-[0_6px_18px_-12px_rgb(0_0_0/0.6)]"
          : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-14 items-center justify-between">
        <Link
          to="/"
          hash="home"
          activeOptions={{ includeHash: true }}
          className="inline-flex min-h-11 items-center rounded-sm font-display text-lg font-extrabold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft"
          onClick={() => setOpen(false)}
        >
          {profile.displayName}
        </Link>

        <ul className="hidden h-full items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id} className="h-full">
                <SectionLink
                  id={item.id}
                  current={current}
                  className={cn(
                    "relative flex h-full items-center rounded-sm px-3.5 text-[0.9375rem] font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent-soft/60 after:transition-transform after:duration-200 hover:text-ink-foreground hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-soft",
                    current ? "text-ink-foreground" : "text-ink-foreground/80",
                  )}
                >
                  {item.label}
                  {current && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3.5 bottom-0 h-0.5 bg-accent-soft"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </SectionLink>
              </li>
            );
          })}
        </ul>

        <button
          ref={menuButton}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors hover:bg-ink-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            // No height animation: measuring "auto" makes Framer Motion restore the
            // scroll position, which cancels the smooth scroll to the chosen section.
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-y border-ink-border bg-ink shadow-[0_18px_30px_-20px_rgb(0_0_0/0.7)] lg:hidden"
          >
            <ul className="container-page flex max-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto py-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    current={active === item.id}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-12 items-center border-b border-ink-border font-display text-lg font-bold last:border-b-0",
                      active === item.id ? "text-accent-soft" : "text-ink-foreground",
                    )}
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/siteContent";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateNavState = () => {
      setScrolled(window.scrollY > 16);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;

      if (atBottom) {
        const lastHref = navItems[navItems.length - 1]?.href.replace("#", "") ?? "";
        setActiveSection(lastHref);
        return;
      }

      const viewportMarker = window.scrollY + window.innerHeight * 0.32;
      let currentSection = navItems[0]?.href.replace("#", "") ?? "";

      navItems.forEach((item) => {
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);

        if (element && element.offsetTop <= viewportMarker) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    updateNavState();

    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);

    return () => {
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-baseline gap-1.5 text-xl font-black tracking-tighter text-primary"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 self-center rounded-full bg-accent shadow-[0_0_10px_var(--accent-soft)] transition-all group-hover:shadow-[0_0_16px_var(--accent-soft)]"
          />
          MINSEOK91
        </button>

        <nav className="hidden items-center gap-8 font-headline text-sm font-bold tracking-tight md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative pb-1 transition-colors",
                  isActive
                    ? "border-b-2 border-accent text-primary"
                    : "border-b-2 border-transparent text-on-surface-variant hover:text-primary"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface md:hidden"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mx-4 mt-2 rounded-2xl bg-surface-container-lowest p-4 shadow-lg md:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition",
                    isActive
                      ? "bg-accent-tint text-accent"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-soft)]"
                    />
                  ) : null}
                </button>
              );
            })}

          </div>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/siteContent";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateNavState = () => {
      setScrolled(window.scrollY > 16);

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
          ? "border-b border-[var(--line)] bg-[rgba(6,14,32,0.78)] py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-[var(--foreground)] transition hover:text-[var(--accent)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-[rgba(78,222,163,0.24)] bg-[rgba(78,222,163,0.1)] text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span
            className="text-sm font-semibold tracking-[0.16em]"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            MINSEOK91
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[rgba(19,27,46,0.82)] p-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[rgba(78,222,163,0.14)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden rounded-full border border-[rgba(78,222,163,0.24)] bg-[rgba(78,222,163,0.08)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[rgba(78,222,163,0.4)] hover:bg-[rgba(78,222,163,0.14)] md:inline-flex"
          >
            Contact
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(19,27,46,0.88)] text-[var(--foreground)] md:hidden"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mx-6 mt-3 rounded-[28px] border border-[var(--line)] bg-[rgba(19,27,46,0.96)] p-3 shadow-[0_20px_40px_rgba(2,6,23,0.34)] md:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                    isActive
                      ? "bg-[rgba(78,222,163,0.14)] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[rgba(34,42,61,0.72)] hover:text-[var(--foreground)]"
                  )}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-1 rounded-2xl border border-[rgba(78,222,163,0.22)] bg-[rgba(78,222,163,0.08)] px-4 py-3 text-left text-sm font-medium text-[var(--foreground)] transition hover:bg-[rgba(78,222,163,0.14)]"
            >
              Contact
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

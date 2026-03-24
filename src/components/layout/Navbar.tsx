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
          ? "bg-[#f0f7f5]/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-black tracking-tighter text-primary"
        >
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
                  "transition-colors",
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-on-surface-variant hover:text-primary"
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface md:hidden"
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
                    "rounded-xl px-4 py-3 text-left text-sm font-bold transition",
                    isActive
                      ? "bg-primary-container/30 text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  )}
                >
                  {item.label}
                </button>
              );
            })}

          </div>
        </div>
      ) : null}
    </header>
  );
}

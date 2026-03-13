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
          ? "border-b border-[rgba(18,25,44,0.08)] bg-[rgba(243,241,235,0.78)] py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 md:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-semibold tracking-[0.16em] text-[#12192C] transition hover:text-[#1F5EFF]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          MINSEOK91
        </button>

        <nav className="hidden items-center gap-2 rounded-full border border-[rgba(18,25,44,0.08)] bg-white/72 p-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[#12192C] text-white"
                    : "text-[#596176] hover:text-[#12192C]"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(18,25,44,0.08)] bg-white/78 text-[#12192C] md:hidden"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="mx-6 mt-3 rounded-[28px] border border-[rgba(18,25,44,0.08)] bg-white/92 p-3 shadow-[0_20px_40px_rgba(18,25,44,0.08)] md:hidden">
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
                      ? "bg-[#12192C] text-white"
                      : "text-[#596176] hover:bg-[#F5F7FB] hover:text-[#12192C]"
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

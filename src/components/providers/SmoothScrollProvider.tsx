"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let rafId = 0;
    const sync = () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = undefined;
      if (reduced.matches) return;
      lenis = new Lenis({ duration: 1.05, anchors: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(rafId);
      reduced.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

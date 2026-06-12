"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

export default function CountUp({
  to,
  display,
}: {
  to: number | null;
  display: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (to === null || !inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = display;
      return;
    }
    const suffix = display.replace(String(to), "");
    const controls = animate(value, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, display, value, reduced]);

  return <span ref={ref}>{to === null ? display : `0`}</span>;
}

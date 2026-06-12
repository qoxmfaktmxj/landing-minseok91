"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const LABELS: Record<string, string> = {
  open: "OPEN",
  read: "READ",
  contact: "HIRE",
};

export default function InkCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 500, damping: 35 });
  const sy = useSpring(my, { stiffness: 500, damping: 35 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let activated = false;
    const onMove = (e: MouseEvent) => {
      if (!activated) {
        activated = true;
        setEnabled(true);
      }
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      setLabel(target ? (LABELS[target.dataset.cursor ?? ""] ?? null) : null);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full bg-vermilion font-mono text-[9px] font-bold text-paper-white"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: label ? 52 : 10,
        height: label ? 52 : 10,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {label}
    </motion.div>
  );
}

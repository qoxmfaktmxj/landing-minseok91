"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "minseok-times-intro-seen";

export default function PrintIntro() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    const showTimer = setTimeout(() => setShow(true), 0);
    const hideTimer = setTimeout(() => setShow(false), 1800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-paper"
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={() => setShow(false)}
          role="presentation"
        >
          <div className="text-center">
            <motion.p
              className="font-serif text-4xl font-black tracking-tight text-ink md:text-6xl"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              The <span className="text-vermilion">Minseok</span> Times
            </motion.p>
            <motion.div
              className="mx-auto mt-4 h-0.5 w-full origin-left bg-ink"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            <motion.p
              className="mt-3 font-mono text-[10px] tracking-[0.3em] text-ink-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              NOW PRINTING — VOL.9
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

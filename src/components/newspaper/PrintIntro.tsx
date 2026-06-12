"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "minseok-times-intro-seen";

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable in restricted browser modes; the intro still runs.
  }
}

export default function PrintIntro() {
  const [show, setShow] = useState(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const skipIntro = useCallback(() => setShow(false), []);

  useEffect(() => {
    if (reduced) return;
    if (hasSeenIntro()) return;
    markIntroSeen();
    const showTimer = setTimeout(() => setShow(true), 0);
    const hideTimer = setTimeout(() => setShow(false), 1800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [reduced]);

  useEffect(() => {
    if (!show) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => skipButtonRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [show, skipIntro]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overscroll-none bg-paper"
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={skipIntro}
          role="dialog"
          aria-label="The Minseok Times 인쇄 인트로"
          aria-modal="true"
        >
          <button
            ref={skipButtonRef}
            type="button"
            className="absolute right-5 top-5 border border-ink bg-paper px-3 py-2 font-mono text-[10px] font-bold tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper motion-reduce:transition-none"
            onClick={(event) => {
              event.stopPropagation();
              skipIntro();
            }}
          >
            SKIP
          </button>
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

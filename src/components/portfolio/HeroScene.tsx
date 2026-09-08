"use client";

import { useEffect, useRef } from "react";
import styles from "./ArcticHero.module.css";
import type { createArcticScene } from "./arctic-scene";

type ArcticScene = Awaited<ReturnType<typeof createArcticScene>>;

export default function HeroScene({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
    canvasRef.current?.dispatchEvent(new Event("motionchange"));
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const initialization = new AbortController();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scene: ArcticScene | undefined;
    let disposed = false;
    let visible = false;
    let lost = false;
    let frame = 0;
    let time = 0;
    let previous = 0;
    let touchRelease = 0;
    let touching = false;
    const tick = (now: number) => {
      frame = 0;
      if (!scene || !visible || lost || document.hidden || pausedRef.current || reduced.matches) return;
      const delta = previous ? Math.min((now - previous) / 1000, .06) : 1 / 60;
      previous = now;
      time += delta;
      scene.render(time, delta, false);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      if (!scene || !visible || lost || document.hidden) return;
      if (reduced.matches) time = 0;
      scene.render(time, 0, reduced.matches);
      if (!pausedRef.current && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const onPointer = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      if (!scene || !visible || pausedRef.current || reduced.matches || document.hidden) return;
      window.clearTimeout(touchRelease);
      touching = false;
      if (!canvas.closest(".hero")?.contains(event.target as Node) || (event.target as Element).closest("a, button, input, select, textarea, [role='button']")) { scene.pointerLeave(); return; }
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) scene.pointerLeave();
      else {
        scene.pointer(x * 2 - 1, 1 - y * 2);
        touching = event.pointerType !== "mouse";
      }
    };
    const leave = (event: PointerEvent) => {
      if (event.type === "pointerout" && (event.relatedTarget || event.pointerType !== "mouse")) return;
      if (event.type === "pointerup" && event.pointerType === "mouse") return;
      window.clearTimeout(touchRelease);
      if (event.type === "pointerup" && touching) {
        touching = false;
        touchRelease = window.setTimeout(() => scene?.pointerLeave(), 900);
        return;
      }
      touching = false;
      if (!pausedRef.current) scene?.pointerLeave();
    };
    const lostContext = (event: Event) => {
      event.preventDefault(); lost = true;
      cancelAnimationFrame(frame); frame = 0;
      canvas.dataset.ready = "false";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      canvas.dataset.intersecting = String(visible);
      sync();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(() => { scene?.resize(); sync(); });
    resizeObserver.observe(canvas);
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerup", leave, { passive: true });
    window.addEventListener("pointercancel", leave, { passive: true });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    canvas.addEventListener("motionchange", sync);
    canvas.addEventListener("webglcontextlost", lostContext);
    import("./arctic-scene").then(module => module.createArcticScene(canvas, initialization.signal)).then(result => {
      if (disposed) { result.dispose(); return; }
      scene = result;
      sync();
    }).catch(() => { if (!disposed) canvas.dataset.ready = "false"; });
    return () => {
      disposed = true;
      initialization.abort();
      cancelAnimationFrame(frame);
      window.clearTimeout(touchRelease);
      observer.disconnect(); resizeObserver.disconnect();
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerup", leave);
      window.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      canvas.removeEventListener("motionchange", sync);
      canvas.removeEventListener("webglcontextlost", lostContext);
      scene?.dispose();
      canvas.dataset.ready = "false";
    };
  }, []);

  return <div className={styles.scene} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}

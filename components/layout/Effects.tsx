"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { useSafeReducedMotion } from "@/components/ui/Animations";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgress() {
  const prefersReducedMotion = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-accent-400"
    />
  );
}

const CURSOR_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 768px)";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CURSOR_QUERY);
    const root = document.documentElement;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let hasMoved = false;
    let frameId = 0;

    function follow() {
      current.x += (target.x - current.x) * 0.6;
      current.y += (target.y - current.y) * 0.6;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(follow);
    }

    function handleMouseMove(event: MouseEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!hasMoved) {
        hasMoved = true;
        current.x = target.x;
        current.y = target.y;
        dotRef.current?.classList.add("is-visible");
      }
    }

    const hide = () => dotRef.current?.classList.remove("is-visible");
    const show = () => hasMoved && dotRef.current?.classList.add("is-visible");

    function enable() {
      root.classList.add("custom-cursor-active");
      frameId = requestAnimationFrame(follow);
      window.addEventListener("mousemove", handleMouseMove);
      root.addEventListener("mouseleave", hide);
      root.addEventListener("mouseenter", show);
    }

    function disable() {
      root.classList.remove("custom-cursor-active");
      cancelAnimationFrame(frameId);
      hasMoved = false;
      hide();
      window.removeEventListener("mousemove", handleMouseMove);
      root.removeEventListener("mouseleave", hide);
      root.removeEventListener("mouseenter", show);
    }

    const handleQueryChange = (event: MediaQueryListEvent) =>
      event.matches ? enable() : disable();

    if (mediaQuery.matches) enable();
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      disable();
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return <div ref={dotRef} aria-hidden className="custom-cursor" />;
}

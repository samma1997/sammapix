"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  /** Distance to travel on the Y axis, in px */
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  /** Re-run the animation every time it enters the viewport */
  once?: boolean;
};

/**
 * Lightweight scroll-reveal wrapper. Uses IntersectionObserver, pure CSS
 * transitions with the Emil Kowalski easing curve. Respects reduced motion:
 * when the user prefers reduced motion the content is shown immediately with
 * no transform.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  as = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced, once]);

  const Tag = as as React.ElementType;

  const style: React.CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition:
          "opacity 720ms cubic-bezier(0.32,0.72,0,1), transform 720ms cubic-bezier(0.32,0.72,0,1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      };

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot, ExternalLink, LogIn, ShieldCheck, PlugZap } from "lucide-react";

const STEPS = [
  { icon: Bot, title: "AI agent", sub: "asks to run a tool" },
  { icon: ExternalLink, title: "Opens link", sub: "one tap, in the chat" },
  { icon: LogIn, title: "Sign in with Google", sub: "no API key to paste" },
  { icon: ShieldCheck, title: "Approve access", sub: "OAuth 2.1 consent", check: true },
  { icon: PlugZap, title: "Connected", sub: "+50 free credits" },
];

/**
 * Animated OAuth onboarding flow. When it scrolls into view the steps light up
 * one after another, a pulse travels the connectors, and the consent checkmark
 * draws itself. Restarts on re-entry so the effect is felt on scroll.
 */
export default function ConnectionFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className={`fa-flow ${active ? "is-active" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-0">
        {STEPS.map((s, i) => (
          <div key={s.title} className="relative flex sm:flex-col sm:items-center">
            {/* connector to next (desktop) */}
            {i < STEPS.length - 1 && (
              <span className="fa-conn hidden sm:block" style={{ ["--i" as string]: i }} aria-hidden>
                <span className="fa-conn-line" />
                <span className="fa-conn-dot" />
              </span>
            )}

            <div
              className="fa-step-card relative z-10 flex w-full items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white p-3 dark:border-[#2A2A2A] dark:bg-[#1E1E1E] sm:w-auto sm:flex-col sm:items-center sm:gap-2 sm:p-4 sm:text-center"
              style={{ ["--i" as string]: i }}
            >
              <span className="fa-step-icon flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#F5F5F5] text-[#737373] dark:bg-[#161616]">
                {s.check ? (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path className="fa-check-path" d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <s.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                )}
              </span>
              <div className="min-w-0 sm:mt-0">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">{s.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#737373] dark:text-[#A3A3A3]">{s.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const css = `
.fa-flow .fa-step-card {
  opacity: 0.55;
  transform: translateY(6px) scale(0.985);
  transition: opacity 520ms cubic-bezier(0.32,0.72,0,1), transform 520ms cubic-bezier(0.32,0.72,0,1), border-color 520ms ease;
  transition-delay: calc(var(--i) * 220ms);
}
.fa-flow.is-active .fa-step-card {
  opacity: 1;
  transform: translateY(0) scale(1);
  border-color: rgba(99,102,241,0.35);
}
.fa-flow .fa-step-icon {
  transition: background-color 520ms ease, color 520ms ease;
  transition-delay: calc(var(--i) * 220ms);
}
.fa-flow.is-active .fa-step-icon {
  background-color: rgba(99,102,241,0.1);
  color: #6366F1;
}

/* connectors */
.fa-conn {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 2px;
  transform: translateY(-50%);
  z-index: 0;
}
.fa-conn-line {
  position: absolute;
  inset: 0;
  background: #E5E5E5;
  overflow: hidden;
}
.fa-conn-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #6366F1, rgba(99,102,241,0.4));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 520ms cubic-bezier(0.32,0.72,0,1);
  transition-delay: calc(var(--i) * 220ms + 200ms);
}
:is(.dark) .fa-conn-line { background: #2A2A2A; }
.fa-flow.is-active .fa-conn-line::after { transform: scaleX(1); }

.fa-conn-dot {
  position: absolute;
  top: 50%;
  left: 0;
  height: 6px;
  width: 6px;
  margin-top: -3px;
  border-radius: 9999px;
  background: #6366F1;
  opacity: 0;
  box-shadow: 0 0 8px rgba(99,102,241,0.7);
}
.fa-flow.is-active .fa-conn-dot {
  animation: fa-travel 900ms cubic-bezier(0.32,0.72,0,1) forwards;
  animation-delay: calc(var(--i) * 220ms + 200ms);
}
@keyframes fa-travel {
  0% { left: 0; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

/* consent checkmark draw */
.fa-check-path {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  transition: stroke-dashoffset 480ms cubic-bezier(0.32,0.72,0,1);
  transition-delay: 900ms;
}
.fa-flow.is-active .fa-check-path { stroke-dashoffset: 0; }

@media (prefers-reduced-motion: reduce) {
  .fa-flow .fa-step-card { opacity: 1; transform: none; transition: none; }
  .fa-flow .fa-conn-line::after { transform: scaleX(1); transition: none; }
  .fa-flow .fa-conn-dot { display: none; }
  .fa-check-path { stroke-dashoffset: 0; transition: none; }
}
`;

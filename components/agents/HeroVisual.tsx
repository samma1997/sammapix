"use client";

import React from "react";
import { Bot, Gauge, RefreshCw, Image as ImageIcon, Crop, Layers, FileText } from "lucide-react";

const HUB_TOOLS = [
  { icon: Gauge, label: "Compress" },
  { icon: RefreshCw, label: "Convert" },
  { icon: ImageIcon, label: "Resize" },
  { icon: Crop, label: "Crop" },
  { icon: Layers, label: "Pipeline" },
  { icon: FileText, label: "PDF" },
];

/**
 * Hero visual: an AI-agent chat bubble on the left connected by animated wires
 * to a SammaPix "tools hub" on the right. A pulse of light travels the wires
 * from the agent to the hub, and the hub nodes glow as it arrives. Pure CSS.
 */
export default function HeroVisual() {
  return (
    <div className="fa-hero relative mx-auto w-full max-w-3xl">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* soft ambient glow */}
      <div className="fa-hero-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
        {/* Agent card */}
        <div className="fa-node-card fa-float justify-self-end rounded-2xl border border-[#E5E5E5] bg-white p-3 shadow-sm dark:border-[#2A2A2A] dark:bg-[#1E1E1E] sm:p-4">
          <div className="flex items-center gap-2">
            <span className="fa-agent-badge flex h-7 w-7 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
              <Bot className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5]">AI agent</span>
          </div>
          <div className="fa-bubble mt-3 max-w-[180px] rounded-xl rounded-tl-sm bg-[#F5F5F5] px-3 py-2 text-[11px] leading-snug text-[#525252] dark:bg-[#161616] dark:text-[#A3A3A3]">
            &ldquo;Optimize these photos for the web&rdquo;
          </div>
          <div className="fa-typing mt-2 flex items-center gap-1 pl-1">
            <span /><span /><span />
          </div>
        </div>

        {/* Animated wires (center) */}
        <div className="relative h-[150px] w-[64px] sm:w-[120px]" aria-hidden>
          <svg viewBox="0 0 120 150" className="h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="fa-wire" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {[30, 60, 90, 120, 150, 180].map((_, i) => {
              const y = 20 + i * 22;
              const d = `M0,75 C40,75 60,${y} 120,${y}`;
              return (
                <g key={i}>
                  <path d={d} stroke="url(#fa-wire)" strokeWidth="1.5" />
                  <circle r="2.6" fill="#6366F1" className="fa-pulse-dot">
                    <animateMotion
                      dur="2.4s"
                      begin={`${i * 0.28}s`}
                      repeatCount="indefinite"
                      path={d}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.32 0.72 0 1"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tools hub */}
        <div className="fa-node-card fa-float-slow justify-self-start rounded-2xl border border-[#E5E5E5] bg-white p-2.5 shadow-sm dark:border-[#2A2A2A] dark:bg-[#1E1E1E] sm:p-3">
          <div className="mb-2 px-1 text-[10px] font-medium uppercase tracking-wide text-[#A3A3A3]">
            SammaPix tools
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {HUB_TOOLS.map((t, i) => (
              <div
                key={t.label}
                className="fa-hub-tile flex flex-col items-center gap-1 rounded-lg border border-[#E5E5E5] bg-white px-1.5 py-2 dark:border-[#2A2A2A] dark:bg-[#191919]"
                style={{ animationDelay: `${i * 0.28 + 1.9}s` }}
              >
                <t.icon className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} />
                <span className="text-[9px] font-medium text-[#525252] dark:text-[#A3A3A3]">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const css = `
.fa-hero-glow {
  background: radial-gradient(60% 60% at 50% 40%, rgba(99,102,241,0.12), transparent 70%);
  filter: blur(8px);
}
@keyframes fa-float-y { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.fa-float { animation: fa-float-y 6s ease-in-out infinite; }
.fa-float-slow { animation: fa-float-y 7.5s ease-in-out infinite; animation-delay: -2s; }

@keyframes fa-typing-b { 0%,60%,100% { opacity: 0.25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }
.fa-typing span {
  display: inline-block; height: 4px; width: 4px; border-radius: 9999px; background: #6366F1;
  animation: fa-typing-b 1.4s ease-in-out infinite;
}
.fa-typing span:nth-child(2) { animation-delay: 0.18s; }
.fa-typing span:nth-child(3) { animation-delay: 0.36s; }

@keyframes fa-agent-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); } 50% { box-shadow: 0 0 0 6px rgba(99,102,241,0); } }
.fa-agent-badge { animation: fa-agent-pulse 2.6s ease-in-out infinite; }

@keyframes fa-tile-glow {
  0%, 92%, 100% { border-color: var(--fa-tile-border, #E5E5E5); background-color: transparent; }
  46% { border-color: rgba(99,102,241,0.6); background-color: rgba(99,102,241,0.08); }
}
.fa-hub-tile { animation: fa-tile-glow 4.2s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .fa-float, .fa-float-slow, .fa-typing span, .fa-agent-badge, .fa-hub-tile { animation: none !important; }
  .fa-pulse-dot { display: none; }
}
`;

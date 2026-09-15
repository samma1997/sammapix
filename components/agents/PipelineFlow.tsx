"use client";

import React from "react";
import { Image as ImageIcon, Gauge, RefreshCw, Maximize2, CheckCircle2 } from "lucide-react";

const NODES = [
  { icon: ImageIcon, label: "Source", sub: "photo.jpg" },
  { icon: Gauge, label: "Compress", sub: "step 1" },
  { icon: RefreshCw, label: "Convert", sub: "→ webp" },
  { icon: Maximize2, label: "Resize", sub: "1200px" },
  { icon: CheckCircle2, label: "Output", sub: "optimized.webp", done: true },
];

/**
 * Pipeline differentiator diagram: five nodes wired left→right with a packet of
 * light continuously travelling the whole chain; each node flashes as the packet
 * passes. A before/after size chip drives the token-saving message home. Pure CSS
 * + SMIL, no libraries.
 */
export default function PipelineFlow() {
  return (
    <div className="fa-pipe relative">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* size chip */}
      <div className="mb-6 flex items-center justify-center gap-3 text-sm">
        <span className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-1.5 font-mono text-[#737373] line-through dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">
          2.3 MB
        </span>
        <span className="fa-arrow text-[#6366F1]">→</span>
        <span className="fa-out-chip rounded-lg border border-[#6366F1]/30 bg-[#6366F1]/5 px-3 py-1.5 font-mono font-semibold text-[#6366F1]">
          240 KB
        </span>
        <span className="hidden text-xs text-[#A3A3A3] sm:inline">in one call</span>
      </div>

      {/* nodes + wires */}
      <div className="relative grid grid-cols-5 gap-1 sm:gap-2">
        {/* SVG wire layer */}
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-[22px] h-10 w-full overflow-visible"
          aria-hidden
        >
          <line x1="0" y1="20" x2="1000" y2="20" stroke="#E5E5E5" strokeWidth="2" className="fa-wire-base" />
          <line
            x1="0" y1="20" x2="1000" y2="20"
            stroke="#6366F1" strokeWidth="2"
            strokeDasharray="6 10"
            className="fa-wire-flow"
          />
          {/* travelling packet */}
          <circle r="4" fill="#6366F1" className="fa-packet">
            <animateMotion dur="3.4s" repeatCount="indefinite" path="M0,20 L1000,20" calcMode="linear" />
          </circle>
        </svg>

        {NODES.map((n, i) => (
          <div key={n.label} className="relative z-10 flex flex-col items-center">
            <span
              className={`fa-pnode flex h-11 w-11 items-center justify-center rounded-xl border bg-white dark:bg-[#1E1E1E] ${
                n.done
                  ? "border-[#6366F1]/40 text-[#6366F1]"
                  : "border-[#E5E5E5] text-[#737373] dark:border-[#2A2A2A] dark:text-[#A3A3A3]"
              }`}
              style={{ ["--d" as string]: `${(i * 3.4) / NODES.length}s` }}
            >
              <n.icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <p className="mt-2 text-[11px] font-semibold text-[#171717] dark:text-[#E5E5E5]">{n.label}</p>
            <p className="text-[10px] text-[#A3A3A3]">{n.sub}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-[#A3A3A3]">
        One request · one billed op per step · only the final file comes back
      </p>
    </div>
  );
}

const css = `
.fa-wire-base { }
:is(.dark) .fa-wire-base { stroke: #2A2A2A; }
.fa-wire-flow {
  opacity: 0.5;
  animation: fa-dash 1.1s linear infinite;
}
@keyframes fa-dash { to { stroke-dashoffset: -16; } }

/* nodes flash as the packet reaches them, in sync with the 3.4s motion loop */
@keyframes fa-node-flash {
  0%, 12%, 100% {
    box-shadow: 0 0 0 0 rgba(99,102,241,0);
    transform: translateY(0) scale(1);
  }
  6% {
    box-shadow: 0 0 0 5px rgba(99,102,241,0.14);
    transform: translateY(-3px) scale(1.06);
    border-color: rgba(99,102,241,0.6);
  }
}
.fa-pnode {
  animation: fa-node-flash 3.4s linear infinite;
  animation-delay: var(--d, 0s);
  transition: border-color 300ms ease;
}

.fa-arrow { animation: fa-arrow-nudge 1.8s ease-in-out infinite; }
@keyframes fa-arrow-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(3px); } }

.fa-out-chip { animation: fa-chip-glow 3.4s ease-in-out infinite; }
@keyframes fa-chip-glow {
  0%, 70%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
  85% { box-shadow: 0 0 0 4px rgba(99,102,241,0.12); }
}

@media (prefers-reduced-motion: reduce) {
  .fa-wire-flow, .fa-pnode, .fa-arrow, .fa-out-chip { animation: none !important; }
  .fa-packet { display: none; }
}
`;

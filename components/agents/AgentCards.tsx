"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Link2, ShieldCheck, Boxes, Coins,
  Gauge, RefreshCw, Image as ImageIcon, Crop, Layers, FileText,
  type LucideIcon,
} from "lucide-react";

/**
 * Hover-interactive card grids for the for-ai-agents landing. The card DATA
 * (including lucide icon components) lives INSIDE this client boundary — icon
 * components cannot be passed as props from a Server Component in React 19.
 * Spring easing on lift, an indigo border/gradient glow that fades in, a subtle
 * icon nudge, plus IntersectionObserver-based staggered reveal. Pure CSS.
 */

const VALUES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Link2, title: "Chain ops in one call", body: "The pipeline tool runs compress → convert → resize in a single request. Fewer round-trips, far fewer tokens, no intermediate files for the agent to juggle." },
  { icon: ShieldCheck, title: "Zero-retention", body: "Files are processed in memory and discarded instantly. Nothing stored, logged, or used for training — safe for private photos and documents." },
  { icon: Boxes, title: "One toolbox, many ops", body: "Compress, convert, resize, crop, rotate, read metadata and compress PDFs — a single MCP server instead of stitching together many services." },
  { icon: Coins, title: "Pay-per-use, prepaid", body: "1 credit per op (1/step for pipelines), 50 free to start. You never front the compute — usage is prepaid, failed ops are refunded." },
];

const TOOLS: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Gauge, name: "Compress", desc: "Shrink images, keep the format" },
  { icon: RefreshCw, name: "Convert", desc: "webp · avif · jpeg · png" },
  { icon: ImageIcon, name: "Resize", desc: "Exact width/height, safe caps" },
  { icon: Crop, name: "Crop", desc: "Pixels or aspect ratio (16:9…)" },
  { icon: Layers, name: "Pipeline", desc: "Chain steps in one call" },
  { icon: FileText, name: "PDF compress", desc: "Slim PDFs, strip metadata" },
];

/** Reveal-on-scroll wrapper local to the grids (staggered). */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setVisible(true), io.unobserve(e.target))),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return { ref, visible, reduced };
}

function revealStyle(visible: boolean, reduced: boolean, index: number): React.CSSProperties {
  if (reduced) return {};
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition:
      "opacity 720ms cubic-bezier(0.32,0.72,0,1), transform 720ms cubic-bezier(0.32,0.72,0,1)",
    transitionDelay: `${index * 70}ms`,
  };
}

export function ValueGrid() {
  const { ref, visible, reduced } = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <CardStyles />
      {VALUES.map((v, i) => {
        const Icon = v.icon;
        return (
          <div
            key={v.title}
            style={revealStyle(visible, reduced, i)}
            className="fa-card group relative overflow-hidden rounded-xl border border-[#E5E5E5] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1E1E1E]"
          >
            <span className="fa-card-glow pointer-events-none absolute inset-0 opacity-0" aria-hidden />
            <span className="fa-card-icon relative mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </span>
            <h3 className="relative mb-1.5 text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">{v.title}</h3>
            <p className="relative text-sm leading-relaxed text-[#737373] dark:text-[#A3A3A3]">{v.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export function ToolGrid() {
  const { ref, visible, reduced } = useReveal();
  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <CardStyles />
      {TOOLS.map((t, i) => {
        const Icon = t.icon;
        return (
          <div
            key={t.name}
            style={revealStyle(visible, reduced, i)}
            className="fa-card fa-tool group relative overflow-hidden rounded-lg border border-[#E5E5E5] bg-white p-4 dark:border-[#2A2A2A] dark:bg-[#1E1E1E]"
          >
            <span className="fa-card-glow pointer-events-none absolute inset-0 opacity-0" aria-hidden />
            <span className="fa-card-icon relative mb-2 inline-flex h-4 w-4 text-[#6366F1]">
              <Icon className="h-4 w-4" strokeWidth={1.6} />
            </span>
            <p className="relative text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{t.name}</p>
            <p className="relative mt-0.5 text-xs text-[#A3A3A3]">{t.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function CardStyles() {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const css = `
.fa-card {
  transition: transform 420ms cubic-bezier(0.32,0.72,0,1),
              box-shadow 420ms cubic-bezier(0.32,0.72,0,1),
              border-color 420ms cubic-bezier(0.32,0.72,0,1);
  will-change: transform;
}
.fa-card:hover {
  transform: translateY(-4px);
  border-color: rgba(99,102,241,0.4);
  box-shadow: 0 12px 32px -12px rgba(99,102,241,0.28);
}
.fa-card-glow {
  background: radial-gradient(120% 80% at 50% 0%, rgba(99,102,241,0.1), transparent 60%);
  transition: opacity 420ms cubic-bezier(0.32,0.72,0,1);
}
.fa-card:hover .fa-card-glow { opacity: 1; }
.fa-card-icon { transition: transform 420ms cubic-bezier(0.32,0.72,0,1); }
.fa-card:hover .fa-card-icon { transform: translateY(-2px) rotate(-4deg); }
.fa-tool:hover .fa-card-icon { transform: translateY(-2px) scale(1.12); }

@media (prefers-reduced-motion: reduce) {
  .fa-card, .fa-card-icon { transition: none; }
  .fa-card:hover { transform: none; box-shadow: none; }
  .fa-card:hover .fa-card-icon { transform: none; }
}
`;

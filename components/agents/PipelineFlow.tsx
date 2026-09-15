"use client";

import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Gauge, RefreshCw, Maximize2, CheckCircle2, ChevronRight } from "lucide-react";

const NODES = [
  { icon: ImageIcon, label: "Source", sub: "photo.jpg" },
  { icon: Gauge, label: "Compress", sub: "step 1" },
  { icon: RefreshCw, label: "Convert", sub: "to webp" },
  { icon: Maximize2, label: "Resize", sub: "1200px" },
  { icon: CheckCircle2, label: "Output", sub: "optimized.webp", done: true },
];

/**
 * Pipeline differentiator — clean, minimal diagram: five nodes linked by chevrons,
 * with a before/after size chip. No continuous motion: nodes just fade/scale in
 * once when scrolled into view (staggered) and lift on hover. Pure CSS.
 */
export default function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fa-pipe2 ${inView ? "fa-in" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* before / after chip */}
      <div className="mb-8 flex items-center justify-center gap-2.5 text-sm">
        <span className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-1.5 font-mono text-[#737373] line-through dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">2.3 MB</span>
        <ChevronRight className="h-4 w-4 text-[#A3A3A3]" strokeWidth={2} />
        <span className="rounded-lg border border-[#6366F1]/30 bg-[#6366F1]/5 px-3 py-1.5 font-mono font-semibold text-[#6366F1]">240 KB</span>
        <span className="ml-1 hidden text-xs text-[#A3A3A3] sm:inline">in one call</span>
      </div>

      {/* nodes linked by chevrons */}
      <div className="flex items-start justify-center gap-1 overflow-x-auto pb-2 sm:gap-2">
        {NODES.map((n, i) => (
          <React.Fragment key={n.label}>
            <div className="fa-node flex min-w-[64px] flex-col items-center" style={{ ["--i" as string]: i }}>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200 ${
                  n.done
                    ? "border-[#6366F1]/40 bg-[#6366F1]/5 text-[#6366F1]"
                    : "border-[#E5E5E5] bg-white text-[#525252] dark:border-[#2A2A2A] dark:bg-[#1E1E1E] dark:text-[#A3A3A3]"
                }`}
              >
                <n.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="mt-2 text-[11px] font-semibold text-[#171717] dark:text-[#E5E5E5]">{n.label}</p>
              <p className="text-[10px] text-[#A3A3A3]">{n.sub}</p>
            </div>
            {i < NODES.length - 1 && (
              <ChevronRight className="fa-chev mt-3.5 h-4 w-4 flex-shrink-0 text-[#D4D4D4] dark:text-[#404040]" style={{ ["--i" as string]: i }} strokeWidth={2} />
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-[#A3A3A3]">One request · one billed op per step · only the final file comes back</p>
    </div>
  );
}

const css = `
.fa-pipe2 .fa-node,
.fa-pipe2 .fa-chev {
  opacity: 0;
  transform: translateY(8px);
}
.fa-pipe2.fa-in .fa-node,
.fa-pipe2.fa-in .fa-chev {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms cubic-bezier(0.32,0.72,0,1), transform 500ms cubic-bezier(0.32,0.72,0,1);
  transition-delay: calc(var(--i) * 90ms);
}
.fa-pipe2 .fa-node > span { will-change: transform; }
.fa-pipe2 .fa-node:hover > span {
  transform: translateY(-3px);
  border-color: rgba(99,102,241,0.5);
  box-shadow: 0 6px 16px -6px rgba(99,102,241,0.35);
}
@media (prefers-reduced-motion: reduce) {
  .fa-pipe2 .fa-node, .fa-pipe2 .fa-chev { opacity: 1 !important; transform: none !important; transition: none !important; }
}
`;

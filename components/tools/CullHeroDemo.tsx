"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart, X as XIcon, Check, Star, Keyboard, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Cull hero demo — full-screen review mode mock: foto centrale grande,
 * keyboard shortcut prompt (K / X), foto cambia ogni ~1.2s con animazione
 * keep (verde, slide left) o reject (rosso, slide right). Counter live.
 *
 * Brand: #F43F5E (rose)
 */

type Decision = "keep" | "reject";
type Frame = {
  src: string;
  alt: string;
  decision: Decision;
};

const FRAMES: Frame[] = [
  { src: "/demo/cull-italy.webp",    alt: "Tuscan villa golden hour",  decision: "keep" },
  { src: "/demo/cull-japan.webp",    alt: "Torii gate Mt Fuji",         decision: "keep" },
  { src: "/demo/cull-france.webp",   alt: "Eiffel tower night",         decision: "reject" },
  { src: "/demo/cull-thailand.webp", alt: "Phi Phi long-tail boat",     decision: "keep" },
  { src: "/demo/cull-italy.webp",    alt: "Tuscany alt take",           decision: "reject" },
  { src: "/demo/cull-japan.webp",    alt: "Torii alt take",             decision: "keep" },
  { src: "/demo/cull-thailand.webp", alt: "Krabi cliffs",               decision: "keep" },
  { src: "/demo/cull-france.webp",   alt: "Paris bokeh wider",          decision: "reject" },
];

const REVIEW_MS = 950;
const DECIDE_FLASH_MS = 350;
const PAUSE_MS = 1800;

type Phase = "review" | "deciding" | "done";

export default function CullHeroDemo() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("review");
  const [decisions, setDecisions] = useState<Record<number, Decision>>({});
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "review") {
      timeoutId = setTimeout(() => {
        if (!cancelled) setPhase("deciding");
      }, REVIEW_MS);
    } else if (phase === "deciding") {
      // Flash decision then advance
      const dec = FRAMES[idx].decision;
      setDecisions((prev) => ({ ...prev, [idx]: dec }));
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        if (idx + 1 >= FRAMES.length) {
          setPhase("done");
        } else {
          setIdx((i) => i + 1);
          setPhase("review");
        }
      }, DECIDE_FLASH_MS);
    } else {
      // done → pausa, poi reset
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setIdx(0);
          setDecisions({});
          setPhase("review");
        }
      }, PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, idx, hasInteracted]);

  const current = FRAMES[idx];
  const kept = Object.values(decisions).filter((d) => d === "keep").length;
  const rejected = Object.values(decisions).filter((d) => d === "reject").length;
  const isDone = phase === "done";
  const flashing = phase === "deciding" ? current.decision : null;

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#0A0A0A]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-white/60 ml-1 truncate">
            Cull · Review {Math.min(idx + 1, FRAMES.length)} / {FRAMES.length}
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-white/90 bg-white/10">
            <Keyboard className="h-2.5 w-2.5" strokeWidth={2.5} />
            K / X
          </div>
        </div>

        {/* Photo full-bleed */}
        <div className="relative h-[calc(100%-28px)]">
          <Image
            key={`${idx}-${phase}`}
            src={current.src}
            alt={current.alt}
            fill
            sizes="380px"
            className={cn(
              "object-cover transition-all duration-300",
              flashing === "keep" && "scale-95",
              flashing === "reject" && "scale-95 opacity-30"
            )}
          />

          {/* Decision flash overlay */}
          {flashing && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center pointer-events-none",
                flashing === "keep" ? "bg-[#22C55E]/30" : "bg-[#EF4444]/30"
              )}
              style={{ animation: "cull-flash 0.35s ease-out" }}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl",
                  flashing === "keep" ? "bg-[#22C55E]" : "bg-[#EF4444]"
                )}
                style={{ animation: "cull-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {flashing === "keep" ? (
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                ) : (
                  <XIcon className="h-8 w-8 text-white" strokeWidth={3} />
                )}
              </div>
            </div>
          )}

          {/* Done overlay */}
          {isDone && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#22C55E] flex items-center justify-center">
                <Download className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-white">Ready to download</span>
              <span className="text-[10px] text-white/70">{kept} best photos · ZIP</span>
            </div>
          )}

          {/* Keyboard hint bottom */}
          {!isDone && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-2 py-1 rounded backdrop-blur-md bg-black/60 border border-white/10">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white">
                <kbd className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", flashing === "keep" ? "bg-[#22C55E] text-white" : "bg-white/15 text-white")}>K</kbd>
                Keep
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white">
                <kbd className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", flashing === "reject" ? "bg-[#EF4444] text-white" : "bg-white/15 text-white")}>X</kbd>
                Reject
              </span>
            </div>
          )}

          {/* Stats top right */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded backdrop-blur-md bg-black/60 border border-[#22C55E]/40">
              <Heart className="h-2.5 w-2.5 text-[#22C55E] fill-[#22C55E]" strokeWidth={2.5} />
              <span className="text-[10px] font-bold text-white tabular-nums">{kept}</span>
            </div>
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded backdrop-blur-md bg-black/60 border border-[#EF4444]/40">
              <XIcon className="h-2.5 w-2.5 text-[#EF4444]" strokeWidth={2.5} />
              <span className="text-[10px] font-bold text-white tabular-nums">{rejected}</span>
            </div>
          </div>

          {/* Progress bar bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#F43F5E] to-[#FB7185] transition-all duration-300"
              style={{ width: `${((idx + (phase === "deciding" || isDone ? 1 : 0)) / FRAMES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Star className="h-2.5 w-2.5 text-[#F43F5E]" strokeWidth={2} fill="#F43F5E" />
        <span>10× faster than mouse · Lightroom-style keyboard shortcuts</span>
      </div>

      <style jsx>{`
        @keyframes cull-pop {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes cull-flash {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

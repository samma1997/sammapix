"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Layers, Sparkles, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WebpToPng hero demo — 2 card side-by-side (WebP → PNG) entrambi con
 * checkerboard pattern background per dimostrare la transparency
 * preservata. Lossless badge + bottone download.
 *
 * Brand color #8B5CF6 violet
 */

const STEP_MS = 700;
const PAUSE_MS = 2400;

type Phase = "idle" | "converting" | "done";

/** Logo SVG con shape che mostra transparency (alpha holes) */
function LogoSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="wpng-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="38" fill="url(#wpng-grad)" />
      {/* Hole — shows transparency */}
      <circle cx="50" cy="50" r="14" fill="white" fillOpacity="0" stroke="white" strokeWidth="5" />
      <path
        d="M 30 50 Q 30 30 50 30 Q 70 30 70 50"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Checkerboard({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(45deg, #E5E7EB 25%, transparent 25%), linear-gradient(-45deg, #E5E7EB 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E5E7EB 75%), linear-gradient(-45deg, transparent 75%, #E5E7EB 75%)",
        backgroundSize: "10px 10px",
        backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
      }}
    />
  );
}

export default function WebpToPngHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      timeoutId = setTimeout(() => !cancelled && setPhase("converting"), 600);
    } else if (phase === "converting") {
      timeoutId = setTimeout(() => !cancelled && setPhase("done"), STEP_MS);
    } else {
      timeoutId = setTimeout(() => !cancelled && setPhase("idle"), PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, hasInteracted]);

  const isDone = phase === "done";
  const isConverting = phase === "converting";

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">logo.webp → .png</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#5B21B6] bg-[#8B5CF6]/12 dark:text-[#C4B5FD]">
            <ShieldCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
            Lossless
          </div>
        </div>

        {/* Body: 2 image cards */}
        <div className="px-2.5 py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 h-[calc(100%-28px)]">
          {/* WebP source */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-full aspect-square rounded-md border-2 border-[#10B981]/40 overflow-hidden">
              <Checkerboard />
              <div className="absolute inset-0 flex items-center justify-center">
                <LogoSvg className="w-16 h-16" />
              </div>
              <div className="absolute top-1 left-1 z-10">
                <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-[#10B981]/90 text-white shadow-sm">WEBP</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[9px] font-semibold text-[#171717] dark:text-[#E5E5E5]">logo.webp</div>
              <div className="text-[8px] text-[#737373]">source · with alpha</div>
            </div>
          </div>

          {/* Arrow + status */}
          <div className="flex flex-col items-center gap-0.5">
            {phase === "idle" && <Layers className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={2} />}
            {isConverting && <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" strokeWidth={2} style={{ animation: "wpng-spin 1s linear infinite" }} />}
            {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />}
            <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
            <span className="text-[8px] font-bold text-[#8B5CF6] uppercase tracking-wide writing-mode-vertical">
              {isDone ? "OK" : "..."}
            </span>
          </div>

          {/* PNG output */}
          <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
              "relative w-full aspect-square rounded-md border-2 overflow-hidden transition-all duration-300",
              isDone ? "border-[#8B5CF6] shadow-md" : "border-[#E5E5E5] dark:border-[#2A2A2A]"
            )}>
              <Checkerboard />
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500",
                phase === "idle" && "opacity-0",
                isConverting && "opacity-50 scale-90",
                isDone && "opacity-100 scale-100"
              )}>
                <LogoSvg className="w-16 h-16" />
              </div>
              <div className="absolute top-1 left-1 z-10">
                <span className={cn(
                  "text-[8px] font-bold px-1 py-0.5 rounded shadow-sm transition-colors",
                  isDone ? "bg-[#8B5CF6]/90 text-white" : "bg-[#A3A3A3]/60 text-white"
                )}>PNG</span>
              </div>
              {/* alpha preserved badge */}
              {isDone && (
                <div className="absolute bottom-1 right-1 z-10" style={{ animation: "wpng-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                  <span className="inline-flex items-center gap-0.5 text-[7px] font-bold text-[#16A34A] bg-white/90 px-1 py-0.5 rounded shadow-sm">
                    <CheckCircle2 className="h-2 w-2" strokeWidth={2.5} />
                    α preserved
                  </span>
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-[9px] font-semibold text-[#171717] dark:text-[#E5E5E5]">logo.png</div>
              <div className="text-[8px] text-[#737373]">{isDone ? "lossless · ready" : "output"}</div>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1.5">
          {isDone && (
            <button className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] px-1.5 py-0.5 rounded shadow-sm">
              <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
              .png
            </button>
          )}
          <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A]">
            {isDone ? (
              <>
                <ShieldCheck className="h-2.5 w-2.5 text-[#16A34A]" strokeWidth={2.5} />
                <span className="text-[#16A34A]">Lossless</span>
              </>
            ) : (
              <>
                <Sparkles className="h-2.5 w-2.5 text-[#8B5CF6]" strokeWidth={2} />
                <span className="text-[#737373]">Converting…</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Layers className="h-2.5 w-2.5 text-[#8B5CF6]" strokeWidth={2} />
        <span>Transparency preserved · Lossless · Batch up to 20</span>
      </div>

      <style jsx>{`
        @keyframes wpng-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wpng-pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

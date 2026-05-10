"use client";

import { useState, useEffect } from "react";
import { ArrowRight, FileImage, Sparkles, CheckCircle2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * JXL hero demo — mock conversion: file format card sx + freccia + JXL card dx
 * con file size bar che si comprime + badge "-XX% smaller". 3 esempi cycling
 * (JPG → JXL, PNG → JXL, WebP → JXL). Brand color amber #F59E0B.
 */

type Conversion = {
  fromFormat: "JPG" | "PNG" | "WEBP";
  fromSize: number;  // KB
  toSize: number;    // KB
  filename: string;
  /** Color tint of the source format pill */
  fromTint: string;
};

const CONVERSIONS: Conversion[] = [
  { fromFormat: "JPG",  fromSize: 2456, toSize: 980,  filename: "vacation-tuscany",   fromTint: "#FB923C" },
  { fromFormat: "PNG",  fromSize: 4128, toSize: 1156, filename: "product-shot",       fromTint: "#3B82F6" },
  { fromFormat: "WEBP", fromSize: 1542, toSize: 612,  filename: "hero-banner",        fromTint: "#10B981" },
];

const ANALYZE_MS = 600;
const COMPRESS_MS = 1100;
const DONE_PAUSE_MS = 2000;

type Phase = "analyzing" | "compressing" | "done";

function formatKB(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`;
}

export default function JxlHeroDemo() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("analyzing");
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "analyzing") {
      timeoutId = setTimeout(() => {
        if (!cancelled) setPhase("compressing");
      }, ANALYZE_MS);
    } else if (phase === "compressing") {
      // Animate progress 0 → 100 over COMPRESS_MS
      const start = Date.now();
      const tick = () => {
        if (cancelled) return;
        const elapsed = Date.now() - start;
        const p = Math.min(elapsed / COMPRESS_MS, 1);
        setProgress(p);
        if (p < 1) {
          timeoutId = setTimeout(tick, 16);
        } else {
          setPhase("done");
        }
      };
      tick();
    } else {
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setIdx((i) => (i + 1) % CONVERSIONS.length);
          setProgress(0);
          setPhase("analyzing");
        }
      }, DONE_PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, idx, hasInteracted]);

  const current = CONVERSIONS[idx];
  const compressedSize = current.fromSize - (current.fromSize - current.toSize) * progress;
  const savedPct = Math.round(((current.fromSize - compressedSize) / current.fromSize) * 100);
  const finalPct = Math.round(((current.fromSize - current.toSize) / current.fromSize) * 100);
  const isDone = phase === "done";

  const switchTo = (i: number) => {
    setHasInteracted(true);
    setIdx(i);
    setProgress(1);
    setPhase("done");
  };

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
          <span className="text-[10px] font-medium text-[#737373] ml-1 truncate">
            {current.filename}.{current.fromFormat.toLowerCase()}
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#92400E] bg-[#FEF3C7] dark:bg-[#78350F]/40 dark:text-[#FCD34D]">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
            JPEG XL
          </div>
        </div>

        {/* Body: 2 cards + arrow + progress */}
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] gap-2 justify-center">
          {/* Top: format cards before/after */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Source card */}
            <div
              className="relative px-2.5 py-2 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
              style={{ borderColor: phase === "analyzing" ? current.fromTint : undefined }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className="text-[9px] font-bold px-1 py-0.5 rounded"
                  style={{ backgroundColor: current.fromTint + "22", color: current.fromTint }}
                >
                  {current.fromFormat}
                </span>
                <span className="text-[9px] text-[#737373]">source</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {current.filename}.{current.fromFormat.toLowerCase()}
              </div>
              <div className="text-[10px] text-[#737373] tabular-nums mt-0.5">
                {formatKB(current.fromSize)}
              </div>
            </div>

            {/* Arrow + status */}
            <div className="flex flex-col items-center gap-0.5">
              {phase === "analyzing" && (
                <Cpu className="h-3.5 w-3.5 text-[#F59E0B] animate-pulse" strokeWidth={2} />
              )}
              {phase === "compressing" && (
                <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" strokeWidth={2} style={{ animation: "jxl-spin 1.2s linear infinite" }} />
              )}
              {phase === "done" && (
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />
              )}
              <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
            </div>

            {/* Destination card */}
            <div
              className={cn(
                "relative px-2.5 py-2 rounded border transition-all duration-300",
                isDone
                  ? "border-[#F59E0B] bg-[#FFFBEB] dark:bg-[#78350F]/15 shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
              )}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#F59E0B]/15 text-[#92400E] dark:text-[#FCD34D]">
                  JXL
                </span>
                <span className="text-[9px] text-[#737373]">output</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {current.filename}.jxl
              </div>
              <div className="text-[10px] text-[#737373] tabular-nums mt-0.5 flex items-center gap-1">
                <span>{phase === "analyzing" ? "—" : formatKB(Math.round(compressedSize))}</span>
                {phase !== "analyzing" && savedPct > 0 && (
                  <span className="inline-flex items-center text-[8.5px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-1 rounded">
                    -{phase === "done" ? finalPct : savedPct}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Compression bar comparison */}
          <div className="space-y-1.5 px-1">
            {/* Source bar */}
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-[#737373] w-10 tabular-nums">{current.fromFormat}</span>
              <div className="flex-1 h-2.5 rounded bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
                <div
                  className="h-full rounded"
                  style={{
                    width: "100%",
                    background: `linear-gradient(90deg, ${current.fromTint}, ${current.fromTint}dd)`,
                  }}
                />
              </div>
              <span className="text-[8.5px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums w-12 text-right">
                {formatKB(current.fromSize)}
              </span>
            </div>
            {/* Destination bar (animated) */}
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-[#92400E] dark:text-[#FCD34D] w-10 tabular-nums">JXL</span>
              <div className="flex-1 h-2.5 rounded bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-100"
                  style={{
                    width: phase === "analyzing" ? "100%" : `${(compressedSize / current.fromSize) * 100}%`,
                    background: phase === "analyzing"
                      ? `linear-gradient(90deg, ${current.fromTint}55, ${current.fromTint}33)`
                      : "linear-gradient(90deg, #F59E0B, #FBBF24)",
                  }}
                />
              </div>
              <span className="text-[8.5px] font-bold text-[#92400E] dark:text-[#FCD34D] tabular-nums w-12 text-right">
                {phase === "analyzing" ? "…" : formatKB(Math.round(compressedSize))}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 mt-1 pt-1.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span className="inline-flex items-center gap-1 text-[8.5px] text-[#737373]">
              <FileImage className="h-2.5 w-2.5" strokeWidth={2} />
              WASM-powered
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#92400E] dark:text-[#FCD34D]">
              <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
              {phase === "done" ? `Saved ${formatKB(current.fromSize - current.toSize)}` : "Compressing…"}
            </span>
          </div>
        </div>
      </div>

      {/* Format chips */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {CONVERSIONS.map((c, i) => {
          const active = i === idx;
          return (
            <button
              key={i}
              type="button"
              onClick={() => switchTo(i)}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#F59E0B] bg-[#F59E0B]/[0.08] text-[#92400E] dark:text-[#FCD34D]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              {c.fromFormat} → JXL
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes jxl-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ArrowRight, FileImage, Sparkles, CheckCircle2, Cpu, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PngToJpg hero demo — pattern compression: 2 card before/after + bar
 * comparison animata + badge "-XX% smaller". 3 esempi cycling. Vende il
 * value-prop principale: PNG → JPG riduce file size 70-90%.
 *
 * Brand color #6366F1 indigo
 */

type Conversion = {
  fromSize: number;
  toSize: number;
  filename: string;
};

const CONVERSIONS: Conversion[] = [
  { fromSize: 4234, toSize: 412,  filename: "screenshot-large" },
  { fromSize: 2148, toSize: 287,  filename: "logo-export" },
  { fromSize: 8704, toSize: 1126, filename: "product-shot-hero" },
];

const ANALYZE_MS = 500;
const COMPRESS_MS = 1000;
const DONE_PAUSE_MS = 1900;

type Phase = "analyzing" | "compressing" | "done";

function formatKB(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`;
}

export default function PngToJpgHeroDemo() {
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
      const start = Date.now();
      const tick = () => {
        if (cancelled) return;
        const p = Math.min((Date.now() - start) / COMPRESS_MS, 1);
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
  const finalPct = Math.round(((current.fromSize - current.toSize) / current.fromSize) * 100);
  const liveSavedPct = Math.round(((current.fromSize - compressedSize) / current.fromSize) * 100);
  const isDone = phase === "done";

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
            {current.filename}.png
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/12 dark:text-[#A5B4FC]">
            <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.5} />
            -{finalPct}%
          </div>
        </div>

        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] gap-2 justify-center">
          {/* Cards */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Source PNG */}
            <div className="relative px-2.5 py-2 rounded border border-[#3B82F6]/40 bg-[#3B82F6]/[0.04]">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#3B82F6]/15 text-[#1E40AF] dark:text-[#93C5FD]">PNG</span>
                <span className="text-[9px] text-[#737373]">source</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {current.filename}.png
              </div>
              <div className="text-[10px] text-[#737373] tabular-nums mt-0.5">
                {formatKB(current.fromSize)}
              </div>
            </div>

            {/* Arrow + status */}
            <div className="flex flex-col items-center gap-0.5">
              {phase === "analyzing" && <Cpu className="h-3.5 w-3.5 text-[#6366F1] animate-pulse" strokeWidth={2} />}
              {phase === "compressing" && <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} style={{ animation: "ptj-spin 1.2s linear infinite" }} />}
              {phase === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />}
              <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
            </div>

            {/* Destination JPG */}
            <div className={cn("relative px-2.5 py-2 rounded border transition-all duration-300", isDone ? "border-[#F97316] bg-[#FFF7ED] dark:bg-[#7C2D12]/15 shadow-sm" : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]")}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#F97316]/15 text-[#9A3412] dark:text-[#FB923C]">JPG</span>
                <span className="text-[9px] text-[#737373]">output</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {current.filename}.jpg
              </div>
              <div className="text-[10px] text-[#737373] tabular-nums mt-0.5 flex items-center gap-1">
                <span>{phase === "analyzing" ? "—" : formatKB(Math.round(compressedSize))}</span>
                {phase !== "analyzing" && (
                  <span className="inline-flex items-center text-[8.5px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-1 rounded">
                    -{phase === "done" ? finalPct : liveSavedPct}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Compression bars */}
          <div className="space-y-1.5 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-[#737373] w-10 tabular-nums">PNG</span>
              <div className="flex-1 h-2.5 rounded bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
                <div className="h-full rounded" style={{ width: "100%", background: "linear-gradient(90deg, #3B82F6, #60A5FA)" }} />
              </div>
              <span className="text-[8.5px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums w-12 text-right">
                {formatKB(current.fromSize)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-[#9A3412] dark:text-[#FB923C] w-10 tabular-nums">JPG</span>
              <div className="flex-1 h-2.5 rounded bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-100"
                  style={{
                    width: phase === "analyzing" ? "100%" : `${(compressedSize / current.fromSize) * 100}%`,
                    background: phase === "analyzing"
                      ? "linear-gradient(90deg, #3B82F633, #60A5FA22)"
                      : "linear-gradient(90deg, #F97316, #FB923C)",
                  }}
                />
              </div>
              <span className="text-[8.5px] font-bold text-[#9A3412] dark:text-[#FB923C] tabular-nums w-12 text-right">
                {phase === "analyzing" ? "…" : formatKB(Math.round(compressedSize))}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 mt-1 pt-1.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span className="inline-flex items-center gap-1 text-[8.5px] text-[#737373]">
              <FileImage className="h-2.5 w-2.5" strokeWidth={2} />
              Browser-only
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#4338CA] dark:text-[#A5B4FC]">
              <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.5} />
              {phase === "done" ? `Saved ${formatKB(current.fromSize - current.toSize)}` : "Compressing…"}
            </span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Sparkles className="h-2.5 w-2.5 text-[#6366F1]" strokeWidth={2} />
        <span>Quality 1-100 · Batch · No daily limits · 100% private</span>
      </div>

      <style jsx>{`
        @keyframes ptj-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

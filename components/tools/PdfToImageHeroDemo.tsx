"use client";

import { useState, useEffect } from "react";
import { FileText, FileImage, Download, Sparkles, CheckCircle2, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PdfToImage hero demo — 1 PDF "report.pdf" (8 pagine) viene splittato
 * in 8 thumbnail JPG che appaiono in sequenza dall'alto verso il basso.
 * Counter live "X/8 pages exported".
 *
 * Brand color #6366F1 indigo
 */

const TOTAL_PAGES = 8;
const STEP_MS = 300;
const PAUSE_MS = 2200;

// Page preview mock — color gradients to simulate page contents
const PAGE_COLORS = [
  { from: "#F3F4F6", to: "#E5E7EB" }, // grey - cover
  { from: "#E0E7FF", to: "#C7D2FE" }, // light indigo - TOC
  { from: "#FFF7ED", to: "#FED7AA" }, // orange - chart
  { from: "#F0FDF4", to: "#BBF7D0" }, // green - data
  { from: "#FEF2F2", to: "#FECACA" }, // red - alert
  { from: "#EFF6FF", to: "#BFDBFE" }, // blue - graph
  { from: "#FAF5FF", to: "#E9D5FF" }, // purple - table
  { from: "#F9FAFB", to: "#D1D5DB" }, // grey - end
];

export default function PdfToImageHeroDemo() {
  const [step, setStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > TOTAL_PAGES) {
          timeoutId = setTimeout(() => !cancelled && setStep(0), PAUSE_MS);
          return s;
        }
        timeoutId = setTimeout(tick, STEP_MS);
        return s + 1;
      });
    };
    timeoutId = setTimeout(tick, STEP_MS * 2);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [hasInteracted, step]);

  const isDone = step > TOTAL_PAGES;
  const exported = Math.min(step, TOTAL_PAGES);

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
            report-2026.pdf
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/12 dark:text-[#A5B4FC]">
            <FileImage className="h-2.5 w-2.5" strokeWidth={2.5} />
            JPG
          </div>
        </div>

        <div className="px-2.5 py-2 grid grid-rows-[auto_auto_1fr] gap-2 h-[calc(100%-28px)]">
          {/* Source PDF */}
          <div className="flex items-center gap-2 px-2 py-1.5 rounded border border-[#DC2626]/30 bg-[#FEF2F2]/60 dark:bg-[#7F1D1D]/15">
            <div className="relative w-7 h-9 flex-shrink-0 rounded-sm bg-[#DC2626] flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                report-2026.pdf
              </div>
              <div className="text-[9px] text-[#737373] tabular-nums">
                {TOTAL_PAGES} pages · 1.4 MB
              </div>
            </div>
            <div className="flex flex-col items-center text-[8px] text-[#6366F1] font-bold gap-0.5">
              <ArrowDown className={cn("h-3 w-3", !isDone && "animate-bounce")} strokeWidth={2.5} />
              <span>Split</span>
            </div>
          </div>

          {/* Status banner */}
          <div className={cn("rounded px-2 py-1 text-[9px] flex items-center gap-1.5 transition-colors duration-200", isDone ? "bg-[#22C55E]/10 border border-[#22C55E]/30" : "bg-[#6366F1]/8 border border-[#6366F1]/30")}>
            {isDone ? (
              <>
                <CheckCircle2 className="h-2.5 w-2.5 text-[#22C55E] flex-shrink-0" strokeWidth={2.5} />
                <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">All {TOTAL_PAGES} pages exported · 300 DPI</span>
                <button className="ml-auto inline-flex items-center gap-0.5 text-[9px] font-bold text-white bg-[#6366F1] hover:bg-[#4F46E5] px-1.5 py-0.5 rounded">
                  <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
                  ZIP
                </button>
              </>
            ) : (
              <>
                <Sparkles className="h-2.5 w-2.5 text-[#6366F1] flex-shrink-0" strokeWidth={2.5} style={{ animation: "p2i-spin 1s linear infinite" }} />
                <span className="font-mono text-[#171717] dark:text-[#E5E5E5]">
                  Rendering page {Math.min(step, TOTAL_PAGES)}/{TOTAL_PAGES}…
                </span>
                <span className="ml-auto text-[9px] font-bold text-[#6366F1] tabular-nums">300 DPI</span>
              </>
            )}
          </div>

          {/* Page thumbnails grid 4x2 */}
          <div className="grid grid-cols-4 gap-1.5 content-start">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
              const ready = i < step;
              const fresh = i === step - 1 && step <= TOTAL_PAGES;
              const color = PAGE_COLORS[i];
              return (
                <div
                  key={i}
                  className={cn(
                    "relative rounded border transition-all duration-300 overflow-hidden",
                    ready
                      ? fresh
                        ? "border-[#6366F1] ring-1 ring-[#6366F1]/40"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A]"
                      : "border-dashed border-[#E5E5E5] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                  )}
                  style={{
                    aspectRatio: "0.77",
                    animation: fresh ? "p2i-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
                  }}
                >
                  {ready && (
                    <div
                      className="absolute inset-0 flex flex-col"
                      style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
                    >
                      {/* fake content lines */}
                      <div className="px-1.5 pt-1.5 space-y-0.5">
                        <div className="h-0.5 bg-[#171717]/30 rounded w-3/4" />
                        <div className="h-0.5 bg-[#171717]/20 rounded w-1/2" />
                      </div>
                      <div className="flex-1 flex items-end p-1">
                        <span className="text-[7px] font-bold text-[#171717]/40 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom counter */}
        <div className="absolute bottom-1.5 right-1.5 z-10 inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A]">
          {isDone && <CheckCircle2 className="h-3 w-3 text-[#22C55E]" strokeWidth={2.5} />}
          <span className="text-[10px] font-semibold tabular-nums text-[#171717] dark:text-[#E5E5E5]">
            {exported}/{TOTAL_PAGES}
          </span>
          <span className="text-[8px] text-[#737373] uppercase tracking-wide">pages</span>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileImage className="h-2.5 w-2.5 text-[#6366F1]" strokeWidth={2} />
        <span>JPG · PNG · WebP · 72-600 DPI · ZIP download</span>
      </div>

      <style jsx>{`
        @keyframes p2i-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes p2i-pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

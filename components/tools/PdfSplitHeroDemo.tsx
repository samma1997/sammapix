"use client";

import { useState, useEffect } from "react";
import { FileText, Scissors, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PdfSplit hero demo, a mac-window mockup showing a source PDF splitting
 * into multiple output chunks. Accent color #EF4444 (red). Dark mode ready.
 *
 * Phases:
 *   "idle"    , source card visible, Scissors button pulses
 *   "splitting", brief flash to show work happening
 *   "done"    , three output cards appear with a pop animation
 *
 * Cycle: idle (1400ms) -> splitting (700ms) -> done (2400ms) -> idle
 */

type Phase = "idle" | "splitting" | "done";

const SOURCE = { filename: "report.pdf", pages: 12, sizeMB: 2.4 };

const OUTPUT_CARDS = [
  { name: "report-pages-1-4.pdf",  pages: 4 },
  { name: "report-pages-5-8.pdf",  pages: 4 },
  { name: "report-pages-9-12.pdf", pages: 4 },
];

const IDLE_MS = 1400;
const SPLIT_MS = 700;
const DONE_MS = 2400;

export default function PdfSplitHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    let cancelled = false;
    let id: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      id = setTimeout(() => !cancelled && setPhase("splitting"), IDLE_MS);
    } else if (phase === "splitting") {
      id = setTimeout(() => !cancelled && setPhase("done"), SPLIT_MS);
    } else {
      id = setTimeout(() => !cancelled && setPhase("idle"), DONE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [phase]);

  const isDone = phase === "done";
  const isSplitting = phase === "splitting";

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">
            Split PDF · {SOURCE.filename}
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#991B1B] bg-[#EF4444]/12 dark:text-[#FCA5A5]">
            <FileText className="h-2.5 w-2.5" strokeWidth={2.5} />
            PDF
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 flex flex-col h-[calc(100%-28px)] gap-2">
          {!isDone ? (
            <>
              {/* Source file card */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-3 rounded-lg border-2 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 transition-all",
                    isSplitting
                      ? "border-[#EF4444]/60 scale-95 opacity-70"
                      : "border-[#EF4444]/40"
                  )}
                >
                  <div className="w-8 h-10 rounded-sm bg-[#EF4444] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="h-4 w-4 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-bold text-[#171717] dark:text-[#E5E5E5]">
                      {SOURCE.filename}
                    </div>
                    <div className="text-[10px] text-[#737373] tabular-nums">
                      <span className="font-semibold text-[#EF4444]">{SOURCE.pages}</span> pages &middot;{" "}
                      <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{SOURCE.sizeMB} MB</span>
                    </div>
                  </div>
                  {isSplitting && (
                    <div
                      className="w-3 h-3 rounded-full border-2 border-[#EF4444] border-t-transparent flex-shrink-0"
                      style={{ animation: "pdfsplit-spin 0.6s linear infinite" }}
                    />
                  )}
                </div>
              </div>

              {/* Split button */}
              <button
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold text-white transition-all",
                  isSplitting ? "bg-[#EF4444] scale-95" : "bg-[#EF4444] hover:bg-[#DC2626]"
                )}
                style={{
                  animation: phase === "idle" ? "pdfsplit-pulse 1.4s ease-in-out infinite" : "none",
                }}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Scissors className="h-3 w-3" strokeWidth={2.5} />
                {isSplitting ? "Splitting..." : "Split every 4 pages"}
              </button>
            </>
          ) : (
            /* Done: output cards appear */
            <div className="flex-1 flex flex-col justify-center gap-1.5">
              {OUTPUT_CARDS.map((card, i) => (
                <div
                  key={card.name}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                  style={{
                    animation: `pdfsplit-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <div className="w-5 h-6 rounded-sm bg-[#EF4444]/12 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-3 w-3 text-[#EF4444]" strokeWidth={2} />
                  </div>
                  <span className="text-[10.5px] font-medium text-[#171717] dark:text-[#E5E5E5] flex-1 truncate">
                    {card.name}
                  </span>
                  <span className="text-[9px] text-[#737373] tabular-nums font-mono flex-shrink-0">
                    {card.pages}p
                  </span>
                  <button
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] flex-shrink-0"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Download className="h-2 w-2" strokeWidth={2.5} />
                    PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Scissors className="h-2.5 w-2.5 text-[#EF4444]" strokeWidth={2} />
        <span>Split in your browser · no upload · extract or split every N pages</span>
      </div>

      <style jsx>{`
        @keyframes pdfsplit-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes pdfsplit-pop {
          0% { transform: scale(0.75); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pdfsplit-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

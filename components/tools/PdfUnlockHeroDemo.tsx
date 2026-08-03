"use client";

import { useState, useEffect } from "react";
import { FileText, Unlock, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PdfUnlock hero demo — Mac-style mockup showing a locked PDF that gets
 * its restrictions removed client-side.
 *
 * Phases:
 *   "idle"       — locked PDF card visible, padlock closed, "Remove Restrictions" button pulses
 *   "processing" — spinner animates for a moment
 *   "done"       — unlocked PDF card with open padlock badge pops in
 *
 * Cycle: idle (1600ms) → processing (800ms) → done (2400ms) → idle
 */

type Phase = "idle" | "processing" | "done";

const SOURCE = { filename: "contract.pdf", pages: 12, sizeMB: 1.4 };
const OUTPUT = { filename: "contract-unlocked.pdf" };

const IDLE_MS = 1600;
const PROCESSING_MS = 800;
const DONE_MS = 2400;

export default function PdfUnlockHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [spinAngle, setSpinAngle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let id: ReturnType<typeof setTimeout>;
    let raf: number;

    if (phase === "idle") {
      id = setTimeout(() => !cancelled && setPhase("processing"), IDLE_MS);
    } else if (phase === "processing") {
      // Animate spinner via requestAnimationFrame for a smooth look
      const startMs = performance.now();
      const animate = (now: number) => {
        if (cancelled) return;
        const elapsed = now - startMs;
        setSpinAngle((elapsed / 1000) * 360);
        if (elapsed < PROCESSING_MS) {
          raf = requestAnimationFrame(animate);
        } else {
          if (!cancelled) setPhase("done");
        }
      };
      raf = requestAnimationFrame(animate);
    } else {
      id = setTimeout(() => {
        if (!cancelled) {
          setSpinAngle(0);
          setPhase("idle");
        }
      }, DONE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  const isDone = phase === "done";
  const isProcessing = phase === "processing";

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
            Unlock PDF &middot; {SOURCE.filename}
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
              {/* Locked PDF card */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-3 rounded-lg border-2 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 transition-all duration-500",
                    isProcessing
                      ? "border-[#EF4444]/60 scale-95 opacity-70"
                      : "border-[#EF4444]/40"
                  )}
                >
                  <div className="relative w-8 h-10 rounded-sm bg-[#EF4444] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="h-4 w-4 text-white" strokeWidth={2} />
                    {/* Lock badge overlay */}
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FEBC2E] border border-white dark:border-[#171717] flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                        <rect x="1.5" y="5" width="7" height="6" rx="1" fill="#1A1A1A"/>
                        <path d="M3 5V3.5C3 2.1 7 2.1 7 3.5V5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-[#171717] dark:text-[#E5E5E5] truncate">
                      {SOURCE.filename}
                    </div>
                    <div className="text-[10px] text-[#737373] tabular-nums">
                      <span className="font-semibold text-[#EF4444]">{SOURCE.pages}</span> pages &middot;{" "}
                      <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{SOURCE.sizeMB} MB</span>
                    </div>
                    <div className="mt-0.5 inline-flex items-center gap-0.5 text-[9px] font-bold text-[#D97706] bg-[#FEF3C7] dark:bg-[#1C1700] px-1 py-0.5 rounded">
                      <svg width="7" height="7" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                        <rect x="1.5" y="5" width="7" height="6" rx="1" fill="currentColor"/>
                        <path d="M3 5V3.5C3 2.1 7 2.1 7 3.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                      Printing, copying locked
                    </div>
                  </div>
                </div>
              </div>

              {/* Spinner during processing */}
              {isProcessing && (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    style={{ transform: `rotate(${spinAngle}deg)` }}
                  >
                    <circle cx="7" cy="7" r="6" stroke="#EF4444" strokeWidth="2" strokeOpacity="0.2"/>
                    <path d="M7 1C7 1 10 1 12.2 3.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] text-[#737373]">Removing restrictions&hellip;</span>
                </div>
              )}

              {/* CTA button */}
              {!isProcessing && (
                <button
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all"
                  style={{
                    animation: phase === "idle" ? "pdfunlock-pulse 1.4s ease-in-out infinite" : "none",
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Unlock className="h-3 w-3" strokeWidth={2.5} />
                  Remove Restrictions
                </button>
              )}
            </>
          ) : (
            /* Done: show unlocked PDF with open padlock badge */
            <div className="flex-1 flex flex-col justify-center gap-2">
              {/* Unlocked badge */}
              <div
                className="self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A34A] text-white text-[11px] font-black tracking-tight"
                style={{
                  animation: "pdfunlock-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
                  opacity: 0,
                }}
              >
                <Unlock className="h-3 w-3" strokeWidth={2.5} />
                Restrictions removed
              </div>

              {/* Unlocked PDF card */}
              <div
                className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                style={{
                  animation: "pdfunlock-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.1s forwards",
                  opacity: 0,
                }}
              >
                <div className="relative w-7 h-8 rounded-sm bg-[#EF4444]/12 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3.5 w-3.5 text-[#EF4444]" strokeWidth={2} />
                  {/* Open lock overlay */}
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#16A34A] border border-white dark:border-[#1E1E1E] flex items-center justify-center">
                    <Unlock className="h-2 w-2 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] block truncate">
                    {OUTPUT.filename}
                  </span>
                  <span className="text-[9px] text-[#16A34A] font-semibold">
                    Print &middot; Copy &middot; Edit — all enabled
                  </span>
                </div>
                <button
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-[#EF4444] flex-shrink-0"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Download className="h-2 w-2" strokeWidth={2.5} />
                  PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Unlock className="h-2.5 w-2.5 text-[#EF4444]" strokeWidth={2} />
        <span>Removes usage restrictions &middot; 100% in your browser &middot; no upload</span>
      </div>

      <style jsx>{`
        @keyframes pdfunlock-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes pdfunlock-pop {
          0% { transform: scale(0.75); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

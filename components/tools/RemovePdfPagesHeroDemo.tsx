"use client";

import { useState, useEffect } from "react";
import { FileText, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * RemovePdfPages hero demo — Mac window mockup showing pages being selected
 * and removed from a PDF.
 *
 * Phases:
 *   "idle"     — 4 page thumbnails, trash button pulsing
 *   "marking"  — pages 2 and 3 get marked (red overlay, progressive)
 *   "removing" — trash button pressed, progress bar
 *   "done"     — 2 pages remaining, download badge
 *
 * Cycle: idle (1400ms) → marking (900ms) → removing (800ms) → done (2400ms) → idle
 */

type Phase = "idle" | "marking" | "removing" | "done";

const IDLE_MS = 1400;
const MARKING_MS = 900;
const REMOVING_MS = 800;
const DONE_MS = 2400;

// Pages 1 (index 1) and 2 (index 2) get removed
const MARKED_INDICES = new Set([1, 2]);

export default function RemovePdfPagesHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [markedVisible, setMarkedVisible] = useState<boolean[]>([false, false, false, false]);
  const [removeProgress, setRemoveProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    if (phase === "idle") {
      setMarkedVisible([false, false, false, false]);
      setRemoveProgress(0);
      const id = setTimeout(() => !cancelled && setPhase("marking"), IDLE_MS);
      return () => { cancelled = true; clearTimeout(id); };
    }

    if (phase === "marking") {
      // Mark pages 2 and 3 progressively
      const t1 = setTimeout(() => {
        if (!cancelled) setMarkedVisible([false, true, false, false]);
      }, MARKING_MS * 0.3);
      const t2 = setTimeout(() => {
        if (!cancelled) setMarkedVisible([false, true, true, false]);
      }, MARKING_MS * 0.65);
      const t3 = setTimeout(() => !cancelled && setPhase("removing"), MARKING_MS);
      return () => { cancelled = true; [t1, t2, t3].forEach(clearTimeout); };
    }

    if (phase === "removing") {
      // Animate progress bar
      const steps = 8;
      const stepMs = REMOVING_MS / steps;
      const timers: ReturnType<typeof setTimeout>[] = [];
      for (let s = 1; s <= steps; s++) {
        const t = setTimeout(() => {
          if (!cancelled) setRemoveProgress(Math.round((s / steps) * 100));
        }, s * stepMs);
        timers.push(t);
      }
      const done = setTimeout(() => !cancelled && setPhase("done"), REMOVING_MS);
      timers.push(done);
      return () => { cancelled = true; timers.forEach(clearTimeout); };
    }

    // done
    const id = setTimeout(() => !cancelled && setPhase("idle"), DONE_MS);
    return () => { cancelled = true; clearTimeout(id); };
  }, [phase]);

  const isDone = phase === "done";
  const isRemoving = phase === "removing";
  const isMarking = phase === "marking";

  // Which pages remain after removal
  const showPages = isDone
    ? [0, 3] // only pages 1 and 4 remain
    : [0, 1, 2, 3];

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
            Delete PDF Pages · report.pdf
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#991B1B] bg-[#EF4444]/12 dark:text-[#FCA5A5]">
            <FileText className="h-2.5 w-2.5" strokeWidth={2.5} />
            PDF · {isDone ? "2" : "4"}pp
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 flex flex-col h-[calc(100%-28px)] gap-2">
          {/* Thumbnails */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {showPages.map((originalIdx) => {
              const isPageMarked = markedVisible[originalIdx];

              return (
                <div
                  key={originalIdx}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded border-2 transition-all duration-300",
                    isDone
                      ? "border-[#16A34A]/60 bg-[#F0FDF4] dark:bg-[#052E16]"
                      : isPageMarked
                      ? "border-[#EF4444] bg-[#FEF2F2] dark:bg-[#7F1D1D]/20"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]"
                  )}
                  style={{ width: 42, height: 54 }}
                >
                  {/* PDF page mockup */}
                  <div
                    className="rounded-sm flex items-center justify-center"
                    style={{
                      width: 22,
                      height: 28,
                      backgroundColor: "#EF444420",
                      border: "1px solid #EF444440",
                    }}
                  >
                    <FileText style={{ color: "#EF4444", width: 10, height: 10 }} strokeWidth={2} />
                  </div>

                  {/* Red trash overlay when marked */}
                  {isPageMarked && !isDone && (
                    <div className="absolute inset-0 bg-[#EF4444]/15 flex items-center justify-center">
                      <Trash2 className="h-3.5 w-3.5 text-[#EF4444]" strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Done check */}
                  {isDone && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] flex items-center justify-center"
                      style={{ animation: "rpdemo-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}

                  {/* Page number */}
                  <span className="absolute bottom-0.5 text-[7px] text-[#A3A3A3] font-medium">
                    {originalIdx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar while removing */}
          {isRemoving && (
            <div className="w-full space-y-1">
              <div className="w-full h-1 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#EF4444] rounded-full transition-all duration-150"
                  style={{ width: `${removeProgress}%` }}
                />
              </div>
              <p className="text-[9px] text-center text-[#A3A3A3]">Removing pages…</p>
            </div>
          )}

          {/* Action button */}
          {!isRemoving && !isDone && (
            <button
              className={cn(
                "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold text-white transition-all",
                (isMarking && markedVisible[2]) || phase === "idle"
                  ? "bg-[#EF4444] hover:bg-[#DC2626]"
                  : "bg-[#EF4444]/50 cursor-default"
              )}
              style={{
                animation:
                  phase === "idle"
                    ? "rpdemo-pulse 1.4s ease-in-out infinite"
                    : "none",
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Trash2 className="h-3 w-3" strokeWidth={2.5} />
              {isMarking ? "Remove 2 pages" : "Click pages to mark"}
            </button>
          )}

          {/* Done result */}
          {isDone && (
            <div
              className="flex items-center gap-2"
              style={{
                animation: "rpdemo-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
                opacity: 0,
              }}
            >
              <div className="flex-1 text-[10px] font-semibold text-[#166534] dark:text-[#4ADE80]">
                2 pages removed &middot; 2 remaining
              </div>
              <button
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-white bg-[#171717] flex-shrink-0"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Download className="h-2 w-2" strokeWidth={2.5} />
                PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Trash2 className="h-2.5 w-2.5 text-[#EF4444]" strokeWidth={2} />
        <span>Click to mark pages &middot; remove instantly &middot; no upload</span>
      </div>

      <style jsx>{`
        @keyframes rpdemo-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes rpdemo-pop {
          0% { transform: scale(0.75); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { FileText, RotateCw, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PdfRotate hero demo — finestra mockup Mac che mostra le pagine di un PDF
 * che ruotano visivamente dopo la selezione.
 *
 * Fasi:
 *   "idle"     — thumbnail pagine normali + bottone "Rotate All 90° CW" che pulsa
 *   "rotating" — badge rotazione che appare su ogni thumbnail, progressivo
 *   "done"     — thumbnail visivamente ruotate + badge download
 *
 * Ciclo: idle (1500ms) → rotating (1000ms) → done (2500ms) → idle
 */

type Phase = "idle" | "rotating" | "done";

const SOURCE = { filename: "report.pdf", pages: 4 };

const IDLE_MS = 1500;
const ROTATING_MS = 1000;
const DONE_MS = 2500;

// Mini page thumbnails in the demo
const PAGE_COLORS = [
  "#EF4444", // red
  "#EF4444",
  "#EF4444",
  "#EF4444",
];

export default function PdfRotateHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleBadges, setVisibleBadges] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    let cancelled = false;

    if (phase === "idle") {
      setVisibleBadges([false, false, false, false]);
      const id = setTimeout(() => !cancelled && setPhase("rotating"), IDLE_MS);
      return () => { cancelled = true; clearTimeout(id); };
    }

    if (phase === "rotating") {
      // Stagger badges appearing
      const timeouts: ReturnType<typeof setTimeout>[] = [];
      [0, 1, 2, 3].forEach((i) => {
        const t = setTimeout(() => {
          if (!cancelled) setVisibleBadges((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, (i * ROTATING_MS) / 5);
        timeouts.push(t);
      });
      const doneT = setTimeout(() => !cancelled && setPhase("done"), ROTATING_MS);
      timeouts.push(doneT);
      return () => { cancelled = true; timeouts.forEach(clearTimeout); };
    }

    // done
    const id = setTimeout(() => !cancelled && setPhase("idle"), DONE_MS);
    return () => { cancelled = true; clearTimeout(id); };
  }, [phase]);

  const isDone = phase === "done";
  const isRotating = phase === "rotating";

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
            Rotate PDF · {SOURCE.filename}
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#991B1B] bg-[#EF4444]/12 dark:text-[#FCA5A5]">
            <FileText className="h-2.5 w-2.5" strokeWidth={2.5} />
            PDF · {SOURCE.pages}pp
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 flex flex-col h-[calc(100%-28px)] gap-2">
          {/* Thumbnails row */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((i) => {
              const showBadge = visibleBadges[i];
              const rotated = isDone;

              return (
                <div
                  key={i}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded border-2 transition-all duration-300",
                    rotated
                      ? "border-[#16A34A]/60 bg-[#F0FDF4] dark:bg-[#052E16]"
                      : isRotating && showBadge
                      ? "border-[#EF4444]/70 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]",
                  )}
                  style={{ width: 42, height: 54 }}
                >
                  {/* PDF page mockup */}
                  <div
                    className="transition-transform duration-500"
                    style={{ transform: rotated ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    <div
                      className="rounded-sm flex items-center justify-center"
                      style={{
                        width: 22,
                        height: 28,
                        backgroundColor: `${PAGE_COLORS[i]}20`,
                        border: `1px solid ${PAGE_COLORS[i]}40`,
                      }}
                    >
                      <FileText
                        style={{ color: PAGE_COLORS[i], width: 10, height: 10 }}
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Rotation badge */}
                  {(isRotating && showBadge) && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] flex items-center justify-center"
                      style={{ animation: "pdfrotate-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
                    >
                      <RotateCw style={{ width: 8, height: 8, color: "white" }} strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Done check */}
                  {isDone && (
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] flex items-center justify-center"
                      style={{ animation: "pdfrotate-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}

                  {/* Page number */}
                  <span className="absolute bottom-0.5 text-[7px] text-[#A3A3A3] font-medium">{i + 1}</span>
                </div>
              );
            })}
          </div>

          {/* Action area */}
          {!isDone ? (
            <button
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all"
              style={{
                animation: phase === "idle" ? "pdfrotate-pulse 1.4s ease-in-out infinite" : "none",
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <RotateCw className="h-3 w-3" strokeWidth={2.5} />
              {isRotating ? "Rotating..." : "Rotate All 90° CW"}
            </button>
          ) : (
            <div
              className="flex items-center gap-2"
              style={{ animation: "pdfrotate-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards", opacity: 0 }}
            >
              <div className="flex-1 text-[10px] font-semibold text-[#166534] dark:text-[#4ADE80]">
                4 pages rotated · Text still selectable
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
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <RotateCw className="h-2.5 w-2.5 text-[#EF4444]" strokeWidth={2} />
        <span>Rotate pages in browser · text stays selectable · no upload</span>
      </div>

      <style jsx>{`
        @keyframes pdfrotate-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes pdfrotate-pop {
          0% { transform: scale(0.75); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

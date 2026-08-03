"use client";

import { useState, useEffect } from "react";
import { FileText, Minimize2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PdfCompress hero demo — finestra mockup Mac che mostra un PDF "large"
 * che si restringe visivamente dopo la compressione.
 *
 * Fasi:
 *   "idle"        — card PDF grande visibile, bottone "Compress" che pulsa
 *   "compressing" — barra di progresso animata
 *   "done"        — card PDF compressa con badge "−67%" che appare con pop
 *
 * Ciclo: idle (1500ms) → compressing (900ms) → done (2500ms) → idle
 */

type Phase = "idle" | "compressing" | "done";

const SOURCE = { filename: "presentation.pdf", pages: 24, sizeMB: 8.4 };
const OUTPUT = { filename: "presentation-compressed.pdf", sizeMB: 2.7 };
const REDUCTION = "−67%";

const IDLE_MS = 1500;
const COMPRESS_MS = 900;
const DONE_MS = 2500;

export default function PdfCompressHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let id: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      setBarWidth(0);
      id = setTimeout(() => !cancelled && setPhase("compressing"), IDLE_MS);
    } else if (phase === "compressing") {
      // Anima la barra durante il compress
      setBarWidth(0);
      const steps = 10;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (!cancelled) setBarWidth(Math.min(100, (step / steps) * 100));
        if (step >= steps) clearInterval(interval);
      }, COMPRESS_MS / steps);

      id = setTimeout(() => {
        clearInterval(interval);
        if (!cancelled) setPhase("done");
      }, COMPRESS_MS);
    } else {
      id = setTimeout(() => !cancelled && setPhase("idle"), DONE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [phase]);

  const isDone = phase === "done";
  const isCompressing = phase === "compressing";

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
            Compress PDF · {SOURCE.filename}
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
              {/* Card PDF sorgente — si restringe durante la compressione */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-3 rounded-lg border-2 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 transition-all duration-500",
                    isCompressing
                      ? "border-[#EF4444]/60 scale-90 opacity-70"
                      : "border-[#EF4444]/40"
                  )}
                >
                  <div className="w-8 h-10 rounded-sm bg-[#EF4444] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="h-4 w-4 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-[#171717] dark:text-[#E5E5E5] truncate">
                      {SOURCE.filename}
                    </div>
                    <div className="text-[10px] text-[#737373] tabular-nums">
                      <span className="font-semibold text-[#EF4444]">{SOURCE.pages}</span> pages &middot;{" "}
                      <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{SOURCE.sizeMB} MB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar durante la compressione */}
              {isCompressing && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-[#737373]">
                    <span>Compressing...</span>
                    <span>{Math.round(barWidth)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#333] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#EF4444] rounded-full transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Bottone comprimi */}
              {!isCompressing && (
                <button
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all"
                  style={{
                    animation: phase === "idle" ? "pdfcompress-pulse 1.4s ease-in-out infinite" : "none",
                  }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Minimize2 className="h-3 w-3" strokeWidth={2.5} />
                  Compress PDF — Medium
                </button>
              )}
            </>
          ) : (
            /* Done: mostra PDF compresso con badge riduzione */
            <div className="flex-1 flex flex-col justify-center gap-2">
              {/* Badge riduzione */}
              <div
                className="self-center px-3 py-1 rounded-full bg-[#16A34A] text-white text-[11px] font-black tracking-tight"
                style={{
                  animation: "pdfcompress-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
                  opacity: 0,
                }}
              >
                {REDUCTION}
              </div>

              {/* Card PDF compresso */}
              <div
                className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                style={{
                  animation: "pdfcompress-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.1s forwards",
                  opacity: 0,
                }}
              >
                <div className="w-7 h-8 rounded-sm bg-[#EF4444]/12 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3.5 w-3.5 text-[#EF4444]" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] block truncate">
                    {OUTPUT.filename}
                  </span>
                  <span className="text-[10px] text-[#16A34A] font-semibold tabular-nums">
                    {OUTPUT.sizeMB} MB
                  </span>
                  <span className="text-[10px] text-[#A3A3A3] tabular-nums">
                    {" "}(was {SOURCE.sizeMB} MB)
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
        <Minimize2 className="h-2.5 w-2.5 text-[#EF4444]" strokeWidth={2} />
        <span>Compress in your browser · no upload · see before/after size</span>
      </div>

      <style jsx>{`
        @keyframes pdfcompress-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
        }
        @keyframes pdfcompress-pop {
          0% { transform: scale(0.75); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

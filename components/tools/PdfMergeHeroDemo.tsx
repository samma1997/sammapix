"use client";

import { useState, useEffect } from "react";
import { FileText, GripVertical, Sparkles, Download, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PdfMerge hero demo — 4 PDF card verticali con drag handle, bottone Merge
 * che pulse, poi animazione stack-collapse: i 4 PDF si schiacciano in 1
 * "merged.pdf" con sum di pages e size.
 *
 * Brand color #DC2626 red
 */

type PdfFile = {
  filename: string;
  pages: number;
  sizeMB: number;
};

const PDFS: PdfFile[] = [
  { filename: "report-q4.pdf",     pages: 18, sizeMB: 1.2 },
  { filename: "invoice-2026.pdf",  pages: 4,  sizeMB: 0.4 },
  { filename: "contract.pdf",      pages: 12, sizeMB: 0.8 },
  { filename: "appendix-a.pdf",    pages: 7,  sizeMB: 0.6 },
];

const PULSE_MS = 1400;
const MERGE_MS = 900;
const DONE_PAUSE_MS = 2200;

type Phase = "pulsing" | "merging" | "done";

export default function PdfMergeHeroDemo() {
  const [phase, setPhase] = useState<Phase>("pulsing");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "pulsing") {
      timeoutId = setTimeout(() => !cancelled && setPhase("merging"), PULSE_MS);
    } else if (phase === "merging") {
      timeoutId = setTimeout(() => !cancelled && setPhase("done"), MERGE_MS);
    } else {
      timeoutId = setTimeout(() => !cancelled && setPhase("pulsing"), DONE_PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, hasInteracted]);

  const totalPages = PDFS.reduce((s, p) => s + p.pages, 0);
  const totalSize = PDFS.reduce((s, p) => s + p.sizeMB, 0);
  const isDone = phase === "done";
  const isMerging = phase === "merging";

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">PDF Merge · {PDFS.length} files</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#991B1B] bg-[#DC2626]/12 dark:text-[#FCA5A5]">
            <FileText className="h-2.5 w-2.5" strokeWidth={2.5} />
            PDF
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 flex flex-col h-[calc(100%-28px)] gap-2">
          {!isDone ? (
            <>
              {/* PDF list */}
              <div className="flex-1 space-y-1 overflow-hidden">
                {PDFS.map((pdf, i) => (
                  <div
                    key={pdf.filename}
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-all",
                      isMerging && "translate-x-0 opacity-100"
                    )}
                    style={{
                      animation: isMerging ? `pdfmerge-collapse 0.7s ease-in-out forwards` : "none",
                      animationDelay: isMerging ? `${i * 0.08}s` : "0s",
                    }}
                  >
                    <GripVertical className="h-3 w-3 text-[#A3A3A3] flex-shrink-0 cursor-grab" strokeWidth={1.5} />
                    <div className="w-5 h-6 rounded-sm bg-[#DC2626]/12 border border-[#DC2626]/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-3 w-3 text-[#DC2626]" strokeWidth={2} />
                    </div>
                    <span className="text-[10.5px] font-medium text-[#171717] dark:text-[#E5E5E5] flex-1 truncate">
                      {pdf.filename}
                    </span>
                    <span className="text-[9px] text-[#737373] tabular-nums font-mono">
                      {pdf.pages}p · {pdf.sizeMB.toFixed(1)}MB
                    </span>
                  </div>
                ))}
              </div>

              {/* Merge button */}
              <button
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold text-white transition-all",
                  isMerging
                    ? "bg-[#DC2626] scale-95"
                    : "bg-[#DC2626] hover:bg-[#B91C1C]"
                )}
                style={{
                  animation: phase === "pulsing" ? "pdfmerge-pulse 1.4s ease-in-out infinite" : "none",
                }}
              >
                {isMerging ? (
                  <>
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} style={{ animation: "pdfmerge-spin 1s linear infinite" }} />
                    Merging…
                  </>
                ) : (
                  <>
                    <Plus className="h-3 w-3" strokeWidth={2.5} />
                    Merge {PDFS.length} files
                  </>
                )}
              </button>
            </>
          ) : (
            /* Done: 1 big merged PDF card */
            <div className="flex-1 flex items-center justify-center">
              <div
                className="flex items-center gap-3 px-3 py-3 rounded-lg border-2 border-[#DC2626]/40 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 shadow-sm"
                style={{ animation: "pdfmerge-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Stack visualization: 3 layered PDF icons */}
                <div className="relative w-10 h-12 flex-shrink-0">
                  <div className="absolute top-0.5 left-1 w-9 h-11 rounded bg-white border border-[#DC2626]/30 shadow-sm" />
                  <div className="absolute top-1 left-0.5 w-9 h-11 rounded bg-white border border-[#DC2626]/40 shadow-sm" />
                  <div className="absolute top-1.5 left-0 w-9 h-11 rounded bg-[#DC2626] flex items-center justify-center shadow-md">
                    <FileText className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold text-[#171717] dark:text-[#E5E5E5]">
                    merged.pdf
                  </div>
                  <div className="text-[10px] text-[#737373] mt-0.5 tabular-nums">
                    <span className="font-semibold text-[#DC2626]">{totalPages}</span> pages ·{" "}
                    <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{totalSize.toFixed(1)} MB</span>
                  </div>
                  <div className="text-[8.5px] text-[#737373] mt-0.5">
                    {PDFS.length} files combined
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold text-white bg-[#DC2626] hover:bg-[#B91C1C]">
                  <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
                  PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileText className="h-2.5 w-2.5 text-[#DC2626]" strokeWidth={2} />
        <span>Drag to reorder · No upload · Unlimited files</span>
      </div>

      <style jsx>{`
        @keyframes pdfmerge-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
        }
        @keyframes pdfmerge-collapse {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(15px); opacity: 0.6; }
          100% { transform: translateY(35px); opacity: 0; }
        }
        @keyframes pdfmerge-pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pdfmerge-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

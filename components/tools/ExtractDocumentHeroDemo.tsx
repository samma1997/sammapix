"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Document Extractor hero demo — mock panel showing a stylized receipt on the
 * left "scanning" into structured JSON fields on the right.
 * Pure CSS animations, no new deps. Brand color: #6366F1.
 */

type Phase = "scanning" | "revealing" | "done";

const RECEIPT_LINES = [
  { label: "Coffee x2", amount: "$7.50" },
  { label: "Sandwich", amount: "$12.00" },
  { label: "Juice", amount: "$4.50" },
];

const REVEAL_FIELDS = [
  { key: "Vendor", value: "The Corner Cafe" },
  { key: "Date", value: "2026-09-20" },
  { key: "Total", value: "$26.17" },
  { key: "Items", value: "3 line items" },
];

const SCANNING_MS = 900;
const REVEAL_STEP_MS = 280;
const DONE_PAUSE_MS = 2600;

export default function ExtractDocumentHeroDemo() {
  const [phase, setPhase] = useState<Phase>("scanning");
  const [revealedCount, setRevealedCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (phase === "scanning") {
      timerRef.current = setTimeout(() => {
        setRevealedCount(0);
        setPhase("revealing");
      }, SCANNING_MS);
    } else if (phase === "revealing") {
      if (revealedCount < REVEAL_FIELDS.length) {
        timerRef.current = setTimeout(() => {
          setRevealedCount((c) => c + 1);
        }, REVEAL_STEP_MS);
      } else {
        setPhase("done");
      }
    } else {
      timerRef.current = setTimeout(() => {
        setPhase("scanning");
        setRevealedCount(0);
      }, DONE_PAUSE_MS);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, revealedCount]);

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Mock toolbar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">receipt.pdf</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/10">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
            Gemini AI
          </div>
        </div>

        {/* Body: receipt left, fields right */}
        <div className="grid grid-cols-[44%_56%] h-[calc(100%-28px)]">
          {/* Receipt mock */}
          <div className="relative bg-[#FAFAFA] dark:bg-[#1A1A1A] border-r border-[#E5E5E5] dark:border-[#2A2A2A] flex flex-col items-center justify-center px-2 py-3 gap-1">
            {/* Receipt paper */}
            <div className="w-full max-w-[90px] bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] rounded-sm px-2 py-2 shadow-sm space-y-1">
              <div className="text-[7px] font-bold text-center text-[#171717] dark:text-[#E5E5E5] leading-tight">
                THE CORNER CAFE
              </div>
              <div className="border-t border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] my-0.5" />
              {RECEIPT_LINES.map((line) => (
                <div key={line.label} className="flex justify-between">
                  <span className="text-[6px] text-[#737373]">{line.label}</span>
                  <span className="text-[6px] text-[#171717] dark:text-[#E5E5E5] font-mono">{line.amount}</span>
                </div>
              ))}
              <div className="border-t border-[#D4D4D4] dark:border-[#3A3A3A] my-0.5" />
              <div className="flex justify-between">
                <span className="text-[6.5px] font-bold text-[#171717] dark:text-[#E5E5E5]">TOTAL</span>
                <span className="text-[6.5px] font-bold text-[#6366F1] font-mono">$26.17</span>
              </div>
            </div>

            {/* Scanning overlay */}
            {phase === "scanning" && (
              <div className="absolute inset-0 bg-[#6366F1]/25 backdrop-blur-[1.5px] flex flex-col items-center justify-center gap-1.5">
                <div
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{ animation: "extdoc-scan 0.9s ease-in-out infinite" }}
                />
                <Sparkles className="h-4 w-4 text-white drop-shadow" strokeWidth={2} />
                <span className="text-[9px] font-semibold text-white drop-shadow">Reading…</span>
              </div>
            )}
          </div>

          {/* Extracted fields */}
          <div className="px-2.5 py-2 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[9px] font-semibold text-[#737373] uppercase tracking-wide">
                Extracted data
              </label>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 rounded transition-all duration-300",
                  phase === "done"
                    ? "text-[#16A34A] bg-[#22C55E]/12 ring-1 ring-[#22C55E]/30"
                    : "text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#1E1E1E]"
                )}
              >
                <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                Structured
              </span>
            </div>

            <div className="flex-1 space-y-1.5 min-h-0">
              {REVEAL_FIELDS.map((field, i) => {
                const visible = i < revealedCount;
                return (
                  <div
                    key={field.key}
                    className="transition-all duration-300"
                    style={{
                      opacity: visible ? 1 : 0.12,
                      transform: visible ? "translateX(0)" : "translateX(-4px)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[8px] font-semibold text-[#A3A3A3] uppercase tracking-wide shrink-0">
                        {field.key}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-mono truncate",
                          field.key === "Total"
                            ? "text-[#6366F1] font-bold"
                            : "text-[#171717] dark:text-[#E5E5E5]"
                        )}
                      >
                        {visible ? field.value : "—"}
                      </span>
                    </div>
                    <div className="h-px bg-[#F5F5F5] dark:bg-[#252525] mt-0.5" />
                  </div>
                );
              })}
            </div>

            {/* Mini progress bar */}
            {phase !== "scanning" && (
              <div className="mt-2 h-0.5 bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-300"
                  style={{ width: `${(revealedCount / REVEAL_FIELDS.length) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes extdoc-scan {
          0%, 100% { top: 20%; opacity: 0.4; }
          50% { top: 75%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

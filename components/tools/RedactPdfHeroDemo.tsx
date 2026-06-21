"use client";

import { useState, useEffect } from "react";
import { FileText, Shield } from "lucide-react";

/**
 * Redact PDF hero demo - mac-window mockup showing a mock contract document
 * where sensitive fields get progressively covered by black redaction bars.
 * Accent color: slate #334155
 * Same style as RawConverterHeroDemo.
 */

// Redaction states: which fields are redacted at each step
type RedactStep = {
  label: string;
  // which lines are currently blacked out (0-indexed)
  redacted: number[];
};

const STEPS: RedactStep[] = [
  { label: "Original document", redacted: [] },
  { label: "Redacting name...", redacted: [1] },
  { label: "Redacting SSN...", redacted: [1, 3] },
  { label: "Redacting account number...", redacted: [1, 3, 5] },
  { label: "Permanently removed", redacted: [1, 3, 5] },
];

// Mock document lines: [label, value, isSensitive]
const DOC_LINES: [string, string, boolean][] = [
  ["Full Name", "James D. Morrison", true],
  ["Date", "June 15, 2026", false],
  ["SSN", "553-00-1234", true],
  ["Address", "742 Evergreen Terrace, IL", false],
  ["Account No.", "4012-8888-0000-9174", true],
  ["Signature", "J. Morrison", false],
];

const CYCLE_MS = 1200;

export default function RedactPdfHeroDemo() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[stepIndex];
  const isDone = stepIndex === STEPS.length - 1;

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Mac toolbar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1 flex items-center gap-1">
            <FileText className="h-2.5 w-2.5" strokeWidth={2} />
            Redact PDF &middot; contract.pdf
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#334155] bg-[#334155]/12 dark:text-[#94A3B8]">
            <Shield className="h-2.5 w-2.5" strokeWidth={2.5} />
            REDACT
          </div>
        </div>

        {/* Document body */}
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-2">
          {/* Document title */}
          <div className="flex items-center gap-1.5 mb-1">
            <div className="h-3 w-3 rounded-sm bg-[#334155]/20 dark:bg-[#334155]/30 flex items-center justify-center">
              <FileText className="h-2 w-2 text-[#334155] dark:text-[#94A3B8]" strokeWidth={2} />
            </div>
            <span className="text-[9px] font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider">
              Confidential Agreement
            </span>
          </div>

          {/* Document rows */}
          <div className="space-y-1.5">
            {DOC_LINES.map(([label, value, isSensitive], i) => {
              const isRedacted = step.redacted.includes(
                // sensitive line indices: 0 (Name row = i*2=0), 2 (SSN=i*2=4→2), 4 (Account=i*2=8→4)
                isSensitive
                  ? [0, 2, 4][
                      DOC_LINES.slice(0, i).filter(([, , s]) => s).length
                    ]
                  : -1
              );

              return (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#A3A3A3] w-16 shrink-0 text-right">
                    {label}
                  </span>
                  <span className="text-[9px] text-[#D4D4D4] dark:text-[#444]">:</span>
                  <div className="flex-1 min-w-0 relative">
                    {isRedacted ? (
                      <div
                        className="h-3 rounded-sm bg-[#0a0a0a] dark:bg-[#050505]"
                        style={{
                          animation: "redact-bar-in 0.25s ease-out",
                        }}
                      />
                    ) : (
                      <span
                        className={[
                          "text-[9px] truncate",
                          isSensitive
                            ? "font-medium text-[#171717] dark:text-[#E5E5E5]"
                            : "text-[#737373] dark:text-[#737373]",
                        ].join(" ")}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                  {isRedacted && (
                    <span className="text-[7px] text-[#334155] dark:text-[#94A3B8] shrink-0 font-semibold uppercase tracking-wide">
                      removed
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Status badge */}
          <div className="flex items-center justify-center mt-2">
            <div
              className={[
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors",
                isDone
                  ? "bg-[#334155]/15 dark:bg-[#334155]/20"
                  : "bg-[#F5F5F5] dark:bg-[#252525]",
              ].join(" ")}
            >
              {isDone ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#334155] dark:bg-[#94A3B8]" />
                  <span className="text-[10px] font-semibold text-[#334155] dark:text-[#94A3B8]">
                    Permanently removed
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#A3A3A3]"
                    style={{ animation: "redact-pulse 1s ease-in-out infinite" }}
                  />
                  <span className="text-[10px] text-[#737373]">
                    {step.label}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Shield className="h-2.5 w-2.5 text-[#334155]" strokeWidth={2} />
        <span>Redacted in your browser · no upload · content truly removed</span>
      </div>

      <style jsx>{`
        @keyframes redact-bar-in {
          0% {
            transform: scaleX(0);
            transform-origin: left;
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
            opacity: 1;
          }
        }
        @keyframes redact-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ArticleSummaryProps {
  summaryPoints: string[];
  children: React.ReactNode;
}

export default function ArticleSummary({ summaryPoints, children }: ArticleSummaryProps) {
  const [mode, setMode] = useState<"full" | "tldr">("full");

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setMode("full")}
          className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
            mode === "full"
              ? "bg-[#171717] text-white dark:bg-white dark:text-[#171717]"
              : "border border-[#E5E5E5] text-[#737373] hover:text-[#525252] dark:border-[#404040]"
          }`}
        >
          Full Article
        </button>
        <button
          onClick={() => setMode("tldr")}
          className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
            mode === "tldr"
              ? "bg-[#171717] text-white dark:bg-white dark:text-[#171717]"
              : "border border-[#E5E5E5] text-[#737373] hover:text-[#525252] dark:border-[#404040]"
          }`}
        >
          TL;DR
        </button>
      </div>

      {/* Content */}
      {mode === "tldr" ? (
        <div className="bg-[#EEF2FF] dark:bg-indigo-950/20 border border-[#C7D2FE] dark:border-indigo-900/50 rounded-[6px] p-5">
          <ul className="space-y-3">
            {summaryPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#6366F1] shrink-0 mt-0.5"
                />
                <span className="text-[14px] text-[#171717] dark:text-white leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

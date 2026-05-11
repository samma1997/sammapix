"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, FileText, Copy, CheckCircle2, ScanText, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ImageToText hero demo — mock documento/menu/ricevuta a sx con scan line
 * orizzontale animata, OCR testo che si compila riga per riga a dx con
 * typing animation. Languages chip per mostrare multi-lingua.
 *
 * Brand color #6366F1 indigo
 */

type Sample = {
  label: string;
  lang: string;
  flag: string;
  doctype: "receipt" | "menu" | "card";
  lines: string[];
};

const SAMPLES: Sample[] = [
  {
    label: "Receipt",
    lang: "Italiano",
    flag: "🇮🇹",
    doctype: "receipt",
    lines: [
      "TRATTORIA DA LUIGI",
      "Via Roma 12, Firenze",
      "—————————————",
      "Tagliatelle ragù   12,00€",
      "Bistecca           28,00€",
      "Vino Chianti       18,00€",
      "TOTALE             58,00€",
    ],
  },
  {
    label: "Menu",
    lang: "English",
    flag: "🇬🇧",
    doctype: "menu",
    lines: [
      "BREAKFAST MENU",
      "—————————————",
      "Pancake stack       $8.50",
      "Eggs benedict      $12.00",
      "Avocado toast      $10.50",
      "Cold brew coffee    $4.75",
      "Fresh orange juice  $5.00",
    ],
  },
  {
    label: "Business card",
    lang: "Français",
    flag: "🇫🇷",
    doctype: "card",
    lines: [
      "MARIE DUBOIS",
      "Designer Senior",
      "Studio Lumière",
      "—————————————",
      "+33 6 12 34 56 78",
      "marie@studio-lumiere.fr",
      "www.studio-lumiere.fr",
    ],
  },
];

const ANALYZING_MS = 700;
const TYPING_SPEED_MS = 24;
const DONE_PAUSE_MS = 2400;

type Phase = "scanning" | "typing" | "done";

export default function ImageToTextHeroDemo() {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("scanning");
  const [typedChars, setTypedChars] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const sample = SAMPLES[sampleIdx];
  const fullText = sample.lines.join("\n");

  useEffect(() => {
    if (hasInteracted) return;

    if (phase === "scanning") {
      timeoutRef.current = setTimeout(() => setPhase("typing"), ANALYZING_MS);
    } else if (phase === "typing") {
      if (typedChars < fullText.length) {
        timeoutRef.current = setTimeout(() => setTypedChars((c) => c + 1), TYPING_SPEED_MS);
      } else {
        setPhase("done");
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setSampleIdx((i) => (i + 1) % SAMPLES.length);
        setTypedChars(0);
        setPhase("scanning");
      }, DONE_PAUSE_MS);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [phase, typedChars, sampleIdx, hasInteracted, fullText.length]);

  const typedText = fullText.slice(0, typedChars);
  const typedLines = typedText.split("\n");

  const switchTo = (i: number) => {
    setHasInteracted(true);
    clearTimeout(timeoutRef.current);
    setSampleIdx(i);
    setTypedChars(SAMPLES[i].lines.join("\n").length);
    setPhase("done");
  };

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
            {sample.label.toLowerCase().replace(/\s+/g, "-")}.jpg
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/12 dark:text-[#A5B4FC]">
            <Languages className="h-2.5 w-2.5" strokeWidth={2.5} />
            {sample.flag} {sample.lang}
          </div>
        </div>

        {/* Body: document mock sx + OCR text dx */}
        <div className="grid grid-cols-[1fr_1.2fr] h-[calc(100%-28px)]">
          {/* Document mock — visual rendering of the photo */}
          <div className="relative bg-[#E5E7EB] dark:bg-[#0F0F0F] border-r border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center p-2 overflow-hidden">
            <div
              className={cn(
                "relative bg-white shadow-lg rounded-sm overflow-hidden flex flex-col",
                sample.doctype === "receipt" && "w-[70%] aspect-[1/1.8] font-mono",
                sample.doctype === "menu" && "w-[88%] aspect-[1/1.3]",
                sample.doctype === "card" && "w-[92%] aspect-[1.6/1] bg-gradient-to-br from-white to-[#FAFAFA]"
              )}
              style={{
                // Slight rotation to feel like a real photo
                transform: sample.doctype === "card" ? "rotate(-1deg)" : "rotate(0.5deg)",
              }}
            >
              {/* Real readable content */}
              <div
                className={cn(
                  "px-2 py-2 flex-1",
                  sample.doctype === "receipt" && "text-center",
                  sample.doctype === "menu" && "px-2.5",
                  sample.doctype === "card" && "flex flex-col justify-center px-3"
                )}
              >
                {sample.lines.map((line, i) => {
                  const isHeader = i === 0;
                  const isDivider = line.startsWith("—");
                  if (isDivider) {
                    return <div key={i} className="h-px bg-[#171717]/30 my-1" />;
                  }
                  // Determine if line has aligned columns (price in receipt/menu)
                  const priceMatch = line.match(/^(.+?)\s+([\d.,]+\s?[€$]?)$/);
                  const fontClass =
                    sample.doctype === "receipt" ? "font-mono" :
                    sample.doctype === "menu" ? "font-serif" :
                    "font-sans";
                  if (priceMatch && (sample.doctype === "receipt" || sample.doctype === "menu")) {
                    return (
                      <div
                        key={i}
                        className={cn("flex justify-between gap-1 leading-tight", fontClass, isHeader ? "text-[9px] font-bold" : "text-[7.5px] text-[#171717]/80")}
                      >
                        <span className="truncate">{priceMatch[1]}</span>
                        <span className="font-semibold">{priceMatch[2]}</span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className={cn(
                        "leading-tight",
                        fontClass,
                        isHeader
                          ? sample.doctype === "card"
                            ? "text-[10px] font-bold tracking-tight text-[#171717]"
                            : "text-[9.5px] font-bold tracking-tight text-[#171717]"
                          : "text-[7.5px] text-[#171717]/80",
                        sample.doctype === "card" && i > 0 && i < 3 && "text-[7px] text-[#737373]",
                        sample.doctype === "card" && i >= 4 && "text-[6.5px] text-[#525252] font-mono"
                      )}
                    >
                      {line}
                    </div>
                  );
                })}
              </div>

              {/* Scan line during scanning */}
              {phase === "scanning" && (
                <div
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent shadow-[0_0_8px_2px_rgba(99,102,241,0.6)] z-20"
                  style={{ animation: "i2t-scan 1.4s ease-in-out infinite" }}
                />
              )}
              {/* OCR highlight while typing */}
              {phase === "typing" && (
                <div className="absolute inset-0 ring-2 ring-[#6366F1] ring-inset pointer-events-none z-10" />
              )}
            </div>
            {/* Status overlay */}
            {phase === "scanning" && (
              <div className="absolute bottom-1.5 left-2 right-2 z-10 inline-flex items-center justify-center gap-1 text-[9px] font-semibold text-[#4338CA] bg-[#6366F1]/15 px-1.5 py-0.5 rounded">
                <ScanText className="h-2.5 w-2.5" strokeWidth={2.5} />
                Scanning…
              </div>
            )}
          </div>

          {/* OCR output */}
          <div className="flex flex-col p-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[9px] font-semibold text-[#737373] uppercase tracking-wide">Extracted text</label>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded transition-all duration-300",
                  phase === "done"
                    ? "text-white bg-[#6366F1] hover:bg-[#4F46E5]"
                    : "text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#1E1E1E] cursor-not-allowed"
                )}
                disabled={phase !== "done"}
              >
                {phase === "done" ? (
                  <>
                    <Copy className="h-2.5 w-2.5" strokeWidth={2.5} />
                    Copy
                  </>
                ) : (
                  <>
                    <Sparkles className="h-2.5 w-2.5 animate-pulse" strokeWidth={2} />
                    AI
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 text-[10px] leading-[1.45] font-mono text-[#171717] dark:text-[#E5E5E5] min-h-0 overflow-hidden">
              {phase === "scanning" ? (
                <span className="text-[10px] text-[#A3A3A3] italic flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" strokeWidth={2} style={{ animation: "i2t-spin 1s linear infinite" }} />
                  Reading image content…
                </span>
              ) : (
                <div className="space-y-0.5">
                  {typedLines.map((line, i) => (
                    <div key={i} className={cn(line.startsWith("—") && "text-[#A3A3A3]")}>
                      {line}
                      {i === typedLines.length - 1 && phase === "typing" && (
                        <span className="inline-block w-[1.5px] h-[10px] bg-[#6366F1] ml-px align-middle" style={{ animation: "i2t-cursor 0.9s steps(1) infinite" }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[8px] text-[#737373] tabular-nums">
                <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{typedChars}</span> chars · {typedLines.length} lines
              </span>
              {phase === "done" && (
                <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-1 py-0.5 rounded">
                  <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                  OCR done
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sample chips */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {SAMPLES.map((s, i) => {
          const active = i === sampleIdx;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => switchTo(i)}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#6366F1] bg-[#6366F1]/[0.08] text-[#4338CA] dark:text-[#A5B4FC]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              <span className="text-[11px]">{s.flag}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
        <span className="inline-flex items-center px-1.5 py-0.5 text-[9.5px] font-semibold rounded bg-[#6366F1]/10 text-[#4338CA] dark:text-[#A5B4FC]">
          +50 langs
        </span>
      </div>

      <style jsx>{`
        @keyframes i2t-scan {
          0%, 100% { top: 8%; opacity: 0.8; }
          50% { top: 90%; opacity: 1; }
        }
        @keyframes i2t-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes i2t-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

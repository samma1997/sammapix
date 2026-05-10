"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Alt Text hero demo — mock CMS panel: foto (riutilizzo asset geosort)
 * a sinistra, panel "alt text" a destra. AI "analyzing" indicator poi
 * typing animation carattere-per-carattere del testo generato.
 * Cycle through 3 esempi con chips sotto.
 *
 * Brand: #6366F1 (indigo)
 */

type Example = {
  src: string;
  alt: string;
  /** Alt text WCAG-compliant generato */
  generated: string;
  label: string;
};

const EXAMPLES: Example[] = [
  {
    src: "/demo/geosort-italy.webp",
    alt: "Aerial drone view of Tuscan villa at golden hour",
    label: "Tuscany",
    generated:
      "Aerial drone view of a stone Tuscan villa surrounded by cypress trees and rolling green hills at golden hour, warm yellow sunlight casting long shadows.",
  },
  {
    src: "/demo/geosort-japan.webp",
    alt: "Red torii gate with Mt Fuji and cherry blossoms",
    label: "Japan",
    generated:
      "Traditional red Japanese torii gate standing in calm water, with Mount Fuji and cherry blossoms in pink bloom framing the scene at sunset.",
  },
  {
    src: "/demo/geosort-thailand.webp",
    alt: "Long-tail boat in turquoise water at Phi Phi Islands",
    label: "Thailand",
    generated:
      "Wooden long-tail boat decorated with colored ribbons floating on clear turquoise water, surrounded by limestone cliffs covered in tropical vegetation.",
  },
];

const ANALYZING_MS = 700;
const TYPING_SPEED_MS = 22;
const DONE_PAUSE_MS = 2400;

type Phase = "analyzing" | "typing" | "done";

export default function AltTextHeroDemo() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("analyzing");
  const [typed, setTyped] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Drive the animation cycle
  useEffect(() => {
    if (hasInteracted) return;
    const current = EXAMPLES[exampleIdx];

    if (phase === "analyzing") {
      timeoutRef.current = setTimeout(() => setPhase("typing"), ANALYZING_MS);
    } else if (phase === "typing") {
      if (typed.length < current.generated.length) {
        timeoutRef.current = setTimeout(() => {
          setTyped(current.generated.slice(0, typed.length + 1));
        }, TYPING_SPEED_MS);
      } else {
        setPhase("done");
      }
    } else {
      // done → pause, then next
      timeoutRef.current = setTimeout(() => {
        setExampleIdx((i) => (i + 1) % EXAMPLES.length);
        setTyped("");
        setPhase("analyzing");
      }, DONE_PAUSE_MS);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [phase, typed, exampleIdx, hasInteracted]);

  const current = EXAMPLES[exampleIdx];
  const charCount = typed.length;
  const wordCount = typed.trim() === "" ? 0 : typed.trim().split(/\s+/).length;
  const isWcagOk = charCount >= 80 && charCount <= 250;

  const switchTo = (i: number) => {
    setHasInteracted(true);
    clearTimeout(timeoutRef.current);
    setExampleIdx(i);
    setTyped(EXAMPLES[i].generated);
    setPhase("done");
  };

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">
            {current.label.toLowerCase().replace(/\s+/g, "-")}.jpg
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/10">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
            Gemini AI
          </div>
        </div>

        {/* Body: foto sinistra + panel alt text destra */}
        <div className="grid grid-cols-[42%_58%] h-[calc(100%-28px)]">
          {/* Foto */}
          <div className="relative bg-[#F5F5F5] dark:bg-[#1A1A1A]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="160px"
              className="object-cover"
            />
            {phase === "analyzing" && (
              <div className="absolute inset-0 bg-[#6366F1]/35 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                {/* Scanning line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" style={{ animation: "alttext-scan 0.7s ease-in-out infinite" }} />
                <Sparkles className="h-5 w-5 text-white drop-shadow" strokeWidth={2} />
                <span className="text-[10px] font-semibold text-white drop-shadow">Analyzing image…</span>
              </div>
            )}
          </div>

          {/* Panel alt text */}
          <div className="px-2.5 py-2 flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[9px] font-semibold text-[#737373] uppercase tracking-wide">Generated alt text</label>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 rounded transition-all duration-300",
                  phase === "done" && isWcagOk
                    ? "text-[#16A34A] bg-[#22C55E]/12 ring-1 ring-[#22C55E]/30"
                    : "text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#1E1E1E]"
                )}
              >
                <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                WCAG 2.1 AA
              </span>
            </div>

            <div className="flex-1 text-[10.5px] leading-[1.4] text-[#171717] dark:text-[#E5E5E5] font-normal min-h-0 relative">
              {typed}
              {phase === "typing" && (
                <span className="inline-block w-[1.5px] h-[11px] bg-[#6366F1] ml-px align-middle" style={{ animation: "alttext-cursor 0.9s steps(1) infinite" }} />
              )}
              {phase === "analyzing" && (
                <span className="text-[10px] text-[#A3A3A3] italic">Reading image content…</span>
              )}
            </div>

            {/* Mini progress while typing */}
            {phase === "typing" && (
              <div className="h-0.5 bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-100"
                  style={{ width: `${(charCount / current.generated.length) * 100}%` }}
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <span className="text-[8px] text-[#737373] tabular-nums">
                <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{charCount}</span> chars · <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold">{wordCount}</span> words
              </span>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded transition-all duration-300",
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
                    <span className="w-1 h-1 rounded-full bg-[#6366F1] animate-pulse" />
                    Working…
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chips below */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {EXAMPLES.map((ex, i) => {
          const active = i === exampleIdx;
          return (
            <button
              key={i}
              type="button"
              onClick={() => switchTo(i)}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#6366F1] bg-[#6366F1]/[0.08] text-[#4338CA]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              {ex.label}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes alttext-scan {
          0%, 100% { top: 20%; opacity: 0.4; }
          50% { top: 75%; opacity: 1; }
        }
        @keyframes alttext-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

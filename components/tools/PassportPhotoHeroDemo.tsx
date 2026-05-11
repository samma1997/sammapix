"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Scissors, Sparkles, CheckCircle2, Camera, Printer, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PassportPhoto hero demo — ritratto source → AI remove BG + crop a
 * passport size. Country preset chips che cambiano dimensione output.
 * Brand color #6366F1 indigo.
 */

type Country = {
  code: string;
  flag: string;
  name: string;
  width: number;  // mm
  height: number; // mm
};

const COUNTRIES: Country[] = [
  { code: "US", flag: "🇺🇸", name: "USA",   width: 51, height: 51 },
  { code: "UK", flag: "🇬🇧", name: "UK",    width: 35, height: 45 },
  { code: "IT", flag: "🇮🇹", name: "Italy", width: 35, height: 45 },
  { code: "JP", flag: "🇯🇵", name: "Japan", width: 35, height: 45 },
];

type Phase = "raw" | "removing-bg" | "cropping" | "done";
const ANALYZE_MS = 700;
const CROP_MS = 700;
const DONE_PAUSE_MS = 2200;

export default function PassportPhotoHeroDemo() {
  const [phase, setPhase] = useState<Phase>("raw");
  const [countryIdx, setCountryIdx] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "raw") {
      timeoutId = setTimeout(() => !cancelled && setPhase("removing-bg"), 500);
    } else if (phase === "removing-bg") {
      timeoutId = setTimeout(() => !cancelled && setPhase("cropping"), ANALYZE_MS);
    } else if (phase === "cropping") {
      timeoutId = setTimeout(() => !cancelled && setPhase("done"), CROP_MS);
    } else {
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setCountryIdx((c) => (c + 1) % COUNTRIES.length);
          setPhase("raw");
        }
      }, DONE_PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, hasInteracted]);

  const country = COUNTRIES[countryIdx];
  const isProcessing = phase === "removing-bg" || phase === "cropping";
  const isDone = phase === "done";
  const bgRemoved = phase === "cropping" || isDone;
  const dimText = `${country.width}×${country.height} mm`;
  // Aspect ratio dell'output passport (es. 35×45 = 0.778, 51×51 = 1.0)
  const outputAspect = country.width / country.height;

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
            {country.flag} {country.name} passport · {dimText}
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/12 dark:text-[#A5B4FC]">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
            AI
          </div>
        </div>

        {/* Body: input → output */}
        <div className="px-2.5 py-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 h-[calc(100%-28px)]">
          {/* Source portrait */}
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-full aspect-square rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
              <Image
                src="/demo/smartsort-portrait-woman.webp"
                alt="Source portrait photo"
                fill
                sizes="120px"
                className="object-cover"
              />
              {phase === "removing-bg" && (
                <div className="absolute inset-0 bg-[#6366F1]/30 backdrop-blur-[1px] flex items-center justify-center">
                  <Scissors className="h-4 w-4 text-white drop-shadow" strokeWidth={2.5} style={{ animation: "pp-spin 1s linear infinite" }} />
                </div>
              )}
            </div>
            <span className="text-[8px] font-semibold text-[#737373] uppercase tracking-wide">Source</span>
          </div>

          {/* Arrow + status */}
          <div className="flex flex-col items-center gap-0.5 text-center">
            {phase === "removing-bg" && (
              <>
                <Scissors className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} style={{ animation: "pp-spin 1s linear infinite" }} />
                <span className="text-[8px] font-bold text-[#6366F1]">BG</span>
              </>
            )}
            {phase === "cropping" && (
              <>
                <Camera className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} />
                <span className="text-[8px] font-bold text-[#6366F1]">Crop</span>
              </>
            )}
            {isDone && (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />
                <span className="text-[8px] font-bold text-[#16A34A]">Ready</span>
              </>
            )}
            {phase === "raw" && (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={2} />
                <span className="text-[8px] font-bold text-[#A3A3A3]">Auto</span>
              </>
            )}
            <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
          </div>

          {/* Output passport-cropped */}
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "relative rounded-md border-2 overflow-hidden bg-white transition-all duration-500",
                isDone ? "border-[#6366F1] shadow-md" : "border-dashed border-[#E5E5E5] dark:border-[#404040]"
              )}
              style={{ aspectRatio: outputAspect, width: outputAspect >= 1 ? "100%" : "auto", height: outputAspect < 1 ? "100%" : "auto", maxHeight: "85%" }}
            >
              {bgRemoved && (
                <Image
                  src="/demo/smartsort-portrait-woman.webp"
                  alt={`${country.name} passport photo result`}
                  fill
                  sizes="100px"
                  className="object-cover"
                  style={{ animation: phase === "cropping" ? "pp-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none" }}
                />
              )}
              {/* Crop guides */}
              {phase === "cropping" && (
                <>
                  <div className="absolute inset-0 ring-2 ring-[#6366F1]/50 ring-inset" />
                  <div className="absolute top-1 left-1 right-1 h-px bg-[#6366F1]/60" />
                  <div className="absolute bottom-1 left-1 right-1 h-px bg-[#6366F1]/60" />
                </>
              )}
              {/* Country watermark */}
              {isDone && (
                <div className="absolute top-1 right-1 z-10">
                  <span className="text-[10px] drop-shadow-sm">{country.flag}</span>
                </div>
              )}
            </div>
            <span className="text-[8px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums">{dimText}</span>
          </div>
        </div>

        {/* Bottom action */}
        <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Printer className="h-2.5 w-2.5 text-[#6366F1]" strokeWidth={2} />
            <span className="text-[#737373]">Print-ready 300 DPI</span>
          </span>
        </div>
      </div>

      {/* Country chips */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {COUNTRIES.map((c, i) => {
          const active = i === countryIdx;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setHasInteracted(true);
                setCountryIdx(i);
                setPhase("done");
              }}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#6366F1] bg-[#6366F1]/[0.08] text-[#4338CA] dark:text-[#A5B4FC]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              <span className="text-[11px]">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
        <span className="inline-flex items-center px-1.5 py-0.5 text-[9.5px] font-semibold rounded bg-[#6366F1]/10 text-[#4338CA] dark:text-[#A5B4FC]">
          +140 more
        </span>
      </div>

      <style jsx>{`
        @keyframes pp-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pp-pop {
          0% { transform: scale(0.85); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

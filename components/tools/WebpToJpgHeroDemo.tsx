"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, X, Sparkles, FileImage, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WebpToJpg hero demo — show conversion da .webp a .jpg con focus su
 * compatibility. Lista 6 software/contesti che inizialmente non supportano
 * WebP (Outlook, Photoshop CS6, ecc) e dopo la conversione tutti
 * diventano compatibili (check verde).
 *
 * Brand: #10B981 emerald
 */

type Compat = {
  name: string;
  /** Initial state: false = doesn't support WebP, true = supports */
  initial: boolean;
};

// Tutto inizia come "compatibility issue" sui WebP, diventa OK dopo conversione
const COMPAT: Compat[] = [
  { name: "Outlook 2019",          initial: false },
  { name: "Photoshop CS6",         initial: false },
  { name: "Email clients",         initial: false },
  { name: "WordPress (legacy)",    initial: false },
  { name: "Adobe Lightroom",       initial: false },
  { name: "iMessage",              initial: true },
];

const STEP_MS = 320;
const PAUSE_MS = 2400;

export default function WebpToJpgHeroDemo() {
  const [step, setStep] = useState(0); // 0 = idle, 1..N = unlocking compat[i-1], N+1 = done
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > COMPAT.length) {
          timeoutId = setTimeout(() => !cancelled && setStep(0), PAUSE_MS);
          return s;
        }
        timeoutId = setTimeout(tick, STEP_MS);
        return s + 1;
      });
    };
    timeoutId = setTimeout(tick, STEP_MS * 2);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [hasInteracted, step]);

  const isConverting = step >= 1 && step <= COMPAT.length;
  const isDone = step > COMPAT.length;
  // Compat status: dopo step k, i primi k items sono "convertito" (compatibili)
  const compatStatuses = COMPAT.map((c, i) => i < step || c.initial);
  const supportedCount = compatStatuses.filter(Boolean).length;
  const filename = "vacation-photo";

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">{filename}.webp → .jpg</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#047857] bg-[#10B981]/12 dark:text-[#34D399]">
            <ShieldCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
            Compatibility
          </div>
        </div>

        {/* Format cards: WebP → JPG */}
        <div className="px-3 py-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Source */}
          <div className={cn("relative px-2 py-1.5 rounded border transition-all duration-300", "border-[#10B981]/40 bg-[#10B981]/[0.04]")}>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[8.5px] font-bold px-1 py-0.5 rounded bg-[#10B981]/15 text-[#047857] dark:text-[#34D399]">WEBP</span>
              <span className="text-[8.5px] text-[#737373]">source</span>
            </div>
            <div className="text-[10px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
              {filename}.webp
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-0.5">
            {isConverting && (
              <Sparkles className="h-3 w-3 text-[#10B981]" strokeWidth={2} style={{ animation: "wtj-spin 1s linear infinite" }} />
            )}
            {isDone && <Check className="h-3 w-3 text-[#10B981]" strokeWidth={3} />}
            {!isConverting && !isDone && <FileImage className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />}
            <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
          </div>

          {/* Destination */}
          <div className={cn("relative px-2 py-1.5 rounded border transition-all duration-300", isDone || isConverting ? "border-[#10B981] bg-[#10B981]/[0.08] shadow-sm" : "border-[#E5E5E5] dark:border-[#2A2A2A]")}>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[8.5px] font-bold px-1 py-0.5 rounded bg-[#F97316]/15 text-[#9A3412] dark:text-[#FB923C]">JPG</span>
              <span className="text-[8.5px] text-[#737373]">output</span>
            </div>
            <div className="text-[10px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
              {filename}.jpg
            </div>
          </div>
        </div>

        {/* Compatibility check list */}
        <div className="px-3 pb-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[9px] font-semibold text-[#737373] uppercase tracking-wide">Now compatible with</span>
            <span className="text-[9px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
              {supportedCount}/{COMPAT.length}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1">
            {COMPAT.map((c, i) => {
              const supported = compatStatuses[i];
              const justUnlocked = i === step - 1 && isConverting;
              return (
                <div
                  key={c.name}
                  className={cn(
                    "flex items-center gap-1 px-1.5 py-1 rounded border transition-all duration-300",
                    supported
                      ? "border-[#10B981]/40 bg-[#10B981]/[0.06]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]",
                    justUnlocked && "scale-105"
                  )}
                  style={{
                    animation: justUnlocked ? "wtj-pop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
                  }}
                >
                  {supported ? (
                    <Check className="h-2.5 w-2.5 text-[#16A34A] flex-shrink-0" strokeWidth={3} />
                  ) : (
                    <X className="h-2.5 w-2.5 text-[#EF4444] flex-shrink-0" strokeWidth={3} />
                  )}
                  <span className={cn("text-[9.5px] font-medium truncate", supported ? "text-[#171717] dark:text-[#E5E5E5]" : "text-[#A3A3A3]")}>
                    {c.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Done banner */}
        {isDone && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 z-10 inline-flex items-center justify-center gap-1 text-[9px] font-bold px-1.5 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A]">
            <ShieldCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
            Universal JPG · works everywhere
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileImage className="h-2.5 w-2.5 text-[#10B981]" strokeWidth={2} />
        <span>Quality control · Batch up to 20 · Browser-only</span>
      </div>

      <style jsx>{`
        @keyframes wtj-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wtj-pop {
          0% { transform: scale(0.7); opacity: 0.4; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

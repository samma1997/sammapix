"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Type, CheckCircle2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Batchname hero demo — mock file list che viene rinominata pattern-by-pattern.
 * 6 file orig (IMG_4012.JPG, DSC_0089.JPG, ...), pattern input cycling tra
 * 3 presets (by date, by location, sequential), ogni file si rinomina in
 * sequenza con freccia animata.
 *
 * Brand color: #8B5CF6 (violet)
 */

type Preset = {
  label: string;
  pattern: string;
  /** Funzione che dato (origIdx) ritorna il rename */
  rename: (i: number) => string;
};

const ORIG_FILES = [
  "IMG_4012.JPG",
  "DSC_0089.JPG",
  "IMG_4013.JPG",
  "DSC_0090.JPG",
  "IMG_4014.JPG",
  "DSC_0091.JPG",
];

// Date diverse per ogni file (simulate EXIF)
const DATES = ["2026-08-15", "2026-08-15", "2026-08-16", "2026-08-17", "2026-08-17", "2026-08-18"];
const LOCS  = ["Florence", "Florence", "Siena", "Pisa",     "Pisa",     "Rome"];

const PRESETS: Preset[] = [
  {
    label: "By date",
    pattern: "Tuscany_{date}_{nnn}",
    rename: (i) => `Tuscany_${DATES[i]}_${String(i + 1).padStart(3, "0")}.jpg`,
  },
  {
    label: "By location",
    pattern: "{loc}_{nnn}",
    rename: (i) => `${LOCS[i]}_${String(i + 1).padStart(3, "0")}.jpg`,
  },
  {
    label: "Sequential",
    pattern: "Vacation_{nnn}",
    rename: (i) => `Vacation_${String(i + 1).padStart(3, "0")}.jpg`,
  },
];

const STEP_MS = 360;
const PAUSE_MS = 2200;

export default function BatchnameHeroDemo() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [step, setStep] = useState(0); // 0..N where N = ORIG_FILES.length, then pause
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s >= ORIG_FILES.length) {
          // pausa, poi next preset
          timeoutId = setTimeout(() => {
            if (!cancelled) {
              setPresetIdx((p) => (p + 1) % PRESETS.length);
              setStep(0);
            }
          }, PAUSE_MS);
          return s;
        }
        timeoutId = setTimeout(tick, STEP_MS);
        return s + 1;
      });
    };
    timeoutId = setTimeout(tick, STEP_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [hasInteracted, step, presetIdx]);

  const preset = PRESETS[presetIdx];
  const isAllDone = step >= ORIG_FILES.length;

  const switchPreset = (i: number) => {
    setHasInteracted(true);
    setPresetIdx(i);
    setStep(ORIG_FILES.length);
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
            {ORIG_FILES.length} files selected
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#5B21B6] bg-[#8B5CF6]/12 dark:text-[#C4B5FD] dark:bg-[#5B21B6]/30">
            <Pencil className="h-2.5 w-2.5" strokeWidth={2.5} />
            {preset.label}
          </div>
        </div>

        {/* Pattern input field */}
        <div className="px-2.5 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A] flex items-center gap-2">
          <Type className="h-3 w-3 text-[#8B5CF6]" strokeWidth={2} />
          <span className="text-[9px] font-semibold text-[#737373] uppercase tracking-wide">Pattern</span>
          <code key={preset.pattern} className="text-[10px] font-mono text-[#171717] dark:text-[#E5E5E5] flex-1 truncate" style={{ animation: "batchname-fade 0.4s ease-out" }}>
            {preset.pattern}
          </code>
        </div>

        {/* File list */}
        <div className="px-1.5 py-1 overflow-hidden h-[calc(100%-78px)]">
          <div className="grid grid-cols-[1fr_auto_1.4fr] gap-x-1.5 text-[9.5px] font-mono">
            {ORIG_FILES.map((orig, i) => {
              const renamed = preset.rename(i);
              const done = i < step;
              const active = i === step - 1 && !isAllDone;
              return (
                <div
                  key={i}
                  className={cn(
                    "contents",
                  )}
                >
                  <div
                    className={cn(
                      "px-1.5 py-1 rounded truncate transition-all duration-300",
                      active && "bg-[#8B5CF6]/10",
                      done && "text-[#A3A3A3] line-through",
                      !done && !active && "text-[#525252]"
                    )}
                  >
                    {orig}
                  </div>
                  <div className="flex items-center text-[#A3A3A3]">
                    <ArrowRight className={cn("h-2.5 w-2.5 transition-all duration-300", active ? "text-[#8B5CF6]" : done ? "text-[#16A34A]" : "text-[#D4D4D4]")} strokeWidth={2.5} />
                  </div>
                  <div
                    className={cn(
                      "px-1.5 py-1 rounded truncate transition-all duration-300",
                      done
                        ? "text-[#5B21B6] dark:text-[#C4B5FD] font-semibold"
                        : active
                        ? "bg-[#8B5CF6]/15 text-[#5B21B6] dark:text-[#C4B5FD] font-semibold"
                        : "text-[#A3A3A3]"
                    )}
                  >
                    {done || active ? renamed : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom counter */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-2 px-2 py-1 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
          {isAllDone && <CheckCircle2 className="h-3 w-3 text-[#16A34A]" strokeWidth={2.5} />}
          <span className="text-[10px] font-semibold tabular-nums text-[#171717] dark:text-[#E5E5E5]">
            {Math.min(step, ORIG_FILES.length)}/{ORIG_FILES.length}
          </span>
          <span className="text-[8px] text-[#737373] uppercase tracking-wide">renamed</span>
        </div>
      </div>

      {/* Preset chips */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {PRESETS.map((p, i) => {
          const active = i === presetIdx;
          return (
            <button
              key={i}
              type="button"
              onClick={() => switchPreset(i)}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.08] text-[#5B21B6] dark:text-[#C4B5FD]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes batchname-fade {
          0% { opacity: 0.3; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

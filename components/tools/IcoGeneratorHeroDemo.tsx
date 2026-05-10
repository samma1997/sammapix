"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Download, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * IcoGenerator hero demo — source image che genera multi-size favicon
 * (16, 32, 48, 64, 128, 256). Ogni size appare in sequenza con scale-pop.
 * Mock browser tab in basso mostra il favicon installato.
 *
 * Brand color #EAB308 yellow
 */

const SIZES = [16, 32, 48, 64, 128, 256];
const STEP_MS = 280;
const PAUSE_MS = 2200;

type Source = {
  src: string;
  label: string;
};

const SOURCES: Source[] = [
  { src: "/demo/cull-italy.webp",    label: "tuscany.jpg" },
  { src: "/demo/cull-japan.webp",    label: "torii.jpg" },
  { src: "/demo/cull-thailand.webp", label: "phi-phi.jpg" },
];

export default function IcoGeneratorHeroDemo() {
  const [sourceIdx, setSourceIdx] = useState(0);
  const [step, setStep] = useState(0); // 0 = idle, 1..N = generating size i, N+1 = done
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > SIZES.length) {
          timeoutId = setTimeout(() => {
            if (!cancelled) {
              setSourceIdx((i) => (i + 1) % SOURCES.length);
              setStep(0);
            }
          }, PAUSE_MS);
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
  }, [hasInteracted, step, sourceIdx]);

  const source = SOURCES[sourceIdx];
  const generated = SIZES.slice(0, Math.min(step, SIZES.length));
  const isDone = step > SIZES.length;
  const totalKB = generated.reduce((sum, sz) => sum + Math.round((sz * sz * 4) / 1024 * 0.4), 0);

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
          <span className="text-[10px] font-medium text-[#737373] ml-1 truncate">{source.label}</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#854D0E] bg-[#EAB308]/15 dark:text-[#FCD34D]">
            <Star className="h-2.5 w-2.5" strokeWidth={2.5} fill="currentColor" />
            favicon.ico
          </div>
        </div>

        {/* Body: source + generated grid */}
        <div className="px-2.5 py-2 grid grid-rows-[auto_1fr_auto] gap-2 h-[calc(100%-28px)]">
          {/* Source preview */}
          <div className="flex items-center gap-2 px-2 py-1.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
            <div className="relative w-10 h-10 rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] flex-shrink-0">
              <Image src={source.src} alt={`Source: ${source.label}`} fill sizes="40px" className="object-cover" />
              {step > 0 && step <= SIZES.length && (
                <div className="absolute inset-0 bg-[#EAB308]/30 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white drop-shadow" strokeWidth={2.5} style={{ animation: "ico-spin 1s linear infinite" }} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-semibold text-[#737373] uppercase tracking-wide">Source</div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">{source.label}</div>
            </div>
            <div className="text-[9px] font-bold text-[#EAB308] tabular-nums">
              {generated.length}/{SIZES.length}
            </div>
          </div>

          {/* Generated sizes grid */}
          <div className="flex flex-wrap items-end gap-2 content-center justify-center">
            {SIZES.map((sz, i) => {
              const ready = i < step;
              const fresh = i === step - 1 && step <= SIZES.length;
              // Scale display size: 16→16px, 32→24px, 48→30px, 64→36px, 128→44px, 256→52px
              const displayPx = Math.min(16 + i * 7, 56);
              return (
                <div
                  key={sz}
                  className="flex flex-col items-center gap-0.5"
                  style={{
                    animation: fresh ? "ico-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
                  }}
                >
                  <div
                    className={cn(
                      "relative rounded overflow-hidden border transition-all duration-300",
                      ready
                        ? fresh
                          ? "border-[#EAB308] ring-2 ring-[#EAB308]/30"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A]"
                        : "border-dashed border-[#E5E5E5] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    )}
                    style={{ width: `${displayPx}px`, height: `${displayPx}px` }}
                  >
                    {ready && <Image src={source.src} alt={`${sz}×${sz} favicon`} fill sizes={`${displayPx}px`} className="object-cover" />}
                  </div>
                  <span className={cn("text-[8px] font-bold tabular-nums leading-none", ready ? "text-[#854D0E] dark:text-[#FCD34D]" : "text-[#A3A3A3]")}>
                    {sz}px
                  </span>
                </div>
              );
            })}
          </div>

          {/* Browser tab mock */}
          <div className="rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A] px-1.5 py-1 flex items-center gap-1.5">
            {/* Tab with favicon */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-t bg-white dark:bg-[#171717] border border-b-0 border-[#E5E5E5] dark:border-[#2A2A2A] -mb-1.5 max-w-[180px]">
              <div className="relative w-3 h-3 rounded-sm overflow-hidden flex-shrink-0">
                {generated.length > 0 ? (
                  <Image src={source.src} alt="Tab favicon" fill sizes="12px" className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#E5E5E5] dark:bg-[#404040]" />
                )}
              </div>
              <span className="text-[9px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">Travel Blog · 2026</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[8.5px] text-[#737373] tabular-nums">
                <span className="font-bold text-[#171717] dark:text-[#E5E5E5]">{totalKB}</span> KB
              </span>
              {isDone ? (
                <button className="inline-flex items-center gap-0.5 text-[9px] font-bold text-white bg-[#EAB308] hover:bg-[#CA8A04] px-1.5 py-0.5 rounded shadow-sm">
                  <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
                  .ico
                </button>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#737373]">
                  <Sparkles className="h-2.5 w-2.5 text-[#EAB308]" strokeWidth={2} />
                  Building…
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Star className="h-2.5 w-2.5 text-[#EAB308]" strokeWidth={2} fill="#EAB308" />
        <span>PNG · SVG · JPG · WebP · GIF source · 6 sizes in 1 .ico</span>
      </div>

      <style jsx>{`
        @keyframes ico-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ico-pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Maximize2, FileImage, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SvgToPng hero demo — SVG logo vector preview a sinistra che viene
 * rasterizzato in 5 PNG output di size diversi (512, 1024, 2048, 4096,
 * 8192). Ogni size appare in sequenza con scale-pop.
 *
 * Brand color #F97316 orange
 */

const SIZES = [512, 1024, 2048, 4096, 8192];
const STEP_MS = 320;
const PAUSE_MS = 2400;

/** Sample SVG logo — abstract S mark with gradient */
function LogoSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="svg2png-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" rx="20" fill="url(#svg2png-grad)" />
      <path
        d="M30 35 Q30 22 50 22 Q70 22 70 35 Q70 45 55 50 Q40 55 40 65 Q40 78 60 78 Q75 78 75 65"
        stroke="#FFFFFF"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function SvgToPngHeroDemo() {
  const [step, setStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > SIZES.length) {
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

  const isDone = step > SIZES.length;
  const rendered = Math.min(step, SIZES.length);

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
          <span className="text-[10px] font-medium text-[#737373] ml-1 truncate">brand-logo.svg</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#9A3412] bg-[#F97316]/12 dark:text-[#FB923C]">
            <Maximize2 className="h-2.5 w-2.5" strokeWidth={2.5} />
            up to 8192px
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 grid grid-cols-[auto_1fr] gap-3 h-[calc(100%-28px)] items-center">
          {/* Source SVG */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="relative w-16 h-16 rounded-md border-2 border-[#F97316]/40 bg-white p-1.5">
              <LogoSvg className="w-full h-full" />
              {step > 0 && step <= SIZES.length && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#F97316] flex items-center justify-center shadow-sm">
                  <Sparkles className="h-3 w-3 text-white" strokeWidth={2.5} style={{ animation: "s2p-spin 1s linear infinite" }} />
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-[9px] font-bold text-[#9A3412] dark:text-[#FB923C] uppercase tracking-wide">SVG</div>
              <div className="text-[8px] text-[#737373]">vector</div>
            </div>
          </div>

          {/* PNG outputs stack with different sizes */}
          <div className="flex-1 flex flex-col gap-1">
            {SIZES.map((size, i) => {
              const ready = i < step;
              const fresh = i === step - 1 && step <= SIZES.length;
              // Display width proportional to size (but bounded): 512=40%, ... 8192=100%
              const widthPct = 30 + (i / (SIZES.length - 1)) * 70;
              return (
                <div
                  key={size}
                  className="flex items-center gap-1.5"
                  style={{
                    animation: fresh ? "s2p-slide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
                  }}
                >
                  <div
                    className={cn(
                      "relative h-6 rounded border flex items-center px-1.5 transition-all duration-300 overflow-hidden",
                      ready ? "border-[#F97316]/40 bg-[#FFF7ED] dark:bg-[#7C2D12]/15" : "border-dashed border-[#E5E5E5] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    )}
                    style={{ width: `${widthPct}%` }}
                  >
                    {/* Checkerboard hint for transparency */}
                    {ready && (
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: "linear-gradient(45deg, #E5E5E5 25%, transparent 25%), linear-gradient(-45deg, #E5E5E5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E5E5E5 75%), linear-gradient(-45deg, transparent 75%, #E5E5E5 75%)",
                          backgroundSize: "8px 8px",
                          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                        }}
                      />
                    )}
                    {ready && (
                      <div className="relative flex items-center gap-1.5 z-10">
                        <LogoSvg className="w-4 h-4" />
                        <span className="text-[9.5px] font-bold text-[#9A3412] dark:text-[#FB923C] tabular-nums">
                          {size}×{size}
                        </span>
                      </div>
                    )}
                    {!ready && (
                      <span className="text-[9px] text-[#A3A3A3] tabular-nums">{size}×{size}</span>
                    )}
                  </div>
                  {ready && (
                    <span className="text-[8px] font-mono text-[#737373] tabular-nums flex-shrink-0">
                      .png
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom action */}
        <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1.5">
          {isDone ? (
            <button className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-[#F97316] hover:bg-[#EA580C] px-1.5 py-0.5 rounded shadow-sm">
              <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
              ZIP
            </button>
          ) : null}
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A]">
            {isDone && <CheckCircle2 className="h-3 w-3 text-[#22C55E]" strokeWidth={2.5} />}
            <span className="text-[10px] font-semibold tabular-nums text-[#171717] dark:text-[#E5E5E5]">
              {rendered}/{SIZES.length}
            </span>
            <span className="text-[8px] text-[#737373] uppercase tracking-wide">sizes</span>
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileImage className="h-2.5 w-2.5 text-[#F97316]" strokeWidth={2} />
        <span>Transparency preserved · Up to 8192×8192 · Batch up to 20</span>
      </div>

      <style jsx>{`
        @keyframes s2p-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes s2p-slide {
          0% { transform: translateX(-20px); opacity: 0; }
          70% { transform: translateX(2px); opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Globe, Sparkles, Minimize2, FileImage, Tag, CheckCircle2, Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * WebLift hero demo — pipeline 3-step visualization. Foto input → step 1
 * Compress → step 2 WebP convert → step 3 AI rename → output finale con
 * nome AI-generated + size ridotta + badge .webp.
 *
 * Brand color #3B82F6 blue
 */

const STEPS = [
  { id: "compress", label: "Compress", Icon: Minimize2 },
  { id: "webp",     label: "WebP",     Icon: FileImage },
  { id: "rename",   label: "AI Rename", Icon: Tag },
] as const;

type Sample = {
  src: string;
  origName: string;
  origSize: number;  // KB
  finalName: string;
  finalSize: number; // KB
};

const SAMPLES: Sample[] = [
  { src: "/demo/cull-italy.webp",    origName: "IMG_4012.jpg",  origSize: 3420, finalName: "tuscany-villa-golden-hour.webp", finalSize: 412 },
  { src: "/demo/cull-japan.webp",    origName: "DSC_8821.jpg",  origSize: 2890, finalName: "torii-mt-fuji-spring.webp",      finalSize: 356 },
  { src: "/demo/cull-thailand.webp", origName: "IMG_5103.jpg",  origSize: 4128, finalName: "phi-phi-longtail-boat.webp",     finalSize: 487 },
];

const STEP_MS = 800;
const PAUSE_MS = 2400;

function formatKB(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export default function WebliftHeroDemo() {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [stepDone, setStepDone] = useState(0); // 0..3
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStepDone((s) => {
        if (s >= STEPS.length) {
          // done → pausa poi cambia sample
          timeoutId = setTimeout(() => {
            if (!cancelled) {
              setSampleIdx((i) => (i + 1) % SAMPLES.length);
              setStepDone(0);
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
  }, [hasInteracted, stepDone, sampleIdx]);

  const sample = SAMPLES[sampleIdx];
  const isDone = stepDone >= STEPS.length;
  const compressedSize = stepDone >= 1 ? sample.origSize * 0.45 : sample.origSize;
  const webpSize = stepDone >= 2 ? sample.finalSize : compressedSize;
  const currentName = stepDone >= 3 ? sample.finalName : sample.origName;
  const currentSize = isDone ? sample.finalSize : Math.round(webpSize);
  const savedPct = Math.round(((sample.origSize - currentSize) / sample.origSize) * 100);

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">WebLift Pipeline</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#1E40AF] bg-[#3B82F6]/12 dark:text-[#93C5FD]">
            <Globe className="h-2.5 w-2.5" strokeWidth={2.5} />
            Web-ready
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 grid grid-rows-[1fr_auto_auto] gap-2 h-[calc(100%-28px)]">
          {/* Photo preview con filename overlay */}
          <div className="relative rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Image
              src={sample.src}
              alt="WebLift pipeline source"
              fill
              sizes="360px"
              className={cn("object-cover transition-all duration-500", isDone && "saturate-110")}
            />
            {/* Top: filename + size badge */}
            <div className="absolute top-1.5 left-1.5 right-1.5 z-10 flex items-center justify-between gap-2">
              <span
                key={currentName}
                className={cn("inline-flex items-center text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded backdrop-blur-md text-white shadow-sm truncate max-w-[60%]", isDone ? "bg-[#3B82F6]/90" : "bg-black/60")}
                style={{ animation: stepDone === 3 ? "wl-fade 0.5s ease-out" : "none" }}
              >
                {currentName}
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-md bg-white/90 text-[#171717] shadow-sm">
                <span className="tabular-nums">{formatKB(currentSize)}</span>
                {savedPct > 0 && (
                  <span className="text-[8px] font-bold text-[#16A34A]">-{savedPct}%</span>
                )}
              </span>
            </div>
            {/* Working overlay */}
            {!isDone && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-1.5 px-1.5 z-10">
                <div className="flex items-center gap-1.5 text-[9px] font-semibold text-white">
                  <Sparkles className="h-2.5 w-2.5 text-[#3B82F6]" strokeWidth={2.5} style={{ animation: "wl-spin 1s linear infinite" }} />
                  <span>
                    {stepDone < STEPS.length ? `Step ${stepDone + 1}/${STEPS.length}: ${STEPS[stepDone].label}…` : "Processing…"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Pipeline 3 steps */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-0.5">
            {STEPS.map((s, i) => {
              const done = i < stepDone;
              const active = i === stepDone && !isDone;
              return (
                <>
                  <div
                    key={s.id}
                    className={cn(
                      "flex items-center gap-1.5 px-1.5 py-1.5 rounded border transition-all duration-300",
                      done
                        ? "border-[#22C55E]/40 bg-[#22C55E]/[0.06]"
                        : active
                        ? "border-[#3B82F6] bg-[#3B82F6]/[0.08] scale-[1.04] shadow-sm"
                        : "border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-3 w-3 text-[#16A34A] flex-shrink-0" strokeWidth={2.5} />
                    ) : active ? (
                      <s.Icon className="h-3 w-3 text-[#3B82F6] flex-shrink-0" strokeWidth={2} style={{ animation: "wl-spin 1s linear infinite" }} />
                    ) : (
                      <s.Icon className="h-3 w-3 text-[#A3A3A3] flex-shrink-0" strokeWidth={2} />
                    )}
                    <span className={cn("text-[9px] font-semibold truncate", done ? "text-[#16A34A]" : active ? "text-[#1E40AF]" : "text-[#A3A3A3]")}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ArrowRight key={`arrow-${i}`} className={cn("h-3 w-3 transition-colors", done ? "text-[#16A34A]" : "text-[#A3A3A3]")} strokeWidth={2.5} />
                  )}
                </>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span className="inline-flex items-center gap-1 text-[8.5px] text-[#737373]">
              <Globe className="h-2.5 w-2.5 text-[#3B82F6]" strokeWidth={2} />
              <span>Web-optimized in 1 click</span>
            </span>
            {isDone && (
              <button className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] px-1.5 py-0.5 rounded shadow-sm">
                <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
                ZIP
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Globe className="h-2.5 w-2.5 text-[#3B82F6]" strokeWidth={2} />
        <span>3 steps in 1 click · Bulk batch · WebP · SEO-friendly filenames</span>
      </div>

      <style jsx>{`
        @keyframes wl-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wl-fade {
          0% { opacity: 0; transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

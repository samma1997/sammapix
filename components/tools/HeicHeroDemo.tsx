"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, CheckCircle2, Smartphone, FileImage, Apple, Monitor, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HEIC hero demo — iPhone Photos style mockup sx con HEIC thumb,
 * conversion arrow, JPG output card dx, lista platform compatibility
 * che si sblocca progressivamente.
 *
 * Brand: #6366F1 indigo
 */

type Platform = {
  name: string;
  Icon: typeof Apple;
};

const PLATFORMS: Platform[] = [
  { name: "iPhone",   Icon: Apple },
  { name: "Windows",  Icon: Monitor },
  { name: "WhatsApp", Icon: MessageCircle },
  { name: "Gmail",    Icon: Mail },
];

const HEIC_PHOTOS = [
  { src: "/demo/cull-italy.webp",    name: "IMG_4012.heic" },
  { src: "/demo/cull-japan.webp",    name: "IMG_4287.heic" },
  { src: "/demo/cull-thailand.webp", name: "IMG_4501.heic" },
  { src: "/demo/cull-france.webp",   name: "IMG_4612.heic" },
];

const STEP_MS = 700;
const PAUSE_MS = 2200;

type Phase = "idle" | "converting" | "done";

export default function HeicHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0); // photos converted (0..N)
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      timeoutId = setTimeout(() => !cancelled && setPhase("converting"), 600);
    } else if (phase === "converting") {
      if (step < HEIC_PHOTOS.length) {
        timeoutId = setTimeout(() => !cancelled && setStep((s) => s + 1), STEP_MS);
      } else {
        setPhase("done");
      }
    } else {
      // done → reset after pause
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setStep(0);
          setPhase("idle");
        }
      }, PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, step, hasInteracted]);

  const isDone = phase === "done";
  const converting = phase === "converting" && step < HEIC_PHOTOS.length ? HEIC_PHOTOS[step] : null;

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
            iPhone Photos · {HEIC_PHOTOS.length} HEIC selected
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#4338CA] bg-[#6366F1]/12 dark:text-[#A5B4FC]">
            <Smartphone className="h-2.5 w-2.5" strokeWidth={2.5} />
            iOS
          </div>
        </div>

        {/* Body: iPhone-style strip + arrow + JPG card */}
        <div className="px-2.5 py-2 grid grid-rows-[auto_auto_1fr] gap-2 h-[calc(100%-28px)]">
          {/* HEIC photos + arrow + JPG output */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Source: iPhone-like strip with HEIC photos */}
            <div className="relative px-1.5 py-1.5 rounded-lg border border-[#6366F1]/40 bg-[#6366F1]/[0.04]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-[#6366F1]/15 text-[#4338CA] dark:text-[#A5B4FC]">HEIC</span>
                <span className="text-[8px] text-[#737373]">iPhone</span>
              </div>
              <div className="grid grid-cols-4 gap-0.5">
                {HEIC_PHOTOS.map((p, i) => {
                  const isConverting = converting === p;
                  const done = i < step;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "relative aspect-square rounded overflow-hidden border transition-all duration-300",
                        isConverting && "ring-2 ring-[#6366F1] ring-offset-1 z-10",
                        done && "opacity-30",
                        !done && !isConverting && "border-[#E5E5E5] dark:border-[#2A2A2A]"
                      )}
                    >
                      <Image src={p.src} alt={`HEIC: ${p.name}`} fill sizes="32px" className="object-cover" />
                      {isConverting && (
                        <div className="absolute inset-0 bg-[#6366F1]/40 backdrop-blur-[1px] flex items-center justify-center">
                          <Sparkles className="h-3 w-3 text-white drop-shadow" strokeWidth={2.5} style={{ animation: "heic-spin 0.9s linear infinite" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-0.5">
              {phase === "converting" && <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={2} style={{ animation: "heic-spin 1.2s linear infinite" }} />}
              {phase === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />}
              {phase === "idle" && <FileImage className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={2} />}
              <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
            </div>

            {/* Destination JPG */}
            <div className={cn("relative px-1.5 py-1.5 rounded-lg border transition-all duration-300", isDone ? "border-[#F97316] bg-[#FFF7ED] dark:bg-[#7C2D12]/15 shadow-sm" : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]")}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-[#F97316]/15 text-[#9A3412] dark:text-[#FB923C]">JPG</span>
                <span className="text-[8px] text-[#737373] tabular-nums">{step}/{HEIC_PHOTOS.length}</span>
              </div>
              <div className="grid grid-cols-4 gap-0.5">
                {HEIC_PHOTOS.map((p, i) => {
                  const ready = i < step;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "relative aspect-square rounded overflow-hidden border transition-all duration-300",
                        ready ? "border-[#F97316]/40" : "border-dashed border-[#E5E5E5] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                      )}
                    >
                      {ready && <Image src={p.src} alt={`JPG: ${p.name.replace(".heic", ".jpg")}`} fill sizes="32px" className="object-cover" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Conversion banner */}
          <div className={cn("rounded px-2 py-1 text-[10px] flex items-center gap-1.5 transition-colors duration-200", converting ? "bg-[#6366F1]/8 border border-[#6366F1]/30" : isDone ? "bg-[#22C55E]/10 border border-[#22C55E]/30" : "bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A]")}>
            {converting ? (
              <>
                <Sparkles className="h-3 w-3 text-[#6366F1] flex-shrink-0" strokeWidth={2} style={{ animation: "heic-spin 1s linear infinite" }} />
                <span className="font-mono text-[#171717] dark:text-[#E5E5E5] truncate">{converting.name}</span>
                <span className="text-[#6366F1]">→</span>
                <span className="font-semibold text-[#9A3412] dark:text-[#FB923C]">{converting.name.replace(".heic", ".jpg")}</span>
              </>
            ) : isDone ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-[#22C55E] flex-shrink-0" strokeWidth={2.5} />
                <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">Universal compatibility unlocked</span>
                <span className="ml-auto text-[9px] text-[#737373]">ZIP ready</span>
              </>
            ) : (
              <>
                <Smartphone className="h-3 w-3 text-[#A3A3A3] flex-shrink-0" strokeWidth={2} />
                <span className="text-[#737373]">Drop HEIC files from your iPhone…</span>
              </>
            )}
          </div>

          {/* Compatibility platforms grid */}
          <div className="grid grid-cols-4 gap-1 content-start">
            {PLATFORMS.map((plat, i) => {
              const supported = isDone || (i === 0 && phase !== "idle"); // iPhone always supports HEIC
              const justUnlocked = step >= 2 && i === 1 && phase === "converting"; // Windows unlock at step 2
              return (
                <div
                  key={plat.name}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-1 py-1 rounded border transition-all duration-300",
                    supported
                      ? "border-[#22C55E]/40 bg-[#22C55E]/[0.06]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]",
                    justUnlocked && "scale-105"
                  )}
                >
                  <plat.Icon className={cn("h-3 w-3", supported ? "text-[#16A34A]" : "text-[#A3A3A3]")} strokeWidth={2} />
                  <span className={cn("text-[8.5px] font-medium", supported ? "text-[#171717] dark:text-[#E5E5E5]" : "text-[#A3A3A3]")}>
                    {plat.name}
                  </span>
                  {supported && (
                    <CheckCircle2 className="h-2.5 w-2.5 text-[#16A34A]" strokeWidth={2.5} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Smartphone className="h-2.5 w-2.5 text-[#6366F1]" strokeWidth={2} />
        <span>iPhone HEIC → JPG · WebP · PNG · Batch up to 20</span>
      </div>

      <style jsx>{`
        @keyframes heic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

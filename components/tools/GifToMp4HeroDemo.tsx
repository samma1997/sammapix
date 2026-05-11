"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Film, Sparkles, CheckCircle2, Cpu, Play, TrendingDown, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GifToMp4 hero demo — pattern compression card + mini-player con frame
 * counter live durante "encoding". 3 esempi cycling GIF → MP4 con savings
 * 80-90%. Brand color #EC4899 pink.
 */

type Conversion = {
  filename: string;
  fromSize: number;
  toSize: number;
  duration: string;  // 0:05
  frames: number;
};

const CONVERSIONS: Conversion[] = [
  { filename: "dance-loop",       fromSize: 8412, toSize: 1108, duration: "0:05", frames: 120 },
  { filename: "meme-reaction",    fromSize: 3245, toSize: 412,  duration: "0:03", frames: 72 },
  { filename: "screen-capture",   fromSize: 12_580, toSize: 1547, duration: "0:08", frames: 192 },
];

const ANALYZE_MS = 500;
const ENCODE_MS = 1100;
const DONE_PAUSE_MS = 2000;

type Phase = "analyzing" | "encoding" | "done";

function formatKB(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`;
}

export default function GifToMp4HeroDemo() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("analyzing");
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "analyzing") {
      timeoutId = setTimeout(() => !cancelled && setPhase("encoding"), ANALYZE_MS);
    } else if (phase === "encoding") {
      const start = Date.now();
      const tick = () => {
        if (cancelled) return;
        const p = Math.min((Date.now() - start) / ENCODE_MS, 1);
        setProgress(p);
        if (p < 1) {
          timeoutId = setTimeout(tick, 16);
        } else {
          setPhase("done");
        }
      };
      tick();
    } else {
      timeoutId = setTimeout(() => {
        if (!cancelled) {
          setIdx((i) => (i + 1) % CONVERSIONS.length);
          setProgress(0);
          setPhase("analyzing");
        }
      }, DONE_PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, idx, hasInteracted]);

  const current = CONVERSIONS[idx];
  const compressedSize = current.fromSize - (current.fromSize - current.toSize) * progress;
  const finalPct = Math.round(((current.fromSize - current.toSize) / current.fromSize) * 100);
  const liveSavedPct = Math.round(((current.fromSize - compressedSize) / current.fromSize) * 100);
  const isDone = phase === "done";
  const framesProcessed = phase === "analyzing" ? 0 : Math.floor(current.frames * progress);
  const fps = isDone ? 24 : Math.min(60, 18 + Math.floor(progress * 10));

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
            {current.filename}.gif
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#9D174D] bg-[#EC4899]/12 dark:text-[#F9A8D4]">
            <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.5} />
            -{finalPct}%
          </div>
        </div>

        <div className="px-3 py-2.5 flex flex-col h-[calc(100%-28px)] gap-2 justify-center">
          {/* Source GIF + arrow + MP4 destination */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* Source GIF */}
            <div className="relative px-2 py-1.5 rounded border border-[#F97316]/40 bg-[#F97316]/[0.04]">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#F97316]/15 text-[#9A3412] dark:text-[#FB923C]">GIF</span>
                <span className="text-[9px] text-[#737373]">source</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {current.filename}.gif
              </div>
              <div className="text-[10px] text-[#737373] tabular-nums mt-0.5">
                {formatKB(current.fromSize)} · {current.frames}f
              </div>
            </div>

            {/* Arrow + status */}
            <div className="flex flex-col items-center gap-0.5">
              {phase === "analyzing" && <Cpu className="h-3.5 w-3.5 text-[#EC4899] animate-pulse" strokeWidth={2} />}
              {phase === "encoding" && <Sparkles className="h-3.5 w-3.5 text-[#EC4899]" strokeWidth={2} style={{ animation: "gtm-spin 1.2s linear infinite" }} />}
              {phase === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2.5} />}
              <ArrowRight className="h-3 w-3 text-[#A3A3A3]" strokeWidth={2} />
            </div>

            {/* Destination MP4 */}
            <div className={cn("relative px-2 py-1.5 rounded border transition-all duration-300", isDone ? "border-[#EC4899] bg-[#FDF2F8] dark:bg-[#831843]/15 shadow-sm" : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]")}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#EC4899]/15 text-[#9D174D] dark:text-[#F9A8D4]">MP4</span>
                <span className="text-[9px] text-[#737373]">output</span>
              </div>
              <div className="text-[10.5px] font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
                {current.filename}.mp4
              </div>
              <div className="text-[10px] text-[#737373] tabular-nums mt-0.5 flex items-center gap-1">
                <span>{phase === "analyzing" ? "—" : formatKB(Math.round(compressedSize))}</span>
                {phase !== "analyzing" && (
                  <span className="inline-flex items-center text-[8.5px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-1 rounded">
                    -{phase === "done" ? finalPct : liveSavedPct}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mini-player with frame counter */}
          <div className="rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-gradient-to-br from-[#1F2937] to-[#111827] px-2 py-1.5 flex items-center gap-2">
            <div className={cn("flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center", isDone ? "bg-[#EC4899]" : "bg-white/15")}>
              <Play className={cn("h-3 w-3 ml-0.5", isDone ? "text-white" : "text-white/60")} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[9px] text-white/90 mb-0.5">
                <span className="font-mono">
                  {phase === "analyzing" ? "0:00" : `${Math.floor(progress * parseInt(current.duration.split(":")[1]))}s`} / {current.duration}
                </span>
                <span className="text-white/40">·</span>
                <span className="font-mono tabular-nums">
                  {framesProcessed}/{current.frames} frames
                </span>
                <span className="ml-auto text-[#F9A8D4] font-bold tabular-nums">{fps} fps</span>
              </div>
              {/* Progress track */}
              <div className="h-1 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#EC4899] to-[#F9A8D4] transition-all duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
            <Volume2 className="h-3 w-3 text-white/40 flex-shrink-0" strokeWidth={2} />
          </div>

          {/* Compression bars */}
          <div className="space-y-1 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-[#9A3412] dark:text-[#FB923C] w-9 tabular-nums">GIF</span>
              <div className="flex-1 h-2 rounded bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
                <div className="h-full rounded" style={{ width: "100%", background: "linear-gradient(90deg, #F97316, #FB923C)" }} />
              </div>
              <span className="text-[8.5px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums w-12 text-right">
                {formatKB(current.fromSize)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8.5px] font-semibold text-[#9D174D] dark:text-[#F9A8D4] w-9 tabular-nums">MP4</span>
              <div className="flex-1 h-2 rounded bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-100"
                  style={{
                    width: phase === "analyzing" ? "100%" : `${(compressedSize / current.fromSize) * 100}%`,
                    background: phase === "analyzing"
                      ? "linear-gradient(90deg, #F9731633, #FB923C22)"
                      : "linear-gradient(90deg, #EC4899, #F9A8D4)",
                  }}
                />
              </div>
              <span className="text-[8.5px] font-bold text-[#9D174D] dark:text-[#F9A8D4] tabular-nums w-12 text-right">
                {phase === "analyzing" ? "…" : formatKB(Math.round(compressedSize))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Film className="h-2.5 w-2.5 text-[#EC4899]" strokeWidth={2} />
        <span>MP4 · WebM · Same visuals · 80-90% smaller</span>
      </div>

      <style jsx>{`
        @keyframes gtm-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

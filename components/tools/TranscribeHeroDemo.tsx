"use client";

import { useState, useEffect } from "react";
import { Mic, Sparkles, CheckCircle2, Download, Subtitles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Transcribe hero demo — audio waveform mock con progress che avanza,
 * trascript che si compila riga per riga con timestamps. 6 righe + done.
 * Brand color #0EA5E9 sky.
 */

type Line = {
  ts: string;
  text: string;
};

const TRANSCRIPT: Line[] = [
  { ts: "00:00", text: "Welcome back to the channel. Today we're exploring Tuscany." },
  { ts: "00:05", text: "Our first stop is San Gimignano, the medieval town of towers." },
  { ts: "00:11", text: "The light here is unlike anywhere else in the world." },
  { ts: "00:17", text: "Make sure to subscribe — we have so much more to share." },
  { ts: "00:23", text: "Now let's check out the rolling hills of Val d'Orcia." },
  { ts: "00:29", text: "Best time to shoot? Golden hour, no question about it." },
];

const STEP_MS = 850;
const PAUSE_MS = 2000;

export default function TranscribeHeroDemo() {
  const [step, setStep] = useState(0); // 0..N where N = TRANSCRIPT.length, then pause
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s >= TRANSCRIPT.length) {
          timeoutId = setTimeout(() => !cancelled && setStep(0), PAUSE_MS);
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
  }, [hasInteracted, step]);

  const lines = TRANSCRIPT.slice(0, step);
  const isDone = step >= TRANSCRIPT.length;
  const progressPct = Math.min((step / TRANSCRIPT.length) * 100, 100);
  const totalDuration = "00:35";
  const currentTs = step === 0 ? "00:00" : TRANSCRIPT[Math.min(step - 1, TRANSCRIPT.length - 1)].ts;

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
            tuscany-trip.mp4
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#075985] bg-[#0EA5E9]/12 dark:text-[#7DD3FC]">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
            Gemini AI
          </div>
        </div>

        {/* Waveform mini-player */}
        <div className="px-2.5 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
          <div className="flex items-center gap-2">
            <div className={cn("flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center", isDone ? "bg-[#22C55E]" : "bg-[#0EA5E9]")}>
              <Mic className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 flex items-center gap-0.5 h-5">
              {Array.from({ length: 38 }).map((_, i) => {
                const heightPct = 25 + Math.sin(i * 0.7) * 30 + Math.cos(i * 0.3) * 25 + (i % 5 === 0 ? 20 : 0);
                const h = Math.max(15, Math.min(95, heightPct));
                const passed = (i / 38) * 100 < progressPct;
                const animating = !isDone && Math.abs((i / 38) * 100 - progressPct) < 5;
                return (
                  <span
                    key={i}
                    className={cn(
                      "w-[2px] rounded-full transition-all",
                      passed ? "bg-[#0EA5E9]" : "bg-[#D4D4D4] dark:bg-[#404040]",
                      animating && "animate-pulse"
                    )}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
            <span className="text-[9px] font-mono text-[#737373] tabular-nums">
              {currentTs} / {totalDuration}
            </span>
          </div>
        </div>

        {/* Transcript */}
        <div className="px-2.5 py-1.5 overflow-hidden h-[calc(100%-72px)]">
          <div className="space-y-1">
            {lines.map((line, i) => {
              const isLatest = i === lines.length - 1;
              return (
                <div
                  key={i}
                  className="flex items-start gap-1.5 text-[10px] leading-tight"
                  style={{ animation: isLatest ? "transcribe-fade 0.4s ease-out" : "none" }}
                >
                  <span className="font-mono text-[9px] text-[#0EA5E9] tabular-nums mt-0.5 flex-shrink-0">[{line.ts}]</span>
                  <span className="text-[#171717] dark:text-[#E5E5E5]">
                    {line.text}
                    {isLatest && !isDone && (
                      <span className="inline-block w-[1.5px] h-[10px] bg-[#0EA5E9] ml-px align-middle" style={{ animation: "transcribe-cursor 0.9s steps(1) infinite" }} />
                    )}
                  </span>
                </div>
              );
            })}
            {step === 0 && (
              <div className="text-[10px] text-[#A3A3A3] italic flex items-center gap-1.5 mt-1">
                <Mic className="h-2.5 w-2.5" strokeWidth={2} />
                Listening to audio…
              </div>
            )}
          </div>
        </div>

        {/* Bottom action */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5">
          {isDone ? (
            <button className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-[#0EA5E9] hover:bg-[#0284C7] px-1.5 py-0.5 rounded shadow-sm">
              <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
              .srt subtitles
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#737373] px-1.5 py-0.5 rounded bg-white/90 dark:bg-[#0F1729]/90 border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <Subtitles className="h-2.5 w-2.5 text-[#0EA5E9]" strokeWidth={2} />
              {Math.round(progressPct)}%
            </span>
          )}
        </div>
        {isDone && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-1.5 py-0.5 rounded">
              <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
              {TRANSCRIPT.length} lines · {totalDuration}
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Subtitles className="h-2.5 w-2.5 text-[#0EA5E9]" strokeWidth={2} />
        <span>SRT subtitles · TXT transcript · Timestamps · Edit inline</span>
      </div>

      <style jsx>{`
        @keyframes transcribe-fade {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes transcribe-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

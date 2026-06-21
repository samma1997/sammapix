"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Droplets, Grid2x2, Square } from "lucide-react";

/**
 * Blur & Censor hero demo, mac-window mockup that auto-cycles through three
 * censor phases on a simple illustrative scene (NOT a real face): a face avatar
 * gets blurred, a license plate gets pixelated, a line of sensitive text gets
 * blocked. Same visual style as RawConverterHeroDemo.
 *
 * Accent color #475569 slate
 */

type Phase = {
  mode: "blur" | "pixelate" | "block";
  label: string;
  icon: typeof Droplets;
};

const PHASES: Phase[] = [
  { mode: "blur", label: "face blurred", icon: Droplets },
  { mode: "pixelate", label: "plate hidden", icon: Grid2x2 },
  { mode: "block", label: "text redacted", icon: Square },
];

const CYCLE_MS = 2800;

export default function BlurCensorHeroDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHASES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const phase = PHASES[index];
  const PhaseIcon = phase.icon;

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">
            Blur &amp; Censor
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#475569] bg-[#475569]/12 dark:text-[#94A3B8]">
            <ShieldCheck className="h-2.5 w-2.5" strokeWidth={2.5} />
            LOCAL
          </div>
        </div>

        {/* Body, illustrative scene */}
        <div className="px-4 py-4 flex flex-col h-[calc(100%-28px)] justify-center gap-3">
          {/* Scene card */}
          <div
            key={index}
            className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A] p-3 space-y-2.5"
            style={{ animation: "blurcensor-fade 0.5s ease-out" }}
          >
            {/* Row: avatar + name (face blur target) */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 flex-shrink-0">
                {/* Simple CSS avatar, never a real face */}
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#94A3B8] to-[#475569] flex items-center justify-center"
                  style={
                    phase.mode === "blur"
                      ? { filter: "blur(5px)" }
                      : undefined
                  }
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-white/70 mt-1.5" />
                </div>
                {phase.mode === "blur" && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-[#475569]/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-2 w-20 rounded-full bg-[#D4D4D4] dark:bg-[#3A3A3A]" />
                <div className="h-1.5 w-14 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A] mt-1.5" />
              </div>
            </div>

            {/* Row: license plate (pixelate target) */}
            <div className="flex items-center gap-2">
              <div
                className="relative flex items-center justify-center px-2 py-1 rounded border border-[#475569]/30 bg-white dark:bg-[#222]"
                style={
                  phase.mode === "pixelate"
                    ? { filter: "blur(0px)" }
                    : undefined
                }
              >
                {phase.mode === "pixelate" ? (
                  <div className="flex gap-0.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-3 rounded-[1px]"
                        style={{
                          background:
                            i % 2 === 0 ? "#64748B" : "#94A3B8",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#475569] dark:text-[#94A3B8] tabular-nums">
                    AB 123 CD
                  </span>
                )}
              </div>
              <span className="text-[9px] text-[#A3A3A3]">license plate</span>
            </div>

            {/* Row: sensitive text (block target) */}
            <div className="flex items-center gap-2">
              {phase.mode === "block" ? (
                <div className="h-3 w-28 rounded-sm bg-[#171717] dark:bg-black" />
              ) : (
                <span className="text-[10px] font-mono text-[#525252] dark:text-[#A3A3A3] tabular-nums">
                  IBAN IT60 X054
                </span>
              )}
              <span className="text-[9px] text-[#A3A3A3]">sensitive data</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#475569]/10 dark:bg-[#475569]/15">
              <PhaseIcon
                className="h-3 w-3 text-[#475569] dark:text-[#94A3B8]"
                strokeWidth={2.5}
              />
              <span className="text-[10px] font-semibold text-[#475569] dark:text-[#94A3B8]">
                {phase.label}
              </span>
              <span className="text-[10px] text-[#737373]">· no upload</span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <ShieldCheck className="h-2.5 w-2.5 text-[#475569]" strokeWidth={2} />
        <span>Blurred in your browser · no upload · faces, plates, sensitive data</span>
      </div>

      <style jsx>{`
        @keyframes blurcensor-fade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

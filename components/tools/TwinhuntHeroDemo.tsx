"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Copy } from "lucide-react";

/**
 * TwinHunt hero demo — pattern UI mockup tipo ai-rename ma con
 * scanning animation: 6 thumbnail (4 unique + 2 duplicate pairs) si
 * scannerizzano sequentially, e ogni coppia di duplicate viene
 * highlighted in arancione con un ring + label "duplicate".
 *
 * Cycle phases:
 *  1. "Idle" — tutte 6 normali
 *  2. "Scanning" — progress bar 0→100%, thumb attiva si illumina
 *  3. "Found pair 1" — coppia 0+2 highlighted
 *  4. "Found pair 2" — coppia 3+5 highlighted
 *  5. "Done" — final summary "✓ 2 duplicate pairs · save 8.4 MB"
 *  6. Reset
 */

type FileEntry = {
  thumb: string;
  filename: string;
  pair: number; // 0 = unique, 1 = first pair, 2 = second pair
};

const FILES: FileEntry[] = [
  { thumb: "/demo/twinhunt-sunset.jpg", filename: "IMG_0042.jpg", pair: 1 }, // tropical sunset
  { thumb: "/demo/twinhunt-puppy.jpg", filename: "IMG_0073.jpg", pair: 0 }, // golden puppy unique
  { thumb: "/demo/twinhunt-sunset.jpg", filename: "IMG_0044.jpg", pair: 1 }, // duplicate of #1
  { thumb: "/demo/twinhunt-pizza.jpg", filename: "IMG_0156.jpg", pair: 2 }, // Margherita pizza
  { thumb: "/demo/twinhunt-tokyo.jpg", filename: "IMG_0201.jpg", pair: 0 }, // Tokyo neon unique
  { thumb: "/demo/twinhunt-pizza.jpg", filename: "IMG_0162.jpg", pair: 2 }, // duplicate of #4
];

type Phase = "idle" | "scanning" | "pair1" | "pair2" | "done";

const SCAN_DURATION_MS = 1800;
const PAIR_DELAY_MS = 700;
const DONE_DURATION_MS = 1800;
const RESET_DURATION_MS = 600;

export default function TwinhuntHeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanIdx, setScanIdx] = useState<number | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.push(t);
      });

    async function runCycle() {
      while (!cancelledRef.current) {
        // 1. Idle pause
        setPhase("idle");
        setScanProgress(0);
        setScanIdx(null);
        await sleep(800);
        if (cancelledRef.current) return;

        // 2. Scanning — progress 0→100, scanIdx walks 0→5
        setPhase("scanning");
        const stepDur = SCAN_DURATION_MS / FILES.length;
        for (let i = 0; i < FILES.length; i++) {
          if (cancelledRef.current) return;
          setScanIdx(i);
          // Animate progress smoothly inside this slice
          const startProg = (i / FILES.length) * 100;
          const endProg = ((i + 1) / FILES.length) * 100;
          const SUBSTEPS = 8;
          for (let s = 1; s <= SUBSTEPS; s++) {
            if (cancelledRef.current) return;
            setScanProgress(startProg + ((endProg - startProg) * s) / SUBSTEPS);
            await sleep(stepDur / SUBSTEPS);
          }
        }
        setScanIdx(null);
        if (cancelledRef.current) return;

        // 3. Found pair 1
        setPhase("pair1");
        await sleep(PAIR_DELAY_MS);
        if (cancelledRef.current) return;

        // 4. Found pair 2
        setPhase("pair2");
        await sleep(PAIR_DELAY_MS);
        if (cancelledRef.current) return;

        // 5. Done
        setPhase("done");
        await sleep(DONE_DURATION_MS);
        if (cancelledRef.current) return;

        // 6. Reset
        await sleep(RESET_DURATION_MS);
      }
    }

    runCycle();

    return () => {
      cancelledRef.current = true;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Determine highlighted pair based on phase
  const highlightedPairs: number[] =
    phase === "pair1" ? [1] :
    phase === "pair2" || phase === "done" ? [1, 2] :
    [];

  return (
    <div className="rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#A3A3A3] font-mono">{FILES.length} photos · twinhunt</span>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#F97316] font-medium">
          <Search className="h-3 w-3" strokeWidth={2} />
          pHash
        </span>
      </div>

      {/* Scanning progress bar (visible only during scan) */}
      {phase === "scanning" && (
        <div className="relative h-1 bg-[#F5F5F5] dark:bg-[#252525] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F97316] to-[#FB923C] transition-all duration-100"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
      )}

      {/* Photo grid 3×2 */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {FILES.map((file, i) => {
          const isScanning = phase === "scanning" && scanIdx === i;
          const isInHighlightedPair = file.pair > 0 && highlightedPairs.includes(file.pair);

          return (
            <div key={i} className="relative">
              <div
                className={`relative aspect-square rounded overflow-hidden border-2 transition-all duration-300 ${
                  isInHighlightedPair
                    ? "border-[#F97316] shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                    : isScanning
                      ? "border-[#3B82F6] shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.thumb}
                  alt={file.filename}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    phase === "idle" || isScanning || isInHighlightedPair ? "grayscale-0" : "grayscale-[0.4]"
                  }`}
                />

                {/* Scanning overlay */}
                {isScanning && (
                  <div className="absolute inset-0 bg-[#3B82F6]/20 flex items-center justify-center">
                    <Search className="h-5 w-5 text-white animate-pulse" strokeWidth={2.5} />
                  </div>
                )}

                {/* Duplicate badge */}
                {isInHighlightedPair && (
                  <div className="absolute top-1 right-1 bg-[#F97316] text-white text-[9px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-0.5 shadow-sm">
                    <Copy className="h-2.5 w-2.5" strokeWidth={2.5} />
                    {file.pair === 1 ? "dup A" : "dup B"}
                  </div>
                )}
              </div>
              <p className={`text-[10px] font-mono truncate mt-1 transition-colors ${
                isInHighlightedPair
                  ? "text-[#F97316] font-semibold"
                  : "text-[#A3A3A3]"
              }`}>
                {file.filename}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer status */}
      <div className="px-3 py-2.5 border-t border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
        {phase === "idle" && (
          <p className="text-[11px] text-[#A3A3A3] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3A3A3]" />
            Ready
          </p>
        )}
        {phase === "scanning" && (
          <p className="text-[11px] text-[#3B82F6] flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Scanning… computing perceptual hashes
          </p>
        )}
        {(phase === "pair1" || phase === "pair2") && (
          <p className="text-[11px] text-[#F97316] flex items-center gap-1.5 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Found duplicate pair {phase === "pair1" ? "(1/2)" : "(2/2)"}
          </p>
        )}
        {phase === "done" && (
          <p className="text-[11px] text-[#16A34A] flex items-center gap-1.5 font-semibold">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            2 duplicate pairs found · save 8.4 MB
          </p>
        )}
      </div>
    </div>
  );
}

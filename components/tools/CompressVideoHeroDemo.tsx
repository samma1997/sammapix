"use client";

import { useState, useEffect } from "react";
import { Video, ArrowRight, Film } from "lucide-react";

/**
 * Compress Video hero demo — browser-window mockup that auto-cycles through a few
 * video compressions, showing an animated size reduction and a live "compressing"
 * progress bar. Same visual style as RawConverterHeroDemo (mac-style window,
 * file cards, caption below).
 *
 * Accent color #7C3AED violet
 */

const ACCENT = "#7C3AED";

type Clip = {
  baseName: string;
  res: string;
  inSizeMB: number;
  outSizeMB: number;
};

const CLIPS: Clip[] = [
  { baseName: "IMG_4821", res: "4K", inSizeMB: 184, outSizeMB: 32 },
  { baseName: "screen-rec", res: "1080p", inSizeMB: 96, outSizeMB: 21 },
  { baseName: "drone-clip", res: "4K", inSizeMB: 240, outSizeMB: 41 },
];

const CYCLE_MS = 3000;

export default function CompressVideoHeroDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CLIPS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const c = CLIPS[index];
  const reductionPct = Math.round((1 - c.outSizeMB / c.inSizeMB) * 100);

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">Compress Video</span>
          <div
            className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded"
            style={{ color: ACCENT, backgroundColor: `${ACCENT}1F` }}
          >
            <Video className="h-2.5 w-2.5" strokeWidth={2.5} />
            MP4
          </div>
        </div>

        {/* Body */}
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-3">
          <div
            key={index}
            className="flex items-center gap-2.5"
            style={{ animation: "cv-fade 0.5s ease-out" }}
          >
            {/* Source */}
            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <div className="w-8 h-9 rounded bg-[#737373]/10 border border-[#737373]/25 flex items-center justify-center flex-shrink-0">
                <Film className="h-4 w-4 text-[#737373]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {c.baseName}.mov
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded text-[#525252] dark:text-[#A3A3A3] bg-[#737373]/12">
                    {c.res}
                  </span>
                  <span className="text-[9px] text-[#737373] tabular-nums font-mono">
                    {c.inSizeMB} MB
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight
              className="h-4 w-4 flex-shrink-0"
              style={{ color: ACCENT, animation: "cv-arrow 1.4s ease-in-out infinite" }}
              strokeWidth={2.5}
            />

            {/* Output */}
            <div
              className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border-2"
              style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}
            >
              <div
                className="w-8 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${ACCENT}26`, border: `1px solid ${ACCENT}59` }}
              >
                <Video className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {c.baseName}.mp4
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded uppercase"
                    style={{ color: ACCENT, backgroundColor: `${ACCENT}26` }}
                  >
                    MP4
                  </span>
                  <span
                    className="text-[9px] tabular-nums font-mono font-semibold"
                    style={{ color: ACCENT }}
                  >
                    {c.outSizeMB} MB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="px-0.5">
            <div className="w-full h-1 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                key={`bar-${index}`}
                className="h-full rounded-full"
                style={{ backgroundColor: ACCENT, animation: "cv-bar 2.8s ease-out" }}
              />
            </div>
          </div>

          {/* Reduction badge */}
          <div className="flex items-center justify-center">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${ACCENT}1A` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
              <span
                className="text-[10px] font-semibold tabular-nums"
                style={{ color: ACCENT }}
              >
                {reductionPct}% smaller
              </span>
              <span className="text-[10px] text-[#737373]">· in seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Video className="h-2.5 w-2.5" style={{ color: ACCENT }} strokeWidth={2} />
        <span>Compressed in your browser · no upload · MP4, MOV, WebM, MKV</span>
      </div>

      <style jsx>{`
        @keyframes cv-fade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cv-arrow {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.7;
          }
          50% {
            transform: translateX(3px);
            opacity: 1;
          }
        }
        @keyframes cv-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Camera, ArrowRight, Image as ImageIcon } from "lucide-react";

/**
 * RAW Converter hero demo — browser-window mockup that auto-cycles through a few
 * camera RAW → JPG/WebP conversions, showing the format change and a size
 * reduction. Same visual style as PdfMergeHeroDemo (mac-style window, file card,
 * caption below).
 *
 * Accent color #0D9488 teal
 */

type Conversion = {
  baseName: string;
  rawExt: string;
  rawSizeMB: number;
  outExt: string;
  outSizeMB: number;
};

const CONVERSIONS: Conversion[] = [
  { baseName: "DSC_4521", rawExt: "NEF", rawSizeMB: 24.3, outExt: "jpg", outSizeMB: 4.1 },
  { baseName: "IMG_8830", rawExt: "CR2", rawSizeMB: 28.7, outExt: "webp", outSizeMB: 3.4 },
  { baseName: "A7R_0192", rawExt: "ARW", rawSizeMB: 41.2, outExt: "jpg", outSizeMB: 5.8 },
];

const CYCLE_MS = 2800;

export default function RawConverterHeroDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CONVERSIONS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const c = CONVERSIONS[index];
  const reductionPct = Math.round((1 - c.outSizeMB / c.rawSizeMB) * 100);

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
            RAW Converter · {CONVERSIONS.length} files
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#0F766E] bg-[#0D9488]/12 dark:text-[#5EEAD4]">
            <Camera className="h-2.5 w-2.5" strokeWidth={2.5} />
            RAW
          </div>
        </div>

        {/* Body */}
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-3">
          {/* Conversion card */}
          <div
            key={index}
            className="flex items-center gap-2.5"
            style={{ animation: "rawconv-fade 0.5s ease-out" }}
          >
            {/* Source: RAW file */}
            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <div className="w-8 h-9 rounded bg-[#737373]/10 border border-[#737373]/25 flex items-center justify-center flex-shrink-0">
                <Camera className="h-4 w-4 text-[#737373]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {c.baseName}.{c.rawExt}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded text-[#525252] dark:text-[#A3A3A3] bg-[#737373]/12">
                    RAW
                  </span>
                  <span className="text-[9px] text-[#737373] tabular-nums font-mono">
                    {c.rawSizeMB.toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight
              className="h-4 w-4 text-[#0D9488] flex-shrink-0"
              strokeWidth={2.5}
              style={{ animation: "rawconv-arrow 1.4s ease-in-out infinite" }}
            />

            {/* Output: converted image */}
            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border-2 border-[#0D9488]/40 bg-[#0D9488]/[0.06] dark:bg-[#0D9488]/10">
              <div className="w-8 h-9 rounded bg-[#0D9488]/15 border border-[#0D9488]/35 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="h-4 w-4 text-[#0D9488]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {c.baseName}.{c.outExt}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded text-[#0F766E] dark:text-[#5EEAD4] bg-[#0D9488]/15 uppercase">
                    {c.outExt}
                  </span>
                  <span className="text-[9px] text-[#0F766E] dark:text-[#5EEAD4] tabular-nums font-mono font-semibold">
                    {c.outSizeMB.toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reduction badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D9488]/10 dark:bg-[#0D9488]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
              <span className="text-[10px] font-semibold text-[#0F766E] dark:text-[#5EEAD4] tabular-nums">
                {reductionPct}% smaller
              </span>
              <span className="text-[10px] text-[#737373]">
                · decoded in browser
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Camera className="h-2.5 w-2.5 text-[#0D9488]" strokeWidth={2} />
        <span>Decoded in your browser · no upload · CR2, NEF, ARW, DNG</span>
      </div>

      <style jsx>{`
        @keyframes rawconv-fade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes rawconv-arrow {
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
      `}</style>
    </div>
  );
}

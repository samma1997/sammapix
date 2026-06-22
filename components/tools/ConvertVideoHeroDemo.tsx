"use client";

import { useState, useEffect } from "react";
import { FileVideo, ArrowRight } from "lucide-react";

const ACCENT = "#0891B2";

type Conv = { name: string; from: string; to: string };
const CONVS: Conv[] = [
  { name: "clip_0421", from: "MOV", to: "MP4" },
  { name: "screen_rec", from: "AVI", to: "MP4" },
  { name: "export_v2", from: "MKV", to: "MP4" },
  { name: "render_01", from: "MP4", to: "WebM" },
];
const CYCLE_MS = 2600;

export default function ConvertVideoHeroDemo() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % CONVS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const c = CONVS[index];

  return (
    <div className="relative">
      <div className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]" style={{ aspectRatio: "4/3" }}>
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">Convert Video</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: ACCENT, backgroundColor: `${ACCENT}1F` }}>
            <FileVideo className="h-2.5 w-2.5" strokeWidth={2.5} />
            {c.to}
          </div>
        </div>

        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-3">
          <div key={index} className="flex items-center gap-2.5" style={{ animation: "cvc-fade 0.5s ease-out" }}>
            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <div className="w-8 h-9 rounded bg-[#737373]/10 border border-[#737373]/25 flex items-center justify-center flex-shrink-0">
                <FileVideo className="h-4 w-4 text-[#737373]" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{c.name}.{c.from.toLowerCase()}</div>
                <span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded text-[#525252] dark:text-[#A3A3A3] bg-[#737373]/12 mt-1 uppercase">{c.from}</span>
              </div>
            </div>

            <ArrowRight className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT, animation: "cvc-arrow 1.4s ease-in-out infinite" }} strokeWidth={2.5} />

            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border-2" style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}>
              <div className="w-8 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ACCENT}26`, border: `1px solid ${ACCENT}59` }}>
                <FileVideo className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">{c.name}.{c.to.toLowerCase()}</div>
                <span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded mt-1 uppercase" style={{ color: ACCENT, backgroundColor: `${ACCENT}26` }}>{c.to}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${ACCENT}1A` }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
              <span className="text-[10px] font-semibold" style={{ color: ACCENT }}>converted in your browser</span>
              <span className="text-[10px] text-[#737373]">· no upload</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileVideo className="h-2.5 w-2.5" style={{ color: ACCENT }} strokeWidth={2} />
        <span>MOV · AVI · MKV · WebM &rarr; MP4 · in your browser, no upload</span>
      </div>

      <style jsx>{`
        @keyframes cvc-fade { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes cvc-arrow { 0%, 100% { transform: translateX(0); opacity: 0.7; } 50% { transform: translateX(3px); opacity: 1; } }
      `}</style>
    </div>
  );
}

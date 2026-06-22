"use client";

import { useState, useEffect } from "react";
import { Scissors } from "lucide-react";

const ACCENT = "#D97706";
const SELS = [
  { left: 20, width: 45 },
  { left: 35, width: 35 },
  { left: 12, width: 55 },
];

export default function TrimVideoHeroDemo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % SELS.length), 2200);
    return () => clearInterval(id);
  }, []);
  const s = SELS[i];

  return (
    <div className="relative">
      <div className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]" style={{ aspectRatio: "4/3" }}>
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" /></div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">Trim Video</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: ACCENT, backgroundColor: `${ACCENT}1F` }}><Scissors className="h-2.5 w-2.5" strokeWidth={2.5} />MP4</div>
        </div>
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-4">
          {/* fake preview */}
          <div className="rounded-md bg-gradient-to-br from-[#334155] to-[#0f172a] h-20 flex items-center justify-center">
            <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[13px] border-l-white/80 ml-1" />
          </div>
          {/* timeline with selection */}
          <div>
            <div className="relative h-7 rounded bg-[#E5E5E5] dark:bg-[#2A2A2A] overflow-hidden">
              {/* thumbnails strip */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 10 }).map((_, k) => (
                  <div key={k} className="flex-1 border-r border-white/40 dark:border-black/30" style={{ background: k % 2 ? "#cbd5e1" : "#94a3b8" }} />
                ))}
              </div>
              {/* selected region */}
              <div className="absolute top-0 bottom-0 border-2 transition-all duration-700 rounded" style={{ left: `${s.left}%`, width: `${s.width}%`, borderColor: ACCENT, backgroundColor: `${ACCENT}33` }} />
              {/* handles */}
              <div className="absolute top-0 bottom-0 w-1.5 rounded transition-all duration-700" style={{ left: `${s.left}%`, backgroundColor: ACCENT }} />
              <div className="absolute top-0 bottom-0 w-1.5 rounded transition-all duration-700" style={{ left: `calc(${s.left + s.width}% - 6px)`, backgroundColor: ACCENT }} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${ACCENT}1A` }}><span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" /><span className="text-[10px] font-semibold" style={{ color: ACCENT }}>keep only what you want</span><span className="text-[10px] text-[#737373]">· no upload</span></div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]"><Scissors className="h-2.5 w-2.5" style={{ color: ACCENT }} strokeWidth={2} /><span>Cut a clip from any video · in your browser, no upload</span></div>
    </div>
  );
}

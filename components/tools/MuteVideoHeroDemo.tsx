"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

const ACCENT = "#64748B";

export default function MuteVideoHeroDemo() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]" style={{ aspectRatio: "4/3" }}>
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" /></div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">Mute Video</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: ACCENT, backgroundColor: `${ACCENT}1F` }}><VolumeX className="h-2.5 w-2.5" strokeWidth={2.5} />MP4</div>
        </div>
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
              <div className="w-8 h-9 rounded bg-[#737373]/10 border border-[#737373]/25 flex items-center justify-center flex-shrink-0"><Volume2 className="h-4 w-4 text-[#737373]" strokeWidth={2} /></div>
              <div className="min-w-0 flex-1"><div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">clip.mp4</div><span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded text-[#525252] dark:text-[#A3A3A3] bg-[#737373]/12 mt-1">with audio</span></div>
            </div>
            <ArrowRight className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} strokeWidth={2.5} />
            <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2.5 rounded-lg border-2" style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}>
              <div className="w-8 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ACCENT}26`, border: `1px solid ${ACCENT}59` }}><VolumeX className="h-4 w-4" style={{ color: ACCENT }} strokeWidth={2} /></div>
              <div className="min-w-0 flex-1"><div className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate">clip-muted.mp4</div><span className="inline-flex items-center text-[8px] font-bold px-1 py-0.5 rounded mt-1" style={{ color: ACCENT, backgroundColor: `${ACCENT}26` }}>no audio</span></div>
            </div>
          </div>
          {/* waveform that goes flat */}
          <div className="flex items-end justify-center gap-0.5 h-6">
            {[5, 12, 8, 16, 6, 14, 9, 18, 7, 13, 10, 15].map((bar, i) => (
              <div key={i} className="w-1 rounded-full transition-all duration-500" style={{ height: on ? "2px" : `${bar}px`, backgroundColor: on ? `${ACCENT}40` : ACCENT }} />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${ACCENT}1A` }}><span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" /><span className="text-[10px] font-semibold" style={{ color: ACCENT }}>audio removed</span><span className="text-[10px] text-[#737373]">· instant</span></div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]"><VolumeX className="h-2.5 w-2.5" style={{ color: ACCENT }} strokeWidth={2} /><span>Remove audio from any video · in your browser, no upload</span></div>
    </div>
  );
}

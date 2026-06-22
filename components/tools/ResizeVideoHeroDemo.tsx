"use client";

import { useState, useEffect } from "react";
import { Scaling, ArrowRight } from "lucide-react";

const ACCENT = "#2563EB";
const STEPS = [
  { from: "4K", to: "1080p", w: "70%" },
  { from: "1080p", to: "720p", w: "55%" },
  { from: "1080p", to: "480p", w: "40%" },
];

export default function ResizeVideoHeroDemo() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % STEPS.length), 2400);
    return () => clearInterval(id);
  }, []);
  const s = STEPS[i];

  return (
    <div className="relative">
      <div className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]" style={{ aspectRatio: "4/3" }}>
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" /></div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">Resize Video</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: ACCENT, backgroundColor: `${ACCENT}1F` }}><Scaling className="h-2.5 w-2.5" strokeWidth={2.5} />{s.to}</div>
        </div>
        <div className="px-3 py-3 flex flex-col h-[calc(100%-28px)] justify-center gap-3">
          <div className="flex items-center justify-center gap-3" key={i} style={{ animation: "rsz-fade 0.5s ease-out" }}>
            <div className="rounded border-2 border-[#737373]/30 bg-[#737373]/5 flex items-center justify-center" style={{ width: 64, height: 40 }}>
              <span className="text-[9px] font-bold text-[#737373]">{s.from}</span>
            </div>
            <ArrowRight className="h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} strokeWidth={2.5} />
            <div className="rounded border-2 flex items-center justify-center transition-all duration-500" style={{ width: `calc(64px * ${parseFloat(s.w) / 100} + 18px)`, height: `calc(40px * ${parseFloat(s.w) / 100} + 10px)`, borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}0F` }}>
              <span className="text-[9px] font-bold" style={{ color: ACCENT }}>{s.to}</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: `${ACCENT}1A` }}><span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" /><span className="text-[10px] font-semibold" style={{ color: ACCENT }}>aspect ratio kept</span><span className="text-[10px] text-[#737373]">· no upload</span></div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]"><Scaling className="h-2.5 w-2.5" style={{ color: ACCENT }} strokeWidth={2} /><span>1080p · 720p · 480p · 360p · in your browser, no upload</span></div>
      <style jsx>{`@keyframes rsz-fade { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

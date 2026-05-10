"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Folder, Sparkles, CheckCircle2, Camera, User, UtensilsCrossed, Building2, ImageIcon, Dog } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SmartSort hero demo — AI categorize 4 foto travel reali. Phase machine:
 * scanning una alla volta → AI label "→ Landscape (96%)" → foto si sposta
 * nel folder corretto. 4 folders categories visibili (Landscape, Architecture,
 * Food, Portrait) — folder empty restano "ready" a indicare che AI sa
 * categorizzare tutte le tipologie.
 *
 * Brand: #10B981 emerald
 */

type Category = "Landscape" | "Architecture" | "Food" | "Portrait" | "Animal";

type Photo = {
  src: string;
  filename: string;
  category: Category;
  confidence: number;
};

const PHOTOS: Photo[] = [
  { src: "/demo/geosort-italy.webp",            filename: "tuscany.jpg",      category: "Landscape",    confidence: 96 },
  { src: "/demo/smartsort-food-italian.webp",   filename: "ragu.jpg",         category: "Food",         confidence: 99 },
  { src: "/demo/geosort-japan.webp",            filename: "torii.jpg",        category: "Architecture", confidence: 98 },
  { src: "/demo/smartsort-portrait-woman.webp", filename: "florence-girl.jpg",category: "Portrait",     confidence: 97 },
  { src: "/demo/smartsort-animal-dog.webp",     filename: "puppy.jpg",        category: "Animal",       confidence: 99 },
  { src: "/demo/geosort-france.webp",           filename: "eiffel.jpg",       category: "Architecture", confidence: 94 },
  { src: "/demo/smartsort-food-sushi.webp",     filename: "sushi.jpg",        category: "Food",         confidence: 98 },
  { src: "/demo/geosort-thailand.webp",         filename: "phi-phi.jpg",      category: "Landscape",    confidence: 97 },
];

const CATEGORY_ICON: Record<Category, typeof ImageIcon> = {
  Landscape: ImageIcon,
  Architecture: Building2,
  Food: UtensilsCrossed,
  Portrait: User,
  Animal: Dog,
};

const STEP_MS = 950;
const PAUSE_MS = 1800;

export default function SmartSortHeroDemo() {
  const [step, setStep] = useState(0); // 0 = idle, 1..N = scanning photo i, N+1 = done
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > PHOTOS.length) {
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

  const sorted = PHOTOS.slice(0, Math.min(step, PHOTOS.length));
  const counts: Record<Category, number> = { Landscape: 0, Architecture: 0, Food: 0, Portrait: 0, Animal: 0 };
  sorted.forEach((p) => counts[p.category]++);
  const isDone = step > PHOTOS.length;
  const scanning = step >= 1 && step <= PHOTOS.length ? PHOTOS[step - 1] : null;

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">Sorted/</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#047857] bg-[#10B981]/12">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
            Gemini AI
          </div>
        </div>

        {/* Body: photo strip + AI banner + folder grid */}
        <div className="p-2.5 grid grid-rows-[auto_auto_1fr] gap-2 h-[calc(100%-28px)]">
          {/* Photo strip — 8 photos in 1 row */}
          <div className="grid grid-cols-8 gap-1">
            {PHOTOS.map((p, i) => {
              const done = i < step - 1 || (i === step - 1 && step > PHOTOS.length);
              const isScanning = i === step - 1 && step <= PHOTOS.length;
              return (
                <div
                  key={i}
                  className={cn(
                    "relative aspect-square rounded border overflow-hidden transition-all duration-500",
                    isScanning && "ring-2 ring-[#10B981] ring-offset-1 scale-110 z-10",
                    done && "opacity-25 saturate-50",
                    !isScanning && !done && "border-[#E5E5E5] dark:border-[#2A2A2A]"
                  )}
                >
                  <Image src={p.src} alt={`${p.category} sample: ${p.filename}`} fill sizes="40px" className="object-cover" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-[#10B981]/30 backdrop-blur-[2px]">
                      <div className="absolute inset-x-0 h-0.5 bg-white" style={{ animation: "smartsort-scan 0.85s ease-in-out infinite" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI banner */}
          <div className={cn("rounded px-2 py-1.5 text-[10px] flex items-center gap-1.5 transition-colors duration-200", scanning ? "bg-[#10B981]/8 border border-[#10B981]/30" : "bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A]")}>
            {scanning ? (
              <>
                <Sparkles className="h-3 w-3 text-[#10B981] flex-shrink-0" strokeWidth={2} style={{ animation: "smartsort-spin 1s linear infinite" }} />
                <span className="font-mono text-[#171717] dark:text-[#E5E5E5] truncate">{scanning.filename}</span>
                <span className="text-[#10B981]">→</span>
                <span className="font-semibold text-[#047857] dark:text-[#34D399]">{scanning.category}</span>
                <span className="ml-auto text-[8.5px] font-bold text-[#10B981] tabular-nums">{scanning.confidence}%</span>
              </>
            ) : isDone ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-[#10B981] flex-shrink-0" strokeWidth={2.5} />
                <span className="font-semibold text-[#047857] dark:text-[#34D399]">All {PHOTOS.length} photos categorized</span>
                <span className="ml-auto text-[9px] text-[#737373]">Ready · ZIP</span>
              </>
            ) : (
              <>
                <Camera className="h-3 w-3 text-[#A3A3A3] flex-shrink-0" strokeWidth={2} />
                <span className="text-[#737373]">Drop images to start AI sorting…</span>
              </>
            )}
          </div>

          {/* Folder grid — 5 categories */}
          <div className="grid grid-cols-5 gap-1 h-full">
            {(Object.keys(counts) as Category[]).map((cat) => {
              const count = counts[cat];
              const active = scanning?.category === cat;
              const Icon = CATEGORY_ICON[cat];
              return (
                <div
                  key={cat}
                  className={cn(
                    "relative flex flex-col items-center justify-center px-1 py-1 rounded border transition-all duration-300",
                    active
                      ? "border-[#10B981] bg-[#10B981]/[0.08] scale-105 shadow-sm"
                      : count > 0
                      ? "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                      : "border-dashed border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                  )}
                >
                  <div className="relative mb-0.5">
                    <Folder
                      className={cn("h-4 w-4", active ? "text-[#10B981]" : count > 0 ? "text-[#525252] dark:text-[#A3A3A3]" : "text-[#D4D4D4] dark:text-[#404040]")}
                      strokeWidth={1.5}
                      fill={count > 0 ? "currentColor" : "none"}
                    />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Icon className={cn("h-2.5 w-2.5", count > 0 ? "text-[#525252] dark:text-[#A3A3A3]" : "text-[#A3A3A3]")} strokeWidth={2} />
                    <span className={cn("text-[9px] font-semibold", count > 0 ? "text-[#171717] dark:text-[#E5E5E5]" : "text-[#A3A3A3]")}>{cat}</span>
                  </div>
                  <span className={cn("text-[8px] font-semibold tabular-nums leading-none mt-0.5", count > 0 ? "text-[#10B981]" : "text-[#A3A3A3]")}>
                    {count > 0 ? `${count} photo${count > 1 ? "s" : ""}` : "ready"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom counter */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5 px-1.5 py-1 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
          {isDone && <CheckCircle2 className="h-3 w-3 text-[#10B981]" strokeWidth={2.5} />}
          <span className="text-[10px] font-semibold tabular-nums text-[#171717] dark:text-[#E5E5E5]">
            {sorted.length}/{PHOTOS.length}
          </span>
          <span className="text-[8px] text-[#737373] uppercase tracking-wide">sorted</span>
        </div>
      </div>

      {/* Category chips */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {(Object.keys(counts) as Category[]).map((cat) => {
          const found = counts[cat] > 0;
          const Icon = CATEGORY_ICON[cat];
          return (
            <span
              key={cat}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                found
                  ? "border-[#10B981] bg-[#10B981]/[0.08] text-[#047857] dark:text-[#34D399]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3]"
              )}
            >
              <Icon className="h-2.5 w-2.5" strokeWidth={2} />
              {cat}
            </span>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes smartsort-scan {
          0%, 100% { top: 18%; opacity: 0.5; }
          50% { top: 78%; opacity: 1; }
        }
        @keyframes smartsort-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

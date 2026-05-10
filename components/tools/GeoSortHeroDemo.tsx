"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Folder, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GeoSort hero demo — mock Finder-style: 8 foto miste vengono smistate
 * in 4 folder country (Italy, Japan, France, Thailand) una alla volta.
 * Counter live di photos scanned + countries detected. CheckCircle appare alla fine.
 *
 * Design: photo grid sopra, scan one-by-one, ogni foto si "anima" verso
 * la folder corretta in basso. Brand color verde #22C55E.
 */

type Country = "Italy" | "Japan" | "France" | "Thailand";

type Photo = {
  id: number;
  /** Nome file iconico per il country */
  filename: string;
  /** Country detection target */
  country: Country;
  /** Asset path */
  src: string;
};

const PHOTOS: Photo[] = [
  { id: 1, filename: "tuscan-villa.jpg",   country: "Italy",    src: "/demo/geosort-italy.webp" },
  { id: 2, filename: "torii-fuji.jpg",     country: "Japan",    src: "/demo/geosort-japan.webp" },
  { id: 3, filename: "tour-eiffel.jpg",    country: "France",   src: "/demo/geosort-france.webp" },
  { id: 4, filename: "san-gimignano.jpg",  country: "Italy",    src: "/demo/geosort-italy.webp" },
  { id: 5, filename: "phi-phi-boat.jpg",   country: "Thailand", src: "/demo/geosort-thailand.webp" },
  { id: 6, filename: "louvre-night.jpg",   country: "France",   src: "/demo/geosort-france.webp" },
  { id: 7, filename: "shibuya-cross.jpg",  country: "Japan",    src: "/demo/geosort-japan.webp" },
  { id: 8, filename: "krabi-cliffs.jpg",   country: "Thailand", src: "/demo/geosort-thailand.webp" },
];

const COUNTRY_FLAG: Record<Country, string> = {
  Italy: "🇮🇹",
  Japan: "🇯🇵",
  France: "🇫🇷",
  Thailand: "🇹🇭",
};

const STEP_MS = 800;
const PAUSE_MS = 2200;

export default function GeoSortHeroDemo() {
  const [step, setStep] = useState(0); // 0 = idle, 1..N = sorting photo at index step-1, N+1 = done
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > PHOTOS.length) {
          // done: pausa poi reset
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
  const counts: Record<Country, number> = { Italy: 0, Japan: 0, France: 0, Thailand: 0 };
  sorted.forEach((p) => counts[p.country]++);
  const countriesFound = (Object.keys(counts) as Country[]).filter((c) => counts[c] > 0).length;
  const isDone = step > PHOTOS.length;
  const currentlyScanning = step >= 1 && step <= PHOTOS.length ? PHOTOS[step - 1] : null;

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Finder-style toolbar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">GeoSort_2026/</span>
          <div className="ml-auto flex items-center gap-1">
            <span className={cn("inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded", isDone ? "text-[#16A34A] bg-[#22C55E]/10" : "text-[#1E40AF] bg-[#3B82F6]/10")}>
              <span className={cn("w-1 h-1 rounded-full", isDone ? "bg-[#16A34A]" : "bg-[#3B82F6] animate-pulse")} />
              {isDone ? "Sort complete" : "Reading EXIF locally"}
            </span>
          </div>
        </div>

        {/* Body: photo grid (top) + folders (bottom) */}
        <div className="p-2.5 grid grid-rows-[auto_1fr] gap-2 h-[calc(100%-28px)]">
          {/* Photo grid */}
          <div className="grid grid-cols-8 gap-1.5">
            {PHOTOS.map((p, i) => {
              const done = i < step - 1 || (i === step - 1 && step > PHOTOS.length);
              const scanning = i === step - 1 && step <= PHOTOS.length;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "relative aspect-square rounded border overflow-hidden transition-all duration-500 bg-[#F5F5F5]",
                    scanning && "ring-2 ring-[#22C55E] ring-offset-1 scale-110 z-10",
                    done && "opacity-30 saturate-50",
                    !scanning && !done && "border-[#E5E5E5] dark:border-[#2A2A2A]"
                  )}
                >
                  <Image
                    src={p.src}
                    alt={`${COUNTRY_FLAG[p.country]} ${p.country} travel photo: ${p.filename.replace(".jpg", "").replace(/-/g, " ")}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                  {scanning && (
                    <div className="absolute inset-0 bg-[#22C55E]/30 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white drop-shadow">···</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Currently scanning indicator */}
          <div className="relative">
            {currentlyScanning && (
              <div className="absolute -top-1 left-0 right-0 z-20 flex justify-center">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#525252] dark:text-[#A3A3A3] px-2 py-0.5 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
                  <span className="font-mono text-[#171717] dark:text-[#E5E5E5]">{currentlyScanning.filename}</span>
                  <span className="text-[#22C55E]">→</span>
                  <span>{COUNTRY_FLAG[currentlyScanning.country]} {currentlyScanning.country}</span>
                </span>
              </div>
            )}

            {/* Country folders */}
            <div className="grid grid-cols-4 gap-1.5 h-full pt-3">
              {(Object.keys(counts) as Country[]).map((country) => {
                const count = counts[country];
                const active = currentlyScanning?.country === country;
                return (
                  <div
                    key={country}
                    className={cn(
                      "relative flex flex-col items-center justify-center px-1 py-1.5 rounded border transition-all duration-300",
                      active
                        ? "border-[#22C55E] bg-[#22C55E]/[0.08] scale-105 shadow-sm"
                        : count > 0
                        ? "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                        : "border-dashed border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    )}
                  >
                    <Folder
                      className={cn("h-4 w-4 mb-0.5", active ? "text-[#22C55E]" : count > 0 ? "text-[#525252] dark:text-[#A3A3A3]" : "text-[#D4D4D4] dark:text-[#404040]")}
                      strokeWidth={1.5}
                      fill={count > 0 ? "currentColor" : "none"}
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-[9px]">{COUNTRY_FLAG[country]}</span>
                      <span className={cn("text-[9px] font-semibold", count > 0 ? "text-[#171717] dark:text-[#E5E5E5]" : "text-[#A3A3A3]")}>{country}</span>
                    </div>
                    <span className={cn("text-[8px] font-semibold tabular-nums leading-none mt-0.5", count > 0 ? "text-[#22C55E]" : "text-[#A3A3A3]")}>
                      {count > 0 ? `${count} photo${count > 1 ? "s" : ""}` : "empty"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-2 px-2 py-1 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
          {isDone && <CheckCircle2 className="h-3 w-3 text-[#22C55E]" strokeWidth={2.5} />}
          <Stat label="Countries" value={countriesFound} />
          <Divider />
          <Stat label="Sorted" value={`${sorted.length}/${PHOTOS.length}`} />
        </div>
      </div>

      {/* Country chips below */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {(Object.keys(counts) as Country[]).map((country) => {
          const found = counts[country] > 0;
          return (
            <button
              key={country}
              type="button"
              onClick={() => {
                // jump to last photo of this country (or end)
                const lastIdx = PHOTOS.map((p, j) => (p.country === country ? j : -1)).filter((j) => j >= 0).at(-1);
                if (lastIdx !== undefined) {
                  setStep(lastIdx + 2); // +2 so the last photo is shown as sorted
                  setHasInteracted(true);
                }
              }}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                found
                  ? "border-[#22C55E] bg-[#22C55E]/[0.08] text-[#16A34A]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              <span className="text-[11px]">{COUNTRY_FLAG[country]}</span>
              <span>{country}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="text-[11px] font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums">{value}</span>
      <span className="text-[7px] text-[#737373] uppercase tracking-wide">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="w-px h-4 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />;
}

"use client";

import { useState, useEffect } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";

/**
 * WebP hero demo — pattern split-hero. Foto identica visivamente,
 * label badges del slider mostrano la transizione di formato + size.
 *
 * Stati cyclati: JPG → WebP / PNG → WebP / HEIC → WebP
 * I size sono REALI (calcolati con sharp dalla foto sorgente).
 */

type DemoState = {
  key: string;
  badge: string;
  inputFormat: string;
  inputSize: string;
  outputSize: string;
  reductionPct: number;
  alt: string;
};

const STATES: DemoState[] = [
  {
    key: "jpg",
    badge: "JPG",
    inputFormat: "JPG",
    inputSize: "190 KB",
    outputSize: "86 KB",
    reductionPct: 55,
    alt: "Web design laptop mockup photo converted from JPG to WebP format with 55% file size reduction",
  },
  {
    key: "png",
    badge: "PNG",
    inputFormat: "PNG",
    inputSize: "2.4 MB",
    outputSize: "86 KB",
    reductionPct: 96,
    alt: "Web design laptop mockup photo converted from PNG to WebP format with 96% file size reduction",
  },
  {
    key: "heic",
    badge: "HEIC",
    inputFormat: "HEIC",
    inputSize: "104 KB",
    outputSize: "86 KB",
    reductionPct: 18,
    alt: "Web design laptop mockup photo converted from HEIC iPhone format to WebP format with 18% file size reduction",
  },
];

const CYCLE_MS = 2800;

export default function WebpHeroDemo() {
  const [stateIdx, setStateIdx] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      setStateIdx((i) => (i + 1) % STATES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [hasInteracted]);

  const current = STATES[stateIdx];

  return (
    <div className="relative">
      <BeforeAfterSlider
        beforeSrc="/demo/webp-photo.jpg"
        afterSrc="/demo/webp-photo.jpg"
        beforeLabel={`${current.inputFormat} · ${current.inputSize}`}
        afterLabel={`WebP · ${current.outputSize} · −${current.reductionPct}%`}
        beforeAlt={`Source ${current.inputFormat} photo before WebP conversion`}
        afterAlt={current.alt}
        autoAnimate
        aspectRatio="16/10"
        className="shadow-sm"
      />

      {/* Format chips — hidden on mobile to avoid duplicate selector with the tool below */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-3 flex-wrap">
        {STATES.map((s, i) => {
          const active = i === stateIdx;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setStateIdx(i);
                setHasInteracted(true);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-all duration-300",
                active
                  ? "border-[#6366F1] bg-[#6366F1]/[0.08] text-[#6366F1] shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
              )}
            >
              <span
                className={cn(
                  "h-4 min-w-[2rem] px-1 rounded text-[10px] font-bold flex items-center justify-center",
                  active
                    ? "bg-[#6366F1] text-white"
                    : "bg-[#F5F5F5] dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3]"
                )}
              >
                {s.badge}
              </span>
              {`→ WebP −${s.reductionPct}%`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";

type DemoState = {
  key: string;
  label: string;
  src: string;
  alt: string;
  badge: string; // small text inside chip
};

const STATES: DemoState[] = [
  {
    key: "original",
    label: "Original",
    src: "/demo/upscale-original.jpg",
    alt: "Original low resolution macro photo before AI image upscaling, blurry and pixelated",
    badge: "1×",
  },
  {
    key: "2x",
    label: "2× Upscaled",
    src: "/demo/upscale-2x.jpg",
    alt: "Macro photo upscaled 2x with AI image upscaler, doubled resolution and sharper details",
    badge: "2×",
  },
  {
    key: "4x",
    label: "4× Upscaled",
    src: "/demo/upscale-4x.jpg",
    alt: "Macro photo upscaled 4x with AI image upscaler, four times the resolution with razor-sharp details",
    badge: "4×",
  },
];

const CYCLE_MS = 2800;

export default function UpscaleHeroDemo() {
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
      <div
        className="rounded-md overflow-hidden"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <BeforeAfterSlider
          beforeSrc="/demo/upscale-original.jpg"
          afterSrc={current.src}
          beforeLabel="Low-res"
          afterLabel={current.label}
          beforeAlt="Original low resolution macro photo before AI image upscaling, blurry and pixelated"
          afterAlt={current.alt}
          autoAnimate
          aspectRatio="16/10"
          className="shadow-sm"
        />
      </div>

      {/* Scale indicator chips — hidden on mobile (controls are in the tool below) */}
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
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.08] text-[#8B5CF6] shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
              )}
            >
              <span
                className={cn(
                  "h-4 min-w-[1.25rem] px-1 rounded text-[10px] font-bold flex items-center justify-center",
                  active
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-[#F5F5F5] dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3]"
                )}
              >
                {s.badge}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

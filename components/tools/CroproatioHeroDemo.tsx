"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Crop & Ratio hero demo — design custom: la stessa foto cycla tra 4 aspect
 * ratio (Instagram 1:1, Story 9:16, YouTube 16:9, Pinterest 4:5) e il
 * container cambia forma con animazione smooth, mostrando quale parte
 * della foto verrebbe ritagliata per ogni piattaforma social.
 */

type RatioState = {
  key: string;
  label: string;
  platform: string;
  src: string;
  alt: string;
  ratioStr: string;
};

const STATES: RatioState[] = [
  {
    key: "1-1",
    label: "1:1",
    platform: "Instagram square",
    src: "/demo/crop-1-1.jpg",
    alt: "Hot air balloon over Tuscany at sunrise cropped to 1:1 square aspect ratio for Instagram feed",
    ratioStr: "1 / 1",
  },
  {
    key: "16-9",
    label: "16:9",
    platform: "YouTube · Twitter",
    src: "/demo/crop-16-9.jpg",
    alt: "Hot air balloon over Tuscany at sunrise cropped to 16:9 widescreen aspect ratio for YouTube and Twitter",
    ratioStr: "16 / 9",
  },
  {
    key: "9-16",
    label: "9:16",
    platform: "Stories · Reels",
    src: "/demo/crop-9-16.jpg",
    alt: "Hot air balloon over Tuscany at sunrise cropped to 9:16 portrait aspect ratio for Instagram Stories and Reels",
    ratioStr: "9 / 16",
  },
  {
    key: "4-5",
    label: "4:5",
    platform: "Instagram portrait",
    src: "/demo/crop-4-5.jpg",
    alt: "Hot air balloon over Tuscany at sunrise cropped to 4:5 portrait aspect ratio for Instagram feed posts",
    ratioStr: "4 / 5",
  },
];

// Fixed height for the crop frame — width auto-derives from aspect-ratio
// (the parent container has h-[260px] minus padding & caption)
const FRAME_HEIGHT_PX = 195;

const CYCLE_MS = 2800;

export default function CroproatioHeroDemo() {
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
      {/* Stage area — fixed height container so layout doesn't jump on cycle */}
      <div className="rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] p-3 h-[260px] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="rounded overflow-hidden shadow-sm transition-[width] duration-700 ease-out"
          style={{
            aspectRatio: current.ratioStr,
            height: `${FRAME_HEIGHT_PX}px`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-2 text-center transition-opacity duration-300" key={current.key}>
          <p className="text-[11px] uppercase tracking-wide text-[#737373] dark:text-[#A3A3A3]">
            <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums mr-1.5">{current.label}</span>
            {current.platform}
          </p>
        </div>
      </div>

      {/* Ratio chips — hidden on mobile to avoid duplicate selector with the tool below */}
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
                  ? "border-[#EC4899] bg-[#EC4899]/[0.08] text-[#EC4899] shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
              )}
            >
              <span
                className={cn(
                  "h-4 min-w-[2.25rem] px-1 rounded text-[10px] font-bold flex items-center justify-center",
                  active
                    ? "bg-[#EC4899] text-white"
                    : "bg-[#F5F5F5] dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3]"
                )}
              >
                {s.label}
              </span>
              {s.platform}
            </button>
          );
        })}
      </div>
    </div>
  );
}

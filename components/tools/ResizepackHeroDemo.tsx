"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Resizepack hero demo — pattern split-hero. Stessa foto cycla in 4 preset
 * social media specifici (Instagram Post, Story, Twitter, LinkedIn) con
 * dimensioni pixel reali mostrate.
 *
 * Differenza vs croproatio: qui i chip parlano di DIMENSIONI specifiche
 * (1080×1080) per piattaforma, non di ratio generici.
 */

type ResizeState = {
  key: string;
  badge: string;
  platform: string;
  dimensions: string;
  src: string;
  alt: string;
  ratioStr: string;
};

const STATES: ResizeState[] = [
  {
    key: "ig-post",
    badge: "IG",
    platform: "Instagram Post",
    dimensions: "1080 × 1080",
    src: "/demo/resize-1-1.jpg",
    alt: "Brunch flat lay with avocado toast resized to 1080x1080 pixels for Instagram square feed post",
    ratioStr: "1 / 1",
  },
  {
    key: "ig-story",
    badge: "Story",
    platform: "Instagram Story",
    dimensions: "1080 × 1920",
    src: "/demo/resize-9-16.jpg",
    alt: "Brunch flat lay with avocado toast resized to 1080x1920 pixels for Instagram Stories and Reels portrait format",
    ratioStr: "9 / 16",
  },
  {
    key: "twitter",
    badge: "X",
    platform: "Twitter / X",
    dimensions: "1200 × 675",
    src: "/demo/resize-16-9.jpg",
    alt: "Brunch flat lay with avocado toast resized to 1200x675 pixels for Twitter X widescreen post",
    ratioStr: "16 / 9",
  },
  {
    key: "linkedin",
    badge: "Li",
    platform: "LinkedIn",
    dimensions: "1200 × 627",
    src: "/demo/resize-linkedin.jpg",
    alt: "Brunch flat lay with avocado toast resized to 1200x627 pixels for LinkedIn feed post sharing",
    ratioStr: "1.91 / 1",
  },
];

const FRAME_HEIGHT_PX = 195;
const CYCLE_MS = 2400;

export default function ResizepackHeroDemo() {
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
      {/* Stage area — fixed height, frame width auto-derives from aspect ratio */}
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
            <span className="font-mono font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums mr-1.5">
              {current.dimensions}
            </span>
            <span className="text-[#14B8A6] font-medium">{current.platform}</span>
          </p>
        </div>
      </div>

      {/* Platform chips — hidden on mobile to avoid duplicate selector with the tool below */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-3 flex-wrap">
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
                  ? "border-[#14B8A6] bg-[#14B8A6]/[0.08] text-[#14B8A6] shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
              )}
            >
              <span
                className={cn(
                  "h-4 min-w-[1.75rem] px-1 rounded text-[10px] font-bold flex items-center justify-center",
                  active
                    ? "bg-[#14B8A6] text-white"
                    : "bg-[#F5F5F5] dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3]"
                )}
              >
                {s.badge}
              </span>
              {s.platform}
            </button>
          );
        })}
      </div>
    </div>
  );
}

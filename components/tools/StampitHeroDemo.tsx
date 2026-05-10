"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Stampit hero demo — pattern split-hero. Stessa foto cycla tra 4 stati:
 * None → Corner (sottile, classic) → Center (forte) → Tiled (anti-crop diagonale).
 *
 * Il "wow" è soprattutto sul Tiled mode (diagonal repetition impossibile da
 * croppare via) che è il differenziatore di SammaPix vs altri watermark tool.
 */

type WatermarkState = {
  key: string;
  badge: string;
  label: string;
  src: string;
  alt: string;
};

const STATES: WatermarkState[] = [
  {
    key: "none",
    badge: "OFF",
    label: "Original",
    src: "/demo/stampit-none.jpg",
    alt: "Wedding couple walking through Tuscan olive grove at golden hour, no watermark applied",
  },
  {
    key: "corner",
    badge: "Corner",
    label: "Bottom-right corner",
    src: "/demo/stampit-corner.jpg",
    alt: "Wedding photography with subtle copyright watermark in the bottom-right corner, classic photographer signature style",
  },
  {
    key: "center",
    badge: "Center",
    label: "Center overlay",
    src: "/demo/stampit-center.jpg",
    alt: "Wedding photography with large semi-transparent copyright watermark in the center, premium proof image protection",
  },
  {
    key: "tiled",
    badge: "Tiled",
    label: "Anti-crop diagonal grid",
    src: "/demo/stampit-tiled.jpg",
    alt: "Wedding photography with copyright watermark tiled diagonally across the entire image to prevent cropping, anti-piracy protection",
  },
];

const CYCLE_MS = 2400;

export default function StampitHeroDemo() {
  const [stateIdx, setStateIdx] = useState(1); // start on Corner (most realistic default)
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
      {/* Photo with crossfade between watermark variants */}
      <div className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A]" style={{ aspectRatio: "16/10" }}>
        {STATES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.key}
            src={s.src}
            alt={s.alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
              i === stateIdx ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        {/* Mode label badge in corner */}
        <div className="absolute bottom-2 left-2 z-10">
          <span
            key={current.key}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-2 py-1 rounded backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <span className="bg-[#06B6D4] text-white px-1 rounded text-[9px] font-bold">
              {current.badge}
            </span>
            {current.label}
          </span>
        </div>
      </div>

      {/* Mode chips — hidden on mobile to avoid duplicate selector with the tool below */}
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
                  ? "border-[#06B6D4] bg-[#06B6D4]/[0.08] text-[#06B6D4] shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
              )}
            >
              <span
                className={cn(
                  "h-4 min-w-[2.25rem] px-1 rounded text-[10px] font-bold flex items-center justify-center",
                  active
                    ? "bg-[#06B6D4] text-white"
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

"use client";

import { useEffect, useState } from "react";

/**
 * Animated hero demo for /tools/color-match.
 *
 * Cycles through 3 "looks" (warm, cold, vintage) and visually walks through
 * the workflow: Reference photo → 3D LUT → Target photo recolored.
 *
 * Implemented with CSS gradients + SVG so we don't need static image assets.
 */

interface Look {
  name: string;
  ref: string; // CSS gradient for reference panel
  target: string; // CSS gradient for the result panel (same scene tinted)
  badge: string; // badge color
  cubeStops: [string, string, string]; // colors used inside the LUT cube viz
}

const LOOKS: Look[] = [
  {
    name: "Golden hour",
    ref: "linear-gradient(135deg, #FBBF24 0%, #F97316 45%, #DC2626 100%)",
    target:
      "linear-gradient(180deg, #FEF3C7 0%, #FCD34D 50%, #B45309 100%)",
    badge: "#F97316",
    cubeStops: ["#FBBF24", "#F97316", "#DC2626"],
  },
  {
    name: "Cinematic teal",
    ref: "linear-gradient(135deg, #0E7490 0%, #155E75 50%, #1E293B 100%)",
    target:
      "linear-gradient(180deg, #ECFEFF 0%, #67E8F9 50%, #155E75 100%)",
    badge: "#0E7490",
    cubeStops: ["#67E8F9", "#0E7490", "#1E293B"],
  },
  {
    name: "Vintage film",
    ref: "linear-gradient(135deg, #92400E 0%, #C2410C 35%, #44403C 100%)",
    target:
      "linear-gradient(180deg, #FAF5F0 0%, #D6B98C 50%, #4B2E1F 100%)",
    badge: "#92400E",
    cubeStops: ["#D6B98C", "#92400E", "#44403C"],
  },
];

const CYCLE_MS = 3200;

export default function ColorMatchHeroDemo() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % LOOKS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const look = LOOKS[idx];

  return (
    <div className="relative w-full max-w-[460px]">
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 bg-white dark:bg-[#191919] shadow-sm">
        {/* Top label */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide">
            Live preview
          </p>
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white transition-colors duration-700"
            style={{ backgroundColor: look.badge }}
          >
            {look.name}
          </span>
        </div>

        {/* Pipeline: reference → cube → target */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {/* Reference */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-full aspect-square rounded-md transition-all duration-700 ease-in-out"
              style={{ background: look.ref }}
              aria-hidden="true"
            />
            <p className="text-[10px] text-[#737373] dark:text-[#A3A3A3]">
              Reference
            </p>
          </div>

          {/* Arrow 1 */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 7 L11 7 M8 4 L11 7 L8 10"
              stroke="#A3A3A3"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* LUT cube */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-full aspect-square rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center overflow-hidden">
              <CubeViz colors={look.cubeStops} />
            </div>
            <p className="text-[10px] font-mono text-[#F59E0B]">
              .cube
            </p>
          </div>

          {/* Arrow 2 */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 7 L11 7 M8 4 L11 7 L8 10"
              stroke="#A3A3A3"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Target (recolored) */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-full aspect-square rounded-md transition-all duration-700 ease-in-out relative overflow-hidden"
              style={{ background: look.target }}
              aria-hidden="true"
            >
              {/* simulate a scene silhouette with a subtle horizon line */}
              <div className="absolute inset-x-0 bottom-1/3 h-px bg-black/10" />
              <div className="absolute left-[40%] bottom-[33%] w-2 h-3 rounded-t-full bg-black/15" />
            </div>
            <p className="text-[10px] text-[#737373] dark:text-[#A3A3A3]">
              50 photos
            </p>
          </div>
        </div>

        {/* Bottom step label */}
        <div className="mt-3 pt-3 border-t border-[#F5F5F5] dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {LOOKS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === idx
                    ? "w-6"
                    : "w-1 bg-[#E5E5E5] dark:bg-[#2A2A2A]"
                }`}
                style={i === idx ? { backgroundColor: look.badge } : undefined}
              />
            ))}
          </div>
          <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3]">
            Extract → Apply → Export
          </p>
        </div>
      </div>
    </div>
  );
}

/** Tiny 3D-ish color cube made of layered gradient quads (CSS-only, no library). */
function CubeViz({ colors }: { colors: [string, string, string] }) {
  return (
    <div className="relative w-[58%] aspect-square">
      {/* Back face */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          transform: "skewY(-12deg) translateX(15%)",
          opacity: 0.7,
        }}
      />
      {/* Top face */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 transition-colors duration-700"
        style={{
          background: `linear-gradient(180deg, ${colors[0]}, ${colors[1]})`,
          transform: "skewX(-30deg) translateY(-10%)",
          opacity: 0.55,
        }}
      />
      {/* Front face */}
      <div
        className="absolute inset-0 transition-colors duration-700 rounded-sm shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})`,
        }}
      />
      {/* Grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="33" y1="0" x2="33" y2="100" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
        <line x1="66" y1="0" x2="66" y2="100" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
        <line x1="0" y1="33" x2="100" y2="33" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
        <line x1="0" y1="66" x2="100" y2="66" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

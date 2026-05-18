"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Look {
  name: string;
  ref: string; // path to reference image in /public
  refAlt: string;
  /** CSS filter applied to the target image to fake the LUT effect for the demo. */
  targetFilter: string;
  badge: string;
}

const LOOKS: Look[] = [
  {
    name: "Warm sunset",
    ref: "/demo/color-match/ref-warm.jpg",
    refAlt: "Red hibiscus flower — warm-toned reference",
    targetFilter:
      "saturate(1.45) hue-rotate(-15deg) brightness(1.05) contrast(1.08) sepia(0.18)",
    badge: "#F97316",
  },
  {
    name: "Cinematic teal",
    ref: "/demo/color-match/ref-cold.jpg",
    refAlt: "Mountain lake with teal sky — cool-toned reference",
    targetFilter:
      "saturate(0.85) hue-rotate(155deg) brightness(0.95) contrast(1.15)",
    badge: "#0E7490",
  },
  {
    name: "Vintage film",
    ref: "/demo/color-match/ref-vintage.jpg",
    refAlt: "Night sky with autumn tree — vintage film reference",
    targetFilter:
      "sepia(0.45) saturate(0.85) brightness(0.92) contrast(0.95) hue-rotate(-5deg)",
    badge: "#92400E",
  },
];

const TARGET = "/demo/color-match/target.jpg";
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
        {/* Header */}
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

        {/* Pipeline: reference → arrow → target with LUT */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Reference */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              {LOOKS.map((l, i) => (
                <Image
                  key={l.ref}
                  src={l.ref}
                  alt={l.refAlt}
                  fill
                  sizes="200px"
                  className={`object-cover transition-opacity duration-700 ${
                    i === idx ? "opacity-100" : "opacity-0"
                  }`}
                  priority={i === 0}
                />
              ))}
            </div>
            <p className="text-[10px] text-[#737373] dark:text-[#A3A3A3]">
              Reference
            </p>
          </div>

          {/* Arrow + .cube label */}
          <div className="flex flex-col items-center gap-1.5 px-2">
            <svg
              width="42"
              height="14"
              viewBox="0 0 42 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7 L38 7 M34 3 L38 7 L34 11"
                stroke={look.badge}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-[stroke] duration-700"
              />
            </svg>
            <span
              className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded transition-colors duration-700"
              style={{ color: look.badge, backgroundColor: `${look.badge}18` }}
            >
              .cube
            </span>
          </div>

          {/* Target with simulated LUT */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <Image
                src={TARGET}
                alt="Target photo recolored to match the reference"
                fill
                sizes="200px"
                className="object-cover transition-[filter] duration-700"
                style={{ filter: look.targetFilter }}
              />
            </div>
            <p className="text-[10px] text-[#737373] dark:text-[#A3A3A3]">
              Matched
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-[#F5F5F5] dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {LOOKS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === idx ? "w-6" : "w-1 bg-[#E5E5E5] dark:bg-[#2A2A2A]"
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

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * FilmLab hero demo — pattern split-hero al massimo della sua espressività:
 * stessa foto cycla tra 5 mood drammatici (Raw / Kodak Gold / Cinematic Teal /
 * Ilford HP5 / Faded 70s), ognuno con personalità visiva diversa.
 *
 * I 5 SVG/JPG sono pre-processati con sharp per simulare il look del filtro
 * che il tool reale applica via Canvas API.
 */

type FilterState = {
  key: string;
  badge: string;
  src: string;
  alt: string;
  // Color of the active chip badge to hint the look
  accent: string;
};

const STATES: FilterState[] = [
  {
    key: "raw",
    badge: "Raw",
    src: "/demo/filmlab-raw.jpg",
    alt: "Vintage Vespa cafe scene with no filter applied, original colors",
    accent: "#A3A3A3",
  },
  {
    key: "kodak",
    badge: "Kodak Gold",
    src: "/demo/filmlab-kodak.jpg",
    alt: "Vintage Vespa cafe scene with Kodak Gold film preset, warm golden tones with moderate grain",
    accent: "#F59E0B",
  },
  {
    key: "cinematic",
    badge: "Cinematic Teal",
    src: "/demo/filmlab-cinematic.jpg",
    alt: "Vintage Vespa cafe scene with Cinematic Teal film preset, teal shadows and orange highlights Hollywood look",
    accent: "#0891B2",
  },
  {
    key: "hp5",
    badge: "Ilford HP5",
    src: "/demo/filmlab-hp5.jpg",
    alt: "Vintage Vespa cafe scene with Ilford HP5 black and white film preset, high contrast desaturation",
    accent: "#404040",
  },
  {
    key: "faded",
    badge: "Faded 70s",
    src: "/demo/filmlab-faded.jpg",
    alt: "Vintage Vespa cafe scene with Faded 70s film preset, lifted blacks and warm vintage cast",
    accent: "#A16207",
  },
];

const CYCLE_MS = 2400;

export default function FilmlabHeroDemo() {
  const [stateIdx, setStateIdx] = useState(1); // start on Kodak Gold (most popular)
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
      {/* Photo with smooth crossfade between filters */}
      <div className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A]" style={{ aspectRatio: "16/10" }}>
        {STATES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.key}
            src={s.src}
            alt={s.alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out",
              i === stateIdx ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        {/* Filter name badge in corner */}
        <div className="absolute bottom-2 left-2 z-10">
          <span
            key={current.key}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-2 py-1 rounded backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: current.accent }}
            />
            {current.badge}
          </span>
        </div>
      </div>

      {/* Filter chips — hidden on mobile to avoid duplicate selector with the tool below */}
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
                  ? "shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
              )}
              style={
                active
                  ? {
                      borderColor: s.accent,
                      backgroundColor: `${s.accent}15`,
                      color: s.accent,
                    }
                  : undefined
              }
            >
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: s.accent }}
              />
              {s.badge}
            </button>
          );
        })}
      </div>
    </div>
  );
}

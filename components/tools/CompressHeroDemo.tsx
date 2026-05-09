"use client";

import { useState, useEffect } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";

/**
 * Compress hero demo — pattern identico a remove-bg/upscale:
 * BeforeAfterSlider compatto + chip indicators sotto.
 *
 * La foto è la stessa a entrambi i lati (visivamente non cambia).
 * I label badges del slider mostrano i pesi file ("Original 4.2 MB" / "Q80 560 KB"):
 * questo è il punto, l'utente capisce che il file è cambiato anche se la foto no.
 */

type DemoState = {
  key: string;
  badge: string;
  src: string;
  alt: string;
  compressedSize: string;
  reductionPct: number;
};

const ORIGINAL_SIZE = "2.6 MB";

const STATES: DemoState[] = [
  {
    key: "q60",
    badge: "Q60",
    src: "/demo/compress-photo.jpg",
    alt: "Mountain lake landscape compressed at quality 60% with maximum file size reduction and no visible quality loss",
    compressedSize: "131 KB",
    reductionPct: 95,
  },
  {
    key: "q80",
    badge: "Q80",
    src: "/demo/compress-photo.jpg",
    alt: "Mountain lake landscape compressed at quality 80%, recommended balance between file size and visual fidelity",
    compressedSize: "212 KB",
    reductionPct: 92,
  },
  {
    key: "q95",
    badge: "Q95",
    src: "/demo/compress-photo.jpg",
    alt: "Mountain lake landscape compressed at quality 95%, near-lossless compression with maximum visual fidelity",
    compressedSize: "474 KB",
    reductionPct: 82,
  },
];

const CYCLE_MS = 2800;

export default function CompressHeroDemo() {
  const [stateIdx, setStateIdx] = useState(1); // start on Q80 (default of the tool)
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
        beforeSrc="/demo/compress-photo.jpg"
        afterSrc={current.src}
        beforeLabel={`Original · ${ORIGINAL_SIZE}`}
        afterLabel={`${current.badge} · ${current.compressedSize} · −${current.reductionPct}%`}
        beforeAlt="Original uncompressed landscape photography before image compression"
        afterAlt={current.alt}
        autoAnimate
        aspectRatio="16/10"
        className="shadow-sm"
      />

      {/* Quality chips — hidden on mobile to avoid duplicate selector with the tool below */}
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
                  "h-4 min-w-[1.75rem] px-1 rounded text-[10px] font-bold flex items-center justify-center",
                  active
                    ? "bg-[#6366F1] text-white"
                    : "bg-[#F5F5F5] dark:bg-[#1E1E1E] text-[#525252] dark:text-[#A3A3A3]"
                )}
              >
                {s.badge}
              </span>
              {`-${s.reductionPct}%`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

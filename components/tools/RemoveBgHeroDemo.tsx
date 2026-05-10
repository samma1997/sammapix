"use client";

import { useState, useEffect } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";

type DemoState = {
  key: string;
  label: string;
  src: string;
  alt: string;
  swatch: string | "checker";
};

const STATES: DemoState[] = [
  {
    key: "transparent",
    label: "Transparent",
    src: "/demo/remove-bg-transparent.png",
    alt: "White sneaker product photo with transparent PNG background after AI background removal",
    swatch: "checker",
  },
  {
    key: "white",
    label: "White",
    src: "/demo/remove-bg-white.jpg",
    alt: "White sneaker isolated on solid white background, Amazon and Shopify ready product photo",
    swatch: "#FFFFFF",
  },
  {
    key: "black",
    label: "Black",
    src: "/demo/remove-bg-black.jpg",
    alt: "White sneaker on solid black background, premium e-commerce product photography",
    swatch: "#0A0A0A",
  },
  {
    key: "custom",
    label: "Coral",
    src: "/demo/remove-bg-custom.jpg",
    alt: "White sneaker on custom coral pastel background after AI background replacement",
    swatch: "#FBE7DD",
  },
];

const CYCLE_MS = 2800;

export default function RemoveBgHeroDemo() {
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
      {/* Checker backdrop so Transparent state is visually distinguishable */}
      <div
        className="rounded-md overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #E5E5E5 25%, transparent 25%), linear-gradient(-45deg, #E5E5E5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E5E5E5 75%), linear-gradient(-45deg, transparent 75%, #E5E5E5 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          backgroundColor: "#FAFAFA",
        }}
      >
        <BeforeAfterSlider
          beforeSrc="/demo/remove-bg-original.png"
          afterSrc={current.src}
          beforeLabel="Original"
          afterLabel={current.label}
          beforeAlt="Original product photo of a white sneaker on coral background before AI background removal"
          afterAlt={current.alt}
          autoAnimate
          aspectRatio="16/10"
          className="shadow-sm"
        />
      </div>

      {/* Swatch indicators — hidden on mobile to avoid duplicate selector with the tool below */}
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
                className="h-3.5 w-3.5 rounded-sm border border-[#E5E5E5] dark:border-[#444]"
                style={
                  s.swatch === "checker"
                    ? {
                        backgroundImage:
                          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                        backgroundSize: "6px 6px",
                        backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0px",
                      }
                    : { backgroundColor: s.swatch }
                }
              />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

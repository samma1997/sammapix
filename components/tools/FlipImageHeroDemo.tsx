"use client";

import React, { useEffect, useState } from "react";

/**
 * Static animated hero demo for the Flip Image tool.
 * Shows a photo card flipping horizontally (mirror left-right) and vertically.
 * All CSS, no canvas, no runtime cost.
 */
export default function FlipImageHeroDemo() {
  const [step, setStep] = useState(0);

  // 0 = original, 1 = horizontal, 2 = both, 3 = vertical
  const transforms = [
    { scaleX: 1, scaleY: 1 },
    { scaleX: -1, scaleY: 1 },
    { scaleX: -1, scaleY: -1 },
    { scaleX: 1, scaleY: -1 },
  ];
  const labels = ["Original", "Flip H", "Flip H+V", "Flip V"];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 1700);
    return () => clearInterval(id);
  }, []);

  const t = transforms[step];

  return (
    <div className="relative flex flex-col items-center justify-center py-8 px-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden select-none">
      {/* Decorative dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #0EA5E9 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Mirror axis lines */}
      <div className="relative w-40 h-32 flex items-center justify-center" aria-hidden="true">
        {/* Horizontal axis */}
        <div
          className="absolute left-0 right-0 border-t border-dashed transition-opacity duration-400"
          style={{ top: "50%", borderColor: "#0EA5E9", opacity: step === 3 || step === 2 ? 0.7 : 0.15 }}
        />
        {/* Vertical axis */}
        <div
          className="absolute top-0 bottom-0 border-l border-dashed transition-opacity duration-400"
          style={{ left: "50%", borderColor: "#0EA5E9", opacity: step === 1 || step === 2 ? 0.7 : 0.15 }}
        />

        {/* Flipping image card */}
        <div
          style={{
            transform: `scaleX(${t.scaleX}) scaleY(${t.scaleY})`,
            transition: "transform 0.65s cubic-bezier(0.32, 0.72, 0, 1)",
            width: "120px",
            height: "84px",
            borderRadius: "8px",
            border: "2px solid #0EA5E9",
            background: "linear-gradient(135deg, #0EA5E920 0%, #0EA5E940 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(14,165,233,0.18)",
          }}
        >
          <svg width="76" height="54" viewBox="0 0 76 54" fill="none" aria-hidden="true">
            <rect width="76" height="54" rx="6" fill="#0EA5E9" fillOpacity="0.08" />
            {/* Sun top-left — makes the flip direction visible */}
            <circle cx="14" cy="14" r="5" fill="#0EA5E9" fillOpacity="0.55" />
            {/* Mountain silhouette */}
            <path
              d="M0 40 L16 26 L26 34 L40 20 L56 34 L76 20 L76 54 L0 54Z"
              fill="#0EA5E9"
              fillOpacity="0.2"
            />
          </svg>
        </div>
      </div>

      {/* Label badge */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#0EA5E9] text-white shadow-sm"
          style={{ minWidth: "80px", justifyContent: "center", transition: "opacity 0.3s" }}
        >
          {labels[step]}
        </span>
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">applied</span>
      </div>

      {/* Step dots */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {transforms.map((_, i) => (
          <span
            key={i}
            className="block rounded-full transition-all duration-300"
            style={{
              width: i === step ? "16px" : "6px",
              height: "6px",
              background: i === step ? "#0EA5E9" : "#D1D5DB",
            }}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="mt-4 text-[11px] text-[#A3A3A3] text-center leading-relaxed px-4">
        Flip horizontal, vertical or both at once.
        <br />
        Files never leave your browser.
      </p>
    </div>
  );
}

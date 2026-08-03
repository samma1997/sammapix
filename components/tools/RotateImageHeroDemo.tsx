"use client";

import React, { useEffect, useState } from "react";

/**
 * Static animated hero demo for the Rotate Image tool.
 * Shows a photo card rotating through 0° → 90° CW → 180° → 270° CW → 0°
 * All CSS, no canvas, no runtime cost.
 */
export default function RotateImageHeroDemo() {
  const [step, setStep] = useState(0);
  const angles = [0, 90, 180, -90];
  const labels = ["0°", "+90°", "180°", "-90°"];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const deg = angles[step];

  return (
    <div className="relative flex flex-col items-center justify-center py-8 px-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden select-none">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #0EA5E9 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        aria-hidden="true"
      />

      {/* Rotating image card */}
      <div
        className="relative w-36 h-36 flex items-center justify-center"
        style={{ perspective: "600px" }}
        aria-hidden="true"
      >
        <div
          style={{
            transform: `rotate(${deg}deg)`,
            transition: "transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
            width: "110px",
            height: "80px",
            borderRadius: "8px",
            border: "2px solid #0EA5E9",
            background: "linear-gradient(135deg, #0EA5E920 0%, #0EA5E940 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(14,165,233,0.18)",
          }}
        >
          {/* Simple landscape SVG inside the card */}
          <svg width="70" height="50" viewBox="0 0 70 50" fill="none" aria-hidden="true">
            <rect width="70" height="50" rx="6" fill="#0EA5E9" fillOpacity="0.08" />
            <circle cx="18" cy="16" r="6" fill="#0EA5E9" fillOpacity="0.5" />
            <path d="M0 38 L14 26 L24 34 L36 22 L50 32 L70 18 L70 50 L0 50Z" fill="#0EA5E9" fillOpacity="0.18" />
          </svg>
        </div>
      </div>

      {/* Angle badge */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#0EA5E9] text-white shadow-sm"
          style={{ minWidth: "56px", justifyContent: "center", transition: "opacity 0.3s" }}
        >
          {labels[step]}
        </span>
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">rotation applied</span>
      </div>

      {/* Step dots */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {angles.map((_, i) => (
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
        Rotate 90° CW, CCW, 180° or any custom angle.<br />
        Files never leave your browser.
      </p>
    </div>
  );
}

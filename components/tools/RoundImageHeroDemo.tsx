"use client";

import React, { useEffect, useState } from "react";

/**
 * Animated hero demo for the Round Image tool.
 * Shows a square photo morphing into a circle and then into rounded corners.
 * Pure CSS — no canvas, no runtime cost.
 */
export default function RoundImageHeroDemo() {
  const [step, setStep] = useState(0);

  const steps = [
    { borderRadius: "8px", label: "Original" },
    { borderRadius: "50%", label: "Circle" },
    { borderRadius: "32px", label: "Rounded 32px" },
    { borderRadius: "80px", label: "Rounded 80px" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1900);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = steps[step];

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

      {/* Checkerboard (simulates transparent background) */}
      <div
        className="absolute"
        style={{
          width: "144px",
          height: "144px",
          backgroundImage:
            "repeating-conic-gradient(#ccc 0% 25%, #f8f8f8 0% 50%) 0 0 / 12px 12px",
          borderRadius: current.borderRadius,
          transition: "border-radius 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        aria-hidden="true"
      />

      {/* Image (morphing shape) */}
      <div
        style={{
          width: "144px",
          height: "144px",
          borderRadius: current.borderRadius,
          overflow: "hidden",
          transition: "border-radius 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
          position: "relative",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <svg width="144" height="144" viewBox="0 0 144 144" fill="none">
          <rect width="144" height="144" fill="#0EA5E9" fillOpacity="0.12"/>
          {/* Sky */}
          <rect width="144" height="90" fill="#0EA5E9" fillOpacity="0.08"/>
          {/* Sun */}
          <circle cx="24" cy="28" r="14" fill="#0EA5E9" fillOpacity="0.45"/>
          {/* Mountains */}
          <path
            d="M0 98 L30 58 L52 80 L74 44 L104 72 L130 50 L144 64 L144 144 L0 144Z"
            fill="#0EA5E9" fillOpacity="0.25"
          />
          {/* Ground strip */}
          <rect x="0" y="128" width="144" height="16" fill="#0EA5E9" fillOpacity="0.15"/>
        </svg>
      </div>

      {/* Label badge */}
      <div className="mt-5 flex items-center gap-2" style={{ position: "relative", zIndex: 1 }}>
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#0EA5E9] text-white shadow-sm"
          style={{ minWidth: "120px", justifyContent: "center", transition: "opacity 0.3s" }}
        >
          {current.label}
        </span>
      </div>

      {/* Step dots */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true" style={{ position: "relative", zIndex: 1 }}>
        {steps.map((_, i) => (
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
      <p className="mt-4 text-[11px] text-[#A3A3A3] text-center leading-relaxed px-4" style={{ position: "relative", zIndex: 1 }}>
        Circle crop or rounded corners — transparent PNG output.
        <br />
        Files never leave your browser.
      </p>
    </div>
  );
}

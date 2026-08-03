"use client";

import React, { useEffect, useState } from "react";

/**
 * Static animated hero demo for the Add Border to Image tool.
 * Shows a photo card with a border that grows and changes color.
 * All CSS, no canvas, no runtime cost.
 */
export default function AddBorderHeroDemo() {
  const [step, setStep] = useState(0);

  const steps = [
    { borderWidth: 0, borderColor: "#0EA5E9", label: "Original" },
    { borderWidth: 10, borderColor: "#000000", label: "Black 10px" },
    { borderWidth: 20, borderColor: "#FFFFFF", label: "White 20px" },
    { borderWidth: 16, borderColor: "#0EA5E9", label: "Custom 16px" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1800);
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

      {/* Image with animated border */}
      <div className="relative flex items-center justify-center" style={{ width: "160px", height: "120px" }} aria-hidden="true">
        {/* Outer border layer (the "added" border, animates) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: current.borderWidth > 0 ? current.borderColor : "transparent",
            borderRadius: "10px",
            transition: "all 0.65s cubic-bezier(0.32, 0.72, 0, 1)",
            boxShadow: current.borderWidth > 0 ? `0 4px 20px rgba(0,0,0,0.18)` : "none",
          }}
        />
        {/* Inner image */}
        <div
          style={{
            position: "absolute",
            inset: `${current.borderWidth}px`,
            borderRadius: "6px",
            overflow: "hidden",
            transition: "inset 0.65s cubic-bezier(0.32, 0.72, 0, 1)",
            background: "linear-gradient(135deg, #0EA5E920 0%, #0EA5E940 100%)",
            border: "1.5px solid #0EA5E950",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 120 84" fill="none" aria-hidden="true">
            <rect width="120" height="84" fill="#0EA5E9" fillOpacity="0.08" />
            {/* Sun top-left */}
            <circle cx="16" cy="16" r="7" fill="#0EA5E9" fillOpacity="0.5" />
            {/* Mountain silhouette */}
            <path
              d="M0 58 L20 38 L34 48 L50 28 L72 46 L96 28 L120 38 L120 84 L0 84Z"
              fill="#0EA5E9"
              fillOpacity="0.2"
            />
            {/* Ground */}
            <rect x="0" y="72" width="120" height="12" fill="#0EA5E9" fillOpacity="0.12" />
          </svg>
        </div>
      </div>

      {/* Label badge */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#0EA5E9] text-white shadow-sm"
          style={{ minWidth: "100px", justifyContent: "center", transition: "opacity 0.3s" }}
        >
          {current.label}
        </span>
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">border</span>
      </div>

      {/* Step dots */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
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
      <p className="mt-4 text-[11px] text-[#A3A3A3] text-center leading-relaxed px-4">
        Add a border in any color and width.
        <br />
        Files never leave your browser.
      </p>
    </div>
  );
}

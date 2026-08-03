"use client";

import React, { useEffect, useState } from "react";

/**
 * Animated hero demo for Add Text to Image tool.
 * Shows a photo with text overlay cycling through positions and styles.
 * All CSS/SVG, no canvas, zero runtime cost.
 */
export default function AddTextToImageHeroDemo() {
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Summer 2024", position: "bottom", color: "#FFFFFF", stroke: "#000000", fontSize: 14 },
    { text: "© Luca Sammarco", position: "top", color: "#FFD700", stroke: "#000000", fontSize: 11 },
    { text: "No Upload", position: "center", color: "#0EA5E9", stroke: "#FFFFFF", fontSize: 13 },
    { text: "sammapix.com", position: "bottom", color: "#FFFFFF", stroke: "#0EA5E9", fontSize: 12 },
  ] as const;

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1900);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = steps[step];

  const textY =
    current.position === "top" ? 16 :
    current.position === "bottom" ? 72 :
    44; // center

  return (
    <div className="relative flex flex-col items-center justify-center py-8 px-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden select-none">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #0EA5E9 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Image canvas preview */}
      <div
        className="relative rounded-lg overflow-hidden shadow-md"
        style={{ width: "180px", height: "110px" }}
        aria-hidden="true"
      >
        <svg width="180" height="110" viewBox="0 0 180 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Image background */}
          <rect width="180" height="110" fill="#0EA5E9" fillOpacity="0.1" />
          {/* Sky gradient */}
          <rect width="180" height="60" fill="url(#sky)" />
          {/* Sun */}
          <circle cx="24" cy="20" r="10" fill="#F59E0B" fillOpacity="0.7" />
          {/* Mountains */}
          <path d="M0 70 L30 40 L50 55 L80 30 L110 52 L145 28 L180 45 L180 110 L0 110Z"
            fill="#0EA5E9" fillOpacity="0.25" />
          {/* Ground */}
          <rect x="0" y="90" width="180" height="20" fill="#0EA5E9" fillOpacity="0.14" />
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Text outline (stroke) */}
          <text
            x="90"
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={current.fontSize}
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            stroke={current.stroke}
            strokeWidth="2.5"
            fill="none"
            style={{ transition: "all 0.5s ease" }}
          >
            {current.text}
          </text>
          {/* Text fill */}
          <text
            x="90"
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={current.fontSize}
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fill={current.color}
            style={{ transition: "all 0.5s ease" }}
          >
            {current.text}
          </text>
        </svg>
      </div>

      {/* Label badge */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#0EA5E9] text-white shadow-sm"
          style={{ minWidth: "120px", justifyContent: "center", transition: "opacity 0.3s" }}
        >
          {current.position === "top" ? "Top" : current.position === "bottom" ? "Bottom" : "Center"}
        </span>
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">position</span>
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
        Add text anywhere on your image.
        <br />
        Files never leave your browser.
      </p>
    </div>
  );
}

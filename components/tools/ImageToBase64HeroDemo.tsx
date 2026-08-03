"use client";

import React, { useState, useEffect } from "react";

/**
 * Animated hero demo for the Image to Base64 tool.
 * Shows an image thumbnail morphing into a stream of base64 characters,
 * then back — loop cycle 4s.
 */
export default function ImageToBase64HeroDemo() {
  const [phase, setPhase] = useState<"image" | "encoding" | "text" | "decoding">("image");

  useEffect(() => {
    const timings: [typeof phase, number][] = [
      ["encoding", 1400],
      ["text", 2200],
      ["decoding", 3600],
      ["image", 4400],
    ];
    let idx = 0;
    const next = () => {
      const [p, delay] = timings[idx % timings.length];
      idx++;
      return setTimeout(() => {
        setPhase(p);
        timer = next();
      }, delay);
    };
    let timer = next();
    return () => clearTimeout(timer);
  }, []);

  const ACCENT = "#6366F1";

  return (
    <div
      className="relative rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#161616] overflow-hidden"
      style={{ minHeight: 220 }}
      aria-hidden="true"
    >
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#3A3A3A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#3A3A3A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5] dark:bg-[#3A3A3A]" />
        <span className="ml-2 text-[10px] text-[#A3A3A3] font-mono">Image to Base64</span>
      </div>

      <div className="flex items-stretch min-h-[168px]">
        {/* Left: image box */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-2">
          <div
            className="relative w-20 h-20 rounded-lg border flex items-center justify-center overflow-hidden transition-all duration-700"
            style={{
              borderColor: phase === "image" || phase === "decoding" ? ACCENT : "#E5E5E5",
              background: phase === "image" || phase === "decoding" ? `${ACCENT}0D` : "#F5F5F5",
              boxShadow: phase === "image" || phase === "decoding" ? `0 0 0 2px ${ACCENT}30` : "none",
              transform: phase === "encoding" ? "scale(0.92)" : "scale(1)",
            }}
          >
            {/* Mini landscape image representation */}
            <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
              <rect x="0" y="0" width="48" height="40" rx="4" fill={ACCENT} fillOpacity="0.08"/>
              <circle cx="14" cy="14" r="5" fill={ACCENT} fillOpacity="0.45"/>
              <path d="M0 30 L10 22 L18 27 L28 18 L38 24 L48 19 L48 40 L0 40 Z" fill={ACCENT} fillOpacity="0.18"/>
            </svg>
          </div>
          <span className="text-[9px] font-medium text-[#A3A3A3] font-mono">image.png</span>
        </div>

        {/* Center: arrow / encoding indicator */}
        <div className="flex flex-col items-center justify-center px-2 gap-1">
          <svg
            width="28"
            height="16"
            viewBox="0 0 28 16"
            fill="none"
            style={{
              opacity: phase === "encoding" || phase === "decoding" ? 1 : 0.3,
              transform: phase === "decoding" ? "scaleX(-1)" : "scaleX(1)",
              transition: "opacity 0.4s, transform 0.5s",
            }}
          >
            <path
              d="M2 8 L22 8 M17 3 L22 8 L17 13"
              stroke={ACCENT}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-[8px] font-mono font-bold transition-colors duration-300"
            style={{ color: phase === "encoding" || phase === "decoding" ? ACCENT : "#A3A3A3" }}
          >
            {phase === "decoding" ? "decode" : "encode"}
          </span>
        </div>

        {/* Right: base64 text box */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-2">
          <div
            className="relative w-full rounded-lg border p-2 font-mono transition-all duration-700 overflow-hidden"
            style={{
              borderColor: phase === "text" || phase === "encoding" ? ACCENT : "#E5E5E5",
              background: phase === "text" || phase === "encoding" ? `${ACCENT}0D` : "#F5F5F5",
              minHeight: 72,
              maxHeight: 88,
              boxShadow: phase === "text" ? `0 0 0 2px ${ACCENT}30` : "none",
            }}
          >
            {/* Animated base64 chars */}
            <Base64TextAnim active={phase === "text" || phase === "encoding"} accent={ACCENT} />
          </div>
          <span className="text-[9px] font-medium text-[#A3A3A3] font-mono">
            {phase === "text" ? "data:image/png;base64,..." : "base64 string"}
          </span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-white/80 dark:bg-[#161616]/80 backdrop-blur-sm border-t border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full transition-colors duration-300"
          style={{ background: phase === "image" || phase === "text" ? "#22C55E" : ACCENT }}
        />
        <span className="text-[9px] font-mono text-[#737373]">
          {phase === "image" && "Drop image to encode"}
          {phase === "encoding" && "Encoding..."}
          {phase === "text" && "Base64 ready — copy to clipboard"}
          {phase === "decoding" && "Decoding base64..."}
        </span>
      </div>
    </div>
  );
}

// ── Animated base64 text ──────────────────────────────────────────────────────

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const SAMPLE = "iVBORw0KGgoAAAANSUhEUgAABkAAAA";

function Base64TextAnim({ active, accent }: { active: boolean; accent: string }) {
  const [displayed, setDisplayed] = useState(SAMPLE.slice(0, 8));

  useEffect(() => {
    if (!active) {
      setDisplayed(SAMPLE.slice(0, 8));
      return;
    }
    let idx = 0;
    const interval = setInterval(() => {
      const rand = Array.from({ length: 6 }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join("");
      setDisplayed(SAMPLE.slice(0, 10 + (idx % 12)) + rand);
      idx++;
    }, 120);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <p
      className="text-[8px] leading-relaxed break-all"
      style={{ color: active ? accent : "#A3A3A3" }}
    >
      {displayed}
      {active && (
        <span
          className="inline-block w-1 h-2.5 ml-0.5 align-middle"
          style={{ background: accent, animation: "b64-blink 0.8s step-end infinite" }}
        />
      )}
      <style>{`@keyframes b64-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`}</style>
    </p>
  );
}

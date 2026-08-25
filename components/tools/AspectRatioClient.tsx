"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import FreeSignupAdBar from "@/components/ads/FreeSignupAdBar";
import { trackEvent } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "ratio-to-px" | "px-to-ratio" | "resize";

interface RatioPreset {
  label: string;
  w: number;
  h: number;
  cropSlug?: string;
}

// ─── Ratio data ───────────────────────────────────────────────────────────────

const RATIOS: { label: string; w: number; h: number; cropSlug?: string; presets: { label: string; w: number; h: number }[] }[] = [
  {
    label: "9:16",
    w: 9,
    h: 16,
    cropSlug: "9-16",
    presets: [
      { label: "720 × 1280", w: 720,  h: 1280 },
      { label: "1080 × 1920", w: 1080, h: 1920 },
      { label: "1440 × 2560", w: 1440, h: 2560 },
    ],
  },
  {
    label: "16:9",
    w: 16,
    h: 9,
    cropSlug: "16-9",
    presets: [
      { label: "1280 × 720",   w: 1280, h: 720  },
      { label: "1920 × 1080",  w: 1920, h: 1080 },
      { label: "3840 × 2160",  w: 3840, h: 2160 },
    ],
  },
  {
    label: "1:1",
    w: 1,
    h: 1,
    cropSlug: "1-1",
    presets: [
      { label: "720 × 720",   w: 720,  h: 720  },
      { label: "1080 × 1080", w: 1080, h: 1080 },
      { label: "3000 × 3000", w: 3000, h: 3000 },
    ],
  },
  {
    label: "4:5",
    w: 4,
    h: 5,
    cropSlug: "4-5",
    presets: [
      { label: "864 × 1080",  w: 864,  h: 1080 },
      { label: "1080 × 1350", w: 1080, h: 1350 },
      { label: "1440 × 1800", w: 1440, h: 1800 },
    ],
  },
  {
    label: "4:3",
    w: 4,
    h: 3,
    cropSlug: "4-3",
    presets: [
      { label: "1024 × 768",  w: 1024, h: 768  },
      { label: "1920 × 1440", w: 1920, h: 1440 },
      { label: "2048 × 1536", w: 2048, h: 1536 },
    ],
  },
  {
    label: "3:4",
    w: 3,
    h: 4,
    cropSlug: "3-4",
    presets: [
      { label: "768 × 1024",  w: 768,  h: 1024 },
      { label: "1200 × 1600", w: 1200, h: 1600 },
      { label: "1536 × 2048", w: 1536, h: 2048 },
    ],
  },
  {
    label: "3:2",
    w: 3,
    h: 2,
    cropSlug: "3-2",
    presets: [
      { label: "1800 × 1200", w: 1800, h: 1200 },
      { label: "2400 × 1600", w: 2400, h: 1600 },
      { label: "6000 × 4000", w: 6000, h: 4000 },
    ],
  },
  {
    label: "2:3",
    w: 2,
    h: 3,
    cropSlug: "2-3",
    presets: [
      { label: "800 × 1200",  w: 800,  h: 1200 },
      { label: "1000 × 1500", w: 1000, h: 1500 },
      { label: "1200 × 1800", w: 1200, h: 1800 },
    ],
  },
  {
    label: "5:4",
    w: 5,
    h: 4,
    cropSlug: "5-4",
    presets: [
      { label: "1280 × 1024", w: 1280, h: 1024 },
      { label: "2500 × 2000", w: 2500, h: 2000 },
      { label: "3000 × 2400", w: 3000, h: 2400 },
    ],
  },
  {
    label: "21:9",
    w: 21,
    h: 9,
    cropSlug: "21-9",
    presets: [
      { label: "2560 × 1080", w: 2560, h: 1080 },
      { label: "3440 × 1440", w: 3440, h: 1440 },
      { label: "5120 × 2160", w: 5120, h: 2160 },
    ],
  },
  {
    label: "2:1",
    w: 2,
    h: 1,
    cropSlug: "2-1",
    presets: [
      { label: "1200 × 600",  w: 1200, h: 600  },
      { label: "2000 × 1000", w: 2000, h: 1000 },
      { label: "2400 × 1200", w: 2400, h: 1200 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplifyRatio(w: number, h: number): string {
  if (!w || !h) return "";
  const g = gcd(Math.round(w), Math.round(h));
  return `${Math.round(w) / g}:${Math.round(h) / g}`;
}

function copyToClipboard(text: string, setCopied: (v: boolean) => void) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  });
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "ratio-to-px", label: "Ratio to pixels" },
  { id: "px-to-ratio", label: "Pixels to ratio" },
  { id: "resize",      label: "Resize ratio" },
];

// ─── RatioToPx tab ────────────────────────────────────────────────────────────

function RatioToPxTab() {
  const [selectedRatio, setSelectedRatio] = useState(RATIOS[0]);
  const [widthInput,  setWidthInput]  = useState("1080");
  const [heightInput, setHeightInput] = useState("");
  const [lastChanged, setLastChanged] = useState<"width" | "height">("width");
  const [copied, setCopied] = useState(false);

  const computedWidth  = lastChanged === "height" && heightInput
    ? Math.round((Number(heightInput) * selectedRatio.w) / selectedRatio.h)
    : Number(widthInput) || 0;

  const computedHeight = lastChanged === "width" && widthInput
    ? Math.round((Number(widthInput) * selectedRatio.h) / selectedRatio.w)
    : Number(heightInput) || 0;

  const resultW = lastChanged === "width"  ? computedWidth  : Number(widthInput)  || 0;
  const resultH = lastChanged === "height" ? computedHeight : Number(heightInput) || 0;
  const finalW  = lastChanged === "width"  ? resultW : computedWidth;
  const finalH  = lastChanged === "height" ? resultH : computedHeight;

  const resultText = finalW && finalH ? `${finalW} × ${finalH} px` : "";

  function handleWidthChange(val: string) {
    setWidthInput(val);
    setLastChanged("width");
  }
  function handleHeightChange(val: string) {
    setHeightInput(val);
    setLastChanged("height");
  }
  function handlePreset(preset: { w: number; h: number }) {
    setWidthInput(String(preset.w));
    setHeightInput(String(preset.h));
    setLastChanged("width");
  }
  function handleRatioChange(label: string) {
    const r = RATIOS.find((x) => x.label === label);
    if (r) {
      setSelectedRatio(r);
      setWidthInput(lastChanged === "height" ? widthInput : widthInput);
    }
  }
  function handleCalculate() {
    if (!finalW || !finalH) return;
    try {
      trackEvent("aspect_ratio_calculated", { mode: "ratio-to-px", ratio: selectedRatio.label, width: finalW, height: finalH });
    } catch {}
  }

  return (
    <div className="space-y-5">
      {/* Split hero: left = inputs, right = result */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: inputs */}
        <div className="bg-[#F9F9F9] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 space-y-4">
          {/* Ratio selector */}
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">
              Aspect ratio
            </label>
            <select
              value={selectedRatio.label}
              onChange={(e) => handleRatioChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            >
              {RATIOS.map((r) => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Width */}
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">
              Width (px)
            </label>
            <input
              type="number"
              min="1"
              value={widthInput}
              onChange={(e) => handleWidthChange(e.target.value)}
              onBlur={handleCalculate}
              placeholder="e.g. 1080"
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            />
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
            <span className="text-xs text-[#A3A3A3]">or enter height</span>
            <div className="flex-1 h-px bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">
              Height (px)
            </label>
            <input
              type="number"
              min="1"
              value={heightInput}
              onChange={(e) => handleHeightChange(e.target.value)}
              onBlur={handleCalculate}
              placeholder="e.g. 1920"
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            />
          </div>

          {/* Common presets */}
          <div>
            <p className="text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-2">
              Common sizes for {selectedRatio.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedRatio.presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handlePreset(p)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#6366F1] hover:text-[#6366F1] transition-colors duration-150"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: result */}
        <div className="bg-[#F9F9F9] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 flex flex-col">
          <p className="text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-3">Result</p>

          {finalW && finalH ? (
            <>
              {/* Big result */}
              <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div
                  className="w-16 h-auto mb-4 rounded-md border-2 border-[#6366F1]"
                  style={{
                    aspectRatio: `${selectedRatio.w}/${selectedRatio.h}`,
                    maxHeight: "64px",
                    background: "rgba(99,102,241,0.08)",
                  }}
                />
                <p className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums text-center">
                  {finalW} <span className="text-[#A3A3A3] font-normal">x</span> {finalH}
                </p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mt-1">pixels ({selectedRatio.label})</p>
              </div>

              {/* Copy button */}
              <button
                onClick={() => copyToClipboard(`${finalW}x${finalH}`, setCopied)}
                className="mt-3 w-full py-2 rounded-lg border border-[#6366F1] text-[#6366F1] text-sm font-medium hover:bg-[#6366F1] hover:text-white transition-colors duration-150"
              >
                {copied ? "Copied!" : `Copy ${finalW}x${finalH}`}
              </button>

              {/* CTAs */}
              <div className="mt-3 space-y-2">
                {selectedRatio.cropSlug && (
                  <Link
                    href={`/crop/${selectedRatio.cropSlug}`}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#6366F1] text-white text-sm font-medium hover:bg-[#4F46E5] transition-colors duration-150"
                  >
                    Crop image to {selectedRatio.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                )}
                <Link
                  href="/tools/resize"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] text-sm font-medium hover:border-[#6366F1] hover:text-[#6366F1] transition-colors duration-150"
                >
                  Resize to {finalW}x{finalH}
                </Link>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <div className="w-14 h-10 rounded-md border-2 border-dashed border-[#D4D4D4] dark:border-[#404040] mb-3" />
              <p className="text-sm text-[#A3A3A3] dark:text-[#525252]">
                Enter a width or height to see the result
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PxToRatio tab ────────────────────────────────────────────────────────────

function PxToRatioTab() {
  const [width,  setWidth]  = useState("1920");
  const [height, setHeight] = useState("1080");
  const [copied, setCopied] = useState(false);

  const w = Number(width)  || 0;
  const h = Number(height) || 0;
  const ratio = w && h ? simplifyRatio(w, h) : "";
  const decimal = w && h ? (w / h).toFixed(3) : "";

  // Find closest named ratio
  const closestNamed = ratio
    ? RATIOS.find((r) => simplifyRatio(r.w, r.h) === ratio)
    : null;

  function handleCalculate() {
    if (!w || !h) return;
    try {
      trackEvent("aspect_ratio_calculated", { mode: "px-to-ratio", width: w, height: h, ratio });
    } catch {}
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Left: inputs */}
      <div className="bg-[#F9F9F9] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">
            Width (px)
          </label>
          <input
            type="number"
            min="1"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            onBlur={handleCalculate}
            placeholder="e.g. 1920"
            className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">
            Height (px)
          </label>
          <input
            type="number"
            min="1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onBlur={handleCalculate}
            placeholder="e.g. 1080"
            className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
          />
        </div>
        <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
          The ratio is simplified using the greatest common divisor (GCD) of width and height.
        </p>
      </div>

      {/* Right: result */}
      <div className="bg-[#F9F9F9] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 flex flex-col">
        <p className="text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-3">Result</p>

        {ratio ? (
          <>
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <p className="text-4xl sm:text-5xl font-bold text-[#171717] dark:text-[#E5E5E5] text-center mb-2">
                {ratio}
              </p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">= {decimal}:1</p>
              {closestNamed && (
                <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-xs font-medium">
                  Standard ratio: {closestNamed.label}
                </span>
              )}
            </div>

            <button
              onClick={() => copyToClipboard(ratio, setCopied)}
              className="mt-3 w-full py-2 rounded-lg border border-[#6366F1] text-[#6366F1] text-sm font-medium hover:bg-[#6366F1] hover:text-white transition-colors duration-150"
            >
              {copied ? "Copied!" : `Copy ${ratio}`}
            </button>

            {closestNamed?.cropSlug && (
              <Link
                href={`/crop/${closestNamed.cropSlug}`}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#6366F1] text-white text-sm font-medium hover:bg-[#4F46E5] transition-colors duration-150"
              >
                Crop image to {closestNamed.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <p className="text-sm text-[#A3A3A3] dark:text-[#525252]">
              Enter width and height to compute the ratio
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Resize tab ───────────────────────────────────────────────────────────────

function ResizeTab() {
  const [origW,  setOrigW]  = useState("1920");
  const [origH,  setOrigH]  = useState("1080");
  const [newW,   setNewW]   = useState("1280");
  const [newH,   setNewH]   = useState("");
  const [lastResizeChanged, setLastResizeChanged] = useState<"width" | "height">("width");
  const [copied, setCopied] = useState(false);

  const ow = Number(origW) || 0;
  const oh = Number(origH) || 0;
  const nw = Number(newW)  || 0;
  const nh = Number(newH)  || 0;

  const computedNewH = lastResizeChanged === "width" && nw && ow && oh
    ? Math.round((nw * oh) / ow)
    : 0;
  const computedNewW = lastResizeChanged === "height" && nh && ow && oh
    ? Math.round((nh * ow) / oh)
    : 0;

  const finalNewW = lastResizeChanged === "width"  ? nw : computedNewW;
  const finalNewH = lastResizeChanged === "height" ? nh : computedNewH;

  const resultText = finalNewW && finalNewH ? `${finalNewW} × ${finalNewH} px` : "";

  function handleCalculate() {
    if (!finalNewW || !finalNewH) return;
    try {
      trackEvent("aspect_ratio_calculated", { mode: "resize", origW: ow, origH: oh, newW: finalNewW, newH: finalNewH });
    } catch {}
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Left: inputs */}
      <div className="bg-[#F9F9F9] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 space-y-4">
        <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide">Original size</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">Width</label>
            <input
              type="number" min="1" value={origW}
              onChange={(e) => setOrigW(e.target.value)}
              placeholder="1920"
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">Height</label>
            <input
              type="number" min="1" value={origH}
              onChange={(e) => setOrigH(e.target.value)}
              placeholder="1080"
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            />
          </div>
        </div>

        <div className="h-px bg-[#E5E5E5] dark:bg-[#2A2A2A]" />

        <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide">New size (enter one)</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">New width</label>
            <input
              type="number" min="1" value={newW}
              onChange={(e) => { setNewW(e.target.value); setLastResizeChanged("width"); }}
              onBlur={handleCalculate}
              placeholder="1280"
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-1.5">New height</label>
            <input
              type="number" min="1" value={newH}
              onChange={(e) => { setNewH(e.target.value); setLastResizeChanged("height"); }}
              onBlur={handleCalculate}
              placeholder="720"
              className="w-full px-3 py-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40"
            />
          </div>
        </div>
      </div>

      {/* Right: result */}
      <div className="bg-[#F9F9F9] dark:bg-[#222222] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 flex flex-col">
        <p className="text-xs font-medium text-[#737373] dark:text-[#A3A3A3] mb-3">Result</p>

        {finalNewW && finalNewH ? (
          <>
            <div className="flex-1 flex flex-col items-center justify-center py-4 text-center">
              <p className="text-xs text-[#A3A3A3] mb-1">{ow} x {oh} scaled to</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                {finalNewW} <span className="text-[#A3A3A3] font-normal">x</span> {finalNewH}
              </p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mt-1">px, same ratio</p>
              {ow && oh && (
                <p className="text-xs text-[#A3A3A3] mt-1">({simplifyRatio(ow, oh)})</p>
              )}
            </div>

            <button
              onClick={() => copyToClipboard(`${finalNewW}x${finalNewH}`, setCopied)}
              className="mt-3 w-full py-2 rounded-lg border border-[#6366F1] text-[#6366F1] text-sm font-medium hover:bg-[#6366F1] hover:text-white transition-colors duration-150"
            >
              {copied ? "Copied!" : `Copy ${finalNewW}x${finalNewH}`}
            </button>
            <Link
              href="/tools/resize"
              className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#6366F1] text-white text-sm font-medium hover:bg-[#4F46E5] transition-colors duration-150"
            >
              Resize image to {finalNewW}x{finalNewH}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <p className="text-sm text-[#A3A3A3] dark:text-[#525252]">
              Enter original size and one new dimension
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AspectRatioClient() {
  const [activeTab, setActiveTab] = useState<TabId>("ratio-to-px");

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-6">
      <FreeSignupAdBar tool="aspect-ratio" />

      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-[#F5F5F5] dark:bg-[#222222] rounded-xl mb-5 mt-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] shadow-sm"
                : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "ratio-to-px" && <RatioToPxTab />}
      {activeTab === "px-to-ratio" && <PxToRatioTab />}
      {activeTab === "resize"      && <ResizeTab />}
    </div>
  );
}

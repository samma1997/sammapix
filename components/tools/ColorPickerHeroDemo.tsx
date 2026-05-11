"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Palette, Pipette, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ColorPicker hero demo — foto travel a sx con crosshair eyedropper
 * animato che si muove tra i 6 punti di interesse della palette. Live
 * HEX tooltip vicino al crosshair. Palette 6 swatches sotto con HEX
 * value. Click chip → cambia foto.
 *
 * Brand color #A855F7 purple
 */

type ColorPoint = {
  /** percentage in image (0-100) */
  x: number;
  y: number;
  hex: string;
};

type Photo = {
  src: string;
  label: string;
  /** 6 dominant colors estratti */
  palette: ColorPoint[];
};

const PHOTOS: Photo[] = [
  {
    src: "/demo/cull-italy.webp",
    label: "Tuscany",
    palette: [
      { x: 50, y: 12, hex: "#F4D78A" }, // golden sky
      { x: 22, y: 38, hex: "#B5A36A" }, // hills
      { x: 75, y: 30, hex: "#7B6D3E" }, // dark hills
      { x: 50, y: 55, hex: "#946838" }, // villa
      { x: 30, y: 75, hex: "#3D4A26" }, // green field
      { x: 80, y: 80, hex: "#1F2A12" }, // trees dark
    ],
  },
  {
    src: "/demo/cull-thailand.webp",
    label: "Phi Phi",
    palette: [
      { x: 50, y: 10, hex: "#7FC7E0" }, // sky blue
      { x: 25, y: 30, hex: "#3D7A52" }, // green cliff
      { x: 75, y: 35, hex: "#A6CCA1" }, // bright vegetation
      { x: 50, y: 55, hex: "#7A5A2C" }, // wooden boat
      { x: 30, y: 80, hex: "#5EBFC8" }, // turquoise water
      { x: 80, y: 75, hex: "#9DD7DA" }, // shallow water
    ],
  },
  {
    src: "/demo/cull-france.webp",
    label: "Paris",
    palette: [
      { x: 50, y: 25, hex: "#E89A3C" }, // tower gold
      { x: 25, y: 18, hex: "#F2C25E" }, // bokeh lights
      { x: 78, y: 22, hex: "#2A3E66" }, // sky blue dark
      { x: 50, y: 60, hex: "#C76721" }, // tower glow
      { x: 30, y: 80, hex: "#1A2238" }, // dark river
      { x: 80, y: 70, hex: "#EAB35D" }, // warm reflection
    ],
  },
];

const STEP_MS = 1100;
const PHOTO_CHANGE_MS = 7400;

export default function ColorPickerHeroDemo() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [pickIdx, setPickIdx] = useState(0); // 0..5 picks
  const [hasInteracted, setHasInteracted] = useState(false);

  // Cycle through pick points
  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      setPickIdx((i) => (i + 1) % 6);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [hasInteracted]);

  // Cycle photos every ~7s
  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      setPhotoIdx((p) => (p + 1) % PHOTOS.length);
      setPickIdx(0);
    }, PHOTO_CHANGE_MS);
    return () => clearInterval(id);
  }, [hasInteracted]);

  const photo = PHOTOS[photoIdx];
  const activePoint = photo.palette[pickIdx];

  return (
    <div className="relative">
      <div
        className="relative rounded-md overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1E1E1E]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-medium text-[#737373] ml-1">
            {photo.label}.jpg · Color Picker
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#6B21A8] bg-[#A855F7]/12 dark:text-[#D8B4FE]">
            <Pipette className="h-2.5 w-2.5" strokeWidth={2.5} />
            HEX
          </div>
        </div>

        {/* Body: photo + palette */}
        <div className="px-2 py-2 grid grid-cols-[1.2fr_1fr] gap-2 h-[calc(100%-28px)]">
          {/* Photo with eyedropper */}
          <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
            <Image
              key={photo.src}
              src={photo.src}
              alt={`${photo.label} — color palette source`}
              fill
              sizes="180px"
              className="object-cover"
            />
            {/* Crosshair eyedropper */}
            <div
              className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-10 pointer-events-none"
              style={{
                left: `${activePoint.x}%`,
                top: `${activePoint.y}%`,
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-white shadow-lg" style={{ background: activePoint.hex }} />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-black/80 px-1.5 py-0.5 rounded shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: activePoint.hex }} />
                  {activePoint.hex}
                </span>
              </div>
            </div>
          </div>

          {/* Palette panel */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 mb-0.5">
              <Palette className="h-3 w-3 text-[#A855F7]" strokeWidth={2} />
              <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wide">
                Dominant palette
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 flex-1">
              {photo.palette.map((p, i) => {
                const isActive = i === pickIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      "flex items-center gap-1.5 px-1.5 py-1 rounded border transition-all duration-300 group",
                      isActive
                        ? "border-[#A855F7] shadow-sm scale-[1.04]"
                        : "border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#FAFAFA]"
                    )}
                    onClick={() => {
                      setHasInteracted(true);
                      setPickIdx(i);
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded border border-[#171717]/10 flex-shrink-0"
                      style={{ background: p.hex }}
                    />
                    <span className="text-[8.5px] font-mono font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
                      {p.hex}
                    </span>
                    {isActive ? (
                      <Check className="h-2 w-2 ml-auto text-[#A855F7]" strokeWidth={3} />
                    ) : (
                      <Copy className="h-2 w-2 ml-auto text-[#A3A3A3] opacity-0 group-hover:opacity-100" strokeWidth={2.5} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Photo chips */}
      <div className="hidden md:flex items-center justify-center gap-1 mt-1.5 flex-wrap">
        {PHOTOS.map((p, i) => {
          const active = i === photoIdx;
          return (
            <button
              key={p.src}
              type="button"
              onClick={() => {
                setHasInteracted(true);
                setPhotoIdx(i);
                setPickIdx(0);
              }}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border transition-all duration-300",
                active
                  ? "border-[#A855F7] bg-[#A855F7]/[0.08] text-[#6B21A8] dark:text-[#D8B4FE]"
                  : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] text-[#A3A3A3] hover:bg-[#F5F5F5]"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

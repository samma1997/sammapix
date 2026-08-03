"use client";

import React, { useEffect, useState } from "react";

/**
 * Animated hero demo for the Photo Collage Maker tool.
 * Shows a 2x2 grid of photo tiles that fill in one by one,
 * then transitions to a 3x3 layout preview.
 * Pure CSS/React, no canvas, zero runtime cost.
 */
export default function CollageMakerHeroDemo() {
  const [phase, setPhase] = useState(0); // 0=2x2, 1=3x1, 2=1x2 wide
  const [visibleCells, setVisibleCells] = useState(0);

  const layouts = [
    { label: "2x2 Grid", cols: 2, rows: 2, cells: 4 },
    { label: "3x1 Row", cols: 3, rows: 1, cells: 3 },
    { label: "1x2 Column", cols: 1, rows: 2, cells: 2 },
  ];

  const current = layouts[phase];

  useEffect(() => {
    setVisibleCells(0);
    // Animate cells appearing one by one
    let count = 0;
    const cellTimer = setInterval(() => {
      count += 1;
      setVisibleCells(count);
      if (count >= current.cells) {
        clearInterval(cellTimer);
      }
    }, 220);

    // Switch layout after showing all cells + pause
    const phaseTimer = setTimeout(() => {
      setPhase((p) => (p + 1) % layouts.length);
    }, current.cells * 220 + 1600);

    return () => {
      clearInterval(cellTimer);
      clearTimeout(phaseTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const ACCENT = "#0EA5E9";
  const GAP = 4;
  const CONTAINER_W = 160;
  const CONTAINER_H = 120;

  const cellW = (CONTAINER_W - GAP * (current.cols - 1)) / current.cols;
  const cellH = (CONTAINER_H - GAP * (current.rows - 1)) / current.rows;

  const palette = [
    { bg: "#0EA5E920", line: "#0EA5E960" },
    { bg: "#10B98120", line: "#10B98160" },
    { bg: "#F9731620", line: "#F9731660" },
    { bg: "#A855F720", line: "#A855F760" },
    { bg: "#EC489920", line: "#EC489960" },
    { bg: "#14B8A620", line: "#14B8A660" },
    { bg: "#F59E0B20", line: "#F59E0B60" },
    { bg: "#6366F120", line: "#6366F160" },
    { bg: "#22C55E20", line: "#22C55E60" },
  ];

  const totalCells = current.cols * current.rows;
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const col = i % current.cols;
    const row = Math.floor(i / current.cols);
    return {
      x: col * (cellW + GAP),
      y: row * (cellH + GAP),
      w: cellW,
      h: cellH,
      palette: palette[i % palette.length],
      visible: i < visibleCells,
    };
  });

  return (
    <div className="relative flex flex-col items-center justify-center py-8 px-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden select-none">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #0EA5E9 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Canvas preview */}
      <div
        className="relative rounded-md overflow-hidden"
        style={{
          width: CONTAINER_W,
          height: CONTAINER_H,
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
        aria-hidden="true"
      >
        {/* Background fill (gap color) */}
        <div
          className="absolute inset-0"
          style={{ background: ACCENT, opacity: 0.08 }}
        />

        {cells.map((cell, i) => (
          <div
            key={`${phase}-${i}`}
            style={{
              position: "absolute",
              left: cell.x,
              top: cell.y,
              width: cell.w,
              height: cell.h,
              background: cell.palette.bg,
              border: `1.5px solid ${cell.palette.line}`,
              borderRadius: 3,
              opacity: cell.visible ? 1 : 0,
              transform: cell.visible ? "scale(1)" : "scale(0.85)",
              transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.4,0.64,1)",
              overflow: "hidden",
            }}
          >
            {/* Tiny landscape illustration */}
            <svg width={cell.w} height={cell.h} viewBox={`0 0 ${cell.w} ${cell.h}`} fill="none">
              <circle cx={cell.w * 0.2} cy={cell.h * 0.25} r={cell.h * 0.15} fill={cell.palette.line} fillOpacity="0.6" />
              <path
                d={`M0 ${cell.h * 0.65} L${cell.w * 0.25} ${cell.h * 0.4} L${cell.w * 0.45} ${cell.h * 0.55} L${cell.w * 0.7} ${cell.h * 0.35} L${cell.w} ${cell.h * 0.5} L${cell.w} ${cell.h} L0 ${cell.h}Z`}
                fill={cell.palette.line}
                fillOpacity="0.35"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Label badge */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
          style={{
            background: ACCENT,
            color: "#fff",
            minWidth: 96,
            justifyContent: "center",
            transition: "opacity 0.3s",
          }}
        >
          {current.label}
        </span>
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">layout</span>
      </div>

      {/* Phase dots */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {layouts.map((_, i) => (
          <span
            key={i}
            className="block rounded-full transition-all duration-300"
            style={{
              width: i === phase ? "16px" : "6px",
              height: "6px",
              background: i === phase ? ACCENT : "#D1D5DB",
            }}
          />
        ))}
      </div>

      <p className="mt-4 text-[11px] text-[#A3A3A3] text-center leading-relaxed px-4">
        Choose a grid layout, combine your photos.
        <br />
        Files never leave your browser.
      </p>
    </div>
  );
}

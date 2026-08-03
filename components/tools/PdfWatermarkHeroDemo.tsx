"use client";

import React from "react";

export default function PdfWatermarkHeroDemo() {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] p-4"
      aria-hidden="true"
    >
      {/* PDF document mockup */}
      <div className="relative mx-auto w-full max-w-[280px] aspect-[210/297] bg-white dark:bg-[#252525] rounded-md shadow-md border border-[#E5E5E5] dark:border-[#333] overflow-hidden flex flex-col">
        {/* Document lines */}
        <div className="p-5 flex-1 flex flex-col gap-2.5">
          <div className="h-2 bg-[#E5E5E5] dark:bg-[#3A3A3A] rounded-full w-3/4" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-full" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-5/6" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-full" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-4/5" />
          <div className="mt-2 h-16 bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-full" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-3/4" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-full" />
          <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2E2E2E] rounded-full w-5/6" />
        </div>

        {/* Watermark overlay — diagonal CONFIDENTIAL */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ transform: "rotate(-35deg)" }}
        >
          <span
            className="text-[#EF4444] font-black tracking-widest text-[22px] uppercase"
            style={{ opacity: 0.22, letterSpacing: "0.18em" }}
          >
            CONFIDENTIAL
          </span>
        </div>
      </div>

      {/* Controls preview strip */}
      <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
        {(["CONFIDENTIAL", "DRAFT", "COPY", "SAMPLE"] as const).map((label, i) => (
          <span
            key={label}
            className={[
              "px-2 py-0.5 rounded text-[10px] font-semibold border font-mono",
              i === 0
                ? "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/5"
                : "border-[#E5E5E5] dark:border-[#333] text-[#A3A3A3] dark:text-[#525252]",
            ].join(" ")}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Privacy badge */}
      <p className="mt-3 text-center text-[10px] text-[#A3A3A3]">
        100% in your browser &middot; No upload
      </p>
    </div>
  );
}

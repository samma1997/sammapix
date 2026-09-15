"use client";

import React from "react";

/**
 * Zero-retention visual: a file card materialises, gets "processed" (a scan
 * sweep), then dissolves into particles and vanishes — conveying "processed in
 * memory, then discarded". Loops. Pure CSS.
 */
export default function ZeroRetentionVisual() {
  return (
    <div className="fa-zr relative flex h-[132px] w-full items-center justify-center" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="fa-zr-stage relative h-24 w-20">
        {/* the file */}
        <div className="fa-zr-file absolute inset-0 rounded-lg border border-[#E5E5E5] bg-white shadow-sm dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">
          <span className="fa-zr-dogear absolute right-0 top-0 h-4 w-4 rounded-bl-md border-b border-l border-[#E5E5E5] bg-[#FAFAFA] dark:border-[#2A2A2A] dark:bg-[#161616]" />
          <div className="absolute left-2.5 right-2.5 top-6 space-y-1.5">
            <span className="block h-1 w-3/4 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
            <span className="block h-1 w-full rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
            <span className="block h-1 w-2/3 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
            <span className="block h-1 w-5/6 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
          </div>
          {/* processing scan sweep */}
          <span className="fa-zr-scan absolute inset-x-0 top-0 h-6" />
        </div>

        {/* dissolve particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="fa-zr-particle" style={{ ["--n" as string]: i }} />
        ))}
      </div>
    </div>
  );
}

const css = `
.fa-zr-stage { --cycle: 5s; }

/* file lifecycle: appear -> hold/scan -> dissolve -> gone */
@keyframes fa-zr-life {
  0%   { opacity: 0; transform: translateY(8px) scale(0.94); filter: blur(2px); }
  12%  { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  60%  { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  78%  { opacity: 0; transform: translateY(-10px) scale(1.05); filter: blur(4px); }
  100% { opacity: 0; transform: translateY(-10px) scale(1.05); filter: blur(4px); }
}
.fa-zr-file { animation: fa-zr-life var(--cycle) cubic-bezier(0.32,0.72,0,1) infinite; }

/* scan sweep during the "hold" phase */
@keyframes fa-zr-sweep {
  0%, 18% { transform: translateY(0); opacity: 0; }
  24% { opacity: 1; }
  55% { transform: translateY(72px); opacity: 1; }
  60%, 100% { opacity: 0; }
}
.fa-zr-scan {
  background: linear-gradient(180deg, rgba(99,102,241,0), rgba(99,102,241,0.35), rgba(99,102,241,0));
  animation: fa-zr-sweep var(--cycle) ease-in-out infinite;
}

/* particles fly out during dissolve */
.fa-zr-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 4px;
  width: 4px;
  margin: -2px 0 0 -2px;
  border-radius: 9999px;
  background: #6366F1;
  opacity: 0;
  --angle: calc(var(--n) * 30deg);
  --dist: 46px;
  animation: fa-zr-burst var(--cycle) ease-out infinite;
}
@keyframes fa-zr-burst {
  0%, 62% { opacity: 0; transform: rotate(var(--angle)) translateX(0) scale(1); }
  70% { opacity: 0.9; }
  86%, 100% {
    opacity: 0;
    transform: rotate(var(--angle)) translateX(var(--dist)) scale(0.2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fa-zr-file { animation: none; opacity: 1; transform: none; filter: none; }
  .fa-zr-scan, .fa-zr-particle { display: none; }
}
`;

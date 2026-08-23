"use client";

import React, { useEffect, useState } from "react";

// ── WordToPdfHeroDemo ─────────────────────────────────────────────────────────
// Animated demo: a DOCX file icon morphs into a PDF icon, with a progress bar.
// Purely decorative CSS animation, no external dependencies.
// ─────────────────────────────────────────────────────────────────────────────

export default function WordToPdfHeroDemo() {
  const [phase, setPhase] = useState<"docx" | "converting" | "pdf">("docx");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    function run() {
      setPhase("docx");
      setProgress(0);

      t1 = setTimeout(() => {
        setPhase("converting");
        let p = 0;
        interval = setInterval(() => {
          p += Math.random() * 18 + 6;
          if (p >= 100) {
            p = 100;
            clearInterval(interval);
          }
          setProgress(Math.min(p, 100));
        }, 120);
      }, 1200);

      t2 = setTimeout(() => {
        setPhase("pdf");
        setProgress(100);
      }, 3200);

      t3 = setTimeout(() => {
        run();
      }, 5800);
    }

    run();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, []);

  const accent = "#6366F1";
  const red = "#EF4444";

  return (
    <div
      className="relative rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden select-none"
      style={{ padding: "28px 24px 24px" }}
      aria-hidden="true"
    >
      {/* Header bar */}
      <div className="flex items-center gap-1.5 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
        <span className="ml-auto text-[11px] text-[#A3A3A3] font-mono">word-to-pdf</span>
      </div>

      {/* Main animation area */}
      <div className="flex items-center justify-center gap-5 mb-6">
        {/* DOCX icon */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: phase === "pdf" ? 0.25 : 1,
            transform: phase === "pdf" ? "scale(0.88)" : "scale(1)",
          }}
        >
          <DocxIcon accent={accent} />
        </div>

        {/* Arrow + progress */}
        <div className="flex flex-col items-center gap-2 min-w-[60px]">
          <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
            <path
              d="M2 8 L36 8 M30 3 L36 8 L30 13"
              stroke={phase === "converting" ? accent : "#D1D5DB"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.3s" }}
            />
          </svg>
          {phase === "converting" && (
            <div className="w-full">
              <div className="h-1 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{ width: `${progress}%`, backgroundColor: accent }}
                />
              </div>
              <p className="text-[10px] text-[#A3A3A3] text-center mt-1">{Math.round(progress)}%</p>
            </div>
          )}
          {phase === "docx" && (
            <p className="text-[10px] text-[#A3A3A3] text-center">drop file</p>
          )}
          {phase === "pdf" && (
            <p className="text-[10px] text-[#16A34A] text-center font-medium">done</p>
          )}
        </div>

        {/* PDF icon */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: phase === "docx" ? 0.2 : 1,
            transform: phase === "pdf" ? "scale(1.06)" : "scale(0.9)",
          }}
        >
          <PdfIcon accent={red} />
        </div>
      </div>

      {/* Fidelity note */}
      <div className="px-3 py-2.5 bg-[#FAFAFA] dark:bg-[#252525] rounded-xl">
        <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed text-center">
          Best for standard documents. Very complex layouts may shift slightly.
        </p>
      </div>

      {/* Privacy badge */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
          <path d="M10 1.5 L17.5 5 L17.5 10 C17.5 14 14 17.5 10 18.5 C6 17.5 2.5 14 2.5 10 L2.5 5 Z" fill="#16A34A" fillOpacity="0.2" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M7 10 L9 12 L13 8" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[11px] text-[#737373] dark:text-[#A3A3A3]">Nothing uploaded. Runs in your browser.</span>
      </div>
    </div>
  );
}

// ── Sub-icons ──────────────────────────────────────────────────────────────────

function DocxIcon({ accent }: { accent: string }) {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="46" height="60" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"/>
      <path d="M34 2 L34 14 L46 14" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="0" y="40" width="50" height="16" rx="3" fill={accent}/>
      <text x="25" y="51.5" fontSize="9" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">DOCX</text>
      <line x1="8" y1="20" x2="38" y2="20" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="26" x2="38" y2="26" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="32" x2="30" y2="32" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function PdfIcon({ accent }: { accent: string }) {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="46" height="60" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"/>
      <path d="M34 2 L34 14 L46 14" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="0" y="40" width="50" height="16" rx="3" fill={accent}/>
      <text x="25" y="51.5" fontSize="9" fill="white" textAnchor="middle" fontWeight="800" fontFamily="monospace">PDF</text>
      <line x1="8" y1="20" x2="38" y2="20" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="26" x2="38" y2="26" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="32" x2="30" y2="32" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

/**
 * AI Rename hero demo — design specifico per ai-rename.
 * Mostra una mock file list con 4 thumbnail reali (riusate dagli altri tool)
 * e ogni N secondi UNA riga si "auto-rinomina" con typing animation char-by-char,
 * dimostrando il valore: filename generico → filename SEO-friendly.
 *
 * Quando tutte e 4 sono SEO-named, dopo una pausa il cycle riparte
 * (tornano tutte a IMG_xxxx.jpg, poi una a una si rinominano).
 */

type FileEntry = {
  thumb: string;
  alt: string;
  genericName: string;
  seoName: string;
};

const FILES: FileEntry[] = [
  {
    thumb: "/demo/remove-bg-original.png",
    alt: "Product photography of a white sneaker",
    genericName: "IMG_0042.jpg",
    seoName: "white-sneaker-side-profile-product-shot.jpg",
  },
  {
    thumb: "/demo/upscale-4x.jpg",
    alt: "Macro photography of a great horned owl eye",
    genericName: "IMG_0073.jpg",
    seoName: "great-horned-owl-eye-macro-wildlife.jpg",
  },
  {
    thumb: "/demo/compress-photo.jpg",
    alt: "Mountain lake landscape at golden hour",
    genericName: "IMG_0124.jpg",
    seoName: "moraine-lake-banff-sunset-canada.jpg",
  },
  {
    thumb: "/demo/webp-photo.jpg",
    alt: "Modern laptop with website mockup on desk",
    genericName: "IMG_0156.jpg",
    seoName: "modern-laptop-desk-coffee-web-design.jpg",
  },
];

const TYPING_SPEED_MS = 35; // per character
const PAUSE_BETWEEN_FILES_MS = 600;
const PAUSE_AFTER_ALL_DONE_MS = 1800;

type RowState = {
  text: string; // currently displayed name
  status: "generic" | "renaming" | "done";
};

export default function AiRenameHeroDemo() {
  const [rows, setRows] = useState<RowState[]>(() =>
    FILES.map((f) => ({ text: f.genericName, status: "generic" as const }))
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    async function runCycle() {
      while (!cancelledRef.current) {
        // 1. Reset all rows to generic
        setRows(FILES.map((f) => ({ text: f.genericName, status: "generic" as const })));
        await sleep(PAUSE_BETWEEN_FILES_MS);
        if (cancelledRef.current) return;

        // 2. For each file, animate the rename (typing effect)
        for (let i = 0; i < FILES.length; i++) {
          if (cancelledRef.current) return;
          setActiveIdx(i);
          const target = FILES[i].seoName;

          // Mark as "renaming" and wipe text
          setRows((prev) =>
            prev.map((r, j) => (j === i ? { text: "", status: "renaming" } : r))
          );
          await sleep(150);
          if (cancelledRef.current) return;

          // Type each char
          for (let c = 1; c <= target.length; c++) {
            if (cancelledRef.current) return;
            const partial = target.slice(0, c);
            setRows((prev) =>
              prev.map((r, j) => (j === i ? { text: partial, status: "renaming" } : r))
            );
            await sleep(TYPING_SPEED_MS);
          }

          // Mark as done
          setRows((prev) =>
            prev.map((r, j) => (j === i ? { text: target, status: "done" } : r))
          );
          await sleep(PAUSE_BETWEEN_FILES_MS);
        }

        setActiveIdx(null);
        await sleep(PAUSE_AFTER_ALL_DONE_MS);
      }
    }

    runCycle();

    return () => {
      cancelledRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function sleep(ms: number) {
    return new Promise<void>((resolve) => {
      timeoutRef.current = setTimeout(resolve, ms);
    });
  }

  return (
    <div className="rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#A3A3A3] font-mono">4 photos · ai-rename</span>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#6366F1] font-medium">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          Gemini 2.5
        </span>
      </div>

      {/* File rows */}
      <ul role="list" className="divide-y divide-[#F5F5F5] dark:divide-[#2A2A2A]">
        {FILES.map((file, i) => {
          const row = rows[i];
          const isActive = activeIdx === i;
          const isDone = row.status === "done";
          return (
            <li key={file.thumb} className="flex items-center gap-3 px-3 py-2.5">
              {/* Thumbnail */}
              <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.thumb}
                  alt={file.alt}
                  className="h-full w-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-[#6366F1]/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white animate-pulse" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              {/* Filename text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[13px] font-mono truncate transition-colors ${
                    isDone
                      ? "text-[#16A34A]"
                      : isActive
                        ? "text-[#6366F1]"
                        : "text-[#737373] dark:text-[#A3A3A3]"
                  }`}
                  aria-live={isActive ? "polite" : undefined}
                >
                  {row.text}
                  {isActive && row.status === "renaming" && (
                    <span className="inline-block w-[1ch] -mb-px align-text-bottom border-r-2 border-[#6366F1] animate-pulse ml-0.5" />
                  )}
                </p>
              </div>

              {/* Status icon */}
              <div className="shrink-0 w-5 text-right">
                {isDone && (
                  <svg
                    className="h-4 w-4 text-[#16A34A] inline-block"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

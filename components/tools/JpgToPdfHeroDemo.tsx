"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FileText, FileImage, Sparkles, Download, ArrowDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * JpgToPdf hero demo — 4 JPG thumbnail in lista orizzontale che si fondono
 * in 1 PDF multi-page (preview con pagine stacked che mostrano le foto
 * vere). Format toggle A4 / Letter visibile. Bottone Download .pdf.
 *
 * Brand color #DC2626 red
 */

const PHOTOS = [
  { src: "/demo/cull-italy.webp",    name: "tuscany.jpg" },
  { src: "/demo/cull-japan.webp",    name: "torii.jpg" },
  { src: "/demo/cull-france.webp",   name: "eiffel.jpg" },
  { src: "/demo/cull-thailand.webp", name: "phi-phi.jpg" },
];

const PULSE_MS = 1400;
const MERGE_MS = 900;
const DONE_PAUSE_MS = 2400;

type Phase = "pulsing" | "merging" | "done";
type PageSize = "A4" | "Letter";

export default function JpgToPdfHeroDemo() {
  const [phase, setPhase] = useState<Phase>("pulsing");
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "pulsing") {
      timeoutId = setTimeout(() => !cancelled && setPhase("merging"), PULSE_MS);
    } else if (phase === "merging") {
      timeoutId = setTimeout(() => !cancelled && setPhase("done"), MERGE_MS);
    } else {
      timeoutId = setTimeout(() => !cancelled && setPhase("pulsing"), DONE_PAUSE_MS);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase, hasInteracted]);

  const isDone = phase === "done";
  const isMerging = phase === "merging";

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">JPG → PDF · {PHOTOS.length} images</span>
          {/* Page size selector */}
          <div className="ml-auto inline-flex bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded p-0.5 gap-0.5">
            {(["A4", "Letter"] as PageSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setHasInteracted(true);
                  setPageSize(s);
                }}
                className={cn(
                  "text-[8.5px] font-bold px-1.5 py-0.5 rounded transition-colors",
                  pageSize === s
                    ? "bg-[#DC2626] text-white"
                    : "text-[#737373] hover:bg-[#F5F5F5]"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-2.5 py-2 flex flex-col h-[calc(100%-28px)] gap-2">
          {!isDone ? (
            <>
              {/* JPG thumbnails row */}
              <div className="grid grid-cols-4 gap-1.5">
                {PHOTOS.map((p, i) => (
                  <div
                    key={p.name}
                    className="relative aspect-square rounded border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden"
                    style={{
                      animation: isMerging ? `jpd-collapse 0.7s ease-in-out forwards` : "none",
                      animationDelay: isMerging ? `${i * 0.08}s` : "0s",
                    }}
                  >
                    <Image src={p.src} alt={p.name} fill sizes="80px" className="object-cover" />
                    <div className="absolute top-0.5 left-0.5">
                      <span className="text-[7px] font-bold px-1 py-0.5 rounded bg-black/60 text-white">
                        JPG
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-1 py-0.5">
                      <span className="text-[7px] font-mono text-white truncate block">{p.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Down arrow indicator */}
              <div className="flex flex-col items-center -my-1">
                <ArrowDown className={cn("h-3.5 w-3.5 text-[#DC2626]", phase === "pulsing" && "animate-bounce")} strokeWidth={2.5} />
              </div>

              {/* Merge button */}
              <button
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-[11px] font-bold text-white transition-all",
                  isMerging ? "bg-[#DC2626] scale-95" : "bg-[#DC2626] hover:bg-[#B91C1C]"
                )}
                style={{
                  animation: phase === "pulsing" ? "jpd-pulse 1.4s ease-in-out infinite" : "none",
                }}
              >
                {isMerging ? (
                  <>
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} style={{ animation: "jpd-spin 1s linear infinite" }} />
                    Creating PDF…
                  </>
                ) : (
                  <>
                    <FileText className="h-3 w-3" strokeWidth={2.5} />
                    Make {pageSize} PDF
                  </>
                )}
              </button>
            </>
          ) : (
            /* Done: PDF preview with page stack */
            <div className="flex-1 flex items-center justify-center"
              style={{ animation: "jpd-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg border-2 border-[#DC2626]/40 bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 shadow-sm">
                {/* PDF preview stack */}
                <div className="relative w-14 h-16 flex-shrink-0">
                  {/* Stacked pages (back to front) */}
                  {PHOTOS.slice().reverse().map((p, i) => {
                    const isTop = i === PHOTOS.length - 1;
                    return (
                      <div
                        key={p.name}
                        className={cn(
                          "absolute w-12 h-15 rounded bg-white shadow-md overflow-hidden border",
                          isTop ? "border-[#DC2626]/50" : "border-[#E5E5E5]"
                        )}
                        style={{
                          top: `${i * 1.5}px`,
                          left: `${i * 1.5}px`,
                          height: "60px",
                          width: "44px",
                          zIndex: i,
                        }}
                      >
                        <Image src={p.src} alt="" fill sizes="44px" className="object-cover" />
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-bold text-[#171717] dark:text-[#E5E5E5]">
                    travel-photos.pdf
                  </div>
                  <div className="text-[10px] text-[#737373] mt-0.5 tabular-nums">
                    <span className="font-semibold text-[#DC2626]">{PHOTOS.length}</span> pages ·{" "}
                    <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{pageSize}</span> ·{" "}
                    1.2 MB
                  </div>
                  <div className="text-[8.5px] text-[#737373] mt-0.5">
                    JPG + WebP combined
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold text-white bg-[#DC2626] hover:bg-[#B91C1C]">
                  <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
                  PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileText className="h-2.5 w-2.5 text-[#DC2626]" strokeWidth={2} />
        <span>Drag to reorder · A4 + Letter · Up to 200 pages · JPG · PNG · WebP</span>
      </div>

      <style jsx>{`
        @keyframes jpd-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
        }
        @keyframes jpd-collapse {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          70% { transform: translateY(20px) scale(0.8); opacity: 0.5; }
          100% { transform: translateY(50px) scale(0.4); opacity: 0; }
        }
        @keyframes jpd-pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes jpd-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

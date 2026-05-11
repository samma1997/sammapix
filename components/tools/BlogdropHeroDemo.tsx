"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Sparkles, Minimize2, FileImage, Tag, CheckCircle2, Download, Maximize2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BlogDrop hero demo — pipeline 4-step (Compress → Resize 1200 → WebP →
 * SEO name) sopra. Sotto: WordPress-like post preview con foto inserita
 * + caption + alt text per dimostrare che è "blog-ready".
 *
 * Brand color #8B5CF6 violet
 */

const STEPS = [
  { id: "compress", label: "Compress",   short: "−",  Icon: Minimize2 },
  { id: "resize",   label: "1200px",     short: "↔",  Icon: Maximize2 },
  { id: "webp",     label: "WebP",       short: "W",  Icon: FileImage },
  { id: "seo",      label: "SEO name",   short: "▸",  Icon: Tag },
] as const;

type Sample = {
  src: string;
  origName: string;
  origSize: number;  // KB
  finalName: string;
  finalSize: number; // KB
  altText: string;
  postTitle: string;
};

const SAMPLES: Sample[] = [
  {
    src: "/demo/cull-italy.webp",
    origName: "IMG_4012.jpg",
    origSize: 3420,
    finalName: "tuscany-villa-cypress-trees-golden-hour.webp",
    finalSize: 184,
    altText: "Stone Tuscan villa surrounded by cypress trees at golden hour",
    postTitle: "10 Days in Tuscany: A Photo Diary",
  },
  {
    src: "/demo/cull-japan.webp",
    origName: "DSC_8821.jpg",
    origSize: 2890,
    finalName: "torii-mt-fuji-cherry-blossom-japan.webp",
    finalSize: 156,
    altText: "Red torii gate with Mt Fuji and cherry blossoms",
    postTitle: "Japan in Spring: My Travel Guide",
  },
];

const STEP_MS = 750;
const PAUSE_MS = 2400;

function formatKB(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export default function BlogdropHeroDemo() {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [stepDone, setStepDone] = useState(0); // 0..4
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStepDone((s) => {
        if (s >= STEPS.length) {
          timeoutId = setTimeout(() => {
            if (!cancelled) {
              setSampleIdx((i) => (i + 1) % SAMPLES.length);
              setStepDone(0);
            }
          }, PAUSE_MS);
          return s;
        }
        timeoutId = setTimeout(tick, STEP_MS);
        return s + 1;
      });
    };
    timeoutId = setTimeout(tick, STEP_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [hasInteracted, stepDone, sampleIdx]);

  const sample = SAMPLES[sampleIdx];
  const isDone = stepDone >= STEPS.length;
  const currentName = stepDone >= STEPS.length ? sample.finalName : sample.origName;
  // Size progression: orig → after compress → after resize → after webp → final
  const sizeAfter = [sample.origSize, sample.origSize * 0.55, sample.origSize * 0.32, sample.finalSize, sample.finalSize];
  const currentSize = Math.round(sizeAfter[Math.min(stepDone, STEPS.length)]);
  const savedPct = Math.round(((sample.origSize - currentSize) / sample.origSize) * 100);

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
          <span className="text-[10px] font-medium text-[#737373] ml-1">BlogDrop · WordPress-ready</span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#5B21B6] bg-[#8B5CF6]/12 dark:text-[#C4B5FD]">
            <FileText className="h-2.5 w-2.5" strokeWidth={2.5} />
            CMS
          </div>
        </div>

        <div className="px-2.5 py-2 flex flex-col h-[calc(100%-28px)] gap-2">
          {/* Pipeline 4 steps */}
          <div className="flex items-center gap-0.5">
            {STEPS.map((s, i) => {
              const done = i < stepDone;
              const active = i === stepDone && !isDone;
              return (
                <div key={s.id} className="flex items-center gap-0.5 flex-1">
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center px-0.5 py-1 rounded border transition-all duration-300 flex-1",
                      done
                        ? "border-[#22C55E]/40 bg-[#22C55E]/[0.06]"
                        : active
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.08] scale-105 shadow-sm"
                        : "border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-3 w-3 text-[#16A34A] mb-0.5" strokeWidth={2.5} />
                    ) : active ? (
                      <s.Icon className="h-3 w-3 text-[#8B5CF6] mb-0.5" strokeWidth={2} style={{ animation: "bd-spin 1s linear infinite" }} />
                    ) : (
                      <s.Icon className="h-3 w-3 text-[#A3A3A3] mb-0.5" strokeWidth={2} />
                    )}
                    <span className={cn("text-[8px] font-semibold leading-none", done ? "text-[#16A34A]" : active ? "text-[#5B21B6] dark:text-[#C4B5FD]" : "text-[#A3A3A3]")}>
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* WordPress post preview */}
          <div className="flex-1 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden flex flex-col">
            {/* Browser mini-bar */}
            <div className="px-2 py-1 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A] flex items-center gap-1">
              <span className="text-[8px] font-mono text-[#A3A3A3] truncate">myblog.com/post-preview</span>
              <span className="ml-auto inline-flex items-center gap-0.5 text-[8px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-1 py-0.5 rounded">
                <CheckCircle2 className="h-2 w-2" strokeWidth={2.5} />
                {savedPct}%
              </span>
            </div>
            {/* Post content mock */}
            <div className="flex-1 p-2 flex flex-col gap-1.5">
              {/* Post title */}
              <div className="text-[10.5px] font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight">
                {sample.postTitle}
              </div>
              {/* Image inserted in post */}
              <div className="relative aspect-[16/9] rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <Image
                  src={sample.src}
                  alt={sample.altText}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                {/* Filename overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 py-1">
                  <span
                    key={currentName}
                    className="block text-[8px] font-mono font-semibold text-white truncate"
                    style={{ animation: stepDone === STEPS.length ? "bd-fade 0.5s ease-out" : "none" }}
                  >
                    {currentName}
                  </span>
                </div>
              </div>
              {/* Alt text + size info */}
              <div className="flex items-center gap-1.5 text-[8.5px]">
                <span className="font-semibold text-[#737373]">alt:</span>
                <span className="text-[#171717] dark:text-[#E5E5E5] truncate flex-1">
                  {isDone ? sample.altText : "(generating…)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[8px] text-[#737373] tabular-nums">
                <span>
                  <span className="font-bold text-[#171717] dark:text-[#E5E5E5]">{formatKB(currentSize)}</span>
                  {savedPct > 0 && <span className="text-[#16A34A] ml-1 font-bold">(-{savedPct}%)</span>}
                </span>
                <span>1200×900 px · WebP</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 text-[8.5px]">
            <span className="inline-flex items-center gap-1 text-[#737373]">
              <Sparkles className="h-2.5 w-2.5 text-[#8B5CF6]" strokeWidth={2} />
              <span>WordPress · Ghost · Medium ready</span>
            </span>
            {isDone && (
              <button className="inline-flex items-center gap-1 text-[9px] font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] px-1.5 py-0.5 rounded shadow-sm">
                <Download className="h-2.5 w-2.5" strokeWidth={2.5} />
                ZIP
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <FileText className="h-2.5 w-2.5 text-[#8B5CF6]" strokeWidth={2} />
        <span>Compress + Resize 1200 + WebP + AI alt text · 1 click</span>
      </div>

      <style jsx>{`
        @keyframes bd-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bd-fade {
          0% { opacity: 0; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

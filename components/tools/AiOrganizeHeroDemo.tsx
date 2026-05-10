"use client";

import { useState, useEffect } from "react";
import { FileText, FileImage, FileVideo, FileAudio, FileArchive, Folder, Sparkles, CheckCircle2, AlertTriangle, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AI Organize hero demo — mock multi-file explorer: 8 file di tipi diversi
 * (PDF, JPG, MP4, MP3, DOCX, ZIP, ecc) vengono scansionati uno alla volta
 * dall'AI che ne capisce il contenuto e genera smart folder names
 * content-aware. Una scoperta di "duplicate" viene evidenziata.
 *
 * Differenza con smartsort: smartsort è solo foto categorize, ai-organize
 * è multi-tipo + dedup + content-aware rename.
 *
 * Brand: #8B5CF6 violet
 */

type FileType = "pdf" | "jpg" | "mp4" | "mp3" | "docx" | "zip";

type FileItem = {
  type: FileType;
  filename: string;
  /** AI-detected smart folder destination */
  folder: string;
  /** Marca duplicate */
  isDuplicate?: boolean;
};

const FILES: FileItem[] = [
  { type: "pdf",  filename: "tax-return-2026.pdf",   folder: "Tax 2026" },
  { type: "jpg",  filename: "tuscany-villa.jpg",     folder: "Travel · Italy" },
  { type: "mp4",  filename: "wedding-clip.mp4",      folder: "Wedding · Smith" },
  { type: "docx", filename: "contract-acme.docx",    folder: "Work · Acme Corp" },
  { type: "jpg",  filename: "DSC_8892.jpg",          folder: "Travel · Italy", isDuplicate: true },
  { type: "mp3",  filename: "interview-podcast.mp3", folder: "Audio · Podcast" },
  { type: "zip",  filename: "shoot-raws.zip",        folder: "Photography · Shoots" },
  { type: "pdf",  filename: "receipt-amazon.pdf",    folder: "Receipts" },
];

const TYPE_ICON: Record<FileType, typeof FileText> = {
  pdf: FileText,
  jpg: FileImage,
  mp4: FileVideo,
  mp3: FileAudio,
  docx: FileText,
  zip: FileArchive,
};

const TYPE_COLOR: Record<FileType, string> = {
  pdf: "#EF4444",
  jpg: "#10B981",
  mp4: "#F59E0B",
  mp3: "#06B6D4",
  docx: "#3B82F6",
  zip: "#8B5CF6",
};

const STEP_MS = 850;
const PAUSE_MS = 2000;

export default function AiOrganizeHeroDemo() {
  const [step, setStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setStep((s) => {
        if (s > FILES.length) {
          timeoutId = setTimeout(() => !cancelled && setStep(0), PAUSE_MS);
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
  }, [hasInteracted, step]);

  const isDone = step > FILES.length;
  const scanning = step >= 1 && step <= FILES.length ? FILES[step - 1] : null;
  const sorted = FILES.slice(0, Math.min(step - (scanning ? 1 : 0), FILES.length));

  // Unique folders found so far (excluding duplicates)
  const folders = new Map<string, number>();
  sorted.forEach((f) => {
    if (!f.isDuplicate) folders.set(f.folder, (folders.get(f.folder) ?? 0) + 1);
  });
  const duplicatesFound = sorted.filter((f) => f.isDuplicate).length;
  const filesProcessed = sorted.length;

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
            ~/Downloads ({FILES.length} files)
          </span>
          <div className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded text-[#5B21B6] bg-[#8B5CF6]/12 dark:text-[#C4B5FD]">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
            AI Organize
          </div>
        </div>

        {/* Body: file list scrolling + smart folder banner */}
        <div className="p-2 grid grid-rows-[auto_auto_1fr] gap-1.5 h-[calc(100%-28px)]">
          {/* File strip — 8 file with type icons */}
          <div className="grid grid-cols-8 gap-1">
            {FILES.map((f, i) => {
              const done = i < step - 1 || (i === step - 1 && step > FILES.length);
              const isScanning = i === step - 1 && step <= FILES.length;
              const Icon = TYPE_ICON[f.type];
              return (
                <div
                  key={i}
                  className={cn(
                    "relative aspect-square rounded border flex flex-col items-center justify-center p-1 transition-all duration-300",
                    isScanning && "ring-2 ring-[#8B5CF6] ring-offset-1 scale-110 z-10 bg-[#8B5CF6]/[0.06]",
                    done && "opacity-30",
                    !isScanning && !done && "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                  )}
                  style={{ borderColor: !done && !isScanning ? `${TYPE_COLOR[f.type]}40` : undefined }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: TYPE_COLOR[f.type] }}
                    strokeWidth={1.5}
                  />
                  <span className="text-[7px] font-bold uppercase mt-0.5" style={{ color: TYPE_COLOR[f.type] }}>
                    {f.type}
                  </span>
                  {f.isDuplicate && done && (
                    <AlertTriangle className="absolute -top-1 -right-1 h-3 w-3 text-[#F59E0B] bg-white rounded-full p-0.5" strokeWidth={2.5} fill="#FEF3C7" />
                  )}
                </div>
              );
            })}
          </div>

          {/* AI banner */}
          <div className={cn("rounded px-2 py-1.5 text-[10px] flex items-center gap-1.5 transition-colors duration-200", scanning ? "bg-[#8B5CF6]/8 border border-[#8B5CF6]/30" : "bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A]")}>
            {scanning ? (
              <>
                <Sparkles className="h-3 w-3 text-[#8B5CF6] flex-shrink-0" strokeWidth={2} style={{ animation: "aiorg-spin 1s linear infinite" }} />
                <span className="font-mono text-[#171717] dark:text-[#E5E5E5] truncate flex-shrink-0 max-w-[40%]">{scanning.filename}</span>
                <span className="text-[#8B5CF6]">→</span>
                {scanning.isDuplicate ? (
                  <span className="inline-flex items-center gap-0.5 font-semibold text-[#92400E] dark:text-[#FCD34D]">
                    <AlertTriangle className="h-2.5 w-2.5" strokeWidth={2.5} />
                    Duplicate
                  </span>
                ) : (
                  <span className="font-semibold text-[#5B21B6] dark:text-[#C4B5FD] truncate">{scanning.folder}</span>
                )}
              </>
            ) : isDone ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-[#22C55E] flex-shrink-0" strokeWidth={2.5} />
                <span className="font-semibold text-[#171717] dark:text-[#E5E5E5]">{folders.size} smart folders · {duplicatesFound} duplicate{duplicatesFound !== 1 ? "s" : ""} found</span>
                <span className="ml-auto text-[9px] text-[#737373]">Ready · ZIP</span>
              </>
            ) : (
              <>
                <FolderOpen className="h-3 w-3 text-[#A3A3A3] flex-shrink-0" strokeWidth={2} />
                <span className="text-[#737373]">Drop any files for AI sorting…</span>
              </>
            )}
          </div>

          {/* Smart folders generated by AI */}
          <div className="flex flex-wrap gap-1 content-start overflow-hidden">
            {Array.from(folders.entries()).map(([name, count], i) => {
              const isFresh = scanning?.folder === name;
              return (
                <div
                  key={name}
                  className={cn(
                    "inline-flex items-center gap-1 px-1.5 py-1 rounded border transition-all duration-300",
                    isFresh
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.08] scale-105 shadow-sm"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                  )}
                  style={{
                    animation: i === folders.size - 1 ? "aiorg-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
                  }}
                >
                  <Folder
                    className={cn("h-3 w-3", isFresh ? "text-[#8B5CF6]" : "text-[#525252] dark:text-[#A3A3A3]")}
                    strokeWidth={1.5}
                    fill="currentColor"
                  />
                  <span className="text-[9.5px] font-semibold text-[#171717] dark:text-[#E5E5E5]">{name}</span>
                  <span className="text-[8.5px] font-bold text-[#8B5CF6] tabular-nums">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom counter */}
        <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1.5 px-1.5 py-0.5 rounded backdrop-blur-sm bg-white/95 dark:bg-[#0F1729]/95 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
          {isDone && <CheckCircle2 className="h-3 w-3 text-[#22C55E]" strokeWidth={2.5} />}
          <span className="text-[10px] font-semibold tabular-nums text-[#171717] dark:text-[#E5E5E5]">
            {filesProcessed}/{FILES.length}
          </span>
          <span className="text-[8px] text-[#737373] uppercase tracking-wide">files</span>
        </div>
      </div>

      {/* Caption */}
      <div className="hidden md:flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-[#737373] dark:text-[#A3A3A3]">
        <Sparkles className="h-2.5 w-2.5 text-[#8B5CF6]" strokeWidth={2} />
        <span>Content-aware folders · Duplicate detection · Auto-rename</span>
      </div>

      <style jsx>{`
        @keyframes aiorg-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes aiorg-pop {
          0% { opacity: 0; transform: scale(0.6); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

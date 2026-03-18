"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Upload, Download, Trash2, RotateCcw } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FileEntry {
  id: string;
  file: File;
  originalName: string;
  extension: string;
}

// ─── Token chips ────────────────────────────────────────────────────────────

const TOKENS = [
  { label: "{001}", desc: "Auto-increment" },
  { label: "{date}", desc: "Today's date" },
  { label: "{original}", desc: "Original name" },
] as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getExtension(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx > 0 ? name.slice(idx) : "";
}

function getBaseName(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx > 0 ? name.slice(0, idx) : name;
}

function padNumber(n: number, width: number): string {
  return String(n).padStart(width, "0");
}

function todayFormatted(): string {
  const d = new Date();
  return `${d.getFullYear()}-${padNumber(d.getMonth() + 1, 2)}-${padNumber(d.getDate(), 2)}`;
}

function applyPattern(
  pattern: string,
  index: number,
  startNum: number,
  originalName: string,
  separator: string
): string {
  let result = pattern;

  // Replace {001} with auto-increment (detect padding from pattern)
  const numMatch = result.match(/\{(0+1)\}/);
  if (numMatch) {
    const padWidth = numMatch[1].length;
    result = result.replace(numMatch[0], padNumber(startNum + index, padWidth));
  }

  // Replace {date}
  result = result.replace(/\{date\}/gi, todayFormatted());

  // Replace {original}
  result = result.replace(/\{original\}/gi, originalName);

  // Normalize separators
  if (separator === "_") {
    result = result.replace(/-/g, "_");
  } else if (separator === " ") {
    result = result.replace(/[-_]/g, " ");
  }

  return result;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function BatchNameClient() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [pattern, setPattern] = useState("photo-{001}");
  const [startNum, setStartNum] = useState(1);
  const [separator, setSeparator] = useState<"-" | "_" | " ">("-");
  const [downloading, setDownloading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const entries: FileEntry[] = accepted.map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
      file: f,
      originalName: getBaseName(f.name),
      extension: getExtension(f.name),
    }));
    setFiles((prev) => [...prev, ...entries]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  // Compute preview names
  const previews = useMemo(() => {
    return files.map((entry, i) => {
      const newBase = applyPattern(pattern, i, startNum, entry.originalName, separator);
      return {
        ...entry,
        newName: newBase + entry.extension,
      };
    });
  }, [files, pattern, startNum, separator]);

  function insertToken(token: string) {
    setPattern((prev) => prev + token);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function clearAll() {
    setFiles([]);
  }

  async function handleDownload() {
    if (previews.length === 0) return;
    setDownloading(true);

    try {
      if (previews.length === 1) {
        // Single file: direct download
        const entry = previews[0];
        const url = URL.createObjectURL(entry.file);
        const a = document.createElement("a");
        a.href = url;
        a.download = entry.newName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Multiple files: ZIP
        const zip = new JSZip();
        for (const entry of previews) {
          zip.file(entry.newName, entry.file);
        }
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, "batchname-renamed.zip");
      }
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className="py-6 px-4 sm:px-6 bg-white dark:bg-[#191919]">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* DropZone */}
        {files.length === 0 && (
          <div
            {...getRootProps()}
            className={`
              relative flex flex-col items-center justify-center gap-3 p-10
              border-[1.5px] border-dashed rounded-lg cursor-pointer transition-all
              ${isDragActive
                ? "border-[#6366F1] bg-[#6366F1]/5"
                : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="h-6 w-6 text-[#A3A3A3]" strokeWidth={1.5} />
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3]">
              {isDragActive ? "Drop files here" : "Drop files or click to browse"}
            </p>
            <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
              Any file type. Unlimited files.
            </p>
          </div>
        )}

        {/* Controls */}
        {files.length > 0 && (
          <>
            {/* Add more files */}
            <div className="flex items-center justify-between">
              <div
                {...getRootProps()}
                className="cursor-pointer text-xs text-[#6366F1] hover:underline"
              >
                <input {...getInputProps()} />
                + Add more files
              </div>
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-[#DC2626] transition-colors"
              >
                <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                Clear all
              </button>
            </div>

            {/* Pattern input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                Pattern
              </label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="trip-sri-lanka-{001}"
                className="w-full px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md
                           bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5]
                           placeholder-[#A3A3A3] dark:placeholder-[#525252]
                           focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
              />
              {/* Token chips */}
              <div className="flex flex-wrap gap-1.5">
                {TOKENS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => insertToken(t.label)}
                    className="text-[11px] font-medium px-2 py-1 rounded border border-[#E5E5E5] dark:border-[#2A2A2A]
                               bg-[#FAFAFA] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3]
                               hover:bg-[#F5F5F5] dark:hover:bg-[#333] hover:border-[#A3A3A3] transition-all"
                  >
                    {t.label} <span className="text-[#A3A3A3] dark:text-[#525252] ml-1">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start number + separator */}
            <div className="flex gap-4">
              <div className="space-y-1 flex-1">
                <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  Start number
                </label>
                <input
                  type="number"
                  min={0}
                  value={startNum}
                  onChange={(e) => setStartNum(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md
                             bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5]
                             focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                />
              </div>
              <div className="space-y-1 flex-1">
                <label className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                  Separator
                </label>
                <div className="flex gap-1.5">
                  {(["-", "_", " "] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeparator(s)}
                      className={`
                        flex-1 px-3 py-2 text-sm rounded-md border transition-all
                        ${separator === s
                          ? "border-[#6366F1] bg-[#6366F1]/5 text-[#6366F1] font-medium"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"
                        }
                      `}
                    >
                      {s === " " ? "space" : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview list */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                Preview ({previews.length} file{previews.length !== 1 ? "s" : ""})
              </p>
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] max-h-80 overflow-y-auto">
                {previews.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
                  >
                    <span className="text-[#A3A3A3] dark:text-[#525252] truncate min-w-0 flex-1">
                      {entry.originalName}{entry.extension}
                    </span>
                    <span className="text-[#A3A3A3] flex-shrink-0">&rarr;</span>
                    <span className="text-[#171717] dark:text-[#E5E5E5] font-medium truncate min-w-0 flex-1">
                      {entry.newName}
                    </span>
                    <button
                      onClick={() => removeFile(entry.id)}
                      className="flex-shrink-0 p-0.5 text-[#D4D4D4] hover:text-[#DC2626] transition-colors"
                      aria-label={`Remove ${entry.originalName}`}
                    >
                      <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={handleDownload}
              disabled={downloading || previews.length === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                         bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]
                         text-sm font-medium rounded-md
                         hover:bg-[#262626] dark:hover:bg-[#D4D4D4]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
            >
              {downloading ? (
                <RotateCcw className="h-4 w-4 animate-spin" strokeWidth={1.5} />
              ) : (
                <Download className="h-4 w-4" strokeWidth={1.5} />
              )}
              {downloading ? "Preparing..." : previews.length > 1 ? "Rename & Download ZIP" : "Rename & Download"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}

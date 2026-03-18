"use client";

import React, { useState, useCallback, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Upload,
  Download,
  Lock,
  Sparkles,
  Play,
  Loader2,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FileEntry {
  id: string;
  file: File;
  name: string;
  thumbnailUrl: string;
  category: string | null;
  confidence: number | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  landscape: "Landscapes",
  portrait: "Portraits",
  food: "Food",
  architecture: "Architecture",
  screenshot: "Screenshots",
  document: "Documents",
  product: "Products",
  animal: "Animals",
  art: "Art",
  other: "Other",
};

const ACCEPTED_TYPES: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/avif": [".avif"],
  "image/heic": [".heic"],
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function createThumbnailUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function SmartSortClient() {
  const { data: session, status: authStatus } = useSession();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [sorting, setSorting] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [downloading, setDownloading] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const abortRef = useRef(false);

  const isAuthenticated = authStatus === "authenticated" && !!session?.user;

  const onDrop = useCallback(async (accepted: File[]) => {
    const entries: FileEntry[] = await Promise.all(
      accepted.map(async (f) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
        file: f,
        name: f.name,
        thumbnailUrl: await createThumbnailUrl(f),
        category: null,
        confidence: null,
        status: "pending" as const,
      }))
    );
    setFiles((prev) => [...prev, ...entries]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: true,
  });

  // Categorize all files
  async function handleSort() {
    if (files.length === 0) return;
    setSorting(true);
    abortRef.current = false;
    setProgress({ done: 0, total: files.length });

    for (let i = 0; i < files.length; i++) {
      if (abortRef.current) break;
      const entry = files[i];
      if (entry.status === "done") {
        setProgress((p) => ({ ...p, done: p.done + 1 }));
        continue;
      }

      // Update status to processing
      setFiles((prev) =>
        prev.map((f) => (f.id === entry.id ? { ...f, status: "processing" } : f))
      );

      try {
        const base64 = await fileToBase64(entry.file);
        const mimeType = entry.file.type || "image/jpeg";

        const res = await fetch("/api/ai/categorize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64, mimeType }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            (errorData as { error?: string }).error || `HTTP ${res.status}`
          );
        }

        const data = (await res.json()) as {
          data: { category: string; confidence: number };
        };

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? {
                  ...f,
                  category: data.data.category,
                  confidence: data.data.confidence,
                  status: "done",
                }
              : f
          )
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? { ...f, status: "error", error: msg }
              : f
          )
        );
      }

      setProgress((p) => ({ ...p, done: p.done + 1 }));
    }

    setSorting(false);
  }

  // Group files by category
  const categorized = files.reduce<Record<string, FileEntry[]>>((acc, f) => {
    if (f.category) {
      if (!acc[f.category]) acc[f.category] = [];
      acc[f.category].push(f);
    }
    return acc;
  }, {});

  const sortedFiles = files.filter((f) => f.status === "done");
  const hasResults = sortedFiles.length > 0;

  function toggleCategory(cat: string) {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  async function downloadCategory(category: string) {
    const catFiles = categorized[category];
    if (!catFiles || catFiles.length === 0) return;

    if (catFiles.length === 1) {
      const url = URL.createObjectURL(catFiles[0].file);
      const a = document.createElement("a");
      a.href = url;
      a.download = catFiles[0].name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const zip = new JSZip();
    for (const f of catFiles) {
      zip.file(f.name, f.file);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `smartsort-${category}.zip`);
  }

  async function downloadAll() {
    if (!hasResults) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      for (const f of sortedFiles) {
        const folder = CATEGORY_LABELS[f.category!] || f.category!;
        zip.file(`${folder}/${f.name}`, f.file);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "smartsort-organized.zip");
    } finally {
      setDownloading(false);
    }
  }

  function clearAll() {
    setFiles([]);
    setProgress({ done: 0, total: 0 });
  }

  // ─── Auth gate ────────────────────────────────────────────────────────────

  if (authStatus === "loading") {
    return (
      <section className="py-10 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-3xl mx-auto flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-[#A3A3A3]" strokeWidth={1.5} />
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="py-10 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
            <Lock className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Sign in to use SmartSort
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            SmartSort uses AI to categorize your images. Sign in for free to get started.
          </p>
          <button
            onClick={() => signIn("google")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </section>
    );
  }

  // ─── Main UI ──────────────────────────────────────────────────────────────

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
              {isDragActive ? "Drop images here" : "Drop images or click to browse"}
            </p>
            <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
              JPG, PNG, WebP, GIF, AVIF. Up to 50 files (500 on Pro).
            </p>
          </div>
        )}

        {/* Files loaded, ready to sort */}
        {files.length > 0 && (
          <>
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div
                {...getRootProps()}
                className="cursor-pointer text-xs text-[#6366F1] hover:underline"
              >
                <input {...getInputProps()} />
                + Add more images
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#A3A3A3]">
                  {files.length} file{files.length !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-[#DC2626] transition-colors"
                >
                  <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                  Clear
                </button>
              </div>
            </div>

            {/* Sort button + progress */}
            {!hasResults && (
              <button
                onClick={handleSort}
                disabled={sorting || files.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3
                           bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]
                           text-sm font-medium rounded-md
                           hover:bg-[#262626] dark:hover:bg-[#D4D4D4]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                {sorting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Analyzing {progress.done}/{progress.total}...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                    Sort with AI
                  </>
                )}
              </button>
            )}

            {/* Progress bar */}
            {sorting && (
              <div className="w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full h-1.5">
                <div
                  className="bg-[#6366F1] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress.total > 0 ? (progress.done / progress.total) * 100 : 0}%` }}
                />
              </div>
            )}

            {/* Results by category */}
            {hasResults && (
              <div className="space-y-3">
                {Object.entries(categorized)
                  .sort(([, a], [, b]) => b.length - a.length)
                  .map(([category, catFiles]) => {
                    const isCollapsed = collapsedCategories.has(category);
                    return (
                      <div
                        key={category}
                        className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden"
                      >
                        {/* Category header */}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {isCollapsed ? (
                              <ChevronRight className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                            )}
                            <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                              {CATEGORY_LABELS[category] || category}
                            </span>
                            <span className="text-xs text-[#A3A3A3]">
                              {catFiles.length} file{catFiles.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadCategory(category);
                            }}
                            className="flex items-center gap-1 text-xs text-[#6366F1] hover:text-[#4F46E5] transition-colors"
                          >
                            <Download className="h-3 w-3" strokeWidth={1.5} />
                            Download
                          </button>
                        </button>

                        {/* File thumbnails grid */}
                        {!isCollapsed && (
                          <div className="p-3 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {catFiles.map((f) => (
                              <div
                                key={f.id}
                                className="aspect-square rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]"
                                title={`${f.name} (${Math.round((f.confidence ?? 0) * 100)}% confidence)`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={f.thumbnailUrl}
                                  alt={f.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                {/* Download all */}
                <button
                  onClick={downloadAll}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                             bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]
                             text-sm font-medium rounded-md
                             hover:bg-[#262626] dark:hover:bg-[#D4D4D4]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                  )}
                  {downloading ? "Preparing ZIP..." : "Download All as ZIP"}
                </button>
              </div>
            )}

            {/* Errors summary */}
            {files.some((f) => f.status === "error") && (
              <div className="text-xs text-[#DC2626] dark:text-[#EF4444]">
                {files.filter((f) => f.status === "error").length} file(s) failed to categorize.
                {files.find((f) => f.status === "error")?.error && (
                  <span className="ml-1 text-[#A3A3A3]">
                    ({files.find((f) => f.status === "error")!.error})
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

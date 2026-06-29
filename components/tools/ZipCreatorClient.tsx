"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  FolderArchive,
  Download,
  FileText,
  Lock,
  AlertCircle,
  RotateCcw,
  Plus,
  X,
  Loader2,
  ChevronRight,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { trackEvent } from "@/lib/analytics";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILES = 500; // sane cap so the browser doesn't choke

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

type UIState = "idle" | "ready" | "building" | "done" | "error";

interface Item {
  id: string;
  file: File;
  // relative path inside the zip (preserves folder structure on folder drop)
  path: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ZipCreatorClient() {
  const [uiState, setUiState] = useState<UIState>("idle");
  const [items, setItems] = useState<Item[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [zipName, setZipName] = useState("archive");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const totalBytes = items.reduce((s, it) => s + it.file.size, 0);

  // ── Add files ──────────────────────────────────────────────────────────────

  const addFiles = useCallback((files: File[], paths?: string[]) => {
    if (files.length === 0) return;
    setItems((prev) => {
      const existing = new Set(prev.map((it) => it.path + "|" + it.file.size));
      const next = [...prev];
      files.forEach((f, i) => {
        const path =
          paths?.[i] ||
          (f as File & { webkitRelativePath?: string }).webkitRelativePath ||
          f.name;
        const key = path + "|" + f.size;
        if (existing.has(key)) return; // skip exact dupes
        existing.add(key);
        next.push({ id: `f${idRef.current++}`, file: f, path });
      });
      return next.slice(0, MAX_FILES);
    });
    setUiState("ready");
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      addFiles(files);
      e.target.value = "";
    },
    [addFiles]
  );

  // Drag & drop — supports dropping folders (reads entries recursively).
  const onDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dt = e.dataTransfer;

      const entries: FileSystemEntry[] = [];
      if (dt.items && dt.items.length) {
        for (const item of Array.from(dt.items)) {
          const entry = (item as DataTransferItem & {
            webkitGetAsEntry?: () => FileSystemEntry | null;
          }).webkitGetAsEntry?.();
          if (entry) entries.push(entry);
        }
      }

      if (entries.length) {
        const files: File[] = [];
        const paths: string[] = [];
        const walk = (entry: FileSystemEntry, prefix: string): Promise<void> =>
          new Promise((resolve) => {
            if (entry.isFile) {
              (entry as FileSystemFileEntry).file((file) => {
                files.push(file);
                paths.push(prefix + file.name);
                resolve();
              }, () => resolve());
            } else if (entry.isDirectory) {
              const reader = (entry as FileSystemDirectoryEntry).createReader();
              reader.readEntries(async (children) => {
                await Promise.all(
                  children.map((c) => walk(c, prefix + entry.name + "/"))
                );
                resolve();
              }, () => resolve());
            } else resolve();
          });
        await Promise.all(entries.map((en) => walk(en, "")));
        addFiles(files, paths);
      } else {
        addFiles(Array.from(dt.files));
      }
    },
    [addFiles]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id);
      if (next.length === 0) setUiState("idle");
      return next;
    });
  }, []);

  // ── Create ZIP ─────────────────────────────────────────────────────────────

  const createZip = useCallback(async () => {
    if (items.length === 0) return;
    setUiState("building");
    setProgress(0);
    setErrorMsg("");
    try {
      const zip = new JSZip();
      // De-dupe identical paths by appending an index.
      const used = new Set<string>();
      for (const it of items) {
        let p = it.path;
        if (used.has(p)) {
          const dot = p.lastIndexOf(".");
          const base = dot > 0 ? p.slice(0, dot) : p;
          const ext = dot > 0 ? p.slice(dot) : "";
          let n = 1;
          while (used.has(`${base} (${n})${ext}`)) n++;
          p = `${base} (${n})${ext}`;
        }
        used.add(p);
        zip.file(p, it.file);
      }
      trackEvent("zipcreator_build", { files: items.length });
      const blob = await zip.generateAsync(
        { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
        (meta) => setProgress(Math.round(meta.percent))
      );
      const name = (zipName.trim() || "archive").replace(/\.zip$/i, "");
      saveAs(blob, `${name}.zip`);
      setUiState("done");
      trackEvent("zipcreator_done", { files: items.length });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Could not create the ZIP.");
      setUiState("error");
    }
  }, [items, zipName]);

  const handleReset = useCallback(() => {
    setItems([]);
    setUiState("idle");
    setProgress(0);
    setErrorMsg("");
    setZipName("archive");
  }, []);

  // ── JSX ──────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-16">
      {/* DROPZONE (idle + ready both show it, smaller when ready) */}
      {(uiState === "idle" || uiState === "ready") && (
        <div
          className={[
            "border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors",
            uiState === "idle" ? "p-10" : "p-6",
            dragOver
              ? "border-[#6366F1] bg-[#6366F1]/5 dark:bg-[#6366F1]/10"
              : "border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1] hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10",
          ].join(" ")}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Drop files or click to select"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={onInputChange}
          />
          {uiState === "idle" ? (
            <>
              <FolderArchive
                className="mx-auto mb-4 text-[#6366F1]"
                size={40}
                strokeWidth={1.5}
              />
              <p className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                Drop files (or a folder) here
              </p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4">
                or click to select from your computer
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
                <Lock size={11} />
                Files never leave your device. 100% in-browser
              </span>
              <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
                Bundle any files into one .zip · Free · No signup
              </p>
            </>
          ) : (
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[#6366F1]">
              <Plus size={15} strokeWidth={2} /> Add more files or a folder
            </p>
          )}
        </div>
      )}

      {/* FILE LIST + CREATE */}
      {uiState === "ready" && items.length > 0 && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              {items.length} file{items.length !== 1 ? "s" : ""}
              <span className="font-normal text-[#A3A3A3] dark:text-[#525252]">
                {" "}· {formatBytes(totalBytes)}
              </span>
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <RotateCcw size={11} strokeWidth={1.5} /> Clear all
            </button>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525] max-h-72 overflow-y-auto">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-[#191919] group"
              >
                <FileText size={15} className="text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                    {it.path}
                  </p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                    {formatBytes(it.file.size)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(it.id)}
                  className="opacity-0 group-hover:opacity-100 text-[#A3A3A3] hover:text-red-500 transition-all shrink-0"
                  aria-label={`Remove ${it.path}`}
                >
                  <X size={15} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center flex-1 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#252525]">
              <input
                type="text"
                value={zipName}
                onChange={(e) => setZipName(e.target.value)}
                placeholder="archive"
                aria-label="ZIP file name"
                className="flex-1 text-sm px-3 py-2.5 bg-transparent text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none"
              />
              <span className="px-3 text-sm text-[#A3A3A3] dark:text-[#525252] select-none">
                .zip
              </span>
            </div>
            <button
              onClick={createZip}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] active:scale-[0.98] text-white rounded-lg transition-all shadow-sm"
            >
              <Download size={15} strokeWidth={2} />
              Create &amp; download ZIP
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
            <Lock size={13} className="text-[#10B981] shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
              The ZIP is built locally in your browser. Your files are never uploaded.
            </p>
          </div>
        </div>
      )}

      {/* BUILDING */}
      {uiState === "building" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
          <Loader2 className="mx-auto mb-4 text-[#6366F1] animate-spin" size={36} strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-4">
            Compressing {items.length} files… {progress}%
          </p>
          <div className="w-full bg-[#F5F5F5] dark:bg-[#252525] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#6366F1] transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* DONE */}
      {uiState === "done" && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center space-y-4">
          <FolderArchive className="mx-auto text-[#10B981]" size={36} strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            Your ZIP is ready and downloading.
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
            {items.length} file{items.length !== 1 ? "s" : ""} · {formatBytes(totalBytes)} bundled into{" "}
            <strong>{(zipName.trim() || "archive").replace(/\.zip$/i, "")}.zip</strong>
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={createZip}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
            >
              <Download size={14} strokeWidth={1.5} /> Download again
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-lg hover:opacity-90 transition-opacity"
            >
              <RotateCcw size={14} strokeWidth={1.5} /> New ZIP
            </button>
          </div>
        </div>
      )}

      {/* ERROR */}
      {uiState === "error" && (
        <div className="border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle size={28} className="text-red-500" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {errorMsg || "Could not create the ZIP"}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-lg hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={14} strokeWidth={1.5} /> Start over
          </button>
        </div>
      )}

      {/* CTA links */}
      {(uiState === "idle" || uiState === "done" || uiState === "error") && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs text-[#A3A3A3] dark:text-[#525252]">
          <span className="flex items-center gap-1">
            Need to open a RAR archive?{" "}
            <a href="/tools/unrar" className="text-[#6366F1] hover:underline inline-flex items-center gap-0.5">
              Open RAR Online <ChevronRight size={10} />
            </a>
          </span>
          <span className="flex items-center gap-1">
            Open a .7z file?{" "}
            <a href="/tools/open-7z" className="text-[#6366F1] hover:underline inline-flex items-center gap-0.5">
              Open 7z Online <ChevronRight size={10} />
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

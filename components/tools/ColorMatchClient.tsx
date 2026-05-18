"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Download,
  Trash2,
  Loader2,
  Sparkles,
  Image as ImageLucide,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  extractLUTFromReference,
  applyLUTToFile,
  downloadCubeFile,
  type Lut3D,
  type LUTApplyResult,
} from "@/lib/lut-engine";
import { useSession } from "next-auth/react";

const ACCEPTED: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_FILES_FREE = 50;
const MAX_FILES_PRO = 300;

type Status = "idle" | "processing" | "done" | "error";

interface BatchFile {
  id: string;
  file: File;
  previewUrl: string;
  status: Status;
  resultBlob?: Blob;
  resultUrl?: string;
  result?: LUTApplyResult;
  error?: string;
}

let _counter = 0;
function uid() {
  return `cm_${Date.now()}_${++_counter}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ColorMatchClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const maxFiles = isPro ? MAX_FILES_PRO : MAX_FILES_FREE;

  const [refFile, setRefFile] = useState<File | null>(null);
  const [refPreviewUrl, setRefPreviewUrl] = useState<string>("");
  const [lut, setLut] = useState<Lut3D | null>(null);
  const [refLoading, setRefLoading] = useState(false);
  const [refProgress, setRefProgress] = useState(0);

  const [files, setFiles] = useState<BatchFile[]>([]);
  const filesRef = useRef<BatchFile[]>([]);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const [intensity, setIntensity] = useState(100);
  const [running, setRunning] = useState(false);
  const cancelRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refPreviewUrl) URL.revokeObjectURL(refPreviewUrl);
      files.forEach((f) => {
        URL.revokeObjectURL(f.previewUrl);
        if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Reference dropzone ─────────────────────────────────────────────────
  const onDropRef = useCallback(
    async (accepted: File[]) => {
      const f = accepted[0];
      if (!f) return;
      if (f.size > MAX_FILE_SIZE) return;

      if (refPreviewUrl) URL.revokeObjectURL(refPreviewUrl);
      setRefFile(f);
      setRefPreviewUrl(URL.createObjectURL(f));
      setLut(null);
      setRefLoading(true);
      setRefProgress(0);
      try {
        const lut3d = await extractLUTFromReference(f, {
          onProgress: (pct) => setRefProgress(pct),
        });
        setLut(lut3d);
        trackEvent("color_match_lut_extracted", { size: lut3d.size });
      } catch (e) {
        console.error("LUT extraction failed", e);
      } finally {
        setRefLoading(false);
      }
    },
    [refPreviewUrl]
  );

  const handleDownloadCube = useCallback(() => {
    if (!lut || !refFile) return;
    const base = refFile.name.replace(/\.[^.]+$/, "");
    downloadCubeFile(lut, `sammapix-${base}.cube`);
    trackEvent("color_match_cube_downloaded");
  }, [lut, refFile]);

  const refDz = useDropzone({
    onDrop: onDropRef,
    accept: ACCEPTED,
    multiple: false,
    maxFiles: 1,
  });

  // ── Batch dropzone ─────────────────────────────────────────────────────
  const onDropBatch = useCallback(
    (accepted: File[]) => {
      const available = maxFiles - files.length;
      const toAdd = accepted
        .filter((f) => f.size <= MAX_FILE_SIZE)
        .slice(0, Math.max(0, available));

      const newFiles: BatchFile[] = toAdd.map((f) => ({
        id: uid(),
        file: f,
        previewUrl: URL.createObjectURL(f),
        status: "idle" as const,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      trackEvent("color_match_batch_added", { count: newFiles.length });
    },
    [files.length, maxFiles]
  );

  const batchDz = useDropzone({
    onDrop: onDropBatch,
    accept: ACCEPTED,
    multiple: true,
    maxFiles,
    noClick: files.length > 0,
  });

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.resultUrl) URL.revokeObjectURL(f.resultUrl);
    });
    setFiles([]);
    setRunning(false);
    cancelRef.current = true;
  }, [files]);

  // ── Run batch ──────────────────────────────────────────────────────────
  const runBatch = useCallback(async () => {
    if (!lut) return;
    cancelRef.current = false;
    setRunning(true);
    trackEvent("color_match_batch_started", { count: files.length, intensity });
    const intensityNorm = intensity / 100;

    while (!cancelRef.current) {
      const next = filesRef.current.find((f) => f.status === "idle");
      if (!next) break;
      setFiles((prev) =>
        prev.map((f) => (f.id === next.id ? { ...f, status: "processing" as const } : f))
      );
      try {
        const result = await applyLUTToFile(next.file, lut, intensityNorm);
        const url = URL.createObjectURL(result.blob);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === next.id
              ? {
                  ...f,
                  status: "done" as const,
                  resultBlob: result.blob,
                  resultUrl: url,
                  result,
                }
              : f
          )
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed";
        setFiles((prev) =>
          prev.map((f) =>
            f.id === next.id ? { ...f, status: "error" as const, error: msg } : f
          )
        );
      }
      await new Promise((r) => setTimeout(r, 10));
    }

    setRunning(false);
    trackEvent("color_match_batch_done");
  }, [lut, files.length, intensity]);

  // ── Download one ───────────────────────────────────────────────────────
  const downloadOne = useCallback((f: BatchFile) => {
    if (!f.resultUrl) return;
    const a = document.createElement("a");
    a.href = f.resultUrl;
    const base = f.file.name.replace(/\.[^.]+$/, "");
    const ext = f.file.type === "image/png" ? "png" : "jpg";
    a.download = `${base}-matched.${ext}`;
    a.click();
  }, []);

  // ── Download ZIP ───────────────────────────────────────────────────────
  const downloadZip = useCallback(async () => {
    const done = files.filter((f) => f.status === "done" && f.resultBlob);
    if (done.length === 0) return;
    const JSZip = (await import("jszip")).default;
    const { saveAs } = await import("file-saver");
    const zip = new JSZip();
    for (const f of done) {
      const base = f.file.name.replace(/\.[^.]+$/, "");
      const ext = f.file.type === "image/png" ? "png" : "jpg";
      zip.file(`${base}-matched.${ext}`, f.resultBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `sammapix-color-matched-${Date.now()}.zip`);
    trackEvent("color_match_zip_downloaded", { count: done.length });
  }, [files]);

  const stats = (() => {
    const total = files.length;
    const done = files.filter((f) => f.status === "done").length;
    const errored = files.filter((f) => f.status === "error").length;
    const idle = files.filter((f) => f.status === "idle").length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, errored, idle, pct };
  })();

  const canRun = !!lut && stats.idle > 0 && !running;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6 items-stretch">
        {/* ─── REFERENCE ZONE ──────────────────────────────────────── */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 bg-white dark:bg-[#191919] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-[#F59E0B15] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-[#F59E0B]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                1. Reference photo
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3]">
                The look you want to copy
              </p>
            </div>
          </div>

          {!refFile ? (
            <div
              {...refDz.getRootProps()}
              className={cn(
                "border border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                "border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#F59E0B] hover:bg-[#FFFBEB] dark:hover:bg-[#3B2814]",
                refDz.isDragActive && "border-[#F59E0B] bg-[#FFFBEB] dark:bg-[#3B2814]"
              )}
            >
              <input {...refDz.getInputProps()} />
              <Upload className="h-5 w-5 text-[#F59E0B] mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop reference image
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mt-0.5">
                JPG, PNG, WebP
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={refPreviewUrl}
                  alt="Reference"
                  className="w-full aspect-video object-cover rounded-lg bg-[#FAFAFA] dark:bg-[#1E1E1E]"
                />
                {refLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin text-white" strokeWidth={1.5} />
                  </div>
                )}
                <button
                  onClick={() => {
                    if (refPreviewUrl) URL.revokeObjectURL(refPreviewUrl);
                    setRefFile(null);
                    setRefPreviewUrl("");
                    setLut(null);
                    setRefProgress(0);
                  }}
                  className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
              <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] truncate">
                {refFile.name} · {formatBytes(refFile.size)}
              </p>
              {refLoading && (
                <div className="text-[11px] text-[#92400E] dark:text-[#FCD34D]">
                  <p className="inline-flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2} />
                    Building 3D LUT ({refProgress}%)
                  </p>
                  <div className="h-0.5 w-full bg-[#FEF3C7] dark:bg-[#3B2814] rounded mt-1 overflow-hidden">
                    <div
                      className="h-0.5 bg-[#F59E0B] rounded transition-all"
                      style={{ width: `${refProgress}%` }}
                    />
                  </div>
                </div>
              )}
              {lut && (
                <>
                  <p className="inline-flex items-center gap-1 text-[11px] text-[#16A34A]">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                    LUT extracted ({lut.size}×{lut.size}×{lut.size})
                  </p>
                  <button
                    onClick={handleDownloadCube}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#92400E] dark:text-[#FCD34D] hover:underline mt-0.5"
                    title="Download as standard .cube for Lightroom / Premiere / DaVinci"
                  >
                    <Download className="h-3 w-3" strokeWidth={2} />
                    Download .cube
                  </button>
                </>
              )}
            </div>
          )}

          {/* Intensity slider */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">
              <span>Match intensity</span>
              <span>{intensity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-[#F59E0B]"
            />
            <p className="text-[10px] text-[#A3A3A3] dark:text-[#737373] mt-1">
              0% = no change · 100% = full match
            </p>
          </div>
        </div>

        {/* ─── BATCH ZONE ─────────────────────────────────────────── */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 bg-white dark:bg-[#191919] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-[#F59E0B15] flex items-center justify-center">
              <ImageLucide className="h-4 w-4 text-[#F59E0B]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                2. Photos to match
              </p>
              <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3]">
                {files.length === 0
                  ? `Up to ${maxFiles}. They inherit the reference look.`
                  : `${files.length}/${maxFiles} loaded`}
                {!isPro && files.length === 0 && " · Pro: 300"}
              </p>
            </div>
          </div>

          <div
            {...batchDz.getRootProps()}
            className={cn(
              "border border-dashed rounded-lg text-center transition-colors flex-1 flex items-center justify-center cursor-pointer",
              "border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#F59E0B] hover:bg-[#FFFBEB] dark:hover:bg-[#3B2814]",
              batchDz.isDragActive && "border-[#F59E0B] bg-[#FFFBEB] dark:bg-[#3B2814]",
              files.length === 0 ? "min-h-[200px]" : "min-h-[80px]"
            )}
          >
            <input {...batchDz.getInputProps()} />
            <div className="flex flex-col items-center gap-1.5 py-4">
              <ImageLucide className="h-5 w-5 text-[#F59E0B]" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  {files.length === 0 ? "Drop photos here" : `Add more (${maxFiles - files.length} slots left)`}
                </p>
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mt-0.5">
                  JPG, PNG, WebP · multi-select OK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ACTIONS BAR ────────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4 bg-white dark:bg-[#191919] mb-4">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                {stats.total} {stats.total === 1 ? "photo" : "photos"}
                {stats.done > 0 && (
                  <span className="text-[#16A34A]"> · {stats.done} matched</span>
                )}
                {stats.errored > 0 && (
                  <span className="text-[#DC2626]"> · {stats.errored} failed</span>
                )}
              </p>
              {!lut && files.length > 0 && (
                <p className="text-[11px] text-[#92400E] dark:text-[#FCD34D] mt-0.5">
                  {refLoading
                    ? "Building LUT from your reference, hold on…"
                    : "Drop a reference photo on the left to start matching."}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {canRun && (
                <button
                  onClick={runBatch}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#F59E0B] text-white hover:bg-[#D97706] transition-colors"
                >
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                  Match {stats.idle} photos
                </button>
              )}
              {running && (
                <span className="inline-flex items-center gap-2 px-3 py-2 text-sm text-[#737373] dark:text-[#A3A3A3]">
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Matching…
                </span>
              )}
              {stats.done > 0 && (
                <button
                  onClick={downloadZip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#E5E5E5] dark:text-[#171717] hover:bg-[#404040] dark:hover:bg-white transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={1.5} />
                  Download ZIP ({stats.done})
                </button>
              )}
              {!running && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="h-1.5 w-full bg-[#F5F5F5] dark:bg-[#252525] rounded overflow-hidden">
            <div
              className="h-1.5 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded transition-all"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
        </div>
      )}

      {/* ─── FILE GRID ──────────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {files.map((f) => (
            <div
              key={f.id}
              className="relative border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden bg-white dark:bg-[#191919]"
            >
              <div className="relative aspect-square bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.resultUrl || f.previewUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {f.status === "processing" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-5 w-5 animate-spin text-white" strokeWidth={1.5} />
                  </div>
                )}
                {f.status === "done" && (
                  <div className="absolute top-1.5 left-1.5 bg-[#16A34A] text-white rounded-full p-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                )}
                {f.status === "error" && (
                  <div className="absolute top-1.5 left-1.5 bg-[#DC2626] text-white rounded-full p-0.5">
                    <AlertCircle className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                )}
                {!running && (
                  <button
                    onClick={() => removeFile(f.id)}
                    className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                    title="Remove"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                )}
                {f.status === "done" && (
                  <button
                    onClick={() => downloadOne(f)}
                    className="absolute bottom-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md p-1.5"
                    title="Download"
                  >
                    <Download className="h-3 w-3" strokeWidth={2} />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] truncate px-2 py-1.5">
                {f.file.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ─── TIP for first use ──────────────────────────────────── */}
      {lut && files.length > 0 && stats.done === 0 && (
        <div className="mt-3 mb-3 p-3 bg-[#FFFBEB] dark:bg-[#3B2814] border border-[#FDE68A] dark:border-[#78350F] rounded-md text-xs text-[#92400E] dark:text-[#FCD34D] leading-relaxed">
          <strong>Tip:</strong> color match works best when the reference and the batch
          have <strong>similar content</strong> (all outdoor, all food, all portraits, etc.).
          Mixing very different scenes — e.g. a beach selfie as reference for animal photos —
          will produce stylized but unrealistic results. Use the intensity slider (40-60%)
          for a softer blend.
        </div>
      )}

      {/* ─── EMPTY STATE HINTS ──────────────────────────────────── */}
      {files.length === 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <Sparkles className="h-4 w-4 text-[#F59E0B] mb-2" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
              1. Pick the look
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Drop the one photo with the color palette you love.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <ImageLucide className="h-4 w-4 text-[#F59E0B] mb-2" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
              2. Drop the batch
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Up to 50 photos. They&apos;ll all inherit the reference&apos;s color profile.
            </p>
          </div>
          <div className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg">
            <Download className="h-4 w-4 text-[#16A34A] mb-2" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] mb-0.5">
              3. Download ZIP
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
              Color-matched in milliseconds per photo. Get them all in a zip.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

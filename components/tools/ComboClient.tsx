"use client";

import React, { useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Upload, Download, CheckCircle2, Loader2, Circle, AlertCircle, Lock, Sparkles, Play } from "lucide-react";
import type { PipelineStep as EnginePipelineStep, PipelineStepId } from "@/lib/pipeline-engine";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ComboStep {
  id: string;
  label: string;
  enabled: boolean;
  isAi?: boolean;
  settings?: Record<string, unknown>;
}

export interface ComboClientProps {
  toolName: string;
  steps: ComboStep[];
  requiresLogin: boolean;
  hasAiSteps: boolean;
  accept?: string;
}

interface ProcessedFile {
  id: string;
  originalFile: File;
  originalName: string;
  resultBlob: Blob | null;
  resultName: string;
  status: "pending" | "processing" | "done" | "error";
  currentStep: number;
  error?: string;
}

// ─── HEIC pre-conversion (HEIC → JPG before pipeline) ──────────────────────

function isHeicFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = file.type.toLowerCase();
  return ext === "heic" || ext === "heif" || mime === "image/heic" || mime === "image/heif";
}

async function convertHeicToJpg(file: File): Promise<File> {
  // Try native browser decode first (Safari)
  try {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no ctx");
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", 0.92);
    });
    const name = file.name.replace(/\.(heic|heif)$/i, ".jpg");
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    // Not Safari — try server
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("format", "JPEG");
      fd.append("quality", "92");
      const res = await fetch("/api/heic-convert", { method: "POST", body: fd });
      if (res.ok) {
        const blob = await res.blob();
        const name = file.name.replace(/\.(heic|heif)$/i, ".jpg");
        return new File([blob], name, { type: "image/jpeg" });
      }
    } catch { /* fall through */ }
  }
  // Can't convert — return as-is and let pipeline try
  return file;
}

// ─── Pipeline runner using the shared engine ─────────────────────────────────

async function runComboFilePipeline(
  file: File,
  steps: ComboStep[]
): Promise<{ blob: Blob; name: string }> {
  try {
    // Pre-convert HEIC to JPG so the pipeline can process it
    const processableFile = isHeicFile(file) ? await convertHeicToJpg(file) : file;

    const { runPipeline } = await import("@/lib/pipeline-engine");

    const enabledSteps = steps.filter((s) => s.enabled);

    const engineSteps: EnginePipelineStep[] = enabledSteps.map((s) => ({
      id: s.id as PipelineStepId,
      enabled: true,
      settings: (s.settings ?? {}) as EnginePipelineStep["settings"],
    }));

    let result: { blob: Blob; name: string } = { blob: processableFile, name: processableFile.name };

    await runPipeline({
      steps: engineSteps,
      files: [processableFile],
      onFileProgress: () => {},
      onFileComplete: (_idx, r) => {
        result = { blob: r.blob, name: r.name };
      },
      onFileError: (_idx, err) => {
        throw new Error(err);
      },
    });

    return result;
  } catch (err) {
    console.error("[ComboClient] Pipeline error:", err);
    throw err;
  }
}

// ─── Toggle switch component ─────────────────────────────────────────────────

function ToggleSwitch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 dark:focus:ring-offset-[#191919]
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${checked
          ? "bg-[#171717] dark:bg-[#E5E5E5]"
          : "bg-[#E5E5E5] dark:bg-[#404040]"
        }
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-[#191919]
          shadow-sm ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-4" : "translate-x-0.5"}
          mt-0.5
        `}
      />
    </button>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ComboClient({ toolName, steps: initialSteps, requiresLogin, hasAiSteps, accept }: ComboClientProps) {
  const { data: session, status: authStatus } = useSession();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepToggles, setStepToggles] = useState<ComboStep[]>(initialSteps);
  const processingRef = useRef(false);

  const isAuthenticated = !!session?.user;

  // Check if any AI step is enabled and user is not logged in
  const enabledAiSteps = stepToggles.filter((s) => s.enabled && s.isAi);
  const needsAuthForAi = enabledAiSteps.length > 0 && !isAuthenticated && authStatus !== "loading";

  // At least 1 step must remain on
  const enabledCount = stepToggles.filter((s) => s.enabled).length;

  function handleToggleStep(stepId: string, value: boolean) {
    setStepToggles((prev) => {
      const updated = prev.map((s) => (s.id === stepId ? { ...s, enabled: value } : s));
      // Prevent disabling ALL steps
      const stillEnabled = updated.filter((s) => s.enabled).length;
      if (stillEnabled === 0) return prev;
      return updated;
    });
  }

  // Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: ProcessedFile[] = acceptedFiles.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      originalFile: f,
      originalName: f.name,
      resultBlob: null,
      resultName: f.name,
      status: "pending" as const,
      currentStep: -1,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
      ? { "image/*": accept.split(",") }
      : { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic", ".heif"] },
    disabled: needsAuthForAi,
    multiple: true,
  });

  // Process all files
  const processAll = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    const pendingFiles = files.filter((f) => f.status === "pending");
    const activeSteps = stepToggles.filter((s) => s.enabled);

    for (const pf of pendingFiles) {
      // Mark as processing
      setFiles((prev) =>
        prev.map((f) => (f.id === pf.id ? { ...f, status: "processing" as const, currentStep: 0 } : f))
      );

      try {
        // Simulate step progression
        for (let i = 0; i < activeSteps.length; i++) {
          setFiles((prev) =>
            prev.map((f) => (f.id === pf.id ? { ...f, currentStep: i } : f))
          );
          // Brief pause to show step animation
          await new Promise((r) => setTimeout(r, 300));
        }

        const result = await runComboFilePipeline(pf.originalFile, stepToggles);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === pf.id
              ? { ...f, status: "done" as const, resultBlob: result.blob, resultName: result.name, currentStep: activeSteps.length }
              : f
          )
        );
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === pf.id
              ? { ...f, status: "error" as const, error: err instanceof Error ? err.message : "Processing failed" }
              : f
          )
        );
      }
    }

    setIsProcessing(false);
    processingRef.current = false;
  }, [files, stepToggles]);

  // Download single
  const downloadFile = (pf: ProcessedFile) => {
    if (!pf.resultBlob) return;
    saveAs(pf.resultBlob, pf.resultName);
  };

  // Download all as ZIP
  const downloadAllZip = async () => {
    const doneFiles = files.filter((f) => f.status === "done" && f.resultBlob);
    if (doneFiles.length === 0) return;

    const zip = new JSZip();
    for (const f of doneFiles) {
      zip.file(f.resultName, f.resultBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${toolName.toLowerCase()}-output.zip`);
  };

  const hasPending = files.some((f) => f.status === "pending");
  const hasDone = files.some((f) => f.status === "done");
  const doneCount = files.filter((f) => f.status === "done").length;
  const activeSteps = stepToggles.filter((s) => s.enabled);

  return (
    <section className="px-4 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Toolbar — horizontal compact bar with toggles */}
        <div className="border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Toggle switches inline */}
            <div className="flex items-center gap-4 flex-wrap flex-1">
              {stepToggles.map((step) => {
                const isLastEnabled = step.enabled && enabledCount === 1;
                return (
                  <label key={step.id} className="flex items-center gap-2 cursor-pointer select-none">
                    <ToggleSwitch
                      checked={step.enabled}
                      onChange={(v) => handleToggleStep(step.id, v)}
                      disabled={isLastEnabled && step.enabled}
                    />
                    <span className={`text-sm ${step.enabled ? "text-gray-600 dark:text-[#A3A3A3]" : "text-[#A3A3A3] dark:text-[#525252]"}`}>
                      {step.label}
                    </span>
                    {step.isAi && (
                      isAuthenticated ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded">
                          <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
                          AI
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#A3A3A3] bg-gray-100 dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">
                          <Lock className="h-2.5 w-2.5" strokeWidth={1.5} />
                          Login
                        </span>
                      )
                    )}
                  </label>
                );
              })}
            </div>

            {/* Process button */}
            {hasPending && (
              <button
                onClick={processAll}
                disabled={isProcessing || needsAuthForAi}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" strokeWidth={1.5} />
                    Process all
                  </>
                )}
              </button>
            )}

            {/* Download ZIP after processing */}
            {hasDone && !hasPending && (
              <button
                onClick={downloadAllZip}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download ZIP ({doneCount})
              </button>
            )}
          </div>
        </div>

        {/* Auth gate message for AI steps */}
        {needsAuthForAi && (
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-6 bg-[#FAFAFA] dark:bg-[#1E1E1E] text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] mb-3">
              <Lock className="h-4 w-4 text-[#737373]" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
              Sign in to use AI steps
            </h3>
            <p className="text-xs text-[#737373] mb-4 max-w-sm mx-auto">
              AI steps require a free account. You can disable AI steps above to use {toolName} without signing in.
            </p>
            <a
              href="/api/auth/signin"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
            >
              Sign in -- it&apos;s free
            </a>
          </div>
        )}

        {/* DropZone */}
        {!needsAuthForAi && (
          <div
            {...getRootProps()}
            className={`
              border-[1.5px] border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${isDragActive
                ? "border-[#6366F1] bg-[#6366F1]/5"
                : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] hover:border-[#A3A3A3]"
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="h-6 w-6 text-[#A3A3A3] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] mb-1">
              {isDragActive ? "Drop images here" : "Drag and drop images here, or click to browse"}
            </p>
            <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
              JPG, PNG, WebP, GIF, AVIF, HEIC
            </p>
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((pf) => (
              <div
                key={pf.id}
                className="flex items-center gap-3 p-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                {/* Status icon */}
                <div className="flex-shrink-0">
                  {pf.status === "done" && <CheckCircle2 className="text-[#16A34A]" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                  {pf.status === "processing" && <Loader2 className="text-[#6366F1] animate-spin" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                  {pf.status === "pending" && <Circle className="text-[#D4D4D4]" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                  {pf.status === "error" && <AlertCircle className="text-[#DC2626]" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                </div>

                {/* File name + step progress */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{pf.originalName}</p>
                  {pf.status === "processing" && pf.currentStep >= 0 && (
                    <div className="flex items-center gap-1.5 mt-1">
                      {activeSteps.map((step, i) => (
                        <div
                          key={step.id}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i <= pf.currentStep ? "bg-[#6366F1]" : "bg-[#E5E5E5] dark:bg-[#2A2A2A]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {pf.status === "processing" && pf.currentStep >= 0 && pf.currentStep < activeSteps.length && (
                    <p className="text-[11px] text-[#737373] mt-0.5">{activeSteps[pf.currentStep].label}...</p>
                  )}
                  {pf.status === "error" && (
                    <p className="text-[11px] text-[#DC2626] mt-0.5">{pf.error}</p>
                  )}
                </div>

                {/* Download button */}
                {pf.status === "done" && pf.resultBlob && (
                  <button
                    onClick={() => downloadFile(pf)}
                    className="flex-shrink-0 p-1.5 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                    aria-label={`Download ${pf.resultName}`}
                  >
                    <Download className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Clear button */}
        {files.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={() => setFiles([])}
              className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#737373] transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

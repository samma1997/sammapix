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

// ─── Pipeline runner using the shared engine ─────────────────────────────────

async function runComboFilePipeline(
  file: File,
  steps: ComboStep[]
): Promise<{ blob: Blob; name: string }> {
  try {
    const { runPipeline } = await import("@/lib/pipeline-engine");

    const engineSteps: EnginePipelineStep[] = steps.map((s) => ({
      id: s.id as PipelineStepId,
      enabled: s.enabled,
      settings: {},
    }));

    let result: { blob: Blob; name: string } = { blob: file, name: file.name };

    await runPipeline({
      steps: engineSteps,
      files: [file],
      onFileProgress: () => {},
      onFileComplete: (_idx, r) => {
        result = { blob: r.blob, name: r.name };
      },
      onFileError: (_idx, err) => {
        throw new Error(err);
      },
    });

    return result;
  } catch {
    // Fallback: return original file as-is
    return { blob: file, name: file.name };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ComboClient({ toolName, steps, requiresLogin, hasAiSteps, accept }: ComboClientProps) {
  const { data: session, status: authStatus } = useSession();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  const isAuthenticated = !!session?.user;
  const needsAuth = requiresLogin && !isAuthenticated && authStatus !== "loading";

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
    disabled: needsAuth,
    multiple: true,
  });

  // Process all files
  const processAll = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    const pendingFiles = files.filter((f) => f.status === "pending");

    for (const pf of pendingFiles) {
      // Mark as processing
      setFiles((prev) =>
        prev.map((f) => (f.id === pf.id ? { ...f, status: "processing" as const, currentStep: 0 } : f))
      );

      try {
        // Simulate step progression
        for (let i = 0; i < steps.length; i++) {
          setFiles((prev) =>
            prev.map((f) => (f.id === pf.id ? { ...f, currentStep: i } : f))
          );
          // Brief pause to show step animation
          await new Promise((r) => setTimeout(r, 300));
        }

        const result = await runComboFilePipeline(pf.originalFile, steps);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === pf.id
              ? { ...f, status: "done" as const, resultBlob: result.blob, resultName: result.name, currentStep: steps.length }
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
  }, [files, steps]);

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

  // ─── Auth gate ────────────────────────────────────────────────────────────

  if (needsAuth) {
    return (
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-[#FAFAFA] dark:bg-[#1E1E1E] text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] mb-4">
              <Lock className="h-5 w-5 text-[#737373]" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Sign in to use {toolName}
            </h3>
            <p className="text-sm text-[#737373] mb-5 max-w-sm mx-auto">
              This combo tool uses AI features that require a free account. Sign in to get started.
            </p>
            <a
              href="/api/auth/signin"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
            >
              Sign in — it&apos;s free
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* AI daily limit badge */}
        {hasAiSteps && isAuthenticated && (
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" strokeWidth={1.5} />
            <span>AI features share your daily rename limit (5/day free, 200/day Pro)</span>
          </div>
        )}

        {/* Pipeline steps overview */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-white dark:bg-[#1E1E1E]">
          <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-3">Pipeline</p>
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#D4D4D4] dark:text-[#525252] flex-shrink-0">
                    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* DropZone */}
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
                  {pf.status === "done" && <CheckCircle2 className="h-4.5 w-4.5 text-[#16A34A]" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                  {pf.status === "processing" && <Loader2 className="h-4.5 w-4.5 text-[#6366F1] animate-spin" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                  {pf.status === "pending" && <Circle className="h-4.5 w-4.5 text-[#D4D4D4]" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                  {pf.status === "error" && <AlertCircle className="h-4.5 w-4.5 text-[#DC2626]" style={{ width: 18, height: 18 }} strokeWidth={1.5} />}
                </div>

                {/* File name + step progress */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{pf.originalName}</p>
                  {pf.status === "processing" && pf.currentStep >= 0 && (
                    <div className="flex items-center gap-1.5 mt-1">
                      {steps.map((step, i) => (
                        <div
                          key={step.id}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i <= pf.currentStep ? "bg-[#6366F1]" : "bg-[#E5E5E5] dark:bg-[#2A2A2A]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {pf.status === "processing" && pf.currentStep >= 0 && pf.currentStep < steps.length && (
                    <p className="text-[11px] text-[#737373] mt-0.5">{steps[pf.currentStep].label}...</p>
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

        {/* Action buttons */}
        {files.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {hasPending && (
              <button
                onClick={processAll}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" strokeWidth={1.5} />
                    Process All
                  </>
                )}
              </button>
            )}

            {hasDone && (
              <button
                onClick={downloadAllZip}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download all as ZIP ({doneCount})
              </button>
            )}

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

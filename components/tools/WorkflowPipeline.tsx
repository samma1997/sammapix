"use client";

import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  Instagram,
  ShoppingBag,
  Users,
  Upload,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  ChevronRight,
  Lock,
  Loader2,
  FileImage,
  Sparkles,
  Minimize2,
  Maximize2,
  ImageIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { compressImage } from "@/lib/compress";
import { convertToWebP } from "@/lib/webp-converter";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type PresetId = "blog" | "instagram" | "ecommerce" | "client";
type WizardStep = "preset" | "upload" | "processing" | "done";
type PipelineStepStatus = "pending" | "running" | "done" | "error" | "skipped";
type InstagramFormat = "square" | "portrait";

interface WorkflowPreset {
  id: PresetId;
  label: string;
  tagline: string;
  icon: React.ReactNode;
  steps: StepDefinition[];
}

interface StepDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface PipelineStep extends StepDefinition {
  status: PipelineStepStatus;
  detail?: string;
}

interface FileEntry {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  outputBlob: Blob | null;
  outputName: string;
  steps: PipelineStep[];
  overallStatus: "queued" | "running" | "done" | "error";
  errorMessage?: string;
  savedPercent?: number;
}

// ── Presets definition ────────────────────────────────────────────────────────

const PRESETS: WorkflowPreset[] = [
  {
    id: "blog",
    label: "Blog Post",
    tagline: "Compress · AI Rename · Resize 1200px · WebP · ZIP",
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.5} />,
    steps: [
      {
        id: "compress",
        label: "Compress (80%)",
        icon: <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Reduce file size at 80% quality",
      },
      {
        id: "ai-rename",
        label: "AI Rename (SEO)",
        icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Generate SEO-friendly filenames with Gemini",
      },
      {
        id: "resize",
        label: "Resize to 1200px",
        icon: <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Cap width at 1200px for web",
      },
      {
        id: "webp",
        label: "Convert to WebP",
        icon: <FileImage className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Next-gen format for 30% better compression",
      },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    tagline: "Compress · Resize 1080px · ZIP",
    icon: <Instagram className="h-5 w-5" strokeWidth={1.5} />,
    steps: [
      {
        id: "compress",
        label: "Compress (85%)",
        icon: <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Reduce size while keeping Instagram quality",
      },
      {
        id: "resize",
        label: "Resize to 1080px",
        icon: <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Square (1080×1080) or portrait (1080×1350)",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    tagline: "Compress · AI Rename (SKU) · Multi-size · WebP · ZIP",
    icon: <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />,
    steps: [
      {
        id: "compress",
        label: "Compress (85%)",
        icon: <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Optimise product images for fast page loads",
      },
      {
        id: "ai-rename",
        label: "AI Rename (SKU)",
        icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Product-style descriptive filenames",
      },
      {
        id: "resize",
        label: "Resize to 800px",
        icon: <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Standard e-commerce product image size",
      },
      {
        id: "webp",
        label: "Convert to WebP",
        icon: <FileImage className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "WebP for fastest storefront performance",
      },
    ],
  },
  {
    id: "client",
    label: "Client Delivery",
    tagline: "Light compress (90%) · Organize by date · ZIP",
    icon: <Users className="h-5 w-5" strokeWidth={1.5} />,
    steps: [
      {
        id: "compress",
        label: "Light Compress (90%)",
        icon: <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Gentle compression, preserve near-original quality",
      },
      {
        id: "resize",
        label: "Resize to 2400px",
        icon: <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "High-res cap suitable for client delivery",
      },
    ],
  },
];

// ── Preset config per operation ────────────────────────────────────────────────

interface PresetConfig {
  compressQuality: number;
  resizeMaxPx: number;
  convertWebP: boolean;
  aiRename: boolean;
  aiStyle: string;
  instagramFormat?: InstagramFormat;
}

function getPresetConfig(
  id: PresetId,
  instagramFormat: InstagramFormat = "square"
): PresetConfig {
  switch (id) {
    case "blog":
      return {
        compressQuality: 80,
        resizeMaxPx: 1200,
        convertWebP: true,
        aiRename: true,
        aiStyle: "seo",
      };
    case "instagram":
      return {
        compressQuality: 85,
        resizeMaxPx: instagramFormat === "square" ? 1080 : 1080,
        convertWebP: false,
        aiRename: false,
        aiStyle: "",
        instagramFormat,
      };
    case "ecommerce":
      return {
        compressQuality: 85,
        resizeMaxPx: 800,
        convertWebP: true,
        aiRename: true,
        aiStyle: "product",
      };
    case "client":
      return {
        compressQuality: 90,
        resizeMaxPx: 2400,
        convertWebP: false,
        aiRename: false,
        aiStyle: "",
      };
  }
}

// ── Canvas resize helper ──────────────────────────────────────────────────────

async function resizeImageBlob(
  blob: Blob,
  maxPx: number,
  instagramFormat?: InstagramFormat
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      if (instagramFormat === "portrait") {
        // 1080x1350 — crop center
        const targetW = 1080;
        const targetH = 1350;
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (!ctx) { URL.revokeObjectURL(url); reject(new Error("Canvas unavailable")); return; }

        const scaleX = targetW / w;
        const scaleY = targetH / h;
        const scale = Math.max(scaleX, scaleY);
        const scaledW = w * scale;
        const scaledH = h * scale;
        const offsetX = (targetW - scaledW) / 2;
        const offsetY = (targetH - scaledH) / 2;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

        canvas.toBlob((b) => {
          URL.revokeObjectURL(url);
          b ? resolve(b) : reject(new Error("Canvas toBlob returned null"));
        }, blob.type || "image/jpeg", 0.92);
        return;
      }

      // Standard max-side resize
      if (w <= maxPx && h <= maxPx) {
        URL.revokeObjectURL(url);
        resolve(blob);
        return;
      }

      const ratio = Math.min(maxPx / w, maxPx / h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error("Canvas unavailable")); return; }

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob((b) => {
        URL.revokeObjectURL(url);
        b ? resolve(b) : reject(new Error("Canvas toBlob returned null"));
      }, blob.type || "image/jpeg", 0.92);
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

// ── AI Rename helper ──────────────────────────────────────────────────────────

async function callAiRename(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/ai/rename", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(json.error ?? `AI rename failed (${res.status})`);
  }

  const json = (await res.json()) as { name?: string; filename?: string };
  const rawName = json.name ?? json.filename ?? file.name.replace(/\.[^.]+$/, "");
  // Strip any extension the API may have returned
  return rawName.replace(/\.[^.]+$/, "");
}

// ── Format bytes ──────────────────────────────────────────────────────────────

function fmtBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function WorkflowPipeline() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  const [step, setStep] = useState<WizardStep>("preset");
  const [selectedPreset, setSelectedPreset] = useState<PresetId | null>(null);
  const [instagramFormat, setInstagramFormat] = useState<InstagramFormat>("square");
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  // Running ref to allow cancel (future use)
  const abortRef = useRef(false);

  // ── PRO gate ────────────────────────────────────────────────────────────────

  if (!isPro) {
    return <ProGate session={session} />;
  }

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handlePresetSelect = (id: PresetId) => {
    setSelectedPreset(id);
  };

  const handleContinueToUpload = () => {
    if (!selectedPreset) return;
    setStep("upload");
  };

  const handleReset = () => {
    abortRef.current = false;
    setStep("preset");
    setSelectedPreset(null);
    setFiles([]);
    setOverallProgress(0);
    setInstagramFormat("square");
  };

  const handleRunPipeline = async () => {
    if (!selectedPreset || files.length === 0) return;
    abortRef.current = false;
    setStep("processing");

    const config = getPresetConfig(selectedPreset, instagramFormat);
    const preset = PRESETS.find((p) => p.id === selectedPreset)!;

    const buildSteps = (): PipelineStep[] =>
      preset.steps.map((s) => ({ ...s, status: "pending" as PipelineStepStatus }));

    // Initialize all file entries with pending steps
    const initialEntries: FileEntry[] = files.map((f) => ({
      ...f,
      steps: buildSteps(),
      overallStatus: "queued",
    }));
    setFiles(initialEntries);

    let doneCount = 0;

    // Process files sequentially to avoid memory spikes
    const updatedEntries = [...initialEntries];

    for (let i = 0; i < updatedEntries.length; i++) {
      if (abortRef.current) break;

      const entry = { ...updatedEntries[i] };
      entry.overallStatus = "running";
      updatedEntries[i] = entry;
      setFiles([...updatedEntries]);

      let currentBlob: Blob = entry.file;
      let currentName = entry.name.replace(/\.[^.]+$/, "");
      let ext = entry.name.split(".").pop() ?? "jpg";
      let stepError = false;

      const updateStep = (stepId: string, status: PipelineStepStatus, detail?: string) => {
        const updatedSteps = entry.steps.map((s) =>
          s.id === stepId ? { ...s, status, detail: detail ?? s.detail } : s
        );
        entry.steps = updatedSteps;
        updatedEntries[i] = { ...entry };
        setFiles([...updatedEntries]);
      };

      // ── Step: compress ────────────────────────────────────────────────────
      if (preset.steps.some((s) => s.id === "compress") && !stepError) {
        updateStep("compress", "running");
        try {
          const result = await compressImage(
            new File([currentBlob], `${currentName}.${ext}`, { type: currentBlob.type || entry.file.type }),
            {
              quality: config.compressQuality,
              convertToWebP: false,
              maxWidthOrHeight: 4096,
            }
          );
          currentBlob = result.blob;
          updateStep("compress", "done", `−${result.savedPercent}%`);
          entry.savedPercent = result.savedPercent;
        } catch (err) {
          updateStep("compress", "error", (err as Error).message);
          stepError = true;
        }
      }

      // ── Step: resize ──────────────────────────────────────────────────────
      if (preset.steps.some((s) => s.id === "resize") && !stepError) {
        updateStep("resize", "running");
        try {
          currentBlob = await resizeImageBlob(
            currentBlob,
            config.resizeMaxPx,
            config.instagramFormat
          );
          updateStep("resize", "done", `≤${config.resizeMaxPx}px`);
        } catch (err) {
          updateStep("resize", "error", (err as Error).message);
          stepError = true;
        }
      }

      // ── Step: ai-rename ───────────────────────────────────────────────────
      if (preset.steps.some((s) => s.id === "ai-rename") && !stepError) {
        updateStep("ai-rename", "running");
        try {
          // Create a File from current blob for the API
          const tmpFile = new File(
            [entry.file],
            `${currentName}.${ext}`,
            { type: entry.file.type }
          );
          const aiName = await callAiRename(tmpFile);
          currentName = aiName;
          updateStep("ai-rename", "done", aiName.length > 28 ? `${aiName.slice(0, 28)}…` : aiName);
        } catch (err) {
          // AI rename failure is non-fatal — keep original name and mark skipped
          updateStep("ai-rename", "skipped", "Skipped (API error)");
        }
      }

      // ── Step: webp ────────────────────────────────────────────────────────
      if (preset.steps.some((s) => s.id === "webp") && !stepError) {
        updateStep("webp", "running");
        try {
          const webpBlob = await convertToWebP(
            new File([currentBlob], `${currentName}.jpg`, { type: "image/jpeg" }),
            0.85
          );
          currentBlob = webpBlob;
          ext = "webp";
          updateStep("webp", "done", "WebP");
        } catch (err) {
          updateStep("webp", "error", (err as Error).message);
          stepError = true;
        }
      }

      // ── Finalise entry ────────────────────────────────────────────────────
      entry.outputBlob = currentBlob;
      entry.outputName = `${currentName}.${ext}`;
      entry.overallStatus = stepError ? "error" : "done";

      if (stepError) {
        const failedStep = entry.steps.find((s) => s.status === "error");
        entry.errorMessage = failedStep?.detail ?? "Pipeline error";
      }

      updatedEntries[i] = { ...entry };
      doneCount++;
      setOverallProgress(Math.round((doneCount / updatedEntries.length) * 100));
      setFiles([...updatedEntries]);
    }

    setStep("done");
  };

  const handleDownloadAll = async () => {
    const doneFiles = files.filter((f) => f.overallStatus === "done" && f.outputBlob);
    if (doneFiles.length === 0) return;

    if (doneFiles.length === 1) {
      saveAs(doneFiles[0].outputBlob!, doneFiles[0].outputName);
      return;
    }

    const zip = new JSZip();
    for (const f of doneFiles) {
      zip.file(f.outputName, f.outputBlob!);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const preset = PRESETS.find((p) => p.id === selectedPreset);
    saveAs(zipBlob, `sammapix-${preset?.id ?? "workflow"}.zip`);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {/* Progress stepper */}
      <WizardStepper currentStep={step} />

      {/* Step 1: Select preset */}
      {step === "preset" && (
        <PresetSelector
          presets={PRESETS}
          selectedId={selectedPreset}
          onSelect={handlePresetSelect}
          instagramFormat={instagramFormat}
          onInstagramFormatChange={setInstagramFormat}
          onContinue={handleContinueToUpload}
        />
      )}

      {/* Step 2: Upload files */}
      {step === "upload" && (
        <UploadStep
          files={files}
          onFilesChange={setFiles}
          onBack={() => setStep("preset")}
          onRun={handleRunPipeline}
          preset={PRESETS.find((p) => p.id === selectedPreset)!}
        />
      )}

      {/* Step 3: Processing */}
      {step === "processing" && (
        <ProcessingStep
          files={files}
          overallProgress={overallProgress}
        />
      )}

      {/* Step 4: Done */}
      {step === "done" && (
        <DoneStep
          files={files}
          onDownloadAll={handleDownloadAll}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

// ── PRO Gate ──────────────────────────────────────────────────────────────────

function ProGate({ session }: { session: ReturnType<typeof useSession>["data"] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-[#FAFAFA] dark:bg-[#1E1E1E] text-center">
        <div className="w-12 h-12 rounded-full bg-[#171717]/8 dark:bg-white/8 flex items-center justify-center mx-auto mb-4">
          <Lock className="h-5 w-5 text-[#171717] dark:text-[#E5E5E5]" strokeWidth={1.5} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171717] text-white text-[11px] font-semibold uppercase tracking-wider mb-4">
          PRO
        </div>

        <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
          AI Workflow Pipeline is a Pro feature
        </h2>
        <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 max-w-md mx-auto leading-relaxed">
          Combine compress, resize, AI rename and WebP conversion into a single
          one-click pipeline. Drop your images and get a ready-to-use ZIP in seconds.
        </p>

        <ul className="text-left space-y-2 max-w-xs mx-auto mb-7">
          {[
            "Blog Post, Instagram, E-commerce & Client Delivery presets",
            "AI-powered SEO renaming with Google Gemini",
            "Compress + resize + convert in one pass",
            "Bulk ZIP download of all processed images",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 h-4 w-4 mt-0.5 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-[#6366F1]" strokeWidth={2.5} />
              </span>
              <span className="text-xs text-[#525252] dark:text-[#A3A3A3]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pricing">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-semibold rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors">
              <Zap className="h-4 w-4" strokeWidth={1.5} />
              Upgrade to Pro — $7/mo
            </button>
          </Link>
          {!session && (
            <Link href="/auth/signin">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors">
                Sign in first
              </button>
            </Link>
          )}
        </div>

        <p className="text-[11px] text-[#A3A3A3] dark:text-[#525252] mt-4">
          30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}

// ── Wizard Stepper ─────────────────────────────────────────────────────────────

const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "preset", label: "Choose preset" },
  { id: "upload", label: "Add images" },
  { id: "processing", label: "Running" },
  { id: "done", label: "Download" },
];

function WizardStepper({ currentStep }: { currentStep: WizardStep }) {
  const currentIdx = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center gap-0 mb-8 pt-2">
      {WIZARD_STEPS.map((s, i) => {
        const isDone = i < currentIdx;
        const isActive = i === currentIdx;
        return (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors",
                  isDone && "bg-[#171717] dark:bg-white text-white dark:text-[#171717]",
                  isActive && "bg-[#6366F1] text-white",
                  !isDone && !isActive && "bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3]"
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium hidden sm:block",
                  isActive ? "text-[#171717] dark:text-[#E5E5E5]" : "text-[#A3A3A3]"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-3 transition-colors",
                  i < currentIdx ? "bg-[#171717] dark:bg-white" : "bg-[#E5E5E5] dark:bg-[#2A2A2A]"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Preset Selector ────────────────────────────────────────────────────────────

interface PresetSelectorProps {
  presets: WorkflowPreset[];
  selectedId: PresetId | null;
  onSelect: (id: PresetId) => void;
  instagramFormat: InstagramFormat;
  onInstagramFormatChange: (f: InstagramFormat) => void;
  onContinue: () => void;
}

function PresetSelector({
  presets,
  selectedId,
  onSelect,
  instagramFormat,
  onInstagramFormatChange,
  onContinue,
}: PresetSelectorProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
        Choose a workflow preset
      </h2>
      <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-5">
        Each preset runs a fixed sequence of operations optimised for that use case.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {presets.map((preset) => {
          const isSelected = selectedId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset.id)}
              className={cn(
                "text-left p-4 border rounded-md transition-all",
                isSelected
                  ? "border-[#171717] dark:border-white bg-white dark:bg-[#252525] shadow-sm"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#525252] hover:bg-[#FAFAFA] dark:hover:bg-[#222222]"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex-shrink-0 h-9 w-9 rounded-md border flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3]"
                  )}
                >
                  {preset.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {preset.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#6366F1] flex-shrink-0" strokeWidth={2} />
                    )}
                  </div>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                    {preset.tagline}
                  </p>
                </div>
              </div>

              {/* Step list */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <div className="flex flex-wrap gap-2">
                    {preset.steps.map((s, idx) => (
                      <div key={s.id} className="flex items-center gap-1">
                        <span className="text-[11px] text-[#525252] dark:text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded px-1.5 py-0.5">
                          {s.label}
                        </span>
                        {idx < preset.steps.length - 1 && (
                          <ChevronRight className="h-3 w-3 text-[#D4D4D4]" strokeWidth={1.5} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Instagram format sub-option */}
      {selectedId === "instagram" && (
        <div className="mb-5 p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3 uppercase tracking-wide">
            Format
          </p>
          <div className="flex gap-3">
            {(["square", "portrait"] as InstagramFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => onInstagramFormatChange(fmt)}
                className={cn(
                  "flex-1 py-2.5 text-sm font-medium rounded-md border transition-colors",
                  instagramFormat === fmt
                    ? "border-[#171717] dark:border-white bg-[#171717] dark:bg-white text-white dark:text-[#171717]"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3]"
                )}
              >
                {fmt === "square" ? "Square (1080×1080)" : "Portrait (1080×1350)"}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        disabled={!selectedId}
        onClick={onContinue}
        className={cn(
          "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md transition-colors",
          selectedId
            ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
            : "bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3] cursor-not-allowed"
        )}
      >
        Continue
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

// ── Upload Step ────────────────────────────────────────────────────────────────

interface UploadStepProps {
  files: FileEntry[];
  onFilesChange: (files: FileEntry[]) => void;
  onBack: () => void;
  onRun: () => void;
  preset: WorkflowPreset;
}

function UploadStep({ files, onFilesChange, onBack, onRun, preset }: UploadStepProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      const newEntries: FileEntry[] = accepted.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        name: file.name,
        originalSize: file.size,
        outputBlob: null,
        outputName: file.name,
        steps: preset.steps.map((s) => ({ ...s, status: "pending" as PipelineStepStatus })),
        overallStatus: "queued",
      }));
      onFilesChange([...files, ...newEntries]);
    },
    [files, onFilesChange, preset.steps]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
      "image/avif": [".avif"],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Add images
        </span>
        <span className="text-xs text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded px-1.5 py-0.5">
          {preset.label} pipeline
        </span>
      </div>
      <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-5">
        Drop all images you want to process through this workflow.
      </p>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3",
          "w-full py-12 px-6 rounded-lg cursor-pointer",
          "border-[1.5px] border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] bg-[#FAFAFA] dark:bg-[#1E1E1E]",
          "transition-all duration-150",
          isDragActive && "border-[#6366F1] border-solid bg-[#EEF2FF]/30 dark:bg-[#6366F1]/5",
          !isDragActive && "hover:border-[#A3A3A3] dark:hover:border-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
        )}
      >
        <input {...getInputProps()} />
        <div
          className={cn(
            "h-10 w-10 rounded-lg border border-[#E5E5E5] dark:border-[#3A3A3A] bg-white dark:bg-[#252525] flex items-center justify-center",
            isDragActive && "border-[#6366F1] bg-[#EEF2FF]"
          )}
        >
          <Upload
            className={cn(
              "h-5 w-5 transition-colors",
              isDragActive ? "text-[#6366F1]" : "text-[#A3A3A3]"
            )}
            strokeWidth={1.5}
          />
        </div>
        <div className="text-center">
          {isDragActive ? (
            <p className="text-sm font-medium text-[#6366F1]">Drop to add</p>
          ) : (
            <>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Drop images here or{" "}
                <span className="underline underline-offset-2">click to upload</span>
              </p>
              <p className="text-xs text-[#A3A3A3] mt-1">PNG, JPG, WebP, GIF, AVIF — up to 50MB each</p>
            </>
          )}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
          {files.map((f, idx) => (
            <div
              key={f.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm",
                idx > 0 && "border-t border-[#E5E5E5] dark:border-[#2A2A2A]",
                "bg-white dark:bg-[#1E1E1E] hover:bg-[#FAFAFA] dark:hover:bg-[#222222] transition-colors"
              )}
            >
              <ImageIcon className="h-4 w-4 text-[#A3A3A3] flex-shrink-0" strokeWidth={1.5} />
              <span className="flex-1 truncate text-[#171717] dark:text-[#E5E5E5]">{f.name}</span>
              <span className="text-xs text-[#A3A3A3] flex-shrink-0">{fmtBytes(f.originalSize)}</span>
              <button
                onClick={() => removeFile(f.id)}
                className="text-[#A3A3A3] hover:text-[#DC2626] transition-colors flex-shrink-0"
                aria-label="Remove file"
              >
                <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
        >
          Back
        </button>
        <button
          disabled={files.length === 0}
          onClick={onRun}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md transition-colors",
            files.length > 0
              ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
              : "bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3] cursor-not-allowed"
          )}
        >
          <Zap className="h-4 w-4" strokeWidth={1.5} />
          Run pipeline
          {files.length > 0 && (
            <span className="text-xs opacity-70">
              ({files.length} {files.length === 1 ? "file" : "files"})
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Processing Step ────────────────────────────────────────────────────────────

interface ProcessingStepProps {
  files: FileEntry[];
  overallProgress: number;
}

function ProcessingStep({ files, overallProgress }: ProcessingStepProps) {
  const doneCount = files.filter((f) => f.overallStatus === "done" || f.overallStatus === "error").length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <Loader2 className="h-5 w-5 text-[#6366F1] animate-spin" strokeWidth={1.5} />
        <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Running pipeline…
        </h2>
      </div>
      <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-5">
        {doneCount} of {files.length} files processed
      </p>

      {/* Overall progress bar */}
      <div className="mb-6">
        <div className="h-1.5 w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#171717] dark:bg-white rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-[#A3A3A3] mt-1 text-right">{overallProgress}%</p>
      </div>

      {/* File list with per-step progress */}
      <div className="space-y-3">
        {files.map((f) => (
          <FileProcessingCard key={f.id} entry={f} />
        ))}
      </div>
    </div>
  );
}

function FileProcessingCard({ entry }: { entry: FileEntry }) {
  return (
    <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
      <div className="flex items-center gap-2 mb-3">
        {entry.overallStatus === "running" ? (
          <Loader2 className="h-3.5 w-3.5 text-[#6366F1] animate-spin flex-shrink-0" strokeWidth={1.5} />
        ) : entry.overallStatus === "done" ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A] flex-shrink-0" strokeWidth={2} />
        ) : entry.overallStatus === "error" ? (
          <AlertCircle className="h-3.5 w-3.5 text-[#DC2626] flex-shrink-0" strokeWidth={2} />
        ) : (
          <div className="h-3.5 w-3.5 rounded-full border-2 border-[#E5E5E5] dark:border-[#3A3A3A] flex-shrink-0" />
        )}
        <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate flex-1">
          {entry.name}
        </span>
        <span className="text-xs text-[#A3A3A3] flex-shrink-0">{fmtBytes(entry.originalSize)}</span>
      </div>

      {/* Per-step pills */}
      <div className="flex flex-wrap gap-1.5">
        {entry.steps.map((s) => (
          <div
            key={s.id}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors",
              s.status === "pending" &&
                "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3]",
              s.status === "running" &&
                "border-[#6366F1]/40 bg-[#EEF2FF]/50 dark:bg-[#6366F1]/10 text-[#6366F1]",
              s.status === "done" &&
                "border-[#BBF7D0] dark:border-[#16A34A]/30 bg-[#F0FDF4] dark:bg-[#16A34A]/10 text-[#16A34A]",
              s.status === "error" &&
                "border-[#FECACA] dark:border-[#DC2626]/30 bg-[#FEF2F2] dark:bg-[#DC2626]/10 text-[#DC2626]",
              s.status === "skipped" &&
                "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3]"
            )}
          >
            {s.status === "running" && (
              <Loader2 className="h-2.5 w-2.5 animate-spin" strokeWidth={2} />
            )}
            {s.status === "done" && (
              <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2.5} />
            )}
            {s.label}
            {s.detail && s.status === "done" && (
              <span className="opacity-70">· {s.detail}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Done Step ──────────────────────────────────────────────────────────────────

interface DoneStepProps {
  files: FileEntry[];
  onDownloadAll: () => void;
  onReset: () => void;
}

function DoneStep({ files, onDownloadAll, onReset }: DoneStepProps) {
  const doneFiles = files.filter((f) => f.overallStatus === "done");
  const errorFiles = files.filter((f) => f.overallStatus === "error");
  const totalSavedPercent =
    doneFiles.length > 0
      ? Math.round(
          doneFiles.reduce((acc, f) => acc + (f.savedPercent ?? 0), 0) / doneFiles.length
        )
      : 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle2 className="h-5 w-5 text-[#16A34A]" strokeWidth={2} />
        <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Pipeline complete
        </h2>
      </div>
      <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-5">
        {doneFiles.length} image{doneFiles.length !== 1 ? "s" : ""} processed
        {errorFiles.length > 0 && `, ${errorFiles.length} failed`}
        {totalSavedPercent > 0 && ` — avg ${totalSavedPercent}% smaller`}
      </p>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Processed", value: `${doneFiles.length}`, sub: "files" },
          {
            label: "Avg size saved",
            value: totalSavedPercent > 0 ? `${totalSavedPercent}%` : "—",
            sub: "smaller",
          },
          {
            label: "Errors",
            value: `${errorFiles.length}`,
            sub: errorFiles.length === 0 ? "none" : "failed",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4 text-center"
          >
            <p className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">{stat.value}</p>
            <p className="text-xs text-[#A3A3A3] mt-0.5">{stat.sub}</p>
            <p className="text-[11px] text-[#D4D4D4] dark:text-[#525252] uppercase tracking-wide mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* File results list */}
      <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden mb-6">
        {files.map((f, idx) => (
          <div
            key={f.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              idx > 0 && "border-t border-[#E5E5E5] dark:border-[#2A2A2A]",
              "bg-white dark:bg-[#1E1E1E]"
            )}
          >
            {f.overallStatus === "done" ? (
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] flex-shrink-0" strokeWidth={2} />
            ) : (
              <AlertCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" strokeWidth={2} />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                {f.outputName}
              </p>
              {f.overallStatus === "error" && f.errorMessage && (
                <p className="text-xs text-[#DC2626] mt-0.5">{f.errorMessage}</p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {f.overallStatus === "done" && f.outputBlob && (
                <span className="text-xs text-[#A3A3A3]">{fmtBytes(f.outputBlob.size)}</span>
              )}
              {f.savedPercent !== undefined && f.savedPercent > 0 && (
                <span className="text-xs text-[#16A34A] font-medium">−{f.savedPercent}%</span>
              )}
              {f.overallStatus === "done" && f.outputBlob && (
                <button
                  onClick={() => saveAs(f.outputBlob!, f.outputName)}
                  className="p-1.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                  aria-label="Download file"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onDownloadAll}
          disabled={doneFiles.length === 0}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md transition-colors",
            doneFiles.length > 0
              ? "bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-[#E5E5E5]"
              : "bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3] cursor-not-allowed"
          )}
        >
          <Download className="h-4 w-4" strokeWidth={1.5} />
          {doneFiles.length === 1 ? "Download file" : `Download all as ZIP`}
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
          Start over
        </button>
      </div>
    </div>
  );
}

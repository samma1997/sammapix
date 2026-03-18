"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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
import { cn } from "@/lib/utils";
import {
  runPipeline,
  type PipelineStep as EnginePipelineStep,
  type PipelineStepId,
  type PipelineFileResult,
} from "@/lib/pipeline-engine";

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
  required?: boolean;    // required steps cannot be toggled off
  needsAuth?: boolean;   // true if step needs a logged-in user
  isAI?: boolean;        // true for AI-powered steps
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
        required: true,
      },
      {
        id: "ai-rename",
        label: "AI Rename (SEO)",
        icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Generate SEO-friendly filenames with Gemini",
        needsAuth: true,
        isAI: true,
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
        required: true,
      },
      {
        id: "resize",
        label: "Resize to 1080px",
        icon: <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Square (1080x1080) or portrait (1080x1350)",
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
        required: true,
      },
      {
        id: "ai-rename",
        label: "AI Rename (SKU)",
        icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
        description: "Product-style descriptive filenames",
        needsAuth: true,
        isAI: true,
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
        required: true,
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
  const searchParams = useSearchParams();
  const urlPreset = searchParams.get("preset") as PresetId | null;

  const [step, setStep] = useState<WizardStep>("preset");
  const [selectedPreset, setSelectedPreset] = useState<PresetId | null>(null);
  const [instagramFormat, setInstagramFormat] = useState<InstagramFormat>("square");
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [stepToggles, setStepToggles] = useState<Record<string, boolean>>({});

  // Running ref to allow cancel (future use)
  const abortRef = useRef(false);
  const urlPresetApplied = useRef(false);

  // ── URL preset auto-select ─────────────────────────────────────────────────

  useEffect(() => {
    if (urlPreset && !urlPresetApplied.current) {
      const validPresets: PresetId[] = ["blog", "instagram", "ecommerce", "client"];
      if (validPresets.includes(urlPreset)) {
        urlPresetApplied.current = true;
        setSelectedPreset(urlPreset);
        // Initialize toggles for this preset
        const preset = PRESETS.find((p) => p.id === urlPreset);
        if (preset) {
          const toggles: Record<string, boolean> = {};
          for (const s of preset.steps) {
            // AI steps: only enabled if user is logged in
            if (s.needsAuth && !session) {
              toggles[s.id] = false;
            } else {
              toggles[s.id] = true;
            }
          }
          setStepToggles(toggles);
        }
        setStep("upload");
      }
    }
  }, [urlPreset, session]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handlePresetSelect = (id: PresetId) => {
    setSelectedPreset(id);
    // Initialize toggles
    const preset = PRESETS.find((p) => p.id === id);
    if (preset) {
      const toggles: Record<string, boolean> = {};
      for (const s of preset.steps) {
        if (s.needsAuth && !session) {
          toggles[s.id] = false;
        } else {
          toggles[s.id] = true;
        }
      }
      setStepToggles(toggles);
    }
  };

  const handleToggleStep = (stepId: string, enabled: boolean) => {
    setStepToggles((prev) => ({ ...prev, [stepId]: enabled }));
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
    setStepToggles({});
  };

  const handleRunPipeline = async () => {
    if (!selectedPreset || files.length === 0) return;
    abortRef.current = false;
    setStep("processing");

    const presetConfig = getPresetConfig(selectedPreset, instagramFormat);
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
    const updatedEntries = [...initialEntries];

    // Helper to update step status in local state
    const updateStep = (fileIndex: number, stepId: string, status: PipelineStepStatus, detail?: string) => {
      const entry = { ...updatedEntries[fileIndex] };
      entry.steps = entry.steps.map((s) =>
        s.id === stepId ? { ...s, status, detail: detail ?? s.detail } : s
      );
      updatedEntries[fileIndex] = entry;
      setFiles([...updatedEntries]);
    };

    const markFileRunning = (fileIndex: number) => {
      const entry = { ...updatedEntries[fileIndex] };
      entry.overallStatus = "running";
      updatedEntries[fileIndex] = entry;
      setFiles([...updatedEntries]);
    };

    // Build engine steps from the preset definition, respecting toggles
    const engineSteps: EnginePipelineStep[] = preset.steps.map((s) => ({
      id: s.id as PipelineStepId,
      enabled: stepToggles[s.id] !== false,
      settings: {
        quality: presetConfig.compressQuality,
        maxWidthOrHeight: 4096,
        maxPx: presetConfig.resizeMaxPx,
        instagramFormat: presetConfig.instagramFormat,
        webpQuality: 0.85,
        locale: "en",
      },
    }));

    // Track which file is currently being processed so progress callbacks
    // can mark it as "running" on first contact
    const fileStarted = new Set<number>();

    await runPipeline({
      steps: engineSteps,
      files: files.map((f) => f.file),
      abortRef,

      onFileProgress: (fileIndex, stepId, progress) => {
        if (!fileStarted.has(fileIndex)) {
          fileStarted.add(fileIndex);
          markFileRunning(fileIndex);
        }

        if (progress === 0) {
          // Step just started
          updateStep(fileIndex, stepId, "running");
        } else if (progress === -1) {
          // Step was skipped (non-fatal, e.g. AI rename failure)
          updateStep(fileIndex, stepId, "skipped", "Skipped (API error)");
        } else if (progress === 100) {
          // Step completed — detail is set in onFileComplete for compress
          const detail = getStepDetail(stepId, presetConfig);
          updateStep(fileIndex, stepId, "done", detail);
        }
      },

      onFileComplete: (fileIndex, result: PipelineFileResult) => {
        const entry = { ...updatedEntries[fileIndex] };
        entry.outputBlob = result.blob;
        entry.outputName = result.name;
        entry.overallStatus = "done";
        entry.savedPercent = result.savedPercent;

        // Update compress step detail with actual saved percent
        if (result.savedPercent !== undefined) {
          entry.steps = entry.steps.map((s) =>
            s.id === "compress" ? { ...s, detail: `−${result.savedPercent}%` } : s
          );
        }

        // Update ai-rename step detail with the new filename
        if (result.altText || result.name !== files[fileIndex].name) {
          const aiName = result.name.replace(/\.[^.]+$/, "");
          entry.steps = entry.steps.map((s) =>
            s.id === "ai-rename" && s.status === "done"
              ? { ...s, detail: aiName.length > 28 ? `${aiName.slice(0, 28)}…` : aiName }
              : s
          );
        }

        updatedEntries[fileIndex] = entry;
        doneCount++;
        setOverallProgress(Math.round((doneCount / updatedEntries.length) * 100));
        setFiles([...updatedEntries]);
      },

      onFileError: (fileIndex, error) => {
        const entry = { ...updatedEntries[fileIndex] };
        entry.overallStatus = "error";
        entry.errorMessage = error;

        // Mark the currently running step as errored
        entry.steps = entry.steps.map((s) =>
          s.status === "running" ? { ...s, status: "error" as PipelineStepStatus, detail: error } : s
        );

        updatedEntries[fileIndex] = entry;
        doneCount++;
        setOverallProgress(Math.round((doneCount / updatedEntries.length) * 100));
        setFiles([...updatedEntries]);
      },
    });

    setStep("done");
  };

  /** Map step IDs to human-readable detail strings for the UI */
  function getStepDetail(stepId: PipelineStepId, cfg: PresetConfig): string | undefined {
    switch (stepId) {
      case "resize":
        return `≤${cfg.resizeMaxPx}px`;
      case "webp":
        return "WebP";
      default:
        return undefined;
    }
  }

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
          stepToggles={stepToggles}
          onToggleStep={handleToggleStep}
          session={session}
          isPro={isPro}
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
  stepToggles: Record<string, boolean>;
  onToggleStep: (stepId: string, enabled: boolean) => void;
  session: ReturnType<typeof useSession>["data"];
  isPro: boolean;
}

function PresetSelector({
  presets,
  selectedId,
  onSelect,
  instagramFormat,
  onInstagramFormatChange,
  onContinue,
  stepToggles,
  onToggleStep,
  session,
  isPro,
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

              {/* Step list with toggles */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <div className="space-y-2">
                    {preset.steps.map((s) => {
                      const isEnabled = stepToggles[s.id] !== false;
                      const isRequired = s.required === true;
                      const needsLogin = s.needsAuth && !session;
                      const isAIStep = s.isAI === true;
                      return (
                        <div key={s.id} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={cn(
                              "text-[11px] bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded px-1.5 py-0.5 flex items-center gap-1",
                              isEnabled ? "text-[#525252] dark:text-[#A3A3A3]" : "text-[#A3A3A3] dark:text-[#525252] line-through"
                            )}>
                              {s.label}
                              {needsLogin && (
                                <Lock className="h-2.5 w-2.5 text-[#A3A3A3]" strokeWidth={1.5} />
                              )}
                            </span>
                            {needsLogin && (
                              <Link href="/api/auth/signin" className="text-[10px] text-[#6366F1] hover:underline underline-offset-2">
                                Sign in to enable
                              </Link>
                            )}
                            {isAIStep && session && !isPro && (
                              <span className="text-[10px] text-[#A3A3A3]">10/day free</span>
                            )}
                          </div>
                          <button
                            type="button"
                            disabled={isRequired || needsLogin}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isRequired && !needsLogin) onToggleStep(s.id, !isEnabled);
                            }}
                            className={cn(
                              "relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0",
                              isRequired && "cursor-not-allowed",
                              needsLogin && "cursor-not-allowed opacity-50",
                              isEnabled
                                ? "bg-[#171717] dark:bg-white"
                                : "bg-[#E5E5E5] dark:bg-[#3A3A3A]"
                            )}
                            aria-label={`Toggle ${s.label}`}
                          >
                            <span
                              className={cn(
                                "inline-block h-3.5 w-3.5 rounded-full bg-white dark:bg-[#171717] transition-transform",
                                isEnabled ? "translate-x-[18px]" : "translate-x-[3px]"
                              )}
                            />
                          </button>
                        </div>
                      );
                    })}
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

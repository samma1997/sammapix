"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Play,
  Download,
  Upload,
  CheckCircle2,
  Loader2,
  Circle,
  AlertCircle,
  Sparkles,
  Lock,
  Trash2,
  GripVertical,
  Tag,
  FileText,
  Zap,
} from "lucide-react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import type {
  PipelineStep as EnginePipelineStep,
  PipelineStepId,
} from "@/lib/pipeline-engine";
import {
  AI_OPS_FREE_PER_DAY,
  MAX_FILES_FREE,
  MAX_FILES_PRO,
  resolveFileLimit,
} from "@/lib/constants";
import { WORKFLOW_RECIPES } from "@/lib/workflow-recipes";

// ── Constants ─────────────────────────────────────────────────────────────────

const FREE_MAX_STEPS = 2;

// ── Step palette definition ───────────────────────────────────────────────────

interface StepDef {
  id: PipelineStepId;
  label: string;
  description: string;
  isAi?: boolean;
}

const STEP_PALETTE: StepDef[] = [
  {
    id: "compress",
    label: "Compress",
    description: "Reduce file size with quality control",
  },
  {
    id: "resize",
    label: "Resize",
    description: "Limit the longest side to a max dimension",
  },
  {
    id: "webp",
    label: "Convert to WebP",
    description: "25-35% smaller than JPEG with same quality",
  },
  {
    id: "ai-rename",
    label: "AI Rename",
    description: "Generate SEO-optimised filenames with AI",
    isAi: true,
  },
  {
    id: "exif-strip",
    label: "Strip Metadata",
    description: "Remove EXIF/GPS data for privacy",
  },
];

// ── Workflow step state ───────────────────────────────────────────────────────

interface WorkflowStep {
  uid: string; // unique per instance (allows future multi-instance if we want)
  id: PipelineStepId;
  label: string;
  isAi?: boolean;
  // settings
  quality: number; // compress quality 10-100
  maxPx: number; // resize longest-side px
  webpQuality: number; // 50-100 (mapped /100 -> webpQuality 0-1)
  locale: string; // ai-rename locale
}

function makeStep(def: StepDef): WorkflowStep {
  return {
    uid: `${def.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    id: def.id,
    label: def.label,
    isAi: def.isAi,
    quality: 80,
    maxPx: 1080,
    webpQuality: 85,
    locale: "en",
  };
}

function defaultWorkflow(): WorkflowStep[] {
  return [
    { ...makeStep(STEP_PALETTE[1]), uid: "resize-default", maxPx: 1080 },
    { ...makeStep(STEP_PALETTE[0]), uid: "compress-default", quality: 80 },
    { ...makeStep(STEP_PALETTE[2]), uid: "webp-default", webpQuality: 85 },
  ];
}

// ── Workflow summary ──────────────────────────────────────────────────────────

interface WorkflowSummary {
  fileCount: number;
  totalBefore: number; // bytes
  totalAfter: number; // bytes
  hasExifStrip: boolean;
  hasAiRename: boolean;
}

// ── Processed file state ──────────────────────────────────────────────────────

interface ProcessedFile {
  uid: string;
  originalFile: File;
  resultBlob: Blob | null;
  resultName: string;
  status: "pending" | "processing" | "done" | "error";
  currentStepIdx: number;
  error?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toEngineSteps(steps: WorkflowStep[]): EnginePipelineStep[] {
  return steps.map((s) => {
    const settings: EnginePipelineStep["settings"] = {};
    if (s.id === "compress") {
      settings.quality = s.quality;
    } else if (s.id === "resize") {
      settings.maxPx = s.maxPx;
    } else if (s.id === "webp") {
      settings.webpQuality = s.webpQuality / 100;
    } else if (s.id === "ai-rename") {
      settings.locale = s.locale;
    }
    return { id: s.id, enabled: true, settings };
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StepSettings({
  step,
  onChange,
}: {
  step: WorkflowStep;
  onChange: (patch: Partial<WorkflowStep>) => void;
}) {
  if (step.id === "compress") {
    return (
      <div className="flex items-center gap-3 mt-2">
        <label className="text-xs text-[#737373] dark:text-[#A3A3A3] whitespace-nowrap">
          Quality: <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{step.quality}%</span>
        </label>
        <input
          type="range"
          min={10}
          max={100}
          value={step.quality}
          onChange={(e) => onChange({ quality: Number(e.target.value) })}
          className="flex-1 h-1.5 accent-[#6366F1] cursor-pointer"
        />
      </div>
    );
  }

  if (step.id === "resize") {
    const presets = [720, 1080, 1440, 2048];
    return (
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center gap-3">
          <label className="text-xs text-[#737373] dark:text-[#A3A3A3] whitespace-nowrap">
            Max side: <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{step.maxPx}px</span>
          </label>
          <input
            type="range"
            min={360}
            max={4096}
            step={8}
            value={step.maxPx}
            onChange={(e) => onChange({ maxPx: Number(e.target.value) })}
            className="flex-1 h-1.5 accent-[#6366F1] cursor-pointer"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {presets.map((px) => (
            <button
              key={px}
              type="button"
              onClick={() => onChange({ maxPx: px })}
              className={[
                "px-2 py-0.5 rounded text-[10px] font-medium border transition-colors",
                step.maxPx === px
                  ? "bg-[#6366F1] border-[#6366F1] text-white"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] hover:border-[#6366F1] hover:text-[#6366F1]",
              ].join(" ")}
            >
              {px}px
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.id === "webp") {
    return (
      <div className="flex items-center gap-3 mt-2">
        <label className="text-xs text-[#737373] dark:text-[#A3A3A3] whitespace-nowrap">
          Quality: <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{step.webpQuality}%</span>
        </label>
        <input
          type="range"
          min={50}
          max={100}
          value={step.webpQuality}
          onChange={(e) => onChange({ webpQuality: Number(e.target.value) })}
          className="flex-1 h-1.5 accent-[#6366F1] cursor-pointer"
        />
      </div>
    );
  }

  if (step.id === "ai-rename") {
    const langs = [
      { code: "en", label: "English" },
      { code: "it", label: "Italiano" },
      { code: "es", label: "Espanol" },
      { code: "fr", label: "Francais" },
      { code: "de", label: "Deutsch" },
    ];
    return (
      <div className="flex items-center gap-2 mt-2">
        <label className="text-xs text-[#737373] dark:text-[#A3A3A3]">Language:</label>
        <select
          value={step.locale}
          onChange={(e) => onChange({ locale: e.target.value })}
          className="text-xs bg-transparent border border-[#E5E5E5] dark:border-[#2A2A2A] rounded px-2 py-1 text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
        >
          {langs.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (step.id === "exif-strip") {
    return (
      <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1.5">
        Removes all EXIF data including GPS location.
      </p>
    );
  }

  return null;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function WorkflowBuilderClient() {
  const { data: session, status: authStatus } = useSession();

  const isAuthenticated = !!session?.user;
  const isPro =
    (session?.user as { plan?: string } | undefined)?.plan === "pro";
  const fileLimit = resolveFileLimit({ isPro, isAuthenticated, freeCap: MAX_FILES_FREE, proCap: MAX_FILES_PRO });

  // ── Workflow steps ──────────────────────────────────────────────────────────
  const [steps, setSteps] = useState<WorkflowStep[]>(defaultWorkflow);

  // Set of step ids already in the workflow (for palette "once-only" rule)
  const usedIds = new Set(steps.map((s) => s.id));

  // ── Workflow summary (post-processing metrics) ──────────────────────────────
  const [summary, setSummary] = useState<WorkflowSummary | null>(null);

  // ── Upload & processing state ───────────────────────────────────────────────
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  // ── Daily AI usage ──────────────────────────────────────────────────────────
  const [dailyUsage, setDailyUsage] = useState<{
    used: number;
    limit: number;
    remaining: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/usage/images")
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          d: { used: number; limit: number; remaining: number } | null
        ) => {
          if (d) setDailyUsage(d);
        }
      )
      .catch(() => {});
  }, []);

  // ── Pro upsell modal ────────────────────────────────────────────────────────
  const [showProModal, setShowProModal] = useState(false);
  const [proModalTrigger, setProModalTrigger] = useState<
    "batch" | "steps" | "daily"
  >("batch");

  // ── Step palette actions ────────────────────────────────────────────────────

  function addStep(def: StepDef) {
    if (usedIds.has(def.id)) return; // once-only

    if (!isPro && steps.length >= FREE_MAX_STEPS) {
      setProModalTrigger("steps");
      setShowProModal(true);
      return;
    }

    // If adding ai-rename and user is not authenticated, soft-warn but still add
    setSteps((prev) => [...prev, makeStep(def)]);
  }

  function removeStep(uid: string) {
    setSteps((prev) => {
      if (prev.length <= 1) return prev; // keep at least 1
      return prev.filter((s) => s.uid !== uid);
    });
  }

  function moveStep(uid: string, direction: "up" | "down") {
    setSteps((prev) => {
      const idx = prev.findIndex((s) => s.uid === uid);
      if (idx === -1) return prev;
      const next = [...prev];
      const swap = direction === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  }

  function patchStep(uid: string, patch: Partial<WorkflowStep>) {
    setSteps((prev) =>
      prev.map((s) => (s.uid === uid ? { ...s, ...patch } : s))
    );
  }

  // ── Apply recipe ────────────────────────────────────────────────────────────

  function applyRecipe(recipeId: string) {
    const recipe = WORKFLOW_RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return;

    // Build the full step list from the recipe
    const newSteps: WorkflowStep[] = recipe.steps.map((rs) => {
      const def = STEP_PALETTE.find((p) => p.id === rs.id);
      if (!def) return null;
      const base = makeStep(def);
      // Merge recipe settings onto the WorkflowStep defaults
      if (rs.settings) {
        if (rs.settings.quality !== undefined) base.quality = rs.settings.quality;
        if (rs.settings.maxPx !== undefined) base.maxPx = rs.settings.maxPx;
        if (rs.settings.webpQuality !== undefined) base.webpQuality = rs.settings.webpQuality;
        if (rs.settings.locale !== undefined) base.locale = rs.settings.locale;
      }
      return base;
    }).filter((s): s is WorkflowStep => s !== null);

    if (newSteps.length === 0) return;

    // Gate: proOnly recipe, user is free -> load but truncate + show modal
    if (recipe.proOnly && !isPro) {
      const truncated = newSteps.slice(0, FREE_MAX_STEPS);
      setSteps(truncated);
      setProModalTrigger("steps");
      setShowProModal(true);
      return;
    }

    // Free users: non-proOnly recipe with more steps than allowed -> truncate silently
    // (keeps parity with the existing step-limit gate logic)
    if (!isPro && newSteps.length > FREE_MAX_STEPS) {
      setSteps(newSteps.slice(0, FREE_MAX_STEPS));
      setProModalTrigger("steps");
      setShowProModal(true);
      return;
    }

    setSteps(newSteps);
  }

  // ── Gate: enforce step limit on session load ────────────────────────────────
  useEffect(() => {
    if (authStatus === "loading") return;
    if (isPro) return;
    setSteps((prev) => {
      if (prev.length <= FREE_MAX_STEPS) return prev;
      return prev.slice(0, FREE_MAX_STEPS);
    });
  }, [authStatus, isPro]);

  // ── Dropzone ────────────────────────────────────────────────────────────────
  const onDrop = useCallback(
    (accepted: File[]) => {
      setFiles((prev) => {
        const remaining = Math.max(0, fileLimit - prev.length);
        let toAdd = accepted;
        if (accepted.length > remaining) {
          toAdd = accepted.slice(0, remaining);
          setProModalTrigger("batch");
          setShowProModal(true);
        }
        if (toAdd.length === 0) return prev;
        const newFiles: ProcessedFile[] = toAdd.map((f) => ({
          uid: `${f.name}-${Date.now()}-${Math.random()}`,
          originalFile: f,
          resultBlob: null,
          resultName: f.name,
          status: "pending",
          currentStepIdx: -1,
        }));
        return [...prev, ...newFiles];
      });
    },
    [fileLimit]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic", ".heif"] },
    multiple: true,
  });

  // ── Run pipeline ────────────────────────────────────────────────────────────
  const runWorkflow = useCallback(async () => {
    if (processingRef.current) return;
    if (steps.length === 0) return;

    // Enforce step limit server-side: always cap to FREE_MAX_STEPS for free users
    const activeSteps = isPro ? steps : steps.slice(0, FREE_MAX_STEPS);

    const pendingFiles = files.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) return;

    // Check daily limit
    let filesToProcess = pendingFiles;
    if (dailyUsage !== null && dailyUsage.remaining < pendingFiles.length) {
      filesToProcess = pendingFiles.slice(0, Math.max(0, dailyUsage.remaining));
      setProModalTrigger("daily");
      setShowProModal(true);
    }

    processingRef.current = true;
    setIsProcessing(true);
    setSummary(null);

    const engineSteps = toEngineSteps(activeSteps);

    for (const pf of filesToProcess) {
      // Mark processing
      setFiles((prev) =>
        prev.map((f) =>
          f.uid === pf.uid ? { ...f, status: "processing", currentStepIdx: 0 } : f
        )
      );

      try {
        // Animate step progress
        for (let i = 0; i < activeSteps.length; i++) {
          setFiles((prev) =>
            prev.map((f) => (f.uid === pf.uid ? { ...f, currentStepIdx: i } : f))
          );
          await new Promise((r) => setTimeout(r, 250));
        }

        const { runPipeline } = await import("@/lib/pipeline-engine");

        let result: { blob: Blob; name: string } = {
          blob: pf.originalFile,
          name: pf.originalFile.name,
        };

        await runPipeline({
          steps: engineSteps,
          files: [pf.originalFile],
          onFileProgress: () => {},
          onFileComplete: (_idx, r) => {
            result = { blob: r.blob, name: r.name };
          },
          onFileError: (_idx, err) => {
            throw new Error(err);
          },
        });

        setFiles((prev) =>
          prev.map((f) =>
            f.uid === pf.uid
              ? {
                  ...f,
                  status: "done",
                  resultBlob: result.blob,
                  resultName: result.name,
                  currentStepIdx: activeSteps.length,
                }
              : f
          )
        );

        // Increment daily usage
        fetch("/api/usage/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ count: 1 }),
        })
          .then((r) => (r.ok ? r.json() : null))
          .then(
            (
              d: { used: number; limit: number; remaining: number } | null
            ) => {
              if (d) setDailyUsage(d);
            }
          )
          .catch(() => {});
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.uid === pf.uid
              ? {
                  ...f,
                  status: "error",
                  error:
                    err instanceof Error ? err.message : "Processing failed",
                }
              : f
          )
        );
      }
    }

    // Calculate summary from the current files state snapshot
    setFiles((currentFiles) => {
      const doneFiles = currentFiles.filter(
        (f) => f.status === "done" && f.resultBlob !== null
      );
      if (doneFiles.length > 0) {
        const totalBefore = doneFiles.reduce(
          (acc, f) => acc + f.originalFile.size,
          0
        );
        const totalAfter = doneFiles.reduce(
          (acc, f) => acc + (f.resultBlob?.size ?? 0),
          0
        );
        setSummary({
          fileCount: doneFiles.length,
          totalBefore,
          totalAfter,
          hasExifStrip: activeSteps.some((s) => s.id === "exif-strip"),
          hasAiRename: activeSteps.some((s) => s.id === "ai-rename"),
        });
      }
      return currentFiles;
    });

    setIsProcessing(false);
    processingRef.current = false;
  }, [steps, files, dailyUsage, isPro]);

  // ── Download helpers ────────────────────────────────────────────────────────
  function downloadSingle(pf: ProcessedFile) {
    if (!pf.resultBlob) return;
    saveAs(pf.resultBlob, pf.resultName);
  }

  async function downloadAllZip() {
    const done = files.filter((f) => f.status === "done" && f.resultBlob);
    if (done.length === 0) return;
    const zip = new JSZip();
    for (const f of done) {
      zip.file(f.resultName, f.resultBlob!);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "workflow-output.zip");
  }

  // ── Derived state ───────────────────────────────────────────────────────────
  const hasPending = files.some((f) => f.status === "pending");
  const hasDone = files.some((f) => f.status === "done");
  const doneCount = files.filter((f) => f.status === "done").length;
  const hasAiStep = steps.some((s) => s.isAi);
  const needsAuthForAi =
    hasAiStep && !isAuthenticated && authStatus !== "loading";

  // Effective limit for display
  const effectiveStepLimit = isPro ? null : FREE_MAX_STEPS;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5">
      {/* ── Recipe row ────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-medium text-[#A3A3A3] dark:text-[#525252] uppercase tracking-wider mb-2">
          Start from a recipe
        </p>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_RECIPES.map((recipe) => {
            const Icon = recipe.icon;
            const isProLocked = recipe.proOnly && !isPro;
            return (
              <button
                key={recipe.id}
                type="button"
                onClick={() => applyRecipe(recipe.id)}
                title={recipe.description}
                className={[
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium",
                  "transition-all duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/50",
                  isProLocked
                    ? "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#A3A3A3] dark:text-[#525252] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:border-[#6366F1]/40"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1] hover:text-[#6366F1] dark:hover:text-[#6366F1] hover:bg-[#6366F1]/[0.03]",
                ].join(" ")}
                style={{ transition: "border-color 0.15s cubic-bezier(0.32,0.72,0,1), color 0.15s cubic-bezier(0.32,0.72,0,1)" }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                {recipe.label}
                {isProLocked && (
                  <Lock className="h-3 w-3 shrink-0 text-[#F59E0B]" strokeWidth={1.5} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Two-column builder layout ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Step palette */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#1E1E1E] p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Add steps
            </h2>
            {effectiveStepLimit !== null && (
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#525252]">
                Free: {steps.length}/{FREE_MAX_STEPS} steps
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {STEP_PALETTE.map((def) => {
              const alreadyAdded = usedIds.has(def.id);
              const wouldExceedLimit =
                !isPro && steps.length >= FREE_MAX_STEPS && !alreadyAdded;
              const disabled = alreadyAdded;
              return (
                <button
                  key={def.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => addStep(def)}
                  className={[
                    "w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all",
                    "duration-150 group",
                    disabled
                      ? "border-[#E5E5E5] dark:border-[#2A2A2A] opacity-40 cursor-not-allowed bg-[#FAFAFA] dark:bg-[#191919]"
                      : wouldExceedLimit
                      ? "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/40 cursor-pointer"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1] hover:bg-[#6366F1]/[0.03] cursor-pointer",
                  ].join(" ")}
                >
                  <Plus
                    className={[
                      "h-3.5 w-3.5 mt-0.5 shrink-0 transition-colors",
                      disabled
                        ? "text-[#D4D4D4]"
                        : "text-[#A3A3A3] group-hover:text-[#6366F1]",
                    ].join(" ")}
                    strokeWidth={2}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                        {def.label}
                      </span>
                      {def.isAi && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded">
                          <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
                          AI
                        </span>
                      )}
                      {wouldExceedLimit && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded">
                          <Lock className="h-2.5 w-2.5" strokeWidth={1.5} />
                          Pro
                        </span>
                      )}
                      {alreadyAdded && (
                        <span className="text-[9px] text-[#A3A3A3] dark:text-[#525252]">
                          Added
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#A3A3A3] dark:text-[#525252] mt-0.5 leading-relaxed">
                      {def.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workflow list */}
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#1E1E1E] p-4">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Pipeline{" "}
            <span className="font-normal text-[#A3A3A3] dark:text-[#525252]">
              ({steps.length} step{steps.length !== 1 ? "s" : ""})
            </span>
          </h2>

          {steps.length === 0 ? (
            <p className="text-xs text-[#A3A3A3] dark:text-[#525252] py-4 text-center">
              No steps yet. Add steps from the palette.
            </p>
          ) : (
            <div className="space-y-2">
              {steps.map((step, idx) => (
                <div
                  key={step.uid}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-3 bg-[#FAFAFA] dark:bg-[#191919]"
                >
                  {/* Step header row */}
                  <div className="flex items-center gap-2">
                    {/* Drag handle (visual only) */}
                    <GripVertical
                      className="h-3.5 w-3.5 text-[#D4D4D4] dark:text-[#404040] shrink-0"
                      strokeWidth={1.5}
                    />

                    {/* Step number badge */}
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-[10px] font-semibold flex items-center justify-center">
                      {idx + 1}
                    </span>

                    <span className="flex-1 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                      {step.label}
                    </span>

                    {step.isAi && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded shrink-0">
                        <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
                        AI
                      </span>
                    )}

                    {/* Move controls */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveStep(step.uid, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525] text-[#A3A3A3] disabled:opacity-30 transition-colors"
                        aria-label="Move step up"
                      >
                        <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(step.uid, "down")}
                        disabled={idx === steps.length - 1}
                        className="p-1 rounded hover:bg-[#F5F5F5] dark:hover:bg-[#252525] text-[#A3A3A3] disabled:opacity-30 transition-colors"
                        aria-label="Move step down"
                      >
                        <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStep(step.uid)}
                        disabled={steps.length <= 1}
                        className="p-1 rounded hover:bg-[#FEE2E2] dark:hover:bg-[#3F1515] text-[#A3A3A3] hover:text-[#DC2626] disabled:opacity-30 transition-colors"
                        aria-label="Remove step"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Step settings */}
                  <div className="ml-7">
                    <StepSettings
                      step={step}
                      onChange={(patch) => patchStep(step.uid, patch)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reset to defaults */}
          {steps.length > 0 && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSteps(defaultWorkflow())}
                className="text-[10px] text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#737373] transition-colors"
              >
                Reset to defaults
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── AI auth notice ────────────────────────────────────────────────── */}
      {needsAuthForAi && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-5 bg-[#FAFAFA] dark:bg-[#1E1E1E] text-center">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] mb-3">
            <Lock className="h-4 w-4 text-[#737373]" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
            Sign in to use AI Rename
          </h3>
          <p className="text-xs text-[#737373] mb-4 max-w-sm mx-auto">
            AI steps require a free account. Remove the AI Rename step or sign in to continue.
          </p>
          <a
            href="/api/auth/signin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
          >
            Sign in, it&apos;s free
          </a>
        </div>
      )}

      {/* ── Upload panel ──────────────────────────────────────────────────── */}
      <div
        {...getRootProps()}
        className={[
          "border-[1.5px] border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragActive
            ? "border-[#6366F1] bg-[#6366F1]/5"
            : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1A1A1A] hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] hover:border-[#A3A3A3]",
        ].join(" ")}
        style={{ transition: "border-color 0.15s cubic-bezier(0.32,0.72,0,1), background-color 0.15s cubic-bezier(0.32,0.72,0,1)" }}
      >
        <input {...getInputProps()} />
        <Upload className="h-6 w-6 text-[#A3A3A3] mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] mb-1">
          {isDragActive ? "Drop images here" : "Drag and drop images here, or click to browse"}
        </p>
        <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
          JPG, PNG, WebP, GIF, AVIF, HEIC
        </p>
        <p className="text-[11px] text-[#A3A3A3] dark:text-[#525252] mt-2">
          Free: {MAX_FILES_FREE} files per run &middot; Pro: {MAX_FILES_PRO}
          {dailyUsage !== null && (
            <span className="ml-2">
              &middot; Today: {dailyUsage.used}/{dailyUsage.limit} images
            </span>
          )}
        </p>
      </div>

      {/* ── AI daily limit note ───────────────────────────────────────────── */}
      {hasAiStep && isAuthenticated && (
        <p className="text-[11px] text-[#A3A3A3] dark:text-[#525252] text-center">
          AI Rename uses your daily limit ({AI_OPS_FREE_PER_DAY}/day free, unlimited Pro).
        </p>
      )}

      {/* ── Action toolbar ────────────────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#1E1E1E] px-4 py-3 flex items-center gap-3 flex-wrap">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] flex-1 min-w-[120px]">
            {files.length} file{files.length !== 1 ? "s" : ""} queued
            {doneCount > 0 && <span className="text-[#16A34A] ml-1">({doneCount} done)</span>}
          </p>

          {hasPending && (
            <button
              type="button"
              onClick={runWorkflow}
              disabled={isProcessing || needsAuthForAi || steps.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ transition: "background-color 0.15s cubic-bezier(0.32,0.72,0,1)" }}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                  Run workflow
                </>
              )}
            </button>
          )}

          {hasDone && !hasPending && (
            <button
              type="button"
              onClick={downloadAllZip}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download ZIP ({doneCount})
            </button>
          )}

          <button
            type="button"
            onClick={() => { setFiles([]); setSummary(null); }}
            className="text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#737373] transition-colors ml-auto"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Workflow summary ──────────────────────────────────────────────── */}
      {summary !== null && !isProcessing && (
        <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#1E1E1E] px-5 py-4">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#16A34A]/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Workflow complete
            </span>
          </div>

          {/* Metric pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* File count */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <Zap className="h-3 w-3 text-[#6366F1] shrink-0" strokeWidth={2} />
              <span className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3]">
                {summary.fileCount} file{summary.fileCount !== 1 ? "s" : ""} processed
              </span>
            </div>

            {/* Size before -> after */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <Download className="h-3 w-3 text-[#6366F1] shrink-0" strokeWidth={2} />
              <span className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3]">
                {summary.totalBefore < 1024 * 1024
                  ? `${Math.round(summary.totalBefore / 1024)} KB`
                  : `${(summary.totalBefore / (1024 * 1024)).toFixed(1)} MB`}
                {" "}<span className="text-[#D4D4D4]">to</span>{" "}
                {summary.totalAfter < 1024 * 1024
                  ? `${Math.round(summary.totalAfter / 1024)} KB`
                  : `${(summary.totalAfter / (1024 * 1024)).toFixed(1)} MB`}
                {summary.totalAfter < summary.totalBefore && (
                  <span className="text-[#16A34A] ml-1 font-semibold">
                    -{Math.round((1 - summary.totalAfter / summary.totalBefore) * 100)}%
                  </span>
                )}
              </span>
            </div>

            {/* Metadata removed badge */}
            {summary.hasExifStrip && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <FileText className="h-3 w-3 text-[#6366F1] shrink-0" strokeWidth={2} />
                <span className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3]">
                  Metadata removed
                </span>
              </div>
            )}

            {/* SEO filenames badge */}
            {summary.hasAiRename && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                <Tag className="h-3 w-3 text-[#8B5CF6] shrink-0" strokeWidth={2} />
                <span className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3]">
                  SEO filenames
                </span>
              </div>
            )}
          </div>

          {/* Day Pass nudge for free users only */}
          {!isPro && (
            <div className="border-t border-[#F0F0F0] dark:border-[#252525] pt-3 flex items-center justify-between gap-3 flex-wrap">
              <p className="text-[11px] text-[#737373] dark:text-[#737373]">
                Run unlimited files and unlock all 5 pipeline steps with a Day Pass.
              </p>
              <button
                type="button"
                onClick={() => {
                  setProModalTrigger("batch");
                  setShowProModal(true);
                }}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#6366F1]/30 text-[#6366F1] text-[11px] font-medium hover:bg-[#6366F1]/[0.06] transition-colors"
                style={{ transition: "background-color 0.15s cubic-bezier(0.32,0.72,0,1)" }}
              >
                <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                Get Day Pass
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── File list ─────────────────────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((pf) => {
            const activeSteps = isPro ? steps : steps.slice(0, FREE_MAX_STEPS);
            return (
              <div
                key={pf.uid}
                className="flex items-center gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]"
              >
                {/* Status icon */}
                <div className="shrink-0">
                  {pf.status === "done" && (
                    <CheckCircle2
                      className="text-[#16A34A]"
                      style={{ width: 18, height: 18 }}
                      strokeWidth={1.5}
                    />
                  )}
                  {pf.status === "processing" && (
                    <Loader2
                      className="text-[#6366F1] animate-spin"
                      style={{ width: 18, height: 18 }}
                      strokeWidth={1.5}
                    />
                  )}
                  {pf.status === "pending" && (
                    <Circle
                      className="text-[#D4D4D4]"
                      style={{ width: 18, height: 18 }}
                      strokeWidth={1.5}
                    />
                  )}
                  {pf.status === "error" && (
                    <AlertCircle
                      className="text-[#DC2626]"
                      style={{ width: 18, height: 18 }}
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                    {pf.status === "done" ? pf.resultName : pf.originalFile.name}
                  </p>

                  {pf.status === "done" && pf.resultBlob && (
                    <p className="text-[11px] text-[#A3A3A3] mt-0.5">
                      {(pf.originalFile.size / 1024).toFixed(0)} KB{" "}
                      <span className="text-[#D4D4D4]">-&gt;</span>{" "}
                      {(pf.resultBlob.size / 1024).toFixed(0)} KB
                      {pf.resultBlob.size < pf.originalFile.size && (
                        <span className="text-[#16A34A] font-medium ml-1">
                          -{Math.round((1 - pf.resultBlob.size / pf.originalFile.size) * 100)}%
                        </span>
                      )}
                    </p>
                  )}

                  {pf.status === "processing" && pf.currentStepIdx >= 0 && (
                    <>
                      <div className="flex items-center gap-1 mt-1">
                        {activeSteps.map((s, i) => (
                          <div
                            key={s.uid}
                            className={[
                              "h-1 flex-1 rounded-full transition-colors",
                              i <= pf.currentStepIdx
                                ? "bg-[#6366F1]"
                                : "bg-[#E5E5E5] dark:bg-[#2A2A2A]",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                      {pf.currentStepIdx < activeSteps.length && (
                        <p className="text-[11px] text-[#737373] mt-0.5">
                          {activeSteps[pf.currentStepIdx]?.label}...
                        </p>
                      )}
                    </>
                  )}

                  {pf.status === "error" && (
                    <p className="text-[11px] text-[#DC2626] mt-0.5">{pf.error}</p>
                  )}
                </div>

                {/* Per-file download */}
                {pf.status === "done" && pf.resultBlob && (
                  <button
                    type="button"
                    onClick={() => downloadSingle(pf)}
                    className="shrink-0 p-1.5 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                    aria-label={`Download ${pf.resultName}`}
                  >
                    <Download className="h-4 w-4 text-[#525252] dark:text-[#A3A3A3]" strokeWidth={1.5} />
                  </button>
                )}

                {/* Remove pending file */}
                {pf.status === "pending" && (
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((f) => f.uid !== pf.uid))
                    }
                    className="shrink-0 p-1.5 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] text-[#A3A3A3] hover:text-[#525252] transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pro upsell modal */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger={proModalTrigger}
        filesDropped={files.length}
        freeLimit={proModalTrigger === "batch" ? MAX_FILES_FREE : undefined}
      />
    </div>
  );
}

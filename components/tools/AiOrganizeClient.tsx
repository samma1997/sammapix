"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useSession, signIn } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import NextStepSuggestions from "@/components/tools/NextStepSuggestions";
import {
  Upload,
  Download,
  Lock,
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronRight,
  Trash2,
  AlertCircle,
  FolderOpen,
  Copy,
  Pencil,
  Check,
  X,
  Eye,
  Search,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FileEntry {
  id: string;
  file: File;
  name: string;
  thumbnailUrl: string;
  category: string | null;
  confidence: number | null;
  aiSuggestedName: string | null;
  isDuplicate: boolean;
  duplicateGroupId: string | null;
  pHash: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

interface AnalysisResult {
  category: string;
  confidence: number;
  suggestedName: string;
}

interface AiUsage {
  used: number;
  remaining: number;
  limit: number;
}

interface ImageUsage {
  used: number;
  remaining: number;
  limit: number;
  plan: string;
}

type ToolPhase = "upload" | "processing" | "results";

const CATEGORY_LABELS: Record<string, string> = {
  nature: "Nature",
  people: "People",
  food: "Food",
  architecture: "Architecture",
  animals: "Animals",
  products: "Products",
  events: "Events",
  travel: "Travel",
  screenshots: "Screenshots",
  documents: "Documents",
  art: "Art",
  other: "Other",
};

const CATEGORY_COLORS: Record<string, string> = {
  nature: "#22C55E",
  people: "#3B82F6",
  food: "#F59E0B",
  architecture: "#8B5CF6",
  animals: "#EC4899",
  products: "#06B6D4",
  events: "#F97316",
  travel: "#14B8A6",
  screenshots: "#6366F1",
  documents: "#737373",
  art: "#E11D48",
  other: "#A3A3A3",
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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Stub: compute perceptual hash for duplicate detection.
 * TODO: reuse pHash logic from TwinHunt (DCT-based).
 */
async function computePHash(_file: File): Promise<string> {
  // Placeholder — returns a random hash for now.
  // Will be replaced with actual DCT-based pHash from TwinHunt.
  const buffer = await _file.arrayBuffer();
  const view = new Uint8Array(buffer.slice(0, 64));
  let hash = "";
  for (let i = 0; i < 8; i++) {
    hash += (view[i % view.length] ?? 0).toString(16).padStart(2, "0");
  }
  return hash;
}

/**
 * Stub: call AI to analyze a photo (categorize + generate SEO name).
 * TODO: Call /api/ai/organize endpoint with Gemini Flash.
 */
async function analyzePhotoWithAI(
  base64: string,
  mimeType: string,
  originalName: string
): Promise<AnalysisResult> {
  // TODO: Replace with actual API call
  // const res = await fetch("/api/ai/organize", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ imageBase64: base64, mimeType, originalName }),
  // });
  // const data = await res.json();
  // return data;

  // For now, simulate with categorize endpoint
  const res = await fetch("/api/ai/categorize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: base64, mimeType }),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(errorData.error ?? `HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    data: { category: string; confidence: number };
    remaining?: number;
  };

  // Map SmartSort categories to AI Organize categories
  const categoryMap: Record<string, string> = {
    landscape: "nature",
    portrait: "people",
    food: "food",
    architecture: "architecture",
    screenshot: "screenshots",
    document: "documents",
    product: "products",
    animal: "animals",
    art: "art",
    other: "other",
  };

  const mappedCategory = categoryMap[data.data.category] ?? data.data.category;

  // Generate a SEO-friendly name from the category + original filename
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "jpg";
  const baseName = originalName
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 40);
  const suggestedName = `${mappedCategory}-${baseName}-optimized.${ext}`;

  return {
    category: mappedCategory,
    confidence: data.data.confidence,
    suggestedName,
  };
}

/**
 * Find duplicate groups based on pHash similarity.
 * TODO: Implement proper Hamming distance comparison.
 */
function findDuplicateGroups(
  files: FileEntry[]
): Map<string, string[]> {
  // Placeholder: group files with identical pHash values.
  // In production, use Hamming distance <= 10.
  const hashToIds = new Map<string, string[]>();
  for (const f of files) {
    if (!f.pHash) continue;
    const existing = hashToIds.get(f.pHash) ?? [];
    existing.push(f.id);
    hashToIds.set(f.pHash, existing);
  }
  // Only keep groups with 2+ files (actual duplicates)
  const groups = new Map<string, string[]>();
  for (const [hash, ids] of hashToIds) {
    if (ids.length >= 2) {
      groups.set(hash, ids);
    }
  }
  return groups;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function AiOrganizeClient() {
  const { data: session, status: authStatus } = useSession();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [phase, setPhase] = useState<ToolPhase>("upload");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [downloading, setDownloading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [aiUsage, setAiUsage] = useState<AiUsage | null>(null);
  const [imageUsage, setImageUsage] = useState<ImageUsage | null>(null);
  const [showDupesOnly, setShowDupesOnly] = useState(false);
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const abortRef = useRef(false);

  const isAuthenticated = authStatus === "authenticated" && !!session?.user;
  const isPro = (session?.user as { plan?: string } | undefined)?.plan === "pro";

  // Fetch AI usage on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchUsage() {
      try {
        const [aiRes, imgRes] = await Promise.all([
          fetch("/api/ai/usage"),
          fetch("/api/usage/images"),
        ]);
        if (aiRes.ok) {
          const data = (await aiRes.json()) as AiUsage;
          setAiUsage(data);
        }
        if (imgRes.ok) {
          const data = (await imgRes.json()) as ImageUsage;
          setImageUsage(data);
        }
      } catch {
        // Silent
      }
    }

    void fetchUsage();
  }, [isAuthenticated]);

  // File drop handler
  const onDrop = useCallback(async (accepted: File[]) => {
    const entries: FileEntry[] = await Promise.all(
      accepted.map(async (f) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
        file: f,
        name: f.name,
        thumbnailUrl: await createThumbnailUrl(f),
        category: null,
        confidence: null,
        aiSuggestedName: null,
        isDuplicate: false,
        duplicateGroupId: null,
        pHash: null,
        status: "pending" as const,
      }))
    );
    setFiles((prev) => [...prev, ...entries]);
    setLimitError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: true,
  });

  // ─── Main Analysis Pipeline ─────────────────────────────────────────────

  async function handleAnalyze() {
    if (files.length === 0) return;
    setLimitError(null);
    setPhase("processing");
    abortRef.current = false;

    // Pre-check limits
    let currentAiRemaining = aiUsage?.remaining ?? Infinity;
    let currentImgRemaining = imageUsage?.remaining ?? Infinity;

    try {
      const [aiRes, imgRes] = await Promise.all([
        fetch("/api/ai/usage"),
        fetch("/api/usage/images"),
      ]);
      if (aiRes.ok) {
        const data = (await aiRes.json()) as AiUsage;
        setAiUsage(data);
        currentAiRemaining = data.remaining;
      }
      if (imgRes.ok) {
        const data = (await imgRes.json()) as ImageUsage;
        setImageUsage(data);
        currentImgRemaining = data.remaining;
      }
    } catch {
      // Continue with stale values
    }

    if (currentAiRemaining <= 0) {
      setLimitError(
        "You've used all your AI operations for today. Upgrade to Pro for 500/day."
      );
      setPhase("upload");
      return;
    }

    const pendingFiles = files.filter((f) => f.status !== "done");
    const processable = Math.min(
      pendingFiles.length,
      currentAiRemaining,
      currentImgRemaining
    );

    if (processable <= 0) {
      setLimitError("No files to process within your remaining daily limits.");
      setPhase("upload");
      return;
    }

    const filesToProcess = new Set(
      pendingFiles.slice(0, processable).map((f) => f.id)
    );

    setProgress({ done: 0, total: processable });

    // Step 1: Compute perceptual hashes for duplicate detection (client-side)
    for (const entry of files) {
      if (abortRef.current) break;
      if (!filesToProcess.has(entry.id)) continue;
      try {
        const hash = await computePHash(entry.file);
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, pHash: hash } : f))
        );
      } catch {
        // Non-critical — continue without hash
      }
    }

    // Step 2: AI categorization + SEO naming
    for (let i = 0; i < files.length; i++) {
      if (abortRef.current) break;
      const entry = files[i];

      if (entry.status === "done" || !filesToProcess.has(entry.id)) continue;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === entry.id ? { ...f, status: "processing" } : f
        )
      );

      try {
        const base64 = await fileToBase64(entry.file);
        const mimeType = entry.file.type || "image/jpeg";

        const result = await analyzePhotoWithAI(base64, mimeType, entry.name);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? {
                  ...f,
                  category: result.category,
                  confidence: result.confidence,
                  aiSuggestedName: result.suggestedName,
                  status: "done",
                }
              : f
          )
        );

        // Track image usage
        try {
          const imgTrackRes = await fetch("/api/usage/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count: 1 }),
          });
          if (imgTrackRes.ok) {
            const imgData = (await imgTrackRes.json()) as ImageUsage;
            setImageUsage(imgData);
          } else if (imgTrackRes.status === 429) {
            const imgErr = (await imgTrackRes.json().catch(() => ({}))) as {
              error?: string;
            };
            setLimitError(
              imgErr.error ??
                "Daily image limit reached. Upgrade to Pro for unlimited."
            );
            abortRef.current = true;
          }
        } catch {
          // Non-blocking
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";

        // Stop on rate limit
        if (msg.includes("limit") || msg.includes("429")) {
          setLimitError(msg);
          abortRef.current = true;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id
                ? { ...f, status: "error", error: "Daily AI limit reached" }
                : f
            )
          );
          break;
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id ? { ...f, status: "error", error: msg } : f
          )
        );
      }

      setProgress((p) => ({ ...p, done: p.done + 1 }));
    }

    // Step 3: Mark duplicates
    setFiles((prev) => {
      const groups = findDuplicateGroups(prev);
      let updated = [...prev];
      for (const [groupId, ids] of groups) {
        for (const id of ids) {
          updated = updated.map((f) =>
            f.id === id
              ? { ...f, isDuplicate: true, duplicateGroupId: groupId }
              : f
          );
        }
      }
      return updated;
    });

    setPhase("results");
  }

  // ─── Computed values ────────────────────────────────────────────────────

  const sortedFiles = files.filter((f) => f.status === "done");
  const hasResults = sortedFiles.length > 0;
  const duplicateCount = files.filter((f) => f.isDuplicate).length;

  const categorized = useMemo(() => {
    return sortedFiles.reduce<Record<string, FileEntry[]>>((acc, f) => {
      const cat = f.category ?? "other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(f);
      return acc;
    }, {});
  }, [sortedFiles]);

  const categoryList = useMemo(() => {
    return Object.entries(categorized)
      .sort(([, a], [, b]) => b.length - a.length)
      .map(([cat, items]) => ({ category: cat, count: items.length }));
  }, [categorized]);

  // Photos to show in main grid (filtered by category + search + dupes toggle)
  const visiblePhotos = useMemo(() => {
    let filtered = sortedFiles;
    if (selectedCategory) {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }
    if (showDupesOnly) {
      filtered = filtered.filter((f) => f.isDuplicate);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.aiSuggestedName?.toLowerCase().includes(q) ?? false) ||
          (f.category?.toLowerCase().includes(q) ?? false)
      );
    }
    return filtered;
  }, [sortedFiles, selectedCategory, showDupesOnly, searchQuery]);

  // ─── Actions ────────────────────────────────────────────────────────────

  function removeDuplicates() {
    setFiles((prev) => prev.filter((f) => !f.isDuplicate));
  }

  function applyAiNames() {
    setFiles((prev) =>
      prev.map((f) =>
        f.aiSuggestedName ? { ...f, name: f.aiSuggestedName } : f
      )
    );
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function startEditName(id: string, currentName: string) {
    setEditingNameId(id);
    setEditNameValue(currentName);
  }

  function saveEditName(id: string) {
    if (editNameValue.trim()) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, aiSuggestedName: editNameValue.trim() } : f
        )
      );
    }
    setEditingNameId(null);
    setEditNameValue("");
  }

  function cancelEditName() {
    setEditingNameId(null);
    setEditNameValue("");
  }

  async function downloadAsZip() {
    if (!hasResults) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      for (const f of sortedFiles) {
        if (f.isDuplicate && showDupesOnly) continue; // skip removed dupes
        const folder = CATEGORY_LABELS[f.category ?? "other"] ?? f.category ?? "Other";
        const fileName = f.aiSuggestedName ?? f.name;
        zip.file(`${folder}/${fileName}`, f.file);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "ai-organize-photos.zip");
    } finally {
      setDownloading(false);
    }
  }

  async function downloadCategory(category: string) {
    const catFiles = categorized[category];
    if (!catFiles || catFiles.length === 0) return;

    if (catFiles.length === 1) {
      const url = URL.createObjectURL(catFiles[0].file);
      const a = document.createElement("a");
      a.href = url;
      a.download = catFiles[0].aiSuggestedName ?? catFiles[0].name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const zip = new JSZip();
    for (const f of catFiles) {
      zip.file(f.aiSuggestedName ?? f.name, f.file);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `ai-organize-${category}.zip`);
  }

  function clearAll() {
    setFiles([]);
    setPhase("upload");
    setProgress({ done: 0, total: 0 });
    setLimitError(null);
    setSelectedCategory(null);
    setShowDupesOnly(false);
    setSearchQuery("");
    setPreviewId(null);
  }

  // ─── Auth gate ──────────────────────────────────────────────────────────

  if (authStatus === "loading") {
    return (
      <section className="py-10 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-3xl mx-auto flex justify-center">
          <Loader2
            className="h-5 w-5 animate-spin text-[#A3A3A3]"
            strokeWidth={1.5}
          />
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
            Sign in to use AI Organize
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            AI Organize uses Gemini AI to categorize, dedupe, and rename your
            photos. Sign in for free to get started.
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

  // ─── Upload Phase ───────────────────────────────────────────────────────

  if (phase === "upload") {
    return (
      <>
        <section className="py-6 px-4 sm:px-6 bg-white dark:bg-[#191919]">
          <div className="max-w-3xl mx-auto space-y-5">
            {/* DropZone */}
            {files.length === 0 ? (
              <div
                {...getRootProps()}
                className={`
                  relative flex flex-col items-center justify-center gap-3 p-12
                  border-[1.5px] border-dashed rounded-lg cursor-pointer transition-all
                  ${
                    isDragActive
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                      : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                  <FolderOpen
                    className="h-6 w-6 text-[#8B5CF6]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3]">
                    {isDragActive
                      ? "Drop photos here"
                      : "Drop photos or click to browse"}
                  </p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
                    JPG, PNG, WebP, GIF, AVIF, HEIC.{" "}
                    {isPro
                      ? "Up to 500 photos (Pro)."
                      : "Up to 50 photos (free) · 500 (Pro)."}
                  </p>
                </div>
                {/* Feature badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {[
                    { icon: Sparkles, label: "AI Categorize" },
                    { icon: Copy, label: "Find Dupes" },
                    { icon: Pencil, label: "SEO Rename" },
                  ].map((badge) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide
                                 bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3]
                                 border border-[#E5E5E5] dark:border-[#333] rounded"
                    >
                      <badge.icon className="h-3 w-3" strokeWidth={1.5} />
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Files loaded — controls + preview */}
                <div className="flex items-center justify-between">
                  <div
                    {...getRootProps()}
                    className="cursor-pointer text-xs text-[#8B5CF6] hover:underline"
                  >
                    <input {...getInputProps()} />
                    + Add more photos
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#A3A3A3]">
                      {files.length} photo{files.length !== 1 ? "s" : ""}
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

                {/* Thumbnail preview grid */}
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                  {files.slice(0, 40).map((f) => (
                    <div
                      key={f.id}
                      className="aspect-square rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.thumbnailUrl}
                        alt={f.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {files.length > 40 && (
                    <div className="aspect-square rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-center">
                      <span className="text-xs text-[#737373] font-medium">
                        +{files.length - 40}
                      </span>
                    </div>
                  )}
                </div>

                {/* AI usage info */}
                {!isPro && aiUsage !== null && (
                  <div className="flex items-center justify-between text-xs text-[#A3A3A3] dark:text-[#525252]">
                    <span>
                      AI:{" "}
                      <span
                        className={
                          aiUsage.remaining === 0
                            ? "text-[#DC2626] font-medium"
                            : aiUsage.remaining <= 3
                            ? "text-[#D97706] font-medium"
                            : "text-[#525252] dark:text-[#A3A3A3]"
                        }
                      >
                        {aiUsage.used}/{aiUsage.limit} used today
                      </span>
                      {aiUsage.remaining > 0 && (
                        <span className="ml-1 text-[#A3A3A3]">
                          ({aiUsage.remaining} remaining)
                        </span>
                      )}
                    </span>
                    {aiUsage.remaining === 0 && (
                      <a
                        href="/dashboard/upgrade"
                        className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                      >
                        Upgrade to Pro
                      </a>
                    )}
                  </div>
                )}

                {/* Limit error */}
                {limitError && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D]">
                    <AlertCircle
                      className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">
                        {limitError}
                      </p>
                      {!isPro && (
                        <a
                          href="/dashboard/upgrade"
                          className="text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-0.5 inline-block"
                        >
                          Upgrade to Pro
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Analyze button */}
                <button
                  onClick={handleAnalyze}
                  disabled={
                    files.length === 0 ||
                    (aiUsage?.remaining === 0 && !isPro)
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-3
                             bg-[#8B5CF6] text-white
                             text-sm font-medium rounded-md
                             hover:bg-[#7C3AED]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  Organize with AI
                </button>
              </>
            )}
          </div>
        </section>

        {/* Next step suggestions */}
        <section className="px-4 sm:px-6 pb-2">
          <div className="max-w-3xl mx-auto">
            <NextStepSuggestions currentTool="ai-organize" />
          </div>
        </section>
      </>
    );
  }

  // ─── Processing Phase ───────────────────────────────────────────────────

  if (phase === "processing") {
    const pct =
      progress.total > 0
        ? Math.round((progress.done / progress.total) * 100)
        : 0;

    return (
      <section className="py-10 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
            <Loader2
              className="h-7 w-7 animate-spin text-[#8B5CF6]"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              Analyzing photos...
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Categorizing, finding duplicates, and generating SEO names.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full h-2">
              <div
                className="bg-[#8B5CF6] h-2 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-[#A3A3A3]">
              {progress.done} / {progress.total} photos analyzed ({pct}%)
            </p>
          </div>

          {/* Live category preview */}
          {sortedFiles.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {Object.entries(categorized).map(([cat, items]) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium uppercase tracking-wide rounded
                             border border-[#E5E5E5] dark:border-[#333]"
                  style={{
                    backgroundColor: `${CATEGORY_COLORS[cat] ?? "#A3A3A3"}10`,
                    color: CATEGORY_COLORS[cat] ?? "#A3A3A3",
                  }}
                >
                  {CATEGORY_LABELS[cat] ?? cat} ({items.length})
                </span>
              ))}
            </div>
          )}

          {/* Limit error during processing */}
          {limitError && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D] text-left">
              <AlertCircle
                className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0"
                strokeWidth={1.5}
              />
              <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">
                {limitError}
              </p>
            </div>
          )}

          <button
            onClick={() => {
              abortRef.current = true;
              setPhase("results");
            }}
            className="text-xs text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
          >
            Stop and view results
          </button>
        </div>
      </section>
    );
  }

  // ─── Results Phase ──────────────────────────────────────────────────────

  const previewFile = previewId
    ? files.find((f) => f.id === previewId) ?? null
    : null;

  return (
    <>
      <section className="py-6 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Stats bar */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-4 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="flex items-center gap-1">
                <FolderOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                {Object.keys(categorized).length} categories
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                {sortedFiles.length} analyzed
              </span>
              {duplicateCount > 0 && (
                <span className="flex items-center gap-1 text-[#D97706]">
                  <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {duplicateCount} dupes
                </span>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-[#DC2626] transition-colors"
              >
                <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                Clear
              </button>
            </div>
          </div>

          {/* Layout: sidebar + grid */}
          <div className="flex gap-5 flex-col lg:flex-row">
            {/* ── Categories sidebar ─────────────────────────────────── */}
            <div className="lg:w-56 shrink-0 space-y-2">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A3A3A3]"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-md
                             border border-[#E5E5E5] dark:border-[#333]
                             bg-white dark:bg-[#1E1E1E]
                             text-[#171717] dark:text-[#E5E5E5]
                             placeholder:text-[#A3A3A3]
                             focus:outline-none focus:border-[#8B5CF6]
                             transition-colors"
                />
              </div>

              {/* All photos button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setShowDupesOnly(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors
                  ${
                    !selectedCategory && !showDupesOnly
                      ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30"
                      : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] border border-transparent"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                  All Photos
                </span>
                <span className="text-[10px]">{sortedFiles.length}</span>
              </button>

              {/* Category list */}
              {categoryList.map(({ category, count }) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowDupesOnly(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors
                    ${
                      selectedCategory === category
                        ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30"
                        : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] border border-transparent"
                    }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          CATEGORY_COLORS[category] ?? "#A3A3A3",
                      }}
                    />
                    {CATEGORY_LABELS[category] ?? category}
                  </span>
                  <span className="text-[10px]">{count}</span>
                </button>
              ))}

              {/* Duplicates filter */}
              {duplicateCount > 0 && (
                <button
                  onClick={() => {
                    setShowDupesOnly(true);
                    setSelectedCategory(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors
                    ${
                      showDupesOnly
                        ? "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30"
                        : "text-[#D97706] hover:bg-[#D97706]/5 border border-transparent"
                    }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Duplicates
                  </span>
                  <span className="text-[10px]">{duplicateCount}</span>
                </button>
              )}

              {/* Divider */}
              <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] my-2" />

              {/* Action buttons */}
              {duplicateCount > 0 && (
                <button
                  onClick={removeDuplicates}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2
                             text-xs font-medium text-[#DC2626]
                             border border-[#FECACA] dark:border-[#7F1D1D]
                             rounded-md hover:bg-[#FEF2F2] dark:hover:bg-[#2A1515]
                             transition-colors"
                >
                  <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                  Remove {duplicateCount} Dupes
                </button>
              )}

              <button
                onClick={applyAiNames}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2
                           text-xs font-medium text-[#8B5CF6]
                           border border-[#8B5CF6]/30
                           rounded-md hover:bg-[#8B5CF6]/5
                           transition-colors"
              >
                <Pencil className="h-3 w-3" strokeWidth={1.5} />
                Apply AI Names
              </button>

              <button
                onClick={downloadAsZip}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5
                           text-xs font-medium text-white
                           bg-[#8B5CF6] hover:bg-[#7C3AED]
                           rounded-md disabled:opacity-50
                           transition-colors"
              >
                {downloading ? (
                  <Loader2
                    className="h-3 w-3 animate-spin"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Download className="h-3 w-3" strokeWidth={1.5} />
                )}
                {downloading ? "Preparing..." : "Download ZIP"}
              </button>
            </div>

            {/* ── Photo grid ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Selected category header */}
              {selectedCategory && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          CATEGORY_COLORS[selectedCategory] ?? "#A3A3A3",
                      }}
                    />
                    <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {CATEGORY_LABELS[selectedCategory] ?? selectedCategory}
                    </h3>
                    <span className="text-xs text-[#A3A3A3]">
                      {categorized[selectedCategory]?.length ?? 0} photos
                    </span>
                  </div>
                  <button
                    onClick={() => downloadCategory(selectedCategory)}
                    className="flex items-center gap-1 text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                  >
                    <Download className="h-3 w-3" strokeWidth={1.5} />
                    Download folder
                  </button>
                </div>
              )}

              {showDupesOnly && (
                <div className="flex items-center gap-2 mb-3">
                  <Copy
                    className="h-4 w-4 text-[#D97706]"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    Suspected Duplicates
                  </h3>
                  <span className="text-xs text-[#A3A3A3]">
                    {duplicateCount} photos
                  </span>
                </div>
              )}

              {visiblePhotos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search
                    className="h-8 w-8 text-[#D4D4D4] mb-3"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-[#737373]">
                    No photos match your filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {visiblePhotos.map((f) => (
                    <div
                      key={f.id}
                      className={`group relative border rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E] transition-shadow hover:shadow-md
                        ${
                          f.isDuplicate
                            ? "border-[#D97706]/40"
                            : "border-[#E5E5E5] dark:border-[#2A2A2A]"
                        }`}
                    >
                      {/* Thumbnail */}
                      <div
                        className="aspect-square relative cursor-pointer"
                        onClick={() => setPreviewId(f.id)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={f.thumbnailUrl}
                          alt={f.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Category badge */}
                        <span
                          className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide rounded
                                     text-white shadow-sm"
                          style={{
                            backgroundColor:
                              CATEGORY_COLORS[f.category ?? "other"] ??
                              "#A3A3A3",
                          }}
                        >
                          {CATEGORY_LABELS[f.category ?? "other"] ??
                            f.category}
                        </span>
                        {/* Duplicate indicator */}
                        {f.isDuplicate && (
                          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide rounded bg-[#D97706] text-white shadow-sm">
                            Dupe
                          </span>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-2.5 space-y-1.5">
                        {/* Original filename */}
                        <p
                          className="text-[10px] text-[#A3A3A3] truncate"
                          title={f.name}
                        >
                          {f.name}
                        </p>

                        {/* AI suggested name */}
                        {editingNameId === f.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editNameValue}
                              onChange={(e) =>
                                setEditNameValue(e.target.value)
                              }
                              className="flex-1 text-[11px] px-1.5 py-1 rounded border border-[#8B5CF6]
                                         bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5]
                                         focus:outline-none"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEditName(f.id);
                                if (e.key === "Escape") cancelEditName();
                              }}
                            />
                            <button
                              onClick={() => saveEditName(f.id)}
                              className="p-0.5 text-[#22C55E] hover:text-[#16A34A]"
                            >
                              <Check className="h-3 w-3" strokeWidth={2} />
                            </button>
                            <button
                              onClick={cancelEditName}
                              className="p-0.5 text-[#DC2626] hover:text-[#B91C1C]"
                            >
                              <X className="h-3 w-3" strokeWidth={2} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-start gap-1">
                            <p
                              className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate flex-1"
                              title={f.aiSuggestedName ?? ""}
                            >
                              {f.aiSuggestedName ?? "—"}
                            </p>
                            <button
                              onClick={() =>
                                startEditName(
                                  f.id,
                                  f.aiSuggestedName ?? f.name
                                )
                              }
                              className="p-0.5 text-[#A3A3A3] hover:text-[#8B5CF6] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Pencil className="h-3 w-3" strokeWidth={1.5} />
                            </button>
                          </div>
                        )}

                        {/* File size */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#A3A3A3]">
                            {formatFileSize(f.file.size)}
                          </span>
                          <button
                            onClick={() => removeFile(f.id)}
                            className="p-0.5 text-[#A3A3A3] hover:text-[#DC2626] opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error summary */}
          {files.some((f) => f.status === "error") && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D]">
              <AlertCircle
                className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0"
                strokeWidth={1.5}
              />
              <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">
                {files.filter((f) => f.status === "error").length} photo(s)
                failed to analyze.
                {files.find((f) => f.status === "error")?.error && (
                  <span className="ml-1 text-[#A3A3A3]">
                    ({files.find((f) => f.status === "error")!.error})
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Limit error */}
          {limitError && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D]">
              <AlertCircle
                className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0"
                strokeWidth={1.5}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">
                  {limitError}
                </p>
                {!isPro && (
                  <a
                    href="/dashboard/upgrade"
                    className="text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-0.5 inline-block"
                  >
                    Upgrade to Pro
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo preview modal */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setPreviewId(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[80vh] bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewId(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-black/40 hover:bg-black/60 text-white transition-colors"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewFile.thumbnailUrl}
              alt={previewFile.name}
              className="w-full max-h-[60vh] object-contain bg-[#F5F5F5] dark:bg-[#111]"
            />
            <div className="p-4 space-y-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded text-white"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[previewFile.category ?? "other"] ??
                      "#A3A3A3",
                  }}
                >
                  {CATEGORY_LABELS[previewFile.category ?? "other"] ??
                    previewFile.category}
                </span>
                {previewFile.isDuplicate && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded bg-[#D97706] text-white">
                    Duplicate
                  </span>
                )}
                {previewFile.confidence !== null && (
                  <span className="text-[10px] text-[#A3A3A3]">
                    {Math.round(previewFile.confidence * 100)}% confidence
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A3A3A3]">
                Original: {previewFile.name}
              </p>
              {previewFile.aiSuggestedName && (
                <p className="text-xs text-[#171717] dark:text-[#E5E5E5] font-medium">
                  AI Name: {previewFile.aiSuggestedName}
                </p>
              )}
              <p className="text-xs text-[#A3A3A3]">
                {formatFileSize(previewFile.file.size)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next step suggestions */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="ai-organize" />
        </div>
      </section>
    </>
  );
}

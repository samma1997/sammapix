"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useSession, signIn } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });
import {
  Download,
  Lock,
  Sparkles,
  Loader2,
  Trash2,
  AlertCircle,
  FolderOpen,
  Copy,
  Pencil,
  Check,
  X,
  Eye,
  Search,
  FileText,
  FileSpreadsheet,
  Film,
  Music,
  Code,
  Image as ImageIcon,
  Presentation,
  Play,
} from "lucide-react";
import {
  ACCEPTED_TYPES,
  KIND_BADGE_COLORS,
  KIND_LABELS,
  buildFilePreview,
  computeFingerprint,
  analyzeFileWithAI,
} from "@/lib/file-preview";
import type { FileKind } from "@/lib/file-preview";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FileEntry {
  id: string;
  file: File;
  name: string;
  kind: FileKind;
  extension: string;
  thumbnailUrl: string | null;
  textPreview: string | null;
  category: string | null;
  confidence: number | null;
  aiSuggestedName: string | null;
  isDuplicate: boolean;
  duplicateGroupId: string | null;
  fingerprint: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
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

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function buildFileEntry(file: File): Promise<FileEntry> {
  const preview = await buildFilePreview(file);
  return {
    id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
    file,
    name: file.name,
    kind: preview.kind,
    extension: preview.extension,
    thumbnailUrl: preview.thumbnailUrl,
    textPreview: preview.textPreview,
    category: null,
    confidence: null,
    aiSuggestedName: null,
    isDuplicate: false,
    duplicateGroupId: null,
    fingerprint: null,
    status: "pending",
  };
}

function findDuplicateGroups(files: FileEntry[]): Map<string, string[]> {
  const hashToIds = new Map<string, string[]>();
  for (const f of files) {
    if (!f.fingerprint) continue;
    const existing = hashToIds.get(f.fingerprint) ?? [];
    existing.push(f.id);
    hashToIds.set(f.fingerprint, existing);
  }
  const groups = new Map<string, string[]>();
  for (const [hash, ids] of hashToIds) {
    if (ids.length >= 2) {
      groups.set(hash, ids);
    }
  }
  return groups;
}

// ─── File Kind Icon Component ───────────────────────────────────────────────

function FileKindIcon({ kind, className }: { kind: FileKind; className?: string }) {
  const props = { className: className ?? "h-4 w-4", strokeWidth: 1.5 };
  switch (kind) {
    case "image": return <ImageIcon {...props} />;
    case "document": return <FileText {...props} />;
    case "video": return <Film {...props} />;
    case "audio": return <Music {...props} />;
    case "text": return <FileText {...props} />;
    case "code": return <Code {...props} />;
    case "spreadsheet": return <FileSpreadsheet {...props} />;
    case "presentation": return <Presentation {...props} />;
  }
}

// ─── File Preview Thumbnail ─────────────────────────────────────────────────

function FilePreviewThumbnail({
  entry,
  size = "normal",
}: {
  entry: FileEntry;
  size?: "small" | "normal";
}) {
  const isSmall = size === "small";

  if (entry.kind === "image" && entry.thumbnailUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={entry.thumbnailUrl} alt={entry.name} className="w-full h-full object-cover" />
    );
  }

  if (entry.kind === "video" && entry.thumbnailUrl) {
    return (
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.thumbnailUrl} alt={entry.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
            <Play className="h-4 w-4 text-white ml-0.5" strokeWidth={2} />
          </div>
        </div>
      </div>
    );
  }

  if (entry.kind === "document" && entry.extension === ".pdf" && entry.thumbnailUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={entry.thumbnailUrl} alt={entry.name} className="w-full h-full object-contain bg-white dark:bg-[#252525]" />
    );
  }

  if ((entry.kind === "text" || entry.kind === "code") && entry.textPreview) {
    const lines = entry.textPreview.split("\n").slice(0, isSmall ? 2 : 4);
    return (
      <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] p-2 overflow-hidden">
        <pre className="text-[8px] leading-[1.4] text-[#525252] dark:text-[#A3A3A3] font-mono whitespace-pre-wrap break-all">
          {lines.join("\n")}
        </pre>
      </div>
    );
  }

  if (entry.textPreview && (entry.kind === "document" || entry.kind === "spreadsheet" || entry.kind === "presentation")) {
    const preview = entry.textPreview.slice(0, isSmall ? 80 : 200);
    return (
      <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] p-2 flex flex-col items-center justify-center gap-1.5">
        <FileKindIcon kind={entry.kind} className="h-5 w-5 text-[#A3A3A3]" />
        <p className="text-[8px] leading-[1.3] text-[#737373] dark:text-[#A3A3A3] text-center line-clamp-3 px-1">
          {preview}
        </p>
      </div>
    );
  }

  if (entry.kind === "audio") {
    return (
      <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] flex flex-col items-center justify-center gap-1.5">
        <Music className="h-6 w-6 text-[#F97316]" strokeWidth={1.5} />
        <span className="text-[9px] text-[#A3A3A3] font-medium uppercase">
          {entry.extension.replace(".", "")}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] flex flex-col items-center justify-center gap-1.5">
      <FileKindIcon kind={entry.kind} className="h-6 w-6 text-[#A3A3A3]" />
      <span className="text-[9px] text-[#A3A3A3] font-medium uppercase">
        {entry.extension.replace(".", "")}
      </span>
    </div>
  );
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
        if (aiRes.ok) setAiUsage((await aiRes.json()) as AiUsage);
        if (imgRes.ok) setImageUsage((await imgRes.json()) as ImageUsage);
      } catch {
        // Silent
      }
    }
    void fetchUsage();
  }, [isAuthenticated]);

  // File drop handler
  const onDrop = useCallback(async (accepted: File[]) => {
    const entries = await Promise.all(accepted.map(buildFileEntry));
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
      setLimitError("You've used all your AI credits for today. Upgrade to Pro for 500/day.");
      setPhase("upload");
      return;
    }

    const pendingFiles = files.filter((f) => f.status !== "done");
    const processable = Math.min(pendingFiles.length, currentAiRemaining, currentImgRemaining);

    if (processable <= 0) {
      setLimitError("No files to process within your remaining daily limits.");
      setPhase("upload");
      return;
    }

    const filesToProcess = new Set(pendingFiles.slice(0, processable).map((f) => f.id));
    setProgress({ done: 0, total: processable });

    // Step 1: Compute fingerprints for duplicate detection
    for (const entry of files) {
      if (abortRef.current) break;
      if (!filesToProcess.has(entry.id)) continue;
      try {
        const fp = await computeFingerprint(entry.file, entry.kind, entry.textPreview);
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, fingerprint: fp } : f))
        );
      } catch {
        // Non-critical
      }
    }

    // Step 2: AI categorization + naming
    for (let i = 0; i < files.length; i++) {
      if (abortRef.current) break;
      const entry = files[i];
      if (entry.status === "done" || !filesToProcess.has(entry.id)) continue;

      setFiles((prev) =>
        prev.map((f) => (f.id === entry.id ? { ...f, status: "processing" } : f))
      );

      try {
        const result = await analyzeFileWithAI(
          entry.file,
          entry.kind,
          entry.extension,
          entry.thumbnailUrl,
          entry.textPreview,
          entry.name
        );

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

        // Track usage
        try {
          const imgTrackRes = await fetch("/api/usage/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count: 1 }),
          });
          if (imgTrackRes.ok) {
            setImageUsage((await imgTrackRes.json()) as ImageUsage);
          } else if (imgTrackRes.status === 429) {
            const imgErr = (await imgTrackRes.json().catch(() => ({}))) as { error?: string };
            setLimitError(imgErr.error ?? "Daily limit reached. Upgrade to Pro for unlimited.");
            abortRef.current = true;
          }
        } catch {
          // Non-blocking
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        if (msg.includes("limit") || msg.includes("429")) {
          setLimitError(msg);
          abortRef.current = true;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id ? { ...f, status: "error", error: "Daily AI limit reached" } : f
            )
          );
          break;
        }
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, status: "error", error: msg } : f))
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
            f.id === id ? { ...f, isDuplicate: true, duplicateGroupId: groupId } : f
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
      const cat = f.category ?? "Other";
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

  const kindCounts = useMemo(() => {
    const counts: Partial<Record<FileKind, number>> = {};
    for (const f of files) {
      counts[f.kind] = (counts[f.kind] ?? 0) + 1;
    }
    return counts;
  }, [files]);

  const visibleFiles = useMemo(() => {
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
          (f.category?.toLowerCase().includes(q) ?? false) ||
          f.kind.toLowerCase().includes(q) ||
          f.extension.toLowerCase().includes(q)
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
      prev.map((f) => (f.aiSuggestedName ? { ...f, name: f.aiSuggestedName } : f))
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
        prev.map((f) => (f.id === id ? { ...f, aiSuggestedName: editNameValue.trim() } : f))
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
        if (f.isDuplicate && showDupesOnly) continue;
        const folder = f.category ?? "Other";
        zip.file(`${folder}/${f.aiSuggestedName ?? f.name}`, f.file);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "ai-organize-files.zip");
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
    saveAs(blob, `ai-organize-${category.toLowerCase().replace(/\s+/g, "-")}.zip`);
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
            Sign in to use AI Organize
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            AI Organize uses Gemini AI to categorize, dedupe, and rename your files. Sign in for free to get started.
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
            {files.length === 0 ? (
              <div
                {...getRootProps()}
                className={`
                  relative flex flex-col items-center justify-center gap-3 p-12
                  border-[1.5px] border-dashed rounded-lg cursor-pointer transition-all
                  ${isDragActive
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                    : "border-[#D4D4D4] dark:border-[#404040] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-[#8B5CF6]" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3]">
                    {isDragActive ? "Drop files here" : "Drop any files \u2014 photos, PDFs, documents, videos"}
                  </p>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-1">
                    Images, PDFs, Word, Excel, PowerPoint, text, code, video, audio.{" "}
                    {isPro ? "Up to 500 files (Pro)." : "Up to 50 files (free) \u2014 500 (Pro)."}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {[
                    { icon: Sparkles, label: "AI Categorize" },
                    { icon: Copy, label: "Find Dupes" },
                    { icon: Pencil, label: "Smart Rename" },
                  ].map((badge) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-[#F5F5F5] dark:bg-[#252525] text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#333] rounded"
                    >
                      <badge.icon className="h-3 w-3" strokeWidth={1.5} />
                      {badge.label}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                  {([
                    { kind: "image" as FileKind, label: "Images" },
                    { kind: "document" as FileKind, label: "PDFs & Docs" },
                    { kind: "spreadsheet" as FileKind, label: "Spreadsheets" },
                    { kind: "video" as FileKind, label: "Videos" },
                    { kind: "audio" as FileKind, label: "Audio" },
                    { kind: "code" as FileKind, label: "Code" },
                  ]).map(({ kind, label }) => (
                    <span
                      key={kind}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium rounded"
                      style={{
                        backgroundColor: `${KIND_BADGE_COLORS[kind]}10`,
                        color: KIND_BADGE_COLORS[kind],
                      }}
                    >
                      <FileKindIcon kind={kind} className="h-2.5 w-2.5" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div {...getRootProps()} className="cursor-pointer text-xs text-[#8B5CF6] hover:underline">
                    <input {...getInputProps()} />
                    + Add more files
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {Object.entries(kindCounts).map(([kind, count]) => (
                        <span
                          key={kind}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-medium rounded"
                          style={{
                            backgroundColor: `${KIND_BADGE_COLORS[kind as FileKind]}10`,
                            color: KIND_BADGE_COLORS[kind as FileKind],
                          }}
                        >
                          <FileKindIcon kind={kind as FileKind} className="h-2.5 w-2.5" />
                          {count}
                        </span>
                      ))}
                    </div>
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

                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                  {files.slice(0, 40).map((f) => (
                    <div
                      key={f.id}
                      className="aspect-square rounded overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] relative"
                      title={f.name}
                    >
                      <FilePreviewThumbnail entry={f} size="small" />
                      <span
                        className="absolute bottom-0.5 right-0.5 px-1 py-0.5 text-[7px] font-semibold uppercase rounded text-white"
                        style={{ backgroundColor: KIND_BADGE_COLORS[f.kind] }}
                      >
                        {f.extension.replace(".", "")}
                      </span>
                    </div>
                  ))}
                  {files.length > 40 && (
                    <div className="aspect-square rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E] flex items-center justify-center">
                      <span className="text-xs text-[#737373] font-medium">+{files.length - 40}</span>
                    </div>
                  )}
                </div>

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
                        <span className="ml-1 text-[#A3A3A3]">({aiUsage.remaining} remaining)</span>
                      )}
                    </span>
                    {aiUsage.remaining === 0 && (
                      <a href="/dashboard/upgrade" className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                        Upgrade to Pro
                      </a>
                    )}
                  </div>
                )}

                {limitError && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D]">
                    <AlertCircle className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">{limitError}</p>
                      {!isPro && (
                        <a href="/dashboard/upgrade" className="text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-0.5 inline-block">
                          Upgrade to Pro
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={files.length === 0 || (aiUsage?.remaining === 0 && !isPro)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8B5CF6] text-white text-sm font-medium rounded-md hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  Organize with AI
                </button>
              </>
            )}
          </div>
        </section>

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
    const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

    return (
      <section className="py-10 px-4 sm:px-6 bg-white dark:bg-[#191919]">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#8B5CF6]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
              Analyzing files...
            </h2>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Categorizing, finding duplicates, and generating smart names.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full h-2">
              <div
                className="bg-[#8B5CF6] h-2 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-[#A3A3A3]">
              {progress.done} / {progress.total} files analyzed ({pct}%)
            </p>
          </div>

          {sortedFiles.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {Object.entries(categorized).map(([cat, items]) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium tracking-wide rounded border border-[#E5E5E5] dark:border-[#333] bg-[#8B5CF6]/5 text-[#8B5CF6]"
                >
                  {cat} ({items.length})
                </span>
              ))}
            </div>
          )}

          {limitError && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D] text-left">
              <AlertCircle className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">{limitError}</p>
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

  const previewFile = previewId ? files.find((f) => f.id === previewId) ?? null : null;

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
            <div className="flex items-center gap-1.5">
              {Object.entries(kindCounts).map(([kind, count]) => (
                <span
                  key={kind}
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-medium rounded"
                  style={{
                    backgroundColor: `${KIND_BADGE_COLORS[kind as FileKind]}10`,
                    color: KIND_BADGE_COLORS[kind as FileKind],
                  }}
                >
                  <FileKindIcon kind={kind as FileKind} className="h-2.5 w-2.5" />
                  {count}
                </span>
              ))}
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
            {/* Sidebar */}
            <div className="lg:w-56 shrink-0 space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A3A3A3]" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                />
              </div>

              <button
                onClick={() => { setSelectedCategory(null); setShowDupesOnly(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  !selectedCategory && !showDupesOnly
                    ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30"
                    : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] border border-transparent"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                  All Files
                </span>
                <span className="text-[10px]">{sortedFiles.length}</span>
              </button>

              {categoryList.map(({ category, count }) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setShowDupesOnly(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30"
                      : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0 bg-[#8B5CF6]" />
                    <span className="truncate">{category}</span>
                  </span>
                  <span className="text-[10px] shrink-0 ml-1">{count}</span>
                </button>
              ))}

              {duplicateCount > 0 && (
                <button
                  onClick={() => { setShowDupesOnly(true); setSelectedCategory(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
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

              <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] my-2" />

              {duplicateCount > 0 && (
                <button
                  onClick={removeDuplicates}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#DC2626] border border-[#FECACA] dark:border-[#7F1D1D] rounded-md hover:bg-[#FEF2F2] dark:hover:bg-[#2A1515] transition-colors"
                >
                  <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                  Remove {duplicateCount} Dupes
                </button>
              )}

              <button
                onClick={applyAiNames}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-md hover:bg-[#8B5CF6]/5 transition-colors"
              >
                <Pencil className="h-3 w-3" strokeWidth={1.5} />
                Apply AI Names
              </button>

              <button
                onClick={downloadAsZip}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-md disabled:opacity-50 transition-colors"
              >
                {downloading ? (
                  <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Download className="h-3 w-3" strokeWidth={1.5} />
                )}
                {downloading ? "Preparing..." : "Download ZIP"}
              </button>
            </div>

            {/* File grid */}
            <div className="flex-1 min-w-0">
              {selectedCategory && (
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                    <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{selectedCategory}</h3>
                    <span className="text-xs text-[#A3A3A3]">{categorized[selectedCategory]?.length ?? 0} files</span>
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
                  <Copy className="h-4 w-4 text-[#D97706]" strokeWidth={1.5} />
                  <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Suspected Duplicates</h3>
                  <span className="text-xs text-[#A3A3A3]">{duplicateCount} files</span>
                </div>
              )}

              {visibleFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="h-8 w-8 text-[#D4D4D4] mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-[#737373]">No files match your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {visibleFiles.map((f) => (
                    <div
                      key={f.id}
                      className={`group relative border rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E] transition-shadow hover:shadow-md ${
                        f.isDuplicate ? "border-[#D97706]/40" : "border-[#E5E5E5] dark:border-[#2A2A2A]"
                      }`}
                    >
                      <div className="aspect-square relative cursor-pointer overflow-hidden" onClick={() => setPreviewId(f.id)}>
                        <FilePreviewThumbnail entry={f} />
                        {f.category && (
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide rounded text-white shadow-sm bg-[#8B5CF6]">
                            {f.category}
                          </span>
                        )}
                        <span
                          className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-0.5 px-1 py-0.5 text-[8px] font-semibold uppercase rounded text-white"
                          style={{ backgroundColor: KIND_BADGE_COLORS[f.kind] }}
                        >
                          <FileKindIcon kind={f.kind} className="h-2.5 w-2.5" />
                          {f.extension.replace(".", "")}
                        </span>
                        {f.isDuplicate && (
                          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide rounded bg-[#D97706] text-white shadow-sm">
                            Dupe
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="p-2.5 space-y-1.5">
                        <p className="text-[10px] text-[#A3A3A3] truncate" title={f.name}>{f.name}</p>

                        {editingNameId === f.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editNameValue}
                              onChange={(e) => setEditNameValue(e.target.value)}
                              className="flex-1 text-[11px] px-1.5 py-1 rounded border border-[#8B5CF6] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] focus:outline-none"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEditName(f.id);
                                if (e.key === "Escape") cancelEditName();
                              }}
                            />
                            <button onClick={() => saveEditName(f.id)} className="p-0.5 text-[#22C55E] hover:text-[#16A34A]">
                              <Check className="h-3 w-3" strokeWidth={2} />
                            </button>
                            <button onClick={cancelEditName} className="p-0.5 text-[#DC2626] hover:text-[#B91C1C]">
                              <X className="h-3 w-3" strokeWidth={2} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-start gap-1">
                            <p className="text-[11px] font-medium text-[#171717] dark:text-[#E5E5E5] truncate flex-1" title={f.aiSuggestedName ?? ""}>
                              {f.aiSuggestedName ?? "\u2014"}
                            </p>
                            <button
                              onClick={() => startEditName(f.id, f.aiSuggestedName ?? f.name)}
                              className="p-0.5 text-[#A3A3A3] hover:text-[#8B5CF6] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Pencil className="h-3 w-3" strokeWidth={1.5} />
                            </button>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#A3A3A3]">{formatFileSize(f.file.size)}</span>
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

          {files.some((f) => f.status === "error") && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D]">
              <AlertCircle className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">
                {files.filter((f) => f.status === "error").length} file(s) failed to analyze.
                {files.find((f) => f.status === "error")?.error && (
                  <span className="ml-1 text-[#A3A3A3]">({files.find((f) => f.status === "error")!.error})</span>
                )}
              </p>
            </div>
          )}

          {limitError && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-[#FEF2F2] dark:bg-[#2A1515] border border-[#FECACA] dark:border-[#7F1D1D]">
              <AlertCircle className="h-4 w-4 text-[#DC2626] mt-0.5 shrink-0" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#DC2626] dark:text-[#FCA5A5]">{limitError}</p>
                {!isPro && (
                  <a href="/dashboard/upgrade" className="text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mt-0.5 inline-block">
                    Upgrade to Pro
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Preview modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setPreviewId(null)}>
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

            <div className="w-full max-h-[60vh] overflow-auto bg-[#F5F5F5] dark:bg-[#111]">
              {previewFile.kind === "image" && previewFile.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewFile.thumbnailUrl} alt={previewFile.name} className="w-full max-h-[60vh] object-contain" />
              ) : previewFile.kind === "video" && previewFile.thumbnailUrl ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewFile.thumbnailUrl} alt={previewFile.name} className="w-full max-h-[60vh] object-contain" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              ) : previewFile.kind === "document" && previewFile.extension === ".pdf" && previewFile.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewFile.thumbnailUrl} alt={previewFile.name} className="w-full max-h-[60vh] object-contain" />
              ) : (previewFile.kind === "text" || previewFile.kind === "code") && previewFile.textPreview ? (
                <pre className="p-4 text-xs text-[#525252] dark:text-[#A3A3A3] font-mono whitespace-pre-wrap break-all max-h-[60vh] overflow-auto">
                  {previewFile.textPreview}
                </pre>
              ) : previewFile.textPreview ? (
                <div className="p-6 flex flex-col items-center gap-4">
                  <FileKindIcon kind={previewFile.kind} className="h-12 w-12 text-[#A3A3A3]" />
                  <p className="text-sm text-[#525252] dark:text-[#A3A3A3] text-center max-w-md whitespace-pre-wrap">
                    {previewFile.textPreview.slice(0, 500)}
                  </p>
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center gap-3">
                  <FileKindIcon kind={previewFile.kind} className="h-16 w-16 text-[#D4D4D4]" />
                  <span className="text-sm text-[#A3A3A3] uppercase font-medium">{previewFile.extension.replace(".", "")} file</span>
                </div>
              )}
            </div>

            <div className="p-4 space-y-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 flex-wrap">
                {previewFile.category && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded text-white bg-[#8B5CF6]">
                    {previewFile.category}
                  </span>
                )}
                <span
                  className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded text-white"
                  style={{ backgroundColor: KIND_BADGE_COLORS[previewFile.kind] }}
                >
                  <FileKindIcon kind={previewFile.kind} className="h-2.5 w-2.5" />
                  {KIND_LABELS[previewFile.kind]}
                </span>
                {previewFile.isDuplicate && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded bg-[#D97706] text-white">
                    Duplicate
                  </span>
                )}
                {previewFile.confidence !== null && (
                  <span className="text-[10px] text-[#A3A3A3]">{Math.round(previewFile.confidence * 100)}% confidence</span>
                )}
              </div>
              <p className="text-xs text-[#A3A3A3]">Original: {previewFile.name}</p>
              {previewFile.aiSuggestedName && (
                <p className="text-xs text-[#171717] dark:text-[#E5E5E5] font-medium">AI Name: {previewFile.aiSuggestedName}</p>
              )}
              <p className="text-xs text-[#A3A3A3]">{formatFileSize(previewFile.file.size)}</p>
            </div>
          </div>
        </div>
      )}

      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="ai-organize" />
        </div>
      </section>
    </>
  );
}

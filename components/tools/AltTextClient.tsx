"use client";

import React, { useState, useCallback, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { Copy, Download, Sparkles, AlertCircle, CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { AI_OPS_FREE_PER_DAY, AI_OPS_PRO_PER_DAY } from "@/lib/constants";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AltTextItem {
  id: string;
  file: File;
  thumbnailUrl: string;
  altText: string;
  status: "idle" | "processing" | "done" | "error";
  error?: string;
  edited: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

async function fileToBase64Thumbnail(file: File): Promise<{ base64: string; mimeType: string; thumbnailUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 512;
      const ratio = Math.min(MAX / img.naturalWidth, MAX / img.naturalHeight, 1);
      canvas.width = Math.round(img.naturalWidth * ratio);
      canvas.height = Math.round(img.naturalHeight * ratio);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.85);
      const base64 = thumbnailUrl.split(",")[1];
      URL.revokeObjectURL(objectUrl);
      resolve({ base64, mimeType: "image/jpeg", thumbnailUrl });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

function downloadCSV(items: AltTextItem[]) {
  const done = items.filter((i) => i.status === "done");
  const rows = [["filename", "alt_text"], ...done.map((i) => [i.file.name, i.altText])];
  const csv = rows.map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "alt-texts.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJSON(items: AltTextItem[]) {
  const done = items.filter((i) => i.status === "done");
  const data = done.map((i) => ({ filename: i.file.name, altText: i.altText }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "alt-texts.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AltTextClient() {
  const { data: session } = useSession();
  const [items, setItems] = useState<AltTextItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = Boolean(session?.user?.email);

  // ── File handling ──────────────────────────────────────────────────────────

  const addFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((f) => f.type.startsWith("image/"));
      if (!imageFiles.length) return;

      const newItems: AltTextItem[] = await Promise.all(
        imageFiles.map(async (file) => {
          let thumbnailUrl = "";
          try {
            const result = await fileToBase64Thumbnail(file);
            thumbnailUrl = result.thumbnailUrl;
          } catch {
            thumbnailUrl = "";
          }
          return {
            id: generateId(),
            file,
            thumbnailUrl,
            altText: "",
            status: "idle" as const,
            edited: false,
          };
        })
      );

      setItems((prev) => [...prev, ...newItems]);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      addFiles(files);
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      addFiles(files);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [addFiles]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // ── AI processing ──────────────────────────────────────────────────────────

  const processItem = useCallback(
    async (item: AltTextItem) => {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "processing" } : i))
      );

      try {
        const { base64, mimeType } = await fileToBase64Thumbnail(item.file);

        const res = await fetch("/api/ai/alt-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType,
            filename: item.file.name,
          }),
        });

        const data = (await res.json()) as {
          data?: { altText: string };
          remaining?: number;
          error?: string;
          code?: string;
        };

        if (!res.ok) {
          const errorMsg =
            data.code === "DAILY_LIMIT_REACHED"
              ? "Daily limit reached. Upgrade to Pro for 200/day."
              : data.error ?? "Processing failed";
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, status: "error", error: errorMsg } : i))
          );
          return;
        }

        if (data.remaining !== undefined) setRemaining(data.remaining);

        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "done", altText: data.data?.altText ?? "", edited: false }
              : i
          )
        );
      } catch {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: "error", error: "Network error" } : i
          )
        );
      }
    },
    []
  );

  const processAll = useCallback(async () => {
    const idle = items.filter((i) => i.status === "idle" || i.status === "error");
    for (const item of idle) {
      await processItem(item);
    }
  }, [items, processItem]);

  // ── Clipboard ──────────────────────────────────────────────────────────────

  const copyAll = useCallback(async () => {
    const done = items.filter((i) => i.status === "done");
    const text = done.map((i) => `${i.file.name}: ${i.altText}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }, [items]);

  const copySingle = useCallback(async (altText: string) => {
    await navigator.clipboard.writeText(altText);
  }, []);

  // ── Update alt text ────────────────────────────────────────────────────────

  const updateAltText = useCallback((id: string, value: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, altText: value, edited: true } : i))
    );
  }, []);

  // ── Derived state ──────────────────────────────────────────────────────────

  const doneCount = items.filter((i) => i.status === "done").length;
  const processingCount = items.filter((i) => i.status === "processing").length;
  const idleCount = items.filter((i) => i.status === "idle").length;
  const hasItems = items.length > 0;
  const canProcess = isLoggedIn && (idleCount > 0 || items.some((i) => i.status === "error"));

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

      {/* Auth gate */}
      {!isLoggedIn && (
        <div className="border border-[#C7D2FE] bg-[#EEF2FF]/40 rounded-md p-4 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-[#6366F1] mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Sign in to use AI Alt Text Generator
            </p>
            <p className="text-xs text-[#737373] mb-3">
              Free accounts get {AI_OPS_FREE_PER_DAY} AI ops per day. No credit card required.
            </p>
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
            >
              Sign in- it&apos;s free
            </button>
          </div>
        </div>
      )}

      {/* Rate limit indicator */}
      {isLoggedIn && remaining !== null && (
        <div className="flex items-center gap-2 text-xs text-[#737373]">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded text-[#525252] dark:text-[#A3A3A3]">
            <Sparkles className="h-3 w-3" strokeWidth={1.5} />
            {remaining} remaining today
          </span>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[#6366F1] bg-[#EEF2FF]/20"
            : "border-dashed border-[#D4D4D4] dark:border-[#3A3A3A] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#A3A3A3]"
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload images for alt text generation"
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
            <Upload className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              Drop images here or click to upload
            </p>
            <p className="text-xs text-[#737373] mt-0.5">
              JPG, PNG, WebP, GIF- multiple files supported
            </p>
          </div>
        </div>
      </div>

      {/* Actions bar */}
      {hasItems && (
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            {canProcess && (
              <button
                onClick={processAll}
                disabled={processingCount > 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processingCount > 0 ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Generate All Alt Texts
                  </>
                )}
              </button>
            )}
          </div>
          {doneCount > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={copyAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                {copiedAll ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={1.5} />
                ) : (
                  <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                )}
                {copiedAll ? "Copied!" : "Copy All"}
              </button>
              <button
                onClick={() => downloadCSV(items)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                CSV
              </button>
              <button
                onClick={() => downloadJSON(items)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                JSON
              </button>
            </div>
          )}
        </div>
      )}

      {/* Items list */}
      {hasItems && (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden"
            >
              <div className="flex gap-3 p-3">
                {/* Thumbnail */}
                <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A]">
                  {item.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnailUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A3A3A3]">
                      <Upload className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] truncate max-w-[200px]">
                      {item.file.name}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 p-0.5 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Status / alt text area */}
                  {item.status === "idle" && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#A3A3A3]">Ready to process</span>
                      {isLoggedIn && (
                        <button
                          onClick={() => processItem(item)}
                          className="text-xs text-[#6366F1] hover:underline"
                        >
                          Generate
                        </button>
                      )}
                    </div>
                  )}

                  {item.status === "processing" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                      <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                      Generating alt text...
                    </div>
                  )}

                  {item.status === "error" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#DC2626]">
                      <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                      <span>{item.error}</span>
                    </div>
                  )}

                  {item.status === "done" && (
                    <div className="space-y-1.5">
                      <textarea
                        value={item.altText}
                        onChange={(e) => updateAltText(item.id, e.target.value)}
                        rows={2}
                        className="w-full text-xs text-[#171717] dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded px-2 py-1.5 resize-none focus:outline-none focus:border-[#6366F1] transition-colors"
                        aria-label={`Alt text for ${item.file.name}`}
                      />
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] ${item.altText.length > 125 ? "text-[#D97706]" : "text-[#A3A3A3]"}`}>
                          {item.altText.length} chars
                          {item.edited && " · edited"}
                        </span>
                        <button
                          onClick={() => copySingle(item.altText)}
                          className="inline-flex items-center gap-1 text-[10px] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
                        >
                          <Copy className="h-3 w-3" strokeWidth={1.5} />
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PRO badge note */}
      {isLoggedIn && (
        <p className="text-xs text-[#A3A3A3] text-center">
          Free: {AI_OPS_FREE_PER_DAY} AI ops/day &middot;{" "}
          <a href="/dashboard/upgrade" className="text-[#6366F1] hover:underline">
            Pro
          </a>{" "}
          unlocks {AI_OPS_PRO_PER_DAY}/day
        </p>
      )}
    </div>
  );
}

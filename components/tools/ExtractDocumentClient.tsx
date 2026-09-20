"use client";

import React, { useState, useCallback, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import {
  Copy,
  Download,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Upload,
  X,
  FileText,
} from "lucide-react";
import { AI_OPS_FREE_PER_DAY, AI_OPS_PRO_PER_DAY } from "@/lib/constants";
import dynamic from "next/dynamic";

const ProUpsellModal = dynamic(() => import("@/components/ui/ProUpsellModal"), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────

interface LineItem {
  description: string | null;
  quantity: number | null;
  unitPrice: number | null;
  amount: number | null;
}

interface ExtractedData {
  documentType: string | null;
  vendor: string | null;
  date: string | null;
  currency: string | null;
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  lineItems: LineItem[];
  summary: string | null;
}

interface DocItem {
  id: string;
  file: File;
  status: "idle" | "processing" | "done" | "error";
  data?: ExtractedData;
  error?: string;
  copied: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "application/pdf",
] as const;
type AcceptedMime = (typeof ACCEPTED_MIME_TYPES)[number];

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip "data:...;base64," prefix
      const base64 = result.split(",")[1];
      if (!base64) return reject(new Error("Failed to encode file"));
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function getAcceptedMime(file: File): AcceptedMime | null {
  if (ACCEPTED_MIME_TYPES.includes(file.type as AcceptedMime)) {
    return file.type as AcceptedMime;
  }
  // Fallback by extension for PDF
  if (file.name.toLowerCase().endsWith(".pdf")) return "application/pdf";
  return null;
}

function formatCurrency(value: number | null, currency: string | null): string {
  if (value === null) return "—";
  const symbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  return `${symbol}${value.toFixed(2)}`;
}

function downloadCSV(data: ExtractedData, filename: string) {
  const items = data.lineItems ?? [];
  const rows = [
    ["description", "quantity", "unit_price", "amount"],
    ...items.map((i) => [
      i.description ?? "",
      String(i.quantity ?? ""),
      String(i.unitPrice ?? ""),
      String(i.amount ?? ""),
    ]),
  ];
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.replace(/\.[^/.]+$/, "") + "-extracted.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ExtractDocumentClient() {
  const { data: session } = useSession();
  const [items, setItems] = useState<DocItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellTrigger, setUpsellTrigger] = useState<"success" | "daily">("success");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = Boolean(session?.user?.email);

  // ── File handling ──────────────────────────────────────────────────────────

  const addFiles = useCallback((files: File[]) => {
    const valid = files.filter((f) => getAcceptedMime(f) !== null);
    if (!valid.length) return;

    const oversized = valid.filter((f) => f.size > MAX_FILE_SIZE);
    const withinLimit = valid.filter((f) => f.size <= MAX_FILE_SIZE);

    if (oversized.length > 0) {
      const names = oversized
        .map((f) => f.name)
        .slice(0, 3)
        .join(", ");
      const more = oversized.length > 3 ? ` +${oversized.length - 3} more` : "";
      setSizeWarning(
        `${oversized.length} file${oversized.length !== 1 ? "s" : ""} skipped — over 20 MB limit: ${names}${more}`
      );
    } else {
      setSizeWarning(null);
    }

    if (withinLimit.length === 0) return;

    const newItems: DocItem[] = withinLimit.map((file) => ({
      id: generateId(),
      file,
      status: "idle",
      copied: false,
    }));

    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(Array.from(e.dataTransfer.files));
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(Array.from(e.target.files ?? []));
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [addFiles]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // ── AI processing ──────────────────────────────────────────────────────────

  const processItem = useCallback(async (item: DocItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "processing" } : i))
    );

    try {
      const mimeType = getAcceptedMime(item.file);
      if (!mimeType) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: "error", error: "Unsupported file type" } : i
          )
        );
        return;
      }

      const fileBase64 = await fileToBase64(item.file);

      const res = await fetch("/api/ai/extract-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileBase64, mimeType, filename: item.file.name }),
      });

      const resData = (await res.json()) as {
        data?: ExtractedData;
        remaining?: number;
        error?: string;
        code?: string;
        buyCreditsUrl?: string;
      };

      if (!res.ok) {
        if (resData.code === "RATE_LIMITED") {
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, status: "error", error: "Daily limit reached. Upgrade for more." }
                : i
            )
          );
          setUpsellTrigger("daily");
          setShowUpsell(true);
          return;
        }
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "error", error: resData.error ?? "Processing failed" }
              : i
          )
        );
        return;
      }

      if (resData.remaining !== undefined) setRemaining(resData.remaining);

      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: "done", data: resData.data } : i
        )
      );

      // Success upsell (simple frequency cap: once per session)
      setUpsellTrigger("success");
      setShowUpsell(true);
    } catch {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: "error", error: "Network error" } : i
        )
      );
    }
  }, []);

  const processAll = useCallback(async () => {
    const pending = items.filter((i) => i.status === "idle" || i.status === "error");
    for (const item of pending) {
      await processItem(item);
    }
  }, [items, processItem]);

  // ── Copy JSON ──────────────────────────────────────────────────────────────

  const copyJson = useCallback(async (item: DocItem) => {
    if (!item.data) return;
    await navigator.clipboard.writeText(JSON.stringify(item.data, null, 2));
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, copied: true } : i))
    );
    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, copied: false } : i))
      );
    }, 2000);
  }, []);

  // ── Derived state ──────────────────────────────────────────────────────────

  const doneCount = items.filter((i) => i.status === "done").length;
  const processingCount = items.filter((i) => i.status === "processing").length;
  const idleCount = items.filter((i) => i.status === "idle").length;
  const hasItems = items.length > 0;
  const canProcess =
    isLoggedIn && (idleCount > 0 || items.some((i) => i.status === "error"));

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {/* Auth gate */}
      {!isLoggedIn && (
        <div className="border border-[#C7D2FE] bg-[#EEF2FF]/40 rounded-md p-4 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-[#6366F1] mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
              Sign in to use AI Document Extractor
            </p>
            <p className="text-xs text-[#737373] mb-3">
              Free accounts get {AI_OPS_FREE_PER_DAY} AI credits per day. No credit card required.
            </p>
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#171717] text-white rounded-md hover:bg-[#262626] transition-colors"
            >
              Sign in — it&apos;s free
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
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
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
        aria-label="Upload document for data extraction"
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          multiple
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] flex items-center justify-center">
            <Upload className="h-5 w-5 text-[#A3A3A3]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
              Drop receipts, invoices, or PDFs here
            </p>
            <p className="text-xs text-[#737373] mt-0.5">
              JPG, PNG, WebP, PDF &mdash; multiple files supported &middot; max 20 MB each
            </p>
          </div>
        </div>
      </div>

      {/* Size warning banner */}
      {sizeWarning && (
        <div className="flex items-start justify-between gap-3 px-4 py-3 border border-[#FDE68A] bg-[#FFFBEB] dark:bg-[#1C1700] dark:border-[#854D0E] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#B45309] dark:text-[#D97706]">{sizeWarning}</p>
          </div>
          <button
            onClick={() => setSizeWarning(null)}
            className="shrink-0 text-[#D97706] hover:text-[#92400E] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

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
                    Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Extract All
                  </>
                )}
              </button>
            )}
          </div>
          {doneCount > 0 && (
            <span className="text-xs text-[#A3A3A3]">
              {doneCount} document{doneCount !== 1 ? "s" : ""} extracted
            </span>
          )}
        </div>
      )}

      {/* Items list */}
      {hasItems && (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] overflow-hidden"
            >
              {/* File header */}
              <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-3.5 w-3.5 text-[#A3A3A3] shrink-0" strokeWidth={1.5} />
                  <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] truncate">
                    {item.file.name}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.status === "idle" && isLoggedIn && (
                    <button
                      onClick={() => processItem(item)}
                      className="text-xs text-[#6366F1] hover:underline"
                    >
                      Extract
                    </button>
                  )}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-0.5 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Status / result */}
              <div className="p-3">
                {item.status === "idle" && (
                  <p className="text-xs text-[#A3A3A3]">Ready to extract</p>
                )}

                {item.status === "processing" && (
                  <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                    <Loader2 className="h-3 w-3 animate-spin" strokeWidth={1.5} />
                    Analyzing document...
                  </div>
                )}

                {item.status === "error" && (
                  <div className="flex items-center gap-1.5 text-xs text-[#DC2626]">
                    <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                    <span>{item.error}</span>
                  </div>
                )}

                {item.status === "done" && item.data && (
                  <ExtractedResult
                    data={item.data}
                    filename={item.file.name}
                    copied={item.copied}
                    onCopyJson={() => copyJson(item)}
                    onDownloadCsv={() => downloadCSV(item.data!, item.file.name)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PRO badge note */}
      {isLoggedIn && (
        <p className="text-xs text-[#A3A3A3] text-center">
          Free: {AI_OPS_FREE_PER_DAY} AI credits/day &middot;{" "}
          <a href="/dashboard/upgrade" className="text-[#6366F1] hover:underline">
            Pro
          </a>{" "}
          unlocks {AI_OPS_PRO_PER_DAY}/day
        </p>
      )}

      {/* Upsell modal */}
      <ProUpsellModal
        open={showUpsell}
        trigger={upsellTrigger}
        onClose={() => setShowUpsell(false)}
      />
    </div>
  );
}

// ── Extracted result card ─────────────────────────────────────────────────────

interface ExtractedResultProps {
  data: ExtractedData;
  filename: string;
  copied: boolean;
  onCopyJson: () => void;
  onDownloadCsv: () => void;
}

function ExtractedResult({
  data,
  filename,
  copied,
  onCopyJson,
  onDownloadCsv,
}: ExtractedResultProps) {
  const hasLineItems = data.lineItems && data.lineItems.length > 0;
  const currencyCode = data.currency;

  return (
    <div className="space-y-3">
      {/* Summary badges row */}
      <div className="flex flex-wrap items-center gap-2">
        {data.documentType && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-[#6366F1]/10 text-[#4338CA] dark:text-[#A5B4FC]">
            {data.documentType}
          </span>
        )}
        {data.vendor && (
          <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
            {data.vendor}
          </span>
        )}
        {data.date && (
          <span className="text-xs text-[#737373]">{data.date}</span>
        )}
      </div>

      {/* Key fields */}
      <div className="grid grid-cols-3 gap-2">
        <FieldBox label="Subtotal" value={formatCurrency(data.subtotal, currencyCode)} />
        <FieldBox label="Tax" value={formatCurrency(data.tax, currencyCode)} />
        <FieldBox label="Total" value={formatCurrency(data.total, currencyCode)} highlight />
      </div>

      {/* Line items table */}
      {hasLineItems && (
        <div className="overflow-x-auto rounded border border-[#E5E5E5] dark:border-[#2A2A2A]">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F5F5F5] dark:bg-[#252525]">
                <th className="text-left px-2.5 py-1.5 font-semibold text-[#525252] dark:text-[#A3A3A3]">
                  Description
                </th>
                <th className="text-right px-2.5 py-1.5 font-semibold text-[#525252] dark:text-[#A3A3A3] w-12">
                  Qty
                </th>
                <th className="text-right px-2.5 py-1.5 font-semibold text-[#525252] dark:text-[#A3A3A3] w-20">
                  Unit
                </th>
                <th className="text-right px-2.5 py-1.5 font-semibold text-[#525252] dark:text-[#A3A3A3] w-20">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] even:bg-[#FAFAFA] dark:even:bg-[#1A1A1A]"
                >
                  <td className="px-2.5 py-1.5 text-[#171717] dark:text-[#E5E5E5]">
                    {item.description ?? "—"}
                  </td>
                  <td className="px-2.5 py-1.5 text-right text-[#737373] tabular-nums">
                    {item.quantity ?? "—"}
                  </td>
                  <td className="px-2.5 py-1.5 text-right text-[#737373] tabular-nums font-mono">
                    {formatCurrency(item.unitPrice, currencyCode)}
                  </td>
                  <td className="px-2.5 py-1.5 text-right text-[#171717] dark:text-[#E5E5E5] tabular-nums font-mono">
                    {formatCurrency(item.amount, currencyCode)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <p className="text-xs text-[#737373] italic leading-relaxed">{data.summary}</p>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onCopyJson}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
        >
          {copied ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={1.5} />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
          {copied ? "Copied!" : "Copy JSON"}
        </button>
        {hasLineItems && (
          <button
            onClick={onDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Download CSV
          </button>
        )}
      </div>
    </div>
  );
}

// ── FieldBox ──────────────────────────────────────────────────────────────────

function FieldBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-2.5 py-2 ${
        highlight
          ? "border-[#C7D2FE] bg-[#EEF2FF]/40 dark:border-[#4338CA]/40 dark:bg-[#1e1e3a]/30"
          : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]"
      }`}
    >
      <p className="text-[9px] font-semibold text-[#A3A3A3] uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p
        className={`text-sm font-mono font-semibold ${
          highlight
            ? "text-[#4338CA] dark:text-[#A5B4FC]"
            : "text-[#171717] dark:text-[#E5E5E5]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

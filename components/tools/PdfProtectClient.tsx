"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  RotateCcw,
  Download,
  AlertCircle,
  FileText,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import { trackEvent } from "@/lib/analytics";
import { incrementDownloadCount, shouldShowSuccessUpsell, markSuccessUpsellShown } from "@/lib/success-upsell";

// ── Constants ───────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

type UIState = "idle" | "processing" | "done";

// ── Helper ──────────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main Component ───────────────────────────────────────────────────────────────

export default function PdfProtectClient() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  // File state
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);

  // Password state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Processing state
  const [uiState, setUiState] = useState<UIState>("idle");
  const [protectError, setProtectError] = useState<string | null>(null);

  // Result
  const [protectedBytes, setProtectedBytes] = useState<Uint8Array | null>(null);

  // Upsell modal
  const [showProModal, setShowProModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Load PDF ──────────────────────────────────────────────────────────────────

  const loadPdf = useCallback(async (file: File) => {
    setLoadError(null);
    setProtectError(null);
    setProtectedBytes(null);
    setPasswordError(null);
    setUiState("idle");

    if (file.size > MAX_FILE_SIZE) {
      setLoadError(`File is too large (${formatBytes(file.size)}). Maximum is 100 MB.`);
      return;
    }

    try {
      // Use @cantoo/pdf-lib which supports encryption — dynamically imported to keep bundle lean
      const { PDFDocument } = await import("@cantoo/pdf-lib");
      const buffer = await file.arrayBuffer();
      // ignoreEncryption: true allows loading already-encrypted PDFs (e.g., re-protecting one)
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setSourceFile(file);
      setOriginalSize(file.size);
      setPageCount(doc.getPageCount());
    } catch {
      setLoadError(
        "Could not read this PDF. The file may be corrupted or in an unsupported format."
      );
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
        loadPdf(file);
      }
    },
    [loadPdf]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadPdf(file);
      e.target.value = "";
    },
    [loadPdf]
  );

  // ── Protect ───────────────────────────────────────────────────────────────────

  const handleProtect = useCallback(async () => {
    if (!sourceFile || !pageCount) return;

    // Validate password fields
    if (!password) {
      setPasswordError("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match. Please re-enter both fields.");
      return;
    }
    setPasswordError(null);

    trackEvent("pdf_protect_start", { pages: pageCount, size_kb: Math.round(sourceFile.size / 1024) });

    setUiState("processing");
    setProtectError(null);
    setProtectedBytes(null);

    try {
      const { PDFDocument } = await import("@cantoo/pdf-lib");
      const buffer = await sourceFile.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Apply AES-256 (or the fork's default) encryption.
      // Both userPassword (open password) and ownerPassword are set to the same value
      // so the file requires this password to be opened by anyone.
      doc.encrypt({
        userPassword: password,
        ownerPassword: password,
      });

      const outputBytes = await doc.save();

      setProtectedBytes(new Uint8Array(outputBytes));
      setUiState("done");

      trackEvent("pdf_protect_complete", {
        pages: pageCount,
        original_kb: Math.round(sourceFile.size / 1024),
        output_kb: Math.round(outputBytes.byteLength / 1024),
      });
    } catch (err) {
      console.error("PDF protect failed:", err);
      setUiState("idle");
      setProtectError(
        err instanceof Error
          ? err.message
          : "Failed to encrypt this PDF. The file may be corrupted or in an unsupported format."
      );
    }
  }, [sourceFile, pageCount, password, confirmPassword]);

  // ── Download ──────────────────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!protectedBytes || !sourceFile) return;
    trackEvent("pdf_protect_download", { pages: pageCount });
    const blob = new Blob([protectedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const baseName = sourceFile.name.replace(/\.pdf$/i, "");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-protected.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // Show honest upsell from the 2nd download onward, with cooldown
    const dlCount = incrementDownloadCount();
    if (shouldShowSuccessUpsell(isPro, dlCount)) {
      markSuccessUpsellShown();
      setShowProModal(true);
    }
  }, [protectedBytes, sourceFile, pageCount, isPro]);

  // ── Reset ─────────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setSourceFile(null);
    setPageCount(0);
    setUiState("idle");
    setProtectedBytes(null);
    setProtectError(null);
    setLoadError(null);
    setPasswordError(null);
    setOriginalSize(0);
    setPassword("");
    setConfirmPassword("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const hasSource = sourceFile !== null && pageCount > 0;

  // Password validation hint
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordMismatch = confirmPassword && password !== confirmPassword;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Pro upsell modal, shown after download for free users */}
      <ProUpsellModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
        trigger="success"
      />

      {/* Protect error banner */}
      {protectError && (
        <div className="mb-4 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-[#991B1B] dark:text-[#FCA5A5] mb-0.5">
                Could not protect PDF
              </p>
              <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{protectError}</p>
            </div>
          </div>
          <button
            onClick={() => setProtectError(null)}
            className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Idle / configure ── */}
      {uiState !== "done" && (
        <>
          {/* Drop zone */}
          {!hasSource && (
            <div
              role="button"
              tabIndex={0}
              aria-label="Drop zone: click or drag a PDF file to upload"
              className={[
                "border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors",
                isDragOver
                  ? "border-[#EF4444] bg-[#EF4444]/5"
                  : "border-[#D4D4D4] dark:border-[#444] bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:border-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]",
              ].join(" ")}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-lg border border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#252525] flex items-center justify-center">
                  <Lock
                    className={[
                      "h-6 w-6 transition-colors",
                      isDragOver ? "text-[#EF4444]" : "text-[#737373]",
                    ].join(" ")}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Drop a PDF or click to browse
                  </p>
                  <p className="text-xs text-[#737373]">
                    Adds an open-password so the file cannot be viewed without it
                  </p>
                </div>
                <p className="text-xs text-[#A3A3A3]">
                  100% in your browser &middot; Your PDF is never uploaded &middot; No signup
                </p>
              </div>
            </div>
          )}

          {/* Load error */}
          {loadError && (
            <div className="mt-3 flex items-start justify-between gap-3 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171]">{loadError}</p>
              </div>
              <button
                onClick={() => setLoadError(null)}
                className="shrink-0 text-[#DC2626] hover:text-[#991B1B] text-xs font-medium"
                aria-label="Dismiss"
              >
                &times;
              </button>
            </div>
          )}

          {/* File info + password + protect button */}
          {hasSource && uiState === "idle" && (
            <div className="space-y-4">
              {/* Source file card */}
              <div className="flex items-center gap-3 px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="w-9 h-10 rounded-sm bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-[#EF4444]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                    {sourceFile!.name}
                  </p>
                  <p className="text-[11px] text-[#A3A3A3] tabular-nums">
                    {pageCount} page{pageCount !== 1 ? "s" : ""} &middot; {formatBytes(originalSize)}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-[11px] text-[#A3A3A3] hover:text-[#DC2626] transition-colors shrink-0"
                  aria-label="Remove file and start over"
                >
                  Change file
                </button>
              </div>

              {/* Password fields */}
              <div className="space-y-3 px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#EF4444]" strokeWidth={2} />
                  Set a password
                </p>
                <p className="text-xs text-[#737373] leading-relaxed -mt-1">
                  The password will be required to <strong>open</strong> the file. Encryption happens
                  in your browser — we never see the password or the document.
                </p>

                {/* Password */}
                <div>
                  <label htmlFor="pdf-protect-password" className="block text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="pdf-protect-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(null);
                      }}
                      placeholder="Enter a strong password"
                      className="w-full pr-9 pl-3 py-2.5 text-sm border border-[#E5E5E5] dark:border-[#333] rounded-md bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/30 focus:border-[#EF4444]"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#525252] transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword
                        ? <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                        : <Eye className="h-4 w-4" strokeWidth={1.5} />
                      }
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="pdf-protect-confirm" className="block text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3] mb-1">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="pdf-protect-confirm"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError(null);
                      }}
                      placeholder="Re-enter the same password"
                      className={[
                        "w-full pr-9 pl-3 py-2.5 text-sm border rounded-md bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 transition-colors",
                        passwordMismatch
                          ? "border-[#EF4444] focus:ring-[#EF4444]/30 focus:border-[#EF4444]"
                          : passwordsMatch
                          ? "border-[#16A34A] focus:ring-[#16A34A]/30 focus:border-[#16A34A]"
                          : "border-[#E5E5E5] dark:border-[#333] focus:ring-[#EF4444]/30 focus:border-[#EF4444]",
                      ].join(" ")}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#525252] transition-colors"
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirm
                        ? <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                        : <Eye className="h-4 w-4" strokeWidth={1.5} />
                      }
                    </button>
                  </div>
                  {confirmPassword && (
                    <p className={`text-[11px] mt-1 ${passwordMismatch ? "text-[#DC2626]" : "text-[#16A34A]"}`}>
                      {passwordMismatch ? "Passwords do not match." : "Passwords match."}
                    </p>
                  )}
                </div>

                {/* Password error */}
                {passwordError && (
                  <p className="text-[11px] text-[#DC2626] flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Important warning */}
              <div className="flex items-start gap-2 px-4 py-3 border border-[#FECACA] bg-[#FEF2F2] dark:bg-[#1C0000] dark:border-[#991B1B] rounded-md">
                <ShieldAlert className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-[#B91C1C] dark:text-[#F87171] leading-relaxed">
                  <strong>Important:</strong> if you forget this password, the file cannot be recovered.
                  There is no reset, no backdoor, and no way for us to help — the encryption is applied
                  entirely in your browser.
                </p>
              </div>

              {/* Protect button */}
              <button
                onClick={handleProtect}
                disabled={!password || !confirmPassword}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Lock className="h-4 w-4" strokeWidth={1.5} />
                Protect PDF &rarr;
              </button>

              {/* Privacy note */}
              <p className="text-center text-[11px] text-[#A3A3A3]">
                100% in your browser &middot; Your PDF is never uploaded &middot; No signup
              </p>
            </div>
          )}

          {/* Processing spinner */}
          {uiState === "processing" && (
            <div className="mt-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-8 bg-white dark:bg-[#191919]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#EF4444]" strokeWidth={1.5} />
                <p className="text-sm text-[#525252] dark:text-[#A3A3A3] font-medium">
                  Encrypting PDF&hellip;
                </p>
                <p className="text-xs text-[#737373]">
                  Processing entirely in your browser, please keep the tab active.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Done ── */}
      {uiState === "done" && protectedBytes && (
        <div className="space-y-4">
          {/* Success card */}
          <div className="border border-[#FECACA] dark:border-[#991B1B] bg-[#FEF2F2] dark:bg-[#1C0000] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-[#EF4444] shrink-0" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#991B1B] dark:text-[#FCA5A5]">
                PDF password-protected successfully
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-md bg-white dark:bg-[#1C0000] border border-[#FECACA] dark:border-[#991B1B]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Original</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#1C0000] border border-[#FECACA] dark:border-[#991B1B]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Protected</p>
                <p className="text-sm font-semibold text-[#EF4444] tabular-nums">
                  {formatBytes(protectedBytes.byteLength)}
                </p>
              </div>
              <div className="p-3 rounded-md bg-white dark:bg-[#1C0000] border border-[#FECACA] dark:border-[#991B1B]">
                <p className="text-[11px] text-[#737373] dark:text-[#A3A3A3] mb-1">Pages</p>
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] tabular-nums">
                  {pageCount}
                </p>
              </div>
            </div>

            {/* Reminder */}
            <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-white dark:bg-[#1C0000] border border-[#FECACA] dark:border-[#7F1D1D] rounded-md">
              <ShieldAlert className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-[11px] text-[#B91C1C] dark:text-[#F87171] leading-relaxed">
                <strong>Remember your password.</strong> If you lose it, this file cannot be recovered — there is no reset.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download protected PDF
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[#E5E5E5] dark:border-[#333] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              Protect another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

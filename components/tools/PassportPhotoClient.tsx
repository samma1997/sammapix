"use client";

/**
 * PassportPhotoClient — interactive UI for the AI Passport Photo tool.
 *
 * Steps:
 *  1. Upload a photo (dropzone)
 *  2. Select country preset
 *  3. Toggle background removal on/off
 *  4. Process & preview
 *  5. Download JPG
 */

import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import {
  Upload,
  Download,
  Loader2,
  X,
  CheckCircle2,
  Camera,
} from "lucide-react";
import {
  PASSPORT_PRESETS,
  generatePassportPhoto,
  type PassportPreset,
  type PassportPhotoResult,
} from "@/lib/passport-photo";

type Stage = "upload" | "processing" | "done";

export default function PassportPhotoClient({ defaultCountry }: { defaultCountry?: string } = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<PassportPreset>(
    (defaultCountry && PASSPORT_PRESETS.find((p) => p.country === defaultCountry)) || PASSPORT_PRESETS[0]
  );
  const [removeBg, setRemoveBg] = useState(true);
  const [stage, setStage] = useState<Stage>("upload");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [result, setResult] = useState<PassportPhotoResult | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredPresets = useMemo(() => {
    if (!countrySearch.trim()) return PASSPORT_PRESETS.slice(0, 12); // Show top 12 by default
    const q = countrySearch.toLowerCase();
    return PASSPORT_PRESETS.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  /* ---- File selection ---- */
  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/")) {
        setError("Please select a valid image file (JPG, PNG, WebP).");
        return;
      }
      if (f.size > 20 * 1024 * 1024) {
        setError("File too large. Max 20 MB.");
        return;
      }
      // Revoke previous URLs before creating new ones to prevent leaks
      if (preview) URL.revokeObjectURL(preview);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
      setResultUrl(null);
      setError(null);
      setStage("upload");
    },
    [preview, resultUrl]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  /* ---- Processing ---- */
  const handleGenerate = useCallback(async () => {
    if (!file) return;
    setStage("processing");
    setProgress(0);
    setError(null);

    try {
      const res = await generatePassportPhoto(file, selectedPreset, {
        removeBg,
        onProgress: (p, label) => {
          setProgress(p);
          setProgressLabel(label);
        },
      });

      setResult(res);
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(res.blob);
      });
      setStage("done");
    } catch (err) {
      console.error("Passport photo generation failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStage("upload");
    }
  }, [file, selectedPreset, removeBg]);

  /* ---- Download ---- */
  const handleDownload = useCallback(() => {
    if (!result || !resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `passport-photo-${result.preset.country}-${result.width}x${result.height}.jpg`;
    a.click();
  }, [result, resultUrl]);

  /* ---- Reset ---- */
  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPreview(null);
    setResult(null);
    setResultUrl(null);
    setStage("upload");
    setProgress(0);
    setError(null);
  }, [preview, resultUrl]);

  /* ---- Cleanup on unmount ---- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================ */
  /*  RENDER                                                       */
  /* ============================================================ */

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* ---- Dropzone / Preview ---- */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="border-[1.5px] border-dashed border-[#D4D4D4] dark:border-[#404040] rounded-lg
                     bg-[#FAFAFA] dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]
                     transition-colors cursor-pointer flex flex-col items-center justify-center
                     py-16 px-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-4">
            <Camera
              className="h-6 w-6 text-[#A3A3A3]"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] mb-1">
            Drag & drop your photo here, or{" "}
            <span className="text-[#6366F1] font-medium">browse</span>
          </p>
          <p className="text-xs text-[#A3A3A3]">
            JPG, PNG or WebP — max 20 MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onInputChange}
          />
        </div>
      ) : (
        <div className="space-y-5">
          {/* Original preview + reset */}
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview!}
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                {file.name}
              </p>
              <p className="text-xs text-[#A3A3A3] mt-0.5">
                {(file.size / 1024).toFixed(0)} KB
              </p>
              <button
                onClick={handleReset}
                className="mt-2 inline-flex items-center gap-1 text-xs text-[#737373] hover:text-[#DC2626] transition-colors"
              >
                <X className="h-3 w-3" strokeWidth={2} />
                Remove
              </button>
            </div>
          </div>

          {/* Country selector with search */}
          <div ref={dropdownRef}>
            <label className="block text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mb-2 uppercase tracking-wide">
              Select country or visa type
            </label>

            {/* Selected country display */}
            <button
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              disabled={stage === "processing"}
              className="w-full flex items-center justify-between p-3 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedPreset.flag}</span>
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                    {selectedPreset.label}
                  </p>
                  <p className="text-[11px] text-[#A3A3A3]">
                    {selectedPreset.widthPx} &times; {selectedPreset.heightPx} px
                  </p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`text-[#A3A3A3] transition-transform ${countryDropdownOpen ? "rotate-180" : ""}`}>
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown with search */}
            {countryDropdownOpen && (
              <div className="mt-1 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] shadow-lg overflow-hidden z-20 relative">
                {/* Search input */}
                <div className="p-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country or visa type..."
                    autoFocus
                    className="w-full px-3 py-2 text-sm rounded-md border border-[#E5E5E5] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                {/* Results */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredPresets.length === 0 ? (
                    <p className="px-4 py-3 text-xs text-[#A3A3A3]">No countries found</p>
                  ) : (
                    filteredPresets.map((preset) => (
                      <button
                        key={preset.country}
                        onClick={() => {
                          setSelectedPreset(preset);
                          setCountryDropdownOpen(false);
                          setCountrySearch("");
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                          selectedPreset.country === preset.country
                            ? "bg-[#6366F1]/[0.06] dark:bg-[#6366F1]/[0.12]"
                            : "hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
                        }`}
                      >
                        <span className="text-base shrink-0">{preset.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                            {preset.label}
                          </p>
                          <p className="text-[11px] text-[#A3A3A3]">{preset.description}</p>
                        </div>
                        <span className="text-[11px] text-[#A3A3A3] shrink-0 tabular-nums">
                          {preset.widthPx}&times;{preset.heightPx}
                        </span>
                        {selectedPreset.country === preset.country && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#6366F1] shrink-0" strokeWidth={2} />
                        )}
                      </button>
                    ))
                  )}
                </div>
                {!countrySearch && (
                  <p className="px-3 py-2 text-[10px] text-[#A3A3A3] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Showing top 12 &mdash; type to search all {PASSPORT_PRESETS.length} countries
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Background removal toggle */}
          <div className="flex items-center justify-between p-3 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Remove background
              </p>
              <p className="text-xs text-[#A3A3A3]">
                Replace with pure white — standard for passports
              </p>
            </div>
            <button
              onClick={() => setRemoveBg(!removeBg)}
              disabled={stage === "processing"}
              className={`relative w-10 h-[22px] rounded-full transition-colors ${
                removeBg
                  ? "bg-[#171717] dark:bg-[#E5E5E5]"
                  : "bg-[#E5E5E5] dark:bg-[#404040]"
              }`}
              role="switch"
              aria-checked={removeBg}
            >
              <span
                className={`block w-[18px] h-[18px] rounded-full bg-white dark:bg-[#171717] border border-[#D4D4D4] dark:border-[#525252] shadow-sm transition-transform ${
                  removeBg ? "translate-x-[20px]" : "translate-x-[2px]"
                }`}
              />
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-md border border-[#DC2626]/30 bg-[#DC2626]/[0.04] text-sm text-[#DC2626]">
              {error}
            </div>
          )}

          {/* Generate button */}
          {stage === "upload" && (
            <button
              onClick={handleGenerate}
              className="w-full py-2.5 rounded-md bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]
                         text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
            >
              Generate passport photo
            </button>
          )}

          {/* Processing state */}
          {stage === "processing" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                <span>{progressLabel || "Processing\u2026"}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A] overflow-hidden">
                <div
                  className="h-full bg-[#171717] dark:bg-[#E5E5E5] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result */}
          {stage === "done" && result && resultUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#16A34A] font-medium">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                Passport photo ready!
              </div>

              {/* Side-by-side preview */}
              <div className="grid grid-cols-2 gap-4">
                {/* Original */}
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide text-[#A3A3A3] mb-2">
                    Original
                  </p>
                  <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden bg-[#F5F5F5] dark:bg-[#252525] aspect-[3/4] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview!}
                      alt="Original"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                {/* Result */}
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide text-[#A3A3A3] mb-2">
                    Passport photo
                  </p>
                  <div className="border border-[#6366F1]/30 rounded-md overflow-hidden bg-white dark:bg-[#1E1E1E] aspect-[3/4] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resultUrl}
                      alt="Passport photo result"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-xs text-[#737373] mt-1.5">
                    {result.width} x {result.height} px &middot;{" "}
                    {(result.blob.size / 1024).toFixed(0)} KB &middot; JPG
                  </p>
                </div>
              </div>

              {/* Download + redo */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md
                             bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]
                             text-sm font-medium hover:bg-[#262626] dark:hover:bg-[#D4D4D4] transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Download JPG
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A]
                             bg-white dark:bg-[#1E1E1E] text-sm text-[#525252] dark:text-[#A3A3A3]
                             hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
                >
                  New photo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

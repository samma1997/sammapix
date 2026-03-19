"use client";

import React, { useState, useCallback, useRef } from "react";
import { FolderArchive, Loader2 } from "lucide-react";
import {
  extractImagesFromZip,
  pickFromGoogleDrive,
  pickFromDropbox,
  isGoogleDriveConfigured,
  isDropboxConfigured,
} from "@/lib/import-sources";

// ─── Inline SVG icons (monochrome, small) ────────────────────────────────────

function GoogleDriveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 19h7l3-5.5L8 7h8l4 7h-6" />
      <path d="M8 19h14l-3-5.5H5" />
    </svg>
  );
}

function DropboxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l-6 4 6 4-6 4 6 4 6-4-6-4 6-4z" />
      <path d="M6 10l6 4 6-4" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImportSourceButtonsProps {
  onFilesImported: (files: File[]) => void;
  disabled?: boolean;
}

type ImportSource = "zip" | "drive" | "dropbox";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImportSourceButtons({
  onFilesImported,
  disabled = false,
}: ImportSourceButtonsProps) {
  const [loading, setLoading] = useState<ImportSource | null>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const driveConfigured = isGoogleDriveConfigured();
  const dropboxConfigured = isDropboxConfigured();

  const handleZipSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading("zip");
      try {
        const images = await extractImagesFromZip(file);
        if (images.length > 0) {
          onFilesImported(images);
        }
      } catch (err) {
        console.error("[ImportSourceButtons] ZIP extraction error:", err);
      } finally {
        setLoading(null);
        // Reset input so same file can be re-selected
        if (zipInputRef.current) {
          zipInputRef.current.value = "";
        }
      }
    },
    [onFilesImported]
  );

  const handleGoogleDrive = useCallback(async () => {
    if (!driveConfigured) return;
    setLoading("drive");
    try {
      const files = await pickFromGoogleDrive();
      if (files.length > 0) {
        onFilesImported(files);
      }
    } catch (err) {
      console.error("[ImportSourceButtons] Google Drive error:", err);
    } finally {
      setLoading(null);
    }
  }, [onFilesImported, driveConfigured]);

  const handleDropbox = useCallback(async () => {
    if (!dropboxConfigured) return;
    setLoading("dropbox");
    try {
      const files = await pickFromDropbox();
      if (files.length > 0) {
        onFilesImported(files);
      }
    } catch (err) {
      console.error("[ImportSourceButtons] Dropbox error:", err);
    } finally {
      setLoading(null);
    }
  }, [onFilesImported, dropboxConfigured]);

  const isLoading = loading !== null;

  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      {/* Hidden file input for ZIP */}
      <input
        ref={zipInputRef}
        type="file"
        accept=".zip,application/zip"
        className="hidden"
        onChange={handleZipSelect}
        tabIndex={-1}
      />

      {/* ZIP button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          zipInputRef.current?.click();
        }}
        disabled={disabled || isLoading}
        className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#D4D4D4] dark:hover:border-[#404040] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        title="Import images from a ZIP file"
      >
        {loading === "zip" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
        ) : (
          <FolderArchive className="h-3.5 w-3.5" strokeWidth={1.5} />
        )}
        <span>Import ZIP</span>
      </button>

      {/* Google Drive button */}
      {driveConfigured ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleGoogleDrive();
          }}
          disabled={disabled || isLoading}
          className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#D4D4D4] dark:hover:border-[#404040] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Import images from Google Drive"
        >
          {loading === "drive" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
          ) : (
            <GoogleDriveIcon className="h-3.5 w-3.5" />
          )}
          <span>Google Drive</span>
        </button>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-1.5 text-xs text-[#A3A3A3] dark:text-[#525252] bg-[#FAFAFA] dark:bg-[#1A1A1A] cursor-default opacity-50"
          title="Google Drive — coming soon"
        >
          <GoogleDriveIcon className="h-3.5 w-3.5" />
          <span>Google Drive</span>
        </span>
      )}

      {/* Dropbox button */}
      {dropboxConfigured ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDropbox();
          }}
          disabled={disabled || isLoading}
          className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-1.5 text-xs text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#1E1E1E] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:border-[#D4D4D4] dark:hover:border-[#404040] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Import images from Dropbox"
        >
          {loading === "dropbox" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
          ) : (
            <DropboxIcon className="h-3.5 w-3.5" />
          )}
          <span>Dropbox</span>
        </button>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-3 py-1.5 text-xs text-[#A3A3A3] dark:text-[#525252] bg-[#FAFAFA] dark:bg-[#1A1A1A] cursor-default opacity-50"
          title="Dropbox — coming soon"
        >
          <DropboxIcon className="h-3.5 w-3.5" />
          <span>Dropbox</span>
        </span>
      )}
    </div>
  );
}

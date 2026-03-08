"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE_FREE, MAX_FILES_FREE } from "@/lib/constants";
import { isValidImageFile } from "@/lib/utils";
import { useImageStore } from "@/store/imageStore";
import { useLocale } from "@/hooks/useLocale";

interface DropZoneProps {
  onFilesAdded?: (files: File[]) => void;
  className?: string;
}

export default function DropZone({ onFilesAdded, className }: DropZoneProps) {
  const { addFiles, items } = useImageStore();
  const d = useLocale();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const valid = acceptedFiles.filter(isValidImageFile);
      if (valid.length > 0) {
        addFiles(valid);
        onFilesAdded?.(valid);
      }
    },
    [addFiles, onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    maxSize: MAX_FILE_SIZE_FREE,
    multiple: true,
  });

  const canAddMore = items.length < MAX_FILES_FREE;

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3",
        "w-full py-14 px-6 rounded-lg cursor-pointer",
        "border-[1.5px] border-dashed border-gray-300 dark:border-[#3A3A3A] bg-gray-50 dark:bg-[#1E1E1E]",
        "transition-all duration-150",
        isDragActive && !isDragReject && "border-brand border-solid bg-brand-light",
        isDragReject && "border-error border-solid bg-error-light",
        !isDragActive && "hover:border-gray-400 dark:hover:border-[#525252] hover:bg-gray-100 dark:hover:bg-[#252525]",
        !canAddMore && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input {...getInputProps()} disabled={!canAddMore} />

      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 dark:border-[#3A3A3A] bg-white dark:bg-[#252525] transition-colors",
          isDragActive && !isDragReject && "border-brand bg-brand-light",
          isDragReject && "border-error bg-error-light"
        )}
      >
        {isDragReject ? (
          <ImageIcon className="h-5 w-5 text-error" strokeWidth={1.5} />
        ) : (
          <Upload
            className={cn(
              "h-5 w-5 text-gray-400 dark:text-[#525252] transition-colors",
              isDragActive && "text-brand"
            )}
            strokeWidth={1.5}
          />
        )}
      </div>

      {/* Text */}
      <div className="text-center">
        {isDragReject ? (
          <p className="text-sm font-medium text-error">
            File type not supported
          </p>
        ) : isDragActive ? (
          <p className="text-sm font-medium text-brand">
            Drop to upload
          </p>
        ) : !canAddMore ? (
          <>
            <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5]">
              Limit reached ({MAX_FILES_FREE} files max on free plan)
            </p>
            <p className="text-xs text-gray-400 dark:text-[#737373] mt-1">
              <a href="/pricing" className="text-brand hover:underline">Upgrade to Pro</a> to process up to 100 files
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5]">
              {d.dropzone.title}{" "}
              <span className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
                {d.dropzone.click}
              </span>
            </p>
            <p className="text-xs text-gray-400 dark:text-[#737373] mt-1">
              {d.dropzone.subtitle}
            </p>
          </>
        )}
      </div>

      {/* File count indicator with upgrade nudge */}
      {items.length > 0 && canAddMore && (
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 dark:text-[#737373]">
              {items.length} / {MAX_FILES_FREE} files
            </span>
            {items.length >= 3 && (
              <a href="/pricing" className="text-xs text-indigo-500 hover:underline font-medium">
                Upgrade for 100 →
              </a>
            )}
          </div>
          <div className="h-1 w-full bg-gray-200 dark:bg-[#3A3A3A] rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                items.length >= 4 ? "bg-orange-400" : "bg-indigo-400"
              )}
              style={{ width: `${(items.length / MAX_FILES_FREE) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

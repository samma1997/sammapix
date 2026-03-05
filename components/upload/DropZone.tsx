"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE_FREE, MAX_FILES_FREE } from "@/lib/constants";
import { isValidImageFile } from "@/lib/utils";
import { useImageStore } from "@/store/imageStore";

interface DropZoneProps {
  onFilesAdded?: (files: File[]) => void;
  className?: string;
}

export default function DropZone({ onFilesAdded, className }: DropZoneProps) {
  const { addFiles, items } = useImageStore();

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
        "border-[1.5px] border-dashed border-gray-300 bg-gray-50",
        "transition-all duration-150",
        isDragActive && !isDragReject && "border-brand border-solid bg-brand-light",
        isDragReject && "border-error border-solid bg-error-light",
        !isDragActive && "hover:border-gray-400 hover:bg-gray-100",
        !canAddMore && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input {...getInputProps()} disabled={!canAddMore} />

      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 bg-white transition-colors",
          isDragActive && !isDragReject && "border-brand bg-brand-light",
          isDragReject && "border-error bg-error-light"
        )}
      >
        {isDragReject ? (
          <ImageIcon className="h-5 w-5 text-error" strokeWidth={1.5} />
        ) : (
          <Upload
            className={cn(
              "h-5 w-5 text-gray-400 transition-colors",
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
            <p className="text-sm font-medium text-gray-700">
              Limit reached ({MAX_FILES_FREE} files max on free plan)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <a href="/pricing" className="text-brand hover:underline">Upgrade to Pro</a> to process up to 100 files
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">
              Drop images here or{" "}
              <span className="text-gray-900 underline underline-offset-2">
                click to upload
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, WebP, GIF — up to 10MB each
            </p>
          </>
        )}
      </div>

      {/* File count indicator */}
      {items.length > 0 && canAddMore && (
        <p className="text-xs text-gray-400">
          {items.length}/{MAX_FILES_FREE} files added
        </p>
      )}
    </div>
  );
}

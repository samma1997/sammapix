"use client";

import React, { useState } from "react";
import {
  Download,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Sparkles,
  Eye,
} from "lucide-react";
import { ProcessedFile } from "@/types/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatBytes, cn, truncate } from "@/lib/utils";
import { useImageStore } from "@/store/imageStore";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

interface FileCardProps {
  file: ProcessedFile;
  onAiRename?: (fileId: string) => void;
}

export default function FileCard({ file, onAiRename }: FileCardProps) {
  const { removeFile, downloadFile } = useImageStore();
  const [showComparison, setShowComparison] = useState(false);

  const isQueued = file.status === "queued";
  const isProcessing = file.status === "processing";
  const isDone = file.status === "done";
  const isError = file.status === "error";

  return (
    <div
      className={cn(
        "flex flex-col p-3 bg-white border border-gray-200 rounded-md transition-all duration-150",
        isDone && "hover:bg-gray-50",
        isError && "border-red-100 bg-red-50/50"
      )}
    >
      {/* Main row */}
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="shrink-0 w-10 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200">
          {file.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={isDone && file.compressedPreviewUrl ? file.compressedPreviewUrl : file.previewUrl}
              alt={file.originalName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[10px] text-gray-400 font-mono uppercase">
                {file.originalFormat}
              </span>
            </div>
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900 truncate">
              {truncate(file.compressedName || file.originalName, 40)}
            </p>
            {file.aiSuggestedName && (
              <Badge variant="brand" className="shrink-0">
                <Sparkles className="h-2.5 w-2.5" />
                AI
              </Badge>
            )}
          </div>

          {/* Size info */}
          <div className="flex items-center gap-2 mt-0.5">
            {isDone && file.compressedSize !== undefined ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  {formatBytes(file.originalSize)}
                </span>
                <span className="text-xs text-gray-600">
                  {formatBytes(file.compressedSize)}
                </span>
                {file.savedPercent !== undefined && file.savedPercent > 0 && (
                  <Badge variant="success" className="text-[10px]">
                    -{file.savedPercent}%
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-xs text-gray-400">
                {formatBytes(file.originalSize)}
              </span>
            )}
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-1.5">
              <Progress value={file.progress} />
            </div>
          )}

          {/* Error message */}
          {isError && file.errorMessage && (
            <p className="text-xs text-error mt-0.5 truncate">{file.errorMessage}</p>
          )}

          {/* AI rename error */}
          {file.aiRenameStatus === "error" && (
            <p className="text-xs text-warning mt-0.5">
              {file.aiRenameError?.includes("UNAUTHENTICATED") || file.aiRenameError?.includes("Authentication")
                ? "AI rename requires login — sign in and retry"
                : file.aiRenameError?.includes("429") || file.aiRenameError?.includes("quota") || file.aiRenameError?.includes("RESOURCE_EXHAUSTED")
                ? "AI rename quota exceeded — try again later"
                : file.aiRenameError?.includes("AI_ERROR") || file.aiRenameError?.includes("AI processing")
                ? "AI rename failed — Gemini error, retry"
                : `AI rename failed — ${file.aiRenameError ?? "unknown error"}`}
            </p>
          )}
        </div>

        {/* Status icon */}
        <div className="shrink-0">
          {isQueued && (
            <Clock className="h-4 w-4 text-gray-300" strokeWidth={1.5} />
          )}
          {isProcessing && (
            <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" strokeWidth={1.5} />
          )}
          {isDone && (
            <CheckCircle2 className="h-4 w-4 text-success" strokeWidth={1.5} />
          )}
          {isError && (
            <AlertCircle className="h-4 w-4 text-error" strokeWidth={1.5} />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {isDone && onAiRename && !file.aiSuggestedName && (
            <Button
              variant="ghost"
              size="icon-sm"
              title="AI Rename"
              disabled={file.aiRenameStatus === "loading"}
              onClick={() => onAiRename(file.id)}
            >
              {file.aiRenameStatus === "loading" ? (
                <RefreshCw className="h-3.5 w-3.5 text-brand animate-spin" strokeWidth={1.5} />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={1.5} />
              )}
            </Button>
          )}

          {isDone && file.compressedPreviewUrl && (
            <Button
              variant="ghost"
              size="icon-sm"
              title={showComparison ? "Hide comparison" : "Before/After"}
              onClick={() => setShowComparison(!showComparison)}
            >
              <Eye className="h-3.5 w-3.5 text-gray-500" strokeWidth={1.5} />
            </Button>
          )}

          {isDone && (
            <Button
              variant="ghost"
              size="icon-sm"
              title="Download"
              onClick={() => downloadFile(file.id)}
            >
              <Download className="h-3.5 w-3.5 text-gray-500" strokeWidth={1.5} />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            title="Remove"
            onClick={() => removeFile(file.id)}
          >
            <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-700" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Before/After comparison slider */}
      {showComparison && file.previewUrl && file.compressedPreviewUrl && (
        <div className="mt-3">
          <BeforeAfterSlider
            beforeSrc={file.previewUrl}
            afterSrc={file.compressedPreviewUrl}
            beforeLabel={`Original · ${formatBytes(file.originalSize)}`}
            afterLabel={`Compressed · ${formatBytes(file.compressedSize || 0)}`}
          />
        </div>
      )}
    </div>
  );
}

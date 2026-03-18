"use client";

import { runCompressStep } from "@/lib/pipeline-steps/compress";
import { runResizeStep, type InstagramFormat } from "@/lib/pipeline-steps/resize";
import { runWebPConvertStep } from "@/lib/pipeline-steps/webp-convert";
import { runAiRenameStep } from "@/lib/pipeline-steps/ai-rename";
import { runExifStripStep } from "@/lib/pipeline-steps/exif-strip";

// ── Public types ────────────────────────────────────────────────────────────────

export type PipelineStepId =
  | "compress"
  | "webp"
  | "resize"
  | "ai-rename"
  | "exif-strip";

export interface PipelineStep {
  id: PipelineStepId;
  enabled: boolean;
  settings: PipelineStepSettings;
}

/**
 * Union of all possible step settings.
 * Each step reads only the keys it cares about.
 */
export interface PipelineStepSettings {
  /** Compress: quality 1-100 */
  quality?: number;
  /** Compress / Resize: max width or height in px */
  maxWidthOrHeight?: number;
  /** Resize: max pixel dimension for the longest side */
  maxPx?: number;
  /** Resize: Instagram-specific format */
  instagramFormat?: InstagramFormat;
  /** WebP convert: quality 0-1 */
  webpQuality?: number;
  /** AI rename: locale string (e.g. "en", "it") */
  locale?: string;
}

export interface PipelineFileResult {
  blob: Blob;
  name: string;
  altText?: string;
  savedPercent?: number;
}

export interface PipelineConfig {
  steps: PipelineStep[];
  files: File[];
  onFileProgress: (
    fileIndex: number,
    stepId: PipelineStepId,
    progress: number
  ) => void;
  onFileComplete: (fileIndex: number, result: PipelineFileResult) => void;
  onFileError: (fileIndex: number, error: string) => void;
  /** Optional abort signal — when set to true processing stops */
  abortRef?: { current: boolean };
  locale?: string;
}

// ── Engine ───────────────────────────────────────────────────────────────────────

/**
 * Run a multi-step image pipeline on every file, sequentially.
 *
 * Each file goes through every *enabled* step in order.
 * Steps that fail fatally (compress, resize, webp, exif-strip) abort that file.
 * AI rename failure is non-fatal — the original name is kept.
 */
export async function runPipeline(config: PipelineConfig): Promise<void> {
  const { steps, files, onFileProgress, onFileComplete, onFileError, abortRef } =
    config;

  const enabledSteps = steps.filter((s) => s.enabled);

  for (let i = 0; i < files.length; i++) {
    if (abortRef?.current) break;

    const file = files[i];
    let currentBlob: Blob = file;
    let currentName = file.name.replace(/\.[^.]+$/, "");
    let ext = file.name.split(".").pop() ?? "jpg";
    let altText: string | undefined;
    let savedPercent: number | undefined;
    let fatalError = false;

    for (const step of enabledSteps) {
      if (abortRef?.current) break;
      if (fatalError) break;

      onFileProgress(i, step.id, 0);

      try {
        switch (step.id) {
          case "compress": {
            const quality = step.settings.quality ?? 80;
            const maxWH = step.settings.maxWidthOrHeight ?? 4096;
            const mimeType = currentBlob.type || file.type;
            const result = await runCompressStep(
              currentBlob,
              `${currentName}.${ext}`,
              mimeType,
              { quality, maxWidthOrHeight: maxWH }
            );
            currentBlob = result.blob;
            savedPercent = result.savedPercent;
            onFileProgress(i, step.id, 100);
            break;
          }

          case "resize": {
            const maxPx = step.settings.maxPx ?? 1200;
            currentBlob = await runResizeStep(currentBlob, {
              maxPx,
              instagramFormat: step.settings.instagramFormat,
            });
            onFileProgress(i, step.id, 100);
            break;
          }

          case "webp": {
            const quality = step.settings.webpQuality ?? 0.85;
            currentBlob = await runWebPConvertStep(
              currentBlob,
              `${currentName}.${ext}`,
              { quality }
            );
            ext = "webp";
            onFileProgress(i, step.id, 100);
            break;
          }

          case "ai-rename": {
            try {
              const locale = step.settings.locale ?? config.locale ?? "en";
              // Send the original file for AI analysis (better context)
              const tmpFile = new File([file], `${currentName}.${ext}`, {
                type: file.type,
              });
              const result = await runAiRenameStep(tmpFile, currentName, {
                locale,
              });
              currentName = result.filename;
              altText = result.altText;
              onFileProgress(i, step.id, 100);
            } catch {
              // AI rename failure is non-fatal — keep original name, mark skipped
              onFileProgress(i, step.id, -1); // -1 signals "skipped"
            }
            break;
          }

          case "exif-strip": {
            const tmpFile = new File([currentBlob], `${currentName}.${ext}`, {
              type: currentBlob.type || file.type,
            });
            currentBlob = await runExifStripStep(tmpFile);
            onFileProgress(i, step.id, 100);
            break;
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // ai-rename errors are handled inside the case above;
        // all other steps are fatal for this file
        if (step.id !== "ai-rename") {
          onFileError(i, message);
          fatalError = true;
        }
      }
    }

    if (!fatalError) {
      onFileComplete(i, {
        blob: currentBlob,
        name: `${currentName}.${ext}`,
        altText,
        savedPercent,
      });
    }
  }
}

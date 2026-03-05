"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ProcessedFile, CompressOptions, FileStatus } from "@/types/image";
import { generateId, sanitizeFilename, calculateSavings, getFilenameWithoutExtension } from "@/lib/utils";
import { compressImage } from "@/lib/compress";
import { downloadSingleFile, downloadAllAsZip } from "@/lib/zip";
import { DEFAULT_QUALITY, DEFAULT_CONVERT_WEBP, DEFAULT_AI_RENAME, MAX_FILES_FREE } from "@/lib/constants";
import imageCompression from "browser-image-compression";

interface ImageSettings {
  quality: number;
  convertToWebP: boolean;
  aiRenameEnabled: boolean;
}

interface ImageStoreState {
  items: ProcessedFile[];
  settings: ImageSettings;
  isProcessing: boolean;
  isZipping: boolean;

  // Actions
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;
  updateItem: (id: string, updates: Partial<ProcessedFile>) => void;
  processFile: (id: string) => Promise<void>;
  processAll: () => Promise<void>;
  downloadFile: (id: string) => void;
  downloadAll: () => Promise<void>;
  setQuality: (quality: number) => void;
  setConvertToWebP: (value: boolean) => void;
  setAiRenameEnabled: (value: boolean) => void;
  applyAiName: (id: string, name: string, altText?: string) => void;
  aiRenameFile: (id: string) => Promise<void>;
}

export const useImageStore = create<ImageStoreState>()(
  immer((set, get) => ({
    items: [],
    settings: {
      quality: DEFAULT_QUALITY,
      convertToWebP: DEFAULT_CONVERT_WEBP,
      aiRenameEnabled: DEFAULT_AI_RENAME,
    },
    isProcessing: false,
    isZipping: false,

    addFiles: (files: File[]) => {
      set((state) => {
        const existing = state.items.length;
        const availableSlots = MAX_FILES_FREE - existing;
        const filesToAdd = files.slice(0, availableSlots);

        filesToAdd.forEach((file) => {
          const id = generateId();
          const previewUrl = URL.createObjectURL(file);
          const newItem: ProcessedFile = {
            id,
            originalFile: file,
            originalName: sanitizeFilename(file.name),
            originalSize: file.size,
            originalFormat: getMimeFormat(file.type),
            status: "queued",
            progress: 0,
            previewUrl,
          };
          state.items.push(newItem);
        });
      });
    },

    removeFile: (id: string) => {
      set((state) => {
        const idx = state.items.findIndex((item) => item.id === id);
        if (idx >= 0) {
          const item = state.items[idx];
          if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
          if (item.compressedPreviewUrl) URL.revokeObjectURL(item.compressedPreviewUrl);
          state.items.splice(idx, 1);
        }
      });
    },

    clearAll: () => {
      set((state) => {
        state.items.forEach((item) => {
          if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
          if (item.compressedPreviewUrl) URL.revokeObjectURL(item.compressedPreviewUrl);
        });
        state.items = [];
      });
    },

    updateItem: (id: string, updates: Partial<ProcessedFile>) => {
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          Object.assign(item, updates);
        }
      });
    },

    processFile: async (id: string) => {
      const { settings, updateItem } = get();
      const item = get().items.find((i) => i.id === id);
      if (!item || item.status === "processing" || item.status === "done") return;

      updateItem(id, { status: "processing", progress: 0 });

      try {
        const result = await compressImage(
          item.originalFile,
          {
            quality: settings.quality,
            convertToWebP: settings.convertToWebP,
            removeExif: true,
          },
          (progress) => {
            updateItem(id, { progress });
          }
        );

        const outputExt = result.format === "jpeg" ? "jpg" : result.format;
        const baseName = getFilenameWithoutExtension(item.originalName);
        const compressedName = settings.convertToWebP
          ? `${baseName}.webp`
          : item.originalName;

        const compressedPreviewUrl = URL.createObjectURL(result.blob);

        updateItem(id, {
          status: "done",
          progress: 100,
          compressedBlob: result.blob,
          compressedSize: result.compressedSize,
          compressedFormat: result.format,
          compressedName,
          savedBytes: result.savedBytes,
          savedPercent: result.savedPercent,
          compressedPreviewUrl,
        });

      } catch (err) {
        const message = err instanceof Error ? err.message : "Compression failed";
        updateItem(id, {
          status: "error",
          errorMessage: message,
          progress: 0,
        });
        return; // don't proceed to AI rename if compression failed
      }

      // AI rename is OUTSIDE the compression try-catch
      if (settings.aiRenameEnabled) {
        await get().aiRenameFile(id);
      }
    },

    processAll: async () => {
      set((state) => { state.isProcessing = true; });
      const { items, processFile } = get();
      const queued = items.filter((i) => i.status === "queued");

      for (const item of queued) {
        await processFile(item.id);
      }

      set((state) => { state.isProcessing = false; });
    },

    downloadFile: (id: string) => {
      const item = get().items.find((i) => i.id === id);
      if (item) downloadSingleFile(item);
    },

    downloadAll: async () => {
      set((state) => { state.isZipping = true; });
      try {
        await downloadAllAsZip(get().items);
      } finally {
        set((state) => { state.isZipping = false; });
      }
    },

    setQuality: (quality: number) => {
      set((state) => { state.settings.quality = quality; });
    },

    setConvertToWebP: (value: boolean) => {
      set((state) => { state.settings.convertToWebP = value; });
    },

    setAiRenameEnabled: (value: boolean) => {
      set((state) => { state.settings.aiRenameEnabled = value; });
    },

    applyAiName: (id: string, name: string, altText?: string) => {
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          item.aiSuggestedName = name;
          item.aiAltText = altText;
          if (item.compressedName) {
            const ext = item.compressedName.split(".").pop() || "jpg";
            item.compressedName = `${name}.${ext}`;
          }
        }
      });
    },

    aiRenameFile: async (id: string) => {
      const { updateItem, applyAiName } = get();
      // Re-fetch item fresh from state
      const item = get().items.find((i) => i.id === id);
      if (!item || !item.compressedBlob) return;

      updateItem(id, { aiRenameStatus: "loading" });

      try {
        // Use FileReader for reliable base64 (works on all sizes, no btoa issues)
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            // result = "data:image/webp;base64,XXXX..." — strip prefix
            const b64 = result.split(",")[1];
            if (b64) resolve(b64);
            else reject(new Error("FileReader returned empty result"));
          };
          reader.onerror = () => reject(new Error("FileReader failed"));
          reader.readAsDataURL(item.compressedBlob!);
        });

        const mimeType =
          item.compressedFormat === "jpeg" ? "image/jpeg" :
          item.compressedFormat === "png" ? "image/png" :
          item.compressedFormat === "gif" ? "image/gif" :
          item.compressedFormat === "avif" ? "image/avif" : "image/webp";

        const response = await fetch("/api/ai/rename", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ensure session cookies are sent
          body: JSON.stringify({
            imageBase64: base64,
            mimeType,
            currentName: item.originalName,
          }),
        });

        if (!response.ok) {
          const errJson = await response.json().catch(() => ({}));
          console.error("[aiRenameFile] API error:", response.status, errJson);
          throw new Error(errJson.error || `HTTP ${response.status}`);
        }

        const json = await response.json();
        const data = json.data ?? json;
        const filename = data.filename as string | undefined;
        const altText = data.altText as string | undefined;

        if (!filename) throw new Error("No filename in response");

        applyAiName(id, filename, altText);
        updateItem(id, { aiRenameStatus: "done" });
      } catch (err) {
        updateItem(id, { aiRenameStatus: "error" });
        console.error("[aiRenameFile] failed:", err);
      }
    },
  }))
);

function getMimeFormat(mimeType: string): import("@/types/image").ImageFormat {
  const map: Record<string, import("@/types/image").ImageFormat> = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  return map[mimeType] || "jpeg";
}

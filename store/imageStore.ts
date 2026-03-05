"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ProcessedFile, CompressOptions, FileStatus } from "@/types/image";
import { generateId, sanitizeFilename, calculateSavings, getFilenameWithoutExtension } from "@/lib/utils";
import { compressImage } from "@/lib/compress";
import { downloadSingleFile, downloadAllAsZip } from "@/lib/zip";
import { DEFAULT_QUALITY, DEFAULT_CONVERT_WEBP, DEFAULT_AI_RENAME, MAX_FILES_FREE, AI_RENAME_FREE_PER_DAY } from "@/lib/constants";
import { getUsedToday, setUsedToday } from "@/lib/aiRenameCounter";
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
  aiRenameUsedToday: number;
  setAiRenameUsedToday: (n: number) => void;
  initAiRenameCounter: (email: string) => void;
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
    aiRenameUsedToday: 0,

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

    setAiRenameUsedToday: (n: number) => set((state) => { state.aiRenameUsedToday = n; }),

    initAiRenameCounter: (email: string) => {
      const used = getUsedToday(email);
      set((state) => { state.aiRenameUsedToday = used; });
    },

    aiRenameFile: async (id: string) => {
      const { updateItem, applyAiName } = get();
      // Re-fetch item fresh from state
      const item = get().items.find((i) => i.id === id);
      if (!item || !item.compressedBlob) return;

      updateItem(id, { aiRenameStatus: "loading" });

      try {
        // Create a small thumbnail (max 1024px) for sending to Gemini.
        // This ensures fast API calls even for large compressed blobs.
        const thumbnailBlob = await createThumbnailForAI(item.compressedBlob, 1024);

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
          reader.readAsDataURL(thumbnailBlob);
        });

        // Always send as WebP (thumbnail output)
        const mimeType = "image/webp";

        // Read locale from cookie for localized alt text generation
        const localeMatch = typeof document !== "undefined"
          ? document.cookie.match(/(?:^|;)\s*NEXT_LOCALE=([^;]+)/)
          : null;
        const locale = localeMatch ? decodeURIComponent(localeMatch[1]) : "en";

        const response = await fetch("/api/ai/rename", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ensure session cookies are sent
          body: JSON.stringify({
            imageBase64: base64,
            mimeType,
            currentName: item.originalName,
            locale,
          }),
        });

        if (!response.ok) {
          const errJson = await response.json().catch(() => ({})) as { error?: string; code?: string };
          console.error("[aiRenameFile] API error:", response.status, errJson);
          throw new Error(
            (errJson.code ? `${errJson.code}: ` : "") + (errJson.error || `HTTP ${response.status}`)
          );
        }

        const json = await response.json() as { data?: { filename?: string; altText?: string }; remaining?: number };
        const data = json.data ?? {};
        const filename = data.filename;
        const altText = data.altText;

        if (!filename) throw new Error("No filename in response");

        // Update client-side counter from server's authoritative remaining value
        const remaining = (json.remaining as number) ?? (AI_RENAME_FREE_PER_DAY - 1);
        const usedNow = AI_RENAME_FREE_PER_DAY - remaining;
        get().setAiRenameUsedToday(usedNow);

        // Persist to localStorage — resolve email from NextAuth client session
        try {
          const { getSession } = await import("next-auth/react");
          const clientSession = await getSession();
          if (clientSession?.user?.email) {
            setUsedToday(clientSession.user.email, usedNow);
          }
        } catch {
          // Ignore — localStorage sync is best-effort; server enforces the real limit
        }

        applyAiName(id, filename, altText);
        updateItem(id, { aiRenameStatus: "done" });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        // Handle daily limit specifically
        if (errMsg.includes("DAILY_LIMIT_REACHED") || errMsg.includes("Daily limit")) {
          updateItem(id, { aiRenameStatus: "error", aiRenameError: "Daily limit reached — upgrade to Pro for 200/day" });
          get().setAiRenameUsedToday(AI_RENAME_FREE_PER_DAY); // show 0 remaining
          return;
        }
        updateItem(id, { aiRenameStatus: "error", aiRenameError: errMsg });
        console.error("[aiRenameFile] failed:", errMsg);
      }
    },
  }))
);

/** Creates a max-{maxPx}px WebP thumbnail from any blob for AI analysis. */
async function createThumbnailForAI(blob: Blob, maxPx: number): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      let { naturalWidth: w, naturalHeight: h } = img;
      if (w > maxPx || h > maxPx) {
        const ratio = Math.min(maxPx / w, maxPx / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (result) => {
            URL.revokeObjectURL(url);
            resolve(result ?? blob); // fallback to original blob if canvas fails
          },
          "image/webp",
          0.75
        );
      } else {
        URL.revokeObjectURL(url);
        resolve(blob); // fallback
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(blob); // fallback
    };
    img.src = url;
  });
}

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

export type ImageFormat = "jpeg" | "png" | "webp" | "gif" | "avif";

export type FileStatus = "queued" | "processing" | "done" | "error";

export interface CompressOptions {
  quality: number; // 1-100
  convertToWebP: boolean;
  aiRenameEnabled: boolean;
  maxWidthOrHeight?: number;
  removeExif?: boolean;
}

export interface ProcessedFile {
  id: string;
  originalFile: File;
  originalName: string;
  originalSize: number;
  originalFormat: ImageFormat;

  compressedBlob?: Blob;
  compressedSize?: number;
  compressedFormat?: ImageFormat;
  compressedName?: string;

  status: FileStatus;
  progress: number; // 0-100
  errorMessage?: string;

  // AI Rename
  aiSuggestedName?: string;
  aiAltText?: string;
  aiRenameStatus?: "idle" | "loading" | "done" | "error";

  // Preview
  previewUrl?: string;
  compressedPreviewUrl?: string;

  // Computed
  savedBytes?: number;
  savedPercent?: number;
}

export interface FileQueueItem {
  id: string;
  file: File;
  status: FileStatus;
}

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercent: number;
  format: ImageFormat;
}

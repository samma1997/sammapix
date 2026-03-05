import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function sanitizeFilename(name: string): string {
  // Remove directory traversal, XSS chars, control chars
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/^\./, "")
    .trim()
    .slice(0, 255);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : "";
}

export function getFilenameWithoutExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot > 0 ? filename.slice(0, lastDot) : filename;
}

export function getMimeType(file: File): string {
  return file.type || "application/octet-stream";
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  return validTypes.includes(file.type);
}

export function calculateSavings(original: number, compressed: number): {
  savedBytes: number;
  savedPercent: number;
} {
  const savedBytes = original - compressed;
  const savedPercent = original > 0 ? Math.round((savedBytes / original) * 100) : 0;
  return { savedBytes, savedPercent };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * File preview extraction utilities for the AI Organize tool.
 * Handles thumbnail generation and text extraction for all supported file types.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type FileKind =
  | "image"
  | "document"
  | "video"
  | "audio"
  | "text"
  | "code"
  | "spreadsheet"
  | "presentation";

export interface FilePreviewData {
  kind: FileKind;
  extension: string;
  thumbnailUrl: string | null;
  textPreview: string | null;
}

// ─── Constants ──────────────────────────────────────────────────────────────

export const ACCEPTED_TYPES: Record<string, string[]> = {
  "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff", ".svg", ".heic", ".heif"],
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "text/*": [".txt", ".md", ".csv", ".json", ".xml", ".html", ".css", ".js", ".py", ".ts"],
  "video/*": [".mp4", ".mov", ".webm", ".avi"],
  "audio/*": [".mp3", ".wav", ".m4a", ".ogg"],
};

export const KIND_BADGE_COLORS: Record<FileKind, string> = {
  image: "#22C55E",
  document: "#3B82F6",
  video: "#8B5CF6",
  audio: "#F97316",
  text: "#737373",
  code: "#737373",
  spreadsheet: "#16A34A",
  presentation: "#EC4899",
};

export const KIND_LABELS: Record<FileKind, string> = {
  image: "Image",
  document: "Document",
  video: "Video",
  audio: "Audio",
  text: "Text",
  code: "Code",
  spreadsheet: "Spreadsheet",
  presentation: "Presentation",
};

const CODE_EXTENSIONS = new Set([".js", ".ts", ".jsx", ".tsx", ".py", ".css", ".html", ".xml", ".json"]);
const TEXT_EXTENSIONS = new Set([".txt", ".md", ".csv"]);

// ─── File Kind Detection ────────────────────────────────────────────────────

export function detectFileKind(file: File): { kind: FileKind; extension: string } {
  const ext = ("." + (file.name.split(".").pop()?.toLowerCase() ?? "")).toLowerCase();

  if (file.type.startsWith("image/") || [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff", ".svg", ".heic", ".heif"].includes(ext)) {
    return { kind: "image", extension: ext };
  }
  if (file.type.startsWith("video/") || [".mp4", ".mov", ".webm", ".avi"].includes(ext)) {
    return { kind: "video", extension: ext };
  }
  if (file.type.startsWith("audio/") || [".mp3", ".wav", ".m4a", ".ogg"].includes(ext)) {
    return { kind: "audio", extension: ext };
  }
  if (ext === ".pdf") return { kind: "document", extension: ext };
  if (ext === ".docx") return { kind: "document", extension: ext };
  if (ext === ".xlsx") return { kind: "spreadsheet", extension: ext };
  if (ext === ".pptx") return { kind: "presentation", extension: ext };
  if (CODE_EXTENSIONS.has(ext)) return { kind: "code", extension: ext };
  if (TEXT_EXTENSIONS.has(ext)) return { kind: "text", extension: ext };

  if (file.type.startsWith("text/")) return { kind: "text", extension: ext };
  return { kind: "document", extension: ext };
}

// ─── Preview Extraction ─────────────────────────────────────────────────────

export async function extractImageThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export async function extractPdfThumbnail(file: File): Promise<string | null> {
  try {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.5 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
    return canvas.toDataURL("image/jpeg", 0.7);
  } catch {
    return null;
  }
}

export async function extractVideoThumbnail(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;

      const url = URL.createObjectURL(file);
      video.src = url;

      video.onloadeddata = () => {
        video.currentTime = Math.min(1, video.duration * 0.1);
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = Math.min(video.videoWidth, 512);
        canvas.height = Math.round(
          (canvas.width / video.videoWidth) * video.videoHeight
        );
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(null);
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        URL.revokeObjectURL(url);
        resolve(dataUrl);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };

      setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve(null);
      }, 10000);
    } catch {
      resolve(null);
    }
  });
}

export async function extractDocxText(file: File): Promise<string | null> {
  try {
    const JSZipMod = (await import("jszip")).default;
    const zip = await JSZipMod.loadAsync(await file.arrayBuffer());
    const docXml = zip.file("word/document.xml");
    if (!docXml) return null;
    const xml = await docXml.async("string");
    const text = xml
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, 1000);
  } catch {
    return null;
  }
}

export async function extractXlsxText(file: File): Promise<string | null> {
  try {
    const JSZipMod = (await import("jszip")).default;
    const zip = await JSZipMod.loadAsync(await file.arrayBuffer());

    let sharedStrings: string[] = [];
    const ssFile = zip.file("xl/sharedStrings.xml");
    if (ssFile) {
      const ssXml = await ssFile.async("string");
      const matches = ssXml.match(/<t[^>]*>([^<]+)<\/t>/g);
      if (matches) {
        sharedStrings = matches.map((m) =>
          m.replace(/<[^>]+>/g, "").trim()
        );
      }
    }

    const sheetFile = zip.file("xl/worksheets/sheet1.xml");
    if (!sheetFile) return sharedStrings.slice(0, 50).join(" | ");
    const sheetXml = await sheetFile.async("string");

    const cellValues: string[] = [];
    const cellMatches = sheetXml.match(/<c[^>]*>[\s\S]*?<\/c>/g);
    if (cellMatches) {
      for (const cell of cellMatches.slice(0, 100)) {
        const isShared = cell.includes('t="s"');
        const valMatch = cell.match(/<v>(\d+)<\/v>/);
        if (valMatch) {
          if (isShared && sharedStrings[Number(valMatch[1])]) {
            cellValues.push(sharedStrings[Number(valMatch[1])]);
          } else {
            cellValues.push(valMatch[1]);
          }
        }
      }
    }

    return cellValues.length > 0
      ? cellValues.slice(0, 50).join(" | ")
      : sharedStrings.slice(0, 50).join(" | ");
  } catch {
    return null;
  }
}

export async function extractPptxText(file: File): Promise<string | null> {
  try {
    const JSZipMod = (await import("jszip")).default;
    const zip = await JSZipMod.loadAsync(await file.arrayBuffer());
    const texts: string[] = [];

    for (let i = 1; i <= 10; i++) {
      const slideFile = zip.file(`ppt/slides/slide${i}.xml`);
      if (!slideFile) break;
      const slideXml = await slideFile.async("string");
      const text = slideXml
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (text.length > 0) texts.push(text);
    }

    return texts.join(" --- ").slice(0, 1000) || null;
  } catch {
    return null;
  }
}

export async function extractTextContent(file: File): Promise<string | null> {
  try {
    const text = await file.text();
    return text.slice(0, 1000);
  } catch {
    return null;
  }
}

// ─── Build Preview ──────────────────────────────────────────────────────────

export async function buildFilePreview(file: File): Promise<FilePreviewData> {
  const { kind, extension } = detectFileKind(file);
  let thumbnailUrl: string | null = null;
  let textPreview: string | null = null;

  switch (kind) {
    case "image":
      thumbnailUrl = await extractImageThumbnail(file);
      break;
    case "video":
      thumbnailUrl = await extractVideoThumbnail(file);
      break;
    case "document":
      if (extension === ".pdf") {
        thumbnailUrl = await extractPdfThumbnail(file);
      } else if (extension === ".docx") {
        textPreview = await extractDocxText(file);
      }
      break;
    case "spreadsheet":
      textPreview = await extractXlsxText(file);
      break;
    case "presentation":
      textPreview = await extractPptxText(file);
      break;
    case "text":
    case "code":
      textPreview = await extractTextContent(file);
      break;
    case "audio":
      break;
  }

  return { kind, extension, thumbnailUrl, textPreview };
}

// ─── Fingerprinting ─────────────────────────────────────────────────────────

export async function computeFingerprint(
  file: File,
  kind: FileKind,
  textPreview: string | null
): Promise<string> {
  if (kind === "image" || kind === "video") {
    const buffer = await file.arrayBuffer();
    const view = new Uint8Array(buffer.slice(0, 64));
    let hash = "";
    for (let i = 0; i < 8; i++) {
      hash += (view[i % view.length] ?? 0).toString(16).padStart(2, "0");
    }
    return hash;
  }

  if (textPreview) {
    const content = textPreview.slice(0, 500).toLowerCase().replace(/\s+/g, " ").trim();
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      hash = ((hash << 5) - hash + content.charCodeAt(i)) | 0;
    }
    return `txt-${hash.toString(16)}`;
  }

  const buffer = await file.arrayBuffer();
  const view = new Uint8Array(buffer.slice(0, 64));
  let hash = "";
  for (let i = 0; i < 8; i++) {
    hash += (view[i % view.length] ?? 0).toString(16).padStart(2, "0");
  }
  return hash;
}

// ─── AI Analysis ────────────────────────────────────────────────────────────

export interface AnalysisResult {
  category: string;
  confidence: number;
  suggestedName: string;
}

export async function analyzeFileWithAI(
  file: File,
  kind: FileKind,
  extension: string,
  thumbnailUrl: string | null,
  textPreview: string | null,
  fileName: string
): Promise<AnalysisResult> {
  const isVisual = kind === "image" || kind === "video";

  if (isVisual && thumbnailUrl) {
    const base64 = thumbnailUrl.split(",")[1] ?? "";
    const res = await fetch("/api/ai/organize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "image",
        content: base64,
        filename: fileName,
      }),
    });

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(errorData.error ?? `HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
      category: string;
      suggestedName: string;
      confidence: number;
    };

    return {
      category: data.category,
      suggestedName: `${data.suggestedName}${extension}`,
      confidence: data.confidence,
    };
  }

  let textContent = textPreview ?? "";
  if (!textContent && kind !== "audio") {
    try {
      const text = await file.text();
      textContent = text.slice(0, 1000);
    } catch {
      textContent = "";
    }
  }

  const res = await fetch("/api/ai/organize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "text",
      content: textContent || `[${kind} file, no content preview available]`,
      filename: fileName,
    }),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(errorData.error ?? `HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    category: string;
    suggestedName: string;
    confidence: number;
  };

  return {
    category: data.category,
    suggestedName: `${data.suggestedName}${extension}`,
    confidence: data.confidence,
  };
}

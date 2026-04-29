"use client";

export interface AiRenameStepOptions {
  locale?: string;
  /** Optional PRO-only directive — biases the AI toward a specific naming style. */
  customDirective?: string;
}

export interface AiRenameResult {
  filename: string;
  altText?: string;
}

/**
 * Convert file to base64 for the AI rename API.
 */
async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return {
    base64: btoa(binary),
    mimeType: file.type || "image/jpeg",
  };
}

/**
 * Call the /api/ai/rename endpoint with base64 image data.
 * Returns the AI-suggested filename (without extension) and optional alt text.
 */
export async function runAiRenameStep(
  originalFile: File,
  currentName: string,
  options?: AiRenameStepOptions
): Promise<AiRenameResult> {
  // Resize to thumbnail for AI (max 512px, keeps quality, reduces upload size)
  const canvas = document.createElement("canvas");
  const img = await createImageBitmap(originalFile);
  const MAX = 512;
  const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
  canvas.width = Math.round(img.width * ratio);
  canvas.height = Math.round(img.height * ratio);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  img.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/jpeg",
      0.8
    );
  });

  const thumbFile = new File([blob], originalFile.name, { type: "image/jpeg" });
  const { base64, mimeType } = await fileToBase64(thumbFile);

  const res = await fetch("/api/ai/rename", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      imageBase64: base64,
      mimeType,
      locale: options?.locale ?? "en",
      ...(options?.customDirective ? { customDirective: options.customDirective } : {}),
    }),
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(json.error ?? `AI rename failed (${res.status})`);
  }

  const json = (await res.json()) as {
    name?: string;
    filename?: string;
    data?: { filename?: string; altText?: string };
  };

  // Support both response shapes (direct or wrapped in data)
  const rawName =
    json.data?.filename ?? json.name ?? json.filename ?? currentName;
  const altText = json.data?.altText;

  // Strip any extension the API may have returned
  const filename = rawName.replace(/\.[^.]+$/, "");

  return { filename, altText };
}

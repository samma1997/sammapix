"use client";

export interface AiRenameStepOptions {
  locale?: string;
}

export interface AiRenameResult {
  filename: string;
  altText?: string;
}

/**
 * Call the /api/ai/rename endpoint with a FormData-based file upload.
 * Returns the AI-suggested filename (without extension) and optional alt text.
 */
export async function runAiRenameStep(
  originalFile: File,
  currentName: string,
  options?: AiRenameStepOptions
): Promise<AiRenameResult> {
  const formData = new FormData();
  formData.append("file", originalFile);

  const res = await fetch("/api/ai/rename", {
    method: "POST",
    body: formData,
    credentials: "include",
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

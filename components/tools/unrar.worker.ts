/**
 * unrar.worker.ts
 * Web Worker that handles RAR extraction via node-unrar-js (WASM).
 * Runs off the main thread to avoid blocking the UI on large archives.
 *
 * Messages IN  → { type: "extract" | "listonly", buffer: ArrayBuffer, password?: string }
 * Messages OUT → { type: "filelist" | "file" | "done" | "error" | "needs_password" }
 *
 * "listonly" → posts "filelist" then stops (no extraction). Used by the gate
 *              to show the file list before requiring payment on large archives.
 */

export {};

interface ExtractMessage {
  type: "extract" | "listonly";
  buffer: ArrayBuffer;
  password?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWorkerMessage = ExtractMessage;

// Local types for extracted content
interface RarEntry {
  name: string;
  size: number;
  fileContent?: Uint8Array;
}

self.onmessage = async (event: MessageEvent<AnyWorkerMessage>) => {
  if (event.data.type !== "extract" && event.data.type !== "listonly") return;

  const { buffer, password } = event.data;
  const listOnly = event.data.type === "listonly";

  try {
    // Lazy-load the WASM extractor only when needed.
    //
    // IMPORTANTE: non lasciare che node-unrar-js risolva il path del .wasm
    // autonomamente: in produzione Vercel i chunk JS vengono serviti da un
    // URL con hash (es. /_next/static/chunks/...) e il `locateFile` di
    // Emscripten cerca unrar.wasm in quella stessa directory → 404.
    //
    // Soluzione: fetch esplicito da /unrar.wasm (same-origin, file in public/)
    // e passaggio del binario tramite il campo `wasmBinary` supportato
    // nativamente dall'API di node-unrar-js v2 (→ Module["wasmBinary"]).
    const { createExtractorFromData } = await import("node-unrar-js");

    const wasmResponse = await fetch("/unrar.wasm");
    if (!wasmResponse.ok) {
      throw new Error(
        `Impossibile caricare unrar.wasm: HTTP ${wasmResponse.status}`
      );
    }
    const wasmBinary = await wasmResponse.arrayBuffer();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractor: any = await createExtractorFromData({
      wasmBinary,
      data: buffer,
      password: password ?? undefined,
    });

    // First pass — list files (check for password requirement)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fileList: any[];
    try {
      const listResult = extractor.getFileList();
      fileList = [...listResult.fileHeaders];
    } catch (listErr: unknown) {
      const msg = listErr instanceof Error ? listErr.message : String(listErr);
      // RAR encrypted headers — can't even list without password
      if (
        msg.includes("password") ||
        msg.includes("ERAR_MISSING_PASSWORD") ||
        msg.includes("BAD_DATA")
      ) {
        self.postMessage({ type: "needs_password" });
        return;
      }
      throw listErr;
    }

    // Filter out directory entries
    const entries: RarEntry[] = fileList
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((h: any) => !h.name.endsWith("/") && !h.name.endsWith("\\"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((h: any) => ({
        name: h.name,
        size: h.unpSize,
      }));

    // Send file list to UI so user can see it immediately
    self.postMessage({ type: "filelist", entries });

    // If only listing was requested (gate preview), stop here
    if (listOnly) {
      self.postMessage({ type: "done" });
      return;
    }

    // Second pass — extract all files
    const total = entries.length;
    let done = 0;

    try {
      const extracted = extractor.extract({ password: password ?? undefined });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extractedEntries: any[] = [...extracted.files];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const entry of extractedEntries) {
        const { fileHeader, extraction } = entry;
        // Skip directories
        if (
          fileHeader.name.endsWith("/") ||
          fileHeader.name.endsWith("\\")
        ) {
          continue;
        }

        const bytes: Uint8Array = extraction ?? new Uint8Array(0);

        // Transfer the buffer for zero-copy
        const transferable = bytes.buffer.slice(
          bytes.byteOffset,
          bytes.byteOffset + bytes.byteLength
        ) as ArrayBuffer;

        done++;
        self.postMessage(
          {
            type: "file",
            name: fileHeader.name,
            size: fileHeader.unpSize,
            buffer: transferable,
            progress: Math.round((done / total) * 100),
          },
          [transferable]
        );
      }
    } catch (extractErr: unknown) {
      const msg =
        extractErr instanceof Error ? extractErr.message : String(extractErr);
      if (
        msg.includes("password") ||
        msg.includes("ERAR_MISSING_PASSWORD") ||
        msg.includes("BAD_DATA")
      ) {
        self.postMessage({ type: "needs_password" });
        return;
      }
      throw extractErr;
    }

    self.postMessage({ type: "done" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown extraction error";
    self.postMessage({ type: "error", message });
  }
};

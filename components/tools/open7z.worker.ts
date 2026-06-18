/**
 * open7z.worker.ts
 * Web Worker that handles .7z extraction via 7z-wasm (Emscripten/WASM).
 * Runs off the main thread to avoid blocking the UI on large archives.
 *
 * Messages IN  -> { type: "extract" | "listonly", buffer: ArrayBuffer, password?: string }
 * Messages OUT -> { type: "filelist" | "file" | "done" | "error" | "needs_password" }
 *
 * "listonly" -> posts "filelist" then stops (used by the 200 MB gate).
 *
 * IMPORTANT — WASM loading strategy (same as unrar.worker.ts):
 *   7z-wasm uses Emscripten locateFile to find 7zz.wasm. In production on
 *   Vercel the JS chunk URL has a hash, so Emscripten looks for the .wasm
 *   next to the hash-named chunk -> 404. Solution: fetch /7zz.wasm explicitly
 *   (served from public/) and pass as wasmBinary to the factory — Emscripten
 *   honours this and skips its own locateFile resolution entirely.
 */

export {};

interface ExtractMessage {
  type: "extract" | "listonly";
  buffer: ArrayBuffer;
  password?: string;
}

type AnyWorkerMessage = ExtractMessage;

interface SevenZEntry {
  name: string;
  size: number;
  buffer?: ArrayBuffer;
}

// Recursively walk Emscripten FS and collect all non-directory entries.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function walkFS(FS: any, dir: string): SevenZEntry[] {
  const results: SevenZEntry[] = [];
  let items: string[] = [];
  try {
    items = FS.readdir(dir).filter((f: string) => f !== "." && f !== "..");
  } catch {
    return results;
  }
  for (const item of items) {
    const fullPath = `${dir}/${item}`;
    try {
      const stat = FS.stat(fullPath);
      if (FS.isDir(stat.mode)) {
        results.push(...walkFS(FS, fullPath));
      } else {
        const data: Uint8Array = FS.readFile(fullPath);
        // Path relative to the output root for display
        const relPath = fullPath.replace("/output/", "");
        // Copy buffer to avoid Emscripten heap-shrink invalidation
        const transferable = data.buffer.slice(
          data.byteOffset,
          data.byteOffset + data.byteLength
        ) as ArrayBuffer;
        results.push({ name: relPath, size: data.length, buffer: transferable });
      }
    } catch {
      // skip unreadable entries
    }
  }
  return results;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFileList(FS: any, dir: string): Array<{ name: string; size: number }> {
  const entries: Array<{ name: string; size: number }> = [];
  let items: string[] = [];
  try {
    items = FS.readdir(dir).filter((f: string) => f !== "." && f !== "..");
  } catch {
    return entries;
  }
  for (const item of items) {
    const fullPath = `${dir}/${item}`;
    try {
      const stat = FS.stat(fullPath);
      if (FS.isDir(stat.mode)) {
        entries.push(...buildFileList(FS, fullPath));
      } else {
        const relPath = fullPath.replace("/output/", "");
        entries.push({ name: relPath, size: stat.size });
      }
    } catch {
      // skip
    }
  }
  return entries;
}

self.onmessage = async (event: MessageEvent<AnyWorkerMessage>) => {
  if (event.data.type !== "extract" && event.data.type !== "listonly") return;

  const { buffer, password } = event.data;
  const listOnly = event.data.type === "listonly";

  try {
    // Dynamic import with webpackIgnore so webpack does not attempt to bundle
    // 7z-wasm (it references Node.js built-ins like 'module'/'fs' which break
    // the browser bundle). The module is loaded at runtime by the Worker's own
    // module resolution — it works fine in Workers and the browser because the
    // es6 bundle detects ENVIRONMENT_IS_WORKER and skips the Node code path.
    //
    // The /* webpackIgnore: true */ comment is the standard Next.js/webpack way
    // to exclude a module from static analysis without losing lazy loading.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sevenZipFactory: (opts: any) => Promise<any> = (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore — webpackIgnore prevents bundling; runtime import works fine
      await import(/* webpackIgnore: true */ "7z-wasm")
    ).default;

    // Fetch the WASM from public/ (same-origin, no CORS, Vercel-safe).
    const wasmResponse = await fetch("/7zz.wasm");
    if (!wasmResponse.ok) {
      throw new Error(`Cannot load 7zz.wasm: HTTP ${wasmResponse.status}`);
    }
    const wasmBinary = await wasmResponse.arrayBuffer();

    // Suppress Emscripten stdout/stderr noise in console.
    const sevenZip = await sevenZipFactory({
      wasmBinary,
      print:    () => { /* suppress */ },
      printErr: () => { /* suppress */ },
    });

    const { FS } = sevenZip;

    // Write the archive into the Emscripten virtual filesystem.
    FS.writeFile("/archive.7z", new Uint8Array(buffer));

    // Prepare output directory.
    try { FS.mkdir("/output"); } catch { /* already exists */ }

    // Build the 7z command. 7z-wasm uses the same CLI as 7-Zip.
    // "x" = extract with full paths. "-y" = yes to all prompts.
    // "-p{pwd}" = password (only added when supplied).
    const args = ["x", "/archive.7z", "-o/output", "-y"];
    if (password) {
      args.push(`-p${password}`);
    }

    // Capture exit / error output to detect password issues.
    let errOutput = "";
    const sevenZipCheck = await sevenZipFactory({
      wasmBinary,
      print:    () => { /* suppress */ },
      printErr: (str: string) => { errOutput += str + "\n"; },
    });
    sevenZipCheck.FS.writeFile("/archive.7z", new Uint8Array(buffer.slice(0)));
    try { sevenZipCheck.FS.mkdir("/output"); } catch { /* ok */ }
    sevenZipCheck.callMain(["t", "/archive.7z", "-y", ...(password ? [`-p${password}`] : [])]);

    // Detect password requirement:
    // 7-Zip exits with code 2 and prints "Wrong password?" on encrypted archives.
    if (
      errOutput.includes("Wrong password") ||
      errOutput.includes("ERRORS:") && errOutput.includes("ncrypt") ||
      errOutput.includes("Can not open encrypted archive")
    ) {
      self.postMessage({ type: "needs_password" });
      return;
    }

    if (listOnly) {
      // Extract first to get sizes, then report list without sending buffers.
      sevenZip.callMain(args);
      const entries = buildFileList(FS, "/output");
      if (entries.length === 0) {
        // Might be password-protected — test failed silently.
        self.postMessage({ type: "needs_password" });
        return;
      }
      self.postMessage({ type: "filelist", entries });
      self.postMessage({ type: "done" });
      return;
    }

    // Full extraction.
    sevenZip.callMain(args);

    const extracted = walkFS(FS, "/output");

    if (extracted.length === 0) {
      // Encrypted archive with wrong/missing password.
      self.postMessage({ type: "needs_password" });
      return;
    }

    // First send the file list so the UI can show it immediately.
    const fileList = extracted.map(e => ({ name: e.name, size: e.size }));
    self.postMessage({ type: "filelist", entries: fileList });

    // Then stream each file to the main thread using Transferable.
    const total = extracted.length;
    for (let i = 0; i < total; i++) {
      const entry = extracted[i];
      self.postMessage(
        {
          type:     "file",
          name:     entry.name,
          size:     entry.size,
          buffer:   entry.buffer,
          progress: Math.round(((i + 1) / total) * 100),
        },
        [entry.buffer as ArrayBuffer]
      );
    }

    self.postMessage({ type: "done" });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown extraction error";
    self.postMessage({ type: "error", message });
  }
};

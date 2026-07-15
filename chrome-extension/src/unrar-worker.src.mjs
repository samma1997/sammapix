// Extension unrar worker — bundled with esbuild. Mirrors the site's working logic.
// IN:  { type:"extract", buffer:ArrayBuffer, password?:string, wasmUrl:string }
// OUT: filelist | file | done | needs_password | error
import { createExtractorFromData } from "node-unrar-js";

self.onmessage = async (event) => {
  const data = event.data || {};
  if (data.type !== "extract") return;
  const { buffer, password, wasmUrl } = data;
  try {
    const wasmResp = await fetch(wasmUrl);
    if (!wasmResp.ok) throw new Error("wasm HTTP " + wasmResp.status);
    const wasmBinary = await wasmResp.arrayBuffer();

    const extractor = await createExtractorFromData({
      wasmBinary,
      data: buffer,
      password: password || undefined,
    });

    let fileList;
    try {
      fileList = [...extractor.getFileList().fileHeaders];
    } catch (listErr) {
      const msg = String((listErr && listErr.message) || listErr);
      if (/password|ERAR_MISSING_PASSWORD|BAD_DATA/i.test(msg)) {
        self.postMessage({ type: "needs_password" });
        return;
      }
      throw listErr;
    }

    const entries = fileList
      .filter((h) => !h.name.endsWith("/") && !h.name.endsWith("\\"))
      .map((h) => ({ name: h.name, size: h.unpSize }));
    self.postMessage({ type: "filelist", entries });

    const total = entries.length || 1;
    let done = 0;
    try {
      const extracted = extractor.extract({ password: password || undefined });
      const list = [...extracted.files];
      for (const entry of list) {
        const { fileHeader, extraction } = entry;
        if (fileHeader.name.endsWith("/") || fileHeader.name.endsWith("\\")) continue;
        const bytes = extraction || new Uint8Array(0);
        const transferable = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
        done++;
        self.postMessage(
          { type: "file", name: fileHeader.name, size: fileHeader.unpSize, buffer: transferable, progress: Math.round((done / total) * 100) },
          [transferable]
        );
      }
    } catch (extractErr) {
      const msg = String((extractErr && extractErr.message) || extractErr);
      if (/password|ERAR_MISSING_PASSWORD|BAD_DATA/i.test(msg)) {
        self.postMessage({ type: "needs_password" });
        return;
      }
      throw extractErr;
    }
    self.postMessage({ type: "done" });
  } catch (err) {
    self.postMessage({ type: "error", message: String((err && err.message) || "Extraction failed") });
  }
};

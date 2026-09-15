/**
 * Server-side PDF operations, powered by pdf-lib.
 *
 * Pure Buffer-in / Buffer-out, zero-retention, shared by the REST API and MCP.
 * PDFs are not images, so these ops are NOT chainable in the image pipeline;
 * they are exposed as standalone operations.
 */

import { PDFDocument, degrees } from "pdf-lib";
import sharp from "sharp";
import { ApiOpError } from "@/lib/server-ops/image";
import { MAX_PDF_FILES, MAX_PDF_PAGES, SAFE_SHARP } from "@/lib/api/limits";

export interface PdfResult {
  buffer: Buffer;
  contentType: "application/pdf";
  info: { pages: number; bytes: number };
}

function pdfResult(bytes: Uint8Array, pages: number): PdfResult {
  const buffer = Buffer.from(bytes);
  return { buffer, contentType: "application/pdf", info: { pages, bytes: buffer.length } };
}

/**
 * Compress a PDF by rewriting it with object streams and dropping metadata.
 * (pdf-lib does not resample embedded images, so gains vary; honest about it.)
 */
export async function pdfCompress(input: Buffer): Promise<PdfResult> {
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(input, { updateMetadata: false });
  } catch {
    throw new ApiOpError("not a valid PDF");
  }
  // Strip metadata to shave bytes
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("");
  doc.setCreator("");
  const bytes = await doc.save({ useObjectStreams: true });
  return pdfResult(bytes, doc.getPageCount());
}

/** Merge multiple PDFs (in order) into a single document. */
export async function pdfMerge(inputs: Buffer[]): Promise<PdfResult> {
  if (inputs.length < 2) throw new ApiOpError("pdf-merge needs at least 2 files");
  if (inputs.length > MAX_PDF_FILES) throw new ApiOpError(`pdf-merge accepts at most ${MAX_PDF_FILES} files`);
  const out = await PDFDocument.create();
  let totalPages = 0;
  for (const [i, buf] of inputs.entries()) {
    let src: PDFDocument;
    try {
      src = await PDFDocument.load(buf);
    } catch {
      throw new ApiOpError(`file ${i + 1} is not a valid PDF`);
    }
    totalPages += src.getPageCount();
    if (totalPages > MAX_PDF_PAGES) throw new ApiOpError(`merged PDF would exceed ${MAX_PDF_PAGES} pages`);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const bytes = await out.save({ useObjectStreams: true });
  return pdfResult(bytes, out.getPageCount());
}

/** Parse "1-3,5,8-9" (1-based) into a 0-based index list, bounded to `total`. */
function parsePages(spec: string, total: number): number[] {
  const out: number[] = [];
  for (const part of String(spec).split(",")) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const a = Math.max(1, parseInt(m[1], 10));
      const b = Math.min(total, parseInt(m[2], 10));
      for (let i = a; i <= b; i++) out.push(i - 1);
    } else if (/^\d+$/.test(p)) {
      const i = parseInt(p, 10);
      if (i >= 1 && i <= total) out.push(i - 1);
    }
  }
  return [...new Set(out)];
}

/** Extract a subset of pages (e.g. "1-3,5") into a new PDF. */
export async function pdfSplit(input: Buffer, spec: string): Promise<PdfResult> {
  let src: PDFDocument;
  try {
    src = await PDFDocument.load(input);
  } catch {
    throw new ApiOpError("not a valid PDF");
  }
  const idx = parsePages(spec || "1", src.getPageCount());
  if (idx.length === 0) throw new ApiOpError("no valid pages selected (use e.g. \"1-3,5\")");
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, idx);
  pages.forEach((p) => out.addPage(p));
  return pdfResult(await out.save({ useObjectStreams: true }), out.getPageCount());
}

/** Rotate every page by a multiple of 90 degrees. */
export async function pdfRotate(input: Buffer, angle: number): Promise<PdfResult> {
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(input);
  } catch {
    throw new ApiOpError("not a valid PDF");
  }
  const a = ((Math.round((angle || 90) / 90) * 90) % 360 + 360) % 360;
  for (const page of doc.getPages()) {
    page.setRotation(degrees((page.getRotation().angle + a) % 360));
  }
  return pdfResult(await doc.save({ useObjectStreams: true }), doc.getPageCount());
}

/** Build a PDF from one or more images (one image per page). */
export async function imagesToPdf(inputs: Buffer[]): Promise<PdfResult> {
  if (inputs.length === 0) throw new ApiOpError("image-to-pdf needs at least 1 image");
  if (inputs.length > MAX_PDF_FILES) throw new ApiOpError(`at most ${MAX_PDF_FILES} images`);
  const doc = await PDFDocument.create();
  for (const buf of inputs) {
    // Normalise any input format to PNG so pdf-lib can embed it reliably.
    const png = await sharp(buf, SAFE_SHARP).png().toBuffer();
    const meta = await sharp(png).metadata();
    const img = await doc.embedPng(png);
    const page = doc.addPage([meta.width ?? 800, meta.height ?? 600]);
    page.drawImage(img, { x: 0, y: 0, width: meta.width ?? 800, height: meta.height ?? 600 });
  }
  return pdfResult(await doc.save({ useObjectStreams: true }), doc.getPageCount());
}

/** Read a PDF's page count and per-page sizes (JSON, no file out). */
export async function pdfInfo(input: Buffer): Promise<Record<string, unknown>> {
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(input);
  } catch {
    throw new ApiOpError("not a valid PDF");
  }
  const pages = doc.getPages().map((p, i) => ({ page: i + 1, width: Math.round(p.getWidth()), height: Math.round(p.getHeight()) }));
  return { pages: doc.getPageCount(), bytes: input.length, title: doc.getTitle() ?? undefined, sizes: pages.slice(0, 50) };
}

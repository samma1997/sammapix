/**
 * Server-side PDF operations, powered by pdf-lib.
 *
 * Pure Buffer-in / Buffer-out, zero-retention, shared by the REST API and MCP.
 * PDFs are not images, so these ops are NOT chainable in the image pipeline;
 * they are exposed as standalone operations.
 */

import { PDFDocument } from "pdf-lib";
import { ApiOpError } from "@/lib/server-ops/image";

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
  const out = await PDFDocument.create();
  for (const [i, buf] of inputs.entries()) {
    let src: PDFDocument;
    try {
      src = await PDFDocument.load(buf);
    } catch {
      throw new ApiOpError(`file ${i + 1} is not a valid PDF`);
    }
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const bytes = await out.save({ useObjectStreams: true });
  return pdfResult(bytes, out.getPageCount());
}

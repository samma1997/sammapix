/**
 * MCP tool definitions for the SammaPix server.
 *
 * One source of truth for tools/list AND tools/call. Each tool reuses the
 * same server-ops as the REST API, so behaviour is identical across channels.
 * Images travel as base64 (safe, no SSRF); URL input arrives in a later phase
 * once the SSRF defense is in place.
 *
 * Naming: `sammapix_*` prefix, action-oriented, so agents discover the right
 * tool quickly.
 */

import { runImageOp, runPipeline, pipelineCost, isImageOp, type ImageOp, type PipelineStep } from "@/lib/server-ops/run";
import * as pdf from "@/lib/server-ops/pdf";
import * as img from "@/lib/server-ops/image";
import { assertFileSize } from "@/lib/api/limits";
import { OP_COST } from "@/lib/api/meter";
import { fetchRemoteFile } from "@/lib/api/fetch-image";

export interface McpToolResult {
  /** base64 of the produced file (absent for metadata). */
  base64?: string;
  mimeType?: string;
  /** structured info returned to the agent. */
  info: Record<string, unknown>;
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; destructiveHint: boolean; idempotentHint: boolean; openWorldHint: boolean };
  cost: (args: Record<string, unknown>) => number;
  run: (args: Record<string, unknown>) => Promise<McpToolResult>;
}

// ── helpers ──────────────────────────────────────────────────────────────

/** Acquire the source image from base64 or a URL (SSRF-safe). */
async function acquireImage(args: Record<string, unknown>): Promise<Buffer> {
  const url = args.imageUrl;
  if (typeof url === "string" && url) {
    return fetchRemoteFile(url); // validates size + blocks internal hosts
  }
  const b64 = args.imageBase64;
  if (typeof b64 !== "string" || !b64) throw new img.ApiOpError('provide "imageBase64" or "imageUrl"');
  const raw = b64.includes(",") ? b64.split(",")[1] : b64;
  const buf = Buffer.from(raw, "base64");
  if (buf.length < 10) throw new img.ApiOpError("imageBase64 is not a valid image");
  assertFileSize(buf.length);
  return buf;
}

const IMG_INPUT = {
  imageBase64: { type: "string", description: "Source image as base64 (raw or data URL). Max 20MB. Use this OR imageUrl." },
  imageUrl: { type: "string", description: "Public URL of the source image (fetched securely). Use this OR imageBase64." },
};
const QUALITY = { quality: { type: "number", minimum: 1, maximum: 100, description: "Output quality 1-100 (optional)." } };

function imageResult(r: img.OpResult): McpToolResult {
  return { base64: r.buffer.toString("base64"), mimeType: r.contentType, info: { format: r.info.format, width: r.info.width, height: r.info.height, bytes: r.info.bytes } };
}

async function runImg(op: ImageOp, args: Record<string, unknown>): Promise<McpToolResult> {
  return imageResult(await runImageOp(op, await acquireImage(args), args));
}

const RO = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const RW = { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false };

/** Compact factory for a chainable image tool (base64 or imageUrl in, image out). */
function imageTool(name: string, op: ImageOp, description: string, extraProps: Record<string, unknown>): McpTool {
  return {
    name,
    description: `${description} Returns the processed image (base64).`,
    inputSchema: { type: "object", properties: { ...IMG_INPUT, ...extraProps, ...QUALITY }, required: [] },
    annotations: RW,
    cost: () => OP_COST[op],
    run: (a) => runImg(op, a),
  };
}

function decodePdf(a: Record<string, unknown>): Buffer {
  const b64 = a.pdfBase64;
  if (typeof b64 !== "string" || !b64) throw new img.ApiOpError('"pdfBase64" is required');
  const buf = Buffer.from(b64.includes(",") ? b64.split(",")[1] : b64, "base64");
  assertFileSize(buf.length);
  return buf;
}

function pdfResult(out: { buffer: Buffer; contentType: string; info: { pages: number; bytes: number } }): McpToolResult {
  return { base64: out.buffer.toString("base64"), mimeType: out.contentType, info: { pages: out.info.pages, bytes: out.info.bytes } };
}

// ── tools ──────────────────────────────────────────────────────────────

export const MCP_TOOLS: McpTool[] = [
  {
    name: "sammapix_compress",
    description: "Compress an image to reduce file size while keeping its format. Returns the compressed image (base64).",
    inputSchema: { type: "object", properties: { ...IMG_INPUT, ...QUALITY, maxWidthOrHeight: { type: "number", description: "Optionally cap the longest side (px)." } }, required: [] },
    annotations: RW,
    cost: () => OP_COST.compress,
    run: (a) => runImg("compress", a),
  },
  {
    name: "sammapix_resize",
    description: "Resize an image to a target width and/or height. Never upscales beyond 8000px. Returns the resized image (base64).",
    inputSchema: { type: "object", properties: { ...IMG_INPUT, width: { type: "number" }, height: { type: "number" }, fit: { type: "string", enum: ["cover", "contain", "inside", "outside", "fill"], description: "How to fit (default inside)." }, ...QUALITY }, required: [] },
    annotations: RW,
    cost: () => OP_COST.resize,
    run: (a) => runImg("resize", a),
  },
  {
    name: "sammapix_crop",
    description: "Crop an image to a pixel rectangle or a centered aspect ratio (e.g. '16:9'). Returns the cropped image (base64).",
    inputSchema: { type: "object", properties: { ...IMG_INPUT, ratio: { type: "string", description: "Aspect ratio like '16:9' or '1:1' (centered crop)." }, left: { type: "number" }, top: { type: "number" }, width: { type: "number" }, height: { type: "number" }, ...QUALITY }, required: [] },
    annotations: RW,
    cost: () => OP_COST.crop,
    run: (a) => runImg("crop", a),
  },
  {
    name: "sammapix_convert",
    description: "Convert an image to another format: webp, avif, jpeg or png. Returns the converted image (base64).",
    inputSchema: { type: "object", properties: { ...IMG_INPUT, format: { type: "string", enum: ["webp", "avif", "jpeg", "png"], description: "Target format." }, ...QUALITY }, required: ["format"] },
    annotations: RW,
    cost: () => OP_COST.convert,
    run: (a) => runImg("convert", a),
  },
  {
    name: "sammapix_rotate",
    description: "Rotate an image by a fixed angle, or auto-orient from EXIF when no angle is given. Returns the rotated image (base64).",
    inputSchema: { type: "object", properties: { ...IMG_INPUT, angle: { type: "number", description: "Degrees clockwise. Omit to auto-orient from EXIF." }, ...QUALITY }, required: [] },
    annotations: RW,
    cost: () => OP_COST.rotate,
    run: (a) => runImg("rotate", a),
  },
  {
    name: "sammapix_get_metadata",
    description: "Read an image's metadata (format, dimensions, color space, EXIF orientation). Returns JSON, no image.",
    inputSchema: { type: "object", properties: { ...IMG_INPUT }, required: [] },
    annotations: RO,
    cost: () => OP_COST.metadata,
    run: async (a) => ({ info: await img.metadata(await acquireImage(a)) }),
  },
  {
    name: "sammapix_pipeline",
    description:
      "Run a CHAIN of image operations in ONE call (the output of each step feeds the next), so you avoid multiple round-trips and intermediate files. Steps are objects like {\"op\":\"resize\",\"params\":{\"width\":1200}}. Chainable ops: compress, resize, crop, convert, rotate. Returns the final image (base64). Costs 1 credit per step.",
    inputSchema: {
      type: "object",
      properties: {
        ...IMG_INPUT,
        steps: {
          type: "array",
          description: "Ordered list of {op, params}. Max 12.",
          items: { type: "object", properties: { op: { type: "string", enum: ["compress", "resize", "crop", "convert", "rotate"] }, params: { type: "object" } }, required: ["op"] },
        },
      },
      required: ["steps"],
    },
    annotations: RW,
    cost: (a) => pipelineCost((Array.isArray(a.steps) ? a.steps : []) as PipelineStep[]),
    run: async (a) => {
      const steps = a.steps;
      if (!Array.isArray(steps) || steps.length === 0) throw new img.ApiOpError('"steps" must be a non-empty array');
      for (const s of steps as { op?: unknown }[]) {
        if (!s || typeof s.op !== "string" || !isImageOp(s.op)) throw new img.ApiOpError(`invalid pipeline step "${s?.op}"`);
      }
      const { result } = await runPipeline(await acquireImage(a), steps as { op: string; params?: Record<string, unknown> }[]);
      return imageResult(result);
    },
  },
  {
    name: "sammapix_pdf_compress",
    description: "Compress a PDF (rewrites with object streams, strips metadata). Input pdfBase64. Returns the compressed PDF (base64).",
    inputSchema: { type: "object", properties: { pdfBase64: { type: "string", description: "Source PDF as base64. Max 20MB." } }, required: ["pdfBase64"] },
    annotations: RW,
    cost: () => OP_COST["pdf-compress"],
    run: async (a) => {
      const b64 = a.pdfBase64;
      if (typeof b64 !== "string" || !b64) throw new img.ApiOpError('"pdfBase64" is required');
      const buf = Buffer.from(b64.includes(",") ? b64.split(",")[1] : b64, "base64");
      assertFileSize(buf.length);
      const out = await pdf.pdfCompress(buf);
      return { base64: out.buffer.toString("base64"), mimeType: out.contentType, info: { pages: out.info.pages, bytes: out.info.bytes } };
    },
  },

  // ── more image ops (all chainable, base64 or imageUrl in, image out) ──────
  imageTool("sammapix_flip", "flip", "Flip an image horizontally, vertically or both.", { direction: { type: "string", enum: ["horizontal", "vertical", "both"] } }),
  imageTool("sammapix_grayscale", "grayscale", "Convert an image to grayscale (black & white).", {}),
  imageTool("sammapix_blur", "blur", "Apply a Gaussian blur to an image.", { sigma: { type: "number", description: "Blur strength 0.3-100 (default 8)." } }),
  imageTool("sammapix_adjust", "adjust", "Adjust brightness, saturation and/or hue of an image.", { brightness: { type: "number", description: "0-3 (1 = unchanged)." }, saturation: { type: "number", description: "0-3 (1 = unchanged)." }, hue: { type: "number", description: "degrees to rotate hue." } }),
  imageTool("sammapix_tint", "tint", "Tint an image a colour (e.g. sepia with #704214).", { color: { type: "string", description: "Hex colour, e.g. #704214." } }),
  imageTool("sammapix_negate", "negate", "Invert the colours of an image.", {}),
  imageTool("sammapix_flatten", "flatten", "Flatten transparency onto a solid background colour.", { background: { type: "string", description: "Hex background colour (default #ffffff)." } }),
  imageTool("sammapix_border", "border", "Add a solid border/frame around an image.", { width: { type: "number", description: "Border width in px." }, color: { type: "string", description: "Hex colour." } }),
  imageTool("sammapix_round", "round", "Round the corners of an image (outputs PNG with transparency).", { radius: { type: "number", description: "Corner radius in px." } }),
  imageTool("sammapix_watermark", "watermark", "Overlay a text watermark on an image.", { text: { type: "string" }, opacity: { type: "number", description: "0-1." }, position: { type: "string", enum: ["top-left", "top-right", "bottom-left", "bottom-right", "center"] } }),

  // ── more PDF ops ──────────────────────────────────────────────────────────
  {
    name: "sammapix_pdf_split",
    description: "Extract a subset of pages from a PDF into a new PDF. pages like \"1-3,5\". Returns the new PDF (base64).",
    inputSchema: { type: "object", properties: { pdfBase64: { type: "string", description: "Source PDF base64." }, pages: { type: "string", description: 'Pages to keep, e.g. "1-3,5" (1-based).' } }, required: ["pdfBase64", "pages"] },
    annotations: RW,
    cost: () => OP_COST["pdf-split"],
    run: async (a) => pdfResult(await pdf.pdfSplit(decodePdf(a), (typeof a.pages === "string" ? a.pages : "1"))),
  },
  {
    name: "sammapix_pdf_rotate",
    description: "Rotate all pages of a PDF by 90/180/270 degrees. Returns the rotated PDF (base64).",
    inputSchema: { type: "object", properties: { pdfBase64: { type: "string" }, angle: { type: "number", description: "Degrees clockwise (90/180/270)." } }, required: ["pdfBase64"] },
    annotations: RW,
    cost: () => OP_COST["pdf-rotate"],
    run: async (a) => pdfResult(await pdf.pdfRotate(decodePdf(a), typeof a.angle === "number" ? a.angle : 90)),
  },
  {
    name: "sammapix_pdf_info",
    description: "Read a PDF's page count and per-page sizes. Returns JSON, no file.",
    inputSchema: { type: "object", properties: { pdfBase64: { type: "string" } }, required: ["pdfBase64"] },
    annotations: RO,
    cost: () => OP_COST["pdf-info"],
    run: async (a) => ({ info: await pdf.pdfInfo(decodePdf(a)) }),
  },
  {
    name: "sammapix_image_to_pdf",
    description: "Build a PDF from one or more images (one image per page). Input imagesBase64 (array). Returns the PDF (base64).",
    inputSchema: { type: "object", properties: { imagesBase64: { type: "array", items: { type: "string" }, description: "Array of image base64 strings (max 20)." } }, required: ["imagesBase64"] },
    annotations: RW,
    cost: () => OP_COST["image-to-pdf"],
    run: async (a) => {
      const arr = a.imagesBase64;
      if (!Array.isArray(arr) || arr.length === 0) throw new img.ApiOpError('"imagesBase64" must be a non-empty array');
      const bufs = arr.slice(0, 20).map((s) => {
        const raw = typeof s === "string" ? (s.includes(",") ? s.split(",")[1] : s) : "";
        const b = Buffer.from(raw, "base64");
        assertFileSize(b.length);
        return b;
      });
      return pdfResult(await pdf.imagesToPdf(bufs));
    },
  },
];

export function findTool(name: string): McpTool | undefined {
  return MCP_TOOLS.find((t) => t.name === name);
}

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
];

export function findTool(name: string): McpTool | undefined {
  return MCP_TOOLS.find((t) => t.name === name);
}

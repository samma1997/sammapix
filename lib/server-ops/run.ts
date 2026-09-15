/**
 * Shared operation dispatcher + pipeline runner.
 *
 * Single source of truth for "run image op X with params P on buffer B",
 * used by both the single-op REST route and the pipeline (chain) route.
 * The pipeline is the key differentiator: an agent runs a whole chain
 * (compress -> convert -> resize ...) in ONE call, saving tokens and
 * round-trips, with no intermediate files to manage.
 */

import * as img from "@/lib/server-ops/image";

/** Image ops that are chainable in a pipeline (Buffer -> Buffer). */
export const IMAGE_OPS = [
  "compress", "resize", "crop", "convert", "rotate",
  "flip", "grayscale", "blur", "adjust", "tint", "negate", "flatten", "border", "round", "watermark",
] as const;
export type ImageOp = (typeof IMAGE_OPS)[number];

export function isImageOp(op: string): op is ImageOp {
  return (IMAGE_OPS as readonly string[]).includes(op);
}

type Params = Record<string, unknown>;

function num(v: unknown): number | undefined {
  const n = Number(v);
  return v != null && v !== "" && !Number.isNaN(n) ? n : undefined;
}
function str(v: unknown): string | undefined {
  return typeof v === "string" && v ? v : undefined;
}

/** Run a single chainable image op. Throws img.ApiOpError on bad params. */
export async function runImageOp(op: ImageOp, buffer: Buffer, p: Params): Promise<img.OpResult> {
  switch (op) {
    case "compress":
      return img.compress(buffer, { quality: num(p.quality), maxWidthOrHeight: num(p.maxWidthOrHeight) });
    case "resize":
      return img.resize(buffer, { width: num(p.width), height: num(p.height), fit: str(p.fit), quality: num(p.quality) });
    case "crop":
      return img.crop(buffer, { left: num(p.left), top: num(p.top), width: num(p.width), height: num(p.height), ratio: str(p.ratio), quality: num(p.quality) });
    case "convert":
      return img.convert(buffer, { format: (str(p.format) ?? "webp") as img.OutFormat, quality: num(p.quality) });
    case "rotate":
      return img.rotate(buffer, { angle: num(p.angle), quality: num(p.quality) });
    case "flip":
      return img.flip(buffer, { direction: str(p.direction), quality: num(p.quality) });
    case "grayscale":
      return img.grayscale(buffer, { quality: num(p.quality) });
    case "blur":
      return img.blur(buffer, { sigma: num(p.sigma), quality: num(p.quality) });
    case "adjust":
      return img.adjust(buffer, { brightness: num(p.brightness), saturation: num(p.saturation), hue: num(p.hue), quality: num(p.quality) });
    case "tint":
      return img.tint(buffer, { color: str(p.color), quality: num(p.quality) });
    case "negate":
      return img.negate(buffer, { quality: num(p.quality) });
    case "flatten":
      return img.flatten(buffer, { background: str(p.background), quality: num(p.quality) });
    case "border":
      return img.border(buffer, { width: num(p.width), color: str(p.color), quality: num(p.quality) });
    case "round":
      return img.round(buffer, { radius: num(p.radius) });
    case "watermark":
      return img.watermark(buffer, { text: str(p.text), opacity: num(p.opacity), position: str(p.position), quality: num(p.quality) });
  }
}

export interface PipelineStep {
  op: string;
  params?: Params;
}

export interface PipelineResult {
  result: img.OpResult;
  executed: { op: string; bytes: number }[];
}

/**
 * Run a chain of image ops in sequence: the output of each step feeds the next.
 * Validates every step's op BEFORE running so a bad chain fails fast (and,
 * upstream, is refunded). Returns the final buffer plus the executed trace.
 */
export async function runPipeline(input: Buffer, steps: PipelineStep[]): Promise<PipelineResult> {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new img.ApiOpError("pipeline requires a non-empty steps array");
  }
  if (steps.length > 12) {
    throw new img.ApiOpError("pipeline supports at most 12 steps");
  }
  for (const s of steps) {
    if (!s || typeof s.op !== "string" || !isImageOp(s.op)) {
      throw new img.ApiOpError(`pipeline step "${s?.op}" is not a chainable image op (${IMAGE_OPS.join(", ")})`);
    }
  }

  let buffer = input;
  let last: img.OpResult | null = null;
  const executed: { op: string; bytes: number }[] = [];
  for (const s of steps) {
    last = await runImageOp(s.op as ImageOp, buffer, s.params ?? {});
    buffer = last.buffer;
    executed.push({ op: s.op, bytes: last.info.bytes });
  }
  return { result: last!, executed };
}

/** Credit cost of a pipeline = 1 per step (each op is billed). */
export function pipelineCost(steps: PipelineStep[]): number {
  return Array.isArray(steps) ? steps.length : 0;
}

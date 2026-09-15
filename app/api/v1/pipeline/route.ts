/**
 * SammaPix pipeline — POST /api/v1/pipeline
 *
 * Run a CHAIN of image ops in one call. The output of each step feeds the next,
 * so an agent does compress -> convert -> resize in a single request instead of
 * three, saving tokens and round-trips and never handling intermediate files.
 *
 * Input:
 *   multipart/form-data:  file=<image>  steps=<JSON array>
 *   application/json:     { "image": "<base64|dataURL>", "steps": [ {op, params}, ... ] }
 *
 * steps example: [ {"op":"resize","params":{"width":1200}},
 *                  {"op":"convert","params":{"format":"webp","quality":80}} ]
 *
 * Billing: 1 credit per step. The whole chain is validated first; if anything
 * fails, all credits are refunded (a failed chain is free).
 * Zero-retention: everything in memory, discarded when the request ends.
 */

import { NextRequest } from "next/server";
import { createHash } from "crypto";
import { extractKey, resolveApiKey } from "@/lib/api/keys";
import { chargeUnits, refundBill } from "@/lib/api/meter";
import { runPipeline, pipelineCost, isImageOp, type PipelineStep } from "@/lib/server-ops/run";
import { ApiOpError } from "@/lib/server-ops/image";
import { assertFileSize, contentLengthExceeded, PayloadTooLarge, MAX_PIPELINE_STEPS } from "@/lib/api/limits";
import { rateLimit, clientIp, IP_LIMIT, KEY_LIMIT } from "@/lib/api/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 120;

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...extra } });
}

async function readInput(req: NextRequest): Promise<{ buffer: Buffer; steps: PipelineStep[] }> {
  const ctype = req.headers.get("content-type") ?? "";
  if (ctype.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new Error('missing "file" field');
    assertFileSize(file.size);
    const buffer = Buffer.from(await file.arrayBuffer());
    const rawSteps = form.get("steps");
    if (typeof rawSteps !== "string") throw new Error('missing "steps" (JSON array)');
    return { buffer, steps: parseSteps(rawSteps) };
  }
  const body = (await req.json()) as { image?: string; steps?: unknown };
  if (!body.image) throw new Error('missing "image" (base64 or data URL)');
  const b64 = body.image.includes(",") ? body.image.split(",")[1] : body.image;
  const buffer = Buffer.from(b64, "base64");
  if (buffer.length < 10) throw new Error("invalid base64 image");
  assertFileSize(buffer.length);
  return { buffer, steps: parseSteps(body.steps) };
}

/**
 * Parse AND fully validate the steps up front, so credits are only charged for
 * a well-formed, runnable chain (no charge/refund churn on garbage input).
 */
function parseSteps(raw: unknown): PipelineStep[] {
  const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(arr)) throw new Error('"steps" must be a JSON array');
  if (arr.length === 0) throw new Error("steps array is empty");
  if (arr.length > MAX_PIPELINE_STEPS) throw new Error(`max ${MAX_PIPELINE_STEPS} steps`);
  for (const s of arr) {
    if (!s || typeof s !== "object" || Array.isArray(s) || typeof s.op !== "string") {
      throw new Error("each step must be an object {op: string, params?: object}");
    }
    if (!isImageOp(s.op)) throw new Error(`step "${s.op}" is not a chainable image op`);
    if (s.params !== undefined && (typeof s.params !== "object" || s.params === null || Array.isArray(s.params))) {
      throw new Error(`step "${s.op}" params must be an object`);
    }
  }
  return arr as PipelineStep[];
}

export async function POST(req: NextRequest) {
  // Early payload guard
  if (contentLengthExceeded(req.headers)) return json({ error: "payload_too_large" }, 413);

  // Rate limit per-IP
  const ip = clientIp(req.headers);
  const ipRL = await rateLimit("ip", ip, IP_LIMIT.limit, IP_LIMIT.windowSec);
  if (!ipRL.ok) return json({ error: "rate_limited" }, 429, { "retry-after": String(ipRL.retryAfter) });

  // Auth
  const key = extractKey(req.headers);
  if (!key) return json({ error: "missing_api_key" }, 401);
  const email = await resolveApiKey(key);
  if (!email) return json({ error: "invalid_api_key" }, 401);

  // Rate limit per-key
  const keyId = createHash("sha256").update(key).digest("hex").slice(0, 16);
  const keyRL = await rateLimit("key", keyId, KEY_LIMIT.limit, KEY_LIMIT.windowSec);
  if (!keyRL.ok) return json({ error: "rate_limited" }, 429, { "retry-after": String(keyRL.retryAfter) });

  // Read + FULLY validate steps (before any charge)
  let input: { buffer: Buffer; steps: PipelineStep[] };
  try {
    input = await readInput(req);
  } catch (e) {
    const status = e instanceof PayloadTooLarge ? 413 : 400;
    return json({ error: "bad_input", detail: (e as Error).message }, status);
  }

  const cost = pipelineCost(input.steps);

  // Charge upfront (1 per step); refund the whole chain on any failure
  let bill: Awaited<ReturnType<typeof chargeUnits>>;
  try {
    bill = await chargeUnits(email, cost);
  } catch {
    return json({ error: "billing_unavailable" }, 503);
  }
  if (!bill.ok) {
    return json({ error: "insufficient_credits", cost: bill.cost, remaining: bill.remaining }, 402);
  }

  try {
    const { result, executed } = await runPipeline(input.buffer, input.steps);
    return new Response(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        "content-type": result.contentType,
        "x-op": "pipeline",
        "x-op-cost": String(bill.cost),
        "x-credits-remaining": String(bill.remaining),
        "x-pipeline-steps": String(executed.length),
        "x-pipeline-executed": JSON.stringify(executed),
        "x-output-format": result.info.format,
        "x-output-bytes": String(result.info.bytes),
        ...(result.info.width ? { "x-output-width": String(result.info.width) } : {}),
        ...(result.info.height ? { "x-output-height": String(result.info.height) } : {}),
      },
    });
  } catch (e) {
    await refundBill(email, bill);
    const userFacing = e instanceof ApiOpError;
    const status = userFacing ? 422 : 500;
    const detail = userFacing ? (e as Error).message : "processing_failed";
    return json({ error: "pipeline_failed", detail }, status, { "x-credits-refunded": String(cost) });
  }
}

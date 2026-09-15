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
import { extractKey, resolveApiKey } from "@/lib/api/keys";
import { chargeUnits, refundUnits } from "@/lib/api/meter";
import { runPipeline, pipelineCost, type PipelineStep } from "@/lib/server-ops/run";
import { ApiOpError } from "@/lib/server-ops/image";

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
    const buffer = Buffer.from(await file.arrayBuffer());
    const rawSteps = form.get("steps");
    if (typeof rawSteps !== "string") throw new Error('missing "steps" (JSON array)');
    return { buffer, steps: parseSteps(rawSteps) };
  }
  const body = (await req.json()) as { image?: string; steps?: unknown };
  if (!body.image) throw new Error('missing "image" (base64 or data URL)');
  const b64 = body.image.includes(",") ? body.image.split(",")[1] : body.image;
  return { buffer: Buffer.from(b64, "base64"), steps: parseSteps(body.steps) };
}

function parseSteps(raw: unknown): PipelineStep[] {
  const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(arr)) throw new Error('"steps" must be a JSON array');
  return arr as PipelineStep[];
}

export async function POST(req: NextRequest) {
  // Auth
  const key = extractKey(req.headers);
  if (!key) return json({ error: "missing_api_key" }, 401);
  const email = await resolveApiKey(key);
  if (!email) return json({ error: "invalid_api_key" }, 401);

  // Read + parse
  let input: { buffer: Buffer; steps: PipelineStep[] };
  try {
    input = await readInput(req);
  } catch (e) {
    return json({ error: "bad_input", detail: (e as Error).message }, 400);
  }

  const cost = pipelineCost(input.steps);
  if (cost === 0) return json({ error: "bad_input", detail: "steps array is empty" }, 400);

  // Charge upfront (1 per step); refund the whole chain on any failure
  const bill = await chargeUnits(email, cost);
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
    await refundUnits(email, cost);
    const status = e instanceof ApiOpError ? 422 : 500;
    return json({ error: "pipeline_failed", detail: (e as Error).message }, status, { "x-credits-refunded": String(cost) });
  }
}

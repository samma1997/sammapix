/**
 * SammaPix public API — POST /api/v1/{op}
 *
 * Auth:    Authorization: Bearer sk_live_...   (or x-api-key)
 * Input:   multipart/form-data  (field "file" + params)   [preferred]
 *      or  application/json     ({ "image": "<base64|dataURL>", ...params })
 * Output:  the processed file (binary) with headers, or JSON for "metadata".
 * Billing: credits are charged per op; a failed op is refunded automatically.
 *
 * Zero-retention: files live only in memory for the request. Nothing stored.
 */

import { NextRequest } from "next/server";
import { extractKey, resolveApiKey } from "@/lib/api/keys";
import { charge, refund, type ApiOp, OP_COST } from "@/lib/api/meter";
import * as img from "@/lib/server-ops/image";

export const runtime = "nodejs";
export const maxDuration = 60;

const SUPPORTED: ApiOp[] = ["compress", "resize", "crop", "convert", "rotate", "metadata"];

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...extraHeaders },
  });
}

async function readInput(req: NextRequest): Promise<{ buffer: Buffer; params: Record<string, unknown> }> {
  const ctype = req.headers.get("content-type") ?? "";
  if (ctype.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new Error('missing "file" field');
    const buffer = Buffer.from(await file.arrayBuffer());
    const params: Record<string, unknown> = {};
    for (const [k, v] of form.entries()) {
      if (k === "file") continue;
      params[k] = coerce(v as string);
    }
    return { buffer, params };
  }
  // JSON with base64 / data URL
  const body = (await req.json()) as Record<string, unknown>;
  const image = body.image as string;
  if (!image) throw new Error('missing "image" (base64 or data URL)');
  const b64 = image.includes(",") ? image.split(",")[1] : image;
  const buffer = Buffer.from(b64, "base64");
  const { image: _drop, ...params } = body;
  return { buffer, params };
}

function coerce(v: string): unknown {
  if (v === "true") return true;
  if (v === "false") return false;
  const n = Number(v);
  return v.trim() !== "" && !Number.isNaN(n) ? n : v;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ op: string }> }) {
  const { op } = await ctx.params;

  // 1. Validate op
  if (!SUPPORTED.includes(op as ApiOp)) {
    return json({ error: "unknown_op", op, supported: SUPPORTED }, 404);
  }
  const apiOp = op as ApiOp;

  // 2. Auth
  const key = extractKey(req.headers);
  if (!key) return json({ error: "missing_api_key", hint: "send Authorization: Bearer sk_live_..." }, 401);
  const email = await resolveApiKey(key);
  if (!email) return json({ error: "invalid_api_key" }, 401);

  // 3. Read input
  let input: { buffer: Buffer; params: Record<string, unknown> };
  try {
    input = await readInput(req);
  } catch (e) {
    return json({ error: "bad_input", detail: (e as Error).message }, 400);
  }

  // 4. Charge (before running; refund on failure)
  const bill = await charge(email, apiOp);
  if (!bill.ok) {
    return json(
      { error: "insufficient_credits", cost: bill.cost, remaining: bill.remaining, op: apiOp },
      402,
    );
  }

  // 5. Run the op
  try {
    if (apiOp === "metadata") {
      const meta = await img.metadata(input.buffer);
      return json({ ok: true, op: apiOp, metadata: meta }, 200, {
        "x-op-cost": String(bill.cost),
        "x-credits-remaining": String(bill.remaining),
      });
    }

    const p = input.params;
    let out: img.OpResult;
    switch (apiOp) {
      case "compress":
        out = await img.compress(input.buffer, { quality: num(p.quality), maxWidthOrHeight: num(p.maxWidthOrHeight) });
        break;
      case "resize":
        out = await img.resize(input.buffer, { width: num(p.width), height: num(p.height), fit: str(p.fit), quality: num(p.quality) });
        break;
      case "crop":
        out = await img.crop(input.buffer, {
          left: num(p.left), top: num(p.top), width: num(p.width), height: num(p.height), ratio: str(p.ratio), quality: num(p.quality),
        });
        break;
      case "convert":
        out = await img.convert(input.buffer, { format: (str(p.format) ?? "webp") as img.OutFormat, quality: num(p.quality) });
        break;
      case "rotate":
        out = await img.rotate(input.buffer, { angle: num(p.angle), quality: num(p.quality) });
        break;
      default:
        throw new Error("unreachable");
    }

    return new Response(new Uint8Array(out.buffer), {
      status: 200,
      headers: {
        "content-type": out.contentType,
        "x-op": apiOp,
        "x-op-cost": String(bill.cost),
        "x-credits-remaining": String(bill.remaining),
        "x-output-format": out.info.format,
        "x-output-bytes": String(out.info.bytes),
        ...(out.info.width ? { "x-output-width": String(out.info.width) } : {}),
        ...(out.info.height ? { "x-output-height": String(out.info.height) } : {}),
      },
    });
  } catch (e) {
    // Op failed after charge -> refund so a failed job is free
    await refund(email, apiOp);
    return json({ error: "op_failed", op: apiOp, detail: (e as Error).message }, 422, {
      "x-credits-refunded": String(OP_COST[apiOp]),
    });
  }
}

function num(v: unknown): number | undefined {
  const n = Number(v);
  return v != null && v !== "" && !Number.isNaN(n) ? n : undefined;
}
function str(v: unknown): string | undefined {
  return typeof v === "string" && v ? v : undefined;
}

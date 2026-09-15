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
import { charge, refund, type ApiOp } from "@/lib/api/meter";
import * as img from "@/lib/server-ops/image";
import * as pdf from "@/lib/server-ops/pdf";
import { isImageOp, runImageOp, type ImageOp } from "@/lib/server-ops/run";

export const runtime = "nodejs";
export const maxDuration = 60;

const SUPPORTED: ApiOp[] = ["compress", "resize", "crop", "convert", "rotate", "metadata", "pdf-compress", "pdf-merge"];

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...extraHeaders } });
}

function coerce(v: string): unknown {
  if (v === "true") return true;
  if (v === "false") return false;
  const n = Number(v);
  return v.trim() !== "" && !Number.isNaN(n) ? n : v;
}

/** Read one file + params (multipart) or a base64 image (JSON). */
async function readSingle(req: NextRequest): Promise<{ buffer: Buffer; params: Record<string, unknown> }> {
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
  const body = (await req.json()) as Record<string, unknown>;
  const image = body.image as string;
  if (!image) throw new Error('missing "image" (base64 or data URL)');
  const b64 = image.includes(",") ? image.split(",")[1] : image;
  const { image: _drop, ...params } = body;
  return { buffer: Buffer.from(b64, "base64"), params };
}

/** Read many files (multipart, repeated "file" fields) for merge ops. */
async function readMany(req: NextRequest): Promise<Buffer[]> {
  const form = await req.formData();
  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  return Promise.all(files.map(async (f) => Buffer.from(await f.arrayBuffer())));
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ op: string }> }) {
  const { op } = await ctx.params;

  if (!SUPPORTED.includes(op as ApiOp)) {
    return json({ error: "unknown_op", op, supported: SUPPORTED }, 404);
  }
  const apiOp = op as ApiOp;

  // Auth
  const key = extractKey(req.headers);
  if (!key) return json({ error: "missing_api_key", hint: "send Authorization: Bearer sk_live_..." }, 401);
  const email = await resolveApiKey(key);
  if (!email) return json({ error: "invalid_api_key" }, 401);

  // Charge (before running; refund on failure)
  const bill = await charge(email, apiOp);
  if (!bill.ok) {
    return json({ error: "insufficient_credits", cost: bill.cost, remaining: bill.remaining, op: apiOp }, 402);
  }

  const billHeaders = { "x-op": apiOp, "x-op-cost": String(bill.cost), "x-credits-remaining": String(bill.remaining) };

  try {
    // ── PDF merge (multiple files) ──────────────────────────────────────────
    if (apiOp === "pdf-merge") {
      const buffers = await readMany(req);
      const out = await pdf.pdfMerge(buffers);
      return binary(out.buffer, out.contentType, { ...billHeaders, "x-output-pages": String(out.info.pages), "x-output-bytes": String(out.info.bytes) });
    }

    // ── Single-file ops ─────────────────────────────────────────────────────
    const { buffer, params } = await readSingle(req);

    if (apiOp === "pdf-compress") {
      const out = await pdf.pdfCompress(buffer);
      return binary(out.buffer, out.contentType, { ...billHeaders, "x-output-pages": String(out.info.pages), "x-output-bytes": String(out.info.bytes) });
    }

    if (apiOp === "metadata") {
      const meta = await img.metadata(buffer);
      return json({ ok: true, op: apiOp, metadata: meta }, 200, billHeaders);
    }

    if (isImageOp(apiOp)) {
      const out = await runImageOp(apiOp as ImageOp, buffer, params);
      return binary(out.buffer, out.contentType, {
        ...billHeaders,
        "x-output-format": out.info.format,
        "x-output-bytes": String(out.info.bytes),
        ...(out.info.width ? { "x-output-width": String(out.info.width) } : {}),
        ...(out.info.height ? { "x-output-height": String(out.info.height) } : {}),
      });
    }

    throw new Error("unreachable");
  } catch (e) {
    await refund(email, apiOp);
    return json({ error: "op_failed", op: apiOp, detail: (e as Error).message }, 422, { "x-credits-refunded": String(bill.cost) });
  }
}

function binary(buf: Buffer, contentType: string, headers: Record<string, string>) {
  return new Response(new Uint8Array(buf), { status: 200, headers: { "content-type": contentType, ...headers } });
}

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
import { createHash } from "crypto";
import { extractKey, resolveApiKey } from "@/lib/api/keys";
import { charge, refundBill, type ApiOp } from "@/lib/api/meter";
import * as img from "@/lib/server-ops/image";
import * as pdf from "@/lib/server-ops/pdf";
import { isImageOp, runImageOp, type ImageOp } from "@/lib/server-ops/run";
import { assertFileSize, contentLengthExceeded, PayloadTooLarge } from "@/lib/api/limits";
import { rateLimit, clientIp, IP_LIMIT, KEY_LIMIT } from "@/lib/api/ratelimit";
import { fetchRemoteFile, UnsafeUrlError } from "@/lib/api/fetch-image";

export const runtime = "nodejs";
export const maxDuration = 60;

const SUPPORTED: ApiOp[] = [
  "compress", "resize", "crop", "convert", "rotate", "metadata",
  "flip", "grayscale", "blur", "adjust", "tint", "negate", "flatten", "border", "round", "watermark",
  "pdf-compress", "pdf-merge", "pdf-split", "pdf-rotate", "image-to-pdf", "pdf-info",
];
// Ops that accept multiple files (repeated "file" fields)
const MULTI_FILE: ApiOp[] = ["pdf-merge", "image-to-pdf"];

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
    assertFileSize(file.size);
    const buffer = Buffer.from(await file.arrayBuffer());
    const params: Record<string, unknown> = {};
    for (const [k, v] of form.entries()) {
      if (k === "file") continue;
      params[k] = coerce(v as string);
    }
    return { buffer, params };
  }
  const body = (await req.json()) as Record<string, unknown>;
  // URL input (agents usually have a link) — fetched with SSRF protection.
  const url = (body.url ?? body.imageUrl) as string | undefined;
  if (typeof url === "string" && url) {
    const buffer = await fetchRemoteFile(url);
    const { url: _u, imageUrl: _iu, image: _img, ...params } = body;
    return { buffer, params };
  }
  const image = body.image as string;
  if (!image) throw new Error('provide "image" (base64/dataURL) or "url"');
  const b64 = image.includes(",") ? image.split(",")[1] : image;
  const buffer = Buffer.from(b64, "base64");
  if (buffer.length < 10) throw new Error("invalid base64 image");
  assertFileSize(buffer.length);
  const { image: _drop, ...params } = body;
  return { buffer, params };
}

/** Read many files (multipart, repeated "file" fields) for merge ops. */
async function readMany(req: NextRequest): Promise<Buffer[]> {
  const form = await req.formData();
  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  files.forEach((f) => assertFileSize(f.size));
  return Promise.all(files.map(async (f) => Buffer.from(await f.arrayBuffer())));
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ op: string }> }) {
  const { op } = await ctx.params;

  if (!SUPPORTED.includes(op as ApiOp)) {
    return json({ error: "unknown_op" }, 404);
  }
  const apiOp = op as ApiOp;

  // Early payload guard (before reading the body)
  if (contentLengthExceeded(req.headers)) return json({ error: "payload_too_large" }, 413);

  // Rate limit per-IP (anti-DoS floor, applies before auth)
  const ip = clientIp(req.headers);
  const ipRL = await rateLimit("ip", ip, IP_LIMIT.limit, IP_LIMIT.windowSec);
  if (!ipRL.ok) return json({ error: "rate_limited" }, 429, { "retry-after": String(ipRL.retryAfter) });

  // Auth
  const key = extractKey(req.headers);
  if (!key) return json({ error: "missing_api_key", hint: "send Authorization: Bearer sk_live_..." }, 401);
  const email = await resolveApiKey(key);
  if (!email) return json({ error: "invalid_api_key" }, 401);

  // Rate limit per-key (trusted but must not saturate the fleet)
  const keyId = createHash("sha256").update(key).digest("hex").slice(0, 16);
  const keyRL = await rateLimit("key", keyId, KEY_LIMIT.limit, KEY_LIMIT.windowSec);
  if (!keyRL.ok) return json({ error: "rate_limited" }, 429, { "retry-after": String(keyRL.retryAfter) });

  // ── Read + validate input BEFORE charging (never bill on bad/oversized input) ──
  let inputBuffer: Buffer;
  let inputBuffers: Buffer[] = [];
  let params: Record<string, unknown> = {};
  try {
    if (MULTI_FILE.includes(apiOp)) {
      inputBuffers = await readMany(req);
      inputBuffer = inputBuffers[0] ?? Buffer.alloc(0);
    } else {
      const s = await readSingle(req);
      inputBuffer = s.buffer;
      params = s.params;
    }
  } catch (e) {
    const status =
      e instanceof PayloadTooLarge || contentLengthExceeded(req.headers) ||
      Number(req.headers.get("content-length") ?? 0) > 20 * 1024 * 1024
        ? 413
        : 400;
    return json({ error: status === 413 ? "payload_too_large" : "bad_input", detail: (e as Error).message }, status);
  }

  // Charge (after input is valid; refund on op failure)
  let bill: Awaited<ReturnType<typeof charge>>;
  try {
    bill = await charge(email, apiOp);
  } catch {
    return json({ error: "billing_unavailable" }, 503);
  }
  if (!bill.ok) {
    return json({ error: "insufficient_credits", cost: bill.cost, remaining: bill.remaining, op: apiOp }, 402);
  }

  const billHeaders = { "x-op": apiOp, "x-op-cost": String(bill.cost), "x-credits-remaining": String(bill.remaining) };

  try {
    const pdfHdr = (out: pdf.PdfResult) => ({ ...billHeaders, "x-output-pages": String(out.info.pages), "x-output-bytes": String(out.info.bytes) });

    // ── Multi-file PDF ops ──────────────────────────────────────────────────
    if (apiOp === "pdf-merge") return binaryPdf(await pdf.pdfMerge(inputBuffers), pdfHdr);
    if (apiOp === "image-to-pdf") return binaryPdf(await pdf.imagesToPdf(inputBuffers), pdfHdr);

    const buffer = inputBuffer;

    // ── Single-file PDF ops ─────────────────────────────────────────────────
    if (apiOp === "pdf-compress") return binaryPdf(await pdf.pdfCompress(buffer), pdfHdr);
    if (apiOp === "pdf-split") return binaryPdf(await pdf.pdfSplit(buffer, str(params.pages) ?? "1"), pdfHdr);
    if (apiOp === "pdf-rotate") return binaryPdf(await pdf.pdfRotate(buffer, num(params.angle) ?? 90), pdfHdr);
    if (apiOp === "pdf-info") return json({ ok: true, op: apiOp, info: await pdf.pdfInfo(buffer) }, 200, billHeaders);

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
    await refundBill(email, bill);
    // Only surface safe, user-facing errors; hide internal detail.
    const userFacing = e instanceof img.ApiOpError || e instanceof PayloadTooLarge;
    const status = e instanceof PayloadTooLarge ? 413 : userFacing ? 422 : 500;
    const detail = userFacing ? (e as Error).message : "processing_failed";
    return json({ error: "op_failed", op: apiOp, detail }, status, { "x-credits-refunded": String(bill.cost) });
  }
}

function binary(buf: Buffer, contentType: string, headers: Record<string, string>) {
  return new Response(new Uint8Array(buf), { status: 200, headers: { "content-type": contentType, ...headers } });
}

function binaryPdf(out: pdf.PdfResult, hdr: (o: pdf.PdfResult) => Record<string, string>) {
  return binary(out.buffer, out.contentType, hdr(out));
}

function num(v: unknown): number | undefined {
  const n = Number(v);
  return v != null && v !== "" && !Number.isNaN(n) ? n : undefined;
}
function str(v: unknown): string | undefined {
  return typeof v === "string" && v ? v : undefined;
}

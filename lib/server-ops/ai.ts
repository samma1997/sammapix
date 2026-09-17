/**
 * AI vision operations for the SammaPix API / MCP (server-side, zero-retention).
 *
 * These are what make the toolbox *agent-native*: an agent doesn't just resize
 * an image, it can understand it — caption, alt text, SEO filename, OCR, tags.
 * All run on Gemini (vision -> text), so they are reliable and cost a fraction
 * of a cent. Nothing is stored: the image lives only for the request.
 *
 * The image is normalised to JPEG via sharp before it reaches Gemini, so the
 * mime type is always valid regardless of the input format.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import sharp from "sharp";
import { GEMINI_MODEL } from "@/lib/constants";
import { SAFE_SHARP } from "@/lib/api/limits";
import { ApiOpError } from "@/lib/server-ops/image";

function client(): GoogleGenerativeAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ApiOpError("AI features are not configured on this server");
  return new GoogleGenerativeAI(key);
}

/** Downscale + re-encode to JPEG so Gemini always gets a valid, modest payload. */
async function toJpegPart(input: Buffer): Promise<{ inlineData: { data: string; mimeType: "image/jpeg" } }> {
  let buf: Buffer;
  try {
    buf = await sharp(input, SAFE_SHARP)
      .rotate()
      .resize({ width: 1536, height: 1536, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch {
    throw new ApiOpError("input is not a readable image");
  }
  return { inlineData: { data: buf.toString("base64"), mimeType: "image/jpeg" } };
}

async function ask(input: Buffer, prompt: string, maxOutputTokens = 512): Promise<string> {
  // Disable "thinking" (default-on for 2.5 flash): these are short, deterministic
  // tasks, and thinking would eat the output-token budget, truncating answers.
  const generationConfig = { maxOutputTokens, temperature: 0.4, thinkingConfig: { thinkingBudget: 0 } } as Record<string, unknown>;
  const model = client().getGenerativeModel({ model: GEMINI_MODEL, generationConfig });
  const part = await toJpegPart(input);
  let text: string;
  try {
    const result = await model.generateContent([prompt, part]);
    text = result.response.text();
  } catch (e) {
    // Surface a safe, actionable message; hide provider internals.
    const m = (e as Error)?.message ?? "";
    if (/quota|rate|429/i.test(m)) throw new ApiOpError("AI provider is rate limited, please retry shortly");
    throw new ApiOpError("AI could not process this image");
  }
  return text.trim();
}

function cleanLine(s: string): string {
  return s.replace(/^["'`\s]+|["'`\s]+$/g, "").replace(/\s+/g, " ").trim();
}

/** A rich, human caption of the image. */
export async function describeImage(input: Buffer, opts: { detail?: string } = {}): Promise<{ description: string }> {
  const detail = opts.detail === "short" ? "in one concise sentence" : "in 2-4 sentences";
  const description = await ask(
    input,
    `Describe this image ${detail}. Be factual and specific about the main subject, setting, colors and mood. Do not start with "This image" or "The image".`,
    400,
  );
  return { description: cleanLine(description) };
}

/** Concise accessibility alt text (<=125 chars, no "image of"). */
export async function altText(input: Buffer): Promise<{ altText: string }> {
  const raw = await ask(
    input,
    `Write concise, descriptive alt text for this image for screen readers. One sentence, under 125 characters, no "image of" or "picture of" prefix, no trailing period.`,
    120,
  );
  let out = cleanLine(raw).replace(/\.$/, "");
  if (out.length > 125) out = out.slice(0, 122).trimEnd() + "…";
  return { altText: out };
}

/** SEO-friendly, kebab-case filename derived from the image content. */
export async function suggestFilename(input: Buffer): Promise<{ filename: string; base: string; ext: string }> {
  const fmt = await sharp(input, SAFE_SHARP).metadata().then((m) => m.format).catch(() => "jpeg");
  const ext = fmt === "jpeg" ? "jpg" : (fmt ?? "jpg");
  const raw = await ask(
    input,
    `Suggest a short, SEO-friendly file name for this image: 3-6 lowercase words describing the main subject, separated by hyphens. No file extension, no spaces, no punctuation other than hyphens. Return only the name.`,
    40,
  );
  let base = cleanLine(raw).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  if (!base) base = "image";
  return { filename: `${base}.${ext}`, base, ext };
}

/** Extract readable text from the image (OCR). */
export async function extractText(input: Buffer): Promise<{ text: string }> {
  const text = await ask(
    input,
    `Extract all readable text from this image exactly as it appears, preserving line breaks. If there is no text, reply with an empty response.`,
    2048,
  );
  return { text: text.trim() };
}

/** True if the buffer looks like a PDF. */
function isPdf(buf: Buffer): boolean {
  return buf.length > 4 && buf.toString("latin1", 0, 5) === "%PDF-";
}

/**
 * Extract structured data from a document (receipt, invoice, scan, or photo of
 * one). Accepts an image OR a PDF. Uses Gemini with forced JSON output so the
 * result is always machine-readable. Zero-retention like every other op.
 */
export async function extractDocument(input: Buffer): Promise<{ data: Record<string, unknown> }> {
  const generationConfig = {
    maxOutputTokens: 2048,
    temperature: 0.1,
    responseMimeType: "application/json",
    thinkingConfig: { thinkingBudget: 0 },
  } as Record<string, unknown>;
  const model = client().getGenerativeModel({ model: GEMINI_MODEL, generationConfig });

  const part = isPdf(input)
    ? { inlineData: { data: input.toString("base64"), mimeType: "application/pdf" } }
    : await toJpegPart(input);

  const prompt =
    'Extract structured data from this document and return ONLY a JSON object with these fields: ' +
    'documentType ("receipt" | "invoice" | "id" | "other"), vendor (string), date (ISO 8601 if present), ' +
    'currency (ISO 4217 code), subtotal (number), tax (number), total (number), ' +
    'lineItems (array of { description, quantity, unitPrice, amount }), and summary (one short sentence). ' +
    'Use null for any field that is not present. Do not invent values.';

  let text: string;
  try {
    const result = await model.generateContent([prompt, part]);
    text = result.response.text();
  } catch (e) {
    const m = (e as Error)?.message ?? "";
    if (/quota|rate|429/i.test(m)) throw new ApiOpError("AI provider is rate limited, please retry shortly");
    throw new ApiOpError("AI could not read this document");
  }
  try {
    const data = JSON.parse(text) as Record<string, unknown>;
    return { data };
  } catch {
    throw new ApiOpError("could not parse the extracted data");
  }
}

/** A set of descriptive keyword tags for the image. */
export async function imageTags(input: Buffer, opts: { max?: number } = {}): Promise<{ tags: string[] }> {
  const max = Math.min(Math.max(opts.max ?? 10, 3), 20);
  const raw = await ask(
    input,
    `List ${max} short descriptive keyword tags for this image (subjects, scene, style, colors). Lowercase, comma-separated, single or two-word tags only. Return only the comma-separated list.`,
    120,
  );
  const tags = Array.from(
    new Set(
      raw
        .split(/[,\n]/)
        .map((t) => cleanLine(t).toLowerCase())
        .filter((t) => t && t.length <= 30 && !/^\d+[.)]/.test(t)),
    ),
  ).slice(0, max);
  return { tags };
}

/**
 * POST /api/vote  — cast a vote for the next tool to build
 * GET  /api/vote  — read current vote tallies
 *
 * Anti-spam: one vote per IP per tool per 24h (Redis SET NX EX).
 * No auth required — this endpoint is for the email subscriber audience.
 *
 * Redis keys used:
 *   tool_votes              — Hash: { [toolKey]: voteCount }
 *   vote_ip:<ip>:<tool>     — String "1" with TTL 86400s (per-IP dedup)
 */

import { NextRequest, NextResponse } from "next/server";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";

const ALLOWED_TOOLS = new Set([
  "audio-converter",
  "text-diff",
  "word-pdf",
  "csv-cleaner",
  "markdown-pdf",
  "unit-converter",
  "color-picker",
  "ocr",
  "step-stl",
  "epoch",
]);

// ── POST: cast a vote ────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { tool?: unknown };
    const tool = typeof body.tool === "string" ? body.tool.trim() : "";

    if (!ALLOWED_TOOLS.has(tool)) {
      return NextResponse.json({ ok: false, error: "invalid_tool" }, { status: 400 });
    }

    // Extract IP for per-IP dedup (works behind Vercel / Cloudflare)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const guardKey = `vote_ip:${ip}:${tool}`;

    // SET NX EX: returns "OK" on first set, null if already exists
    const guard = await exec<string>(["SET", guardKey, "1", "NX", "EX", "86400"]);

    if (guard !== null) {
      // First vote from this IP for this tool today — count it
      await exec<number>(["HINCRBY", "tool_votes", tool, "1"]);
    }
    // If guard is null the vote already exists — silently succeed (no double-count)

    return NextResponse.json({ ok: true });
  } catch {
    // Never surface internal errors to the client
    return NextResponse.json({ ok: true });
  }
}

// ── GET: read tallies ────────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  try {
    // HGETALL returns a flat array [field, value, field, value, ...] or null
    const raw = await exec<string[]>(["HGETALL", "tool_votes"]);

    const votes: Record<string, number> = {};

    if (Array.isArray(raw)) {
      for (let i = 0; i < raw.length; i += 2) {
        const key = raw[i];
        const val = parseInt(raw[i + 1] ?? "0", 10);
        if (key && ALLOWED_TOOLS.has(key)) {
          votes[key] = isNaN(val) ? 0 : val;
        }
      }
    }

    // Always return all known tools so the client can render bars for 0-vote options
    for (const t of ALLOWED_TOOLS) {
      if (!(t in votes)) votes[t] = 0;
    }

    return NextResponse.json({ votes });
  } catch {
    const votes: Record<string, number> = {};
    for (const t of ALLOWED_TOOLS) votes[t] = 0;
    return NextResponse.json({ votes });
  }
}

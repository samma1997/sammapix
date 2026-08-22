/**
 * POST /api/vote  — cast votes for one or more tools, plus an optional open suggestion
 * GET  /api/vote  — read current vote tallies (no suggestions exposed publicly)
 *
 * Anti-spam:
 *   - Per IP per tool per 24 h: SET NX EX 86400
 *   - Per IP suggestion per hour: SET NX EX 3600
 *
 * Redis keys used:
 *   tool_votes              — Hash: { [toolKey]: voteCount }
 *   vote_ip:<ip>:<tool>     — String "1" TTL 86400 s (per-tool dedup)
 *   vote_ip:<ip>:suggestion — String "1" TTL 3600 s (suggestion rate guard)
 *   tool_suggestions        — List (capped at 1000) of JSON { text, ts }
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

// ── POST: cast votes (multi-select) + optional suggestion ────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      tools?: unknown;
      suggestion?: unknown;
    };

    // Validate and filter the tools array
    const rawTools = Array.isArray(body.tools) ? body.tools : [];
    const validTools = rawTools
      .filter((t): t is string => typeof t === "string")
      .map((t) => t.trim())
      .filter((t) => ALLOWED_TOOLS.has(t));

    // Validate suggestion
    const rawSuggestion =
      typeof body.suggestion === "string" ? body.suggestion : "";
    // Strip control chars, trim, cap at 300 chars
    const suggestion = rawSuggestion
      .replace(/[\x00-\x1F\x7F]/g, " ")
      .trim()
      .slice(0, 300);

    if (validTools.length === 0 && suggestion.length === 0) {
      return NextResponse.json({ ok: false, error: "nothing_to_record" }, { status: 400 });
    }

    // Extract IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // Record each valid tool vote (per-IP-per-tool guard)
    for (const tool of validTools) {
      const guardKey = `vote_ip:${ip}:${tool}`;
      const guard = await exec<string>(["SET", guardKey, "1", "NX", "EX", "86400"]);
      if (guard !== null) {
        // Only count if the guard key was freshly created (not already voted)
        await exec<number>(["HINCRBY", "tool_votes", tool, "1"]);
      }
    }

    // Record suggestion if present and IP guard allows
    if (suggestion.length > 0) {
      const suggestionGuardKey = `vote_ip:${ip}:suggestion`;
      const suggGuard = await exec<string>([
        "SET",
        suggestionGuardKey,
        "1",
        "NX",
        "EX",
        "3600",
      ]);
      if (suggGuard !== null) {
        const entry = JSON.stringify({ text: suggestion, ts: Date.now() });
        await exec(["LPUSH", "tool_suggestions", entry]);
        // Cap list at 1000 entries
        await exec(["LTRIM", "tool_suggestions", "0", "999"]);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Never surface internal errors to the client
    return NextResponse.json({ ok: true });
  }
}

// ── GET: read tallies (suggestions are NOT exposed publicly) ─────────────────

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

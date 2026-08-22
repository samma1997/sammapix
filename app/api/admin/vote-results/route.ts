import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { exec } from "@/lib/redis";

export const runtime = "nodejs";

/**
 * GET /api/admin/vote-results — owner-only.
 * Returns the tool-vote tallies (Redis hash tool_votes) and the open-text
 * suggestions (Redis list tool_suggestions). Used by /admin/vote-results.
 */
export async function GET() {
  let email: string | null | undefined;
  try {
    const session = await getServerSession(authOptions);
    email = session?.user?.email;
  } catch {
    email = null;
  }
  if (!email || !ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Votes: HGETALL returns a flat [field, value, field, value, ...] array
  const flat = (await exec<string[]>(["HGETALL", "tool_votes"])) ?? [];
  const votes: Record<string, number> = {};
  for (let i = 0; i < flat.length; i += 2) {
    votes[flat[i]] = parseInt(flat[i + 1] ?? "0", 10) || 0;
  }

  // Suggestions: newest first (LPUSH), each entry is JSON { text, ts }
  const rawList = (await exec<string[]>(["LRANGE", "tool_suggestions", "0", "-1"])) ?? [];
  const suggestions = rawList
    .map((s) => {
      try {
        return JSON.parse(s) as { text: string; ts?: number };
      } catch {
        return { text: String(s) };
      }
    })
    .filter((x) => x && x.text);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return NextResponse.json({
    votes,
    totalVotes,
    suggestions,
    suggestionCount: suggestions.length,
  });
}

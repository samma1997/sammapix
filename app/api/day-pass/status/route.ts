/**
 * GET /api/day-pass/status
 *
 * Reads Redis live (not the JWT cache) so it reflects payment within seconds.
 * Used by the unrar polling loop to detect when a Day Pass becomes active.
 *
 * Returns: { active: boolean }
 * No login → { active: false } (never 401/500 — client must handle gracefully).
 */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { hasActiveDayPass } from "@/lib/day-pass";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ active: false });
    }

    const active = await hasActiveDayPass(email);
    return NextResponse.json({ active });
  } catch {
    // Never surface errors to client — safe fallback
    return NextResponse.json({ active: false });
  }
}

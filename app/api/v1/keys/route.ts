/**
 * API key management endpoint.
 *
 * POST /api/v1/keys              -> create a key for the logged-in account.
 * GET  /api/v1/keys              -> list the account's key metadata (no secrets).
 *
 * Dev bypass (NODE_ENV !== production only): pass ?devEmail=... to create a key
 * without a session and top up test credits, so the API is testable locally.
 */

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { createApiKey, listApiKeys } from "@/lib/api/keys";
import { addCredits } from "@/lib/credits";

export const runtime = "nodejs";

const isDev = process.env.NODE_ENV !== "production";

async function accountEmail(req: NextRequest): Promise<string | null> {
  const devEmail = req.nextUrl.searchParams.get("devEmail");
  if (isDev && devEmail) return devEmail;
  const session = await getServerSession(authOptions);
  return session?.user?.email ?? null;
}

export async function POST(req: NextRequest) {
  const email = await accountEmail(req);
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });

  let label = "default";
  try {
    const body = await req.json();
    if (typeof body?.label === "string") label = body.label.slice(0, 40);
  } catch {
    // no body is fine
  }

  const { key, meta } = await createApiKey(email, label);

  // In dev, seed some credits so the new key is immediately usable for testing.
  if (isDev && req.nextUrl.searchParams.get("devEmail")) {
    await addCredits(email, 200);
  }

  return Response.json({
    ok: true,
    key, // shown ONCE — store it now, it is not retrievable later
    meta,
    note: "Store this key now. Only its hash is saved; it cannot be shown again.",
  });
}

export async function GET(req: NextRequest) {
  const email = await accountEmail(req);
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });
  const keys = await listApiKeys(email);
  return Response.json({ ok: true, keys });
}

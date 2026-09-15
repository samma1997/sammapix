/**
 * API key management endpoint.
 *
 * POST   /api/v1/keys            -> create a key for the logged-in account.
 * GET    /api/v1/keys            -> list the account's key metadata (no secrets).
 * DELETE /api/v1/keys?id=sk_...  -> revoke a key by its public id.
 *
 * Dev bypass (local only): requires BOTH NODE_ENV!=production AND a matching
 * DEV_BYPASS_SECRET, so a leaked/misconfigured preview deploy can't mint keys
 * or credits for arbitrary accounts.
 */

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { createApiKey, listApiKeys, revokeApiKey, publicMeta } from "@/lib/api/keys";
import { addCredits } from "@/lib/credits";

export const runtime = "nodejs";

const DEV_SECRET = process.env.DEV_BYPASS_SECRET;
const devBypassEnabled = process.env.NODE_ENV !== "production" && !!DEV_SECRET;

async function accountEmail(req: NextRequest): Promise<{ email: string | null; viaDev: boolean }> {
  if (devBypassEnabled) {
    const devEmail = req.nextUrl.searchParams.get("devEmail");
    const devSecret = req.nextUrl.searchParams.get("devSecret");
    if (devEmail && devSecret === DEV_SECRET) return { email: devEmail, viaDev: true };
  }
  const session = await getServerSession(authOptions);
  return { email: session?.user?.email ?? null, viaDev: false };
}

export async function POST(req: NextRequest) {
  const { email, viaDev } = await accountEmail(req);
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });

  let label = "default";
  try {
    const body = await req.json();
    if (typeof body?.label === "string") label = body.label.slice(0, 40);
  } catch {
    // no body is fine
  }

  try {
    const { key, meta } = await createApiKey(email, label);
    if (viaDev) await addCredits(email, 200); // seed test credits in local dev only
    return Response.json({
      ok: true,
      key, // shown ONCE — store it now, it is not retrievable later
      meta: publicMeta(meta),
      note: "Store this key now. Only its hash is saved; it cannot be shown again.",
    });
  } catch (e) {
    return Response.json({ error: "cannot_create_key", detail: (e as Error).message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { email } = await accountEmail(req);
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });
  const keys = (await listApiKeys(email)).map(publicMeta);
  return Response.json({ ok: true, keys });
}

export async function DELETE(req: NextRequest) {
  const { email } = await accountEmail(req);
  if (!email) return Response.json({ error: "not_authenticated" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "missing_id" }, { status: 400 });
  const removed = await revokeApiKey(email, id);
  return Response.json({ ok: removed, revoked: removed }, { status: removed ? 200 : 404 });
}

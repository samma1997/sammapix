import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const sessionSecret = process.env.GROWTH_SESSION_SECRET;
  if (!sessionSecret) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("growth_session", sessionSecret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    domain: ".sammapix.com",
  });
  return response;
}

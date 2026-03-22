import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    let username = "";
    let password = "";

    try {
      const parsed = JSON.parse(body);
      username = parsed.username || "";
      password = parsed.password || "";
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const expectedUser = process.env.GROWTH_USERNAME || "samma";
    const expectedPass = process.env.GROWTH_PASSWORD || "REDACTED";
    const sessionSecret = process.env.GROWTH_SESSION_SECRET || "REDACTED";

    if (username === expectedUser && password === expectedPass) {
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

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: "Server error: " + String(e) }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("growth_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    domain: ".sammapix.com",
  });
  return response;
}

import { NextRequest, NextResponse } from "next/server";

const GROWTH_USER = process.env.GROWTH_USERNAME || "samma";
const GROWTH_PASS = process.env.GROWTH_PASSWORD || "REDACTED!";
const GROWTH_SECRET = process.env.GROWTH_SESSION_SECRET || "gx_" + Buffer.from(GROWTH_PASS).toString("base64");

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === GROWTH_USER && password === GROWTH_PASS) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("growth_session", GROWTH_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("growth_session");
  return response;
}

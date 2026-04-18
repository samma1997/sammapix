import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const verifier = request.nextUrl.searchParams.get("oauth_verifier");
  const token = request.nextUrl.searchParams.get("oauth_token");

  if (verifier) {
    return new NextResponse(
      `<html><body style="font-family:monospace;padding:40px;text-align:center">
        <h2>Tumblr OAuth OK!</h2>
        <p>Copia questo codice e incollalo a Claude:</p>
        <pre style="font-size:24px;background:#f0f0f0;padding:20px;border-radius:8px">${verifier}</pre>
        <p style="color:#999">token: ${token}</p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return NextResponse.json({ error: "No verifier" }, { status: 400 });
}

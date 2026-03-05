import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL } from "@/lib/constants";

export async function GET(req: NextRequest) {
  void req;
  const session = await getServerSession(authOptions);

  const apiKey = process.env.GEMINI_API_KEY;
  let geminiStatus = "not tested";

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
      const result = await model.generateContent("Say OK");
      geminiStatus = "ok: " + result.response.text().trim().slice(0, 30);
    } catch (e) {
      geminiStatus = "error: " + (e instanceof Error ? e.message : String(e));
    }
  } else {
    geminiStatus = "GEMINI_API_KEY not set";
  }

  return NextResponse.json({
    session: session?.user?.email ?? null,
    authenticated: !!session?.user,
    geminiModel: GEMINI_MODEL,
    geminiApiKey: apiKey ? `...${apiKey.slice(-6)}` : "MISSING",
    geminiStatus,
    nextauthUrl: process.env.NEXTAUTH_URL ?? "NOT SET",
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "NOT SET",
  });
}

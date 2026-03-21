import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { scrapeYouTubeInsights } from "@/lib/growth/youtube-scraper";

export const runtime = "nodejs";
export const maxDuration = 120;

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

export async function POST() {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await scrapeYouTubeInsights();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[growth/youtube/scrape POST]", err);
    return NextResponse.json({ error: "Scrape failed" }, { status: 500 });
  }
}

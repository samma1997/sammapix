import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";
import { db } from "@/lib/db";
import {
  growthStrategyReviews,
  growthRedditPosts,
  growthOutreachTargets,
  growthGscDaily,
} from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { and, gte, eq, sql, isNull } from "drizzle-orm";

export const runtime = "nodejs";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return null;
  }
  return session;
}

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function POST() {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const periodEnd = dateStr(0);
  const periodStart = dateStr(14);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  try {
    // Aggregate last 14 days of data
    const [redditStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthRedditPosts)
      .where(gte(growthRedditPosts.commentedAt, twoWeeksAgo));

    const [outreachSentStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(gte(growthOutreachTargets.sentAt, twoWeeksAgo));

    const [outreachLinkedStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "linked"));

    const [outreachRepliedStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(growthOutreachTargets)
      .where(eq(growthOutreachTargets.status, "replied"));

    // GSC data for the period
    const [gscStats] = await db
      .select({
        impressions: sql<number>`sum(${growthGscDaily.impressions})`,
        clicks: sql<number>`sum(${growthGscDaily.clicks})`,
        avgPosition: sql<number>`avg(${growthGscDaily.position})`,
      })
      .from(growthGscDaily)
      .where(
        and(
          gte(growthGscDaily.date, periodStart),
          isNull(growthGscDaily.query)
        )
      );

    const redditComments = Number(redditStats?.count ?? 0);
    const outreachSent = Number(outreachSentStats?.count ?? 0);
    const outreachLinked = Number(outreachLinkedStats?.count ?? 0);
    const outreachReplied = Number(outreachRepliedStats?.count ?? 0);
    const impressions = Number(gscStats?.impressions ?? 0);
    const clicks = Number(gscStats?.clicks ?? 0);
    const avgPosition = Number(gscStats?.avgPosition ?? 0);

    const dataContext = `
Period: ${periodStart} to ${periodEnd} (last 14 days)

REDDIT:
- Comments posted: ${redditComments}

OUTREACH (link building):
- Emails sent: ${outreachSent}
- Replies received: ${outreachReplied}
- Backlinks gained: ${outreachLinked}

GOOGLE SEARCH CONSOLE (if data available):
- Total impressions: ${impressions > 0 ? impressions.toLocaleString() : "No GSC data yet"}
- Total clicks: ${clicks > 0 ? clicks.toLocaleString() : "No GSC data yet"}
- Avg position: ${avgPosition > 0 ? avgPosition.toFixed(1) : "No GSC data yet"}
    `.trim();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an SEO growth analyst for SammaPix.com, a free image tools SaaS. Analyze this 2-week data and provide:
1) What's working
2) What's not working
3) 5 specific actions for next 2 weeks

Be direct and actionable. Use bullet points. Keep each section concise.

Data:
${dataContext}

Respond in this JSON format:
{
  "analysis": "Full markdown analysis here",
  "suggestions": [
    "Specific action 1",
    "Specific action 2",
    "Specific action 3",
    "Specific action 4",
    "Specific action 5"
  ]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let analysisText = text;
    let suggestions: string[] = [];

    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]) as {
          analysis: string;
          suggestions: string[];
        };
        analysisText = parsed.analysis ?? text;
        suggestions = Array.isArray(parsed.suggestions)
          ? parsed.suggestions
          : [];
      } catch {
        // Use raw text
      }
    }

    const [review] = await db
      .insert(growthStrategyReviews)
      .values({
        reviewDate: periodEnd,
        periodStart,
        periodEnd,
        analysisText,
        suggestions: JSON.stringify(suggestions),
        backlinksGained: outreachLinked,
        redditComments,
        outreachSent,
        outreachLinked,
      })
      .returning();

    return NextResponse.json({ review });
  } catch (err) {
    console.error("[growth/strategy/review POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

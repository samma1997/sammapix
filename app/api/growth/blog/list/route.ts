import { NextResponse } from "next/server";
import { checkGrowthAuth } from "@/lib/growth/auth";
import blogList from "@/lib/generated-blog-list.json";

export const runtime = "nodejs";

export async function GET() {
  const authed = await checkGrowthAuth();
  if (!authed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json({ articles: blogList, total: blogList.length });
}

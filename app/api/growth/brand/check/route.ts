import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextResponse } from "next/server";



import { checkBrandVisibility } from "@/lib/growth/brand-tracker";

export const runtime = "nodejs";
export const maxDuration = 300;


export async function POST() {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fire and forget — check continues even if the user navigates away
  checkBrandVisibility().catch((err) => {
    console.error("[growth/brand/check] Background error:", err);
  });

  return NextResponse.json({ success: true, message: "Brand check started in background" });
}

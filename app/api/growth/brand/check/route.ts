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

  try {
    const result = await checkBrandVisibility();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[growth/brand/check POST]", err);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { validateOrigin } from "@/lib/api-security";
import { getReferralStats } from "@/lib/referral";

export async function GET(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Authentication required", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json(
      { error: "User ID not found", code: "NO_USER_ID" },
      { status: 400 }
    );
  }

  try {
    const stats = await getReferralStats(userId);
    return NextResponse.json(stats);
  } catch (err) {
    console.error("[referral/stats] Error:", err);
    return NextResponse.json(
      { error: "Failed to get referral stats", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

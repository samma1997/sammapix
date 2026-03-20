import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { validateOrigin } from "@/lib/api-security";
import { getOrCreateReferralCode, storeReferrerEmail } from "@/lib/referral";

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
    // Store email mapping so referrer can receive credits later
    await storeReferrerEmail(userId, session.user.email);

    const code = await getOrCreateReferralCode(userId);
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com").trim();
    const referralLink = `${appUrl}/?ref=${code}`;

    return NextResponse.json({
      code,
      link: referralLink,
    });
  } catch (err) {
    console.error("[referral/generate] Error:", err);
    return NextResponse.json(
      { error: "Failed to generate referral code", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

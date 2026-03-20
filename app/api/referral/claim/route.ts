import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { validateOrigin } from "@/lib/api-security";
import { trackReferralSignup, isValidReferralCode, storeUserIp } from "@/lib/referral";
import { z } from "zod";

const ClaimSchema = z.object({
  code: z.string().regex(/^SPIX-[A-Z0-9]{4}$/, "Invalid referral code format"),
});

/**
 * POST /api/referral/claim
 *
 * Called by the client after a new user signs up to claim the referral bonus.
 * The client reads the `sammapix_ref` cookie and sends the code here.
 *
 * This approach works around NextAuth v4's limitation where events.signIn
 * doesn't have access to request cookies.
 */
export async function POST(request: NextRequest) {
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

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const parsed = ClaimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid referral code", code: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const { code } = parsed.data;

  if (!isValidReferralCode(code)) {
    return NextResponse.json(
      { error: "Invalid referral code format", code: "INVALID_CODE" },
      { status: 400 }
    );
  }

  // Get client IP for anti-fraud
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    undefined;

  // Store this user's IP for future fraud detection
  if (ip) {
    await storeUserIp(userId, ip);
  }

  try {
    const success = await trackReferralSignup(
      code,
      userId,
      session.user.email,
      ip
    );

    if (success) {
      // Clear the referral cookie after successful claim
      const response = NextResponse.json({
        success: true,
        message: "Referral bonus applied! You received 50 bonus AI operations.",
      });
      response.cookies.set("sammapix_ref", "", {
        maxAge: 0,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Referral could not be applied. The code may be invalid or already used.",
        code: "REFERRAL_FAILED",
      },
      { status: 400 }
    );
  } catch (err) {
    console.error("[referral/claim] Error:", err);
    return NextResponse.json(
      { error: "Failed to claim referral", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

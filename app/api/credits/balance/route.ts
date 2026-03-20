import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getCreditBalance } from "@/lib/credits";
import { validateOrigin } from "@/lib/api-security";

export async function GET(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Login required", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const credits = await getCreditBalance(session.user.email);
  return NextResponse.json({ credits });
}

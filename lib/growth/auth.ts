import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { ADMIN_EMAILS } from "@/lib/constants";

/**
 * Check if the request is authorized for Growth Dashboard.
 * Supports both:
 * 1. NextAuth session (main domain admin)
 * 2. Growth cookie auth (growth.sammapix.com)
 */
export async function checkGrowthAuth(): Promise<boolean> {
  // Check growth cookie first (works on subdomain)
  const cookieStore = await cookies();
  const growthSession = cookieStore.get("growth_session")?.value;
  const expectedSecret = process.env.GROWTH_SESSION_SECRET || "REDACTED";

  if (growthSession === expectedSecret) {
    return true;
  }

  // Fall back to NextAuth (works on main domain)
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.email && ADMIN_EMAILS.includes(session.user.email)) {
      return true;
    }
  } catch {
    // NextAuth may fail on growth subdomain — that's fine
  }

  return false;
}

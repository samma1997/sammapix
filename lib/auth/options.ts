import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

/** How often (ms) we re-check the user's plan from Stripe in the JWT callback. */
const PLAN_REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        // First sign-in- always fetch plan immediately
        const { getUserPlan } = await import("@/lib/user-plan");
        token.plan = await getUserPlan(user.email);
        token.planCheckedAt = Date.now();
        token.aiRenameUsedToday = 0;
      } else if (token.email) {
        // Subsequent JWT refreshes- re-check plan every PLAN_REFRESH_INTERVAL_MS
        const lastChecked = (token.planCheckedAt as number) ?? 0;
        if (Date.now() - lastChecked > PLAN_REFRESH_INTERVAL_MS) {
          try {
            const { getUserPlan } = await import("@/lib/user-plan");
            token.plan = await getUserPlan(token.email as string);
            token.planCheckedAt = Date.now();
          } catch {
            // Keep existing plan on error- will retry on next interval
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; plan?: string; aiRenameUsedToday?: number }).id = token.sub;
        (session.user as { id?: string; plan?: string; aiRenameUsedToday?: number }).plan =
          (token.plan as string) ?? "free";
        (session.user as { id?: string; plan?: string; aiRenameUsedToday?: number }).aiRenameUsedToday =
          (token.aiRenameUsedToday as number) ?? 0;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the URL is the base or root, always redirect to /dashboard after sign-in
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/dashboard`;
      }
      // Allow relative URLs (e.g., callbackUrl=/tools)
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow same-origin redirects
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Default fallback: go to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
  events: {
    async signIn({ user }) {
      if (!user.email) return;
      const { addToAudience } = await import("@/lib/resend");
      const isNew = await addToAudience(user.email, user.name ?? null);
      if (isNew) {
        const { sendWelcomeEmail } = await import("@/lib/email-service");
        await sendWelcomeEmail(user.email, user.name ?? null);
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

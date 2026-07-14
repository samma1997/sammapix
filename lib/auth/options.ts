import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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
    CredentialsProvider({
      id: "stripe-checkout",
      name: "Stripe Checkout",
      credentials: {
        session_id: { label: "Session ID", type: "text" },
      },
      async authorize(credentials) {
        const sessionId = credentials?.session_id ?? "";

        // Basic format validation — never trust the client
        if (!sessionId.startsWith("cs_")) return null;

        try {
          // Monouso: impedisce riuso del session_id per creare più sessioni
          const { exec: redisExec } = await import("@/lib/redis");
          const usedKey = `stripe-login-used:${sessionId}`;
          const alreadyUsed = await redisExec<string | null>(["GET", usedKey]);
          if (alreadyUsed !== null) {
            console.warn(`[stripe-checkout] session_id already used: ${sessionId.slice(0, 20)}...`);
            return null;
          }

          const { stripe } = await import("@/lib/stripe");
          const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer"],
          });

          // Accetta SOLO sessioni completate (copre pagamenti one-time + trial)
          // payment_status può essere "no_payment_required" per i trial — NON filtrare su di esso
          if (session.status !== "complete") return null;

          const email = session.customer_details?.email?.trim();
          if (!email) return null;

          // Marca il session_id come usato (TTL 1h per pulizia automatica Redis)
          await redisExec(["SET", usedKey, "1", "EX", 3600]);

          return {
            id: email,
            email,
            name: session.customer_details?.name ?? null,
          };
        } catch (err) {
          // Mai throware — crasherebbe NextAuth. Logga e ritorna null.
          console.error(
            "[stripe-checkout] authorize error:",
            err instanceof Error ? err.message : err
          );
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    // Capture every OAuth sign-in (Google/GitHub) into the Resend nurture
    // audience. This is the missing funnel rung: free users who sign in to
    // remove ads now enter the email drip and get nurtured toward a trial.
    // Fire-and-forget — never block or fail the login on email-capture errors.
    async signIn({ user, account }) {
      if (user?.email && account?.provider && account.provider !== "credentials") {
        import("@/lib/resend")
          .then(({ addToAudience }) => addToAudience(user.email as string, user.name ?? null))
          .catch(() => {});
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        // First sign-in- always fetch plan immediately
        const { getUserPlan } = await import("@/lib/user-plan");
        token.plan = await getUserPlan(user.email);
        token.planCheckedAt = Date.now();
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
    async signIn({ user, account }) {
      if (!user.email) return;
      const { addToAudience } = await import("@/lib/resend");
      const isNew = await addToAudience(user.email, user.name ?? null);
      if (isNew) {
        const { sendWelcomeEmail } = await import("@/lib/email-service");
        await sendWelcomeEmail(user.email, user.name ?? null);

        // Fire Meta Conversions API - CompleteRegistration for new users
        const { sendMetaEvent } = await import("@/lib/meta-conversions");
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://sammapix.com").trim();
        sendMetaEvent({
          eventName: "CompleteRegistration",
          sourceUrl: `${appUrl}/auth/signin`,
          email: user.email,
          customData: { status: "new_user" },
        }).catch(() => {});

        // Fire GA4 'sign_up' event server-side. The _ga cookie isn't
        // accessible in NextAuth events callbacks, so we use email as
        // client_id — GA4 will still attribute it to the same user
        // across sessions via user_id matching.
        const { sendGA4Event } = await import("@/lib/ga4-server");
        sendGA4Event({
          clientId: user.email,
          userId: user.email,
          events: [{
            name: "sign_up",
            params: {
              method: account?.provider ?? "unknown",
            },
          }],
        }).catch(() => {});
      }

      // Store user's email → userId mapping for the referral system.
      // The referral claim itself happens client-side via POST /api/referral/claim
      // because NextAuth v4 events don't have access to request cookies.
      if (user.id) {
        const { storeReferrerEmail } = await import("@/lib/referral");
        storeReferrerEmail(user.id, user.email).catch(() => {});
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

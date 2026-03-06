import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

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
      if (user) {
        token.plan = "free";
        token.aiRenameUsedToday = 0;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (
          session.user as {
            id?: string;
            plan?: string;
            aiRenameUsedToday?: number;
          }
        ).id = token.sub;
        (
          session.user as {
            id?: string;
            plan?: string;
            aiRenameUsedToday?: number;
          }
        ).plan = (token.plan as string) ?? "free";
        (
          session.user as {
            id?: string;
            plan?: string;
            aiRenameUsedToday?: number;
          }
        ).aiRenameUsedToday = (token.aiRenameUsedToday as number) ?? 0;
      }
      return session;
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

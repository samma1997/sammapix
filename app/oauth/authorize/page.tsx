/**
 * OAuth authorization endpoint (browser) — /oauth/authorize
 *
 * Validates the request, brokers login to our existing Google auth, then shows
 * a consent screen. On approval the ConsentScreen calls /api/oauth/approve,
 * which mints the PKCE code and redirects back to the MCP client.
 */
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { getClient } from "@/lib/oauth/store";
import { APP_URL } from "@/lib/constants";
import ConsentScreen from "@/components/oauth/ConsentScreen";

export const runtime = "nodejs";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

function ErrorCard({ title, detail }: { title: string; detail: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#191919] px-4">
      <div className="max-w-md w-full rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-6 text-center">
        <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">{title}</h1>
        <p className="text-sm text-[#737373]">{detail}</p>
      </div>
    </main>
  );
}

export default async function AuthorizePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const params = {
    response_type: one(sp.response_type),
    client_id: one(sp.client_id),
    redirect_uri: one(sp.redirect_uri),
    code_challenge: one(sp.code_challenge),
    code_challenge_method: one(sp.code_challenge_method),
    state: one(sp.state),
    scope: one(sp.scope) || "mcp",
    resource: one(sp.resource),
  };

  // Validate the request BEFORE any redirect back to the client.
  if (params.response_type !== "code") return <ErrorCard title="Unsupported response type" detail="Only the authorization code flow is supported." />;
  if (params.code_challenge_method !== "S256" || !params.code_challenge) return <ErrorCard title="PKCE required" detail="This server requires PKCE with S256." />;
  const client = params.client_id ? await getClient(params.client_id) : null;
  if (!client) return <ErrorCard title="Unknown client" detail="This application is not registered. Try reconnecting." />;
  if (!params.redirect_uri || !client.redirect_uris.includes(params.redirect_uri)) {
    return <ErrorCard title="Invalid redirect" detail="The redirect URL does not match the registered application." />;
  }

  // Broker login to Google (existing auth). Come back here afterwards.
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    const callbackUrl = `${APP_URL}/oauth/authorize?${qs}`;
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return (
    <ConsentScreen
      params={params}
      clientName={client.client_name || "An AI application"}
      userEmail={session!.user!.email!}
    />
  );
}

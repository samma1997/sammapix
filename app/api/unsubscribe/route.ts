import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json({ success: true });
    }

    // Update contact to unsubscribed in Resend
    await resend.contacts.update({
      audienceId,
      id: email,
      unsubscribed: true,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[unsubscribe] Error:", err instanceof Error ? err.message : err);
    // Return success anyway — don't leak internal errors and assume unsubscribed
    return NextResponse.json({ success: true });
  }
}

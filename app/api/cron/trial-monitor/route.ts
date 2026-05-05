import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendTrialEndingSoonEmail } from "@/lib/email-service";

export const runtime = "nodejs";

/**
 * Trial reminder cron — fires daily.
 *
 * Queries Stripe for subscriptions with status=trialing whose trial_end is
 * between 24h and 72h from now. Sends a heads-up email so the user knows
 * the card is about to be charged and can cancel without surprise (or stay
 * with intent).
 *
 * Idempotency: Stripe subscription metadata.trial_reminder_sent flag prevents
 * duplicate sends if cron fires twice in the same day or scope window
 * overlaps.
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  const windowStart = now + 24 * 60 * 60; // 24h from now
  const windowEnd = now + 72 * 60 * 60; // 72h from now (catches day 5-6 of a 7-day trial)

  const sent: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  try {
    const subs = await stripe.subscriptions.list({
      status: "trialing",
      limit: 100,
    });

    for (const sub of subs.data) {
      if (!sub.trial_end) continue;
      if (sub.trial_end < windowStart || sub.trial_end > windowEnd) continue;
      if (sub.metadata?.trial_reminder_sent === "true") {
        skipped.push(sub.id);
        continue;
      }

      // Get the customer email
      const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      let email: string | null = null;
      let name: string | null = null;
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (!customer.deleted) {
          email = customer.email ?? null;
          name = customer.name ?? null;
        }
      } catch (err) {
        errors.push(`${sub.id}: customer fetch failed - ${err instanceof Error ? err.message : err}`);
        continue;
      }

      if (!email) {
        errors.push(`${sub.id}: no customer email`);
        continue;
      }

      const daysLeft = Math.max(1, Math.round((sub.trial_end - now) / (24 * 60 * 60)));

      try {
        await sendTrialEndingSoonEmail(email, name, daysLeft);
        // Mark as sent on Stripe metadata for idempotency
        await stripe.subscriptions.update(sub.id, {
          metadata: { ...sub.metadata, trial_reminder_sent: "true" },
        });
        sent.push(`${sub.id}:${email}:${daysLeft}d`);
      } catch (err) {
        errors.push(`${sub.id}: send failed - ${err instanceof Error ? err.message : err}`);
      }
    }

    return NextResponse.json({
      checked: subs.data.length,
      sent: sent.length,
      skipped: skipped.length,
      errored: errors.length,
      details: { sent, skipped, errors },
    });
  } catch (err) {
    console.error("[trial-monitor] Stripe error:", err);
    return NextResponse.json(
      { error: "Stripe error", code: "STRIPE_ERROR" },
      { status: 500 }
    );
  }
}

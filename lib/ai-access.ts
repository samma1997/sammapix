/**
 * "Pro, but no AI" access tier.
 *
 * Emails listed in PRO_NO_AI_EMAILS (comma-separated) are treated as Pro for
 * every non-AI feature (no ads, batch, ZIP, no file limits — see getUserPlan),
 * but are explicitly blocked from the AI endpoints (/api/ai/*), which cost real
 * money per operation. Used for complimentary Pro grants where we don't want to
 * hand out the paid AI allowance.
 */

export function proNoAiEmails(): string[] {
  return (process.env.PRO_NO_AI_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** True when this email has a "Pro without AI" grant → AI endpoints must 403. */
export function aiBlockedForEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return proNoAiEmails().includes(email.toLowerCase());
}

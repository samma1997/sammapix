/**
 * signup-nudge.ts
 *
 * Tracks cumulative download count for non-authenticated users so the
 * SignupPrompt can fire at the moment of value (after N downloads) rather
 * than only on a timer.
 *
 * Uses the same localStorage key ("sx_dl_count") that success-upsell.ts
 * already manages, so the counters stay in sync without duplication.
 *
 * Threshold: show signup nudge after the 3rd download.
 */

export const SIGNUP_NUDGE_DL_THRESHOLD = 3;
const KEY_DL_COUNT = "sx_dl_count";

/**
 * Increment the persistent download counter and return the new value.
 * No-op on the server (SSR safe).
 *
 * NOTE: This re-exports the same logic already present in success-upsell.ts
 * so callers can import from a single, intent-clear module. Both modules
 * read/write the same key — the counter is shared.
 */
export function incrementDownloadCount(): number {
  if (typeof window === "undefined") return 0;
  const current = parseInt(localStorage.getItem(KEY_DL_COUNT) ?? "0", 10);
  const next = isNaN(current) ? 1 : current + 1;
  localStorage.setItem(KEY_DL_COUNT, String(next));
  return next;
}

/** Read the current download count without modifying it. */
export function getDownloadCount(): number {
  if (typeof window === "undefined") return 0;
  const val = parseInt(localStorage.getItem(KEY_DL_COUNT) ?? "0", 10);
  return isNaN(val) ? 0 : val;
}

/**
 * Returns true when the download count has reached (or exceeded) the
 * threshold that warrants showing the signup nudge.
 */
export function shouldShowSignupNudge(dlCount: number): boolean {
  return dlCount >= SIGNUP_NUDGE_DL_THRESHOLD;
}

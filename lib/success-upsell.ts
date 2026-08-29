/**
 * success-upsell.ts
 *
 * Frequency capping logic for the "moment of value" upsell.
 * Pure, side-effect-free functions so they are trivially testable.
 *
 * Rules (all must pass to show the upsell):
 *  1. User is NOT Pro.
 *  2. At least the 2nd download of the user's lifetime (higher intent).
 *  3. Not shown in the last 24 h (cooldown persisted in localStorage).
 *  4. Called only AFTER the download has started (non-blocking).
 */

const KEY_DL_COUNT = "sx_dl_count";
const KEY_LAST_SHOWN = "sx_success_upsell_ts";
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 h

/** Increment the persistent download counter and return the new value. */
export function incrementDownloadCount(): number {
  if (typeof window === "undefined") return 0;
  const current = parseInt(localStorage.getItem(KEY_DL_COUNT) ?? "0", 10);
  const next = current + 1;
  localStorage.setItem(KEY_DL_COUNT, String(next));
  // Notify SignupPrompt so it can evaluate the threshold immediately
  try {
    window.dispatchEvent(new CustomEvent("sammapix:download-complete"));
  } catch {
    // ignore
  }
  return next;
}

/** Read the current download count without incrementing. */
export function getDownloadCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(KEY_DL_COUNT) ?? "0", 10);
}

/**
 * Decide whether to show the success upsell after a download.
 *
 * @param isPro       - whether the current session user is Pro / Day-Pass
 * @param dlCount     - the download count AFTER this download (from incrementDownloadCount)
 * @returns true when all frequency-capping conditions pass
 */
export function shouldShowSuccessUpsell(isPro: boolean, dlCount: number): boolean {
  if (isPro) return false;

  // Show from the 2nd download onwards (first-timers get a clean experience)
  if (dlCount < 2) return false;

  // Cooldown: not within 24 h of the last show
  if (typeof window !== "undefined") {
    const lastShown = parseInt(localStorage.getItem(KEY_LAST_SHOWN) ?? "0", 10);
    if (Date.now() - lastShown < COOLDOWN_MS) return false;
  }

  return true;
}

/** Record that the success upsell was shown right now. */
export function markSuccessUpsellShown(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_LAST_SHOWN, String(Date.now()));
}

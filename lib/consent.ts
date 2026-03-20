/**
 * Cookie consent state management.
 * Controls whether tracking scripts (Meta Pixel, Google Ads, AdSense) can load.
 */

export type ConsentState = "pending" | "accepted" | "rejected";

const CONSENT_KEY = "cookie_consent";

/** Read consent state from localStorage */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return "pending";
}

/** Save consent state to localStorage */
export function setConsent(state: "accepted" | "rejected"): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, state);
}

/** Check if tracking is allowed */
export function hasTrackingConsent(): boolean {
  return getConsent() === "accepted";
}

"use client";

import {
  STORAGE_ADBLOCK_DISMISSED,
  STORAGE_ADBLOCK_DISMISSED_AT,
  ADBLOCK_DISMISS_DAYS,
} from "./constants";

let cachedResult: boolean | null = null;

export async function detectAdBlock(): Promise<boolean> {
  if (cachedResult !== null) return cachedResult;

  try {
    // Try fetching a known ad script URL — result is intentionally discarded
    // (opaque response from no-cors is sufficient to confirm no blocker)
    await fetch(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      }
    );
    cachedResult = false;
    return false;
  } catch {
    cachedResult = true;
    return true;
  }
}

export function hasAdBlockBannerBeenDismissed(): boolean {
  try {
    const dismissed = localStorage.getItem(STORAGE_ADBLOCK_DISMISSED);
    if (!dismissed) return false;

    const dismissedAt = localStorage.getItem(STORAGE_ADBLOCK_DISMISSED_AT);
    if (!dismissedAt) return false;

    const dismissedDate = new Date(dismissedAt);
    const now = new Date();
    const daysDiff =
      (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

    return daysDiff < ADBLOCK_DISMISS_DAYS;
  } catch {
    return false;
  }
}

export function dismissAdBlockBanner(): void {
  try {
    localStorage.setItem(STORAGE_ADBLOCK_DISMISSED, "true");
    localStorage.setItem(STORAGE_ADBLOCK_DISMISSED_AT, new Date().toISOString());
  } catch {
    // localStorage not available
  }
}

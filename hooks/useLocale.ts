"use client";

// i18n system removed — site is English-only.
// This hook is kept as a thin shim so legacy imports continue to compile.

import { en, Dict } from "@/lib/i18n/translations";

/** Always returns the English dictionary. */
export function useLocale(): Dict {
  return en;
}

/** Always returns "en". */
export function useLocaleCode(): string {
  return "en";
}

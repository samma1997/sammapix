"use client";

import { useState, useEffect } from "react";
import { getDict, Dict } from "@/lib/i18n/translations";

function readLocaleCookie(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;)\s*NEXT_LOCALE=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "en";
}

/**
 * Returns the translated dictionary for the current user's locale.
 * Reads the NEXT_LOCALE cookie set by middleware (IP-based detection).
 * Starts with English to avoid SSR mismatch, switches after hydration.
 */
export function useLocale(): Dict {
  const [dict, setDict] = useState<Dict>(() => getDict("en"));

  useEffect(() => {
    const locale = readLocaleCookie();
    setDict(getDict(locale));
  }, []);

  return dict;
}

/** Returns the raw locale string (e.g. "it", "en", "fr") */
export function useLocaleCode(): string {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  return locale;
}

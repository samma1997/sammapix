/**
 * lib/dashboard/tool-history.ts
 *
 * Client-side helpers for recently used and favourite tools.
 * All data lives in localStorage. After every write, a custom event
 * "sammapix-tools-changed" is dispatched so any listener (e.g.
 * DashboardHome) can re-read and update immediately without a full reload.
 *
 * SSR-safe: every function is a no-op / returns [] when window is absent.
 */

const RECENT_KEY = "sammapix-recent-tools";
const FAV_KEY    = "sammapix-fav-tools";
const RECENT_CAP = 12;

function dispatch() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sammapix-tools-changed"));
}

// ─── Recent tools ────────────────────────────────────────────────────────────

export function recordToolUse(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const prev: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    // Dedup: remove previous occurrence of this slug, then unshift
    const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, RECENT_CAP);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    dispatch();
  } catch {
    // localStorage unavailable or quota exceeded — silently ignore
  }
}

export function getRecentSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

// ─── Favourite tools ─────────────────────────────────────────────────────────

export function getFavoriteSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavoriteSlugs().includes(slug);
}

export function toggleFavorite(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const favs = getFavoriteSlugs();
    const next = favs.includes(slug)
      ? favs.filter((s) => s !== slug)
      : [...favs, slug];
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
    dispatch();
  } catch {
    // silent
  }
}

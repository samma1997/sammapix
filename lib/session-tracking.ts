"use client";

/**
 * Client-side session tracking for batch tools.
 *
 * Counts batch runs + total files processed per day and per month,
 * scoped to a tool id. Stored in localStorage so it survives reloads
 * but not incognito/cleared cache (acceptable — these are anti-abuse
 * soft signals, not hard quotas).
 *
 * Also fires GA4 events so we can build a real usage distribution over
 * 30-60 days and recalibrate the limits based on actual data.
 */

import { trackEvent } from "@/lib/analytics";

interface PeriodCounter {
  batches: number;
  files: number;
}

interface StoredSession {
  day: string; // YYYY-MM-DD
  month: string; // YYYY-MM
  daily: PeriodCounter;
  monthly: PeriodCounter;
}

const STORAGE_PREFIX = "sp_session_";

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}
function monthUTC(): string {
  return new Date().toISOString().slice(0, 7);
}

function loadSession(toolId: string): StoredSession {
  if (typeof window === "undefined") {
    return {
      day: todayUTC(),
      month: monthUTC(),
      daily: { batches: 0, files: 0 },
      monthly: { batches: 0, files: 0 },
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + toolId);
    if (!raw) {
      return {
        day: todayUTC(),
        month: monthUTC(),
        daily: { batches: 0, files: 0 },
        monthly: { batches: 0, files: 0 },
      };
    }
    const parsed = JSON.parse(raw) as StoredSession;
    // Roll over if day or month changed
    const t = todayUTC();
    const m = monthUTC();
    if (parsed.day !== t) {
      parsed.day = t;
      parsed.daily = { batches: 0, files: 0 };
    }
    if (parsed.month !== m) {
      parsed.month = m;
      parsed.monthly = { batches: 0, files: 0 };
    }
    return parsed;
  } catch {
    return {
      day: todayUTC(),
      month: monthUTC(),
      daily: { batches: 0, files: 0 },
      monthly: { batches: 0, files: 0 },
    };
  }
}

function saveSession(toolId: string, session: StoredSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + toolId, JSON.stringify(session));
  } catch {
    // localStorage may be disabled or full — silent skip.
  }
}

export interface SessionStats {
  dailyBatches: number;
  dailyFiles: number;
  monthlyBatches: number;
  monthlyFiles: number;
}

/**
 * Record a completed batch run. Increments daily + monthly counters and
 * fires a GA4 event with the running totals so we can analyze the
 * distribution server-side.
 */
export function recordBatchRun(toolId: string, filesProcessed: number): SessionStats {
  const session = loadSession(toolId);
  session.daily.batches += 1;
  session.daily.files += filesProcessed;
  session.monthly.batches += 1;
  session.monthly.files += filesProcessed;
  saveSession(toolId, session);

  trackEvent(`${toolId}_batch_recorded`, {
    files: filesProcessed,
    daily_batches: session.daily.batches,
    daily_files: session.daily.files,
    monthly_batches: session.monthly.batches,
    monthly_files: session.monthly.files,
  });

  return {
    dailyBatches: session.daily.batches,
    dailyFiles: session.daily.files,
    monthlyBatches: session.monthly.batches,
    monthlyFiles: session.monthly.files,
  };
}

/** Read current stats without incrementing. */
export function getSessionStats(toolId: string): SessionStats {
  const session = loadSession(toolId);
  return {
    dailyBatches: session.daily.batches,
    dailyFiles: session.daily.files,
    monthlyBatches: session.monthly.batches,
    monthlyFiles: session.monthly.files,
  };
}

/**
 * Soft upsell thresholds. Calibrated as conservative defaults — re-tune
 * after 30-60 days of real GA4 data.
 *
 *  - Free anonymous (no signup): 3 batches/day → upsell modal
 *  - Free logged in: 10 batches/day → upsell modal
 *  - Pro: never blocked
 */
export const UPSELL_THRESHOLDS = {
  anonymousDailyBatches: 3,
  loggedDailyBatches: 10,
} as const;

export interface UpsellDecision {
  showModal: boolean;
  reason: "anonymous_daily" | "logged_daily" | null;
  current: SessionStats;
  threshold: number;
}

/**
 * Decide whether to nudge the user toward Pro after a batch run.
 * Returns showModal=true the FIRST time a threshold is crossed in the
 * current day, then suppresses for 24h (we don't want to spam).
 */
export function shouldShowUpsell(
  toolId: string,
  isLoggedIn: boolean,
  isPro: boolean
): UpsellDecision {
  const stats = getSessionStats(toolId);

  if (isPro) {
    return { showModal: false, reason: null, current: stats, threshold: 0 };
  }

  const threshold = isLoggedIn
    ? UPSELL_THRESHOLDS.loggedDailyBatches
    : UPSELL_THRESHOLDS.anonymousDailyBatches;
  const reason: UpsellDecision["reason"] = isLoggedIn ? "logged_daily" : "anonymous_daily";

  // Show only at the EXACT crossing to avoid spamming.
  if (stats.dailyBatches === threshold) {
    // Mark as shown today
    const shownKey = `${STORAGE_PREFIX}${toolId}_upsell_shown_${todayUTC()}`;
    try {
      if (typeof window !== "undefined" && !localStorage.getItem(shownKey)) {
        localStorage.setItem(shownKey, "1");
        return { showModal: true, reason, current: stats, threshold };
      }
    } catch {
      // ignore
    }
  }

  return { showModal: false, reason, current: stats, threshold };
}

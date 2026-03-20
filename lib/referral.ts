/**
 * Referral system for SammaPix.
 *
 * Referral code format: SPIX-XXXX (4 alphanumeric uppercase chars).
 * All data stored in Upstash Redis via the same REST pattern as lib/redis.ts.
 *
 * Redis keys used:
 *   referral:code:{userId}            → code (string)
 *   referral:user:{code}              → userId (string)
 *   referral:referred_by:{userId}     → code (string)
 *   referral:referrals:{userId}       → sorted set (member=newUserId, score=timestamp)
 *   referral:status:{referrerId}:{newUserId} → JSON {signupAt, converted, signupIp}
 *   referral:monthly:{userId}:{YYYY-MM} → integer count (TTL 40 days)
 *   referral:pending_months:{userId}  → integer count of free Pro months earned
 *   referral:last_ip:{userId}         → last known IP address
 */

import { addCredits } from "@/lib/credits";

// ---------------------------------------------------------------------------
// Redis transport (same pattern as lib/redis.ts and lib/credits.ts)
// ---------------------------------------------------------------------------

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

async function redisExec<T>(command: unknown[]): Promise<T | null> {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const res = await fetch(REDIS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: T };
    return data.result;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// In-memory fallback for dev (not reliable across cold starts)
// ---------------------------------------------------------------------------

const memStore = new Map<string, string>();
const memSortedSets = new Map<string, Array<{ member: string; score: number }>>();

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REFERRAL_PREFIX = "SPIX-";
const CODE_LENGTH = 4;
const MONTHLY_CAP = 50;
const SIGNUP_OPS_BONUS_NEW_USER = 50;
const SIGNUP_OPS_BONUS_REFERRER = 25;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReferralStatus {
  signupAt: number;
  converted: boolean;
  signupIp?: string;
  newUserEmail: string;
}

export interface ReferralStats {
  referralCode: string | null;
  totalReferrals: number;
  opsEarned: number;
  conversions: number;
  pendingMonths: number;
  recentReferrals: Array<{
    userId: string;
    email: string;
    signupAt: number;
    converted: boolean;
  }>;
}

// ---------------------------------------------------------------------------
// Code generation (deterministic hash-based)
// ---------------------------------------------------------------------------

function hashToCode(input: string): string {
  // Simple deterministic hash → 4 uppercase alphanumeric chars
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    hash = ((hash << 5) - hash + ch) | 0;
  }
  // Make positive
  hash = Math.abs(hash);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += chars[hash % chars.length];
    hash = Math.floor(hash / chars.length) + i * 7 + 1;
  }
  return `${REFERRAL_PREFIX}${code}`;
}

/** Validate that a string matches the SPIX-XXXX format. */
export function isValidReferralCode(code: string): boolean {
  return /^SPIX-[A-Z0-9]{4}$/.test(code);
}

// ---------------------------------------------------------------------------
// Core functions
// ---------------------------------------------------------------------------

/**
 * Generate a deterministic referral code for a user and store it in Redis.
 */
export async function generateReferralCode(userId: string): Promise<string> {
  const code = hashToCode(userId);

  if (redisConfigured) {
    // Check for collision: if code already maps to a different user, append salt
    const existingUser = await redisExec<string | null>(["GET", `referral:user:${code}`]);
    if (existingUser !== null && existingUser !== userId) {
      // Collision — append userId length as salt and regenerate
      const saltedCode = hashToCode(`${userId}:${userId.length}`);
      await redisExec(["SET", `referral:code:${userId}`, saltedCode]);
      await redisExec(["SET", `referral:user:${saltedCode}`, userId]);
      return saltedCode;
    }
    await redisExec(["SET", `referral:code:${userId}`, code]);
    await redisExec(["SET", `referral:user:${code}`, userId]);
  } else {
    memStore.set(`referral:code:${userId}`, code);
    memStore.set(`referral:user:${code}`, userId);
  }

  return code;
}

/**
 * Get existing referral code from Redis.
 */
export async function getReferralCode(userId: string): Promise<string | null> {
  if (redisConfigured) {
    return redisExec<string | null>(["GET", `referral:code:${userId}`]);
  }
  return memStore.get(`referral:code:${userId}`) ?? null;
}

/**
 * Get existing code or create one.
 */
export async function getOrCreateReferralCode(userId: string): Promise<string> {
  const existing = await getReferralCode(userId);
  if (existing) return existing;
  return generateReferralCode(userId);
}

/**
 * Store the user's last known IP for anti-fraud comparison.
 */
export async function storeUserIp(userId: string, ip: string): Promise<void> {
  if (redisConfigured) {
    await redisExec(["SET", `referral:last_ip:${userId}`, ip]);
  } else {
    memStore.set(`referral:last_ip:${userId}`, ip);
  }
}

/**
 * Get the user's last known IP.
 */
async function getUserIp(userId: string): Promise<string | null> {
  if (redisConfigured) {
    return redisExec<string | null>(["GET", `referral:last_ip:${userId}`]);
  }
  return memStore.get(`referral:last_ip:${userId}`) ?? null;
}

// ---------------------------------------------------------------------------
// Anti-fraud
// ---------------------------------------------------------------------------

/**
 * Check if a referral is suspicious.
 * Returns true if OK, false if fraud detected.
 */
export async function checkAntifraud(
  referrerCode: string,
  newUserIp: string,
  referrerIp: string | null
): Promise<boolean> {
  // 1. Same IP check
  if (referrerIp && newUserIp === referrerIp) {
    console.warn(`[referral] Anti-fraud: same IP ${newUserIp} for code ${referrerCode}`);
    return false;
  }

  // 2. Check referrer's stored IP
  const referrerUserId = redisConfigured
    ? await redisExec<string | null>(["GET", `referral:user:${referrerCode}`])
    : memStore.get(`referral:user:${referrerCode}`) ?? null;

  if (referrerUserId) {
    const storedIp = await getUserIp(referrerUserId);
    if (storedIp && storedIp === newUserIp) {
      console.warn(`[referral] Anti-fraud: new user IP matches referrer's last IP ${newUserIp}`);
      return false;
    }
  }

  return true;
}

// ---------------------------------------------------------------------------
// Monthly key helper
// ---------------------------------------------------------------------------

function monthlyKey(userId: string): string {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return `referral:monthly:${userId}:${ym}`;
}

// ---------------------------------------------------------------------------
// Track referral signup
// ---------------------------------------------------------------------------

/**
 * Track a new user signup via referral.
 * Returns true if successful, false if fraud or invalid.
 */
export async function trackReferralSignup(
  referralCode: string,
  newUserId: string,
  newUserEmail: string,
  newUserIp?: string
): Promise<boolean> {
  if (!isValidReferralCode(referralCode)) {
    console.warn(`[referral] Invalid code format: ${referralCode}`);
    return false;
  }

  // 1. Validate code exists → get referrer userId
  let referrerId: string | null;
  if (redisConfigured) {
    referrerId = await redisExec<string | null>(["GET", `referral:user:${referralCode}`]);
  } else {
    referrerId = memStore.get(`referral:user:${referralCode}`) ?? null;
  }

  if (!referrerId) {
    console.warn(`[referral] Code not found: ${referralCode}`);
    return false;
  }

  // 2. Self-referral check
  if (referrerId === newUserId) {
    console.warn(`[referral] Self-referral blocked: ${newUserId}`);
    return false;
  }

  // 3. Check if user was already referred (first link wins)
  const existingRef = redisConfigured
    ? await redisExec<string | null>(["GET", `referral:referred_by:${newUserId}`])
    : memStore.get(`referral:referred_by:${newUserId}`) ?? null;

  if (existingRef) {
    console.log(`[referral] User ${newUserId} already referred by ${existingRef}, skipping`);
    return false;
  }

  // 4. Anti-fraud IP check
  if (newUserIp) {
    const fraudOk = await checkAntifraud(referralCode, newUserIp, null);
    if (!fraudOk) {
      return false;
    }
  }

  // 5. Monthly cap check
  const mKey = monthlyKey(referrerId);
  if (redisConfigured) {
    const currentMonthly = await redisExec<string | null>(["GET", mKey]);
    const monthlyCount = currentMonthly ? parseInt(currentMonthly, 10) : 0;
    if (monthlyCount >= MONTHLY_CAP) {
      console.warn(`[referral] Monthly cap reached for referrer ${referrerId}`);
      return false;
    }
  }

  const now = Date.now();
  const status: ReferralStatus = {
    signupAt: now,
    converted: false,
    signupIp: newUserIp,
    newUserEmail,
  };

  if (redisConfigured) {
    // 6. Store referred_by
    await redisExec(["SET", `referral:referred_by:${newUserId}`, referralCode]);

    // 7. Add to referrer's sorted set
    await redisExec(["ZADD", `referral:referrals:${referrerId}`, now, newUserId]);

    // 8. Store status
    await redisExec([
      "SET",
      `referral:status:${referrerId}:${newUserId}`,
      JSON.stringify(status),
    ]);

    // 9. Increment monthly count (40-day TTL to cover month boundary)
    await redisExec(["INCR", mKey]);
    await redisExec(["EXPIRE", mKey, 40 * 24 * 60 * 60]);

    // 10. Store new user's IP for future fraud checks
    if (newUserIp) {
      await storeUserIp(newUserId, newUserIp);
    }
  } else {
    // In-memory fallback
    memStore.set(`referral:referred_by:${newUserId}`, referralCode);
    memStore.set(
      `referral:status:${referrerId}:${newUserId}`,
      JSON.stringify(status)
    );
    const setKey = `referral:referrals:${referrerId}`;
    if (!memSortedSets.has(setKey)) {
      memSortedSets.set(setKey, []);
    }
    memSortedSets.get(setKey)!.push({ member: newUserId, score: now });
  }

  // 11. Grant bonus credits (never expire, not daily-limited)
  try {
    await addCredits(newUserEmail, SIGNUP_OPS_BONUS_NEW_USER);
    console.log(`[referral] +${SIGNUP_OPS_BONUS_NEW_USER} credits to new user ${newUserEmail}`);
  } catch (err) {
    console.error("[referral] Failed to grant new user credits:", err);
  }

  // Get referrer email for credits — we need to look it up from status records
  // Since we don't store referrer email directly, we grant credits via userId
  // by finding the email from any existing status or via a separate key
  try {
    // We need the referrer's email to add credits. Store it when generating codes.
    const referrerEmail = redisConfigured
      ? await redisExec<string | null>(["GET", `referral:email:${referrerId}`])
      : memStore.get(`referral:email:${referrerId}`) ?? null;

    if (referrerEmail) {
      await addCredits(referrerEmail, SIGNUP_OPS_BONUS_REFERRER);
      console.log(`[referral] +${SIGNUP_OPS_BONUS_REFERRER} credits to referrer ${referrerEmail}`);
    } else {
      console.warn(`[referral] Referrer email not found for ${referrerId}, credits deferred`);
    }
  } catch (err) {
    console.error("[referral] Failed to grant referrer credits:", err);
  }

  console.log(
    `[referral] Signup tracked: ${newUserEmail} referred by ${referrerId} (code: ${referralCode})`
  );
  return true;
}

// ---------------------------------------------------------------------------
// Track referral conversion (user upgrades to Pro)
// ---------------------------------------------------------------------------

/**
 * Called when a referred user upgrades to Pro.
 * Grants the referrer 1 free Pro month (stored as pending).
 * Returns true if a referral conversion was tracked.
 */
export async function trackReferralConversion(userId: string): Promise<boolean> {
  // 1. Check if user was referred
  let referralCode: string | null;
  if (redisConfigured) {
    referralCode = await redisExec<string | null>(["GET", `referral:referred_by:${userId}`]);
  } else {
    referralCode = memStore.get(`referral:referred_by:${userId}`) ?? null;
  }

  if (!referralCode) {
    return false; // Not a referred user
  }

  // 2. Find referrer
  let referrerId: string | null;
  if (redisConfigured) {
    referrerId = await redisExec<string | null>(["GET", `referral:user:${referralCode}`]);
  } else {
    referrerId = memStore.get(`referral:user:${referralCode}`) ?? null;
  }

  if (!referrerId) {
    return false;
  }

  // 3. Check if conversion reward already granted
  const statusKey = `referral:status:${referrerId}:${userId}`;
  let statusJson: string | null;
  if (redisConfigured) {
    statusJson = await redisExec<string | null>(["GET", statusKey]);
  } else {
    statusJson = memStore.get(statusKey) ?? null;
  }

  if (statusJson) {
    try {
      const status = JSON.parse(statusJson) as ReferralStatus;
      if (status.converted) {
        console.log(`[referral] Conversion already tracked for ${userId}`);
        return false;
      }
    } catch {
      // Invalid JSON, proceed with caution
    }
  }

  // 4. Grant 1 free Pro month to referrer (pending)
  if (redisConfigured) {
    await redisExec(["INCR", `referral:pending_months:${referrerId}`]);
  } else {
    const pmKey = `referral:pending_months:${referrerId}`;
    const current = parseInt(memStore.get(pmKey) ?? "0", 10);
    memStore.set(pmKey, String(current + 1));
  }

  // 5. Update status to converted
  if (statusJson) {
    try {
      const status = JSON.parse(statusJson) as ReferralStatus;
      status.converted = true;
      const updated = JSON.stringify(status);
      if (redisConfigured) {
        await redisExec(["SET", statusKey, updated]);
      } else {
        memStore.set(statusKey, updated);
      }
    } catch {
      // Best effort
    }
  }

  console.log(
    `[referral] Conversion tracked: user ${userId} upgraded, referrer ${referrerId} gets +1 Pro month`
  );
  return true;
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

/**
 * Get referral statistics for a user.
 */
export async function getReferralStats(userId: string): Promise<ReferralStats> {
  const code = await getReferralCode(userId);

  const emptyStats: ReferralStats = {
    referralCode: code,
    totalReferrals: 0,
    opsEarned: 0,
    conversions: 0,
    pendingMonths: 0,
    recentReferrals: [],
  };

  if (!code) return emptyStats;

  if (redisConfigured) {
    // Total referrals from sorted set
    const totalRaw = await redisExec<number>(["ZCARD", `referral:referrals:${userId}`]);
    const totalReferrals = totalRaw ?? 0;

    // Get recent referrals (last 20, newest first)
    const recentRaw = await redisExec<string[]>([
      "ZREVRANGE",
      `referral:referrals:${userId}`,
      0,
      19,
      "WITHSCORES",
    ]);

    const recentReferrals: ReferralStats["recentReferrals"] = [];
    let conversions = 0;

    if (recentRaw && Array.isArray(recentRaw)) {
      // ZREVRANGE WITHSCORES returns [member1, score1, member2, score2, ...]
      for (let i = 0; i < recentRaw.length; i += 2) {
        const refUserId = recentRaw[i];
        const score = parseFloat(recentRaw[i + 1]);

        // Get status for each referral
        const statusJson = await redisExec<string | null>([
          "GET",
          `referral:status:${userId}:${refUserId}`,
        ]);

        let email = "";
        let converted = false;

        if (statusJson) {
          try {
            const status = JSON.parse(statusJson) as ReferralStatus;
            email = status.newUserEmail;
            converted = status.converted;
            if (converted) conversions++;
          } catch {
            // ignore
          }
        }

        recentReferrals.push({
          userId: refUserId,
          email,
          signupAt: score,
          converted,
        });
      }
    }

    // Pending months
    const pendingRaw = await redisExec<string | null>([
      "GET",
      `referral:pending_months:${userId}`,
    ]);
    const pendingMonths = pendingRaw ? parseInt(pendingRaw, 10) : 0;

    // Ops earned = totalReferrals * 25 (referrer bonus per signup)
    const opsEarned = totalReferrals * SIGNUP_OPS_BONUS_REFERRER;

    return {
      referralCode: code,
      totalReferrals,
      opsEarned,
      conversions,
      pendingMonths,
      recentReferrals,
    };
  }

  // In-memory fallback
  const setKey = `referral:referrals:${userId}`;
  const entries = memSortedSets.get(setKey) ?? [];
  const totalReferrals = entries.length;

  let conversions = 0;
  const recentReferrals: ReferralStats["recentReferrals"] = [];

  const sorted = [...entries].sort((a, b) => b.score - a.score).slice(0, 20);
  for (const entry of sorted) {
    const statusJson = memStore.get(`referral:status:${userId}:${entry.member}`) ?? null;
    let email = "";
    let converted = false;
    if (statusJson) {
      try {
        const status = JSON.parse(statusJson) as ReferralStatus;
        email = status.newUserEmail;
        converted = status.converted;
        if (converted) conversions++;
      } catch {
        // ignore
      }
    }
    recentReferrals.push({
      userId: entry.member,
      email,
      signupAt: entry.score,
      converted,
    });
  }

  const pmKey = `referral:pending_months:${userId}`;
  const pendingMonths = parseInt(memStore.get(pmKey) ?? "0", 10);

  return {
    referralCode: code,
    totalReferrals,
    opsEarned: totalReferrals * SIGNUP_OPS_BONUS_REFERRER,
    conversions,
    pendingMonths,
    recentReferrals,
  };
}

// ---------------------------------------------------------------------------
// Store referrer email (called when generating code)
// ---------------------------------------------------------------------------

/**
 * Store the referrer's email so we can grant them credits later.
 * Should be called when generating the referral code.
 */
export async function storeReferrerEmail(userId: string, email: string): Promise<void> {
  if (redisConfigured) {
    await redisExec(["SET", `referral:email:${userId}`, email]);
  } else {
    memStore.set(`referral:email:${userId}`, email);
  }
}

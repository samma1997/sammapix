import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

/**
 * Retry helper for Neon transient errors (control-plane timeouts, cold starts).
 * Neon segnala `neon:retryable: true` su errori transitori — li ritriamo 2 volte
 * con backoff esponenziale (200ms, 600ms) prima di propagare.
 *
 * Uso: `await withDbRetry(() => db.select()...)`
 */
export async function withDbRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const cause = (err as { cause?: unknown })?.cause;
      const retryable =
        (cause as { neon?: unknown })?.neon === "retryable" ||
        JSON.stringify(cause).includes("neon:retryable") ||
        JSON.stringify(err).includes("Control plane request failed");
      if (!retryable || attempt === maxRetries) throw err;
      await new Promise((r) => setTimeout(r, 200 * Math.pow(3, attempt)));
    }
  }
  throw lastErr;
}

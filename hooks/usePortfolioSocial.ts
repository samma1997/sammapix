"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Pexels-style social layer for the portfolio lightbox:
 * - per-photo download & like counters (fetched once on open)
 * - locally-persisted "liked" set
 * - locally-persisted "license accepted" flag (accept-before-download gate)
 *
 * Everything is best-effort: a failed POST never breaks the UX, it just
 * skips the optimistic reconciliation.
 */

export interface PhotoStat {
  downloads: number;
  likes: number;
}

export type StatsMap = Record<string, PhotoStat>;

// localStorage keys (kept in one place so they are easy to audit)
const LS_ACCEPTED = "pf_dl_accepted"; // "1" once the license was accepted
const LS_LIKED = "pf_liked"; // JSON array of liked photo ids

function isBrowser() {
  return typeof window !== "undefined";
}

function readLikedSet(): Set<string> {
  if (!isBrowser()) return new Set();
  try {
    const raw = window.localStorage.getItem(LS_LIKED);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === "string")) : new Set();
  } catch {
    return new Set();
  }
}

function persistLikedSet(set: Set<string>) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(LS_LIKED, JSON.stringify([...set]));
  } catch {
    /* quota / private-mode — non-fatal */
  }
}

export function usePortfolioSocial(ids: string[]) {
  const [stats, setStats] = useState<StatsMap>({});
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  // Whether the personal-use license was already accepted on this device.
  const [accepted, setAccepted] = useState(false);

  // Hydrate client-only state after mount (SSR-safe).
  useEffect(() => {
    setLiked(readLikedSet());
    try {
      setAccepted(window.localStorage.getItem(LS_ACCEPTED) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  // One-shot stats fetch for all photos currently in the lightbox.
  // `idsKey` keeps the effect stable while avoiding re-fetch loops.
  const idsKey = ids.join(",");
  useEffect(() => {
    if (!idsKey) return;
    let cancelled = false;
    fetch(`/api/portfolio/stats?ids=${encodeURIComponent(idsKey)}`, {
      credentials: "same-origin",
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.stats) return;
        setStats(data.stats as StatsMap);
      })
      .catch(() => {
        /* social proof is non-critical */
      });
    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  const getStat = useCallback(
    (id: string): PhotoStat => stats[id] ?? { downloads: 0, likes: 0 },
    [stats]
  );

  const isLiked = useCallback((id: string) => liked.has(id), [liked]);

  // Guard so we don't fire overlapping like requests for the same id.
  const likePending = useRef<Set<string>>(new Set());

  const toggleLike = useCallback(
    async (id: string) => {
      if (likePending.current.has(id)) return;
      likePending.current.add(id);

      const wasLiked = liked.has(id);
      const nextLiked = !wasLiked;

      // Optimistic UI: flip the heart + bump the counter immediately.
      setLiked((prev) => {
        const next = new Set(prev);
        if (nextLiked) next.add(id);
        else next.delete(id);
        persistLikedSet(next);
        return next;
      });
      setStats((prev) => {
        const cur = prev[id] ?? { downloads: 0, likes: 0 };
        return {
          ...prev,
          [id]: { ...cur, likes: Math.max(0, cur.likes + (nextLiked ? 1 : -1)) },
        };
      });

      try {
        const res = await fetch("/api/portfolio/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ id, liked: nextLiked }),
        });

        if (!res.ok) throw new Error(String(res.status));

        const data = (await res.json()) as { id: string; likes: number };
        if (typeof data?.likes === "number") {
          setStats((prev) => {
            const cur = prev[id] ?? { downloads: 0, likes: 0 };
            return { ...prev, [id]: { ...cur, likes: data.likes } };
          });
        }
      } catch {
        // Rollback the optimistic change (covers 429 rate-limit + network fail).
        setLiked((prev) => {
          const next = new Set(prev);
          if (wasLiked) next.add(id);
          else next.delete(id);
          persistLikedSet(next);
          return next;
        });
        setStats((prev) => {
          const cur = prev[id] ?? { downloads: 0, likes: 0 };
          return {
            ...prev,
            [id]: { ...cur, likes: Math.max(0, cur.likes + (nextLiked ? -1 : 1)) },
          };
        });
      } finally {
        likePending.current.delete(id);
      }
    },
    [liked]
  );

  // Persist the license acceptance (after the gate dialog is confirmed).
  const markAccepted = useCallback(() => {
    setAccepted(true);
    try {
      window.localStorage.setItem(LS_ACCEPTED, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // Record a download server-side and reconcile the counter.
  const recordDownload = useCallback(async (id: string) => {
    // Optimistic +1 so the counter reacts instantly.
    setStats((prev) => {
      const cur = prev[id] ?? { downloads: 0, likes: 0 };
      return { ...prev, [id]: { ...cur, downloads: cur.downloads + 1 } };
    });
    try {
      const res = await fetch("/api/portfolio/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) return; // keep optimistic value, don't break UX
      const data = (await res.json()) as { id: string; downloads: number };
      if (typeof data?.downloads === "number") {
        setStats((prev) => {
          const cur = prev[id] ?? { downloads: 0, likes: 0 };
          return { ...prev, [id]: { ...cur, downloads: data.downloads } };
        });
      }
    } catch {
      /* best-effort: optimistic count stays */
    }
  }, []);

  return {
    getStat,
    isLiked,
    toggleLike,
    accepted,
    markAccepted,
    recordDownload,
  };
}

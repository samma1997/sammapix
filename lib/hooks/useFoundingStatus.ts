"use client";

import { useEffect, useState } from "react";

export interface FoundingStatus {
  spotsLeft: number;
  totalSpots: number;
  active: boolean;
  percentOff: number;
  amountOff: number;
}

/**
 * Reads `/api/billing/founding-status` once on mount.
 * Returns null while loading or on error → callers should fall back to default price.
 */
export function useFoundingStatus(): FoundingStatus | null {
  const [data, setData] = useState<FoundingStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/billing/founding-status")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

/** Compute discounted price (cents) given base + founding status. */
export function applyFoundingDiscount(
  basePriceCents: number,
  status: FoundingStatus | null
): number {
  if (!status || !status.active) return basePriceCents;
  if (status.percentOff > 0) {
    return Math.round(basePriceCents * (1 - status.percentOff / 100));
  }
  if (status.amountOff > 0) {
    return Math.max(0, basePriceCents - status.amountOff);
  }
  return basePriceCents;
}

"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  GrowthNotification,
  NotificationsResponse,
} from "@/types/growth-notifications";

const STORAGE_KEY = "growth_dismissed_notifications";
const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

function getDismissed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as { ids: string[]; expiresAt: string };
    if (new Date(parsed.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY);
      return new Set();
    }
    return new Set(parsed.ids);
  } catch {
    return new Set();
  }
}

function saveDismissed(ids: Set<string>) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ids: [...ids], expiresAt }),
  );
}

export function useNotifications() {
  const [all, setAll] = useState<GrowthNotification[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/growth/notifications");
      if (!res.ok) return;
      const data: NotificationsResponse = await res.json();
      setAll(data.notifications);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setDismissed(getDismissed());
    fetchNotifications();
    const interval = setInterval(fetchNotifications, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const dismiss = useCallback((id: string) => {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveDismissed(next);
      return next;
    });
  }, []);

  const dismissAll = useCallback(() => {
    const allIds = new Set(all.map((n) => n.id));
    setDismissed(allIds);
    saveDismissed(allIds);
  }, [all]);

  const active = all.filter((n) => !dismissed.has(n.id));
  const unreadCount = active.length;
  const actionCount = active.filter(
    (n) => n.type === "action_required",
  ).length;

  return {
    notifications: active,
    allNotifications: all,
    unreadCount,
    actionCount,
    loading,
    dismiss,
    dismissAll,
    refetch: fetchNotifications,
  };
}

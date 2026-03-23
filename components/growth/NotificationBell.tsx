"use client";

import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationPanel } from "./NotificationPanel";

export function NotificationBell() {
  const { notifications, unreadCount, actionCount, dismiss, dismissAll } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Update tab title with notification count
  useEffect(() => {
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) Growth HQ — SammaPix`;
    } else {
      document.title = "Growth HQ — SammaPix";
    }
  }, [unreadCount]);

  // Browser desktop notifications when new action_required items appear
  useEffect(() => {
    if (actionCount > prevCountRef.current && prevCountRef.current > 0) {
      // New action required notification appeared
      if ("Notification" in window && Notification.permission === "granted") {
        const newest = notifications.find((n) => n.type === "action_required");
        if (newest) {
          new Notification("SammaPix Growth", {
            body: `${newest.title}: ${newest.message}`,
            icon: "/favicon.ico",
            tag: newest.id,
          });
        }
      }
    }
    prevCountRef.current = actionCount;
  }, [actionCount, notifications]);

  // Request notification permission on first render
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, []);

  const hasActions = actionCount > 0;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex items-center justify-center w-7 h-7 rounded-[6px] transition-colors ${
          open
            ? "bg-[#F5F5F5] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5]"
            : "text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#525252] dark:hover:text-[#A3A3A3]"
        }`}
        aria-label="Notifiche"
      >
        <Bell className="h-4 w-4" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span
            className={`absolute -top-1 -right-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full text-[9px] font-bold text-white px-0.5 ${
              hasActions ? "bg-[#DC2626]" : "bg-[#6366F1]"
            }`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <NotificationPanel
          notifications={notifications}
          onDismiss={dismiss}
          onDismissAll={dismissAll}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

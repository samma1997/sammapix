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

  // Badge color: red if action required, orange otherwise
  const badgeColor =
    actionCount > 0
      ? "bg-[#DC2626]"
      : "bg-[#D97706]";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-1.5 rounded-[6px] text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors"
        aria-label="Notifiche"
      >
        <Bell className="h-4.5 w-4.5" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span
            className={`absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full text-[10px] font-semibold text-white px-1 ${badgeColor}`}
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

"use client";

import Link from "next/link";
import {
  AlertTriangle,
  MessageSquare,
  Target,
  Link as LinkIcon,
  FileText,
  FolderOpen,
  Eye,
  Mail,
  TrendingDown,
  X,
} from "lucide-react";
import type {
  GrowthNotification,
  NotificationType,
} from "@/types/growth-notifications";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  AlertTriangle,
  MessageSquare,
  Target,
  Link: LinkIcon,
  FileText,
  FolderOpen,
  Eye,
  Mail,
  TrendingDown,
};

const GROUP_CONFIG: Record<
  NotificationType,
  { label: string; color: string; bgColor: string }
> = {
  action_required: {
    label: "Azioni richieste",
    color: "#DC2626",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
  achievement: {
    label: "Risultati",
    color: "#16A34A",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  reminder: {
    label: "Promemoria",
    color: "#D97706",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
};

interface Props {
  notifications: GrowthNotification[];
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
  onClose: () => void;
}

export function NotificationPanel({
  notifications,
  onDismiss,
  onDismissAll,
  onClose,
}: Props) {
  const groups = (
    ["action_required", "achievement", "reminder"] as NotificationType[]
  )
    .map((type) => ({
      type,
      items: notifications.filter((n) => n.type === type),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="fixed left-56 top-4 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-[60] max-md:left-4 max-md:right-4 max-md:w-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Notifiche
        </h3>
        {notifications.length > 0 && (
          <button
            onClick={onDismissAll}
            className="text-[10px] text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-colors"
          >
            Segna tutte lette
          </button>
        )}
      </div>

      {/* Body */}
      {notifications.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-[#A3A3A3]">
          Nessuna notifica
        </div>
      ) : (
        groups.map(({ type, items }) => {
          const config = GROUP_CONFIG[type];
          return (
            <div key={type}>
              {/* Group header */}
              <div
                className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: config.color }}
              >
                {config.label} ({items.length})
              </div>
              {/* Items */}
              {items.map((n) => {
                const IconComp = ICON_MAP[n.icon] ?? AlertTriangle;
                return (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors group"
                  >
                    <div
                      className={`mt-0.5 p-1.5 rounded-[4px] shrink-0 ${config.bgColor}`}
                    >
                      <IconComp
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                        style={{ color: config.color }}
                      />
                    </div>
                    <Link
                      href={n.actionUrl}
                      onClick={onClose}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-[#A3A3A3] truncate">
                        {n.message}
                      </p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(n.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#E5E5E5] transition-all shrink-0 mt-1"
                    >
                      <X className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}

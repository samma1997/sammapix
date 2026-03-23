export type NotificationType = "action_required" | "achievement" | "reminder";

export interface GrowthNotification {
  /** Deterministic ID, e.g. "followup-overdue-42" */
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  /** Link to the relevant growth dashboard page */
  actionUrl: string;
  /** ISO date string */
  createdAt: string;
  /** Lucide icon name */
  icon: string;
}

export interface NotificationsResponse {
  notifications: GrowthNotification[];
  counts: {
    action_required: number;
    achievement: number;
    reminder: number;
    total: number;
  };
}

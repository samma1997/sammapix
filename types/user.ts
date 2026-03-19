export type Plan = "free" | "pro";

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  plan: Plan;
  aiRenameUsedToday: number;
  createdAt: Date;
}

export interface UserSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan: Plan;
    aiRenameUsedToday: number;
  };
  expires: string;
}

export interface PlanLimits {
  maxFiles: number;
  aiRenamePerDay: number;
  dailyImages: number;
  aiOpsPerDay: number;
  maxFileSizeBytes: number;
  zipDownload: boolean;
  ads: boolean;
}

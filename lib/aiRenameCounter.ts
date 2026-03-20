// Tracks unified AI ops usage per email per day in localStorage
// This is for UI display only- enforcement is server-side

const STORAGE_KEY = "sp_ai_renames";

interface DayUsage {
  email: string;
  date: string; // YYYY-MM-DD
  used: number;
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function getUsedToday(email: string): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw) as DayUsage;
    if (data.email !== email || data.date !== todayStr()) return 0;
    return data.used;
  } catch {
    return 0;
  }
}

export function setUsedToday(email: string, used: number): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ email, date: todayStr(), used })
    );
  } catch {
    // ignore (private browsing quota errors)
  }
}

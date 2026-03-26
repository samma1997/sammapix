"use client";

import { useEffect, useState } from "react";
import {
  Target,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  Mail,
  Link,
  BarChart3,
  Users,
  FileText,
  ArrowDown,
  Clock,
  Zap,
  FolderOpen,
  Youtube,
  Search,
  DollarSign,
  RefreshCw,
} from "lucide-react";

/* ── Types ── */

interface KpiEntry {
  current: number;
  target30: number;
  target60: number;
  target90: number;
}

interface PlanData {
  currentPhase: number;
  phaseLabel: string;
  daysSinceStart: number;
  kpis: Record<string, KpiEntry>;
  weeklyChecklist: Record<string, { done: number | boolean; target?: number }>;
  recentActivity: Array<{ type: string; description: string; date: string }>;
}

/* ── KPI config ── */

const KPI_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ReactNode;
    inverse?: boolean;
    suffix?: string;
  }
> = {
  weeklyUsers: {
    label: "Utenti/settimana",
    icon: <Users className="h-4 w-4" strokeWidth={1.5} />,
  },
  backlinks: {
    label: "Backlink ottenuti",
    icon: <Link className="h-4 w-4" strokeWidth={1.5} />,
  },
  blogPosts: {
    label: "Articoli blog",
    icon: <FileText className="h-4 w-4" strokeWidth={1.5} />,
  },
  avgPosition: {
    label: "Posizione media Google",
    icon: <ArrowDown className="h-4 w-4" strokeWidth={1.5} />,
    inverse: true,
  },
  proSubscribers: {
    label: "Abbonati Pro",
    icon: <DollarSign className="h-4 w-4" strokeWidth={1.5} />,
  },
  redditComments: {
    label: "Commenti Reddit",
    icon: <MessageSquare className="h-4 w-4" strokeWidth={1.5} />,
  },
  outreachSent: {
    label: "Email outreach inviate",
    icon: <Mail className="h-4 w-4" strokeWidth={1.5} />,
  },
  outreachReplied: {
    label: "Risposte outreach",
    icon: <Mail className="h-4 w-4" strokeWidth={1.5} />,
  },
  directories: {
    label: "Directory listati",
    icon: <FolderOpen className="h-4 w-4" strokeWidth={1.5} />,
  },
};

const CHECKLIST_CONFIG: Record<string, { label: string; isBoolean?: boolean }> = {
  redditComments: { label: "Commenti Reddit" },
  blogPosts: { label: "Articoli blog" },
  outreachEmails: { label: "Email outreach" },
  youtubeUpdate: { label: "Aggiornamento YouTube", isBoolean: true },
  youtubeRefresh: { label: "Aggiornamento YouTube", isBoolean: true },
  searchConsoleSync: { label: "Sync Search Console", isBoolean: true },
  gscSync: { label: "Sync Search Console", isBoolean: true },
};

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  reddit: <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />,
  outreach: <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />,
  content: <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />,
  seo: <Search className="h-3.5 w-3.5" strokeWidth={1.5} />,
  directory: <FolderOpen className="h-3.5 w-3.5" strokeWidth={1.5} />,
  backlink: <Link className="h-3.5 w-3.5" strokeWidth={1.5} />,
  revenue: <DollarSign className="h-3.5 w-3.5" strokeWidth={1.5} />,
  youtube: <Youtube className="h-3.5 w-3.5" strokeWidth={1.5} />,
  indexing: <Search className="h-3.5 w-3.5" strokeWidth={1.5} />,
  launch: <DollarSign className="h-3.5 w-3.5" strokeWidth={1.5} />,
  other: <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />,
};

/* ── Helpers ── */

function getTargetForPhase(kpi: KpiEntry, phase: number): number {
  if (phase === 1) return kpi.target30;
  if (phase === 2) return kpi.target60;
  return kpi.target90;
}

function getProgressColor(pct: number): string {
  if (pct >= 60) return "#16A34A";
  if (pct >= 30) return "#D97706";
  return "#DC2626";
}

function getStatusDot(pct: number): string {
  if (pct >= 60) return "bg-[#16A34A]";
  if (pct >= 30) return "bg-[#D97706]";
  return "bg-[#DC2626]";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);

  if (diffH < 1) return "Adesso";
  if (diffH < 24) return `${diffH}h fa`;
  if (diffD === 1) return "Ieri";
  return `${diffD}g fa`;
}

/* ── Components ── */

function PhaseIndicator({
  currentPhase,
  phaseLabel,
  daysSinceStart,
}: {
  currentPhase: number;
  phaseLabel: string;
  daysSinceStart: number;
}) {
  const phases = [
    { num: 1, label: "Fondamenta", weeks: "Sett. 1-4" },
    { num: 2, label: "Link Building", weeks: "Sett. 5-8" },
    { num: 3, label: "Scala", weeks: "Sett. 9-12" },
  ];

  const overallPct = Math.min(100, Math.round((daysSinceStart / 90) * 100));

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6366F1] text-white text-sm font-semibold">
            {currentPhase}
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Fase {currentPhase}: {phaseLabel}
            </h2>
            <p className="text-xs text-[#A3A3A3]">
              Piano di crescita 90 giorni
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Giorno {daysSinceStart}{" "}
            <span className="text-sm font-normal text-[#A3A3A3]">di 90</span>
          </div>
          <div className="text-xs text-[#A3A3A3]">{overallPct}% completato</div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="h-2 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${overallPct}%`,
            backgroundColor: "#6366F1",
          }}
        />
      </div>

      {/* Phase steps */}
      <div className="grid grid-cols-3 gap-3">
        {phases.map((p) => {
          const isActive = p.num === currentPhase;
          const isDone = p.num < currentPhase;
          return (
            <div
              key={p.num}
              className={[
                "relative rounded-[6px] p-3 border transition-colors",
                isActive
                  ? "border-[#6366F1] bg-[#6366F1]/5 dark:bg-[#6366F1]/10"
                  : isDone
                  ? "border-[#16A34A]/30 bg-[#16A34A]/5 dark:bg-[#16A34A]/10"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#191919]",
              ].join(" ")}
            >
              <div className="flex items-center gap-2 mb-1">
                {isDone ? (
                  <CheckCircle2
                    className="h-4 w-4 text-[#16A34A]"
                    strokeWidth={1.5}
                  />
                ) : isActive ? (
                  <Zap
                    className="h-4 w-4 text-[#6366F1]"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Clock
                    className="h-4 w-4 text-[#A3A3A3]"
                    strokeWidth={1.5}
                  />
                )}
                <span
                  className={[
                    "text-sm font-medium",
                    isActive
                      ? "text-[#6366F1]"
                      : isDone
                      ? "text-[#16A34A]"
                      : "text-[#A3A3A3]",
                  ].join(" ")}
                >
                  Fase {p.num}
                </span>
              </div>
              <div
                className={[
                  "text-xs font-medium",
                  isActive
                    ? "text-[#171717] dark:text-[#E5E5E5]"
                    : isDone
                    ? "text-[#525252] dark:text-[#737373]"
                    : "text-[#A3A3A3]",
                ].join(" ")}
              >
                {p.label}
              </div>
              <div className="text-[10px] text-[#A3A3A3] mt-0.5">{p.weeks}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KpiCard({
  kpiKey,
  kpi,
  phase,
}: {
  kpiKey: string;
  kpi: KpiEntry;
  phase: number;
}) {
  const config = KPI_CONFIG[kpiKey];
  if (!config) return null;

  const target = getTargetForPhase(kpi, phase);
  let pct: number;

  if (config.inverse) {
    // For position: lower is better. Starting from 50, target might be 15.
    // If current=30, target=15, starting=50 → progress = (50-30)/(50-15) = 57%
    const startValue = kpi.target30 > kpi.target90 ? kpi.target30 + 20 : 100;
    const progressRange = startValue - target;
    const currentProgress = startValue - kpi.current;
    pct = progressRange > 0 ? Math.round((currentProgress / progressRange) * 100) : 0;
  } else {
    pct = target > 0 ? Math.round((kpi.current / target) * 100) : 0;
  }

  pct = Math.max(0, Math.min(100, pct));
  const color = getProgressColor(pct);
  const dotClass = getStatusDot(pct);

  const phaseLabel = phase === 1 ? "30g" : phase === 2 ? "60g" : "90g";

  return (
    <div
      className={[
        "bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 transition-colors",
      ].join(" ")}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-[#A3A3A3]">{config.icon}</div>
          <span className="text-xs text-[#737373] dark:text-[#737373]">
            {config.label}
          </span>
        </div>
        <div className={["w-2 h-2 rounded-full mt-1", dotClass].join(" ")} />
      </div>

      <div className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
        {config.inverse ? kpi.current.toFixed(1) : kpi.current}
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-1.5 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#A3A3A3]">
          <span>{pct}%</span>
          <span>
            Target {phaseLabel}: {target}
          </span>
        </div>
      </div>
    </div>
  );
}

function WeeklyChecklist({
  checklist,
}: {
  checklist: Record<string, { done: number | boolean; target?: number }>;
}) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Checklist settimanale
        </h3>
      </div>

      <div className="space-y-3">
        {Object.entries(checklist).map(([key, item]) => {
          const config = CHECKLIST_CONFIG[key];
          if (!config) return null;

          const isBooleanItem = config.isBoolean || typeof item.done === "boolean" || !item.target;

          if (isBooleanItem) {
            const isDone = item.done === true || (typeof item.done === "number" && item.done > 0);
            return (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-[#F5F5F5] dark:border-[#252525] last:border-0"
              >
                <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                  {config.label}
                </span>
                <span
                  className={[
                    "text-sm font-medium",
                    isDone ? "text-[#16A34A]" : "text-[#DC2626]",
                  ].join(" ")}
                >
                  {isDone ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
                      Fatto
                    </span>
                  ) : (
                    "Da fare"
                  )}
                </span>
              </div>
            );
          }

          const done = typeof item.done === "number" ? item.done : 0;
          const targetVal = item.target ?? 1;
          const pct = targetVal > 0 ? Math.round((done / targetVal) * 100) : 0;
          const clampedPct = Math.min(100, pct);

          return (
            <div
              key={key}
              className="py-2 border-b border-[#F5F5F5] dark:border-[#252525] last:border-0"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                  {config.label}
                </span>
                <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                  {done}/{targetVal}{" "}
                  <span className="text-[#A3A3A3] font-normal">
                    questa settimana
                  </span>
                </span>
              </div>
              <div className="h-1.5 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${clampedPct}%`,
                    backgroundColor: getProgressColor(
                      clampedPct >= 100 ? 100 : clampedPct >= 50 ? 60 : clampedPct >= 20 ? 30 : 0
                    ),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentActivity({
  activities,
}: {
  activities: Array<{ type: string; description: string; date: string }>;
}) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-[#A3A3A3]" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Attività recenti
        </h3>
      </div>

      <div className="space-y-0">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-2.5 border-b border-[#F5F5F5] dark:border-[#252525] last:border-0"
          >
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center pt-0.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] text-[#737373] shrink-0">
                {ACTIVITY_ICONS[activity.type] || (
                  <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.5} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-snug">
                {activity.description}
              </p>
              <p className="text-[10px] text-[#A3A3A3] mt-0.5">
                {formatDate(activity.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ── */

export default function GrowthPlanPage() {
  const [data, setData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/growth/plan")
      .then((r) => {
        if (!r.ok) throw new Error("Errore nel caricamento");
        return r.json();
      })
      .then((d: PlanData | { data: PlanData }) => {
        // API may wrap in { data: ... }
        const plan = "data" in d && d.data ? d.data : d;
        setData(plan as PlanData);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Phase skeleton */}
        <div className="h-48 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
        {/* KPI grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
            />
          ))}
        </div>
        {/* Bottom skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-64 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
          <div className="h-64 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-8 text-center">
        <p className="text-sm text-[#737373]">
          {error || "Impossibile caricare il piano di crescita."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:underline"
        >
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
          Riprova
        </button>
      </div>
    );
  }

  const kpiKeys = Object.keys(KPI_CONFIG);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
          Piano di Crescita
        </h1>
        <p className="text-sm text-[#737373] mt-0.5">
          Centro di comando — il tuo piano di crescita a 90 giorni in sintesi.
        </p>
      </div>

      {/* 1. Phase Indicator */}
      <PhaseIndicator
        currentPhase={data.currentPhase}
        phaseLabel={data.phaseLabel}
        daysSinceStart={data.daysSinceStart}
      />

      {/* 2. KPI Grid */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-3">
          KPI — Obiettivi fase {data.currentPhase}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiKeys.map((key) => {
            const kpi = data.kpis[key];
            if (!kpi) return null;
            return (
              <KpiCard
                key={key}
                kpiKey={key}
                kpi={kpi}
                phase={data.currentPhase}
              />
            );
          })}
        </div>
      </div>

      {/* 3. Checklist + 4. Activity — side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyChecklist checklist={data.weeklyChecklist} />
        <RecentActivity activities={data.recentActivity} />
      </div>
    </div>
  );
}

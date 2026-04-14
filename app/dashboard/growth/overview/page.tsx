"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Eye,
  MousePointerClick,
  TrendingUp,
  Globe,
  Users,
  Crown,
  DollarSign,
  MessageSquare,
  Database,
  FileText,
  Link as LinkIcon,
  Radar,
  Brain,
  ArrowRight,
  AlertCircle,
  ChevronDown,
  Check,
  Copy,
  ExternalLink,
  SkipForward,
} from "lucide-react";

/* ─── Types ─── */

interface Problem {
  id: number;
  problem: string;
  frequency: number;
  status: string;
}

interface GscDailyRow {
  date: string;
  impressions: number;
  clicks: number;
  position: number;
  page: string;
}

interface RedditIntelRecord {
  id: number;
  subreddit: string;
  tier: string;
}

interface OverviewData {
  // Traffico
  impressions30d: number;
  clicks30d: number;
  avgPosition: number;
  indexedPages: number;
  totalPages: number;
  gscConnected: boolean;
  dailyData: { date: string; impressions: number; clicks: number }[];

  // Business
  registeredUsers: number | null;
  proUsers: number | null;
  mrr: number | null;
  redditKarma: null;

  // Content Flywheel
  problemsCount: number;
  articlesCount: number;
  backlinks: null;
  subredditsCount: number;

  // For insights
  problems: Problem[];
  topProblem: string | null;

  // GA4 quick stats
  topPages: { path: string; pageviews: number; users: number }[];
  topSources: { source: string; medium: string; sessions: number }[];
}

/* ─── Skeleton ─── */

function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className={`animate-pulse rounded-[6px] bg-[#F5F5F5] dark:bg-[#252525] ${className}`}
    />
  );
}

/* ─── Section Divider ─── */

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A3A3A3] shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
    </div>
  );
}

/* ─── KPI Card ─── */

function KpiCard({
  icon,
  value,
  label,
  note,
  loading,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  note?: string;
  loading: boolean;
}) {
  return (
    <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <div className="text-[#A3A3A3] mb-3">{icon}</div>
      {loading ? (
        <>
          <Skeleton className="h-7 w-16 mb-1.5" />
          <Skeleton className="h-3.5 w-20" />
        </>
      ) : (
        <>
          <div className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-0.5 tabular-nums">
            {value}
          </div>
          <div className="text-xs text-[#737373]">
            {label}
            {note && (
              <span className="ml-1 text-[#A3A3A3]">{note}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── CSS Bar Chart (Impressions + Clicks) ─── */

function DualBarChart({
  data,
  loading,
}: {
  data: { date: string; impressions: number; clicks: number }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-end gap-[3px] h-[180px]">
        {Array.from({ length: 30 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${20 + Math.random() * 80}%` }}
          />
        ))}
      </div>
    );
  }

  if (data.length === 0) return null;

  const maxImpressions = Math.max(...data.map((d) => d.impressions), 1);

  return (
    <div>
      {/* Chart */}
      <div className="flex items-end gap-[2px] h-[180px] mb-2">
        {data.map((d, i) => {
          const impPct = (d.impressions / maxImpressions) * 100;
          const clickPct = maxImpressions > 0 ? (d.clicks / maxImpressions) * 100 : 0;
          return (
            <div
              key={d.date}
              className="flex-1 group relative"
              style={{ height: "100%" }}
            >
              {/* Impressions bar */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-t-[2px] transition-colors group-hover:bg-[#D4D4D4] dark:group-hover:bg-[#353535]"
                style={{ height: `${Math.max(impPct, 1)}%` }}
              />
              {/* Clicks bar overlay */}
              <div
                className="absolute bottom-0 left-[20%] right-[20%] bg-[#6366F1] rounded-t-[2px] transition-colors group-hover:bg-[#818CF8]"
                style={{ height: `${Math.max(clickPct, 0.5)}%` }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10">
                <div className="bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  <div>{d.impressions.toLocaleString()} imp</div>
                  <div>{d.clicks.toLocaleString()} click</div>
                  <div className="text-[9px] opacity-70">{d.date.slice(5)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between">
        {data.map((d, i) => {
          if (i % 5 !== 0 && i !== data.length - 1) return <span key={d.date} className="flex-1" />;
          return (
            <span key={d.date} className="text-[10px] text-[#A3A3A3] flex-1 text-center">
              {d.date.slice(5)}
            </span>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
          <span className="text-[10px] text-[#A3A3A3]">Impressioni</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#6366F1]" />
          <span className="text-[10px] text-[#A3A3A3]">Click</span>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Insights ─── */

function AiInsights({
  data,
  loading,
}: {
  data: OverviewData | null;
  loading: boolean;
}) {
  if (loading || !data) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    );
  }

  const insights: string[] = [];

  if (data.avgPosition > 20) {
    insights.push(
      `Posizione media ${data.avgPosition.toFixed(1)} — obiettivo top 10. Servono piu backlink e contenuti.`
    );
  }

  if (data.indexedPages < data.totalPages / 2) {
    const missing = data.totalPages - data.indexedPages;
    insights.push(
      `${data.indexedPages} pagine indicizzate su ${data.totalPages} — ${missing} pagine non ancora in Google. Richiedi indicizzazione su GSC.`
    );
  }

  if (data.problemsCount === 0) {
    insights.push(
      "Nessun problema nel database. Usa il Radar per estrarre problemi dai thread Reddit."
    );
  }

  if (data.problemsCount > 0 && data.topProblem) {
    const truncated = data.topProblem.length > 80 ? data.topProblem.slice(0, 80) + "..." : data.topProblem;
    insights.push(
      `${data.problemsCount} problemi trovati. Il piu frequente riguarda: "${truncated}".`
    );
  }

  if (data.articlesCount > 30) {
    insights.push(
      `${data.articlesCount} articoli pubblicati — buon volume. Focus su qualita e keyword targeting.`
    );
  }

  // Always show
  insights.push(
    "Suggerimento: posta su Reddit un LPT o DAE per generare engagement e trovare nuovi problemi."
  );

  return (
    <ul className="space-y-2.5">
      {insights.map((text, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-sm text-[#525252] dark:text-[#A3A3A3]"
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6366F1] shrink-0" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Todo Types ─── */

interface TodoItem {
  id: number;
  type: string;
  title: string;
  description: string;
  actionUrl?: string;
  draftText?: string;
  status: string;
  priority: number;
}

type TodoSection = {
  key: string;
  icon: string;
  label: string;
  color: string;
  borderColor: string;
  items: TodoItem[];
};

function categorizeTodos(todos: TodoItem[]): TodoSection[] {
  const sections: TodoSection[] = [
    { key: "claude", icon: "\uD83E\uDD16", label: "Chiedi a Claude", color: "text-indigo-400", borderColor: "border-indigo-500/30", items: [] },
    { key: "reddit", icon: "\uD83D\uDD34", label: "Reddit", color: "text-red-400", borderColor: "border-red-500/30", items: [] },
    { key: "directory", icon: "\uD83D\uDCC2", label: "Directory & Backlink", color: "text-amber-400", borderColor: "border-amber-500/30", items: [] },
    { key: "content", icon: "\uD83D\uDCE2", label: "Content", color: "text-blue-400", borderColor: "border-blue-500/30", items: [] },
    { key: "social", icon: "\uD83D\uDCBC", label: "Social", color: "text-purple-400", borderColor: "border-purple-500/30", items: [] },
    { key: "seo", icon: "\uD83D\uDD0D", label: "SEO (manuale)", color: "text-green-400", borderColor: "border-green-500/30", items: [] },
    { key: "other", icon: "\uD83D\uDCCB", label: "Other", color: "text-[#A3A3A3]", borderColor: "border-gray-200 dark:border-[#2A2A2A]", items: [] },
  ];

  const sectionMap = new Map(sections.map((s) => [s.key, s]));

  for (const todo of todos) {
    const t = todo.type.toLowerCase();
    const title = todo.title.toLowerCase();

    // Claude-delegatable tasks go to top section
    if (t.includes("_claude")) {
      sectionMap.get("claude")!.items.push(todo);
    } else if (t.includes("reddit")) {
      sectionMap.get("reddit")!.items.push(todo);
    } else if (t === "directory" || (t === "backlink" && !title.includes("dev.to") && !title.includes("hashnode") && !title.includes("medium"))) {
      sectionMap.get("directory")!.items.push(todo);
    } else if (t === "content" || t === "blog" || title.includes("dev.to") || title.includes("hashnode") || title.includes("medium")) {
      sectionMap.get("content")!.items.push(todo);
    } else if (t === "linkedin" || t === "social" || title.includes("quora") || title.includes("linkedin")) {
      sectionMap.get("social")!.items.push(todo);
    } else if (t.startsWith("gsc") || t === "seo" || t === "gsc_alert") {
      sectionMap.get("seo")!.items.push(todo);
    } else {
      sectionMap.get("other")!.items.push(todo);
    }
  }

  return sections.filter((s) => s.items.length > 0);
}

/* ─── Copy Button ─── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-[4px] font-medium transition-all duration-200 shrink-0 ${
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-gray-50 dark:bg-[#252525] text-gray-500 dark:text-[#A3A3A3] border border-gray-200 dark:border-[#333] hover:text-gray-900 dark:hover:text-[#E5E5E5] hover:border-gray-300 dark:hover:border-[#444]"
      }`}
    >
      {copied ? <Check size={10} strokeWidth={2} /> : <Copy size={10} strokeWidth={1.5} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ─── Category Config ─── */

const CATEGORY_CONFIG: Record<string, { bg: string; text: string; iconBg: string; darkBg: string; darkText: string }> = {
  claude: { bg: "bg-indigo-50", text: "text-indigo-600", iconBg: "bg-indigo-100 dark:bg-indigo-900/40", darkBg: "dark:bg-indigo-950/30", darkText: "dark:text-indigo-400" },
  reddit: { bg: "bg-red-50", text: "text-red-600", iconBg: "bg-red-100 dark:bg-red-900/40", darkBg: "dark:bg-red-950/30", darkText: "dark:text-red-400" },
  directory: { bg: "bg-amber-50", text: "text-amber-600", iconBg: "bg-amber-100 dark:bg-amber-900/40", darkBg: "dark:bg-amber-950/30", darkText: "dark:text-amber-400" },
  content: { bg: "bg-blue-50", text: "text-blue-600", iconBg: "bg-blue-100 dark:bg-blue-900/40", darkBg: "dark:bg-blue-950/30", darkText: "dark:text-blue-400" },
  social: { bg: "bg-purple-50", text: "text-purple-600", iconBg: "bg-purple-100 dark:bg-purple-900/40", darkBg: "dark:bg-purple-950/30", darkText: "dark:text-purple-400" },
  seo: { bg: "bg-green-50", text: "text-green-600", iconBg: "bg-green-100 dark:bg-green-900/40", darkBg: "dark:bg-green-950/30", darkText: "dark:text-green-400" },
  other: { bg: "bg-gray-50", text: "text-gray-600", iconBg: "bg-gray-100 dark:bg-gray-800/40", darkBg: "dark:bg-gray-900/30", darkText: "dark:text-gray-400" },
};

function getCategoryForTodo(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("_claude")) return "claude";
  if (t.includes("reddit")) return "reddit";
  if (t === "directory" || t === "backlink") return "directory";
  if (t === "content" || t === "blog" || t === "content_claude") return "content";
  if (t === "linkedin" || t === "social") return "social";
  if (t.startsWith("gsc") || t === "seo" || t === "gsc_alert") return "seo";
  return "other";
}

/* ─── Single Todo Row ─── */

function TodoRow({
  todo,
  onStatusChange,
}: {
  todo: TodoItem;
  onStatusChange: (id: number, status: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isDone = todo.status === "done";
  const isSkipped = todo.status === "skipped";
  const isInactive = isDone || isSkipped;

  const isClaude = todo.type.includes("_claude");
  const category = getCategoryForTodo(todo.type);
  const catConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other;

  const estimatedTime = isClaude ? "Copia prompt"
    : todo.type.includes("reddit") ? "~2 min"
    : todo.type === "directory" || todo.type === "backlink" ? "~3 min"
    : todo.type === "blog" || todo.type === "content" || todo.type === "content_claude" ? "~15 min"
    : todo.type === "linkedin" || todo.type === "social" ? "~3 min"
    : todo.type.startsWith("gsc") || todo.type === "seo" || todo.type === "gsc_alert" ? "~1 min"
    : "~5 min";

  const categoryLabel = category === "claude" ? "Claude" : category === "reddit" ? "Reddit" : category === "directory" ? "Directory" : category === "content" ? "Content" : category === "social" ? "Social" : category === "seo" ? "SEO" : "Other";

  return (
    <div
      className={`group border rounded-xl p-3.5 transition-all duration-200 ${
        isDone
          ? "border-emerald-100 bg-emerald-50/30 opacity-60 dark:border-emerald-900/30 dark:bg-emerald-950/10"
          : isSkipped
          ? "border-gray-100 bg-gray-50/30 opacity-40 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]/30"
          : "border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:hover:border-[#3A3A3A] hover:shadow-sm bg-white dark:bg-[#1A1A1A]"
      }`}
    >
      <div className="flex gap-3">
        {/* Left: Check/Skip stacked buttons */}
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={() => onStatusChange(todo.id, isDone ? "pending" : "done")}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isDone
                ? "bg-emerald-500 text-white"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
            }`}
            title={isDone ? "Riapri" : "Completa"}
          >
            <Check size={14} strokeWidth={2.5} />
          </button>
          {!isInactive && (
            <button
              onClick={() => onStatusChange(todo.id, "skipped")}
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:bg-[#252525] dark:text-gray-500 dark:hover:bg-[#333] dark:hover:text-gray-300 transition-all duration-200"
              title="Salta"
            >
              <SkipForward size={12} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className={`text-sm font-semibold leading-snug ${isDone ? "line-through text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-gray-100"}`}>
            {todo.title}
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            {/* Category badge */}
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${catConfig.bg} ${catConfig.text} ${catConfig.darkBg} ${catConfig.darkText}`}>
              {categoryLabel}
            </span>

            {/* Priority badge (high priority) */}
            {todo.priority >= 8 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                P{todo.priority}
              </span>
            )}

            {/* Claude badge for _claude types */}
            {isClaude && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z" fill="currentColor"/></svg>
                Claude
              </span>
            )}

            {/* Time estimate */}
            {!isInactive && (
              <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {estimatedTime}
              </span>
            )}

            {/* Status badges */}
            {isDone && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">completato</span>
            )}
            {isSkipped && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">saltato</span>
            )}
          </div>

          {/* Description (expandable) */}
          {(todo.description || todo.draftText) && !isInactive && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
            >
              <ChevronDown size={12} strokeWidth={2} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
              {expanded ? "Nascondi dettagli" : "Mostra dettagli"}
            </button>
          )}

          {/* Expanded content */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
            {todo.draftText && (
              <div className="relative">
                <pre className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#222] border border-gray-100 dark:border-[#2A2A2A] p-3 rounded-lg whitespace-pre-wrap font-mono leading-relaxed max-h-[200px] overflow-y-auto">
                  {todo.draftText}
                </pre>
                <div className="absolute top-2 right-2">
                  <CopyButton text={todo.draftText} />
                </div>
              </div>
            )}
            {todo.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{todo.description}</p>
            )}
          </div>

          {/* Bottom row: URL, copy, due date */}
          {!isInactive && (todo.actionUrl || todo.draftText) && (
            <div className="flex items-center gap-2 mt-2">
              {todo.draftText && <CopyButton text={todo.draftText} />}
              {todo.actionUrl && (
                <a
                  href={todo.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-[#252525] dark:text-gray-400 dark:border-[#333] dark:hover:bg-[#333] dark:hover:text-gray-200 transition-colors shrink-0"
                >
                  <ExternalLink size={10} strokeWidth={1.5} />
                  Apri link
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Collapsible Section ─── */

function TodoSectionCard({
  section,
  onStatusChange,
}: {
  section: TodoSection;
  onStatusChange: (id: number, status: string) => void;
}) {
  const pendingCount = section.items.filter((t) => t.status === "pending").length;
  const doneCount = section.items.filter((t) => t.status === "done").length;
  const total = section.items.length;
  const progress = total > 0 ? (doneCount / total) * 100 : 0;
  const [collapsed, setCollapsed] = useState(pendingCount === 0);

  const catConfig = CATEGORY_CONFIG[section.key] || CATEGORY_CONFIG.other;

  return (
    <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#2A2A2A] shadow-sm rounded-2xl overflow-hidden transition-colors">
      {/* Section header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50/50 dark:hover:bg-[#222] transition-colors"
      >
        {/* Category icon square */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${catConfig.iconBg} shrink-0`}>
          <span className="text-base leading-none">{section.icon}</span>
        </div>

        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{section.label}</span>

        {/* Completion count */}
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {doneCount}/{total} completati
        </span>

        {/* Progress bar */}
        <div className="w-[200px] h-1.5 bg-gray-100 dark:bg-[#252525] rounded-full overflow-hidden shrink-0 hidden sm:block">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex-1" />

        {/* Collapse arrow */}
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-gray-400 dark:text-gray-500 transition-transform duration-300 ${collapsed ? "-rotate-90" : ""}`}
        />
      </button>

      {/* Items */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          collapsed ? "max-h-0" : "max-h-[3000px]"
        }`}
      >
        <div className="px-4 pb-4 space-y-2">
          {section.items
            .sort((a, b) => {
              const order = { pending: 0, done: 1, skipped: 2 };
              const ao = order[a.status as keyof typeof order] ?? 0;
              const bo = order[b.status as keyof typeof order] ?? 0;
              if (ao !== bo) return ao - bo;
              return b.priority - a.priority;
            })
            .map((todo) => (
              <TodoRow key={todo.id} todo={todo} onStatusChange={onStatusChange} />
            ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main TODO Sections Container ─── */

function TodoSections({
  todos,
  setTodos,
  fireConfetti,
}: {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  fireConfetti: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const sections = categorizeTodos(todos);
  const totalPending = todos.filter((t) => t.status === "pending").length;
  const totalDone = todos.filter((t) => t.status === "done").length;
  const totalCompleted = todos.filter((t) => t.status === "done").length;
  const overallProgress = todos.length > 0 ? (totalDone / todos.length) * 100 : 0;

  // Count done today (items marked done that are in today's list)
  const doneToday = totalDone;

  const handleStatusChange = async (id: number, newStatus: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));

    if (newStatus === "done") {
      fireConfetti();
    }

    await fetch(`/api/growth/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  // Available category keys from sections
  const availableCategories = sections.map((s) => s.key);

  // Filtered sections
  const filteredSections = activeFilter === "all"
    ? sections
    : sections.filter((s) => s.key === activeFilter);

  return (
    <div className="mb-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {/* Da fare */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#2A2A2A] rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalPending}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Da fare</p>
        </div>
        {/* Fatte oggi */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#2A2A2A] rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{doneToday}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Fatte oggi</p>
        </div>
        {/* Totale completate */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#2A2A2A] rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCompleted}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Totale completate</p>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Progresso giornaliero</h2>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-[#252525] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => setActiveFilter("all")}
          className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeFilter === "all"
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-[#252525] dark:text-gray-400 dark:hover:bg-[#333]"
          }`}
        >
          Tutti
        </button>
        {availableCategories.map((key) => {
          const sec = sections.find((s) => s.key === key);
          if (!sec) return null;
          const pending = sec.items.filter((t) => t.status === "pending").length;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key === activeFilter ? "all" : key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                activeFilter === key
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-[#252525] dark:text-gray-400 dark:hover:bg-[#333]"
              }`}
            >
              <span>{sec.icon}</span>
              {sec.label}
              {pending > 0 && (
                <span className={`text-[10px] ${activeFilter === key ? "text-gray-300 dark:text-gray-600" : "text-gray-400 dark:text-gray-500"}`}>
                  {pending}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Section cards */}
      <div className="space-y-3">
        {filteredSections.map((section) => (
          <TodoSectionCard
            key={section.key}
            section={section}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Overview Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [revenueHistory, setRevenueHistory] = useState<{ month: string; revenue: number }[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fmt = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toLocaleString("it-IT");
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [
        gscRes,
        problemsRes,
        blogRes,
        redditIntelRes,
        stripeRes,
        ga4Res,
      ] = await Promise.allSettled([
        fetch("/api/growth/gsc/data"),
        fetch("/api/growth/problems"),
        fetch("/api/growth/blog/list"),
        fetch("/api/growth/reddit-intelligence"),
        fetch("/api/growth/stripe"),
        fetch("/api/growth/analytics?days=28"),
      ]);

      // ── GSC ──
      let impressions30d = 0;
      let clicks30d = 0;
      let avgPosition = 0;
      let gscConnected = false;
      let dailyData: { date: string; impressions: number; clicks: number }[] = [];
      let indexedPages = 0;

      if (gscRes.status === "fulfilled" && gscRes.value.ok) {
        const gsc = await gscRes.value.json();
        if (gsc.daily && gsc.daily.length > 0) {
          gscConnected = true;

          // Aggregate daily data by date (rows may have multiple pages per date)
          const byDate = new Map<string, { impressions: number; clicks: number }>();
          for (const row of gsc.daily as GscDailyRow[]) {
            const existing = byDate.get(row.date);
            if (existing) {
              existing.impressions += Number(row.impressions) || 0;
              existing.clicks += Number(row.clicks) || 0;
            } else {
              byDate.set(row.date, {
                impressions: Number(row.impressions) || 0,
                clicks: Number(row.clicks) || 0,
              });
            }
          }

          dailyData = Array.from(byDate.entries())
            .map(([date, vals]) => ({ date, ...vals }))
            .sort((a, b) => a.date.localeCompare(b.date));

          impressions30d = dailyData.reduce((s, d) => s + d.impressions, 0);
          clicks30d = dailyData.reduce((s, d) => s + d.clicks, 0);

          const positions = (gsc.daily as GscDailyRow[])
            .map((r) => Number(r.position))
            .filter((p) => p > 0);
          avgPosition = positions.length > 0
            ? positions.reduce((s, p) => s + p, 0) / positions.length
            : 0;

          // Count unique indexed pages from GSC pages data
          if (gsc.pages && Array.isArray(gsc.pages)) {
            indexedPages = gsc.pages.length;
          } else {
            // Fallback: count unique pages from daily
            const uniquePages = new Set((gsc.daily as GscDailyRow[]).map((r) => r.page));
            indexedPages = uniquePages.size;
          }
        }
      }

      // ── Problems ──
      let problems: Problem[] = [];
      if (problemsRes.status === "fulfilled" && problemsRes.value.ok) {
        const d = await problemsRes.value.json();
        problems = d.problems ?? [];
      }

      const topProblem = problems.length > 0
        ? [...problems].sort((a, b) => b.frequency - a.frequency)[0]?.problem ?? null
        : null;

      // ── Blog ──
      let articlesCount = 0;
      if (blogRes.status === "fulfilled" && blogRes.value.ok) {
        const d = await blogRes.value.json();
        articlesCount = d.total ?? (d.articles?.length ?? 0);
      }

      // ── Reddit Intelligence ──
      let subredditsCount = 0;
      if (redditIntelRes.status === "fulfilled" && redditIntelRes.value.ok) {
        const d = await redditIntelRes.value.json();
        const records: RedditIntelRecord[] = d.records ?? [];
        subredditsCount = records.filter((r) => r.tier !== "blocked").length;
      }

      // ── Stripe ──
      let proUsers = 0;
      let mrr = 0;
      if (stripeRes.status === "fulfilled" && stripeRes.value.ok) {
        const s = await stripeRes.value.json();
        proUsers = s.activeSubscriptions ?? 0;
        mrr = s.mrr ?? 0;
      }

      // ── GA4 ──
      let topPages: { path: string; pageviews: number; users: number }[] = [];
      let topSources: { source: string; medium: string; sessions: number }[] = [];
      if (ga4Res.status === "fulfilled" && ga4Res.value.ok) {
        const ga4 = await ga4Res.value.json();
        topPages = (ga4.topPages ?? []).slice(0, 5);
        topSources = (ga4.sources ?? []).slice(0, 3);
      }

      setData({
        impressions30d,
        clicks30d,
        avgPosition,
        indexedPages,
        totalPages: 308,
        gscConnected,
        dailyData,
        registeredUsers: null,
        proUsers,
        mrr,
        redditKarma: null,
        problemsCount: problems.length,
        articlesCount,
        backlinks: null,
        subredditsCount,
        problems,
        topProblem,
        topPages,
        topSources,
      });

      setLastUpdate(
        new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch (e) {
      console.error("Overview fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();

    // Fetch real-time visitors
    fetch("/api/growth/analytics/realtime")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setActiveUsers(d.activeUsers ?? 0); })
      .catch(() => {});

    // Fetch daily todos
    fetch("/api/growth/todos")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.todos) setTodos(d.todos); })
      .catch(() => {});

    // Fetch revenue history
    fetch("/api/growth/stripe")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.monthlyHistory) setRevenueHistory(d.monthlyHistory); })
      .catch(() => {});

    // Poll real-time every 30s
    const interval = setInterval(() => {
      fetch("/api/growth/analytics/realtime")
        .then((r) => r.ok ? r.json() : null)
        .then((d) => { if (d) setActiveUsers(d.activeUsers ?? 0); })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // Confetti animation
  const [showConfetti, setShowConfetti] = useState(false);
  function fireConfetti() {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative">
      {/* ─── Confetti ─── */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ["#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6"];
            const color = colors[i % colors.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const size = 6 + Math.random() * 8;
            const rotation = Math.random() * 360;
            return (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${left}%`,
                  top: "-10px",
                  width: `${size}px`,
                  height: `${size * 0.6}px`,
                  backgroundColor: color,
                  borderRadius: "2px",
                  transform: `rotate(${rotation}deg)`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${1.5 + Math.random()}s`,
                }}
              />
            );
          })}
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            .animate-confetti {
              animation: confetti-fall 2s ease-out forwards;
            }
            @keyframes checkmark-draw {
              0% { stroke-dashoffset: 12; }
              100% { stroke-dashoffset: 0; }
            }
            .animate-checkmark path {
              stroke-dasharray: 12;
              animation: checkmark-draw 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}

      {/* ─── Header ─── */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <LayoutDashboard size={20} strokeWidth={1.5} className="text-[#171717] dark:text-[#E5E5E5]" />
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-[#737373]">
            Il tuo content flywheel in tempo reale
          </p>
          {lastUpdate && (
            <span className="text-[11px] text-[#A3A3A3]">
              Aggiornato alle {lastUpdate}
            </span>
          )}
          {activeUsers !== null && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              {activeUsers} {activeUsers === 1 ? "utente" : "utenti"} online
            </span>
          )}
        </div>
      </div>

      {/* ─── ROW 1: Traffico ─── */}
      <SectionLabel label="Traffico" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KpiCard
          icon={<Eye size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? fmt(data.impressions30d) : "\u2014"}
          label="Impressioni 30gg"
          loading={loading}
        />
        <KpiCard
          icon={<MousePointerClick size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? fmt(data.clicks30d) : "\u2014"}
          label="Click 30gg"
          loading={loading}
        />
        <KpiCard
          icon={<TrendingUp size={16} strokeWidth={1.5} />}
          value={data?.gscConnected ? data.avgPosition.toFixed(1) : "\u2014"}
          label="Posizione media"
          loading={loading}
        />
        <KpiCard
          icon={<Globe size={16} strokeWidth={1.5} />}
          value={
            data
              ? `${data.indexedPages} / ${data.totalPages}`
              : "\u2014"
          }
          label="Indicizzate"
          loading={loading}
        />
      </div>

      {/* ─── ROW 2: Business ─── */}
      <SectionLabel label="Business" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <KpiCard
          icon={<Crown size={16} strokeWidth={1.5} />}
          value={data?.proUsers ?? 0}
          label="Abbonati Pro"
          loading={loading}
        />
        <KpiCard
          icon={<DollarSign size={16} strokeWidth={1.5} />}
          value={`$${data?.mrr ?? 0}`}
          label="MRR"
          loading={loading}
        />
        <KpiCard
          icon={<FileText size={16} strokeWidth={1.5} />}
          value={data?.articlesCount ?? 0}
          label="Articoli blog"
          loading={loading}
        />
      </div>

      {/* ─── ROW 3: Content Flywheel ─── */}
      <SectionLabel label="Content Flywheel" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <KpiCard
          icon={<Database size={16} strokeWidth={1.5} />}
          value={data?.problemsCount ?? 0}
          label="Problemi trovati"
          loading={loading}
        />
        <KpiCard
          icon={<Radar size={16} strokeWidth={1.5} />}
          value={data?.subredditsCount ?? 0}
          label="Subreddit monitorati"
          loading={loading}
        />
        <KpiCard
          icon={<Globe size={16} strokeWidth={1.5} />}
          value={data?.gscConnected && data.impressions30d > 0 ? `${((data.clicks30d / data.impressions30d) * 100).toFixed(1)}%` : "\u2014"}
          label="CTR"
          loading={loading}
        />
      </div>

      {/* ─── Daily TODOs — Sectioned ─── */}
      {todos.length > 0 && <TodoSections todos={todos} setTodos={setTodos} fireConfetti={fireConfetti} />}

      {/* ─── Chart: Impressions + Clicks 30d ─── */}
      <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5 mb-6">
        <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-5">
          Impressioni e Click ultimi 30gg
        </h2>
        {!loading && !data?.gscConnected ? (
          <div className="flex flex-col items-center justify-center h-[180px] text-sm text-[#A3A3A3]">
            <AlertCircle size={20} strokeWidth={1.5} className="mb-2 opacity-50" />
            Collega Google Search Console
          </div>
        ) : (
          <DualBarChart
            data={data?.dailyData ?? []}
            loading={loading}
          />
        )}
      </div>

      {/* ─── GA4 Quick Stats ─── */}
      {!loading && (data?.topPages?.length || data?.topSources?.length) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Top 5 pagine */}
          {data.topPages.length > 0 && (
            <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-[#A3A3A3] mb-3">Top 5 pagine</h3>
              <div className="space-y-2">
                {data.topPages.map((p, i) => {
                  const maxPv = data.topPages[0]?.pageviews || 1;
                  return (
                    <div key={p.path} className="flex items-center gap-2">
                      <span className="text-[10px] text-[#A3A3A3] w-4 shrink-0">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs text-[#171717] dark:text-[#E5E5E5] truncate font-mono">{p.path}</span>
                          <span className="text-[10px] text-[#737373] shrink-0">{p.pageviews.toLocaleString("it-IT")} views</span>
                        </div>
                        <div className="h-1 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                          <div className="h-full bg-[#6366F1]/30 rounded-full" style={{ width: `${(p.pageviews / maxPv) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Top 3 sorgenti */}
          {data.topSources.length > 0 && (
            <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-[#A3A3A3] mb-3">Sorgenti traffico</h3>
              <div className="space-y-3">
                {data.topSources.map((s) => {
                  const maxSessions = data.topSources[0]?.sessions || 1;
                  const mediumColor = s.medium === "organic" ? "text-green-600 dark:text-green-400"
                    : s.medium === "referral" ? "text-amber-600 dark:text-amber-400"
                    : s.medium === "social" ? "text-blue-600 dark:text-blue-400"
                    : "text-[#737373]";
                  return (
                    <div key={`${s.source}-${s.medium}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{s.source}</span>
                          <span className={`text-[10px] font-medium uppercase tracking-wider ${mediumColor}`}>{s.medium}</span>
                        </div>
                        <span className="text-xs text-[#737373]">{s.sessions.toLocaleString("it-IT")} sessioni</span>
                      </div>
                      <div className="h-1.5 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                        <div className="h-full bg-[#171717] dark:bg-[#E5E5E5] rounded-full" style={{ width: `${(s.sessions / maxSessions) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* ─── Revenue History ─── */}
      {revenueHistory.length > 0 && (
        <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4 mb-6">
          <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-[#A3A3A3] mb-3">Revenue ultimi 6 mesi</h3>
          <div className="flex items-end gap-2 h-[80px]">
            {revenueHistory.map((m) => {
              const maxRev = Math.max(...revenueHistory.map((r) => r.revenue), 1);
              const pct = (m.revenue / maxRev) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    className="w-full bg-[#171717] dark:bg-[#E5E5E5] rounded-t-[3px] transition-colors group-hover:bg-[#6366F1] min-h-[2px]"
                    style={{ height: `${Math.max(pct, 3)}%` }}
                  />
                  <span className="text-[9px] text-[#A3A3A3]">{m.month.slice(5)}</span>
                  <div className="absolute bottom-full mb-1 hidden group-hover:block z-10">
                    <div className="bg-[#171717] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                      ${m.revenue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── AI Insights ─── */}
      <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={16} strokeWidth={1.5} className="text-[#6366F1]" />
          <h2 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            AI Insights
          </h2>
        </div>
        <AiInsights data={data} loading={loading} />
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/growth/radar"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#171717] hover:bg-[#262626] dark:bg-[#E5E5E5] dark:text-[#171717] dark:hover:bg-[#D4D4D4] rounded-[6px] transition-colors"
        >
          Apri Radar
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
        <Link
          href="/dashboard/growth/problems"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-[6px] transition-colors"
        >
          Vedi Problemi
        </Link>
        <Link
          href="/dashboard/growth/blog"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] rounded-[6px] transition-colors"
        >
          Blog
        </Link>
      </div>
    </div>
  );
}

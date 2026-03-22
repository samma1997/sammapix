"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  UserPlus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { RevenueStats } from "@/lib/growth/stripe-stats";

function formatCents(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

function formatMonth(month: string): string {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <div className="text-[#A3A3A3] mb-3">{icon}</div>
      <div className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
        {value}
      </div>
      <div className="text-sm text-[#737373]">{label}</div>
      {sub && <div className="text-xs text-[#A3A3A3] mt-1">{sub}</div>}
    </div>
  );
}

function RevenueBarChart({
  history,
}: {
  history: RevenueStats["monthlyHistory"];
}) {
  const maxRevenue = Math.max(...history.map((h) => h.revenue), 1);

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-4">
        Storico ricavi (6 mesi)
      </h3>
      <div className="flex items-end gap-2 h-28">
        {history.map((month) => {
          const heightPct =
            maxRevenue > 0
              ? Math.max(2, (month.revenue / maxRevenue) * 100)
              : 2;
          return (
            <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
              <div
                title={formatCents(month.revenue)}
                className="w-full bg-[#171717] dark:bg-[#E5E5E5] rounded-[3px] transition-all"
                style={{ height: `${heightPct}%` }}
              />
              <span className="text-[9px] text-[#A3A3A3] whitespace-nowrap">
                {formatMonth(month.month)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RevenuePage() {
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/growth/revenue")
      .then((r) => r.json())
      .then(
        (data: { stats?: RevenueStats; error?: string }) => {
          if (data.stats) setStats(data.stats);
          else setError(data.error ?? "Unknown error");
        }
      )
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-28 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="text-sm text-[#737373]">
          Nessun abbonato Pro ancora. I dati sui ricavi appariranno qui quando gli utenti
          faranno l&apos;upgrade.
        </p>
        {error && error !== "Stripe not configured" && (
          <p className="text-xs text-[#A3A3A3]">{error}</p>
        )}
      </div>
    );
  }

  // Show empty state if truly no revenue
  const hasRevenue =
    stats.activeSubscriptions > 0 || stats.revenueThisMonth > 0;

  if (!hasRevenue) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={<DollarSign className="h-4 w-4" strokeWidth={1.5} />}
            label="MRR"
            value="€0"
            sub="Nessun abbonamento attivo ancora"
          />
          <StatCard
            icon={<Users className="h-4 w-4" strokeWidth={1.5} />}
            label="Abbonati attivi"
            value="0"
          />
          <StatCard
            icon={<UserPlus className="h-4 w-4" strokeWidth={1.5} />}
            label="Nuovi questo mese"
            value="0"
          />
        </div>
        <div className="text-center py-8 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
          <p className="text-sm text-[#737373]">
            Nessun abbonato Pro ancora. I dati sui ricavi appariranno qui con l&apos;upgrade degli utenti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<DollarSign className="h-4 w-4" strokeWidth={1.5} />}
          label="MRR"
          value={formatCents(stats.mrr)}
          sub="Ricavi ricorrenti mensili"
        />
        <StatCard
          icon={<Users className="h-4 w-4" strokeWidth={1.5} />}
          label="Active Subscribers"
          value={String(stats.activeSubscriptions)}
          sub="Abbonati piano Pro"
        />
        <StatCard
          icon={<UserPlus className="h-4 w-4" strokeWidth={1.5} />}
          label="New This Month"
          value={String(stats.newThisMonth)}
          sub="nuovi upgrade Pro"
        />
        <StatCard
          icon={<TrendingDown className="h-4 w-4" strokeWidth={1.5} />}
          label="Tasso abbandono"
          value={`${stats.churnRate}%`}
          sub="cancellazioni / totale questo mese"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" strokeWidth={1.5} />}
          label="Ricavi questo mese"
          value={formatCents(stats.revenueThisMonth)}
          sub="totale incassato"
        />
      </div>

      {/* Bar chart */}
      <RevenueBarChart history={stats.monthlyHistory} />

      {/* Recent subscribers */}
      {stats.recentSubscribers.length > 0 && (
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3A3A3]">
              Ultimi abbonati Pro
            </h3>
          </div>
          <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {stats.recentSubscribers.map((sub, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
                    <Users className="h-3 w-3 text-[#A3A3A3]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                    {sub.email}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#737373]">{sub.date}</div>
                  {sub.amount > 0 && (
                    <div className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
                      {formatCents(sub.amount)}/mo
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

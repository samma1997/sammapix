"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Crown,
  DollarSign,
  UserPlus,
  Search,
  AlertCircle,
} from "lucide-react";

/* ─── Types ─── */

interface Contact {
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  unsubscribed: boolean;
}

interface UtentiData {
  total: number;
  active: number;
  unsubscribed: number;
  proSubscribers: number;
  mrr: number;
  signupsToday: number;
  signupsWeek: number;
  signupsMonth: number;
  contacts: Contact[];
}

/* ─── Helpers ─── */

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const visible = local.length >= 3 ? local.slice(0, 3) : local;
  return `${visible}***@${domain}`;
}

const MONTH_SHORT_IT = [
  "gen", "feb", "mar", "apr", "mag", "giu",
  "lug", "ago", "set", "ott", "nov", "dic",
];

function fmtDateIT(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTH_SHORT_IT[d.getMonth()]} ${d.getFullYear()}`;
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

/* ─── KPI Card ─── */

function KPICard({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  loading: boolean;
}) {
  return (
    <div className="rounded-[6px] border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#A3A3A3]">{icon}</span>
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-medium">{label}</span>
      </div>
      {loading ? (
        <Skeleton style={{ width: 80, height: 28 }} />
      ) : (
        <p className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">{value}</p>
      )}
    </div>
  );
}

/* ─── Page ─── */

export default function UtentiPage() {
  const [data, setData] = useState<UtentiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/growth/utenti")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!data?.contacts) return [];
    if (!search.trim()) return data.contacts;
    const q = search.toLowerCase();
    return data.contacts.filter((c) => c.email.toLowerCase().includes(q));
  }, [data, search]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <Users size={20} strokeWidth={1.5} className="text-[#737373]" />
          <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Utenti
          </h1>
        </div>
        <p className="text-sm text-[#A3A3A3] ml-[30px]">
          Iscrizioni e abbonamenti
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mb-6 p-3 rounded-[6px] border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-sm text-red-700 dark:text-red-400">
          <AlertCircle size={16} strokeWidth={1.5} />
          <span>Errore nel caricamento: {error}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KPICard
          icon={<Users size={16} strokeWidth={1.5} />}
          label="Utenti totali"
          value={data ? data.total.toLocaleString("it-IT") : "0"}
          loading={loading}
        />
        <KPICard
          icon={<Crown size={16} strokeWidth={1.5} />}
          label="Iscritti Pro"
          value={data ? data.proSubscribers.toLocaleString("it-IT") : "0"}
          loading={loading}
        />
        <KPICard
          icon={<DollarSign size={16} strokeWidth={1.5} />}
          label="MRR"
          value={data ? `$${data.mrr.toLocaleString("it-IT")}` : "$0"}
          loading={loading}
        />
        <KPICard
          icon={<UserPlus size={16} strokeWidth={1.5} />}
          label="Nuovi questa settimana"
          value={data ? data.signupsWeek.toLocaleString("it-IT") : "0"}
          loading={loading}
        />
      </div>

      {/* Signup trend */}
      {!loading && data && (
        <div className="flex items-center gap-4 mb-6 px-4 py-2.5 rounded-[6px] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] text-sm text-[#737373] dark:text-[#A3A3A3]">
          <span>Oggi: <strong className="text-[#171717] dark:text-[#E5E5E5]">{data.signupsToday}</strong></span>
          <span className="text-[#E5E5E5] dark:text-[#2A2A2A]">|</span>
          <span>Settimana: <strong className="text-[#171717] dark:text-[#E5E5E5]">{data.signupsWeek}</strong></span>
          <span className="text-[#E5E5E5] dark:text-[#2A2A2A]">|</span>
          <span>Mese: <strong className="text-[#171717] dark:text-[#E5E5E5]">{data.signupsMonth}</strong></span>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={16}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
        />
        <input
          type="text"
          placeholder="Cerca per email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-[6px] border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] text-[#171717] dark:text-[#E5E5E5] placeholder-[#A3A3A3] focus:outline-none focus:border-[#6366F1] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="rounded-[6px] border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wider">
                  Nome
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wider">
                  Data iscrizione
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wider">
                  Stato
                </th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <Skeleton style={{ width: 180, height: 16 }} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton style={{ width: 100, height: 16 }} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton style={{ width: 90, height: 16 }} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton style={{ width: 60, height: 20 }} />
                    </td>
                  </tr>
                ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-[#A3A3A3]"
                  >
                    {data?.contacts.length === 0
                      ? "Nessun utente registrato"
                      : "Nessun risultato per la ricerca"}
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((c, i) => {
                  const name =
                    [c.firstName, c.lastName].filter(Boolean).join(" ") || "\u2014";
                  return (
                    <tr
                      key={i}
                      className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-b-0 hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
                    >
                      <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5] font-mono text-xs">
                        {maskEmail(c.email)}
                      </td>
                      <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">
                        {name}
                      </td>
                      <td className="px-4 py-3 text-[#737373] dark:text-[#A3A3A3]">
                        {fmtDateIT(c.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        {c.unsubscribed ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40">
                            Disiscritto
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/40">
                            Attivo
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom note */}
      <p className="mt-4 text-xs text-[#A3A3A3] text-center">
        Dati da Resend (email audience) + Stripe (abbonamenti)
      </p>
    </div>
  );
}

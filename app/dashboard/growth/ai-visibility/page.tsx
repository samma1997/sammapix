import { exec } from "@/lib/redis";

export const metadata = {
  title: "AI Visibility · Growth HQ · SammaPix",
};
export const dynamic = "force-dynamic";

const DAYS = 14;

function lastDays(n: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

type Row = { source: string; kind: string; hits: number };

async function getStats() {
  const days = lastDays(DAYS);
  const bySource: Record<string, { kind: string; hits: number }> = {};
  const refPages: Record<string, number> = {};
  const botPages: Record<string, number> = {};

  await Promise.all(
    days.map(async (day) => {
      const hits = (await exec<string[]>(["HGETALL", `ai:hits:${day}`])) || [];
      for (let i = 0; i < hits.length; i += 2) {
        const field = hits[i];
        const val = parseInt(hits[i + 1], 10) || 0;
        const [kind, ...rest] = field.split(":");
        const source = rest.join(":");
        const key = `${kind}:${source}`;
        bySource[key] = bySource[key] || { kind, hits: 0 };
        bySource[key].hits += val;
      }
      const rp = (await exec<string[]>(["ZRANGE", `ai:refpages:${day}`, "0", "-1", "WITHSCORES"])) || [];
      for (let i = 0; i < rp.length; i += 2) refPages[rp[i]] = (refPages[rp[i]] || 0) + (parseInt(rp[i + 1], 10) || 0);
      const bp = (await exec<string[]>(["ZRANGE", `ai:botpages:${day}`, "0", "-1", "WITHSCORES"])) || [];
      for (let i = 0; i < bp.length; i += 2) botPages[bp[i]] = (botPages[bp[i]] || 0) + (parseInt(bp[i + 1], 10) || 0);
    })
  );

  const rows: Row[] = Object.entries(bySource)
    .map(([k, v]) => ({ source: k.split(":").slice(1).join(":"), kind: v.kind, hits: v.hits }))
    .sort((a, b) => b.hits - a.hits);
  const topRef = Object.entries(refPages).map(([p, h]) => ({ p, h })).sort((a, b) => b.h - a.h).slice(0, 15);
  const topBot = Object.entries(botPages).map(([p, h]) => ({ p, h })).sort((a, b) => b.h - a.h).slice(0, 15);

  const referralTotal = rows.filter((r) => r.kind === "referral").reduce((s, r) => s + r.hits, 0);
  const retrievalTotal = rows.filter((r) => r.kind === "retrieval").reduce((s, r) => s + r.hits, 0);
  const trainingTotal = rows.filter((r) => r.kind === "training").reduce((s, r) => s + r.hits, 0);

  return { rows, topRef, topBot, referralTotal, retrievalTotal, trainingTotal };
}

const KIND_STYLE: Record<string, string> = {
  referral: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  retrieval: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
  training: "bg-[#F5F5F5] text-[#737373] dark:bg-[#252525] dark:text-[#A3A3A3]",
};
const KIND_LABEL: Record<string, string> = {
  referral: "Utente da AI",
  retrieval: "Retrieval live",
  training: "Crawler training",
};

export default async function AiVisibilityPage() {
  const { rows, topRef, topBot, referralTotal, retrievalTotal, trainingTotal } = await getStats();
  const empty = rows.length === 0;

  return (
    <div className="min-h-screen p-6 lg:p-10 bg-white dark:bg-[#191919]">
      <div className="max-w-[1100px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/8 border border-[#6366F1]/15 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-medium text-[#6366F1] tracking-wide uppercase">AI Visibility</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#171717] dark:text-[#E5E5E5] mb-2">
          Presenza nei motori AI
        </h1>
        <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-8 max-w-2xl">
          Ultimi {DAYS} giorni. Misura quando ChatGPT, Perplexity, Gemini e Claude
          pescano le tue pagine e quando un utente arriva cliccando il link dentro
          una risposta AI. Il segnale verde (utente da AI) e' quello che puo' convertire.
        </p>

        {empty ? (
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-10 text-center">
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
              Ancora nessun dato. Il tracking parte dal deploy: i numeri si popolano
              man mano che i motori AI fetchano le pagine e gli utenti arrivano dalle risposte AI.
            </p>
          </div>
        ) : (
          <>
            {/* KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-5">
                <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{referralTotal}</p>
                <p className="text-xs font-medium text-emerald-800/80 dark:text-emerald-400 mt-1">Utenti arrivati da una risposta AI</p>
              </div>
              <div className="border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-2xl p-5">
                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{retrievalTotal}</p>
                <p className="text-xs font-medium text-indigo-800/80 dark:text-indigo-400 mt-1">Fetch retrieval live (citazione imminente)</p>
              </div>
              <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-5">
                <p className="text-3xl font-bold text-[#737373] dark:text-[#A3A3A3]">{trainingTotal}</p>
                <p className="text-xs font-medium text-[#A3A3A3] mt-1">Fetch crawler di training</p>
              </div>
            </div>

            {/* Per fonte */}
            <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Per fonte</h2>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525] mb-10">
              {rows.map((r) => (
                <div key={`${r.kind}:${r.source}`} className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-[#191919]">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${KIND_STYLE[r.kind] || KIND_STYLE.training}`}>
                    {KIND_LABEL[r.kind] || r.kind}
                  </span>
                  <span className="flex-1 text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{r.source}</span>
                  <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{r.hits}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Pagine che portano utenti da AI</h2>
                {topRef.length === 0 ? (
                  <p className="text-xs text-[#A3A3A3]">Ancora nessun click da risposte AI.</p>
                ) : (
                  <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
                    {topRef.map((r) => (
                      <div key={r.p} className="flex items-center gap-3 px-4 py-2.5">
                        <span className="flex-1 text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{r.p}</span>
                        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{r.h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Pagine piu' pescate dai bot AI</h2>
                {topBot.length === 0 ? (
                  <p className="text-xs text-[#A3A3A3]">Ancora nessun fetch.</p>
                ) : (
                  <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#252525]">
                    {topBot.map((r) => (
                      <div key={r.p} className="flex items-center gap-3 px-4 py-2.5">
                        <span className="flex-1 text-sm text-[#171717] dark:text-[#E5E5E5] truncate">{r.p}</span>
                        <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{r.h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

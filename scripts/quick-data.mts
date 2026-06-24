/**
 * One-off: pull REAL GA4 + GSC numbers for a quick status digest.
 * Run: node_modules/.bin/tsx scripts/quick-data.mts
 * Loads .env.local manually (no dotenv dep).
 */
import { readFileSync } from "node:fs";

// --- load .env.local into process.env ---
try {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
} catch (e) {
  console.error("Cannot read .env.local:", e);
}

// GA4 client wants GOOGLE_SERVICE_ACCOUNT_JSON; reuse the GSC key (same SA).
if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
}

const d = (x: number) => x.toLocaleString("it-IT");
const pct = (x: number) => (x * 100).toFixed(2) + "%";

function dateNDaysAgo(n: number): string {
  const t = new Date();
  t.setDate(t.getDate() - n);
  return t.toISOString().slice(0, 10);
}

async function main() {
  const DAYS = 28;
  const start = dateNDaysAgo(DAYS);
  const end = dateNDaysAgo(0);
  console.log(`\n================  SAMMAPIX — DATI REALI (ultimi ${DAYS} giorni: ${start} → ${end})  ================\n`);

  // ---------- GA4 ----------
  try {
    const { fetchGA4Summary } = await import("../lib/growth/ga4-client.ts");
    const pid = process.env.GA4_PROPERTY_ID!;
    const ga = await fetchGA4Summary(pid, DAYS);
    console.log("##### GA4 (traffico) #####");
    console.log(`Utenti: ${d(ga.totalUsers)} | Sessioni: ${d(ga.totalSessions)} | Pageviews: ${d(ga.totalPageviews)}`);
    console.log(`Durata media sessione: ${ga.avgSessionDuration.toFixed(0)}s | Bounce: ${pct(ga.bounceRate)}`);
    console.log("\nTOP 12 PAGINE (pageviews):");
    ga.topPages.slice(0, 12).forEach((p, i) =>
      console.log(`  ${String(i + 1).padStart(2)}. ${d(p.pageviews).padStart(6)} pv  ${d(p.users).padStart(5)} u  ${p.path}`)
    );
    console.log("\nTOP 10 SORGENTI (sessioni):");
    ga.sources.slice(0, 10).forEach((s) =>
      console.log(`  ${d(s.sessions).padStart(6)} ses  ${s.source} / ${s.medium}`)
    );
    console.log("\nTOP 8 PAESI (utenti):");
    ga.countries.slice(0, 8).forEach((c) =>
      console.log(`  ${d(c.users).padStart(6)} u  ${c.country}`)
    );
  } catch (e) {
    console.log("##### GA4: ERRORE — " + (e as Error).message);
  }

  // ---------- GSC ----------
  try {
    const { fetchGSCData } = await import("../lib/growth/gsc-client.ts");
    const rows = await fetchGSCData(start, end);
    if (!rows.length) {
      console.log("\n##### GSC: nessun dato (chiave assente/invalida)");
    } else {
      // page-level (query === null AND page !== "/") and query-level (query !== null, page === "/")
      const pageAgg = new Map<string, { c: number; i: number; posSum: number; n: number }>();
      const qAgg = new Map<string, { c: number; i: number; posSum: number; n: number }>();
      let totC = 0, totI = 0;
      for (const r of rows) {
        if (r.query === null && r.page !== "/") {
          const a = pageAgg.get(r.page) ?? { c: 0, i: 0, posSum: 0, n: 0 };
          a.c += r.clicks; a.i += r.impressions; a.posSum += r.position; a.n++;
          pageAgg.set(r.page, a);
          totC += r.clicks; totI += r.impressions;
        } else if (r.query !== null && r.page === "/") {
          const a = qAgg.get(r.query) ?? { c: 0, i: 0, posSum: 0, n: 0 };
          a.c += r.clicks; a.i += r.impressions; a.posSum += r.position; a.n++;
          qAgg.set(r.query, a);
        }
      }
      console.log("\n##### GSC (Google Search) #####");
      console.log(`TOTALE: ${d(totC)} click | ${d(totI)} impression | CTR ${pct(totI ? totC / totI : 0)}`);

      const topPages = [...pageAgg.entries()].sort((a, b) => b[1].c - a[1].c).slice(0, 15);
      console.log("\nTOP 15 PAGINE per CLICK:");
      topPages.forEach(([p, a], i) =>
        console.log(`  ${String(i + 1).padStart(2)}. ${d(a.c).padStart(4)} clk ${d(a.i).padStart(6)} imp  CTR ${pct(a.i ? a.c / a.i : 0).padStart(6)}  pos ${(a.posSum / a.n).toFixed(1).padStart(4)}  ${p.replace("https://www.sammapix.com", "")}`)
      );

      const topPagesByImp = [...pageAgg.entries()].sort((a, b) => b[1].i - a[1].i).slice(0, 10);
      console.log("\nTOP 10 PAGINE per IMPRESSION (potenziale non convertito):");
      topPagesByImp.forEach(([p, a], i) =>
        console.log(`  ${String(i + 1).padStart(2)}. ${d(a.i).padStart(6)} imp ${d(a.c).padStart(4)} clk  CTR ${pct(a.i ? a.c / a.i : 0).padStart(6)}  pos ${(a.posSum / a.n).toFixed(1).padStart(4)}  ${p.replace("https://www.sammapix.com", "")}`)
      );

      const topQ = [...qAgg.entries()].sort((a, b) => b[1].c - a[1].c).slice(0, 20);
      console.log("\nTOP 20 QUERY per CLICK:");
      topQ.forEach(([q, a], i) =>
        console.log(`  ${String(i + 1).padStart(2)}. ${d(a.c).padStart(4)} clk ${d(a.i).padStart(6)} imp  CTR ${pct(a.i ? a.c / a.i : 0).padStart(6)}  pos ${(a.posSum / a.n).toFixed(1).padStart(4)}  "${q}"`)
      );
    }
  } catch (e) {
    console.log("\n##### GSC: ERRORE — " + (e as Error).message);
  }
  console.log("\n================  FINE  ================\n");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });

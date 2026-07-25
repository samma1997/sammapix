// Clarity behavioural insights — cosa fa DAVVERO la gente sulle pagine.
// Segnali di frustrazione (rage/dead click, quick-back, errori) + engagement.
// API: max 3 giorni, 10 chiamate/giorno. Una chiamata = tutte le metriche.
const tok = process.env.CLARITY_API_TOKEN;
if (!tok) { console.log("CLARITY_API_TOKEN mancante"); process.exit(0); }
const days = process.argv[2] || "3";
const r = await fetch(`https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=${days}&dimension1=URL`, { headers: { Authorization: "Bearer " + tok } });
if (r.status !== 200) { console.log("HTTP", r.status, (await r.text()).slice(0, 200)); process.exit(0); }
const data = await r.json();

// Raccogli per URL: sessioni + ogni metrica (percentuale sessioni con quella metrica)
const byUrl = {};
const short = (u) => (u || "").replace("https://www.sammapix.com", "").replace(/#.*$/, "").slice(0, 34) || "/";
for (const metric of data) {
  const name = metric.metricName;
  for (const row of metric.information || []) {
    const u = short(row.Url);
    byUrl[u] = byUrl[u] || { sessions: 0 };
    // sessions: prendi il max sessionsCount visto (Traffic è la fonte piu affidabile)
    const sc = +(row.sessionsCount || 0);
    if (sc > byUrl[u].sessions) byUrl[u].sessions = sc;
    if (row.sessionsWithMetricPercentage != null) byUrl[u][name] = row.sessionsWithMetricPercentage;
    if (row.averageScrollDepth != null) byUrl[u].scroll = row.averageScrollDepth;
    if (row.totalTime != null && name.includes("Engage")) byUrl[u].engTime = row.totalTime;
  }
}

console.log(`\n=== CLARITY — comportamento reale (ultimi ${days}gg) ===`);
console.log("Metriche disponibili:", data.map(m => m.metricName).join(", "));
console.log("\nURL ordinate per sessioni. %% = quota sessioni col problema.\n");
const FRUST = ["RageClickCount", "DeadClickCount", "QuickbackClick", "ScriptErrorCount", "ErrorClickCount", "ExcessiveScroll"];
const rows = Object.entries(byUrl).filter(([, d]) => d.sessions >= 3).sort((a, b) => b[1].sessions - a[1].sessions);
const p = (v) => v == null ? "  -" : `${String(Math.round(v)).padStart(3)}`;
console.log("sess  rage dead qback err  scroll  URL");
for (const [u, d] of rows) {
  console.log(`${String(d.sessions).padStart(4)}  ${p(d.RageClickCount)}  ${p(d.DeadClickCount)}  ${p(d.QuickbackClick)}  ${p(d.ScriptErrorCount)}  ${p(d.scroll)}%   ${u}`);
}
console.log("\nrage=rage click · dead=dead click · qback=torna indietro subito · err=errori JS · scroll=profondita media");
console.log("Alto rage/dead/qback = frustrazione. Basso scroll = non vedono l'offerta piu in basso.");

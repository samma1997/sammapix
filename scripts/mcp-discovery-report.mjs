/**
 * MCP discovery report — "are agents/clients actually looking for us?"
 *   node --env-file=.env.local scripts/mcp-discovery-report.mjs [days=14]
 *
 * Reads the aggregate counters written by lib/api/discovery-log.ts.
 */
const U = process.env.UPSTASH_REDIS_REST_URL, T = process.env.UPSTASH_REDIS_REST_TOKEN;
if (!U || !T) { console.error("Missing UPSTASH_REDIS_REST_* env"); process.exit(1); }
async function cmd(arr) {
  const r = await fetch(U, { method: "POST", headers: { Authorization: `Bearer ${T}`, "Content-Type": "application/json" }, body: JSON.stringify(arr) });
  return (await r.json()).result;
}
const SURFACES = ["mcp-json", "mcp-get", "oauth-prm", "oauth-as", "tools-list-unauth"];
const days = Number(process.argv[2] || 14);
const dayList = Array.from({ length: days }, (_, i) => new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));

const totals = Object.fromEntries(SURFACES.map((s) => [s, 0]));
const uaTotals = {};
let grand = 0;

for (const d of dayList) {
  for (const s of SURFACES) {
    const n = Number((await cmd(["GET", `mcpdisc:${d}:${s}`])) || 0);
    totals[s] += n; grand += n;
  }
  const ua = await cmd(["HGETALL", `mcpdisc:ua:${d}`]);
  if (Array.isArray(ua)) for (let i = 0; i < ua.length; i += 2) uaTotals[ua[i]] = (uaTotals[ua[i]] || 0) + Number(ua[i + 1] || 0);
}

console.log(`\n== MCP discovery — ultimi ${days} giorni ==\n`);
console.log("Per superficie di scoperta:");
for (const s of SURFACES) console.log(`  ${s.padEnd(20)} ${String(totals[s]).padStart(6)}`);
console.log(`  ${"TOTALE".padEnd(20)} ${String(grand).padStart(6)}`);
console.log("\nPer tipo di client (User-Agent):");
const sorted = Object.entries(uaTotals).sort((a, b) => b[1] - a[1]);
if (!sorted.length) console.log("  (nessun hit registrato ancora)");
for (const [k, v] of sorted) console.log(`  ${k.padEnd(22)} ${String(v).padStart(6)}`);
console.log(`\nLettura: 'claude/cursor/openai' = un client di agente ci ha scoperti. 'browser/curl/bot' = probe/SEO/crawler.`);
console.log(`Se 'tools-list-unauth' o 'oauth-*' > 0 con UA di agente = qualcuno ha PROVATO a connettersi.\n`);

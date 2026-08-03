import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Storico conversioni per REFERRER di primo arrivo (campo metadata.entry = "ref:<host>|land:...").
// Evidenzia i motori AI. Copre fin dove arriva l'attribution.
const SINCE = Math.floor(new Date(Date.now() - 365 * 864e5).getTime() / 1000);
const AI = ["perplexity", "chatgpt", "openai", "gemini", "bard", "claude.ai", "copilot", "you.com", "poe.com", "phind"];

async function allSessions() {
  const out = [];
  let starting_after;
  for (let i = 0; i < 50; i++) {
    const page = await stripe.checkout.sessions.list({ limit: 100, created: { gte: SINCE }, ...(starting_after ? { starting_after } : {}) });
    out.push(...page.data);
    if (!page.has_more) break;
    starting_after = page.data[page.data.length - 1].id;
  }
  return out;
}

const sessions = (await allSessions()).filter((s) => s.payment_status === "paid" && (s.amount_total || 0) > 0);

function refHost(entry) {
  if (!entry) return "(nessun entry)";
  const m = String(entry).match(/ref:([^|]+)/);
  return m ? m[1] : "(direct/none)";
}

const byRef = {};
let aiCount = 0, aiRev = 0, total = 0, totalRev = 0, withEntry = 0;
for (const s of sessions) {
  const host = refHost(s.metadata?.entry);
  const amt = s.amount_total || 0;
  byRef[host] = byRef[host] || { n: 0, rev: 0 };
  byRef[host].n++; byRef[host].rev += amt;
  total++; totalRev += amt;
  if (s.metadata?.entry) withEntry++;
  if (AI.some((a) => host.toLowerCase().includes(a))) { aiCount++; aiRev += amt; }
}

const cur = (sessions[0]?.currency || "usd").toUpperCase();
console.log(`\n===== CONVERSIONI per REFERRER (ultimo anno) =====`);
console.log(`Sessioni pagate: ${total} · con attribution entry: ${withEntry} (${total ? ((withEntry/total)*100).toFixed(0) : 0}%)\n`);
console.log(`  referrer                          conv   incasso(${cur})`);
for (const [h, v] of Object.entries(byRef).sort((a, b) => b[1].rev - a[1].rev).slice(0, 25)) {
  const flag = AI.some((a) => h.toLowerCase().includes(a)) ? " 🤖AI" : "";
  console.log(`  ${h.slice(0,32).padEnd(34)} ${String(v.n).padStart(4)}   ${(v.rev/100).toFixed(2).padStart(9)}${flag}`);
}
console.log(`\n>>> TOTALE da motori AI: ${aiCount} conversioni · ${(aiRev/100).toFixed(2)} ${cur} (${totalRev ? ((aiRev/totalRev)*100).toFixed(1) : 0}% dell'incasso attribuito)`);

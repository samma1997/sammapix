import { createSign } from "crypto";
const SITE = "sc-domain:sammapix.com";

async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const input = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${input}.${sig}` }) });
  return (await res.json()).access_token;
}
async function query(token, body) {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  return j.rows ?? [];
}
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 27);
const filt = (country) => ({ dimensionFilterGroups: [{ filters: [{ dimension: "country", operator: "equals", expression: country }] }] });

// euristiche lingua locale (parole ad alta frequenza nella lingua) — per stimare "cercano in locale?"
const LANGS = {
  ita: /\b(foto|immagin|ridurre|ridimension|comprim|convert|sfondo|peso|gratis|tessera|qualità|migliorare|ritagli|filigrana|firma|unire|schiarire|dimension|misura|come|online)\b/i,
  esp: /\b(foto|imagen|imágenes|reducir|redimensionar|comprimir|convertir|fondo|peso|gratis|calidad|mejorar|recortar|tamaño|cómo|como|quitar|unir|firma)\b/i,
  fra: /\b(photo|image|réduire|redimensionner|compresser|convertir|fond|poids|gratuit|qualité|améliorer|rogner|taille|comment|supprimer|fusionner|signature)\b/i,
  deu: /\b(foto|bild|bilder|verkleinern|komprimieren|konvertieren|hintergrund|größe|kostenlos|qualität|verbessern|zuschneiden|wie|entfernen)\b/i,
  bra: /\b(foto|imagem|imagens|reduzir|redimensionar|comprimir|converter|fundo|peso|grátis|gratis|qualidade|melhorar|cortar|tamanho|como|remover|juntar)\b/i,
};

const token = await getToken();
const byCountry = await query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["country"], rowLimit: 250 });

console.log(`\n============ GSC per PAESE  ${iso(start)} → ${iso(end)}  (28 giorni) ============\n`);
const totImp = byCountry.reduce((a,r)=>a+r.impressions,0);
const totClk = byCountry.reduce((a,r)=>a+r.clicks,0);
console.log(`Totale mondo: ${totClk} click · ${totImp} impression\n`);
console.log(`  ${"paese".padEnd(6)} ${"impr".padStart(7)} ${"%imp".padStart(5)} ${"clk".padStart(5)} ${"%clk".padStart(5)} ${"ctr".padStart(6)} ${"posM".padStart(5)}`);
byCountry.sort((a,b)=>b.impressions-a.impressions).slice(0,25).forEach(r=>{
  console.log(`  ${r.keys[0].padEnd(6)} ${String(r.impressions).padStart(7)} ${(100*r.impressions/totImp).toFixed(1).padStart(5)} ${String(r.clicks).padStart(5)} ${(100*r.clicks/Math.max(1,totClk)).toFixed(1).padStart(5)} ${(100*r.ctr).toFixed(1).padStart(5)}% ${r.position.toFixed(1).padStart(5)}`);
});

// per i paesi non-anglo chiave: quante query nella lingua locale?
const targets = [["ita","Italia"],["esp","Spagna"],["mex","Messico"],["bra","Brasile"],["fra","Francia"],["deu","Germania"]];
console.log(`\n============ TEST LINGUA: nei paesi non-anglo, cercano in locale o in inglese? ============`);
for (const [cc, name] of targets) {
  const rx = LANGS[cc.replace("mex","esp").replace("bra","bra")] || LANGS.esp;
  const rows = await query(token, { startDate: iso(start), endDate: iso(end), dimensions: ["query"], rowLimit: 2000, ...filt(cc) });
  if (!rows.length) { console.log(`\n── ${name} (${cc}): nessun dato`); continue; }
  const imp = rows.reduce((a,r)=>a+r.impressions,0);
  const local = rows.filter(r=>rx.test(r.keys[0]));
  const localImp = local.reduce((a,r)=>a+r.impressions,0);
  console.log(`\n── ${name} (${cc}): ${rows.length} query · ${imp} impr`);
  console.log(`   query in lingua locale: ${local.length}/${rows.length}  ·  impr locali: ${localImp}/${imp} = ${(100*localImp/Math.max(1,imp)).toFixed(0)}%`);
  const topLocal = local.sort((a,b)=>b.impressions-a.impressions).slice(0,6).map(r=>`${r.keys[0]} (${r.impressions})`);
  if (topLocal.length) console.log(`   top query locali: ${topLocal.join(" · ")}`);
}
process.exit(0);

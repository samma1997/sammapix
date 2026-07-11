// Google Trends (endpoint non ufficiale, no auth) per stimare il VOLUME RELATIVO
// di ricerca tra lingue sullo stesso bisogno. Confronta termini nella stessa
// query -> Trends li normalizza sulla stessa scala 0-100 = rapporto tra lingue.

const HL = "en-US", TZ = "0";
const G = "https://trends.google.com/trends/api";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
let COOKIE = "CONSENT=YES+";

async function initCookie() {
  const r = await fetch("https://trends.google.com/trends/explore?q=test", { headers: { "User-Agent": UA } });
  const sc = r.headers.get("set-cookie") || "";
  const nid = (sc.match(/(NID=[^;]+)/) || [])[1];
  if (nid) COOKIE = nid;
}

async function explore(terms, geo = "", time = "today 12-m") {
  const req = {
    comparisonItem: terms.map((t) => ({ keyword: t, geo, time })),
    category: 0,
    property: "",
  };
  const url = `${G}/explore?hl=${HL}&tz=${TZ}&req=${encodeURIComponent(JSON.stringify(req))}`;
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-US", "Cookie": COOKIE } });
  const txt = await r.text();
  const clean = txt.replace(/^\)\]\}',?\s*/, "");
  const j = JSON.parse(clean);
  const w = j.widgets.find((x) => x.id === "TIMESERIES");
  return w;
}

async function timeseries(widget) {
  const url = `${G}/widgetdata/multiline?hl=${HL}&tz=${TZ}&req=${encodeURIComponent(JSON.stringify(widget.request))}&token=${widget.token}`;
  const r = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-US", "Cookie": COOKIE } });
  const txt = await r.text();
  const j = JSON.parse(txt.replace(/^\)\]\}',?\s*/, ""));
  return j.default.timelineData;
}

// media dell'interesse per ciascun termine (proxy volume relativo)
function averages(timeline, terms) {
  const sums = terms.map(() => 0);
  let n = 0;
  for (const row of timeline) {
    row.value.forEach((v, i) => (sums[i] += v));
    n++;
  }
  return sums.map((s) => Math.round(s / Math.max(1, n)));
}

// 3 bisogni core, tradotti nelle lingue principali (max 5 per query Trends)
const NEEDS = [
  { name: "Comprimi immagine (solo lingue locali)", terms: ["comprimir imagen", "comprimir imagem", "comprimere immagine", "compresser image", "bild komprimieren"] },
  { name: "Ridimensiona immagine (solo lingue locali)", terms: ["redimensionar imagen", "redimensionar imagem", "ridimensionare immagine", "redimensionner image", "bild verkleinern"] },
  { name: "Converti HEIC (solo lingue locali)", terms: ["convertir heic a jpg", "converter heic para jpg", "convertire heic in jpg", "convertir heic en jpg", "heic in jpg umwandeln"] },
];
const LABELS = ["ES", "PT-BR", "IT", "FR", "DE"];

await initCookie();
for (const need of NEEDS) {
  try {
    const w = await explore(need.terms);
    const tl = await timeseries(w);
    const avg = averages(tl, need.terms);
    console.log(`\n=== ${need.name} (interesse medio Google Trends, 12 mesi, mondiale) ===`);
    need.terms
      .map((t, i) => ({ lang: LABELS[i], term: t, val: avg[i] }))
      .sort((a, b) => b.val - a.val)
      .forEach((r) => console.log(`  ${String(r.val).padStart(3)}  ${r.lang}  "${r.term}"`));
  } catch (e) {
    console.log(`\n=== ${need.name}: errore Trends (${String(e).slice(0, 80)})`);
  }
  await new Promise((r) => setTimeout(r, 1500));
}
console.log(`\nNota: valori 0-100 relativi (100 = picco). Confronto tra lingue nella stessa query = rapporto volumi. "EN"/"jpg to pdf" fa da riferimento globale (spesso satura a 100).`);

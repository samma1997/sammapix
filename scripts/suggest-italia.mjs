// Google Autocomplete IT: rivela le query REALI che gli italiani digitano,
// indipendentemente dal nostro ranking. Ordinate per popolarità da Google.
// Nessuna auth. Mappiamo i suggerimenti ai tool SammaPix.

const SEEDS = [
  // privacy / EXIF / metadati (angolo "drama" che intuisce Luca)
  "come togliere i dati da una foto",
  "come rimuovere exif",
  "come sapere dove è stata scattata una foto",
  "come togliere la posizione da una foto",
  "le foto di whatsapp contengono la posizione",
  "come vedere i dati di una foto",
  "come cancellare i metadati di una foto",
  // compressione / peso
  "come ridurre il peso di una foto",
  "come comprimere una foto",
  "come diminuire i mb di una foto",
  "ridurre foto a 100 kb",
  "come comprimere immagine per email",
  // conversione
  "come convertire heic in jpg",
  "come convertire webp in jpg",
  "come aprire file heic",
  "convertire foto in pdf",
  // ridimensiona / sfondo / watermark
  "come ridimensionare una foto",
  "come togliere lo sfondo da una foto",
  "come togliere la scritta da una foto",
  "come mettere la firma su una foto",
  // formati / foto tessera / social
  "foto tessera online",
  "come fare una foto tessera",
  "dimensioni foto profilo whatsapp",
  "come ritagliare una foto",
];

async function suggest(q) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=it&gl=it&q=${encodeURIComponent(q)}`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const txt = await r.text();
    const j = JSON.parse(txt);
    return Array.isArray(j?.[1]) ? j[1] : [];
  } catch {
    return [];
  }
}

const seen = new Map(); // query -> quante volte suggerita (proxy popolarità cross-seed)
for (const s of SEEDS) {
  const sugg = await suggest(s);
  console.log(`\n▸ "${s}"`);
  sugg.slice(0, 10).forEach((q, i) => {
    console.log(`   ${String(i + 1).padStart(2)}. ${q}`);
    seen.set(q, (seen.get(q) || 0) + 1);
  });
}

// tool mapping (quale nostro tool serve la query)
const TOOLS = [
  [/exif|metadat|posizione|dove.*scattat|dati.*foto|geoloc/i, "EXIF Remover / Geo tools"],
  [/peso|comprim|mb|kb|dimensione file|ridurre.*foto/i, "Compress / Compress-to"],
  [/heic|webp|converti|pdf|formato/i, "Converter (heic/webp/pdf)"],
  [/ridimension|ritaglia|crop|dimensioni.*(whatsapp|instagram|profilo)/i, "Resize / Crop"],
  [/sfondo|scritta|watermark|firma|filigrana/i, "Remove BG / Watermark / Stamp"],
  [/foto ?tessera/i, "Passport Photo"],
];
const toolFor = (q) => (TOOLS.find(([rx]) => rx.test(q)) || [null, "(altro)"])[1];

const ranked = [...seen.entries()].sort((a, b) => b[1] - a[1]);
console.log(`\n\n===== QUERY ITALIANE più ricorrenti (proxy domanda) + tool che le serve =====`);
ranked.slice(0, 40).forEach(([q, n]) => console.log(`  [${n}x] ${q.padEnd(52)} -> ${toolFor(q)}`));

// aggregazione per tool
const byTool = {};
ranked.forEach(([q]) => { const t = toolFor(q); byTool[t] = (byTool[t] || 0) + 1; });
console.log(`\n===== domanda per TOOL (n. query distinte suggerite) =====`);
Object.entries(byTool).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(`  ${String(n).padStart(3)}  ${t}`));

// AUDIT MULTILINGUA della domanda per i tool SammaPix.
// Google Autocomplete per lingua/paese rivela quanto la gente cerca nella
// PROPRIA lingua i nostri temi core. Proxy di domanda indipendente dal ranking.

// 6 tool core, tradotti nei termini reali di ciascuna lingua
const LANGS = {
  it: { name: "Italiano", gl: "it", seeds: ["convertire heic in jpg", "comprimere una foto", "ridimensionare una foto", "convertire foto in pdf", "togliere sfondo da una foto", "foto tessera online"] },
  es: { name: "Spagnolo", gl: "es", seeds: ["convertir heic a jpg", "comprimir una foto", "redimensionar una foto", "convertir foto a pdf", "quitar fondo a una foto", "foto de carnet"] },
  "es-mx": { name: "Spagnolo (MX)", gl: "mx", seeds: ["convertir heic a jpg", "comprimir una foto", "cambiar tamaño foto", "convertir foto a pdf", "quitar fondo a una foto", "foto para credencial"] },
  fr: { name: "Francese", gl: "fr", seeds: ["convertir heic en jpg", "compresser une photo", "redimensionner une photo", "convertir photo en pdf", "supprimer le fond d'une photo", "photo d'identité en ligne"] },
  de: { name: "Tedesco", gl: "de", seeds: ["heic in jpg umwandeln", "foto komprimieren", "bild verkleinern", "foto in pdf umwandeln", "hintergrund entfernen foto", "passbild online"] },
  "pt-br": { name: "Portoghese (BR)", gl: "br", seeds: ["converter heic para jpg", "comprimir foto", "redimensionar foto", "converter foto em pdf", "remover fundo da foto", "foto 3x4 online"] },
  nl: { name: "Olandese", gl: "nl", seeds: ["heic naar jpg", "foto verkleinen", "foto formaat wijzigen", "foto naar pdf", "achtergrond verwijderen foto", "pasfoto online"] },
  pl: { name: "Polacco", gl: "pl", seeds: ["konwersja heic na jpg", "kompresja zdjęcia", "zmiana rozmiaru zdjęcia", "zdjęcie do pdf", "usuwanie tła ze zdjęcia", "zdjęcie do dowodu"] },
  tr: { name: "Turco", gl: "tr", seeds: ["heic jpg çevirme", "fotoğraf sıkıştırma", "fotoğraf boyutlandırma", "fotoğraf pdf yapma", "fotoğraf arka plan silme", "vesikalık fotoğraf"] },
  id: { name: "Indonesiano", gl: "id", seeds: ["konversi heic ke jpg", "kompres foto", "ubah ukuran foto", "foto ke pdf", "hapus background foto", "pas foto online"] },
};

async function suggest(q, hl, gl) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=${gl}&q=${encodeURIComponent(q)}`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const j = JSON.parse(await r.text());
    return Array.isArray(j?.[1]) ? j[1] : [];
  } catch { return []; }
}

const results = [];
for (const [hl, cfg] of Object.entries(LANGS)) {
  let total = 0, saturated = 0, perSeed = [];
  for (const s of cfg.seeds) {
    const sug = await suggest(s, hl.split("-")[0], cfg.gl);
    total += sug.length;
    if (sug.length >= 10) saturated++;
    perSeed.push(sug.length);
  }
  results.push({ hl, name: cfg.name, total, saturated, perSeed });
}

console.log(`\n===== AUDIT DOMANDA MULTILINGUA (Google Autocomplete) =====`);
console.log(`Seed core: convert HEIC · compress · resize · photo→PDF · remove BG · ID photo`);
console.log(`\n  ${"lingua".padEnd(18)} ${"tot sugg".padStart(8)} ${"saturi/6".padStart(9)}   dettaglio per seed`);
results.sort((a, b) => b.total - a.total).forEach(r => {
  console.log(`  ${r.name.padEnd(18)} ${String(r.total).padStart(8)} ${String(r.saturated + "/6").padStart(9)}   [${r.perSeed.join(",")}]`);
});
console.log(`\nNota: "saturi" = seed che restituiscono 10 suggerimenti (domanda alta).`);
console.log(`Il numero di suggerimenti è proxy di AMPIEZZA domanda, non di volume assoluto (per quello serve Semrush/Keyword Planner).`);

// Estrae le foto di Bali da lib/destinations.ts e le raggruppa per tipologia
// per creare caroselli Instagram. Output: markdown + JSON.
import { readFileSync, writeFileSync } from "fs";

const txt = readFileSync("lib/destinations.ts", "utf8");

// Estrae il blocco di un array dato il nome
function extractArray(name) {
  const start = txt.indexOf(`const ${name}`);
  if (start === -1) return [];
  // trova la fine: prima riga che inizia con "];" dopo start
  const rest = txt.slice(start);
  const endRel = rest.search(/\n\];/);
  const block = rest.slice(0, endRel);
  return block;
}

// Parsa gli oggetti foto dal blocco (src/caption/location/description/alt)
function parsePhotos(block) {
  const photos = [];
  // split per "src:" mantenendo i campi successivi
  const chunks = block.split(/\n\s*\{\s*\n/).slice(1);
  for (const c of chunks) {
    const get = (k) => {
      const m = c.match(new RegExp(`${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"));
      return m ? m[1].replace(/\\"/g, '"') : "";
    };
    const src = get("src");
    if (!src) continue;
    photos.push({
      src,
      alt: get("alt"),
      caption: get("caption"),
      location: get("location"),
      description: get("description"),
    });
  }
  return photos;
}

const all = [
  ...parsePhotos(extractArray("baliPhotos2026")),
  ...parsePhotos(extractArray("baliPhotos")),
];

// Categorie con keyword. MULTI-APPARTENENZA: una foto entra in OGNI gruppo
// che matcha (uno scatto con scooter + carretto cibo va in entrambi i caroselli).
// Match principalmente sul campo `alt` (descrizione fattuale del soggetto).
const CATS = [
  ["🛵 Scooter & rider", /scooter|motorbike|motorcycl|moped|\brider\b|\bvario\b|\bhonda\b|\byamaha\b|\bnmax\b|\bbeat\b|helmet|biker|delivery rider/i],
  ["🍜 Chioschetti, warung & carretti cibo", /\bcart\b|\bstall\b|warung|kiosk|\bbakso\b|mie ayam|\bnoodle|\bsatay\b|\bsate\b|food vendor|street food|food cart|fruit stand|market stall|\bharga\b|seafood|gorengan|\bnasi\b/i],
  ["💈 Barbieri & botteghe", /barber|barbershop|\bsalon\b|workshop|\btailor\b|mechanic|repair shop|storefront|shopfront/i],
  ["🛕 Templi & santuari", /\btemple\b|\bpura\b|shrine|sacred|\bmeru\b|pagoda|offering|canang|ceremon/i],
  ["🐒 Scimmie & fauna", /monkey|macaque|\bdog\b|\bcat\b|rooster|chicken|\bbird\b|\bcow\b|buffalo|gecko/i],
  ["🗿 Statue & guardiani in pietra", /statue|guardian|dwarapala|\bdeity\b|sculpture|carving|stone figure|garuda|wisnu|vishnu/i],
  ["🌊 Spiagge, scogliere & oceano", /beach|\bcliff\b|\bocean\b|\bsea\b|\bwave|surf|\bcoast|\bshore\b|turquoise/i],
  ["🌾 Risaie & paesaggi", /rice|terrace|paddy|\bfield\b|jungle|forest|valley|mountain|\bpalm\b/i],
  ["👷 Lavoro & mestieri", /builder|\bworker\b|construction|brick|farmer|fisherman|craftsman|seamstress|laborer|porter/i],
  ["👴 Ritratti & persone", /\bman\b|\bwoman\b|\belder|\bboy\b|\bgirl\b|\bchild\b|portrait|grin|smil|\bface\b|\bseller\b|\blocal\b/i],
  ["🏍️ Strada & traffico", /\bstreet\b|\btraffic\b|\broad\b|\balley\b|crossing|\btown\b|\burban\b/i],
];

const groups = new Map(CATS.map(([n]) => [n, []]));
groups.set("📦 Nessun gruppo", []);

for (const p of all) {
  const hay = `${p.alt} ${p.description}`; // campo fattuale, non la caption poetica
  let placed = false;
  for (const [name, re] of CATS) {
    if (re.test(hay)) { groups.get(name).push(p); placed = true; }
  }
  if (!placed) groups.get("📦 Nessun gruppo").push(p);
}

// Output markdown
let md = `# Foto Bali raggruppate per tipologia (caroselli Instagram)\n\n`;
md += `Totale foto analizzate: **${all.length}**\n\n`;
md += `## Indice gruppi\n`;
for (const [name, arr] of groups) md += `- ${name} — **${arr.length}** foto\n`;
md += `\n---\n\n`;

for (const [name, arr] of groups) {
  if (!arr.length) continue;
  md += `## ${name} (${arr.length})\n\n`;
  arr.forEach((p, i) => {
    md += `${i + 1}. **${p.caption || p.alt}**\n`;
    md += `   - 📍 ${p.location}\n`;
    md += `   - 🖼️ ${p.src}\n`;
    if (p.description) md += `   - 📝 ${p.description.slice(0, 220)}${p.description.length > 220 ? "…" : ""}\n`;
    md += `\n`;
  });
  md += `---\n\n`;
}

writeFileSync("bali-ig-groups.md", md);
writeFileSync("bali-ig-groups.json", JSON.stringify(
  Object.fromEntries([...groups].map(([n, a]) => [n, a])), null, 2));

// Riepilogo a console
console.log(`Totale foto: ${all.length}\n`);
for (const [name, arr] of groups) console.log(`${String(arr.length).padStart(3)}  ${name}`);
console.log(`\n→ scritti: bali-ig-groups.md  e  bali-ig-groups.json`);

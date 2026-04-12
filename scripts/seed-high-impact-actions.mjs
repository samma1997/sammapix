import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
const today = new Date().toISOString().slice(0, 10);

const actions = [
  // === GITHUB PR — DOFOLLOW DA 100 ===
  { type: "backlink", priority: 10, title: "\u{1F525} PR: Lissy93/awesome-privacy (9.1K stars)",
    desc: "Sezione Creativity > Image Editors. SammaPix = privacy-first. DA 100 dofollow.",
    url: "https://github.com/Lissy93/awesome-privacy" },
  { type: "backlink", priority: 10, title: "\u{1F525} PR: pluja/awesome-privacy (18.4K stars)",
    desc: "Sezione Design Tools. Privacy angle. DA 100 dofollow.",
    url: "https://github.com/pluja/awesome-privacy" },
  { type: "backlink", priority: 10, title: "\u{1F525} PR: unicodeveloper/awesome-nextjs (11K stars)",
    desc: "Sezione Apps. SammaPix \u00e8 Next.js. DA 100 dofollow.",
    url: "https://github.com/unicodeveloper/awesome-nextjs" },
  { type: "backlink", priority: 10, title: "\u{1F525} PR: mahseema/awesome-ai-tools (4.8K stars)",
    desc: "Sezione Image > Services. Invitano PR. DA 100 dofollow.",
    url: "https://github.com/mahseema/awesome-ai-tools" },
  { type: "backlink", priority: 10, title: "\u{1F525} PR: officialrajdeepsingh/awesome-nextjs (694 stars)",
    desc: "Sezione AI/Tools. DA 100 dofollow.",
    url: "https://github.com/officialrajdeepsingh/awesome-nextjs" },

  // === GUEST POST — DOFOLLOW ===
  { type: "backlink", priority: 9, title: "\u{270D}\u{FE0F} Hacker Noon guest post (DA 88 DOFOLLOW)",
    desc: "Articolo: 'How browser Canvas API beats server-side image compression'. Submit su contribute.hackernoon.com.",
    url: "https://contribute.hackernoon.com/" },
  { type: "backlink", priority: 9, title: "\u{270D}\u{FE0F} freeCodeCamp tutorial (DA 95 DOFOLLOW)",
    desc: "Applica come contributor. Tutorial: 'Build a browser-based image compressor with JavaScript'.",
    url: "https://www.freecodecamp.org/news/how-to-write-for-freecodecamp/" },

  // === INTEGRATIONS ===
  { type: "project", priority: 9, title: "\u{1F680} Chrome Extension (DA 92 dofollow, $5)",
    desc: "Click destro immagine > Compress with SammaPix. Backlink dofollow Chrome Web Store.",
    url: "https://chrome.google.com/webstore/devconsole" },
  { type: "project", priority: 9, title: "\u{1F680} npm sammapix-cli (DA 96 dofollow)",
    desc: "CLI compress/convert da terminale. README linka sammapix.com.",
    url: "https://www.npmjs.com/" },
  { type: "project", priority: 8, title: "\u{1F680} WordPress Plugin (DA 96 dofollow)",
    desc: "Plugin 'SammaPix for WordPress' \u2014 compress al upload. 3-5 giorni dev.",
    url: "https://developer.wordpress.org/plugins/" },

  // === PRIVACY LISTINGS ===
  { type: "directory", priority: 8, title: "\u{1F512} PrivacyTools.io (DA 72 dofollow)",
    desc: "Submit via GitHub issue. SammaPix = zero upload, client-side.",
    url: "https://github.com/privacytools/privacytools.io" },
  { type: "directory", priority: 8, title: "\u{1F512} Privacy Guides (DA 70)",
    desc: "Community submission su GitHub.",
    url: "https://github.com/privacyguides/privacyguides.org" },

  // === MEDIUM IMPORT ===
  { type: "backlink", priority: 7, title: "\u{2705} Medium: importa articoli (manuale)",
    desc: "medium.com/p/import \u2192 incolla URL blog \u2192 canonical automatica. Fare per ogni articolo.",
    url: "https://medium.com/p/import" },
];

let inserted = 0;
for (const a of actions) {
  await sql`INSERT INTO growth_daily_todos (date, type, title, description, action_url, status, priority)
    VALUES (${today}, ${a.type}, ${a.title}, ${a.desc}, ${a.url}, 'pending', ${a.priority})`;
  inserted++;
}
console.log(`${inserted} azioni high-impact inserite nel TODO di oggi`);

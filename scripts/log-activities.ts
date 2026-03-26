import { db } from "../lib/db";
import { growthActivityLog } from "../lib/db/schema";

const activities = [
  // === 23 Marzo 2026 ===
  { type: "content", title: "Blog system: 7 componenti creati", description: "BlogArticleLayout, ReadingProgressBar, TableOfContents, TextToSpeech, ArticleSummary, ShareBar, RelatedArticles", createdAt: new Date("2026-03-23T14:00:00Z") },
  { type: "content", title: "Articolo pilota migrato al nuovo layout", description: "compress-images-without-losing-quality — primo articolo con TOC, TTS, Summary, Share bar", url: "https://www.sammapix.com/blog/compress-images-without-losing-quality", createdAt: new Date("2026-03-23T15:00:00Z") },
  { type: "content", title: "71 foto Sri Lanka caricate su Cloudinary", description: "Upload automatizzato con AI rename (Gemini), GPS geocoding, EXIF. 11 locations diverse.", createdAt: new Date("2026-03-23T16:00:00Z") },
  { type: "content", title: "Portfolio Sri Lanka aggiornato", description: "71 foto in lib/destinations.ts, slug corretto da sri-lanka-2025 a sri-lanka", url: "https://www.sammapix.com/about/sri-lanka", createdAt: new Date("2026-03-23T18:00:00Z") },
  { type: "seo", title: "Growth Dashboard: sistema notifiche", description: "Campanella con 10 tipi di notifiche, browser desktop notifications, localStorage per dismissed state", createdAt: new Date("2026-03-23T13:00:00Z") },
  { type: "seo", title: "Growth Dashboard: email outreach UX rifatta", description: "Bottone Genera email con pannello espandibile. Copia email/titolo/testo. Workflow manuale da info@lucasammarco.com", createdAt: new Date("2026-03-23T11:00:00Z") },
  { type: "seo", title: "Growth Dashboard: Reddit scraper migliorato", description: "91 post trovati da subreddit specifici. Filtro migliorato, blocked subreddits, ricerca per subreddit.", createdAt: new Date("2026-03-23T12:00:00Z") },
  { type: "other", title: "Fix PNG compress — mai più file che crescono", description: "PNG compression ora prova WebP → canvas → originale. Mai aumenta la dimensione del file.", createdAt: new Date("2026-03-23T17:00:00Z") },
  { type: "seo", title: "Fix GSC sync checklist", description: "Usa createdAt invece di date field per la checklist sync (GSC ha ritardo 2-3 giorni)", createdAt: new Date("2026-03-23T12:30:00Z") },

  // === 24 Marzo 2026 ===
  { type: "content", title: "Tutti 27 articoli migrati al BlogArticleLayout", description: "TOC, TTS player, Summary toggle, Share bar, Related articles su TUTTI gli articoli", createdAt: new Date("2026-03-24T10:00:00Z") },
  { type: "content", title: "29 cover images Apple-style generate", description: "Immagini di copertina per ogni articolo blog con sharp. Palette colori per categoria.", createdAt: new Date("2026-03-24T12:00:00Z") },
  { type: "content", title: "29 audio TTS generati con Edge TTS", description: "Audio MP3 + timing JSON per ogni articolo. Voce en-US-GuyNeural. Evidenziazione paragrafo sincronizzata.", createdAt: new Date("2026-03-24T14:00:00Z") },
  { type: "content", title: "2 articoli Sri Lanka experience-driven", description: "optimize-travel-photos-sri-lanka + ai-rename-travel-photos-seo-results. Foto reali Cloudinary.", url: "https://www.sammapix.com/blog/optimize-travel-photos-sri-lanka", createdAt: new Date("2026-03-24T16:00:00Z") },
  { type: "content", title: "Fix immagini Unsplash rotte in 8 articoli", description: "4 URL Unsplash 404 sostituite con alternative funzionanti", createdAt: new Date("2026-03-24T17:00:00Z") },

  // === 25 Marzo 2026 ===
  { type: "seo", title: "Reddit scraper espanso a 33 subreddit", description: "Aggiunti: micro_saas, microsaas, SaaS, indiehackers, buildinpublic, Entrepreneur, startups, degoogle, AskPhotography, postprocessing, GIMP, NewTubers, Productivity, DigitalNomad, freelance, marketing, juststart, EntrepreneurRideAlong, growthhacking, Etsy, InternetIsBeautiful, coolgithubprojects", createdAt: new Date("2026-03-25T10:00:00Z") },

  // === 26 Marzo 2026 ===
  { type: "backlink", title: "Dev.to: secondo articolo pubblicato", description: "I Used AI to Rename 71 Travel Photos for SEO. Canonical URL a sammapix.com.", url: "https://dev.to/samma1997/i-used-ai-to-rename-71-travel-photos-for-seo-heres-what-happened-2c18", createdAt: new Date("2026-03-26T00:00:00Z") },
  { type: "backlink", title: "Medium: articolo pubblicato (DA 95)", description: "Cross-post con canonical URL a sammapix.com. 3 link interni a SammaPix tools.", url: "https://medium.com/@lucasamm97/i-used-ai-to-rename-71-travel-photos-for-seo-heres-what-happened-410cf0d0ee83", createdAt: new Date("2026-03-26T00:30:00Z") },
  { type: "launch", title: "Product Hunt: pagina prodotto creata", description: "20 free image tools. Tags: Productivity, Developer Tools, AI. Promo code FOUNDING200 (43% off).", createdAt: new Date("2026-03-26T11:00:00Z") },
  { type: "backlink", title: "Capterra: submission inviata (DA 90+)", description: "In review, attesa 1-2 giorni lavorativi. Piano Free + Pro $9/mo.", createdAt: new Date("2026-03-26T09:30:00Z") },
  { type: "backlink", title: "G2: submission inviata (DA 90+)", description: "In review, attesa 3 giorni lavorativi.", createdAt: new Date("2026-03-26T11:15:00Z") },
  { type: "indexing", title: "IndexNow: 58 URL inviate a Bing + Yandex", description: "Tutte le pagine tool, blog, comparison inviate via IndexNow API. 202 Accepted da entrambi.", createdAt: new Date("2026-03-26T08:00:00Z") },
  { type: "indexing", title: "GSC Request Indexing: ~10 URL processate", description: "Quota giornaliera esaurita. Continuare domani con le rimanenti ~9 URL.", createdAt: new Date("2026-03-26T10:00:00Z") },
  { type: "seo", title: "Fix search bar sticky sotto navbar", description: "Search bar su /tools ora sticky a top-14 (sotto la navbar) invece di top-0 (sovrapposta)", createdAt: new Date("2026-03-26T12:45:00Z") },
  { type: "seo", title: "Dev.to profilo aggiornato", description: "Bio, skills, website sammapix.com, brand color #6366F1", createdAt: new Date("2026-03-26T00:10:00Z") },
  { type: "seo", title: "Verifica directory REALI vs DB", description: "Corretto G2 (non era listato), AlternativeTo (non trovato), Uneed (non trovato). Solo SaaSHub + Dev.to confermati.", createdAt: new Date("2026-03-26T09:00:00Z") },
];

async function log() {
  for (const a of activities) {
    await db.insert(growthActivityLog).values(a);
  }
  console.log(`${activities.length} attività registrate nello storico`);
  process.exit(0);
}
log().catch((e) => { console.error(e); process.exit(1); });

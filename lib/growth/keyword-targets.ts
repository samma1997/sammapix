// ---------------------------------------------------------------------------
// Shared keyword target strategy — single source of truth for ALL crons.
// Every cron (Reddit scraper, outreach finder, daily TODO) reads from here.
// ---------------------------------------------------------------------------

export interface KeywordTarget {
  keyword: string;
  target: number;           // goal position
  page: string;             // our page that should rank
  category: "tool" | "blog" | "comparison";
  explanation: string;      // why this keyword matters (Italian)
  redditQueries: string[];  // 3 search variations to find Reddit posts about this
  outreachQueries: string[]; // 2 Google CSE queries to find articles to pitch
}

export const TARGET_KEYWORDS: KeywordTarget[] = [
  // ── Tool pages ────────────────────────────────────────────────────────────
  {
    keyword: "compress images online free",
    target: 3,
    page: "/tools/compress",
    category: "tool",
    explanation: "Chi cerca di comprimere immagini gratis — il nostro tool principale",
    redditQueries: [
      "compress images free",
      "best image compressor online",
      "reduce image file size free",
    ],
    outreachQueries: [
      "best image compression tools 2026",
      "free image compressor online tools",
    ],
  },
  {
    keyword: "webp converter free",
    target: 3,
    page: "/tools/webp",
    category: "tool",
    explanation: "Chi vuole convertire immagini in formato WebP — molto cercato per velocizzare i siti",
    redditQueries: [
      "convert to webp free",
      "webp converter online",
      "png jpg to webp converter",
    ],
    outreachQueries: [
      "best webp converter tools 2026",
      "convert images to webp online free",
    ],
  },
  {
    keyword: "heic to jpg free",
    target: 5,
    page: "/tools/heic",
    category: "tool",
    explanation: "Chi ha foto iPhone in formato HEIC e le vuole convertire in JPG",
    redditQueries: [
      "heic to jpg converter",
      "convert heic photos free",
      "iphone heic format converter",
    ],
    outreachQueries: [
      "best heic to jpg converter free 2026",
      "how to convert heic to jpg tools",
    ],
  },
  {
    keyword: "ai rename photos",
    target: 3,
    page: "/tools/ai-rename",
    category: "tool",
    explanation: "Chi vuole rinominare le foto con l'intelligenza artificiale — tool unico nostro",
    redditQueries: [
      "ai rename photos automatically",
      "batch rename photos with AI",
      "automatic photo renaming tool",
    ],
    outreachQueries: [
      "best AI photo renaming tools 2026",
      "automatic image renaming software free",
    ],
  },
  {
    keyword: "remove exif data online",
    target: 5,
    page: "/tools/exif",
    category: "tool",
    explanation: "Chi vuole rimuovere i dati nascosti dalle foto (posizione, data, dispositivo)",
    redditQueries: [
      "remove exif data from photos",
      "strip metadata from images online",
      "remove photo location data privacy",
    ],
    outreachQueries: [
      "best tools to remove exif data online 2026",
      "how to strip metadata from photos free",
    ],
  },
  {
    keyword: "batch resize images free",
    target: 5,
    page: "/tools/resizepack",
    category: "tool",
    explanation: "Chi deve ridimensionare tante immagini insieme — utile per e-commerce e social",
    redditQueries: [
      "batch resize images free",
      "bulk image resizer online",
      "resize multiple images at once",
    ],
    outreachQueries: [
      "best batch image resizer tools 2026",
      "bulk resize images online free tools",
    ],
  },
  {
    keyword: "remove background free",
    target: 10,
    page: "/tools/remove-bg",
    category: "tool",
    explanation: "Chi vuole rimuovere lo sfondo dalle foto — mercato molto competitivo",
    redditQueries: [
      "remove background from image free",
      "best background remover free",
      "remove.bg alternatives free",
    ],
    outreachQueries: [
      "best free background remover tools 2026",
      "remove.bg free alternatives 2026",
    ],
  },
  {
    keyword: "passport photo maker free",
    target: 5,
    page: "/tools/passport-photo",
    category: "tool",
    explanation: "Chi vuole fare la fototessera da casa senza andare dal fotografo",
    redditQueries: [
      "passport photo maker free online",
      "make passport photo at home free",
      "free id photo tool online",
    ],
    outreachQueries: [
      "best free passport photo maker tools 2026",
      "how to make passport photo online free",
    ],
  },
  // ── Blog / comparison pages ───────────────────────────────────────────────
  {
    keyword: "tinypng alternative",
    target: 3,
    page: "/blog/best-tinypng-alternative-2026",
    category: "comparison",
    explanation: "Chi cerca un'alternativa a TinyPNG — il nostro concorrente principale",
    redditQueries: [
      "tinypng alternative free",
      "better than tinypng",
      "tinypng replacement tools",
    ],
    outreachQueries: [
      "tinypng alternatives 2026",
      "best free image compression tinypng alternative",
    ],
  },
  {
    keyword: "best image compression tools 2026",
    target: 5,
    page: "/blog/best-image-compression-tools-2026",
    category: "blog",
    explanation: "Chi cerca i migliori tool di compressione immagini — articolo di confronto",
    redditQueries: [
      "best image compression tools",
      "image compressor comparison",
      "which image optimizer is best",
    ],
    outreachQueries: [
      "best image compression tools 2026 roundup",
      "top image optimization tools comparison 2026",
    ],
  },
  {
    keyword: "avif vs webp vs jpeg",
    target: 5,
    page: "/blog/webp-vs-avif-vs-jpeg-comparison",
    category: "comparison",
    explanation: "Chi confronta i formati immagine moderni — traffico tecnico di qualita",
    redditQueries: [
      "avif vs webp which is better",
      "webp vs jpeg comparison",
      "best image format for web 2026",
    ],
    outreachQueries: [
      "avif vs webp vs jpeg comparison guide",
      "best image format for web performance 2026",
    ],
  },
  {
    keyword: "compress images without losing quality",
    target: 5,
    page: "/blog/compress-images-without-losing-quality",
    category: "blog",
    explanation: "Chi vuole comprimere senza perdere qualita — esattamente quello che facciamo noi",
    redditQueries: [
      "compress images without losing quality",
      "lossless image compression free",
      "reduce image size keep quality",
    ],
    outreachQueries: [
      "how to compress images without losing quality guide 2026",
      "lossless image compression tools online free",
    ],
  },
  {
    keyword: "remove exif data from photos",
    target: 5,
    page: "/blog/remove-exif-protect-privacy",
    category: "blog",
    explanation: "Chi vuole proteggere la privacy rimuovendo i dati dalle foto",
    redditQueries: [
      "remove exif data privacy",
      "how to delete photo metadata",
      "protect privacy remove photo location",
    ],
    outreachQueries: [
      "how to remove exif data from photos privacy guide",
      "best tools strip photo metadata privacy 2026",
    ],
  },
  {
    keyword: "best free remove bg alternatives",
    target: 5,
    page: "/blog/best-free-remove-bg-alternatives-2026",
    category: "comparison",
    explanation: "Chi cerca alternative gratuite a remove.bg — confronto con il nostro tool",
    redditQueries: [
      "free remove bg alternatives",
      "background removal free tools",
      "remove background without remove.bg",
    ],
    outreachQueries: [
      "best free remove bg alternatives 2026",
      "remove.bg free replacements comparison 2026",
    ],
  },
  {
    keyword: "instagram image quality loss",
    target: 3,
    page: "/blog/instagram-image-quality-loss-fix",
    category: "blog",
    explanation: "Chi ha problemi di qualita foto su Instagram — problema molto comune",
    redditQueries: [
      "instagram image quality loss fix",
      "instagram compresses my photos",
      "how to post high quality photos on instagram",
    ],
    outreachQueries: [
      "why does instagram reduce image quality fix",
      "how to upload photos to instagram without quality loss 2026",
    ],
  },
  // ── Quick wins — keyword dove GIÀ rankiamo (spingere in top 3) ──────────
  {
    keyword: "best png compression tools 2026",
    target: 3,
    page: "/blog/best-image-compression-tools-2026",
    category: "blog",
    explanation: "Siamo già in posizione 8 — con qualche link interno arriviamo in top 3",
    redditQueries: ["best png compression tool", "png compressor free 2026", "compress png online"],
    outreachQueries: ["best png compression tools 2026 roundup", "png image compressor comparison"],
  },
  {
    keyword: "webp adoption statistics 2026",
    target: 1,
    page: "/blog/webp-vs-avif-vs-jpeg-comparison",
    category: "blog",
    explanation: "Siamo già in posizione 4 — spingiamo per il primo posto",
    redditQueries: ["webp adoption rate", "webp browser support 2026", "should I use webp"],
    outreachQueries: ["webp adoption statistics 2026", "webp usage rate browser support"],
  },
  {
    keyword: "does discord strip exif metadata",
    target: 5,
    page: "/blog/remove-exif-protect-privacy",
    category: "blog",
    explanation: "Siamo in posizione 19 con 4 impressioni — quasi quick win, forte angolo privacy",
    redditQueries: ["discord exif metadata", "discord strip photo metadata", "discord image privacy"],
    outreachQueries: ["does discord strip exif data from photos", "social media exif metadata stripping"],
  },
  {
    keyword: "seo file name generator",
    target: 5,
    page: "/tools/ai-rename",
    category: "tool",
    explanation: "Siamo in posizione 25 con 5 impressioni — collegato al nostro tool AI Rename",
    redditQueries: ["seo image file name", "rename images for seo", "file naming seo best practice"],
    outreachQueries: ["seo image file naming tools 2026", "how to name images for seo"],
  },
  {
    keyword: "topaz gigapixel ai price 2026",
    target: 3,
    page: "/blog/best-free-topaz-gigapixel-alternatives-2026",
    category: "comparison",
    explanation: "Siamo già in posizione 7.6 — la gente cerca il prezzo e noi offriamo alternative gratuite",
    redditQueries: ["topaz gigapixel alternative free", "topaz ai price worth it", "gigapixel free alternative"],
    outreachQueries: ["topaz gigapixel ai alternatives free 2026", "topaz gigapixel ai price comparison"],
  },
  // ── Privacy angle ─────────────────────────────────────────────────────────
  {
    keyword: "compress images no upload",
    target: 1,
    page: "/tools/compress",
    category: "tool",
    explanation: "Chi vuole comprimere senza caricare le foto su server — il nostro punto di forza (tutto nel browser)",
    redditQueries: [
      "compress images without uploading",
      "image compressor no server upload",
      "browser based image compression no upload",
    ],
    outreachQueries: [
      "client side image compression no upload tools",
      "compress images locally browser based privacy 2026",
    ],
  },
  {
    keyword: "image tools browser based",
    target: 3,
    page: "/",
    category: "tool",
    explanation: "Chi cerca tool immagini che funzionano nel browser — noi siamo 100% browser-based",
    redditQueries: [
      "browser based image tools",
      "image tools no install required",
      "client side photo editing tools online",
    ],
    outreachQueries: [
      "best browser based image tools no upload 2026",
      "client side image processing tools online free",
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper: pick keyword targets that are NOT yet at goal position.
// Pass in the current GSC position map if available.
// If no position data is available, all keywords are considered "not ranking".
// ---------------------------------------------------------------------------
export function getWeakKeywords(
  positionMap?: Map<string, number>,
  limit = 15
): KeywordTarget[] {
  if (!positionMap) return TARGET_KEYWORDS.slice(0, limit);

  return TARGET_KEYWORDS
    .filter((kw) => {
      const pos = positionMap.get(kw.keyword);
      // Not ranking at all OR above target position
      return pos === undefined || pos > kw.target;
    })
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Helper: find which TARGET_KEYWORD a piece of text is related to (fuzzy match).
// Returns the first matching keyword or null.
// ---------------------------------------------------------------------------
export function matchKeywordTarget(text: string): KeywordTarget | null {
  const lower = text.toLowerCase().trim();

  // Exact keyword match first
  const exact = TARGET_KEYWORDS.find((kw) => lower.includes(kw.keyword));
  if (exact) return exact;

  // Word-overlap match: 60% of keyword words must appear in the text
  for (const kw of TARGET_KEYWORDS) {
    const kwWords = kw.keyword.split(" ");
    const matchCount = kwWords.filter((w) => lower.includes(w)).length;
    if (matchCount >= Math.ceil(kwWords.length * 0.6)) return kw;
  }

  return null;
}

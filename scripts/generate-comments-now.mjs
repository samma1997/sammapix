import { neon } from "@neondatabase/serverless";
import { GoogleGenerativeAI } from "@google/generative-ai";

const sql = neon(process.env.DATABASE_URL);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const today = new Date().toISOString().slice(0, 10);

// ═══ DEDUPLICATION: load already-commented thread IDs from DB ═══
const alreadyCommented = await sql`SELECT reddit_id FROM growth_reddit_posts WHERE status = 'commented'`;
const commentedIds = new Set(alreadyCommented.map(r => r.reddit_id).filter(Boolean));
// Also check today's existing comment todos to avoid dups within same day
const todayComments = await sql`SELECT action_url FROM growth_daily_todos WHERE date = ${today} AND type = 'reddit_comment'`;
const todayUrls = new Set(todayComments.map(r => r.action_url).filter(Boolean));
console.log(`Dedup: ${commentedIds.size} thread già commentati, ${todayUrls.size} già nel TODO di oggi\n`);

const MENTION_OK = new Set([
  "sideproject", "buildinpublic", "saas", "upscaling", "topazlabs", "indiehackers",
  "webdev", "askphotography", "photography", "web_design", "weddingphotography",
  "photoshop", "lightroom", "gimp", "wordpress", "graphic_design", "degoogle",
  "fujifilm", "nri", "webdesign",
]);
const NO_MENTION = new Set([
  "privacy", "seo", "ecommerce", "shopify", "entrepreneur", "internetisbeautiful",
  "discordapp", "india", "etsy", "datahoarder",
]);

const subSearchPairs = [
  { sub: "webdev", q: "image optimization" },
  { sub: "webdev", q: "compress images" },
  { sub: "photography", q: "compress photos" },
  { sub: "photography", q: "batch processing" },
  { sub: "AskPhotography", q: "resize photos workflow" },
  { sub: "selfhosted", q: "image tool browser" },
  { sub: "Wordpress", q: "image optimization slow" },
  { sub: "SideProject", q: "image tool free" },
  { sub: "graphic_design", q: "batch resize compress" },
  { sub: "upscaling", q: "free upscaler alternative" },
  { sub: "photoshop", q: "batch resize alternative" },
  { sub: "privacy", q: "photo metadata gps exif" },
  { sub: "degoogle", q: "image tool privacy" },
  { sub: "lightroom", q: "export resize compress" },
];

console.log("Cercando thread su Reddit...\n");

const allThreads = [];
const seenIds = new Set();

for (const pair of subSearchPairs) {
  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(
      `https://www.reddit.com/r/${pair.sub}/search.json?q=${encodeURIComponent(pair.q)}&restrict_sr=1&sort=new&t=month&limit=8`,
      { headers: { "User-Agent": "SammaPix-Growth/2.0" }, signal: AbortSignal.timeout(10000) }
    );
    if (res.ok) {
      const data = await res.json();
      const posts = (data?.data?.children ?? []);
      let added = 0;
      for (const c of posts) {
        const url = `https://www.reddit.com${c.data.permalink}`;
        if (!seenIds.has(c.data.id) && c.data.num_comments < 50 && !commentedIds.has(c.data.id) && !todayUrls.has(url)) {
          seenIds.add(c.data.id);
          allThreads.push({
            title: c.data.title,
            subreddit: c.data.subreddit,
            url: `https://www.reddit.com${c.data.permalink}`,
            comments: c.data.num_comments,
            id: c.data.id,
          });
          added++;
        }
      }
      if (added > 0) process.stdout.write(`  r/${pair.sub} "${pair.q}": +${added} thread\n`);
    }
  } catch {}
}

console.log(`\nTotale thread trovati: ${allThreads.length}`);

// Sort: prefer 1-15 comments (alive but not crowded)
const commentable = allThreads
  .sort((a, b) => {
    const sa = a.comments >= 1 && a.comments <= 15 ? 20 : a.comments === 0 ? 10 : 5;
    const sb = b.comments >= 1 && b.comments <= 15 ? 20 : b.comments === 0 ? 10 : 5;
    return sb - sa;
  })
  .slice(0, 6);

console.log(`Thread selezionati per commenti: ${commentable.length}\n`);
console.log("Generando commenti con Gemini...\n");

let inserted = 0;
for (const thread of commentable) {
  try {
    const subLower = thread.subreddit.toLowerCase();
    const canMention = MENTION_OK.has(subLower);
    const noMention = NO_MENTION.has(subLower);

    let mentionInstruction;
    if (noMention) {
      mentionInstruction = `NON menzionare nessun prodotto. Rispondi SOLO con un consiglio utile e genuino. L'obiettivo è costruire reputazione.`;
    } else if (canMention) {
      mentionInstruction = `Puoi menzionare "SammaPix" IN MODO NATURALE. Es: "i've been using sammapix for this, it does everything in the browser". NON mettere link URL.`;
    } else {
      mentionInstruction = `Rispondi con un consiglio utile. Se ha senso, menziona "SammaPix", ma solo se naturale.`;
    }

    const result = await model.generateContent(`Scrivi un commento Reddit per: "${thread.title}" su r/${thread.subreddit}

STILE:
- 2-4 frasi, casuale, come un utente Reddit reale
- Includi almeno 1 dettaglio specifico (numero, formato, dimensione, esperienza)
- Sii CURIOSO e genuino, come se condividessi una scoperta
- Lowercase ok, no emoji, no bullet point, no "Pro tip:", no "I'd recommend"
- Se puoi, aggiungi una curiosità ("fun fact:", "the weird thing is...", "i actually tested this...")

${mentionInstruction}

SOLO il commento, nient'altro:`);

    const draft = result.response.text().trim();
    const priority = canMention ? 8 : noMention ? 5 : 6;
    const label = noMention ? "\u{1F4AC} Presenza" : canMention ? "\u{1F3AF} Menzione" : "\u{1F4AC} Commenta";

    await sql`INSERT INTO growth_daily_todos (date, type, title, description, action_url, draft_text, status, priority)
              VALUES (${today}, 'reddit_comment', ${`${label} r/${thread.subreddit}`}, ${thread.title.slice(0, 100)}, ${thread.url}, ${draft}, 'pending', ${priority})`;

    inserted++;
    console.log(`  ${inserted}. ${label} r/${thread.subreddit} [${thread.comments}c]`);
    console.log(`     "${thread.title.slice(0, 70)}..."`);
    console.log(`     > ${draft.slice(0, 80)}...`);
    console.log();
  } catch (err) {
    console.error(`  ERRORE: ${err.message}`);
  }
}

console.log(`\n\u2705 ${inserted} commenti inseriti nel growth dashboard per ${today}`);

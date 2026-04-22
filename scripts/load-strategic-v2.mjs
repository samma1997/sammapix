/**
 * Update strategic Reddit posts — new schedule after r/webdev removal.
 * Run: node scripts/load-strategic-v2.mjs
 */
import { readFileSync } from "fs";
const envFile = readFileSync(".env.local", "utf-8");
const dbUrl = envFile.split("\n").find(l => l.startsWith("DATABASE_URL="))?.replace("DATABASE_URL=", "")?.trim();
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { like } from "drizzle-orm";
const sql = neon(dbUrl);
const db = drizzle(sql);
const T = pgTable("growth_reddit_posts", {
  id: serial("id").primaryKey(),
  redditId: text("reddit_id").unique(),
  title: text("title").notNull(),
  subreddit: text("subreddit").notNull(),
  url: text("url").notNull(),
  commentsCount: integer("comments_count").default(0),
  relevanceScore: integer("relevance_score").default(0),
  status: text("status").default("to_comment"),
  draftComment: text("draft_comment"),
  actualComment: text("actual_comment"),
  commentUrl: text("comment_url"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
  commentedAt: timestamp("commented_at"),
});

const POSTS = [
  // ═══════════════════════════════════════════
  // DOMANI 4 aprile — r/saasbuild
  // ═══════════════════════════════════════════
  {
    title: "📅 DOMANI 4 APR → r/saasbuild — SaaS Journey post",
    subreddit: "saasbuild",
    url: "https://www.reddit.com/r/saasbuild/submit?type=TEXT",
    relevanceScore: 200,
    draftComment: `TITLE: I built a privacy-first image toolkit with 35 browser-based tools — $0 revenue, $24/mo costs, 308 SEO pages. Here's what's working and what's not.

FLAIR: SaaS Journey

---

I'm a travel photographer and web developer from Italy. After every trip I deal with hundreds of photos that need compressing, converting, renaming, EXIF stripping. I was using 5 different tools and uploading personal photos to random servers.

So I built [SammaPix](https://sammapix.com). Everything runs in your browser. Your photos never leave your device.

**35 tools so far:**
- Compress (JPG, PNG, WebP, GIF — up to 90% smaller)
- Convert between formats (WebP, HEIC, AVIF, JXL)
- AI rename for SEO (Gemini Flash generates descriptive filenames)
- Background removal (runs a 44MB AI model in your browser via WASM)
- Passport photo maker for 140+ countries
- JPG to PDF merger
- JPEG XL converter (nobody else has this online)
- Batch resize for every social platform
- EXIF viewer & remover
- And 18 more...

**Stack:** Next.js 15, Tailwind, Vercel ($24/mo). Lighthouse 97-99.

**What worked:**
- Programmatic SEO — 308 pages targeting long-tail keywords ("compress image to 200kb", "italy passport photo size"). 79 indexed on Google so far
- Reddit LPT post about GPS in photos → 62K views in 1 hour
- Dev.to cross-post got first backlink

**What didn't:**
- Cold outreach for backlinks (15 emails, 0 replies)
- Product Hunt launch was a flop
- r/webdev post removed by mods in 2 minutes

**The numbers (honest):**
- 600+ commits, 8 months of work
- $24/month hosting
- Revenue: $0
- ~80 pages indexed, ~230 waiting

**The business model:** Browser-first = $0 per image processed. No server compute, no storage, no bandwidth scaling. The user's browser does all the work. My only costs are Vercel hosting + Gemini API for AI features.

What would you change? Is the freemium model (free tools + $9/mo Pro) the right approach?`,
  },

  // ═══════════════════════════════════════════
  // 5 APRILE — r/photography
  // ═══════════════════════════════════════════
  {
    title: "📅 5 APR → r/photography — Photo organization value post",
    subreddit: "photography",
    url: "https://www.reddit.com/r/photography/submit?type=TEXT",
    relevanceScore: 199,
    draftComment: `TITLE: After organizing 10 years of travel photos I wish I'd done these 3 things from day 1

---

Just finished going through 15,000+ photos spanning a decade of travel across 30+ countries. Took me a full weekend. Here's what I learned:

**1. Folder structure matters more than any app.** I settled on Year > Month > Location. Simple and it'll work in 20 years when whatever app you're using doesn't exist anymore.

**2. Rename files immediately.** IMG_3847.jpg means nothing. 2024-03-15-sigiriya-lion-rock-sunrise.jpg tells you everything. I got so tired of doing this manually that I built an AI tool that analyzes the image and generates descriptive filenames automatically. Game changer for 500+ photos from a trip.

**3. Strip GPS data before sharing anything online.** Most people don't realize their phone embeds exact coordinates in every photo. Your home address is probably in the EXIF data of photos you've posted publicly. There are free browser-based tools that strip this without re-compressing the image.

Deleted about 6,000 blurry duplicates using perceptual hashing (finds near-identical shots, not just exact copies). It felt like cleaning out a closet.

For anyone curious, all the tools I mentioned are ones I built myself — they run in the browser so your photos never get uploaded anywhere. Happy to share the link if anyone's interested.

What's your photo organization system?`,
  },

  // ═══════════════════════════════════════════
  // 6 APRILE — r/Entrepreneur
  // ═══════════════════════════════════════════
  {
    title: "📅 6 APR → r/Entrepreneur — Zero-cost infrastructure story",
    subreddit: "Entrepreneur",
    url: "https://www.reddit.com/r/Entrepreneur/submit?type=TEXT",
    relevanceScore: 198,
    draftComment: `TITLE: I built a SaaS with 35 tools and my server costs are $24/month because everything runs in the user's browser

---

Most image processing tools upload your files to a server, process them, send them back. That means: servers, storage, bandwidth, GDPR compliance, data breach liability.

I took a different approach. My tools run 100% in the user's browser using WebAssembly. Their files never touch my server. My infrastructure cost? $24/month on Vercel. That's it.

Even background removal (which typically requires a GPU server) runs client-side using a 44MB AI model that loads via WASM and gets cached in the browser.

**The unit economics:**
- Traditional approach: ~$0.001-0.01 per image processed (server compute + bandwidth)
- My approach: $0 per image (browser does the work)
- At scale this means: 1 million images processed = $0 extra cost

**The tradeoff:** Some operations are slower client-side (background removal takes ~10s on mobile vs ~1s on a GPU server). But users trade speed for privacy, and many are happy to make that trade.

**35 tools, 308 SEO pages, $24/month total cost.** The browser-first approach isn't just a privacy feature — it's a business model advantage.

Has anyone else built products where the client does the heavy lifting? Curious about other "serverless-first" approaches.`,
  },

  // ═══════════════════════════════════════════
  // 7 APRILE — r/webdev retry (Showoff Saturday)
  // ═══════════════════════════════════════════
  {
    title: "📅 7 APR (LUNEDÌ) → r/webdev — Retry con flair Showoff Saturday",
    subreddit: "webdev",
    url: "https://www.reddit.com/r/webdev/submit?type=TEXT",
    relevanceScore: 197,
    draftComment: `NOTA: Postare di SABATO con flair "Showoff Saturday" — r/webdev permette self-promo solo il sabato.

TITLE: [Showoff Saturday] I built 35 image tools that run 100% in your browser — no uploads, all WASM/Canvas API

---

Weekend project that turned into 8 months of work. Everything runs client-side:

- **Background removal** via @huggingface/transformers + RMBG-1.4 (44MB WASM model, cached in browser)
- **JPEG XL converter** via @jsquash/jxl (nobody else has this online yet)
- **JPG to PDF merger** via pdf-lib (reorder pages, pick A4/Letter)
- **HEIC converter** — took 6 attempts to find a cross-browser solution (heic-to WASM won)
- 23 more tools, all Canvas API / browser-image-compression

The biggest lesson: CSP + WASM = pain. 15+ CSP bugs over 600 commits. Test in incognito.

[sammapix.com](https://sammapix.com) — Next.js 15, Tailwind, Vercel. Lighthouse 97-99.

What WASM libraries have you had success with in production?`,
  },

  // ═══════════════════════════════════════════
  // COMMENTI su r/LifeProTips — risposte ai commenti
  // ═══════════════════════════════════════════
  {
    title: "💬 OGGI → Rispondi ai commenti su r/LifeProTips (62K views!)",
    subreddit: "LifeProTips",
    url: "https://www.reddit.com/user/Ok_Breadfruit6730/",
    relevanceScore: 250,
    draftComment: `RISPOSTE DA DARE AI COMMENTI:

Quando qualcuno chiede "come faccio a controllare/rimuovere GPS?":

"On most phones you can check in the gallery app (tap the photo → details/info). On desktop, right-click → Properties → Details tab shows GPS coordinates if they exist. If you want to strip the data before sharing, there are free browser-based EXIF removers that do it without re-compressing the image. I actually built one myself — runs entirely in the browser so the photo never gets uploaded anywhere."

Se qualcuno chiede "quale tool?":

"I built one called SammaPix (sammapix.com/tools/exif) — it shows all the EXIF data and lets you download a clean copy. Runs in the browser, nothing gets uploaded."

Se qualcuno dice "social media lo fa già":

"True, most social platforms strip EXIF on upload. But if you share via email, messaging apps (WhatsApp keeps EXIF!), cloud links, or your own blog/website — the GPS data is still there. Worth stripping before sharing outside of social media."`,
  },
];

async function run() {
  // Remove old strategic posts
  await db.delete(T).where(like(T.title, "%POST ORA%"));
  await db.delete(T).where(like(T.title, "%POST GIORNO%"));
  await db.delete(T).where(like(T.title, "%APR →%"));
  await db.delete(T).where(like(T.title, "%OGGI →%"));
  console.log("🧹 Vecchi post strategici rimossi");

  let ok = 0;
  for (const p of POSTS) {
    try {
      await db.insert(T).values({
        ...p,
        status: "to_comment",
        commentsCount: 0,
        redditId: `strategic-v2-${Date.now()}-${ok}`,
      });
      ok++;
    } catch (e) {
      console.error("Skip:", p.title, e.message);
    }
  }

  console.log(`\n✅ ${ok} post caricati nel growth dashboard`);
  console.log("\n📋 PIANO AGGIORNATO:");
  console.log("   🔴 OGGI 3 APR  → Rispondi commenti r/LifeProTips (62K views!)");
  console.log("   ✅ FATTO OGGI  → r/SideProject (postato)");
  console.log("   📅 DOMANI 4 APR → r/saasbuild (SaaS Journey)");
  console.log("   📅 5 APR       → r/photography (value post, no link diretto)");
  console.log("   📅 6 APR       → r/Entrepreneur (business model)");
  console.log("   📅 7 APR (SAB) → r/webdev retry (Showoff Saturday flair)");
  process.exit(0);
}

run();

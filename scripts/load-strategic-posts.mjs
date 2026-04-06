/**
 * Load strategic Reddit posts for SammaPix launch.
 * Karma is 200+ — these are ready to post NOW.
 * Run: node scripts/load-strategic-posts.mjs
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

const STRATEGIC_POSTS = [
  // ═══════════════════════════════════════════════════
  // POST 1: r/webdev — Technical story (POST FIRST)
  // ═══════════════════════════════════════════════════
  {
    title: "🚀 POST ORA → r/webdev — 27 browser tools, technical deep dive",
    subreddit: "webdev",
    url: "https://www.reddit.com/r/webdev/submit?type=TEXT",
    relevanceScore: 200,
    draftComment: `TITLE: I built 27 image tools that run 100% in your browser — no server uploads, no accounts, no BS. Here's what I learned.

---

Hey r/webdev,

8 months ago I got mass-reported by a client for uploading their product photos to a "free image compressor" that turned out to be harvesting the images. That was the moment I decided to build my own.

The rule was simple: **zero server uploads.** Every single operation — compression, format conversion, background removal, EXIF stripping, even AI renaming — had to run entirely in the browser.

Here's what I ended up building: [SammaPix](https://sammapix.com) — 27 free tools, all client-side.

## The interesting technical bits

**Compression & conversion:** Canvas API + browser-image-compression. Sounds simple until you handle HEIC (had to go through 6 different approaches before finding one that works cross-browser — heic-to WASM was the winner).

**Background removal in-browser:** This was the hardest. @imgly/background-removal looked perfect until their CDN started failing and the 176MB ONNX model kept timing out. Ended up using @huggingface/transformers with briaai/RMBG-1.4 loaded via AutoModel. The model is ~44MB quantized, cached by the browser after first load. Quality is surprisingly good for a client-side solution.

**JPEG XL (JXL) converter:** Nobody has this online yet. Chrome is re-adding JXL support, Safari 17+ already has it. Used @jsquash/jxl (WASM). The format is genuinely impressive — 30-60% smaller than JPEG at equivalent quality.

**JPG to PDF merger:** pdf-lib handles this entirely client-side. Users can reorder pages, pick A4/Letter/fit-to-image. Zero server cost.

**The CSP nightmare:** Content Security Policy with WASM libraries is pure pain. Every new library = new domains to whitelist. I had 15+ CSP-related bugs over 600 commits. If you're doing client-side WASM stuff, test in incognito mode — your cached version might work fine while new users get silent CSP blocks.

## What I'd do differently

1. **Never swallow errors silently.** I had a try/catch around background removal that fell back to the original image without telling the user. Looked like the tool was "working" but not removing anything. Took me embarrassingly long to find.

2. **Test in a real browser before deploying.** Server-side builds pass fine, but CSP, WASM loading, and model downloads only fail in the actual browser. Playwright saved me.

3. **Start with security headers from day 1.** Retrofitting CSP, HSTS, CORP across an existing app is miserable.

## Numbers (honest)

- 27 tools, 308 pages
- 600+ commits
- $24/month hosting (Vercel Standard)
- Revenue: ~$0 (just launched Pro plan)
- Built solo as a side project

The tools are genuinely free — no watermarks, no account needed for most things. The Pro plan ($9/mo) is for power users who want batch ZIP downloads and unlimited AI operations.

Curious what you all think about the client-side-only approach. Anyone else building privacy-first tools? What WASM libraries have you had success with?

Stack: Next.js 15 + Tailwind + Vercel. AI: Google Gemini Flash for rename/alt-text. WASM: @jsquash/jxl, @huggingface/transformers, heic-to.`,
  },

  // ═══════════════════════════════════════════════════
  // POST 2: r/SideProject — Launch story (POST DAY 2)
  // ═══════════════════════════════════════════════════
  {
    title: "🚀 POST GIORNO 2 → r/SideProject — Launch story",
    subreddit: "SideProject",
    url: "https://www.reddit.com/r/SideProject/submit?type=TEXT",
    relevanceScore: 199,
    draftComment: `TITLE: I built a privacy-first image toolkit with 27 browser-based tools because I was tired of uploading photos to servers I don't trust

---

I'm a travel photographer and web developer from Italy. After every trip I deal with hundreds of photos that need compressing, converting, renaming, EXIF stripping. I was using 5 different tools and uploading personal photos to random servers.

So I built [SammaPix](https://sammapix.com). Everything runs in your browser. Your photos never leave your device.

**27 tools so far:**
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

**What worked:** Programmatic SEO pages — I have 308 pages targeting long-tail keywords like "compress image to 200kb" and "italy passport photo size". 79 indexed on Google so far.

**What didn't:** Cold outreach for backlinks (15 emails, 0 replies). Reddit karma farming took 2 weeks to hit 200. Product Hunt launch was a flop.

**Revenue:** $0 so far. Free plan is genuinely free (no watermarks, no limits on most tools). Pro is $9/mo for power users.

What would you change? What would make you switch from TinyPNG?`,
  },

  // ═══════════════════════════════════════════════════
  // POST 3: r/photography — Value post (POST DAY 3)
  // ═══════════════════════════════════════════════════
  {
    title: "🚀 POST GIORNO 3 → r/photography — Photo organization tips",
    subreddit: "photography",
    url: "https://www.reddit.com/r/photography/submit?type=TEXT",
    relevanceScore: 198,
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

  // ═══════════════════════════════════════════════════
  // POST 4: r/Entrepreneur — Business angle (POST DAY 4)
  // ═══════════════════════════════════════════════════
  {
    title: "🚀 POST GIORNO 4 → r/Entrepreneur — Zero-cost infrastructure",
    subreddit: "Entrepreneur",
    url: "https://www.reddit.com/r/Entrepreneur/submit?type=TEXT",
    relevanceScore: 197,
    draftComment: `TITLE: I built a SaaS with 27 tools and my server costs are $24/month because everything runs in the user's browser

---

Most image processing tools upload your files to a server, process them, send them back. That means: servers, storage, bandwidth, GDPR compliance, data breach liability.

I took a different approach. My tools run 100% in the user's browser using WebAssembly. Their files never touch my server. My infrastructure cost? $24/month on Vercel. That's it.

Even background removal (which typically requires a GPU server) runs client-side using a 44MB AI model that loads via WASM and gets cached in the browser.

**The unit economics:**
- Traditional approach: ~$0.001-0.01 per image processed (server compute + bandwidth)
- My approach: $0 per image (browser does the work)
- At scale this means: 1 million images processed = $0 extra cost

**The tradeoff:** Some operations are slower client-side (background removal takes ~10s on mobile vs ~1s on a GPU server). But users trade speed for privacy, and many are happy to make that trade.

**27 tools, 308 SEO pages, $24/month total cost.** The browser-first approach isn't just a privacy feature — it's a business model advantage.

Has anyone else built products where the client does the heavy lifting? Curious about other "serverless-first" approaches.`,
  },
];

async function run() {
  // Remove old strategic posts
  await db.delete(T).where(like(T.title, "%DOPO 200 KARMA%"));
  await db.delete(T).where(like(T.title, "%POST ORA%"));
  await db.delete(T).where(like(T.title, "%POST GIORNO%"));
  console.log("🧹 Vecchi post strategici rimossi");

  let ok = 0;
  for (const p of STRATEGIC_POSTS) {
    try {
      await db.insert(T).values({
        ...p,
        status: "to_comment",
        commentsCount: 0,
        redditId: `strategic-${Date.now()}-${ok}`,
      });
      ok++;
    } catch (e) {
      console.error("Skip:", p.title, e.message);
    }
  }

  console.log(`\n✅ ${ok} post strategici caricati nel growth dashboard`);
  console.log("\n📋 PIANO DI ATTACCO:");
  console.log("   🔴 OGGI     → r/webdev (technical deep dive)");
  console.log("   🟠 GIORNO 2 → r/SideProject (launch story)");
  console.log("   🟡 GIORNO 3 → r/photography (value post, no link)");
  console.log("   🟢 GIORNO 4 → r/Entrepreneur (business model)");
  console.log("\n⚠️  NON postare tutti lo stesso giorno!");
  console.log("   Reddit penalizza self-promotion ripetuta.");
  process.exit(0);
}

run();

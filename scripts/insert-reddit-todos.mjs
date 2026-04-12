import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const today = new Date().toISOString().slice(0, 10);

const todos = [
  {
    type: "reddit_post",
    title: "\u{1F3AF} Posta su r/SideProject \u2014 post curioso Canvas API",
    description: "Post tecnico/curioso: Canvas API batte SaaS da $20/mese. 27 tool. Chiedi feedback distribuzione.",
    action_url: "https://www.reddit.com/r/SideProject/submit",
    draft_text: `TIL browser Canvas API can compress images better than most $20/month SaaS tools. So I built 27 tools on top of it.

I've been down a rabbit hole for 8 months.

It started when I realized that canvas.toBlob() with quality 0.8 produces results that are statistically indistinguishable from what TinyPNG does server-side. I ran a benchmark on 100 real photos \u2014 average file size difference was less than 3%.

So I thought: if compression works client-side, what else can run in the browser?

Turns out \u2014 a LOT:
- Image upscaling (multi-pass Canvas interpolation)
- Background removal (WebAssembly + HuggingFace models)
- EXIF/GPS stripping (pure JS, zero upload)
- Format conversion (HEIC, WebP, AVIF, JXL)
- Passport photos for 140+ countries (with AI crop)
- Batch watermarking, AI rename, duplicate detection...

27 tools total. Everything runs in your browser. Nothing ever touches a server. Zero cookies, zero tracking.

The weird part? I'm at ~5 organic visits/day after 300+ pages and 44 blog posts. TinyPNG does ONE thing and gets millions.

Built with Next.js 14, Canvas API, Web Workers, and WebAssembly. The only server calls are for AI features (Gemini Flash for rename/alt-text).

Would genuinely love feedback from other builders \u2014 especially on distribution. The product is done, the traction is not.

Link: https://sammapix.com`,
    priority: 10,
  },
  {
    type: "reddit_post",
    title: "\u{1F4DD} Posta su r/buildinpublic \u2014 300 pagine, 5 visite",
    description: "Building in public: prodotto finito, distribuzione no. Metriche reali.",
    action_url: "https://www.reddit.com/r/buildinpublic/submit",
    draft_text: `Month 8 of my side project: 300+ pages, 27 tools, 44 blog posts. 5 organic visits per day.

Numbers that look impressive on paper but mean nothing without distribution:
- 27 browser-based image tools (compress, resize, convert, remove bg, passport photo...)
- 308 indexable pages (programmatic SEO: /compress-to/50kb, /resize-for/instagram, etc.)
- 44 blog articles with original data
- Performance score: 97-99 on Lighthouse
- Privacy: everything runs client-side, zero uploads

Numbers that actually matter:
- ~5 organic visits/day
- 15 pages indexed out of 308
- 0 paying customers
- 1 backlink (dofollow, from someone who cited our benchmark data)

The product is genuinely good. I've tested it against TinyPNG, Squoosh, and iLoveIMG. But nobody knows it exists.

What worked so far: a Reddit post about EXIF/GPS data got 1.2K upvotes and 441K views. That single post brought more traffic than 8 months of SEO.

What I'm doing now: Reddit comments (building presence before posting), directory submissions, blog articles targeting long-tail keywords with zero competition.

Lesson: building the product is 20% of the work. The other 80% is getting anyone to care.

Anyone else stuck in this "great product, zero traction" phase?`,
    priority: 9,
  },
  {
    type: "reddit_post",
    title: "\u{1F4DD} Posta su r/SaaS \u2014 feedback + unit economics",
    description: "Feedback nel weekly thread. Angolo: $25/mese per runnare 27 tool SaaS.",
    action_url: "https://www.reddit.com/r/SaaS/",
    draft_text: `Looking for feedback on my freemium image toolkit (SammaPix)

Quick context: 27 browser-based image tools (compress, resize, convert formats, remove background, passport photos, etc.). Everything runs client-side \u2014 no server processing costs.

The interesting part from a SaaS perspective: my infrastructure cost is ~$24/month (Vercel hosting + Neon DB). The AI features (Gemini Flash for image renaming/alt text) add ~$0.60/month. Total: under $25/month to run a 27-tool SaaS.

Monetization: Free tier (20 files/batch, 10 AI ops/day) + Pro at $9/month (500 files, 200 AI ops, ZIP download).

Current state: 0 paying customers, ~5 organic visits/day, 308 pages indexed.

Questions for the community:
1. Is $9/month too high for image tools when free alternatives exist?
2. Should I focus on one hero tool instead of 27?
3. Any SaaS founders who cracked distribution for a tool-based product?

https://sammapix.com`,
    priority: 8,
  },
];

try {
  // Delete existing reddit_post todos for today to avoid duplicates
  await sql`DELETE FROM growth_daily_todos WHERE date = ${today} AND type = 'reddit_post'`;
  console.log(`Pulito post esistenti per ${today}`);

  for (const t of todos) {
    await sql`INSERT INTO growth_daily_todos (date, type, title, description, action_url, draft_text, status, priority)
              VALUES (${today}, ${t.type}, ${t.title}, ${t.description}, ${t.action_url}, ${t.draft_text}, 'pending', ${t.priority})`;
    console.log("\u2705", t.title);
  }
  console.log(`\n${todos.length} post inseriti per ${today}`);
} catch (err) {
  console.error("Errore:", err.message);
}

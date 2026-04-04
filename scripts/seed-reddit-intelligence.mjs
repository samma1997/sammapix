// Run with: node scripts/seed-reddit-intelligence.mjs
// Seeds the reddit intelligence table with known data from our experience

import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

const SEED_DATA = [
  // TIER: proven (tested and working)
  { subreddit: "LifeProTips", tier: "proven", min_karma: 50, links_allowed: false, self_promo_allowed: false, best_post_format: "LPT: [surprising fact] + practical consequence", avg_upvotes: 500, total_posts: 2, total_blocked: 2, best_time_utc: "06:00-09:00", notes: "1K+ upvote post about EXIF/GPS. AutoMod removes OP comments with links. Mention brand name without URL." },
  { subreddit: "DoesAnybodyElse", tier: "proven", min_karma: 10, links_allowed: false, self_promo_allowed: false, best_post_format: "DAE [relatable short observation]?", avg_upvotes: 144, total_posts: 1, total_blocked: 0, best_time_utc: "06:00-09:00", notes: "Great for karma farming. Short relatable posts work best." },
  { subreddit: "SideProject", tier: "proven", min_karma: 100, links_allowed: true, self_promo_allowed: true, best_post_format: "I built [tool] that [solves problem] — [key metric]", avg_upvotes: 0, total_posts: 0, total_blocked: 0, notes: "Self-promo allowed and encouraged. Wait for 200+ karma." },
  { subreddit: "webdev", tier: "proven", min_karma: 100, links_allowed: true, self_promo_allowed: false, best_post_format: "Value-first story, tool mention at the end only", avg_upvotes: 0, total_posts: 0, total_blocked: 0, notes: "Strict anti-spam. Lead with value (perf improvement, technique), mention tool casually." },
  { subreddit: "photography", tier: "proven", min_karma: 100, links_allowed: false, self_promo_allowed: false, best_post_format: "Personal workflow story with genuine tip", avg_upvotes: 0, total_posts: 0, total_blocked: 0, notes: "Very anti-marketing. Only genuine experience stories work." },

  // TIER: testing (should work but not yet tested)
  { subreddit: "Entrepreneur", tier: "testing", min_karma: 100, links_allowed: null, self_promo_allowed: false, best_post_format: null, notes: "Business angle: unit economics of free SaaS, browser-based = $0 hosting cost." },
  { subreddit: "selfhosted", tier: "testing", min_karma: null, links_allowed: null, self_promo_allowed: false, best_post_format: null, notes: "Privacy angle: browser-based = no upload = self-hosted equivalent." },
  { subreddit: "degoogle", tier: "testing", min_karma: null, links_allowed: null, self_promo_allowed: false, best_post_format: null, notes: "Strong privacy angle: no Google Photos dependency." },
  { subreddit: "AskPhotography", tier: "testing", min_karma: null, links_allowed: null, self_promo_allowed: false, best_post_format: null, notes: "Direct workflow questions about photo management." },
  { subreddit: "SEO", tier: "testing", min_karma: 50, links_allowed: null, self_promo_allowed: false, best_post_format: null, notes: "Image optimization for Core Web Vitals angle." },
  { subreddit: "CasualConversation", tier: "testing", min_karma: 10, links_allowed: false, self_promo_allowed: false, best_post_format: "Short personal story with question at the end", notes: "Good for karma farming. Keep it genuine and conversational." },
  { subreddit: "AskReddit", tier: "testing", min_karma: 10, links_allowed: false, self_promo_allowed: false, best_post_format: "Universal question everyone can answer", notes: "Good for karma farming. Questions, not statements." },

  // TIER: blocked (tested and failed or irrelevant)
  { subreddit: "mysummercar", tier: "blocked", notes: "False positive from scraper. Gaming subreddit, zero relevance." },
  { subreddit: "greencard", tier: "blocked", notes: "False positive. Immigration subreddit." },
  { subreddit: "cameras", tier: "blocked", notes: "Hardware-focused, not software/tools." },
  { subreddit: "iphone", tier: "blocked", notes: "Too generic, not image-optimization focused." },
  { subreddit: "ios", tier: "blocked", notes: "Too generic." },
];

async function seed() {
  console.log("Seeding reddit intelligence...");

  for (const data of SEED_DATA) {
    try {
      const s = data.subreddit;
      const t = data.tier;
      const mk = data.min_karma ?? null;
      const la = data.links_allowed ?? null;
      const sp = data.self_promo_allowed ?? null;
      const bf = data.best_post_format ?? null;
      const au = data.avg_upvotes ?? 0;
      const tp = data.total_posts ?? 0;
      const tb = data.total_blocked ?? 0;
      const bt = data.best_time_utc ?? null;
      const n = data.notes ?? null;
      await sql`
        INSERT INTO growth_reddit_intelligence (subreddit, tier, min_karma, links_allowed, self_promo_allowed, best_post_format, avg_upvotes, total_posts, total_blocked, best_time_utc, notes)
        VALUES (${s}, ${t}, ${mk}, ${la}, ${sp}, ${bf}, ${au}, ${tp}, ${tb}, ${bt}, ${n})
        ON CONFLICT (subreddit) DO UPDATE SET
          tier = EXCLUDED.tier,
          min_karma = EXCLUDED.min_karma,
          links_allowed = EXCLUDED.links_allowed,
          self_promo_allowed = EXCLUDED.self_promo_allowed,
          best_post_format = EXCLUDED.best_post_format,
          avg_upvotes = EXCLUDED.avg_upvotes,
          total_posts = EXCLUDED.total_posts,
          total_blocked = EXCLUDED.total_blocked,
          best_time_utc = EXCLUDED.best_time_utc,
          notes = EXCLUDED.notes,
          updated_at = NOW()
      `;
      console.log(`  ✓ ${data.subreddit} (${data.tier})`);
    } catch (err) {
      console.error(`  ✗ ${data.subreddit}:`, err.message);
    }
  }

  console.log("Done!");
}

seed();

import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const growthRedditPosts = pgTable("growth_reddit_posts", {
  id: serial("id").primaryKey(),
  redditId: text("reddit_id").unique(),
  title: text("title").notNull(),
  subreddit: text("subreddit").notNull(),
  url: text("url").notNull(),
  author: text("author"),
  commentsCount: integer("comments_count").default(0),
  relevanceScore: integer("relevance_score").default(0),
  status: text("status").default("to_comment"), // 'to_comment', 'commented', 'skipped'
  draftComment: text("draft_comment"),
  actualComment: text("actual_comment"),
  commentUrl: text("comment_url"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
  commentedAt: timestamp("commented_at"),
});

export const growthOutreachTargets = pgTable("growth_outreach_targets", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").notNull(),
  articleTitle: text("article_title"),
  articleUrl: text("article_url"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactLinkedin: text("contact_linkedin"),
  status: text("status").default("to_send"), // 'to_send', 'sent', 'replied', 'linked', 'rejected'
  sentAt: timestamp("sent_at"),
  followUpAt: timestamp("follow_up_at"),
  backlinkVerified: boolean("backlink_verified").default(false),
  notes: text("notes"),
  replyText: text("reply_text"),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const growthYoutubeInsights = pgTable("growth_youtube_insights", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").unique().notNull(),
  videoUrl: text("video_url").notNull(),
  videoTitle: text("video_title").notNull(),
  channelName: text("channel_name").notNull(),
  transcriptSummary: text("transcript_summary"),
  tags: text("tags"), // JSON string array
  insightType: text("insight_type").default("seo_tactic"), // 'seo_tactic', 'tool_idea', 'content_idea', 'trend'
  scrapedAt: timestamp("scraped_at").defaultNow(),
});

export const growthContentCalendar = pgTable("growth_content_calendar", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  targetKeyword: text("target_keyword"),
  status: text("status").default("idea"), // 'idea', 'writing', 'published', 'needs_update'
  publishedUrl: text("published_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const growthDirectorySubmissions = pgTable(
  "growth_directory_submissions",
  {
    id: serial("id").primaryKey(),
    directoryName: text("directory_name").notNull(),
    directoryUrl: text("directory_url").notNull(),
    status: text("status").default("submitted"), // 'submitted', 'listed', 'rejected', 'to_submit'
    submittedAt: timestamp("submitted_at").defaultNow(),
    listedAt: timestamp("listed_at"),
    backlinkUrl: text("backlink_url"),
    notes: text("notes"),
  }
);

export type RedditPost = typeof growthRedditPosts.$inferSelect;
export type NewRedditPost = typeof growthRedditPosts.$inferInsert;
export type OutreachTarget = typeof growthOutreachTargets.$inferSelect;
export type NewOutreachTarget = typeof growthOutreachTargets.$inferInsert;
export type YoutubeInsight = typeof growthYoutubeInsights.$inferSelect;
export type NewYoutubeInsight = typeof growthYoutubeInsights.$inferInsert;
export type ContentItem = typeof growthContentCalendar.$inferSelect;
export type NewContentItem = typeof growthContentCalendar.$inferInsert;
export type DirectorySubmission =
  typeof growthDirectorySubmissions.$inferSelect;
export type NewDirectorySubmission =
  typeof growthDirectorySubmissions.$inferInsert;

export const growthGscDaily = pgTable("growth_gsc_daily", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // "2026-03-21"
  page: text("page").notNull(), // "/tools/compress"
  query: text("query"), // nullable — "image compressor free"
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  ctr: real("ctr").default(0), // 0.05 = 5%
  position: real("position").default(0), // 4.2
  createdAt: timestamp("created_at").defaultNow(),
});

export type GscDaily = typeof growthGscDaily.$inferSelect;
export type NewGscDaily = typeof growthGscDaily.$inferInsert;

export const growthStrategyReviews = pgTable("growth_strategy_reviews", {
  id: serial("id").primaryKey(),
  reviewDate: text("review_date").notNull(), // "2026-03-21"
  periodStart: text("period_start").notNull(),
  periodEnd: text("period_end").notNull(),
  analysisText: text("analysis_text").notNull(),
  suggestions: text("suggestions"), // JSON string
  backlinksGained: integer("backlinks_gained").default(0),
  redditComments: integer("reddit_comments").default(0),
  outreachSent: integer("outreach_sent").default(0),
  outreachLinked: integer("outreach_linked").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export type StrategyReview = typeof growthStrategyReviews.$inferSelect;
export type NewStrategyReview = typeof growthStrategyReviews.$inferInsert;

export const growthCompetitors = pgTable("growth_competitors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  lastScrapedAt: timestamp("last_scraped_at"),
  currentSnapshot: text("current_snapshot"), // JSON string
  changesDetected: text("changes_detected"), // JSON string
  createdAt: timestamp("created_at").defaultNow(),
});

export type Competitor = typeof growthCompetitors.$inferSelect;
export type NewCompetitor = typeof growthCompetitors.$inferInsert;

// Activity log — manual entries for tracking what was done and when
export const growthActivityLog = pgTable("growth_activity_log", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'seo', 'backlink', 'content', 'reddit', 'outreach', 'indexing', 'launch', 'other'
  title: text("title").notNull(),
  description: text("description"),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ActivityLog = typeof growthActivityLog.$inferSelect;
export type NewActivityLog = typeof growthActivityLog.$inferInsert;

export const growthBrandMentions = pgTable("growth_brand_mentions", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // "google", "perplexity", "reddit", "hackernews"
  query: text("query").notNull(), // "best image compressor"
  sammapixFound: boolean("sammapix_found").default(false),
  position: integer("position"), // position in results where found
  snippet: text("snippet"), // what was said about SammaPix
  competitorsFound: text("competitors_found"), // JSON array of competitor names
  checkedAt: timestamp("checked_at").defaultNow(),
});

export type BrandMention = typeof growthBrandMentions.$inferSelect;
export type NewBrandMention = typeof growthBrandMentions.$inferInsert;

export const growthToolRadar = pgTable("growth_tool_radar", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(), // "producthunt", "github", "hackernews", "devto"
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  relevanceScore: integer("relevance_score").default(0),
  aiAnalysis: text("ai_analysis"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
});

export type ToolRadarItem = typeof growthToolRadar.$inferSelect;
export type NewToolRadarItem = typeof growthToolRadar.$inferInsert;

export const growthProblems = pgTable("growth_problems", {
  id: serial("id").primaryKey(),
  problem: text("problem").notNull(),
  userLanguage: text("user_language").notNull(), // exact words users use
  source: text("source").notNull(), // "reddit/r/LifeProTips/1sb7ssk" or "gsc"
  sourceUrl: text("source_url"),
  frequency: integer("frequency").default(1),
  keywordTarget: text("keyword_target"),
  sammaPixTool: text("sammapix_tool"), // which tool solves this
  status: text("status").default("new"), // 'new', 'idea', 'writing', 'published'
  blogPostUrl: text("blog_post_url"),
  outline: text("outline"), // AI-generated blog outline
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Problem = typeof growthProblems.$inferSelect;
export type NewProblem = typeof growthProblems.$inferInsert;

export const growthRedditIntelligence = pgTable("growth_reddit_intelligence", {
  id: serial("id").primaryKey(),
  subreddit: text("subreddit").notNull().unique(),
  tier: text("tier").default("unknown"), // 'proven', 'testing', 'blocked', 'unknown'
  minKarma: integer("min_karma"),
  linksAllowed: boolean("links_allowed"),
  selfPromoAllowed: boolean("self_promo_allowed"),
  automodRules: text("automod_rules"), // JSON string of known rules
  bestPostFormat: text("best_post_format"), // what works
  avgUpvotes: integer("avg_upvotes").default(0),
  totalPosts: integer("total_posts").default(0),
  totalBlocked: integer("total_blocked").default(0),
  bestTimeUtc: text("best_time_utc"), // "06:00-09:00"
  notes: text("notes"),
  lastTestedAt: timestamp("last_tested_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type RedditIntelligence = typeof growthRedditIntelligence.$inferSelect;
export type NewRedditIntelligence = typeof growthRedditIntelligence.$inferInsert;

export const growthDailyTodos = pgTable("growth_daily_todos", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // "2026-04-04"
  type: text("type").notNull(), // 'reddit_post', 'reddit_comment', 'directory', 'backlink', 'blog', 'gsc_alert', 'linkedin'
  title: text("title").notNull(),
  description: text("description").notNull(),
  actionUrl: text("action_url"),
  draftText: text("draft_text"), // pre-written text (Reddit post, comment, etc.)
  status: text("status").default("pending"), // 'pending', 'done', 'skipped'
  priority: integer("priority").default(0), // higher = more important
  createdAt: timestamp("created_at").defaultNow(),
});

export type DailyTodo = typeof growthDailyTodos.$inferSelect;
export type NewDailyTodo = typeof growthDailyTodos.$inferInsert;

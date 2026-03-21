import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
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

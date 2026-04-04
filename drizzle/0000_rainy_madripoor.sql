CREATE TABLE "growth_activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_brand_mentions" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"query" text NOT NULL,
	"sammapix_found" boolean DEFAULT false,
	"position" integer,
	"snippet" text,
	"competitors_found" text,
	"checked_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_competitors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"last_scraped_at" timestamp,
	"current_snapshot" text,
	"changes_detected" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_content_calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"target_keyword" text,
	"status" text DEFAULT 'idea',
	"published_url" text,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_directory_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"directory_name" text NOT NULL,
	"directory_url" text NOT NULL,
	"status" text DEFAULT 'submitted',
	"submitted_at" timestamp DEFAULT now(),
	"listed_at" timestamp,
	"backlink_url" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "growth_gsc_daily" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"page" text NOT NULL,
	"query" text,
	"impressions" integer DEFAULT 0,
	"clicks" integer DEFAULT 0,
	"ctr" real DEFAULT 0,
	"position" real DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_outreach_targets" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_name" text NOT NULL,
	"article_title" text,
	"article_url" text,
	"contact_name" text,
	"contact_email" text,
	"contact_linkedin" text,
	"status" text DEFAULT 'to_send',
	"sent_at" timestamp,
	"follow_up_at" timestamp,
	"backlink_verified" boolean DEFAULT false,
	"notes" text,
	"reply_text" text,
	"replied_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"problem" text NOT NULL,
	"user_language" text NOT NULL,
	"source" text NOT NULL,
	"source_url" text,
	"frequency" integer DEFAULT 1,
	"keyword_target" text,
	"sammapix_tool" text,
	"status" text DEFAULT 'new',
	"blog_post_url" text,
	"outline" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_reddit_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"reddit_id" text,
	"title" text NOT NULL,
	"subreddit" text NOT NULL,
	"url" text NOT NULL,
	"author" text,
	"comments_count" integer DEFAULT 0,
	"relevance_score" integer DEFAULT 0,
	"status" text DEFAULT 'to_comment',
	"draft_comment" text,
	"actual_comment" text,
	"comment_url" text,
	"scraped_at" timestamp DEFAULT now(),
	"commented_at" timestamp,
	CONSTRAINT "growth_reddit_posts_reddit_id_unique" UNIQUE("reddit_id")
);
--> statement-breakpoint
CREATE TABLE "growth_strategy_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_date" text NOT NULL,
	"period_start" text NOT NULL,
	"period_end" text NOT NULL,
	"analysis_text" text NOT NULL,
	"suggestions" text,
	"backlinks_gained" integer DEFAULT 0,
	"reddit_comments" integer DEFAULT 0,
	"outreach_sent" integer DEFAULT 0,
	"outreach_linked" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_tool_radar" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"relevance_score" integer DEFAULT 0,
	"ai_analysis" text,
	"scraped_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_youtube_insights" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_id" text NOT NULL,
	"video_url" text NOT NULL,
	"video_title" text NOT NULL,
	"channel_name" text NOT NULL,
	"transcript_summary" text,
	"tags" text,
	"insight_type" text DEFAULT 'seo_tactic',
	"scraped_at" timestamp DEFAULT now(),
	CONSTRAINT "growth_youtube_insights_video_id_unique" UNIQUE("video_id")
);

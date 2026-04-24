CREATE TABLE IF NOT EXISTS "growth_daily_todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"action_url" text,
	"draft_text" text,
	"status" text DEFAULT 'pending',
	"priority" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "growth_indexing_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"verdict" text,
	"coverage_state" text,
	"robots_txt_state" text,
	"indexing_state" text,
	"page_fetch_state" text,
	"google_canonical" text,
	"user_canonical" text,
	"last_crawl_time" timestamp,
	"referring_urls" text,
	"last_checked_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "growth_indexing_status_page_unique" UNIQUE("page")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "growth_reddit_intelligence" (
	"id" serial PRIMARY KEY NOT NULL,
	"subreddit" text NOT NULL,
	"tier" text DEFAULT 'unknown',
	"min_karma" integer,
	"links_allowed" boolean,
	"self_promo_allowed" boolean,
	"automod_rules" text,
	"best_post_format" text,
	"avg_upvotes" integer DEFAULT 0,
	"total_posts" integer DEFAULT 0,
	"total_blocked" integer DEFAULT 0,
	"best_time_utc" text,
	"notes" text,
	"last_tested_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "growth_reddit_intelligence_subreddit_unique" UNIQUE("subreddit")
);

#!/usr/bin/env python3
"""
SammaPix Reddit Monitor v2.0 — AI-Powered Edition

Monitors Reddit for relevant posts/comments and generates contextual draft
responses using Google Gemini Flash. Sends notifications via macOS desktop
and Discord webhook for mobile approval.

This is NOT a spam bot. It only monitors, generates drafts, and alerts
the user for manual review and posting.
"""

import argparse
import json
import logging
import os
import re
import subprocess
import sys
import time
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Optional

import google.generativeai as genai
import praw
import requests
from prawcore.exceptions import PrawcoreException

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(SCRIPT_DIR / "reddit_monitor.log"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------

@dataclass
class MonitoredPost:
    """Represents a monitored Reddit post/comment."""

    post_id: str
    url: str
    title: str
    body: str
    subreddit: str
    author: str
    keyword_matched: str
    timestamp: str
    post_type: str  # 'submission' or 'comment'
    score: int
    draft_response: Optional[str] = None


# ---------------------------------------------------------------------------
# Gemini response generator
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """\
You are a helpful Reddit user who genuinely participates in communities.
You will receive a Reddit post or comment and must write a useful, natural reply.

RULES:
- Write as a real person, not a brand account. Use casual language appropriate
  to the subreddit tone (casual for r/photography, more technical for r/webdev).
- Your primary goal is to HELP the person with their actual question.
- Provide genuinely useful advice, tips, or solutions first.
- You may mention SammaPix (https://sammapix.com) ONLY if it is directly
  relevant to what the person is asking about. SammaPix is a web-based toolkit
  for photographers and creators that handles: image compression, format
  conversion (HEIC/WebP/AVIF), batch renaming, duplicate detection, EXIF
  management, AI alt-text generation, and image optimization for SEO.
- If you mention SammaPix, always add: "Full disclosure: I built this"
- If SammaPix is NOT relevant to the question, do NOT mention it at all.
  Just give a helpful answer.
- NEVER be promotional, pushy, or spammy. No marketing language.
- Keep responses concise (2-4 short paragraphs max).
- Use Reddit markdown formatting where helpful (bold, bullet points).
- Do NOT start with "Great question!" or similar generic openers.
"""


def build_user_prompt(post: MonitoredPost) -> str:
    """Build the user prompt sent to Gemini with post context."""
    body_preview = post.body[:2000] if post.body else "(no body text)"
    return (
        f"Subreddit: r/{post.subreddit}\n"
        f"Post type: {post.post_type}\n"
        f"Title: {post.title}\n"
        f"Body:\n{body_preview}\n\n"
        f"Keyword that matched: {post.keyword_matched}\n\n"
        f"Write a helpful Reddit reply."
    )


class GeminiResponder:
    """Generates draft responses using Google Gemini Flash."""

    def __init__(self, api_key: str, model_name: str = "gemini-2.0-flash"):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=SYSTEM_PROMPT,
        )
        logger.info(f"Gemini responder initialized with model: {model_name}")

    def generate(self, post: MonitoredPost) -> Optional[str]:
        """Generate a contextual draft response for a Reddit post."""
        try:
            prompt = build_user_prompt(post)
            response = self.model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    temperature=0.8,
                    max_output_tokens=1024,
                ),
            )
            draft = response.text.strip()
            logger.info(
                f"Gemini generated draft ({len(draft)} chars) for post {post.post_id}"
            )
            return draft
        except Exception as e:
            logger.error(f"Gemini API error for post {post.post_id}: {e}")
            return None


# ---------------------------------------------------------------------------
# Discord webhook notifier
# ---------------------------------------------------------------------------

class DiscordNotifier:
    """Sends rich notifications to a Discord channel via webhook."""

    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url
        logger.info("Discord webhook notifier initialized")

    def send(self, post: MonitoredPost) -> bool:
        """Send a Discord embed with post details and draft response."""
        # Color based on post type
        color = 0x5865F2 if post.post_type == "submission" else 0x57F287

        # Truncate draft for Discord embed (max 4096 chars for description)
        draft_text = post.draft_response or "_No draft generated_"
        if len(draft_text) > 1800:
            draft_text = draft_text[:1800] + "\n\n... _(truncated)_"

        embed = {
            "title": f"r/{post.subreddit} — {post.keyword_matched}",
            "url": post.url,
            "color": color,
            "fields": [
                {
                    "name": "Post Title",
                    "value": post.title[:256],
                    "inline": False,
                },
                {
                    "name": "Author",
                    "value": f"u/{post.author}",
                    "inline": True,
                },
                {
                    "name": "Score",
                    "value": str(post.score),
                    "inline": True,
                },
                {
                    "name": "Type",
                    "value": post.post_type,
                    "inline": True,
                },
                {
                    "name": "Draft Response",
                    "value": draft_text,
                    "inline": False,
                },
            ],
            "footer": {
                "text": "SammaPix Reddit Monitor v2.0 | Review before posting"
            },
            "timestamp": post.timestamp,
        }

        payload = {
            "username": "SammaPix Reddit Monitor",
            "embeds": [embed],
        }

        try:
            resp = requests.post(
                self.webhook_url,
                json=payload,
                timeout=10,
            )
            if resp.status_code == 204:
                logger.info(f"Discord notification sent for post {post.post_id}")
                return True
            else:
                logger.warning(
                    f"Discord webhook returned {resp.status_code}: {resp.text}"
                )
                return False
        except requests.RequestException as e:
            logger.error(f"Discord webhook error: {e}")
            return False


# ---------------------------------------------------------------------------
# Main monitor
# ---------------------------------------------------------------------------

class RedditMonitor:
    """Reddit monitoring engine with Gemini AI drafts and Discord alerts."""

    def __init__(
        self,
        config_path: str = "config.json",
        discord_webhook: Optional[str] = None,
    ):
        self.config_path = Path(config_path)
        self.config = self._load_config()

        # Data files live next to the script
        self.seen_posts_file = SCRIPT_DIR / "seen_posts.json"
        self.alerts_file = SCRIPT_DIR / "alerts.json"
        self.seen_posts: set[str] = self._load_seen_posts()

        # Reddit
        self.reddit = self._init_reddit()

        # Gemini
        gemini_key = os.environ.get("GEMINI_API_KEY", "")
        if not gemini_key:
            logger.error(
                "GEMINI_API_KEY not set. Export it or add to your shell profile."
            )
            sys.exit(1)
        model_name = self.config.get("gemini_model", "gemini-2.0-flash")
        self.responder = GeminiResponder(api_key=gemini_key, model_name=model_name)

        # Discord (CLI flag > config > env var)
        webhook_url = (
            discord_webhook
            or self.config.get("discord_webhook_url")
            or os.environ.get("DISCORD_WEBHOOK_URL")
        )
        self.discord: Optional[DiscordNotifier] = None
        if webhook_url:
            self.discord = DiscordNotifier(webhook_url)
        else:
            logger.info(
                "No Discord webhook configured. Using macOS notifications only."
            )

    # -- config / persistence -----------------------------------------------

    def _load_config(self) -> dict:
        try:
            with open(self.config_path, "r", encoding="utf-8") as f:
                config = json.load(f)
            logger.info(f"Config loaded from {self.config_path}")
            return config
        except (FileNotFoundError, json.JSONDecodeError) as e:
            logger.error(f"Config error: {e}")
            raise

    def _load_seen_posts(self) -> set[str]:
        try:
            with open(self.seen_posts_file, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except (FileNotFoundError, json.JSONDecodeError):
            return set()

    def _save_seen_posts(self) -> None:
        with open(self.seen_posts_file, "w", encoding="utf-8") as f:
            json.dump(list(self.seen_posts), f, indent=2)

    def _save_alert(self, post: MonitoredPost) -> None:
        alerts: list[dict] = []
        if self.alerts_file.exists():
            with open(self.alerts_file, "r", encoding="utf-8") as f:
                alerts = json.load(f)
        alerts.append(asdict(post))
        with open(self.alerts_file, "w", encoding="utf-8") as f:
            json.dump(alerts, f, indent=2, ensure_ascii=False)

    # -- Reddit init --------------------------------------------------------

    def _init_reddit(self) -> praw.Reddit:
        creds = self.config["reddit_api"]
        reddit = praw.Reddit(
            client_id=creds["client_id"],
            client_secret=creds["client_secret"],
            user_agent=creds["user_agent"],
            username=creds.get("username"),
            password=creds.get("password"),
        )
        try:
            me = reddit.user.me()
            logger.info(f"Reddit connected as: {me or 'read-only'}")
        except Exception:
            logger.info("Reddit connected in read-only mode")
        return reddit

    # -- keyword matching ---------------------------------------------------

    def _check_keywords(self, text: str) -> Optional[str]:
        text_lower = text.lower()
        for kw in self.config["keywords"]:
            pattern = r"\b" + re.escape(kw.lower()) + r"\b"
            if re.search(pattern, text_lower):
                return kw
        return None

    # -- notifications ------------------------------------------------------

    def _send_macos_notification(self, post: MonitoredPost) -> None:
        if not self.config.get("notifications", {}).get("enabled", True):
            return
        try:
            title = f"Reddit Alert — r/{post.subreddit}"
            subtitle = f"Keyword: {post.keyword_matched}"
            message = post.title[:100]
            script = (
                f'display notification "{message}" '
                f'with title "{title}" subtitle "{subtitle}"'
            )
            subprocess.run(["osascript", "-e", script], check=True)
        except Exception as e:
            logger.error(f"macOS notification error: {e}")

    def _notify(self, post: MonitoredPost) -> None:
        """Send all configured notifications."""
        self._send_macos_notification(post)
        if self.discord:
            self.discord.send(post)

    # -- processing ---------------------------------------------------------

    def _process_submission(self, submission) -> Optional[MonitoredPost]:
        if submission.id in self.seen_posts:
            return None
        full_text = f"{submission.title} {submission.selftext}"
        kw = self._check_keywords(full_text)
        if not kw:
            return None

        post = MonitoredPost(
            post_id=submission.id,
            url=f"https://reddit.com{submission.permalink}",
            title=submission.title,
            body=submission.selftext,
            subreddit=submission.subreddit.display_name,
            author=str(submission.author) if submission.author else "[deleted]",
            keyword_matched=kw,
            timestamp=datetime.now().isoformat(),
            post_type="submission",
            score=submission.score,
        )
        post.draft_response = self.responder.generate(post)
        return post

    def _process_comment(self, comment) -> Optional[MonitoredPost]:
        if comment.id in self.seen_posts:
            return None
        kw = self._check_keywords(comment.body)
        if not kw:
            return None

        post = MonitoredPost(
            post_id=comment.id,
            url=f"https://reddit.com{comment.permalink}",
            title=f"Comment on: {comment.submission.title}",
            body=comment.body,
            subreddit=comment.subreddit.display_name,
            author=str(comment.author) if comment.author else "[deleted]",
            keyword_matched=kw,
            timestamp=datetime.now().isoformat(),
            post_type="comment",
            score=comment.score,
        )
        post.draft_response = self.responder.generate(post)
        return post

    # -- monitoring loop ----------------------------------------------------

    def monitor_subreddit(self, subreddit_name: str) -> list[MonitoredPost]:
        found: list[MonitoredPost] = []
        try:
            sub = self.reddit.subreddit(subreddit_name)
            for submission in sub.new(limit=self.config.get("posts_per_check", 25)):
                post = self._process_submission(submission)
                if post:
                    found.append(post)
                    self.seen_posts.add(submission.id)

            if self.config.get("monitor_comments", False):
                for comment in sub.comments(
                    limit=self.config.get("comments_per_check", 50)
                ):
                    post = self._process_comment(comment)
                    if post:
                        found.append(post)
                        self.seen_posts.add(comment.id)

        except PrawcoreException as e:
            logger.error(f"Reddit API error for r/{subreddit_name}: {e}")
        except Exception as e:
            logger.error(f"Error monitoring r/{subreddit_name}: {e}")
        return found

    def run_cycle(self) -> int:
        logger.info("--- Monitoring cycle start ---")
        total = 0
        for sub_name in self.config["subreddits"]:
            for post in self.monitor_subreddit(sub_name):
                logger.info(
                    f"MATCH r/{post.subreddit} [{post.keyword_matched}]: {post.title}"
                )
                self._notify(post)
                self._save_alert(post)
                total += 1
        self._save_seen_posts()
        logger.info(f"--- Cycle complete: {total} new matches ---")
        return total

    def run_continuous(self) -> None:
        interval = self.config.get("check_interval_minutes", 5)
        logger.info("Starting continuous monitoring")
        logger.info(f"  Subreddits: {', '.join(self.config['subreddits'])}")
        logger.info(f"  Keywords:   {len(self.config['keywords'])}")
        logger.info(f"  Interval:   {interval} min")
        logger.info(f"  Discord:    {'enabled' if self.discord else 'disabled'}")

        while True:
            try:
                self.run_cycle()
                logger.info(f"Sleeping {interval} minutes...")
                time.sleep(interval * 60)
            except KeyboardInterrupt:
                logger.info("Stopped by user (Ctrl+C)")
                break
            except Exception as e:
                logger.error(f"Cycle error: {e} — retrying in 5 min")
                time.sleep(300)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="SammaPix Reddit Monitor v2.0 — AI-powered edition"
    )
    parser.add_argument(
        "--config",
        default=str(SCRIPT_DIR / "config.json"),
        help="Path to config.json",
    )
    parser.add_argument(
        "--once", action="store_true", help="Run one cycle and exit"
    )
    parser.add_argument(
        "--test", action="store_true", help="Validate config and exit"
    )
    parser.add_argument(
        "--discord-webhook",
        default=None,
        help="Discord webhook URL (overrides config and env var)",
    )
    args = parser.parse_args()

    try:
        monitor = RedditMonitor(
            config_path=args.config,
            discord_webhook=args.discord_webhook,
        )

        if args.test:
            logger.info("Config OK")
            logger.info(f"  Subreddits: {len(monitor.config['subreddits'])}")
            logger.info(f"  Keywords:   {len(monitor.config['keywords'])}")
            logger.info(f"  Gemini:     {monitor.config.get('gemini_model', 'gemini-2.0-flash')}")
            logger.info(f"  Discord:    {'configured' if monitor.discord else 'not configured'}")
            return

        if args.once:
            monitor.run_cycle()
        else:
            monitor.run_continuous()

    except KeyboardInterrupt:
        logger.info("Stopped by user")
    except Exception as e:
        logger.error(f"Fatal: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

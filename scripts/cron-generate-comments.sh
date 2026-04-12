#!/bin/bash
cd /Users/mac/sammapix
export DATABASE_URL="$(grep ^DATABASE_URL .env.local | cut -d= -f2-)"
export GEMINI_API_KEY="$(grep ^GEMINI_API_KEY .env.local | cut -d= -f2-)"
/opt/homebrew/bin/node scripts/generate-comments-now.mjs >> /tmp/sammapix-comments-cron.log 2>&1

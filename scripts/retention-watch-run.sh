#!/bin/bash
cd /Users/mac/sammapix || exit 0
OUT="/Users/mac/sammapix/.retention-reports"
mkdir -p "$OUT"
TS=$(date '+%Y-%m-%d')
node --env-file=.env.local scripts/retention-watch.mjs > "$OUT/retention-$TS.txt" 2>&1
# Notifica macOS con la riga-verdetto
VERDETTO=$(grep -A1 "VERDETTO" "$OUT/retention-$TS.txt" | tail -1 | sed 's/^ *//')
command -v terminal-notifier >/dev/null 2>&1 && terminal-notifier -title "SammaPix Retention" -message "$VERDETTO" 2>/dev/null
cp -f "$OUT/retention-$TS.txt" "$OUT/latest.txt"
exit 0

#!/bin/bash
# ------------------------------------------------------------------
# SammaPix Reddit Monitor v2.0 — Runner
# ------------------------------------------------------------------
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ---- Virtual environment check -----------------------------------
if [ ! -d "$SCRIPT_DIR/venv" ]; then
    echo "ERROR: Virtual environment not found. Run ./setup.sh first."
    exit 1
fi

source "$SCRIPT_DIR/venv/bin/activate"

# ---- Config check ------------------------------------------------
if [ -f "$SCRIPT_DIR/config.json" ] && grep -q "YOUR_CLIENT_ID" "$SCRIPT_DIR/config.json"; then
    echo "ERROR: Reddit API credentials not configured."
    echo "Edit config.json and replace the YOUR_* placeholders."
    echo "See: https://www.reddit.com/prefs/apps"
    exit 1
fi

# ---- Run ---------------------------------------------------------
echo ""
echo "=== SammaPix Reddit Monitor v2.0 ==="
echo ""

python3 "$SCRIPT_DIR/reddit_monitor.py" --config "$SCRIPT_DIR/config.json" "$@"

#!/bin/bash
# ------------------------------------------------------------------
# SammaPix Reddit Monitor v2.0 — Setup
# ------------------------------------------------------------------
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "=== SammaPix Reddit Monitor v2.0 — Setup ==="
echo ""

# ---- Python check ------------------------------------------------
if ! command -v python3 &>/dev/null; then
    echo "ERROR: python3 not found. Install Python 3.10+."
    exit 1
fi

py_ver=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo "[ok] Python $py_ver detected"

# ---- Virtual environment -----------------------------------------
if [ ! -d "$SCRIPT_DIR/venv" ]; then
    echo "[..] Creating virtual environment..."
    python3 -m venv "$SCRIPT_DIR/venv"
fi
echo "[ok] Virtual environment ready"

source "$SCRIPT_DIR/venv/bin/activate"

# ---- Dependencies ------------------------------------------------
echo "[..] Installing dependencies..."
pip install --upgrade pip -q
pip install -r "$SCRIPT_DIR/requirements.txt" -q
echo "[ok] Dependencies installed"

# ---- Gemini API key check ----------------------------------------
if [ -z "$GEMINI_API_KEY" ]; then
    echo ""
    echo "WARNING: GEMINI_API_KEY is not set in your environment."
    echo "Add this to your ~/.zshrc or ~/.bash_profile:"
    echo ""
    echo "  export GEMINI_API_KEY=\"your-api-key-here\""
    echo ""
fi

# ---- Discord webhook (optional) ----------------------------------
echo ""
echo "DISCORD WEBHOOK (optional — for mobile notifications):"
echo "  1. Open Discord > Server Settings > Integrations > Webhooks"
echo "  2. Create a webhook, copy the URL"
echo "  3. Add it to config.json as \"discord_webhook_url\""
echo "     OR export DISCORD_WEBHOOK_URL=\"https://discord.com/api/webhooks/...\""
echo ""

# ---- Reddit API credentials --------------------------------------
if [ -f "$SCRIPT_DIR/config.json" ] && grep -q "YOUR_CLIENT_ID" "$SCRIPT_DIR/config.json"; then
    echo "REDDIT API SETUP:"
    echo "  1. Go to https://www.reddit.com/prefs/apps"
    echo "  2. Scroll down, click 'create another app...'"
    echo "  3. Fill in:"
    echo "       name:         SammaPix Monitor"
    echo "       type:         script"
    echo "       description:  Personal monitoring tool"
    echo "       redirect uri: http://localhost:8080"
    echo "  4. After creation, note:"
    echo "       client_id     = the string under the app name"
    echo "       client_secret = the 'secret' field"
    echo "  5. Edit config.json and replace the YOUR_* placeholders"
    echo ""
fi

# ---- Init data files ---------------------------------------------
[ -f "$SCRIPT_DIR/seen_posts.json" ] || echo "[]" > "$SCRIPT_DIR/seen_posts.json"
[ -f "$SCRIPT_DIR/alerts.json" ]     || echo "[]" > "$SCRIPT_DIR/alerts.json"

chmod +x "$SCRIPT_DIR/reddit_monitor.py"
chmod +x "$SCRIPT_DIR/setup.sh"
chmod +x "$SCRIPT_DIR/run.sh"

echo ""
echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "  1. Configure Reddit credentials in config.json"
echo "  2. Export GEMINI_API_KEY in your shell profile"
echo "  3. (Optional) Set discord_webhook_url in config.json"
echo "  4. Test:  ./run.sh --test"
echo "  5. Run:   ./run.sh"
echo ""

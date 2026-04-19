#!/bin/bash
# send-mail.sh — invia email da hello@sammapix.com via Resend API
#
# Uso:
#   bash scripts/send-mail.sh --to "someone@example.com" --subject "Subject" --body-file path/to/body.txt
#   bash scripts/send-mail.sh --to "..." --subject "..." --body "testo inline"
#   bash scripts/send-mail.sh --template topai --to "contact@topai.tools"
#
# Le risposte arrivano su lucasamm97@gmail.com via forwarding ImprovMX + Reply-To.

set -u
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env.local non trovato in $ENV_FILE"
  exit 1
fi

RESEND_API_KEY=$(grep "^RESEND_API_KEY=" "$ENV_FILE" | cut -d= -f2- | tr -d '"' | tr -d '\n' | tr -d '\r')
if [ -z "$RESEND_API_KEY" ]; then
  echo "❌ RESEND_API_KEY vuoto"
  exit 1
fi

FROM="SammaPix <hello@sammapix.com>"
REPLY_TO="lucasamm97@gmail.com"

TO=""
SUBJECT=""
BODY=""
BODY_FILE=""
TEMPLATE=""

while [ $# -gt 0 ]; do
  case "$1" in
    --to) TO="$2"; shift 2 ;;
    --subject) SUBJECT="$2"; shift 2 ;;
    --body) BODY="$2"; shift 2 ;;
    --body-file) BODY_FILE="$2"; shift 2 ;;
    --template) TEMPLATE="$2"; shift 2 ;;
    --from) FROM="$2"; shift 2 ;;
    --reply-to) REPLY_TO="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,10p' "$0" | sed 's/^# *//'
      exit 0
      ;;
    *) echo "Opzione sconosciuta: $1"; exit 1 ;;
  esac
done

# Template pre-fatti
case "$TEMPLATE" in
  topai)
    SUBJECT="${SUBJECT:-Tool listing request — SammaPix (sammapix.com) — domain-verified email}"
    BODY=$(cat <<'EOF'
Hi TopAI.tools team,

I'm Luca Sammarco, founder of SammaPix (https://www.sammapix.com) — a
free, browser-based image tools suite (compress, WebP/HEIC convert,
AI rename, EXIF remover, background removal and 20+ tools total,
100% client-side, open source MIT).

I'd like to request a free listing on TopAI.tools. As indicated in
your claim flow, I'm writing you from an email associated with the
tool's domain (hello@sammapix.com) to verify ownership.

A few quick facts that may help you evaluate:
- 20 tools live, all AI-enhanced where relevant
- Privacy-first positioning: images never leave the user's device
- Open source (GitHub: samma1997/sammapix)
- Already listed on AlternativeTo, SaaSHub, and Dev.to / Hashnode
- Target categories: AI Image Editing, AI Developer Tools, AI Automation

I'd prefer to skip the "Featured on Top AI Tools" badge requirement on
my site — as a design/UX decision we keep the landing page minimal
and badge-free. Domain-verified email should cover the ownership proof
on your side.

Happy to provide additional info, high-resolution logo, demo videos or
anything else you need to expedite the listing.

Thanks for the work you do building the AI tool directory — looking
forward to hearing from you.

Best,
Luca Sammarco
Founder, SammaPix
https://www.sammapix.com
hello@sammapix.com
EOF
    )
    ;;
esac

# Validazione
if [ -z "$TO" ]; then echo "❌ --to mancante"; exit 1; fi
if [ -z "$SUBJECT" ]; then echo "❌ --subject mancante"; exit 1; fi
if [ -z "$BODY" ] && [ -z "$BODY_FILE" ]; then echo "❌ --body o --body-file o --template mancante"; exit 1; fi

if [ -n "$BODY_FILE" ]; then
  if [ ! -f "$BODY_FILE" ]; then echo "❌ $BODY_FILE non esiste"; exit 1; fi
  BODY=$(cat "$BODY_FILE")
fi

# Converti in HTML semplice (testo + line break)
HTML_BODY=$(echo "$BODY" | python3 -c '
import sys, html
t = sys.stdin.read()
t = html.escape(t)
t = t.replace("\n", "<br>\n")
print(f"<div style=\"font-family:-apple-system,Helvetica,sans-serif;max-width:640px;line-height:1.6\">{t}</div>")
')

# Build JSON payload
JSON=$(FROM_ADDR="$FROM" TO_ADDR="$TO" REPLY_TO_ADDR="$REPLY_TO" SUBJECT_ENV="$SUBJECT" TEXT_BODY="$BODY" HTML_BODY="$HTML_BODY" python3 -c '
import json, os
print(json.dumps({
    "from": os.environ["FROM_ADDR"],
    "to": os.environ["TO_ADDR"],
    "reply_to": os.environ["REPLY_TO_ADDR"],
    "subject": os.environ["SUBJECT_ENV"],
    "text": os.environ["TEXT_BODY"],
    "html": os.environ["HTML_BODY"],
}))')

echo "📤 Invio email..."
echo "   FROM: $FROM"
echo "   TO:   $TO"
echo "   REPLY-TO: $REPLY_TO"
echo "   SUBJECT: $SUBJECT"
echo ""

RESPONSE=$(curl -sS -w "\nHTTP_CODE:%{http_code}" -X POST \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  --max-time 30 \
  -d "$JSON" \
  "https://api.resend.com/emails")

HTTP_CODE=$(echo "$RESPONSE" | grep "^HTTP_CODE:" | cut -d: -f2)
BODY_RES=$(echo "$RESPONSE" | grep -v "^HTTP_CODE:")

if [ "$HTTP_CODE" = "200" ]; then
  ID=$(echo "$BODY_RES" | python3 -c "import json,sys;print(json.load(sys.stdin).get('id','?'))")
  echo "✅ Email inviata — id: $ID"
else
  echo "❌ HTTP $HTTP_CODE — $BODY_RES"
  exit 1
fi

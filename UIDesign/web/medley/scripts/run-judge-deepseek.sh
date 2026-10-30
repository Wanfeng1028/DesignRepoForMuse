#!/bin/bash
# Run one vision-judge call for UIDesign/web/medley round 3.
# Judge key only: fetched live via Japan-server SSH proxy + sudo cat
# /etc/botsrouter/muse_judge_token.txt, kept in memory only (never echoed,
# logged, or written to any file). NO sk- prefix is added (48-char bare key).
# Model: deepseek-v4-flash-vision. Usage: run-judge-deepseek.sh <JID> <render.png> <orig1[,orig2...]> <scope.txt>
# Output: docs/verification/rounds/v1.1/judge/verdicts/<JID>.txt (+ .err)
set -u
JID="$1"; RENDER="$2"; ORIGS="$3"; SCOPE="$4"
HERE="$(cd "$(dirname "$0")" && pwd)"
JDIR="$HERE/../docs/verification/rounds/v1.1/judge"
mkdir -p "$JDIR/verdicts"
TOK="$(ssh -i /home/hatch/.ssh/id_ed25519 -o ProxyCommand="python3 ~/workspace/relay-station/ssh_via_proxy.py %h %p" -o UserKnownHostsFile=/home/hatch/.ssh/known_hosts -o BatchMode=yes azureuser@20.222.15.177 "sudo cat /etc/botsrouter/muse_judge_token.txt" 2>/dev/null)"
TOK="$(printf '%s' "$TOK" | tr -d '[:space:]')"
if [ -z "$TOK" ]; then echo "token fetch failed" >&2; exit 2; fi
BR_TOKEN="$TOK" python3 "$HERE/judge-deepseek.py" --render "$RENDER" --original "$ORIGS" --prompt "$JDIR/prompt-common-v2.txt" --prompt-scope "$SCOPE" --max-tokens 6000 > "$JDIR/verdicts/$JID.txt" 2> "$JDIR/verdicts/$JID.err"
CODE=$?
echo "judge $JID exit=$CODE (verdict in $JDIR/verdicts/$JID.txt)"
exit $CODE

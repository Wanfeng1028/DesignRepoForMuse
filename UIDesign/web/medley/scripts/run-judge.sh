#!/bin/bash
# Run one vision-judge call for UIDesign/web/medley v1.1.
# Token is fetched live from the pipeline server and kept only in memory:
# it is never echoed, logged, or written to any file.
# Usage: run-judge.sh <JID> <render.png> <orig1.jpg[,orig2...]> <scope.txt>
# Output: docs/verification/rounds/v1.1/judge/verdicts/<JID>.txt (+ .err)
set -u
JID="$1"; RENDER="$2"; ORIGS="$3"; SCOPE="$4"
HERE="$(cd "$(dirname "$0")" && pwd)"
JDIR="$HERE/../docs/verification/rounds/v1.1/judge"
mkdir -p "$JDIR/verdicts"
TOK="$(ssh -i /home/hatch/.ssh/id_ed25519 -o ProxyCommand="python3 ~/workspace/relay-station/ssh_via_proxy.py %h %p" -o UserKnownHostsFile=/home/hatch/.ssh/known_hosts -o BatchMode=yes azureuser@20.222.15.177 "sudo cat /etc/botsrouter/muse_pipeline_token.txt" 2>/dev/null)"
TOK="$(printf '%s' "$TOK" | tr -d '[:space:]')"
if [ -z "$TOK" ]; then echo "token fetch failed" >&2; exit 2; fi
case "$TOK" in sk-*) ;; *) TOK="sk-$TOK" ;; esac
BR_TOKEN="$TOK" python3 "$HERE/judge.py" --render "$JDIR/render/$RENDER" --original "$(echo "$ORIGS" | sed "s|,|,$JDIR/orig/|g; s|^|$JDIR/orig/|")" --prompt "$JDIR/prompt-common-v2.txt" --prompt-scope "$JDIR/$SCOPE" --max-tokens 6000 > "$JDIR/verdicts/$JID.txt" 2> "$JDIR/verdicts/$JID.err"
CODE=$?
echo "judge $JID exit=$CODE (verdict in $JDIR/verdicts/$JID.txt)"
exit $CODE

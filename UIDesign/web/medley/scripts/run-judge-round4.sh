#!/bin/bash
# Round-4 single judge call. Judge key only: fetched live via Japan-server
# SSH proxy + sudo cat, kept in memory only (never echoed, logged, or
# written to disk). Key is 48-char bare, NO sk- prefix is added.
# Usage: run-judge-round4.sh <JID> <render.png> <orig1[,orig2...]> <scope.txt> <model>
# Success: verdict line in docs/verification/rounds/round4/judge/verdicts/<JID>.txt
# Every attempt appended to verdicts/<JID>.attempts.log (no tokens).
# Exit: 0 verdict; 2 token fetch failed; 3 HTTP 429/401/403; 4 other failure.
set -u
JID="$1"; RENDER="$2"; ORIGS="$3"; SCOPE="$4"; MODEL="$5"
HERE="$(cd "$(dirname "$0")" && pwd)"
BASE="$HERE/../docs/verification/rounds/round4"
JDIR="$BASE/judge"
mkdir -p "$JDIR/verdicts"
fetch_tok() {
  ssh -i /home/hatch/.ssh/id_ed25519 -o ProxyCommand="python3 ~/workspace/relay-station/ssh_via_proxy.py %h %p" -o UserKnownHostsFile=/home/hatch/.ssh/known_hosts -o BatchMode=yes azureuser@20.222.15.177 "sudo cat /etc/botsrouter/muse_judge_token.txt" 2>/dev/null | tr -d '[:space:]'
}
TOK="$(fetch_tok)"
if [ -z "$TOK" ]; then TOK="$(fetch_tok)"; fi
if [ -z "$TOK" ]; then
  echo "$(date '+%F %T') $JID model=$MODEL exit=2 token fetch failed" >> "$JDIR/verdicts/$JID.attempts.log"
  echo "token fetch failed" >&2
  exit 2
fi
case "$MODEL" in
  nvidia/nemotron-3.5-super-vl:free) MAXTOK=8000 ;;
  claude-sonnet-4-6) MAXTOK=400 ;;
  *) MAXTOK=2000 ;;
esac
BR_TOKEN="$TOK" python3 "$HERE/judge-round4.py" --render "$JDIR/render/$RENDER" --original "$(echo "$ORIGS" | sed "s|,|,$JDIR/orig/|g; s|^|$JDIR/orig/|")" --prompt "$JDIR/prompt-common-round4.txt" --prompt-scope "$JDIR/$SCOPE" --model "$MODEL" --scratch "$JDIR/.body-$JID.json" --max-tokens "$MAXTOK" > "$JDIR/verdicts/$JID.tmp" 2> "$JDIR/verdicts/$JID.tmp.err"
CODE=$?
if [ "$CODE" -eq 0 ]; then
  mv "$JDIR/verdicts/$JID.tmp" "$JDIR/verdicts/$JID.txt"
  echo "$(date '+%F %T') $JID model=$MODEL exit=0 verdict recorded; $(cat "$JDIR/verdicts/$JID.tmp.err")" >> "$JDIR/verdicts/$JID.attempts.log"
  rm -f "$JDIR/verdicts/$JID.tmp.err"
  echo "judge $JID model=$MODEL exit=0"
else
  rm -f "$JDIR/verdicts/$JID.tmp"
  echo "$(date '+%F %T') $JID model=$MODEL exit=$CODE; $(head -c 300 "$JDIR/verdicts/$JID.tmp.err" | tr '\n' ' ')" >> "$JDIR/verdicts/$JID.attempts.log"
  echo "judge $JID model=$MODEL exit=$CODE (see $JID.attempts.log)" >&2
  rm -f "$JDIR/verdicts/$JID.tmp.err"
fi
exit $CODE

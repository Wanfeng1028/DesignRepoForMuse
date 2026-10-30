#!/bin/bash
# Round 4 runner. Expects BR_TOKEN in env. Never prints the token.
set -u
BASE="$HOME/workspace/DesignRepoForMuse/UIDesign/app/airbuild"
WORK="$BASE/docs/verification/judge/round4-work"
STOP=0
for SCREEN in home detail draft briefing; do
  IMG="$BASE/docs/verification/judge/composites/$SCREEN-v1.5.jpg"
  PRM="$WORK/prompts/$SCREEN-verdict.txt"
  OUT="$WORK/$SCREEN-verdict-nemotron.txt"
  ERR="$WORK/$SCREEN-verdict-nemotron.err"
  BR_TOKEN="$BR_TOKEN" python3 "$BASE/docs/verification/judge/judge-vision-round4.py" --image "$IMG" --prompt "$PRM" --model "nvidia/nemotron-3.5-super-vl:free" --workdir "$WORK" > "$OUT" 2> "$ERR"
  RC=$?
  echo "$SCREEN nemotron_rc=$RC"
  cat "$ERR"
  if [ $RC -eq 0 ]; then
    STOP=0
    head -n 2 "$OUT"
    continue
  fi
  if [ $RC -eq 3 ]; then
    STOP=$((STOP+1))
    echo "$SCREEN stop_count=$STOP"
    if [ $STOP -ge 3 ]; then echo "STOP_RULE_HIT"; break; fi
    continue
  fi
  echo "$SCREEN nemotron failed rc=$RC, trying backup claude once"
  BOUT="$WORK/$SCREEN-verdict-claude.txt"
  BERR="$WORK/$SCREEN-verdict-claude.err"
  BR_TOKEN="$BR_TOKEN" python3 "$BASE/docs/verification/judge/judge-vision-round4.py" --image "$IMG" --prompt "$PRM" --model "claude-sonnet-4-6" --workdir "$WORK" > "$BOUT" 2> "$BERR"
  BRC=$?
  echo "$SCREEN claude_rc=$BRC"
  cat "$BERR"
  if [ $BRC -eq 0 ]; then STOP=0; head -n 2 "$BOUT"; else
    if [ $BRC -eq 3 ]; then STOP=$((STOP+1)); if [ $STOP -ge 3 ]; then echo "STOP_RULE_HIT"; break; fi; fi
  fi
done
echo "done stop_count=$STOP"
for f in "$WORK"/*-verdict-*.txt; do echo "== $f"; head -n 2 "$f" 2>/dev/null; done

#!/bin/bash
# Round-4 judge queue driver: J1-J12 (J10/J11 split a/b = 14 calls).
# Per J: nemotron primary -> claude-sonnet-4-6 backup -> mimo-v2.6-flash
# third backup. Stop rule: 3 consecutive failed calls (any model, across
# Js; a success resets) halts the whole queue. Token fetch failure halts
# immediately. No sleep-retry on 429/401/403: a stop-code failure moves to
# the next model once, never a same-model retry.
# Log: docs/verification/rounds/round4/judge/queue-round4.log (no tokens).
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
JDIR="$HERE/../docs/verification/rounds/round4/judge"
LOG="$JDIR/queue-round4.log"
MODELS="nvidia/nemotron-3.5-super-vl:free claude-sonnet-4-6 mimo-v2.6-flash"
STOPCOUNT=0
run_one() {
  local jid="$1" render="$2" origs="$3" scope="$4"
  for model in $MODELS; do
    bash "$HERE/run-judge-round4.sh" "$jid" "$render" "$origs" "$scope" "$model" < /dev/null
    local code=$?
    if [ "$code" -eq 0 ]; then
      echo "$(date '+%F %T') $jid VERDICT via $model" >> "$LOG"
      STOPCOUNT=0
      return 0
    fi
    if [ "$code" -eq 2 ]; then
      echo "$(date '+%F %T') HALT token fetch failed at $jid" >> "$LOG"
      return 2
    fi
    STOPCOUNT=$((STOPCOUNT + 1))
    echo "$(date '+%F %T') $jid model=$model failed exit=$code stopcount=$STOPCOUNT" >> "$LOG"
    if [ "$STOPCOUNT" -ge 3 ]; then
      echo "$(date '+%F %T') HALT stop rule: 3 consecutive judge failures" >> "$LOG"
      return 3
    fi
  done
  echo "$(date '+%F %T') $jid PENDING all models failed" >> "$LOG"
  return 1
}
echo "$(date '+%F %T') ROUND4 QUEUE START (rerun, stdin-steal fix)" >> "$LOG"
QUEUE="J1|welcome.png|cn4-welcome-cn.jpg|scope-j1.txt
J2|home.png|hd5-home-en.jpg,cn4-home-cn.jpg|scope-j2.txt
J3|lisbon-train.png|hd5-lisbon.jpg,ov-train.jpg|scope-j3.txt
J4|savings-kyoto.png|ov-savings.jpg,ov-kyoto.jpg|scope-j4.txt
J5|router.png|ov-router.jpg|scope-j5.txt
J6|picker.png|hd5-pickerA.jpg,ov-pickerB.jpg,zoom-pickerB-thinking.jpg|scope-j6.txt
J7|pricing.png|hd5-pricing.jpg|scope-j7.txt
J8|credits.png|hd5-credits.jpg|scope-j8.txt
J9|agent.png|ov-agent.jpg|scope-j9.txt
J10a|drawer.png|ov-drawer.jpg|scope-j10a.txt
J10b|chatinfo.png|ov-chatinfo.jpg|scope-j10b.txt
J11a|suspended.png|ov-suspended.jpg|scope-j11a.txt
J11b|language.png|cn4-language.jpg|scope-j11b.txt
J12|composer.png|hd5-lisbon.jpg,hd5-home-en.jpg,cn4-home-cn.jpg,cn4-lisbon-cn.jpg|scope-j12.txt"
while IFS='|' read -r jid render origs scope; do
  run_one "$jid" "$render" "$origs" "$scope"
  code=$?
  if [ "$code" -eq 2 ] || [ "$code" -eq 3 ]; then
    echo "QUEUE HALTED at $jid (code $code)"
    exit 5
  fi
done <<< "$QUEUE"
DRIVER_CODE=$?
if [ "$DRIVER_CODE" -eq 5 ]; then
  echo "$(date '+%F %T') ROUND4 QUEUE HALTED" >> "$LOG"
  exit 5
fi
echo "$(date '+%F %T') ROUND4 QUEUE DONE" >> "$LOG"
echo "QUEUE DONE"

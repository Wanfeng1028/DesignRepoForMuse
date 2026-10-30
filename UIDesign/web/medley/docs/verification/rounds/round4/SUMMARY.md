# Round4 summary — UIDesign/web/medley (2026-10-30)

Version status: **v1.2** (D-01 fix only). v1.2 is NOT "verified clean":
the round4 queue returned 14/14 FAIL; only J11a's button-label item was
fixed and re-verified. Everything else below is open residual.

## Queue verdicts (primary judge: nvidia/nemotron-3.5-super-vl:free)

All 14 calls succeeded via the primary judge; no 429/401/403, no fallback
needed for the queue. Verdict files: `judge/verdicts/J*.txt`; queue log:
`judge/queue-round4.log`. Render crops: `judge/render/` (v1.1 crops,
reused — fresh round4 fullpage is pixel-identical, max diff 0, to the
v1.1 fullpage). Originals: `judge/orig/` (HD crops from
`UIDesign/docs/references/medley/`).

| ID | Panel | Verdict | Judge reason (one line) |
|----|-------|---------|-------------------------|
| J1 | Welcome (dark) | FAIL (CONFLICT, see below) | Button vertical placement; Google button fill light gray vs white |
| J2 | Home EN/CN | FAIL | Top bar omitted; greeting at top edge |
| J3 | Lisbon/Train | FAIL | Train "read 4 pages" vs "read 6 pages"; train badges S/R/K vs blank |
| J4 | Savings/Kyoto | FAIL | Six items "vs render missing" (see triage: refuted) |
| J5 | Router | FAIL | "44 credits" vs "64 credits"; comment icon vs thumbs-down; composer omitted |
| J6 | Picker A/B | FAIL | Header missing; minus vs tilde credits; Fable "Pro" vs "Pro+"; Thinking subtexts; note "ideal" vs "level" |
| J7 | Pricing | FAIL | Pro feature line GPT-5.1/GLM-5 vs GPT-6.1 Sol; footnote comma vs period |
| J8 | Credits | FAIL | Header missing; "Sep 28" vs "Sep 26"; legend colors; By-model/Activity dots absent |
| J9 | Agent team | FAIL | "Auto review" vs "Auto-review"; "Step 3 of 8" vs "Step 3 of 6"; third card text; composer absent |
| J10a | Search drawer | FAIL | 1-running dot color; Pinned side dots; Recent dot colors (5 rows); messages-left chevron; Pro pill vs subtext |
| J10b | Chat info | FAIL | Model chip dot colors; Sonnet reply 10:31 vs 10:21; DeepSeek row 10:19/0.9s vs 10:17/3.5s |
| J11a | Suspended | FAIL -> FIXED -> re-judge PASS | Buttons: original "Appeal"/"Contact support" vs render "Contact support"/"Sign out" |
| J11b | Language | FAIL | Header, first row "System default", and check mark "not shown" |
| J12 | Composer states | FAIL | State 1: mic in render vs stop in original |

J1 extra readings (same inputs, different runs): nemotron calibration
PASS; claude-sonnet-4-6 FAIL (corners/dot/footnote); nemotron queue-run
FAIL (placement/Google fill). Detail + pixel measurement in
`judge/verdicts/J1.conflict-note.txt`.

## Pipeline notes

- Nemotron needs max-tokens 8000: at 400 and 2000 caps it burns the
  whole budget on reasoning and returns empty content (completion
  exactly == cap). At 8000 it returns a verdict (completions ~1400-6000
  tokens). Cost 0 (free upstream). Verdict-only prompt:
  `judge/prompt-common-round4.txt` + v1.1 `scope-j*.txt` checklists.
- Transport: new `scripts/judge-round4.py` (curl; Authorization header
  only via pipe-fed `curl -K /dev/fd/N`; token never in argv or on
  disk; body JSON scratch deleted after each call). Old
  `run-judge.sh`/`judge.py` (conatus + pipeline key + sk- prefix) and
  `judge-deepseek.py`/`run-judge-deepseek.sh` (deepseek-vision, 402/empty
  failures) were NOT used.
- Claude backup was used once (J1 calibration): 39,302 prompt tokens
  for 2 images — expensive; kept as fallback only.
- Judge token: live SSH fetch per call, memory only, never recorded.
  No token, key, or secret appears in any evidence file.
- Queue driver bug found and fixed mid-round: the first driver run
  stopped after J1 because ssh consumed the loop's here-string stdin;
  fixed with `< /dev/null` on judge calls; rerun completed all 14.

## Triage (agent code/pixel checks — not judge verdicts)

### A. Verified fixed -> v1.2

- D-01 (J11a buttons): agent verified by eye on `orig/ov-suspended.jpg`
  (original: "Appeal" black filled / "Contact support" outlined) and
  by code (render was "Contact support"/"Sign out"). Fix: demo props
  only in `src/App.tsx` (component is props-driven). "Sign out" stays
  as a "You can still:" row, as in the original. Build passes; fresh
  fullpage differs only in button-label pixels (2310 px, rows
  11258-11272). Re-judge J11a on the fresh crop: PASS with both labels
  explicitly confirmed. Evidence: `../v1.2/`.

### B. Refuted — judge wrong, do NOT "fix" these

- J2 top bar + greeting placement: the v1.1 home crop starts too low
  and cuts the panel tops. Proof: `strip-home-top.png` (fullpage rows
  2540-2740) shows hamburger + Auto pill + clock and CN segmented pill
  + clock above the greetings; the crop starts at row 2600, below them.
  The component renders top bars (home-panel.tsx).
- J11b header + first row + check mark: same crop-cut class. Proof:
  `strip-language-top.png` (rows 11480-11720) shows "System default /
  English (United States)" WITH check mark as the first row; the
  language crop starts at row 11550, below the title and first row.
  Component renders the title prop; data has System default
  selected:true.
- J1 (claude) "sharp corners in render": false — render buttons are
  full pills (welcome.png + Button component).
- J4 "missing" x6: false as stated — Kyoto user bubble, meta
  ("Searched 4 times, checked the weather, found 12 places"), intro
  ("Temples on dry Saturday, market on Sunday."), day cards, and the
  savings headline ("About $58,160...") all exist in `src/demo/data.ts`
  / `src/App.tsx`. The judge failed to locate them in the crop.
- J6 "missing Choose a model header + How credits work": false — both
  exist in `src/components/model-picker.tsx`.

### C. Candidate real diffs (render side code-confirmed; original side judge-read)

Not fixed this round (only D-01 was authorized). Each needs a
coordinator go-ahead before changing code:

- J1: dot color/size — pixel-measured: original ~23px vivid orange
  ~(244,104,41) vs token accent #E2A181 peach at 12px (h-3 w-3).
  Google fill white vs light gray. Footnote size/color. Button
  vertical placement (debatable: desktop panel is shorter than a phone).
- J3: train meta "read 6 pages" (code) vs "read 4 pages" (judge);
  train badges: judge says original has S/R/K letters, but the prior
  README reading says blank — needs an original re-read.
- J4: Kyoto Sun temp 16° (code) vs 15° (judge); savings figure $58,164
  (render big figure) vs $58,160 (original headline figure).
- J5: "44 credits" (code) vs "64 credits" (judge; 4/6 is an easy
  vision confusion — needs original re-read); action-row icon
  comment vs thumbs-down.
- J6: credit sign minus (code, e.g. "-80") vs tilde (judge, "~80");
  Fable badge "Pro" (code) vs "Pro+" (judge); Thinking note "Auto picks
  the ideal for each message." (code) vs "...the level..." (judge and
  scope-j6 agree on "level"); Thinking subtexts judge-read from the
  zoom: Auto -110, Off -10, Low -110, Med -140, High -200, Max -400
  (Low == Auto looks odd — needs zoom re-read); Sonnet -80 vs ~80;
  Opus -160 vs ~160.
- J7: Pro feature line "...GPT-5.1, GLM-5, Kimi K3" (code) vs
  "...GPT-6.1 Sol, Kimi K3" (judge); footnote "...plan, no weekly
  plans." (code) vs "...plan. No weekly plans." (judge).
- J8: dateRange "Sep 28" (code) vs "Sep 26" (judge); legend colors
  orange/blue/purple/teal (code) vs brown/pink/olive/blue (judge);
  By-model and Activity rows render no dots (code) vs original has
  dots (judge).
- J9: "Auto review" (code) vs "Auto-review" (judge); "Step 3 of 8"
  (code) vs "Step 3 of 6" (judge); third card "Done: 2 plans found"
  (code) vs judge "Boar: 2 plans found" (suspect misread — needs
  original re-read); bottom "Add an instruction" composer absent
  (component ends at Pause/Stop — real gap per scope-j9, unless
  composers are excluded by design, see Q2).
- J10a: 1-running dot orange (render) vs white (judge); Pinned side
  dots; Recent dot colors on 5 rows; messages-left chevron; Pro as
  pill badge beside Alex (code) vs subtext below Alex (judge).
- J10b: GLM dot blue (code #4A7DE4 family) vs pink/red (judge);
  DeepSeek dot teal (code #2EB5A5) vs blue (judge); Sonnet reply
  "10:21" (code) vs "10:31" (judge); DeepSeek row "10:17, 41 credits,
  3.5s" (code) vs "10:19, 41 credits, 0.9s" (judge).
- J12: state 1 mic (code: dark composer default orange circle mic) vs
  stop (judge) — suspect state mismatch: scope-j12's own original
  description for state 1 is the Lisbon-EN orange button, not a stop
  button (stop belongs to state 4, which the code renders with
  mic="stop").

### D. Methodology questions for the coordinator (choices, not fixes)

- Q1: Re-cut crops aligned to panel tops and re-judge J2/J11b (and
  audit every crop's top/bottom alignment)? Home + language crops are
  proven misaligned; other "missing" verdicts may share the cause.
- Q2: Do chat-thread sections need bottom composers (J5 router,
  J9 agent instruction composer), or are composers excluded from
  thread crops by design (the gallery has a separate Composer section)?
- Q3: Do desktop panels need phone-chrome headers (J8 credits
  back-arrow/title/info)? Picker includes its own title because it is
  panel content; credits/agent headers are navigation chrome.
- Q4: J1 dot — change the shared accent token #E2A181 toward vivid
  orange (~#F46829) and enlarge the dot 12px -> ~23px relative, or keep
  the token? The token is shared across panels (and app/medley).
- Q5: Picker credit sign convention — minus (-) or tilde (~)?
- Q6: Trust rule — nemotron gave PASS then FAIL on identical J1
  inputs (temperature 0). Should PASS claims require a confirmation
  re-run before anyone reports "clean"?
- Q7: Fix priority — batch the section-C value fixes next round with
  one re-judge per item, or one-by-one with rebuild + re-screenshot +
  re-judge each?

## Build

- Pre-fix: `/home/hatch/.npm-global/bin/pnpm build` passes
  (tsc -b && vite build).
- Post-D-01-fix: same command passes (css 23.58 kB, js 389.68 kB).
  Note: README's older receipt says css 37.62 kB; the current build
  emits 23.58 kB with pixel-identical fullpage output, so the receipt
  figure is stale, not a regression.

## Files changed (working tree only — NO commit, NO push, NO git add)

- Modified: `src/App.tsx` (D-01 demo props only), `CHANGELOG.md`
  (v1.2 entry appended).
- New: `scripts/judge-round4.py`, `scripts/run-judge-round4.sh`,
  `scripts/run-round4-queue.sh`, `docs/verification/rounds/round4/`,
  `docs/verification/rounds/v1.2/`.
- Untouched by this round: all other sets, server DB, tokens, BotsRouter
  config, pricing/settlement, X, other projects, and every other
  agent's files (concurrent app/medley + airbuild changes in git status
  belong to other agents).

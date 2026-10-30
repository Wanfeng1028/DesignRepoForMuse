# Medley — Desktop / Web CHANGELOG

> Scope: UIDesign/web/medley only. Desktop layout itself has no original
> image; 1:1 covers tokens and component forms (see README residual 1).

## v1.0 — 2026-10-29 (baseline)

- 2026-10-29 delivery, user verdict: not up to standard, rework required.
  This entry is the rework baseline: prior two-round self-check (README
  "Verification") claimed component matches with 8 filed residuals; the
  rework loop below re-verifies every component against the real Doubao
  collages with an independent vision judge (qiniu/conatus-free) instead
  of trusting the prior self-check.
- Build: `/home/hatch/.npm-global/bin/pnpm build` passes
  (tsc -b && vite build).
- Verification tooling added this round: `scripts/shot-viewport.cjs`
  (1280x800 / 1440x900 viewport shots, same headless-shell renderer as
  `scripts/shot-fullpage.cjs`) and `scripts/judge.py` (vision-judge client;
  token only from env, never written to disk).
- Screenshots for this baseline: `docs/verification/rounds/v1.0/` —
  `gallery-1280x800.png`, `gallery-1440x900.png`, `gallery-fullpage.png`
  (1280x13028), 9 slices in `crops/`, per-section render crops +
  per-phone original crops + judge prompts in `judge/`.
- **STOPPED at judge pilot J1 (Welcome) — rate limit, iteration halted
  per the conatus rate-limit iron rule (no sleep-retry, no model swap).**
  `qiniu/conatus-free` returned HTTP 429
  (`free_campaign_global_limit`, request id in `judge/judge-j1.err`).
  No judge verdict was obtained for any component; no code was changed
  in this round; no v1.1 exists. Pending judge queue on resume:
  J1 welcome, J2 home EN/CN, J3 lisbon/train, J4 savings/kyoto,
  J5 router, J6 picker A/B, J7 pricing, J8 credits, J9 agent team,
  J10 drawer/chat-info, J11 suspended/language, J12 composer states.
- Candidate (UNVERIFIED, not fixed — needs judge confirmation on
  resume): suspended panel buttons. Gallery demo props pass
  primary "Contact support" / secondary "Sign out", while the verified
  mobile reference (`muse/src/screens/suspended-light.tsx`, itself
  checked against the original in 3 rounds) renders primary "Appeal" /
  secondary "Contact support", with "Sign out" only as a "You can still:"
  row. If the judge confirms against the original suspended phone
  (`ov_r2_c3`), fix = change the two demo props in `src/App.tsx` only
  (component is props-driven); then rebuild, re-screenshot, re-judge.

## v1.1 — 2026-10-29 (judge pass prepared, STOPPED at J1 on rate limit; no verdicts, no code changes)

- Build re-verified: `/home/hatch/.npm-global/bin/pnpm build` passes
  (tsc -b && vite build); fresh full-page screenshot
  `docs/verification/rounds/v1.1/gallery-fullpage.png` (1280x13028) is
  pixel-identical (max diff 0) to the v1.0 full-page shot, so the v1.0
  panel renders reused in this round depict the current code exactly.
  Viewport shots `gallery-1280x800.png` / `gallery-1440x900.png` re-taken.
- Judge material rebuilt from the user-supplied HD originals
  (`UIDesign/docs/references/medley/`, md5s in `UIDesign/CHANGELOG.md`):
  `docs/verification/rounds/v1.1/judge/orig/` — 15-screen overview phones
  re-cropped (grid x-bands 33-252 / 282-500 / 530-748 / 778-996 /
  1026-1245; row bands 15-525 / 575-1070 / 1130-1630) and upscaled 3x to
  660px wide; 5-screen detail phones (Lisbon/Home/PickerA/Pricing/Credits)
  and 4-screen Chinese phones (Welcome/Home/Lisbon/Language) at native
  resolution resized to 600px wide; plus a 4x zoom of the Picker-B
  Thinking strip cut from the HD overview for the J6 subtext question.
  Small-collage crops are no longer used anywhere in this round.
- Judge pipeline upgraded (lessons from the v1.0 empty-verdict call):
  `scripts/judge.py` default `--max-tokens` 3000 -> 6000, PNG inputs are
  converted to JPEG in memory so every image is sent as a JPEG data URI,
  and `--prompt-scope` appends a per-call scope to the common prompt.
  New `scripts/run-judge.sh` fetches the BotsRouter token live via the
  Japan-server SSH proxy + `sudo cat` on every call, keeps it in memory
  only (never echoed, logged, or written to disk), and prepends `sk-`
  when the stored value lacks it.
- Prompts v2 (`judge/prompt-common-v2.txt` + `judge/scope-j*.txt`):
  verdict-first — the first line must be exactly `VERDICT: CLEAN` or
  `VERDICT: DIFFS: D1, D2, ...`, followed by quantified per-item diffs;
  UNREADABLE items are listed separately and never counted as diffs.
  Queue ready to run: J1 Welcome, J2 Home EN/CN, J3 Lisbon/Train,
  J4 Savings/Kyoto, J5 Router, J6 Picker A/B (+ Thinking zoom),
  J7 Pricing, J8 Credits, J9 Agent team, J10a Drawer, J10b Chat-info,
  J11a Suspended (incl. candidate D-01 button labels), J11b Language,
  J12 Composer states.
- **STOPPED at J1 — rate limit, iteration halted per the conatus
  rate-limit iron rule (no sleep-retry, no model swap).**
  `qiniu/conatus-free` returned HTTP 429
  (`free_campaign_global_limit`, request id
  `chatcmpl-3804eefe73cd4fec9ec4b166618b8110`, evidence in
  `judge/verdicts/J1.err`; `J1.txt` is empty). No judge verdict was
  obtained for any component; no code was changed in this round.
  Pending on resume: rerun the queue above from J1 with the materials
  already in `docs/verification/rounds/v1.1/judge/` (no re-preparation
  needed); candidate D-01 is still UNVERIFIED and still not fixed.

## v1.2 — 2026-10-30 (round4 judge queue complete; D-01 fixed + re-verified)

- Round4 judge queue ran to completion (14 calls: J1–J12 with J10/J11
  split a/b) on the v1.1 code, all via primary judge
  `nvidia/nemotron-3.5-super-vl:free` (verdict-only prompt, max-tokens
  8000 — the judge needs ~3–6k tokens of reasoning before emitting
  content; 400/2000 caps return empty content). No 429/401/403 occurred;
  no fallback judge was needed for the queue. Pipeline: new
  `scripts/judge-round4.py` (curl transport, Authorization header only
  via a pipe-fed `curl -K /dev/fd/N`, token never in argv or on disk)
  + `scripts/run-judge-round4.sh` + `scripts/run-round4-queue.sh`.
  Queue evidence: `docs/verification/rounds/round4/` (fresh fullpage
  pixel-identical, max diff 0, to the v1.1 fullpage, so the v1.1
  per-section render crops depict the pre-fix code exactly; verdicts in
  `judge/verdicts/J*.txt`, queue log in `judge/queue-round4.log`).
- Queue verdicts: 14/14 FAIL (none PASS). Full table + triage in
  `docs/verification/rounds/round4/SUMMARY.md`. Caution: several FAIL
  reasons are REFUTED by code/pixel evidence (J2 top bar, J11b header
  + first row + check mark are all rendered — the v1.1 home/language
  crops start too low and cut the panel tops; J1 claude "sharp corners"
  is false, render buttons are pills; J4/J6 "missing" header/items
  exist in code) and several are crop/methodology questions (chat
  threads have no composer by gallery design; credits/agent panels
  lack phone-chrome headers). Candidate real diffs (render side
  code-confirmed, original side judge-read) are listed as residuals in
  SUMMARY.md for the coordinator; nothing beyond D-01 was changed on
  the basis of these verdicts.
- **D-01 FIXED (the only code change this round):** J11a verdict
  confirmed the v1.1 candidate — original suspended phone bottom
  buttons are "Appeal" (black filled) / "Contact support" (outlined),
  render was "Contact support" / "Sign out" (agent also verified this
  by eye on `ov-suspended.jpg`). Fix = demo props only in
  `src/App.tsx` (component is props-driven): primaryLabel
  "Contact support" -> "Appeal", secondaryLabel "Sign out" ->
  "Contact support". "Sign out" stays as a "You can still:" row, as in
  the original. Build passes (`pnpm build`: tsc -b && vite build);
  fresh fullpage differs from pre-fix only in the button-label pixels
  (2310 px, rows 11258–11272, inside the suspended section).
  Re-judge J11a on the fresh suspended crop: **PASS** (explicitly
  confirms both button labels match). Evidence in
  `docs/verification/rounds/v1.2/` (fixed fullpage, fixed suspended
  crop, J11a verdicts).
- J1 conflict note: nemotron gave PASS in calibration, then FAIL
  (button placement + Google fill) in the queue run on identical
  inputs, while claude gave FAIL (corners/dot/footnote). Pixel
  measurement supports a real dot difference (original ~23px vivid
  orange ~(244,104,41) vs token accent #E2A181 peach, 12px). J1 is
  reported as CONFLICT, not clean; the dot/token question is a
  coordinator decision (accent token is shared) and was NOT changed.
- Version bump v1.1 -> v1.2 is for the D-01 fix only. All other round4
  FAIL items remain open residuals; v1.2 is NOT "verified clean".

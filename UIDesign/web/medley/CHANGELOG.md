# Medley — Desktop / Web CHANGELOG

> Scope: UIDesign/web/medley only. Desktop layout itself has no original
> image; 1:1 covers tokens and component forms (see README residual 1).

## v1.3 — 2026-10-30 (fix round; audit-20261030 all 58 gaps + full-screen sweep)

- Fix round, not a review round. Acceptance rests on measured data
  (pixel samples + code tokens read out), not on any judge verdict.
  No judge call was made in this round: every item either had a
  readable original or is recorded below as unclosed with its reason.
  Build passes: pnpm build (tsc -b && vite build). No commit, no push;
  changes left in the worktree for the coordinator.
- Screenshots: docs/verification/rounds/v1.3/ — gallery-fullpage.png
  (1280x134xx, frameless verification shots per Q8), sec-*.png
  per-section element shots, measure/*.png zoom/evidence crops,
  shot-sections.cjs (element-shot helper). Gallery demos keep no
  device frames (this set renders panels, not phones).
- P0 Q12: HD Chinese source wins. Welcome dot = vivid orange-red
  (217,94,39) = #D95E27, 25px @600-wide CN crop = ~16px CSS.
  The English-side pale blue-grey blob (147,180,205) comes from the
  small overview collage and is unreliable. The old shared accent
  token is split: welcome dot (#D95E27), composer dark mic (#D95E27),
  composer stop (#D66F44), drawer running dot (#FFFFFF),
  ModelDots first dot (#E2A181) are now independent tokens; one
  token change never moves four places. ModelDots palette is now
  [first, blue, teal, purple, green, pink].
- P0 Q10/Q11: all original chrome restored (S1-S4, S5-S14 below).
- P0 Q13/Q19: model-row prefix is ~ (confirmed); Thinking-row
  symbol measured as ~ too (P2-8), so Thinking figures render ~110 /
  ~10 / ~110 / ~140 / ~200 / ~400.
- P0 Q8: verification screenshots frameless; gallery demos keep
  their panel form (no device frames in this set).
- P1 copy fixes (data.ts / App.tsx): T1 "read 4 pages"; T2 Router
  "64 credits"; T3 all price prefixes "-" -> "~" (A ~5/~11/~31/~80/
  ~120/~400, B ~31/~80, untitled ~80/~160); T4 Fable badge "Pro+";
  T5 "Auto picks the level for each message."; T7 Pricing feature
  "Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3" (GPT-5.1 and the
  extra GLM-5 removed); T8 footnote "No ads on any plan. No weekly
  plans."; T9 date range "Sep 26" - "Oct 25"; T10 "Auto-review";
  T11 "Step 3 of 6"; T12 third agent card "Boar: 2 plans found"
  (2x zoom of ov-agent reads "Boar", no "d"); T13 latest reply
  "10:31"; T14 DeepSeek row "10:19, 41 credits, 0.9s"; T15 Kyoto
  Sunday "15° rain".
- P1 colours: C1 welcome dot #D95E27 (16px, h-4 w-4); C2 drawer
  "1 running" dot white; C3 legend/By-model dots Claude #966955,
  GLM #916478, Kimi #817D57, DeepSeek #5F788C (audit by-model
  samples applied to both legend and By-model rows; legend-row
  direct centres were not hit, see P2-12); C4 chat-info chips GLM
  #916478, DeepSeek #5F788C, Sonnet #E4754A; C5 drawer recent
  Lisbon #C65D7B x2, Python #4A7DE4, Cell #9B5DE5, Q3 #3FA34D +
  #9A9A3E, Cover #E4754A, Spanish #C65D7B (blob samples of
  ov-drawer, JPEG-muted means mapped to palette families); C6
  Train DeepSeek dot now blue via modelDeepseek token #5F788C
  (the only token-level colour change; Claude/GLM/Kimi/GPT model
  dots were visually consistent and unchanged); C7 composer dark
  mic #D95E27; C8 Google button fill #ECEEF2; C9 credits bars
  per-bar segment quadruples (amber/pink/teal/green, green from
  later bars) with flat-then-steep heights
  [14,15,14,16,18,20,22,26,30,36,42,50,58,66,76,86,94,101,106,110]
  (shape is a documented approximation, see P2-19); C10 pricing
  ModelDots count 6 on both the top row and the Pro-card row
  (pink appended; Pro-dot row samples support 6 pastel dots).
- P1 structure: S1 six composers added — Lisbon (dark, "Message
  Claude Sonnet 5.5", stop), Train (light, "Ask anything", plain
  mic), Savings (light, "Ask anything", plain mic), Kyoto (dark,
  "Ask anything", plain mic), Router (light, "Message GPT-6.1 Sol",
  plain mic), Agent "Add an instruction" (dark, white circle +
  dark up-arrow, no plus); the duplicate desktop-Lisbon composer
  div was removed (LisbonChat now ends with its own stop
  composer). S2 credits header (back + "Credits" + info); S3 agent
  header (back top-left + "..." top-right); S4 chat-info top bar
  (hamburger / Auto / clock / edit) + user bubble + model line.
  S5 drawer pinned card now carries 2 dots (#E4754A, #9B5DE5);
  S6 messages-left chevron; S7 user row "Alex" with "Pro" as
  sub-line (pill removed); S8 Train sources are S/R/K letter
  badges in a filled light pill + "4 sources"; S9 savings card
  "..." menu; S10 compound curve endpoint dot (230, 15.7) with
  "Balance" label right of it (unclipped) and dashed line to
  (230, 57.4) with "Put in" label; S11 agent Pause (double bars)
  / Stop (square outline) icons; S12 credits By-model row dots;
  S13 activity row orange dot (#E4754A, colour inferred from the
  drawer Lisbon row, stated as inferred); S14 the 60% vertical
  dashed line and its above-chart label removed; the upgrade
  label is the middle item of the x-axis row.
- P1 buttons/icons: B1 pricing segmented control selected state
  is a dark-grey highlight with plain "Save 20%" small text (white
  pill + peach badge removed); B5 drawer search pill full-width
  with edit inside, hamburger as a separate right-aligned row
  below; I1 agent Running dot white #F5F5F7; I2 Done =
  check-in-circle; I3 Queued = clock-in-circle; M-stop composer
  stop = vivid-orange circle #D66F44 (overview Lisbon-EN sample;
  HD5 Lisbon peach (214,155,124)/(219,162,126) is recorded as a
  conflicting source, not hidden) + dark square.
- P1 fonts (tokens, verified by post-fix cap bands on the render):
  F1 pricing title 27 -> 22px (original 20-23.5px; render band
  20px incl. "p" descenders); F2 credits huge number 44 -> 37px
  (original 34-39px; render cap band 26px = 0.70 x 37px); F3 agent
  title 17 -> 19px (original 17.5-20px; render two-line bands
  17/14px incl. descenders); F4 welcome title 38 -> 41px
  (original ~41px, range 38-44; render cap band 30px); F8 welcome
  footnote 12 -> 11px (original ~10-11px). Note on F2: the audit's
  "render small ~15%" was a screenshot-scale comparison while the
  code token 44 sat above the 34-39 range, so the token moves down
  into the range.
- P1 composer bar height: 52 -> 48px (P2-11: HD5 Lisbon bar band
  ~45.5px CSS, overview Lisbon bar ~47px CSS).
- P2 outcomes: P2-1 390px CSS-width assumption UNCLOSED (cannot be
  measured from JPEGs; all font CSS conversions rest on it). P2-2
  body/secondary/caption caps UNCLOSED (not individually
  re-measured; only the F-items changed). P2-3 savings big-number
  cap UNCLOSED (row-band scan of ov-savings inconclusive; and
  ov-* crops are upscales of the overview collage, so absolute px
  from them is not trustworthy; savings number stays hardcoded
  40px; its split from the credits token is still unexplained).
  P2-4 suspended badge = two vertical bars, fixed. P2-5 router
  notice glyph = shield outline, fixed (Icon.shield). P2-6 home
  clock = dashed-ring clock, fixed (Icon.clockDashed). P2-7
  MedleyMark CLOSED as consistent (CN home 2x shows dark M +
  small orange block top-right, matching the vector form). P2-8
  Thinking symbol = ~, fixed (figures above). P2-9 third agent
  card first word = "Boar", fixed. P2-10 radii UNCLOSED (not
  measured; card 16 / bubble 20 / sheet 24 / chip 20 remain
  visual-consistency values, buttons confirmed full pill).
  P2-11 composer height, fixed (above). P2-12 legend-row pixel
  colours PARTIAL (direct centres unhit; audit by-model samples
  applied). P2-13 chat-info chip pixel colours UNCLOSED for
  direct sampling (audit visual pink/blue + C3 sampled family
  values applied). P2-14 drawer dots CLOSED via blob sampling
  (values in C5). P2-15 home Auto-pill dot count UNCLOSED (dots
  form an overlapping JPEG cluster that cannot be pixel-separated;
  Auto pill stays at 5; only pricing rows went to 6 on audit
  evidence). P2-16 Lisbon-EN stop state CLOSED (generating stop
  state in both HD5 and overview), colour conflict logged above
  (overview vivid orange wins per task-named source + Q12
  direction). P2-17 Lucide PARTIAL: pause, square, circle-check,
  clock, shield, check, menu verified verbatim from
  lucide-react@1.63.0; gear/settings, edit/pencil-line,
  folder, cards were not re-pathed and remain audit near-form /
  pending items. P2-18 Q12 conflict CLOSED (CN HD wins). P2-19
  credits bars PARTIAL (hue census confirms multi-colour
  stacking incl. green, but per-bar splits and bar count are not
  separable; heights/splits are a documented approximation).
  P2-20 home padding CLOSED as no-change (audit "text starts
  x 49-55 @600 -> CSS 32-36" not reproduced: CN home crop shows
  M mark / greeting at ~32px @600 = ~21px CSS, matching px-5;
  the hd5-home-en scan failed on dark border pixels and was not
  used; conflict with the audit figure recorded). P2-21 desktop
  adaptation items CLOSED as adaptation (DesktopLayout top bar,
  drawer-as-sidebar, gallery cards, welcome card height), not
  gaps, per the set's fidelity rule.
- P3 hygiene: Icon.back/send/info were 0-reference at audit time;
  all three are now referenced (back: credits/agent headers;
  send: agent composer arrow; info: credits header + converged
  suspended note icon). lucide-react 1.63.0 added to package.json
  (pnpm add); existing hand-drawn icons were NOT wholesale
  replaced — only newly needed icons use Lucide 1.63.0 geometry,
  matching the set's convention. New Lucide-verbatim icons:
  clockDashed, pause, square, checkCircle, shield, map, sun,
  cloudRain, cornerUpRight. Suspended's inline info SVG converged
  onto Icon.info (geometry changes slightly: circle r=9 + line +
  dot vs old r=7 circle + line + dot; same "circle + i" form).
- P3 morphing: M4 chevronDown<->Up (pure rotation) LIVE — HomePanel
  EN Auto pill and Composer model-label pill rotate 180deg on tap
  (.morph-rotate). M2 mic<->stop and M3 mic<->send TRANSITION
  WIRED — composer glyphs fade-scale in on mic prop change
  (.morph-in, key={mic}); agent composer now actually uses
  Icon.send. No live toggle is faked in the static gallery demos.
  M1 menu<->close, M5 plus<->check, M6 pause<->stop, M7
  back<->menu NOT WIRED, original form wins: no single toggle
  button exists for these pairs in the original (M1/M7 are
  different contexts; M5 has no plus->check instance in this set;
  M6's original is two separate buttons, not a toggle). No unwired
  morph components were added as dead code.
- Full-screen sweep (2026-10-30 12:42 user rule: acceptance covers
  everything visible on the original, not just the audit list;
  method is the assistant's choice, only the result counts).
  Extra items found and fixed: (a) every agent card carries a
  "..." menu after its status (ov-agent); (b) chat-info sheet
  header carries a close X (ov-chatinfo); (c) chat-info backdrop
  top-bar Auto is bare, not a pill (Home's Auto pill is correct
  and kept); (d) backdrop model line has a single model dot, not
  a 5-dot cluster; (e) AiMeta sub lines carry a trailing chevron
  (Train "thought for 6s >", Kyoto "found 12 places >"); (f) Train
  compare table sits in a white rounded card, not on bare
  hairlines; (g) Train sources sit in a filled light pill;
  (h) Train suggestions are pill chips with a corner-up-right
  arrow, and the Train composer sits below them (original order);
  (i) Kyoto Sat day card is white (#FFFFFF, was #EDEEF0) with
  sun/cloud-rain weather glyphs before the temperatures;
  (j) Kyoto "Show map" icon is a folded map, not a pin;
  (k) Kyoto poll unselected options are plain rows with hairline
  dividers, not bordered chips (selected stays a white pill);
  (l) thread composers corrected to their original states: Train
  / Kyoto / Savings plain line mic, Router plain mic + "Message
  GPT-6.1 Sol" (was "Ask anything"); (m) welcome "Try without an
  account" is a filled dark pill, not an outline; (n) savings
  curve labels sit right of their line ends (Balance unclipped).
  Judged as phone chrome, not component gaps (documented, not
  silently skipped): the thread top bars (hamburger / model /
  circle / edit) that appear on every phone screen, the iOS status
  bar, and the desktop layout differences per the set's fidelity
  rule (style tokens / component forms 1:1, desktop layout is
  platform adaptation). Unreadable at this resolution, left as
  unclosed: the small chip after the Train verdict body
  ("... +2"-like, illegible), the chat-info backdrop right circle
  icon's hands (dimmed; audit called it clock, kept as clock),
  and the EN welcome top mark (reads as a 3-dot cluster at 2x vs
  the confirmed M on CN home; same asset likely, resolution
  insufficient to distinguish — MedleyMark kept).
- Post-fix re-measurements (render, CSS px): welcome dot 16x16
  #D95E27; welcome title cap band 30px (41px font); credits huge
  cap band 26px (37px font); pricing title band 20px incl.
  descenders (22px font); agent title two-line bands 17/14px
  incl. descenders (19px font); Lisbon stop circle colour family
  (214,111,68) = #D66F44; pricing dot rows 6 + 6 visually
  confirmed; drawer dot rows match C5; all six composers, both
  headers and the chat-info top bar present in the new shots.
- Still unclosed (with measured reasons): P2-1, P2-2, P2-3, P2-10,
  P2-12 (partial), P2-13, P2-15, P2-17 (partial), P2-19 (partial),
  plus the three sweep illegibles above. Nothing else from the
  audit list is outstanding.

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

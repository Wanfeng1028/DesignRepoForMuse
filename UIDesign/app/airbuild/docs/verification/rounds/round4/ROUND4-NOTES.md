# Round 4 judge notes — UIDesign/app/airbuild — v1.5, no code change

Date: 2026-10-30. Branch: main. Version stays v1.5. No commit, no push, no git add by this worker.

## Judge method

- Judge model: nvidia/nemotron-3.5-super-vl:free via https://api.botsarena.tech/v1/chat/completions (OpenRouter channel).
- Key: server file /etc/botsrouter/muse_judge_token.txt, fetched live via relay SSH + sudo cat into env only. Key value is not printed and is not in any file. Token format checked: 48 chars, no sk- prefix.
- Client: docs/verification/judge/judge-vision-round4.py (new in this round). Token reaches curl only via stdin config (curl -K -), never via argv and never via a file. Body JSON (image + prompt, no token) goes via a workspace file deleted after each call.
- Prompt style: verdict-only, two lines: line 1 VERDICT: PASS or VERDICT: FAIL, line 2 one sentence reason. No thinking output is requested.
- Cost: all successful calls cost 0 (free model). No backup model was used. No 429/401/403 occurred in this round (stop counter 0).
- Composites judged: the v1.5 composites in docs/verification/judge/composites/ (*-v1.5.jpg), built from v1.5 renders. No new renders were made because no code changed.

## Verdicts (corrected reading)

- home: PASS. Reason: 2x2 widget grid, list layout, color scheme and component placement match. Evidence: home-verdict-nemotron.txt. Caveat: home original is a tilted hand-held photo, perspective-unwarped; this is a component/style verdict, NOT a pixel verdict, and NOT a claim of screenshot 1:1.
- chat: FAIL. Reason: centre project mark is a plain letter block instead of a small town illustration. Evidence: chat-verdict-nemotron.txt. Caveat: left panel below y=774 is gray (marketing image ends there); that band was ignored.
- detail: PASS on inner content (v2 supersedes v1). V1 FAIL reason was the render phone bezel + status bar + Dynamic Island, which are gallery framing, not detail-panel content. V2 prompt told the judge to ignore bezel/status bar/island on the right and compare inner content only; v2 result is PASS (card positions, section headers, progress list alignment match). Evidence: detail-verdict-v2.txt (v1 file kept for audit: detail-verdict-nemotron.txt).
- draft: FAIL, consistent across two prompts. V1 and v2 both say the cover block is taller and narrower than the original (v1: tall vertical rectangle vs squarish; v2: height-to-width ratio altered). Evidence: draft-verdict-nemotron.txt, draft-verdict-v2.txt. Caveat: left panel below y=774 is gray and was ignored.
- briefing: FAIL on v2 (v2 supersedes v1). V1 reason (single-column layout with badges) contradicts the composite itself, where both panels show a side-by-side cards row; that v1 reason is NOT relied on. V2 reason, with bezel/status-bar ignored and card-row criteria stated, is: the first briefing card is missing the page-curl effect on its bottom-right corner. Evidence: briefing-verdict-v2.txt (v1 file kept for audit: briefing-verdict-nemotron.txt). Caveat: briefing original top is cut by the marketing image; there is no status bar in the original panel, and a global vertical shift up to about 40px was forgiven.

Overall round 4 status: pending, NOT clean. 2 screens pass on the corrected reading (home, detail-inner), 3 screens fail (chat, draft, briefing).

## What was NOT confirmed

- The v1.6 candidate list was NOT applied, because it has no item-by-item new verdict yet:
  top-bar round buttons 42 to 46px; project mark letter block to abstract town illustration;
  pill size; author name 13 to 14px; bubble padding 16 to 18px; file card wider/taller.
  Of these, only the project-mark item has a new verdict (chat FAIL, above). The other five chat items have NO new verdict in this round.
- Two prompt styles failed on this judge and were abandoned, not retried endlessly:
  (a) The old detailed 11-item diff prompt on chat: prompt 1573 tokens, completion 6000 tokens all reasoning, content empty, finish length. Evidence: round4-work/chat-nemotron2.err.
  (b) Focused quantitative prompts (e.g. chat-topbar asking for diameters in px): prompt 944 tokens, completion 6000 tokens all reasoning, content empty. Evidence: chat-topbar.txt.err in this folder. The judge burns its whole budget measuring pixels and never emits a verdict.
  Consequence: precise target numbers for top-bar, pill, author, bubble and file-card sizes cannot be obtained from this judge with quantitative prompts. Do not present old-judge numbers as newly confirmed.
- Draft cover target ratio and briefing page-curl size/shape are also not quantified by the verdict-only prompts. Landing a guessed value would be guessing, so no code was changed.

## Build

- Command: /home/hatch/.npm-global/bin/pnpm build (tsc -b && vite build) in UIDesign/app/airbuild.
- Result: PASS. Vite built 34 modules; dist assets unchanged in name (index-BpwchdHw.css, index-DrgcQKsa.js).

## Files changed in this round (work area only, not committed)

- New: docs/verification/judge/judge-vision-round4.py
- New: docs/verification/judge/round4-work/ (prompts, runner, verdict work files)
- New: docs/verification/rounds/round4/ (this folder: composites, renders, verdicts, prompts, this note)
- No change: src/, CHANGELOG.md, README.md, package.json, dist tracked state. Other agents' files under UIDesign/app/medley, UIDesign/web/airbuild and UIDesign/web/medley were not touched.

## Residual choices for the coordinator

- Q1 chat project mark: land an abstract town SVG illustration for ProjectMark now, or hold for a style pick first? Options: (A) land a minimal vector town (buildings + trees, no official bitmap) in the next round and re-verify chat; (B) hold, keep letter block, accept chat FAIL standing.
- Q2 chat other five items: how to confirm them, given quantitative prompts burn the judge budget? Options: (A) accept the old-judge numbers + candidate list as sufficient and land all five with the project mark as one v1.6; (B) run one backup claude-sonnet-4-6 detailed call for chat only (expensive, about 13k prompt tokens per single-image call in prior verification) to get an item list; (C) leave all five unlanded and keep v1.5.
- Q3 draft cover: what is the target? Options: (A) measure the original cover ratio from the draft crop and set cover min-height to match the headline-block height (no guessed number in this note); (B) keep current min-h 240px and accept draft FAIL standing.
- Q4 briefing page-curl: land a CSS folded-corner on briefing cards, or hold? Options: (A) land a small folded corner on the first card only, then re-verify; (B) land it on both cards; (C) hold and accept briefing FAIL standing.
- Q5 detail framing: for future judge rounds, strip PhoneFrame bezel/status bar from judge renders so the judge compares screen-only to screen-only, or keep the gallery frame and always use a bezel-ignore prompt? Options: (A) strip frame for judge renders only (gallery page unchanged); (B) keep frame + bezel-ignore prompt (as v2 did).

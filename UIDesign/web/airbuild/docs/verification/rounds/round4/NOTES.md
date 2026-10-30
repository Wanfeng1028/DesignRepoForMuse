# Round 4 — v1.1 verdict re-run (2026-10-30)

Judge script: `docs/verification/judge-round4.py` (adapted from judge-v2.py:
verdict-only prompt, one `VERDICT: PASS/FAIL` line + one sentence reason,
no thinking; curl -K - transport; token via relay SSH + sudo cat, memory only).
Refs (unchanged, read-only): `~/workspace/airbuild-refs/user-photo-chatroom-crop.jpg`
+ `~/workspace/airbuild-refs/appstore/ipad-01.jpg`.
Screenshots re-shot this round from a fresh `pnpm build` (see below).

## Build

`/home/hatch/.npm-global/bin/pnpm build` → PASS (`tsc -b && vite build`,
40 modules, built in 806ms).

## Verdicts (all three actually judged by the fallback, see note)

- main: PASS — claude-sonnet-4-6. "The desktop render closely matches the
  original photo crop in layout structure, typography, and color palette,
  with only the two known adaptations differing as described."
  Evidence: `judge-main.json`, `window-main.png`.
- sidebar-collapsed: PASS — claude-sonnet-4-6. "The render faithfully
  matches the originals across layout, sizes, colors, and typography, with
  only the acknowledged bottom-bar adaptation differing."
  Evidence: `judge-sidebar-collapsed.json`, `window-sidebar-collapsed.png`.
- preview-collapsed: FAIL — claude-sonnet-4-6. Reason given: "The right-side
  avatar blob in the desktop bottom module bar (Image 1) is rendered as a
  filled color block instead of proper avatar silhouettes, and the module
  bar layout does not match the right-side module column structure present
  in the real desktop original."
  Evidence: `judge-preview-collapsed.json`, `window-preview-collapsed.png`.

## Why the preview-collapsed FAIL drove no code change

The FAIL reason cites exactly the two items the prompt explicitly excludes
(bottom module bar adaptation, avatar blob approximations). Moreover,
`window-preview-collapsed.png` itself contains neither a bottom module bar
nor a right-side avatar blob: it is only the window (sidebar + conversation,
preview hidden, 48px titlebar strip). The visible agent avatars in it are
the normal blob circles with eyes. There is no actionable, quantified,
non-excluded diff in the verdict, so no code was changed on its basis and
no re-run was done to shop for a PASS. This FAIL is left as an open
coordinator decision (see final report choice questions).

## Judge-chain note (finding, not a code change)

Primary nvidia/nemotron-3.5-super-vl:free returned HTTP 200 on all three
calls but spent 100% of its completion budget on reasoning (500 tokens on
main, 2000 on the other two after the budget was raised) with empty
`content`, so each call counted as a failed call per the task rule and
fell through to claude-sonnet-4-6. This differs from the earlier
single-image probe where the verdict landed in content. For this 3-image
verdict-only prompt shape the primary is effectively unusable; the
fallback carried all three verdicts. Fallback cost: prompt tokens
103242 (main) + 98310 (sidebar-collapsed) + 98507 (preview-collapsed) =
300059 total; completion tokens tiny (36/33/63); nemotron cost 0.
No 429/401/403 was hit at any point; the chain never reached mimo-v2.6-flash.

## Version

No verdict-driven code change was made, so the version stays v1.1 and no
CHANGELOG entry was written for this round. Status: NOT clean
(2 PASS + 1 disputed FAIL), pending coordinator decision on the
preview-collapsed verdict.

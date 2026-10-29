# Verification — app/medley

Build: `pnpm build` (tsc -b && vite build) passes, run from
UIDesign/app/medley. Output: 126 modules transformed,
dist/index.html + dist/assets/index-*.css/js, built in ~0.8-0.9s.
No commit, no push (coordinator submits).

Screenshot method: the task names /opt/meta-chromium/chrome, but that
binary refuses to start in this VM without the image-owned WebGL policy
supplied by browser-daemon (exit 13, "Hatch WebGL domain policy is
required for browser startup"), both from the CLI and via Playwright.
Screenshots were therefore taken with Playwright's own stock Chromium
headless shell (same Blink family) at exactly 390x844, file:// build +
?screen=<id>, --allow-file-access-from-files so the file:// build (base
'./') loads its ES modules. Script: shot-screens.cjs in this folder.
Gallery top also captured (gallery-top.png, 1280x900): components
section and Radix dialog/sheet triggers render correctly.

Per-screen comparison (render vs Doubao collage + muse/ baseline):
- welcome-dark: MATCH. Title, orange dot, sublines, Google + guest
  buttons, footnote; traced M mark.
- home-light-en: MATCH. Auto pill, greeting, 4 suggestion rows,
  plain-mic input bar.
- home-light-cn: MATCH after fix. Radix Tabs chat/agent switch, traced
  M mark, greeting, 4 rows incl. Pro badge, auto-chip + black mic.
  Inactive tab colour corrected to light-sub.
- chat-dark-lisbon-en: MATCH. Claude top-bar dot + name, user bubble,
  GLM-5 Auto meta, Day 1 bullets, T/L/V + 3 sources chip, 28 credits,
  food follow-up bubble, second Claude answer, orange mic.
- chat-dark-lisbon-cn: MATCH. Title "里斯本穷游三天" + 旅行 subline,
  bullets with visitlisboa / timeout / +1 tags, sources + credits +
  speed row, second-day bubble, stop-mic input bar. Third bullet wraps
  (tags at line end) as in the baseline.
- chat-light-train-en: MATCH except fold. Table (4h 30m, fares, bags,
  arrivals), 4 sources chip, 41 credits, suggestions; third suggestion
  ("Add a stop in Montpellier") is in the DOM but sits just below the
  first viewport fold in this rendering (scroll snapshot residual).
- chat-light-savings-en: MATCH except fold. $58,164 card, 16%/44%
  Radix sliders, formula curve + $36,000 dashed line, Balance / Put in
  labels; card footer row sits at the fold edge.
- chat-dark-kyoto-en: MATCH. Kimi K3 top bar, weather cards (Sat light
  / Sun dark), timeline, Show map / Add to calendar, poll with Nara
  selected, orange mic input bar.
- chat-light-router-en: MATCH. Router question bubble, safety-switch
  notice card, GPT-6.1 Sol switched meta, 3 bullets, 44 credits.
- chat-info-sheet: MATCH after fix. Dimmed top (Auto pill, single-line
  bubble, "Claude Sonnet 5.5 · Auto" model row fully above the sheet),
  sheet with 210 / 9 / 6 stats, model dots, Tools, Replies grid
  (0.8s / 62 tok/s / 1,240 / 141 / 6 / Medium), footnote verbatim.
  Footnote tail is at the fold edge (scrollable sheet).
- search-drawer-dark: MATCH. Search capsule, nav rows incl. "1 running"
  badge, Pinned Thesis outline, 6 recent rows with dots, "About 240
  messages left", Alex + Pro + gear, 62px dim strip. Alex row sits at
  the fold edge.
- model-picker-a: MATCH. Auto Recommended card, Up to Advanced link,
  Everyday / Advanced / Flagship / Frontier sections, costs
  (-5 / -11 / -31 / -80 / -120 / -400), Pro outline badge on Fable.
- model-picker-b: MATCH. Advanced + Flagship sections, Thinking
  segmented control (Auto selected, white pill), no section title for
  GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5, Kimi "Not available in this
  chat". No multiplier numbers (residual, not invented).
- pricing-dark: MATCH except fold. Dots, title, Monthly/Yearly + Save
  20% toggle, Lite / Pro (7 days free, features, dots) / Pro+ cards,
  trial CTA, trial footnote; footer links sit just below the fold.
- credits-light: MATCH except fold. 12,480 huge number, Buy credits /
  Change plan, Last 30 days 71,720, Oct 15 upgrade dashed line, stacked
  bars (brown-gold + pink + teal), legend, By model rows (590 messages
  GLM-5, 4,620 DeepSeek V4.1 Flash). Activity row sits below the fold.
- suspended-light: MATCH after fix. Suspended icon, 26px title, policy
  text, "Suspended until Nov 2, 2026.", subscription note + Manage
  subscription link, "You can still:" rows, Appeal (white text on
  black, fixed) + Contact support buttons.
- agent-team-dark: MATCH except fold. Two-line title, Team 6 agents /
  Auto review, 20% progress bar, "1,240 of 6,000 credits / Step 3 of 8",
  Lead card (31s), 5 agent rows (9s / 7s / 6s / 21s / 8s), instruction
  input bar. Pause/Stop row sits below the fold.
- language-light: MATCH. Back arrow, App language title, 10 rows with
  System default checked, footnote.

Fixes made during the comparison round (2nd pass):
- chat-info dimmed bubble forced single-line (max-w-none, 15px) so the
  model row is no longer clipped by the sheet edge.
- suspended Appeal button text restored to white (tailwind-merge had
  dropped text-white when text-item was appended; class order fixed).
- home-cn inactive tab colour corrected to light-sub.

Known screenshot-environment note: the VM renders with Noto Sans
(system sans fallback); on a real device the -apple-system / Roboto
stack will be marginally tighter, which is why the longest screens
fold slightly earlier here than in the collage snapshots. Tokens,
paddings and font sizes were NOT shrunk to chase the VM font metrics.
Full residual list: see README.md "Residual".

# Medley mobile design system (app/medley)

Medley style on mobile, as a self-contained, copy-into-a-project design
system: Vite + React + TypeScript + Tailwind CSS v4 + Radix primitives,
shadcn-style (component source lives in this repo, not in a dependency).
No Ant Design, no MUI, no Next.js.

This set covers ONE style only (Medley x mobile). It does not cover the
AirBuild sets or the web Medley set.

## Run

```bash
pnpm install
pnpm dev      # gallery: components first, then all 18 screens
pnpm build    # tsc -b && vite build
```

Single-screen rendering for screenshots: open the built page with
`?screen=<id>` (for example `?screen=chat-dark-lisbon-en`); the page then
renders only that screen, scaled 0.9906 so the 852px phone frame fits a
390x844 window without cropping. See `docs/verification/shot-screens.cjs`.

## 1:1 basis

Tokens and copy come from `../../muse/DESIGN-TOKENS.md` (all 173 measured
lines) and the three collages in `../../Doubao/`:

- `medley-15-screens-overview.jpg` (15 screens)
- `medley-5-screens-detail.jpg` (same 5 screens, higher resolution)
- `medley-chinese-screens.jpg` (welcome high-res + 3 new screens)

The 18 screens are rebuilt on the new stack, not copied as old CSS:
tokens live as Tailwind v4 `@theme` variables in `src/index.css` (mirrored
in TypeScript in `src/tokens/index.ts`), layout uses Tailwind classes,
and interactive pieces use Radix (Tabs for the Thinking segmented
control and the home CN chat/agent switch, DropdownMenu for the Auto
model pill, Slider for the savings sliders, Dialog/Sheet for the
dialog and bottom-sheet primitives). The `muse/` reference implementation
was read only; none of its files were modified.

Detail conclusions from DESIGN-TOKENS.md sections 6/8/9, all applied:

- Train table: "About 4h 30m" (not 50m), subline "read 6 pages" (not 4).
- Lisbon sources chip: T / L / V + "3 sources"; train chip: blank badges
  + "4 sources" (letters unresolvable, see Residual).
- Chat-info footnote verbatim: "First token is the time from sending to
  the first word. Speed counts the visible answer only."
- Agent team: title breaks after "note-taking", progress bar 20%,
  "1,240 of 6,000 credits", "Step 3 of 8", times 31s / 9s / 7s / 6s /
  21s / 8s, progress bar above the credits line.
- Picker B: GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5 have NO section
  title in the source; none is invented.
- Medley M mark: rebuilt from the marching-squares trace of the largest
  logo instance (viewBox "19 43 17 19", two white loops + diagonal
  swoosh cut + orange block at (30,47,2,5)); no brand bitmap is copied.
- Savings curve: formula sampling, $200/month at 6%/yr monthly
  compounding, 30 points, FV(15y) = 58,163.7, shown as $58,164; dashed
  line is the $36,000 linear line (0,104)-(278,47.6); slider fills are
  the measured 16% (monthly) and 44% (yearly).
- Status-bar icons: signal bars 2.5px, wifi stroke 1.4, solid rounded
  battery with solid nub.
- Colours as measured: dark input #1f2024 (not #26272b), user bubble
  dark #191a1e, accent orange #e2a181 (not #e4754a), chart amber
  #8c553c (not #b07a3b), light bubble #edeef0, dark background #121316.

## Components (all props-driven)

Business components take their copy as props; the gallery demo copy and
the screen copy are demo content only, not part of the components.

- `src/components/Phone.tsx` — Phone frame (390x852, radius 44),
  StatusBar (10:24, signal/wifi/battery), HomeIndicator.
- `src/components/icons.tsx` — line-icon set (menu, back, close, plus,
  mic, check, chevrons, search, edit, clock, copy, refresh, like,
  dislike, more, info, gear, send, news, pdf, image, cards, mapPin,
  calendar, folder, searchOrbit, download, trash, logout).
- `src/components/Model.tsx` — ModelDots (5-dot cluster), ModelDot
  (single model dot, colour by model name), MedleyMark (traced M).
- `src/components/TopBar.tsx` — TopBar (left/center/right, 56px),
  ModelPill (Radix dropdown, closed by default).
- `src/components/InputBar.tsx` — InputBar, 52px capsule, mic variants
  circle / plain / stop, optional model label chip.
- `src/components/Chat.tsx` — UserBubble (right-aligned, small top-right
  corner), AiMeta (model dot + name + optional subline), ActionRow
  (credits + copy/refresh/like/dislike/more), SuggestionRow,
  SourcesChip (badge letters + count label as props).
- `src/components/ModelPicker.tsx` — ModelRow, ModelCost, ModelSection,
  AutoCard, ThinkingControl (Radix Tabs; no multiplier numbers, see
  Residual).
- `src/components/Pricing.tsx` — Radio, PlanCard, PlanFeature,
  BillingToggle (Monthly / Yearly + Save 20%).
- `src/components/Credits.tsx` — CreditsChart (stacked bars, brown-gold
  base + pink + teal tips), CreditsRow.
- `src/components/AgentTeam.tsx` — AgentStatus, AgentRow (role, model,
  task, status, time as props), CreditsProgress.
- `src/components/ui/` — shadcn-style Button (cva + Radix Slot),
  Dialog, Sheet (Radix Dialog, bottom sheet), Tabs, DropdownMenu,
  Slider (all Radix-based).

## Screens (18)

welcome-dark, home-light-en, home-light-cn, chat-dark-lisbon-en,
chat-dark-lisbon-cn, chat-light-train-en, chat-light-savings-en,
chat-dark-kyoto-en, chat-light-router-en, chat-info-sheet,
search-drawer-dark, model-picker-a, model-picker-b, pricing-dark,
credits-light, suspended-light, agent-team-dark, language-light.
Each screen file exports `meta = { id, title, source }` naming the
collage cell it was traced from.

## Structure

```
package.json  vite.config.ts (base './', so file:// screenshots work)
tsconfig*.json  index.html  src/main.tsx  src/App.tsx (gallery + ?screen=)
src/index.css (@import "tailwindcss" + @theme tokens)
src/lib/utils.ts (cn)
src/tokens/index.ts (tokens + modelDotColor + savingsCurvePoints)
src/components/ui/  src/components/  src/screens/
docs/verification/ (screenshots + notes + shot script)
```

## Residual (honest gaps, not approximated as 1:1)

- Picker B Thinking multipliers: not rendered. 8x/10x Lanczos +
  sharpening, per-pixel grey-level analysis, two vision-model passes and
  cross-image comparison all failed to converge on the ~3px glyphs
  (DESIGN-TOKENS.md section 9 lists every method tried). The segmented
  control renders labels only; no multiplier value is invented.
- Font family: unconfirmed. No clean single-glyph sample exists in the
  collages, so the system sans stack (-apple-system / Segoe UI / Roboto /
  PingFang SC / Noto Sans SC) is used as the documented approximation.
- Model dot exact hex: unconfirmable (4-5px dots + JPEG 4:2:0 chroma
  sampling). The measured approximations are used: Claude #b0703c,
  GLM #c65d7b, Kimi #9a9a3e, DeepSeek #5b8a99, GPT #3fa34d.
- Font weights and shadows are visual estimates; there is no clean
  sample to measure them from.
- Scroll position is a snapshot state, not a design parameter. Longer
  screens (train, savings, credits, pricing, agent-team, search-drawer,
  chat-info) have trailing content below the first fold in this
  rendering; it is present in the DOM and reachable by scrolling, the
  same structural behaviour as the muse/ baseline. In particular the
  train screen's third suggestion, the credits Activity row and the
  agent-team Pause/Stop row sit just below the first viewport fold.
- Agent-team inline status dot colours at 3px are not independently
  resolvable; the standing convention is used (Running green, Done
  white, Queued grey).
- Screenshot engine deviation: /opt/meta-chromium/chrome refuses to
  start in this VM without the image-owned WebGL policy supplied by
  browser-daemon (exit 13, "Hatch WebGL domain policy is required for
  browser startup"), both from the CLI and via Playwright. Screenshots
  were therefore taken with Playwright's own stock Chromium headless
  shell (same Blink family) at exactly 390x844, with
  --allow-file-access-from-files so the file:// build loads its modules.
  See docs/verification/notes.md.
```

## Verification notes

```markdown
# Verification — app/medley

Build: `pnpm build` (tsc -b && vite build) passes.
Command run from UIDesign/app/medley; output: 126 modules transformed,
dist/index.html + dist/assets/index-*.css/js, built in ~0.8-0.9s.
No commit, no push (coordinator submits).

Screenshot method: see README Residual (meta-chromium blocked by Hatch
WebGL policy in this VM; Playwright stock Chromium headless shell used
instead, viewport exactly 390x844, file:// build + ?screen=<id>,
--allow-file-access-from-files). Script: shot-screens.cjs in this folder.
Gallery top also captured (gallery-top.png, 1280x900) — components
section and Radix dialog/sheet triggers render correctly.

Per-screen comparison (render vs Doubao collage + muse/ baseline):
- welcome-dark: MATCH. Title, orange dot, sublines, Google + guest
  buttons, footnote all in place; mark renders as traced M.
- home-light-en: MATCH. Auto pill, greeting position, 4 suggestion
  rows, plain-mic input bar.
- home-light-cn: MATCH after fix. Segmented chat/agent switch (Radix
  Tabs), traced M mark, greeting, 4 rows incl. Pro badge, auto-chip +
  black mic input bar. Inactive tab colour corrected to light-sub.
- chat-dark-lisbon-en: MATCH. Top-bar Claude dot + name, user bubble,
  GLM-5 Auto meta, Day 1 bullets, T/L/V + 3 sources chip, 28 credits
  action row, food follow-up bubble, second Claude answer, orange mic.
- chat-dark-lisbon-cn: MATCH. Title "里斯本穷游三天" + 旅行 subline,
  CN bullets with visitlisboa / timeout / +1 tags, "3 个来源 / 28 积分
  1.1 秒 71 tok/s" row, second-day bubble, stop-mic input bar. Third
  bullet wraps (tags occupy the line end) as in the baseline.
- chat-light-train-en: MATCH except fold. Table (4h 30m, fares, bags,
  arrivals), 4 sources chip, 41 credits, suggestions; third suggestion
  ("Add a stop in Montpellier") is in the DOM but sits just below the
  first viewport fold in this rendering (scroll snapshot residual).
- chat-light-savings-en: MATCH except fold. $58,164 card, 16%/44%
  Radix sliders, formula curve + $36,000 dashed line, Balance / Put in
  labels; card footer row sits at the fold edge (scroll snapshot).
- chat-dark-kyoto-en: MATCH. Kimi K3 top bar, weather cards (Sat light
  / Sun dark), timeline, Show map / Add to calendar, poll with Nara
  selected, orange mic input bar.
- chat-light-router-en: MATCH. Router question bubble, safety-switch
  notice card, GPT-6.1 Sol switched meta, 3 bullets, 44 credits.
- chat-info-sheet: MATCH after fix. Dimmed top (Auto pill, single-line
  bubble, "Claude Sonnet 5.5 · Auto" model row fully above the sheet),
  sheet with 210 / 9 / 6 stats, model dots, Tools, Replies grid
  (0.8s / 62 tok/s / 1,240 / 141 / 6 / Medium), footnote. Footnote tail
  is at the fold edge (scrollable sheet).
- search-drawer-dark: MATCH. Search capsule, nav rows incl. "1 running"
  badge, Pinned Thesis outline, 6 recent rows with dots, "About 240
  messages left", Alex + Pro + gear, 62px dim strip on the right. Alex
  row sits at the fold edge.
- model-picker-a: MATCH. Auto Recommended card, Up to Advanced link,
  Everyday / Advanced / Flagship / Frontier sections, all costs
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
```

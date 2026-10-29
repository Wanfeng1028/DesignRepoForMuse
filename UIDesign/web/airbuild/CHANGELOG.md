# CHANGELOG — UIDesign / web / airbuild

Only this set's history. Append-only: never rewrite or delete older entries.
Screenshots for each round live in `docs/verification/rounds/<version>/`.
Visual judge for every round: `qiniu/conatus-free` via BotsRouter
(`https://api.botsarena.tech/v1/chat/completions`), comparing the render
side by side with the real originals (REA table A, the user-photo desktop
crop, App Store iPad/iPhone shots). A round is clean only when the judge
reports zero substantive differences item by item; "looks alike" is not
a pass.

## v1.1 — 2026-10-29

- Round: structural + token corrections against the REA evidence files
  (mockup_window-component.css, mockup_window-template.js, mockup_mockup.js)
  and the real originals (user-photo desktop crop, App Store ipad-01).
  Judge model: qiniu/conatus-free (BotsRouter).
- Diffs fixed (all quantified from the evidence CSS, not from feel):
  - D1 Titlebar: single flex row (48px, full-width bottom border, text
    title, "Preview" label) → 40px three-zone grid matching the body
    columns; sidebar zone (traffic lights + 64×32 control capsule),
    conversation zone (centred 32px squircle project icon), preview zone
    (device tabs + new-tab + 64×32 action capsule); divider only at the
    preview boundary; drawer 620px → 628px.
  - D2 Traffic lights: 12px, gap 8px, inset-only shadow → 17px, gap 7px,
    shadow inset 0 0 0 0.5px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.08).
  - D3 Preview tabs: preview body, 12px font, project-name labels →
    titlebar preview zone, 10px/500 font, device label "iOS 26.5", icon
    12px opacity 0.45, close 9px (opacity 0, 0.3 hover/active), padding
    0 9px, plus 36×36 new-tab button (plus 14px, opacity 0.48).
  - D4 Phone: 210×430, radius 34, 1px border, shadow alpha 0.24,
    top-aligned stage, statusbar 26px 9px/600, appbar 36px → 270px wide,
    aspect 0.51, 7px #d8d8d6 frame, radius 38, shadow alpha 0.14,
    centred stage (padding 6px 24px 14px), statusbar padding 8px 16px 2px
    8px/700, appbar 42px, feed divider inset from left 33px.
  - D5 Project tiles: 2-column grid, gap 8px, emoji glyph + name label →
    3-column grid, gap 6px, icon-only 32px squircle vector mini-icons
    (name in aria-label/title only).
  - D6 Agent rows: generic bio + "Online" text, role colour
    rgba(17,17,15,0.46) → status sentence (8px rgba(0,0,0,0.34)), role em
    rgba(0,0,0,0.4), name/status gap 2px, right-side green ● (8px
    #2ecb70) when online; roles lowercase per the user photo
    (@product / @developer / @design / @gaming / @appstore / @website).
  - D7 Sidebar: section padding 12px 10px 4px, heading colour
    rgba(17,17,15,0.46), margin-bottom 6/4px, footer 3 round buttons →
    container padding 8px 12px 9px, heading margin 0 3px 9px colour
    rgba(0,0,0,0.38), footer grid 1fr auto gap 7px (Account pill +
    Home / Settings / Activity), hairline right border kept.
  - D8 Messages: avatar top-aligned, author em rgba(17,17,15,0.46),
    bubble container max 92% → avatar bottom-aligned (flex-end),
    author em rgba(0,0,0,0.38), agent container max min(84%, 330px).
  - D9 Task card: title/status side-by-side row, track above steps,
    complete dot bg #467458, margin-top 8px, track radius 999 →
    stacked title block, status block (margin-top 3px), steps (gap 8,
    li gap 7, default #a2998c, working #675039 + #c49b65 dot, complete
    #467458 text + #72a682 dot with white ✓ 9px), track below steps,
    radius 3px, margin-top 9px.
  - D10 Typing: dots #11110f, gap 4px, bordered bubble → dots #aaa,
    gap 3px, borderless bubble.
  - D11 Composer: flex, padding 0 4px, inset highlight
    rgba(255,255,255,0.9), transparent attach → grid 24px 1fr 24px,
    padding 3px, inset highlight rgba(255,255,255,0.78), blur(16px),
    attach #ededeb (icon 14px, opacity 0.58), placeholder
    rgba(0,0,0,0.36), text #191919. Send stays blue #1987f7: the web
    demo base CSS says #111 (Shadow DOM: white gradient) but the native
    App Store shots show blue — kept blue per the high-resolution native
    evidence, documented in README residual 9.
  - D12 Toast: font 12px → 11px (position already bottom 30px centred).
  - D13 Avatars: letter-on-tint circles → blob characters (tinted disc +
    lightened blob + two dark eyes); still approximations, see README
    residual 4.
  - D14 Demo copy: paraphrased thread → verbatim iPad Hourtown thread
    (Ato / user / Ato+task / Pluso / Colo / user, 6 messages).
  - D15 Collapsed states: sidebar-collapsed shifted the message stream
    by +174px and preview-collapsed showed a vertical "Preview" strip →
    stream padding stays 16px, titlebar-sidebar becomes a 170px
    transparent overlay with the conversation title compensated 174px;
    preview-collapsed shows a 48px titlebar strip with the toggle and no
    body preview column (0px).
- Self-measurements (code + pixels, not a judge verdict): header-project
  icon centres — main 447px (expected 447), sidebar-collapsed ~432px
  (expected 435), preview-collapsed ~678px (expected 675); toast pill
  centre x=639 vs window centre 640.
- Screenshots: `docs/verification/rounds/v1.1/` (gallery ×3 + three
  window element shots); `docs/verification/shoot-sections.cjs` added
  (same browser + file:// method as shoot.cjs).
- Re-verification verdict: PENDING — judge call 1 returned HTTP OK but an
  empty message body (3443 tokens: 443 prompt + 3000 completion, i.e. the
  model spent the whole budget with no captured verdict text); judge
  call 2 returned HTTP 429 `free_campaign_global_limit` on
  qiniu/conatus-free. Iteration stopped immediately per the rate-limit
  rule: no sleep retry, no model switch. A usable v1.1 judge verdict is
  still outstanding; the next round must start by re-running the judge
  on `docs/verification/rounds/v1.1/window-main.png` against the same
  two real originals, and only then fixing what it lists.


- Baseline delivered 2026-10-29 (initial four-set delivery).
- User verdict: not up to standard, rework required. This file starts the
  rework record; v1.0 is the pre-rework baseline, not an acceptance.
- Known baseline state (from code + screenshots, before any judging round):
  titlebar is a single flex row with a centred text title and a "Preview"
  label; preview tabs sit in the preview body, not the titlebar; traffic
  lights are 12px; project tiles are a 2-column grid with emoji glyphs and
  name labels; agent rows show bio text plus an "Online" text label;
  sidebar footer is three round buttons; the phone preview is 210px wide;
  the task card puts title/status side by side with the track above the
  steps; sidebar-collapsed shifts the message stream by +174px.
- Baseline screenshots: `docs/verification/rounds/v1.0/`.

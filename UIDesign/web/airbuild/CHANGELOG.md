# CHANGELOG — UIDesign / web / airbuild

Only this set's history. Append-only: never rewrite or delete older entries.
Screenshots for each round live in `docs/verification/rounds/<version>/`.
Visual judge for every round: `qiniu/conatus-free` via BotsRouter
(`https://api.botsarena.tech/v1/chat/completions`), comparing the render
side by side with the real originals (REA table A, the user-photo desktop
crop, App Store iPad/iPhone shots). A round is clean only when the judge
reports zero substantive differences item by item; "looks alike" is not
a pass.

## v1.2 — 2026-10-30 (fix round, not a review round)

- Round: fixed every confirmed audit-20261030 item plus a beyond-list
  sweep of the REA table A raw evidence (mockup_window-component.css +
  mockup_window-component.js shadow overrides) and the originals. No
  judge re-run (Q2: not re-run), no preview-window change (Q1 accepted:
  the preview-collapsed FAIL object does not exist in the render;
  Q3: BottomModuleBar stays gallery section 5 only). No commit, no push.
  Judge model: none used this round; verdicts are PIL + DOM measurements
  only, per the rule that measured data, not a verdict, is the pass bar.
- P1 confirmed fixes (before -> after, code token + measured):
  - B10 composer backdrop blur(16px) removed from FollowUpComposer
    (table A has no composer blur item). CONFLICT NOTED, see Unclosed U7:
    base CSS .follow-up actually declares blur(16px); deletion follows
    the task order + table A, flagged for coordinator adjudication.
  - B11 hover added per REA: tile hover white 0.58 + translateY(-1px)
    (DOM computed on hover: rgba(255,255,255,0.58), transform -1px);
    agent-row hover white 0.5 (DOM computed rgba(255,255,255,0.5)).
  - S16 phone shadow alpha 0.14 -> 0.24 (DOM computed box-shadow
    rgba(0,0,0,0.24) 0px 24px 48px; frame still 270x529, 7px #d8d8d6,
    radius 38). Shadow-DOM .iphone rule confirms 0.24 (base CSS alone
    says 0.14 and is overridden in the shadow tree).
  - F01 body text: code already 12px/1.38, no change possible; re-measured
    on v1.2 window-main.png: core rows y94-100, fringe y92-93, cap ~8px,
    estimate 11.1px, identical to v1.1 and inside the audit's own method
    error band (10.0-12.5px). The 11.1 estimate is a fallback-font
    cap-ratio artifact, not a code deviation.
  - P04 project-icon centering: main 447 (unchanged, exact); preview-
    collapsed 680 -> 675 by changing titlebar right padding 48 -> 58px
    (DOM computed icon centre 675 = visible-area centre of [198,1152]);
    sidebar-collapsed 430 unchanged (REA 174px left padding geometry;
    the README 435 expectation ignored the 10px right padding).
- P2 pending-measurement items, all measured and closed except U1-U6:
  - F03 sidebar text (DOM): group title 10px/700, agent name 11px/600,
    status 8px; PIL name glyph band y208-215 matches.
  - F04 (DOM): tab label 10px/500, phone status 8px/700, appbar name
    12px/700, feed name 9px/600 #242426; PIL tab label glyph rows
    y18-25, phone 9:41 glyph band y109-112.
  - F05: VM has no SF Pro font (fc-list empty) -> screenshots remain
    Helvetica Neue / Arial fallback; SF form stays a residual, not
    claimed (see U4).
  - C09 online dot: exact centre pixels (46,203,112) = #2ecb70, 4 dots
    (Ato/Pluso/Camo/Ampo rows), DOM colour rgb(46,203,112).
  - C10 non-active tab: two-tab probe gives bg rgb(247,247,245) =
    #f7f7f5, tab 92x36 / 110x36.
  - B02 capsule gradient: clean rows show brightness rising toward
    bottom-right (top row 230 -> 245, bottom row 242 -> 250),
    consistent with the 325deg token; absolute intensity is small on
    the light sidebar bg, as the audit suspected.
  - B04 attach button: DOM 24x24 at (216,630), bg rgb(237,237,235) =
    #ededeb; PIL interior patches exactly (237,237,235).
  - B05 footer buttons: DOM 36x36 at x67/108/149, y622; narrow-32px
    form has no render in this set (see U2).
  - B07 iPhone send button: NOT measurable from iphone-06. Blue
    clusters y2601-2728 are message-bubble fragments (8 clusters,
    2165-4975px each, x158-832); the strip y2728-2868 is uniform
    (216,224,235) with no blue at all, i.e. no input bar is visible in
    that shot. Render keeps 24px (verified in-window, B03). See U3.
  - B08 window glass: striped-backdrop probe shows stripe swing
    255 -> ~12 units (237 vs 249) through the sidebar stack, i.e. the
    blur is working and strong; radius is not invertible from the
    contrast number, code token blur(34px) saturate(1.24) is exact.
  - B09 inset highlight: at 1x the 1px inset step is within gradient
    noise (top row 231-240 vs mid 233-242, delta under 5 units); code
    token (inset 1px 1px rgba(255,255,255,0.38)) is exact, outer shadow
    is directionally visible at the bottom edge (down to 222). Not
    claimed as pixel-proven inset.
  - S13 tab height: DOM 36px (both tabs in the two-tab probe).
  - S14 resizer: component exists at 8px col-resize but is mounted
    nowhere (DOM resizerMounted false); the original shadow tree also
    hides it (.window-resizer display:none). No visible resizer is the
    correct render; nothing to screenshot. See U1.
  - S15 window radius: dark-backdrop corner arc fits r 17-18px
    (code 18px) within 1px on rows y5-y12; top row reads 12 vs 18
    predicted, attributed to the white inset border line. Consistent,
    not a defect.
  - A03 feed avatar: DOM 26x26 at x832 (rows y273, y322); PIL disc
    left edge x832, exact bg #cdeed9 at x834-836, face pixels inside.
  - I04 phone status glyphs: enlarged crops saved (probes/
    crop-phone-statusbar-4x.png, crop-phone-feed-4x.png); bars +
    battery outlines match the hand-drawn approximation at 8px size;
    pixel-exact glyph match is impossible at this size (see U5).
  - L03 REA 174px: resolved, no code change. REA text says
    sidebar-collapsed gives the conversation 174px left padding; code
    applies exactly that to the titlebar conversation zone. The message
    stream keeps the separate REA stream padding 18px 16px 14px.
- P3 icons + morphing (lucide-react 1.63.0 installed; package.json +
  pnpm-lock.yaml updated):
  - All 19 used icons are now real Lucide components at default
    strokeWidth 2 (Plus, Settings, House, X, ArrowUp, Smartphone,
    CircleUser for the REA person-circle account button, Check,
    MessageSquare, CreditCard, Route, BookOpen, ChartColumn, Share,
    Clock, Coffee, LayoutGrid). Each export was checked against the
    installed package's type declarations before wiring.
  - 10 unused exports deleted (Book, DeviceInbound, LineDecrease,
    ChevronLeft, Dots, Cloud, Hand, Globe, File, Info) plus the unused
    iconMap. DeviceInbound had no single Lucide equivalent and lived
    only in the unused map, so deletion closes the one no-exact-match
    item without inventing a composite icon.
  - Morphing: M01 task step done-check is now a Lucide-check-geometry
    SVG drawn with a 260ms stroke-dashoffset animation (todo -> active
    is a 240ms background/border-color transition); M02/M03 panel
    toggles are Lucide-geometry morph SVGs whose divider line SLIDES
    (240ms drawer easing, left 9 -> 4.5, right 15 -> 19.5, opacity
    1 -> 0.5, rect static). Verified by computed style mid-transition
    (translateX -4.28px, opacity 0.52 at ~110ms) and end state
    (-4.5px, 0.5). M04 Plus -> X stays a future capability (rotate 45
    + scale compensation) with no same-button use today; M05-M08 stay
    future pairs, not built this round.
- P0 decisions (recorded, not asked):
  - Q1 accepted (preview FAIL object absent), render unchanged for
    preview-collapsed; Q3 honoured (no window preview-structure change);
    Q2 honoured (no judge re-run).
  - A01 avatars are now vector-redrawn illustrated figures, one face
    per roster member (Ato green + sprout, Pluso blue open smile,
    Colo amber + freckles, Camo yellow happy-arc eyes, Ampo blue +
    glasses, Leto pink + blush and hair tuft). No letter blocks, no
    official bitmaps. The demo roster has no Qesto member, so no Qesto
    figure is drawn; Leto carries the pink figure.
  - I02 project mini icons unchanged: vs the REA web-model icon tiles
    they are consistent (now Lucide Clock/House/Coffee/LayoutGrid);
    iPad photo tiles are reference only.
  - Q8: round window shots are borderless element captures (no gallery
    chrome); gallery shots keep the device/window frame.
- Beyond-list sweep (REA table A raw evidence vs code; fixed unless
  noted): tab hover #f2f2f0 + active ink label + close 0.3 on
  hover/active (DOM verified: hover bg rgb(242,242,240), close 0.3,
  active colour rgb(17,17,15)); new-tab hover bg rgba(255,255,255,0.52);
  capsule button hover bg rgba(255,255,255,0.22); capsule text #686868
  (was rgba(0,0,0,0.78)); capsule/account/footer/attach/send icons
  unified to opacity 0.72 + drop-shadow per the table A control group
  (footer keeps its specific 0.74 opacity); brightness(1.035) hover on
  strip toggle, account pill, footer buttons, attach and send buttons;
  send hover translateY(-1px); control shadow set to the table A value
  (inset 1px 1px rgba(255,255,255,0.38), 0 3px 8px rgba(0,0,0,0.08));
  footer buttons set to their own table A row (flat rgba(255,255,255,
  0.64), 1px rgba(255,255,255,0.74) border with border-box sizing,
  0 4px 14px rgba(0,0,0,0.045) shadow); sidebar role em rgba(0,0,0,0.4)
  -> muted rgba(17,17,15,0.46); message-author em 0.38 -> muted;
  agent list gap 2 -> 3px; phone dynamic island 56x14 flex item ->
  48x15 absolutely centred (DOM centre x948 = phone centre, was 941,
  7px left); phone appbar padding 0 12px -> 0 13px; phone battery
  16x9/fill 10 -> 16x8 total with 6px fill; message-in keyframes
  translateY(6px) -> translateY(8px) scale(.985) per base CSS.
  Checked and deliberately NOT changed (with reason): sidebar
  horizontal padding stays 12px (base CSS; shadow 9px noted as
  conflict, layout churn on an ambiguous override is not justified);
  conversation bg stays 0.92 and preview stays radial gradient (table
  A + base; shadow flat 0.54/0.36 noted as conflict, likely an embed
  variant); toast bottom stays 30px (table A + base; shadow 16px
  noted); project roster stays the 4 iPad projects (REA lists 8 story
  names, not a sidebar tile count; inventing 4 more icon/tint pairs
  would be fabrication); Save-for-Later card not added (different demo
  conversation; the thread follows REA/ipad-01 verbatim per L10).
- Build: pnpm build passes (tsc + vite, 299.34 kB JS).
- Screenshots: docs/verification/rounds/v1.2/ (gallery x3 + three
  window element shots, all re-shot after the second fix pass);
  probes in rounds/v1.2/probes/ (two-tab, hover-tile, hover-row,
  morph-mid, morph-mid2, dark-bg, stripes, enlarged crops, iphone-06
  bottom crop) and probe/measure scripts (probe.cjs, probe-morph.cjs,
  probe-dom.cjs, probe-dom2.cjs, probe-dom3.cjs, measure.py,
  measure2.py, measure3.py).
- Unclosed items (with measured reason, not skipped):
  - U1 S14 resizer visible measurement: component unmounted everywhere
    and the original shadow tree hides resizers, so there is no visible
    resizer to photograph; code width 8px col-resize is confirmed.
  - U2 B05 narrow-32px footer form: no narrow container exists in any
    layout of this set, so the 32px form has no render to measure;
    default 36px is DOM-verified.
  - U3 B07 iPhone send diameter: unmeasurable from iphone-06 (see P2
    above); render keeps the in-window-verified 24px.
  - U4 F05 SF Pro Rounded form: no Apple device and no SF font on this
    VM; fallback rendering only. Needs an Apple-device screenshot.
  - U5 I04 status glyph pixel match: at 8px the glyphs are only a few
    pixels tall; shapes match, pixel-exact match is not resolvable.
  - U6 B09 inset highlight at 1x: step under 5 units, inside gradient
    noise; code token is exact, needs a 2x/3x render to prove.
  - U7 B10 conflict: base CSS .follow-up declares backdrop-filter
    blur(16px), but table A omits it and the task order says delete;
    deletion was done per the order, but the base-CSS evidence says the
    blur is original. Coordinator decision needed: restore 16px or keep
    deleted. Related shadow-layer conflicts (shared gradient/0 3px 8px
    shadow for composer/attach/send, conversation 0.54, preview flat
    0.36, sidebar padding 9px, toast bottom 16px, tile hover 0.5 in
    shadow vs 0.58 in table A) were all resolved in favour of table A +
    task orders and are listed here so they can be re-opened with one
    decision if the coordinator prefers the shadow layer.

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

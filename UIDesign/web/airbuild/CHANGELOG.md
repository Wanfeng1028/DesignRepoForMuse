# CHANGELOG — UIDesign / web / airbuild

Only this set's history. Append-only: never rewrite or delete older entries.
Screenshots for each round live in `docs/verification/rounds/<version>/`.
Visual judge for every round: `qiniu/conatus-free` via BotsRouter
(`https://api.botsarena.tech/v1/chat/completions`), comparing the render
side by side with the real originals (REA table A, the user-photo desktop
crop, App Store iPad/iPhone shots). A round is clean only when the judge
reports zero substantive differences item by item; "looks alike" is not
a pass.

## v1.5 — 2026-10-30 (round 8: Apple iOS quality polish inside 1:1 fidelity; v1.4 -> v1.5 patch bump)

- Round: user orders 2026-10-30 12:30 / 13:35 / 13:41 / 15:34
  (only results, fix directly, no batches for approval) and 17:44
  (Apple iOS design quality, strictly inside 1:1 fidelity: Apple
  quality means faithfully restoring the original's native details,
  not redesigning to Apple taste), plus the tightened acceptance of
  the same day: 1px level, no small element skipped, multi-point /
  zoned sampling, pixel + DOM cross-check, side-by-side eye
  comparison before delivery. Method is measured_visual_replication
  in full: measure before building, same state at same size, repair
  order geometry -> missing layer -> typography -> cropping ->
  spacing -> motion, before/after values for every repair, a repair
  stays open until the after value matches the reference.
- Zero judge calls this round. Measured data decides. No token was
  fetched, no BotsRouter call was made, no judge verdict is claimed.
- No commit, no push: changes stay in the working tree for the
  coordinator to submit and verify. Build is green (see below).
- Scope: only UIDesign/web/airbuild. No other set, no server
  database, no token, no BotsRouter routing / capability / channel /
  group / pricing / settlement, no X, no other project was touched.
- Baseline: v1.4 screenshots and probes in
  docs/verification/rounds/v1.4/. New evidence in
  docs/verification/rounds/v1.5/ (gallery x3, three window shots,
  phone-stage probe, side-by-side v1.4 vs v1.5 composite, stripe
  before/after, corrected probe v15b, DOM regression probes, zone
  measurements before/after/final, collapsed-state probe).
- Reference rule unchanged: REA table A is the main source; where
  base stylesheet and Shadow DOM override layer disagree, shadow
  wins (v1.3 D1). User-photo desktop crop is structure reference
  only, never a pixel baseline. Marketing dark (#141414 / #202020)
  and chat light glass are never mixed in one comparison.

### Quality / polish table (original value vs before value vs after value)

1. Phone statusbar wifi icon (geometry, missing layer). Original:
   .phone-status-icons is flex, gap 3px, signal 11x8, wifi 11x7,
   battery 16x8, group total 44px wide. Before: signal + battery
   only, group 31px wide at page (1069,415), wifiPresent false.
   After: custom 11x7 WifiMark redraw (three arcs + dot, stroke
   1.2, round caps; documented as custom, not a Lucide export,
   because Lucide Wifi is a square 24x24 while the original status
   icon is a wide 11x7 crop) inserted between signal and battery,
   group now page (1056,415) 44x8, wifiPresent true, battery
   unchanged page (1084,415) 16x8, island unchanged page (964,406)
   48x15, phone unchanged page (853,392) 270x529. Status group
   structure now matches the original: outer gap 3px, signal
   subgroup (bars 3px wide, heights 4/6/8, gap 1px, bottom-aligned
   internally), wifi wrapper 8px tall centred, battery marginLeft
   removed (gap now handles it). Eye check at 2x: signal bars +
   wifi arcs + battery all visible in the statusbar, correct order.
   Residual: wifi glyph form is a redraw approximation (stroke
   1.2 vs raster about 1px at 11x7); see residual R14.
2. Titlebar sidebar inset highlight (missing layer). Original
   shadow rule: background + box-shadow inset -1px 0
   rgba(255,255,255,0.42) on both .titlebar-sidebar and .sidebar.
   Before: body sidebar had it, titlebar sidebar zone had only the
   border-right hairline and box-shadow none. Pixel proof before,
   titlebar row y20: x196 = (232,233,232) plain sidebar background,
   x197 = (223,225,223) border, x198+ conversation. Body row y300
   for comparison: x196 = (242,242,242) inset highlight, x197 =
   (223,223,223) border. After: titlebar sidebar zone (non-collapsed
   only) carries box-shadow inset -1px 0 rgba(255,255,255,0.42);
   DOM reads rgba(255,255,255,0.42) -1px 0px 0px 0px inset, identical
   to body sidebar. Pixel after, titlebar row y20: x196 =
   (241,242,241) inset present, x197 = (224,225,223) border, x198+
   conversation (245,245,244). The titlebar inset reads 1 level
   below the body inset (241 vs 242); DOM values are identical and
   the 1-level gap is border-edge antialiasing, recorded as
   residual R18, not hidden. Collapsed overlay titlebar zone
   stays box-shadow none, per the shadow collapsed rule (verified
   in the collapsed probe).
3. Icon drop-shadow scope (material). Original base shared icon
   rule gives opacity 0.72 + drop-shadow(0 1px 0
   rgba(255,255,255,0.52)), but the later shadow override sets
   filter none for window-control, header-action, preview-sidebar,
   account, footer-action, attach, send, preview-tab and phone-logo
   icons (light mode default none; the invert(1) value in theme.css
   applies only under dark site theme), and re-applies the
   drop-shadow + opacity 0.72 only for .phone-appbar button.ui-icon
   via --mockup-phone-icon-filter. Before: all control icons
   including capsule, bright toggles, account, footer, attach and
   send carried the drop-shadow. After: drop-shadow removed from
   capsule-button icons, both bright-toggle icons, account icon,
   all three footer icons, attach icon and send icon; DOM filter
   reads none for all of them. Phone-appbar icons keep
   drop-shadow(rgba(255,255,255,0.52) 0px 1px 0px), verified by DOM.
4. Window backdrop material (build defect, missing layer). Original:
   background rgba(244,246,244,0.42) + blur(34px) saturate(1.24).
   Before: source index.css declared both backdrop-filter and
   -webkit-backdrop-filter for .ab-window, but the built CSS kept
   only the -webkit- declaration (Tailwind/Lightning drops the
   unprefixed twin when both are declared in one rule); headless
   Chromium computed backdrop-filter none and
   -webkit-backdrop-filter empty, so no blur rendered at all.
   Stripe proof before: black/white 60px stripes behind the window
   showed a perfect 1px step at screenshot x19-20 and x79-80 on
   rows y500 and y600 (172 -> 237, zero transition pixels).
   After: .ab-window div carries inline backdropFilter and
   WebkitBackdropFilter from tokens.windowFilter (blur(34px)
   saturate(1.24)), bypassing the stylesheet minifier; the
   stylesheet rule is kept as the -webkit- fallback and a comment
   in index.css explains the build behaviour. DOM after: inline
   backdrop blur(34px) saturate(1.24), computed backdrop identical
   (was none). Stripe proof after: rows y500 and y600 across x0-120
   now read a smooth gradient (208 -> 214 -> 196 across the stripe
   period) instead of the flat 172 / sharp step / 237 pattern; 1px
   edge profile x12-29 now reads 208,209,209,209,209,209,210,210,
   210,210,211,211,212,212, a gradual ramp versus before 172 flat
   then a single jump to 237 at x20. Blur is now actually rendering
   in this browser. Note: in headless Chromium the inline
   webkitBackdropFilter reads back empty because Chromium aliases
   it to the unprefixed slot, but the computed unprefixed value is
   correct and the stylesheet -webkit- remains for older Safari.
   Correction: the v1.2 stripe-swing observation is explained by
   alpha compositing alone, not proven blur, and is not relied on
   here; only the v1.5 stripe before/after pair proves blur.
5. Window line-height (typography). Original has no preflight, so
   unspecified texts render at font-natural line-height. Before:
   built CSS html line-height 1.5 inflated every unspecified text
   (feed name 13.5px for 9px x 1.5, feed text 12px for 8px x 1.5,
   agent name 16.5px, agent status 12px, author 15px, tab label
   15px, window/body 24px for 16px x 1.5). Bubbles (16.56px =
   12 x 1.38) and composer input (16px) were already explicit and
   correct. After: .ab-window carries line-height normal, so window
   texts render at font-natural line-height like the original;
   DOM window line-height reads normal (was 24px), body line-height
   stays 24px (gallery outside the window keeps Tailwind 1.5).
   Explicit line-heights are unaffected. Cross-context consistency
   fix (no window pixel change, verified): the same normal value
   is now set explicitly on AgentMessage author, AgentRow name +
   status, TaskCard container, and PhonePreview statusbar time,
   because those components also render outside .ab-window in
   gallery sections 3 / 4 / 5, where they previously inherited
   Tailwind 1.5 and rendered 2px looser than inside the window.
   Proof the addition is window-neutral: probe-v15b values are
   identical before and after the addition, and a full-window pixel
   diff between the two builds shows only 133 pixels, all inside
   the task card dots column (72 of them are the pulsing active
   dot, amber (197,156,103) -> (213,183,143), max channel delta 40,
   i.e. 700ms pulse phase at two screenshot times; the rest are
   1-level done-dot / card-edge rounding). Zone measurements on
   the final window are identical to the after measurements.
   Glyph-band proof of the line-height fix: sidebar Ato name band
   y162-169 (8 rows) before -> y164-171 (8 rows) after, +2px down,
   height unchanged; feed Ato name band y278-283 (6 rows) before
   -> y279-284 (6 rows) after, +1px down, height unchanged. Both
   shifts are the tightened block recentring toward original
   normal geometry, not a layout break.
6. Feed line-heights (typography). Original specified values: name
   1.25, text 1.3. Before: name 13.5px (9px x 1.5), text 12px
   (8px x 1.5). After: name span lineHeight 1.25 -> DOM 11.25px,
   text span 1.3 -> DOM 10.4px, time span 1.4 (original specified).
   Agent name/status, author and tab label line-heights now read
   normal (were 16.5px, 12px, 15px, 15px).
7. Divider / separator alignment (spacing / gallery). Original
   shadow hairline is rgba(17,17,15,0.045); base value 0.22 is out
   per v1.3 D1. Before: index.css --color-ab-divider was 0.22 and
   the gallery Separator computed rgba(17,17,15,0.22), while
   tokens.ts divider was already hairline 0.045 and all window
   dividers were hairline. After: theme variable 0.045, Separator
   background rgba(17,17,15,0.045); DOM separator now reads
   rgba(17,17,15,0.043) (0.045 x 255 = 11.475 rounds to 11/255 =
   0.043, 8-bit alpha rounding, not a deviation; it appears
   consistently on all hairlines). Window dividers unchanged.
   Note: the built CSS drops unused theme variables, so the theme
   variable itself may not appear in built output; the DOM
   separator value is authoritative.
8. Titlebar transitions (motion). Original base CSS: titlebar
   grid-template-columns 240ms drawer easing, titlebar-conversation
   padding-left/right 240ms drawer easing (+ border-color 160ms).
   Before: decomposed computed transitions were all / 0s / ease,
   i.e. no animation. After: titlebar container transition
   grid-template-columns 240ms cubic-bezier(0.32,0.72,0,1);
   conversation zone transition padding-left, padding-right
   240ms with the same drawer easing. Collapsed-state DOM checks
   confirm the transitions do not change collapsed geometry
   (collapsed titlebar paddings 4px 48px 0px 10px and
   4px 10px 0px 174px unchanged, see regression section).
9. Tab close transition (motion). Original: opacity 120ms ease.
   Before: 0s. After: close span transition opacity 120ms ease,
   in Titlebar and in PreviewTabs (PreviewTabs is currently unused
   by AppWindow but kept correct for hosts).
10. Tile / row hover transitions (motion). Original .project-tile:
    background 140ms ease, border-color 140ms ease, transform 140ms
    ease. Before: tile was background, transform / 0.15s, 0.15s.
    After: tile transition background, border-color, transform /
    0.14s x3 / ease. Original .agent-row: no transition, hover is
    instant. Before: row was background / 0.15s. After: row
    transition removed entirely (DOM reads all / 0s / ease, i.e.
    none).
11. Toast enter (motion). Original toast transition: opacity 180ms
    ease, transform 180ms ease, from translate(-50%,10px) to
    translate(-50%,0). Before: toast animation none, transition 0s.
    After: toast div carries class ab-toast-in; keyframes ab-toast-in
    from opacity 0, translate(-50%,10px) to opacity 1,
    translate(-50%,0), animation 180ms ease both. DOM after: toast
    animation ab-toast-in / 0.18s / ease (was none), backdrop still
    blur(18px). Built minifier renders the final keyframe as
    translate(-50%), which is equivalent (Y defaults to 0).
    Screenshots at 1200ms show the final state. Toast background
    row y630 x555-645 step 10: flat (46,46,46)-(47,47,47) before ->
    flat (47,47,47) after; the centre-row value changes in the same
    measurement are white antialiased toast text glyphs on the dark
    pill, not background. Toast centre page x640 = window centre,
    exact, unchanged.
12. Reduced motion (motion, base CSS). Original
    @media (prefers-reduced-motion: reduce) rule (all animations /
    transitions to 0.01ms, single iteration) was missing. After:
    added to index.css. No effect on normal-mode screenshots.
13. Traffic-light cursor (native feel). Original traffic lights are
    buttons with cursor pointer. Before: computed cursor auto.
    After: .ab-traffic-light cursor pointer; DOM reads pointer.
    Screenshots unchanged.
14. Gallery Button primitive backdrop (deliberately NOT changed,
    with a wording correction). The original shared-control list is
    window-control-group, header-action-group, bright,
    account-button, sidebar-footer-action, follow-up, attach, send,
    phone-appbar button. The gallery Button primitive is not in
    that list (v1.4 CHANGELOG wording that included it was
    overstated, corrected here). It is gallery presentation, not an
    original screen (v1.3 U9), and its backdrop computes none;
    changing it would be invention for gallery chrome. No code
    change; only this correction.
15. Re-verified v1.4 colour items, all still in place (no regression):
    user blue #1987f7; window glass params; task card #fffaf2 /
    track #e9e0d4 / fill #72a682; toast rgba(18,18,18,0.88);
    traffic-light colours; online green #2ecb70; avatar discs Ato
    #97c151, Pluso #52ccdb, Colo #855dfe, Camo #f9d01f, Ampo
    #4db7da, Leto #f8ad43 (pink belongs to Qesto, not in this
    roster); capsule gradient 325deg 2-stop shadow form; capsule
    icon ink #11110f; shared icon colour #686868 and opacity 0.72;
    composer backdrop blur(4px) saturate(1.45); window 1200x668,
    radius 18px, three columns 198 / 696 / 1200, preview boundary
    at 58% (window x696).

### Multi-point / zoned sampling tables (tightened rule 3)

- Sidebar pad strip x4, all y: flat (232,233,232) before and after,
  unchanged.
- Conversation right strip x688, all y: (245,245,243) before ->
  (245,245,244) after, a 1-level B-channel shift, recorded as
  residual R19 (see below). Conversation titlebar zones x350/x600
  show the same +1 B shift. Preview strip x720 unchanged
  (242,242,240).
- Capsule interior, four corners: NW (237,238,238) -> (238,238,238),
  NE unchanged (244,245,245), SW (241,241,242) -> (240,241,241),
  SE (248,248,248) -> (248,249,248); divider top still
  (216,217,217), divider bottom (245,246,245) -> (246,246,246).
  Gradient direction (SE brightest, NW darkest, about 10-11 level
  spread) preserved within 1 level.
- Titlebar sidebar edge y20: x196 (232,233,232) -> (241,242,241)
  (inset now present, body sidebar 242 within 1 level), x197
  (223,225,223) -> (224,225,223) (border, within 1 level), x198+
  conversation (245,245,243) -> (245,245,244).
- Body sidebar edge y300 unchanged: x196 (242,242,242) inset,
  x197 border, x198+ conversation. Titlebar divider y20 unchanged
  except the same +1 B shift: x696 (232,233,230) -> (232,233,231).
  Conversation border y300: x695 (235,235,233) -> (236,236,235),
  within 1 level.
- Toast background row y630: flat (47,47,47) after (see item 11).
- Avatar discs, phone frame top, phone tile edge, feed divider
  inset, user-blue bbox: unchanged in the diff except the file-size
  line and the user-blue bbox top y164 -> y160 (4px shift,
  consistent with the line-height change tightening message blocks;
  blue pixel count 19213 -> 19216, bbox x369-678, y-653 unchanged
  otherwise; the centre sample still reads task-card colour
  (255,250,242) because the centre point falls on the task card,
  not on blue; the bbox itself is the blue evidence).
- Feed divider: y313 hairline (245,245,245), inset starts exactly
  at x865 (x860-864 white 255, x865+ hairline), i.e. phone left
  813 + 7 border + 12 padding + 33 = 865. Feed Ato avatar at window
  (845,289) reads exact disc colour (151,193,81).
- Window corner radius, re-measured in v1.5 (1px level): top row
  y0 transition at x12-14, y1 at x10-12, y2 at x8-10, y5 at x4-6,
  y10 at x0-2, y17 at x0 with traffic light at x14-26. All arc
  points match circle radius 18 centred at (18,18) within 1px
  (predicted x at y5 is 5.55, at y10 is 1.88, at y17 is 0.03).
  Traffic light at y17 reads (255,95,87) centre, (244,91,84) edge.
- Stripe backdrop zones, before vs after: see item 4. Before: flat
  172, sharp 1px step to 237 at x20 and x80. After: smooth gradient
  208 -> 214 -> 196 across the stripe period, no step anywhere.

### Pixel + DOM cross-check (tightened rule 4)

- Every fix above has both a DOM/computed value and a pixel value,
  and they agree: titlebar inset (DOM box-shadow inset -1px white
  0.42 AND pixel x196 241/242), icon filters (DOM filter none /
  phone drop-shadow AND gradient pixel spread unchanged within 1
  level), window backdrop (DOM computed blur(34px) saturate(1.24)
  AND stripe gradient ramp), line-heights (DOM 11.25px / 10.4px /
  normal AND glyph bands +2px / +1px), divider (DOM 0.043 AND
  hairline pixel (245,245,245) on feed divider), transitions (DOM
  0.24s / 0.12s / 0.14s / 0.18s AND collapsed geometry unchanged),
  toast (DOM animation 0.18s AND flat 47 background), traffic
  cursor (DOM pointer), wifi (DOM group 44x8 AND phone-stage eye
  check), icon centres (DOM 487 / 470 / 720 AND pixel geometry
  unchanged). No item was passed on a single channel.
- Hairline rounding: 0.045 x 255 = 11.475 rounds to 11/255 = 0.043;
  this is 8-bit alpha rounding, not a deviation, and it appears
  consistently on all hairlines.
- 1-level shifts after the backdrop fix (conversation B +1,
  capsule corners +/-1, toast 46 -> 47, border columns +1) are
  explained by saturate(1.24) now actually applying to the window
  backdrop (previously it was ignored, so no saturate ran); tokens
  are unchanged (DOM background values identical before/after).
  They are recorded as residual R19, not averaged away.
- Probe-script note: the first v1.5 probe (probe-v15.cjs) had
  selector bugs (feed-name finder returned the container span at
  16px, online-dot index and tab-close index were off by one).
  Its outputs for those three items are superseded by the corrected
  probe-v15b.cjs (probes/probe-before.txt vs probe-before2.txt /
  probe-after.txt). Do not reuse the buggy numbers.

### Regression probes (v1.4 scripts re-run against the new dist)

- probe-dom.cjs and probe-dom2.cjs re-run: diff against the v1.4
  records is EMPTY. Every v1.4 DOM value is unchanged: window rect,
  sidebar padding/background, conversation background/border,
  titlebar backgrounds/padding, divider, toast bottom + backdrop,
  composer background/border/shadow/backdrop, attach/account/footer,
  tile idle, phone rect/shadow, device shadow, appbar rects, feed
  name colour, phone tile rect/svg, icon centres, tile hover,
  row hover, share SVG 11x11, toggle SVG 17, feed text/time colours
  and sizes, heading spans absent, agent small colour, task border
  hairline, todo step colour rgb(136,117,94), new-tab icon opacity
  0.48, collapsed conversation paddings, typing 0.8s infinite
  alternate, active dot 0.7s ease-in-out infinite alternate, task
  fill width 0.45s ease. The only changes versus v1.4 are the
  intentional v1.5 items above.
- Collapsed-state probe (probe-collapsed.cjs): sidebar-collapsed
  titlebar sidebar zone box-shadow none, background transparent,
  rect 170x40; preview-collapsed strip toggle icon filter none,
  backdrop blur(4px) saturate(1.45); icon centres 487 / 470 / 720
  unchanged; collapsed window rects 1200x668 at page x40.

### Eye comparison (tightened rule 5)

- Side-by-side composite probes/side-by-side-v14-v15.png (2400 wide:
  v1.4 window-main left, v1.5 window-main right, same size, full
  screen) read at full size, plus v1.5 window-main,
  window-sidebar-collapsed, window-preview-collapsed,
  probes/phone-stage.png, phone-crop-2x.png, and gallery-1280.png.
- Visible differences between v1.4 and v1.5, then measured: (a)
  phone statusbar now shows the wifi icon between signal bars and
  battery (was missing; measured group 31px -> 44px); (b) sidebar
  agent name glyphs sit about 2px lower (measured band +2px) and
  feed name glyphs about 1px lower (measured band +1px), both from
  the line-height fix, with no row-height or layout change; (c)
  user-blue bbox top moved 4px up (measured y164 -> y160) from
  message-block tightening; (d) no other visible difference:
  three columns, traffic lights, capsules, centred project icon,
  iOS tab, share capsule, phone tiles and feed, task card,
  composer, toast all present and unchanged in form. Collapsed
  windows show no visible change except the same text-block
  tightening and the toast animation final state. Gallery full
  page: all sections 1-7 present, no overflow, no missing element;
  sections 3 / 5 standalone messages and agent rows are now tighter
  (normal line-height, matching the window), section 6 separator is
  now visibly fainter (hairline).
- User-photo structure comparison (already done, unchanged): left
  member column (Leto / Ampo / Camo / Colo / Pluso / Ato with
  avatars and lowercase @roles), centre chat with a central card,
  right service column (AirFeedback / AirPayment / AirRouter /
  AirKnowledge / AirTraffic). Structural match only. Known variant
  difference, not a fix item: the photo's right column is service
  modules, while this set's window right column is the phone
  preview per the web demo; the service column is shown separately
  in gallery section 5 and via AppWindow showServiceColumn. The
  "Save for Later" card belongs to a different demo conversation
  and was deliberately not added (v1.2 decision).
- Phone morphology comparison (web-demo template + App Store phone
  shots, morphological not verbatim because states differ):
  statusbar (time, island, signal, wifi, battery), appbar (gear,
  mark, menu), project tiles (71x71, 44x44 icons), feed rows (48px,
  26px avatar, 9px/600 name, 8px text, 6.5px time, divider inset
  33px) all match the template forms; statusbar wifi is now
  complete.

### Full rescan residual count (v1.5)

- 15 polish items closed this round (items 1-13 above, plus the
  cross-context line-height consistency addition and the gallery
  Button wording correction). The round is NOT clean: 21 residuals
  remain (R1-R21), numbered below with numbers, none hidden behind
  a clean label.
- R1 SF Pro Rounded glyph form unverifiable on this platform (VM
  fonts are Noto/DejaVu only, no SF Pro, no SF Pro Display, no
  Helvetica Neue; macOS bundle contains no font files, system font
  is platform-provided, not bundled). Token font stack matches base
  CSS --font exactly ("SF Pro Rounded", "SF Pro Display",
  -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif);
  index.css --font-sans adds Arial after Helvetica Neue, which on
  Apple devices is never reached (SF resolves first) and on this VM
  is also absent, so it has zero visual effect. Fallback rendering
  sizes are reported, never claimed as the original font.
- R2 Avatar faces are redrawn geometry (disc colours measured
  exact, faces not pixel-matched) - v1.4 U3 carried.
- R3 Project tiles stay vector mini-icons on flat tints (originals
  are photo/illustration covers) - v1.4 U1 carried.
- R4 Service-column background stays rgba(249,249,247,0.92)
  (user-photo right column unreadable) - v1.4 U2 carried.
- R5 Gallery backdrop stays flat #ececea, not the marketing page's
  colourful gradient - v1.4 U4 carried.
- R6 Native iPad differences stay as platform gaps (native task
  card white with "View task >" link and no track, native tiles
  with name pills, native coloured status text) - v1.4 U5 carried.
- R7 Send stays blue #1987f7 per high-resolution native evidence,
  against the web demo's gradient/black variant (README residual
  9, deliberate platform choice, not a web-demo match) - v1.4 U7.
- R8 Dark mode unrendered (light only, table B reserve only) -
  v1.4 U8 carried.
- R9 Preview/sidebar collapse motion path differs: original preview
  slides translateX(24px) + fades while the grid collapses; this set
  collapses the grid and unmounts the column. End states identical
  (DOM + screenshots), mid-state differs - v1.3 U12 carried, because
  rebuilding the collapse state machine risks breaking DOM probes
  and toggle behaviour for a mid-state-only gain. Titlebar/body
  grid transitions now match the original (item 8); only the column
  content slide/fade path is still missing.
- R10 Device-tab switch animation (220ms cubic-bezier(.2,.8,.2,1))
  and tablet phone form (.iphone.tablet, aspect 0.72, radius 28px)
  not implemented: preview stays phone even when the iPadOS tab is
  active. Evidenced in base CSS, unobservable in current gallery
  (no tablet render path), recorded not invented.
- R11 Project-icon swap animation (180ms ease-out) not implemented:
  no project switcher UI in the gallery to observe it, project is
  fixed by prop.
- R12 Titlebar focus-visible ring (original header is tabindex=0
  with an inset focus ring) not implemented: adding tab order to
  the gallery titlebar would be a behaviour invention, keyboard-
  only, invisible in screenshots.
- R13 Phone battery fill: outer 16x8 exact, inner fill 6px wide x
  6px tall via top/bottom 1px insets, versus base CSS 6x8 for the
  fill SVG whose internal padding is unknown. Neither value is
  provable from the SVG internals (figma SVGs not in the evidence
  bundles), so the existing iOS-like inset fill stays.
- R14 Phone status glyphs are hand redraws: signal bars exact
  boxes, wifi custom 11x7 redraw (stroke 1.2 vs raster about 1px),
  battery box exact. Pixel-exact glyph match is not resolvable at
  8px from raster evidence alone.
- R15 Clover mark + device-inbound + line-decrease custom morphs
  (not Lucide exports, geometry per audit) - v1.3 U11 carried.
- R16 Desktop body copy comes from the iPad thread, not verbatim
  desktop (user photo unreadable) - v1.3 U13 carried.
- R17 Gallery chrome (header, section notes, token swatches,
  primitives, bottom bar adapted) is not original - v1.3 U9 carried;
  bottom module bar stays labelled as adapted, never claimed as
  original 1:1.
- R18 Titlebar inset pixel 241 vs body inset pixel 242 (delta 1
  level, border-edge antialiasing; DOM box-shadow identical).
- R19 Post-backdrop 1-level compositing shifts (conversation B
  243 -> 244, capsule corners +/-1, toast 46 -> 47, border columns
  +1), explained by saturate(1.24) now actually applying; tokens
  unchanged, DOM backgrounds identical.
- R20 Online dot stays a text glyph (original template uses <b>
  with the dot character at 8px, green; rendered box in fallback
  font is 5x8, font-dependent, not a code deviation).
- R21 Resizer drag physics + message playback timing are host
  contracts (v1.3 U8 carried). Assets.car values remain unmeasured
  (no Linux reader, recorded as unmeasured, never fabricated).
  Original raster icon pixel forms at 8px, original SVG internals
  for battery fill, desktop verbatim body text, and dark-mode
  rendering remain unmeasured for the reasons above.

### Unmeasured list

- SF Pro Rounded glyph form (R1); Assets.car values; original
  raster icon pixel forms at 8px; original SVG internals for
  battery fill; desktop verbatim body text; dark-mode rendering;
  tablet form rendering (no tablet render path in the set);
  project-icon swap mid-state (no switcher UI); titlebar focus
  ring rendering (keyboard-only, no tab order in gallery).

### Build

- /home/hatch/.npm-global/bin/pnpm build -> tsc -b && vite build,
  1978 modules, pass. Final hashes: dist/assets/index-DWi3W9ds.css
  (16.81 kB) and index-BQbiEKLB.js (304.20 kB). Built CSS confirms
  .ab-window line-height normal, .ab-traffic-light cursor pointer,
  ab-toast-in keyframes, and the reduced-motion rule. Final
  screenshots were shot against this build; probe-v15b values are
  identical before and after the cross-context line-height addition.

### Files changed (working tree, uncommitted)

- README.md (tokens paragraph divider 0.22 -> hairline 0.045 with
  note "Shadow layer; base 0.22 out, v1.3 D1").
- src/components/AppWindow.tsx (window inline backdropFilter +
  WebkitBackdropFilter).
- src/components/Titlebar.tsx (sidebar inset, grid transition,
  conversation padding transitions, tab close transition, capsule
  icon filter removal).
- src/components/Sidebar.tsx (tile transition 140ms trio, agent
  row transition removed, bright-toggle + footer icon filter
  removal, agent row name/status line-height normal).
- src/components/FollowUpComposer.tsx (attach + send icon filter
  removal).
- src/components/Preview.tsx (WifiMark, status group restructure,
  feed line-heights 1.25 / 1.3 / 1.4, statusbar time line-height
  normal, PreviewTabs close transition, phone-appbar icons keep
  drop-shadow).
- src/components/Message.tsx (author + task card line-height
  normal).
- src/components/Toast.tsx (ab-toast-in class).
- src/components/icons.tsx (WifiMark export).
- src/components/ui/separator.tsx (hairline background).
- src/index.css (window line-height normal, traffic cursor,
  toast keyframes, reduced-motion rule, window backdrop comment,
  divider theme variable 0.045).
- docs/verification/rounds/v1.5/ (new evidence directory, see
  header of this entry).

## v1.4 — 2026-10-30 (round 7: same-type colour check + full active re-scan; v1.3 -> v1.4 patch bump)

- Round: same-type colour check (work one) first, then a full active
  re-scan of every screen and every visible element (work two). No
  judge call this round (zero-judge rule): every fix below is grounded
  in an original code token (base stylesheet vs Shadow DOM override
  layer, shadow wins per v1.3 D1) or a pixel sample from an original
  image. No token was fetched, no BotsRouter call was made. No commit,
  no push: changes stay in the working tree for the coordinator.
  Composer backdrop is UNCHANGED at blur(4px) saturate(1.45) (DOM-verified
  after all edits); it was not flipped back to blur(16px) or deleted.
- Work one — colour check table. Original value = pixel sample or
  Shadow DOM token; before = v1.3 render; after = v1.4 DOM/pixel value.
  Positions are the elements the values sit on.
  - Avatar discs (sidebar rows, message avatars, phone feed): original
    discs are SATURATED, v1.3 rendered pale tints. ipad-01 sidebar discs
    (scan_ipad.py + mean_colors.py, 2064x2752 shot): Pluso mean
    (82,204,219) #52ccdb, Camo (249,208,31) #f9d01f, Ato green-only mean
    (151,193,81) #97c151, Ampo (77,183,218) #4db7da, Leto (248,173,67)
    #f8ad43; REA roster portraits: Colo purple mean (133,93,254)
    #855dfe, Leto coral mean (254,138,93) (same orange family as the
    ipad disc), Qesto pink (249,101,195) (not in this roster).
    Before: Ato #2f7d4f on #cdeed9, Pluso #0b6fa4 on #cdeaff, Colo
    #b45309 on #ffe4c2, Camo #92400e on #fde68a, Ampo #1d4ed8 on
    #dbeafe, Leto #be185d on #fbcfe8 (pale disc + lightened blob).
    After: disc = measured colour itself, no pale disc, no blob patch
    (DOM row-avatar fill #97c151; render sidebar-strip histogram shows
    all six saturated families present). Wrong-family corrections:
    Leto pink -> orange (pink belongs to Qesto), Colo amber -> purple
    (REA portrait dominant + ipad-01 Colo message avatar purple disc),
    Camo dark brown -> golden yellow.
  - Shared floating-control gradient (capsules, composer, attach,
    account, footer, phone appbar buttons, Button primitive): original
    Shadow DOM gradient is 2-stop, v1.3 shipped the base 3-stop form.
    Before: linear-gradient(325deg, rgba(255,255,255,0.78),
    rgba(255,255,255,0.48) 48%, rgba(245,247,250,0.24)). After:
    linear-gradient(325deg, rgba(255,255,255,0.78),
    rgba(245,247,250,0.24)) (DOM backgroundImage on capsule, composer,
    attach, account, footer, appbar buttons). Angle 325deg unchanged.
  - Shared-control backdrop (same elements): original shared block
    blur(4px) saturate(145%), untouched by the shadow layer; v1.3 had it
    only on the composer. Before: none on capsules/toggles/account/
    footer/appbar/attach. After: blur(4px) saturate(1.45) on all of them
    (DOM backdropFilter). Composer backdrop unchanged.
  - Capsule inner-button icon colour (window-control + action-group
    buttons): original shadow ink rule, v1.3 used shared #686868.
    Before: #686868. After: #11110f (DOM color rgb(17,17,15)). Bright
    toggle, account, footer, phone-appbar buttons stay #686868 per the
    shared list (shadow ink rule does not cover them).
  - Preview tab inactive text: original shadow muted, v1.3 base 0.48.
    Before: rgba(0,0,0,0.48). After: rgba(17,17,15,0.46) (DOM, measured
    on the inactive tab after adding a second device tab; active tab
    stays ink #11110f on transparent).
  - New-tab button text: original shadow muted, v1.3 base 0.5. Before:
    rgba(0,0,0,0.5). After: rgba(17,17,15,0.46) (DOM).
  - Phone project-tile border: original shadow hairline, v1.3 base
    #e7e7e7. Before: 1px solid #e7e7e7. After: 1px solid
    rgba(17,17,15,0.045) (DOM 0.043 after rounding).
  - Phone feed divider: original shadow hairline, v1.3 base
    rgba(60,60,67,0.08). Before: rgba(60,60,67,0.08). After: hairline
    (DOM 0.043 after rounding). Inset from left stays 33px.
  - Task card working-step text: original shadow #53412e (same as the
    title), v1.3 base #675039. Before: #675039. After: #53412e (DOM
    rgb(83,65,46)).
  - Composer input text / placeholder: original shadow ink / muted,
    v1.3 base #191919 / 0.36. Before: #191919 / rgba(0,0,0,0.36).
    After: #11110f / rgba(17,17,15,0.46) (DOM, placeholder via
    ::placeholder computed style).
  - User blue bubble: VERIFIED, NOT changed. ipad-01 user-bubble blue
    bucket (0,128,240) + REA token #1987f7 both match the shipped
    #1987f7 (render histogram top bucket (16,128,240), 18483px).
  - Window glass: bg rgba(244,246,244,0.42) + blur(34px) saturate(1.24)
    VERIFIED unchanged (tokens + DOM). Window outer shadow: original
    shadow layer says box-shadow none (base had a 28px/80px shadow +
    white border); v1.3 shipped an invented 0 24px 64px shadow + inset
    white ring. After: box-shadow none (DOM), border none (unchanged).
    Window edges still read in screenshots via the zone bg steps.
  - Colour items checked and deliberately NOT changed (no evidence for
    a change): project-tile tints (originals are photo/illustration
    covers, not tints — vector minis stay, see unclosed U1); service
    column bg (user-photo right column unreadable — see U2); brand
    glyph / clover mark (redrawn vector, no colour sample contradicts
    it); traffic-light colours (match base tokens); online green
    #2ecb70 (matches REA token); task-card #fffaf2 / track #e9e0d4 /
    fill #72a682 (match shadow values); toast rgba(18,18,18,0.88)
    (matches base + shadow).
- Work two — full active re-scan fixes (each re-measured, not carried
  from an old list):
  - Sidebar section headings REMOVED. Evidence: the official template
    contains no heading elements (0 occurrences of `sidebar-heading`
    in mockup_window-template.js, none injected by mockup_mockup.js),
    and the ipad-01 left column shows tiles then agent rows with no
    heading rows. v1.3 rendered PROJECTS / AGENTS heading rows styled
    from the unused CSS class. After: project grid and agent list are
    direct sidebar children (aria-labels "Projects" / "AI team" kept
    from the template), agent list margin-top 9px per base CSS, footer
    still pinned to the bottom. DOM: no "Projects"/"Agents" spans in
    the window (probe headingSpansInWindow 0; probe-dom2 headingColor
    MISSING, expected). Screenshots: rows move up, footer unchanged.
  - Avatar inset ring now only on agent rows (original .agent-row img
    box-shadow inset 1px rgba(0,0,0,0.06)); message / typing / feed
    avatars had the ring in v1.3 but the original gives them none.
    DOM: row ring present, message ring absent.
  - Scrollbars hidden per the original (.app-window * scrollbar-width
    none + webkit display none). v1.3 showed a 6px .ab-scroll thumb
    rule and an unhidden phone feed. After: .ab-scroll and
    .ab-phone-feed both hide scrollbars (CSS + scrollbarWidth none).
  - Column resizers + window corner resizer now rendered (template
    chrome, previously defined but never mounted): sidebar resizer at
    left 198px, preview resizer at left 58%, both 8px col-resize
    translateX(-50%), hidden in their collapsed states; window corner
    resizer 22x22 nwse-resize radius 0 0 13px 0. All transparent, so
    screenshots are unchanged; DOM presence verified.
  - Gallery stale base values corrected: section-3 messages box bg
    0.92 -> 0.54, tokens swatch "conversation" 0.92 -> 0.54, @theme
    conversation 0.92 -> 0.54, conversation-title 0.94 -> 0.54,
    task-border 0.12 -> hairline, composer var -> 0.78 stop (unused
    vars except --color-ab-window; values now match effective tokens).
  - Unchanged by the re-scan (re-measured, still correct): titlebar
    40px + inset white highlight; traffic lights 17px gap 7 + hover
    brightness/saturate/scale; control capsule 64x32 + inner dividers
    0.1 / 0.09; project icon centres main 487 / sidebar-collapsed 470
    / preview-collapsed 720 (page-x, same as v1.3); conversation
    padding 18/16/14 gap 14; agent bubble #fff 13px 12px/1.38; user
    bubble max min(78%,310px); task card 12px padding, 12px/0 margins,
    4px track, 450ms fill, 700ms working pulse; typing 5px #aaa dots
    800ms delays 0/160/320; composer 32px grid 24/1fr/24 gap 4 margin
    0 14 10 padding 3; toast bottom 16 absolute blur(18px) font 11
    padding 10 14 (centre now exactly 640 = window centre, was 639);
    phone 270px aspect 0.51 7px #d8d8d6 frame radius 38 shadow alpha
    0.24 + inset #fefefe, device shadow min(58%,300px) 45px bottom 8%
    blur(30px), statusbar 8px/700 padding 8 16 2, island 48x15 #050505,
    appbar 42px padding 0 13 buttons 30px icons 15px opacity 0.72,
    projects gap 8 padding 8 14 12 tile 71px icon 44px, feed rows 48px
    grid 26/1fr/auto gap 7 name 9px/600 ink + em 7px muted + text 8px
    muted + time 6.5px muted; drawer 240ms cubic-bezier(0.32,0.72,0,1);
    message-in 260ms cubic-bezier(0.22,1,0.36,1); collapsed paddings
    174px / 48px; tile hover 0.5 + row hover 0.5 (DOM hover probes).
- Files changed (this set only): src/tokens/tokens.ts,
  src/components/Titlebar.tsx, Sidebar.tsx, AvatarBlob.tsx,
  Message.tsx, Preview.tsx, FollowUpComposer.tsx, AppWindow.tsx,
  src/components/ui/button.tsx, src/data/demo.ts, src/index.css,
  src/App.tsx, README.md (residual 4 wording), CHANGELOG.md (this
  entry). New evidence: docs/verification/rounds/v1.4/ (gallery x3,
  three window shots, phone-stage probe shot, probe-dom.cjs,
  probe-dom2.cjs, probe-v14.cjs, shoot-v14.cjs, probes/*.txt,
  measure/sample_orig2.py, scan_ipad.py, mean_colors.py,
  tab-inactive-check.cjs). No __pycache__ / .pyc files in the set.
- Build: tsc + vite pass (pnpm absolute path). No commit, no push.
- Unclosed (with measured reason, not invented):
  - U1. Project tiles stay vector mini-icons on flat tints; ipad-01
    tiles are full-bleed photo/illustration covers with white name
    pills below. Bitmap copying is forbidden, so no cover colours
    were sampled into tiles; the web demo itself is icon-only.
  - U2. ServiceModuleColumn bg stays rgba(249,249,247,0.92): the
    user-photo right column is unreadable, so no evidenced value
    exists; changing it would be invention.
  - U3. Avatar faces stay our redrawn geometry (sprout / open smile /
    freckles / arc eyes / glasses / blush + tuft); only disc colours
    are now measured. Official face shapes are not claimed.
  - U4. Gallery page backdrop stays flat #ececea, not the marketing
    page's colourful gradient the original demo window sits over.
    Window glass params are exact, but glass tint over flat grey
    differs from glass over the colourful backdrop. The gallery is
    presentation, not a screen element, so it was not restyled.
  - U5. Native iPad differences stay as documented platform gaps
    (README residuals 10/11): native task card is white with a
    "View task >" link and no track; native tiles carry name pills;
    native status text is coloured. Web-demo values are kept.
  - U6. macOS package Assets.car is unreadable on Linux (no .car
    reader); no .car values were used or fabricated.
  - U7. Send button stays native blue #1987f7 (README residual 9)
    against the web demo's gradient/black variant, per the
    high-resolution native evidence.
  - U8. Dark mode stays unrendered (light only, table B reserve).

## v1.3 — 2026-10-30 (full re-measure round; v1.2 -> v1.3 patch bump)

- Round: full re-scan of every screen and every visible element, NOT a
  re-read of the v1.2 list. v1.2's accepted residuals were NOT carried
  over: each was re-measured against the original evidence files
  (mockup_window-component.css base layer + mockup_window-component.js
  Shadow DOM override layer + window-template.js + App Store shots +
  user-photo crop). No judge call this round (zero-judge rule): pass bar
  is DOM computed style + screenshot measurement only, per the rule that
  measured data, not a verdict, is the pass bar. No commit, no push.
- Login-form check (work one, concluded first, before any fix): this set
  has NO login/welcome/sign-in screen, and no original evidence shows
  one. Screens checked in this set (src/App.tsx, all 7 sections): window
  main + sidebar-collapsed + preview-collapsed, messages, preview phone,
  service column + adapted bottom bar, primitives, tokens. The only
  account-adjacent elements are the sidebar Account button (person-circle
  icon, now the 32px narrow form, see below) and the titlebar "Create a
  new project" capsule button; neither is a login form, and no login
  screen was invented. Originals checked: all 10 App Store shots
  (iphone-01 home projects, iphone-02 same home second angle, iphone-03
  chat thread, iphone-04 website draft card, iphone-05 submit-for-review
  panel, iphone-06 daily briefing, ipad-01 chat room, ipad-02 chat
  thread, ipad-03 detail panel, ipad-05 chat + draft card), the
  user-photo chatroom crop (logged-in three-column chat room), the REA
  web-demo template (logged-in window only), and the macOS package
  (Assets.xcassets holds only AppIcon + MadeWithAirBuild, no login
  assets). iphone-01's "Your next big idea / Now an app" headline is
  App Store marketing poster copy outside the device, not an in-app
  welcome screen, so it was NOT turned into a welcome screen. REA itself
  states login/post-login interfaces are unconfirmable from public
  evidence. The Medley welcome full comparison (bottom colour full
  sampling etc.) therefore has no AirBuild counterpart to run against;
  the login question is closed as "no such screen in set or evidence",
  not as a rebuilt screen.
- Governing decision D1 (supersedes v1.2): where the base stylesheet and
  the Shadow DOM override layer disagree, the SHADOW layer wins. Reason,
  verified in code: the web component appends the stylesheet <link>
  first and the override <style> second, and the overrides carry
  !important on the contested rows, so the shadow values are what the
  homepage demo actually computes. v1.2 chose base/table-A values for
  these rows; v1.3 corrects every one of them (each with a DOM probe
  value below). This also resolves v1.2 unclosed U7 (B10): the composer
  backdrop is neither deleted nor blur(16px). Base .follow-up declares
  blur(16px), but the later shared block in the same stylesheet
  overrides it to blur(4px) saturate(145%), and the shadow layer does
  not touch the composer backdrop, so the effective original value is
  blur(4px) saturate(1.45). That value is now implemented.
- Fixed, all verified by DOM probe (before -> after, code value ->
  DOM computed after value):
  - Sidebar padding 12px -> 9px inline (DOM padding "8px 9px 9px");
    sidebar bg stays 0.56 (DOM rgba(226,228,226,0.56)).
  - Conversation bg 0.92 -> 0.54, titlebar conversation zone 0.94 ->
    0.54 (DOM both rgba(249,249,247,0.54)); conversation border-right
    and titlebar divider 0.22 -> hairline 0.045 (DOM 0.043 after
    rounding, i.e. the 0.045 token).
  - Preview bg radial gradient -> flat rgba(246,247,245,0.36),
    including the titlebar preview zone 0.94 -> 0.36 (DOM
    rgba(246,247,245,0.36)); the radial class is deleted from
    index.css and both usages now use the flat token.
  - Titlebar conversation padding-right in preview-collapsed 58 ->
    48 (DOM "4px 48px 0px 10px"). v1.2's 58 was a visible-area-centre
    rationalisation; the original token is 48, and the icon centre
    now measures 720px page-x in the preview-collapsed shot
    (window-relative 680 = original-token geometry), main 487,
    sidebar-collapsed 470 (window-relative 430 = 174px token
    geometry). All three centres now follow original tokens exactly.
  - Sidebar heading colour 0.38 -> muted 0.46 (DOM
    rgba(17,17,15,0.46)); agent-row status 0.34 -> muted 0.46 (same
    DOM value); agents block margin-top 10 -> 9px.
  - Project-tile hover 0.58 -> 0.5 (DOM hover
    rgba(255,255,255,0.5)); agent-row hover stays 0.5 (DOM hover
    0.5); tile active border white 0.94 -> hairline 0.045.
  - Composer: bg white 0.94 -> shared control gradient, border
    1px 0.075 -> none, shadow 0 10px 28px 0.065 + inset white
    0.78 -> inset 0 1px white 0.38 + 0 3px 8px black 0.08,
    backdrop none -> blur(4px) saturate(1.45) (all four DOM-verified
    in probe-dom.cjs). Attach button bg #ededeb -> same gradient
    (DOM gradient); attach/send icon opacity stays 0.72.
  - Shared control shadow inset corrected 1px 1px -> 0 1px (shadow
    layer value) in tokens.controlShadow; capsules, account button,
    composer, attach, footer and phone-appbar buttons all inherit it.
  - Footer narrow form (v1.2 U2 was wrong: it claimed no narrow
    container exists): the 198px sidebar IS the narrow container
    (original @container sidebar max-width 236px), so the footer was
    rebuilt to the narrow form. Account button: full-width labelled
    36px pill -> 32x32 icon-only (DOM 32x32, gradient); footer
    buttons 36x36 -> 32x32 (DOM 32x32, gradient, border none);
    footer gap 7 -> 5, actions gap 5 -> 3; footer icon opacity
    0.74 -> 0.72 (shared block value).
  - Toast bottom 30 -> 16px (DOM "16px") + backdrop blur(18px)
    added (DOM "blur(18px)"); position stays absolute per shadow.
  - Task card border 0.12 brown -> hairline 0.045 (DOM hairline);
    todo step colour #a2998c -> #88755e (DOM rgb(136,117,94));
    working-dot pulse box-shadow ring 1.6s -> opacity pulse
    700ms alternate (DOM "0.7s ease-in-out infinite alternate
    ab-task-working", the base keyframe form).
  - Typing dots keyframes: invented 0/60/100 hold shape -> base
    from opacity 0.35 / translateY 0 to opacity 1 / translateY -3px,
    800ms infinite alternate (DOM "0.8s infinite alternate
    ab-typing").
  - Traffic lights: spans were non-interactive; added the original
    hover (brightness(1.04) saturate(1.04) scale(1.06)) via
    .ab-traffic-light:hover. Colours/sizes unchanged (17px, gap 7).
  - Titlebar preview actions rebuilt to the original structure
    (was: one capsule holding Share + preview toggle). Now:
    capsule [paperplane Share, device-inbound] + a separate 32px
    bright toggle button, gap 7. Share glyph share-tray 16px ->
    paperplane (Lucide Send) 11px (DOM svg 11x11, original
    paperplane-icon 11px); device-inbound restored as a custom
    Lucide-geometry morph SVG (audit geometry: rect 7,2,10,20 rx2
    + top down-chevron + bottom dot, 16px, DOM-verified outer
    HTML); it is documented as custom, NOT a Lucide export, because
    Lucide has no single device-inbound glyph. Preview capsule
    divider 0.1 -> 0.09 (header-action-group value); sidebar capsule
    divider stays 0.1. Bright toggle: 32px gradient + control
    shadow + PanelRightToggle 17px (DOM 17) + hover brightness
    1.035. New-tab hover 0.52 -> 0.5 (DOM hover
    rgba(255,255,255,0.5)); new-tab icon opacity stays 0.48.
  - Phone appbar rebuilt (was: project name 12/700 + "Today",
    which matches no original): now 30px gear button + 16px mark +
    30px menu button (DOM both buttons 30x30), per
    window-template.js. Gear is Lucide Settings 15px, menu is a
    custom Lucide-geometry morph of the audit line-decrease
    polyline M3 17l5-6 4 3 5-7 4 4 (no arrowhead; Lucide
    trending-down adds one, so it is documented as custom). Centre
    mark is a vector redraw of the four-petal mark (four lobes +
    centre hole), NOT the official asset. Appbar buttons use the
    control gradient + control shadow + 0.72 icon opacity.
  - Phone projects padding 10 all -> 8px 14px 12px (original);
    tiles icon-only again (labels Focus/Town/Stats removed: the
    original tiles carry no labels), icon 19 -> 44px = 62% of the
    71px tile (DOM tile 71x71, svg 44x44), matching the original
    19% tile padding geometry, plus the original tile image shadow
    as a drop-shadow(0 4px 8px rgba(0,0,0,0.16)).
  - Phone feed 2 rows -> 6 rows (full set roster: Ato, Pluso,
    Colo, Camo, Ampo, Leto; demo texts/times, not claimed as
    original copy); feed name #242426 -> ink #11110f (DOM
    rgb(17,17,15)), text #727279 -> muted 0.46 (DOM, 8px), time
    #96969c -> muted 0.46 (DOM, 6.5px), role em added (7px, muted,
    margin-left 2px, per template strong em); row layout flex ->
    grid 26px 1fr auto gap 7, padding 5px 0, height/min-height
    48px; feed container padding 6px 12px 16px; time top-aligned
    with padding-top 2px; divider margin-left stays 33px.
  - Phone device shadow added (was missing): absolute ellipse
    min(58%,300px) x 45px, bottom 8%, black 0.18, blur(30px)
    (DOM 292x45 in the main window, i.e. 58% of the stage).
  - Phone home indicator removed (was invented): the web-demo
    phone has no home-bar element; the 90x4 bar is deleted.
    Phone now measures exactly 270x529 (DOM).
  - Button default variant (gallery primitive) flat footer-row
    material -> shared control gradient + control shadow, text
    black/65 -> #686868, border removed, matching the corrected
    footer material. Ghost/blue variants unchanged.
  - README token paragraph + component table + comparison bullets
    synced to the v1.3 values (conversation 0.54, preview flat,
    muted role/status, composer gradient, task hairline, toast
    16px, 32px footer form); App.tsx section-4 note synced
    (feed name ink + role em, appbar structure).
- Re-measured and confirmed unchanged (probe values, not carried
  claims): window 1200x668; titlebar 40px; traffic lights 17px
  gap 7; capsules 64x32; project icon 32px radius 32%; tabs 36px
  high, 76-180px wide, 9px radius, 10px/500 label, device icon
  12px opacity 0.45, close 9px opacity 0 / 0.3; sidebar 198px,
  bg 0.56; agent-row grid 30px 1fr auto gap 7 min-height 42
  padding 4px 5px radius 9 name 11/600; tile grid 3 cols gap 6
  aspect 1.25 radius 12 bg 0.34; bubbles agent #fff 13px
  12px/1.38 padding 10/12, user blue max min(78%,310px), agent
  container max min(84%,330px); message stream padding
  18/16/14 gap 14, author 10/600 margin 0 2px 5px; composer
  32px capsule margin 0 14px 10px grid 24px 1fr 24px gap 4;
  attach/send 24px; status pill 3/7 9px success #167b3d on
  #e7f8ed; phone frame 7px #d8d8d6 radius 38 shadow 0 24px 48px
  0.24 + inset #fefefe; statusbar 8px/700, dynamic island
  48x15, battery 16x8 fill 6; appbar row 42px; feed divider
  inset 33px; drawer 240ms drawer easing; message-in 260ms.
- Build: pnpm build passes (tsc + vite, 303.03 kB JS).
- Screenshots: docs/verification/rounds/v1.3/ (gallery-1280.png,
  gallery-1280-top.png, gallery-1200x668.png, window-main.png,
  window-sidebar-collapsed.png, window-preview-collapsed.png,
  probes/phone-stage.png); probe scripts probe-dom.cjs,
  probe-dom2.cjs and shoot-v13.cjs in the same directory.
- Unclosed items (measured reason, not skipped; none of these is
  claimed as fixed):
  - U1 Window outer shadow: code keeps 0 24px 64px black 0.18 +
    inset white 0.5 border. Shadow layer value is box-shadow
    none + border 0, but over the gallery's flat #ececea backdrop
    the window edge would be a ~3-unit grey step and nearly
    invisible; the drop shadow is kept for gallery legibility
    only. Host apps over a photo backdrop should drop it.
    Measured, deliberate deviation, not a pass.
  - U2 Composer send button colour: code keeps blue #1987f7.
    The web demo's effective value is the shared gradient (with a
    black base), but the native App Store shots (iphone-06,
    ipad-02, ipad-05) show a blue round send button, and this set
    already decided for native evidence (README residual 9). It
    is 1:1 to the native evidence, NOT to the web-demo value;
    recorded here so it is not mistaken for a web-demo match.
  - U3 SF Pro Rounded form: no Apple device and no SF font on
    this VM (fc-list empty, as in v1.2); screenshots remain
    Helvetica Neue / Arial fallback. Font stack, sizes and
    weights are code-exact; the rounded glyph form itself is
    unverifiable here. Needs an Apple-device screenshot.
  - U4 Phone status glyphs: signal/wifi/battery are hand-drawn
    bars + battery box at 8px; the originals are raster icons
    (11x8 / 11x7 / battery 16x8 fill 6). Shapes and boxes match
    at this size; pixel-exact glyph match is not resolvable.
  - U5 Avatar faces: vector redraws (one face per roster member)
    are approximations; the originals are official bitmap
    portraits with no vector source, and bitmaps are never copied
    into this set. Face geometry, colours and expressions cannot
    be pixel-matched; only size (28px rows / 26px feed), circular
    crop and the 1px 0.06 inset ring are exact.
  - U6 Project tile artwork: sidebar and phone tiles use Lucide
    mini icons; the originals are detailed project artwork
    images (32px, radius 32%, drop-shadow). Tile geometry,
    padding and shadow are now exact; the artwork itself is not
    reproducible without copying official bitmaps.
  - U7 Glass backdrop dependence: window/composer/toast
    translucency renders over whatever sits behind them. The
    original demo sits over a colourful marketing photo; this
    gallery sits over flat #ececea, so the glass reads flatter
    even with exact tokens. Tokens are exact; the backdrop is a
    host property, not a set property.
  - U8 Resizer drag: no resizer hit areas are mounted in the
    gallery (original template has transparent 8px resizers, and
    the shadow layer hides only the window resizer). Drag
    physics and the original message-playback timing remain
    component contracts for the host app (README residual 8);
    the visible collapsed end states are exact.
  - U9 Gallery chrome: the gallery header, section titles/notes,
    token swatches, primitives (Button/Input/Separator) and the
    adapted BottomModuleBar are this set's own presentation, not
    original screens; they have no original counterpart to
    measure against, so they are documented, not claimed 1:1.
    The bottom bar stays explicitly labelled as adapted.
  - U10 Phone project/feed counts: phone tiles stay 3 (original
    web demo shows 9) and feed rows are the set's 6 roster
    members (original shows 6 different web-demo members). Tile
    geometry and row geometry are exact; inventing 6 more project
    identities or copying the web-demo member set would be
    fabrication, so the counts are recorded, not forced.
  - U11 Clover mark + device-inbound + line-decrease glyphs:
    the mark is a redrawn approximation of a brand mark, and the
    two icons are custom Lucide-geometry morphs (exact audit
    geometry, strokeWidth 2). They are not Lucide exports and
    not official assets; geometry is exact to the audit, stroke
    rendering follows Lucide.
  - U12 Preview collapsed motion: original preview column
    slides/fades (translateX 24px + opacity) while the grid
    collapses; this set collapses the grid (240ms drawer
    easing) and unmounts the column. End states are identical;
    the in-between motion path differs.
  - U13 Desktop body copy: the user-photo message text is
    unreadable, so thread copy follows the iPad Hourtown thread
    structure (README residual 1). Layout, bubbles and cards are
    exact; the desktop verbatim text is unrecoverable.

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

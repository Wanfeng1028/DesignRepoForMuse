# CHANGELOG — UIDesign / web / airbuild

Only this set's history. Append-only: never rewrite or delete older entries.
Screenshots for each round live in `docs/verification/rounds/<version>/`.
Visual judge for every round: `qiniu/conatus-free` via BotsRouter
(`https://api.botsarena.tech/v1/chat/completions`), comparing the render
side by side with the real originals (REA table A, the user-photo desktop
crop, App Store iPad/iPhone shots). A round is clean only when the judge
reports zero substantive differences item by item; "looks alike" is not
a pass.

## v1.7 — 2026-11-01 (round 9 interaction line: iOS behaviour inside 1:1 fidelity; v1.6 -> v1.7 patch bump)

- Round: user order 2026-11-01 00:12 ("figure it out yourself") +
  01:00 interaction line (in 1:1 restoration, add the iOS style,
  interaction and details; static screenshots never carry the "feel";
  the original screen IS an iOS app, so its behaviour is part of the
  1:1 target, not extra design). Only behaviours the original screen
  evidences were built; everything else is recorded N/A with a reason,
  never invented. Method is measured_visual_replication in full.
- Zero judge calls this round. Measured data decides. No model was
  called, no BotsRouter call was made, no token or key file was touched,
  no judge verdict is claimed. No official bitmap was copied into the
  design system; icons/avatars/logo stay vector redraws, Lucide where
  one exists; the new traffic-light glyphs are hand-drawn SVG paths.
- Scope: only UIDesign/web/airbuild. No other set (app/medley had
  another worker's uncommitted changes throughout this round and was
  not touched), no server database, no token, no BotsRouter, no X, no
  other project was touched. SF font files were NOT copied into the
  repo or dist; fontconfig was NOT touched (the ffmpeg-1011 cache
  symlink for Playwright video mirrors the existing ffmpeg-1013
  symlink and is environment cache, not repo content).
- Baseline: v1.6 code + v1.6 screenshots
  (docs/verification/rounds/v1.6/). All v1.7 evidence lives in
  docs/verification/rounds/v1.7/ (gallery x3, window shots x3,
  window-main-after-send, side-by-side-v16-v17 x3, probe-v17.txt,
  stem probe + results, videos x3 + frame grabs).

### A. Interaction table (original behaviour vs implementation vs parameter)

- Window chrome / traffic lights: original macOS window lights.
  Hover now reveals the glyphs (close x, minimise -, zoom +), drawn
  SVG, opacity 0 -> 1, 120ms iOS easing; light itself scales 1.06 on
  hover (unchanged). Probe: idle 0, hover 1, transform matrix(1.06).
  Window drag is host (AppKit) behaviour and is N/A in a browser demo.
- Sidebar / preview collapse (drawers): already 240ms
  cubic-bezier(0.32,0.72,0,1); verified both directions, end grids
  198px 498px 504px <-> 0px 696px 504px (sidebar) and 198px 1002px 0px
  (preview). Panel toggle icons keep the v1.2 morph (divider slides
  240ms, same easing). No modal sheet exists in this original window,
  so no sheet/presentation + scrim was invented: the two drawers ARE
  the original's panels, and they are split-view, not sheets (no
  scrim in the original either). Sheet = N/A, reason recorded.
- Press states (all buttons): iOS press = scale + fast easing.
  Generic buttons scale 0.96, composer send/attach scale 0.92, all
  120ms cubic-bezier(0.32,0.72,0,1). Inline-transform controls got
  their own classes (.ab-composer-send/.ab-composer-attach/.ab-tile)
  because an inline transform beats a stylesheet :active rule.
  Probe (mouse.down, 800ms wait; see shell-lag artifact A1):
  send matrix(0.92), capsule matrix(0.96), tile matrix(0.96).
- Composer / send / message flow: REA evidences presentMessage +
  showTyping, so send -> user bubble enters the stream at once ->
  Ato thinking dots (3 x 5px, 800ms, 0/160/320ms, unchanged) -> a
  demo-only agent reply after 1200ms with the message-in animation
  (260ms cubic-bezier(0.22,1,0.36,1)). The reply copy ("Noted — I'll
  fold that into the next pass.") is demo text, labelled as such in
  the gallery note; it is not claimed as original copy. Auto-scroll
  to bottom on send: scrollTop 327 = max 327 after send. Empty
  composer: send is disabled + opacity 0.45 (iOS empty-state);
  typed: enabled, opacity 1. No stop button: REA evidences no stop
  control for this window, so none was added. No partial streaming
  text: REA evidences typing dots + full bubbles only, so character
  streaming is N/A, not invented.
- Navigation / session switch: sidebar project tiles now switch the
  session (previously inert). Switch plays an iOS push: conversation
  slides in from the right 24px + fade, 320ms
  cubic-bezier(0.32,0.72,0,1) (.ab-push-in); titlebar project icon
  and active tile follow (Hands Time verified, back to Hourtown
  verified). Conversation copy per project is not in REA, so the
  thread stays the demo thread on every project; only the session
  chrome (icon, active tile) switches. This is labelled demo state.
- Tabs: device tabs already switched; the switch now fades/slides
  the preview pane 240ms, same drawer easing (.ab-pane-in). New tab
  (iPadOS 26.5) + back to iOS 26.5 verified, tab hover #f2f2f0
  verified. Tablet phone form stays residual (R10, narrowed): no
  tablet-form geometry exists in REA, so the phone form does not
  change shape on tab switch.
- Scroll: native scrolling kept (on Apple devices AppKit gives
  momentum + bounce natively; inventing JS scroll physics would break
  1:1). Set overscroll-behavior: contain +
  -webkit-overflow-scrolling: touch on .ab-scroll. Probe: wheel
  scrollTop 0 -> 207 (max at that width).
- Switch / segmented control / slider: none exists in this original
  window (no settings screen in this set), so all three are N/A with
  this reason; no control was invented to demo them.
- Title rotation: N/A. This window has no rotating title (the
  rotating-title original belongs to another set); nothing was faked.
- Focus ring (closes R12): keyboard-only :focus-visible ring, 2px
  solid #1987f7, offset 2px (buttons/tabs); composer input uses a
  2px shadow ring because its inline outline:none would beat an
  outline rule. Probe: keyboard Tab reaches "App settings" with
  outline 2px. Screenshots unaffected (never matches on mouse click).
- Details re-verified: statusbar time 9:41, 8px/600; tab label
  10px/500; composer input 12px/16px; agent bubble 12px/16.56px;
  feed time 6.5px (v1.6 value, unchanged); toast "Message sent"
  still renders. Morphing continues: panel toggles, task-dot
  colour morph + check draw (unchanged).
- Reduced motion: the existing global rule covers every new
  animation. Probe (reducedMotion context): message-in duration
  1e-05s, drawer transition 1e-05s.
- Animation fill fix (found by the v1.6->v1.7 pixel diff): the first
  v1.7 build kept `both` fill on .ab-push-in/.ab-pane-in, which left
  a retained compositing layer and shifted 69,543 preview pixels by
  a mean 0.25 levels (max 25). Fill removed (end values equal the
  natural values, so motion is unchanged); re-diff: preview region
  is now pixel-identical to v1.6 in all three windows. The remaining
  window-main diff (851px) is exactly: active-tile border fix (245px
  sidebar, max delta 16) + dimmed empty-state send button (442px
  delta > 50 at x654-677 y630-653, intended) + weak antialiasing.
  The sidebar-collapsed 12x12 strong cluster at x65-76 y382-393 is
  the task-card active-dot pulse caught at a different phase (tan
  #c49b65 dot), a screenshot-timing artifact, not a regression.
- Shell-lag artifact A1 (probe method, NOT a product bug): on this
  heavy backdrop-blur page the headless shell runs transitions
  slower than nominal (a 120ms rule still read identity at 150ms
  and reached 0.96 only at 400ms+; a 300ms traffic-glyph hover read
  0 in one run and 1 after an 800ms wait). All press/hover reads in
  probe-v17 therefore wait 800ms. Nominal values in code are the
  iOS values; the shell lag is harness-only. Same family as v1.6 R25.
- iOS curves used, all measured in DOM: drawer 240ms
  cubic-bezier(0.32,0.72,0,1); push 320ms same bezier; pane 240ms
  same bezier; message-in 260ms cubic-bezier(0.22,1,0.36,1); press
  120ms same drawer bezier. No WAAPI spring physics is claimed: the
  bezier IS the iOS value used here; original spring constants are
  unmeasured (Assets.car, see R21) and were not invented.

### B. Large-title weight check (stem width / cap-height, ink method NOT used)

- Method (replaces the voided v1.6 ink method): same string rendered
  in SF Pro Display at 600/700/800 (probe page, deviceScaleFactor 3)
  + the live gallery titles; glyph x-ranges from Range rects; stem
  = median dark-run width in the glyph's middle band (H1: left stem
  of 'B'; H2: right stem of 'd'; cap height from the dark bbox of
  'B'/'A'); threshold luminance < 128. Anchor: isolated 'H' at 34px
  reads 600 -> 5.0px / 0.2083, 700 -> 6.33px / 0.2639, 800 -> 6.33px /
  0.2639, so the method is monotonic and 700/800 coincide on this VM.
- BEFORE (code H1 800, H2 700): live H1 stem 6.0px, capH 24px, ratio
  0.2500 = exactly the 700 reference (6.0px / 0.2500), NOT a distinct
  800: SF Pro Display 700 and 800 render identically on this VM
  (identical glyph boxes and PNG bytes). Live H2 stem 3.33px, capH
  14px, ratio 0.2381 = exactly the 700 reference. Semibold references:
  H1 5.0px / 0.2083, H2 3.0px / 0.2143.
- Decision: H1 800 -> 600 and all seven H2 700 -> 600 (Semibold).
  Reasons, in order: (1) the user flagged the big titles as too
  heavy; (2) gallery headings are our chrome, not original pixels,
  so softening them breaks no 1:1 value; (3) on Apple devices code
  800 renders a true ExtraBold, heavier than the VM's
  700-equivalent, so VM screenshots understate what the user saw.
  AFTER re-measure: live H1 5.0px / 0.2083, live H2 3.0px / 0.2143,
  both exactly the 600 references (H1 -16.7% stem, H2 -10.0%).
  Unchanged on purpose: the 11px eyebrow (700) and all other 700/600
  small labels are not large titles and drew no complaint.
- FreeType vs Core Text, stated separately (never conflated with
  weight): all ratios above are FreeType-relative (this VM). The
  600-vs-700 ordering is renderer-independent because every weight
  was rendered by the same renderer, so the decision rests on
  within-renderer ordering + the user's complaint, NOT on claiming
  VM pixel widths equal Apple pixel widths. Core Text hinting may
  shift absolute stems by ~0.5px class on Apple devices; the
  Semibold choice is safe on both renderers because it is lighter
  than Bold/ExtraBold under either.

### C. R22 adjudication (closed) + full rescan residual count

- R22 CLOSED: project-tile hover/active now match REA table A
  exactly (hover bg 0.58, was 0.5; active border
  rgba(255,255,255,0.94), was hairline 0.045; active bg 0.72 and shadow
  already matched). Probe: hover bg rgba(255,255,255,0.58), active
  border rgba(255,255,255,0.94). README line 83 updated to match.
- R12 CLOSED: focus-visible ring implemented + probed (see A).
- R10 NARROWED, still open: device-tab switch animation done; the
  tablet phone form is still unimplemented (no REA geometry).
- R21 NARROWED, still open: message playback is now real (send ->
  thinking 1200ms -> reply), but the 1200ms thinking delay is a demo
  choice, not a measured original timing; resizer drag physics still
  host contracts; Assets.car values still unmeasured.
- Rescan count: v1.6 closed with 24 residuals (R1-R12, R14-R25
  except R13). This round closes R12 and R22 outright and narrows
  R10/R21 without closing them: 22 residuals remain (R1-R11 except
  R10-narrowed, R14-R21 except R21-narrowed, R23-R25; R9 mid-state
  drawer, R23 backdrop flatness, R24 refraction rejection, R25 probe
  timing artifact all carried unchanged). No new product residual
  was opened; A1 is a harness artifact, not a product residual.
- Rescan coverage (probe-v17.txt, all values DOM-computed, not
  eyeballed): window 1200x668; drawer 240ms iOS bezier; grids in
  both collapse directions; traffic glyphs + scale; press scales;
  tile hover/active; push + pane animations; tab switch + hover;
  scroll + overscroll; full send flow + scroll-to-bottom; message-in
  + typing params; focus ring; H1/H2/tiny-label typography; toast;
  reduced motion; gallery sections window/collapsed/messages/
  preview/services/primitives/tokens all present (3 windows).
- Pixel + DOM cross-check: v1.6 -> v1.7 window diffs are 851px
  (main), 606px (sidebar-collapsed), 851px (preview-collapsed),
  all accounted for above; preview region pixel-identical in all
  three. Side-by-side-v16-v17 composites in rounds/v1.7/ show the
  same: only the tile border and the dimmed empty send differ.
  Interactive flagship: window-main-after-send.png shows the sent
  bubble + demo reply in the stream with no material/glyph change
  elsewhere. Gallery full page: 1280x5788, sections 1-7 present.

### D. Videos (Playwright video, .webm, 1280x800, vp8)

- rounds/v1.7/video/drawer-collapse.webm (10.32s): traffic-light
  hover glyphs, sidebar collapse + expand, preview collapse + expand.
- rounds/v1.7/video/send-message.webm (8.24s): composer type,
  send, thinking dots, demo reply, scroll to bottom.
- rounds/v1.7/video/tabs-sessions.webm (8.88s): new iPadOS tab,
  back to iOS tab, Hands Time session push, back to Hourtown.
- Frame grabs in rounds/v1.7/probes/frames/ (drawer-mid,
  send-late, tabs-mid) confirm each clip's content. No sheet video:
  no sheet exists in this original (see A).

### E. Build

- /home/hatch/.npm-global/bin/pnpm build -> tsc -b && vite build,
  1978 modules, pass. Final hashes: dist/assets/index-Cx-mKuCC.css
  (18,765 bytes) and index-DVBsljMF.js (307,067 bytes). Final
  screenshots, probes and videos were shot against this build (the
  fill-fix rebuild); the earlier build's shots were superseded and
  re-shot.
  The gallery demo runs all of the above interactions (screenshots
  alone are not the deliverable).

### F. Files changed

- src/index.css (press system, focus ring, traffic glyphs, push/pane
  keyframes without fill, overscroll).
- src/components/Titlebar.tsx (traffic-light glyph SVGs).
- src/components/FollowUpComposer.tsx (disabled empty send, press
  classes, hover-lift moved to CSS).
- src/components/Sidebar.tsx (R22 values, tile onSelect, tile class).
- src/components/AppWindow.tsx (message state, thinking + demo
  reply, project-switch push, device-pane animation, scroll).
- src/App.tsx (H1 800 -> 600, H2 700 -> 600, section-1 note).
- README.md (tile hover/active values).
- docs/verification/rounds/v1.7/ (all new evidence + scripts).
- CHANGELOG.md (this entry).

## v1.6 — 2026-11-01 (round 9: iOS texture closure on font / material / glyph lines; v1.5 -> v1.6 patch bump)

- Round: user verdict 2026-10-30 22:09 (iOS texture still absent) plus
  coordinator briefs 2026-11-01 00:12 / 00:17 / 00:20 / 00:22 / 00:24
  (results only, fix directly, no approval batches; SF render target;
  refraction + edge-light material; optical-size harness override).
  Method is measured_visual_replication in full, same as v1.5.
- Zero judge calls this round. Measured data decides. No model was
  called, no BotsRouter call was made, no token or key file was touched,
  no judge verdict is claimed.
- Scope: only UIDesign/web/airbuild. No other set, no server database,
  no token, no BotsRouter, no X, no other project was touched.
  SF font files were NOT copied into the repo, dist, or docs: they live
  only in ~/.local/share/fonts/sf-pro/ for local rendering, and
  ~/.config/fontconfig/fonts.conf was NOT touched by this round.
- Baseline: v1.5 code rendered with the new SF stack
  (docs/verification/rounds/v1.6/probes/baseline/ + probe-before.txt),
  then the v1.6 code rendered the same way (probe-after.txt + final
  shots). The v1.5 Noto-era screenshots are superseded: every v1.6
  screenshot is an SF render. Inter is fallback only (see font table).
- Reference rule unchanged: REA table A wins wherever it gives a value;
  the iOS 27 / glassy / baoyu material recipes are diagnostics and
  translations, never overrides of REA. The window backdrop staying
  REA-exact is deliberate (see material item 4 and residual R23).

### A. Font line (SF render; repo font token UNCHANGED)

- Render resolution (headless shell 1243, file:// dist/index.html,
  harness-only optical-size override: leaf elements with computed
  font-size >= 20px get "SF Pro Display", smaller text resolves
  through the repo token stack). document.fonts.check: SF Pro Rounded
  true, SF Pro Display true, SF Pro Text true, Inter true (fallback).
  Token stack is still "SF Pro Rounded", "SF Pro Display",
  -apple-system, ... (tokens.ts + index.css --font-sans untouched):
  on Apple devices it resolves to SF exactly as before; on this VM
  small text now renders SF Pro Rounded (the token's first family),
  large titles render SF Pro Display via the harness override only.
  No product-code font change was needed: every REA size/weight
  already matched (see table), the v1.5 gap was the missing SF
  runtime, not the token.
- Font table (original / REA value vs v1.6 render, DOM computed):
  bubble 12px / 1.38 -> 12px / 16.56px, weight 400; agent name
  10px / 600 -> 10px / 600; feed name 9px / 600 -> 9px / 600, line
  1.25 -> 11.25px; feed text 8px / 1.3 -> 8px / 10.4px; feed time
  6.5px / 1.4 -> 6.5px (unchanged); tab label 10px / 500 -> 10px /
  500; composer input 12px / 16px -> 12px / 16px; window line-height
  normal (v1.5) unchanged; window backdrop blur(34px) saturate(1.24)
  unchanged; toast 11px, blur(18px), shadow 0 10px 30px
  rgba(0,0,0,0.2) unchanged.
- Canvas width evidence (same string, 12px): "Session ready to
  review" = SF Pro Rounded 117.35px, SF Pro Text 134.00px, Inter
  135.33px. Rounded is ~12% narrower than Text/Inter: the token's
  Rounded-first order is load-bearing for line widths, and the
  Inter fallback (coordinator proof images welcome-inter.png /
  gallery-inter.png) sits ~1% from Text, not from Rounded. Inter is
  recorded as fallback comparison only; delivered shots are SF.
- SF Pro Rounded vs original note (one separate line, as briefed):
  the original token IS SF Pro Rounded, so small text in Rounded is
  faithful, not an approximation delta. The remaining font delta is
  narrow: large titles render Display via harness override on this
  VM (on Apple devices the token stack gives Rounded first, and
  whether Apple renders >= 20px titles in Display or Rounded is a
  host-side optical-size behaviour this set cannot encode in the
  token without breaking the token; recorded, not papered over).
- Title wrap check (every large title; Range getClientRects line
  count; gallery chrome has no original, intent = 1 line):
  H1 34px/800 "AirBuild - desktop / web design system": natural
  (Rounded) 1 line, forced Text 1 line, forced Display 1 line,
  final (Display override) 1 line, height 51px. All seven H2 20px/700:
  1 line in all three states, height 30px. NO wrap defect exists in
  this set at 34px/20px (the coordinator's 43px Text-wraps evidence
  is from another set's larger title, not reproduced here). Widths
  at 34px/800: Display 637.22px, Text 700.79px, Rounded 645.04px
  (Display narrowest, which is why the override is kept even with
  no wrap defect: it is the optical-size-correct face).
- Eye check: window-main + gallery-1280 in SF read as iOS text
  (rounded letterforms, Semibold time, 600 agent/feed names),
  versus the v1.5 Noto render. The font line is closed except the
  Rounded-vs-Display host note above.

### B. Material line (edge-light shipped; SVG refraction REJECTED on evidence)

- Material table (original/REA vs before vs after; blur/saturate/bg
  never moved where REA fixes them):
  1. Window backdrop: REA rgba(244,246,244,0.42) + blur(34px)
     saturate(1.24) -> before identical -> after identical (DOM
     computed + inline both confirm). NOT strengthened: ios27's
     blur 100px / alpha 0.70 would be a different design, and the
     gallery flatness is the flat #ececea backdrop (R5), not the
     window value. See R23.
  2. Shared-control glass (titlebar capsules x2, preview toggles,
     account button, sidebar footer buttons x3, phone appbar
     buttons x2, composer form, attach button): blur(4px)
     saturate(1.45) + gradient 325deg + shadow inset 0 1px
     rgba(255,255,255,0.38) + 0 3px 8px rgba(0,0,0,0.08) -> after
     ADDS one inset layer: inset -1px -1px 1px
     rgba(255,255,255,0.40) (baoyu iOS 26 pill bottom-right rim
     light; glassy specular/hairline translated to CSS: specular
     1.1 has no CSS numeric equivalent, the rim layer is its
     translation). DOM after (composer + capsule): "... 0.38 ...
     inset, rgba(255,255,255,0.4) -1px -1px 1px 0px inset,
     rgba(0,0,0,0.08) 0px 3px 8px 0px". Pixel effect is subtle by
     design: composer bottom edge rows y656-657 lift +1 to +2
     levels (249 -> 251, 251 -> 253); flat interiors unchanged.
     Tokens changed: tokens.controlShadow + tokens.footerShadow
     (same value, both updated; all consumers share them).
  3. Toast: REA bg rgba(18,18,18,0.88) + border
     rgba(255,255,255,0.12) + shadow 0 10px 30px rgba(0,0,0,0.2) +
     blur(18px) -> before identical -> after identical. Glassy's
     0 10px 26px rgba(0,0,0,0.16) was NOT applied: REA wins on
     conflict. No rim layer added (dark glass, REA-exact).
  4. Phone frame, bubbles, task card, tiles, service column, bottom
     bar: unchanged (REA values already exact; tiles recorded as
     new residual R22 instead of changed, see below).
  5. No extra top-shine gradient overlay was added: the control
     gradient (325deg) + existing inset top light already carry
     the top shine; a second gradient band would double it with
     no original evidence. The rim completion in item 2 IS the
     shipped edge-light system.
- Refraction: four probes, all in docs/verification/rounds/v1.6/
  probes/, all against the same headless shell; the nikdelvin
  displacement map + 3-channel (R = strength + 2*CA, G = strength
  + CA, B = strength, screen blend, CA = 0) was reimplemented for
  the probes (MIT source ~/workspace/nikdelvin-liquid-glass, not
  copied into product code):
  1. probe-refraction.html/png: filter: url(data-URI) directly on
     a content-bearing slab (strengths 12/30/60) displaces THE
     SLAB ITSELF (box + text shift, ghost bleeding past the
     radius) instead of refracting only its backdrop. Unusable on
     any element with content.
  2. probe-refraction2.html/png: two-layer (outer radius clip +
     empty inner slab with backdrop blur + displacement, text in
     an unfiltered sibling). Boxes stay clean and text stays
     crisp, but the displaced pattern is NOT a lateral refraction:
     mid-row profiles flatten (control range 150-192 vs
     displaced 112-133) with no alignable shift (best-shift fit
     hits the +/-40px boundary with mean error ~43-46 levels).
     The screen-blended channel copies wash contrast out.
  3. probe-refraction3.html/png: sharp 24px-stripe + text backdrop,
     blur(4px) pill, strengths 8/16. Stripes pass through
     unchanged; no visible bending at the rim, text glyphs
     equally blurred in control and displaced variants.
  4. probe-backdrop-url(2).html/png/cjs: backdrop-filter:
     url(#filter) IS parsed by this Chromium (computed keeps the
     url), but rendering ERASES the backdrop entirely (flat tint,
     no stripes) for both a turbulence filter and the nikdelvin
     map filter, at blur(10px) and blur(34px) saturate(1.24).
     Content stays crisp, backdrop is gone: strictly worse than
     plain blur.
  Decision: NO SVG displacement filter ships on any product glass.
  The map's full-surface gradients are too smooth to bend local
  detail, and the only backdrop-scoped path erases the backdrop.
  A future round must not retry this without a new mechanism
  (e.g. a rim-normal map with real spatial frequency, or a
  browser where backdrop url() renders); see residual R24.
- Render-layer check (v1.5 lesson, not repeated): window backdrop
  is inline backdropFilter + WebkitBackdropFilter from
  tokens.windowFilter (DOM computed blur(34px) saturate(1.24));
  composer/capsule/phone-button backdrops compute blur(4px)
  saturate(1.45); toast computes blur(18px). All present in the
  built product, verified by probe-after.txt, not just by source.

### C. Glyph line (spec forms inside original slot boxes)

- Source: baoyu ios-frame.jsx status bar (402pt frame) + App Store
  iphone-03 phone-screen real-photo check (crop
  measure/appstore-iphone03-statusbar2.png). Photo measurements
  (full-res): time "13:00" glyph height ~31px; signal 4 bars at
  x880-887 / 893-900 / 907-914 / 921-928; wifi spans x948-990
  (42 wide) x y900-930 (30 tall), ratio 1.40 = spec 17:12; battery
  outline x1013-1065 (52 wide) x y905-930 (25 tall), ratio 2.08 =
  spec 27:13, fill ~74% of total width = spec inner 20/27.
  Spec and photo agree on all three forms.
- Glyph table (spec value vs slot-adapted value vs photo check):
  signal: spec 4 rects 3.2 wide, rx 0.7, (x0,y7.5,h4.5) /
  (x4.8,y5,h7) / (x9.6,y2.5,h9.5) / (x14.4,y0,h12), viewBox 19x12
  -> adapted SVG 11x8, preserveAspectRatio xMidYMax meet, drawn
  bars 2 wide, heights 3/4/6/7, group box unchanged 11x8 ->
  photo: 4 bars, ascending, rounded tops. MATCH. (v1.5 had 3 bars
  3px wide; the 4th bar is the spec/photo correction.)
  wifi: spec outer arc M8.5 3.2... / inner arc M8.5 6.8... /
  dot cx8.5 cy10.5 r1.5, viewBox 17x12 -> adapted SVG 11x7,
  xMidYMid meet, drawn outer arc 8 wide, inner 5, dot 2x2 ->
  photo: 2 arcs + dot, ratio 1.40. MATCH. (v1.5 custom stroked
  arcs retired; spec glyphs are FILLED shapes, no stroke.)
  battery: spec outer rect (0.5,0.5,23x12,rx3.5,stroke opacity
  0.35,fill none) + inner rect (2,2,20x9,rx2) + nub path M25
  4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z
  (opacity 0.4), viewBox 27x13 -> adapted SVG 16x8, xMidYMid
  meet, drawn outline 14x7, fill 12x5, nub 1x2 -> photo: outline
  + ~74% fill + nub. MATCH. (v1.5 fill was 6px wide; R13's
  "neither value provable" is now CLOSED: spec + photo agree.)
  time: spec family -apple-system/SF Pro, weight 590, size 17,
  line-height 22px, paddingTop 1.5 -> adapted: size stays the
  original slot 8px, weight 700 -> 600 (590's nearest SF
  weight), family stays the token stack. DOM time box 17px wide
  -> 16px wide (Semibold narrower), group position unchanged.
  Spec-scaled size (17 x 270/402 = 11.4px) was computed and
  DELIBERATELY NOT applied: the mockup miniaturises everything
  consistently (island, group, 26px avatars, 48px rows), and
  scaling only the time to full-iOS proportion would break
  mockup-internal consistency. Size decision recorded, not
  hidden; a coordinator who wants full-iOS proportions must
  rescale the whole phone, not one glyph.
  island: spec 126x37 (402 frame) -> scaled 85x25 by phone
  width, but KEPT at the original slot 48x15 (same
  mockup-consistency reason; DOM island rect unchanged
  (964,406) 48x15). home indicator: spec 139x5 -> scaled 93x3.4,
  NOT added: the original mockup has no home indicator (feed
  scrolls to the bottom edge); adding one would be invention.
  statusbar container: padding 8px 16px 2px, row 34px, cluster
  gap 3px all unchanged (slot values).
- Status group after: time (876,414) 16x10, island (964,406)
  48x15, cluster (1056,415) 44x8 (signal 11x8 + gap 3 + wifi
  11x7 box + gap 3 + battery 16x8 box) - same 44px total and
  same position as v1.5. Only the glyph FORMS changed inside
  unchanged boxes. Phone-stage 2x eye check
  (measure/phone-stage-after-2x.png): 9:41, island, 4 bars,
  wifi arcs, full-ish battery, correct order, no clipping.
- New glyph components: SignalMark + BatteryMark in icons.tsx,
  WifiMark rewritten to the spec paths (same export name).
  Old v1.5 WifiMark stroked-arc geometry is retired, not kept
  alongside.

### Pixel + DOM cross-check

- Window-main before (v1.5 code, SF render) vs after (v1.6):
  2467 / 802800 pixels changed, max channel delta 240 (battery
  fill black-on-white + new bar/arc forms in the tiny status
  glyphs). Localisation: titlebar bands x100-200 (sidebar
  capsule rim) + x1050-1199 (preview capsule/toggle rims);
  body-top x800-1150 (phone glyphs + appbar button rims);
  bottom band x0-700 (composer bottom edge rows y656-657 only,
  +1/+2 levels; sidebar footer button rims). No other region
  moved: window rect 1200x668, sidebar 198, conversation and
  preview boundaries, avatar discs, bubbles, task card, toast
  all pixel-identical outside the listed bands.
- Side-by-side: side-by-side-v15-v16.png (2400 wide, v1.5-code
  SF render left, v1.6 right, same size). Eye differences, then
  measured: (a) phone battery fill visibly fuller (6px -> 12px
  drawn); (b) signal shows 4 bars (was 3); (c) wifi arcs are
  filled spec arcs (was stroked custom); (d) time slightly
  narrower (Semibold); (e) control bottom edges carry a faint
  rim light (<= 2 levels, only on the bottom 1-2 rows); (f) no
  other visible difference: columns, traffic lights, project
  icon, tabs, tiles, feed, task card, composer, toast unchanged
  in form. Gallery full page: sections 1-7 present, no overflow,
  no missing element.
- Regression probes (v1.5 scripts re-run against the new dist):
  probe-dom2 EMPTY diff. probe-dom diff = ONLY the intentional
  composerShadow rim layer (plus one timing artifact, see R25).
  probe-collapsed diff = ONLY page y positions -18px (collapsed
  window rects still 1200x668 at x40; icon centres 487 / 470 /
  720 unchanged; collapsed titlebar shadow none, strip backdrop
  blur(4px) saturate(1.45) unchanged). The -18px is gallery
  chrome, not window geometry: the SF-narrower header paragraph
  wraps to one fewer line than under Noto, shifting everything
  below it up; window-internal values are untouched.

### Full rescan residual count (v1.6)

- Closed this round: R13 (battery fill: spec + photo agree, 20/27
  proportion shipped). Items closed: font runtime (SF), title
  wrap (none found), status glyph forms (3), control rim light
  (1 token pair), refraction question (answered: rejected, 4
  probes). The round is NOT clean: 24 residuals remain (R1-R12,
  R14-R25 below, R13 closed), numbered with numbers.
- R1 SF host behaviour for >= 20px titles (Display vs Rounded on
  Apple devices) unencodable in the token without breaking it;
  harness override covers verification renders only - carried,
  narrowed from v1.5 (SF itself is now installed and measured).
- R2 Avatar faces redrawn geometry - carried.
- R3 Project tiles vector mini-icons on flat tints (originals are
  photo covers) - carried.
- R4 Service-column background rgba(249,249,247,0.92)
  (user-photo right column unreadable) - carried.
- R5 Gallery backdrop flat #ececea, not the marketing page's
  colourful gradient - carried (this is also why the window
  looks flatter in the gallery than on a real desktop; see R23).
- R6 Native iPad differences as platform gaps - carried.
- R7 Send blue #1987f7 per native evidence, against the web
  demo's gradient/black variant - carried.
- R8 Dark mode unrendered (light only, table B reserve) - carried.
- R9 Preview/sidebar collapse mid-state (slide + fade) differs;
  end states identical - carried.
- R10 Device-tab switch animation + tablet phone form not
  implemented - carried.
- R11 Project-icon swap animation not implemented - carried.
- R12 Titlebar focus-visible ring not implemented (keyboard-only,
  invisible in screenshots) - carried.
- R14 Status glyphs are still hand redraws (now spec-geometry
  redraws, not raster copies): at 8px, pixel-exact raster match
  is not resolvable from raster evidence alone; forms, ratios
  and fill proportion now match spec + photo.
- R15 Clover mark + device-inbound + line-decrease custom morphs
  - carried.
- R16 Desktop body copy from the iPad thread, not verbatim desktop
  - carried.
- R17 Gallery chrome (header, notes, token swatches, primitives,
  bottom bar adapted) is not original - carried; bottom bar
  stays labelled as adapted, never claimed as original 1:1.
- R18 Titlebar inset pixel 241 vs body 242 (delta 1, border-edge
  antialiasing; DOM identical) - carried.
- R19 Post-backdrop 1-level compositing shifts - carried.
- R20 Online dot text glyph (font-dependent box 5x8) - carried.
- R21 Resizer drag physics + message playback timing are host
  contracts; Assets.car values unmeasured - carried.
- R22 NEW: project-tile hover/active vs REA table A: tile hover
  bg 0.5 (code) vs REA 0.58, active border hairline 0.045 (code)
  vs REA rgba(255,255,255,0.94). NOT changed this round: the
  table row gives no shadow-layer variant, prior rounds' tile
  values may reflect shadow evidence not re-examined here, and
  hover/active states need interaction probes to verify. Exact
  numbers recorded for a later round to adjudicate.
- R23 NEW (verdict root-cause note): the "flat" window look in
  verification shots is substantially a backdrop artifact: REA
  blur(34px) saturate(1.24) over the flat #ececea gallery
  backdrop (R5) has almost nothing to blur, while on a real
  desktop the same values blur wallpaper. Strengthening the
  window values to compensate would break 1:1; the correct fix
  would be a wallpaper-backed verification stage, which is a
  harness decision, not a token change. Not changed.
- R24 NEW: SVG displacement refraction rejected (4 probes, see
  material section). Do not retry without a new mechanism.
- R25 NEW (probe artifact, NOT a regression): probe-dom.cjs
  tileHoverBg reads 0.34 (idle) on immediate read after hover()
  in this run, vs 0.5 in the v1.5 record. Proven artifact, not a
  code change (ProjectTile untouched this round): manual
  mouse.move + 800ms wait reads 0.5, and synthetic mouseover
  reads 0.5, in the same session; the probe reads before React
  flushes hover state under this shell. Recorded so the next
  rerun is not mistaken for a regression.

### Build

- /home/hatch/.npm-global/bin/pnpm build -> tsc -b && vite build,
  1978 modules, pass. Final hashes: dist/assets/index-U0CJA-ff.css
  (16.98 kB) and index-BrXXYHVi.js (305.02 kB). Final screenshots
  were shot against this build with the optical-size override;
  probe-after.txt reflects the same build + override.

### Files changed

- README.md (statusbar 8px/700 -> 8px/600, two mentions).
- src/tokens/tokens.ts (controlShadow + footerShadow rim layer).
- src/components/icons.tsx (SignalMark + BatteryMark new, WifiMark
  spec rewrite, comment block).
- src/components/Preview.tsx (spec marks, time weight 600).
- src/App.tsx (section-4 note statusbar weight).
- docs/verification/rounds/v1.6/ (all new: gallery x3, window
  shots x3, side-by-side-v15-v16, baseline SF shots + probes,
  refraction probes 1-4 + backdrop-url probes, measure crops,
  probe-before/after, regression reruns, shoot + probe scripts).
- CHANGELOG.md (this entry).


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

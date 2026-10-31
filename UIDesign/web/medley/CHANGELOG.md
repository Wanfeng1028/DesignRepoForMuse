# Medley — Desktop / Web CHANGELOG

> Scope: UIDesign/web/medley only. Desktop layout itself has no original
> image; 1:1 covers tokens and component forms (see README residual 1).

## v1.8 — 2026-11-01 (round 9 interaction line: iOS behaviour + title-weight audit)

- Interaction line, not a review round. No judge call was made in this
  round: acceptance rests on PIL/DOM measured numbers + recorded video
  only. Build passes: pnpm build (tsc -b && vite build), final
  dist/assets/index-DN9c5q3g.js, 423.00 kB. Scope:
  UIDesign/web/medley only (src files below + this entry + README
  residual notes + docs/verification/rounds/v1.8/ evidence; nothing else
  in the repo touched, verified by git status before commit; the
  app/medley working tree was dirty with another worker's changes all
  session and was never touched). Desktop top bar deliberately
  untouched (no mobile-screen evidence covers desktop chrome).
  Screenshots: docs/verification/rounds/v1.8/ — gallery-fullpage.png
  (1280x15083), sec-*.png per section (incl. new sec-interactive.png,
  1240x1005), panel-*.png per panel (incl. new panel-interactive.png,
  390x721), state-*.png phone states, sidebyside/pair-*.png flagship
  original-vs-render pairs at equal width, behaviour.json +
  shot-v18-final.log (14/14 behaviour assertions pass). Videos:
  docs/verification/rounds/v1.8/video/ — rotation.webm (11.52 s),
  send.webm (6.88 s), sheet.webm (5.52 s), tabs.webm (6.16 s), all
  re-recorded on the final build; mid-frames eye-checked (sheet frame
  shows the picker open with handle bar; rotation frame shows the
  second demo sentence).

- What was built (src/lib/ios-motion.ts new; src/index.css appended
  classes only, no backdrop-filter anywhere — Tailwind v4 strips the
  standard property, so glass stays in React inline styles as before;
  src/components/phone-demo.tsx new live demo; src/App.tsx new
  "interactive" section before the composer section, no existing
  section modified; button/controls/input gained press + focus rings;
  welcome-panel/composer/chat-info-sheet gained opt-in interactive
  props whose absent-prop render path is identical to v1.7):
  - Welcome title rotation: opt-in rotate prop. While rotating, the
    title crossfades/slides (450 ms iOS ease) and the cursor dot
    re-tints per sentence while staying in place. Dwell 3200 ms.
  - Picker bottom sheet / search drawer / chat-info sheet: iOS
    presentation motion, 500 ms in / 400 ms out on
    cubic-bezier(0.32,0.72,0,1), handle bar on the sheet, real scrim
    button; open/close state machine (30 ms mount-then-show, 400 ms
    close) so the CSS transition animates. Drawer slides from the
    left; sheets slide from the bottom.
  - Chat: controlled composer (Enter sends), end control morphs
    mic -> send-arrow when text is present, vivid-orange stop control
    (Lisbon generating state) while sending; thinking phase 900 ms
    (three-dot bounce, 1.2 s cycle, staggered 0.15 s / 0.3 s);
    word-by-word streaming 40 ms/word; stop halts streaming and keeps
    partial text with meta "Stopped". Message list scrolls (native
    momentum, -webkit-overflow-scrolling: touch) and auto-scrolls to
    bottom; initial thread has 3 turns so the list genuinely overflows
    (scrollHeight 663 > clientHeight 537, scrollTop set to 50 sticks).
  - Navigation: push/pop 350 ms iOS ease, outgoing screen parallaxes
    to -30% (iOS navigation convention, unmeasured), guarded during
    transition; welcome -> home -> chat stack; status bar 10:24 +
    home indicator on every demo screen (measured from originals).
  - Press/feedback: buttons scale 0.97 + opacity 0.90 in 100 ms;
    segmented control sliding indicator 300 ms; slider thumb press
    1.15; focus ring #2E7CE6 on buttons/segments/slider/input (the
    composer inner input is exempt by design: iOS text fields show a
    caret, not a ring; caret colour #2E7CE6). All new motion disabled
    under prefers-reduced-motion.

- Interaction comparison (original behaviour vs implementation vs
  parameters; every duration/curve is an iOS platform convention
  marked UNMEASURED because the originals are static — the only
  measured motion facts are the behaviours themselves and the
  sapphire cursor frame):
  | item | original | implementation | parameter |
  | welcome rotation | sentences rotate, one colour each; sapphire frame observed (photo-9 caption) | rotate prop, crossfade + per-sentence cursor tint | dwell 3200 ms, fade 450 ms, UNMEASURED |
  | picker sheet | bottom sheet with handle + scrim | sheet + handle + scrim button | 500/400 ms iOS ease, UNMEASURED |
  | search drawer | drawer presentation | left slide + scrim | 500/400 ms iOS ease, UNMEASURED |
  | chat-info sheet | sheet presentation | bottom sheet + working close X + scrim | 500/400 ms iOS ease, UNMEASURED |
  | composer/send | composer + send | controlled input, Enter sends, mic->send morph | press 0.97/100 ms |
  | thinking/streaming | thinking + streaming states | 3-dot indicator, word streaming | think 900 ms, stream 40 ms/word, UNMEASURED |
  | stop | generating state with stop affordance | orange stop control, halts, keeps partial + "Stopped" | demo behaviour, flagged |
  | press states | iOS press feedback | scale 0.97 + opacity 0.90 | 100 ms |
  | segmented control | Chat/Agents segment | sliding indicator | 300 ms iOS ease |
  | slider | iOS slider feedback | thumb press 1.15 + focus ring | — |
  | push/pop | iOS slide + spring | 350 ms slide, outgoing parallax -30% | 350 ms, parallax UNMEASURED |
  | tab-bar switching | N/A — no bottom tab bar in any original | segmented Chat/Agents is the set's tab mechanism (video tabs.webm) | — |
  | switch | N/A — no UISwitch in any original | none demoed | — |
  | scroll momentum | iOS momentum scroll | native momentum scrolling | — |
  | edge bounce | iOS edge bounce | N/A in headless Linux Chromium (OS-level, not faked); scrollability verified by API | — |
  | status bar / home indicator | 10:24 on all originals | 10:24 + home indicator on every demo screen | MEASURED |
  | focus rings | iOS focus affordance | #2E7CE6 outline (composer input: caret) | — |

- Rotation copy determination: only "Let's discover" + sapphire
  (#B4D3EF core / #2E7CE6 edge) is observed. The demo rotation list
  is (1) "Let's discover", sapphire, OBSERVED; (2) "Every idea, one
  app", green (#C8E8D8/#2FA08C, existing brand-green token), DEMO
  placeholder; (3) "Ask anything, anywhere", pink
  (#F2D4DE/#C65D7B, existing brand-pink token), DEMO placeholder.
  Placeholders exist only to prove the mechanism and to make the
  rotation video possible; they are not original copy. The shipped
  WelcomePanel default stays static with the observed frame only.
  The gallery header already disclaims that all screen copy is demo
  content. (Observed: placeholder 2 wraps to two lines at 41 px in
  the 390 px frame — acceptable for a demo placeholder, not a
  product defect.)
- Chat-info trigger determination: no trigger is measured in the
  originals, so chat-info opens only from the demo control row — no
  invented in-phone affordance was added. Picker opens from the
  model pill; drawer from the menu button (both original-plausible).
- Home greeting position: demo home greeting sits low via the same
  flex-1 spacer HomePanel uses (an earlier demo build placed it near
  the top with pt-16 and was corrected).

- Title-weight audit (method: stem-width / cap-height ratio, scale
  free; adaptive midpoint threshold, 8-connectivity components,
  height >= 0.35 x max, cap from modal bottom minus min top, stem
  columns spanning >= 85% of cap height, median run width; the v1.7
  ink-coverage method is void and was not reused). Reference ladder
  (PIL, SF Pro Display, same strings): "Let's discover" Regular
  0.105 / Medium 0.136 / Semibold 0.157 / Bold 0.187 / Heavy 0.227;
  "Your account is suspended" Regular 0.075 / Medium 0.117 /
  Semibold 0.145 / Bold 0.168 / Heavy 0.210. Original measurements
  (tight boxes found from ink bands, verified by viewing crops;
  per-phone scales differ, which is why ratios, not pixels, are
  compared — HD5 phones are a stitched collage, not uniformly
  scaled):
  | title | ratio | conclusion | token |
  | welcome 41 px (photo-9) | 0.104, cap 48, runs [7,4,6,3]; main stems L 7 px (SB-exp 7.5), d 6 px; median dragged down by JPEG blur-thinned thin stems | Medium-Semibold, clearly below Bold | Bold -> Semibold |
  | greeting 27 px (HD5) | 0.150, cap 20, runs [3,3,3]; SB-exp 3.3 px, Bold 3.7 px | Semibold-leaning (1 px = 0.05 at cap 20) | Bold -> Semibold |
  | pricing 22 px (HD5) | 0.125, cap 20, runs [3,2,4,2]; SB-exp 0.164 | lighter than Semibold, below Bold; weak at this resolution | Bold -> Semibold |
  | credits 37 px (HD5) | per-glyph: '1' stem 4 px / cap 37 = 0.108, '4' stem 3 px / cap 38 = 0.079 (digit-median invalid: side strokes mix with main stems) | Regular-leaning, below Semibold, well below Bold | Bold -> Semibold |
  | suspended 26 px (v1.7 crop) | 0.133, cap 60, runs [6,5,10,10]; SB-exp 8.7 px, Bold 10.1 px | Semibold (1 px = 0.017 at cap 60) | Bold -> Semibold |
  | picker 20 px (HD5) | 0.077, cap 13, runs [1,1,2] | inconclusive by resolution (1 px = 0.077) | Bold -> Semibold by pattern |
  | chat-info title 20 px, language title 20 px, credits header 20 px | not independently measurable (overview images only) | pattern | Bold -> Semibold by pattern |
  Decision rule: one single title weight for the set. Semibold is
  the best single weight for every title: no title measures near
  Bold (0.17-0.19); greeting/suspended sit at Semibold; pricing
  leans lighter; welcome/credits lean Regular but Semibold is still
  closer than Bold for both (|0.104-0.157| = 0.053 vs 0.083;
  credits '1' |0.108-0.166| = 0.058 vs 0.086). Per-title weights
  (e.g. welcome Regular) were rejected as overfitting single
  compressed frames and breaking the set's single-title-weight
  design. Deliberately UNCHANGED: chat-info stats values (27 px,
  weight unmeasured in the originals); agent-team 19 px title
  (unmeasured, not a page title); gallery section headings (gallery
  chrome, not product titles); brand wordmarks (17/19 px); all
  body/list/section-title bold text; plan names; button labels.
  Files changed: welcome-panel.tsx (title span, both branches),
  home-panel.tsx (greeting), phone-demo.tsx (demo greeting),
  pricing-panel.tsx (22 px h1), suspended-panel.tsx (26 px title),
  credits-panel.tsx (37 px number + 20 px header),
  model-picker.tsx ("Choose a model"), chat-info-sheet.tsx
  ("Chat info"), language-panel.tsx (title).
  Rasterizer caveat (mandatory reading): browser renders on this VM
  read systematically +0.03-0.05 heavier than PIL design ratios
  (FreeType + Chromium hinting/subpixel AA adds roughly 1 CSS px to
  stems). Evidence: old browser-Bold ratios welcome 0.220, greeting
  0.231, pricing 0.242, suspended 0.243, picker 0.233 vs PIL-Bold
  0.187/0.186/0.199/0.168/0.197; new browser-Semibold ratios welcome
  0.186 (was 0.220), greeting 0.205 (was 0.231), pricing 0.194 (was
  0.242), suspended 0.189 (was 0.243), picker 0.200 (was 0.233) vs
  PIL-Semibold 0.157/0.167/0.164/0.145/0.165 — a constant +0.03-0.04
  offset, the same offset as under Bold, and the before/after drop
  (0.03-0.05) matches the PIL Bold->Semibold step. This proves the
  weight mapping is correct (600 does not map to 700) and the change
  genuinely lightened the design weight. The VM's post-change ratios
  (~0.19) must NOT be read as "still Bold": on Apple devices (Core
  Text, without this offset) the render sits at design-Semibold,
  near the original readings.

- Full-set resweep (v1.8 panels/sections vs v1.7, same harness):
  raw pixel diffs are large everywhere (panels mean abs 2.2-4.5,
  pct pixels with max-channel diff > 10 = 2.1-5.4%, diff boxes
  spanning whole panels) INCLUDING panels with no code changes
  (phone-chrome 2.218 / 2.077% / 1763 px; agent-team 5.422%).
  Diagnosis, proven by a clean-worktree control (HEAD v1.7 code,
  built and shot in the current environment, ~/workspace/wt-v17,
  deleted after use): worktree-v1.7 renders are PIXEL-IDENTICAL to
  the committed v1.7 panels (mean 0.000, 0 differing pixels on all
  six control panels) — the environment is stable, so the diffs are
  real effects of this round's code, and their pattern (diff map =
  text-row edges only, flat areas matching) identifies them as
  (a) intended Semibold title-glyph changes, (b) fractional-Y
  rasterization phase: Semibold reflow changes fractional page
  heights above each panel, shifting each element's fractional Y
  offset and hence its text antialiasing phase, and (c) +-1 px
  screenshot-height rounding from those fractional offsets (proof:
  drawer box height is IDENTICAL 848.71875 CSS px in v1.8 and
  wt17, while screenshot heights are 849 vs 850 because
  ceil(y+h)-floor(y) flips with the fractional Y: v1.8
  y=9288.203 -> 849, wt17 y=9264.703 -> 850). Material/colour
  layers are intact: flat-zone medians are identical between v1.8
  and wt17 on every zone checked — welcome base-top (17,20,26),
  warm glow (237,238,242), green glow (36,67,67), home-en composer
  interior (238,244,244), chat-info sheet interior (234,235,238),
  agent-team panel bg (17,21,24), drawer bg (17,21,24),
  phone-chrome bg (17,21,24), pricing bg (17,21,24), suspended bg
  (245,246,248), language bg (245,246,248), picker bg (30,31,35);
  only the welcome blue-halo zone differs by 1 green level
  ((32,46,66) vs (32,47,66)). Panel/section +-1 px height deltas
  (credits 896/897, chat-info 788/787, drawer 849/850, language
  733/734; sections chat 2285/2284, credits 1006/1007, agent-team
  983/982, drawer 959/960, chat-info 898/897, language 843/844,
  desktop-home 853/854, phone-chrome 466/465) are Semibold reflow +
  fractional rounding, not regressions. New in v1.8 (no baseline):
  panel-interactive.png (390x721), sec-interactive.png (1240x1005),
  gallery-fullpage.png (1280x15083).
  Residuals carried forward: (1) blue-halo 1-level median difference
  (gradient dithering + fractional phase, negligible); (2) picker
  title weight by pattern only (resolution limit); (3) chat-info /
  language / credits-header titles by pattern only (overview images
  only); (4) chat-info stats + agent-team 19 px weights still
  unmeasured and unchanged; (5) rotation sentences 2-3 are demo
  placeholders, not original copy; (6) all motion timings are iOS
  conventions, unmeasured from static originals; (7) edge bounce
  not reproducible in headless Linux Chromium.

- Verification scripts (all in docs/verification/rounds/v1.8/):
  shot-v18.cjs (fullpage + sections + panels + 9 phone states + 14
  behaviour assertions), video-v18.cjs (single-clip argument
  supported), render-titles.cjs (DSF=2 title element shots),
  stem-audit.py (runs the audit on import — not importable as a
  module), resweep-v18.py + resweep-v18.log, shot-wt17.cjs (worktree
  control panels), drawer-height.cjs (fractional-height probe),
  behaviour.json, shot-v18-final.log (14/14), stem/ (tight original
  crops, render crops, zone images, welcome-mask-3x.png).
  Test bugs fixed during the round (not product bugs): the
  welcome-initial assertion expected exactly "Let's discover" while
  the demo had already rotated (fixed to accept any rotation-list
  sentence); scrim clicks must tap the visible scrim strip
  (sheet: frame-relative x 195, y 20; drawer: x 360, y 360) because
  Playwright clicks the scrim centre, which the panel covers.

## v1.7 — 2026-11-01 (fix round; round 9: iOS texture close-out — font / material / glyph lines)

- Fix round, not a review round. No judge call was made in this round:
  every verdict below rests on pixel samples / computed values / eye
  pairs, not on any judge verdict. Build passes: pnpm build
  (tsc -b && vite build). Scope: UIDesign/web/medley only (src files
  below + this entry + docs/verification/rounds/v1.7/ evidence; nothing
  else in the repo touched, verified by git status before commit).
  Screenshots: docs/verification/rounds/v1.7/ — gallery-fullpage.png,
  sec-*.png per section (incl. new sec-phone-chrome.png),
  panel-*.png (panel-only shots, incl. panel-phone-chrome.png),
  sidebyside/pair-*.png (11 original pairs + pair-phone-chrome.png),
  glass-test.html/png + glass-test-noblur.html/png (refraction probes),
  shot-sections.cjs / shot-panels.cjs / title-audit.cjs /
  title-widths.cjs / verify-dom.cjs / resweep.py / pair.py /
  font-bands.cjs / debug-bf.cjs / debug-bf2.cjs / debug-sheet.cjs
  (probe scripts; debug-sheet-*.png = sheet backdrop hide/show test).
  Render pipeline for ALL v1.7 shots: Playwright headless shell 1243
  (explicit executablePath chrome-headless-shell; playwright-core
  default 1248 is not installed and is never relied on), file:// dist,
  SF render (see font line), plus the harness-only Display override
  (see below). Earlier Inter renders are void and were not reused.
  fontconfig was NOT touched in this round (coordinator-owned alias).

- A. FONT LINE — SF render, tokens untouched. The repo font token
  (--font-sans, -apple-system stack) is unchanged: on Apple devices it
  still resolves to SF, which is correct. What changed is only this
  VM's render pipeline: fontconfig now resolves sans-serif /
  PingFang SC / Noto Sans SC to SF Pro Text (Inter is fallback only),
  and the shot harness applies the iOS optical-sizing override after
  load (leaf elements with computed font-size >= 20px get
  "SF Pro Display", then 500ms wait before screenshot) — harness-only,
  product code untouched. SF files never enter the repo or dist.
  Title widths (DOM Range, CSS px) — Text vs Display, and the
  phone-width verdict at 350px content width (390 frame minus 2x20
  padding). Display is ~8-10% narrower everywhere; that narrowness IS
  the iOS look Text misses:
  * welcome title 41px: Text 298.9 / Display 270.2 (Display -9.6%).
  * home greeting EN 27px: 268.0 / 242.7 (-9.4%).
  * home greeting CN 27px: 169.7 / 165.1 (-2.7%; CJK glyphs fall back
    to the platform CJK font — SF has no CJK — so the CN delta is
    small; on Apple devices this is PingFang, not a defect, see R13).
  * pricing title 22px: 259.8 / 234.6 (-9.7%).
  * credits huge number 37px: 137.1 / 126.3 (-7.9%).
  * suspended title 26px: 362.0 / 331.0 (-8.5%).
  * picker title 20px: 163.8 / 151.0 (-7.8%).
  Title wrap table (orig lines / Text lines / Display lines). At
  gallery widths every title is 1 line under both fonts (title-audit:
  all 11 titles 1 line Text and 1 line Display). At phone width the
  one wrap-sensitive title in this set is the suspended title:
  orig 1 line (ov-suspended crop, "Your account is suspended" on one
  line) / Text 362px > 350px = 2 lines (WRONG) / Display 331px <
  350px = 1 line (RIGHT). Every other title fits under both fonts at
  350px (welcome 298.9/270.2, greeting 268.0/242.7, pricing 259.8/
  234.6, credits 137.1/126.3, picker 163.8/151.0). Determination: no
  product size/weight change is needed — on Apple devices the OS
  picks Display for >= 20px text automatically, so the shipped token
  is already right; the harness override is what makes verification
  truthful, and any future phone-width render must use Display.
  Ink bands (post-fix SF renders, PIL row scans): welcome title ink
  31px vs SF Display bold cap 29.4px + anti-aliasing (expected
  30-31, PASS); home greeting ink 24px vs ascender-to-descender
  ~25px + anti-aliasing (PASS within 1px). No font size, weight, or
  token changed in v1.7 — the font fix is the render pipeline, and
  the numbers above are its proof.

- B. MATERIAL LINE — Liquid Glass, 1:1-bounded. Recipe sources:
  ios27-design-system (seunghan91 iOS 27 Liquid Glass web edition)
  for blur tiers / saturate / tints / transparency formula, and
  glassy-liquid (19 iOS 26 controls) for specular 1.1-class rim,
  shadow 0 10px 26px rgba(0,0,0,.16), inner hairline inset 0 0 0 .5px
  rgba(0,0,0,.04), focus ring (not applicable here — no focus state
  is rendered in the static gallery). Only material technique was
  taken (refraction, edge light, dispersion, shadow); no vendor
  control look was copied into this set.
  Displacement (nikdelvin-liquid-glass, MIT, technique only):
  rounded-rect map (fill #808080, blur(depth)) over X/Y gradient
  ramps composited with screen blend; three feDisplacementMap
  passes, R = strength + 2*CA, G = strength + CA, B = strength,
  blended with screen; applied as backdrop-filter: url(#medley-lg)
  (the filter's SourceGraphic IS the backdrop), so element text is
  never displaced. Probe results (glass-test*.png, striped backdrop):
  at blur 12px the 28 and 100 strengths look alike (blur masks warp);
  at blur 0px, 28 visibly warps stripe edges while text stays crisp,
  and 100 warps hard with green/purple chromatic fringing at edges.
  Shipped params: strength 28, CA 2 (R 32 / G 30 / B 28) — 100 was
  rejected as breaking 1:1. The map is a fixed 400x160 nominal tile
  (radius 26, depth 8) stretched by feImage preserveAspectRatio=
  "none" to each surface's box; corner radii stretch with the box,
  acceptable for an edge-refraction map (probe boxes were 180x120).
  Tiers shipped: chrome 50px, panel 90px (transparency formula at
  default t = 0.5: 100*(0.5+0.8*0.5) = 90), small 6px; saturate 1.8
  everywhere. Tints: light large rgba(250,250,250,0.70), dark
  rgba(31,32,36,0.85) — NOT the recipe's rgba(0,0,0,0.80), which
  would read darker than the measured #1F2024 dark fills, so the
  dark tint keeps the measured fill's RGB; sheet
  rgba(255,255,255,0.92) — NOT 0.70, because the original sheet is
  white. Rim: inset 0 1px 1px white highlight (0.9 light / 0.25
  dark) + inner hairline .5px (rgba(0,0,0,.04) light /
  rgba(255,255,255,.06) dark). Shadows are NOT upgraded to the
  glassy floating shadow: composer keeps its resting 0 2px 12px
  rgba(0,0,0,.06), sheet/dialog keep their measured 0 -12px 32px
  rgba(23,24,28,.10); only the rim is added to those shadows.
  DELIVERY TRAP (caught by verify-dom.cjs, fixed in-round): putting
  backdrop-filter in index.css does NOT survive the build —
  Tailwind v4's Lightning CSS pass strips the standard property and
  leaves only -webkit-backdrop-filter, which Chromium's stylesheet
  parser then drops for url() values, so computed backdrop-filter
  silently became none (first verify-dom run: all surfaces none,
  tints/rims intact). The filter therefore travels as React inline
  styles from src/components/liquid-glass.tsx (glassChromeStyle /
  glassPanelStyle / glassSmallStyle), which the optimizer cannot
  touch; post-fix verify-dom shows url(#medley-lg) blur(50/90/6px)
  saturate(1.8) on every glass surface. The index.css comment
  records this trap so nobody moves the filter back into CSS.
  Per-surface table (original / before / after). Before = git HEAD
  values (solid fills, no backdrop filter anywhere in this set):
  * composer bar light (single + stacked): solid #FFFFFF + border +
    0 2 12 .06 shadow / after: blur 50 + saturate 1.8 + displacement
    28 + tint rgba(250,250,250,.70) + rim + same resting shadow.
    Tint math verified exactly: home-EN composer interior renders
    (238,244,244) = 0.70 x 250 + 0.30 x home gradient (~210,229,227).
  * composer bar dark (single + stacked + Lisbon stop): solid
    #1F2024 / after: blur 50 + saturate 1.8 + displacement 28 + tint
    rgba(31,32,36,.85) + dark rim. Lisbon composer interior mode
    (28,30,34) = 0.85 x (31,32,36) + 0.15 x dark panel bg, exact.
  * composer model-label pill: solid #2F3034 / #EDEEF0 / after:
    blur 6 + saturate 1.8 + displacement 28 + matching tint + rim.
  * drawer search pill: solid #1F2024 / after: blur 50 + saturate
    1.8 + displacement 28 + dark tint + dark rim.
  * home CN segmented pill: solid #EDEEF0 / after: blur 6 +
    saturate 1.8 + displacement 28 + tint rgba(237,238,240,.70).
    Selected segment stays solid white (measured selected state).
  * pricing segmented pill: solid #1F2024 / after: blur 6 +
    saturate 1.8 + displacement 28 + dark tint. Selected segment
    stays solid #2F3034 (measured selected state).
  * chat-info sheet: solid #FFFFFF + 0 -12 32 .10 shadow / after:
    blur 90 + saturate 1.8 + displacement 28 + tint
    rgba(255,255,255,.92) + rim + same shadow. Hide/show test
    (debug-sheet-*.png): behind-sheet is page bg (245,246,248);
    sheet composite renders (254,255,255) at the bottom and
    (255,255,255) above — a 1-level spread from screen-blend
    rounding, imperceptible, recorded as R12 not a defect.
  * dialog content (How credits work): solid #FFFFFF / #1E1F23 +
    0 -12 32 .10 shadow / after: blur 90 + saturate 1.8 +
    displacement 28 + sheet/dark tint + matching rim + same shadow.
  * welcome Try button: transparent over glows + 1px #43474C
    border / after: blur 50 + saturate 1.8 + displacement 28 +
    dark rim, border and transparency kept. Honest limit: over
    smooth radial glows the blur itself is visually negligible
    (Try interior grey std identical 46.0 pre/post); the visible
    Try change is the rim highlight (see R11).
  * welcome Google button: measured fill #EDEEF2 kept solid (the
    0.70 tint recipe was rejected here: over the dark glow it
    would render darker than the measured fill) + rim only.
  * NOT glassed, deliberately: pricing Pro card (its 1px dark-sub
    border is measured; a rim would falsify it), savings/compare/
    agent/drawer cards and the credits chart card (originals are
    opaque; no translucent surface exists there), credits panel as
    a whole (no translucent surface in the original — pricing's
    segmented pill is the pricing/credits glass surface in this
    round), DesktopLayout top-center pill (desktop chrome is
    deliberately untouched per the round brief — no mobile evidence
    covers it; see R10).
  * Glass visibility limits in this gallery (R11): most glass
    surfaces sit on flat backgrounds in the static gallery, so
    blur/displacement are computed-real but visually quiet; they
    are proven by the striped-backdrop probe and by computed
    values, and they become visible in-product where surfaces
    overlap scrolling content. The sheet likewise does not overlap
    content in the gallery layout (it sits below the backdrop
    remnant); the recipe is shipped for the real bottom-sheet
    overlap, not faked by restructuring the gallery.

- C. GLYPH LINE — status bar redrawn from spec, no Lucide
  approximation. New src/components/ios-status-bar.tsx: IOSStatusBar
  (dark/light, time prop default "10:24" to match photo-9, optional
  Dynamic Island) + HomeIndicator. Geometry is verbatim from
  baoyu-design/starter-components/ios-frame.jsx (iOS 26 UI Kit +
  Figma status bar spec), scaled by width/402; the gallery frame is
  390 CSS, so s = 0.970. Adaptation table (spec at 402 / adapted at
  390 / DOM-measured at 390): bar padding 21/24/19 / 20.4/23.3/18.4
  / 20.4/23.3/18.4 PASS; bar gap 154 / 149.4 / 149.4 PASS; time
  17pt weight 590 line-height 22 / 16.5/590/21.3 / 16.5/590/21.3
  PASS; signal 19x12 / 18.4x11.6 / 18.4x11.6 PASS; wifi 17x12 /
  16.5x11.6 / 16.5x11.6 PASS; battery 27x13 / 26.2x12.6 / 26.2x12.6
  PASS; home indicator 139x5 radius 100 / 134.9x4.9 radius 97 /
  134.9x4.9 PASS; island 126x37 radius 24 / 122.2x35.9 radius 23.3 /
  122.2x35.9 PASS. Signal bars (3.2 wide, rx 0.7, x0/4.8/9.6/14.4,
  y7.5/5/2.5/0, h4.5/7/9.5/12), wifi arcs (outer + inner paths +
  dot cx8.5 cy10.5 r1.5), battery (outer rect 0.5,0.5,23x12,rx3.5,
  stroke opacity 0.35, fill none; inner rect 2,2,20x9,rx2; nub path
  opacity 0.4) are the spec's own SVG paths, unaltered except the
  width/height scaling attributes. New gallery section
  "phone-chrome" (App.tsx): dark / light / island frames, 390 CSS
  wide, bodies empty on purpose so the chrome itself is the
  subject; panel-phone-chrome.png + sec-phone-chrome.png show all
  three; pair-phone-chrome.png pairs the render bar against the
  photo-9 TL status crop.
  Photo-9 cross-check — DETERMINATION (not averaging): photo-9
  confirms the FORMS (semibold time left, 4 ascending signal bars,
  wifi 2 arcs + dot, battery rounded rect + nub, white pill
  indicator centred, dark/light colorways) but its absolute pixels
  do NOT reduce to one scale — time glyph cap ~13px, home
  indicator height ~11px, right-cluster span ~90px imply scales
  ~1.07 / ~2.2 / ~1.17 against the spec, mutually inconsistent
  (stitched collage, quadrants at different scales, JPEG mush on
  small icons). Forcing one scale would fabricate geometry, so the
  spec stays the geometry authority and photo-9 stays form
  evidence; the pair caption states the scales differ. Where spec
  and photo disagree on absolute size, this determination (spec
  wins, photo form-confirms) is the recorded rule for this round.
  U9 status: PARTIALLY closed — the component + section now exist
  and are spec-exact; the other gallery panels remain chrome-free
  by design (they are content panels, not phone frames) and were
  NOT retrofitted with bars, which would have broken panel 1:1
  geometry. Retrofitting is a layout decision for a later round,
  not smuggled in here.

- FULL RESWEEP (post-fix, all panels re-shot). Panel sizes vs v1.6:
  welcome 560x481 SAME, home-en 588x561 SAME, home-cn 588x561 SAME,
  credits 720x897 SAME, picker-a 588x807 SAME, suspended 560x635
  SAME, agent-team 560x850 SAME; pricing 560x716 (+1), chat-info
  588x787 (-1), drawer 340x850 (+1), language 560x734 (+1) — 1px
  rounding from SF reflow; chat-lisbon 588x733 (+25) — SF reflow of
  the Lisbon thread body (Noto to SF line wraps), no geometry code
  in that thread changed (composer height, message layout
  untouched), recorded as R14. Welcome colour layer intact: zone
  medians v1.7 vs v1.6 identical — base-top (17,20,26), blue halo
  (32,47,66), green glow (36,67,67), Google fill (237,238,242) =
  #EDEEF2; round 7 colours did not regress. All 11 original pairs
  + the phone-chrome pair re-shot post-fix (sidebyside/pair-*.png).
  Eye pairs viewed post-fix: phone-chrome (3 frames), welcome,
  chat-info, home-en, composer states — all closed except the
  documented adaptations and residuals below.

- RESIDUALS (counted, with numbers; 14 items).
  R1 Hairline 0.5px still renders as a full 1 device pixel in this
    Chromium (v1.6 finding stands): verified by dist-CSS rule +
    class presence, needs true-device recheck.
  R2 Photo-9 absolute status-bar pixels are not a geometry source
    (scales 1.07/2.2/1.17 mutually inconsistent, see glyph line);
    spec is geometry authority, photo-9 is form evidence.
  R3 v1.6 U11 stands: pricing, credits, picker, drawer, agent-team,
    suspended, chat-info, desktop examples were swept visually
    against v1.3 evidence + HD colours; their per-element values
    rest on the v1.3 audit and are NOT re-certified 1:1 here.
  R4 The 390px CSS-width conversion (v1.3 P2-1) is still unprovable
    from JPEGs; the 390 frame is a convention, and the status-bar
    scale 390/402 inherits that convention.
  R5 v1.6 U3 stands: drawer recent colours, drawer pinned dots,
    legend/by-model direct-centre samples, savings big-number size,
    credits bar exact height sequence, activity dot colour,
    agent-team / suspended / chat-info / picker row-level colours
    rest on the v1.3 audit / OV15 collage.
  R6 v1.6 U5/U6/U7 stand: welcome secondary greys (+-~5), Try
    border #43474C (+-10 blur-corrected), dark circle mic orange
    #D95E27 not re-measured against an isolated HD dark-mic still.
  R7 v1.6 U8 stands: Lisbon Claude action row (EN complete state)
    vs CN streaming state (no action row yet) is a state
    difference, unresolved.
  R8 v1.6 U10 stands: icons are Lucide substitutions for the
    original custom icons (mandated library), not pixel-identical
    — except the status-bar glyphs, which are now spec SVG.
  R9 Gallery panels (other than the new phone-chrome section)
    remain chrome-free by design; U9 is partially closed (see
    glyph line), not fully.
  R10 Desktop top bar (M mark + Auto pill geometry) deliberately
    untouched this round: no mobile evidence covers desktop chrome.
  R11 Glass visibility limits in the static gallery (see material
    line): blur/displacement are computed-real but quiet on flat
    backdrops; Try-button blur negligible over smooth glows (std
    46.0 pre/post); sheet blur has no overlap to show in-gallery.
  R12 Sheet composite 254 vs 255 across the sheet (1-level
    screen-blend rounding on near-white); imperceptible.
  R13 CJK glyphs render via the platform CJK fallback on this VM
    (SF has no CJK); on Apple devices this is PingFang. Not a
    defect, but CN text widths here are fallback widths.
  R14 Chat-lisbon panel +25px height vs v1.6 from SF reflow
    (Noto to SF); no thread geometry code changed.

## v1.6 — 2026-10-30 (fix round; round 8: Apple iOS texture inside 1:1 + precision gates)

- Fix round, not a review round. No judge call was made in this round:
  every verdict below rests on pixel samples / computed values / eye
  pairs, not on any judge verdict. Build passes: pnpm build
  (tsc -b && vite build) — one type error caught and fixed mid-round
  (drawer nav icon union gained "list-checks"). No commit, no push, no
  git add; changes left in the worktree for the coordinator. Scope:
  UIDesign/web/medley only (16 source files + this entry; nothing else
  in the repo touched, verified by git status).
- Screenshots: docs/verification/rounds/v1.6/ — gallery-fullpage.png
  (post-fix; pre-fix copy kept as pre-fix-gallery-fullpage.png),
  sec-*.png per section (post-fix), panel-*.png (panel-only shots),
  sidebyside/pair-*.png (original crop + render panel at equal width,
  post-fix; sidebyside/pre-fix/ keeps the pre-fix pairs),
  measure/*.py + *.cjs (sampling / screenshot / computed scripts),
  crops/ (magnified original crops + render crops, measurement evidence
  only; no official bitmap is copied into the design system — all marks,
  dots and icons are vector redraws), panel-language-dpr2.png +
  hairline-test.png (hairline paint investigation, see R14).
- iOS TEXTURE READING (user order 2026-10-30 17:44): the originals are
  themselves an iOS app, so "Apple texture" here means restoring iOS
  native details, never restyling: SF-style metrics via the -apple-system
  stack (unchanged), hairline separators (0.5px), iOS easing curves on
  morphing, native component forms (segmented control, sheets, pills,
  drawers), Lucide icons redrawn to measured line weights. No redesign
  was done; every change below traces to a measured original value.
- PRECISION GATES (user order 2026-10-30 17:46), evidence:
  (1) 1px level: 1-2px / 1-4 level deltas are recorded per item in the
  fix table; the only deltas excused as noise are the ones with a stated
  noise proof (agent-team pair diff = 30 pixels at +/-1 level on rounded
  card corners, resize anti-aliasing; drawer avatar edge blur +/-3 CSS
  at OV resolution).
  (2) Small elements: status-bar icons, dividers, tiny labels, icon
  endpoints, shadows, hairlines, corner arcs all appear in the eye-diff
  list and the fix table (menu bars, clock ring, badge, lock, dots,
  footer links, avatar, bar dividers, bubble corners).
  (3) Multi-point / zone sampling: welcome base + 3 glows + home wash
  are zone medians, not single points (see tables); drawer bg is a
  10-point median grid; pricing badge fill is a 355-pixel median.
  (4) Pixel + computed cross-check: every geometry fix was verified
  both ways post-fix (see cross-check table); the two traps found are
  recorded (mic-circle 30.6px was an offscreen animation freeze, true
  value 36px; computed style rounds 0.5px borders to 1px, so hairlines
  are verified by CSS rule + class presence, not by computed width).
  (5) Eye comparison: all 11 pairs were viewed pre-fix (eye-diff list
  below, E-W/E-H/E-P/E-C/E-L/E-K/E-I/E-D/E-S/E-G/E-A); post-fix pairs
  were re-viewed for pricing, credits, picker, home, chat-info and the
  desktop examples, and every listed diff is closed except the
  documented adaptations (panel widths, footnote line counts) and
  residuals.

- FIX TABLE (original value -> pre-fix render -> post-fix render).
  Geometry first, then missing layers, typography, cropping, spacing,
  motion, per the method.
  * F1 Home EN Auto pill: orig bare (HD5 row y=145 reads wash across;
    photo-9 TR home also bare) -> pill bg #EDEEF2 + padding -> bare
    inline-flex (BrandDots + "Auto" + chevron, no bg, no padding).
    Retires the v1.3 "Auto pill is correct" claim (it rested on the
    small OV collage). CN segmented control is a real pill and stays.
  * F2/F3/F4 Auto dots motif: orig 3-dot diagonal everywhere (welcome
    header, home, picker Auto card, chat-info backdrop) -> 5-dot
    horizontal ModelDots in picker/chat-info/desktop -> BrandDots in
    all four places. Desktop chrome keeps its pill (desktop chrome has
    no mobile original; only the dot motif changes there).
  * F5 Pricing top dots: orig 6 dots DIAGONAL, centres (106,206)
    (139,196) (172,186) (203,175) (237,168) (271,160), pitch ~23 CSS,
    rises [0,6,13,19,26,32], palette pink/blue/yellow-green/teal/
    purple/peach -> horizontal 6-dot row, gap 2, wrong order -> new
    DiagonalDots (size 10, gap 13, rises as measured, gloss finish,
    palette [#C65D7B, #4A7DE4, #9A9A3E (yellow slot, documented
    estimate: measured median is gloss-mixed), #2EB5A5, #9B5DE5,
    #E2A181]).
  * F6 Pricing Pro-row dots: orig pitch 13.1-15.2 CSS (saturation peaks
    x165/184/206/226/247/265) -> pitch 10 (size 8 + gap 2) -> gap 6
    (pitch 14, centred in the measured range). ModelDots gains a gap
    prop (default 2); it is now used only by this row.
  * F7 Pricing plans structure (major correction): orig Lite and Pro+
    are PLAIN ROWS on bg (row scans read bg throughout); only the
    selected Pro plan is a card (fill (28-35), top y~557, bottom
    y~818, left x~98, border lines visible) -> all three rendered as
    rounded-card bg-dark-card divs -> unselected plans are plain rows
    (px-4 py-[5px], no bg, no radius); selected plan keeps the card
    and gains border border-dark-sub (1px #9A9BA2, blur-corrected
    estimate +/-25: a 1 CSS px line blurred peaks at ~0.7x true +
    0.3x bg over the (18,19,21) bg, giving true ~120-154). The old
    comment claiming borderless cards is corrected. Pro card radius
    stays 16 (measured arc range 16-21 CSS, low end kept, blur range
    recorded as residual R9).
  * F8 Pricing segmented: orig container 54 img px = 37.3 CSS ->
    computed 47 (button 39, py 9) -> buttons py-[4px] (button 29,
    container 37, delta 0.3).
  * F9 Pricing CTA: orig white band 70 img px = 48.4 CSS -> 52 ->
    h-12 (48, delta 0.4). Welcome buttons stay 52 (measured 51.9).
  * F10 Pricing footer: orig links spread full width (Restore left,
    Terms centre, Privacy right, NO "|" separators — magnified footer
    crop shows spaces only) -> centred group with "|" separators ->
    justify-between, separators removed.
  * F11 Pricing "7 days free" badge: orig fill median (156,157,161)
    = darkSub #9A9BA2 (355-pixel median), dark text, total 45 CSS
    wide, ~9.7 CSS tall -> white pill #F5F5F7, 11px text, ~72 wide,
    20 tall -> bg-dark-sub, text-[8px] leading-none, px-1 py-[1px]
    (computed 10 tall, 49.8 wide; width delta 4.8 is a Linux-font
    artefact — Noto renders wider than SF, see R12).
  * F12 Pricing price block leading: orig block ~36-37 CSS (16px
    monthly + 12px yearly at iOS-ish leading) -> 44.2 (1.55/1.45) ->
    monthly leading-[1.25] (20), yearly leading-[1.2] (14.4), gap 2
    (block 36.4).
  * F13/F14/F15 Pricing Pro-card rhythm (from Pro card internal bands:
    header glyphs 580-617, detail lines 643-658 + 670-684, check rows
    704/736/768, dots 799-813, card 556-818 = 181 CSS): detail mt-3
    -> mt-2.5 + leading-[1.45]; feature rows mt-2 -> mt-1 (check pitch
    orig 22.1 CSS, render was 26.9); dots row mt-2.5 -> mt-2; card
    pt-3 pb-0 (orig border-to-glyph pads 16.6 top / ~3.5 bottom, minus
    line-box slack). Post-fix Pro card computed 179.8 (delta 0.7-1.2
    vs orig 180.5-181).
  * F16 Pricing plan gaps: orig radio-centre pitches Lite->Pro 96 img
    px = 66.4 CSS, Pro->Pro+ 291 img px = 201.3 CSS; seg->Lite gap
    ~19-23 CSS, Pro+->CTA gap ~24 CSS -> mt-2.5 (10) everywhere ->
    uniform mt-5 (20) on all plan rows, CTA mt-6 (24). Post-fix Lite
    row computed 46.4 (header 36.4 + py 10); Lite->Pro pitch = 46.4 +
    20 = 66.4 exact; Pro->Pro+ pitch = 179.8 + 20 = 199.8 (delta 1.5).
  * F17 Home EN composer: orig light card band 77-78 img px =
    53.2-53.9 CSS, plus/mic/placeholder all centred on bar centre
    (1203.5/1203.5/1206 vs bar centre 1204) -> 48 -> tall variant 54
    (computed 54, delta 0.1-0.8). Home-EN only; Lisbon/Train/Savings/
    Kyoto/Router/agent single-row composers stay 48 (Lisbon composer
    measured 48.4, stop disc 35.3 vs 36, stop square 11.1 vs 12 — all
    kept, within ~1px).
  * F18 CN stacked composer: orig total 177 img px = 122.4 CSS
    (placeholder row 47.7, controls row 47, bottom padding 27.7 with
    JPEG slop at the screen edge) -> 96 (46 + 48 + border 2) ->
    placeholder h-[48px] + pb-6 (24) = 48 + 48 + 24 + 2 = 122
    (computed 122, delta 0.4). Controls row stays 48 (delta 1.0).
  * F19 Composer black disc: orig CN black mic/send disc 58 img px =
    40.1 CSS -> 36 -> h-10 w-10 (40, computed 40, delta 0.1) for the
    black variant (sendDark and light-black circles); orange disc
    stays 36 (unmeasured). Stop disc (36) and arrow circle (36) stay.
  * F20 Menu icon: orig bars 23 img px = 15.9 CSS, stroke 3 img px =
    2.07, pitch 7 img px = 4.84 -> 20px box, bars 13.3, stroke 1.67,
    pitch 5.0 -> 24px box, path y7/12/17 (bars 16.0, stroke 2.0, pitch
    5.0; deltas 0.1/0.07/0.16). All nav-bar usages (home, drawer
    hamburger, chat-info backdrop).
  * F21 ClockDashed: orig bbox ~26 img px = 18 CSS diameter -> 20 ->
    18 (computed 18). Home top bar only (verified sole usage); solid
    clock stays 20.
  * F22 Hairline separators 1px -> 0.5px (iOS hairline convention +
    orig dividers read as ~1 img px faint lines, +11-16 levels over
    wash, i.e. a sub-CSS-px core blurred): home SuggestionRow border-b
    + suggestion container border-t; language rows border-b; chat-info
    reply rows border-t; credits By-model rows (inline borderBottom);
    suspended rows border-b. Structural borders stay 1px (Try button,
    composer light border, chips, buttons, slider thumb, sheet/card
    outlines, pricing selected card border). Picker rows lose borders
    entirely (F23), so they are excluded. VERIFICATION LIMIT (R14):
    this VM's Chromium paints 0.5px CSS borders as full-strength
    1-device-px lines at DPR1 and DPR2 (isolated test + DPR1/DPR2 panel
    shots prove it), and getComputedStyle rounds 0.5px to 1px — so the
    hairline change is verified by CSS rule presence in dist CSS +
    class presence on all five sites, NOT by screenshot; on a real
    iOS device (DPR 2-3) 0.5px CSS paints a true hairline.
  * F23 Picker rows: orig NO divider lines (column scan finds no clean
    divider band; viewed image shows clean rows) -> border-b on every
    row -> borders removed; the `last` prop is removed from Row and
    both call sites (Section rows + Picker B untitled rows).
  * F24 Picker sheet bg: orig empty-area samples (27,28,32)-(32,33,37)
    = darkCard #1E1F23, not darkBg -> ModelPickerA/B roots bg-dark-bg
    -> bg-dark-card; App picker section wrappers likewise
    bg-dark-bg -> bg-dark-card (else the wrapper would double-edge
    against the panel). DialogContent dark already uses bg-dark-card
    (consistent). Pricing/Lisbon/welcome bg stays #111518 (confirmed
    by contrast); drawer bg stays darkBg (10-point median grid reads
    (13,12,17)-(14,13,18), i.e. darkBg at OV export; the pair-scale
    "lighter drawer" impression was OV upscale brightening).
  * F25 Token/code consistency: CSS var --color-model-deepseek
    #5b8a99 -> #5F788C (matches tokens + data legend/dot values).
    No component uses the model-deepseek utility, so this changes zero
    rendered pixels (expected and noted). BAR_COLORS #5B8A99 in
    credits-panel is a DIFFERENT element (bar teal, v1.3 C9) and is
    NOT touched by this fix — but see F27, where the bar palette
    itself is re-measured.
  * F26 Motion (iOS platform convention, NOT original-measured —
    original durations/curves are unobservable in static screenshots
    and are recorded as unmeasured, not invented): .morph-rotate
    200ms ease -> 200ms cubic-bezier(0.32,0.72,0,1); .morph-in 180ms
    ease -> 180ms cubic-bezier(0.22,1,0.36,1); durations unchanged;
    prefers-reduced-motion block disables morph animations (iOS
    Reduce Motion parity, zero visual change otherwise). No new morph
    pairs (M1/M5/M6/M7 remain unwired per v1.3).
  * F27 User bubble corners: orig corners read uniformly round at
    pair scale (render 6px top-right reads as visible squareness
    against them) -> uniform radius 20 (UserBubble + chat-info
    backdrop bubble). 1px arc measurement FAILED (dark JPEG + text
    contamination: corner scan edges are non-monotonic), so this is
    an eye-evidence decision, recorded as such. Post-fix render arc
    measured: rightmost fill x grows 543 -> 562 over dy 0-19, i.e.
    radius 19-20px. Lisbon bubble fill family (29,36,46) confirmed at
    multiple points; render #1D242E sits inside it.
  * F28 Credits white section (major correction): orig Last-30-days
    block is a WHITE edge-to-edge section (card top y~438, bottom
    y~766, spans x17..576, rounded corners ~16, header glyphs
    y464-476, legend inside) -> bars rendered on panel bg (245) with
    no card -> white section (-mx-5, bg-light-card #FFFFFF,
    rounded-card, px-5 pt-4 pb-2.5; section mt-6 above it matches the
    orig buttons-to-card gap 22.8 CSS). Desktop rightPanel aside
    gains overflow-x-hidden so the -mx-5 bleed clips cleanly there
    (4px each side, corners only) instead of scrolling.
  * F29 Credits bars (major correction): orig 30 bars (one per day),
    19 tiny pre-upgrade days + 11 tall post-upgrade days (the Oct 15
    upgrade boundary is visible in the data story) -> 20 flex-1 bars
    -> 30 fixed bars (w-2 = 8px, gap 3px, pitch 11 vs orig 10.8;
    container h-[126px], bars row 327 wide centred; x-axis row shares
    the w-fit wrapper, upgrade label absolute at left 59% — orig
    label centre sits at 58.6% of chart width, vs centred 50%).
    Heights measured per bar (baseline y~680, scale 1.446): tiny days
    1.4-4.8 CSS (stored 4); tall days [109,115,118,113,125,107,121,
    107,118,111,68] (last day partial, ~60% of neighbours — Oct 25 is
    "today"); stored tall values are measured minus 3 (the 3 white
    1px segment dividers inside each tall bar). Post-fix computed:
    container 126 tall, 327 wide; first bar 4, last bar 65.
  * F30 Credits bar segment colours (measured, two tall bars agree):
    brown (145,88,55) = #8C553C kept; rose (157,69,100) -> #9D4564
    (was #C65D7B); olive (123,103,48) -> #7B6730 (was teal #5B8A99);
    steel blue (70,108,140) -> #466C8C (was green #3FA34D). White
    1px dividers between segments confirmed (column scan shows a
    (237,189,179) divider row inside tall bars). Tiny bars render as
    a single dark-rose segment #7E4E60 (measured ~(126,78,96) across
    two tiny bars; at 4px tall their model attribution is
    unresolvable, so the measured colour stands even though it
    differs from the tall-bar rose — see R11). Legend + By-model dot
    colours (data) are NOT changed on this evidence (legend dots are
    8px edge samples, unreliable at 1px).
  * F31 Drawer Agent tasks icon: orig magnified glyph is a check-list
    (checks + lines, OV drawer zoom) -> three dots -> Lucide
    list-checks (verbatim 1.63.0 geometry: M13 5h8 / M13 12h8 /
    M13 19h8 / m3 17 2 2 4-4 / m3 7 2 2 4-4), data icon "dots" ->
    "list-checks", drawer union type updated.
  * F32 Drawer avatar: orig disc ~30 +/-3 CSS (magnified disc edges
    ~52 orig px wide, OV blur) -> 36 -> h-8 w-8 (32, computed 32).
    Midpoint choice: worst-case delta 2-5 vs 6-9 if kept at 36.
  * F33 Picker Fable lock: orig Fable row shows a lock glyph before
    "Pro+" -> badge pill only -> Lucide lock (verbatim 1.63.0: rect
    x3 y11 w18 h11 rx2 + M7 11V7a5 5 0 0 1 10 0v4), 14px, dark-sub,
    rendered only for badge "Pro+" in Row (AutoCard "Recommended"
    has no lock).
  * F34 Font: NO stack change (-apple-system stack is correct for
    Apple targets). Canvas proof on this VM: title string width
    242.54 at 700 41px = Noto Sans SC exactly (DejaVu 319.79,
    Liberation/Arial 274.09) — i.e. the Linux render substitutes Noto
    Sans SC for SF. Recorded as standing residual R12; no Apple font
    file is copied into the repo.

- EYE-DIFF LIST (pre-fix pairs, viewed; disposition):
  * E-W1/W2 welcome header M mark + orange dot vs BrandDots + sapphire
    dot: KNOWN state difference, photo-9 wins per round 7 — not a fix.
  * E-W3 title position, E-W5 footnote line count: panel-height /
    panel-width adaptations, not diffs.
  * E-W4 Try button looking filled: transparent over photo-9 warm glow,
    correct per round 7. E-W6 glows: all three present, correct hues.
  * E-H1 home Auto pill vs bare -> F1. E-H2 menu weight -> F20. E-H7
    clock size -> F21. E-H5 composer height + shadow -> F17 (shadow
    value kept: orig darkest 213 vs bg 230 over ~11 CSS matches render
    0 2 12 rgba(0,0,0,0.06) in extent and depth).
  * E-P1 top dots diagonal vs horizontal -> F5. E-P2 segmented height
    -> F8. E-P3 Lite/Pro+ cards vs plain rows -> F7. E-P4 Pro card
    border missing -> F7. E-P5 Pro dots cramped -> F6. E-P6 CTA height
    -> F9. E-P7 badge grey vs white -> F11. E-P12 footer spread ->
    F10. E-P8/E-P9/E-P10/E-P11/E-P13: radios, title, intro, prices,
    footnote line count — match / adaptation, kept.
  * E-C1 huge number, E-C2 buttons, E-C4 legend, E-C5 rows, E-C6
    activity, E-C7 x-axis: match, kept. E-C8 chart card missing ->
    F28. E-C3 bar shape (tiny left + tall right) -> F29/F30. E-C9 Buy
    width: match (Buy height band was inconclusive in isolation but
    the pair shows equal heights; render 48 kept, see R13).
  * E-L1 user bubble corner squareness -> F27. E-L2 body text size:
    pair-scale artefact (render panel 560 wide vs phone 390; computed
    16px both sides), not a diff. E-L3-L7 chips/action row/follow-up/
    composer/stop disc/GLM dot: match, kept. E-L8 chat-section card
    has no top bar: composition (threads, not screens); the top bar
    lives in the desktop-lisbon section — not a fix.
  * E-K1 Auto dots -> F2. E-K2 row dividers -> F23. E-K3 sheet bg dark
    -> F24. E-K4 Fable lock -> F33. E-K5-E-K10 Up-to-Advanced, section
    titles, costs, How-credits-work, Choose-a-model title, check icon:
    match, kept.
  * E-I1 backdrop Auto dots -> F3. E-I2 backdrop bubble corner -> F27.
    E-I3-E-I10 handle, stats, model dots, tools rows, reply cards,
    footnote, close X, backdrop dim: match, kept.
  * E-D1 pill, E-D2 hamburger, E-D4 running dot, E-D5 pinned card,
    E-D6 recent dots, E-D7 messages-left card, E-D10 gear: match,
    kept. E-D3 Agent tasks icon -> F31. E-D8 avatar size -> F32. E-D9
    drawer bg "lighter": OV upscale artefact, grid medians prove
    darkBg — no change.
  * E-S1-S5 badge, title, body, bold line, note, Manage link, still
    rows: match, kept (rows take the 0.5px hairline). E-S6 buttons at
    bottom: SuspendedPanel buttons already use mt-auto (verified in
    code) — full-height usage pins them; the gallery card's natural
    height shows them after the rows. No change needed.
  * E-G1 language dividers faint vs 1px -> F22 (with R14 paint limit).
    E-G2 row pitch: unmeasured (see R8). E-G3 check, E-G4 back chevron
    + title, E-G5 footnote: match, kept.
  * E-A1-E-A11 agent title, meta, credits/step, progress bar (20%
    fill kept; bar height unmeasured, see R10), lead card, agent rows,
    buttons, composer, dots, card bg, Agents label: match, kept.

- ZONE SAMPLING TABLES (post-fix renders, multi-point):
  * Welcome panel (560x481): top-centre base median (14,16,19) over
    70 samples, with clean points exactly (13,14,16) at (200,15) and
    (260,15); the +1/+2/+3 drift toward centre-right is the blue
    radial's tail (300px radius at 88% 42%: at ~290px distance the
    0.46-alpha glow contributes ~(1,2,2)), not a regression.
    Upper-right blue glow median (25,35,47) (blue-dominant).
    Lower-left warm glow median (68,42,32) (red-dominant).
    Bottom-right green glow median (36,67,66) (green/teal-dominant).
    Header dots row y30: green (100,181,165) at x20-25, blue
    (80,115,145) at x35, pink body x40-45 y18-26 (raised 8px) —
    cluster intact (magnified header crop viewed).
  * Home EN wash (588x561), centre column: y28 (244,246,241), y140
    (241,244,246), y280 (232,239,240), y420 (214,231,229) — top-to-
    bottom light-to-greenish gradient intact; y532 white = composer
    card over wash.
  * Drawer bg (OV crop, 10-point median grid): (13,12,17), (13,12,17),
    (18,17,22), (28,27,32) [pinned card], (14,13,18), (14,13,18),
    (14,13,18), (14,13,18), (19,18,23), (25,21,20) [messages-left
    card] — content bg is darkBg; the two bright cells are cards.
  * Pricing badge fill median (156,157,161) over 355 pixels
    (y598-602, x215-282, dark text excluded) = darkSub.

- PIXEL vs COMPUTED CROSS-CHECKS (post-fix; all agree unless noted):
  * Home composer 54 (computed) vs orig 53.2-53.9 (pixel) — agree.
  * Menu 24 / clock 18 / stacked 122 / sendDark disc 40 / pricing
    segmented 37 (button 29) / CTA 48 / Lite row 46.4 / Pro card
    179.8 / Pro+ row 46.4 / badge 10 tall / picker bg (30,31,35) /
    picker row border 0 / drawer avatar 32 / drawer menu 24 /
    credits bars container 126x327 / first bar 4 / last bar 65 /
    credits white section 718 wide (#FFFFFF) / backdrop dots 9,9,9 /
    morph curves cubic-bezier(0.32,0.72,0,1) + (0.22,1,0.36,1) —
    all computed values match their pixel targets within the deltas
    stated in the fix table.
  * KNOWN TRAPS (do not re-litigate): (a) mic circles read 30.6px when
    the composer section is below the fold — headless Chromium had
    not advanced the morph-in animation (scale 0.85) for offscreen
    elements; after scrollIntoView + 400ms they read 36px. True render
    size is 36; 30.6 was a measurement artefact, not a code bug.
    (b) getComputedStyle rounds 0.5px borders to 1px (verified by
    isolated test); hairlines are verified by CSS rule + class
    presence (R14). (c) Pair-scale text comparisons are invalid
    (render panels are 560-720 wide vs 390 phones); text sizes are
    compared by computed px, not by pair width.

- RESIDUALS (numbered, with numbers; nothing hidden behind "clean"):
  * R1 Dark-base state conflict (carried from v1.5): welcome local
    base #0D0E10 vs global darkBg #111518 — unresolved which the App
    itself uses outside welcome; other dark sections still rest on
    old-HD evidence.
  * R2 Headline rotation sentences beyond "Let's discover": unknown
    (only the captured state is rendered; rotation documented, not
    faked).
  * R3 No HD source for: drawer recent colours, pinned dots, legend
    direct centres, savings big-number size, credits bar height
    sequence (now re-measured for bars, but per-bar segment splits
    remain approximate), activity dot colour, agent-team details,
    suspended details, chat-info details, picker row colours.
  * R4 Brand-dot blue/green bases are blur-corrected estimates
    (photo-9 gloss); DiagonalDots yellow base #9A9A3E is an estimate
    (measured median is gloss-mixed).
  * R5 Home wash mid-panel: up to ~9 levels cooler than the photo-9
    column (carried); CN home wash assumed from EN evidence.
  * R6 Pro card border colour #9A9BA2 is a blur-corrected estimate
    (+/-25 levels); Pro card radius kept at 16 within the measured
    16-21 range.
  * R7 Pricing badge width: computed 49.8 vs orig 45 (delta 4.8) —
    Linux Noto renders wider than SF; on Apple devices the same 8px
    text should land near 46. Height matches (10 vs 9.7).
  * R8 Language row pitch: unmeasured (column/row band scans fragment
    on text strokes; render keeps py-2.5 + content structure).
    Last-row divider presence in orig is unmeasured (detection gaps
    in the CN crop); render keeps a border under all rows (v1.5
    behaviour, unchanged).
  * R9 Pro card radius 16 vs measured range 16-21 (JPEG blur range,
    low end kept, not chased).
  * R10 Agent progress bar height (4px) and "Pause all"/"Stop all"
    button details: visual-consistency only, not 1px-measured.
  * R11 Tiny-bar colour #7E4E60 vs tall-bar rose #9D4564: same-model
    consistency would predict one colour; the tiny bars measure
    darker. At 4px tall the reading is blur-affected but the darkening
    is not fully explained by blur (white mixing lightens, not
    darkens). The measured colour is rendered; the cause is open.
  * R12 Font substitution: Linux renders Noto Sans SC (title string
    242.54 at 700 41px) where Apple devices render SF Pro/SF Pro Text.
    Glyph widths on this VM must NOT be compared directly to SF
    widths; the -apple-system stack itself is correct for targets.
  * R13 Credits Buy button height: render 48 kept; the original button
    band was never cleanly isolated (two black bands y345..365 and
    y382..403 at x=150, likely button + label/edge confusion). Pair
    view shows equal heights; recorded as unmeasured-at-1px.
  * R14 Hairline paint limit: this VM's Chromium renders 0.5px CSS
    borders as full-strength 1-device-px lines at DPR1 and DPR2
    (proven by isolated test + DPR1/DPR2 panel shots); the 0.5px
    change is correct CSS for real iOS devices but produces no
    visible difference in VM screenshots. A device check would show
    it; the shipped CSS differs from v1.5 regardless.
  * R15 Lisbon bubble corner: 1px arc unmeasured (dark JPEG + text
    contamination); uniform 20 rests on eye evidence (F27), not a
    pixel fit. GLM AiMeta dot centre: unmeasured (gloss + blur).
  * R16 Chart x-axis/legend gaps: legend mt-1 leaves ~3.5 CSS of
    line-height slack vs the orig x-axis-to-legend gap (~7 CSS);
    x-axis upgrade label at 59% vs orig 58.6% (delta 0.4% of chart
    width). Chart bars keep phone metrics (8px/11px pitch) inside
    wider desktop panels, so side margins grow with panel width —
    platform adaptation, not a metric change.
  * R17 Full-set rescan counts: changed sections — home, chat
    (bubble corner only, 98 pair px, +/-1 level at the corner arc),
    pricing, credits, picker, chat-info, drawer, composer, desktop
    chrome. Unchanged at pair scale — welcome (0 px), language
    (0 px; hairlines paint identically here per R14), agent-team
    (30 px, all +/-1 level corner anti-aliasing noise), suspended
    (33 px, +/-1-3 levels on one hairline row). No section regressed.

- EXPLICITLY NOT CHANGED (with reasons): welcome title/dot/buttons/
  footnote (all confirmed); Lisbon composer 48, stop disc 36, stop
  square 12 (within ~1px); greeting 27; home mic/plus glyph sizes;
  Try border #43474C; pricing radio outer 20 / inner 10 (confirmed via
  ASCII brightness maps — the first "ring" reading was the card's
  corner + left border, corrected in-round); credits huge 37 / buttons
  48 / legend dots 8; chat-info handle 36x4 / sheet radius 24 /
  shadow; drawer pill 48 / dots 8; suspended structure + buttons 52;
  agent dot 7 / buttons 48 / arrow circle 36; CN segment geometry
  (white-on-wash contrast too low to separate); credits bar splits
  (approximation stands); picker "Recommended" chip; home shadow
  value (matches orig decay); BAR_COLORS-adjacent legend colours
  (edge samples unreliable); desktop layout arrangement (no original
  image; adaptation only).

- UNMEASURED ITEMS (carried + new): headline rotation sentences
  beyond "Let's discover"; original motion durations/curves (iOS
  convention substituted, durations unchanged); CN segment
  height/radius; Pro card radius within 16-21 (kept 16); Lisbon bubble
  corner arc at 1px; GLM dot centre; credits Buy height at 1px;
  language row pitch + last-row divider; agent progress bar height;
  tiny-bar colour cause (R11); drawer avatar within +/-3 CSS
  (render 32 is the midpoint choice); savings card shadow + big-number
  size; chat-message bubbles other than Lisbon fill + stop disc.

## v1.5 — 2026-10-30 (fix round; round 7: photo-9 colour layer first + full-set active rescan)

- Fix round, not a review round. No judge call was made in this round:
  every verdict below rests on pixel samples / render samples read out of
  screenshots, not on any judge verdict. Build passes: pnpm build
  (tsc -b && vite build). No commit, no push, no git add; changes left in
  the worktree for the coordinator. Scope: UIDesign/web/medley only.
- Screenshots: docs/verification/rounds/v1.5/ — gallery-fullpage.png,
  sec-*.png per section, measure/render-welcome.png + render-home-en.png
  (tight panel shots used for the sample tables), measure/*.py + *.cjs
  (sampling / screenshot scripts), crops/ (photo-9 crops + render crops
  used as measurement evidence only; no official bitmap is copied into
  the design system — all marks and dots are vector redraws).
- BASELINE TRUTH, and how conflicts were settled (no averaging, no mush):
  photo-9 (~/workspace/user/media_library/image/photo-9.jpg, 1170x2532,
  2x2: TL welcome-dark, TR home-light-en, BL chat-dark Kimi Kyoto, BR
  chat-light GPT-6.1 Sol) wins on the COLOUR layer only; layout / sizes /
  spacing still follow the old HD images + round 6. Screen boxes measured,
  not assumed halved: collage canvas #191A1E; TL x~70..690, y~95..1325;
  TR left edge x~772 (3px anti-alias ramp to #F5F6F8); bottom screens
  top edge y~1425-1430; right screens are clipped by the image edge.
  The photo-9 footnote reads (truncated, pixel sampling rules): welcome
  headline rotates, cursor is sapphire blue, each sentence carries a
  colour. The static render therefore shows the captured state
  ("Let's discover" + sapphire cursor) and documents rotation instead of
  faking it as a static orange dot.
- COLOUR SAMPLING TABLE (photo-9 value -> v1.4 value -> v1.5 render value,
  all sampled, not impression):
  * Welcome clean base (top-centre, away from glows): (13,14,16) #0D0E10
    -> v1.4 #111518 -> render #0D0E10 exact. The v1.4 value is the OLD
    capture's flat bg (round-6 zero-variance proof); photo-9's dark
    surfaces (BL chat median also (12,13,17)) agree on the darker base,
    so the welcome panel takes #0D0E10 as a welcome-local base. The
    global darkBg token is NOT changed: other dark sections still rest
    on old-HD evidence (see U1).
  * Blue halo (upper-right, photo (600,600) in panel fractions
    (0.855,0.411)): (35,53,75) #23354B -> v1.4 none (flat bg) -> render
    (35,52,74) #23344A, delta (0,1,1). Second point (0.90,0.50):
    photo (28,45,63) -> render (33,49,69), delta (5,4,6).
  * Warm glow (lower-left, photo peak (170,1025) fraction (0.161,0.756)):
    (74,43,30) #4A2B1E -> v1.4 none -> render (77,47,35) #4D2F23,
    delta (3,4,5). Row y=1050 decays to base by x~480 (radius ~310
    photo px); column x=180 peaks y~1020.
  * Green glow (lower-right, photo (600,1320) fraction (0.855,0.996)):
    (44,77,68) #2C4D44 -> v1.4 none -> render (40,78,72) #284E48,
    delta (4,1,4). Second point (0.73,0.97): photo (24,55,49) ->
    render (31,57,53), delta (7,2,4). The glow is still rising at the
    panel bottom edge, so its centre sits below the panel.
  * Title cursor dot (photo bright blob x~520-540, y~605-618; core
    (180,211,239) #B4D3EF at (526,612)): v1.4 #FF6521 orange -> v1.5
    glossy sapphire ball, render centre (310,139) (197,222,244)
    #C5DEF4, highlight (225,240,254) #E1F0FE, edge (100,158,232)
    #649EE8. Edge #2E7CE6 is the hue-matched blur-corrected sapphire
    estimate; the core value itself is measured.
  * Brand dot cluster (photo-9 TL centres green (132,200), blue
    (143,193), pink (156,188); discs ~14 photo px, rising ~12 photo px):
    v1.4 M letterform + no dots -> v1.5 BrandDots 9px discs, 0/4/8px
    rises. Render disc centres: green highlight (150,202,190) #96CABE
    vs photo peak (157,205,193); blue (137,167,192) #89A7C0 vs photo
    (175,196,213) (render reads darker: the blue disc is small and its
    measured centre sits on the gradient slope, not the highlight);
    pink (215,171,195) #D7ABC3 vs photo (217,183,207). Bases are
    blur-corrected estimates (green #2FA08C, blue #5B84A6, pink
    #C65D7B = the set's existing pink token); highlights are the
    measured peaks (#9DCDC1 / #AFC4D5 / #D9B7CF).
  * Home Auto pill dots: photo-9 TR shows the SAME 3-dot diagonal
    cluster (green low-left, blue mid, pink high-right) -> v1.4
    5-dot horizontal row -> v1.5 BrandDots in the home pill.
  * Kimi header dot (photo-9 BL centre (301,1682), peak (232,222,163)
    #E8DEA3, glossy gold ball) and GPT header dot (photo-9 BR centre
    ~(965,1682), glossy green ball, mint highlight): v1.4 flat discs
    (#9A9A3E / #3FA34D) -> v1.5 glossy discs (white highlight gradient
    over the unchanged measured base hues). Bases deliberately NOT
    re-hexed: the balls' hue identity is unchanged, only the gloss
    finish is new, so no invented hex enters the token set here.
  * Home light wash (photo-9 TR column x=950: #F5F6F8 top ->
    #EFF3F4 y600 -> #E1EBEC y780 -> #D2E5E3 y1020): v1.4 flat
    #F5F6F8 -> v1.5 linear gradient (#F5F6F8 0%, #EFF3F4 40%,
    #E1EBEC 60%, #D2E5E3 80%, #D9E7E7 100%). Render vertical medians:
    fy 0.05 (244,245,247) vs (245,246,248); fy 0.25 (240,243,244) vs
    (239,243,244); fy 0.45 strip (221,233,234) vs photo-equivalent
    ~(230,238,240) at that height (delta <= 9, gradient runs slightly
    cooler mid-panel). Light CHAT stays flat: photo-9 BR reads flat
    ~#F5F4F9 with a white #FDFEFF notice card, so the wash is
    home-only, not a global light-surface change.
  * Checked and deliberately UNCHANGED (sampled, no colour found):
    home suggestion icons are grey outlines (photo-9 home-suggest
    crop); Kyoto weather icons are grey outlines (sun window
    x105..175, y2010..2075 has zero saturated pixels); BR notice card
    median (245,246,248) matches the existing bubble-light card.
- AMBIENT GRADIENT PARAMETERS (welcome panel, final values in code):
  blue radial 300px circle at 88% 42%, rgba(64,102,150,0.46) ->
  transparent 100%; warm radial 280px circle at 16% 76%,
  rgba(116,66,46,0.62) -> transparent 100%; green radial 320px circle
  at 92% 108%, rgba(52,110,95,0.90) -> transparent 70%; base #0D0E10.
  Two tuning passes were needed: the first pass read green (32,60,54)
  vs target (44,77,68) and warm (63,40,31) vs (74,43,30); alphas and
  centres were corrected from the render samples, not from the eye.
- PER-SECTION CHANGES:
  * welcome: header M mark -> BrandDots + "Medley" (photo-9 form; the
    M letterform is RETAINED on CN home and desktop chrome, which rest
    on the old capture — a state difference, recorded here, not
    averaged); ambient gradients + #0D0E10 base; title dot orange ->
    glossy sapphire (16px kept); Google / Try / footnote / sizes /
    gaps untouched (round-6 values stand).
  * home (EN + CN): Auto pill 5-dot row -> BrandDots; light surface
    flat -> wash gradient; card wrappers made flex-col with the panel
    flex-1, so the panel fills the card (previously the panel content
    was ~356px tall inside a 561px card, which would have cut the wash
    off mid-card) — this also restores the phone structure (greeting
    low, composer pinned at the bottom) inside the desktop card.
  * chat: AiMeta dots glossy (Kimi / GPT / all models, bases
    unchanged); Kyoto weather cards, Lisbon / Train / Savings /
    Router threads verified against photo-9 structure (Router notice
    card + "GPT-6.1 Sol . Switched" + "Thought for 4s" match the BR
    screen; Kyoto "Searched 4 times, checked the weather, found 12
    places" + Sat-white / Sun-dark cards match the BL screen).
  * desktop-home: main home panel stretched + washed; desktop chrome
    top bar (M mark + 5-dot Auto pill) deliberately untouched — it is
    desktop chrome, not a mobile screen, and photo-9 evidences only
    the mobile home pill.
  * picker / pricing / credits / agent-team / drawer / chat-info /
    suspended / language / composer: rescan = render-integrity pass on
    the new section screenshots (no breakage from the ModelDot gloss
    change; dots still render in picker rows, chat-info model line,
    pricing 6-dot rows, drawer pinned dots). No token changes there:
    their colours still rest on v1.3 / old-HD evidence, and photo-9
    contains no new evidence for them. The 5-dot ModelDots row is
    unchanged for chat-info / picker / pricing (old evidence); only
    the home pill moves to the 3-dot cluster.
- UNCLOSED (not silently carried, not claimed as 1:1):
  U1 (carried, sharpened): dark-base state conflict. Photo-9 dark
  surfaces read (13,14,16)/(12,13,17), exactly the HD5 export darkness
  from v1.4 U1, vs CN HD (17,21,24). Welcome follows photo-9 locally;
  global darkBg stays #111518. If a future capture proves the app
  itself (not the export) went darker, darkBg should move in one step.
  U2 (carried): welcome headline rotation sentences beyond "Let's
  discover" and their per-sentence colours are unknown (only the
  sapphire state is captured); rotation is documented, not animated.
  U3 (carried from v1.4): no HD source for drawer recent colours,
  drawer pinned dots, legend/by-model direct-centre samples, savings
  big-number size, credits bar exact height sequence, activity dot
  colour, agent-team / suspended / chat-info / picker row-level
  colours — all still rest on the v1.3 audit / OV15 small collage.
  U4 (new): brand-dot blue base #5B84A6 and green base #2FA08C are
  blur-corrected estimates (small discs, heavy JPEG blur); the
  highlight peaks are measured, the bases are not. U5 (new): the home
  wash mid-panel reads up to ~9 levels cooler than the photo column
  at the same fraction (gradient-stop interpolation vs the phone's
  longer wash); accepted, since the wash shape and endpoints match.
  U6 (new): CN home takes the EN-evidenced wash (same light surface
  assumed); no CN home capture in photo-9 confirms it independently.

## v1.4 — 2026-10-30 (fix round; welcome full re-measure + full-set leak sweep)

- Fix round, not a review round. No judge call was made in this round:
  every verdict below rests on pixel samples / glyph-band measurements /
  computed styles read out of the render, not on any judge verdict.
  Build passes: pnpm build (tsc -b && vite build). No commit, no push,
  no git add; changes left in the worktree for the coordinator.
- Screenshots: docs/verification/rounds/v1.4/ — gallery-fullpage.png,
  sec-*.png per section, measure/welcome-v13|v14.png+json (welcome
  element shots + computed styles), measure-welcome.cjs, shot-sections.cjs,
  crops/ (original-image crops used as measurement evidence).
- BG VERDICT (the login-page question: is the original welcome bg one
  colour throughout?). YES — flat solid #111518, no gradient, no glow,
  no segmentation, inside the painted panel. Evidence (CN HD welcome,
  panel interior x~32..534): clean band y620-950 x40-510 is 155,100 /
  155,100 pixels exactly (17,21,24); rows y200/700/900 x40-510 and
  columns x100/300/500 y620-950 each have exactly one distinct value.
  A gradient or glow would vary per row/column; variance here is zero.
  The two deviating values are NOT bg variation: (a) top-right
  (23,27,30) = status-bar icon glyph anti-aliasing / JPEG halo cluster
  at x470-510, y46-63 (plus logo halo); clean bg next to the icons is
  (17,21,24). (b) (15,18,23) = the collage mockup drop-shadow strip at
  x536-576, y64-1232 (96.8% of that value's pixels sit in the strip;
  it repeats at the same right-edge offset on the Lisbon panel, its
  colour is a blend toward the (12,13,17) collage canvas, and it is
  outside the app's painted bg) — not reproduced on web, where there is
  no phone-frame shadow. (c) (12,13,17) = collage canvas outside the
  cards (top/bottom strips, gaps). (d) (19,20,24) top-left block = JPEG
  halo around the "10:24" time glyphs; centre-top same rows read
  (17,21,24). Web fix: darkBg #121316 (18,19,22) -> #111518 (17,21,24)
  in tokens + index.css (flows to all dark surfaces; CN Lisbon interior
  also reads (17,21,24), so this is consistent, not welcome-only).
- WELCOME fixes (original -> v1.3 -> v1.4, all re-measured on CN HD):
  W1 bg #111518 (above). W2 Try button: v1.3 filled dark pill #2F3034
  was wrong — original interior is panel bg exactly, a transparent
  outline pill with a 1px border ~#43474C (JPEG-blurred line peak
  ~50; blur-corrected estimate, +-10): now transparent + border
  #43474C, verified in render (interior (17,21,24), border (67,71,76)).
  W3 Google fill #ECEEF2 -> #EDEEF2 (measured (237,238,242)); G disc
  22px + grey ring -> plain white 20px disc, no ring (disc 28 img px,
  sharp 236->254 edge, no grey ring pixels; G glyph 13px kept).
  W4 dot #D95E27 -> #FF6521 (disc-interior median (255,101,33), centre
  pixel (255,103,30); v1.3 value was a downscaled-crop average); dot
  16px kept (22 img px -> 15.7 CSS). W5 wordmark 17 -> 19px (M-cap /
  mark-height ratio 19/37 = 0.514, scale-free). W6 modelLine 15 -> 14px
  local (C-cap 14 img px -> 13.9 CSS) + colour #8E9295 (glyph-core
  median (142,146,149)). W7 tagline colour -> #B0B4B6 (core median
  (176,180,182)); size 16 kept (E-cap 16 img px -> 15.9 CSS). W8 footnote
  11px/1.45/dark-dim -> 12px/1.31/#84878B (B-cap 12 img px -> 12.0 CSS,
  line pitch 22 img px -> 15.7 CSS, core median (132,135,139)) and
  left edge aligned with the title (px-5 removed: footnote x matched
  title x ~60 img px in the original). W9 gaps (glyph-to-glyph, render
  screenshot px vs original converted at 390-width): title->tagline
  32 -> 29 (orig 27.8-29.2, mt-4 -> mt-3); tagline->modelLine 17 kept
  (orig 12.8-16.4, within range); Google->Try 13 -> 9 (orig 9.3,
  gap-3 -> gap-2); Try->footnote 18 -> 19 (orig 18.5, footnote pt-2).
  W10 title 41 kept: measured 42.8 CSS (L-cap 43 img px) is within
  combined cap-ratio + anti-aliasing uncertainty; dot vertical kept
  (dot bottom 1px from original relative to baseline). W11 footnote
  wraps to 1 line at the 560px web panel width vs 2 lines at phone
  width: platform adaptation, not forced.
- SWEEP fixes (beyond welcome):
  S1 userBubbleDark #191A1E -> #1D242E (CN Lisbon bubble fill dominant
  (29,36,46), second bubble same family; token + css var; render
  verified rgb(29,36,46)). S2 composerStop #D66F44 -> #DFA282 (HD5
  Lisbon stop peach median (223,162,130); v1.3 value came from the
  small overview collage and is demoted; CN Lisbon stop is a THIRD
  form — white disc (237,238,242) + dark square — a locale variant,
  see U2; gallery Lisbon is EN so it takes the peach form, render
  verified rgb(223,162,130)). S3 CN home badge: data "Pro+" -> "Pro"
  (original reads plain "Pro", glyph band 13 img px -> ~13px) and
  badge rendering pill (11px bold bordered) -> plain 13px grey text
  (no border/bg); the picker Fable "Pro+" badge is a different badge
  and is untouched. S4 CN home mark 30 -> 27 (mark band 38 img px ->
  27.1 CSS; greeting 27 confirmed exact: glyph band 38 img px ->
  27.1 CSS). S5 CN home composer: single-row 48px -> stacked two-line
  form (new Composer `stacked` prop: 46px placeholder row + 48px
  controls row, ~94px total; CN home box ~103 CSS and CN Lisbon input
  box 130 img px -> 93 CSS measured; EN composers unchanged
  single-row; stacked demo added to the composer section). S6 Lisbon
  GLM action row: "28 credits" -> "28 credits 1.1s 71 tok/s" (CN
  Lisbon action line measured; numbers are locale-independent) via a
  new ActionRow `meta` prop + ChatMessage passthrough; GLM sub line
  "Searched 6 sites, thought for 3s" added (numbers measured from CN;
  EN wording follows the Train pattern — flagged, see U8). S7 language
  panel: back chevron added before "App language" (present in the CN
  original, Icon.back exists in icons.tsx); rows/checkmark/footnote
  otherwise match. S8 pricing card fill + credits bar colour families
  cross-checked against HD5 (card (26,27,31) vs render #1E1F23 and
  bar olive-gold/pink/rose families): consistent once HD5's overall
  darker export is accounted for (its bg reads (13,14,16) vs CN
  (17,21,24), its whites ~233-238 vs 255) — no token change.
- UNCLOSED (not silently carried, not claimed as 1:1):
  U1 HD5 dark bg (13,14,16) vs CN (17,21,24): source conflict; CN HD
  wins for this set (precedent v1.3 Q12), HD5's darker export is the
  likely cause but is not proven pixel-for-pixel. U2 CN Lisbon thread
  is not rendered in the gallery (no CN Lisbon section): its stacked
  composer and white-disc stop are locale variants on record only.
  U3 No HD source exists in the three HD images for: drawer recent
  colours (v1.3 C5), drawer pinned dots, legend/by-model direct-centre
  samples (v1.3 P2-12), savings big-number size (P2-3), credits bar
  exact height sequence (C9 remains a shape approximation), activity
  dot colour (S13 inferred), agent-team / suspended / chat-info /
  picker row-level colours — all rest on the v1.3 audit / OV15 small
  collage (px-unreliable) and are unchanged here. U4 The 390px
  CSS-width conversion (v1.3 P2-1) is still unprovable from JPEGs;
  where possible this round used scale-free ratios instead. U5 Welcome
  secondary greys come from JPEG glyph cores (+-~5 levels; title-white
  calibration delta <=3); global dark-sub/dark-dim tokens untouched,
  overrides are welcome-local only. U6 Try border #43474C is a
  blur-corrected estimate (+-10). U7 Dark circle mic orange #D95E27
  was not re-measured against an isolated HD dark-mic still; kept.
  U8 Lisbon Claude action row (EN complete state, icons only) vs CN
  streaming state (no action row yet): state difference, unresolved.
  U9 Phone chrome (status bar, home indicator) is omitted in gallery
  panels by design (no device frames); web layout is platform-adapted,
  never claimed as screenshot 1:1. U10 Icon forms are Lucide
  substitutions for the original custom icons (mandated library),
  not pixel-identical. U11 Sections not re-measured at HD depth this
  round (pricing, credits, picker, drawer, agent-team, suspended,
  chat-info, desktop examples) were swept visually against v1.3
  evidence + HD colours where available; their remaining per-element
  values rest on the v1.3 audit and are NOT re-certified 1:1 here.
- Scope discipline: only UIDesign/web/medley files were touched (see
  git status: src/App.tsx, chat-message, composer, home-panel,
  language-panel, welcome-panel, demo/data, index.css, tokens/index.ts,
  plus the new docs/verification/rounds/v1.4/ evidence). Other sets'
  worktree changes (app/*, web/airbuild) belong to parallel workers
  and were not touched. No commit, no push, no git add.

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

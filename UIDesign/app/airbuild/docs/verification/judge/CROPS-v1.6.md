# Judge crops — round 3 (v1.5 renders), corrected 2026-10-30

Previous rounds' composite script was not in the repo (earlier notes say
comparison crops were deleted after review). The coordinates below were
re-derived this round by grid overlay + bright-screen scan, and verified
by eye on the composites before any judge call.

## Corrected screen rectangles (1320x2868 App Store originals)

- chat (iphone-03): interior x 148..1173, top y 833. Earlier 482 was a
  marketing-headline stroke, NOT the bezel. Available height to image
  bottom: 2035 -> 774px at 390 wide. Panel below y=774 is gray = no data.
- draft (iphone-04): same upright template, interior x 148..1173, top
  y 833. Same 774px panel height, same gray band.
- detail (iphone-05): interior x 200..1121, top y 830. Full 390x844 panel
  (crop height 1993 fits inside the image).
- briefing (iphone-06): phone top cut by the marketing image; crop starts
  at image top y 0, x 150..1157, height 2179 -> 390x844. No status bar in
  the original panel; judge prompt anchors on the top-bar row and
  forgives a global vertical shift up to ~40px.
- home (iphone-01): tilted hand-held photo. Perspective-unwarped from
  estimated corners TL(585,855) TR(1305,780) BR(1140,2610) BL(165,2580)
  to 390x844. Component/style verdict only, NOT a pixel verdict.

## Composite layout

Canvas 792 x (44+844). 44px header row: red "LEFT: ORIGINAL" / blue
"RIGHT: RENDER". Panels 390 wide below the header, top-aligned; panel
coordinates in prompts are measured from the panel top (below header).

## Judge client

- judge-vision.py: model deepseek-v4-flash-vision via BotsRouter
  https://api.botsarena.tech/v1/chat/completions, max_tokens 6000,
  one call per screen, no repeats.
- Token: server file /etc/botsrouter/muse_judge_token.txt, fetched live
  via the relay SSH script into env only. Format is 48 chars, NO sk-
  prefix (sk- prefix returns 401). Never written to any file.
- Old judge-single.py is obsolete: it used qiniu/conatus-free and added
  an sk- prefix. Do not use it for this set any more.
- Exit 3 on 429/401/403 (stop rule: 3 consecutive -> stop everything).
  Exit 4 = transport error (not a stop-code, retry once only).

## v1.6 candidate list (UNCONFIRMED — do not apply without a verdict)

From the v1.5 CHANGELOG (previous round, qiniu judge, items 1-8 + cut-off
item 9+ lost): top-bar round buttons 42->46px; project mark letter block
-> abstract town illustration; pill size; author name 13->14px; bubble
padding 16->18px; file card wider/taller. None of these may land until
this round's judge confirms them item by item.

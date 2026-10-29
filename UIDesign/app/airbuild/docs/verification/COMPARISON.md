# Screenshot comparison — app/airbuild vs App Store originals

Shots: `*-390.png` (390x844 viewport), `chat-430.png` (430x932).
Each shot is one gallery screen (`?screen=`), taken from `dist/`.

## Per-item results

- Chat top bar (iphone-03): MATCH — back chevron circle left, centred
  project squircle + pill, … circle right; pill sits below the icon as
  in the original.
- Home top bar (iphone-01): MATCH — cloud circle left (with green dot),
  four-leaf mark centre, + circle right.
- Agent white bubble / user blue bubble (iphone-03, iphone-04):
  MATCH — `#1987f7` user bubble, white agent bubble with hairline
  border and soft shadow, 16px radius on phone, author line
  `Name @Role` above agent bubbles, avatar bottom-aligned.
- File card (iphone-03): MATCH — doc icon + bold filename +
  `Markdown · 2.4kb` meta; original hangs it right-of-centre with the
  sender avatar, here rendered at 78% width right-aligned.
- Task list card (iphone-03, ipad-01): MATCH — warm `#fffaf2` card,
  bold title with list icon, three hollow-circle items, `View task ›`
  right-aligned (visible in the iPad original).
- Composer (iphone-06): MATCH — white rounded card, row 1 hand tile +
  + tile on pale `#f4f4f2`, row 2 text + blue circular up-arrow send.
- Website draft card (iphone-04): MATCH in structure — traffic lights,
  URL pill, share button, headline + Download button, cover block,
  footnote card. Cover image differs by design (abstract gradient,
  not the official swan photo).
- Detail panel (iphone-05): MATCH — sheet grabber, title + check
  circle, `Ready to test` green-dot status card + `Updated 12h ago`,
  App Store / TestFlight cards, Versions rows (3.1.5 / Prepare for
  Submission / Internal 3.1.5 (373) / External — No build yet),
  Progress green-check rows. Store glyphs are generic redraws.
- Briefing cards (iphone-06): MATCH in composition — Air Daily card
  full-width with Sales Report card peeking from the right (horizontal
  peeking row, as in the original), stats `1204` / `$386`, SVG line
  chart with day labels inside the frame.
- Member rows (iphone-01): MATCH — blob avatar, bold name + grey
  @role, status line, orange `Action needed` for the first member,
  time right-aligned (`Now`, `10:24`).
- Project grid (iphone-01): PARTIAL — 2x2 layout, pill labels
  overlapping tile bottoms and the `Please check the banner...` note
  match; tile artwork is an abstract letter placeholder, not the
  official app imagery (not copied by design).
- Typing indicator: MATCH — avatar + white bubble with three animated
  dots (800ms stagger). Static screenshots may catch the dots at low
  animation opacity; this is the animation, not a missing element.
- iPad wide layout (ipad-01): CROSS-CHECK ONLY — left project column +
  member column + right thread are consistent with the phone
  components, but no iPad screen is built in this mobile-only set.

## Known environment note

`/opt/meta-chromium/chrome --headless --screenshot` could not run in
this VM (exit 13, Hatch WebGL domain policy missing). Shots were taken
with the Playwright-managed `chromium_headless_shell` instead, at the
same viewport sizes; the harness is `docs/verification/shoot2.cjs`
(local static server + `page.goto`, run with `PW_CHROME` pointing at
the headless shell binary).

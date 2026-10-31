# Medley — Desktop / Web UI Kit

> **Desktop layout disclaimer (read first): there is no desktop original image.**
> What is 1:1 with the mobile originals is the token set and the component
> forms (colors, type sizes, radii, bubbles, cards, pickers, panels). The
> column arrangement in `src/layouts/DesktopLayout.tsx` (top bar + 280px left
> session column + main column + optional 360px right panel) is a desktop
> re-layout of the mobile screens, not a reproduction of any desktop
> screenshot. This package never claims the desktop layout itself has an
> original-image reference.

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 + Radix primitives,
shadcn-style (component source copied into the repo, owned by this package).
No Ant Design, no MUI, no Next.js. Base dependency versions mirror
`muse/package.json` (React 19, Vite 8, @vitejs/plugin-react 6, TS 6);
`vite.config.ts` sets `base: './'` so the built page also renders from
`file://` (module scripts need `--allow-file-access-from-files`, see
Verification).

## 1:1 basis

- `muse/DESIGN-TOKENS.md` in full (173 measured lines): every color, type
  size, radius, spacing value, the savings slider fills (16% / 44%), the
  agent-team progress (20%), credits 1240/6000, the savings compound curve
  ($200/mo, 6%/yr, monthly compounding, FV(15y) = $58,164) — all converted
  to Tailwind v4 `@theme` variables in `src/index.css` and mirrored as typed
  values in `src/tokens/index.ts`. This package shares the token source with
  `app/medley` (same file, same values).
- `Doubao/`拼图: `medley-15-screens-overview.jpg`,
  `medley-5-screens-detail.jpg`, `medley-chinese-screens.jpg` — component
  forms (colors, sizes, radii, bubbles, cards, pickers, price table, credit
  bars) were compared against these images, not against memory.
- `muse/src/` 18-screen React implementation: component forms and token
  conclusions were carried over, then re-laid-out for desktop widths.

## Use

```bash
/home/hatch/.npm-global/bin/pnpm install
/home/hatch/.npm-global/bin/pnpm build   # tsc -b && vite build
/home/hatch/.npm-global/bin/pnpm dev
```

Copy the whole package into a project and import from `src/components/*`.
Every business component takes all copy as props; **no demo text is
hard-coded into any component**. The strings on the gallery page live only
in `src/demo/data.ts` and `src/App.tsx` and are marked demo content.

## Structure

```
package.json  vite.config.ts  tsconfig*.json  index.html
src/main.tsx  src/index.css            # @import "tailwindcss" + @theme tokens
src/lib/utils.ts                       # cn()
src/tokens/index.ts                    # typed token mirror + modelDotColor()
src/components/ui/                     # button, card (+badge), input, separator,
                                       # dialog, controls (tabs, radio-group, slider)
src/components/
  icons.tsx  medley-mark.tsx           # M mark + model dots
  chat-message.tsx                     # UserBubble, AiMeta, ActionRow, ChatBody
  source-chips.tsx                     # T/L/V + "N sources" chips, SourceLine
  composer.tsx                         # wide pill composer, 4 mic/send states
  home-panel.tsx                       # EN + CN home variants
  welcome-panel.tsx                    # dark welcome
  model-picker.tsx                     # picker A + picker B (Thinking segments)
  pricing-panel.tsx                    # dark pricing
  credits-panel.tsx                    # light credits, stacked bars
  agent-team-panel.tsx                 # dark agent team
  search-drawer.tsx                    # desktop: left panel
  chat-info-sheet.tsx                  # sheet + dimmed backdrop remnant
  suspended-panel.tsx                  # light suspended account
  language-panel.tsx                   # light language list
  savings-card.tsx                     # savings calculator + compare table
src/layouts/DesktopLayout.tsx          # top bar + sidebar + main + right panel
src/App.tsx                            # gallery demo page (no Storybook)
src/demo/data.ts                       # demo copy only
docs/verification/                     # screenshot evidence
scripts/shot-fullpage.cjs              # full-page screenshot helper
```

## Components (all props-driven)

| Component | Form matched to the original |
|---|---|
| chat-message | Dark `#191A1E` / light `#EDEEF0` user bubbles (radius 20, small top-right corner, line-height 1.35); single-dot AiMeta; Lisbon, train, savings, Kyoto, router message forms |
| source-chips | Lisbon T/L/V badges + "3 sources"; train blank badges + "4 sources" |
| model-picker A | Auto card (5-dot cluster), Everyday / Advanced / Flagship / Frontier, per-message credit deltas |
| model-picker B | Advanced / Flagship, Thinking Auto/Off/Low/Med/High/Max, then three rows with **no section title** (as in the original) |
| pricing-panel | Dark price table, Monthly/Yearly switch (Yearly + "Save 20%"), radio plan rows, white trial CTA, trial footnote |
| credits-panel | 44px "12,480", plan line, Buy/Change buttons, ~20 stacked multi-color bars, "Oct 15, upgraded to Pro" dashed marker, By-model rows (590 / 4,620 verified) |
| agent-team-panel | Title broken over two lines, meta line, progress bar **above** the credits line, 20% fill, "1,240 of 6,000 credits", "Step 3 of 8", times 31s/9s/7s/6s/21s/8s |
| search-drawer | Search pill, nav rows, Pinned card, Recent list, messages-left card, user row; desktop form is the left panel |
| chat-info-sheet | Sheet radius 24, stats 210/9/6, model chips, tools, latest-reply metric grid, reply rows, footnote; backdrop = top bar + bubble + model line only |
| suspended-panel | 56px prohibition badge, 26px title, 14px body, "Suspended until Nov 2, 2026", "You can still:" rows |
| language-panel | 20px title, 10px rows with check on the selected row, trailing footnote |
| home-panel | EN (Auto pill, greeting, suggestions, plain-mic composer) and CN (segmented Chat/Agents pill, M mark, "Pro" badge, model label + black send) |
| composer | 52px pill, plus / placeholder / model pill, circle / plain / stop / sendDark mic states |
| welcome-panel | Dot-cluster mark + wordmark, 41px "Let's discover" + sapphire glowing cursor dot, ambient glows (blue upper-right, warm lower-left, green lower-right) over #0D0E10, Google CTA, "Try without an account" |
| savings-card | Sliders 16%/44%, years stepper, $58,164 / $36,000 / $22,164, computed compound curve vs $36,000 linear dashed line |

The Medley M mark is a vector reconstruction of the marching-squares trace
rule in DESIGN-TOKENS.md sec. 8 (two loops + diagonal swoosh cut + orange
block at (30,47,2,5), viewBox "19 43 17 19"). No brand bitmap is copied.
The welcome header in the photo-9 state instead carries the 3-dot diagonal
cluster (green / steel-blue / magenta glossy balls, vector redrawn in
BrandDots); the M mark remains on the CN home panel and desktop chrome,
which rest on the older capture. Both states are recorded in CHANGELOG v1.5;
they are not averaged.

## Dark / light note

All public images are light-first; the dark screens are the originals' own
dark screens (welcome-dark, chat-dark, picker, pricing, agent-team). There
is **no official all-dark theme** for this set, so none is invented: light
panels stay light, dark panels stay dark, exactly as the originals.

## Build receipt

- Command: `/home/hatch/.npm-global/bin/pnpm build` (runs `tsc -b && vite build`)
- Result: pass. `dist/index.html` 0.41 kB,
  `dist/assets/index-D0b4anFo.css` 37.62 kB,
  `dist/assets/index-BMoEAjAl.js` 389.68 kB (final rebuild; hashes change
  per build).
- No commit, no push (per coordination rule); `git status` in
  DesignRepoForMuse shows only the new untracked `UIDesign/` tree.

## Verification (screenshot comparison)

Toolchain note: `/opt/meta-chromium/chrome --headless --screenshot` refuses
to start in this VM ("Hatch WebGL domain policy is required for browser
startup"), and plain `file://` blocks Vite module scripts via CORS. Shots
were therefore taken with the Playwright headless shell
(`~/.cache/ms-playwright/chromium_headless_shell-1243/chrome-linux/headless_shell`)
with `--allow-file-access-from-files` on the same `dist/` build — same
renderer family, same files. `scripts/shot-fullpage.cjs` reproduces the
full-page shot.

Evidence in `docs/verification/`:

- `gallery-1280x800.png` — gallery top at 1280x800.
- `gallery-1440x900.png` — gallery top at 1440x900.
- `gallery-fullpage.png` — full gallery page (1280 wide, 12927 tall).
- `crops/slice-*.png` — 1500px slices of the full page used for inspection.

Per-item comparison against the Doubao拼图 and DESIGN-TOKENS.md values
(two rounds; fixes applied between rounds: Kyoto Sunday card weather text
raised from `#6B6C72` to `#9A9BA2` on the dark card; agent-team meta line
split into two spans as in the original; pricing radios made uncontrolled
so the selected plan renders without a React controlled-input warning):

- Welcome: match — 38px headline, accent dot, white Google CTA, outlined
  secondary button, footnote.
- Home EN/CN: match — greeting size/weight, suggestion rows with dividers,
  CN segmented pill + M mark + "Pro" badge + model label composer.
- Lisbon chat: match — dark bubble, GLM-5/Claude meta dots, Day-1 bullets,
  T/L/V "3 sources" chip, "28 credits" action row, follow-up chip.
- Train chat: match — verdict bold lead, 3-column table (100px label +
  two equal columns), "About 4h 30m", blank-badge "4 sources", "41 credits".
- Savings: match — headline, slider fills 16%/44%, $58,164 / $36,000 /
  $22,164, compound curve rising against the linear dashed line.
- Kyoto: match after fix — day cards, timeline rows, map/calendar links,
  poll with selected first option.
- Router: match — warning card, "Switched" meta, bullets, "44 credits".
- Picker A: match — Auto card, "Up to Advanced", four sections, costs
  -5/-11/-31/-80/-120/-400, grey-outline "Pro" on Fable.
- Picker B: match except the known residual — Thinking segments with
  white "Auto" segment, three untitled rows, Kimi "Not available in this chat".
- Pricing: match — dot row, 27px title, Yearly selected with "Save 20%",
  Pro selected with "7 days free", features, dot row, trial CTA + footnote.
- Credits: match — 44px balance, buttons, 20 stacked bars (brown-gold base
  + pink + teal tips), dashed "Oct 15, upgraded to Pro" marker, By-model
  38,400 / 18,300 / 7,200 / 4,620, Activity row.
- Agent team: match — two-line title, progress bar above credits line,
  20% fill, "1,240 of 6,000 credits", "Step 3 of 8", lead + 5 agent cards
  with verified times, Pause/Stop buttons.
- Search drawer: match — search pill, nav rows with "1 running" badge,
  Pinned card, Recent list with colored dots, messages-left card, user row.
- Chat info: match — stats, chips, tools, metric grid, reply rows, footnote;
  backdrop shows only top bar + bubble + model line.
- Suspended: match — badge, 26px title, 14px body, "Suspended until
  Nov 2, 2026", subscription note, "You can still:" rows.
- Language: match — title, rows, check on "System default", footnote.
- Composer states: match — all four mic/send states, model pills.
- Primitives: match — pill buttons, 16%/44% sliders, Thinking tabs.

## Residuals (honest gaps, not approximations passed off as 1:1)

1. **Desktop layout has no original reference.** 1:1 covers tokens and
   component forms only; the sidebar + main + right-panel arrangement is a
   desktop re-layout. Do not present any desktop screenshot as "matching
   an original desktop screen".
2. **Picker-B Thinking multipliers are not rendered.** The tiny sub-text
   under each Thinking segment is below reliable reading resolution in the
   only source (overview 154px phone); exhaustive methods (8x/10x Lanczos
   crops, per-pixel glyph analysis, two vision passes) failed to converge
   (DESIGN-TOKENS.md sec. 9). No figure is invented.
3. **Font family unconfirmed.** System sans stack is used; no clean single
   glyph exists in the JPEG sources to prove the family.
4. **Model dot exact hex values unconfirmed.** Dots are 4–5px in the
   source with 4:2:0 chroma subsampling; the rendered colors are the
   documented measured approximations (Claude `#B0703C`, GLM `#C65D7B`,
   Kimi `#9A9A3E`, DeepSeek `#5B8A99`, GPT `#3FA34D`).
5. **Weights and shadows are visual estimates**, per DESIGN-TOKENS.md
   (JPEG strokes cannot be weighed; no clean shadow sample exists).
6. **No global dark theme is claimed.** Dark panels exist only where the
   originals themselves are dark (see Dark/light note above).
7. **Dialogue scroll offsets are capture instants**, not design values;
   gallery threads render from their natural top.
8. **Picker-B row dots use family colors** (ModelDot by name) where the
   original's per-row dot colors at 8px are only approximately sampled;
   the Auto 5-dot cluster order follows the mobile implementation.
9. **v1.8: big display titles are Semibold, not Bold** (stem-width /
   cap-height audit, 2026-11-01; see CHANGELOG v1.8 for the per-title
   numbers). Chat-info stats values and the agent-team 19 px title
   stay Bold — their weights are unmeasured in the originals.
10. **v1.8: interaction demo sentences 2–3 are placeholders**, not
    original copy. Only "Let's discover" + the sapphire cursor is
    observed; the other rotation sentences exist only to prove the
    mechanism. All motion timings are iOS platform conventions,
    unmeasured from the static originals.
11. **v1.8: no switch and no bottom tab bar are demoed.** No UISwitch
    and no bottom tab bar exist in any original screen; the segmented
    Chat/Agents control is the set's tab mechanism, and chat-info
    opens only from the gallery demo control row (its original
    trigger is unmeasured).
12. **v1.8: edge bounce is not reproduced.** It is OS-level on iOS and
    not reproducible in headless Linux Chromium; it was not faked.
    Scrollability itself is verified by API.
